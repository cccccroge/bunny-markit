import TextDrawer from "../drawers/textDrawer"
import { LitElement } from "lit"
import { customElement } from "lit/decorators.js"

@customElement('text-tool')
class TextTool extends LitElement {
  constructor() {
    super()
    this.drawer = new TextDrawer(window.draw, {
      defaultText: '<__default__>',
      fontSize: 24,
      fontFamily: "'Noto Sans', sans-serif",
    })    
  }

  connectedCallback() {
    super.connectedCallback()
    if (document.body.style.cursor !== 'text') {
      document.body.style.cursor = 'text'
    }
    this.onPointerDownCallback = this._onPointerDown.bind(this)
    document.addEventListener("pointerdown", this.onPointerDownCallback)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    document.body.style.cursor = ''
    document.removeEventListener("pointerdown", this.onPointerDownCallback)
  }

  // callback of adding text to the drawer layer
  _onPointerDown(event) {
    event.stopImmediatePropagation()
    event.preventDefault()
    const { clientX, clientY } = event
    const drawSvg = this.drawer.drawMark({ x: clientX, y: clientY })

    // edit it (go input tool) directly after created
    const textCreatedEvent = new CustomEvent('text-created', {
      bubles: true,
      composed: true,
      detail: { textTarget: drawSvg.node.firstChild },
    });
    this.dispatchEvent(textCreatedEvent)    
  }
}

export default TextTool
