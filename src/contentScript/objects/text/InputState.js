import { TextState } from "./TextObject"
import { SVG } from "@svgdotjs/svg.js"

export class InputState {
  constructor(svg, textObj) {
    this.svg = svg
    this.draw = window.draw
    this.textObj = textObj
    this.tspan = null
  }

  setup(params) {
    console.log('params: ', params)
    this.tspan = params.tspan
    this.switchToEditable()
  }

  teardown() {
    this.switchToText();
    this.tspan = null
  }

  onEditableBlur() {
    this.textObj.changeState(TextState.IDLE);
  }

  switchToEditable() {
    // construction
    const { x, y } = this.tspan.getBoundingClientRect();
    this.foreignContainer = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'foreignObject'
    );
    this.foreignContainer.setAttribute('x', x);
    this.foreignContainer.setAttribute('y', y);
    // TODO: need to handle dimension in another way...
    this.foreignContainer.setAttribute('width', 500);
    this.foreignContainer.setAttribute('height', 100);

    this.editable = document.createElement('div');
    this.editable.setAttribute('contenteditable', 'true');
    this.editable.innerHTML =
      this.tspan.textContent === '<__default__' ? '' : this.tspan.textContent; // initialized to empty will have hard time to adjust it's position, so make it some magic string
    this.editable.style =
      "color: red; outline: none; font-size: 24px; font-family: 'Noto Sans', sans-serif; cursor: text;";
    setTimeout(() => {
      this.editable.addEventListener('blur', this.onEditableBlur.bind(this));
    }, 0)

    // append editable & hide original
    this.foreignContainer.appendChild(this.editable);
    window.draw.node.appendChild(this.foreignContainer);
    this.originalText = SVG(this.tspan.parentElement);
    this.originalText.css({ display: 'none' });

    // start the edit
    this.editable.focus();
    const range = document.createRange();
    range.selectNodeContents(this.editable);
    range.collapse(false);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  switchToText() {
    // set text content back
    const newText = this.editable.textContent;
    this.originalText.text(newText);

    // show original & destroy editable
    this.originalText.css({ display: 'initial' });
    this.foreignContainer.remove();
  }
}
