// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

let low = L.featureGroup();
let notLow = L.featureGroup();

// define layers
let layers = {
    "Low-income Respondent": low,
    "Non low-income Respondent": notLow
}

let circleOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

// add layer control box
L.control.layers(null,layers).addTo(map)

let CartoDB_VoyagerLabelsUnder = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});

CartoDB_VoyagerLabelsUnder.addTo(map)

//L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//}).addTo(map);

function addMarker(data){
    // console.log(data)
    // these are the names of our lat/long fields in the google sheets:
    
    if(data['Are you from a low-income household?'] == "Yes") {
        circleOptions.fillColor = "red"
        low.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>${data['Where is your primary zip code of residence?']}</h2> <h3>Low-income</h3>`))
        createButtons(data.lat,data.lng,data['Where is your primary zip code of residence?'])
        }
    else {
        circleOptions.fillColor = "blue"
        notLow.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>${data['Where is your primary zip code of residence?']}</h2> <h3>Low-income? ${data['Are you from a low-income household?']}</h3>`))
        createButtons(data.lat,data.lng,data['Where is your primary zip code of residence?'])
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

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSEcGaieNJJaf1Fkh0pwp8hvhnHYJJzV2TnCXHU8pBEWveti9_LuiZFZ7oAytgNcy0mrDJLKLs1HU-j/pub?output=csv"

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
    low.addTo(map);
    notLow.addTo(map);
    let allLayers = L.featureGroup([low,notLow]);
    map.fitBounds(allLayers.getBounds());     

}

loadData(dataUrl)

