import { BoxState } from "./BoxObject"

export class HoveredState {
  constructor(svg, boxObj) {
    this.svg = svg
    this.boxObj = boxObj
  }

  setup(params) {
    this.svg.stroke({ color: '#e06666' })
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
    this.boxObj.changeState(BoxState.IDLE)
  }

  _onPointerdown(e) {
    e.stopPropagation()
    const { clientX, clientY } = e

    // TODO: this need to be done in state
    // notify toolbox
    const boxSelectedEvent = new CustomEvent('box-selected', {
      bubles: true,
      composed: true,
      detail: { svg: this.svg },
    });
    document.dispatchEvent(boxSelectedEvent)

    this.boxObj.changeState(BoxState.MOVING, { x: clientX, y: clientY })
  }
}
