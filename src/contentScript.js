'use strict';

import { SVG } from '@svgdotjs/svg.js'
import BoxDrawer from './drawers/boxDrawer';
import { debounce } from 'lodash';

// setup
const page = document.documentElement
const draw = SVG().addTo('body')
  .size(page.scrollWidth, page.scrollHeight)
  .css({ position: 'fixed', top: 0, 'pointer-events': 'none', 'z-index': 1000000 })
const boxDrawer = new BoxDrawer(draw, {
  radiusThreshold: 40,
  radiusLarge: 10,
  radiusSmall: 5,
  offsetTowardsOutside: 5,
})

const onPointerOver = (event) => {
  const target = event.target
  boxDrawer.drawHint(target)
}
const debouncedOnPointerOver = debounce(onPointerOver, 100)

document.addEventListener("pointerover", debouncedOnPointerOver)

document.addEventListener("pointerout", event => {
  const target = event.target
  boxDrawer.erase(target)
})

document.addEventListener("pointerdown", event => {
  event.stopImmediatePropagation()
  event.preventDefault()
  const target = event.target
  boxDrawer.drawMark(target)
})
