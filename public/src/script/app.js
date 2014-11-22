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
                    template: '<entry entry="entry"></entry>',
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
                return $http.get('/api', {
                    params: {
                        offset: $scope.entries.length,
                        limit: count
                    }
                }).success(function(data) {
                    $scope.entries.push.apply($scope.entries, data);
                    $scope.loading = false;
                });
            };
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
            $scope.password = "";
            $scope.reason = "";
        }
    ])
    .controller('EntryController', [
        '$scope',
        '$http',
        '$routeParams',
        function($scope, $http, $routeParams) {
            $scope.entry = {};
            $http.get('/api/' + $routeParams.id).then(function(data) {
                $scope.entry = data.data;
            });

            $scope.loadEntries(3);
        }
    ]);
