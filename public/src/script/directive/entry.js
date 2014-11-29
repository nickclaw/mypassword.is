angular.module('app').directive('entry', function() {
    return {
        restrict: 'E',
        templateUrl: '/static/template/entry.html',
        scope: {
            entry: '='
        },
        link: function($scope, elem, attr) {
            if (!$scope.entry.view.background) {
                elem.attr('style', 'background-image: url(/static/image/' + Math.floor(Math.random() * 17 + 1) + '.jpg)');
            } else {
                
            }
            elem.addClass($scope.entry.view.type);
            elem.addClass($scope.entry.view.classes.join(' '));
            elem.attr('id', $scope.entry._id);
        }
    }
});
