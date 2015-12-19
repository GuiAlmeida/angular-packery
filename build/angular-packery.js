(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _packery = require('./modules/packery.directive');

var _packery2 = _interopRequireDefault(_packery);

var _packeryItem = require('./modules/packeryItem.directive');

var _packeryItem2 = _interopRequireDefault(_packeryItem);

var _packeryAfterRender = require('./modules/packeryAfterRender.directive');

var _packeryAfterRender2 = _interopRequireDefault(_packeryAfterRender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('ngPackery', []).directive('packery', _packery2.default).directive('packeryItem', _packeryItem2.default).directive('packeryAfterRender', _packeryAfterRender2.default);

},{"./modules/packery.directive":3,"./modules/packeryAfterRender.directive":4,"./modules/packeryItem.directive":5}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var packeryController = (function () {
  function packeryController() {
    _classCallCheck(this, packeryController);

    this.config = {};
    this.container = undefined;
  }

  _createClass(packeryController, [{
    key: 'ready',
    value: function ready() {
      return !!this.config;
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      if (this.container === undefined) {
        var defaultOpts = { itemSelector: 'packery-item' };
        var opts = !this.config.packeryOptions ? defaultOpts : $.extend(defaultOpts, this.config.packeryOptions);

        this.container = new Packery(this.config.packeryContainer[0], opts);
      }
    }
  }]);

  return packeryController;
})();

exports.default = packeryController;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _packery = require('./packery.controller');

var _packery2 = _interopRequireDefault(_packery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var packeryDirective = function packeryDirective() {
  return {
    scope: {},
    controller: _packery2.default,
    restrict: 'E',
    compile: function compile(element) {
      var flag = false;
      var $obj = $(element).find('packery-item[ng-repeat], packery-item[data-ng-repeat], packery-item [ng-repeat], packery-item [data-ng-repeat]');

      if ($obj.length >= 1) {
        flag = true;
        $obj.attr('data-packery-after-render', '');
      }

      return {
        pre: function pre(scope, elem, attr, ctrl) {
          ctrl.config.packeryContainer = elem;
          ctrl.config.packeryOptions = JSON.parse(attr.packeryOptions || '{}');
        },

        post: function post(scope, elem, attributes, ctrl) {
          if (!flag) {
            ctrl.initialize();
          }
        }
      };
    }
  };
};

exports.default = packeryDirective;

},{"./packery.controller":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var packeryAfterRenderDirective = function packeryAfterRenderDirective($timeout) {
  'ngInject';

  return {
    restrict: 'A',
    require: '^packery',
    priority: 0,
    link: function link(scope, element, attributes, controller) {
      if (scope.$last) {
        (function () {
          var timeout = null;
          timeout = $timeout(function () {
            controller.initialize();
            $timeout.cancel(timeout);
          });
        })();
      }
    }
  };
};
packeryAfterRenderDirective.$inject = ["$timeout"];

exports.default = packeryAfterRenderDirective;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var packeryItemDirective = function packeryItemDirective() {
  return {
    restrict: 'E',
    require: '^packery',
    priority: 1
  };
};

exports.default = packeryItemDirective;

},{}]},{},[1]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhbmd1bGFyLXBhY2tlcnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3BhY2tlcnkgPSByZXF1aXJlKCcuL21vZHVsZXMvcGFja2VyeS5kaXJlY3RpdmUnKTtcblxudmFyIF9wYWNrZXJ5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BhY2tlcnkpO1xuXG52YXIgX3BhY2tlcnlJdGVtID0gcmVxdWlyZSgnLi9tb2R1bGVzL3BhY2tlcnlJdGVtLmRpcmVjdGl2ZScpO1xuXG52YXIgX3BhY2tlcnlJdGVtMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BhY2tlcnlJdGVtKTtcblxudmFyIF9wYWNrZXJ5QWZ0ZXJSZW5kZXIgPSByZXF1aXJlKCcuL21vZHVsZXMvcGFja2VyeUFmdGVyUmVuZGVyLmRpcmVjdGl2ZScpO1xuXG52YXIgX3BhY2tlcnlBZnRlclJlbmRlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wYWNrZXJ5QWZ0ZXJSZW5kZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5hbmd1bGFyLm1vZHVsZSgnbmdQYWNrZXJ5JywgW10pLmRpcmVjdGl2ZSgncGFja2VyeScsIF9wYWNrZXJ5Mi5kZWZhdWx0KS5kaXJlY3RpdmUoJ3BhY2tlcnlJdGVtJywgX3BhY2tlcnlJdGVtMi5kZWZhdWx0KS5kaXJlY3RpdmUoJ3BhY2tlcnlBZnRlclJlbmRlcicsIF9wYWNrZXJ5QWZ0ZXJSZW5kZXIyLmRlZmF1bHQpO1xuXG59LHtcIi4vbW9kdWxlcy9wYWNrZXJ5LmRpcmVjdGl2ZVwiOjMsXCIuL21vZHVsZXMvcGFja2VyeUFmdGVyUmVuZGVyLmRpcmVjdGl2ZVwiOjQsXCIuL21vZHVsZXMvcGFja2VyeUl0ZW0uZGlyZWN0aXZlXCI6NX1dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBwYWNrZXJ5Q29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIHBhY2tlcnlDb250cm9sbGVyKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBwYWNrZXJ5Q29udHJvbGxlcik7XG5cbiAgICB0aGlzLmNvbmZpZyA9IHt9O1xuICAgIHRoaXMuY29udGFpbmVyID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKHBhY2tlcnlDb250cm9sbGVyLCBbe1xuICAgIGtleTogJ3JlYWR5JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVhZHkoKSB7XG4gICAgICByZXR1cm4gISF0aGlzLmNvbmZpZztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdpbml0aWFsaXplJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICAgIGlmICh0aGlzLmNvbnRhaW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBkZWZhdWx0T3B0cyA9IHsgaXRlbVNlbGVjdG9yOiAncGFja2VyeS1pdGVtJyB9O1xuICAgICAgICB2YXIgb3B0cyA9ICF0aGlzLmNvbmZpZy5wYWNrZXJ5T3B0aW9ucyA/IGRlZmF1bHRPcHRzIDogJC5leHRlbmQoZGVmYXVsdE9wdHMsIHRoaXMuY29uZmlnLnBhY2tlcnlPcHRpb25zKTtcblxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IG5ldyBQYWNrZXJ5KHRoaXMuY29uZmlnLnBhY2tlcnlDb250YWluZXJbMF0sIG9wdHMpO1xuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBwYWNrZXJ5Q29udHJvbGxlcjtcbn0pKCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHBhY2tlcnlDb250cm9sbGVyO1xuXG59LHt9XSwzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9wYWNrZXJ5ID0gcmVxdWlyZSgnLi9wYWNrZXJ5LmNvbnRyb2xsZXInKTtcblxudmFyIF9wYWNrZXJ5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BhY2tlcnkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgcGFja2VyeURpcmVjdGl2ZSA9IGZ1bmN0aW9uIHBhY2tlcnlEaXJlY3RpdmUoKSB7XG4gIHJldHVybiB7XG4gICAgc2NvcGU6IHt9LFxuICAgIGNvbnRyb2xsZXI6IF9wYWNrZXJ5Mi5kZWZhdWx0LFxuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgY29tcGlsZTogZnVuY3Rpb24gY29tcGlsZShlbGVtZW50KSB7XG4gICAgICB2YXIgZmxhZyA9IGZhbHNlO1xuICAgICAgdmFyICRvYmogPSAkKGVsZW1lbnQpLmZpbmQoJ3BhY2tlcnktaXRlbVtuZy1yZXBlYXRdLCBwYWNrZXJ5LWl0ZW1bZGF0YS1uZy1yZXBlYXRdLCBwYWNrZXJ5LWl0ZW0gW25nLXJlcGVhdF0sIHBhY2tlcnktaXRlbSBbZGF0YS1uZy1yZXBlYXRdJyk7XG5cbiAgICAgIGlmICgkb2JqLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgIGZsYWcgPSB0cnVlO1xuICAgICAgICAkb2JqLmF0dHIoJ2RhdGEtcGFja2VyeS1hZnRlci1yZW5kZXInLCAnJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHByZTogZnVuY3Rpb24gcHJlKHNjb3BlLCBlbGVtLCBhdHRyLCBjdHJsKSB7XG4gICAgICAgICAgY3RybC5jb25maWcucGFja2VyeUNvbnRhaW5lciA9IGVsZW07XG4gICAgICAgICAgY3RybC5jb25maWcucGFja2VyeU9wdGlvbnMgPSBKU09OLnBhcnNlKGF0dHIucGFja2VyeU9wdGlvbnMgfHwgJ3t9Jyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcG9zdDogZnVuY3Rpb24gcG9zdChzY29wZSwgZWxlbSwgYXR0cmlidXRlcywgY3RybCkge1xuICAgICAgICAgIGlmICghZmxhZykge1xuICAgICAgICAgICAgY3RybC5pbml0aWFsaXplKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHBhY2tlcnlEaXJlY3RpdmU7XG5cbn0se1wiLi9wYWNrZXJ5LmNvbnRyb2xsZXJcIjoyfV0sNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgcGFja2VyeUFmdGVyUmVuZGVyRGlyZWN0aXZlID0gZnVuY3Rpb24gcGFja2VyeUFmdGVyUmVuZGVyRGlyZWN0aXZlKCR0aW1lb3V0KSB7XG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIHJlcXVpcmU6ICdecGFja2VyeScsXG4gICAgcHJpb3JpdHk6IDAsXG4gICAgbGluazogZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbWVudCwgYXR0cmlidXRlcywgY29udHJvbGxlcikge1xuICAgICAgaWYgKHNjb3BlLiRsYXN0KSB7XG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgIHRpbWVvdXQgPSAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb250cm9sbGVyLmluaXRpYWxpemUoKTtcbiAgICAgICAgICAgICR0aW1lb3V0LmNhbmNlbCh0aW1lb3V0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59O1xucGFja2VyeUFmdGVyUmVuZGVyRGlyZWN0aXZlLiRpbmplY3QgPSBbXCIkdGltZW91dFwiXTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gcGFja2VyeUFmdGVyUmVuZGVyRGlyZWN0aXZlO1xuXG59LHt9XSw1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBwYWNrZXJ5SXRlbURpcmVjdGl2ZSA9IGZ1bmN0aW9uIHBhY2tlcnlJdGVtRGlyZWN0aXZlKCkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgcmVxdWlyZTogJ15wYWNrZXJ5JyxcbiAgICBwcmlvcml0eTogMVxuICB9O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gcGFja2VyeUl0ZW1EaXJlY3RpdmU7XG5cbn0se31dfSx7fSxbMV0pO1xuIl0sImZpbGUiOiJhbmd1bGFyLXBhY2tlcnkuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
