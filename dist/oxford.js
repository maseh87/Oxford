;(function(){
  'use strict';

  angular.module('oxford', [
    'oxford.directives'
  ]);
}());

;(function(){
  'use strict';

  angular.module('oxford.directives.card', [])

  .directive('oxCard', function() {
    var cardId = Math.random() * 10;
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      template: '<div class="card-material" draggable>' +
        '<div ng-transclude></div>' +
      '</div>',
      link: function(scope, element, attr) {
      }
    };
  });
}());
;(function(c3){
  'use strict';

  angular.module('oxford.directives.chart', [])

  .directive('oxChart', [function() {

    //color patterns for chart coloring
    var patterns = {
      light: ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896'],
      dark: ['#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7'],
      material: ['#e51c23', '#673ab7', '#5677fc', '#03a9f4', '#00bcd4', '#259b24', '#ffeb3b', '#ff9800']
    };

    //random number to attach to the chart id
    var chartIdCounter = Math.floor((Math.random()*1000)+1);

    return {
      restrict: 'EA',
      scope: {
        data: '=',
        options: '=',
        axis: '=',
        chart: '='
      },
      template: '<div draggable class="chart"></div>',
      replace: true,
      link: function(scope, element, attrs) {
        var chartId;
        var options = element.attr('options');

        //available option to show gridlines for chart
        if(attrs.grid === 'true') {
          scope.grid = {
            x: { show: true },
            y: { show: true}
          };
        }
        //option to view subchart
        if(attrs.subchart === 'true') {
          scope.subchart = {
            show: true
          };
        }
        //ability to change the color pattern
        if(attrs.pattern) {
          scope.color = {};
          scope.color.pattern = patterns[attrs.pattern];
        } else {
          scope.color = {};
          scope.color.pattern = patterns.dark ;
        }

        if(element.attr('id')) {
          chartId = element.attr('id');
        }
        else {
          chartId = 'c3-chart-' + chartIdCounter;
          element.attr('id', chartId);
          chartIdCounter += 1;
        }

        //generate c3 chart data
        var chartData = {
          bindto: '#' + element.attr('id'),
          data: scope[options],
          axis: scope.axis,
          grid: scope.grid,
          subchart: scope.subchart,
          zoom: scope.zoom,
          color: scope.color,
          x: scope.x,
          size: {
            height: 300,
            width: 950
          }
        };


        if(!options) {
          throw 'You must have an options attribute on your chart directive!';
        }

        //Reload the chart if the data changes
        scope.$watch('options', function(data, prevData) {
          if(chart) {
            chart.load(data);
            if(data.columns) {
              if(data.columns.length < prevData.columns.length) {
                chart.unload(['options' + prevData.columns.length]);
              }
            }
            if(data.rows) {
              if(data.rows.length < prevData.rows.length) {
                chart.unload(['options' + prevData.rows.length]);
              }
            }
          }
        });

        //run if there are changes to the chart
        var onChartChanged = function(chart) {
          if(chart) {
            scope.data.type = chart;
            chart.load(data);
          }
        };

        //watch the chart for any changes
        scope.$watch(function() {
          return attrs.chart;
        }, onChartChanged);

        //Generating the chart
        var chart = c3.generate(chartData);
        scope.$parent.chart = chart;
      }
    };
  }]);
}(c3));

;(function() {
  'use strict';

  angular.module('oxford.directives.dashboard', [

  ])
  .directive('oxDashboard', function() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<div class="dashboard">' +
      '<div ng-transclude></div>' +
      '</div>',
      controller: function($scope) {

      },
      link: function() {
      }
    };
  })
  .directive('oxDashboardNav', function() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      require: '^oxDashboard',
      template: '<div class="dashboard-nav">' +
        '<div ng-transclude></div>' +
      '</div>',
      link: function($scope, $element, $attr, navController) {
      }
    };
  })
  .directive('oxDashboardContent', function() {
    return {
      replace: true,
      require: '^oxDashboard',
      restrict: 'EA',
      template: '<div class="dashboard-content">' +
        '<div ui-view></div>' +
      '</div>',
      controller: function($scope, $element, $attr, navController) {

      }
    };
  });
}());
;(function(){
  'use strict';

  angular.module('oxford.directives.drag', [])

  .directive('draggable', function() {
    var gridWidth = 200;
    var gridHeight = 100;
    var startX, startY;
    var bounds = document.getElementsByClassName('dashboard-content');
    var chart = document.getElementsByClassName('chart');
    var row = document.getElementsByClassName('row');
    var cards = Draggable.create('.card-material');
    var currentElement;
    var that;
    function check() {
      if(this.hitTest(chart, '100') && this.target._gsDragID !== chart[0]._gsDragID) {
        // console.log(startX, ' y');
        console.log('Chart hit ', e);
        console.log('this ', row);
      }
      if(this.hitTest(row, '50')) {
        var mX = row.minX;
        var mY = row.minY;
        // TweenLite.to(row, 3, {minX: that.minX, minY: that.minY});
        this.minY = mY;
        this.minX = mX;
      }
    }

    return function(scope, element, attr) {

      if(attr.draggable !== 'false') {
        currentElement = Draggable.create(element, {
          bounds: bounds,
          type: 'x,y',
          edgeResistance: 0.90,
          throwProps: true,
          onPress: function() {
            startX = this.x;
            startY = this.y;
            that = this;
            console.log(angular.element(element));
            // console.log(row);
          },
          snap: {
            x: function(endValue) {
              return Math.round(endValue / gridWidth) * gridWidth;
            },
            y: function(endValue) {
              return Math.round(endValue / gridHeight) * gridHeight;
            }
          },
          onDrag: function(e) {
          },
          onDragEnd: function(e) {
            if(this.hitTest(chart, '100')) {
              TweenLite.to(e.target, 0.1, {x: 0, y: 0, ease: Power2.easeInOut});
              // console.log(this, ' tween');
              // TweenLite.to(element, 0.5, {x: startX, y: startY, ease: Power2.easeInOut});
            }
          }
        });
      }
    };
  });
}());
;(function(){
  'use strict';

  angular.module('oxford.directives', [
    'oxford.directives.chart',
    'oxford.directives.dashboard',
    'oxford.directives.toolbar',
    'oxford.directives.list',
    'oxford.directives.card',
    'oxford.directives.drag'
  ]);

}());

;(function() {
  'use strict';

  angular.module('oxford.directives.list', [

  ])
  .directive('oxList', function() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template: '<ul class="ox-list">' +
        '<div ng-transclude></div>' +
      '</ul>',
      link: function($scope, $element, $attr, navController) {
      }
    };
  })
  .directive('oxItem', function() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template: '<li class="ox-item">' +
        '<div ng-transclude></div>' +
      '</li>',
      link: function($scope, $element, $attr, navController) {

      }
    };
  });
}());
;(function() {
  'use strict';

  angular.module('oxford.directives.toolbar', [

  ])
  .directive('oxToolbar', function() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template: '<div class="ox-toolbar">' +
        '<div ng-transclude></div>' +
      '</div>',
      link: function($scope, $element, $attr, navController) {

      }
    };
  });
}());