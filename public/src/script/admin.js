angular.module('app', [])
    .run([
        '$rootScope',
        '$http',
        function($scope, $http) {

            $scope.entry = null;

            $scope.loadNew = function() {
                $http.get('/admin/api/new')
                    .success(function(data) {

                        $scope.entry = data;
                    });
            }

            $scope.save = function() {
                $scope.entry.added = Date.now();

                $http.post('/admin/api/edit/' + entry._id, $scope.entry)
                    .success(function() {
                        $scope.loadNew();
                    });
            }

            $scope.loadNew();
        }
    ]);
