'use strict';

describe('Controller: AttemptsController', function () {

  // load the controller's module
  beforeEach(module('MeanApp'));

  var AtmptCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AtmptCtrl = $controller('AttemptsController', {
      $scope: scope
    });
  }));

  it('should do some things', function () {
    
    // expect(some things here)

  });
});
