import * as L from 'leaflet'

import bluePin from '../images/pin2.png'


class MyLeaflet extends L.Class {
  constructor (id, options) {
    super();

    this.id = id;
    this.container = document.querySelector(this.id);
    this.options = options;

    this.layers = {};
    this.groupLayers = {};
    this.controllers = {};

    this.renderMap() 
  }


  _addTiles () {
    let baseLayers = {};
    this.options.baseLayers.forEach(layer => {
      const baseLayer = L.tileLayer(layer.url, layer.options);
      baseLayers[layer.name] = baseLayer;
      if (!this.map.hasLayer(baseLayer)) {
        this.map.addLayer(baseLayer);
      }
    });
/* 
    let controller = this.options.controllers;
    let baseLayersControl = L.control.layers(baseLayers).addTo(this.map); */
  }

  _addLayers() {
    this.options.groupLayers.forEach(layer => {
      let layerOptions = layer.options || {};
      let layerStyle = layer.style || {};
      let geoLayer = L.geoJSON(
        layer.geojson, 
        { style: layerStyle,
          interactive: layerOptions.interactive || false,
          onEachFeature: (feature, layer) => {
            if (feature.geometry.type === 'Point') {
             let marker =  L.marker( layer._latlng, { icon: L.icon({
                                         iconUrl: '../images/pin.png',
                                         shadowUrl:   '../images/pin.png',
                                         iconSize:    [22, 33],
                                         shadowSize:  [0, 0],
                                         iconAnchor:  [11, 33],
                                         shadowAnchor:[1, 1],
                                         popupAnchor: [-3, -33]
                                        })
                         }).addTo(this.map)
                          .bindPopup(`<div class="popup"><img src="${feature.properties.img}"/><h4>${feature.properties.name}</h4><p>${feature.properties.adress}</p><a href="${feature.properties.link}">К проекту</a></div>`);
            
                  marker.on('mouseover', () => { marker.setIcon(L.icon({iconUrl: bluePin })) })
                  marker.on('mouseout', () => { marker.setIcon(L.icon({iconUrl: '../images/pin.png' })) })
       
            }
          }

        }) 
      this.layers.name  = geoLayer;
  })
}

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

 update() {
  this.map._onResize();
 }

            
  
  renderMap() {
    this.map = new L.map(this.container, {...this.options});
    this._addTiles();
    this._addLayers();
    this._addControllers();
  }
}

export default function createNewLeaflet(containerId, options) {
	return new MyLeaflet(containerId, options);
}


