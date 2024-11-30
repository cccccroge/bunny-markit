import { IdleState } from './IdleState';
import { HoveredState } from './HoveredState';
import { MovingState } from './MovingState';

export const ArrowState = {
  IDLE: 'idle',
  HOVERED: 'hovered',
  SELECTED: 'selected',
  MOVING: 'moving',
  MOVING_POINT: 'moving_point',
};

export class ArrowObject {
  constructor(svgs) {
    this._initStates(svgs);
  }

  _initStates(svgs) {
    this.states = {
      [ArrowState.IDLE]: new IdleState(svgs, this),
      [ArrowState.HOVERED]: new HoveredState(svgs, this),
      // [ArrowState.SELECTED]: new SelectedState(svgs, this),
      [ArrowState.MOVING]: new MovingState(svgs, this),
      // [ArrowState.MOVING_POINT]: new MovingPointState(svgs, this),
    };
    this.state = null;
    this.changeState(ArrowState.IDLE);
  }

  changeState(state, params) {
    if (this.state) {
      this.states[this.state].teardown();
    }
    this.state = state;
    if (this.states[state]) {
      this.states[state].setup(params);
    }
  }
}
