// import { BoxObject } from "../objects/box/BoxObject"

class ArrowDrawer {
  constructor(draw, options) {
    this.draw = draw;
    this.options = options;
    this.last = {
      points: {},
      line: null,
    };
  }

  drawMark(startPoint, endPoint) {
    this._createShapes({ startPoint, endPoint });
    // new BoxObject(rect)
  }

  erase(startPoint, endPoint) {
    if (!this.last.points.startPoint || !this.last.points.endPoint) {
      return;
    }

    if (
      this.last.points.startPoint.x === startPoint.x &&
      this.last.points.startPoint.y === startPoint.y &&
      this.last.points.endPoint.x === endPoint.x &&
      this.last.points.endPoint.y === endPoint.y
    ) {
      this.last.line.remove();
    }
  }

  _createShapes(points) {
    const { startPoint, endPoint } = points;

    const line = this.draw
      .line(startPoint.x, startPoint.y, endPoint.x, endPoint.y)
      .stroke({ width: 5, color: '#f06' });

    this.last.line = line;
    this.last.points = { startPoint, endPoint };

    return line;
  }
}

export default ArrowDrawer;
