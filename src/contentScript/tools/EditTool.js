import Tool from "./Tool";

class EditTool extends Tool {
  enter() {
    console.log('select tool enter!')
  }

  leave() {
    console.log('select tool leave!')
  }
}

export default EditTool
