import Tool from "./Tool";
import InputTool from "./InputTool";

class EditTool extends Tool {
  enter() {
    window.draw.css({ 'pointer-events': 'initial', cursor: 'default' })

    this.onPointerOverCallback = this._onPointerOver.bind(this)
    this.onDblClickCallback = this._onDblClick.bind(this)
    document.addEventListener("dblclick", this.onDblClickCallback)
    document.addEventListener("pointerover", this.onPointerOverCallback)
  }

  leave() {
    window.draw.css({ 'pointer-events': 'none', cursor: 'initial' })

    document.removeEventListener("dblclick", this.onDblClickCallback)
    document.removeEventListener("pointerover", this.onPointerOverCallback)
  }

  _onPointerOver(e) {
    // console.log('pointer over: ', e.target)
  }

  _onDblClick(e) {
    const target = e.target

    if (target.tagName === 'tspan') {
      // create editable element
      const inputTool = new InputTool(target)
      inputTool.enter()
    }
  }
}

export default EditTool
