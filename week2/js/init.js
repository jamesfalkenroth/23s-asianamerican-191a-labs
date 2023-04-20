// declare variables
let zoomLevel = 3;
const mapCenter = [30.614092964341857, -70.59983073615909];

// use the variables
const map = L.map('the_map').setView(mapCenter, zoomLevel);

// Leaflet tile layer, i.e. the base map
var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
}).addTo(map); // (2)!

// create a function to add markers
function addMarker(lat,lng,title,message){
        console.log(message)
        L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
        return message
    }
    
// use our marker functions
addMarker(41.90376199917393, 12.487912229749684,'Rome','I visited Rome, Italy in 2019')
addMarker(10.4535131990843, -83.49435055600921,'Parque Nacional Tortuguero','I visited Parque Nacional Tortugeuro, Costa Rica in 2017')
addMarker(21.873601358424523, -159.4548509823777,'Poipu Beach','I visited Poipu Beach, Hawaii in 2022')
addMarker(40.71744067586278, -74.00294771116792,'New York City','I visited New York City, NY in 2015')
addMarker(47.65553016637281, -122.30349843301575,'Seattle','I visited the University of Washington in Seattle, WA in 2018')


