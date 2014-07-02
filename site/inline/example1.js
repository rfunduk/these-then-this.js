these(
  function( cb ) {
    cb( 'sync', 'some' + 'sync' + 'work' );
  },
  function( cb ) {
    setTimeout( function() { cb( 'async', 'delayed' ); }, 1000 );
  }
).thenThis( function( results ) {
  alert( JSON.stringify( results, undefined, 2 ) );
} );
