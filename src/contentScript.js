'use strict';

import { SVG } from '@svgdotjs/svg.js'
import BoxDrawer from './drawers/boxDrawer';

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

document.addEventListener("pointerover", event => {
  const target = event.target
  boxDrawer.drawHint(target)
})

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
