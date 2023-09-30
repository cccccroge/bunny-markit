'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page
const pageTitle = document.head.getElementsByTagName('title')[0].innerHTML;
console.log(
  `Page title is: '${pageTitle}' - evaluated by Chrome extension's 'contentScript.js' file`
);

// Communicate with background file by sending a message
chrome.runtime.sendMessage(
  {
    type: 'GREETINGS',
    payload: {
      message: 'Hello, my name is Con. I am from ContentScript.',
    },
  },
  (response) => {
    console.log(response.message);
  }
);

// Listen for message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'COUNT') {
    console.log(`Current count is ${request.payload.count}`);
  }

  // Send an empty response
  // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
  sendResponse({});
  return true;
});

import { SVG } from '@svgdotjs/svg.js'

// setup
const page = document.documentElement
const draw = SVG().addTo('body')
  .size(page.scrollWidth, page.scrollHeight)
  .css({ position: 'fixed', top: 0, 'pointer-events': 'none', 'z-index': 1000000 })
const last = {}

// box hint
document.addEventListener("pointerover", event => {
  const target = event.target
  drawBox(target, { isHint: true })
})

document.addEventListener("pointerout", event => {
  const target = event.target
  if (target === last.element) {
    last.rect.remove()
  }
})

document.addEventListener("pointerdown", event => {
  event.stopImmediatePropagation()
  event.preventDefault()
  const target = event.target
  if (target === last.element) {
    drawBox(target, { isHint: false })
  }
})

function drawBox(element, options) {
  const { isHint } = options

  const { top, left, width, height } = element.getBoundingClientRect()
  const radious = Math.min(width, height) < 40 ? 5 : 10
  const offsetTowardsOutside = 5

  const rect = draw
    .rect(width + 2 * offsetTowardsOutside, height + 2 * offsetTowardsOutside)
    .radius(radious)
    .move(left - offsetTowardsOutside, top - offsetTowardsOutside)
    .stroke({ width: 5, color: '#f06' })
    .fill('none')

  if (isHint) {
    rect.opacity(0.5)

    last.element = element
    last.rect = rect
  }
}
