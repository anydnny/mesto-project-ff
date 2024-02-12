// Общая функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', handleClosePopupClick);
  document.addEventListener('keydown', handleClosePopupEsc);
}

// Общая функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', handleClosePopupClick);
  document.removeEventListener('keydown', handleClosePopupEsc);
}

// Закрытие по клику
function handleClosePopupClick(e) {
  if (
    e.target.classList.contains('popup__close') ||
    e.target.classList.contains('popup')
  ) {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

// Закрытие по кнопке Esc
function handleClosePopupEsc(e) {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

export { openPopup, closePopup, handleClosePopupEsc };
