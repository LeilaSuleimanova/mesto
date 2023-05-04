class Card {
  constructor(cardData, selectorTemplate, handleOpenPopup) {
    this._cardData = cardData;
    this._selectorTemplate = selectorTemplate;
    this._handleOpenPopup = handleOpenPopup;
  }

  _getNewCardFromTemplate() {
    return document.querySelector(this._selectorTemplate).content.querySelector('.element').cloneNode(true);
  }

  _handleButtonLike = () => {
    this._buttonLikeElement.classList.toggle('element__button-like_active')
  }

  _handleButtonDeleteElement = () => {
    this._cloneElement.remove();
    this._cloneElement = null;
  }

  _setEventListeners() {
    this._buttonLikeElement.addEventListener('click', this._handleButtonLike)
    this._buttonDeleteElement.addEventListener('click', this._handleButtonDeleteElement)
    this._imageElement.addEventListener('click', () => this._handleOpenPopup(this._cardData.name, this._cardData.link))
  }

  createCard() {
    this._cloneElement = this._getNewCardFromTemplate();
    this._imageElement = this._cloneElement.querySelector('.element__image');
    this._buttonLikeElement = this._cloneElement.querySelector('.element__button-like')
    this._buttonDeleteElement = this._cloneElement.querySelector('.element__button-delete')
    this._titleElement = this._cloneElement.querySelector('.element__title').textContent = this._cardData.name;
    this._imageElement.src = this._cardData.link;
    this._imageElement.alt = this._cardData.name;
    this._setEventListeners();
    return this._cloneElement
  }
}

export default Card
