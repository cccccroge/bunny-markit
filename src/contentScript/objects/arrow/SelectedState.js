import { ArrowState } from './ArrowObject';

export class SelectedState {
  constructor(svgs, arrowObj) {
    this.svgs = svgs;
    this.draw = window.draw;
    this.controls = {};
    this.arrowObj = arrowObj;

    this.hoveredTarget = null;

    this.onPointerdownCallback = this._onPointerdown.bind(this);

    this.onLinePointerover = this._onLinePointerover.bind(this);
    this.onLinePointerout = this._onLinePointerout.bind(this);
    this.onStartPointerover = this._onStartPointerover.bind(this);
    this.onStartPointerout = this._onStartPointerout.bind(this);
    this.onEndPointerover = this._onEndPointerover.bind(this);
    this.onEndPointerout = this._onEndPointerout.bind(this);

    this.onKeydownCallback = this._onKeydownCallback.bind(this);
  }

  setup() {
    this.svgs.line.stroke({ color: '#f06' });
    this.svgs.head.fill('#f06');
    window.draw.css({ cursor: 'grab' });
    this.setupControls();

    document.addEventListener('pointerdown', this.onPointerdownCallback);
    document.addEventListener('keydown', this.onKeydownCallback);
  }

  teardown() {
    window.draw.css({ cursor: 'initial' });
    this.removeControls();

    document.removeEventListener('pointerdown', this.onPointerdownCallback);
    document.removeEventListener('keydown', this.onKeydownCallback);
  }

  setupControls() {
    const [startPoint, endPoint] = this.svgs.line.array();

    // Line itself
    this.controls['line_visual'] = this.draw
      .line(startPoint[0], startPoint[1], endPoint[0], endPoint[1])
      .stroke({ width: 1.5, color: '#3d85c6' });
    this.controls['line_hover_region'] = this.draw
      .line(startPoint[0], startPoint[1], endPoint[0], endPoint[1])
      .stroke({ width: 10, color: '#000000' })
      .fill('none')
      .opacity(0);
    this.controls['line_hover_region'].on(
      'pointerover',
      this.onLinePointerover
    );
    this.controls['line_hover_region'].on('pointerout', this.onLinePointerout);

    // Line start point
    this.controls['start_point_visual'] = this.draw
      .circle(8)
      .center(startPoint[0], startPoint[1])
      .stroke({ width: 1.5, color: '#3d85c6' });
    this.controls['start_point_hover_region'] = this.draw
      .circle(12)
      .center(startPoint[0], startPoint[1])
      .stroke({ width: 1.5, color: '#000000' })
      .opacity(0);
    this.controls['start_point_hover_region'].on(
      'pointerover',
      this.onStartPointerover
    );
    this.controls['start_point_hover_region'].on(
      'pointerout',
      this.onStartPointerout
    );

    // Line end point
    this.controls['end_point_visual'] = this.draw
      .circle(8)
      .center(endPoint[0], endPoint[1])
      .stroke({ width: 1.5, color: '#3d85c6' });
    this.controls['end_point_hover_region'] = this.draw
      .circle(12)
      .center(endPoint[0], endPoint[1])
      .stroke({ width: 1.5, color: '#000000' })
      .opacity(0);
    this.controls['end_point_hover_region'].on(
      'pointerover',
      this.onEndPointerover
    );
    this.controls['end_point_hover_region'].on(
      'pointerout',
      this.onEndPointerout
    );
  }

  removeControls() {
    // this.controls['shape'].off('pointerover', this.onLinePointerover);
    // this.controls['shape'].off('pointerout', this.onLinePointerout);

    for (const [, svg] of Object.entries(this.controls)) {
      svg.remove();
    }
    this.controls = {};
  }

  _onLinePointerover() {
    window.draw.css({ cursor: 'grab' });
    this.hoveredTarget = 'line';
    console.log('pointerover line');
  }

  _onLinePointerout() {
    window.draw.css({ cursor: 'initial' });
    this.hoveredTarget = null;
    console.log('pointerout line');
  }

  _onStartPointerover() {
    window.draw.css({ cursor: 'grab' });
    this.controls['start_point_hover_region']
      .stroke('none')
      .fill({ color: '#3d85c6' })
      .opacity(0.8);
    this.hoveredTarget = 'startPoint';
    console.log('pointerover start point');
  }

  _onStartPointerout() {
    window.draw.css({ cursor: 'initial' });
    this.controls['start_point_hover_region']
      .stroke({ color: '#000000' })
      .fill('none')
      .opacity(0);
    this.hoveredTarget = null;
    console.log('pointerout start point');
  }

  _onEndPointerover() {
    window.draw.css({ cursor: 'grab' });
    this.controls['end_point_hover_region']
      .stroke('none')
      .fill({ color: '#3d85c6' })
      .opacity(0.8);
    this.hoveredTarget = 'endPoint';
    console.log('pointerover end point');
  }

  _onEndPointerout() {
    window.draw.css({ cursor: 'initial' });
    this.controls['end_point_hover_region']
      .stroke({ color: '#000000' })
      .fill('none')
      .opacity(0);
    this.hoveredTarget = null;
    console.log('pointerout end point');
  }

  _onPointerdown(e) {
    const { clientX, clientY } = e;

    switch (this.hoveredTarget) {
      case 'line':
        this.arrowObj.changeState(ArrowState.MOVING, {
          x: clientX,
          y: clientY,
        });
        break;
      case 'startPoint':
        this.arrowObj.changeState(ArrowState.MOVING_POINT, {
          control: 'start',
          x: clientX,
          y: clientY,
        });
        break;
      case 'endPoint':
        this.arrowObj.changeState(ArrowState.MOVING_POINT, {
          control: 'end',
          x: clientX,
          y: clientY,
        });
        break;
      default:
        this.arrowObj.changeState(ArrowState.IDLE);
    }
  }

  _onKeydownCallback(event) {
    if (event.key === 'Backspace') {
      this.svgs.line.remove();
      this.svgs.head.remove();
      // TODO: this will cause memory leak, and I think there are serverl leak in other places
      this.arrowObj.changeState(ArrowState.ZOMBIE);
    }
  }
}
