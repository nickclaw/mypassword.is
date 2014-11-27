angular.module('app', [])
    .run([
        '$rootScope',
        '$http',
        function($scope, $http) {

            $scope.entry = null;

            $scope.loadNew = function() {
                $http.get('/admin/api/entry')
                    .success(function(data) {

                        $scope.entry = data;
                    });
            }

            $scope.save = function() {
                $scope.entry.added = Date.now();

                $http.post('/admin/api/entry/' + $scope.entry._id, $scope.entry)
                    .success(function() {
                        $scope.loadNew();
                    });
            }

            $scope.delete = function() {
                $http.delete('/admin/api/entry/' + $scope.entry._id)
                    .success(function() {
                        $scope.loadNew();
                    });
            }

            $scope.loadNew();
        }
    ]);
