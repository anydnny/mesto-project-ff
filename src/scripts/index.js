import "../pages/index.css";
import { initialCards } from "./cards.js";

const cardList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

//TODO: Реализовать открытие попапа и анимацию

//
const profileName = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");

const editPopupForm = document.forms["edit-profile"];
const editFormName = editPopupForm.elements.name;
const editFormDesc = editPopupForm.elements.description;

///
function deleteCard(cardElement) {
  cardElement.remove();
}

function likeClickFn(e) {
  e.target.classList.toggle('card__like-button_is-active')
}

function createCard(card, removeCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeBtn = cardElement.querySelector('.card__like-button');

  cardImage.src = card.link;
  cardImage.alt = `На фото ${card.name}`;
  cardTitle.textContent = card.name;

  cardDeleteBtn.addEventListener("click", () => removeCard(cardElement));
  cardLikeBtn.addEventListener('click', likeClickFn);

  return cardElement;
}

function addStarterCards() {
  initialCards.forEach((card) => {
    const cardItem = createCard(card, deleteCard);
    cardList.append(cardItem);
  });
}

addStarterCards();

// Поп апы

// Открытие редактирования профиля
const editBtn = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");

editBtn.addEventListener("click", openEditPopup);

function openEditPopup() {
  editPopup.classList.add("popup_is-opened");
  editPopup.addEventListener("click", closeEditPopup);
  window.addEventListener("keydown", closeEditPopupEsc);
  console.log('Слушатель на закрытие')

  const profileName = document.querySelector(".profile__title");
  const profileDesc = document.querySelector(".profile__description");

  const editPopupForm = document.forms["edit-profile"];
  const editFormName = editPopupForm.elements.name;
  const editFormDesc = editPopupForm.elements.description;

  editFormName.value = profileName.textContent;
  editFormDesc.value = profileDesc.textContent;

  function editFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = editFormName.value;
    profileDesc.textContent = editFormDesc.value;
    editPopup.classList.remove("popup_is-opened");
    console.log(evt)
    editPopupForm.removeEventListener('submit', editFormSubmit)
  }

  editPopupForm.addEventListener('submit', editFormSubmit)
  console.log('Добавлен слушатель на submit')
}
function closeEditPopup(evt) {
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup")
  ) {
    editPopup.classList.remove("popup_is-opened");
    editPopup.removeEventListener("click", closeEditPopup);
    window.removeEventListener("keydown", closeEditPopupEsc);
  }
}

function closeEditPopupEsc(evt) {
  if (evt.key === "Escape") {
    editPopup.classList.remove("popup_is-opened");
    window.removeEventListener("keydown", closeEditPopupEsc);
  }
}

// Редактирование профиля

// СОздание карточки
const addBtn = document.querySelector(".profile__add-button");
const addPupup = document.querySelector(".popup_type_new-card");
const addPopupForm = document.forms["new-place"];
const placeNameInput = addPopupForm.elements["place-name"];
const placeImageInput = addPopupForm.elements["link"];


addBtn.addEventListener("click", openAddPopup);

// Сабмит +

//Отдельная функция для добавления новой карточки
function createNewCard(newCard, removeCardFn, likeCardFn) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeBtn = cardElement.querySelector('.card__like-button');

  cardImage.src = newCard.link;
  cardImage.alt = `На фото ${newCard.name}`;
  cardTitle.textContent = newCard.name;

  cardDeleteBtn.addEventListener("click", () => removeCardFn(cardElement));
  cardLikeBtn.addEventListener('click', likeClickFn)
  return cardElement;
}

// Функция отправки формы добавления карточки
function addFormSubmit(evt) {
  evt.preventDefault();

  const newCardValues = {
    name: placeNameInput.value,
    link: placeImageInput.value,
    alt: placeNameInput.value
  }

  const cardItem = createNewCard(newCardValues, deleteCard, likeClickFn);
  cardList.append(cardItem);

  placeNameInput.value = "";
  placeImageInput.value = "";

  addPupup.classList.remove("popup_is-opened");
  addPupup.removeEventListener('submit', addFormSubmit);
  addPupup.removeEventListener("click", closeAddPopup);
  window.removeEventListener("keydown", closeAddPopupEsc);
}
// Открытие попапа добавления карточки
function openAddPopup(evt) {
  addPupup.classList.add("popup_is-opened");

  addPupup.addEventListener("click", closeAddPopup);
  window.addEventListener("keydown", closeAddPopupEsc);
  addPopupForm.addEventListener('submit', addFormSubmit)
}
// Закрытие попапа добавления карточки по клику
function closeAddPopup(evt) {
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup")
  ) {
    addPupup.classList.remove("popup_is-opened");
    addPupup.removeEventListener("click", closeAddPopup);
    window.removeEventListener("keydown", closeAddPopupEsc);
    addPopupForm.removeEventListener('submit', addFormSubmit)
  }
}
// Закрытие попапа добавления карточки по нажатию Escape
function closeAddPopupEsc(evt) {
  if (evt.key === "Escape") {
    addPupup.classList.remove("popup_is-opened");
    window.removeEventListener("keydown", closeAddPopupEsc);
    addPopupForm.removeEventListener('submit', addFormSubmit)
  }
}
