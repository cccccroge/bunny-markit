# <img src="public/icons/icon_48.png" width="45" align="left"> &nbsp; Bunny Markit
first-class DOM annotator. Simple, quick, elegant and human friendly. Just like a bunny.

Main dependencies
- High level graphics: svg.js
- Web component framework: lit
- Component library: shoelace

# plan
- pre-defined graphics
  - pre-defined colors
  - pre-defined style of lines
  - pre-defined fonts
- editor
  - steps history/next & prev
  - edit objects
  - layers

features:
- mode switching
  - screenshot function
  - freeze interaction when enter drawing modes (draw area could be fixed?)

TODO:
- primitive arrow tool
- style: text with background block
- spotlight
- differentiate presets from primitives

bugs:
- scrolling but not moving
- toolbox events should not propagate
- svg creation process should not generate event to the background

## Install
Currently it's under development so you can only install locally. See [devlopment](#development)

[**Chrome** extension]() <!-- TODO: Add chrome extension link inside parenthesis -->

## Development
### Project setup
1. Install dependencies: `npm install`
2. Build to dist interatively: `npm run watch`
3. Load the unpacked extension.
  - Go `chrome://extensions/`
  - Enable developer mode if not enabled yet
  - Click load unpacked extension and select `build` folder
4. During development, you need to click "reload the extension" after every rebuild

### Dev dependencies
- Bundler: webpack
- Use eslint, prettier
- Use babel to enable some lit features

## Deployment
TBC

## Contribution

Suggestions and pull requests are welcomed!.

---

This project was bootstrapped with [Chrome Extension CLI](https://github.com/dutiyesh/chrome-extension-cli)
