const config = {
  cohort: "wff-cohort-7",
  headers: {
    authorization: "3fa0b03c-d23e-4e2b-a8d0-f2c5f0d752c2",
    "Content-Type": "application/json",
  }
}

function checkResp(res) {
  if(res.ok) {
    return res.json()
  }
  return Promise.reject(`Error ${res.status}`)
}

function getProfileInfo() {
  return fetch(`https://nomoreparties.co/v1/${config.cohort}/users/me`, {
    headers: {
      authorization: config.headers.authorization,
    }
  })
  .then(res => checkResp(res));
}
function getInitialCards() {
  return fetch(`https://nomoreparties.co/v1/${config.cohort}/cards`, {
    headers: {
      authorization: config.headers.authorization,
    }
  })
  .then(res => checkResp(res));
}

function patchProfileInfo(newProfileName, newProfileDesc) {
  return fetch(`https://nomoreparties.co/v1/${config.cohort}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: newProfileName,
      about: newProfileDesc,
    })
  })
  .then(res => checkResp(res))
}

function postNewCard(newCardValues) {
  return fetch(`https://nomoreparties.co/v1/${config.cohort}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(newCardValues)
  })
  .then(res => checkResp(res));
}

function deleteCardRequest(cardId) {
  return fetch(`https://nomoreparties.co/v1/${config.cohort}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  });
}

function putLikePost(cardId) {
  return fetch(`https://nomoreparties.co/v1/${config.cohort}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers
  })
  .then(res => checkResp(res));
}

function deleteLikePost(cardId) {
  return fetch(`https://nomoreparties.co/v1/${config.cohort}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  })
  .then(res => checkResp(res));
}

function patchProfileAvatar(url) {
  return fetch(`https://nomoreparties.co/v1/${config.cohort}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
    })
  })
  .then(res => checkResp(res));
}

export {
  getProfileInfo,
  getInitialCards,
  patchProfileInfo,
  postNewCard,
  deleteCardRequest,
  putLikePost,
  deleteLikePost,
  patchProfileAvatar,
  checkResp
};
