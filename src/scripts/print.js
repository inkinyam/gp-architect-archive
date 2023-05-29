import Tabs from "./LinkedTabs";

class PrintPageToPDF {
  constructor (selector,{ data, sendToPrint}) {
    this.block = document.querySelector(selector);
    this.tabs = this.block.querySelector('.pictures-tabs');
    this.templates = Array.from(this.block.querySelectorAll('.template__input'));

    this.photos = Array.from(this.block.querySelectorAll('.pictures__block'));
    
    this.form = document.querySelector('.navigation__print-form');
    this.data = data;
    this.pictureCounter = 0;
    
    this.sendToPrint = sendToPrint;
    this.selectedImg = [];
  }

  // открытие табов, если выделен один из темплейтов
    _addEventListenerToTemplates () {
      this.templates.forEach(item => {
        item.addEventListener('change', e => {
          e.preventDefault();
          if (item.checked === true) {
            this.tabs.classList.add('active');
            this.selectedTemplate = item;
          }
        })
      })
    }

  
  // ивенты на клик фотки
  _addListenersToPictures (arr) {
    arr.forEach(item => {
      item.addEventListener('click', () => {
        if (!item.classList.contains('active')){
          // Включить подсветку
          item.classList.add('active');
         // добавить в массив выбранных фоток
          this.selectedImg.push({
            id: item.getAttribute('data-id'),
            type: item.getAttribute('data-type'),
            element: item
          })
         
        } else {
          item.classList.remove('active');
           // удалить  элемент из массива
           let counter = item.querySelector('.picture__control');
           counter.textContent = '';

           for(let i=0; i<=this.selectedImg.length-1; i++){
            if (this.selectedImg[i].id=== item.getAttribute('data-id') && this.selectedImg[i].type === item.getAttribute('data-type')) {
              this.selectedImg.splice(i,1);
              break;
            }
           }
        }
        this._countPictures();
        this._fillTemplates();
      })
    })
  }

  // вписываем в кружочки порядковый номер фотки
  _countPictures () {
    if (this.selectedImg.length != 0) {
      this.form.classList.add('active');
    } else {
      this.form.classList.remove('active');
    }

    this.selectedImg.forEach((item,indx) => {
      let counter = item.element.querySelector('.picture__control');
      counter.textContent = indx+1;
    })
  }

  _fillTemplates(){
    let counterBlock = this.selectedTemplate.nextElementSibling;
    let counters = Array.from(counterBlock.querySelectorAll('.counter'));
  
    let counterIndex = 0;

    for (let i = 0; i < this.selectedImg.length; i++) {
      counters[counterIndex].textContent = i+1;
      if( !counters[counterIndex].classList.contains('active')) {
        counters[counterIndex].classList.add('active');
      }
      counterIndex++;
      if (counterIndex === counters.length) {
        counterIndex = 0;
      }
    }
    while (counterIndex < counters.length) {
      counters[counterIndex].textContent = '';
      if (counters[counterIndex].classList.contains('active')) {
        counters[counterIndex].classList.remove('active');
      }
      counterIndex++;
    }
  }

  handleSubmitForm () {
    this.printQuery = {
      template: this.selectedTemplate.getAttribute('data-type'),
      images: this.selectedImg
    }
    this.sendToPrint(this.printQuery);
  }


 

  init (){
    this._addEventListenerToTemplates();
    new Tabs('.pictures-tabs').init();
    this._addListenersToPictures(this.photos);

    this.form.addEventListener('submit', (e)=>{ 
      e.preventDefault();
          this.handleSubmitForm();
    })
  }
}

export default PrintPageToPDF;