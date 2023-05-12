import * as L from 'leaflet'
import redPin from '../images/pin.png';
import bluePin from '../images/pin2.png'


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


    this.map = new L.map(this.container, {...this.options});
    this.renderMap(); 
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
  _addLayers(dataGroupLayers) {
    let groupLayers = {};
    dataGroupLayers.forEach(layer => {
      let layerStyle   = layer.style || {};
      let geoLayer     = L.geoJSON (
        layer.geojson, 
        { style: layerStyle,
          onEachFeature: (feature, layer) => {
            if (feature.geometry.type === 'Point') {
              if (!feature.properties.image) {
                feature.properties.image = 'https://www.vanwalraven.com/image/media/products/notfound@960w.png?v=1649171577'
              }
              let marker =  L.marker( layer._latlng, 
                                      { icon: L.icon({
                                        iconUrl: redPin,
                                        shadowUrl:   redPin,
                                        iconSize:    [22, 33],
                                        shadowSize:  [0, 0],
                                        iconAnchor:  [11, 33],
                                        shadowAnchor:[1, 1],
                                        popupAnchor: [-3, -33]
                                      })})
                                    .addTo(this.map)
                                    .bindPopup(`
                                      <div class="popup">
                                        <img src="${feature.properties.image}" alt="${feature.properties.name}"/>
                                        <h4>${feature.properties.name}</h4>
                                        <p>${feature.properties.address}</p>
                                        <a href="${feature.properties._links.url_frontend.href}">К проекту</a>
                                      </div>`);
              marker.on('mouseover', () => { marker.setIcon(L.icon({iconUrl: bluePin})) })
              marker.on('mouseout',  () => { marker.setIcon(L.icon({iconUrl: redPin })) })
            }
          }
        }); 
      groupLayers[layer.name] = geoLayer;
      this.layers[layer.name]  = geoLayer;
    });
    
    // получить границы всех маркеров и выставить зум карты
      let total = 0;
      dataGroupLayers.forEach(result => total += result.geojson.features.length);
      this.totalResult.textContent = total;

      if (total === 0) {
        return false;
      }
    
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

  // обновление карты
  update() {
    this.map._onResize();
  }


  //функция поиска
  _search() {
    let finalResult = [];
    if (this.searchTextInput.value === '') {
      this.totalResult.textContent = this.options.groupLayers[0].geojson.features.length;
      finalResult = this.options.groupLayers;
      
    } else {
      for (let i=0; i<=this.options.groupLayers.length-1; i++) {
        const filteredFeatures = this.options.groupLayers[i].geojson.features.filter(item => this._searchInElement(item));
        if (filteredFeatures.length > 0) {
          finalResult.push({
            type: "FeatureCollection",
            name: "search",
            group: "search",
            geojson: {type: "FeatureCollection", features: filteredFeatures}
          });
        }
      }
    } 
    this._updateMap(finalResult);
  }

  //поиск по одному элементу json
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

  _updateMap(geojson) {
    for (let layer of Object.values(this.map._layers)) {
      if (!layer._url) {
        this.map.removeLayer(layer);
      }
    }

    this._addLayers(geojson);
  }


 // рендер карты
  renderMap() {
    this._addTiles();
    this._addControllers();
    this._addLayers(this.options.groupLayers);
  
    this.searchTextInput.addEventListener('input', (e) => {
      e.preventDefault()
      this._search();
    });
  }
}

export default function createNewLeaflet(containerId, options) {
	return new MyLeaflet(containerId, options);
}
