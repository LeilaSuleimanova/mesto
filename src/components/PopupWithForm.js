import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector)
    this._submit = submit
    this._form = this._popup.querySelector('.popup__form')
    this._input = this._form.querySelectorAll('.popup__input')

  }

  _getInputValues() {
    // const data = Object.fromEntries(new FormData(this._form))
    // return data
    this._value = {}
    this._input.forEach(input => {
      this._value[input.name] = input.value
    })
    return this._value
  }

  setInputValues(user) {
    this._input.forEach(input => {
      input.value = user[input.name]
    })
  }

  setEventListeners() {
    super.setEventListener()
    this._form.addEventListener('submit', (event) => {
      event.preventDefault()
      this._submit(this._getInputValues())
    })
  }

  close() {
    super.close()
    this._form.reset()
  }

}
