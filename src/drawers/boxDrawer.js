class BoxDrawer {
  constructor(draw, options) {
    this.draw = draw
    this.options = options
    this.last = {}
  }

  drawHint(element) {
    this._createRect(element, { isHint: true })
  }

  drawMark(element) {
    if (element === this.last.element) {
      this._createRect(element, { isHint: false })
    }
  }

  erase(element) {
    if (element === this.last.element) {
      this.last.rect.remove()
    }
  }

  _createRect(element, options) {
    const { isHint } = options
    const { 
      radiusThreshold,
      radiusLarge,
      radiusSmall,
      offsetTowardsOutside,
     } = this.options
  
    const { top, left, width, height } = element.getBoundingClientRect()
    const radious =
      Math.min(width, height) < radiusThreshold ? radiusSmall : radiusLarge
  
    const rect = this.draw
      .rect(width + 2 * offsetTowardsOutside, height + 2 * offsetTowardsOutside)
      .radius(radious)
      .move(left - offsetTowardsOutside, top - offsetTowardsOutside)
      .stroke({ width: 5, color: '#f06' })
      .fill('none')
  
    if (isHint) {
      rect.opacity(0.5)
  
      this.last.element = element
      this.last.rect = rect
    }
  }
}

export default BoxDrawer