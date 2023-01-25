import styles from './fabricjs-canvas.module.css';
import { useEffect, useRef } from 'react'
import { fabric } from 'fabric';

/* eslint-disable-next-line */
export interface FabricjsCanvasProps {}

export function FabricjsCanvas(props: FabricjsCanvasProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to FabricjsCanvas!</h1>
    </div>
  );
}

export default FabricjsCanvas;
