// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ СОЗДАНИЕ КАРТОЧКИ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import { openPopup } from "./script.js";

export default class Card {
  constructor(data, cardTemplate) {
    this._title = data.title;
    this._pic = data.pic;
    this._cardTemplate = cardTemplate;
  }

  // Клонирование и заполнение карточки
  cloneTemplate() {

    const cardElement = document
    .querySelector(this._cardTemplate)
    .content
    .querySelector('.card')
    .cloneNode(true);
  
    this._element = cardElement;

    this._element.querySelector(".card__photo").src = this._pic;
    this._element.querySelector(".card__photo").alt = this._title;
    this._element.querySelector(".card__title").textContent = this._title;

    this._openCard()
    this._likeCard()
    this._deleteCard()

    return cardElement;
  }

  // Открытие карточки
  _openCard() {
    this._element.querySelector(".card__photo").addEventListener("click", () => {
      openPopup(document.querySelector(".popup_type_pic"));
      document.querySelector(".popup_type_pic").querySelector(".popup__pic").src = this._element.querySelector(".card__photo").src;
      document.querySelector(".popup_type_pic").querySelector(".popup__pic-title").alt = this._element.querySelector(".popup__pic-title").textContent;
      document.querySelector(".popup_type_pic").querySelector(".popup__pic-title").textContent = this._element.querySelector(".popup__pic-title").textContent;
    });
  }

  // Лайки
  _likeCard() {
    this._element.querySelector(".card__button-like").addEventListener("click", (evt) => {
      evt.target.classList.toggle("card__button-like_active");
    });
  }

  // Удаление карточки
  _deleteCard() {
    this._element.querySelector(".card__button-delete").addEventListener("click", (evt) => {
      evt.target.closest(".card").remove();
    });
  }
}
