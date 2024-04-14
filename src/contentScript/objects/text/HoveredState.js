import { TextState } from "./TextObject"

export class HoveredState {
  constructor(svg, textObj) {
    this.svg = svg
    this.textObj = textObj
  }

  setup(params) {
    console.log('become hovered')
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

    // TODO: this need be done in state
    // notify toolbox
    // const boxSelectedEvent = new CustomEvent('box-selected', {
    //   bubles: true,
    //   composed: true,
    //   detail: { svg: this.svg },
    // });
    // document.dispatchEvent(boxSelectedEvent)

    this.textObj.changeState(TextState.SELECTED)
  }
}
