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
<<<<<<< HEAD
  .directive('oxDashboardNav', function() {
=======
  .directive('oxDashboardContent', function() {
>>>>>>> 3a3bb6d2ecd3224944d701c9b73982608e03f5ca
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<div class="dashboard-content">' +
                '<ox-dashboard-view></ox-dashboard-view>' +
              '</div>',
      controller: function($scope) {

      },
      link: function() {
      }
    };
  })
  .directive('oxDashboardView', function() {
    return {
      replace: true,
      require: '^oxDashboard',
      restrict: 'EA',
      template: '<div class="dashboard-view">' +
        '<div ui-view></div>' +
      '</div>',
      controller: function($scope, $element, $attr, navController) {

      }
    };
  });
}());