(function() {
  'use strict';

  angular
    .module('application.home.api', [])
    .factory('MapApi', MapApi);

  function MapApi($resource){
    return $resource('https://gbfs.citibikenyc.com/gbfs/en/:endpoint', {id: '@_id'}, 
    {
      getStationsInfomation: { method: 'GET', isArray: false, params: { endpoint: 'station_information.json'}},
      getStationsStatus: { method: 'GET', isArray: false, params: { endpoint: 'station_status.json'}}
    });
  }
})();
