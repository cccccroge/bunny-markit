import { BoxObject } from "../objects/BoxObject"

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
    if (!element === this.last.element) {
      return
    }
    const rect = this._createRect(element, { isHint: false })
    new BoxObject(rect)
  }

  erase(element) {
    if (element === this.last.element) {
      this.last.rect.remove()
    }
  }

  drawMarkFromTwoPoints(pointA, pointB) {
    const { x: x1, y: y1 } = pointA
    const { x: x2, y: y2 } = pointB
    const width = Math.abs(x1 - x2)
    const height = Math.abs(y1 - y2)
    const left = Math.min(x1, x2)
    const top = Math.min(y1, y2)

    const rect = this.draw
      .rect(width, height)
      .radius(5)
      .move(left, top)
      .stroke({ width: 5, color: '#f06' })
      .fill('none')

    this.last.rect = rect
    this.last.pointA = pointA
    this.last.pointB = pointB

    new BoxObject(rect)
  }

  eraseMarkFromTwoPoints(pointA, pointB) {
    if (!this.last.pointA || !this.last.pointB) {
      return
    }
    if (
      pointA.x === this.last.pointA.x &&
      pointA.y === this.last.pointA.y &&
      pointB.x === this.last.pointB.x &&
      pointB.y === this.last.pointB.y
    ) {
      this.last.rect.remove();
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

    return rect
  }
}

export default BoxDrawer
