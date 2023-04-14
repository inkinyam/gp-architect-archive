 function initSubmenu (selector) {
  let submenu = document.querySelector(selector);
  const mediaQueryMobileSize= window.matchMedia('(min-width: 960px)'); 
    if (!submenu) {
      console.log('ERROR: Указан некорректный идентификатор блока для функции initSubmenu');
      return;
    } 

  let itemsArray = Array.from(submenu.querySelectorAll('.navigation__nav-button'));

  itemsArray.forEach((item) => {
    let scrollMargin;

    item.addEventListener('click', e => { 
/*       if (!mediaQueryMobileSize.matches) {                                                              // на экранах меньше 960рх "прячем" меню при нажатии на ссылку
        let checkbox = submenu.querySelector('.submenu__checkbox'); 
        checkbox.checked = false;
        scrollMargin = submenu.classList.contains('submenu__sticked')? submenu.clientHeight : 10;        // устанавливаем размер отступа в зависимости закреплено меню или нет
      } else {
        scrollMargin = submenu.classList.contains('submenu__sticked')? submenu.clientHeight + 95 : 95;
      } */
         
      let link   = item.querySelector('.navigation__nav-link'); 
        if (!link) {
          return false;
        }     

      let name   = link.hash.substr(1);   
        if (!name) {
          return false;
        }
        
      let target = document.getElementsByName(name)[0] ?? document.querySelector(link.hash);              
        if (!target) {
        return false;
        }

      if (target) {                                                                                       // если элемент найден, то добавляем ему отступ от верха и скроллим к нему     
        target.style.scrollMarginTop =  scrollMargin+'px';
        target.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'center'});

        itemsArray.forEach(item => {                                                                      // убираем у остальных ссылок класс "активной" ссылки
          item.classList.remove ('active');
        })
        item.classList.add('active');                                                   // добавляем нажатой ссылке "активный" класс

      } else {          
        console.log('ERROR: Якорь не найден');
      }
    })
  })


  //положение меню на странице
  let submenuOffset = submenu.offsetTop;

  window.addEventListener('scroll', (e) => {
     
      // сравниваем положение меню относительно положения скролла                                            
      let currentPosition = window.scrollY;
      if ( currentPosition <= submenuOffset ) {
        itemsArray.forEach(item => { item.classList.remove('active')})
      } 

      itemsArray.forEach(item => {
        let link   = item.querySelector('.navigation__nav-link'); 
          if (!link) {
            return false;
          }     

        let name   = link.hash.substr(1);   
          if (!name) {
            return false;
          }
          
        let target = document.getElementsByName(name)[0] ?? document.querySelector(link.hash);              
          if (!target) {
           return false;
          }

        if (currentPosition >= target.offsetTop - 250) {
          itemsArray.forEach(item => {item.classList.remove('active');})
          item.classList.add('active');
          return false;
        }  
      })
    
  });
  
}

export default initSubmenu;