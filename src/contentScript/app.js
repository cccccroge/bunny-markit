'use strict';

import { SVG } from '@svgdotjs/svg.js'

import '@webcomponents/webcomponentsjs' // polyfill: web components just doesn't work in content script
import '@shoelace-style/shoelace/dist/themes/light.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
setBasePath(chrome.runtime.getURL('shoelace'));

import './toolbox';
import { showToolBox } from './toolbox';

// setup
const page = document.documentElement
const draw = SVG().addTo('body')
  .size(page.scrollWidth, page.scrollHeight)
  .css({ position: 'fixed', top: 0, 'pointer-events': 'none', 'z-index': 999999 })

// FIXME: maybe not global?
window.draw = draw

chrome.runtime.onMessage.addListener(
  function(request, sender, sendReponse) {
    if (request === 'ACTIVATE') {
      sendReponse('OK')
      showToolBox()

      sessionStorage.setItem('bunny/activated', 'true');
    } else if (request === 'ASK_IS_ACTIVATED') {
      const activated = sessionStorage.getItem('bunny/activated');
      sendReponse(activated)
    } else if (request === 'TAKE_SCREENSHOT') {
      // TODO: take screen shot
      console.log('take a screenshot!')
      sessionStorage.clear()

      sendReponse('OK')
    }
  }
)

// changing document will clean up current drawing context
window.addEventListener("beforeunload", (event) => {
  sessionStorage.clear()
});
