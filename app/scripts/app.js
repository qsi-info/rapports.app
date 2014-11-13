'use strict';
/*global $:false */
/**
 * @ngdoc overview
 * @name client1App
 * @description
 * # client1App
 *
 * Main module of the application.
 */
angular
  .module('client1App', [
    'oauth',
    'ngCookies',
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true).hashPrefix('!'); 



    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function ($rootScope, $http, AccessToken) {

    $rootScope.API_SITE = $('oauth').attr('site');

    $rootScope.$on('oauth:login', function () {
      $http.defaults.headers.common.Authorization = 'Bearer ' + AccessToken.get().access_token;
      $http.get($rootScope.API_SITE + '/api/me').success(function (profile) {
        $rootScope.profile = profile;
      });
      $http.get($rootScope.API_SITE + '/api/info').success(function (client) {
        $rootScope.app = client;
      });
    });
    
    $rootScope.$on('oauth:logout', function() {
      if ('ActiveXObject' in window) {
        document.execCommand('ClearAuthenticationCache', false);
        $rootScope.profile = {};
        $rootScope.app = {};
      }

    });      

  });









