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
const initTable = (tableData) => {
  const mediaQuerySmallSize = window.matchMedia('(max-width: 1240px)'); // проверяем мобилка или десктоп
  let tabletContainer = document.querySelector('.aa-tablet');

  // рейтинг в звездочки
  function raitingFormatter(value) {
   let str = '';
    for (let i=0; i<value; i++){
    str = str + '★';
   }
   return '<p style="color: #106CD1">'+ str + '</p>'
  }

  // если 
  function nameFormatter (value, row) {
    return '<a class="aa-tablet__link" href="' + row._links.self.href + '">' + value + '</a>';
  }

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

  function commissioningDateFormatter (value, row) {
    if (value === null) {
      return row.commissioning_year;
    } else return value;
  }


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

  if (tabletContainer) {
    let $table = $('#table').bootstrapTable({ 
      data: tableData,
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
          filterControl:'input'
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
          width:'7',
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
          width: '7',
          widthUnit: '%',
          align:'center',
          valign: 'middle',
          filterControl:'datepicker'

        },
        {
          field: 'tags',
          title: 'ТЭГИ',
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
        }
      ] 
    });
   
    $table[0].classList.remove('table-bordered');
    if (mediaQuerySmallSize.matches) {
      $('#table').bootstrapTable('toggleView');
      $('#table').bootstrapTable('resetView');
    } 
  }
}


const initMosaic = (data) => {
// создаем рендер-блок для карточек
  const cardList = new Section ((item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
    }, '.mosaic');


  //функция создания карточки
  function createCard (item) {
    const card = new MosaicCard ({card: item});
    return card.createCard();
  }
  cardList.renderItems(data) ;  // отрисовываем карточки в мозаичном отображении
}

// инициализация карты
const initMap = (data) => {
  let mapBtn = document.querySelector('.tabs__nav-btn-map'); 
  if (mapBtn) {
    let mapContainer = document.querySelector('#mskmap');

    if (mapContainer) {


    let map = createNewLeaflet('#mskmap', { zoom: 16,
      attributionControl : false,
      zoomControl: true,
      keyboard: false,
      scrollWheelZoom: false,
      center: [55.753214, 37.623054],
      tap: false,
      zoomControl:false,
      fullscreenControl: false,
      clickFitBounds: false,
      clickPanToLayer: false,
      doubleClickZoom: false,

      minZoom: 11,
      maxZoom: 17,
      baseLayers: [ // массив базовых слоев
        {
          name: 'OpenStreetMap',
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


//cоздание экземпляра класса Api
const api = new Api ('https://projectsmsk.genplanmos.ru/api/v1/project', {
  headers: {
     'Content-Type': 'application/json'
  }
})

api.getAllProjects()
  .then((data) => {
    initTable(data);   // отрисовываем таблицу          
    initMosaic(data);  // отрисовываем мозайку
    
    console.log(data);
    let block = new Filter('.filters', '.filter-tags', data);
  })
  .catch(err => {console.log(`Что-то пошло не так. ${err}`)});


  api.getGeoJson()
  .then((data) => {
    initMap(data);
  })
  .catch(err => {console.log(`Что-то пошло не так. ${err}`)});

