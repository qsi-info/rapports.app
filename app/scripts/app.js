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

    // Essential for oauth2
    $locationProvider.html5Mode(true).hashPrefix('!'); 




    // Routing
    $routeProvider

    // Home
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })

    // Otherwise
    .otherwise({
      redirectTo: '/'
    });




  })



  // This function setup authentification, the profile and the Bearer header.
  .run(function ($rootScope, $http, $cookieStore, AccessToken) {

    $rootScope.API_SITE = $('oauth').attr('site');
    $cookieStore.put('API_SITE', $('oauth').attr('site'));

    if ($cookieStore.get('app')) {
      $rootScope.app = $cookieStore.get('app');
    }

    if ($cookieStore.get('profile')) {
      $rootScope.profile = $cookieStore.get('profile');
    }


    $rootScope.$on('oauth:login', function () {
      $http.defaults.headers.common.Authorization = 'Bearer ' + AccessToken.get().access_token;
      $http.get($rootScope.API_SITE + '/api/me').success(function (profile) {
        $cookieStore.put('profile', profile);
        $rootScope.profile = profile;
      });
      $http.get($rootScope.API_SITE + '/api/info').success(function (client) {
        $cookieStore.put('app', client);
        $rootScope.app = client;
      });
    });
    
    $rootScope.$on('oauth:logout', function() {
      if ('ActiveXObject' in window) {
        document.execCommand('ClearAuthenticationCache', false);
        $rootScope.profile = {};
        $rootScope.app = {};
        $cookieStore.remove('profile');
        $cookieStore.remove('app');
        $cookieStore.remove('API_SITE');
      }

    });      

  });









