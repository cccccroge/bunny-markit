import "./InputTool";
import "./TransformTool"
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement('edit-tool')
class EditTool extends LitElement {
  connectedCallback() {
    super.connectedCallback()
    window.draw.css({ 'pointer-events': 'initial', cursor: 'default' })

    this.onDblClickCallback = this._onDblClick.bind(this)
    document.addEventListener("dblclick", this.onDblClickCallback)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.draw.css({ 'pointer-events': 'none', cursor: 'initial' })

    document.removeEventListener("dblclick", this.onDblClickCallback)
  }

  setTextTarget(target) {
    this.textTarget = target
  }

  addSelectedSvgs(svg) {
    this.selectedSvgs = [...this.selectedSvgs, svg]
  }

  @state()
  textTarget = null

  @state()
  selectedSvgs = []

  render() {
    return html`
      ${this._getTool()}
    `;
  }

  _getTool() {
    if (this.textTarget) {
      return html`
        <input-tool
          .tspan=${this.textTarget}
          @blur=${this._onInputToolBlur}
        >
        </input-tool>
      `
    }
    if (this.selectedSvgs.length > 0) {
      return html`
        <transform-tool
          .svgs=${this.selectedSvgs}
        >
        </transform-tool>
      `
    }

    return html``
  }

  _onDblClick(e) {
    const target = e.target

    if (target.tagName === 'tspan') {
      this.textTarget = target
    }
  }

  _onInputToolBlur() {
    this.textTarget = null
  }
}

export default EditTool
