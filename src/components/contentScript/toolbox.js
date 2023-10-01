import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
// import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/button-group/button-group.js'
import '@shoelace-style/shoelace/dist/components/tab/tab.js'
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

@customElement('tool-box')
export class ToolBox extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      bottom: 10%;
      left: 50%;
      text-align: center;
      transform: translate(-50%, -50%);
    }
  `;

  render() {
    return html`
      <sl-button-group label="Alignment">
        <sl-icon-button name="app" style="font-size: 3rem">Text</sl-icon-button>
        <sl-icon-button name="type" style="font-size: 3rem">Text</sl-icon-button>
      </sl-button-group>
    `;
  }
}

export function showToolBox() {
  const element = document.createElement('tool-box')
  document.body.appendChild(element)
}
