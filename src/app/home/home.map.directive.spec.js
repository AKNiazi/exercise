describe('excerciseMap', function(){

  var $element, $scope;


  beforeEach(module('application.home'));
  beforeEach(module('application'));

  beforeEach(inject(function( _$compile_, _$rootScope_, $controller ) {

    $scope = _$rootScope_;
    controller = $controller('HomeController', { $scope: $rootScope });
    $scope.mappingData = [{
        capacity: 33,
        eightd_has_available_keys: false,
        eightd_has_key_dispenser: false,
        is_installed: 1,
        is_renting: 1,
        is_returnin: 1,
        last_reported: 1496456107,
        lat: 40.71911552,
        lon: -74.00666661,
        station_id: "79",
        name: "Franklin St & W Broadway",
        num_bikes_available: 5 
    }];
    $element = _$compile_("<div excercise-map data-data='mappingData' data-location='controller.query'></div>")($scope);
  }));

  it('should init the map', function(){
    expect($element.html()).not.toEqual('');
  });

  it('should receive data', function(){ 
    expect($element.isolateScope().data).toBeDefined();
  });

  it('scope data should be one way binded', function(){
    var isolatedScope = $element.isolateScope();
    isolatedScope.data = [];
    expect($scope.mappingData).not.toEqual([]);
  });


});