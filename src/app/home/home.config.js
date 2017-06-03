(function() {
  'use strict';

  angular
    .module('application.home', [
      'ui.router',
      'ui.bootstrap',
      'chart.js',
      'application.home.api'
    ])
    .config(HomeConfig);

  function HomeConfig($stateProvider) {
    $stateProvider.state( 'home', {
      url: '/home',
      views: {
        "main": {
          controller: 'HomeController',
          controllerAs: 'home',
          templateUrl: 'home/home.tpl.html'
        }
      }
    });
  }
})();
