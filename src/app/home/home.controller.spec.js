describe( 'HomeController', function() {

  var controller, rootScope, httpBackend;

  beforeEach(module('application.home'));
  beforeEach( module( 'application' ) );



  beforeEach(inject(function(_$rootScope_, $controller, _$httpBackend_, _MapApi_) {

    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    MapApi = _MapApi_;
    controller = $controller('HomeController', { $scope: $rootScope });

    controller.statusInformation = [{
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
  }));

  describe('mapFormSubmitted method', function(){
    it('should init query variable', function(){
      expect(controller.query).toBeUndefined();
      controller.mapFormSubmitted();
      expect(controller.query).toBeDefined();
      expect(controller.query).toEqual(jasmine.objectContaining({location: ""}));
      expect(controller.query).toEqual(jasmine.objectContaining({distance: ""}));
    });

  });

  describe('graphFormSubmitted method', function(){
      
    it('should make globalHistoricView false when selectedLocation is defined', function(){
      controller.selectedLocation = {
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
      };
      spyOn(controller, 'perpareHistoricUsage');
      controller.graphFormSubmitted();

      expect(controller.globalHistoricView).toEqual(false);
      expect(controller.perpareHistoricUsage).toHaveBeenCalled();
    });

    it('should make globalHistoricView true if selectedLocation is undefined', function(){
      controller.selectedLocation = undefined;
      spyOn(controller, 'perpareHistoricUsage');
      controller.graphFormSubmitted();

      expect(controller.globalHistoricView).toEqual(true);
      expect(controller.perpareHistoricUsage).toHaveBeenCalled();
    });

  });

  describe('getStationsStatus method', function(){

    beforeEach(function(){
      httpResponse = {
        data: {
          stations: [
            {
              "capacity": 33,
              "eightd_has_available_keys": false,
              "eightd_has_key_dispenser": false,
              "is_installed": 1,
              "is_renting": 1,
              "is_returning": 1,
              "last_reported": 1496456107,
              "lat": 40.71911552,
              "lon": -74.00666661,
              "station_id": "79",
              "name": "Franklin St & W Broadway",
              "num_bikes_available": 5
            }
          ]
        }
      };
      apiLink = 'https://gbfs.citibikenyc.com/gbfs/en/station_status.json';
    });
    // it('should push data to status information array', function(){
    //   $httpBackend.whenGET(apiLink).respond(httpResponse);
    //   //$httpBackend.flush();
    //   var length = controller.statusInformation.length;
    //   controller.getStationsStatus();
    //   console.log(length);
    //   console.log(controller.statusInformation.length);
    //   expect(controller.statusInformation.length).toEqual(length + 1);
    // });

  });

  describe('prepareCurrentUsageData method', function(){

    it('should populate correct data', function(){
      controller.prepareCurrentUsageData();
      expect(controller.currentChart.data.length).toBeGreaterThan(0);
      expect(controller.currentChart.labels.length).toBeGreaterThan(0);
    });

  });


});
