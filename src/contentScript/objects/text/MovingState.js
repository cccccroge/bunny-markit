import { TextState } from "./TextObject"

export class MovingState {
  constructor(svg, textObj) {
    this.svg = svg
    this.textObj = textObj

    this.dragStartPosition = {
      x: -1,
      y: -1,
    }
    this.currentPosition = {
      x: -1,
      y: -1,
    }
    this.initialTextCenterPosition = {
      x: this.svg.cx(),
      y: this.svg.cy(),
    }
  }

  setup(params) {
    this.svg.fill({ color: '#f06' })
    this.initPositions(params)

    this.onPointermoveCallback = this._onPointermove.bind(this)
    this.onPointerupCallback = this._onPointerup.bind(this)
    document.addEventListener('pointermove', this.onPointermoveCallback)
    document.addEventListener('pointerup', this.onPointerupCallback)
  }

  initPositions(params) {
    const { x, y } = params
    this.initialTextCenterPosition = {
      x: this.svg.cx(),
      y: this.svg.cy(),
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
    e.preventDefault()

    const { clientX, clientY } = e

    this.currentPosition.x = clientX
    this.currentPosition.y = clientY


    this.svg.cx(this.initialTextCenterPosition.x + this.currentPosition.x - this.dragStartPosition.x)
    this.svg.cy(this.initialTextCenterPosition.y + this.currentPosition.y - this.dragStartPosition.y)
  }

  _onPointerup() {
    this.textObj.changeState(TextState.SELECTED)
  }
}
