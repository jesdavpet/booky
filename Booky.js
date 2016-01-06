'use strict';
var Booky = ( function () {

  function flatten( thing ) {
    var flattened = '';

    switch ( wtf.type( thing ) ) {
      case wtf.NUMBER :   // Fall through to STRING case.
      case wtf.STRING :   // Base case.
        flattened += thing;
        break;
      case wtf.FUNCTION : // Recurse on value returned.
        flattened += flatten( thing() );
        break;
      case wtf.ARRAY :    // Concatenate recursed value of each element in the array.
        for ( var t = 0; t < thing.length; t++ ) flattened += flatten( thing[t] );
        break;
      default : break;    // Do nothing. Non-primitives will be ignored -- including objects.
    }

    return flattened;
  }

  function get( url, action ) {
    action = action || function ( loc ) { window.location.href = loc; };

    var location = '';

    if ( wtf.is( url.base, wtf.ARRAY ) ) {
      var bases = [];
      for ( var b = 0; b < url.base.length; b++ ) bases.push( flatten( url.base[b] ) );
      location += bases.join( ',' );
    } else {
      location += flatten( url.base );
    }

    if ( url.parameters.length > 0 ) {
      location += '?';
      var flat = [];
      for ( var l = 0; l < url.parameters.length; l++ ) {
        for ( var key in url.parameters[l] ) {
          flat.push( key + '=' + flatten( url.parameters[l][key] ) );
        }
      }
      location += flat.join( '&' );
    }

    if ( url.anchor ) location += ( '#' + flatten( url.anchor ) );

    action( location );
  }

  function author() {
    var meta = document.head.getElementsByTagName('meta');
    for ( var m = 0; m < meta.length; m++ ) {
      if ( meta[m].name === 'author' ) return meta[m].content;
    }
    return '';
  }

  function lastModified() { return document.lastModified; }

  function selectedText() {
    var text = '';
    if ( window.getSelection ) {
      text = window.getSelection().toString();
    } else if (
      document.selection
      && document.selection.type != 'Control'
    ) {
      text = document.selection.createRange().text;
    }
    return text;
  }

  function title () { return document.title; }

  function url() { return document.URL; }

  return {
    'get' : get,
    'author' : author,
    'lastModified' : lastModified,
    'selectedText' : selectedText,
    'title' : title,
    'url' : url
  };

} )();
