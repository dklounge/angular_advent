// From day 1 Angular
var app = angular.module('myApp', []);

// defining a factory()
app
.factory('User', function ($http) { // injectibles go here
  var backendUrl = "http://localhost:3000"
  var service = {
    // factory definition
    user: {},
    setName: function (newName) {
      service.user['name'] = newName;
    },
    setEmail: function (newEmail) {
      service.user['email'] = newEmail;
    },
    save: function () {
      return $http.post(backendUrl + '/users', {
        user: service.user
      });
    }
  };
  return service;
});

// defining a service()
app.service('User', function ($http) { // injectibles
  var self = this; // Save referenc
  this.user = {};
  this.backendUrl = "http://localhost:3000";
  this.setName = function (newName) {
    self.user['name'] = newName;
  },
  this.setEmail = function (newEmail) {
    self.user['email'] = newEmail;
  },
  this.save = function () {
    return $http.post(self.backendUrl + '/users', {
      user: self.user
    });
  }
});

// defining a provider()
app.provider('User', function () {
  this.backendUrl = 'http://localhost:3000';
  this.setBackendUrl = function (newUrl) {
    if (url) this.backendUrl = newUrl;
  }
  this.$get = function ($http) {
    var self = this;
    var service = {
      user: {},
      setName: function (newName) {
        service.user['name'] = newName;
      },
      setEmail: function (newEmail) {
        service.user['email'] = newEmail;
      },
      save: function () {
        return $http.post(self.backendUrl + '/users', {
          user: service.user
        });
      }
    };
    return service;
  }
});

// for provider()
app.config(function (UserProvider) {
  UserProvider.setBackendUrl = "http://example.com/api";
});

// common Controller
app.controller('MainCtrl', function ($scope, User) {
  $scope.saveUser = User.save;
});
