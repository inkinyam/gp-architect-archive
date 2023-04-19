import '../styles/index.scss';
import Tabs from './LinkedTabs';


import { Carousel } from "@fancyapps/ui/dist/carousel/carousel.esm.js";
import "@fancyapps/ui/dist/carousel/carousel.css";

import { Autoplay } from "@fancyapps/ui/dist/carousel/carousel.autoplay.esm.js";
import "@fancyapps/ui/dist/carousel/carousel.autoplay.css";

import { Fancybox } from '@fancyapps/ui';
import "@fancyapps/ui/dist/fancybox/fancybox.css"

let burgerButton = document.querySelector('.header__burger');
if (burgerButton) {
  burgerButton.addEventListener('click', ()=>{
    burgerButton.classList.toggle('header__burger_active')
  })
}

let presentTab = document.querySelector('.representation-tabs');
if (presentTab) {
  new Tabs('.representation-tabs').init();
}

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
      nextTpl: "<svg width='44' height='44' viewBox='0 0 44 44' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M28.3536 22.3536C28.5488 22.1583 28.5488 21.8417 28.3536 21.6464L25.1716 18.4645C24.9763 18.2692 24.6597 18.2692 24.4645 18.4645C24.2692 18.6597 24.2692 18.9763 24.4645 19.1716L27.2929 22L24.4645 24.8284C24.2692 25.0237 24.2692 25.3403 24.4645 25.5355C24.6597 25.7308 24.9763 25.7308 25.1716 25.5355L28.3536 22.3536ZM16 22.5L28 22.5V21.5L16 21.5V22.5Z' fill='black'/><rect x='43.75' y='43.75' width='43.5' height='43.5' rx='21.75' transform='rotate(180 43.75 43.75)' stroke='black' stroke-width='0.5'/></svg>",
      prevTpl: "<svg width='44' height='44' viewBox='0 0 44 44' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M15.6464 21.6464C15.4512 21.8417 15.4512 22.1583 15.6464 22.3536L18.8284 25.5355C19.0237 25.7308 19.3403 25.7308 19.5355 25.5355C19.7308 25.3403 19.7308 25.0237 19.5355 24.8284L16.7071 22L19.5355 19.1716C19.7308 18.9763 19.7308 18.6597 19.5355 18.4645C19.3403 18.2692 19.0237 18.2692 18.8284 18.4645L15.6464 21.6464ZM28 21.5H16V22.5H28V21.5Z' fill='black'/> <rect x='0.25' y='0.25' width='43.5' height='43.5' rx='21.75' stroke='black' stroke-width='0.5'/></svg>" 
    }
  };
  
  new Carousel(sliderBlock, options, { Autoplay });
}

import initSubmenu from './submenu';
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


const mediaQuerySmallSize = window.matchMedia('(max-width: 1240px)'); // проверяем мобилка или десктоп
import dataTabletInfo from '../utils/data2y';

let tabletContainer = document.querySelector('.aa-tablet');
if (tabletContainer) {
  let $table = $('#table').bootstrapTable(
    {
      data: dataTabletInfo,
    });
  $table[0].classList.remove('table-bordered');
  
  if (mediaQuerySmallSize.matches) {
    $table.bootstrapTable('toggleView')
  }
}







import createMap from './leflet-custom';

import mapsData from '../utils/mapsdata';




import 'leaflet/dist/leaflet.css';
let mapBtn = document.querySelector('.tabs__nav-btn-map'); 
  if (mapBtn) {
    let mapContainer = document.querySelector('#mskmap');

    if (mapContainer) {

      const map = createMap(
        'mskmap', // id контейнера для карты
        {
          zoom: 13,
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
    
          minZoom: 8,
          maxZoom: 18,
          baseLayers: [ // массив базовых слоев
            {
              name: 'OpenStreetMap',
              url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
              options: {},
            },
          ],
        }, 
        [
          {
            name: 'Territory1',
            geojson: mapsData,
            group: 'Territory', // имя группы, к которой принадлежит слой
          },
        ], 
        [],
        [
          { 
            name: 'zoomIn',
            position: 'bottomright',
            html: '<div class="controll controll_zoomIn"></div>',
            onClick: function () {
              console.log('zoom in');
            }
          },
          { 
            name: 'zoomOut',
            position: 'bottomright',
            html: '<div class="controll controll_zoomOut"></div>',
            onClick: function () {
              console.log('zoom out');
            }
          },
          { 
            name: 'center',
            position: 'bottomright',
            html: '<div class="controll controll_center"></div>',
            onClick: function () {
              console.log('center');
            }
          },
        ]);
        
    document.addEventListener('DOMContentLoaded', (e)=> {
       if (e.target.location.hash === '#mapview'){
         map.init();
       }
      },{ once: true })  

     mapBtn.addEventListener('click', ()=> {
       if ( ! mapContainer.classList.contains('leaflet-container')) {
          map.init();
        }
      },{ once: true })
    } 
  }

  


 
