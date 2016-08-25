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
        types: ['restaurant' , 'bar', 'night_club', 'movie_rental']

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
  	
    infowindow.setContent(place.name + '<br>' + ' Rating: ' + place.rating + '<br>' + ' Address: ' + place.vicinity + '<br>' + 'Open on Google Maps:' + ' <a href="https://maps.google.com/">Google Maps</a>');
    infowindow.open(map, this);


    $('#searchResults').html('<li>' + place.name + '<br>' +' Rating: ' + place.rating + '<br>' + ' Address ' + place.vicinity + '<br>' + 'Open on Google Maps:' + ' <a href="https://www.google.com/maps/search/" target="_blank">Google Maps</a>' + '<br>' + ' Website: ' + place.name+'.com');
    
  });
}



initMap();


$("#input").on('click', function(){
var APIKey = "166a433c57516f51dfab1f7edaed8413"; 

   var city=$("input").val().trim();


  if(city == null || city == "" || city.length < 5 || city.length > 5){
    $('#temp').html("Enter a valid Zip Code!");
    
    return false;
    
  }


    var queryURL = "http://api.openweathermap.org/data/2.5/weather?zip="+city+"&appid=" + APIKey + "&units=Imperial";
    
    
    $.ajax({url: queryURL, method: 'GET'})

     
     .done(function(response) {
        
        console.log(queryURL);
        
        console.log(response);
     
        $("#temp").html(response.name + ", Temp: " + response.main.temp + " &#8457; ");


        
        
    }); 
     return false;

});


$('.dropdown-toggle').dropdown()
