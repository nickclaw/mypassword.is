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
                    template: '<entry ng-if="entry" entry="entry"></entry>',
                    controller: 'EntryController'
                });
        }
    ])
    .run([
        '$rootScope',
        '$http',
        '$timeout',
        function($scope, $http, $timeout) {
            $scope.entries = [];
            $scope.loading = true;
            $scope.done = false;

            $scope.$on('$routeChangeStart', function(next, current) {
                $scope.entries = [];
                $scope.loading = true;
                $scope.done = false;

                document.getElementById('container').scrollTop = 0;
            });

            /**
             *
             *
             */
            $scope.loadEntries = function(count, after) {

                // get default values
                count = count || 5;
                if (!after) {
                    if ($scope.entries.length) {
                        after = $scope.entries[$scope.entries.length - 1]._id;
                    }
                }

                $scope.loading = true;
                return $http.get('/api', {
                    params: {
                        limit: count,
                        after: after
                    }
                }).success(function(data) {
                    $scope.done = data.length < count;
                    $scope.entries.push.apply($scope.entries, data);
                })
                .finally(function() {
                    $timeout(function() {
                        $scope.loading = false;
                    }, 200);
                })
            };
        }
    ])
    .controller('HomeController', [
        '$scope',
        '$http',
        '$location',
        function($scope, $http, $location) {
            $scope.loadEntries(3);
            $scope.model = {
                password: "",
                reason: ""
            };

            $scope.create = function() {
                $http.post('/api', $scope.model).then(function(result) {
                    $location.path('/entry/' + result.data._id).search({new: true});
                });
            };
        }
    ])
    .controller('EntryController', [
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
