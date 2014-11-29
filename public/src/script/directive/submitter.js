angular.module('app').directive('submitter', [
    '$http',
    '$location',
    function($http, $location) {

        return {
            restrict: 'E',
            templateUrl: '/static/template/submitter.html',
            scope: {
                redirect: '='
            },
            link: function($scope, elem, attr) {
                $scope.entry = {
                    reason: "",
                    password: ""
                };

                $scope.image = {
                    image: undefined,
                    error: "",
                    ready: true
                };

                $scope.saved = false;

                $scope.save = function() {
                    $http.post('/api/entry', {
                        password: $scope.entry.password,
                        reason: $scope.entry.reason,
                        image: $scope.image.image
                    }).success(function(data) {

                        if ($scope.redirect) {
                            $location.path('/entry/' + data._id);
                        } else {
                            $scope.entry = data;
                            $scope.saved = true;
                        }
                    }).catch(function(err) {
                        console.error(err);
                    })
                }

                $scope.$watch('entry.image', function() {
                    console.log(arguments);
                });
            }
        }
    }
])
