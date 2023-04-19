import * as L from 'leaflet';
import icon from '../images/pin.png';

let iconClass = L.Icon.extend({
  options: {
    shadowUrl: icon,
    iconSize: [22, 33],
    shadowSize:   [0, 0],
    iconAnchor:   [11, 33],
    shadowAnchor: [1, 1],
    popupAnchor:  [-3, -33]

  }
})
let darkIcon = new iconClass({iconUrl: icon});

class LeafletMap {
  constructor(containerId, options, layerOptions, groupLayerOptions, controllers) {
    this.containerId = containerId;
    this.options = options;
    this.layerOptions = layerOptions;
    this.groupLayerOptions = groupLayerOptions;
    this.controllers = controllers;
    this.map = null;
    this.layers = {};
    this.groupLayers = {};
  }
  
  addBaseLayers() {
    const baseLayers = {};
    for (const layer of this.options.baseLayers) {
      const baseLayer = L.tileLayer(layer.url, layer.options);
      baseLayers[layer.name] = baseLayer;
      if (!this.map.hasLayer(baseLayer)) {
        this.map.addLayer(baseLayer);
      }
    }
    L.control.layers(baseLayers).addTo(this.map);
  }

  addNewLayers() {
    for (const layer of this.layerOptions) {
      const options = layer.options || {};
      const layerStyle = layer.style || {};
      const groupOptions = this.groupLayerOptions.find(group => group.name === layer.group)?.options || {};
      const geojsonLayer = L.geoJSON(layer.geojson, {
                                        style: layerStyle,
                                        interactive: options.interactive || false,
                                        ...groupOptions,
                                        onEachFeature: (feature, layer) => {
                                          if (feature.geometry.type === 'Point') {
                                            L.marker(layer._latlng, { icon: darkIcon }).addTo(this.map).bindPopup(`<div class="popup"><img src="${feature.properties.img}"/><h4>${feature.properties.name}</h4><p>${feature.properties.adress}</p><a href="${feature.properties.link}">К проекту</a></div>`);
                                          }
                                        },
                                      });
                                      
      if (options.handleMouseEnter) {
        geojsonLayer.on('mouseover', options.handleMouseEnter);
        geojsonLayer.on('mouseout', options.handleMouseLeave);
      }
      this.layers.name  = geojsonLayer;
    }
  }

  addLayersToMap (){
    for (const layerName in this.layers) {
      const layer = this.layers[layerName];
      const groupLayer = this.groupLayers[this.layerOptions.find(l => l.name === layerName)?.group];
      const addToLayer = groupLayer || this.map;
      addToLayer.addLayer(layer);
    }
  }

  addControllers (){
    for (const controller of this.controllers) {
      let div ='';
      const control = L.control({ position: controller.position });
      control.onAdd = function(map) {
        div = L.DomUtil.create('div', 'leaflet-control');
        div.innerHTML = controller.html;
        div.addEventListener('click', controller.onClick);
        return div;
      };
      if (controller.layers) {
        control.addTo(this.map);
        for (const layerName of controller.layers) {
          const layer = this.groupLayers[layerName];
          if (layer) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = this.map.hasLayer(layer);
            checkbox.addEventListener('change', () => {
              if (checkbox.checked) {
                this.map.addLayer(layer);
              } else {
                this.map.removeLayer(layer);
              }
            });
            const label = document.createElement('label');
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(layerName));
            div.appendChild(label);
          }
        }
        } else {
          control.addTo(this.map);
        }
    }
  }



  init() {
    this.map = L.map(this.containerId, { ...this.options });
    this.addBaseLayers();
    this.addNewLayers();
    this.addLayersToMap();
    this.addControllers();
  }
}

export default function createMap(containerId, options, layerOptions, groupLayerOptions, controllers) {
	return new LeafletMap(containerId, options, layerOptions, groupLayerOptions, controllers);
}
