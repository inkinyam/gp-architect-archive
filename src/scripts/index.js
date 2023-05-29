import '../styles/index.scss';
import "@fancyapps/ui/dist/carousel/carousel.css";
import "@fancyapps/ui/dist/carousel/carousel.autoplay.css";
import "@fancyapps/ui/dist/fancybox/fancybox.css"

import { Carousel } from "@fancyapps/ui/dist/carousel/carousel.esm.js";
import { Autoplay } from "@fancyapps/ui/dist/carousel/carousel.autoplay.esm.js";
import { Fancybox } from '@fancyapps/ui';

import Tabs from './LinkedTabs';                // табы
import Filter from './filter.js'                // работа фильтра
import Api from './api.js';                     // работа с апи
import initSubmenu from './submenu';            // меню на стр.одного проекта
import createNewLeaflet from './leaflet';       // работа карты
import Section from './section';
import MosaicCard from './mosaicCard';

//иконки для карты
import zoomIn from '../images/zoom-in-icon.svg';
import zoomOut from '../images/zoom-out-icon.svg';
import pin from '../images/pin2.png';

//иконки для таблицы
//  заполненность
import fillPhoto from '../images/fill_photo.svg';
import fillVideo from '../images/fill_video.svg';
import fillText from '../images/fill_text.svg';
import fillPresentation from '../images/fill_presentation.svg';
import fillRenders from '../images/fill_render.svg';
//  действия с проектом
import iconPrintPdf from '../images/icon-pdf.png';
import iconEdit from '../images/icon-edit.png';
import iconOpenProject from '../images/icon-to-project.png';


//cоздание экземпляра класса Api
const api = new Api ('https://projectsmsk.genplanmos.ru', {
  headers: {
    'Content-Type': 'application/json'
  }
})

// работа бургер-меню
let burgerButton = document.querySelector('.header__burger');
if (burgerButton) {
  burgerButton.addEventListener('click', ()=>{
    burgerButton.classList.toggle('header__burger_active')
  })
}

// переключение табов на главной странице
let presentTab = document.querySelector('.representation-tabs');
if (presentTab) {
  new Tabs('.representation-tabs').init();
}


// слайдер на стр.проекта
const sliderBlock = document.getElementById("main-slider");
if (sliderBlock) {
  const options = {
    transition: 'classic',
    infinite: true,
    center: false,
    slidesPerPage: 1,
    Autoplay: {
      showProgress: false,
      timeout: 10000,
    },
    Navigation: { 
      nextTpl: "<svg width='44' height='44' viewBox='0 0 44 44' fill='none' xmlns='http://www.w3.org/2000/svg'><rect x='44' y='44' width='44' height='44' rx='22' transform='rotate(180 44 44)' fill='#1678E2' fill-opacity='0.1' stroke='none'/> <path d='M28.3536 22.3536C28.5488 22.1583 28.5488 21.8417 28.3536 21.6464L25.1716 18.4645C24.9763 18.2692 24.6597 18.2692 24.4645 18.4645C24.2692 18.6597 24.2692 18.9763 24.4645 19.1716L27.2929 22L24.4645 24.8284C24.2692 25.0237 24.2692 25.3403 24.4645 25.5355C24.6597 25.7308 24.9763 25.7308 25.1716 25.5355L28.3536 22.3536ZM16 22.5L28 22.5V21.5L16 21.5V22.5Z' fill='black'/></svg>",
      prevTpl: "<svg width='44' height='44' viewBox='0 0 44 44' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='44' height='44' rx='22' fill='#1678E2' fill-opacity='0.1' stroke='none'/><path d='M15.6464 21.6464C15.4512 21.8417 15.4512 22.1583 15.6464 22.3536L18.8284 25.5355C19.0237 25.7308 19.3403 25.7308 19.5355 25.5355C19.7308 25.3403 19.7308 25.0237 19.5355 24.8284L16.7071 22L19.5355 19.1716C19.7308 18.9763 19.7308 18.6597 19.5355 18.4645C19.3403 18.2692 19.0237 18.2692 18.8284 18.4645L15.6464 21.6464ZM28 21.5H16V22.5H28V21.5Z' fill='black'/></svg>" 
    }
  };
  
  new Carousel(sliderBlock, options, { Autoplay });
}


const showmoreButton = document.querySelector('.lead__showmore');
if (showmoreButton) {
  let showMoreBlock = document.querySelector('.lead__full');
  if (showMoreBlock) {
    showmoreButton.addEventListener('click', (e)=> {
      let buttonText = showmoreButton.querySelector('.lead__showmore-text');

      if (!showmoreButton.classList.contains('active')) {
        showmoreButton.classList.add('active');
        showMoreBlock.classList.add('active')
        buttonText.textContent = 'Скрыть полное описание';
      } else {
         showmoreButton.classList.remove('active');
        showMoreBlock.classList.remove('active')
        buttonText.textContent = 'Показать все';
      }
    })
  }

}

//навигация на стр. проекта
const navBar = document.querySelector('.navigation');
if (navBar) {
  initSubmenu('.navigation');
}

// подключение фансибокс к чему-угодно 
Fancybox.bind('[data-fancybox]', {
  Images: {
    zoom: true,
    click: false,
  },
  Thumbs: {
    type: 'classic',
    showOnStart: true
  },
  Toolbar: {
    display: {
      left: [],
      middle: [],
      right: ["thumbs", "close"]
    },
    items: {
      thumbs: {
        tpl: '<button class="f-button" title="{{TOGGLE_FULLSCREEN}}" data-fancybox-toggle-fullscreen><svg viewBox="2 2 24 24"  xmlns="http://www.w3.org/2000/svg"><rect x="18" y="7.5" width="2.5" height="2.5" fill="inherit" stroke="inherit"/><rect x="18" y="12.75" width="2.5" height="2.5" fill="inherit" stroke="inherit"/><rect x="18" y="18" width="2.5" height="2.5" fill="inherit" stroke="inherit"/><rect x="12.75" y="7.5" width="2.5" height="2.5" fill="inherit" stroke="inherit"/><rect x="12.75" y="12.75" width="2.5" height="2.5" fill="inherit" stroke="inherit"/><rect x="12.75" y="18" width="2.5" height="2.5" fill="inherit" stroke="inherit"/><rect x="7.5" y="7.5" width="2.5" height="2.5" fill="inherit" stroke="inherit"/><rect x="7.5" y="12.75" width="2.5" height="2.5" fill="inherit" stroke="inherit"/><rect x="7.5" y="18" width="2.5" height="2.5" fill="inherit" stroke="inherit"/></svg></button>'
      },
      close: {
        tpl: '<button class="f-button" title="{{CLOSE}}" data-fancybox-close><svg width="24" height="24" viewBox="4 4 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.0011 14.7154L20.1332 20.8528L20.84 20.1454L14.7079 14.008L20.8559 7.85475L20.1491 7.14734L14.0011 13.3006L7.84817 7.14246L7.14136 7.84987L13.2943 14.008L7.15723 20.1503L7.86404 20.8577L14.0011 14.7154Z" fill="inherit"/></svg></button>',
      },
    }
  }
});

//кнопка вверх на страницах
if (window.innerHeight > 950) {
  // если страница длинная, создаем кнопку UP
  let body = document.querySelector('.page');
  let upBtn = document.createElement('div');
  upBtn.classList.add('up');
  body.append(upBtn);

  upBtn.addEventListener('click', function(e) {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  })

  window.onscroll = () =>
  window.scrollY > 620
    ? (upBtn.classList.add('up_showed'))
    : (upBtn.classList.remove('up_showed'));
}

//инициализация таблицы
let tabletContainer = document.querySelector('.aa-tablet');
if (tabletContainer) {
  Promise.all([api.getAllProjects(), api.getTags()])
  .then(([projectData, tagsData])=> {
    initTable(projectData, tagsData);   // отрисовываем таблицу        
  })

  const initTable = (projectData, tagsData) => {
    const mediaQuerySmallSize = window.matchMedia('(max-width: 1240px)'); // проверяем мобилка или десктоп

    window.formatedFilterTagsData = [];
    tagsData.forEach((item) => {formatedFilterTagsData.push(item.name)})

    // рейтинг в звездочки
    function raitingFormatter(value) {
      let str = '';
        for (let i=0; i<value; i++){
        str = str + '★';
      }
      return '<p style="color: #106CD1">'+ str + '</p>'
    }

    // ссылка в название проекта
    function nameFormatter (value, row) {
      return '<a class="aa-tablet__link" href="' + row._links.url_frontend.href + '">' + value + '</a>';
    }

    //если поле в json объект -> строка
    function objFormatter (value) {
      let str = '';

      value.forEach((item, inx) => {
        if (inx != 0) {
          str = str + ', ' + item.name;
        } else {
          str = str+item.name
        }
      });
      return str;
    }

    // если конткретной даты ввода нет, указываем год
    function commissioningDateFormatter (value, row) {
      if (value === null) {
        return row.commissioning_year;
      } else return value;
    }

    // если поле в json массив -> строка
    function arrayTextFormatter (value){
      let str ='';
      
      if (Array.isArray(value)){
        value.forEach((item, inx) => {
          if (inx != 0) {
            str = str + ', ' + item;
          } else {
            str = str+item;
          }
        });
      }
      return str;
    }

    function fillerFormatter (value, row){
      let data = [];
      
      for (let key in value) {
        if (value[key] === true) {
          data.push(key);
        }
      }

      let result = ['<div class="aa-tablet__cell">']

      data.forEach(item => {
        switch (item) {
          case "photos": result.push(`<img class="aa-tablet__img" src=${fillPhoto}  title="Фотографии" alt="Фотографии">`); 
            break;
          case "description": result.push(`<img class="aa-tablet__img" src=${fillText} title="Описание и ТЭПы" alt="Описание и ТЭПы">`); 
            break;
          case "renders": result.push(`<img class="aa-tablet__img" src=${fillRenders} title="Рендеры" alt="Рендеры">`); 
            break;
          case "videos": result.push(`<img class="aa-tablet__img" src=${fillVideo} title="Видео"  alt="Видео">`); 
            break;
          case "presentations": result.push(`<img class="aa-tablet__img" src=${fillPresentation}  title="Презентации" alt="Презентации">`); 
            break;
        }
      })
      if (row._links.url_edit.href !== null){
        result.push(`<div class="aa-tablet__cell-inner">
                      <a class="aa-tablet__cell-link" href=${row._links.url_pdf.href}>
                        <img src=${iconPrintPdf} alt="print to pdf" title="печать в пдф">
                      </a>
                      <a class="aa-tablet__cell-link" href=${row._links.url_frontend.href} >
                        <img src=${iconOpenProject} alt="open" title="открыть проект">
                      </a>
                      <a class="aa-tablet__cell-link" href=${row._links.url_edit.href}>
                        <img src=${iconEdit} alt="edit" title="редактировать проект">
                      </a>
                    </div>`
                    )
        } else {
          result.push(`<div class="aa-tablet__cell-inner">
                        <a class="aa-tablet__cell-link" href=${row._links.url_pdf.href}>
                          <img src=${iconPrintPdf} alt="print to pdf" title="печать в пдф">
                        </a>
                        <a class="aa-tablet__cell-link" href=${row._links.url_frontend.href} >
                          <img src=${iconOpenProject} alt="open" title="открыть проект">
                        </a>
                      </div>`)
        }
      result.push('</div>')
      
      return result.join('');
    }

    // создание таблицы
    let $table = $('#table').bootstrapTable({ 
      data: projectData,
      toggle: 'table',
      filterControl: true,
      clickToSelect: true,
      locale: 'ru-RU',
      search: true,
      columns: [
        {
          field: 'state',
          checkbox: true,
          align: 'center',
          valign: 'middle',
          width: '3.5',
          widthUnit: '%',
          searchable: true,
          align:'left',
          valign: 'middle',
        },
        {
          field: 'project_id',
          title: 'ID',
          searchable: true,
          sortable: true,
          width: '3.5',
          widthUnit: '%',
          align:'left',
          valign: 'middle',
          filterControl:'input'
        },
        {
          field: 'rating',
          title: 'Рейтинг',
          searchable: true,
          sortable: true,
          width: '5.5',
          widthUnit: '%',
          align:'center',
          valign: 'middle',
          filterControl:'select',
          formatter: raitingFormatter
        },{
          field: 'name',
          title: 'Название',
          searchable: true,
          sortable: true,
          width: '14',
          widthUnit: '%',
          align:'left',
          valign: 'middle',
          filterControl:'input',
          formatter: nameFormatter
        },
        {
          field: 'customer',
          title: 'Заказчик',
          searchable: true,
          sortable: true,
          width: '10.5',
          widthUnit: '%',
          align:'left',
          valign: 'middle',
          filterControl:'input',
          formatter: arrayTextFormatter
        },
        {
          field: 'project_organization',
          title: 'Проектировщик',
          searchable: true,
          sortable: true,
          width: '14',
          widthUnit: '%',
          align:'left',
          valign: 'middle',
          filterControl:'input',
          formatter: arrayTextFormatter
        },
        {
          field: 'commissioning_date',
          title: 'Дата ввода',
          searchable: true,
          sortable: true,
          width:'5',
          widthUnit: '%',
          align:'center',
          valign: 'middle',
          filterControl:'datepicker',
          formatter: commissioningDateFormatter
        },
        {
          field: 'district.abbreviation',
          title: 'Округ',
          searchable: true,
          sortable: true,
          width: '7',
          widthUnit: '%',
          align:'center',
          valign: 'middle',
          filterControl:'select'
        },
        {
          field: 'arch_significant_date',
          title: 'Архзначимый',
          searchable: true,
          sortable: true,
          width: '5',
          widthUnit: '%',
          align:'center',
          valign: 'middle',
          filterControl:'datepicker'

        },
        {
          field: 'tags',
          title: 'Теги',
          searchable: true,
          sortable: true,
          width: '10.5',
          widthUnit: '%',
          align:'left',
          valign: 'middle',
          filterControl:'input',
        /*   filterData: 'var:formatedFilterTagsData',   */
          formatter: objFormatter
        },
        {
          field: 'functions',
          title: 'Функции',
          searchable: true,
          sortable: true,
          width: '10.5',
          widthUnit: '%',
          align:'left',
          valign: 'middle',
          filterControl:'input', 
          formatter: objFormatter
        },
        {
          field: 'fullness',
          title: '',
          searchable: false,
          sortable: false,
          width: '6.5',
          widthUnit: '%',
          align:'center',
          valign: 'middle',
          formatter: fillerFormatter
        }
      ] 
    });

    // отображение в карточки, если экран меньше 102
    $table[0].classList.remove('table-bordered');
    if (mediaQuerySmallSize.matches) {
      $('#table').bootstrapTable('toggleView');
      $('#table').bootstrapTable('resetView');
    } 
  }
}

// инициализация карты
let mapBtn = document.querySelector('.tabs__nav-btn-map'); 
if (mapBtn) {

  // отправляем запрос в апи, вызываем функцию инициализации карты
  api.getGeoJson()
    .then((data) => {
      initMap(data)
    })
    .catch(err => {console.log(`Что-то пошло не так. ${err}`)});
 
  const initMap = (data) => {
    let mapContainer = document.querySelector('#mskmap');
    if (mapContainer) {
      //  создаем карту
      let map =  createNewLeaflet('#mskmap', { 
            attributionControl : false,
            zoomControl: true,
            keyboard: false,
            zoom: 11,
            scrollWheelZoom: false,
            center: [55.753214, 37.623054],
            tap: false,
            maxBounds: [[56.073150, 36.214289], [55.079306, 38.852788]],
            zoomControl:false,
            fullscreenControl: false,
            clickFitBounds: false,
            clickPanToLayer: false,
            doubleClickZoom: false,
            minZoom: 11,
            maxZoom: 17,
            baseLayers: [ 
              {
                name: 'GenplanmosMap',
                url: 'https://projectsmsk.genplanmos.ru/static/tileset/{z}/{x}/{y}.png',
                options: {},
              },
            ],
            groupLayers: [
              {
                name: 'Projects',
                geojson: data,
                group: "layer",
              },
            ],
            controllers: [
              {
                name: "center",
                option: {
                  iconUrl: pin,
                  position: 'bottomright'
                }
              },
              {
                name: "zoomOut",
                option: {
                  iconUrl: zoomOut,
                  position: 'bottomright'
                }
              },

              {
                name: "zoomIn",
                option: {
                  iconUrl: zoomIn,
                  position: 'bottomright'
                }
              },
            ]
      });

      // слушатели на элементы
      document.addEventListener('DOMContentLoaded', (e)=> {
        if (e.target.location.hash === '#mapview'){
          if ( ! mapContainer.classList.contains('leaflet-container')) {
            map.renderMap();
          }
        }
      })  

      mapBtn.addEventListener('click', ()=> {
          map.update();
        })
      } 
  }
}

// инициализация фильтров
let filterBlock = document.querySelector('.filters'); 
if (filterBlock){
  api.getAllProjects()
    .then((data) => {
      initFilter(data);
    })
    .catch(err => {console.log(`Что-то пошло не так. ${err}`)});   


  // инициализация мозайки
  const initFilter= (data) => {
    const cardList = new Section ((item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
      }, '.mosaic');

    //функция создания карточки
    function createCard (item) {
      const card = new MosaicCard ({card: item});
      return card.createCard();
    }

    let block = new Filter('.filters', 
                           '.filter-tags', 
                           { data, 
                             renderMosaicCardList: (data)=> {
                               cardList.renderItems(data);
                             }
                           });
    return block;
  }
}


// переключение глазика на форме
let passwordField= document.querySelector('.form__field_password');
if (passwordField) {
    let passwordInput = passwordField.querySelector('.form__input');
    let showPassButton = passwordField.querySelector('.form__showPassword');
    let svgEye = showPassButton.querySelector('.form__svg');

    if (showPassButton) {
      showPassButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          svgEye.innerHTML = '<path d="M11.7338 9.87801C6.33366 15.2899 1.92969 20.0187 1.92969 20.3865C1.92969 21.6476 3.2404 20.9645 5.91424 18.3374C8.27351 16.0255 8.74537 15.7102 9.68908 16.2357C11.2095 17.0763 14.0931 16.9713 15.4038 16.0255C16.0329 15.6052 16.8193 14.3967 17.1339 13.3984C17.6057 11.8746 17.6057 11.2441 16.9242 9.87801C16.0853 8.24919 16.0853 8.1441 17.2912 6.98817L18.497 5.72714L20.4369 7.67122C21.4854 8.77461 22.6389 10.4034 23.0059 11.4017C23.5826 13.0306 24.9981 13.8187 24.9981 12.5051C24.9981 11.1916 22.7437 7.30342 21.2233 6.0424L19.598 4.67629L21.2757 2.94239C22.9534 1.20848 23.3729 -2.05525e-07 22.2194 -2.05525e-07C21.8524 -2.05525e-07 17.1339 4.41358 11.7338 9.87801ZM15.561 10.5611C16.0329 11.4017 16.0329 12.0323 15.561 13.1882C14.827 14.8696 13.2018 15.5526 10.9998 15.0272L9.63665 14.6594L12.2056 12.0323C13.5688 10.6136 14.7746 9.45767 14.8795 9.45767C14.9319 9.45767 15.2465 9.93055 15.561 10.5611Z" fill="#1678E2"/><path d="M8.02739 3.45933C4.09519 4.878 1.00186 8.13571 0.110558 11.6561C-0.413736 13.8104 1.05429 13.5477 1.84073 11.3934C2.57474 9.34421 5.14378 6.5594 7.39824 5.40344C8.28954 4.93055 10.3867 4.45766 12.012 4.40511C15.4199 4.24748 16.6258 3.77459 15.5248 3.09152C14.4238 2.40845 10.3343 2.61863 8.02739 3.45933Z" fill="#1678E2"/><path d="M9.62071 7.92535C8.30998 8.97622 6.89438 11.4458 7.36625 11.8661C7.47111 11.9712 8.67698 10.8678 10.0926 9.44911C12.714 6.76939 12.3995 5.71851 9.62071 7.92535Z" fill="#1678E2"/>';
        } else {
          passwordInput.type = 'password';
          svgEye.innerHTML = ' <path d="M8.06613 3.78521C4.11495 5.26563 1.00669 8.6651 0.111091 12.3387C-0.415733 14.5868 1.05937 14.3126 1.84961 12.0646C3.16667 8.22646 8.11881 4.60767 11.9646 4.55284C16.548 4.55284 21.7109 8.00713 23.1333 12.0097C23.9235 14.3126 25.4513 14.6416 24.8718 12.3387C23.2387 5.43012 14.9148 1.15337 8.06613 3.78521Z" fill="#1678E2"/><path d="M9.68736 8.43684C7.68543 10.0817 7.10592 11.946 7.79079 14.194C8.52834 16.5517 10.1088 17.7031 12.5322 17.7031C14.9556 17.7031 16.5361 16.5517 17.2736 14.194C17.9585 11.946 17.379 10.0817 15.377 8.43684C13.5858 6.95643 11.4786 6.95643 9.68736 8.43684ZM14.1127 9.47861C15.7985 10.4107 16.378 12.1105 15.6931 13.9198C14.5341 16.771 10.5303 16.771 9.37126 13.9198C8.10689 10.7397 11.2151 7.88854 14.1127 9.47861Z" fill="#1678E2"/>';
        }
      })
    }
}


import PrintPageToPDF from './print';
let printBlock = document.querySelector('.print');
if (printBlock) {
  let printer = new PrintPageToPDF('.print')
    printer.init();
  }
