// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ ИМПОРТ ПЕРЕМЕННЫХ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import * as vars from "./variables.js";
import primalCards from "./primalCards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ ЗАПУСК ВАЛИДАЦИИ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const formList = Array.from(document.querySelectorAll(vars.selectors.formSelector));

formList.forEach((formElement) => {
  const validation = new FormValidator(vars.selectors, formElement);
  validation.enableValidation();
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ СОЗДАНИЕ КАРТОЧКИ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Добавление на страницу первоначальной карточки ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

primalCards.forEach((item) => {
  addCard ({ pic: item.link, title: item.name });
});

// Добавление на страницу новой карточки ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

vars.addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  vars.submitButton.classList.add(vars.selectors.inactiveButtonClass);
  vars.submitButton.setAttribute("disabled", "true");

  addCard ({ pic: vars.picInput.value, title: vars.titleInput.value });

  closePopup(vars.addCardPopup);
  vars.addCardForm.reset();
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ ФУНКЦИИ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

let mouseDownTarget; // Переменная нажатия кнопки
let mouseUpTarget; // Переменная отжатия кнопки

function handleDocumentMouseDown (evt) {
  mouseDownTarget = evt.target;
}

function handleDocumentMouseUp (evt) {
  mouseUpTarget = evt.target;
}

// Открытие popup ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);

  // Включение
  //           слушателя нажатия кнопки
  document.addEventListener("mousedown", handleDocumentMouseDown);
  //           слушателя отжатия кнопки
  document.addEventListener("mouseup", handleDocumentMouseUp);
}

// Открытие popup с фото из карточки ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function openPic(pic, title) {
  document.querySelector(".popup_type_pic").querySelector(".popup__pic").src = pic;
  document.querySelector(".popup_type_pic").querySelector(".popup__pic-title").alt = title;
  document.querySelector(".popup_type_pic").querySelector(".popup__pic-title").textContent = title;

  openPopup(vars.openPicPopup);
}

// Закрытие popup ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);

  // Отключение
  //            слушателя нажатия кнопки
  document.removeEventListener("mousedown", handleDocumentMouseDown)
  //            слушателя отжатия кнопки
  document.removeEventListener("mouseup", handleDocumentMouseUp);
}

// Закрытие popup по esc ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function closePopupEsc(evt) {
  if (evt.key === vars.ESC) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

// Добавление карточки на страницу ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function addCard (data) {
  const card = new Card(data, "#card-template", openPic);
  const cardElement = card.generateCard();

  document.querySelector(".photo-gallery__cards").prepend(cardElement);
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ ОБРАБОТЧИКИ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Открытие popup редактирования профиля ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

vars.editProfileButton.addEventListener("click", function () {
  vars.fullNameInput.value = vars.fullNameElement.textContent;
  vars.professionInput.value = vars.professionElement.textContent;

  const fullNameEvent = new Event("input");
  vars.fullNameInput.dispatchEvent(fullNameEvent);
  const professionEvent = new Event("input");
  vars.professionInput.dispatchEvent(professionEvent);

  openPopup(vars.editProfilePopup);
});

// Открытие popup создания новой карточки ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

vars.addCardButton.addEventListener("click", function () {
  openPopup(vars.addCardPopup);
});

// Закрытие popup  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Закрытие
vars.popups.forEach(function (popup, i) {

  //        по крестику
  vars.closePopupButtons[i].addEventListener("click", function () {
    closePopup(popup);
  });

  //        по вне
  popup.addEventListener("click", function (evt) {
    if (evt.target === evt.currentTarget && mouseDownTarget === mouseUpTarget) {
      closePopup(popup);
    }
  });
});

// Сохранение профайла ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

vars.editProfileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  vars.fullNameElement.textContent = vars.fullNameInput.value;
  vars.professionElement.textContent = vars.professionInput.value;

  closePopup(vars.editProfilePopup);
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ МНЕ ТАК ХОЧЕТСЯ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

document.addEventListener("contextmenu", evt => {
  evt.preventDefault();
})
