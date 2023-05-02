
class Filter {
  constructor(selectorFilterBlock, selectorTagsBlock, {data, renderMosaicCardList}){
    this.data = data;
    this.openButton      = document.querySelector('.search__openfilter');
    this.filterBlock     = document.querySelector(selectorFilterBlock);
    this.tagsBlock       = document.querySelector(selectorTagsBlock);
    this.dateSelect      = this.filterBlock.querySelector('.block_date');
    this.clearButton     = this.filterBlock.querySelector('.filters__button_reset');
    this.submitButton    = this.filterBlock.querySelector('.filters__button_submit');
    
    let represent        = document.querySelector('.represent_mosaicview');
    this.totalResult     = represent.querySelector('.represent__counter');
    this.searchTextInput = represent.querySelector('.search__main-input');
    
    this._searchQuery    = {};
    this.result          = {};

    this.renderMosaicCardList = renderMosaicCardList;

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

        if (!this[code].includes(values[i])) { 
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

  _dateFormatter (value) {
    let text = value.toString().split('-');
    let date ='';
    for (let i=text.length-1; i>=0; i--) {
      if (i<text.length-1) {
        date =date+'.'+text[i];
      } else {
        date =date+text[i];
      }
    }
    return date;
  }

  _initDatePicker() {
    let select = this.filterBlock.querySelector('.block_date');
    let selectSingle_title = select.querySelector('.filters__select-title');

    let dateInput = select.querySelector('.filter__datapicker');

    dateInput.addEventListener('change', ()=> {
     let date = this._dateFormatter(dateInput.value);
      let code = 'commissioning_date';
      if (this._searchQuery.hasOwnProperty(code)) {
        if (!this._searchQuery[code].includes(date)) {
          this._searchQuery[code].push(date);
        }
      } else {
        this._searchQuery[code] = [date];
        }
    })
  
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

 // темплейт для одного элемента селекта 
  _getSelectElement () {
    let cardTemplate =  document.querySelector('.select_template').content.querySelector('.filter__select-item').cloneNode(true);
    return cardTemplate;
  }

// создаем одну полоску элемента селекта 
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

          let tags = Array.from(this.tagsBlock.querySelectorAll('.tag'));
          if (tags.length != 0){
            let tag = tags.filter(item => item.querySelector('.tag__text').textContent === text);
            tag[0].remove();
          }
        }
      } else {
        el.classList.add('active');
        let code = `${id}`;
        
        if (this._searchQuery.hasOwnProperty(code)) {
          
          if (!this._searchQuery[code].includes(text)) {
            if (code === 'rating') {
              this._searchQuery[code].push(text.length);
            }  else {
              this._searchQuery[code].push(text);
            }

          }
        } else {
          if (code === 'rating') {
            this._searchQuery[code]= [text.length];
          }  else {
            this._searchQuery[code] = [text];
          }
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
          selectContent.append(this._renderSelectElement(el, key));
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
    this.dateSelect.setAttribute('data-state', '');
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
          this.dateSelect.setAttribute('data-state', '');
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
  _renderTagElement(el, key) {
    let card = this._getTagElement();
    let cardText = card.querySelector('.tag__text');
    card.setAttribute('data-key', key);
    if (key === 'rating') {
      cardText.textContent = this._formatterRating(el);
    } else {
      cardText.textContent = el;
    }
    let deleteBtn = card.querySelector('.tag__delete');
   
    deleteBtn.addEventListener('click', (e) => {
      card.remove();
           
        if (this._searchQuery.hasOwnProperty(key)) {
          let index;
          if (key === 'rating') {
            index = this._searchQuery[key].indexOf(cardText.textContent.length);
          } else {
            index = this._searchQuery[key].indexOf(cardText.textContent);
          }
 
          if (index != -1) {
            this._searchQuery[key].splice(index,1);
          }
          if (this._searchQuery[key].length === 0) {
            delete this._searchQuery[key];
          }
        }

      this.search();
    })
    
    return card;
  }


  // очистить выбранные пункты в селектах
  _resetSelectsItem () {
    let selectsElement = Array.from(document.querySelectorAll('.filter__select-item'));
    selectsElement.forEach(item => item.classList.remove('active'));
  }


  // очищение формы фильтров
  _resetFilter(){
    this._closeSelects();
    this._resetSelectsItem();
    this._searchQuery = {};
    this.search();
  }

  // отрисовка тэгов
  _renderAllTags(){
    this.tagsBlock.textContent = '';
    for (let key in this._searchQuery) {
      this._searchQuery[key].forEach(el => {
        this.tagsBlock.append(this._renderTagElement(el, key))
      })
    }
  }

  // САБМИТ ФОРМЫ
  _submitFilter(e){
    e.preventDefault();
    this._renderAllTags();  
    this._closeFilter();
    this._closeSelects();
    this.search();
  }

  // фильтрация по выбранным фильтрам
 _searchByFilter(objValues, searchValues) {
  for (let s=0; s<searchValues.length; s++) {
    let arrayFromObjValues = [];
    if (typeof(objValues) ==='object') {
      arrayFromObjValues = Object.values(objValues);
    } else if (Array.isArray(objValues)){
      arrayFromObjValues = objValues;
    } else {
      arrayFromObjValues.push(objValues);
    }

    for (let i = 0; i< arrayFromObjValues.length; i++) {
      if (typeof(arrayFromObjValues[i])==='object'||Array.isArray(arrayFromObjValues[i])){
        if (this._searchByFilter(arrayFromObjValues[i], searchValues)) {
          return true;
        }
      }

      else if (typeof(arrayFromObjValues[i]) === 'number'||typeof(arrayFromObjValues[i]==='string')) {
        if (searchValues[s].toString().includes(arrayFromObjValues[i].toString())) {
          return true;
        } 
      }
    }
  }
}

  
// поиск по строке из инпута
  _searchInElement(element) {
    let inputText = this.searchTextInput.value.toLowerCase();
    let elemArray =[];
  
    if (typeof(element) ==='object') {
      elemArray = Object.values(element);
    } else {
      elemArray = element;
    }

    for (let i=0; i<=elemArray.length-1; i++) {
      if (elemArray[i] === null) {
        continue;
      }

      else if (typeof(elemArray[i]) === 'number'||typeof(elemArray[i]) === 'string') {
        if (elemArray[i].toString().toLowerCase().includes(inputText)) {
          return true;
        }
      } 
      else if (Array.isArray(elemArray[i])||typeof(elemArray[i]) === 'object') {
        if (this._searchInElement(elemArray[i])){
          return true;
        }
      }
    }
    return false;
  }
       
// общая функция поиска
  search() {
      let result = [];
      let finalResult = [];
    // если запрос пустой, рисуем чо есть
      if (this.searchTextInput.value === '' && Object.keys(this._searchQuery).length === 0) {
        finalResult = this.data;
        this.totalResult.textContent = finalResult.length;
        this.renderMosaicCardList(finalResult);
      } else {
        
      // проверяем запрос
        // сначала по вводимой строке
        this.data.map(item => {
          if (this._searchInElement(item)) {
              result.push(item);
          }
        })

        // потом по фильтрам, которые выставлены
         result.map(item => {
          if (Object.keys(this._searchQuery).length === 0) {
            finalResult.push(item);
          }
       
          for (let key in this._searchQuery) {
            let searchValues = Object.values(this._searchQuery[key]);
            let objValues;
            if (item[key] === null) {
              continue;
            }

            if (typeof(item[key]) === 'object') {
              objValues = Object.values(item[key]);
            } else {
              objValues = item[key];
            }

            
            if (this._searchByFilter(objValues, searchValues)) {
              finalResult.push(item);
            }
          }
        }) 

        this.totalResult.textContent = finalResult.length;
        this.renderMosaicCardList(finalResult);
        return finalResult; 
    }
  }
  
  _addEventListenerToInput () {
    this.searchTextInput.addEventListener('input', (e) => {
      this.search();
    })
  }


  // инициализация фильтра на странице
  initFilter () {
    this._getSelectItems();
    this._fillSelect();
    this._initDatePicker();
    this._addListenersToSelect();
    this._addEventListenerToInput();

    this.renderMosaicCardList(this.data);

    this.openButton.addEventListener('click', (e)=> {
      e.preventDefault();
      if (e.currentTarget.classList.contains('active')) {
        this._closeFilter();
      } else {
        this._openFilter();
      }
    })

    this.clearButton.addEventListener('click', () => {this._resetFilter()})
    this.submitButton.addEventListener('click', (e) => {this._submitFilter(e)});
    this.totalResult.textContent = this.data.length;
  }
}

export default Filter;



