var app = angular.module('picApp', [])

app.provider('Flickr', function () {
  var base = 'http://api.flickr.com/services',
      api_key = '';

  // Set API key from the .config section of the app
  this.setApiKey = function (key) {
    api_key = key || api_key;
  }

  // Service interface
  this.$get = function ($q, $http) {
    var service = {
      getPublicFeed: function () {
        var d = $q.defer();
        return $http({
          method: "JSONP",
          url: base + '/feeds/photos_public.gne?format=json',
          params: {
            'api_key': api_key,
            'jsoncallback': 'JSON_CALLBACK'
          }
        }).success(function (data) {
          d.resolve(data);
        }).error(function (reason) {
          d.reject(reason);
        });
        return d.promise;
      }
    };
    return service;
  }
});

app.config(function (FlickrProvider) {
  FlickrProvider.setApiKey('xxxxxxxxx')
})

app.controller('FlickrApiCtrl', function ($scope, Flickr) {
  Flickr.getPublicFeed()
   .then(function (photos) {
    $scope.newPhoto = photos.items;
  });
})
