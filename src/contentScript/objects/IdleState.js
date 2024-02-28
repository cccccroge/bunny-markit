import { BoxState } from "./BoxObject"

export class IdleState {
  constructor(svg, boxObj) {
    this.svg = svg
    this.boxObj = boxObj
  }

  setup() {
    this.svg.stroke({ color: '#f06' })

    this.onPointeroverCallback = this._onPointerover.bind(this)
    this.svg.on('pointerover', this.onPointeroverCallback)
  }

  teardown() {
    this.svg.off('pointerover', this.onPointeroverCallback)
  }

  _onPointerover() {
    this.boxObj.changeState(BoxState.HOVERED)
  }
}
