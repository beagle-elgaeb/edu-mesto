// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ СОЗДАНИЕ КАРТОЧКИ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export default class Card {
  constructor(data, cardTemplate, { openPopupView, openPopupDelete, likeCard, unlikeCard }) {
    this._pic = data.pic;
    this._title = data.title;
    this._like = data.like;
    this._own = data.own;
    this._id = data.id;
    this._ownLike = data.ownLike;

    this._cardTemplate = cardTemplate;
    this._openPopupView = openPopupView;
    this._openPopupDelete = openPopupDelete;
    this._likeCard = likeCard;
    this._unlikeCard = unlikeCard;
  }

  generateCard() {
    this._element = this._cloneTemplate();

    this._picElement = this._element.querySelector(".card__photo");
    this._titleElement = this._element.querySelector(".card__title");
    this._likesCountElement = this._element.querySelector(".card__button-like-count");

    this._likeButton = this._element.querySelector(".card__button-like-img");
    this._deleteButton = this._element.querySelector(".card__button-delete");

    this._picElement.src = this._pic;
    this._picElement.alt = this._title;
    this._titleElement.textContent = this._title;
    this._likesCountElement.textContent = this._like;

    if (!this._own) {
      this._deleteButton.classList.add("card__button-delete_disabled");
    }

    if (this._ownLike) {
      this._likeButton.classList.add("card__button-like-img_active");
    }

    this._setEventListeners();

    return this._element;
  }

  removeCard() {
    this._element.remove();
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
    this._openPopupView(this._pic, this._title);
  }

  _handleLikeCard = (evt) => {
    if (!evt.target.classList.contains("card__button-like-img_active")) {
      this._likeCard();
      evt.target.classList.add("card__button-like-img_active");
      this._likesCountElement.textContent = Number(this._likesCountElement.textContent) + 1;
    } else {
      this._unlikeCard();
      evt.target.classList.remove("card__button-like-img_active");
      this._likesCountElement.textContent = Number(this._likesCountElement.textContent) - 1;
    }
  }

  _handleDeleteCard = () => {
    if (this._own) {
      this._openPopupDelete();
    }
  }
}





