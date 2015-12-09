'use strict';

function packeryDirective() {
    let compile = (element, attributes) => {
        let flag = false,
            child = angular.element(document.querySelectorAll(`[${attributes.$attr.packery}] [data-packery-item], [${attributes.$attr.packery}] [packery-item]`));

        angular.forEach(child, obj => {
            obj = angular.element(obj);
            if (obj.attr('ng-repeat') !== undefined || obj.attr('data-ng-repeat') !== undefined) {
                flag = true;
                obj.attr('data-packery-after-render', '');
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
}

export { packeryDirective };