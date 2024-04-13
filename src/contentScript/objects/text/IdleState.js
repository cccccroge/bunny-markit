import { TextState } from "./TextObject"

export class IdleState {
  constructor(svg, textObj) {
    this.svg = svg
    this.draw = window.draw
    this.textObj = textObj
  }

  setup() {
    this.svg.fill({ color: '#f06' })
    console.log('become idle')

    const { x, y, width, height } = this.svg.bbox()

    this.hoveredRegion = this.draw
      .rect(width, height)
      .move(x, y)
      .fill('#ffffff')
      .opacity(0)

    this.onPointeroverCallback = this._onPointerover.bind(this)
    this.hoveredRegion.on('pointerover', this.onPointeroverCallback)
  }

  teardown() {
    this.hoveredRegion.off('pointerover', this.onPointeroverCallback)
  }

  _onPointerover() {
    this.textObj.changeState(TextState.HOVERED, { hoveredRegion: this.hoveredRegion })
  }
}
