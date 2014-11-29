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
                    template: '<submitter box direction="vertical" redirect="true"></submitter>',
                    controller: 'SubmitController'
                })
                .otherwise({
                    template: '/static/template/404.html',
                    controller: ['$scope', function($scope) {
                        $scope.loadEntries(2);
                    }]
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

            var lastId = undefined,
                i = 1,
                j = 0;

            $scope.$on('$routeChangeStart', function(next, current) {
                $scope.entries = [];
                $scope.loading = true;
                $scope.done = false;

                lastId = undefined;
                i = 1;
                j = 0;

                document.getElementById('container').scrollTop = 0;
            });

            $scope.$on('$routeChange')

            /**
             *
             *
             */
            $scope.loadEntries = function(count, after) {

                // get default values
                count = count || 5;
                after = after || lastId;

                j++;
                $scope.loading = true;
                return $http.get('/api', {
                    params: {
                        limit: count,
                        after: after
                    }
                }).success(function(data) {
                    $scope.done = data.length < count;
                    $scope.entries.push.apply($scope.entries, data);
                    lastId = data.length ? data[data.length - 1]._id : undefined;

                    if (j >= i) {
                        i += j;
                        j = 0;
                        $scope.entries.push({});
                    }

                })
                .finally(function() {
                    $timeout(function() {
                        $scope.loading = false;
                    }, 1000);
                })
            };
        }
    ])
    .controller('HomeController', [
        '$scope',
        '$http',
        '$location',
        function($scope, $http, $location) {
            $scope.loadEntries(5);
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
    ])
    .controller('SubmitController', [
        '$scope',
        function($scope) {
        }
    ])
;
