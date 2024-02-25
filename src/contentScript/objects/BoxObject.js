const STATUS = {
  UNSELECTED: 'unselected',
  HOVERED: 'hovered',
  SELECTED: 'selected',
}

export class BoxObject {
  constructor(svg) {
    this.svg = svg
    this.status = STATUS.UNSELECTED
    this._setupCallbacks()
  }

  _redraw() {
    if (this.status === STATUS.SELECTED) {
      this.svg.stroke({ color: '#fff' })
    } else if (this.status === STATUS.HOVERED) {
      this.svg.stroke({ color: '#fff' })
    } else {
      this.svg.stroke({ color: '#f06' })
    }
  }

  _setupCallbacks() {
    this.svg.on('pointerover', () => {
      if (this.status === STATUS.SELECTED) {
        return
      }
      this.status = STATUS.HOVERED
      this._redraw()
    })
    this.svg.on('pointerdown', (e) => {
      this.status = STATUS.SELECTED
      this._redraw()
      e.stopPropagation()

      const boxSelectedEvent = new CustomEvent('box-selected', {
        bubles: true,
        composed: true,
        detail: { svg: this.svg },
      });
      document.dispatchEvent(boxSelectedEvent)
    })
    this.svg.on('pointerout', () => {
      if (this.status === STATUS.HOVERED) {
        this.status = STATUS.UNSELECTED
        this._redraw()
      }
    })
    document.addEventListener('pointerdown', () => {
      if (this.status === STATUS.SELECTED) {
        this.status = STATUS.UNSELECTED
        this._redraw()
      }
    })
  }
}
