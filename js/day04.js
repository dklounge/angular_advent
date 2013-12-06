var app = angular.module('adventApp',[]);

app.controller('DemoCtrl', function ($scope) {
  $scope.allColors = ['blue', 'red', 'green', 'gray'];
  $scope.selectedColor = 'blue';
  // $scope.shouldHighlight = 'shouldHighlight'; // not sure how to implement
  $scope.name = "david";
});
