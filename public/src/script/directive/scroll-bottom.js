angular.module('app').directive('scrollbottom', function() {
    return {
        restrict: 'A',
        scope: {
            'scrollbottom': '&',
            'disabled': '&'
        },
        link: function($scope, elem, attr) {
            elem.on('scroll', function() {
                var innerHeight = this.scrollHeight,
                    outerHeight = this.offsetHeight,
                    offsetTop = this.scrollTop;

                console.log($scope.disabled());

                if (innerHeight - outerHeight - offsetTop >= 100) return;
                if ($scope.disabled()) return;

                $scope.scrollbottom();
            });
        }
    };
});
