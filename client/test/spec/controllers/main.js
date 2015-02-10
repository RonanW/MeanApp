'use strict';

describe('Controller: MainController', function () {

  // load the controller's module
  beforeEach(module('MeanApp'));

  var MainCtrl,
    $location,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$location_) {
    $location = _$location_;
    scope = $rootScope.$new();
    MainCtrl = $controller('MainController', {
      $scope: scope
    });
  }));

  it('should login as manager user', function () {

    scope.credentials = { username: 'manager',
                          password: 'password'
                        };

    scope.signin();
    waits(1000);
    expect($location.path()).toBe("/#/profile");

  });

  it('should log user out', function () {

    scope.signout();
    expect($location.path()).toBe("/#/");

  });

  it('should log in as admin user', function () {

    scope.credentials = { username: 'admin',
                          password: 'password'
                        };

    scope.signin();
    expect($location.path()).toBe("/#/admin");
    // expect(scope.attempts.length).toBeGreaterThan(1);

  });


});
