import { ArrowState } from './ArrowObject';

export class MovingState {
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
    this.initialLinePosition = {
      x: svgs.line.x(),
      y: svgs.line.y(),
    };
    this.initialHeadPosition = {
      x: svgs.head.x(),
      y: svgs.head.y(),
    };
  }

  setup(params) {
    this.svgs.line.stroke({ color: '#f06' });
    this.svgs.head.fill('#f06');
    this.initPositions(params);

    this.onPointermoveCallback = this._onPointermove.bind(this);
    this.onPointerupCallback = this._onPointerup.bind(this);
    document.addEventListener('pointermove', this.onPointermoveCallback);
    document.addEventListener('pointerup', this.onPointerupCallback);
  }

  initPositions(params) {
    const { x, y } = params;
    this.initialLinePosition = {
      x: this.svgs.line.x(),
      y: this.svgs.line.y(),
    };
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

    this.svgs.line.move(
      this.initialLinePosition.x + dx,
      this.initialLinePosition.y + dy
    );
    this.svgs.head.move(
      this.initialHeadPosition.x + dx,
      this.initialHeadPosition.y + dy
    );
  }

  _onPointerup() {
    this.arrowObj.changeState(ArrowState.SELECTED);
  }
}
