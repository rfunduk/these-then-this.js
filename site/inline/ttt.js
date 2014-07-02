window.these = function() {
  if( !(this instanceof these) ) { return new these( arguments ); }
  this.functions = Array.prototype.slice.call( arguments[0] );
  this.results = {};
};

these.prototype.thenThis = function( cb ) {
  var instance = this, count = this.functions.length, fn;
  while( fn = this.functions.shift() ) {
    fn( function( key, value ) {
      instance.results[key] = value;
      if( !--count ) { cb( instance.results ); }
    } );
  }
  return this;
};
