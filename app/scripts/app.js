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
    'ngRoute',
    // 'angular-loading-bar', 
    'cfp.loadingBar', // use instead for service usage @doc https://github.com/chieffancypants/angular-loading-bar
    'sticky'
  ])
  .config(function ($routeProvider) {



    // Routing
    $routeProvider

    // Essential for oauth2
    .when('/access_token=:accessToken', {
      template: '',
      controller: function ($location, AccessToken) {
        var hash = $location.path().substr(1);
        AccessToken.setTokenFromString(hash);
        $location.path('/');
        $location.replace();
      }
    })    

    //Home
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })

    .when('/report/new', {
      templateUrl: 'views/report.new.html',
      controller: 'NewReportController',
    })

    .when('/report/:id', {
      templateUrl: 'views/report.sections.html',
      controller: 'ReportController',
    })

    .when('/myreport', {
      templateUrl: 'views/myreport.html',
      controller: 'MyReportController',
    })

    // Otherwise
    .otherwise({
      redirectTo: '/'
    });

  })



  // This function setup authentification, the profile and the Bearer header.
  .run(function ($rootScope, $http, $cookieStore, AccessToken, cfpLoadingBar) {

    cfpLoadingBar.start();


    function loadjscssfile (filename, filetype) {
      var fileref;
      if (filetype === 'js'){ //if filename is a external JavaScript file
        fileref=document.createElement('script');
        fileref.setAttribute('type','text/javascript');
        fileref.setAttribute('src', filename + '.' + filetype);
      }
      else if (filetype === 'css') { //if filename is an external CSS file
        fileref=document.createElement('link');
        fileref.setAttribute('rel', 'stylesheet');
        fileref.setAttribute('type', 'text/css');
        fileref.setAttribute('href', filename + '.' + filetype);
      }
      if (typeof fileref !== 'undefined') {
        document.getElementsByTagName('head')[0].appendChild(fileref);
      }
    }


    $rootScope.API_SITE = $('oauth').attr('site');
    $cookieStore.put('API_SITE', $('oauth').attr('site'));

    if ($cookieStore.get('AccessToken')) {
      $http.defaults.headers.common.Authorization = 'Bearer ' + $cookieStore.get('AccessToken');
    }

    if ($cookieStore.get('app')) {
      $rootScope.app = $cookieStore.get('app');
    }

    if ($cookieStore.get('profile')) {
      $rootScope.profile = $cookieStore.get('profile');
    }

    if ($cookieStore.get('theme')) {
      loadjscssfile('themes/' + $cookieStore.get('theme'), 'css');
    }


    $rootScope.$on('oauth:login', function () {
      cfpLoadingBar.start();
      $cookieStore.put('AccessToken', AccessToken.get().access_token);
      $http.defaults.headers.common.Authorization = 'Bearer ' + AccessToken.get().access_token;
      $http.get($rootScope.API_SITE + '/api/me').success(function (profile) {
        $cookieStore.put('profile', profile);
        $rootScope.profile = profile;
        cfpLoadingBar.complete();
      });
      $http.get($rootScope.API_SITE + '/api/info').success(function (client) {
        $cookieStore.put('app', client);
        $cookieStore.put('theme', client.theme);
        $rootScope.app = client;
        loadjscssfile('themes/' + client.theme, 'css');
      });
    });
    

    $rootScope.$on('oauth:logout', function() {
      if ('ActiveXObject' in window) {
        document.execCommand('ClearAuthenticationCache', false);
      }
      $rootScope.profile = {};
      $rootScope.app = {};
      $cookieStore.remove('profile');
      $cookieStore.remove('app');
      $cookieStore.remove('API_SITE');
    });      




    cfpLoadingBar.complete();



  });










