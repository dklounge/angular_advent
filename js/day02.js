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
  .when('/account', { // day 3 content - resolve to avoid flickering
    controller: 'AccountCtrl',
    templateUrl: 'views/account.html',
    resolve: {
      // We specify a promise to be resolved
      account: function($q) {
        var d = $q.defer();
        $timeout(function () {
          d.resolve({
            id: 1,
            name: 'david'
          })
        }, 1000);
        return d.promise;
      }
    }
  })
  .otherwise({ // defines the default route.
    redirectTo: '/'
  });
});

app.controller('MainCtrl', function ($scope, account) {
  $scope.account = account;
});
app.controller('DayCtrl', function ($scope) {});
