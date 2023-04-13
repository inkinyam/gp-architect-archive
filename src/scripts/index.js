import '../styles/index.scss';
import Tabs from './LinkedTabs';

import { Carousel } from "@fancyapps/ui/dist/carousel/carousel.esm.js";
import "@fancyapps/ui/dist/carousel/carousel.css";

import { Autoplay } from "@fancyapps/ui/dist/carousel/carousel.autoplay.esm.js";
import "@fancyapps/ui/dist/carousel/carousel.autoplay.css";

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
