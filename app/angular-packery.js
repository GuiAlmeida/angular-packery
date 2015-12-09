'use strict';

import { packeryController } from './packeryController';
import { packeryDirective } from './packeryDirective';
import { packeryItemDirective } from './packeryItemDirective';
import { packeryAfterRenderDirective } from './packeryAfterRenderDirective';

angular.module('ngPackery', [])
    .controller('packeryController', packeryController)
    .directive('packery', packeryDirective)
    .directive('packeryItem', packeryItemDirective)
    .directive('packeryAfterRender', packeryAfterRenderDirective);