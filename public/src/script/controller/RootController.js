angular.module('app').controller('RootController', [
    '$rootScope',
    '$http',
    '$timeout',
    'Sections',
    function($scope, $http, $timeout, Sections) {

        $scope.sections = Sections.sections;
        $scope.state = Sections.state;

        $scope.loadEntries = Sections.$load;

        $scope.$on('$routeChangeStart', function(next, current) {
            Sections.$clear();
            document.getElementById('container').scrollTop = 0;
        });
    }
]);
