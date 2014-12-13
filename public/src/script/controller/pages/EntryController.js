angular.module('app').controller('EntryController', [
    '$scope',
    '$http',
    '$routeParams',
    function($scope, $http, $routeParams) {
        $scope.entry = null;
        $http.get('/api/' + $routeParams.id).then(function(data) {
            $scope.entry = data.data;
            $scope.loadEntries(3, data.data._id);
        });
    }
]);
