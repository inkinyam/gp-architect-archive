
class Filter {
  constructor(selectorFilterBlock, selectorTagsBlock, data){
    this.openButton = document.querySelector('.search__openfilter');
    this.filterBlock = document.querySelector(selectorFilterBlock);
    this.tagsBlock   = document.querySelector(selectorTagsBlock);
    this.data = data;
    this.dateSelect   = this.filterBlock.querySelector('.block-date');
    this.clearButton  = this.filterBlock.querySelector('.filters__button_reset');
    this.submitButton = this.filterBlock.querySelector('.filters__button_submit');
    let represent     = document.querySelector('.represent_mosaicview');
    this.totalResult  = represent.querySelector('.represent__counter');
    this._searchQuery = {};
    this.result       = {};

    //слушатель на esc
    this._handleEscListener = function (evt) {
      if (evt.key === "Escape") {
        this._closeSelects();
      }
    }
    this._handleEscListener = this._handleEscListener.bind(this);
    
    this.initFilter();


  }

// открыть блок фильтров
  _openFilter(){
    this.filterBlock.classList.add('active');
    this.openButton.classList.add('active');
     /* document.addEventListener('click',e => this._handleMouseClickListener(e));  */
  }

  // закрыть блок фильтров
  _closeFilter(){
    this.filterBlock.classList.remove('active');
    this.openButton.classList.remove('active');
   /*  document.removeEventListener('click', this._handleMouseClickListener());  */
  }

  // получаем все ключи из объекта data
  _getKeys(){
    let line = this.data[0];
    this.keys = Object.keys(line);
   }

  //получаем все значения по ключам (записываем их в соответствующие массивы с названием block_значение-ключа)
  _getValues(row) {
    let values = Object.values(row);
    return values;
  } 

  // получаем уникальные значения для селектов в отдельные массивы по ключам
  _getSelectItems() {
    this.rows = this.data;
    this._getKeys();
    this.keys.forEach((key) => {
      this[`block_${key}`] = []; 
    });
    this.rows.forEach((row) => {
      for (let i = 0; i < this.keys.length; i++) {
        let values = this._getValues(row);
        let code = `block_${this.keys[i]}`; 

        if (!this[code].includes(values[i])) { // проверяем, есть ли уже такой объект в массиве
          if(Array.isArray(values[i])) {
            this[code].push(...values[i].filter(val => !this[code].includes(val)));
          } else {
            this[code].push(values[i]);
          }
        }
      }
    });
    this.keys.forEach((key) => {
      const code = `block_${key}`;
      this[code] = Array.from(new Set(this[code]));
    });
  }

 // темплейт для одного элемента селекта 
  _getSelectElement () {
    let cardTemplate =  document.querySelector('.select_template').content.querySelector('.filter__select-item').cloneNode(true);
    return cardTemplate;
  }

// создаем одну полоску в селект
  _renderSelectElement (el) {
   let card = this._getSelectElement();
    const text = card.querySelector('.filter__select-text');
   
    if (el instanceof Object) {
      el = el.name;
    }
    text.textContent = el;
    
    this._addListenersToSelectElement(card);
    return card;
  }
  
  // слушатели на каждый элемент селекта
  _addListenersToSelectElement (el) {
    el.addEventListener('click', (e)=> {
      let id = el.parentElement.parentElement.classList[1].substring(6);
      let text = el.querySelector('.filter__select-text').textContent;
      
      if (el.classList.contains('active')) {
        el.classList.remove('active');
        let code = `${id}`;
        if (this._searchQuery.hasOwnProperty(code)) {
          let index = this._searchQuery[code].indexOf(text);
          if (index !== -1) {
            this._searchQuery[code].splice(index, 1);
          }
          if (this._searchQuery[code].length === 0) {
            delete this._searchQuery[code];
          }
        }
      } else {
        el.classList.add('active');
        let code = `${id}`;
        if (this._searchQuery.hasOwnProperty(code)) {
          if (!this._searchQuery[code].includes(text)) {
            this._searchQuery[code].push(text);
          }
        } else {
          this._searchQuery[code] = [text];
        }
      }  
    })
  }

  // переводим цифры в звездочки
  _formatterRating (el) {
    let str ='';
    for (let i = 0; i< el; i++) {
      str = str + '★';
    }
    return str;
  }

  // заполняем селекты всеми возможными полями, которые есть в data
  _fillSelect() {
    this.keys.forEach((key) => {
      const select = document.querySelector(`.block_${key}`); 
      if (select) {
        const selectContent = select.querySelector('.filters__select-content');
        
        this[`block_${key}`].forEach((el, indx)=> {
          if (key ==='district') {
            el = el.abbreviation; // заполняем полем аббревиатуры, а не имени
          } else if (key ==='rating') {
            el = this._formatterRating(el); // здездочки вместо цифр
          }
          selectContent.append(this._renderSelectElement(el, `block_${key}`, indx ));
        })
      }
    });
  } 
  
  // закрывание селектов, удаление слушателя на esc
  _closeSelects () {
    this.keys.forEach((key) => {
      const select = document.querySelector(`.block_${key}`); 
      if (select) {
        select.setAttribute('data-state', '');
      }
    })
   
    document.removeEventListener('keydown', this._handleEscListener);
  }

  // навешивание слушателей на селекты
  _addListenersToSelect () {
    this.keys.forEach((key) => {
      const select = document.querySelector(`.block_${key}`); 
      if (select) {
        const selectSingle_title = select.querySelector('.filters__select-title');
    
        selectSingle_title.addEventListener('click', () => {
          if ('active' === select.getAttribute('data-state')) {
            select.setAttribute('data-state', '');
          } else {
          //закрыть все другие
          this.keys.forEach((key) => {
            const select = document.querySelector(`.block_${key}`); 
            if (select) {
              select.setAttribute('data-state', '');
            }
          })
            select.setAttribute('data-state', 'active');
          }
          //на документ навесить клик на esc
          document.addEventListener('keydown',this._handleEscListener);
        });
      }
    })
  }
  
  // темплейт для одного элемента тега 
  _getTagElement () {
    let cardTemplate =  document.querySelector('.tag_template').content.querySelector('.tag').cloneNode(true);
    return cardTemplate;
  }

  // рендер тэга
  _renderTagElement(el) {
    let card = this._getTagElement();
    let cardText = card.querySelector('.tag__text');
    cardText.textContent = el;
    let deleteBtn = card.querySelector('.tag__delete');
   
    deleteBtn.addEventListener('click', e => {
      card.remove();

      for (let key in this._searchQuery) {
        if (this._searchQuery.hasOwnProperty(key)) {
          let index = this._searchQuery[key].indexOf(cardText.textContent);
          if (index != -1) {
            this._searchQuery[key].splice(index,1);
          }
          if (this._searchQuery[key].length === 0) {
            delete this._searchQuery[key];
          }
        }
      }

      this.search();
    })
    
    return card;
  }

  // очищение формы фильтров
  _resetFilter(){
    let selectsElement = Array.from(this.filterBlock.querySelector('.filter__select-item'));
    selectsElement.forEach(item => item.classList.remove('active'));
    this._searchQuery = {};
    this.search();
  }


  // отрисовка тэгов
  _renderAllTags(){
    for (let key in this._searchQuery) {
      this._searchQuery[key].forEach(el => {
        this.tagsBlock.append(this._renderTagElement(el))
      })
    }
  }

  // САБМИТ ФОРМЫ
  _submitFilter(){
    this._renderAllTags();  
    this._closeFilter();
    this.search();
  }

  // функция поиска
  search() {
    let result;
    if (Object.keys(this._searchQuery).length === 0) {
      this.totalResult.textContent = this.data.length;
      return this.data;
    }
     result = this.data.filter(item => {
      for (let key in this._searchQuery) {
        if (Array.isArray(item[key])) {
          // если значение ключа - массив
          for (let i = 0; i < item[key].length; i++) {
            if (this._searchQuery[key].includes(item[key][i])) {
              return true;
            }
          }
        } else if (typeof item[key] === 'object') {
          // если значение ключа - объект
          for (let subKey in this._searchQuery[key][0]) {
            if (this._searchQuery[key][0][subKey] !== item[key][subKey]) {
              return false;
            }
          }
          return true;
        } else {
          // если значение ключа - простое значение
          if (this._searchQuery[key].includes(item[key])) {
            return true;
          }
        }
      }
      return false;
    });
 
    this.totalResult.textContent = result.length;
    return result;
  }


  // инициализация фильтра на странице
  initFilter () {
    this._getSelectItems();
    this._fillSelect();
    this._addListenersToSelect();

    this.openButton.addEventListener('click', (e)=> {
      if (e.currentTarget.classList.contains('active')) {
        this._closeFilter();
      } else {
        this._openFilter();
      }
    })

    this.clearButton.addEventListener('click', () => {this._resetFilter()})
    this.submitButton.addEventListener('click',(e) => {this._submitFilter()});
    this.totalResult.textContent = this.data.length;

  }
}

export default Filter;



