'use strict';

/**
 * @ngdoc function
 * @name client1App.controller:MyReportController
 * @description
 * # MyReportController
 * Controller of the client1App
 */
var app = angular.module('client1App');


app.controller('MyReportController', function ($scope, $rootScope, QuarterReport) {

	function init () {
		console.log($rootScope.profile);
		QuarterReport.query({ createdBy: $rootScope.profile.account }, function (reports) {
			$scope.reports = reports;
		});
	}

	init();


});
