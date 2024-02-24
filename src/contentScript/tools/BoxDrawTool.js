import { LitElement } from "lit"
import { customElement } from "lit/decorators.js";
import BoxDrawer from '../drawers/boxDrawer';

@customElement('box-draw-tool')
class BoxDrawTool extends LitElement {
  constructor() {
    super()
    this.drawer = new BoxDrawer(window.draw, {
      radiusThreshold: 40,
      radiusLarge: 10,
      radiusSmall: 5,
      offsetTowardsOutside: 5,
    })
    this.hasDragged = false
    this.pointDragStart = { x: -1, y: -1 }
    this.pointCurrent = { x: -1, y: -1 }
  }

  connectedCallback() {
    super.connectedCallback()

    this.onPointerDownCallback = this._onPointerDownCallback.bind(this)
    this.onPointerMoveCallback = this._onPointerMoveCallback.bind(this)
    this.onPointerUpCallback = this._onPointerUpCallback.bind(this)
    document.addEventListener("pointerdown", this.onPointerDownCallback)
    document.addEventListener("pointermove", this.onPointerMoveCallback)
    document.addEventListener("pointerup", this.onPointerUpCallback)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    document.removeEventListener("pointerdown", this.onPointerDownCallback)
    document.removeEventListener("pointermove", this.onPointerMoveCallback)
    document.removeEventListener("pointerup", this.onPointerUpCallback)
  }

  _onPointerDownCallback(event) {
    this.hasDragged = true
    const { clientX, clientY } = event
    this.pointDragStart.x = clientX
    this.pointDragStart.y = clientY
    this.pointCurrent.x = clientX
    this.pointCurrent.y = clientY
  }

  _onPointerMoveCallback(event) {
    if (!this.hasDragged) {
      return
    }

    if (this.pointDragStart.x !== -1) {
      this.drawer.eraseMarkFromTwoPoints(this.pointDragStart, this.pointCurrent)
    }

    const { clientX, clientY } = event
    this.pointCurrent.x = clientX
    this.pointCurrent.y = clientY

    this.drawer.drawMarkFromTwoPoints(this.pointDragStart, this.pointCurrent)
  }

  _onPointerUpCallback(event) {
    this.hasDragged = false
  }
}

export default BoxDrawTool
