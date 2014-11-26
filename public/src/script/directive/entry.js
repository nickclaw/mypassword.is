angular.module('app').directive('entry', function() {
    return {
        restrict: 'E',
        templateUrl: '/static/template/entry.html',
        scope: {
            entry: '='
        },
        link: function($scope, elem, attr) {
            elem.addClass($scope.entry.view.type);
            elem.addClass($scope.entry.view.classes.join(' '));
            elem.attr('id', $scope.entry._id);
            console.log($scope.entry);
        }
    }
});
