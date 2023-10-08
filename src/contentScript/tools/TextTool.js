import Tool from "./Tool"

class TextTool extends Tool {
  enter() {
    if (document.body.style.cursor !== 'none') {
      document.body.style.cursor = 'none'
    }
    document.addEventListener("pointermove", this._onPointerOver)
    document.addEventListener("pointerdown", this._onPointerDown)
  }

  leave() {
    document.body.style.cursor = ''
    document.removeEventListener("pointermove", this._onPointerOver)
    document.removeEventListener("pointerdown", this._onPointerDown)
  }

  // callback of showing floating text hint
  _onPointerOver(event) {
    window.textDrawer.eraseLast()

    // ignore if over on toolboxs
    const toolbox = document.querySelector('tool-box')
    if (toolbox && toolbox.contains(event.target)) {
      return
    }

    const { clientX, clientY } = event
    window.textDrawer.drawHint({ x: clientX, y: clientY })
  }

  // callback of adding text to the drawer layer
  _onPointerDown(event) {
    event.stopImmediatePropagation()
    event.preventDefault()
    const { clientX, clientY } = event
    window.textDrawer.drawMark({ x: clientX, y: clientY })
  }
}

export default TextTool
