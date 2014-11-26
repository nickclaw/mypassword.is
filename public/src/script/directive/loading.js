angular.module('app').directive('loading', [
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
]);
