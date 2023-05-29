import Tabs from "./LinkedTabs";

class PrintPageToPDF {
  constructor (selector) {
    this.block = document.querySelector(selector);
    this.tabs = this.block.querySelector('.pictures-tabs');
    this.templates = Array.from(this.block.querySelectorAll('.template__input'));

    this.photos = Array.from(this.block.querySelectorAll('.pictures__block'));
    
    this.form = document.querySelector('.navigation__print-form');
    this.printQuery = this.form.querySelector('.navigation__print-query');

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
            this.selectedTemplate = item;

            this._fillTemplates();
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

  // заполнение "окошек" в темплейте по мере выбирания фоток и отображением количества фоток
  _fillTemplates () {
    let counterBlock = this.selectedTemplate.nextElementSibling;
    let counters = Array.from(counterBlock.querySelectorAll('.counter'));

    // пока выбранных фоток меньше или равно количеству "окошек" в шаблоне
    if (this.selectedImg.length <= counters.length) {
      counters.forEach(item => {
        item.textContent ='';
        item.classList.remove('active');
      })
      
      for (let i =0; i<this.selectedImg.length; i++) {


        counters[i].textContent = i+1;
        if (!counters[i].classList.contains('active')) {
          counters[i].classList.add('active');
        }
      }
    } 
    // если выбранных фоток больше, чем "окошек" в шаблоне
    else if (this.selectedImg.length > counters.length) {
      let result = this.selectedImg.length%counters.length;

      if (result != 0) {
        
        counters.forEach(item => {
          item.textContent ='';
          item.classList.remove('active');
        })

        let number = this.selectedImg.length - result+1;
        for (let i=0; i<result; i++) {
        
          counters[i].textContent = number;
          if (!counters[i].classList.contains('active')) {
            counters[i].classList.add('active');
          }
          number++;
        }

      } else {
        let number = this.selectedImg.length-counters.length+1;
        for (let i=0; i<counters.length; i++) {
        
          counters[i].textContent = number;
          if (!counters[i].classList.contains('active')) {
            counters[i].classList.add('active');
          }
          number++;
        }
      }

      

     

      
      
      
    }
  }

  counter (bigArr, smalArr) {
    let roundCount = 0;
    if (bigArr.length - smalArr.length > 0) {
      roundCount ++;
      this.counter;
    }
    return roundCount;
  }

  handleSubmitForm () {
    this.printQuery.textContent='';
    let input   = document.createElement('input');
    input.name  = 'template';
    input.type  = 'hidden';
    input.value = this.selectedTemplate.getAttribute('data-type');
    this.printQuery.append(input);

    this.selectedImg.forEach((item,indx) => {
      let inputType   = document.createElement('input');
      inputType.type  = 'hidden';
      inputType.name  = `images[${indx}][type]`;
      inputType.value = item.type;

      let inputId   = document.createElement('input');
      inputId.type  = 'hidden';
      inputId.name  = `images[${indx}][id]`;
      inputId.value = item.id;

      this.printQuery.append(inputType);
      this.printQuery.append(inputId);
    })
  }


  init (){
    this._addEventListenerToTemplates();
    new Tabs('.pictures-tabs').init();
    this._addListenersToPictures(this.photos);

    this.form.addEventListener('submit', ()=>{ 
      this.handleSubmitForm();
    })
  }
}

export default PrintPageToPDF;
