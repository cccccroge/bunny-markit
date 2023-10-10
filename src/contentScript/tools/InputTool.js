import { LitElement } from "lit";
import { SVG } from "@svgdotjs/svg.js";
import { customElement, property } from "lit/decorators.js";

@customElement('input-tool')
class InputTool extends LitElement {
  @property()
  tspan

  connectedCallback() {
    super.connectedCallback()
    this._switchToEditable()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this._switchToText()
  }

  _onEditableBlur(_e) {
    const event = new Event('blur', { bubles: true, composed: true })
    this.dispatchEvent(event)
  }

  _switchToEditable() {
    // construction
    const { x, y, width, height } = this.tspan.getBoundingClientRect()
    this.foreignContainer = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'foreignObject'
    )
    this.foreignContainer.setAttribute('x', x)
    this.foreignContainer.setAttribute('y', y)
    // TODO: need to handle dimension in another way...
    this.foreignContainer.setAttribute('width', width * 10)
    this.foreignContainer.setAttribute('height', height * 10)

    this.editable = document.createElement('div')
    this.editable.setAttribute('contenteditable', 'true')
    this.editable.innerHTML = this.tspan.textContent
    this.editable.style="color: red; outline: none; font-size: 24px; font-family: 'Noto Sans', sans-serif; cursor: text;"
    this.editable.addEventListener('blur', this._onEditableBlur.bind(this))

    // append editable & hide original
    this.foreignContainer.appendChild(this.editable)
    window.draw.node.appendChild(this.foreignContainer)
    this.originalText = SVG(this.tspan.parentElement)
    this.originalText.css({ display: 'none' })

    // start the edit
    this.editable.focus()
    const range = document.createRange()
    range.selectNodeContents(this.editable)
    range.collapse(false)
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
  }

  _switchToText() {
    // set text content back
    const newText = this.editable.textContent
    this.originalText.text(newText)

    // show original & destroy editable
    this.originalText.css({ display: 'initial' })
    this.foreignContainer.remove()
  }
}

export default InputTool
