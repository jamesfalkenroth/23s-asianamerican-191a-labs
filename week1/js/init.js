// JavaScript const variable declaration
const map = L.map('the_map').setView([30.614092964341857, -70.59983073615909], 3); // (1)!

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); // (2)!

//JavaScript let variable declaration to create a marker
let marker = L.marker([41.90376199917393, 12.487912229749684]).addTo(map) // (3)!
        .bindPopup('I visited Rome, Italy in 2019')
        .openPopup();

//JavaScript let variable declaration to create a marker
let marker2 = L.marker([10.4535131990843, -83.49435055600921]).addTo(map) // (3)!
        .bindPopup('I visited Parque Nacional Tortugeuro, Costa Rica in 2017')
        .openPopup();

//JavaScript let variable declaration to create a marker
let marker3 = L.marker([21.873601358424523, -159.4548509823777]).addTo(map) // (3)!
        .bindPopup('I visited Poipu Beach, Hawaii in 2022')
        .openPopup();

