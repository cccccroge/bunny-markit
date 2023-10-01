import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { 
  fastButton,
  // fastToolbar, 
  provideFASTDesignSystem 
} from "@microsoft/fast-components";

// provideFASTDesignSystem()
//   .register(
//     fastButton(),
//   )

@customElement('tool-box')
export class ToolBox extends LitElement {
  render() {
    return html`
      <!-- <fast-toolbar> -->
        <div>hello</div>
      <!-- </fast-toolbar> -->
    `;
  }
}

export function showToolBox() {
  const element = document.createElement('tool-box')
  document.body.appendChild(element)
}
