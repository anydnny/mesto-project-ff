import '../pages/index.css';
import {
  createNewCard,
  removeCardClick,
  likeClickFn
} from './card.js';
import { openPopup, closePopup } from './modal.js';
import { enableValidation, clearValidation } from './validation.js'
import { getInitialCards, getProfileInfo, patchProfileInfo, postNewCard, patchProfileAvatar, checkResp } from './request.js';

const cardList = document.querySelector('.places__list'); // список карточек

// Кнопка и попап редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
// Имя и описание профиля
const profileName = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
//Аватар пользователя
const profileAvatar = document.querySelector('.profile__image');
const profileAvatarPopup = document.querySelector('.popup_type_avatar');
const profileAvatarForm = document.forms['edit-avatar']
const profileAvatarEditButton = profileAvatarForm.elements.submit
// Поля и форма редактирования профиля
const profileEditForm = document.forms['edit-profile'];
const profileFormName = profileEditForm.elements.name;
const profileFormDesc = profileEditForm.elements.description;
const profileFormButton = profileEditForm.elements.submit
// Кнопка, попап и форма добавление карточки
const newCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = document.forms['new-place'];
const newCardFormButton = newCardForm.elements.submit;
//Изображения, открытие изображения
const imagePopup = document.querySelector('.popup_type_image');
const popupFullImage = document.querySelector('.popup__image');
const popupImageDesc = document.querySelector('.popup__caption');
//Элементы для валидации
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_is-active'
};

let userId;

// Сабмит формы редактирования профиля
function editFormSubmit(e) {
  e.preventDefault();
  profileFormButton.textContent = 'Сохранение...';
  profileFormButton.disabled = true;
  patchProfileInfo(profileFormName.value, profileFormDesc.value)
    .then((info) => {
      profileName.textContent = info.name;
      profileDesc.textContent = info.about;
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      closePopup(profileEditPopup)
      profileFormButton.textContent = 'Сохранить';
      profileFormButton.disabled = false;
    })
}
//Клик по аватарке
profileAvatar.addEventListener('click', () => {
  profileAvatarForm.elements.avatar.value = '';
  clearValidation(profileAvatarForm, validationSettings);
  openPopup(profileAvatarPopup)
})
profileAvatarForm.addEventListener('submit', () => {
  profileAvatarEditButton.textContent = 'Сохранение...'
  patchProfileAvatar(profileAvatarForm.elements.avatar.value)
    .then((info) => {
      profileAvatar.style.backgroundImage = 'url('+ info.avatar +')';
    })
    .catch((err) => console.error(err))
    .finally(() => {
      clearValidation(profileAvatarForm, validationSettings);
      closePopup(profileAvatarPopup);
      profileAvatarEditButton.textContent = 'Сохранить'
    })
})
// Слушатели для редактирования профиля
profileEditButton.addEventListener('click', () => {
  profileFormName.value = profileName.textContent;
  profileFormDesc.value = profileDesc.textContent;
  clearValidation(profileEditForm, validationSettings);
  openPopup(profileEditPopup);
});

profileEditForm.addEventListener('submit', editFormSubmit);

// Слушатели для добавления карточки
newCardButton.addEventListener('click', () => {
  newCardForm.reset();
  clearValidation(newCardForm, validationSettings);
  openPopup(newCardPopup)
});
newCardForm.addEventListener('submit', (e) => submitCardForm(e, newCardForm));

// Добавление карточки в список
function addCardToList(card) {
  cardList.prepend(card);
}

// Сабмит формы создания карточки
function submitCardForm(e, form) {
  e.preventDefault();

  const newCardValues = {
    name: form.elements['place-name'].value,
    link: form.elements['link'].value
  };
  const userInfo = {
    name: profileName,
    desc: profileDesc
  }
  newCardFormButton.textContent = 'Сохранение...';
  newCardFormButton.disabled = true;

  postNewCard(newCardValues)
    .then((newCardInfo) => {
      const card = createNewCard(
        newCardInfo,
        userId,
        removeCardClick,
        likeClickFn,
        openFullImg
      );
      addCardToList(card);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      newCardFormButton.textContent = 'Сохранить';
      newCardFormButton.disabled = false;
      form.reset();
      closePopup(newCardPopup);
    })
}
// Функция добавления исходных карточек
function addStarterCards(initialCards) {
  initialCards.forEach((item) => {
    const userInfo = {
      name: profileName,
      desc: profileDesc
    }

    const newCard = createNewCard(
      item,
      userId,
      removeCardClick,
      likeClickFn,
      openFullImg
    );
    addCardToList(newCard);
  });
}
// Открытие фотографии
function openFullImg(cardDesc, cardName) {
  popupFullImage.src = cardDesc;
  popupFullImage.alt = cardName;
  popupImageDesc.textContent = cardName;

  openPopup(imagePopup);
}

// Активация валидации форм
enableValidation(validationSettings)

Promise.all([getProfileInfo(), getInitialCards()])
.then(([profileInfo, initialCards]) => {
  userId = profileInfo._id;
  profileName.textContent = profileInfo.name;
  profileDesc.textContent = profileInfo.about;
  profileAvatar.style.backgroundImage = 'url('+ profileInfo.avatar +')';
  console.log(initialCards)
  addStarterCards(initialCards)
})

