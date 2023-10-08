import Tool from "./Tool";

class EditTool extends Tool {
  enter() {
    window.draw.css({ 'pointer-events': 'initial' })

    this.onPointerOverCallback = this._onPointerOver.bind(this)
    document.addEventListener("pointerover", this.onPointerOverCallback)
  }

  leave() {
    window.draw.css({ 'pointer-events': 'none' })

    document.removeEventListener("pointerover", this.onPointerOverCallback)
  }

  _onPointerOver(e) {
    console.log(e.target)
  }
}

export default EditTool
