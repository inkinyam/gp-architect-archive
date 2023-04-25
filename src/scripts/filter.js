class Filter {
  constructor(selectorFilterBlock, selectorTagsBlock, data){
    this.filterBlock = document.querySelector(selectorFilterBlock);
    this.tagsBlock   = document.querySelector(selectorTagsBlock);
    this.data = data;
    this.dateSelect     = this.filterBlock.querySelector('.block-date');
    this.agrDateSelect  = this.filterBlock.querySelector('.block-agr-date');

    //слушатель на esc
    this._handleEscListener = function (evt) {
      if (evt.key === "Escape") {
        this._closeSelects();
      }
    }
    this._handleEscListener = this._handleEscListener.bind(this);

    // вызов функции инициализации
    this.initFilter();
  }

  // получаем все ключи из объекта json
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
  _renderSelectElement (el, arrName, inx) {
   let card = this._getSelectElement();
    const input = card.querySelector('.filters__select-input');
    const label = card.querySelector('.filters__select-label');
    input.id = `${arrName}_${inx}`;

    if (el instanceof Object) {
      el = el.name;
    }
    label.textContent = el;
    label.setAttribute('for', `${input.id}`);

    this._addListenersToSelectElement(card);
    return card;
  }

  
  // слушатели на каждый элемент селекта
  _addListenersToSelectElement (el) {
    el.addEventListener('click', (e)=> {

      // лучше записывать в массив теги, и потом на кнопку "применить" уже отрисовывать
      if (e.target.closest('.filters__select-input').checked) {
        let newTag = this._renderTagElement(el.textContent)
        this.tagsBlock.append(newTag);   
      } else {
        //удалить тег из массива
        //отжать галочку на селекте
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

  // заполняем селекты всеми возможными полями, которые есть в json
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
    })

    return card;
  }


  // инициализация фильтра на странице
  initFilter () {
    this._getSelectItems();
    this._fillSelect();
    this._addListenersToSelect();
  }
}

export default Filter;





  // при нажатии на кнопку "применить" 
          // - создаем плашки тэгов в соответствующей линии
          // - ищем соответствия в json data
          // - возвращаем результат в какой-то json, который будем отрисовывать

  // на каждую плашку тега навесить обработчик события, который удаляет плашку и запускает поиск заново
  // при нажатии на кнопку "отменить" нужно обновить все фильтры до нулевого значения, все плашки тегов из линейки

