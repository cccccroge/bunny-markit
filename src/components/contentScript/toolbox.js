import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement('tool-box')
export class ToolBox extends LitElement {
  render() {
    return html`
      <sl-button>Box</sl-button>
      <sl-button>Text</sl-button>
    `;
  }
}

export function showToolBox() {
  const element = document.createElement('tool-box')
  document.body.appendChild(element)
}
