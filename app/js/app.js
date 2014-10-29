'use strict';

require('angular/angular');
require('angular-route');

var fileReader = function ($q, $log) {
  var onLoad = function(reader, deferred, scope) {
    return function () {
      scope.$apply(function () {
        deferred.resolve(reader.result);
      });
    };
  };

  var onError = function (reader, deferred, scope) {
    return function () {
      scope.$apply(function () {
        deferred.reject(reader.result);
      });
    };
  };

  var onProgress = function(reader, scope) {
    return function (event) {
      scope.$broadcast("fileProgress",
        {
          total: event.total,
          loaded: event.loaded
        });
    };
  };

  var getReader = function(deferred, scope) {
    var reader = new FileReader();
    reader.onload = onLoad(reader, deferred, scope);
    reader.onerror = onError(reader, deferred, scope);
    reader.onprogress = onProgress(reader, scope);
    return reader;
  };

  var readAsDataURL = function (file, scope) {
    var deferred = $q.defer();

    var reader = getReader(deferred, scope);
    reader.readAsDataURL(file);

    return deferred.promise;
  };

  return {
    readAsDataUrl: readAsDataURL
  };
};

var cbmApp = angular.module('cbmApp',['ngRoute']);

//filters


//controllers
require('./controllers/cbm-main-controller')(cbmApp);
require('./controllers/cbm-admin-controller')(cbmApp);

//services
require('./services/meals-server')(cbmApp);

//directives
require('./directives/admin-edit-meal-form')(cbmApp);
require('./directives/main-meal-details')(cbmApp);
require('./directives/main-meal-list')(cbmApp);

cbmApp.directive("ngFileSelect", function() {
  return {
    link: function ($scope, el) {

      el.bind("change", function (e) {
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFile();
      })
    }
  }
});

//routes
require('./routes/cbm-routes')(cbmApp);

cbmApp.factory("fileReader", ["$q", "$log", fileReader]);