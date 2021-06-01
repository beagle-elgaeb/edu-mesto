// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~ ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ОБЪЯВЛЕНИЕ ФУНКЦИЙ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Открытие popup ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}

// Закрытие popup ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
}

// Закрытие popup по esc ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function closePopupEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

// Создание карточки ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function createCard(pic, title) {
  // Клонирование карточки
  const card = cardForClone.cloneNode(true);

  const cardTitleElement = card.querySelector(".card__title");
  const popupTitleElement = picPopup.querySelector(".popup__pic-title");
  const cardPhotoElement = card.querySelector(".card__photo");
  const popupPhotoElement = picPopup.querySelector(".popup__pic");
  const likeCardButtons = card.querySelector(".card__button-like");
  const deleteCardButtons = card.querySelector(".card__button-delete");
  
  // Заполнение карточки
  cardPhotoElement.src = pic;
  cardPhotoElement.alt = title;
  cardTitleElement.textContent = title;

  // Лайки
  likeCardButtons.addEventListener("click", function (event) {
    event.target.classList.toggle("card__button-like_active");
  });

  // Удаление карточки
  deleteCardButtons.addEventListener("click", function () {
    card.remove();
  });

  // Открытие фотографии в попапе
  cardPhotoElement.addEventListener("click", function () {
    openPopup(picPopup);
    popupPhotoElement.src = cardPhotoElement.src;
    popupPhotoElement.alt = cardTitleElement.textContent
    popupTitleElement.textContent = cardTitleElement.textContent;
  });

  return card;
}

// Добавление на страницу карточки ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function addCard(cards, card) {
  cards.prepend(card);
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ОБРАБОТЧИКИ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Открытие popup редактирования профиля ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

editProfileButton.addEventListener("click", function() {
  openPopup(editProfilePopup);
  fullNameInput.value = fullNameElement.textContent;
  professionInput.value = professionElement.textContent;
});

// Открытие popup новой карточки ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

addCardButton.addEventListener("click", function() {
  openPopup(addCardPopup);
});

// Закрытие popup  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

let mouseDownTarget;
let mouseUpTarget;

  // Переменная нажатия кнопки
document.addEventListener("mousedown", function(event) {
  mouseDownTarget = event.target;
})

  // Переменная отжатия кнопки
document.addEventListener("mouseup", function(event) {
  mouseUpTarget = event.target;
});

  // Закрытие
popups.forEach(function (popup, i) {

  //          по крестику
  closePopupButtons[i].addEventListener("click", function() {
    closePopup(popup);
  });

  //          по вне
  popup.addEventListener("click", function(event) {
    if (event.target === event.currentTarget && mouseDownTarget === mouseUpTarget) {
      closePopup(popup);
    }
  });

  //          по esc
  // document.removeEventListener("keydown", closePopupEsc);
});

// Сохранение профайла ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

editProfileForm.addEventListener("submit", function(event) {
  event.preventDefault();

  fullNameElement.textContent = fullNameInput.value;
  professionElement.textContent = professionInput.value;

  const popup = editProfileForm.closest(".popup");
  
  closePopup(popup);
});

// Добавление на страницу первоначальной карточки ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

primalCards.forEach(function(cardData) {
  addCard(cards, createCard(cardData.link, cardData.name));
});

// Добавление на страницу новой карточки ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

addCardForm.addEventListener("submit", function(event) {
  event.preventDefault();
  addCard(cards, createCard(picInput.value, titleInput.value));
  closePopup(addCardPopup);
});