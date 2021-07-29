// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ ИМПОРТ ПЕРЕМЕННЫХ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import "./index.css";

import * as vars from "../scripts/utils/variables.js";

import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import Popup from "../scripts/components/Popup.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupForDelete from "../scripts/components/PopupForDelete.js";
import UserInfo from "../scripts/components/UserInfo.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Api from "../scripts/components/Api.js";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ ИНИЦИАЛИЗАЦИЯ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

let userID;
let сardList;

const validationEditProfile = new FormValidator(vars.selectors, vars.editProfileForm);
validationEditProfile.enableValidation();

const validationEditAvatar = new FormValidator(vars.selectors, vars.editAvatarForm);
validationEditAvatar.enableValidation();

const validationAddCard = new FormValidator(vars.selectors, vars.addCardForm);
validationAddCard.enableValidation();

const popupError = new Popup(".popup_type_error");
popupError.setEventListeners();

const api = new Api(
  {
    baseUrl: "https://mesto.nomoreparties.co/v1",
    groupID: "cohort-26",
    headers: {
      authorization: "05288f01-26d1-4add-96c0-b100674c662e",
      'Content-Type': 'application/json'
    }
  });

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const popupProfile = new PopupWithForm(".popup_type_edit-profile",
  {
    submitForm: (inputsObject) => {
      return api.setProfileData(inputsObject)
        .then(() => {
          profileInfo.setUserInfo(inputsObject);
          popupProfile.close();
        })
        .catch((err) => {
          popupError.open();
          console.log(err);
        })
    }
  }
);

popupProfile.setEventListeners();

const popupAvatar = new PopupWithForm(".popup_type_edit-avatar",
  {
    submitForm: (inputsObject) => {

      return api.setAvatar(inputsObject.avatar)
        .then(() => {
          profileInfo.setUserAvatar(inputsObject.avatar);
          popupAvatar.close();
        })
        .catch((err) => {
          popupError.open();
          console.log(err);
        })
    }
  }
);

popupAvatar.setEventListeners();

const profileInfo = new UserInfo(
  {
    fullNameSelector: ".profile__info-full-name",
    professionSelector: ".profile__info-profession",
    avatarSelector: ".profile__avatar"
  }
);

const avatarEditButton = document.querySelector(".profile__button-edit-avatar");

avatarEditButton.addEventListener("click", () => popupAvatar.open());

vars.editProfileButton.addEventListener("click", () => {
  vars.fullNameInput.value = profileInfo.getUserInfo().fullName;
  vars.professionInput.value = profileInfo.getUserInfo().profession;

  popupProfile.open();
});

function loadProfile(profileInfo) {
  return api.getProfileData()
    .then((result) => {
      const data = { fullName: result.name, profession: result.about };
      const avatar = result.avatar;

      profileInfo.setUserInfo(data);
      profileInfo.setUserAvatar(avatar);

      userID = result._id;
    })
    .catch((err) => {
      popupError.open();
      console.log(err);
    })
}

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
            .then(() => {
              card.removeCard();
              popupDeleteCard.close();
            })
            .catch((err) => {
              popupError.open();
              console.log(err);
            })
        });
        popupDeleteCard.open();
      },
      onLikeCard: () => {
        api.likeCard(data.id)
          .then((like) => {
            card.onLikeCard(like.likes.length);
          })
          .catch((err) => {
            popupError.open();
            console.log(err);
          })
      },
      onUnlikeCard: () => {
        api.unlikeCard(data.id)
          .then((like) => {
            card.onUnlikeCard(like.likes.length);
          })
          .catch((err) => {
            popupError.open();
            console.log(err);
          })
      }
    }
  );

  return card.generateCard();
}

function addCard(data) {
  const cardElement = createCard(data);

  сardList.addItem(cardElement);
}

function convertCardData(card) {
  return {
    pic: card.link,
    title: card.name,
    like: card.likes.length,
    author: card.owner.name,
    own: card.owner._id === userID,
    id: card._id,
    ownLike: card.likes.find((like) => { return userID === like._id })
  }
}

function loadCards() {
  api.getInitialCards()
    .then((cards) => {
      сardList = new Section(
        {
          data: cards.reverse(),
          renderer: (card) => {
            addCard(convertCardData(card));
          }
        },
        ".photo-gallery__cards"
      );

      сardList.renderItems();
    })
    .catch((err) => {
      popupError.open();
      console.log(err);
    })
}

const popupAddCard = new PopupWithForm(".popup_type_add-card",
  {
    submitForm: (inputsObject) => {
      return api.createCard(inputsObject)
        .then((card) => {
          addCard(convertCardData(card));
          popupAddCard.close();
        })
        .catch((err) => {
          popupError.open();
          console.log(err);
        })
    }
  }
);

popupAddCard.setEventListeners();

vars.addCardButton.addEventListener("click", function () {
  popupAddCard.open();
});

const popupWithPic = new PopupWithImage(".popup_type_pic");

popupWithPic.setEventListeners();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ ЗАГРУЗКА ДАННЫХ С СЕРВЕРА ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

loadProfile(profileInfo)
  .then(() => {
    loadCards();
  })
