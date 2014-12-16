angular.module('app').directive('submitter', [
    '$http',
    '$location',
    function($http, $location) {

        return {
            restrict: 'E',
            templateUrl: '/static/template/submitter.html',
            replace: true,
            scope: {
                redirect: '='
            },
            link: function($scope, elem, attr, controller) {
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
                            Sections.replace(1, data);
                        }
                    }).catch(function(err) {

                    })
                }

            }
        }
    }
])
