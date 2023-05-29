import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupImage = this._popup.querySelector('.popup__image')
    this._popupImageTitle = this._popup.querySelector('.popup__image-title')
  }

  open = (cardData) => {
    this._popupImage.src = cardData.link
    this._popupImage.alt = cardData.title
    this._popupImageTitle.textContent = cardData.title
    super.open()
  }
}


