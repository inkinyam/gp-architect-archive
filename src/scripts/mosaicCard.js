export default class MosaicCard {
  constructor ({card}) {
     this._templateSelector  = '.mosaic_template';
     this._name   = card.name;
     this._img    = card.image;
     this._link   = card._links.url_frontend.href;
     this._address = card.address;
  }

 // метод, который создает карточку
  _getCardElement () {
    this._cardElement =  document.querySelector(this._templateSelector).content.querySelector('.mosaic__card').cloneNode(true);
  }

   //метод, который заполняет карточку
  _renderCard () {
    this._getCardElement();
    const cardImage = this._cardElement.querySelector('.mosaic__img');
    if (this._img) {
      cardImage.src   = this._img;
      cardImage.alt   = this._name;
    } else {
      cardImage.src   = "https://www.vanwalraven.com/image/media/products/notfound@960w.png?v=1649171577";
      cardImage.alt   = "фото скоро появится";
    }
    this._cardElement.setAttribute('href', this._link);
    this._cardElement.querySelector('.mosaic__card-title').textContent = this._name;
    this._cardElement.querySelector('.mosaic__card-subtitle').textContent = this._address;
  }

  
  //метод, который возвращает готовую карточку 
  createCard () {
    this._renderCard();
    return this._cardElement;
  }

}