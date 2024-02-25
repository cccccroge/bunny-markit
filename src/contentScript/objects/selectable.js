const STATUS = {
  UNSELECTED: 'unselected',
  HOVERED: 'hovered',
  SELECTED: 'selected',
}

export function selectable(svg) {
  let status = STATUS.UNSELECTED

  const redraw = () => {
    if (status === STATUS.SELECTED) {
      svg.stroke({ color: '#fff' })
    } else if (status === STATUS.HOVERED) {
      svg.stroke({ color: '#fff' })
    } else {
      svg.stroke({ color: '#f06' })
    }
  }

  svg.on('pointerover', () => {
    if (status === STATUS.SELECTED) {
      return
    }
    status = STATUS.HOVERED
    redraw()
  })
  svg.on('pointerdown', (e) => {
    status = STATUS.SELECTED
    redraw()
    e.stopPropagation()

    const boxSelectedEvent = new CustomEvent('box-selected', {
      bubles: true,
      composed: true,
      detail: { svg: svg },
    });
    document.dispatchEvent(boxSelectedEvent)
  })
  svg.on('pointerout', () => {
    if (status === STATUS.HOVERED) {
      status = STATUS.UNSELECTED
      redraw()
    }
  })
  document.addEventListener('pointerdown', () => {
    if (status === STATUS.SELECTED) {
      status = STATUS.UNSELECTED
      redraw()
    }
  })
}

export function movable(svg) {
  let isMoving = false
  let startPoint = {
    x: -1,
    y: -1,
  }
  let currentPoint = {
    x: -1,
    y: -1,
  }
  let originalPoint = {
    x: svg.x(),
    y: svg.y(),
  }

  const redraw = () => {
    svg.attr({
      x: originalPoint.x + currentPoint.x - startPoint.x,
      y: originalPoint.y + currentPoint.y - startPoint.y,
    })
  }

  svg.on('pointerover', () => {
    window.draw.css({ cursor: 'grab' })
  })

  svg.on('pointerout', () => {
    window.draw.css({ cursor: 'initial' })
  })

  svg.on('pointerdown', (e) => {
    isMoving = true

    originalPoint = {
      x: svg.x(),
      y: svg.y(),
    }
    const { clientX, clientY } = e
    startPoint.x = clientX
    startPoint.y = clientY
    currentPoint.x = clientX
    currentPoint.y = clientY
  })

  document.addEventListener('pointermove', (e) => {
    const { clientX, clientY } = e

    if (isMoving) {
      currentPoint.x = clientX
      currentPoint.y = clientY
      redraw()
    }
  })

  svg.on('pointerup', () => {
    isMoving = false
  })
}
