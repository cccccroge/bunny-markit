import { TextState } from "./TextObject"

export class HoveredState {
  constructor(svg, textObj) {
    this.svg = svg
    this.textObj = textObj
  }

  setup(params) {
    this.svg.fill({ color: '#e06666' })
    this.hoveredRegion = params.hoveredRegion

    window.draw.css({ cursor: 'grab' })

    this.onPointeroutCallback = this._onPointerout.bind(this)
    this.onPointerdownCallback = this._onPointerdown.bind(this)
    this.hoveredRegion.on('pointerout', this.onPointeroutCallback)
    this.hoveredRegion.on('pointerdown', this.onPointerdownCallback)
  }

  teardown() {
    window.draw.css({ cursor: 'initial' })

    this.hoveredRegion.off('pointerout', this.onPointeroutCallback)
    this.hoveredRegion.off('pointerdown', this.onPointerdownCallback)
  }

  _onPointerout() {
    this.textObj.changeState(TextState.IDLE)
  }

  _onPointerdown(e) {
    e.stopPropagation()
    const { clientX, clientY } = e
    this.textObj.changeState(TextState.MOVING, { x: clientX, y: clientY })
  }
}
