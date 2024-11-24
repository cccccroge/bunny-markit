// import { BoxObject } from "../objects/box/BoxObject"

class ArrowDrawer {
  constructor(draw, options) {
    this.draw = draw;
    this.options = options;
    this.last = {
      points: {},
      line: null,
      head: null,
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
      this.last.head.remove();
    }
  }

  _createShapes(points) {
    const line = this._makeLine(points);
    const head = this._makeHead(points);

    this.last.line = line;
    this.last.head = head;
    this.last.points = points;

    return { line, head };
  }

  _makeLine(points) {
    const { startPoint, endPoint } = points;

    const h = 20;
    const d = Math.pow(
      Math.pow(startPoint.x - endPoint.x, 2) +
        Math.pow(startPoint.y - endPoint.y, 2),
      1 / 2.0
    );
    const dY = Math.abs(startPoint.y - endPoint.y);
    const dX = Math.abs(startPoint.x - endPoint.x);
    const sinTheta = dY / d;
    const cosTheta = dX / d;

    const lineEnd = {
      x: endPoint.x + (startPoint.x > endPoint.x ? 1 : -1) * (h / 2) * cosTheta,
      y: endPoint.y + (startPoint.y > endPoint.y ? 1 : -1) * (h / 2) * sinTheta,
    };

    return this.draw
      .line(startPoint.x, startPoint.y, lineEnd.x, lineEnd.y)
      .stroke({ width: 5, color: '#f06' });
  }

  _makeHead(points) {
    const { startPoint, endPoint } = points;
    const h = 20;
    const w = 20;

    const d = Math.pow(
      Math.pow(startPoint.x - endPoint.x, 2) +
        Math.pow(startPoint.y - endPoint.y, 2),
      1 / 2.0
    );
    const dY = Math.abs(startPoint.y - endPoint.y);
    const dX = Math.abs(startPoint.x - endPoint.x);
    const sinTheta = dY / d;
    const cosTheta = dX / d;

    const p1 = {
      x: endPoint.x + (startPoint.x > endPoint.x ? 1 : -1) * h * cosTheta,
      y: endPoint.y + (startPoint.y > endPoint.y ? 1 : -1) * h * sinTheta,
    };
    const p2 = {
      x: p1.x + (startPoint.y > endPoint.y ? 1 : -1) * (w / 2) * sinTheta,
      y: p1.y + (startPoint.x < endPoint.x ? 1 : -1) * (w / 2) * cosTheta,
    };
    const p3 = {
      x: p1.x - (startPoint.y > endPoint.y ? 1 : -1) * (w / 2) * sinTheta,
      y: p1.y - (startPoint.x < endPoint.x ? 1 : -1) * (w / 2) * cosTheta,
    };

    return this.draw
      .polygon(`${endPoint.x},${endPoint.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`)
      .fill('#f06')
      .stroke({ width: 1 });
  }
}

export default ArrowDrawer;
