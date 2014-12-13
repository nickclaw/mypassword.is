angular.module('app').controller('HomeController', [
    '$scope',
    '$http',
    '$location',
    function($scope, $http, $location) {
        $scope.loadEntries(5);
    }
]);
