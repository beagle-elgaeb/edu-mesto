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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ КАРТОЧКИ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function removeCard(cardID) {
  return fetch(`https://mesto.nomoreparties.co/v1/cohort-26/cards/${cardID}`, {
    method: "DELETE",
    headers: {
      authorization: "05288f01-26d1-4add-96c0-b100674c662e",
      "Content-Type": "application/json"
    }
  })
}

function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    {
      openPopupView: (pic, title) => {
        popupWithPic.open(pic, title);
      },
      openPopupDelete: () => {
        const popupDeleteCard = new PopupForDelete(".popup_type_delete-card", () => {
          removeCard(data.id)
            .then(() => card.removeCard());
        });
        popupDeleteCard.open();
      },
      likeCard: () => {
        fetch(`${vars.url}/${vars.groupID}/cards/likes/${data.id}`, {
          method: "PUT",
          headers: {
            authorization: vars.token,
            "Content-Type": "application/json"
          }
        })
      },
      unlikeCard: () => {
        fetch(`${vars.url}/${vars.groupID}/cards/likes/${data.id}`, {
          method: "DELETE",
          headers: {
            authorization: vars.token,
            "Content-Type": "application/json"
          }
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

const validationAddCard = new FormValidator(vars.selectors, vars.addCardForm);

validationAddCard.enableValidation();

const popupAddCard = new PopupWithForm(".popup_type_add-card",
  {
    submitForm: (inputsObject) => {
      fetch(`${vars.url}/${vars.groupID}/cards`, {
        method: "POST",
        headers: {
          authorization: vars.token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: inputsObject.title,
          link: inputsObject.pic
        })
      })
        .then(res => res.json())
        .then((card) => {
          addCard({
            pic: card.link,
            title: card.name,
            like: card.likes.length,
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

const validationPopupProfile = new FormValidator(vars.selectors, vars.editProfileForm);

validationPopupProfile.enableValidation();

const popupProfile = new PopupWithForm(".popup_type_edit-profile",
  {
    submitForm: (inputsObject) => {

      profileInfo.setUserInfo(inputsObject);

      fetch(`${vars.url}/${vars.groupID}/users/me`, {
        method: "PATCH",
        headers: {
          authorization: vars.token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: inputsObject.fullName,
          about: inputsObject.profession
        })
      });

      popupProfile.close();
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

      fetch(`${vars.url}/${vars.groupID}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          authorization: vars.token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          avatar: inputsObject.avatar
        })
      })
        .then(() => profileInfo.setUserAvatar(inputsObject.avatar));

      popupAvatar.close();
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
  return fetch(`${vars.url}/${vars.groupID}/users/me`, {
    headers: {
      authorization: vars.token
    }
  })
    .then(res => res.json())
    .then((result) => {
      const data = { fullName: result.name, profession: result.about };
      const avatar = result.avatar;

      profileInfo.setUserInfo(data);
      profileInfo.setUserAvatar(avatar);

      userID = result._id;
    });
}

function loadCards() {
  fetch(`${vars.url}/${vars.groupID}/cards`, {
    headers: {
      authorization: vars.token
    }
  })
    .then(res => res.json())
    .then((cards) => {
      сardList = new Section(
        {
          data: cards.reverse(),
          renderer: (card) => {
            addCard({
              pic: card.link,
              title: card.name,
              like: card.likes.length,
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

