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
                    password: "",
                    image: ""
                };
                $scope.saved = false;

                $scope.save = function() {
                    $http.post('/api/entry', $scope.entry)
                        .success(function(data) {

                            if ($scope.redirect) {
                                $location.path('/entry/' + data._id);
                            } else {
                                $scope.entry = data;
                                $scope.saved = true;
                            }
                        });
                }
            }
        }
    }
])
