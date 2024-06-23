import { IdleState } from "./IdleState";
import { HoveredState } from "./HoveredState";
import { SelectedState } from "./SelectedState";
import { MovingState } from "./MovingState";
import { ResizingState } from "./ResizingState";
import { InputState } from "./InputState";

export const TextState = {
  IDLE: "idle",
  HOVERED: "hovered",
  INPUT: "input",
  SELECTED: "selected",
  MOVING: "moving",
  RESIZING: "resizing",
  ZOMBIE: "zombie",
}

export class TextObject {
  constructor(svg) {
    this._initStates(svg)
  }

  _initStates(svg) {
    this.states = {
      [TextState.IDLE]: new IdleState(svg, this),
      [TextState.HOVERED]: new HoveredState(svg, this),
      [TextState.INPUT]: new InputState(svg, this),
      [TextState.SELECTED]: new SelectedState(svg, this),
      [TextState.MOVING]: new MovingState(svg, this),
      [TextState.RESIZING]: new ResizingState(svg, this),
      [TextState.ZOMBIE]: null,
    }
    this.state = null
    this.changeState(TextState.INPUT, { tspan: svg.node.firstChild })
  }

  changeState(state, params) {
    if (this.state) {
      this.states[this.state].teardown()
    }
    this.state = state
    if (this.states[state]) {
      this.states[state].setup(params)
    }
  }
}
