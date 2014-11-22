angular.module('app', ['ngRoute'])
    .config([
        '$locationProvider',
        '$routeProvider',
        function($locationProvider, $routeProvider) {
            $locationProvider
                .html5Mode(false)
                .hashPrefix('!');

            $routeProvider
                .when('/', {
                    templateUrl: '/static/template/home.html',
                    controller: 'HomeController'
                })
                .when('/entry/:id', {
                    templateUrl: '/static/template/entry.html',
                    controller: 'EntryController'
                });
        }
    ])
    .run([
        '$rootScope',
        '$http',
        function($scope, $http) {
            $scope.entries = [];
            $scope.$on('$routeChangeStart', function(next, current) {
                $scope.entries = [];
            });

            $scope.loadEntries = function(count) {
                $http.get('/api', {
                    params: {
                        offset: $scope.entries.length,
                        limit: count
                    }
                }).success(function(data) {
                    $scope.entries.push.apply($scope.entries, data);
                    $scope.loading = false;
                });
            }
        }
    ])
    .directive('entry', function() {
        return {
            restrict: 'E',
            templateUrl: '/static/template/entry.html',
            scope: {
                entry: '='
            },
            link: function($scope, elem, attr) {
                elem.addClass($scope.entry.view.type);
                elem.addClass($scope.entry.view.classes.join(' '));
            }
        }
    })
    .controller('HomeController', [
        '$scope',
        '$http',
        function($scope, $http) {
            $scope.loadEntries(10);
        }
    ])
    .controller('EntryController', [
        '$scope',
        '$http',
        function($scope, $http) {

        }
    ]);
