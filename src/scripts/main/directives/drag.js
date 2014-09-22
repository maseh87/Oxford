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