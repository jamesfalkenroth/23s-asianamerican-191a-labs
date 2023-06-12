// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

let vaccinated = L.featureGroup();
let nonVaccinated = L.featureGroup();

let layers = {
    "<svg height='10' width='10'><circle cx='5' cy='5' r='4' stroke='black' stroke-width='1' fill='red' /></svg> Vaccinated": vaccinated,
    "<svg height='10' width='10'><circle cx='5' cy='5' r='4' stroke='black' stroke-width='1' fill='blue' /></svg> Unvaccinated": nonVaccinated
}

let circleOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSNq8_prhrSwK3CnY2pPptqMyGvc23Ckc5MCuGMMKljW-dDy6yq6j7XAT4m6GG69CISbD6kfBF0-ypS/pub?output=csv"

// define the leaflet map
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

// add layer control box
// L.control.layers(null,layers,{collapsed:false}).addTo(map)

let Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16
});

Esri_WorldGrayCanvas.addTo(map);

function addMarker(data){
    if(data['Have you been vaccinated?'] == "Yes"){
        circleOptions.fillColor = "red"
        vaccinated.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>Vaccinated</h2>`))
        createButtons(data.lat,data.lng,data['What zip code do you live in?'])
        }
    else{
        circleOptions.fillColor = "blue"
        nonVaccinated.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>Non-Vaccinated</h2>`))
        createButtons(data.lat,data.lng,data['What zip code do you live in?'])
    }
    return data
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    const spaceForButtons = document.getElementById('placeForButtons')
    spaceForButtons.appendChild(newButton);//this adds the button to our page.
}

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}

function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        addMarker(data)
    })
    vaccinated.addTo(map) // add our layers after markers have been made
    nonVaccinated.addTo(map) // add our layers after markers have been made  
    let allLayers = L.featureGroup([vaccinated,nonVaccinated]);
    map.fitBounds(allLayers.getBounds());
}

// get the legend HTML checkbox 'vaccinatedCheckbox` to target
const vaccinatedLegendHTML = document.getElementById("vaccinatedCheckbox");

// add the event listener for the click
vaccinatedLegendHTML.addEventListener("click",toggleVaccinatedLayer) 

// our function to toggle on/off for english legend's group layer
function toggleVaccinatedLayer(){
    if(map.hasLayer(vaccinated)){
        map.removeLayer(vaccinated)
    }
    else{
        map.addLayer(vaccinated)
    }
}

// target the nonVaccinatedCheckbox div
const nonvaccinatedLegendHtml = document.getElementById("unvaccinatedCheckbox");

// add the event listener for the click
nonvaccinatedLegendHtml.addEventListener("click",toggleNonVaccinatedLayer) 

// toggle the legend for nonvaccinatedLegend grouplayer
function toggleNonVaccinatedLayer(){
    if(map.hasLayer(nonVaccinated)){
        map.removeLayer(nonVaccinated)
    }
    else{
        map.addLayer(nonVaccinated)
    }
}


loadData(dataUrl)
