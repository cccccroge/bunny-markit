import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorator.js';

@customElement('popup-app')
export class PopupApp extends LitElement {
  static styles = css`
    /* normalize css starts here */
    *,
    *::before,
    *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    /* normalize css ends here */

    html {
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
        sans-serif;
      color: #222;
      width: 350px;
      height: 100px;
    }

    h1.title {
      margin-bottom: 10px;
    }
  `;

  render() {
    return html`
      <h1 class="title">Bunny Markit</h1>
    `
  };
}
