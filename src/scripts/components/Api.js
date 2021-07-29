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
    const promise = fetch(`${this._baseUrl}/${this._groupID}/cards`, {
      headers: {
        authorization: this._headers.authorization
      }
    })

    return this._wrapPromise(promise);
  }

  getProfileData() {
    const promise = fetch(`${this._baseUrl}/${this._groupID}/users/me`, {
      headers: {
        authorization: this._headers.authorization
      }
    })

    return this._wrapPromise(promise);
  }

  setAvatar(avatar) {
    const promise = fetch(`${this._baseUrl}/${this._groupID}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })

    return this._wrapPromise(promise);
  }

  setProfileData(inputsObject) {
    const promise = fetch(`${this._baseUrl}/${this._groupID}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: inputsObject.fullName,
        about: inputsObject.profession
      })
    })

    return this._wrapPromise(promise);
  }

  createCard(inputsObject) {
    const promise = fetch(`${this._baseUrl}/${this._groupID}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: inputsObject.title,
        link: inputsObject.pic
      })
    })

    return this._wrapPromise(promise);
  }

  removeCard(id) {
    const promise = fetch(`${this._baseUrl}/${this._groupID}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })

    return this._wrapPromise(promise);
  }

  likeCard(id) {
    const promise = fetch(`${this._baseUrl}/${this._groupID}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers
    })

    return this._wrapPromise(promise);
  }

  unlikeCard(id) {
    const promise = fetch(`${this._baseUrl}/${this._groupID}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers
    })

    return this._wrapPromise(promise);
  }

  _wrapPromise(promise) {
    return promise
      .then(res => {
        if (res.ok) { return res.json() }
        return Promise.reject(`Статут ошибки: ${res.status}`);
      })
  }
}
