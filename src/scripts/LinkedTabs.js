// табы
 class Tabs {
  constructor (tabsSelector){
    this.btnSelector = '.tabs__nav-btn';
    this.panelSelector = '.tabs__panel';

    this.tabs = document.querySelector(tabsSelector);
    this.tabBtns = this.tabs.querySelectorAll(this.btnSelector);
    this.tabsPanels = this.tabs.querySelectorAll(this.panelSelector);
    this.showAllBtn = this.tabs.querySelector('.tabs__nav-all');

    this.check(); 
    this.init();
    this.events();
  }

  init () {
    if (document.location.hash) {
      // Инициализация из URL
      let location = document.location.hash;
      this.tabButton = location.split('#').pop();
      if (this.tabButton === 'all') {
        this.showAllTabs();
      } else {
        this.tabButton = this.urldecode(this.tabButton);
        this.switchTab(this.tabButton);
      }
    } else {
      // при открытии страницы
      if (this.showAllBtn) {
        // если есть кнопка ALL
        this.tabBtns[0].classList.add('tabs__nav-btn_active');
        this.tabsPanels.forEach(el => {
          el.classList.add('tabs__panel_active');
        });
      } else {
        //если нет кнопки ALL, открываем первую вкладку
        this.tabBtns[0].classList.add('tabs__nav-btn_active');
        this.tabsPanels[0].classList.add('tabs__panel_active');
      }

    }
  }

  check () {
    //проверяем, чтобы блоков с табами и одинаковыми селекторами не было
    if (document.querySelectorAll(`[data-tabs="${this.selector}"]`).length > 1) {
      console.error('Количество элементов с одинаковым data-tabs больше одного!');
      return;
    }

    //проверяем, чтобы кол-во кнопок и панелей было одинаковым
    if (this.tabBtns.length !== this.tabsPanels.length) {
      console.error('Количество кнопок и элементов табов не совпадает!');
      return;
    }
  }

  showAllTabs () {
    this.tabsPanels.forEach(el => {
      el.classList.add('tabs__panel_active');
    });
    this.tabBtns.forEach(function(el) {
        el.classList.remove('tabs__nav-btn_active');
    });
    this.showAllBtn.classList.add('tabs__nav-btn_active');
  }
  

  events () {
    // клик по табу мышкой
    this.tabBtns.forEach(el  => {
      el.addEventListener('click', () => {
          if (el.classList.contains('tabs__nav-all')) {
              this.showAllTabs();
          } else {
              let button = this.urldecode(el.href.split('#').pop());
              this.switchTab(button);
          }
      })
    }) 
  }


  //функция смены табов
  switchTab(button) {
    this.tabBtns.forEach(el => {
        el.classList.remove('tabs__nav-btn_active');
    });
    this.tabsPanels.forEach(el => {
        el.classList.remove('tabs__panel_active');
    });

    this.currentBtn = document.querySelector(`${this.btnSelector}[href="#${button}"]`);
    this.currentTab = document.querySelector(`${this.panelSelector}[data-tab-name="${button}"]`);

    if(this.currentBtn !== null) {
      this.currentBtn.classList.add('tabs__nav-btn_active');
    }

    if(this.currentTab !== null) {
      this.currentTab.classList.add('tabs__panel_active');
    }
  }

  urldecode(str) {
    return decodeURIComponent((str+'').replace(/\+/g, '%20'));
  }
}


export default Tabs;