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
  const card = new Card({ pic: item.link, title: item.name }, "#card-template");
  const cardElement = card.cloneTemplate();

  document.querySelector(".photo-gallery__cards").prepend(cardElement);
});

// Добавление на страницу новой карточки ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

vars.addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  vars.submitButton.classList.add(vars.selectors.inactiveButtonClass);
  vars.submitButton.setAttribute("disabled", "true");

  const card = new Card( { pic: vars.picInput.value, title: vars.titleInput.value } , "#card-template");
  const cardElement = card.cloneTemplate();

  document.querySelector(".photo-gallery__cards").prepend(cardElement);

  closePopup(vars.addCardPopup);
  vars.addCardForm.reset();
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ ФУНКЦИИ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Открытие popup ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}

// Закрытие popup ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
}

// Закрытие popup по esc ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function closePopupEsc(evt) {
  if (evt.key === vars.ESC) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
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

// Открытие popup новой карточки ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

vars.addCardButton.addEventListener("click", function () {
  openPopup(vars.addCardPopup);
});

// Закрытие popup  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

let mouseDownTarget;
let mouseUpTarget;

// Переменная нажатия кнопки
document.addEventListener("mousedown", function (evt) {
  mouseDownTarget = evt.target;
})

// Переменная отжатия кнопки
document.addEventListener("mouseup", function (evt) {
  mouseUpTarget = evt.target;
});

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

document.addEventListener('contextmenu', evt => {
  evt.preventDefault();
})