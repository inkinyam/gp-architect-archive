class Filter {
  constructor(selectorFilterBlock, selectorTagsBlock, data){
    this.filterBlock = document.querySelector(selectorFilterBlock);
    this.tagsBlock   = document.querySelector(selectorTagsBlock);
    this.data = data;
    this.dateSelect     = this.filterBlock.querySelector('.block-date');
    this.agrDateSelect  = this.filterBlock.querySelector('.block-agr-date');

    this.initFilter();


    this._handleEscListener = function (evt) {
      if (evt.key === "Escape") {
        this.close();
      }
    }
    this._handleEscListener = this._handleEscListener.bind(this);

  }

  _getKeys(){
    let line = this.data.rows[0];
    this.keys = Object.keys(line);
   }

  _getValues(row) {
    let values = Object.values(row);
    return values;
  } 

  // получаем уникальные значения для селектов в отдельные массивы по ключам
  _getSelectItems() {
    this.rows = this.data.rows;
    this._getKeys();
    this.keys.forEach((key) => {
      this[`block_${key}`] = []; 
    });
    this.rows.forEach((row) => {
      for (let i = 0; i < this.keys.length; i++) {
        let values = this._getValues(row);
        let code = `block_${this.keys[i]}`; 

        if (!this[code].includes(values[i])) { // проверяем, есть ли уже такой объект в массиве
          this[code].push(values[i]);
        }
      }
    });
  }


 // темплейт для одного элемента селекта 
  _getSelectElement () {
    let cardTemplate =  document.querySelector('.select_template').content.querySelector('.filter__select-item').cloneNode(true);
    return cardTemplate;
  }

// создаем одну полоску
  _renderSelectElement (el, arrName, inx) {
   let card = this._getSelectElement();
    const input = card.querySelector('.filters__select-input');
    const label = card.querySelector('.filters__select-label');
    input.id = `${arrName}_${inx}`;
    let text1 = el.split('>');
    let text2 = text1[1].split('<');

    label.textContent = text2[0];
    label.setAttribute('for', `${input.id}`);

    return card;
  }
  

  _addListenersToSelectElement (el) {
    el.addEventListener('click', (e)=> {

    })
  }


  _fillSelect() {
    this.keys.forEach((key) => {
      const select = document.querySelector(`.block_${key}`); 
      if (select) {
        const selectContent = select.querySelector('.filters__select-content');
        
        this[`block_${key}`].forEach((el, indx)=> {
          selectContent.append(this._renderSelectElement(el, `block_${key}`, indx ));
        })
      }
    });
  } 



  initFilter () {
    this._getSelectItems();
    this._fillSelect()
  }
}

export default Filter;




  // для всех блоков из construcror создаем через темплейты и append селекты со всеми возможными вариантами
  // при выборе какого-то чекбокса в селекте и нажатии кнопки "применить" должны создать столько плашек tags со значениями, которые есть
  // при нажатии на кнопку "применить" запускается get запрос в api на получение данных  -- или фильтрация на месте?
  // на каждую плашку навесить обработчик события, который удаляет плашку и запускает поиск заново (отправить в api?) - или фльтр?
  // при нажатии на кнопку "отменить" нужно обновить все фильтры до нулевого значения

