angular.module('app').directive('upload', [
    '$http',
    function($http) {

        return {
            restrict: 'E',
            template: '<label><span box>background image</span><input type="file" /></label>',
            replace: true,
            scope: {
                ngModel: '=',
                endpoint: '@'
            },

            link: function($scope, elem, attr) {
                elem.find('input').on('change', function(evt) {
                    if (!evt.target.files.length) {
                        return apply('ngModel', null);
                    }

                    var fd = new FormData();
                    fd.append('file', evt.target.files[0]);
                    
                    $http.post($scope.endpoint, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }).success(function(data) {
                        apply('ngModel', data._id);
                    }).catch(function(err) {
                        apply('ngModel', err);
                    });
                });

                function apply(key, val) {
                    $scope[key] = val;
                }
            }
        }
    }
]);
