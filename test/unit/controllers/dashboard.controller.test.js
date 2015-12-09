/*global angular */

'use strict';

describe('Unit: dashboardController', function () {

    var ctrl;

    beforeEach(function () {
        // instantiate the app module
        angular.mock.module('code');

        angular.mock.inject(function ($controller) {
            ctrl = $controller('dashboardController');
        });
    });

    it('should exist', function () {
        expect(ctrl).to.be.defined;
    });

    it('should contain packery method and 2 args', function () {
        var packeryStub = sinon.stub(ctrl, 'packery');

        console.log(packeryStub.returnArg(0));

        expect(packeryStub).not.to.be.null;
        expect(packeryStub.returnArg(0)).not.to.be.undefined;
    });

});