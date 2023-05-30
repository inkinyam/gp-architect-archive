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

//метод, который реализует получение данных по всем проектам из апи
  getAllProjects () {
    return fetch (`${this.baseUrl}/api/v1/project/projects/`, {
      headers: this.headers
    })
    .then (res => {return this._checkRes(res)})
  }
  
  //метод, который реализует получение полного json
  getGeoJson() {
    return fetch (`${this.baseUrl}/api/v1/project/geo-json/`, {
      headers: this.headers
    })
    .then (res => {return this._checkRes(res)})
  }

  // метод, реализующий получения полного списка тэгов с АПИ
  getTags () {
    return fetch (`${this.baseUrl}/api/v1/project/tags/`, {
      headers: this.headers
    })
    .then (res => {return this._checkRes(res)})
  }
}