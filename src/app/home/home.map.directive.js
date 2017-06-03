(function() {
  angular.module( 'application.home')
  .directive('excerciseMap', excerciseMap);

  function excerciseMap(MapService){
    return {
      scope: {
        data: '<',
        location: "<"
      },
      link: function(scope, element, attrs){
        var options = {
          center: new google.maps.LatLng(40.7127837, -74.00594130000002),
          zoom: 13,
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite']
          }  
        };
        this.map = new google.maps.Map( element[0], options );
        this.bounds = new google.maps.LatLngBounds();
        this.markers = [];
        this.selectedMarkers = [];
        var that = this;
        scope.$watchCollection('data', function(watchedData) {
          if(watchedData !== undefined) {
            that.markers = MapService.addMarkers(watchedData, that.map, that.markers);
          }
        });

        scope.$watch('location', function(watchedData){
          if(watchedData !== undefined ){
            
            if(watchedData.location !== ""){
              that.selectedMarkers = [];
              _.each(that.markers, function(marker, index){
                marker.setMap(null);
              });           
              _.each(that.markers, function(marker,i) {
                if(google.maps.geometry.spherical.computeDistanceBetween(marker.getPosition(), new google.maps.LatLng(watchedData.location.lat, watchedData.location.lon)) <= watchedData.distance * 1000){
                  marker.setMap(that.map);
                  that.selectedMarkers.push(marker);
                }
              });
              _.each(that.selectedMarkers, function(marker, index){
                that.bounds.extend(marker.getPosition());
              });
              that.map.fitBounds(that.bounds);
            }
            else{
              _.each(that.markers, function(marker,i) {
                  marker.setMap(that.map);
                  that.map.setCenter(marker.getPosition());
              });
            }

          }
        });
        
      }
    };
  }
})();