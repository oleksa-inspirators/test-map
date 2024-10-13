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

    function generateCurvedPath(coordinates) {
    const curvedPath = [];
    const waveAmplitude = 0.30; 

    for (let i = 0; i < coordinates.length; i++) {
        const start = coordinates[i];
        const end = coordinates[(i + 1) % coordinates.length]; 
        
        const midPoint = [
            (start[0] + end[0]) / 2,
            (start[1] + end[1]) / 2 + waveAmplitude * (Math.random() - 0.5)
        ];
        
        curvedPath.push(start, midPoint);
    }
    
    curvedPath.push(coordinates[0]);
    return curvedPath;
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

            const curvedPath = generateCurvedPath(villageCoordinates);

            L.polygon(curvedPath, {
                color: polygonColor,
                fillColor: polygonColor,
                fillOpacity: 0.5,
                smoothFactor: 1,
            })
            .addTo(map)
            .bindPopup(`Subregion: ${subregion.name}`);

            subregion.villages.forEach(village => {
                const circle = L.circleMarker(village.coordinates, {
                    radius: 8,
                    fillColor: polygonColor,
                    color: 'transparent',
                    fillOpacity: 0.5,
                }).addTo(map);

                circle._path.setAttribute('style', `fill: ${polygonColor}; fill-opacity: 0.5;`);
                circle.bindPopup(`Village: ${village.name}`)
                    .on('mouseover', function (e) {
                        this.openPopup();
                    })
                    .on('mouseout', function (e) {
                        this.closePopup();
                    });
            });
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
