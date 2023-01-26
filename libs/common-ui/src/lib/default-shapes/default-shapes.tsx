export const STROKE = '#000000'
export const FILL = 'rgba(255, 255, 255, 0.0)'

export const CIRCLE = {
  radius: 20,
  left: 100,
  top: 100,
  fill: FILL,
  stroke: STROKE
}

export const RECTANGLE = {
  left: 100,
  top: 100,
  fill: FILL,
  stroke: STROKE,
  width: 40,
  height: 40,
  angle: 0
}

export const LINE = {
  // points:[x,n,n,y]
  points: [100, 0, 0, 100],
  options: {
    left: 170,
    top: 50,
    stroke: STROKE
  }
}

export const TEXT = {
  type: 'text',
  left: 100,
  top: 100,
  fontSize: 16,
  fontFamily: 'Arial',
  fill: STROKE
}
