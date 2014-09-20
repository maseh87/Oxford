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
            // console.log(cards);
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
            if(this.hitTest(chart, '100') && this.target._gsDragID !== chart[0]._gsDragID) {
              // console.log(startX, ' y');
              console.log('Chart hit ', chart);
              console.log('this ', this);
              TweenLite.to(chart, 0.5, {x: startX, ease: Power2.easeInOut});
            }
            if(this.hitTest(row, '50')) {
              console.log('cards hit ', cards);
            }
          },
          onDragEnd: function() {
            if(this.hitTest(element)) {
              // console.log(this, ' tween');
              // TweenLite.to(element, 0.5, {x: startX, y: startY, ease: Power2.easeInOut});
            }
          }
        });
      }
    };
  });
}());