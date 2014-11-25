'use strict';

/**
 * @ngdoc function
 * @name client1App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the client1App
 */
var app = angular.module('client1App');


app.controller('NewReportController', function ($scope, $location, QuarterReport) {

	function init () {
		$scope.report = new QuarterReport();
		QuarterReport.query(function (reports) {
			console.log(reports);
		});
	}

	init();

	$scope.setReportType = function (type) {
		$scope.report.type = type;
	};

	$scope.setReportPeriod = function (period) {
		$scope.report.period = period;
	};

	$scope.setReportGroup = function (group) {
		$scope.report.group = group;
	};

	$scope.createReport = function () {
		if (!$scope.report.type) {
			return window.alert('Veuillez choisir un type de rapport');
		}

		if (!$scope.report.period) {
			return window.alert('Veuillez choisir une periode');			
		}

		if (!$scope.report.group) {
			return window.alert('Veuillez choisir un groupe');			
		}

		$scope.report.$save(function (report) {
			$location.path('/report/' + report.id);
		});

	};



});
