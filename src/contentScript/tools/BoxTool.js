import { debounce } from 'lodash';
import Tool from './Tool'
import BoxDrawer from '../drawers/boxDrawer';

class BoxTool extends Tool {
  constructor() {
    super()
    this.drawer = new BoxDrawer(window.draw, {
      radiusThreshold: 40,
      radiusLarge: 10,
      radiusSmall: 5,
      offsetTowardsOutside: 5,
    })
  }

  enter() {
    this.debouncedOnPointerOverCallback = this._debouncedOnPointerOver.bind(this)
    this.onPointerOutCallback = this._onPointerOut.bind(this)
    this.onPointerDownCallback = this._onPointerDown.bind(this)
    document.addEventListener("pointerover", this.debouncedOnPointerOverCallback)
    document.addEventListener("pointerout", this.onPointerOutCallback)
    document.addEventListener("pointerdown", this.onPointerDownCallback)
  }

  leave() {
    document.removeEventListener("pointerover", this.debouncedOnPointerOverCallback)
    document.removeEventListener("pointerout", this.onPointerOutCallback)
    document.removeEventListener("pointerdown", this.onPointerDownCallback)
  }

  // callback of showing hint when hover on any element
  _onPointerOver(event) {
    const target = event.target

    // ignore if over on toolboxs
    const toolbox = document.querySelector('tool-box')
    if (toolbox && toolbox.contains(target)) {
      return
    }

    this.drawer.drawHint(target)
  }

  _debouncedOnPointerOver = debounce(this._onPointerOver, 100)

  // callback of removing hint when move out on previous element
  _onPointerOut(event) {
    const target = event.target
    this.drawer.erase(target)
  }

  // callback of adding box to the drawer layer
  _onPointerDown(event) {
    event.stopImmediatePropagation()
    event.preventDefault()
    const target = event.target
    this.drawer.drawMark(target)
  }
}

export default BoxTool
