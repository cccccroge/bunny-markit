'use strict';

import { SVG } from '@svgdotjs/svg.js'
import { disableBox, enableBox } from './tools/box'
import BoxDrawer from './drawers/boxDrawer'

// setup
const page = document.documentElement
const draw = SVG().addTo('body')
  .size(page.scrollWidth, page.scrollHeight)
  .css({ position: 'fixed', top: 0, 'pointer-events': 'none', 'z-index': 1000000 })

window.boxDrawer = new BoxDrawer(draw, {
  radiusThreshold: 40,
  radiusLarge: 10,
  radiusSmall: 5,
  offsetTowardsOutside: 5,
})

chrome.runtime.onMessage.addListener(
  function(request, sender, sendReponse) {
    if (request === 'ACTIVATE') {
      sendReponse('OK')
      enableBox()
      sessionStorage.setItem('bunny/activated', 'true');
    } else if (request === 'ASK_IS_ACTIVATED') {
      const activated = sessionStorage.getItem('bunny/activated');
      sendReponse(activated)
    } else if (request === 'TAKE_SCREENSHOT') {
      // TODO: take screen shot
      console.log('take a screenshot!')
      sessionStorage.clear()
      disableBox()
      sendReponse('OK')
    }
  }
)

// changing document will clean up current drawing context
window.addEventListener("beforeunload", (event) => {
  sessionStorage.clear()
  disableBox()
});
