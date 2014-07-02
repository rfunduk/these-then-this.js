describe( 'these', function() {
  it( 'should exist', function() {
    assert.isNotNull( these );
  } );
  it( 'should instantiate itself', function() {
    assert.instanceOf( these(), these );
  } );
} );

describe( 'these(fns)', function() {
  it( 'should accept an array of functions', function( done ) {
    these( [
      function( cb ) { cb( 'a', 1 ); },
      function( cb ) { cb( 'b', 2 ); }
    ] ).thenThis( function( r ) {
      assert.deepEqual( { a: 1, b: 2 }, r );
      done();
    } );
  } );

  it( 'should not run the functions by itself', function( done ) {
    var count = 0;
    these( function( cb ) { count++; cb( 'fn', 1 ); } );
    setTimeout( function() {
      assert.equal( count, 0 );
      done();
    }, 15 );
  } );

  it( 'should allow adding more functions', function( done ) {
    var instance = these( function( cb ) { cb( 'initial', true ); } );
    instance.functions.push( function( cb ) { cb( 'added', true ); } );
    instance.thenThis( function( r ) {
      assert.deepEqual( { initial: true, added: true }, r );
      done();
    } );
  } );
} );

describe( 'these(fns).thenThis(cb)', function() {
  it( 'should run all functions', function( done ) {
    var count = 0;
    these(
      function( cb ) { count++; cb(); },
      function( cb ) { count++; cb(); },
      function( cb ) { count++; cb(); }
    ).thenThis( function() {
      assert.equal( count, 3 );
      done();
    } );
  } );

  it( 'should return the instance', function() {
    assert.instanceOf( these().thenThis( function() {} ), these );
  } );

  it( 'should aggregate results', function( done ) {
    these(
      function( cb ) { cb( 'a', 1 ); },
      function( cb ) { cb( 'b', 2 ); },
      function( cb ) { cb( 'c', 3 ); }
    ).thenThis( function( r ) {
      assert.deepEqual( { a: 1, b: 2, c: 3 }, r );
      done();
    } );
  } );

  it( 'should expose intermediate results', function( done ) {
    var instance = these(
      function( cb ) { cb( 'quick', 1 ); },
      function( cb ) { setTimeout( function() { cb( 'slow', 1 ); }, 20 ); }
    );
    instance.thenThis( function( r ) {
      assert.deepEqual( { quick: 1, slow: 1 }, r );
      done();
    } );
    setTimeout( function() {
      assert.isTrue( instance.results.quick == 1 );
      assert.isUndefined( instance.results.slow );
    }, 10 );
  } );
} );
