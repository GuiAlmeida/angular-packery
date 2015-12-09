/*global angular */

'use strict';

describe('Unit: homeController', function () {

    var ctrl;

    beforeEach(function () {
        // instantiate the app module
        angular.mock.module('code');

        angular.mock.inject(function ($controller) {
            ctrl = $controller('homeController');
        });
    });

    it('should exist', function () {
        expect(ctrl).to.be.defined;
    });

    it('should contain \'content\' from content service', function () {
        expect(ctrl.content).to.not.be.null;
    });

});