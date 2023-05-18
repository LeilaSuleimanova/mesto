export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items
    this._renderer = renderer
    this._container = document.querySelector(containerSelector)
  }

  addCardArray() {
    this._items.forEach(cardData => {
      this.addItem(cardData)
    })
  }

  addItem(data) {
    this._container.prepend(this._renderer(data))
  }

}

