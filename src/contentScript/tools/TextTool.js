import Tool from "./Tool"
import TextDrawer from "../drawers/textDrawer"

class TextTool extends Tool {
  constructor() {
    super()
    this.drawer = new TextDrawer(window.draw, {
      defaultText: 'Text',
      fontSize: 24,
      fontFamily: "'Noto Sans', sans-serif",
    })    
  }

  enter() {
    if (document.body.style.cursor !== 'none') {
      document.body.style.cursor = 'none'
    }
    this.onPointOverCallback = this._onPointerOver.bind(this)
    this.onPointerDownCallback = this._onPointerDown.bind(this)
    document.addEventListener("pointermove", this.onPointOverCallback)
    document.addEventListener("pointerdown", this.onPointerDownCallback)
  }

  leave() {
    document.body.style.cursor = ''
    document.removeEventListener("pointermove", this.onPointOverCallback)
    document.removeEventListener("pointerdown", this.onPointerDownCallback)
  }

  // callback of showing floating text hint
  _onPointerOver(event) {
    this.drawer.eraseLast()

    // ignore if over on toolboxs
    const toolbox = document.querySelector('tool-box')
    if (toolbox && toolbox.contains(event.target)) {
      return
    }

    const { clientX, clientY } = event
    this.drawer.drawHint({ x: clientX, y: clientY })
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
