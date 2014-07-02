var those = these(
  function( cb ) { cb( 'quick', 1 ); },
  function( cb ) { setTimeout( function() { cb( 'slow', 2 ); }, 1000 ) }
).thenThis( function( results ) {
  alert( JSON.stringify( results, undefined, 2 ) );
} );

setTimeout( function() {
  alert(
    "quick: " + those.results.quick + ", " + // -> 1
    "slow: " + those.results.slow            // -> undefined
  );
}, 250 );
