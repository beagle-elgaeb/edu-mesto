// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ ЗАПРОСЫ К СЕРВЕРУ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._groupID = options.groupID;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/${this._groupID}/cards`, {
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then(res => res.json())
  }

  getProfileData() {
    return fetch(`${this._baseUrl}/${this._groupID}/users/me`, {
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then(res => res.json())
  }

  setAvatar(avatar) {
    return fetch(`${this._baseUrl}/${this._groupID}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
  }

  setProfileData(inputsObject) {
    return fetch(`${this._baseUrl}/${this._groupID}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: inputsObject.fullName,
        about: inputsObject.profession
      })
    })
  }

  createCard(inputsObject) {
    return fetch(`${this._baseUrl}/${this._groupID}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: inputsObject.title,
        link: inputsObject.pic
      })
    })
      .then(res => res.json())
  }

  removeCard(id) {
    return fetch(`${this._baseUrl}/${this._groupID}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
  }

  likeCard(id) {
    return fetch(`${this._baseUrl}/${this._groupID}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers
    })
  }

  unlikeCard(id) {
    return fetch(`${this._baseUrl}/${this._groupID}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
  }
}
