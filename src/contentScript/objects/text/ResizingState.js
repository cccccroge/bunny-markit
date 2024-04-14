import { TextState } from "./TextObject"

export class ResizingState {
  constructor(svg, textObj) {
    this.svg = svg
    this.textObj = textObj
    this.control = null

    this.startPoint = {
      x: -1,
      y: -1,
    }
    this.currentPoint = {
      x: -1,
      y: -1,
    }
    this.originalPoint = {
      x: svg.bbox().x,
      y: svg.bbox().y,
    }
  }

  setup(params) {
    this.initializePositions(params)

    this.onPointermoveCallback = this._onPointermove.bind(this)
    this.onPointerupCallback = this._onPointerup.bind(this)

    document.addEventListener('pointermove', this.onPointermoveCallback)
    document.addEventListener('pointerup', this.onPointerupCallback)
  }

  teardown() {
    document.removeEventListener('pointermove', this.onPointermoveCallback)
    document.removeEventListener('pointerup', this.onPointerupCallback)
  }

  initializePositions(params) {
    const { x, y, control } = params

    this.control = control
    this.initialTextCenterPosition = {
      x: this.svg.cx(),
      y: this.svg.cy(),
    }
    this.originalSize = {
      width: this.svg.bbox().width,
      height: this.svg.bbox().height,
    }
    this.originalFontSize = this.svg.font()['font-size']
    this.startPoint = {
      x: x,
      y: y,
    }
    this.currentPoint = {
      x: x,
      y: y,
    }
  }

  _onPointermove(e) {
    const { clientX, clientY } = e

    this.currentPoint.x = clientX
    this.currentPoint.y = clientY

    switch(this.control) {
      case 'topLeft': {
        // new font size = initial font size * (new diagonal length / initial diagonal length)
        const initialDiagonalLength =
          Math.sqrt(Math.pow(this.originalSize.width, 2) + Math.pow(this.originalSize.height, 2))
        const dx = this.startPoint.x - this.currentPoint.x
        const dy = this.startPoint.y - this.currentPoint.y
        const delta_diagonal = Math.pow(dx * dx + dy * dy, 0.5) * (dx < 0 && dy < 0 ? -1 : 1)
        const factor = (initialDiagonalLength + delta_diagonal) / initialDiagonalLength
        this.svg.font({ size: this.originalFontSize * factor })

        // move center point so that it looks like bottom right is fixed
        // dx, dy need to be re-calculate since resizing is fixed ratio
        const dx_actual = delta_diagonal * (this.originalSize.width / initialDiagonalLength)
        const dy_actual = delta_diagonal * (this.originalSize.height / initialDiagonalLength)
        this.svg.cx(this.initialTextCenterPosition.x - dx_actual / 2)
        this.svg.cy(this.initialTextCenterPosition.y - dy_actual / 2)
        break
      }
      case 'top': {
        // new font size = initial font size * (new height / initial height)
        const height = this.originalSize.height
        const dy = this.startPoint.y - this.currentPoint.y
        const factor = (height + dy) / height
        this.svg.font({ size: this.originalFontSize * factor })

        // move center point so that it looks like bottom is fixed
        this.svg.cx(this.initialTextCenterPosition.x)
        this.svg.cy(this.initialTextCenterPosition.y - dy / 2)
        break
      }
      case 'topRight': {
        // new font size = initial font size * (new diagonal length / initial diagonal length)
        const initialDiagonalLength =
          Math.sqrt(Math.pow(this.originalSize.width, 2) + Math.pow(this.originalSize.height, 2))
        const dx = this.currentPoint.x - this.startPoint.x
        const dy = this.startPoint.y - this.currentPoint.y
        const delta_diagonal = Math.pow(dx * dx + dy * dy, 0.5) * (dx < 0 && dy < 0 ? -1 : 1)
        const factor = (initialDiagonalLength + delta_diagonal) / initialDiagonalLength
        this.svg.font({ size: this.originalFontSize * factor })

        // move center point so that it looks like bottom left is fixed
        // dx, dy need to be re-calculate since resizing is fixed ratio
        const dx_actual = delta_diagonal * (this.originalSize.width / initialDiagonalLength)
        const dy_actual = delta_diagonal * (this.originalSize.height / initialDiagonalLength)
        this.svg.cx(this.initialTextCenterPosition.x + dx_actual / 2)
        this.svg.cy(this.initialTextCenterPosition.y - dy_actual / 2)
        break
      }
      case 'right': {
        // new font size = initial font size * (new width / initial width)
        const width = this.originalSize.width
        const dx = this.currentPoint.x - this.startPoint.x
        const factor = (width + dx) / width
        this.svg.font({ size: this.originalFontSize * factor })

        // move center point so that it looks like left is fixed
        this.svg.cx(this.initialTextCenterPosition.x + dx / 2)
        this.svg.cy(this.initialTextCenterPosition.y)
        break
      }
      case 'bottomRight': {
        // new font size = initial font size * (new diagonal length / initial diagonal length)
        const initialDiagonalLength =
          Math.sqrt(Math.pow(this.originalSize.width, 2) + Math.pow(this.originalSize.height, 2))
        const dx = this.currentPoint.x - this.startPoint.x
        const dy = this.currentPoint.y - this.startPoint.y
        const delta_diagonal = Math.pow(dx * dx + dy * dy, 0.5) * (dx < 0 && dy < 0 ? -1 : 1)
        const factor = (initialDiagonalLength + delta_diagonal) / initialDiagonalLength
        this.svg.font({ size: this.originalFontSize * factor })

        // move center point so that it looks like top left is fixed
        // dx, dy need to be re-calculate since resizing is fixed ratio
        const dx_actual = delta_diagonal * (this.originalSize.width / initialDiagonalLength)
        const dy_actual = delta_diagonal * (this.originalSize.height / initialDiagonalLength)
        this.svg.cx(this.initialTextCenterPosition.x + dx_actual / 2)
        this.svg.cy(this.initialTextCenterPosition.y + dy_actual / 2)
        break
      }
      case 'bottom': {
        // new font size = initial font size * (new height / initial height)
        const height = this.originalSize.height
        const dy = this.currentPoint.y - this.startPoint.y
        const factor = (height + dy) / height
        this.svg.font({ size: this.originalFontSize * factor })

        // move center point so that it looks like top is fixed
        this.svg.cx(this.initialTextCenterPosition.x)
        this.svg.cy(this.initialTextCenterPosition.y + dy / 2)
        break
      }
      case 'bottomLeft': {
        // new font size = initial font size * (new diagonal length / initial diagonal length)
        const initialDiagonalLength =
          Math.sqrt(Math.pow(this.originalSize.width, 2) + Math.pow(this.originalSize.height, 2))
        const dx = this.startPoint.x - this.currentPoint.x
        const dy = this.currentPoint.y - this.startPoint.y
        const delta_diagonal = Math.pow(dx * dx + dy * dy, 0.5) * (dx < 0 && dy < 0 ? -1 : 1)
        const factor = (initialDiagonalLength + delta_diagonal) / initialDiagonalLength
        this.svg.font({ size: this.originalFontSize * factor })

        // move center point so that it looks like top right is fixed
        // dx, dy need to be re-calculate since resizing is fixed ratio
        const dx_actual = delta_diagonal * (this.originalSize.width / initialDiagonalLength)
        const dy_actual = delta_diagonal * (this.originalSize.height / initialDiagonalLength)
        this.svg.cx(this.initialTextCenterPosition.x - dx_actual / 2)
        this.svg.cy(this.initialTextCenterPosition.y + dy_actual / 2)
        break
      }
      case 'left': {
        // new font size = initial font size * (new width / initial width)
        const width = this.originalSize.width
        const dx = this.startPoint.x - this.currentPoint.x
        const factor = (width + dx) / width
        this.svg.font({ size: this.originalFontSize * factor })

        // move center point so that it looks like left is fixed
        this.svg.cx(this.initialTextCenterPosition.x - dx / 2)
        this.svg.cy(this.initialTextCenterPosition.y)
        break
      }
    }
  }

  _onPointerup() {
    this.textObj.changeState(TextState.SELECTED)
  }
}
