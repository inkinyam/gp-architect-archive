import * as L from 'leaflet';

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

  init() {
    // create map instance
    this.map = L.map(this.containerId, { ...this.options });

    // create base layers
    const baseLayers = {};
    for (const layer of this.options.baseLayers) {
      const baseLayer = L.tileLayer(layer.url, layer.options);
      baseLayers[layer.name] = baseLayer;
      if (!this.map.hasLayer(baseLayer)) {
        this.map.addLayer(baseLayer);
      }
    }
    L.control.layers(baseLayers).addTo(this.map);

    // create geojson layers
    for (const layer of this.layerOptions) {
      const options = layer.options || {};
      const layerStyle = layer.style || {};
      const groupOptions = this.groupLayerOptions.find(group => group.name === layer.group)?.options || {};
      const geojsonLayer = L.geoJSON(layer.geojson, {
        style: layerStyle,
        interactive: options.interactive || false,
        ...groupOptions,
      });
      if (options.handleMouseEnter) {
        geojsonLayer.on('mouseover', options.handleMouseEnter);
        geojsonLayer.on('mouseout', options.handleMouseLeave);
      }
      this.layers[layer.name] = geojsonLayer;
    }

    // create group layers
    for (const group of this.groupLayerOptions) {
      const groupLayer = L.layerGroup([]);
      for (const layerName of group.layers) {
        const layer = this.layers[layerName];
        if (layer) {
          groupLayer.addLayer(layer);
        }
      }
      this.groupLayers[group.name] = groupLayer;
    }

    // add layers to map
    for (const layerName in this.layers) {
      const layer = this.layers[layerName];
      const groupLayer = this.groupLayers[this.layerOptions.find(l => l.name === layerName)?.group];
      const addToLayer = groupLayer || this.map;
      addToLayer.addLayer(layer);
    }

    // add controllers to map
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
}

export default LeafletMap;