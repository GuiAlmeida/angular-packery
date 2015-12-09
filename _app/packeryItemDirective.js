'use strict';

function packeryItemDirective() {
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
}

export { packeryItemDirective };