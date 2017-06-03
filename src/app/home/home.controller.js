(function() {
  angular.module('application.home')
  .controller('HomeController', HomeController);

  function HomeController(MapApi, $q, $interval) {
    var home = this;
    home.statusInformation = [];
    home.globalHistoricView = true;

    home.selected = {
      location: "",
      distance: ""
    };
    home.currentChart = {
      labels: [],
      data: []
    };
    home.historicChart = {
      labels: [],
      data: []
    };
    home.mapFormSubmitted = mapFormSubmitted;
    home.graphFormSubmitted = graphFormSubmitted;
    home.perpareHistoricUsage = perpareHistoricUsage;
    home.prepareCurrentUsageData = prepareCurrentUsageData;
    home.initializeData = initializeData;
    home.mergeData = mergeData;
    home.getStationsStatus = getStationsStatus;

    function mapFormSubmitted(form){
      home.query = angular.copy(home.selected);
    }

    function graphFormSubmitted(form){
      if(typeof home.selectedLocation === 'object'){
        home.globalHistoricView = false;
        home.perpareHistoricUsage();
      }
      else{
        home.globalHistoricView = true;
        home.perpareHistoricUsage();
      }
    }

    function getStationsStatus(){
      MapApi.getStationsStatus().$promise
      .then(function(response){
        home.statusInformation.push(response.data.stations);
        home.prepareCurrentUsageData();
        home.perpareHistoricUsage();
      });
    }

    function prepareCurrentUsageData(){
      var mappingData = home.statusInformation[home.statusInformation.length -1];
      home.currentChart.data = _.map(mappingData, function(value, index){
        return value.num_bikes_available;
      });
      home.currentChart.labels = _.map(mappingData, function(value, index){
        return value.station_id;
      });
    }

    function perpareHistoricUsage(){
      home.historicChart.labels = [];
      home.historicChart.data = [];
      if(home.globalHistoricView){
        _.each(home.statusInformation, function(status, index){
          home.historicChart.labels.push(index + "min");
          var sum = _.reduce(status, function(memory, num){ return memory + num.num_bikes_available; }, 0);
          home.historicChart.data.push(sum);
        });
      }
      else{
        _.each(home.statusInformation, function(status, index){
          home.historicChart.labels.push(index + "min");
          var object = _.find(status, function(item){ return item.station_id === home.selectedLocation.station_id; });
          home.historicChart.data.push(object.num_bikes_available);
        });
      }
    }

    function initializeData(){
      $q.all([
          MapApi.getStationsInfomation().$promise, 
          MapApi.getStationsStatus().$promise
      ])
      .then(function(values) {        
          stationsInfomation = values[0].data.stations;
          home.statusInformation.push();
          home.mappingData = mergeData(values[1].data.stations, stationsInfomation);
          home.statusInformation.push(values[1].data.stations);
          home.prepareCurrentUsageData();
          home.perpareHistoricUsage();
          
      });
    }

    function mergeData(statusList, stationsList){
      var map = [];
      _.each(stationsList, function(station, index){
        var status = _.find(statusList, function(status, ind){
          return status.station_id === station.station_id;
        });
        var object = _.extend({},station);
        map.push(_.extend(object,status));
      });
      return map;
    }

    $interval(home.getStationsStatus,1000 * 60);

    initializeData();

    
  }
})();
