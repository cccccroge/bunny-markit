import { IdleState } from "./IdleState";
import { HoveredState } from "./HoveredState";
import { SelectedState } from "./SelectedState";
import { MovingState } from "./MovingState";
import { ResizingState } from "./ResizingState";

export const BoxState = {
  IDLE: "idle",
  HOVERED: "hovered",
  SELECTED: "selected",
  MOVING: "moving",
  RESIZING: "resizing",
  ZOMBIE: "zombie",
}

export class BoxObject {
  constructor(svg) {
    this._initStates(svg)
  }

  _initStates(svg) {
    this.states = {
      [BoxState.IDLE]: new IdleState(svg, this),
      [BoxState.HOVERED]: new HoveredState(svg, this),
      [BoxState.SELECTED]: new SelectedState(svg, this),
      [BoxState.MOVING]: new MovingState(svg, this),
      [BoxState.RESIZING]: new ResizingState(svg, this),
      [BoxState.ZOMBIE]: null,
    }
    this.state = null
    this.changeState(BoxState.IDLE)
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
