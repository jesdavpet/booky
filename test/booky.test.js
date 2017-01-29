var expect = require('chai').expect
var booky = require('../src/booky')

describe('booky', function () {

  describe('.Email(...)', function () {
    var emailInterfaceFunctionNames = [
      'to',
      'cc',
      'bcc',
      'subject',
      'body',
      'inNewWindow',
      'constructUrl'
    ]
    var emailInterface = booky.Email()

    emailInterfaceFunctionNames.forEach(function (functionName) {
      describe(('.' + functionName + '(...)'), function () {
        it('should have a function with this name', function () {
          expect(emailInterface).to.have.ownProperty(functionName)
          expect(emailInterface[functionName]).to.be.a.function
        })
      })
    })
  })

  describe('.Link(...)', function () {
    var linkInterfaceFunctionNames = [
      'baseUrl',
      'parameters',
      'fragment',
      'inNewWindow',
      'inSameWindow',
      'then',
      'constructUrl'
    ]
    var linkInterface = booky.Link()

    linkInterfaceFunctionNames.forEach(function (functionName) {
      describe(('.' + functionName + '(...)'), function () {
        it('should have a function with this name', function () {
          expect(linkInterface).to.have.ownProperty(functionName)
          expect(linkInterface[functionName]).to.be.a.function
        })
      })
    })
  })
})

describe('Use cases: creating a booky.Email()', function () {
  it('should create a mailto to say hello to the POTUS', function () {
    var observedMailto = booky.Email()
      .to('potus@usa.gov')
      .cc(['flotus@usa.gov'])
      .bcc(['yo@mama.com'])
      .subject(['Title'])
      .body(['Hello there!'])
      .constructUrl()
    var expectedMailto = 'mailto:potus@usa.gov?cc=flotus@usa.gov&bcc=yo@mama.com&subject=Title&body=Hello%20there%21'

    expect(observedMailto).to.equal(expectedMailto)
  })
})

describe('Use cases: creating a booky.Link()', function () {
  it('Should create a url to query google for cats', function () {
    var observedUrl = booky.Link()
      .baseUrl('http://www.google.com')
      .parameters({q: 'cats'})
      .fragment('faq')
      .constructUrl()
    var expectedUrl = 'http://www.google.com?q=cats#faq'

    expect(observedUrl).to.equal(expectedUrl)
  })
})
