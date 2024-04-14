import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement('edit-tool')
class EditTool extends LitElement {
  connectedCallback() {
    super.connectedCallback()
    window.draw.css({ 'pointer-events': 'initial', cursor: 'default' })
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.draw.css({ 'pointer-events': 'none', cursor: 'initial' })
  }

  @state()
  selectedSvgs = []

  render() {
    return html``;
  }
}

export default EditTool
