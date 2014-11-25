'use strict';



var app = angular.module('client1App');


app.factory('QuarterReport', function ($rootScope, $resource) {
	return $resource($rootScope.API_SITE + '/quarterreport/:id', null, {
		'update': { method: 'PUT' },
	});
});