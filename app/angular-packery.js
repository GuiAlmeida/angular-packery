'use strict';

angular.module('ngPackery', [])
    .controller('packeryController', function () {
        let ready = () => {
            return !!this.config && !!this.config.packeryContainer;
        };

        let initialize = () => {
            let defaultOpts = {itemSelector: this.config.packeryItem},
                opts = !this.config.packeryOptions ? defaultOpts : angular.extend(defaultOpts, this.config.packeryOptions);

            this.container = new Packery(this.config.packeryContainer, opts);
        };

        this.config = {};
        this.container = undefined;
        this.ready = ready;
        this.initialize = initialize;
    })
    .directive('packery', () => {
        let compile = (element, attributes) => {
            let flag = false,
                child = angular.element(document.querySelectorAll(`[${attributes.$attr.packery}] [data-packery-item], [${attributes.$attr.packery}] [packery-item]`));

            angular.forEach(child, obj => {
                obj = angular.element(obj);
                if (obj.attr('ng-repeat') !== undefined || obj.attr('data-ng-repeat') !== undefined) {
                    flag = true;
                    obj.attr('data-packery-after-render', '');
                } else if (angular.element(obj).find('[ng-repeat]').length >= 1 || angular.element(obj).find('[data-ng-repeat]').length >= 1) {
                    flag = true;
                    var objects = angular.element(obj).find('[ng-repeat]').length >= 1 ? angular.element(obj).find('[ng-repeat]') : angular.element(obj).find('[data-ng-repeat]');
                    objects.attr('data-packery-after-render', '');
                }
            });

            return {
                pre: (scope, element, attributes, controller) => {
                    controller.config.packeryContainer = `[${attributes.$attr.packery}]`;
                    controller.config.packeryOptions = JSON.parse(attributes.packeryOptions || '{}');
                },
                post: (scope, element, attributes, controller) => {
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
    })
    .directive('packeryItem', () => {
        let compile = () => {
            return {
                pre: (scope, element, attributes, controller) => {
                    if (controller.config.packeryItem === undefined) {
                        controller.config.packeryItem = `[${attributes.$attr.packeryItem}]`;
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
    })
    .directive('packeryAfterRender', ($timeout) => {
        'ngInject';
        let link = (scope, element, attributes, controller) => {
            if (scope.$last) {
                let timeout = null;
                timeout = $timeout(() => {
                    controller.initialize();
                    $timeout.cancel(timeout);
                });
            }
        };

        return {
            restrict: 'A',
            require: '^packery',
            priority: 0,
            link: link
        };
    });