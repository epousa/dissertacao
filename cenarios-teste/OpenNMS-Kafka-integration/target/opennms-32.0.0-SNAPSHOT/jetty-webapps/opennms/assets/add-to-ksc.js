(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["add-to-ksc"],{

/***/ "./src/main/assets/js/apps/add-to-ksc/add-to-ksc.html":
/*!************************************************************!*\
  !*** ./src/main/assets/js/apps/add-to-ksc/add-to-ksc.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Module
var code = "<ng-form name=\"kscForm\">\n  <div class=\"modal-header\">\n    <h3 class=\"modal-title\">Add {{ graphTitle }} to KSC</h3>\n  </div>\n  <div class=\"modal-body\">\n    <div class=\"form-group\">\n      <label class=\"col-form-label\" for=\"resourceLabel\">Resource</label>\n      <input ng-disabled=\"true\" class=\"form-control\" type=\"text\" id=\"resourceLabel\" name=\"resourceLabel\" ng-model=\"resourceLabel\"\n             ng-class=\"{ 'is-invalid' : kscForm.graphTitle.$invalid }\">\n    </div>\n    <div class=\"form-group\">\n      <label class=\"col-form-label\" for=\"graphTitle\">Graph Title</label>\n      <input required class=\"form-control\" type=\"text\" id=\"graphTitle\" name=\"graphTitle\" ng-model=\"graphTitle\" placeholder=\"Graph Title\"\n             ng-class=\"{ 'is-invalid' : kscForm.graphTitle.$invalid }\">\n      <p class=\"invalid-feedback\">Graph title is required.</p>\n    </div>\n    <div class=\"form-group\">\n      <label class=\"col-form-label\" for=\"timespan\">Time Range</label>\n      <input required class=\"form-control\" type=\"text\" id=\"timespan\" name=\"timespan\" ng-model=\"timespan\"\n        placeholder=\"Choose the target time range here...\"\n        uib-typeahead=\"timespan as timespan for timespan in timespans | filter:$viewValue\"\n        typeahead-editable=\"false\"\n        typeahead-min-length=\"0\"\n        ng-class=\"{ 'is-invalid' : kscForm.timespan.$invalid }\">\n      <p class=\"invalid-feedback\">Time range is required.</p>\n    </div>\n    <div class=\"form-group\">\n      <label class=\"col-form-label\" for=\"kscReport\">Target KSC Report</label>\n      <input required class=\"form-control\" type=\"text\" id=\"kscReport\" name=\"kscReport\" ng-model=\"kscReport\" \n        placeholder=\"Choose the target KSC Report by typing the name here...\"\n        uib-typeahead=\"ksc as ksc.label for ksc in kscReports | filter:$viewValue\"\n        typeahead-editable=\"false\"\n        typeahead-min-length=\"0\"\n        ng-class=\"{ 'is-invalid' : kscForm.kscReport.$invalid }\">\n      <p class=\"invalid-feedback\">Target KSC Report is required.</p>\n    </div>\n  </div>\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\" ng-disabled=\"kscForm.$invalid\">Add <span class=\"fa fa-save\"></span></button>\n    <button class=\"btn btn-warning\" type=\"button\" ng-click=\"cancel()\">Cancel</button>\n  </div>\n</ng-form>\n";
// Exports
var _module_exports = code;;
var path = '/home/epousa/dev/opennms/core/web-assets/src/main/assets/js/apps/add-to-ksc/add-to-ksc.html';
window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, _module_exports) }]);
module.exports = path;

/***/ }),

/***/ "./src/main/assets/js/apps/add-to-ksc/index.js":
/*!*****************************************************!*\
  !*** ./src/main/assets/js/apps/add-to-ksc/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
* @author Alejandro Galue <agalue@opennms.org>
* @copyright 2016-2022 The OpenNMS Group, Inc.
*/



var _forEach = _interopRequireDefault(__webpack_require__(/*! ../../../../../../node_modules/@babel/runtime-corejs3/core-js-stable/instance/for-each */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/for-each.js"));
var _find = _interopRequireDefault(__webpack_require__(/*! ../../../../../../node_modules/@babel/runtime-corejs3/core-js-stable/instance/find */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/find.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var angular = __webpack_require__(/*! ../../vendor/angular-js */ "./src/main/assets/js/vendor/angular-js.js");
var templateUrl = __webpack_require__(/*! ./add-to-ksc.html */ "./src/main/assets/js/apps/add-to-ksc/add-to-ksc.html");
__webpack_require__(/*! ../../lib/onms-http */ "./src/main/assets/js/lib/onms-http/index.js");
__webpack_require__(/*! ../onms-default-apps */ "./src/main/assets/js/apps/onms-default-apps/index.js");
angular.module('onms-ksc', ['onms.http', 'onms.default.apps', 'ui.bootstrap', 'angular-growl']).config(['$locationProvider', function ($locationProvider) {
  $locationProvider.hashPrefix('');
}]).config(['growlProvider', function (growlProvider) {
  growlProvider.globalTimeToLive(5000);
  growlProvider.globalPosition('bottom-center');
}]).controller('AddToKscModalInstanceCtrl', ['$scope', '$http', '$uibModalInstance', 'resourceLabel', 'graphTitle', function ($scope, $http, $uibModalInstance, resourceLabel, graphTitle) {
  $scope.resourceLabel = resourceLabel;
  $scope.graphTitle = graphTitle;
  $scope.kscReports = [];
  $scope.timespan = '1_day';
  $scope.timespans = ['1_hour', '2_hour', '4_hour', '6_hour', '8_hour', '12_hour', '1_day', '2_day', '7_day', '1_month', '3_month', '6_month', '1_year', 'Today', 'Yesterday', 'Yesterday 9am-5pm', 'Yesterday 5pm-10pm', 'This Week', 'Last Week', 'This Month', 'Last Month', 'This Quarter', 'Last Quarter', 'This Year', 'Last Year'];
  $scope.ok = function () {
    $uibModalInstance.close({
      report: $scope.kscReport,
      title: $scope.graphTitle,
      timespan: $scope.timespan
    });
  };
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  $http.get('rest/ksc').then(function (response) {
    $scope.kscReports = response.data.kscReport;
  });
}]).controller('AddToKscCtrl', ['$scope', '$http', '$uibModal', 'growl', function ($scope, $http, $uibModal, growl) {
  $scope.open = function (resourceId, _resourceLabel, graphName, _graphTitle) {
    $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: templateUrl,
      controller: 'AddToKscModalInstanceCtrl',
      resolve: {
        resourceLabel: function resourceLabel() {
          return _resourceLabel;
        },
        graphTitle: function graphTitle() {
          return _graphTitle;
        }
      }
    }).result.then(function (data) {
      $scope.updateReport(data.report, resourceId, _resourceLabel, graphName, data.title, data.timespan);
    });
  };
  $scope.updateReport = function (report, resourceId, resourceLabel, graphName, graphTitle, timespan) {
    var url = 'rest/ksc/' + report.id;
    $http.get(url).then(function (response) {
      var data = response.data;
      var found = false;
      (0, _forEach.default)(angular).call(angular, data.kscGraph, function (r) {
        if (r.resourceId === resourceId && r.graphtype === graphName) {
          found = true;
        }
      });
      if (found) {
        growl.warning('The graph "' + graphTitle + '" for resource "' + resourceLabel + '" has been already added to "' + report.label + '"');
      } else {
        $http({
          url: url,
          method: 'PUT',
          params: {
            title: graphTitle,
            reportName: graphName,
            resourceId: resourceId,
            timespan: timespan
          }
        }).then(function () {
          growl.success('The graph "' + graphTitle + '" has been added to "' + report.label + '"');
        }, function (response) {
          growl.error(response.data);
        });
      }
    }).error(function (msg) {
      growl.error(msg);
    });
  };
}]).factory('flowsRestFactory', /* @ngInject */["$http", "$q", function ($http, $q) {
  var resources = {};
  resources.getFlowGraphUrl = function (nodeId, ifIndex, start, end) {
    var deferred = $q.defer();
    $http({
      url: 'rest/flows/flowGraphUrl',
      method: 'GET',
      params: {
        exporterNode: nodeId,
        ifIndex: ifIndex,
        start: start,
        end: end,
        limit: 0
      }
    }).then(function (response) {
      deferred.resolve(response.data);
    });
    return deferred.promise;
  };
  return resources;
}]).factory('graphSearchFactory', ["$rootScope", "$filter", function ($rootScope, $filter) {
  var graphSearch = {};
  graphSearch.graphs = [];
  graphSearch.noMatchingGraphs = false;
  // Update search query and broadcast an update to controllers.
  graphSearch.updateSearchQuery = function (searchItem) {
    this.searchQuery = searchItem;
    this.updateGraphsWithSearchItem();
  };
  graphSearch.initialize = function (graphName, graphTitle) {
    graphSearch.graphs.push(graphName);
    graphSearch.graphs.push(graphTitle);
  };
  graphSearch.updateGraphsWithSearchItem = function () {
    $rootScope.$broadcast('handleSearchQuery');
    // Check if there is atleast one matching graph else update correponding controller.
    var matchingGraphs = $filter('filter')(graphSearch.graphs, graphSearch.searchQuery);
    if (!(matchingGraphs && matchingGraphs.length)) {
      graphSearch.noMatchingGraphs = true;
      $rootScope.$broadcast('handleNoMatchingGraphsFound');
    } else if (graphSearch.noMatchingGraphs) {
      graphSearch.noMatchingGraphs = false;
      $rootScope.$broadcast('handleNoMatchingGraphsFound');
    }
  };
  return graphSearch;
}]).controller('graphSearchBoxCtrl', ['$scope', 'graphSearchFactory', function ($scope, graphSearchFactory) {
  // Update search query in service.
  $scope.$watch('searchQuery', function () {
    if (!angular.isUndefined($scope.searchQuery)) {
      graphSearchFactory.updateSearchQuery($scope.searchQuery);
    }
  });
}]).controller('checkFlowsCtrl', ['$scope', '$http', '$filter', 'flowsRestFactory', 'graphSearchFactory', function ($scope, $http, $filter, flowsRestFactory, graphSearchFactory) {
  $scope.flowCount = 0;
  $scope.flowsEnabled = false;
  $scope.hasFlows = false;
  $scope.nomatchingGraphs = false;
  $scope.flowGraphUrl = '';
  $scope.getFlowInfo = function (nodeId, ifIndex, start, end) {
    if (nodeId === 0 || ifIndex === 0) {
      return;
    }
    flowsRestFactory.getFlowGraphUrl(nodeId, ifIndex, start, end).then(function (data) {
      $scope.flowGraphUrl = data.flowGraphUrl;
      $scope.flowCount = data.flowCount;
      if ($scope.flowGraphUrl) {
        $scope.flowsEnabled = true;
        if ($scope.flowCount > 0) {
          $scope.hasFlows = true;
        } else {
          $scope.flowGraphUrl = null;
        }
      }
    });
  };
  // When graph search doesn't yield any results, set/reset noMatchingGraphs
  $scope.$on('handleNoMatchingGraphsFound', function () {
    $scope.nomatchingGraphs = graphSearchFactory.noMatchingGraphs;
  });
}]).controller('graphSearchCtrl', ['$scope', '$timeout', '$filter', '$attrs', '$element', 'graphSearchFactory', function ($scope, $timeout, $filter, $attrs, $element, graphSearchFactory) {
  var graphName = $attrs.graphname;
  var graphTitle = $attrs.graphtitle;
  // Update service with graphname and graphtitle.
  graphSearchFactory.initialize(graphName, graphTitle);
  $scope.enableGraph = true;
  // Handle search query update and enable graphs with matching search query.
  $scope.$on('handleSearchQuery', function () {
    var searchQuery = graphSearchFactory.searchQuery;
    // Filter on graphName or graphTitle.
    var matchingElements = $filter('filter')([graphName, graphTitle], searchQuery);
    if (matchingElements && matchingElements.length) {
      $scope.enableGraph = true;
      if (searchQuery) {
        // Send event for the specific div to check if they are in viewport.
        // Hack : Triggering event without adding it to timeout actually doesn't give rendering engine to finish re-arranging divs.
        // Sending with timeout(0) will prioritize rendering engine since it is already in event loop.
        $timeout(function () {
          var _context;
          (0, _find.default)(_context = angular.element($element)).call(_context, '.graph-container').trigger('renderGraph');
        }, 0);
      }
    } else {
      $scope.enableGraph = false;
    }
  });
}]);

/***/ }),

/***/ "./src/main/assets/js/apps/onms-central-search/index.js":
/*!**************************************************************!*\
  !*** ./src/main/assets/js/apps/onms-central-search/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ../../../../../../node_modules/core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
var _bind = _interopRequireDefault(__webpack_require__(/*! ../../../../../../node_modules/@babel/runtime-corejs3/core-js-stable/instance/bind */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/bind.js"));
var _forEach = _interopRequireDefault(__webpack_require__(/*! ../../../../../../node_modules/@babel/runtime-corejs3/core-js-stable/instance/for-each */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/for-each.js"));
var _indexOf = _interopRequireDefault(__webpack_require__(/*! ../../../../../../node_modules/@babel/runtime-corejs3/core-js-stable/instance/index-of */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/index-of.js"));
var _slice = _interopRequireDefault(__webpack_require__(/*! ../../../../../../node_modules/@babel/runtime-corejs3/core-js-stable/instance/slice */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/slice.js"));
var _splice = _interopRequireDefault(__webpack_require__(/*! ../../../../../../node_modules/@babel/runtime-corejs3/core-js-stable/instance/splice */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/splice.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var angular = __webpack_require__(/*! ../../vendor/angular-js */ "./src/main/assets/js/vendor/angular-js.js");
__webpack_require__(/*! ../../lib/onms-http */ "./src/main/assets/js/lib/onms-http/index.js");
__webpack_require__(/*! ../../../../../../node_modules/angular-bootstrap-toggle/dist/angular-bootstrap-toggle */ "./node_modules/angular-bootstrap-toggle/dist/angular-bootstrap-toggle.js");
__webpack_require__(/*! ../../../../../../node_modules/angular-bootstrap-toggle/dist/angular-bootstrap-toggle.css */ "./node_modules/angular-bootstrap-toggle/dist/angular-bootstrap-toggle.css");
__webpack_require__(/*! ../../../../../../node_modules/angular-ui-router/release/ui-router-angularjs */ "./node_modules/angular-ui-router/release/ui-router-angularjs.js");
var quickSearchTemplate = __webpack_require__(/*! ./quicksearch.html */ "./src/main/assets/js/apps/onms-central-search/quicksearch.html");
var globalErrorHandling = function globalErrorHandling(scope, errorResponse) {
  if (errorResponse.data) {
    scope.error = errorResponse.data;
  } else {
    scope.error = "An unexpected error occurred while handling the request";
  }
};
(function () {
  'use strict';

  var MODULE_NAME = 'onms.central.search';
  angular.module(MODULE_NAME, ['angular-loading-bar', 'ngResource', 'ui.router', 'onms.http']).config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
  }]).directive('onmsCentralSearch', function () {
    return {
      restrict: 'E',
      transclude: false,
      templateUrl: quickSearchTemplate,
      controller: 'QuickSearchController'
    };
  }).factory('SearchResource', ["$resource", function ($resource) {
    return $resource('api/v2/search', {}, {
      'query': {
        method: 'GET',
        isArray: true,
        cancellable: true
      }
    });
  }]).controller('QuickSearchController', ['$scope', 'SearchResource', '$timeout', '$document', function ($scope, SearchResource, $timeout, $document) {
    var KeyCodes = {
      ENTER: 13,
      SHIFT: 16,
      ESC: 27,
      KEY_LEFT: 37,
      KEY_UP: 38,
      KEY_RIGHT: 39,
      KEY_DOWN: 40
    };
    var Types = {
      Group: 'Group',
      Item: 'Item',
      More: 'More'
    };
    $scope.query = '';
    $scope.results = {};
    $scope.performSearchExecuted = false;
    $scope.showLoadingIndicator = false;
    $scope.showLoadingIndicatorDelay = 250;
    $scope.performSearchDelay = 500; // in ms
    $scope.performSearchPromise = undefined;
    $scope.performSearchHandle = undefined;
    $scope.showLoadingIndicatorPromise = undefined;
    $scope.shiftLastPressed = undefined;
    $scope.selectedIndex = 0;
    (0, _bind.default)($document).call($document, 'mousedown', function (event) {
      var isChild = $('#onms-search-form').has(event.target).length > 0;
      var isSelf = $('#onms-search-form').is(event.target);
      var isInside = isChild || isSelf;
      if (!isInside) {
        $timeout(function () {
          $scope.resetQuery();
          $scope.cancelRequest();
        });
      }
    });
    (0, _bind.default)($document).call($document, 'keyup', function (e) {
      // Search Focus Field
      $timeout(function () {
        if (e.keyCode === KeyCodes.SHIFT && new Date() - $scope.shiftLastPressed <= 350) {
          angular.element('#onms-search-query').focus();
          angular.element('#onms-search-query').select();
          $scope.shiftLastPressed = undefined;
        } else if (e.keyCode === KeyCodes.SHIFT) {
          $scope.shiftLastPressed = new Date();
        }

        // Reset Search
        if (e.keyCode === KeyCodes.ESC) {
          $scope.resetQuery();
          $scope.cancelRequest();
        }
      });
    });
    (0, _bind.default)($document).call($document, 'keydown', function (e) {
      $timeout(function () {
        if ($scope.results.length > 0) {
          var element = document.getElementById('onms-search-result-item-' + $scope.selectedIndex);
          if (e.keyCode === KeyCodes.KEY_UP || e.keyCode === KeyCodes.KEY_DOWN) {
            $scope.navigateSearchResult(e.keyCode);

            // Ideally we would use scrollToView(), but that will also scroll the body, which
            // results in the header scrolling down slightly, which looks weird when using the search
            // So instead scrolling is implemented manually
            var parentComponent = document.getElementById('onms-search-result');
            var parentHeight = parentComponent.clientHeight;
            var resultHeight = element.clientHeight;
            var resultOffset = element.offsetTop;
            var padding = 25;

            // Scroll down
            if (resultOffset + resultHeight + padding >= parentHeight + parentComponent.scrollTop) {
              parentComponent.scrollTop = resultOffset;
            }
            // Scroll up
            if (parentComponent.scrollTop !== 0 && parentComponent.scrollTop > resultOffset - resultHeight) {
              parentComponent.scrollTop = resultOffset - resultHeight;
            }
          }
          if (e.keyCode === KeyCodes.ENTER) {
            if ($scope.results[$scope.selectedIndex].type === Types.More) {
              // Ensure next action is run in angular context
              // Do not use angular.$apply here, as it may fail on angular sites,
              // such as the requisition ui
              $timeout(function () {
                angular.element(element).triggerHandler('click');
              }, 0);
            } else {
              $scope.resetQuery();
              $scope.cancelRequest();
              element.click();
            }
          }
        }
      });
    });
    $scope.navigateSearchResult = function (keyCode) {
      $scope.results[$scope.selectedIndex].selected = false;
      switch (keyCode) {
        case KeyCodes.KEY_UP:
          $scope.selectedIndex--;
          break;
        case KeyCodes.KEY_DOWN:
          $scope.selectedIndex++;
          break;
        default:
          break;
      }
      if ($scope.selectedIndex < 1) {
        $scope.selectedIndex = 1;
      }
      if ($scope.selectedIndex >= $scope.results.length) {
        $scope.selectedIndex = $scope.results.length - 1;
      }
      if ($scope.results[$scope.selectedIndex].type === Types.Group) {
        $scope.navigateSearchResult(keyCode); // Skip group element
      } else {
        $scope.results[$scope.selectedIndex].selected = true;
      }
    };
    $scope.resetQuery = function () {
      $scope.query = '';
      $scope.results = [];
      $scope.performSearchExecuted = false;
      if ($scope.performSearchHandle) {
        $scope.performSearchHandle.$cancelRequest();
      }
    };
    $scope.cancelRequest = function () {
      if ($scope.performSearchHandle) {
        $scope.performSearchHandle.$cancelRequest();
      }
      $scope.showLoadingIndicator = false;
      $timeout.cancel($scope.showLoadingIndicatorPromise);
    };

    // Ensure there is no difference between selected and mouseover
    $scope.select = function (index) {
      var selectIndex = index || 1;
      if ($scope.selectedIndex >= 1) {
        $scope.results[$scope.selectedIndex].selected = false;
      }
      $scope.selectedIndex = selectIndex;
      $scope.results[$scope.selectedIndex].selected = true;
    };
    $scope.onQueryChange = function () {
      if ($scope.query.length == 0) {
        $scope.resetQuery();
        return;
      }
      if ($scope.query.length < 3) {
        return;
      }

      // Stop any previous loading
      $timeout.cancel($scope.performSearchPromise);
      $scope.results = [];
      $scope.performSearchExecuted = false;

      // Start timeout before actually searching, this will allow for not invoking when the user
      // is still typing. Fiddle with $scope.loadingDelay to make it resolve faster
      $scope.performSearchPromise = $timeout(function () {
        // Stop any previously started delay
        $timeout.cancel($scope.showLoadingIndicatorPromise);

        // Kick of loading indicator
        $scope.showLoadingIndicatorPromise = $timeout(function () {
          $scope.showLoadingIndicator = true;
        }, $scope.showLoadingIndicatorDelay);

        // Cancel any previous request
        if ($scope.performSearchHandle) {
          $scope.performSearchHandle.$cancelRequest();
        }

        // Kick of the search
        $scope.error = undefined;
        $scope.performSearchHandle = SearchResource.query({
          '_s': $scope.query
        }, function (data) {
          $scope.cancelRequest();
          $scope.performSearchExecuted = true;
          var results = [];
          (0, _forEach.default)(data).call(data, function (eachResult) {
            var _context;
            // Create the header
            results.push({
              context: eachResult.context.name,
              // Make the label have an s at the end if it has multiple items
              label: eachResult.results.length > 1 ? eachResult.context.name + 's' : eachResult.context.name,
              type: Types.Group,
              count: eachResult.results.length,
              more: eachResult.more
            });
            (0, _forEach.default)(_context = eachResult.results).call(_context, function (item) {
              item.type = Types.Item;
              results.push(item);
            });
            if (eachResult.more === true) {
              var showMoreElement = {
                context: eachResult.context.name,
                count: eachResult.results.length,
                type: Types.More,
                loadMore: function loadMore() {
                  $scope.error = undefined;
                  SearchResource.query({
                    '_s': $scope.query,
                    '_l': this.count + 10,
                    '_c': this.context
                  }, function (response) {
                    var _context2, _context3;
                    var endIndex = (0, _indexOf.default)(_context2 = $scope.results).call(_context2, showMoreElement);

                    // The result is context focused, so there is only one search result anyways
                    var searchResult = response[0];
                    var results = (0, _slice.default)(_context3 = searchResult.results).call(_context3, endIndex - 1); // Remove first elements, as they are already being showed
                    (0, _forEach.default)(results).call(results, function (item, i) {
                      var _context4;
                      // Add item
                      item.type = Types.Item;
                      (0, _splice.default)(_context4 = $scope.results).call(_context4, endIndex + i, 0, item);
                      showMoreElement.count++;
                    });
                    // Toggle Selection
                    showMoreElement.selected = false;
                    $scope.results[$scope.selectedIndex].selected = true;

                    // Hide element
                    if (searchResult.more === false) {
                      var _context5, _context6;
                      (0, _splice.default)(_context5 = $scope.results).call(_context5, (0, _indexOf.default)(_context6 = $scope.results).call(_context6, showMoreElement), 1);
                    }
                  }, function (response) {
                    $scope.performSearchExecuted = true;
                    globalErrorHandling($scope, response);
                  });
                },
                selected: false
              };
              results.push(showMoreElement);
            }
          });
          $scope.results = results;
          if ($scope.results.length != 0) {
            $scope.selectedIndex = 1;
            $scope.results[$scope.selectedIndex].selected = true;
          }
        }, function (response) {
          if (response.status >= 0) {
            $scope.performSearchExecuted = true;
            globalErrorHandling($scope, response);
            $scope.cancelRequest();
          } else {
            // Request cancelled
          }
        });
      }, $scope.performSearchDelay);
    };
  }]);
})();

/***/ }),

/***/ "./src/main/assets/js/apps/onms-central-search/quicksearch.html":
/*!**********************************************************************!*\
  !*** ./src/main/assets/js/apps/onms-central-search/quicksearch.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Module
var code = "<span>\n\n<style type=\"text/css\">\n    .search-result {\n        max-height: 700px;\n        min-width: 280px;\n        max-width: 60%;\n        position: absolute;\n        top: 100%;\n        z-index: 100000;\n        overflow: auto;\n        border: #343a40 solid 1px;\n    }\n\n    .search-result .list-group-item {\n        padding: .25rem 0.75rem;\n        font-size: 90%;\n    }\n\n    .search-result .list-group-item:last-child {\n        border-bottom-right-radius: 0;\n        border-bottom-left-radius: 0;\n    }\n\n    .search-bar .form-control {\n        border: none;\n        outline: none;\n        box-shadow: none;\n        border-radius: 1rem;\n        padding: 0px;\n    }\n\n    .search-bar .input-group-text {\n        border-top-left-radius: 1rem;\n        border-bottom-left-radius: 1rem;\n        background-color: #fff;\n        border-color: #fff;\n    }\n\n    .search-result .list-group-item:hover {\n        background-color: #e9ecef;\n    }\n\n    .selected {\n        background-color: #e9ecef;\n    }\n</style>\n\n<form id=\"onms-search-form\" autocomplete=\"off\" novalidate class=\"form-inline\">\n    <!-- Disable auto complete -->\n    <input autocomplete=\"false\" name=\"hidden\" type=\"text\" style=\"display:none;\">\n\n    <!-- Search Input -->\n    <div class=\"input-group search-bar\">\n        <div class=\"input-group-prepend\">\n            <div class=\"input-group-text\"><i class=\"fa fa-search\"></i></div>\n        </div>\n        <label class=\"form-control\">\n            <input id=\"onms-search-query\" ng-change=\"onQueryChange()\" ng-focus=\"input.focus=true\" ng-blur=\"input.focus=false\" ng-model=\"query\" type=\"text\" class=\"form-control\" placeholder=\"Search...\" aria-label=\"Search\">\n            <small class=\"text-muted mr-4 quick-search-chevron\" ng-show=\"!input.focus\">\n                <span></span>\n                <span></span>\n            </small>\n        </label>\n        <!-- Loading Indicator -->\n        <div ng-if=\"showLoadingIndicator\" class=\"btn btn-secondary rounded-0\">\n            <div class=\"spinner-border spinner-border-sm text-white\" role=\"status\"></div>\n            <span class=\"sr-only\">Loading...</span>\n        </div>\n        <!-- Reset Search -->\n        <div ng-if=\"performSearchExecuted === true && !showLoadingIndicator\" class=\"input-group-append\">\n            <button class=\"btn btn-secondary\" type=\"button\" title=\"Reset Search\" ng-click=\"resetQuery()\"><i class=\"fa fa-times\"></i></button>\n        </div>\n        <!-- Cancel -->\n        <div ng-if=\"showLoadingIndicator\" class=\"input-group-append\">\n            <button class=\"btn btn-secondary\" type=\"button\" title=\"Cancel Request\" ng-click=\"cancelRequest()\"><i class=\"fa fa-times\"></i></button>\n        </div>\n    </div>\n\n    <!-- Results -->\n    <div ng-if=\"performSearchExecuted === true\" class=\"bg-dark search-result rounded-bottom\" id=\"onms-search-result\">\n        <div class=\"list-group\" ng-if=\"results.length > 0\">\n            <div id=\"onms-search-result-item-{{$index}}\" ng-repeat-start=\"item in results track by $index\" ng-if=\"item.type === 'Group'\" class=\"list-group-item bg-dark text-grey border-0 pl-2\">\n                <span ng-if=\"!item.t\">{{item.label}}</span>\n            </div>\n            <a id=\"onms-search-result-item-{{$index}}\" ng-class=\"{'selected': item.selected}\" ng-if=\"item.type === 'More'\" ng-click=\"item.loadMore()\" class=\"list-group-item list-group-item-action\" href ng-mouseover=\"select($index)\">more...</a>\n            <a id=\"onms-search-result-item-{{$index}}\" ng-class=\"{'selected': item.selected}\" ng-repeat-end ng-if=\"item.type === 'Item'\" href=\"{{item.url}}\" class=\"list-group-item list-group-item-action\" ng-mouseover=\"select($index)\" ng-click=\"resetQuery()\">\n                <h6 class=\"mb-0\"><i class=\"{{item.icon}}\" ng-if=\"item.icon\">&nbsp;</i>{{item.label}} <i style=\"-webkit-transform: scaleY(-1);transform: scaleY(-1);\" class=\"fa fa-reply pull-right\" ng-if=\"item.selected\"></i></h6>\n                <small class=\"mr-4\" ng-class=\"{'text-muted': !item.selected}\" ng-repeat=\"match in item.matches\">{{match.label}}: {{match.value}}</small>\n                <br ng-if=\"item.info !== ''\">\n                <small class=\"mr-4\" ng-class=\"{'text-muted': !item.selected}\" ng-if=\"item.info !== ''\">{{item.info}}</small>\n            </a>\n        </div>\n\n        <!-- No Result -->\n        <div ng-if=\"!error && results.length === 0\" class=\"text-grey\">\n            <span>No Results found</span>\n        </div>\n        <div ng-if=\"error\" class=\"alert alert-danger mx-2 my-2\">\n            <span>{{error}}</span>\n        </div>\n    </div>\n</form>\n\n</span>\n";
// Exports
var _module_exports = code;;
var path = '/home/epousa/dev/opennms/core/web-assets/src/main/assets/js/apps/onms-central-search/quicksearch.html';
window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, _module_exports) }]);
module.exports = path;

/***/ }),

/***/ "./src/main/assets/js/apps/onms-default-apps/index.js":
/*!************************************************************!*\
  !*** ./src/main/assets/js/apps/onms-default-apps/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(/*! ../../vendor/angular-js */ "./src/main/assets/js/vendor/angular-js.js");
var search = __webpack_require__(/*! ../search */ "./src/main/assets/js/apps/search/index.js");
var centralSearch = __webpack_require__(/*! ../onms-central-search */ "./src/main/assets/js/apps/onms-central-search/index.js");
var MODULE_NAME = 'onms.default.apps';
angular.module(MODULE_NAME, ['onms.central.search', 'onms-search']);

/***/ }),

/***/ "./src/main/assets/js/apps/search/index.js":
/*!*************************************************!*\
  !*** ./src/main/assets/js/apps/search/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
* @author Alejandro Galue <agalue@opennms.org>
* @copyright 2016-2022 The OpenNMS Group, Inc.
*/



var _util = _interopRequireDefault(__webpack_require__(/*! ../../../modules/lib/util */ "./src/main/assets/modules/lib/util/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var angular = __webpack_require__(/*! ../../vendor/angular-js */ "./src/main/assets/js/vendor/angular-js.js");
__webpack_require__(/*! ../../lib/onms-http */ "./src/main/assets/js/lib/onms-http/index.js");
var kscTemplate = __webpack_require__(/*! ./template.ksc.html */ "./src/main/assets/js/apps/search/template.ksc.html");
var nodesTemplate = __webpack_require__(/*! ./template.nodes.html */ "./src/main/assets/js/apps/search/template.nodes.html");
angular.module('onms-search', ['onms.http', 'ui.bootstrap']).config(['$locationProvider', function ($locationProvider) {
  $locationProvider.hashPrefix('');
}]).directive('onmsSearchNodes', function () {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: nodesTemplate,
    controller: 'NodeSearchCtrl'
  };
}).directive('onmsSearchKsc', function () {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: kscTemplate,
    controller: 'KscSearchCtrl'
  };
}).controller('NodeSearchCtrl', ['$scope', '$window', '$http', function ($scope, $window, $http) {
  $scope.getNodes = function (criteria) {
    return $http({
      url: 'rest/nodes',
      method: 'GET',
      params: {
        label: criteria,
        comparator: 'contains'
      }
    }).then(function (response) {
      return response.data.node;
    });
  };
  $scope.goToChooseResources = function (node) {
    $window.location.href = _util.default.getBaseHref() + 'graph/chooseresource.jsp?node=' + node.id;
  };
}]).controller('KscSearchCtrl', ['$scope', '$window', '$http', '$filter', function ($scope, $window, $http, $filter) {
  $scope.getKscReports = function (criteria) {
    return $http({
      url: 'rest/ksc',
      method: 'GET'
    }).then(function (response) {
      return $filter('filter')(response.data.kscReport, criteria);
    });
  };
  $scope.goToKscReport = function (ksc) {
    $window.location.href = _util.default.getBaseHref() + 'KSC/customView.htm?type=custom&report=' + ksc.id;
  };
}]);

/***/ }),

/***/ "./src/main/assets/js/apps/search/template.ksc.html":
/*!**********************************************************!*\
  !*** ./src/main/assets/js/apps/search/template.ksc.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Module
var code = "<div class=\"form-group\">\n  <div class=\"input-group\">\n    <input type=\"text\" class=\"form-control\" ng-model=\"asyncKsc\" placeholder=\"Type the KSC report name\"\n      uib-typeahead=\"ksc as ksc.label for ksc in getKscReports($viewValue)\"\n      typeahead-editable=\"false\"\n      typeahead-loading=\"kscLoadingNodes\"\n      typeahead-no-results=\"kscNoResults\"\n      typeahead-min-length=\"1\"\n      typeahead-on-select=\"goToKscReport($item)\">\n    <div class=\"input-group-append\">\n      <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\n    </div>\n  </div>\n  <i ng-show=\"kscLoadingNodes\" class=\"fa fa-refresh\"></i>\n  <p class=\"form-text text-muted\" ng-show=\"kscNoResults\">\n    <i class=\"fa fa-remove\"></i> No Results Found\n  </p>\n</div>\n";
// Exports
var _module_exports = code;;
var path = '/home/epousa/dev/opennms/core/web-assets/src/main/assets/js/apps/search/template.ksc.html';
window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, _module_exports) }]);
module.exports = path;

/***/ }),

/***/ "./src/main/assets/js/apps/search/template.nodes.html":
/*!************************************************************!*\
  !*** ./src/main/assets/js/apps/search/template.nodes.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Module
var code = "<div class=\"form-group\">\n  <div class=\"input-group\">\n    <input type=\"text\" class=\"form-control\" ng-model=\"asyncNode\" placeholder=\"Type the node label\"\n      uib-typeahead=\"node as node.label for node in getNodes($viewValue)\"\n      typeahead-editable=\"false\"\n      typeahead-loading=\"nodeLoadingNodes\"\n      typeahead-no-results=\"nodeNoResults\"\n      typeahead-min-length=\"1\"\n      typeahead-on-select=\"goToChooseResources($item)\">\n    <div class=\"input-group-append\">\n      <span class=\"input-group-text\"><i class=\"fa fa-search\"></i></span>\n    </div>\n  </div>\n  <i ng-show=\"nodeLoadingNodes\" class=\"fa fa-refresh\"></i>\n  <p class=\"form-text text-muted\" ng-show=\"nodeNoResults\">\n    <i class=\"fa fa-remove\"></i> No Results Found\n  </p>\n</div>\n";
// Exports
var _module_exports = code;;
var path = '/home/epousa/dev/opennms/core/web-assets/src/main/assets/js/apps/search/template.nodes.html';
window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, _module_exports) }]);
module.exports = path;

/***/ }),

/***/ "./src/main/assets/js/lib/onms-http/403-permission-denied.html":
/*!*********************************************************************!*\
  !*** ./src/main/assets/js/lib/onms-http/403-permission-denied.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Module
var code = "<span>\n<div class=\"modal-header\">\n    <h3><i class=\"fa fa-exclamation-triangle text-warning\"></i> Permission Denied</h3>\n</div>\n<div class=\"modal-body\">\n    <h5>\n        You are not allowed to perform the requested action.\n    </h5>\n    <p class=\"text-muted\">\n        This is not supposed to happen.\n        Please reload the page and contact your administrator if this occurs more often.\n    </p>\n</div>\n<div class=\"modal-footer\">\n    <button class=\"btn btn-primary\" ng-click=\"reload()\">Reload</button>\n</div>\n</span>";
// Exports
var _module_exports = code;;
var path = '/home/epousa/dev/opennms/core/web-assets/src/main/assets/js/lib/onms-http/403-permission-denied.html';
window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, _module_exports) }]);
module.exports = path;

/***/ }),

/***/ "./src/main/assets/js/lib/onms-http/index.js":
/*!***************************************************!*\
  !*** ./src/main/assets/js/lib/onms-http/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _startsWith = _interopRequireDefault(__webpack_require__(/*! ../../../../../../node_modules/@babel/runtime-corejs3/core-js-stable/instance/starts-with */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/starts-with.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var angular = __webpack_require__(/*! ../../vendor/angular-js */ "./src/main/assets/js/vendor/angular-js.js");
var permissionDeniedTemplate = __webpack_require__(/*! ./403-permission-denied.html */ "./src/main/assets/js/lib/onms-http/403-permission-denied.html");
angular.module('onms.http', ['ui.bootstrap']).factory('InterceptorService', ['$q', '$rootScope', function ($q, $rootScope) {
  return {
    responseError: function responseError(rejection) {
      if (rejection.status === 401) {
        var _context, _context2;
        if (rejection.config && rejection.config.url && ((0, _startsWith.default)(_context = rejection.config.url).call(_context, 'rest/') || (0, _startsWith.default)(_context2 = rejection.config.url).call(_context2, 'api/v2/'))) {
          console.error('Login Required', rejection, rejection.headers); // eslint-disable-line no-console
          $rootScope.$emit('loginRequired');
        }
      }
      if (rejection.status === 403) {
        $rootScope.$emit('permissionDenied');
      }
      return $q.reject(rejection);
    }
  };
}]).config(['$locationProvider', function ($locationProvider) {
  $locationProvider.hashPrefix('');
}]).config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  $httpProvider.interceptors.push('InterceptorService');
}]).run(['$rootScope', '$uibModal', function ($rootScope, $uibModal) {
  $rootScope.$on('loginRequired', function () {
    var baseTags = document.getElementsByTagName('base');
    if (baseTags && baseTags.length > 0 && baseTags[0].href) {
      document.headerLogoutForm.submit();
    } else {
      console.warn('Login is required, but cannot forward to login page due to missing base tag.'); // eslint-disable-line no-console
    }
  });

  $rootScope.$on('permissionDenied', function () {
    $uibModal.open({
      templateUrl: permissionDeniedTemplate,
      controller: ["$scope", "$uibModalInstance", function controller($scope, $uibModalInstance) {
        $scope.reload = function () {
          $uibModalInstance.dismiss();
          window.location.reload();
        };
      }],
      size: '',
      backdrop: 'static',
      keyboard: false
    });
  });
}]);
module.exports = angular;

/***/ }),

/***/ "./src/main/assets/js/vendor/angular-js.js":
/*!*************************************************!*\
  !*** ./src/main/assets/js/vendor/angular-js.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* Load jQuery first, so Angular finds it */
__webpack_require__(/*! ./jquery-js */ "./src/main/assets/js/vendor/jquery-js.js");

/* Angular Core */
var angular = __webpack_require__(/*! ../../../../../node_modules/angular */ "./node_modules/angular/index.js-exposed");
__webpack_require__(/*! ../../../../../node_modules/angular-animate */ "./node_modules/angular-animate/index.js");
__webpack_require__(/*! ../../../../../node_modules/angular-cookies */ "./node_modules/angular-cookies/index.js");
__webpack_require__(/*! ../../../../../node_modules/angular-route */ "./node_modules/angular-route/index.js");
__webpack_require__(/*! ../../../../../node_modules/angular-resource */ "./node_modules/angular-resource/index.js");
__webpack_require__(/*! ../../../../../node_modules/angular-sanitize */ "./node_modules/angular-sanitize/index.js");

/* 3rd-Party Modules */
__webpack_require__(/*! ../../../../../node_modules/angular-growl-v2/build/angular-growl.min */ "./node_modules/angular-growl-v2/build/angular-growl.min.js");
__webpack_require__(/*! ../../../../../node_modules/angular-loading-bar */ "./node_modules/angular-loading-bar/index.js");
__webpack_require__(/*! ../../../../../node_modules/angular-growl-v2/build/angular-growl.css */ "./node_modules/angular-growl-v2/build/angular-growl.css");
__webpack_require__(/*! ../../../../../node_modules/angular-loading-bar/build/loading-bar.css */ "./node_modules/angular-loading-bar/build/loading-bar.css");

/* Bootstrap UI */
__webpack_require__(/*! ./bootstrap-js */ "./src/main/assets/js/vendor/bootstrap-js.js");
__webpack_require__(/*! ../../../../../node_modules/angular-bootstrap-checkbox/angular-bootstrap-checkbox */ "./node_modules/angular-bootstrap-checkbox/angular-bootstrap-checkbox.js");
__webpack_require__(/*! ../../../../../node_modules/ui-bootstrap4 */ "./node_modules/ui-bootstrap4/index.js"); // angular-ui-boostrap for bootstrap 4

console.log('init: angular-js ' + angular.version.full); // eslint-disable-line no-console

module.exports = window['angular'] = angular;

/***/ }),

/***/ "./src/main/assets/js/vendor/bootstrap-js.js":
/*!***************************************************!*\
  !*** ./src/main/assets/js/vendor/bootstrap-js.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


console.log('init: bootstrap-js'); // eslint-disable-line no-console

var jQuery = __webpack_require__(/*! ./jquery-js */ "./src/main/assets/js/vendor/jquery-js.js");
__webpack_require__(/*! ./moment-js */ "./src/main/assets/js/vendor/moment-js.js");
__webpack_require__(/*! ../../../../../node_modules/bootstrap/dist/js/bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.js");
module.exports = jQuery;

/***/ }),

/***/ "./src/main/assets/js/vendor/jquery-js.js":
/*!************************************************!*\
  !*** ./src/main/assets/js/vendor/jquery-js.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


console.log('init: jquery-js'); // eslint-disable-line no-console

var jQuery = __webpack_require__(/*! ../../../../../node_modules/jquery/dist/jquery */ "./node_modules/jquery/dist/jquery.js-exposed");
__webpack_require__(/*! ../../../../../node_modules/jquery-migrate/dist/jquery-migrate */ "./node_modules/jquery-migrate/dist/jquery-migrate.js");
module.exports = jQuery;

/***/ }),

/***/ "./src/main/assets/js/vendor/moment-js.js":
/*!************************************************!*\
  !*** ./src/main/assets/js/vendor/moment-js.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


console.log('init: moment-js'); // eslint-disable-line no-console

var moment = __webpack_require__(/*! ../../../../../node_modules/moment/moment */ "./node_modules/moment/moment.js");
__webpack_require__(/*! ../../../../../node_modules/moment-timezone */ "./node_modules/moment-timezone/index.js");
__webpack_require__(/*! ../../../../../node_modules/@rangerrick/moment-javaformat/dist/node.min */ "./node_modules/@rangerrick/moment-javaformat/dist/node.min.js");
module.exports = moment;

/***/ }),

/***/ "./src/main/assets/modules/lib/util/index.js":
/*!***************************************************!*\
  !*** ./src/main/assets/modules/lib/util/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Object$defineProperty = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/define-property */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/define-property.js");
var _Symbol = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/symbol */ "./node_modules/@babel/runtime-corejs3/core-js-stable/symbol.js");
var _Symbol$iterator = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/symbol/iterator */ "./node_modules/@babel/runtime-corejs3/core-js-stable/symbol/iterator.js");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
__webpack_require__(/*! ../../../../../../node_modules/core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
var _toPrimitive2 = _interopRequireDefault(__webpack_require__(/*! ../../../../../../node_modules/@babel/runtime-corejs3/core-js-stable/symbol/to-primitive */ "./node_modules/@babel/runtime-corejs3/core-js-stable/symbol/to-primitive.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof _Symbol && "symbol" == typeof _Symbol$iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof _Symbol && obj.constructor === _Symbol && obj !== _Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); _Object$defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[_toPrimitive2.default]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Util = /*#__PURE__*/function () {
  function Util() {
    _classCallCheck(this, Util);
  }
  _createClass(Util, null, [{
    key: "getBaseHref",
    value: function getBaseHref() {
      var base = document.getElementsByTagName('base')[0];
      if (base) {
        return base.href;
      }
      return '';
    }
  }, {
    key: "setLocation",
    value: function setLocation(url) {
      if (window && window.location) {
        window.location.href = Util.getBaseHref() + url;
      }
    }
  }, {
    key: "toggle",
    value: function toggle(booleanValue, elementName) {
      var checkboxes = document.getElementsByName(elementName);
      for (var index in checkboxes) {
        if (checkboxes.hasOwnProperty(index)) {
          checkboxes[index].checked = booleanValue;
        }
      }
    }
  }]);
  return Util;
}();
exports.default = Util;

/***/ })

},[["./src/main/assets/js/apps/add-to-ksc/index.js","vendor"]]]);
});
//# sourceMappingURL=add-to-ksc.js.map