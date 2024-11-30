import { ArrowState } from './ArrowObject';

export class HoveredState {
  constructor(svgs, arrowObj) {
    this.svgs = svgs;
    this.arrowObj = arrowObj;
  }

  setup(params) {
    const line = this.svgs.line;
    const head = this.svgs.head;
    line.stroke({ color: '#e06666' });
    head.fill('#e06666');

    this.hoveredRegion = params.hoveredRegion;
    window.draw.css({ cursor: 'grab' });

    this.onPointeroutCallback = this._onPointerout.bind(this);
    this.onPointerdownCallback = this._onPointerdown.bind(this);
    this.hoveredRegion.on('pointerout', this.onPointeroutCallback);
    this.hoveredRegion.on('pointerdown', this.onPointerdownCallback);
  }

  teardown() {
    window.draw.css({ cursor: 'initial' });

    this.hoveredRegion.off('pointerout', this.onPointeroutCallback);
    this.hoveredRegion.off('pointerdown', this.onPointerdownCallback);
  }

  _onPointerout() {
    this.arrowObj.changeState(ArrowState.IDLE);
  }

  _onPointerdown(e) {
    e.stopPropagation();
    const { clientX, clientY } = e;
    this.arrowObj.changeState(ArrowState.MOVING, { x: clientX, y: clientY });
  }
}
