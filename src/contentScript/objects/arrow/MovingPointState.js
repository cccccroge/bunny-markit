import { ArrowState } from './ArrowObject';

export class MovingPointState {
  constructor(svgs, arrowObj) {
    this.svgs = svgs;
    this.arrowObj = arrowObj;

    this.dragStartPosition = {
      x: -1,
      y: -1,
    };
    this.currentPosition = {
      x: -1,
      y: -1,
    };
    this.initialPointPosition = {
      x: -1,
      y: -1,
    };
    this.initialHeadPosition = {
      x: -1,
      y: -1,
    };
  }

  setup(params) {
    this.svgs.line.stroke({ color: '#f06' });
    this.svgs.head.fill('#f06');
    this.type = params.control;
    this.initPositions(params);

    this.onPointermoveCallback = this._onPointermove.bind(this);
    this.onPointerupCallback = this._onPointerup.bind(this);
    document.addEventListener('pointermove', this.onPointermoveCallback);
    document.addEventListener('pointerup', this.onPointerupCallback);
  }

  initPositions(params) {
    const { x, y } = params;
    if (this.type === 'start') {
      this.initialPointPosition = {
        x: this.svgs.line.array()[0][0],
        y: this.svgs.line.array()[0][1],
      };
    } else if (this.type === 'end') {
      this.initialPointPosition = {
        x: this.svgs.line.array()[1][0],
        y: this.svgs.line.array()[1][1],
      };
    }
    this.initialHeadPosition = {
      x: this.svgs.head.x(),
      y: this.svgs.head.y(),
    };
    this.dragStartPosition.x = x;
    this.dragStartPosition.y = y;
    this.currentPosition.x = x;
    this.currentPosition.y = y;
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

    if (this.type === 'start') {
      this.svgs.line.attr({
        x1: this.initialPointPosition.x + dx,
        y1: this.initialPointPosition.y + dy,
      });
    } else if (this.type === 'end') {
      this.svgs.line.attr({
        x2: this.initialPointPosition.x + dx,
        y2: this.initialPointPosition.y + dy,
      });
      this.svgs.head.move(
        this.initialHeadPosition.x + dx,
        this.initialHeadPosition.y + dy
      );
    }
  }

  _onPointerup() {
    this.arrowObj.changeState(ArrowState.SELECTED);
  }
}
