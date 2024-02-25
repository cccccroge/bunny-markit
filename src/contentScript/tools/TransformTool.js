import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('transform-tool')
class TransformTool extends LitElement {
  @property()
  svgs

  connectedCallback() {
    super.connectedCallback()
    this.onKeydownCallback = this._onKeydownCallback.bind(this)
    document.addEventListener('keydown', this.onKeydownCallback)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    document.removeEventListener('keydown', this.onKeydownCallback)
  }

  _onKeydownCallback(event) {
    if (event.key === 'Backspace') {
      this.svgs.forEach(svg => {
        svg.remove()
      })
    }
  }
}

export default TransformTool;
