var app = angular.module('myFireApp', []);

app.factory('PresenceService', ['$rootScope',
  function ($rootScope) {
    var onlineUsers = 0;

    // create our references
    var listRef = new Firebase('https://myfire.firebaseio.com/presence/');
    var userRef = listRef.push();
    var presenceRef = new Firebase('https://myfire.firebaseio.com/.info/connected');

    // add self to presence list when online
    presenceRef.on('value', function (snap) {
      if (snap.val()) {
        userRef.set(true);
        // remove self when disconnecting
        userRef.onDisconnect().remove();
      }
    });

    // get the user count and notify app
    listRef.on('value', function (snap) {
      onlineUsers = snap.numChildren();
      $rootScope.$broadcast('onOnlineUser');
    });

    var getOnlineUserCount = function () {
      return onlineUsers;
    }

    return {
      getOnlineUserCount: getOnlineUserCount
    }
}]);

app.controller('MainCtrl', ['$scope', 'PresenceService',
  function ($scope, PresenceService) {
    $scope.totalViewers = 0;

    $scope.$on('onOnlineUser', function() {
      $scope.$apply(function () {
        $scope.totalViewers = PresenceService.getOnlineUserCount();
      });
    });
  }
]);
