// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~ ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const popups = document.querySelectorAll(".popup");
const closePopupButtons = document.querySelectorAll(".popup__button-close");
const ESC = "Escape";

// Попап редактирования профиля ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const editProfilePopup = document.querySelector(".popup_type_edit-profile");
const editProfileForm = document.querySelector(".popup__form_type_edit-profile");
const editProfileButton = document.querySelector(".profile__button-edit");
const fullNameElement = document.querySelector(".profile__info-full-name");
const professionElement = document.querySelector(".profile__info-profession");
const fullNameInput = document.querySelector(".popup__input_text_full-name");
const professionInput = document.querySelector(".popup__input_text_profession");

// Попап добавления карточки ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const addCardPopup = document.querySelector(".popup_type_add-card");
const addCardForm = document.querySelector(".popup__form_type_add-card");
const addCardButton = document.querySelector(".profile__button-add-card");
const submitButton = addCardForm.querySelector(".popup__button-save");
const picInput = document.querySelector(".popup__input_url_pic");
const titleInput = document.querySelector(".popup__input_text_title");

// Карточки ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const cardTemplate = document.querySelector("#card-template").content;
const cardForClone = cardTemplate.querySelector(".card");
const cards = document.querySelector(".photo-gallery__cards");
const picPopup = document.querySelector(".popup_type_pic");
const popupTitleElement = picPopup.querySelector(".popup__pic-title");
const popupPhotoElement = picPopup.querySelector(".popup__pic");

// Перелаваемые классы ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};
