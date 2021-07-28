export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getUserInfo(id) {
    //подгрузили инфу о пользователе из сервера
    return fetch(this._url + `users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        userid: id,
      },
    }).then((res) => this._getResponseData(res));
  }

  postUserInfo(name, about, id) {
    //загрузили инфу о пользователе на сервер
    return fetch(this._url + "users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        userId: id,
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._getResponseData(res));
  }

  getAllCards() {
    //загрузили все карточки
    return fetch(this._url + "cards", {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  addNewCard(name, link, id) {
    //добавили карточку
    return fetch(this._url + "cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
        owner: id,
      }),
    }).then((res) => this._getResponseData(res));
  }

  removeCard(id) {
    //удалили карточку
    return fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  setLike(id) {
    //загрузили лайк на сервер
    return fetch(`${this._url}cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  deleteLike(id) {
    //удалили лайк с сервера
    return fetch(`${this._url}cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  userAvatarUpdate(link, id) {
    //загрузили новый аватар
    return fetch(this._url + "users/me/avatar", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        userId: id,
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }
}
const config = {
  url: "https://api.mesto.ivladsk.nomoredomains.club/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

const api = new Api(config);

export default api;
