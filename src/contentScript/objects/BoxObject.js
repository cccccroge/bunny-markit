import { IdleState } from "./IdleState";
import { HoveredState } from "./HoveredState";
import { SelectedState } from "./SelectedState";

export const BoxState = {
  IDLE: "idle",
  HOVERED: "hovered",
  SELECTED: "selected",
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
    }
    this.state = null
    this.changeState(BoxState.IDLE)
  }

  changeState(state, params) {
    if (this.state) {
      this.states[this.state].teardown()
    }
    this.state = state
    this.states[state].setup(params)
  }
}
