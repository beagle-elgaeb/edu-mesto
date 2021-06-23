// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~ ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export const popups = document.querySelectorAll(".popup");
export const closePopupButtons = document.querySelectorAll(".popup__button-close");
export const ESC = "Escape";

// Попап редактирования профиля ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const editProfilePopup = document.querySelector(".popup_type_edit-profile");
export const editProfileForm = document.querySelector(".popup__form_type_edit-profile");
export const editProfileButton = document.querySelector(".profile__button-edit");
export const fullNameElement = document.querySelector(".profile__info-full-name");
export const professionElement = document.querySelector(".profile__info-profession");
export const fullNameInput = document.querySelector(".popup__input_text_full-name");
export const professionInput = document.querySelector(".popup__input_text_profession");

// Попап добавления карточки ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const addCardPopup = document.querySelector(".popup_type_add-card");
export const addCardForm = document.querySelector(".popup__form_type_add-card");
export const addCardButton = document.querySelector(".profile__button-add-card");
export const submitButton = addCardForm.querySelector(".popup__button-save");
export const picInput = document.querySelector(".popup__input_url_pic");
export const titleInput = document.querySelector(".popup__input_text_title");

// Передаваемые классы ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};
