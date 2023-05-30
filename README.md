# Сайт "Ключевые проекты г. Москвы"

На данном сайте будет собрана информация о всех разрабатываемых архитектурных проектах города Москвы. Используется для сбора информации, отображения в компактном виде.
По каждому проекту собирается отдельная страница. Общая информация о проектах собрана в различных представлениях (табличный вид, мозаичный вид, карта)


### используемые технологии

* html
* scss
* vanilla js
* leaflet
* bootstrap-table
* video.js
* webpack
* [wkhtmltopdf](https://wkhtmltopdf.org/)
* REST API


### Основные возможности приложения

* Получение данных из api, отображение в различных видах (таблица, мозайка, карта с пинами)
* Организован поиск по проектам с учетом фильтров на странице мозайки
* Организован поиск по проектам на странице карты
* Карта автоматически подстраивает зум под пины, которые соответсвуют поисковому запросу
* Проект собран с помощью webpack 
* Печать pdf страниц по шаблонам (3 варианта)


### Демо-версия: 

Проект будет являться закрытой страницей с авторизацией, демо-версия позволяет увидеть основные страницы проекта.

[github.pages](https://inkinyam.github.io/gp-architect-archive/)


### Планы на доработки:

1. Новый функционал:  Разработка страницы для печати pdf страниц с возможностью выбора шаблона страницы, изображений, которые будут на ней использоваться.

2. Доработки и исправления:  Корректировки фильтров по датам

  
### Запустить проект

1. Скопируйте репозиторий к себе на компьютер

2. Выполните команду npm install

    * Для запуска dev сборки npm run serve
    * Для запуска build сборки проекта npm run build-and-b

  Внимание! Для установки проекта необходим node версии 18

  
### Статус проекта

⚙️ в работе