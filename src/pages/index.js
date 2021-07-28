// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ ИМПОРТ ПЕРЕМЕННЫХ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import "./index.css";

import * as vars from "../scripts/utils/variables.js";

import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupForDelete from "../scripts/components/PopupForDelete.js";
import UserInfo from "../scripts/components/UserInfo.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Api from "../scripts/components/Api.js";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ ИНИЦИАЛИЗАЦИЯ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const validationPopupProfile = new FormValidator(vars.selectors, vars.editProfileForm);

validationPopupProfile.enableValidation();

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1",
  groupID: "cohort-26",
  headers: {
    authorization: "05288f01-26d1-4add-96c0-b100674c662e",
    'Content-Type': 'application/json'
  }
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ КАРТОЧКИ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    {
      openPopupView: (pic, title, author) => popupWithPic.open(pic, title, author),
      openPopupDelete: () => {
        const popupDeleteCard = new PopupForDelete(".popup_type_delete-card", () => {
          api.removeCard(data.id)
            .then(() => card.removeCard());
        });
        popupDeleteCard.open();
      },
      likeCard: () => api.likeCard(data.id),
      unlikeCard: () => api.unlikeCard(data.id)
    }
  );

  return card.generateCard();
}

function addCard(data) {
  const cardElement = createCard(data);

  сardList.addItem(cardElement);
}

const validationAddCard = new FormValidator(vars.selectors, vars.addCardForm);

validationAddCard.enableValidation();

const popupAddCard = new PopupWithForm(".popup_type_add-card",
  {
    submitForm: (inputsObject) => {
      return api.createCard(inputsObject)
        .then((card) => {
          addCard({
            pic: card.link,
            title: card.name,
            like: card.likes.length,
            author: card.owner.name,
            own: card.owner._id === userID,
            id: card._id,
            ownLike: card.likes.find((like) => { return userID === like._id })
          });
        })
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

const popupProfile = new PopupWithForm(".popup_type_edit-profile",
  {
    submitForm: (inputsObject) => {

      profileInfo.setUserInfo(inputsObject);

      return api.setProfileData(inputsObject);
    }
  }
);

const profileInfo = new UserInfo(
  {
    fullNameSelector: ".profile__info-full-name",
    professionSelector: ".profile__info-profession",
    avatarSelector: ".profile__avatar"
  },
  {
    openPopupEditAvatar: () => {
      popupAvatar.open();
    }
  }
);

profileInfo.setEventListeners();

const popupAvatar = new PopupWithForm(".popup_type_edit-avatar",
  {
    submitForm: (inputsObject) => {

      return api.setAvatar(inputsObject.avatar)
        .then(() => {
          profileInfo.setUserAvatar(inputsObject.avatar);
        });
    }
  }
);

popupAvatar.setEventListeners();

vars.editProfileButton.addEventListener("click", () => {
  vars.fullNameInput.value = profileInfo.getUserInfo().fullName;
  vars.professionInput.value = profileInfo.getUserInfo().profession;

  popupProfile.open();
});

popupProfile.setEventListeners();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ ЗАГРУЗКА ДАННЫХ С СЕРВЕРА ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

let userID;
let сardList;

loadProfile(profileInfo)
  .then(() => {
    loadCards();
  })


function loadProfile(profileInfo) {
  return api.getProfileData()
    .then((result) => {
      const data = { fullName: result.name, profession: result.about };
      const avatar = result.avatar;

      profileInfo.setUserInfo(data);
      profileInfo.setUserAvatar(avatar);

      userID = result._id;
    });
}

function loadCards() {
  api.getInitialCards()
    .then((cards) => {
      сardList = new Section(
        {
          data: cards.reverse(),
          renderer: (card) => {
            addCard({
              pic: card.link,
              title: card.name,
              like: card.likes.length,
              author: card.owner.name,
              own: card.owner._id === userID,
              id: card._id,
              ownLike: card.likes.find((like) => { return userID === like._id })
            });
          }
        },
        ".photo-gallery__cards"
      );

      сardList.renderItems();
    });
}





