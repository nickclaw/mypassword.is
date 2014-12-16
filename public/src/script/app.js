angular.module('app', ['ngRoute'])
    .config([
        '$locationProvider',
        '$routeProvider',
        function($locationProvider, $routeProvider) {
            $locationProvider
                .html5Mode(true)
                .hashPrefix('!');

            $routeProvider
                .when('/', {
                    templateUrl: '/static/template/home.html',
                    controller: 'HomeController'
                })
                .when('/entry/:id', {
                    template: '<entry ng-if="entry" box direction="vertical" entry="entry"></entry>',
                    controller: 'EntryController'
                })
                .when('/submit', {
                    template: '<submitter box direction="vertical" redirect="true"></submitter>'
                })
                .when('/404', {
                    template: '/static/template/error.html',
                    controller: ['$scope', function($scope) {
                        $scope.code = 404;
                        $scope.message = "Uhoh. We couldn't find what you're looking for.";
                        $scope.loadEntries(3);
                    }]
                })
                .when('/500', {
                    template: '/static/template/error.html',
                    controller: ['$scope', function($scope) {
                        $scope.code = 500;
                        $scope.message = "Whoops. Our mistake.";
                        $scope.loadEntries(3);
                    }]
                })
                .otherwise({
                    controller: function($location) {
                        console.log('test');
                        $location.path('/404').replace();
                    }
                });
        }
    ])
;
