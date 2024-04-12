import { BoxState } from "./BoxObject"

// TODO: havn't done antyhing yet.
export class ResizingState {
  constructor(svg, boxObj) {
    this.svg = svg
    this.boxObj = boxObj

    this.isMoving = false
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
    console.log('enter SELECTED')
    this.svg.stroke({ color: '#fff' })
    window.draw.css({ cursor: 'grab' })

    this.onPointerdownCallback = this._onPointerdown.bind(this)
    this.onPointermoveCallback = this._onPointermove.bind(this)
    this.onPointerupCallback = this._onPointerup.bind(this)
    this.onClickOutsideCallback = this._onClickOutside.bind(this)
    this.onPointeroverCallback = this._onPointerover.bind(this)
    this.onPointeroutCallback = this._onPointerout.bind(this)
    this.svg.on('pointerdown', this.onPointerdownCallback)
    document.addEventListener('pointermove', this.onPointermoveCallback)
    document.addEventListener('pointerup', this.onPointerupCallback)
    document.addEventListener('pointerdown', this.onClickOutsideCallback)
    this.svg.on('pointerover', this.onPointeroverCallback)
    this.svg.on('pointerout', this.onPointeroutCallback)

    const { x, y } = params.initialPoint
    this.isMoving = true
    this.originalPoint = {
      x: this.svg.x(),
      y: this.svg.y(),
    }
    this.startPoint.x = x
    this.startPoint.y = y
    this.currentPoint.x = x
    this.currentPoint.y = y
  }

  teardown() {
    window.draw.css({ cursor: 'initial' })

    this.svg.off('pointerdown', this.onPointerdownCallback)
    document.a
    document.removeEventListener('pointermove', this.onPointermoveCallback)
    document.removeEventListener('pointerup', this.onPointerupCallback)
    document.removeEventListener('pointerdown', this.onClickOutsideCallback)
    this.svg.off('pointerover', this.onPointeroverCallback)
    this.svg.off('pointerout', this.onPointeroutCallback)
  }

  _onPointerdown(e) {
    e.stopPropagation()
    this.isMoving = true

    this.originalPoint = {
      x: this.svg.x(),
      y: this.svg.y(),
    }
    const { clientX, clientY } = e
    this.startPoint.x = clientX
    this.startPoint.y = clientY
    this.currentPoint.x = clientX
    this.currentPoint.y = clientY
  }

  _onPointermove(e) {
    const { clientX, clientY } = e

    if (this.isMoving) {
      this.currentPoint.x = clientX
      this.currentPoint.y = clientY

      this.svg.attr({
        x: this.originalPoint.x + this.currentPoint.x - this.startPoint.x,
        y: this.originalPoint.y + this.currentPoint.y - this.startPoint.y,
      })
    }
  }

  _onPointerup() {
    this.isMoving = false
    window.draw.css({ cursor: 'initial' })
  }

  _onClickOutside() {
    this.boxObj.changeState(BoxState.IDLE)
  }

  _onPointerover() {
    window.draw.css({ cursor: 'grab' })
  }

  _onPointerout() {
    window.draw.css({ cursor: 'initial' })
  }
}
