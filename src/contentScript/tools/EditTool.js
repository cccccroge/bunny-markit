import { SVG } from "@svgdotjs/svg.js";
import Tool from "./Tool";

class EditTool extends Tool {
  enter() {
    window.draw.css({ 'pointer-events': 'initial' })

    this.onPointerOverCallback = this._onPointerOver.bind(this)
    this.onDblClickCallback = this._onDblClick.bind(this)
    document.addEventListener("dblclick", this.onDblClickCallback)
    document.addEventListener("pointerover", this.onPointerOverCallback)
  }

  leave() {
    window.draw.css({ 'pointer-events': 'none' })

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
      const { x, y, width, height } = target.getBoundingClientRect()
      const foreignContainer = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'foreignObject'
      )
      foreignContainer.setAttribute('x', x)
      foreignContainer.setAttribute('y', y)
      foreignContainer.setAttribute('width', width * 10)
      foreignContainer.setAttribute('height', height * 10)

      const div = document.createElement('div')
      div.setAttribute('contenteditable', 'true')
      div.innerHTML = target.textContent
      div.style="color: red; outline: none; font-size: 24px; font-family: 'Noto Sans', sans-serif;"

      // replace the original
      foreignContainer.appendChild(div)
      const drawElement = window.draw.node
      drawElement.appendChild(foreignContainer)

      const originalText = SVG(target.parentElement)
      originalText.css({ display: 'none' })

      // start the edit
      div.focus()
      const range = document.createRange()
      range.selectNodeContents(div)
      range.collapse(false)
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }
}

export default EditTool
