'use strict';

function packeryAfterRenderDirective($timeout) {
    'ngInject'
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
}

export { packeryAfterRenderDirective };