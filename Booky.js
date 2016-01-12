/**
* @author Jesse Peterson [@jesdavpet]
* @version 0.1
* A JavaScript bookmarklet module.
*/
var Booky = Booky || ( function () {
    'use strict';

    /**
     * Flattens an nth-dimensional array of primitives, functions, and/or arrays
     * of the same into a concatenated string value.
     * @param {number|string|[]|function} thing - the entry point to recursively flatten
     * @returns {string}
     */
    function flatten( thing ) {
    var flattened = '';

    switch ( wtf.type( thing ) ) {
        case wtf.NUMBER() : // Fall through to STRING case.
        case wtf.STRING() : // Base case.
            flattened += thing;
            break;
        case wtf.FUNCTION() : // Recurse on value returned.
            flattened += flatten( thing() );
            break;
        case wtf.ARRAY() : // Concatenate recursed value of each element in the array.
            for ( var t = 0; t < thing.length; t++ ) flattened += flatten( thing[t] );
            break;
        default : break; // Do nothing. Non-primitives will be ignored -- including objects.
    }

    return flattened;
    }

    /**
     * Gets a mailto or http get protocol bookmarklet.
     * @param {HttpGet|Mailto} url - object representing the location action to get
     * @returns {object}
     */
    function get( url ) {
        var location = '';

        // Concatenate the url base
        if ( wtf.ARRAY( url.base ) ) {
            var bases = [];
            for ( var b = 0; b < url.base.length; b++ ) {
                bases.push( flatten( url.base[b] ) );
            }
            location += bases.join( ',' );
        } else {
        location += flatten( url.base );
        }

        // Concatenate the url query parameters
        if ( url.parameters.length > 0 ) {
            location += '?';
            var flat = [];
            for ( var l = 0; l < url.parameters.length; l++ ) {
                for ( var key in url.parameters[l] ) {
                    if ( url.parameters[l].hasOwnProperty( key ) ) {
                        flat.push( key + '=' + flatten( url.parameters[l][key] ) );
                    }
                }
            }
            location += flat.join( '&' );
        }

        // Concatenate the anchor / hash
        if ( url.anchor ) location += ( '#' + flatten( url.anchor ) );

        // Do what's specified with that url location
        return {
            'inThisWindow': inThisWindow( location ),
            'inNewWindow': inNewWindow( location )
        };
    }

    /**
     * Constructs an object representing the fields of an URL/URI
     * @param {string|string[]} baseUrl - array of recipient email address
     * @param {object[]} parameters - array of key = value pairs, values may be numbers, strings, functions or arrays of the same
     * @param {string} anchor - string of anchor HTML node (*NOTE omit # symbol, it is automatically prepended)
     * @returns {object}
     */
    function webpage( baseUrl, parameters, anchor ) {
        if ( wtf.STRING( baseUrl ) ) baseUrl = [].push( baseUrl );
        if ( !parameters ) parameters = [];
        if ( !anchor ) anchor = '';

        // Return an object with a populated get method
        return { 'get': function () { get(
            {
                'base' : baseUrl,
                'parameters' : parameters,
                'anchor' : anchor
            }
        ); }
    }

    /**
     * Constructs an object representing the fields of a 'mailto:'
     * @param {string|string[]} to - array of recipient email address
     * @param {object[]} parameters - array of key = value pairs, values may be numbers, strings, functions or arrays of the same
     * @returns {object}
     */
    function email( to, parameters ) {
        // Scrub arguments into a arrays, and prepend mailto protocol
        if ( wtf.STRING( to ) ) to = [].push( to );
        to[0] = 'mailto:' + to[0];
        if ( !parameters ) parameters = [];

        return webpage( to, parameters );
    }

    /**
     * Opens a URL in the current window.
     * @param {string} url - the URL to open
     */
    function inSameWindow( url ) {
        return function () { window.location.href = url; };
    }

    /**
     * Opens a URL in a new window.
     * @param {string} url - the URL to open
     */
    function inNewWindow( url ) {
        return function () { window.open( url, 'newBookyWindow' ); };
    }

    /**
     * Gets the author of an HTML document if present.
     * @returns {string}
     */
    function author() {
        var meta = document.head.getElementsByTagName('meta');
        for ( var m = 0; m < meta.length; m++ ) {
            if ( meta[m].name === 'author' ) return meta[m].content;
        }
        return '';
    }

    /**
     * Gets the lastModified date of an HTML document if present.
     * @returns {string}
     */
    function lastModified() { return document.lastModified; }

    /**
     * Gets the selected (highlighted) text from an HTML document if present.
     * @returns {string}
     */
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

    /**
     * Gets the title of an HTML document if present.
     * @returns {string}
     */
    function title () { return document.title; }

    /**
     * Gets the URL of an HTML document if present.
     * @returns {string}
     */
    function url() { return document.URL; }

    return {
        'mailto' : mailto,
        'webpage' : webpage,

        'author' : author,
        'lastModified' : lastModified,
        'selectedText' : selectedText,
        'title' : title,
        'url' : url
    };
} )();
