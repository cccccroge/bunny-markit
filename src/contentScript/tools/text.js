export const enableText = () => {
  if (document.body.style.cursor !== 'none') {
    document.body.style.cursor = 'none'
  }
  document.addEventListener("pointermove", onPointerOver)
  document.addEventListener("pointerdown", onPointerDown)
}

export const disableText = () => {
  document.body.style.cursor = ''
  document.removeEventListener("pointermove", onPointerOver)
  document.removeEventListener("pointerdown", onPointerDown)
}


// callback of showing floating text hint
const onPointerOver = (event) => {
  window.textDrawer.eraseLast()

  // ignore if over on toolboxs
  const toolbox = document.querySelector('tool-box')
  if (toolbox && toolbox.contains(event.target)) {
    return
  }

  const { clientX, clientY } = event
  window.textDrawer.drawHint({ x: clientX, y: clientY })
}

// callback of adding text to the drawer layer
const onPointerDown = (event) => {
  event.stopImmediatePropagation()
  event.preventDefault()
  const { clientX, clientY } = event
  window.textDrawer.drawMark({ x: clientX, y: clientY })
}
