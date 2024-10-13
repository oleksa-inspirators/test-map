<script>
    import { onMount } from 'svelte';
    import 'leaflet/dist/leaflet.css';
    import L from 'leaflet';
    import { subregions } from './subregions.js'; 
  
    let map;

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function orderCoordinates(villages) {
        const pivot = villages.reduce((prev, curr) => 
            (curr.coordinates[1] < prev.coordinates[1] || 
            (curr.coordinates[1] === prev.coordinates[1] && curr.coordinates[0] < prev.coordinates[0])) 
            ? curr : prev
        );

        function angleBetween(point) {
            const [x, y] = point.coordinates;
            const [px, py] = pivot.coordinates;
            return Math.atan2(y - py, x - px);
        }

        const sortedVillages = [...villages].sort((a, b) => angleBetween(a) - angleBetween(b));
        const hull = [];

        sortedVillages.forEach(point => {
            while (hull.length >= 2) {
                const [p1, p2] = [hull[hull.length - 2], hull[hull.length - 1]];
                const crossProduct = (p2.coordinates[0] - p1.coordinates[0]) * (point.coordinates[1] - p1.coordinates[1]) -
                                     (p2.coordinates[1] - p1.coordinates[1]) * (point.coordinates[0] - p1.coordinates[0]);
                if (crossProduct <= 0) hull.pop();
                else break;
            }
            hull.push(point);
        });

        return hull.map(village => village.coordinates);
    }

    onMount(() => {
      map = L.map('map', {
        center: [49.8419, 24.0315],
        zoom: 7.3,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
      });
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);
  
      subregions.forEach(subregion => {
        const villageCoordinates = orderCoordinates(subregion.villages);
        const polygonColor = getRandomColor();

        L.polygon(villageCoordinates, {
          color: 'transparent',
          fillColor: polygonColor,
          fillOpacity: 0.5, 
        })
        .addTo(map)
        .bindPopup(`Subregion: ${subregion.name}`);
      });
    });
</script>

<style>
    #map {
      width: 100%;
      height: 100vh;
    }
</style>

<div id="map"></div>
