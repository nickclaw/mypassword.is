angular.module('app').directive('entry', function() {
    return {
        restrict: 'E',
        templateUrl: '/static/template/entry.html',
        replace: true,
        scope: {
            entry: '='
        },
        link: function($scope, elem, attr) {
            if ($scope.entry.view.background) {
                elem.attr('style', 'background-image: url(//s3-us-west-2.amazonaws.com/mypassword.is/pictures/' + $scope.entry.view.background + ')');
            } else {

            }
            elem.addClass($scope.entry.view.type);
            elem.addClass($scope.entry.view.classes.join(' '));
            elem.attr('id', $scope.entry._id);
        }
    }
});
