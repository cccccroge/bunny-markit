import { debounce } from 'lodash';
import Tool from './Tool'

class BoxTool extends Tool {
  constructor() {
    super()    
  }

  enter() {
    document.addEventListener("pointerover", this._debouncedOnPointerOver)
    document.addEventListener("pointerout", this._onPointerOut)
    document.addEventListener("pointerdown", this._onPointerDown)
  }

  leave() {
    document.removeEventListener("pointerover", this._debouncedOnPointerOver)
    document.removeEventListener("pointerout", this._onPointerOut)
    document.removeEventListener("pointerdown", this._onPointerDown)
  }

  // callback of showing hint when hover on any element
  _onPointerOver(event) {
    const target = event.target

    // ignore if over on toolboxs
    const toolbox = document.querySelector('tool-box')
    if (toolbox && toolbox.contains(target)) {
      return
    }

    window.boxDrawer.drawHint(target)
  }

  _debouncedOnPointerOver = debounce(this._onPointerOver, 100)

  // callback of removing hint when move out on previous element
  _onPointerOut(event) {
    const target = event.target
    window.boxDrawer.erase(target)
  }

  // callback of adding box to the drawer layer
  _onPointerDown(event) {
    event.stopImmediatePropagation()
    event.preventDefault()
    const target = event.target
    window.boxDrawer.drawMark(target)
  }
}

export default BoxTool
