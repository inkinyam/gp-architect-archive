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

import tableInfo from '../utils/data1';
let table = document.querySelector('.newTable');
if (table) {
  let $table = $('#table')
  let $remove = $('#remove')
  let selections = []
  
  function getIdSelections() {
    return $.map($table.bootstrapTable('getSelections'), function (row) {
      return row.id
    })
  }
  
  
  
  window.operateEvents = {
    'click .like': function (e, value, row, index) {
      alert('You click like action, row: ' + JSON.stringify(row))
    },
    'click .remove': function (e, value, row, index) {
      $table.bootstrapTable('remove', {
        field: 'id',
        values: [row.id]
      })
    }
  }
  
  
  function raitingFormatter(data) {
   let couner = parseInt(data);
   let result = '';
   for (let i=0; i < couner; i++) {
      result= result +'<i style="color: #1678E2" class="bi bi-star-fill"></i>';
    }
    return result;
  }
  
  
  function initTable(data) {
    $table.bootstrapTable('destroy').bootstrapTable({
      data: data,
      locale: 'ru-RU',
      columns: [
        [{
          rowspan: 1,
          field: 'state',
          checkbox: true,
          align: 'center',
          valign: 'middle'
        },{
          title: 'ID',
          field: 'id',
          rowspan: 1,
          align: 'center',
          valign: 'middle',
          sortable: true,
        }, 
        {
          title: 'Рейтинг',
          field: 'raiting',
          rowspan: 1,
          align: 'center',
          valign: 'middle',
          sortable: true,
          formatter: raitingFormatter
        },
        {
          title: 'Название',
          field: 'name',
          rowspan: 1,
          align: 'center',
          valign: 'middle',
          sortable: true,
        }, 
        {
          title: 'Заказчик',
          field: 'customer',
          rowspan: 1,
          align: 'center',
          valign: 'middle',
          sortable: true,
        }, 
        {
          title: 'Проектировщик',
          field: 'projector',
          rowspan: 1,
          align: 'center',
          valign: 'middle',
          sortable: true,
        }, 
        {
          title: 'Дата ввода',
          field: 'date',
          rowspan: 1,
          align: 'center',
          valign: 'middle',
          sortable: true,
        }, 
        {
          title: 'Округ',
          field: 'district',
          rowspan: 1,
          align: 'center',
          valign: 'middle',
          sortable: true,
        }, 
        {
          title: 'АГР',
          field: 'agr',
          rowspan: 1,
          align: 'center',
          valign: 'middle',
          sortable: true,
        }, 
        {
          title: 'Архначимый',
          field: 'archmain',
          rowspan: 1,
          align: 'center',
          valign: 'middle',
          sortable: true,
        }, 
        {
          title: 'ТЭГИ',
          field: 'tags',
          rowspan: 1,
          align: 'center',
          valign: 'middle',
          sortable: true,
        }, 
        {
          title: 'Функции',
          field: 'function',
          rowspan: 1,
          align: 'center',
          valign: 'middle',
          sortable: true,
        }
      ]]
    })
    $table.on('check.bs.table uncheck.bs.table ' +
      'check-all.bs.table uncheck-all.bs.table',
    function () {
      $remove.prop('disabled', !$table.bootstrapTable('getSelections').length)
  
      // save your data, here just save the current page
      selections = getIdSelections()
      // push or splice the selections if you want to save all data selections
    })
    $table.on('all.bs.table', function (e, name, args) {
     /*  console.log(name, args) */
    })
  
  }
  
  $(function() {
    initTable(tableInfo)
  })
  
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