angular.module('angular-dimple.y', [])

.directive('y', [function () {
  return {
    restrict: 'E',
    replace: true,
    require: ['y', '^graph'],
    controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
    }],
    link: function($scope, $element, $attrs, $controllers) {
      var graphController = $controllers[1];
      console.log(graphController);
      var chart = graphController.getChart();

      function addAxis () {
        if ($attrs.type == 'Category') {
          y = chart.addCategoryAxis('y', $attrs.field);
        } else {
          y = chart.addMeasureAxis('y', $attrs.field);
        }

        if ($attrs.orderBy) {
          y.addOrderRule($attrs.orderBy);
        }

        if ($attrs.title && $attrs.title !== "null") {
          y.title = $attrs.title;
        } else if ($attrs.title == "null") {
          y.title = null;
        }
      }

      $scope.$watch('data', function(newValue, oldValue) {
        if (newValue) {
          addAxis();
        }
      });
    }
  };
}]);