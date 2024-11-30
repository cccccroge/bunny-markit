import ArrowDrawer from '../drawers/arrowDrawer';
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('arrow-tool')
class ArrowTool extends LitElement {
  constructor() {
    super();
    this.drawer = new ArrowDrawer(window.draw);

    this.draggedState = 'none';
    this.pointDragStart = { x: -1, y: -1 };
    this.pointCurrent = { x: -1, y: -1 };
  }

  connectedCallback() {
    super.connectedCallback();

    this.onPointerDownCallback = this._onPointerDownCallback.bind(this);
    this.onPointerMoveCallback = this._onPointerMoveCallback.bind(this);
    this.onPointerUpCallback = this._onPointerUpCallback.bind(this);
    document.addEventListener('pointerdown', this.onPointerDownCallback);
    document.addEventListener('pointermove', this.onPointerMoveCallback);
    document.addEventListener('pointerup', this.onPointerUpCallback);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener('pointerdown', this.onPointerDownCallback);
    document.removeEventListener('pointermove', this.onPointerMoveCallback);
    document.removeEventListener('pointerup', this.onPointerUpCallback);
  }

  _onPointerDownCallback(event) {
    this.draggedState = 'start';
    const { clientX, clientY } = event;
    this.pointDragStart.x = clientX;
    this.pointDragStart.y = clientY;
    this.pointCurrent.x = clientX;
    this.pointCurrent.y = clientY;
  }

  _onPointerMoveCallback(event) {
    event.preventDefault();

    if (this.draggedState === 'none') {
      return;
    } else if (this.draggedState === 'start') {
      this.draggedState = 'progress';
    }

    if (this.pointDragStart.x !== -1) {
      this.drawer.erase(this.pointDragStart, this.pointCurrent);
    }

    const { clientX, clientY } = event;
    this.pointCurrent.x = clientX;
    this.pointCurrent.y = clientY;

    this.drawer.drawMark(this.pointDragStart, this.pointCurrent);
  }

  _onPointerUpCallback(event) {
    if (this.draggedState === 'start') {
      this.draggedState = 'none';
      return;
    }

    if (this.pointDragStart.x !== -1) {
      this.drawer.erase(this.pointDragStart, this.pointCurrent);
    }

    const { clientX, clientY } = event;
    this.pointCurrent.x = clientX;
    this.pointCurrent.y = clientY;

    this.drawer.drawMark(this.pointDragStart, this.pointCurrent, true);

    this.draggedState = 'none';
    this.pointDragStart = { x: -1, y: -1 };
    this.pointCurrent = { x: -1, y: -1 };
  }
}

export default ArrowTool;
