// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ СОЗДАНИЕ КАРТОЧКИ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export default class Card {
  constructor(data, cardTemplate, getOpenPopup) {
    this._pic = data.pic;
    this._title = data.title;
    this._cardTemplate = cardTemplate;
    this._getOpenPopup = getOpenPopup;
  }

  generateCard() {
    this._element = this._cloneTemplate();

    this._picElement = this._element.querySelector(".card__photo");
    this._titleElement = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__button-like");
    this._deleteButton = this._element.querySelector(".card__button-delete");
  
    this._picElement.src = this._pic;
    this._picElement.alt = this._title;
    this._titleElement.textContent = this._title;
 
    this._setEventListeners();

    return this._element;
  }

  _cloneTemplate = () => {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content
      .querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners = () => {
    this._picElement.addEventListener("click", this._handleOpenCard);
    this._likeButton.addEventListener("click", this._handleLikeCard);
    this._deleteButton.addEventListener("click", this._handleDeleteCard);
  }

  _handleOpenCard = () => {
    this._getOpenPopup(this._pic, this._title);
  }

  _handleLikeCard = (evt) => {
    evt.target.classList.toggle("card__button-like_active");
  }

  _handleDeleteCard = () => {
    this._element.remove();
  }
}
