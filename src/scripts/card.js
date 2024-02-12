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
  cardImage.addEventListener('click', () => openCardImg(cardValues.link, cardValues.name));
  return cardElement;
}
// Удаление карточки
function removeCardClick(card) {
  card.remove();
}
// Лайк карточки
function likeClickFn(e) {
  e.target.classList.toggle('card__like-button_is-active');
}

export {
  createNewCard,
  removeCardClick,
  likeClickFn,
};
