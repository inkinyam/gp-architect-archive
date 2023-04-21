class Filter {
  constructor(selectorFilterBlock, selectorTagsBlock, data){
    this.filterBlock = document.querySelector(selectorFilterBlock);
    this.tagsBlock   = document.querySelector(selectorTagsBlock);
    this.data = data;

    this.functionSelect = this.filterBlock.querySelector('.block-functions');
    this.raitingSelect  = this.filterBlock.querySelector('.block-raiting');
    this.archburoSelect = this.filterBlock.querySelector('.block-archburo');
    this.authorSelect   = this.filterBlock.querySelector('.block-author');
    this.customerSelect = this.filterBlock.querySelector('.block-customer');
    this.tagsSelect     = this.filterBlock.querySelector('.block-tags');
    this.adresSelect    = this.filterBlock.querySelector('.block-adress');
    this.districtSelect = this.filterBlock.querySelector('.block-district');
    
    let block_id        = [];
    let block_raiting   = [];
    let block_name      = [];
    let block_customer  = []
    let block_projector = [];
    let block_date      = [];
    let block_district  = [];
    let block_agr       = [];
    let block_archmain  = [];
    let block_tags      = [];
    let block_function  = [];
    
    this.dateSelect     = this.filterBlock.querySelector('.block-date');
    this.agrDateSelect  = this.filterBlock.querySelector('.block-agr-date');

    this.initFilter();
  }

  _getKeys(){
    let line = this.data.rows[0];
    this.keys = Object.keys(line);
   }

   _getValues(row){
    let values = Object.values(row)
    return values;
   } 

  _getSelectItems(){
    this.rows = this.data.rows;
    this.rows.forEach(row => {
        for (let i = 0; i < this.keys.length-1; i++){
         // this.block_`${key[i]}`.push(row.`${key[i]}`); в переменную this.block_(значение массива ключей i_тое) записать значение row.ключ i_тый
         // например key[i] = 'id'. в this.block_id должно знаписаться значение row.id, итого у нас на выходе массив  id из всех row в  this.data
          let values = this._getValues(row);
          let code = `block_${this.keys[i]}`

          `${code}`.push(values[i])
        }
    })

  }

  // для всех блоков из construcror создаем через темплейты и append селекты со всеми возможными вариантами
  // при выборе какого-то чекбокса в селекте и нажатии кнопки "применить" должны создать столько плашек tags со значениями, которые есть
  // при нажатии на кнопку "применить" запускается get запрос в api на получение данных  -- или фильтрация на месте?
  // на каждую плашку навесить обработчик события, который удаляет плашку и запускает поиск заново (отправить в api?) - или фльтр?
  // при нажатии на кнопку "отменить" нужно обновить все фильтры до нулевого значения




  initFilter () {
    this._getKeys();
    this._getSelectItems();
    console.log(this.block_district)
  }
}

export default Filter;