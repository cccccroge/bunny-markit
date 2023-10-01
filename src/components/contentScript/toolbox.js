import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators";
import { 
  fastButton,
  fastToolbar, 
  provideFASTDesignSystem 
} from "@microsoft/fast-components";

provideFASTDesignSystem()
  .register(
    fastButton(),
    fastToolbar(),
  )

@customElement('tool-box')
export class ToolBox extends LitElement {
  render() {
    return html`
      <fast-toolbar>
        <fast-button>Box</fast-button>
        <fast-button>Text</fast-button>
      </fast-toolbar>
    `;
  }
}
