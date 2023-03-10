import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import {
  useFabricJSEditor,
  FabricJSEditor,
  FabricJSEditorHook,
} from '../fabricjs-editor/fabricjs-editor';

/* eslint-disable-next-line */
export interface Props {
  className?: string;
  onReady?: (canvas: fabric.Canvas) => void;
}

/**
 * Fabric canvas as component
 */
const FabricJSCanvas = ({ className, onReady }: Props) => {
  const canvasEl = useRef(null);
  const canvasElParent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasEl.current);
    // console.log('new canvas:', canvas);
    const setCurrentDimensions = () => {
      canvas.setHeight(600);
      canvas.setWidth(canvasElParent.current?.clientWidth || 0);
      canvas.renderAll();
    };
    const resizeCanvas = () => {
      setCurrentDimensions();
    };
    setCurrentDimensions();

    window.addEventListener('resize', resizeCanvas, false);

    if (onReady) {
      onReady(canvas);
    }

    return () => {
      canvas.dispose();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div ref={canvasElParent} className={className}>
      <canvas ref={canvasEl} />
    </div>
  );
};

export { FabricJSCanvas, useFabricJSEditor };
export type { FabricJSEditor, FabricJSEditorHook };
