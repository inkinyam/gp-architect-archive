import * as L from 'leaflet'
import bluePin from '../images/pin.png';
import blackPin from '../images/pin2.png'


class MyLeaflet extends L.Class {
  constructor (id, options) {
    super();

    this.id          = id;
    this.container   = document.querySelector(this.id);
    this.options     = options;
    this.layers      = {};
    this.groupLayers = {};
    this.controllers = {};

    let represent = document.querySelector('.represent_mapview');
    this.searchTextInput = represent.querySelector('.search__main-input');
    this.totalResult = represent.querySelector('.represent__counter');

    this.initMap(); 
  }

  //добавить тайлы на карты
  _addTiles () {
    let baseLayers = {};
    this.options.baseLayers.forEach(layer => {
      const baseLayer = L.tileLayer(layer.url, layer.options);
      baseLayers[layer.name] = baseLayer;
      if (!this.map.hasLayer(baseLayer)) {
        this.map.addLayer(baseLayer);
      }
    });
  }

  // добавить слои на карту (geojson)
  _addLayers() {
    let groupLayers = {};
    this.options.groupLayers.forEach(layer => {
      let layerOptions = layer.options || {};
      let layerStyle   = layer.style || {};
      let geoLayer     = L.geoJSON (
        layer.geojson, 
        { style: layerStyle,
          interactive: layerOptions.interactive || false,
          onEachFeature: (feature, layer) => {
            if (feature.geometry.type === 'Point') {
              let marker =  L.marker( layer._latlng, 
                                      { icon: L.icon({
                                        iconUrl: blackPin,
                                        shadowUrl:   blackPin,
                                        iconSize:    [22, 33],
                                        shadowSize:  [0, 0],
                                        iconAnchor:  [11, 33],
                                        shadowAnchor:[1, 1],
                                        popupAnchor: [-3, -33]
                                      })})
                                    .addTo(this.map)
                                    .bindPopup(`<div class="popup"><img src="${feature.properties.image}" alt="${feature.properties.name}"/><h4>${feature.properties.name}</h4><p>${feature.properties.address}</p><a href="${feature.properties._links.url_frontend.href}">К проекту</a></div>`);
              marker.on('mouseover', () => { marker.setIcon(L.icon({iconUrl: bluePin})) })
              marker.on('mouseout',  () => { marker.setIcon(L.icon({iconUrl: blackPin })) })
            }
          }
        }); 
      groupLayers[layer.name] = geoLayer;
      this.layers[layer.name]  = geoLayer;
    });
    
    // получить границы всех маркеров и выставить зум карты
    const group = new L.featureGroup(Object.values(groupLayers));
    this.map.fitBounds(group.getBounds());
  }

  // контроллеры на карту
  _addControllers () {
    this.options.controllers.forEach(controller => {
      let controlIcon = L.icon({
        iconUrl: controller.option.iconUrl,
        iconSize: [44, 44]
      })

      let newController = L.control({
        position: controller.option.position
      })

      newController.onAdd = ()=>{
        let button = L.DomUtil.create('button', 'leaflet-bar leaflet-control leaflet-control-custom mapview__controller');
        button.style.backgroundImage = `url(${controlIcon.options.iconUrl})`;
        button.addEventListener('click', ()=> {
          if (controller.name === 'zoomIn') {
            this.map.zoomIn();
          } else if (controller.name === 'zoomOut'){
            this.map.zoomOut();
          }else if (controller.name === 'center'){
            this.map.flyTo(this.options.center, this.options.zoom);
          }
        })
        return button;
      }

      newController.addTo(this.map);
    })

  }  

  search(){
    let finalResult = [];

    if (this.searchTextInput.value === '') {
      finalResult = this.options.groupLayers[0];
      this.totalResult.textContent = this.options.groupLayers[0].geojson.features.length;
    } else {
      for (let i=0; i<=this.options.groupLayers.length-1; i++) {
        finalResult.geojson = this.options.groupLayers[i].geojson.features.filter(item => this._searchInElement(item));
      }
      finalResult.type = "FeatureCollection";
      finalResult.name = "search";
      finalResult.group = "search";
      
      this.renderMap(...{groupLayers:finalResult})
    } 
  }


   _searchInElement(element) {
    let inputText = this.searchTextInput.value.toLowerCase();
    let elemArray =[];
  
    if (typeof(element) ==='object') {
      elemArray = Object.values(element);
    } else {
      elemArray = element;
    }

    for (let i=0; i<=elemArray.length-1; i++) {
      if (elemArray[i] === null) {
        continue;
      }

      else if (typeof(elemArray[i]) === 'number'||typeof(elemArray[i]) === 'string') {
        if (elemArray[i].toString().toLowerCase().includes(inputText)) {
          return true;
        }
      } 
      else if (Array.isArray(elemArray[i])||typeof(elemArray[i]) === 'object') {
        if (this._searchInElement(elemArray[i])){
          return true;
        }
      }
    }
    return false;
  } 

 // обновление карты
  update() {
   this.map._onResize();
  }

  // рендер карты
  renderMap(options) {
    this.map = new L.map(this.container, {...options});
    this._addTiles();
    this._addLayers();
    this._addControllers();
    this.update();
  }

  initMap() {
    this.renderMap(this.options);
    this.searchTextInput.addEventListener('input', (e) => {
      this.search();
    });
  }
}

export default function createNewLeaflet(containerId, options) {
	return new MyLeaflet(containerId, options);
}


