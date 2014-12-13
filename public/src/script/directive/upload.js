angular.module('app').directive('upload', [
    '$http',
    function($http) {

        var emptyText = 'upload image';
        var uploadingText = 'uploading image...';

        return {
            restrict: 'E',
            templateUrl: '/static/template/upload.html',
            replace: true,
            scope: {
                ngModel: '=',
                ngReady: '=',
                ngError: '=',
                endpoint: '@'
            },

            link: function($scope, elem, attr) {
                $scope.text = emptyText;

                elem.find('click').on('click', function(evt) {
                    if (!$scope.ngReady) {
                        evt.preventDefault();
                    }
                })

                elem.find('input').on('change', function(evt) {

                    $scope.text = 'uploading...';
                    $scope.ngReady = false;
                    $scope.ngError = "";
                    $scope.ngModel = undefined;


                    if (!evt.target.files.length) {
                        $scope.text = emptyText;
                        $scope.ngReady = true;
                        return;
                    }

                    var fd = new FormData();
                    fd.append('file', evt.target.files[0]);

                    $http.post($scope.endpoint, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }).success(function(data) {
                        $scope.ngModel = data._id;
                    }).catch(function(err) {
                        $scope.ngError = err.data.message;
                    }).finally(function() {
                        $scope.text = evt.target.files[0].name;
                        $scope.ngReady = true;
                    });
                });
            }
        }
    }
]);
