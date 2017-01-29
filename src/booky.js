/**
 * @author Jesse Peterson <@jesdavpet> (http://www.jes.dav.pet)
 * Fluent interface for creating bookmarklets.
 */
module.exports = (function booky () {
'use strict'

  var wtf = require('@jesdavpet/wtf')

  function urlEncodeRfc3986 (s) {
    return encodeURI(s)
              .replace(/[!'()*]/g, function(c) {
                return '%' + c.charCodeAt(0).toString(16)
              })
  }

  function flatten (thing) {
    var flattened = ''

    switch (wtf.type(thing)) {
      case wtf.NUMBER(): // Fall through to STRING case.
      case wtf.STRING(): // Base case.
        flattened += thing
        break

      case wtf.FUNCTION(): // Recurse on value returned.
        flattened += flatten(thing())
        break

      case wtf.ARRAY(): // Concatenate recursed value of each element.
        thing.forEach(function (t) { flattened += flatten(thing[t]) })
        break

      default:
        break // Do nothing. Non-primitives and objects ignored.
    }

    return flattened
  }

  function tupleToQueryParam (tuple) {
    var key = Object.keys(tuple)[0]
    return (key + '=' + flatten(tuple[key]))
  }
  /******************************************************************************/

    function Email () {
      var my = {
        recipients: [],
        parameters: {
          cc:       [],
          bcc:      [],
          subject:  [],
          body:     [],
        },
      }

      var INTERFACE = {
        to:           to,
        cc:           cc,
        bcc:          bcc,
        subject:      subject,
        body:         body,
        inNewWindow:  inNewWindow,
        then:         then,
        constructUrl: constructUrl
      }

      function to (r) {
        my.recipients = my.recipients.concat(r)
        return INTERFACE
      }

      function cc (c) {
        my.parameters.cc = my.parameters.cc.concat(c)
        return INTERFACE
      }

      function bcc (b) {
        my.parameters.bcc = my.parameters.bcc.concat(b)
        return INTERFACE
      }

      function subject (s) {
        my.parameters.subject = my.parameters.subject.concat(s)
        return INTERFACE
      }

      function body (b) {
        my.parameters.body = my.parameters.body.concat(b)
        return INTERFACE
      }

      function constructUrl () {
        var recipients = my.recipients.map(flatten).join(',')

        var parameters = [
          { cc:       my.parameters.cc.map(flatten).join(',')     },
          { bcc:      my.parameters.bcc.map(flatten).join(',')    },
          { subject:  my.parameters.subject.map(flatten).join('') },
          { body:     my.parameters.body.map(flatten).join('')    },
        ]

        var queryParameters = parameters.map(tupleToQueryParam).join('&')

        return ('mailto:' +
                urlEncodeRfc3986(recipients) +
                ((queryParameters.length > 0) ? '?' : '') +
                urlEncodeRfc3986(queryParameters))
      }

      function inNewWindow () {
        window.open(constructUrl(), Date.now())
        return INTERFACE
      }

      function then (f) {
        f(my) // life...!
        return INTERFACE
      }

      return INTERFACE
    }


/******************************************************************************/

  function Link () {

    var my = {
      baseUrl:    [],
      parameters: [],
      fragment:   [],
    }

    var INTERFACE = {
      baseUrl:      baseUrl,
      parameters:   parameters,
      fragment:     fragment,
      inNewWindow:  inNewWindow,
      inSameWindow: inSameWindow,
      then:         then,
      constructUrl: constructUrl
    }

    function baseUrl (b) {
      my.baseUrl = (wtf.ARRAY(b)) ? b : [b]
      return INTERFACE
    }

    function parameters (p) {
      my.parameters = (wtf.ARRAY(p)) ? p : [p]
      return INTERFACE
    }

    function fragment (f) {
      my.fragment = (wtf.ARRAY(f)) ? p : [f]
      return INTERFACE
    }

    function constructUrl () {
      var baseUrl =     my.baseUrl.map(flatten).join('')
      var parameters =  my.parameters.map(tupleToQueryParam).join('&')
      var fragment =    my.fragment.map(flatten).join('')

      return (urlEncodeRfc3986(baseUrl) +
              ((parameters.length > 0) ? '?' : '') +
              urlEncodeRfc3986(parameters) +
              ((fragment.length > 0) ? '#' : '') +
              urlEncodeRfc3986(fragment))
    }

    function inNewWindow () { window.open(constructUrl(), Date.now()) }

    function inSameWindow () { window.location.href = constructUrl() }

    function then (f) {
      f(my) // life...!
      return INTERFACE
    }

    return INTERFACE
  }

/******************************************************************************/

  /**
   * Gets the author of an HTML document if present.
   * @returns {string}
   */
  function AUTHOR () {
    var meta = document.head.getElementsByTagName('meta')

    return meta
            .filter(function (m) { return m.name.toLowercase() === 'author' })
            .map(function (m) { return m.content })
            .join(', ')
  }

  /**
   * Gets the lastModified date of an HTML document if present.
   * @returns {string}
   */
  function LAST_MODIFIED () { return document.lastModified }

  /**
   * Gets the selected (highlighted) text from an HTML document if present.
   * @returns {string}
   */
  function SELECTED_TEXT () {
    var text = ''

    if (window.getSelection) {
      text = window.getSelection().toString()
    }
    else if (document.selection && document.selection.type !== 'Control') {
      text = document.selection.createRange().text
    }

    return text
  }

  /**
   * Gets the title of an HTML document if present.
   * @returns {string}
   */
  function TITLE () { return document.title }

  /**
   * Gets the URL of an HTML document if present.
   * @returns {string}
   */
  function URL () { return document.URL }


/******************************************************************************/

  return {
    AUTHOR:         AUTHOR,
    LAST_MODIFIED:  LAST_MODIFIED,
    SELECTED_TEXT:  SELECTED_TEXT,
    TITLE:          TITLE,
    URL:            URL,

    Email:  Email,
    Link:   Link,
  }

}())
