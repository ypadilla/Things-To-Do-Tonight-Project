// var map;

// function initMap() {
//     var pyrmont = {
//         lat: 28.5241838,
//         lng: -81.46383709999999
//     };
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: pyrmont,
//         zoom: 17
//     });
//     var service = new google.maps.places.PlacesService(map);
//     service.nearbySearch({
//         location: pyrmont,
//         radius: 1500,
//         type: ['food']
//     }, processResults);
// }

// function processResults(results, status, pagination) {
//     if (status !== google.maps.places.PlacesServiceStatus.OK) {
//         return;
//     } else {
//         createMarkers(results);
//         if (pagination.hasNextPage) {
//             var moreButton = document.getElementById('more');
//             moreButton.disabled = false;
//             moreButton.addEventListener('click', function() {
//                 moreButton.disabled = true;
//                 pagination.nextPage();
//             });
//         }
//     }
// }

// function createMarkers(places) {
//     var bounds = new google.maps.LatLngBounds();
//     var placesList = document.getElementById('places');
//     for (var i = 0, place; place = places[i]; i++) {
//         var image = {
//             url: place.icon,
//             size: new google.maps.Size(71, 71),
//             origin: new google.maps.Point(0, 0),
//             anchor: new google.maps.Point(17, 34),
//             scaledSize: new google.maps.Size(25, 25)
//         };
//         var marker = new google.maps.Marker({
//             map: map,
//             icon: image,
//             title: place.name,
//             position: place.geometry.location
//         });
//         placesList.innerHTML += '<h4>' + place.name + '</h4>';
//         bounds.extend(place.geometry.location);
//     }
//     map.fitBounds(bounds);
// }


$("button").on('click', function(){
var APIKey = "166a433c57516f51dfab1f7edaed8413"; 

   var city=$("input").val().trim();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?zip="+city+"&appid=" + APIKey + "&units=Imperial";
    
    
    $.ajax({url: queryURL, method: 'GET'})

     
     .done(function(response) {
        
        console.log(queryURL);
        
        console.log(response);
     
        $("#temp").html("Your Temperature is: " + response.main.temp + " &#8457;");


        
        
    }); 
     return false;

});




var map;
var infowindow;
var pos;

function initMap() {

  if (navigator.geolocation) { //GEO LOCATION, FINDS USERS LOCATION
    navigator.geolocation.getCurrentPosition(function(position) {

      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      map = new google.maps.Map(document.getElementById('map'), {
        center: myLocation,
        zoom: 13
      });
      infoWindow = new google.maps.InfoWindow({
        map: map
      });
      infoWindow.setPosition(pos);
      infoWindow.setContent('You are here! ' + ' <span class="glyphicon glyphicon-user"></span>');
      map.setCenter(pos);
      var myLocation = pos; //Sets variable to geo location long and lat co-ordinates.

      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: myLocation, //Uses geolocation to find the following
        radius: 1500,
        types: ['food']
      }, callback);
    })
  };



}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  var infowindow = new google.maps.InfoWindow({
  content: marker
  });

google.maps.event.addListener(marker, 'click', function() {
  infowindow.open(map,marker);
  });

  google.maps.event.addListener(marker, 'click', function() {
  	console.log(place)
    infowindow.setContent(place.name + '<br>' + ' Rating: ' + place.rating + '<br>' + ' Address: ' + place.vicinity + '<br>' + 'Open on Google Maps:' + ' <a href="https://maps.google.com/">Google Maps</a>');
    infowindow.open(map, this);
    
  });
}



initMap();