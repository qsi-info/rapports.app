'use strict';

/**
 * @ngdoc function
 * @name client1App.controller:MyReportController
 * @description
 * # MyReportController
 * Controller of the client1App
 */
var app = angular.module('client1App');


app.controller('MyReportController', function ($scope, $location, $rootScope, QuarterReport) {

	function init () {
		
		QuarterReport.query({ createdBy: $rootScope.profile.account }, function (reports) {
			$scope.reports = reports;
		});
	}

	init();


	$scope.go = function (path) {
		$location.path(path);
	};

});
