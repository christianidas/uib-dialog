/**
* Controller of main app
*/

'use strict';

(function () {
	var module = angular.module("golfScorecard");

	module.controller('MainController', ['$scope', 'uibDialog', '$location', '$http', function ($scope, uibDialog, $location, $http) {
		$scope.config = {};
		$scope.adminRights = false;
		$scope.config.golfers = [];
		$scope.config.holes = [];
		$scope.config.currentHole = 0;
		window.scrollTo(0, 1);

		$scope.config.page = $location.path() !== '/' ? $location.path() : '/round';

		$http.get('/config').then(function(data){
			$scope.config = data.data || {};
			$scope.config.golfers = $scope.config.golfers || [];
			$scope.config.holes = $scope.config.holes || [];
			$scope.config.currentHole = $scope.config.currentHole || 0;
			$scope.config.page = $scope.config.page || '/round';
		});

		$scope.getCurrentScoreVsPar = function (golfer) {
			var score = 0;
			for (var i=0; i<golfer.scores.length; i++) {
				score += golfer.scores[i] && $scope.config.holes[i] ? golfer.scores[i] - $scope.config.holes[i].par : 0;
			}
			return score;
		};

		$scope.getCoursePar = function (holes) {
			var par = 0;
			for (var i=0; i<holes.length; i++) {
				par += holes[i] && holes[i].par ? Number(holes[i].par) : 0;
			}
			return par;
		};

		$scope.updateConfig = function () {
			$http.put('/config', $scope.config);
		};

		$scope.resetConfig = function () {
			uibDialog.confirm('Are you sure?').then(function(){
				var page = $scope.config.page;
				$scope.config = {};
				$scope.config.golfers = [];
				$scope.config.holes = [];
				$scope.config.currentHole = 0;
				$scope.config.page = page;
				$http.delete('/config');
			});
		};

		$scope.addHole = function () {
			uibDialog.prompt('Par:').then(function(par){
				var obj = {number: $scope.config.holes.length+1, par: par}
				$scope.config.holes.push(obj);
				$scope.updateConfig();
			});
		};

		$scope.removeHole = function (value) {
			uibDialog.confirm('Are you sure?').then(function(){
				var arr = $scope.config.holes;
				arr.splice(arr.indexOf(value), 1);
				$scope.updateConfig();
			});
		};

		$scope.newCourse = function () {
			uibDialog.confirm('Are you sure?').then(function(){
				$scope.config.holes = [];
				$scope.config.currentHole = 0;
				$scope.updateConfig();
			});
		};

		$scope.addGolfer = function () {
			uibDialog.prompt('Name:').then(function(name){
				var obj = {name: name, scores: []};
				$scope.config.golfers.push(obj);
				$scope.updateConfig();
			});
		};

		$scope.removeGolfer = function (value) {
			uibDialog.confirm('Are you sure?').then(function(){
				var arr = $scope.config.golfers;
				arr.splice(arr.indexOf(value), 1);
				$scope.updateConfig();
			});
		};

		$scope.newRound = function () {
			uibDialog.confirm('Are you sure?').then(function(){
				$scope.config.golfers = [];
				$scope.config.currentHole = 0;
				$scope.updateConfig();
			});
		};

		$('.nav a').on('click', function(){
			if ($('.navbar-toggle').attr('aria-expanded') === 'true') {
				$('.navbar-toggle').click() //bootstrap 3.x by Richard
			}
		});
	}]);
})();

(function(){
  var module = angular.module('golfScorecard.factories');

  module.directive('ngHold', function () {
        return function (scope, element, attrs) {
        	// click and hold event listener

			var timeout_id = 0,
				hold_time = 1000;

			element.mousedown(function(event) {
				timeout_id = setTimeout(action, hold_time);
			}).bind('mouseup mouseleave', function() {
				clearTimeout(timeout_id);
			});

            function action() {
				scope.$apply(function (){
					scope.$eval(attrs.ngHold);
				});
			}
        };
    });
})(); 
