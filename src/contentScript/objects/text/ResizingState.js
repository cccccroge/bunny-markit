import { TextState } from "./TextObject"

export class ResizingState {
  constructor(svg, textObj) {
    this.svg = svg
    this.textObj = textObj
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
      x: svg.bbox().x,
      y: svg.bbox().y,
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
      x: this.svg.bbox().x,
      y: this.svg.bbox().y,
    }
    this.originalSize = {
      width: this.svg.bbox().width,
      height: this.svg.bbox().height,
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

    switch(this.control) {
      case 'topLeft': {
        // this.svg.attr({
        //   x: this.originalPoint.x - (this.startPoint.x - this.currentPoint.x),
        //   y: this.originalPoint.y - (this.startPoint.y - this.currentPoint.y),
        //   width: this.originalSize.width + (this.startPoint.x - this.currentPoint.x),
        //   height: this.originalSize.height + (this.startPoint.y - this.currentPoint.y)
        // })

        const dx = this.startPoint.x - this.currentPoint.x
        const dy = this.startPoint.y - this.currentPoint.y
        const delta = Math.pow(dx * dx + dy * dy, 0.5)
        console.log('factor: ', 1 + delta / this.originalSize.width)
        this.svg.scale(1 + delta / this.originalSize.width)

        break
      }
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
    this.textObj.changeState(TextState.SELECTED)
  }
}
