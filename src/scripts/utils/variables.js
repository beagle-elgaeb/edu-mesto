// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Попап редактирования профиля ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const editProfileButton = document.querySelector(".profile__button-edit");
export const fullNameElement = document.querySelector(".profile__info-full-name");
export const professionElement = document.querySelector(".profile__info-profession");
export const editProfileForm = document.querySelector(".popup__form_type_edit-profile");
export const editAvatarForm = document.querySelector(".popup__form_type_edit-avatar");
export const fullNameInput = document.querySelector(".popup__input_text_full-name");
export const professionInput = document.querySelector(".popup__input_text_profession");

// Попап добавления карточки ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const addCardButton = document.querySelector(".profile__button-add-card");
export const addCardForm = document.querySelector(".popup__form_type_add-card");
export const saveCardButton = addCardForm.querySelector(".popup__button-save");

// Передаваемые классы ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};
