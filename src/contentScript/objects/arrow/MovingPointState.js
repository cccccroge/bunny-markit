import { ArrowState } from './ArrowObject';
import ArrowDrawer from '../../drawers/arrowDrawer';

export class MovingPointState {
  constructor(svgs, arrowObj) {
    this.svgs = svgs;
    this.arrowObj = arrowObj;
    this.arrowDrawer = new ArrowDrawer(window.draw);

    this.dragStartPosition = {
      x: -1,
      y: -1,
    };
    this.currentPosition = {
      x: -1,
      y: -1,
    };
    this.startPointPosition = {
      x: -1,
      y: -1,
    };
    this.endPointPosition = {
      x: -1,
      y: -1,
    };
  }

  setup(params) {
    // this.svgs.line.stroke({ color: '#f06' });
    // this.svgs.head.fill('#f06');

    this.control = params.control;
    this.initPositions(params);

    this.onPointermoveCallback = this._onPointermove.bind(this);
    this.onPointerupCallback = this._onPointerup.bind(this);
    document.addEventListener('pointermove', this.onPointermoveCallback);
    document.addEventListener('pointerup', this.onPointerupCallback);
  }

  initPositions(params) {
    const { x, y } = params;

    this.dragStartPosition.x = x;
    this.dragStartPosition.y = y;
    this.currentPosition.x = x;
    this.currentPosition.y = y;

    this.startPointPosition = {
      x: this.svgs.line.array()[0][0],
      y: this.svgs.line.array()[0][1],
    };
    this.endPointPosition = {
      x: this.svgs.head.array()[0][0], // head will be the actual end
      y: this.svgs.head.array()[0][1],
    };
  }

  teardown() {
    window.draw.css({ cursor: 'initial' });

    document.removeEventListener('pointermove', this.onPointermoveCallback);
    document.removeEventListener('pointerup', this.onPointerupCallback);
  }

  _onPointermove(e) {
    e.preventDefault();

    const { clientX, clientY } = e;

    this.currentPosition.x = clientX;
    this.currentPosition.y = clientY;

    const dx = this.currentPosition.x - this.dragStartPosition.x;
    const dy = this.currentPosition.y - this.dragStartPosition.y;

    // re-calculate the start point or end point coords
    let newStartPointPosition = {
      x: this.startPointPosition.x,
      y: this.startPointPosition.y,
    };
    let newEndPointPosition = {
      x: this.endPointPosition.x,
      y: this.endPointPosition.y,
    };
    if (this.control === 'start') {
      newStartPointPosition.x += dx;
      newStartPointPosition.y += dy;
    } else if (this.control === 'end') {
      newEndPointPosition.x += dx;
      newEndPointPosition.y += dy;
    }

    // re-draw the arrow
    this.svgs.line.remove();
    this.svgs.head.remove();

    const { line, head } = this.arrowDrawer._createShapes({
      startPoint: newStartPointPosition,
      endPoint: newEndPointPosition,
    });
    this.svgs.line = line;
    this.svgs.head = head;
  }

  _onPointerup() {
    this.arrowObj.changeState(ArrowState.SELECTED);
  }
}
