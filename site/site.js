document.addEventListener( 'DOMContentLoaded', function() {
  var toHighlight = document.querySelectorAll('pre.highlight');
  Array.prototype.forEach.call( toHighlight, function( el, i ) {
    hljs.highlightBlock( el );
    var src = el.getAttribute('data-src');
    if( src != 'ttt.js' ) { el.appendChild( makeLink(src) ); }
  } );
} );

function makeLink( filename ) {
  var link = document.createElement('a');
  link.setAttribute( 'href', 'javascript:void(0);' );
  link.appendChild( document.createTextNode("run") );

  link.addEventListener( 'click', function() {
    var request = new XMLHttpRequest();
    request.open( 'GET', 'inline/' + filename, true );

    // bleh, jquery is nice
    var currentResultsTarget = link.parentNode;
    var resultsContainer = document.getElementById(currentResultsTarget.getAttribute('data-results'));
    resultsContainer.querySelector('a').addEventListener( 'click', function() {
      currentResultsTarget.style.display = 'block';
      resultsContainer.style.display = 'none';
      resultsContainer.innerHTML = "<a href='javascript:void(0);'>done</a>";
    } );
    resultsContainer.style.width = currentResultsTarget.offsetWidth + 'px';
    resultsContainer.style.height = currentResultsTarget.offsetHeight + 'px';
    currentResultsTarget.style.display = 'none';
    resultsContainer.style.display = 'block';

    var alert = function( msg ) {
      var target = resultsContainer.querySelector('a');
      var el = typeof msg == 'string' ? document.createTextNode( msg ) : msg
      target.insertAdjacentHTML( 'beforebegin', msg + '<br/>' );
    };
    alert( "<span>Results:</span>" );

    request.onload = function() {
      if( this.status == 200 ) { eval( this.response ); }
    };

    request.send();
  } );
  return link;
}
