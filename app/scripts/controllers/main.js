'use strict';

/**
 * @ngdoc function
 * @name client1App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the client1App
 */
var app = angular.module('client1App');


app.controller('MainCtrl', function (Item) {

	console.log(Item);

	// This function get all the items
	// var items = Item.query(function () {
	// 	console.log(items);
	// });

	// This function get one item by id
	// var item = Item.get({ id: 1}, function () {
	// 	console.log(item);
	// });

	// This function create and save a new item
	// var item = new Item();
	// item.title = 'test';
	// item.$save();

	// This function update an item
	// var item = Item.get({ id: 1}, function () {
	// 	item.title = 'updated title';
	// 	item.$update();
	// });

	// This function delete an item
	// var item = Item.get({ id: 1}, function () {
	// 	item.$delete({ id: item.id });
	// });





});
