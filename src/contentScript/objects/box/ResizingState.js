import { BoxState } from "./BoxObject"

export class ResizingState {
  constructor(svg, boxObj) {
    this.svg = svg
    this.boxObj = boxObj
    this.control = null

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
  }

  teardown() {
    document.removeEventListener('pointermove', this.onPointermoveCallback)
    document.removeEventListener('pointerup', this.onPointerupCallback)
  }

  initializePositions(params) {
    const { x, y, control } = params

    this.control = control
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
    e.preventDefault()

    const { clientX, clientY } = e

    this.currentPoint.x = clientX
    this.currentPoint.y = clientY

    switch(this.control) {
      case 'topLeft':
        this.svg.attr({
          x: this.originalPoint.x - (this.startPoint.x - this.currentPoint.x),
          y: this.originalPoint.y - (this.startPoint.y - this.currentPoint.y),
          width: this.originalSize.width + (this.startPoint.x - this.currentPoint.x),
          height: this.originalSize.height + (this.startPoint.y - this.currentPoint.y)
        })
        break
      case 'top':
        this.svg.attr({
          y: this.originalPoint.y - (this.startPoint.y - this.currentPoint.y),
          height: this.originalSize.height + (this.startPoint.y - this.currentPoint.y)
        })
        break
      case 'topRight':
        this.svg.attr({
          y: this.originalPoint.y + (this.currentPoint.y - this.startPoint.y),
          width: this.originalSize.width + (this.currentPoint.x - this.startPoint.x),
          height: this.originalSize.height + (this.startPoint.y - this.currentPoint.y)
        })
        break
      case 'right':
        this.svg.attr({
          width: this.originalSize.width + (this.currentPoint.x - this.startPoint.x),
        })
        break
      case 'bottomRight':
        this.svg.attr({
          width: this.originalSize.width + (this.currentPoint.x - this.startPoint.x),
          height: this.originalSize.height + (this.currentPoint.y - this.startPoint.y)
        })
        break
      case 'bottom':
        this.svg.attr({
          height: this.originalSize.height + (this.currentPoint.y - this.startPoint.y)
        })
        break
      case 'bottomLeft':
        this.svg.attr({
          x: this.originalPoint.x - (this.startPoint.x - this.currentPoint.x),
          width: this.originalSize.width + (this.startPoint.x - this.currentPoint.x),
          height: this.originalSize.height + (this.currentPoint.y - this.startPoint.y)
        })
        break
      case 'left':
        this.svg.attr({
          x: this.originalPoint.x + (this.currentPoint.x - this.startPoint.x),
          width: this.originalSize.width + (this.startPoint.x - this.currentPoint.x),
        })
        break
    }
  }

  _onPointerup() {
    this.boxObj.changeState(BoxState.SELECTED)
  }
}
