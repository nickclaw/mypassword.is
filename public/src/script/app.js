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
                elem.attr('ng-class', 'entry.view.type')
                elem.attr('id', $scope.entry._id);
                console.log($scope.entry);
            }
        }
    })
    .directive('expand', function() {
        return {
            restrict: 'A',
            template: '<div class="expand-ruler"><ng-transclude></ng-transclude></div>',
            transclude: true,
            scope: {
                expand: '='
            },
            link: function($scope, elem, attr) {
                var ruler = elem.children()[0];

                $scope.$watch('expand', setHeight);
                setHeight();

                function setHeight() {
                    if ($scope.expand) {
                        elem[0].style.height = ruler.clientHeight + "px";
                        elem.addClass('expand-expanded');
                        elem.removeClass('expand-collapsed');
                    } else {
                        elem[0].style.height = "0px";
                        elem.removeClass('expand-expanded');
                        elem.addClass('expand-collapsed');
                    }
                }
            }
        }
    })
    .directive('loading', [
        '$interval',
        function($interval) {
            return {
                restrict: 'E',
                template: '<span class="blink">{{text}}</span>',
                link: function($scope, elem) {
                    var string = "loading more",
                        count = 0;

                    $interval(function() {
                        $scope.text = string.slice(0, count++ % string.length + 1);
                    }, 250);
                }
            }
        }
    ])
    .controller('HomeController', [
        '$scope',
        '$http',
        '$location',
        '$anchorScroll',
        '$timeout',
        function($scope, $http, $location, $anchorScroll, $timeout) {
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
            $scope.entry = {};
            $http.get('/api/' + $routeParams.id).then(function(data) {
                $scope.entry = data.data;
            });

            $scope.loadEntries(3);
        }
    ]);
