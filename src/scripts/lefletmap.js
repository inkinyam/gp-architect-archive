
import 'leaflet/dist/leaflet.css';
import LeafletMap from './leflet-custom';
import LeafletMaps from './leaflet';

let mapContainer = document.querySelector('#mskmap');
if (mapContainer) {

  const map = new LeafletMap(
    'mskmap', // id контейнера для карты
       {
          zoom: 9,
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
    [ // массив объектов с настройками геоjson-слоев
      {
        name: 'Territory1',
        geojson: volshskiy,
        style: {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
        },
        options: {
          interactive: true,
          handleMouseEnter: function(e) {
            this.setStyle({
              color: 'blue',
              fillColor: '#00f',
            });
          },
          handleMouseLeave: function(e) {
            this.setStyle({
              color: 'red',
              fillColor: '#f03',
            });
          },
        },
        group: 'Territory', // имя группы, к которой принадлежит слой
      },
      {
        name: 'Territory2',
        geojson: pestrech,
        style: {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
        },
        options: {
          interactive: true,
          handleMouseEnter: function(e) {
            this.setStyle({
              color: 'blue',
              fillColor: '#00f',
            });
          },
          handleMouseLeave: function(e) {
            this.setStyle({
              color: 'red',
              fillColor: '#f03',
            });
          },
        },
        group: 'Territory', // имя группы, к которой принадлежит слой
      },
      {
        name: 'Territory3',
        geojson: laishev,
        style: {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
        },
        options: {
          interactive: true,
          handleMouseEnter: function(e) {
            this.setStyle({
              color: 'blue',
              fillColor: '#00f',
            });
          },
          handleMouseLeave: function(e) {
            this.setStyle({
              color: 'red',
              fillColor: '#f03',
            });
          },
        },
        group: 'Territory', // имя группы, к которой принадлежит слой
      },
      {
        name: 'volzhsk',
        geojson: volzhsk,
        group: 'City', 
        options: {
          interactive: true,
          handleMouseEnter: function(e) {
            this.setStyle({
              color: 'hotpink',
              fillColor: 'hotpink',
            });
          },
          handleMouseLeave: function(e) {
            this.setStyle({
              color: 'green',
              fillColor: 'green',
            });
          },
        },
      },      
      {
        name: 'kazan',
        geojson: kazan,
        group: 'City', 
        options: {
          interactive: true,
          handleMouseEnter: function(e) {
            this.setStyle({
              color: 'hotpink',
              fillColor: 'hotpink',
            });
          },
          handleMouseLeave: function(e) {
            this.setStyle({
              color: 'green',
              fillColor: 'green',
            });
          },
        },
      },
    ],
    [ 
      {
        name: 'Territory',
        layers: ['Territory1', 'Territory2', 'Territory3'], 
      },
      {
        name: 'City',
        layers: ['kazan', 'volzhsk'], 
        options: {
          
          style: {
            color: 'green',
            fillColor: 'green',
            fillOpacity: 0.5,
          },
        },
       
      }
    ],
    [ // массив объектов с настройками контроллеров
      { 
        name: 'zoomOut',
        position: 'bottomright',
        html: '<div class="controll controll_zoomOut"></div>',
        onClick: function () {
          console.log('zoom out');
        }
      },
      { 
        name: 'zoomIn',
        position: 'bottomright',
        html: '<div class="controll controll_zoomIn"></div>',
        onClick: function () {
          console.log('zoom in');
        }
      },
      {
        name: 'defaultPosition',
        position: 'bottomright',
        html: '<div class="controll controll_center"></div>',
        onClick: function () {
          console.log('default position');
        }
      },
      {
        name: 'fullscreen',
        position: 'bottomright',
        html: '<div class="controll controll_fullscreen"></div>',
        onClick: function () {
          console.log('full position');
        }
      },
      {
        name: 'smallscreen',
        position: 'bottomright',
        html: '<div class="controll controll_smallscreen"></div>',
        onClick: function () {
          console.log('small position');
        }
      },

      {
        name: 'addidea',
        position: 'topleft',
        html: '<div class="controll controll_add"></div>',
        onClick: function () {
          console.log('add new idea');
        }
      },




      {
        name: 'TerritoryControl',
        position: 'topright',
        html: '<div class="controll controll_layers"></div>',
        layers: ['Territory'],
      },
      {
        name: 'CityControl',
        position: 'topright',
        html: '<div class="controll controll_baselayer"></div>',
        layers: ['City'],
      },
    ],
  );
  map.init();
}


