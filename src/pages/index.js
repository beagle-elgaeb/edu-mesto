// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ ИМПОРТ ПЕРЕМЕННЫХ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import "./index.css";
import * as vars from "../scripts/utils/variables.js";
import primalCards from "../scripts/utils/primalCards.js";
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import FormValidator from "../scripts/components/FormValidator.js";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ КАРТОЧКИ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function createCard(data) {
  const card = new Card(data, "#card-template", (pic, title) => popupWithPic.open(pic, title));

  return card.generateCard();
}

function addCard(data) {
  const cardElement = createCard(data);
  
  сardList.addItem(cardElement);
}

const validationAddCard = new FormValidator(vars.selectors, vars.addCardForm);

validationAddCard.enableValidation();

const сardList = new Section(
  {
  data: primalCards,
  renderer: (item) => {addCard({ pic: item.link, title: item.name });}
  },
  ".photo-gallery__cards"
);

сardList.renderItems();

const popupAddCard = new PopupWithForm(".popup_type_add-card",
  {
    submitForm: (inputsObject) => {
      addCard(inputsObject);
    }
  }
);

vars.addCardButton.addEventListener("click", function () {
  popupAddCard.open();
});

popupAddCard.setEventListeners();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ ДЕМОНСТРАЦИЯ КАРТОЧЕК ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const popupWithPic = new PopupWithImage(".popup_type_pic");

popupWithPic.setEventListeners();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const validationPopupProfile = new FormValidator(vars.selectors, vars.editProfileForm);

validationPopupProfile.enableValidation();

const popupProfile = new PopupWithForm(".popup_type_edit-profile",
  {
    submitForm: (inputsObject) => {

      profileInfo.setUserInfo(inputsObject);

      popupProfile.close();
    }
  }
);

const profileInfo = new UserInfo({
  fullNameSelector: ".profile__info-full-name",
  professionSelector: ".profile__info-profession"
});

vars.editProfileButton.addEventListener("click", () => {
  vars.fullNameInput.value = profileInfo.getUserInfo().fullName;
  vars.professionInput.value = profileInfo.getUserInfo().profession;

  popupProfile.open();
});

popupProfile.setEventListeners();
