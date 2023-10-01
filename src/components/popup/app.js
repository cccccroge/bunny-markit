import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { 
  fastButton, 
  provideFASTDesignSystem 
} from "@microsoft/fast-components";

provideFASTDesignSystem()
  .register(
    fastButton()
  );

@customElement('popup-app')
export class PopupApp extends LitElement {
  @state({ type: String })
  _activated = 'false';

  static styles = css`
    h1 {
      color: black;
    }
  `;

  async connectedCallback() {
    super.connectedCallback()
    const activated = await this._getAcivatedFromTab()
    if (activated) {
      this._activated = activated
    }
  }

  getButton() {
    if (this._activated === 'true') {
      return html`
        <fast-button @click="${this._onTakeScreenShot}">Take Screenshot</fast-button>
      `
    } else {
      return html`
        <fast-button @click="${this._onStartDrawing}">Start Drawing</fast-button>
      `
    }
  }

  render() {
    return html`
      <h1>Bunny Markit</h1>
      ${this.getButton()}
    `
  };

  async _onStartDrawing(_e) {
    const [tab] = await chrome.tabs.query({ active: true });
    const res = await chrome.tabs.sendMessage(tab.id, 'ACTIVATE');
    if (res === 'OK') {
      window.close()
    }
  }

  async _onTakeScreenShot(_e) {
    const [tab] = await chrome.tabs.query({ active: true });
    const res = await chrome.tabs.sendMessage(tab.id, 'TAKE_SCREENSHOT');
    if (res === 'OK') {
      window.close()
    }
  }

  async _getAcivatedFromTab() {
    const [tab] = await chrome.tabs.query({ active: true });
    const res = await chrome.tabs.sendMessage(tab.id, 'ASK_IS_ACTIVATED')
    return res
  }
}
