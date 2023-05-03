import { openPopup } from './index.js'

class Card {
  constructor(cardData, selectorTemplate) {
    this._cardData = cardData;
    this._link = cardData.link;
    this._name = cardData.name;
    this._selectorTemplate = selectorTemplate;
  }

  _getTemlplateNewCard() {
    return document.querySelector(this._selectorTemplate).content.querySelector('.element').cloneNode(true);
  }

  _handleButtonLike = () => {
    this._buttonLikeElement.classList.toggle('element__button-like_active')
  }

  _handleButtonDeleteElement = () => {
    this._cloneElement.remove();
    this._cloneElement = null;
  }

  _handleOpenImageElement = () => {
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupImageTitle.textContent = this._name;
    openPopup(popupWrapImage);
  }

  _setEventListeners() {
    this._buttonLikeElement.addEventListener('click', this._handleButtonLike)
    this._buttonDeleteElement.addEventListener('click', this._handleButtonDeleteElement)
    this._imageElement.addEventListener('click', this._handleOpenImageElement)
  }

  createCard() {
    this._cloneElement = this._getTemlplateNewCard();
    this._imageElement = this._cloneElement.querySelector('.element__image');
    this._buttonLikeElement = this._cloneElement.querySelector('.element__button-like')
    this._buttonDeleteElement = this._cloneElement.querySelector('.element__button-delete')
    this._titleElement = this._cloneElement.querySelector('.element__title').textContent = this._name
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._setEventListeners();
    return this._cloneElement
  }
}

const popupWrapImage = document.querySelector('#popup-image')
const popupImage = popupWrapImage.querySelector('.popup__image')
const popupImageTitle = popupWrapImage.querySelector('.popup__image-title')

export default Card
