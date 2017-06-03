describe('Map Service', function(){


  it('should have addMarkers', function(){
    var $injector = angular.injector([ 'application.home' ]);
    var MapService = $injector.get( 'MapService' );
    expect( MapService ).toBeTruthy();
    expect( MapService.addMarkers ).toBeTruthy();
  });

});