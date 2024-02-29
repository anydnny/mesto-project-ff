import { deleteCardRequest, putLikePost, deleteLikePost } from "./request";

// Фуникция создания карточки
function createNewCard(cardValues, userId, removeCardFn, likeCardFn, openCardImg) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardDeleteBtn = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');
  const cardLikeCount = cardElement.querySelector('.card__like-count');

  cardElement._id = cardValues._id;
  cardElement._ownerId = cardValues.owner._id;

  cardImage.src = cardValues.link;
  cardImage.alt = `На фото ${cardValues.name}`;
  cardTitle.textContent = cardValues.name;
  cardLikeCount.textContent = cardValues.likes.length;

  cardLikeBtn.addEventListener('click', likeCardFn);
  cardImage.addEventListener('click', () => openCardImg(cardValues.link, cardValues.name));

  if(cardElement._ownerId !== userId) {
    cardDeleteBtn.remove();
  } else {
    cardDeleteBtn.addEventListener('click', () => removeCardFn(cardElement));
  }

  if(cardValues.likes.some((user) => user._id === userId)) {
    cardLikeBtn.classList.toggle('card__like-button_is-active');
  }
  return cardElement;
}
// Удаление карточки
function removeCardClick(card) {
  deleteCardRequest(card._id)
    .then(() =>  card.remove())
    .catch((err) => console.error(err));
}
// Лайк карточки
function likeClickFn(e) {
  const likedCard = e.target.closest('.card');
  const likeCount = likedCard.querySelector('.card__like-count');

  const likeMethod = e.target.classList.contains('card__like-button_is-active') ? deleteLikePost : putLikePost;
  likeMethod(likedCard._id)
    .then((info) => {
      e.target.classList.toggle('card__like-button_is-active');
      likeCount.textContent = info.likes.length;
    })
    .catch((err) => console.error(err))
}

export {
  createNewCard,
  removeCardClick,
  likeClickFn,
};
