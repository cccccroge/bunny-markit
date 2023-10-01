import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
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
  @property({ type: Boolean })
  clicked = false;

  static styles = css`
    h1 {
      color: red;
    }
  `;

  render() {
    return html`
      <h1>Bunny Markitt</h1>
      <p>hello! ${this.name}</p>
      <fast-button>Hello world</fast-button>
    `
  };
}
