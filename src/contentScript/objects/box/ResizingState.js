import { BoxState } from "./BoxObject"

// TODO: havn't done antyhing yet.
export class ResizingState {
  constructor(svg, boxObj) {
    this.svg = svg
    this.boxObj = boxObj

    this.startPoint = {
      x: -1,
      y: -1,
    }
    this.currentPoint = {
      x: -1,
      y: -1,
    }
    this.originalPoint = {
      x: svg.x(),
      y: svg.y(),
    }
  }

  setup(params) {
    this.initializePositions(params)

    this.onPointermoveCallback = this._onPointermove.bind(this)
    this.onPointerupCallback = this._onPointerup.bind(this)

    document.addEventListener('pointermove', this.onPointermoveCallback)
    document.addEventListener('pointerup', this.onPointerupCallback)

    const { x, y } = params.initialPoint
    this.originalPoint = {
      x: this.svg.x(),
      y: this.svg.y(),
    }
    this.originalSize = {
      width: this.svg.width(),
      height: this.svg.height(),
    }
    this.startPoint.x = x
    this.startPoint.y = y
    this.currentPoint.x = x
    this.currentPoint.y = y
  }

  teardown() {
    document.removeEventListener('pointermove', this.onPointermoveCallback)
    document.removeEventListener('pointerup', this.onPointerupCallback)
  }

  initializePositions(params) {
    const { x, y } = params

    this.originalPoint = {
      x: this.svg.x(),
      y: this.svg.y(),
    }
    this.originalSize = {
      width: this.svg.width(),
      height: this.svg.height(),
    }
    this.startPoint = {
      x: x,
      y: y,
    }
    this.currentPoint = {
      x: x,
      y: y,
    }
  }

  _onPointermove(e) {
    const { clientX, clientY } = e

    this.currentPoint.x = clientX
    this.currentPoint.y = clientY

    this.svg.attr({
      x: this.originalPoint.x - (this.startPoint.x - this.currentPoint.x),
      y: this.originalPoint.y - (this.startPoint.y - this.currentPoint.y),
      width: this.originalSize.width + (this.startPoint.x - this.currentPoint.x),
      height: this.originalSize.height + (this.startPoint.y - this.currentPoint.y)
    })
  }

  _onPointerup() {
    this.boxObj.changeState(BoxState.SELECTED)
  }
}
