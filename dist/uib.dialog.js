/**
 * uib.dialog
 * 
 * This file was created to implement an easy dialog box to mimic JS window messages
 *  utilizing ui-bootstrap, and angular.
 *
 */

'use strict';

(function () {
  var dependencies = [];
  var hasSanitize = false;

  try {
      angular.module('ngSanitize');
      dependencies.push('ngSanitize');
      hasSanitize = true;
  } catch(e){}

  var module = angular.module("uib.dialog", dependencies);

    /**
     * Service uibDialog is injected to provide the functions to display
     *  the messages on screen properly.  Each of the service functions calls one 
     *  of the above templates.  The user passes in the message to be displayed,
     *  and an optional boolean as true if the message should be displayed
     *  with the danger contextual class for errors, etc.
     *  
     *  Each service function, regardless of what kind of message, returns
     *   a promise, which succeeds or fails based on the modal's result attribute
     *   (success: 'OK' button
     *    fail:    'CANCEL button, 'X' button at top, click outside modal').
     *   
     *  Example usage:
     *
     *   uibDialog.confirm('Please click OK to confirm').then(function(data){
     *        console.log(data);
     *   });
     *
     */
    module.service('uibDialog', ['$modal', function($modal){

      var config ={};

      var template = '<div class="dialog uibDialog">'+
                        '<div class="modal-header uibDialogHeader" style="height: 45px;">'+
                            '<button type="button" class="close uibDialogClose" ng-click="cancel()" ng-show="config.close">&times;</button>'+
                        '</div>'+
                        '<div class="modal-body uibDialogBody">'+
                            '<p class="uibDialogMessage text-center" ng-class="{\'text-danger\' : config.danger}" ng-bind="message"></p>'+
                        '</div>'+
                        '<div class="modal-footer uibDialogFooter">'+
                            '<button class="btn btn-primary uibDialogOk" type="button" ng-click="ok()" ng-if="config.ok" ng-bind="config.ok"></button>'+
                            '<button class="btn btn-default uibDialogCancel" type="button" ng-click="cancel()" ng-if="config.cancel" ng-bind="config.cancel"></button>'+
                        '</div>'+
                    '</div>';

      var templateTextarea = '<form><div class="dialog uibDialog">'+
                        '<div class="modal-header uibDialogHeader" style="height: 45px;">'+
                            '<button type="button" class="close" ng-click="cancel()" ng-show="config.close">&times;</button>'+
                        '</div>'+
                        '<div class="modal-body uibDialogBody">'+
                            '<p class="uibDialogMessage text-center" ng-class="{\'text-danger\' : config.danger}" ng-bind="message"></p>'+
                            '<textarea class="form-control uibDialogInputTextarea" ng-model="output" autofocus></textarea>'+
                        '</div>'+
                        '<div class="modal-footer uibDialogFooter">'+
                            '<button class="btn btn-primary uibDialogOk" type="submit" ng-click="ok()" ng-if="config.ok" ng-bind="config.ok"></button>'+
                            '<button class="btn btn-default uibDialogCancel" type="button" ng-click="cancel()" ng-if="config.cancel" ng-bind="config.cancel"></button>'+
                        '</div>'+
                    '</div></form>';

      var templateInput = '<form><div class="dialog uibDialog">'+
                        '<div class="modal-header uibDialogHeader" style="height: 45px;">'+
                            '<button type="button" class="close" ng-click="cancel()" ng-show="config.close">&times;</button>'+
                        '</div>'+
                        '<div class="modal-body uibDialogBody">'+
                            '<p class="uibDialogMessage text-center" ng-class="{\'text-danger\' : config.danger}" ng-bind="message"></p>'+
                            '<input class="form-control uibDialogInputText" ng-model="output" autofocus />'+
                        '</div>'+
                        '<div class="modal-footer uibDialogFooter">'+
                            '<button class="btn btn-primary uibDialogOk" type="submit" ng-click="ok()" ng-if="config.ok" ng-bind="config.ok"></button>'+
                            '<button class="btn btn-default uibDialogCancel" type="button" ng-click="cancel()" ng-if="config.cancel" ng-bind="config.cancel"></button>'+
                        '</div>'+
                    '</div></form>';

    var setDefaultConfig = function(){
      config = {
          size: 'md',
          animation: true,
          backdrop: true,
          close: true,
          keyboard: true,
          ok: 'OK',
          cancel: 'Cancel',
          html: hasSanitize,
          alert: {
            cancel: false
          },
          autoCloseAlert: {
            ok: false,
            cancel: false,
            autoclose: 3000
          },
          confirm: {},
          prompt: {},
          promptBox: {}
      };
    };

                    
    this.config = function(key, value){
      if (!key) {
        setDefaultConfig();
      } else if (typeof key === 'object') {
        config = mergeObject(config, key);
        return config;
      } else if (typeof config[key] === 'object' && typeof value === 'object') {
        config[key] = mergeObject(config[key], value);
        return config[key];
      } else if (value) {
        config[key] = value;
        return config[key];
      } else {
        return config[key];
      }
    };

    this.removeConfig = function(key, childKey){
      if (!childKey) {
        delete config[key];
        return config;
      } else if (typeof config[key] === 'object' && config[key].hasOwnProperty(childKey)) {
        delete config[key][childKey];
        return config[key];
      } else {
        return config;
      }
    };

    this.alert = function(message, singleConfig){
      var tempConfig = mergeObject(config, config.alert);
      tempConfig = mergeObject(tempConfig, singleConfig);
      if (typeof singleConfig === 'boolean') { tempConfig.danger = singleConfig; }
      var modalInstance = $modal.open({
          animation: tempConfig.animation,
          template: tempConfig.html ? template.replace(/ng-bind/g, 'ng-bind-html') : template,
          controller: 'UibDialogController',
          size: tempConfig.size,
          backdrop: tempConfig.backdrop,
          keyboard: tempConfig.keyboard,
          resolve: {
              message: function(){
                return message;
              },
              config: function(){
                  return tempConfig;
              }
          }
      });
      return modalInstance.result;
    };
    this.autoCloseAlert = function(message, singleConfig){
      var tempConfig = mergeObject(config, config.autoCloseAlert);
      tempConfig = mergeObject(tempConfig, singleConfig);
      if (typeof singleConfig === 'boolean') { tempConfig.danger = singleConfig; }
      else if (typeof singleConfig === 'number') { tempConfig.autoclose = singleConfig; }
      var modalInstance = $modal.open({
          animation: tempConfig.animation,
          template: tempConfig.html ? template.replace(/ng-bind/g, 'ng-bind-html') : template,
          controller: 'UibDialogController',
          size: tempConfig.size,
          backdrop: tempConfig.backdrop,
          keyboard: tempConfig.keyboard,
          resolve: {
              message: function(){
                return message;
              },
              config: function(){
                return tempConfig;
              }
          }
      });
      return modalInstance.result;
    };
    this.confirm = function(message, singleConfig){
      var tempConfig = mergeObject(config, config.confirm);
      tempConfig = mergeObject(tempConfig, singleConfig);
      if (typeof singleConfig === 'boolean') { tempConfig.danger = singleConfig; }
      var modalInstance = $modal.open({
          animation: tempConfig.animation,
          template: tempConfig.html ? template.replace(/ng-bind/g, 'ng-bind-html') : template,
          controller: 'UibDialogController',
          size: tempConfig.size,
          backdrop: tempConfig.backdrop,
          keyboard: tempConfig.keyboard,
          resolve: {
              message: function(){
                return message;
              },
              config: function(){
                return tempConfig;
              }
          }
      });
      return modalInstance.result;
    };
    this.prompt = function(message, singleConfig){
      var tempConfig = mergeObject(config, config.prompt);
      tempConfig = mergeObject(tempConfig, singleConfig);
      if (typeof singleConfig === 'boolean') { tempConfig.danger = singleConfig; }
      var modalInstance = $modal.open({
          animation: tempConfig.animation,
          template: tempConfig.html ? templateInput.replace(/ng-bind/g, 'ng-bind-html') : templateInput,
          controller: 'UibDialogController',
          size: tempConfig.size,
          backdrop: tempConfig.backdrop,
          keyboard: tempConfig.keyboard,
          resolve: {
              message: function(){
                return message;
              },
              config: function(){
                return tempConfig;
              }
          }
      });
      return modalInstance.result;
    };
    this.promptBox = function(message, singleConfig){
      var tempConfig = mergeObject(config, config.promptBox);
      tempConfig = mergeObject(tempConfig, singleConfig);
      if (typeof singleConfig === 'boolean') { tempConfig.danger = singleConfig; }
      var modalInstance = $modal.open({
          animation: tempConfig.animation,
          template: tempConfig.html ? templateTextarea.replace(/ng-bind/g, 'ng-bind-html') : templateTextarea,
          controller: 'UibDialogController',
          size: tempConfig.size,
          backdrop: tempConfig.backdrop,
          keyboard: tempConfig.keyboard,
          resolve: {
              message: function(){
                return message;
              },
              config: function(){
                return tempConfig;
              }
          }
      });
      return modalInstance.result;
    };

    function mergeObject(mainObj, mergeObj){
      if (typeof mainObj !== 'object' || typeof mergeObj !== 'object') {
        return mainObj;
      }
      mainObj = angular.copy(mainObj);
      mergeObj = angular.copy(mergeObj);
      for (var _attrname in mergeObj) {
          if (typeof mainObj[_attrname] === 'object' && typeof mergeObj[_attrname] === 'object') {
            mainObj[_attrname] = mergeObject(mainObj[_attrname], mergeObj[_attrname]);
          } else {
            mainObj[_attrname] = mergeObj[_attrname];
          }
      }
      return mainObj;
    }
    
    setDefaultConfig();
    
  }]);


  /**
   * Controller uibDialog is injected to provide the functions to display
   *  the messages on screen properly
   *
   */
  module.controller('UibDialogController', ['$scope', '$modalInstance', 'message', 'config', function ($scope, $modalInstance, message, config) {
    $scope.message = message;
    $scope.config = config;


    if(config.autoclose){
      setTimeout(function(){
        $modalInstance.close('auto close');
        $scope.$apply();
      }, config.autoclose);
    }

    $scope.ok = function () {
      $modalInstance.close($scope.output || '');
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }]);
})();