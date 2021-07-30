// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ СОЗДАНИЕ КАРТОЧКИ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export default class Card {
  constructor(data, cardTemplate, { openPopupView, openPopupDelete, onLikeCard, onUnlikeCard }) {
    this._pic = data.pic;
    this._title = data.title;
    this._like = data.like;
    this._author = data.author;
    this._own = data.own;
    this._id = data.id;
    this._ownLike = data.ownLike;

    this._cardTemplate = cardTemplate;
    this._openPopupView = openPopupView;
    this._openPopupDelete = openPopupDelete;
    this._onLikeCard = onLikeCard;
    this._onUnlikeCard = onUnlikeCard;
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

  waitLike() {
    this._likeButton.classList.add("card__button-like-img_wait");
  }

  updateLikeCard(likeCount, ownLike) {
    this._likesCountElement.textContent = likeCount;

    this._likeButton.classList.remove("card__button-like-img_wait");

    if (ownLike) {
      this._likeButton.classList.add("card__button-like-img_active");
    } else {
      this._likeButton.classList.remove("card__button-like-img_active");
    }
  }

  getID() {
    return this._id;
  }

  _handleLikeCard = (evt) => {
    if (!evt.target.classList.contains("card__button-like-img_active")) {
      this._onLikeCard();
    } else {
      this._onUnlikeCard();
    }
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
    this._openPopupView(this._pic, this._title, this._author);
  }

  _handleDeleteCard = () => {
    if (this._own) {
      this._openPopupDelete();
    }
  }
}
