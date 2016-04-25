/**
 * app.js is used to initialize Angular app
 */

'use strict';

(function(){
	var dependencies = ['ngAnimate', 'ui.bootstrap', 'uib.dialog'];
	
	angular.module('uibDialogDemo', dependencies);
})();

/**
* Controller of main app
*/

'use strict';

(function () {
	var module = angular.module("uibDialogDemo");

	module.controller('MainController', ['$scope', 'uibDialog', function ($scope, uibDialog) {
		// If you want to alert from the template directly.  Limited ability to use the promises.
		$scope.uibDialog = uibDialog;
		$scope.config = '{}';
		$scope.gConfig = '{}';

		var getConfig = function () {
			var config = {};
			try {
				config = JSON.parse($scope.config);
			} catch (e) {}
			return config;
		};

		$scope.setConfig = function (obj) {
			var config = {};
			try {
				config = JSON.parse(obj);
				/**
				* Overriding the default configurations for the uibDialog service throughout the app
				*  to match specs for the popups in the app.
				*/
				uibDialog.config(config);
				$scope.gConfig = '{}';
			} catch (e) {
				uibDialog.alert('Invalid Object.  Although ', {danger:true});
			}
		};

		$scope.alert = function (message) {
			uibDialog.alert(message, getConfig()).then(function (data) {
				uibDialog.alert('You pressed \'Ok.\'  The success function of the promise will be executed.');
			}, function (data) {
				uibDialog.alert('You dismissed.  The error function of the promise will be executed.');
			});
		};

		$scope.confirm = function (message) {
			uibDialog.confirm(message, getConfig()).then(function (data) {
				uibDialog.alert('You have confirmed!');
			}, function (data) {
				uibDialog.alert('You have denied.', {danger:true});
			});
		};

		$scope.autoCloseAlert = function (message) {
			uibDialog.autoCloseAlert(message, getConfig());
		};

		$scope.prompt = function (message) {
			uibDialog.prompt(message, getConfig()).then(function (data) {
				uibDialog.alert('Hello, ' + data.charAt(0).toUpperCase() + data.slice(1) + '!');
			}, function (data) {
				uibDialog.alert('Fine! I don\'t want to know anyway!', {danger:true});
			});
		};

		$scope.promptBox = function (message) {
			uibDialog.promptBox(message, getConfig()).then(function (data) {
				uibDialog.alert('You entered: ' + data);
			}, function (data) {
				uibDialog.alert('Fine! I don\'t want to talk anyway!', {danger:true});
			});
		};
	}]);
})();
