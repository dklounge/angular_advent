var app = angular.module('myApp', ['ngRoute']);

// inject ngRoute to app
app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/day/:id', {
      templateUrl: 'views/day.html',
      controller: 'DayCtrl'
    })
    .otherwise({ // defines the default route.
      redirectTo: '/'
    });
});

app.controller('MainCtrl', function ($scope) {});
app.controller('DayCtrl', function ($scope) {});
