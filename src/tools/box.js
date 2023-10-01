import { debounce } from 'lodash';

export const enableBox = () => {
  document.addEventListener("pointerover", debouncedOnPointerOver)
  document.addEventListener("pointerout", onPointerOut)
  document.addEventListener("pointerdown", onPointerDown)
}

export const disableBox = () => {
  document.removeEventListener("pointerover", debouncedOnPointerOver)
  document.removeEventListener("pointerout", onPointerOut)
  document.removeEventListener("pointerdown", onPointerDown)
}


// callback of showing hint when hover on any element
const onPointerOver = (event) => {
  const target = event.target
  window.boxDrawer.drawHint(target)
}
const debouncedOnPointerOver = debounce(onPointerOver, 100)

// callback of removing hint when move out on previous element
const onPointerOut = (event) => {
  const target = event.target
  window.boxDrawer.erase(target)
}

// callback of adding box to the drawer layer
const onPointerDown = (event) => {
  event.stopImmediatePropagation()
  event.preventDefault()
  const target = event.target
  window.boxDrawer.drawMark(target)
}
