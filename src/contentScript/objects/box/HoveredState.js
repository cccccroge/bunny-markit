import { BoxState } from "./BoxObject"

export class HoveredState {
  constructor(svg, boxObj) {
    this.svg = svg
    this.boxObj = boxObj
  }

  setup() {
    this.svg.stroke({ color: '#fff' })
    window.draw.css({ cursor: 'grab' })

    this.onPointeroutCallback = this._onPointerout.bind(this)
    this.onPointerdownCallback = this._onPointerdown.bind(this)
    this.svg.on('pointerout', this.onPointeroutCallback)
    this.svg.on('pointerdown', this.onPointerdownCallback)
  }

  teardown() {
    window.draw.css({ cursor: 'initial' })
    this.svg.off('pointerout', this.onPointeroutCallback)
    this.svg.off('pointerdown', this.onPointerdownCallback)
  }

  _onPointerout() {
    this.boxObj.changeState(BoxState.IDLE)
  }

  _onPointerdown(e) {
    e.stopPropagation()

    // notify toolbox
    const boxSelectedEvent = new CustomEvent('box-selected', {
      bubles: true,
      composed: true,
      detail: { svg: this.svg },
    });
    document.dispatchEvent(boxSelectedEvent)

    this.boxObj.changeState(
      BoxState.SELECTED,
      {
        initialPoint: { x: e.clientX, y: e.clientY },
      }
    )
  }
}
