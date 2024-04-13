import { BoxState } from "./BoxObject"

export class MovingState {
  constructor(svg, boxObj) {
    this.svg = svg
    this.boxObj = boxObj

    this.dragStartPosition = {
      x: -1,
      y: -1,
    }
    this.currentPosition = {
      x: -1,
      y: -1,
    }
    this.initialBoxPosition = {
      x: svg.x(),
      y: svg.y(),
    }
  }

  setup(params) {
    this.initPositions(params)
    this.onPointermoveCallback = this._onPointermove.bind(this)
    this.onPointerupCallback = this._onPointerup.bind(this)
    document.addEventListener('pointermove', this.onPointermoveCallback)
    document.addEventListener('pointerup', this.onPointerupCallback)
  }

  initPositions(params) {
    const { x, y } = params
    this.initialBoxPosition = {
      x: this.svg.x(),
      y: this.svg.y(),
    }
    this.dragStartPosition.x = x
    this.dragStartPosition.y = y
    this.currentPosition.x = x
    this.currentPosition.y = y
  }

  teardown() {
    window.draw.css({ cursor: 'initial' })

    document.removeEventListener('pointermove', this.onPointermoveCallback)
    document.removeEventListener('pointerup', this.onPointerupCallback)
  }

  _onPointermove(e) {
    const { clientX, clientY } = e

    this.currentPosition.x = clientX
    this.currentPosition.y = clientY

    this.svg.attr({
      x: this.initialBoxPosition.x + this.currentPosition.x - this.dragStartPosition.x,
      y: this.initialBoxPosition.y + this.currentPosition.y - this.dragStartPosition.y,
    })
  }

  _onPointerup() {
    this.boxObj.changeState(BoxState.SELECTED)
  }
}
