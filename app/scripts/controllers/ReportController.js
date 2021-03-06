'use strict';

/**
 * @ngdoc function
 * @name client1App.controller:ReportControl, comments: []ler
 * @description
 * # ReportController
 * Controller of the client1App
 */
var app = angular.module('client1App');


app.controller('ReportController', function ($scope, $routeParams, cfpLoadingBar, QuarterReport, QuarterReportComment) {

	function init () {
		cfpLoadingBar.start();
		QuarterReport.get({ id: $routeParams.id }, function (report) {
			$scope.report = report;
			QuarterReportComment.query({ report: report.id }, function (comments) {
				$scope.comments = comments;
				cfpLoadingBar.complete();
			});
		});
		$scope.sections = [
			{ id: 'securite',   name: 'Sécurité' },
			{ id: 'chaudieres', name: 'Chaudières et utilité' },
			{ id: 'hydrogene',  name: 'Hydrogène' },
			{ id: 'paraxylene', name: 'Paraxylène' },
			{ id: 'stdp',       name: 'STDP' },
			{ id: 'tours',      name: 'Tours d\'eau de redroidissement' },
			{ id: 'divers',     name: 'Divers' },
			{ id: 'personnel',  name: 'Personnel' }
		];

		$scope.input = {
			'securite' : '',
			'chaudieres' : '',
			'hydrogene' : '',
			'paraxylene' : '',
			'stdp' : '',
			'tours' : '',
			'divers': '',
			'personnel' : '',
		};

	}

	init();


	$scope.addComment = function (section) {
		if ($scope.input[section] === '') {
			return window.alert('Vous devez entrez du texte');
		}
		cfpLoadingBar.start();
		var comment = new QuarterReportComment();
		comment.text = $scope.input[section];
		comment.section = section;
		comment.report = $scope.report.id;
		comment.$save(function (savedComment) {
			$scope.comments.push(savedComment);
			$scope.input[section] = '';
			document.getElementById(section).focus();
			cfpLoadingBar.complete();
		});
	};


	$scope.deleteComment = function (comment) {
		if (window.confirm('Etes vous certain de vouloir supprimer cet élément?')) {
			cfpLoadingBar.start();
			QuarterReportComment.delete({ id: comment.id }, function () {
				$scope.comments.splice($scope.comments.indexOf(comment), 1);
				cfpLoadingBar.complete();
			});
		}
	};


	$scope.editComment = function (comment) {
		cfpLoadingBar.start();
		QuarterReportComment.delete({ id: comment.id }, function (deleteElem) {
			$scope.comments.splice($scope.comments.indexOf(comment), 1);
			$scope.input[deleteElem.section] = deleteElem.text;
			document.getElementById(deleteElem.section).focus();
			cfpLoadingBar.complete();
		});
	};


});









