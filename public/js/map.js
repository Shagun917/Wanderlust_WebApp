mapboxgl.accessToken = mapToken;
if(coordinates.length >0) {
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11',
    center: coordinates,
    zoom: 9 // starting zoom
});

const marker = new mapboxgl.Marker({ color: 'red' })
.setLngLat(coordinates)
.addTo(map);
} else {
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [77.2090, 28.6139],
        zoom: 9 // starting zoom
    });
    
    const marker = new mapboxgl.Marker({ color: 'red' })
    .setLngLat([77.2090, 28.6139])
    .addTo(map);
}