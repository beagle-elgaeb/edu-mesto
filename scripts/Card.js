// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ СОЗДАНИЕ КАРТОЧКИ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export default class Card {
  constructor(data, cardTemplate, handleOpenPopup) {
    this._pic = data.pic;
    this._title = data.title;
    this._cardTemplate = cardTemplate;
    this._handleOpenPopup = handleOpenPopup;
  }

  // Заполнение карточки
  generateCard() {
    this._element = this._cloneTemplate();

    this._picElement = this._element.querySelector(".card__photo");
    this._titleElement = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__button-like");
    this._deleteButton = this._element.querySelector(".card__button-delete");
  
    this._picElement.src = this._pic;
    this._picElement.alt = this._title;
    this._titleElement.textContent = this._title;
 
    this._picElement.addEventListener("click", this._handleOpenCard);
    this._likeButton.addEventListener("click", this._handleLikeCard);
    this._deleteButton.addEventListener("click", this._handleDeleteCard);

    return this._element;
  }

  // Клонирование карточки
  _cloneTemplate = () => {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  // Открытие карточки
  _handleOpenCard = () => {
    this._handleOpenPopup(this._pic, this._title);
  }

  // Лайки
  _handleLikeCard = (evt) => {
    evt.target.classList.toggle("card__button-like_active");
  }

  // Удаление карточки
  _handleDeleteCard = () => {
    this._element.remove();
  }
}
