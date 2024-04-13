import { TextObject } from "../objects/text/TextObject"

class TextDrawer {
  constructor(draw, options) {
    this.draw = draw
    this.options = options
    this._initGoogleFonts()
  }

  drawMark(position) {
    const svg = this._createText(position)
    new TextObject(svg)
  }

  _initGoogleFonts() {
    const api = document.createElement('link')
    api.rel = 'preconnect'
    api.href = 'https://fonts.googleapis.com'
    document.head.appendChild(api)

    const gstatic = document.createElement('link')
    gstatic.rel = 'preconnect'
    gstatic.href = 'https://fonts.gstatic.com'
    gstatic.crossorigin = true
    document.head.appendChild(gstatic)

    const font = document.createElement('link')
    font.rel = 'stylesheet'
    font.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700&display=swap'
    document.head.appendChild(font)
  }

  _createText(position) {
    const {
      defaultText,
      fontSize,
      fontFamily,
     } = this.options

    const leading = 1.5
    const lineHeightInPx = fontSize * leading

    return this.draw
      .text(defaultText)
      .font({
        size: fontSize,
        family: fontFamily,
      })
      .leading(leading)
      .move(position.x, position.y - lineHeightInPx / 2)
      .fill({ color: '#f06' })
  }
}

export default TextDrawer
