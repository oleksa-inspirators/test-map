<script>
    import { onMount } from 'svelte';
    import 'leaflet/dist/leaflet.css';
    import L from 'leaflet';
  
    let map;
  
    onMount(() => {
      // Ініціалізація мапи
      map = L.map('map', {
        center: [49.8419, 24.0315], // Центр Львова
        zoom: 7.3,
        dragging: false, // Заборона панорамування
        scrollWheelZoom: false, // Заборона зуму
        doubleClickZoom: false, // Заборона зуму при двократному натисканні
        boxZoom: false, // Заборона зуму за допомогою коробки
      });
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);
    });
  </script>
  
  <style>
    #map {
      width: 100%;
      height: 100vh; 
    }
  </style>
  
  <div id="map"></div>
  