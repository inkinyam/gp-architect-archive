export default class Api {
  constructor (baseUrl, {headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

//метод, проверяющий какой результат пришел, возвращает объект если ок, и ошибку, если нет
  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

//метод, который реализует получение карточки с сервера
  getAllProjects () {
    return fetch (`${this.baseUrl}/project/projects/`, {
      headers: this.headers
    })
    .then (res => {return this._checkRes(res)})
  }

  getGeoJson() {
    return fetch (`${this.baseUrl}/project/geo-json/`, {
      headers: this.headers
    })
    .then (res => {return this._checkRes(res)})
  }

  getTags () {
    return fetch (`${this.baseUrl}/project/tags/`, {
      headers: this.headers
    })
    .then (res => {return this._checkRes(res)})
  }

}