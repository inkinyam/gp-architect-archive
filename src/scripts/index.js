import '../styles/index.scss';
let burgerButton = document.querySelector('.header__burger');
if (burgerButton) {
  burgerButton.addEventListener('click', ()=>{
    burgerButton.classList.toggle('header__burger_active')
  })
}




import tableInfo from './data1';
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
 for (let i=0; i<couner; i++) {
    result= result +'<i class="bi bi-star-fill"></i>';
  }
  return result;
}

function headerStyle(column) {
  return {
    id: {
      classes: 'uppercase'
    },
    name: {
      css: {background: 'yellow'}
    },
    price: {
      css: {color: 'red'}
    }
  }[column.field]
}

function initTable(data) {
  $table.bootstrapTable('destroy').bootstrapTable({
    data: data,
    height: 900,
    locale: 'ru-RU',
    columns: [
      [{
        rowspan: 2,
        field: 'state',
        checkbox: true,
        align: 'center',
        valign: 'middle'
      },{
        title: 'Информация о проектах',
        colspan: 11,
        align: 'center'
      }], 
      [{
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
