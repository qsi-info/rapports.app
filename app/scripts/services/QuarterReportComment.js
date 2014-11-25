'use strict';



var app = angular.module('client1App');


app.factory('QuarterReportComment', function ($rootScope, $resource) {
	return $resource($rootScope.API_SITE + '/quarterreportcomment/:id', null, {
		'update': { method: 'PUT' },
	});
});