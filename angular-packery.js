(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _packeryController = require('./packeryController');

var _packeryDirective = require('./packeryDirective');

var _packeryItemDirective = require('./packeryItemDirective');

var _packeryAfterRenderDirective = require('./packeryAfterRenderDirective');

angular.module('ngPackery', []).controller('packeryController', _packeryController.packeryController).directive('packery', _packeryDirective.packeryDirective).directive('packeryItem', _packeryItemDirective.packeryItemDirective).directive('packeryAfterRender', _packeryAfterRenderDirective.packeryAfterRenderDirective);

},{"./packeryAfterRenderDirective":2,"./packeryController":3,"./packeryDirective":4,"./packeryItemDirective":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function packeryAfterRenderDirective($timeout) {
    'ngInject';

    var link = function link(scope, element, attributes, controller) {
        if (scope.$last) {
            (function () {
                var timeout = null;
                timeout = $timeout(function () {
                    controller.initialize();
                    $timeout.cancel(timeout);
                });
            })();
        }
    };

    return {
        restrict: 'A',
        require: '^packery',
        priority: 0,
        link: link
    };
}
packeryAfterRenderDirective.$inject = ["$timeout"];

exports.packeryAfterRenderDirective = packeryAfterRenderDirective;

},{}],3:[function(require,module,exports){
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
            return !!this.config && !!this.config.packeryContainer;
        }
    }, {
        key: 'initialize',
        value: function initialize() {
            var defaultOpts = { itemSelector: this.config.packeryItem },
                opts = !this.config.packeryOptions ? defaultOpts : angular.extend(defaultOpts, this.config.packeryOptions);

            this.container = new Packery(this.config.packeryContainer, opts);
        }
    }]);

    return packeryController;
})();

exports.packeryController = packeryController;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function packeryDirective() {
    var compile = function compile(element, attributes) {
        var flag = false,
            child = angular.element(document.querySelectorAll('[' + attributes.$attr.packery + '] [data-packery-item], [' + attributes.$attr.packery + '] [packery-item]'));

        angular.forEach(child, function (obj) {
            obj = angular.element(obj);
            if (obj.attr('ng-repeat') !== undefined || obj.attr('data-ng-repeat') !== undefined) {
                flag = true;
                obj.attr('data-packery-after-render', '');
            }
        });

        return {
            pre: function pre(scope, element, attributes, controller) {
                controller.config.packeryContainer = '[' + attributes.$attr.packery + ']';
                controller.config.packeryOptions = JSON.parse(attributes.packeryOptions || '{}');
            },
            post: function post(scope, element, attributes, controller) {
                if (!flag) {
                    controller.initialize();
                }
            }
        };
    };

    return {
        restrict: 'A',
        controller: 'packeryController',
        compile: compile
    };
}

exports.packeryDirective = packeryDirective;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function packeryItemDirective() {
    var compile = function compile() {
        return {
            pre: function pre(scope, element, attributes, controller) {
                if (controller.config.packeryItem === undefined) {
                    controller.config.packeryItem = '[' + attributes.$attr.packeryItem + ']';
                }
            }
        };
    };

    return {
        restrict: 'A',
        require: '^packery',
        priority: 1,
        compile: compile
    };
}

exports.packeryItemDirective = packeryItemDirective;

},{}]},{},[1]);
