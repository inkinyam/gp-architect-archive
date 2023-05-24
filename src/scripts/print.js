import Tabs from "./LinkedTabs";

class PrintPageToPDF {
  constructor (selector, data) {
    this.block = document.querySelector(selector);
    this.tabs = this.block.querySelector('.pictures-tabs');
    this.templates = Array.from(this.block.querySelectorAll('.template__input'));

    this.data = data;
  }

  _addEventListenerToTemplates () {
    this.templates.forEach(item => {
      item.addEventListener('change', e => {
        e.preventDefault();
        if (item.checked === true) {
          this.tabs .classList.add('active');
        }
      })
    })
  }
 

  init (){
    this._addEventListenerToTemplates();
    new Tabs('.pictures-tabs').init();
    console.log(this.data);
  }
}

export default PrintPageToPDF;
