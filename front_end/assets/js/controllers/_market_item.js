!(function(angular, app) {
  app.controller('marketItem', ['$scope', '$state', 'DataSetsFactory','VendorsFactory', function($scope, $state, DataSetsFactory, VendorsFactory) {
    $scope.item = {};

    DataSetsFactory.getDataSet($state.params.id).then(function(d) {
      $scope.item = d;
      $scope.subscribed = !!(_.findWhere(d.users, {id: window.userID}));
    });

    VendorsFactory.then(function(v) {
      $scope.marketPlace.vendors = v;
    });

    $scope.unsubscribe = function() {
      R.one('users', window.userID)
       .one('subscriptions', $state.params.id).remove().then(function(d) {
        $scope.subscribed = false;
       });
    }

    $scope.subscribe = function() {
      R.one('users', window.userID)
       .one('subscriptions', $state.params.id).put().then(function(d) {
        $scope.subscribed = true;
       });
    }
  }]);
})(angular, window.bunsen);
