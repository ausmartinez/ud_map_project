

// TODO flow
/*
  get values from input location
  geocode input location to get the lat long
  create places request object using that info, specify distance and such
    will probably use knock out to get other request info to filter results
  execute the places request and push results into markers array
  diplay markers array onto the map and the list on the side
    markers may need to be geocoded as well before display
  user should be able to click either one
*/



// Basically our model ////////////////////


var map;
var locationResult;

function initMap() {
  var pyrmont = {lat: -33.867, lng: 151.195};
  // Constructor creates a new map - only center and zoom are required
  map = new google.maps.Map(document.getElementById('map'), {
    // {lat: 40.7413549, lng: -73.9980244},
    center: pyrmont,
    zoom: 14
  });

  // This autocomplete is for use in the geocoder entry box.
  // var inputAreaComplete = new google.maps.places.Autocomplete(
  //     document.getElementById('input-location'));

  // Geo code given information
  var geocoder = new google.maps.Geocoder();
  document.getElementById('submit-location').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });

  // Get relevant places near the searched area
  var places = new google.maps.places.PlacesService(map);
  places.nearbySearch({
    location: pyrmont,
    radius: 500
  }, callback);
}

//TODO work on integrating the geocode function into the acutal flow of the app

// Geocode a given address
function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('input-location').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status == 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      // var marker = new google.maps.Marker({
      //   map: resultsMap,
      //   position: results[0].geometry.location
      // });
    }
    else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

// To hold all data regarding each marker passed from Maps API
function Marker(value){
  var self = this;
  // May need more data variables
  self.data = value;
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
}

function update(inputLocation) {

}

// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
function AppViewModel() {
    var self = this;

    self.inputLocation = ko.observable();

    // KO array of our markers
    self.markers = ko.observableArray([]);

    // TODO When we start getting marker info from maps, we will need to flush
    //        the markers array and then refill it with necessary info
    self.addToMarkers = function() {
      update(self.inputLocation());
      // self.markers.push( new Marker(self.inputLocation()) );
    }
}
// Activates knockout.js
ko.applyBindings(new AppViewModel());
