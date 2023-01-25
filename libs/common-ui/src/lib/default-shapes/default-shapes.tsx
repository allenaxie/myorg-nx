import styles from './default-shapes.module.css';

/* eslint-disable-next-line */
export interface DefaultShapesProps {}

export function DefaultShapes(props: DefaultShapesProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to DefaultShapes!</h1>
    </div>
  );
}

export default DefaultShapes;

export const STROKE = '#000000'
export const FILL = 'rgba(255, 255, 255, 0.0)'

export interface CircleProps {
  radius: Number,
  left: Number,
  top: Number,
  fill: String,
  stroke: String,
}

export const Circle:CircleProps = {
  radius: 20,
  left: 100,
  top: 100,
  fill: FILL,
  stroke: STROKE
}
