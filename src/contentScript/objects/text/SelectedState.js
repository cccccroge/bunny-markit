import { TextState } from "./TextObject"

export class SelectedState {
  constructor(svg, textObj) {
    this.svg = svg
    this.draw = window.draw
    this.controls = {}
    this.textObj = textObj

    this.hoveredTarget = null

    this.onPointerdownCallback = this._onPointerdown.bind(this)
    this.onShapePointerover = this._onShapePointerover.bind(this)
    this.onShapePointerout = this._onShapePointerout.bind(this)
    this.onTopLeftPointerover = this._onTopLeftPointerover.bind(this)
    this.onTopLeftPointerout = this._onTopLeftPointerout.bind(this)
    this.onTopRightPointerover = this._onTopRightPointerover.bind(this)
    this.onTopRightPointerout = this._onTopRightPointerout.bind(this)
    this.onBottomLeftPointerover = this._onBottomLeftPointerover.bind(this)
    this.onBottomLeftPointerout = this._onBottomLeftPointerout.bind(this)
    this.onBottomRightPointerover = this._onBottomRightPointerover.bind(this)
    this.onBottomRightPointerout = this._onBottomRightPointerout.bind(this)
    this.onFillPointerover = this._onFillPointerover.bind(this)
    this.onFillPointerout = this._onFillPointerout.bind(this)
  }

  setup() {
    window.draw.css({ cursor: 'grab' })
    this.setupControls()

    document.addEventListener('pointerdown', this.onPointerdownCallback)
  }

  teardown() {
    window.draw.css({ cursor: 'initial' })
    this.removeControls()

    document.removeEventListener('pointerdown', this.onPointerdownCallback)
  }

  setupControls() {
    const { x, y, width, height } = this.svg.bbox()

    this.controls['fill'] = this.draw
      .rect(width, height)
      .move(x, y)
      .opacity(0)
    this.controls['fill'].on('pointerover', this.onFillPointerover)
    this.controls['fill'].on('pointerout', this.onFillPointerout)

    this.controls['shape_visual'] = this.draw
      .rect(width, height)
      .move(x, y)
      .stroke({ width: 1.5, color: '#3d85c6' })
      .fill('none')
    this.controls['shape'] = this.draw
      .rect(width, height)
      .move(x, y)
      .stroke({ width: 10, color: '#000000' })
      .fill('none')
      .opacity(0)
    this.controls['shape'].on('pointerover', this.onShapePointerover)
    this.controls['shape'].on('pointerout', this.onShapePointerout)

    this.controls['topLeft_visual'] = this.draw
      .rect(8, 8)
      .center(x, y)
      .stroke({ width: 1.5, color: '#3d85c6' })
    this.controls['topLeft'] = this.draw
      .rect(12, 12)
      .center(x, y)
      .opacity(0)
    this.controls['topLeft'].on('pointerover', this.onTopLeftPointerover)
    this.controls['topLeft'].on('pointerout', this.onTopLeftPointerout)


    this.controls['topRight_visual'] = this.draw
      .rect(8, 8)
      .center(x + width, y)
      .stroke({ width: 1.5, color: '#3d85c6' })
    this.controls['topRight'] = this.draw
      .rect(12, 12)
      .center(x + width, y)
      .opacity(0)
    this.controls['topRight'].on('pointerover', this.onTopRightPointerover)
    this.controls['topRight'].on('pointerout', this.onTopRightPointerout)

    this.controls['bottomLeft_visual'] = this.draw
      .rect(8, 8)
      .center(x, y + height)
      .stroke({ width: 1.5, color: '#3d85c6' })
    this.controls['bottomLeft'] = this.draw
      .rect(12, 12)
      .center(x, y + height)
      .opacity(0)
    this.controls['bottomLeft'].on('pointerover', this.onBottomLeftPointerover)
    this.controls['bottomLeft'].on('pointerout', this.onBottomLeftPointerout)

    this.controls['bottomRight_visual'] = this.draw
      .rect(8, 8)
      .center(x + width, y + height)
      .stroke({ width: 1.5, color: '#3d85c6' })
    this.controls['bottomRight'] = this.draw
      .rect(12, 12)
      .center(x + width, y + height)
      .opacity(0)
    this.controls['bottomRight'].on('pointerover', this.onBottomRightPointerover)
    this.controls['bottomRight'].on('pointerout', this.onBottomRightPointerout)
  }

  removeControls() {
    this.controls['shape'].off('pointerover', this.onShapePointerover)
    this.controls['shape'].off('pointerout', this.onShapePointerout)

    for (const [, svg] of Object.entries(this.controls)) {
      svg.remove();
    }
    this.controls = {}
  }

  _onShapePointerover(e) {
    const { clientX, clientY } = e
    const offset = 5
    const { x, y, width, height } = this.svg.bbox()

    if (clientY > y + offset && clientY < y + height - offset) {
      window.draw.css({ cursor: 'ew-resize' })
      if (clientX < x + width / 2) {
        this.hoveredTarget = 'left'
      } else {
        this.hoveredTarget = 'right'
      }
    } else if (clientX > x + offset && clientX < x + width - offset) {
      window.draw.css({ cursor: 'ns-resize' })
      if (clientY < y + height / 2) {
        this.hoveredTarget = 'top'
      } else {
        this.hoveredTarget = 'bottom'
      }
    }
  }

  _onShapePointerout() {
    window.draw.css({ cursor: 'initial' })
    this.hoveredTarget = null
  }

  _onTopLeftPointerover() {
    window.draw.css({ cursor: 'nwse-resize' })
    this.hoveredTarget = 'topLeft'
  }

  _onTopLeftPointerout() {
    window.draw.css({ cursor: 'initial' })
    this.hoveredTarget = null
  }

  _onTopRightPointerover() {
    window.draw.css({ cursor: 'nesw-resize' })
    this.hoveredTarget = 'topRight'
  }

  _onTopRightPointerout() {
    window.draw.css({ cursor: 'initial' })
    this.hoveredTarget = null
  }

  _onBottomLeftPointerover() {
    window.draw.css({ cursor: 'nesw-resize' })
    this.hoveredTarget = 'bottomLeft'
  }

  _onBottomLeftPointerout() {
    window.draw.css({ cursor: 'initial' })
    this.hoveredTarget = null
  }

  _onBottomRightPointerover() {
    window.draw.css({ cursor: 'nwse-resize' })
    this.hoveredTarget = 'bottomRight'
  }

  _onBottomRightPointerout() {
    window.draw.css({ cursor: 'initial' })
    this.hoveredTarget = null
  }

  _onFillPointerover() {
    window.draw.css({ cursor: 'grab' })
    this.hoveredTarget = 'fill'
  }

  _onFillPointerout() {
    window.draw.css({ cursor: 'initial' })
    this.hoveredTarget = null
  }

  _onPointerdown(e) {
    const { clientX, clientY } = e

    switch(this.hoveredTarget) {
      case 'fill':
        this.textObj.changeState(TextState.MOVING, { x: clientX, y: clientY })
        break;
      case 'topLeft':
        this.textObj.changeState(TextState.RESIZING, { control: 'topLeft', x: clientX, y: clientY })
        break;
      case 'top':
        this.textObj.changeState(TextState.RESIZING, { control: 'top', y: clientY })
        break;
      case 'topRight':
        this.textObj.changeState(TextState.RESIZING, { control: 'topRight', x: clientX, y: clientY })
        break;
      case 'right':
        this.textObj.changeState(TextState.RESIZING, { control: 'right', x: clientX })
        break;
      case 'bottomRight':
        this.textObj.changeState(TextState.RESIZING, { control: 'bottomRight', x: clientX, y: clientY })
        break;
      case 'bottom':
        this.textObj.changeState(TextState.RESIZING, { control: 'bottom', y: clientY })
        break;
      case 'bottomLeft':
        this.textObj.changeState(TextState.RESIZING, { control: 'bottomLeft', x: clientX, y: clientY })
        break;
      case 'left':
        this.textObj.changeState(TextState.RESIZING, { control: 'left', x: clientX })
        break;
      default:
        this.textObj.changeState(TextState.IDLE)
    }
  }
}
