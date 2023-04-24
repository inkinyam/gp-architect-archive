export default class Section {
  constructor (renderer, containerSelector) {
    this._container     = document.querySelector(containerSelector);
    this._renderer      = renderer;
  }
//метод, который отвечает за добавление 1 элемента в контейнер
  addItem (element) {
    this._container.append(element);
  }

  //метод, который отвечает за добавление 1 элемента в начало контейнера
  renderNewElement (element) {
    this._container.prepend(element);
  }
  
// метод, который отвечает за отрисовку всех элементов
  renderItems(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  }
}