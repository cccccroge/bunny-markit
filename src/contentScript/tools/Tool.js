export default class Tool {
  constructor() {
    if (this.constructor == Tool) {
      throw new Error('Tool is an abstract class')
    }
  }

  enter() {
    throw new Error('method enter() must be implemented')
  }

  leave() {
    throw new Error('method leave() must be implemented')
  }
}
