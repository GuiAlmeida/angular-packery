(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

angular.module('ngPackery', []).controller('packeryController', function () {
    var _this = this;

    var ready = function ready() {
        return !!_this.config && !!_this.config.packeryContainer;
    };

    var initialize = function initialize() {
        var defaultOpts = { itemSelector: _this.config.packeryItem },
            opts = !_this.config.packeryOptions ? defaultOpts : angular.extend(defaultOpts, _this.config.packeryOptions);

        _this.container = new Packery(_this.config.packeryContainer, opts);
    };

    this.config = {};
    this.container = undefined;
    this.ready = ready;
    this.initialize = initialize;
}).directive('packery', function () {
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
}).directive('packeryItem', function () {
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
}).directive('packeryAfterRender', ["$timeout", function ($timeout) {
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
}]);

},{}]},{},[1]);
