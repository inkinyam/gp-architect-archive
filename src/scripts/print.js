import Tabs from "./LinkedTabs";

class PrintPageToPDF {
  constructor (selector, data) {
    this.block = document.querySelector(selector);
    this.tabs = this.block.querySelector('.pictures-tabs');
    this.templates = Array.from(this.block.querySelectorAll('.template__input'));

    this.photoBlock = this.block.querySelector('.photoblock');
    this.photos = Array.from(this.photoBlock.querySelectorAll('.pictures__block'));

    this.renderBlock = this.block.querySelector('.renderblock');
    this.renders = Array.from(this.renderBlock.querySelectorAll('.pictures__block'));
    
    this.data = data;
    this.pictureCounter = 0;

    this.selectedImg = [];
  }

  // открытие табов, если выделен один из темплейтов
    _addEventListenerToTemplates () {
      this.templates.forEach(item => {
        item.addEventListener('change', e => {
          e.preventDefault();
          if (item.checked === true) {
            this.tabs.classList.add('active');
          }
        })
      })
    }

  
  // ивенты на клик фотки
  _addListenersToPictures (arr) {
    arr.forEach(item => {
      item.addEventListener('click', () => {
        let index;
        const cardCounter = item.querySelector('.picture__control');
       

        if (!item.classList.contains('active')){
          // Включить подсветку
          item.classList.add('active');
         // добавить в массив выбранных фоток
          this.selectedImg.push({
            id: item.getAttribute('data-id'),
            type: item.getAttribute('data-type'),
          })
         
        } else {
          item.classList.remove('active');
           // удалить  элемент из массива

           for(let i=0; i<=this.selectedImg.length-1; i++){
            if (this.selectedImg[i].id=== item.getAttribute('data-id') && this.selectedImg[i].type === item.getAttribute('data-type')) {
              this.selectedImg.splice(i,1);
              break;
            }
           }
        }

        console.log(this.selectedImg);
      })
    })
  }


 

  init (){
    this._addEventListenerToTemplates();
    new Tabs('.pictures-tabs').init();
    

    this._addListenersToPictures(this.renders);
    this._addListenersToPictures(this.photos);
    

  }
}

export default PrintPageToPDF;
