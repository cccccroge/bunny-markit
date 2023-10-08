import Tool from "./Tool"
import TextDrawer from "../drawers/textDrawer"

class TextTool extends Tool {
  constructor() {
    super()
    this.drawer = new TextDrawer(window.draw, {
      defaultText: 'Test',
      fontSize: 24,
      fontFamily: "'Noto Sans', sans-serif",
    })    
  }

  enter() {
    if (document.body.style.cursor !== 'input') {
      document.body.style.cursor = 'input'
    }
    this.onPointerDownCallback = this._onPointerDown.bind(this)
    document.addEventListener("pointerdown", this.onPointerDownCallback)
  }

  leave() {
    document.body.style.cursor = ''
    document.removeEventListener("pointerdown", this.onPointerDownCallback)
  }

  // callback of adding text to the drawer layer
  _onPointerDown(event) {
    event.stopImmediatePropagation()
    event.preventDefault()
    const { clientX, clientY } = event
    this.drawer.drawMark({ x: clientX, y: clientY })
  }
}

export default TextTool
