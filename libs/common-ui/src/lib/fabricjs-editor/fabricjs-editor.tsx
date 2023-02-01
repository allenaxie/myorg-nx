import { fabric } from 'fabric';
import { CIRCLE, RECTANGLE, LINE, TEXT, FILL, STROKE } from '@myorg/common-ui';
import { useEffect, useState } from 'react';

export interface FabricJSEditor {
  canvas: fabric.Canvas;
  addCircle: () => void;
  addRectangle: () => void;
  addYellowRectangle: () => void;
  addLine: () => void;
  addText: (text: string) => void;
  updateText: (text: string) => void;
  deleteAll: () => void;
  deleteSelected: () => void;
  fillColor: string;
  strokeColor: string;
  setFillColor: (color: string) => void;
  setStrokeColor: (color: string) => void;
  zoomIn: () => void;
  zoomOut: () => void;
}

/**
 * Creates editor
 */
const buildEditor = (
  canvas: fabric.Canvas,
  fillColor: string,
  strokeColor: string,
  _setFillColor: (color: string) => void,
  _setStrokeColor: (color: string) => void,
  scaleStep: number
): FabricJSEditor => {
  return {
    canvas,
    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE,
        fill: fillColor,
        stroke: strokeColor,
      });
      canvas.add(object);
    },
    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE,
        fill: fillColor,
        stroke: strokeColor,
      });
      canvas.add(object);
    },
    addYellowRectangle: () => {
      var object = new fabric.Rect({
        ...LINE.options,
        left: 100,
        top: 50,
        fill: 'yellow',
        width: 200,
        height: 100,
        objectCaching: false,
        stroke: 'lightgreen',
        strokeWidth: 4,
      });

      var deleteIcon =
        "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

      var img = document.createElement('img');
      img.src = deleteIcon;

      fabric.Object.prototype.transparentCorners = false;
      fabric.Object.prototype.cornerColor = 'blue';
      fabric.Object.prototype.cornerStyle = 'circle';

      fabric.Object.prototype.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: 16,
        cursorStyle: 'pointer',
        mouseUpHandler: deleteObject,
        render: renderIcon,
        // cornerSize: 24,
      });

      function deleteObject(eventData: any, transform: any) {
        var target = transform.target;
        var canvas = target.canvas;
        canvas.remove(target);
        canvas.requestRenderAll();
        return true;
      }

      //Render red x icon
      function renderIcon(
        this: {
          x: number;
          y: number;
          offsetY: number;
          cursorStyle: string;
          mouseUpHandler: (eventData: any, transform: any) => void;
          render: (
            ctx: any,
            left: any,
            top: any,
            styleOverride: any,
            fabricObject: any
          ) => /* eslint-disable-next-line */
          void;
          cornerSize: number;
        },
        ctx: any,
        left: any,
        top: any,
        styleOverride: any,
        fabricObject: any
      ) {
        var size = 24;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(img, -size / 2, -size / 2, size, size);
        ctx.restore();
      }

      function makeLine(eventData: any) {
        let pointer = canvas.getPointer(eventData);
        let coords = [
          pointer.x,
          pointer?.y,
          (pointer.x || 0) + 200,
          pointer?.y,
        ];
        const object = new fabric.Line(coords, {
          ...LINE.options,
          stroke: strokeColor,
        });

        canvas.add(object);
        return true;
      }

      //connect shape custom control
      fabric.Object.prototype.controls.lineControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: 76,
        cursorStyle: 'pointer',
        mouseDownHandler: (eventData: any, transform: any) =>
          makeLine(eventData),
        render: renderIcon,
      });

      canvas?.add(object);
    },
    addLine: () => {
      const object = new fabric.Line(LINE.points, {
        ...LINE.options,
        stroke: strokeColor,
      });
      canvas.add(object);
    },
    addText: (text: string) => {
      // use stroke in text fill, fill default is most of the time transparent
      const object = new fabric.Textbox(text, { ...TEXT, fill: strokeColor });
      object.set({ text: text });
      canvas.add(object);
    },
    updateText: (text: string) => {
      const objects: any[] = canvas.getActiveObjects();
      if (objects.length && objects[0].type === TEXT.type) {
        const textObject: fabric.Textbox = objects[0];
        textObject.set({ text });
        canvas.renderAll();
      }
    },
    deleteAll: () => {
      canvas.getObjects().forEach((object) => canvas.remove(object));
      canvas.discardActiveObject();
      canvas.renderAll();
    },
    deleteSelected: () => {
      canvas.getActiveObjects().forEach((object) => canvas.remove(object));
      canvas.discardActiveObject();
      canvas.renderAll();
    },
    fillColor,
    strokeColor,
    setFillColor: (fill: string) => {
      _setFillColor(fill);
      canvas.getActiveObjects().forEach((object) => object.set({ fill }));
      canvas.renderAll();
    },
    setStrokeColor: (stroke: string) => {
      _setStrokeColor(stroke);
      canvas.getActiveObjects().forEach((object) => {
        if (object.type === TEXT.type) {
          // use stroke in text fill
          object.set({ fill: stroke });
          return;
        }
        object.set({ stroke });
      });
      canvas.renderAll();
    },
    zoomIn: () => {
      const zoom = canvas.getZoom();
      canvas.setZoom(zoom / scaleStep);
    },
    zoomOut: () => {
      const zoom = canvas.getZoom();
      canvas.setZoom(zoom * scaleStep);
    },
  };
};

interface FabricJSEditorState {
  editor?: FabricJSEditor;
}

interface FabricJSEditorHook extends FabricJSEditorState {
  selectedObjects?: fabric.Object[];
  onReady: (canvas: fabric.Canvas) => void;
}

interface FabricJSEditorHookProps {
  defaultFillColor?: string;
  defaultStrokeColor?: string;
  scaleStep?: number;
}

const useFabricJSEditor = (
  props: FabricJSEditorHookProps = {}
): FabricJSEditorHook => {
  const scaleStep = props.scaleStep || 0.5;
  const { defaultFillColor, defaultStrokeColor } = props;
  const [canvas, setCanvas] = useState<null | fabric.Canvas>(null);
  const [fillColor, setFillColor] = useState<string>(defaultFillColor || FILL);
  const [strokeColor, setStrokeColor] = useState<string>(
    defaultStrokeColor || STROKE
  );
  const [selectedObjects, setSelectedObject] = useState<fabric.Object[]>([]);
  useEffect(() => {
    const bindEvents = (canvas: fabric.Canvas) => {
      canvas.on('selection:cleared', () => {
        setSelectedObject([]);
        localStorage.setItem('selectedObjects', JSON.stringify([]));
      });
      canvas.on('selection:created', (e: any) => {
        setSelectedObject(e.selected);
        localStorage.setItem('selectedObjects', JSON.stringify(e.selected));
      });
      canvas.on('selection:updated', (e: any) => {
        setSelectedObject(e.selected);
        localStorage.setItem('selectedObjects', JSON.stringify(e.selected));
      });

      canvas.on('mouse:over', function (e) {
        e.target?.set('fill', 'red');
        canvas.renderAll();
      });

      canvas.on('mouse:out', function (e) {
        e.target?.set('fill', 'white');
        canvas.renderAll();
      });

      canvas.on('object:moving', function (e: any) {
        var p = e.target;
        localStorage.setItem('selectedObjects', JSON.stringify(p));
        canvas.renderAll();
      });
    };
    if (canvas) {
      bindEvents(canvas);
    }
  }, [canvas]);

  return {
    selectedObjects,
    onReady: (canvasReady: fabric.Canvas): void => {
      console.log('Fabric canvas ready');
      setCanvas(canvasReady);
    },
    editor: canvas
      ? buildEditor(
          canvas,
          fillColor,
          strokeColor,
          setFillColor,
          setStrokeColor,
          scaleStep
        )
      : undefined,
  };
};

export { buildEditor, useFabricJSEditor };
export type { FabricJSEditorHook };
