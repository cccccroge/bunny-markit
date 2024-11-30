import { ArrowState } from './ArrowObject';

export class IdleState {
  constructor(svgs, arrowObj) {
    this.svgs = svgs;
    this.draw = window.draw;
    this.arrowObj = arrowObj;
  }

  setup() {
    const line = this.svgs.line;
    const head = this.svgs.head;
    line.stroke({ color: '#f06' });
    head.fill('#f06');

    const [startPoint, endPoint] = line.array();
    this.hoveredRegion = this.draw
      .line(startPoint[0], startPoint[1], endPoint[0], endPoint[1])
      .stroke({ width: 15, color: '#fff' })
      .opacity(0);

    this.onPointeroverCallback = this._onPointerover.bind(this);
    this.hoveredRegion.on('pointerover', this.onPointeroverCallback);
  }

  teardown() {
    this.hoveredRegion.off('pointerover', this.onPointeroverCallback);
  }

  _onPointerover() {
    this.arrowObj.changeState(ArrowState.HOVERED, {
      hoveredRegion: this.hoveredRegion,
    });
  }
}
