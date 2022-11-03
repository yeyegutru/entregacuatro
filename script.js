//funcion asignadora de los colores segun el atributo d

function getColor(d) {
    return d > 100000000 ? '#800026' :
        d > 50000000 ? '#BD0026' :
        d > 20000000 ? '#E31A1C' :
        d > 10000000 ? '#FC4E2A' :
        d > 5000000 ? '#FD8D3C' :
        d > 2000000 ? '#FEB24C' :
        d > 1000000 ? '#FED976' :
        '#FFEDA0';
};


//funcion para asignar los colores, importar abajo
function style(feature) {
    return {
        //acceder a el feature, propiedades, atributo poblacion
        fillColor: getColor(feature.properties.pop_est),
        weight: 2,
        opacity: 1,
        //color linea separadora en los paises
        color: 'black',
        dashArray: '3',
        fillOpacity: 0.7
    };
}


// PARA LAS ciudades


function getColorCity(d) {
    if (d == "S") {
        d = "YELLOW";
    } else if (d == "N") {
        d = "GREEN";
    } else {
        d = "WHITE";
    }
    return d;
};


//para los departamentos
function getColorDepartamento(d) {
    return d > 100000000000 ? '#0d2b12' :
        d > 90000000000 ? '#a43c0c' :
        d > 80000000000 ? '#1e916e' :
        d > 70000000000 ? '#75c3b8' :
        d > 60000000000 ? '#d78d17' :
        d > 50000000000 ? '#e2e2e2' :
        d > 40000000000 ? '#978b7f' :
        d > 30000000000 ? '#f0c6d6' :
        d > 20000000000 ? '#12c7b4' :
        d > 10000000000 ? '#2bee1d' :
        '#771dee';
};
//style para los departamentos
function styleDepartamento(feature) {
    return {
        //acceder a el feature, propiedades, atributo poblacion
        fillColor: getColorDepartamento(feature.properties.SHAPE_AREA),
        weight: 2,
        opacity: 1,
        //color linea separadora en los paises
        color: 'black',
        dashArray: '3',
        fillOpacity: 0.7
    };
}




function pointToLayer(feature, latlng) {
    return L.circleMarker(latlng, {
        // Stroke properties
        color: 'BLACK',
        opacity: 0.75,
        weight: 1,

        // Fill properties
        fillColor: getColorCity(feature.properties.CAPITAL),
        fillOpacity: 0.6,

        radius: 3.2
    });
}

function popupCity(feature, layer) {
    if (feature.properties && feature.properties.CIUDAD) {
        layer.bindPopup(feature.properties.CIUDAD);
    }
}


//Para poner el popup a cada pais,importar abajo
function popup(feature, layer) {

    if (feature.properties && feature.properties.name) {
        //atributo a mostrar en el popup
        layer.bindPopup(feature.properties.name);
    }
}
//L.tilelayer sirve para llamar capas de otro servidor
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>' +
        'contributors',
    maxZoom: 18
});



//el 'map' es el id del div donde se mostrara el mapa
var map = L.map('map', {
    //coordenadas decimanles donde se abrira el mapa
    center: [41.66, -4.72],
    //zona bastante grande
    zoom: 3,
    //llamo la capa base 
    layers: osm,
    //para con la ruedita del maouse acercarse o alejarse
    scrollWheelZoom: true,
});
//-----GeoJson



// L.geoJson(paises, {
//     //funcion de colores
//     style: style
// }).addTo(map);


//para agregar la funcion del popup al mapa
geojson = L.geoJson(paises, {
    style: style,
    onEachFeature: popup
}).addTo(map);



var depar = L.geoJson(departamento, {
    style: styleDepartamento
}).addTo(map);

console.log(depar)
L.control.scale().addTo(map);

L.geoJson(ciudades, {
    pointToLayer: pointToLayer,
    onEachFeature: popupCity
}).addTo(map)


var title = L.control();
title.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'info');
    div.innerHTML +=
        '<h2>Ciudades del mundo</h2>Yeinner stiben guezguan trujillo, Alexander Cuerllas Murcia, Arnold Latorre Torres';
    return div;
};
title.addTo(map);