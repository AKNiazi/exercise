(function() {
  'use strict';

  angular
    .module('application')
    .config(ApplicationConfig);

  function ApplicationConfig($urlRouterProvider) {
    $urlRouterProvider.otherwise('home');
  }
})();
