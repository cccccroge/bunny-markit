'use strict';

import { SVG } from '@svgdotjs/svg.js'
import { enableBox, disableBox } from './tools/box'
import { enableText, disableText } from './tools/text'
import BoxDrawer from './drawers/boxDrawer'
import TextDrawer from './drawers/textDrawer'
import '@webcomponents/webcomponentsjs' // polyfill: web components just doesn't work in content script
import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/button/button.js'
import './toolbox';
import { showToolBox } from './toolbox';

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

window.textDrawer = new TextDrawer(draw, {
  defaultText: 'Text',
  fontSize: 24,
  fontFamily: "'Noto Sans', sans-serif",
})

chrome.runtime.onMessage.addListener(
  function(request, sender, sendReponse) {
    if (request === 'ACTIVATE') {
      sendReponse('OK')
      // enableBox()
      enableText()
      showToolBox()

      sessionStorage.setItem('bunny/activated', 'true');
    } else if (request === 'ASK_IS_ACTIVATED') {
      const activated = sessionStorage.getItem('bunny/activated');
      sendReponse(activated)
    } else if (request === 'TAKE_SCREENSHOT') {
      // TODO: take screen shot
      console.log('take a screenshot!')
      sessionStorage.clear()
      // disableBox()
      disableText()

      sendReponse('OK')
    }
  }
)

// changing document will clean up current drawing context
window.addEventListener("beforeunload", (event) => {
  sessionStorage.clear()
});
