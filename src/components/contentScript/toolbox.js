import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { enableBox, disableBox } from './tools/box'
import { enableText, disableText } from './tools/text'
import '@shoelace-style/shoelace/dist/components/button-group/button-group.js'
import '@shoelace-style/shoelace/dist/components/tab/tab.js'
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
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
    .tool-box-group {
      background-color: var(--sl-color-neutral-50);
      border-radius: var(--sl-border-radius-pill);
      box-shadow: 0 2px 8px hsl(240 3.8% 46.1% / 50%);
      padding: var(--sl-spacing-2x-small) var(--sl-spacing-small);
    }
    .button {
      font-size: 2rem;
      border-radius: var(--sl-border-radius-circle);
    }
    .button:hover {
      background: var(--sl-color-neutral-200);
    }
    .button.selected {
      background: var(--sl-color-neutral-200);
    }
    .button.selected svg {
      /* fill: var(--sl-color-primary-50); */
    }
  `;

  TOOL = {
    NONE: 'none',
    BOX: 'box',
    TEXT: 'text',
  }

  @state()
  activatedTool = this.TOOL.NONE

  render() {
    return html`
      <sl-button-group label="Alignment" class="tool-box-group">
        <sl-tooltip content="Box(B)">
          <sl-icon-button
            name="app"
            class="button${this.activatedTool === this.TOOL.BOX ? ' selected' : ''}"
            @click="${this._onBoxClick}"
          >
            Box
          </sl-icon-button>
        </sl-tooltip>
        <sl-tooltip content="Text(T)">
          <sl-icon-button
            name="type"
            class="button${this.activatedTool === this.TOOL.TEXT ? ' selected' : ''}"
            @click="${this._onTextClick}"
          >
            Text
          </sl-icon-button>
        </sl-tooltip>
      </sl-button-group>
    `;
  }

  _onBoxClick() {
    this.activatedTool = this.TOOL.BOX
    disableText()
    enableBox()
  }

  _onTextClick() {
    this.activatedTool = this.TOOL.TEXT
    enableText()
    disableBox()
  }
}

export function showToolBox() {
  const element = document.createElement('tool-box')
  document.body.appendChild(element)
}
