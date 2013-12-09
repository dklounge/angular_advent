// initialize angular app
var app = angular.module('myApp', []);

// controller binds categories to scope
app.controller('StepOneCtrl', ['$scope', function ($scope) {
  // example categories
  $scope.categories = [
    {name: 'one', display: 'Category One'},
    {name: 'two', display: 'Category Two'},
    {name: 'three', display: 'Category Three'},
    {name: 'four', display: 'Category Four'}
  ];

  $scope.currentCategory = null;

  $scope.setCurrentCategory = function (category) {
    $scope.currentCategory = category;
  };

  // Dynamically apply a class based upon the result of an expression.

  $scope.isCurrentCategory = function (category) {
    return $scope.currentCategory === category;
  };
}]);
