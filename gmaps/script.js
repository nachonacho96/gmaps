$(document).ready(function () {
	findMe();


	$("input#buscar").click(function(){	//cuando haga click en el boton #buscar
		var busca = $("input#busqueda").val();	//registro variable de busqueda
		buscar(busca);	//llamo a funcion buscar
		$("#resultados").removeClass("hidden");	//le quito la clase hidden para que sea visible
		
	});

	
});


//funcion que posiciona la chincheta 
function myMap(latitud, longitud) {
	var myCenter = new google.maps.LatLng(latitud, longitud);
	var mapCanvas = document.getElementById("map");
	var mapOptions = {center: myCenter, zoom: 14};
	var map = new google.maps.Map(mapCanvas, mapOptions);
	var marker = new google.maps.Marker({position:myCenter});
	marker.setMap(map);
};

//obtener la localización del usuario
function findMe(){

	if ("geolocation" in navigator){ //check geolocation available 
		//try to get user current location using getCurrentPosition() method
		navigator.geolocation.getCurrentPosition(function(position){ 
		console.log("Found your location nLat : "+position.coords.latitude+" nLang :"+ position.coords.longitude);
		myMap(position.coords.latitude, position.coords.longitude);	//mando posicion de la geolocalizacion del navegador
		});

	}else{
		console.log("Browser doesn't support geolocation!");
		myMap(0,0);		//si no encuentra la localización que mande la posición 0,0
	}
};

function buscar(busca) {
	$.ajax({	//peticion ajax
			url:"https://maps.googleapis.com/maps/api/geocode/json",	
			data: {address: busca, key: "AIzaSyAU3gtihfVm8wiB5HT09ZMPRFS1kECjO3o"}, 
			type: "GET",
			dataType: "json", 
			success: function exito(respJSON) {
				var latitud = respJSON.results[0].geometry.location.lat;	//saco coordenadas
				var longitud = respJSON.results[0].geometry.location.lng;
				myMap(latitud, longitud);	//voy a esa ubicacion
				console.log(respJSON);
				$("#resultados").empty();	//vacio el div resultados
				for (var i = 0; i < respJSON.results.length; i++) {	//recorremos los resultados
					var componentes = respJSON.results[i].address_components;	//variable componentes

					for (var j = 0; j < componentes.length; j++) {	//recorremos los componentes de cada resultado
						
						var street_number, route, locality, administrative_area_level_2,
						administrative_area_level_1, country, postal_code;
						//escribimos cada componente en el div
						switch(componentes[j].types[0]){
							case "street_number":
									street_number = componentes[j].long_name;
									console.log("street_number: " + street_number);
									escribir("street_number: " + street_number);
									break;
							case "route":
									route = componentes[j].long_name;
									console.log("route: " + route);
									escribir("route: " + route);
									break;
							case "locality":
									locality = componentes[j].long_name;
									console.log("locality: " + locality);
									escribir("locality: " + locality);
									break;
							case "administrative_area_level_2":
									administrative_area_level_2 = componentes[j].long_name;
									console.log("administrative_area_level_2: " + administrative_area_level_2);
									escribir("administrative_area_level_2: " + administrative_area_level_2);
									break;
							case "administrative_area_level_1":
									administrative_area_level_1 = componentes[j].long_name;
									console.log("administrative_area_level_1: " + administrative_area_level_1);
									escribir("administrative_area_level_1: " + administrative_area_level_1);
									break;
							case "country":
									country = componentes[j].long_name;
									console.log("country: " + country);
									escribir("country: " + country);
									break;
							case "postal_code":
									postal_code = componentes[j].long_name;
									console.log("postal_code: " + postal_code);
									escribir("postal_code: " + postal_code);
									break;
						}
						
					}
						
						
				}
				
			},
			error: function fracaso(){
				console.log("ERROR");
			}
		});
};

//funcion que escribe los objetos en el resultado
function escribir(objeto) {
	$("#resultados").append('<p>'+objeto+'</p>');
};