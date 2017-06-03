(function() {
  'use strict';

  angular
    .module('application', [
        'templates-app',
        'templates-common',
        'application.home',
        'application.home.api',
        'ui.router',
        'ngResource'
    ])
    .run(run)
    .factory('MapApi', MapApi);

  function run($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      // react on state change events
    });
  }
  function MapApi($resource){
    return $resource('https://gbfs.citibikenyc.com/gbfs/en/:endpoint', {id: '@_id'}, 
    {
      getStationsInfomation: { method: 'GET', isArray: false, params: { endpoint: 'station_information.json'}},
      getStationsStatus: { method: 'GET', isArray: false, params: { endpoint: 'station_status.json'}}
    });
  }
})();
