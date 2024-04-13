import { BoxState } from "./BoxObject"

export class IdleState {
  constructor(svg, boxObj) {
    this.svg = svg
    this.draw = window.draw
    this.boxObj = boxObj
  }

  setup() {
    this.svg.stroke({ color: '#f06' })

    const x = this.svg.x()
    const y = this.svg.y()
    const width = this.svg.width()
    const height = this.svg.height()

    this.hoveredRegion = this.draw
      .rect(width, height)
      .move(x, y)
      .stroke({ width: 10, color: '#000000' })
      .fill('none')
      .opacity(0)

    this.onPointeroverCallback = this._onPointerover.bind(this)
    this.hoveredRegion.on('pointerover', this.onPointeroverCallback)
  }

  teardown() {
    this.hoveredRegion.off('pointerover', this.onPointeroverCallback)
  }

  _onPointerover() {
    this.boxObj.changeState(BoxState.HOVERED, { hoveredRegion: this.hoveredRegion })
  }
}
