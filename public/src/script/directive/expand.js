angular.module('app').directive('expand', function() {
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
});
