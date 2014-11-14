'use strict';



var app = angular.module('client1App');


app.factory('Item', function ($rootScope, $resource) {
	return $resource($rootScope.API_SITE + '/item/:id', null, {
		'update': { method: 'PUT' },
	});
});