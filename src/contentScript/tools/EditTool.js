import "./InputTool";
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement('edit-tool')
class EditTool extends LitElement {
  connectedCallback() {
    super.connectedCallback()
    window.draw.css({ 'pointer-events': 'initial', cursor: 'default' })

    this.onPointerOverCallback = this._onPointerOver.bind(this)
    this.onDblClickCallback = this._onDblClick.bind(this)
    document.addEventListener("dblclick", this.onDblClickCallback)
    document.addEventListener("pointerover", this.onPointerOverCallback)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.draw.css({ 'pointer-events': 'none', cursor: 'initial' })

    document.removeEventListener("dblclick", this.onDblClickCallback)
    document.removeEventListener("pointerover", this.onPointerOverCallback)
  }

  setTextTarget(target) {
    this.textTarget = target
  }

  @state()
  textTarget = null

  render() {
    return html`
      ${this.textTarget
        ? html`
            <input-tool
              .tspan=${this.textTarget}
              @blur=${this._onInputToolBlur}
            >
            </input-tool>
          `
        : html``}
    `;
  }

  _onPointerOver(e) {
    // TODO: show object border here
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
