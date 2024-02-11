import { closePopup, openPopup } from './modal.js';

// Фуникция создания карточки
function createNewCard(cardValues, removeCardFn, likeCardFn, openCardImg) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardDeleteBtn = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');

  cardImage.src = cardValues.link;
  cardImage.alt = `На фото ${cardValues.name}`;
  cardTitle.textContent = cardValues.name;

  cardDeleteBtn.addEventListener('click', () => removeCardFn(cardElement));
  cardLikeBtn.addEventListener('click', likeCardFn);
  cardImage.addEventListener('click', openCardImg);
  return cardElement;
}
// Добавление карточки в список
function addCardToList(card, cardList) {
  cardList.prepend(card);
}
// Функция добавления исходных карточек
function addStarterCards(cardList, initialCards) {
  initialCards.forEach((item) => {
    const newCard = createNewCard(
      item,
      removeCardClick,
      likeClickFn,
      openFullImg
    );
    addCardToList(newCard, cardList);
  });
}
// Сабмит формы создания карточки
function submitCardForm(e, form, cardList) {
  e.preventDefault();
  const newCardValues = {
    name: form.elements['place-name'].value,
    link: form.elements['link'].value,
    alt: form.elements['place-name'].value,
  };
  const card = createNewCard(
    newCardValues,
    removeCardClick,
    likeClickFn,
    openFullImg
  );
  addCardToList(card, cardList);
  form.reset();
  closePopup();
}
// Удаление карточки
function removeCardClick(card) {
  card.remove();
}
// Лайк карточки
function likeClickFn(e) {
  e.target.classList.toggle('card__like-button_is-active');
}
// Открытие фотографии
function openFullImg(e) {
  const imagePopup = document.querySelector('.popup_type_image');
  const fullImage = document.querySelector('.popup__image');
  const popupImageDesc = document.querySelector('.popup__caption');

  fullImage.src = e.target.closest('.card__image').src;
  fullImage.alt = e.target.closest('.card__image').alt;
  popupImageDesc.textContent = e.target.closest('.card__image').alt;

  openPopup(imagePopup);
}

export {
  addStarterCards,
  submitCardForm,
  createNewCard,
  removeCardClick,
  likeClickFn,
  openFullImg,
};
