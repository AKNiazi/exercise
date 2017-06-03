(function() {
  angular.module( 'application.home')

  .service('MapService', function($q, $timeout) {

    var service = this;
    service.addMarkers = addMarkers;
    
    function addMarkers(data, map, markers) {
      _.each(data, function(value, index){
        var marker = new google.maps.Marker({
          map: map,
          position: {lat: value.lat, lng: value.lon},
          animation: google.maps.Animation.DROP
        });
        
        if(value.num_bikes_available === 0){
          marker.setIcon('http://www.googlemapsmarkers.com/v1/d9534f/');
        }
        else{
          marker.setIcon('http://www.googlemapsmarkers.com/v1/f0ad4e/');
        }
        markers.push(marker);
        map.setCenter({lat: value.lat, lng: value.lon});
      });
      return markers;
    }
    
  });

})();