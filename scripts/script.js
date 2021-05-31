const popups = document.querySelectorAll(".popup");
const closePopupButtons = document.querySelectorAll(".popup__button-close");

// Попап редактирования профиля ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const editProfilePopup = document.querySelector(".popup_type_edit-profile");
const editProfileForm = document.querySelector(".popup__form_type_edit-profile");
const editProfileButton = document.querySelector(".profile__button-edit");
const fullNameElement = document.querySelector(".profile__info-full-name");
const professionElement = document.querySelector(".profile__info-profession");
const fullNameInput = document.querySelector(".popup__form-item_text_full-name");
const professionInput = document.querySelector(".popup__form-item_text_profession");

// Попап добавления карточки ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const addCardPopup = document.querySelector(".popup_type_add-card");
const addCardForm = document.querySelector(".popup__form_type_add-card");
const addCardButton = document.querySelector(".profile__button-add-card");
const picInput = document.querySelector(".popup__form-item_url_pic");
const titleInput = document.querySelector(".popup__form-item_text_title");

// Карточки ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const cardTemplate = document.querySelector("#card-template").content;
const cardForClone = cardTemplate.querySelector(".card");
const cards = document.querySelector(".photo-gallery__cards");
const picPopup = document.querySelector(".popup_type_pic");

// Изначальные карточки ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const primalCards = [
  {
    name: "Волгоград",
    link: "https://avatars.mds.yandex.net/get-zen_doc/3530601/pub_605021e96c861f0107331d6f_605023e0011181447b64d7bf/scale_1200"
  },
  {
    name: "Улан-Удэ",
    link: "https://primamedia.gcdn.co/f/big/909/908018.jpg?a5a00b19b39368b4acbd101392c21d8a"
  },
  {
    name: "Кострома",
    link: "https://a.d-cd.net/8b23ad5s-1920.jpg"
  },
  {
    name: "Артек",
    link: "https://bugaga.ru/uploads/posts/2009-09/1252913248_artek_08.jpg"
  },
  {
    name: "Рязань",
    link: "https://cdn3.rzn.info/data/image/newsadd/base/2019/07/196167_5d19bcf718d7c_x2.jpg"
  },
  {
    name: "Дубна",
    link: "https://s3-eu-west-1.amazonaws.com/media.agentika.com/user/ec92109f-933c-4803-9728-44f5e44ebef6.jpeg"
  }
];

// Открываем popup редактирования профиля ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

editProfileButton.addEventListener("click", openPopupEdit);

function openPopupEdit() {
  editProfilePopup.classList.add("popup_opened");
  fullNameInput.value = fullNameElement.textContent;
  professionInput.value = professionElement.textContent;
}

// Открываем popup новой карточки ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

addCardButton.addEventListener("click", openPopupAddCard);

function openPopupAddCard() {
  addCardPopup.classList.add("popup_opened");
}

// Закрываем popup ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// ~~~~~~~~~~~~~~~ кнопкой ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

popups.forEach(function(popup, i) {
  closePopupButtons[i].addEventListener("click", function() {
    closePopup(popup);
  });
});

// ~~~~~~~~~~~~~~~ по нажатию во вне ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

let mouseDownTarget;
let mouseUpTarget;

document.addEventListener("mousedown", function(event) {
  mouseDownTarget = event.target;
})

document.addEventListener("mouseup", function(event) {
  mouseUpTarget = event.target;
});

popups.forEach(function (popup) {
  popup.addEventListener("click", function(event) {
    if (event.target === event.currentTarget && mouseDownTarget === mouseUpTarget) {
      closePopup(popup);
    }
  });
});

// Сохраняем профайл ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

editProfileForm.addEventListener("submit", function(event) {
  event.preventDefault();

  fullNameElement.textContent = fullNameInput.value;
  professionElement.textContent = professionInput.value;

  const popup = editProfileForm.closest(".popup");
  
  closePopup(popup);
});

// Создаём ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function addCard(pic, title) {
  const card = cardForClone.cloneNode(true);
  const cardTitleElement = card.querySelector(".card__title");
  const popupTitleElement = picPopup.querySelector(".popup__pic-title");
  const cardPhotoElement = card.querySelector(".card__photo");
  const popupPhotoElement = picPopup.querySelector(".popup__pic");
  const likeCardButtons = card.querySelector(".card__button-like");
  const deleteCardButtons = card.querySelector(".card__button-delete");
  
  cardPhotoElement.src = pic;
  cardTitleElement.textContent = title;

  likeCardButtons.addEventListener("click", function (event) {
    event.target.classList.toggle("card__button-like_active");
  });

  deleteCardButtons.addEventListener("click", function () {
    card.remove();
  });

  cardPhotoElement.addEventListener("click", function () {
    picPopup.classList.add("popup_opened");
    popupPhotoElement.src = cardPhotoElement.src;
    popupTitleElement.textContent = cardTitleElement.textContent;
  });

  cards.prepend(card);
}

// ~~~~~~~ первоначальную карточку ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

primalCards.forEach(function(cardData) {
  addCard(cardData.link, cardData.name);
});

// ~~~~~~~ новую карточку ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

addCardForm.addEventListener("submit", function(event) {
  event.preventDefault();
  addCard(picInput.value, titleInput.value);
  closePopup(addCardPopup);
});