import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { createRef, ref } from "lit/directives/ref.js"
import './tools/BoxSnapTool'
import './tools/BoxDrawTool'
import './tools/TextTool'
import './tools/EditTool'
import '@shoelace-style/shoelace/dist/components/button-group/button-group.js'
import '@shoelace-style/shoelace/dist/components/tab/tab.js'
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';

@customElement('tool-box')
export class ToolBox extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      bottom: 10%;
      left: 50%;
      text-align: center;
      transform: translate(-50%, -50%);
      z-index: 1000000;
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
    .dropdown-menu sl-icon {
      font-size: 1.5rem;
    }
  `;

  constructor() {
    super()
  }

  TOOL = {
    NONE: 'none',
    EDIT: 'edit',
    BOX_SNAP: 'box-snap',
    BOX_DRAW: 'box-draw',
    TEXT: 'text',
  }

  editRef = createRef()

  @state()
  activatedTool = this.TOOL.NONE
  boxLastSelected = this.TOOL.BOX_SNAP

  render() {
    return html`
      <sl-button-group label="Alignment" class="tool-box-group">
        <sl-tooltip content="Edit(E)">
          <sl-icon-button
            name="pencil-square"
            class="button${this.activatedTool === this.TOOL.EDIT
              ? ' selected'
              : ''}"
            @click="${this._onEditClick}"
          >
            Edit
          </sl-icon-button>
        </sl-tooltip>
        <sl-tooltip content="Box(B)">
          <sl-dropdown>
            <sl-icon-button
              name="${this._getBoxIconName()}"
              slot="trigger"
              caret
              class="button${this.activatedTool === this.TOOL.BOX_SNAP || this.activatedTool === this.TOOL.BOX_DRAW
                ? ' selected'
                : ''}"
            >
              Box
            </sl-icon-button>
            <sl-menu class="dropdown-menu">
              <sl-menu-item @click="${this._onBoxSnapClick}"
                >Snap<sl-icon slot="prefix" name="card-text"></sl-icon></sl-menu-item
              >
              <sl-menu-item @click="${this._onBoxDrawClick}"
                >Draw<sl-icon slot="prefix" name="app"></sl-icon></sl-menu-item
              >
            </sl-menu>
          </sl-dropdown>
        </sl-tooltip>
        <sl-tooltip content="Text(T)">
          <sl-icon-button
            name="type"
            class="button${this.activatedTool === this.TOOL.TEXT
              ? ' selected'
              : ''}"
            @click="${this._onTextClick}"
          >
            Text
          </sl-icon-button>
        </sl-tooltip>
        <sl-tooltip content="Text(T)">
          <sl-icon-button
            name="type"
            class="button${this.activatedTool === this.TOOL.NONE
              ? ' selected'
              : ''}"
            @click="${this._onNoneClick}"
          >
            None
          </sl-icon-button>
        </sl-tooltip>
      </sl-button-group>
      ${this._getActivatedTool()}
    `;
  }

  _getActivatedTool() {
    switch(this.activatedTool) {
      case this.TOOL.EDIT:
        return html `
          <edit-tool ${ref(this.editRef)}></edit-tool>
        `
      case this.TOOL.BOX_SNAP:
        return html `
          <box-snap-tool></box-snap-tool>
        `
      case this.TOOL.BOX_DRAW:
        return html `
          <box-draw-tool></box-draw-tool>
        `
      case this.TOOL.TEXT:
        return html `
          <text-tool></text-tool>
        `
      case this.TOOL.NONE:
        return html ``
      default:
        throw new Error('Invalid tool: ', this.activatedTool)
    }
  }

  _getBoxIconName() {
    const map = {
      [this.TOOL.BOX_SNAP]: 'card-text',
      [this.TOOL.BOX_DRAW]: 'app',
    }
    return map[this.activatedTool] || map[this.boxLastSelected]
  }

  _onEditClick() {
    this.activatedTool = this.TOOL.EDIT
  }

  _onBoxSnapClick() {
    this.activatedTool = this.TOOL.BOX_SNAP
    this.boxLastSelected = this.TOOL.BOX_SNAP
  }

  _onBoxDrawClick() {
    this.activatedTool = this.TOOL.BOX_DRAW
    this.boxLastSelected = this.TOOL.BOX_DRAW
  }

  _onTextClick() {
    this.activatedTool = this.TOOL.TEXT
  }

  _onNoneClick() {
    this.activatedTool = this.TOOL.NONE
  }
}

export function showToolBox() {
  const element = document.createElement('tool-box')
  document.body.appendChild(element)
}
