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
    ]
    var emailInterface = booky.Email()

    emailInterfaceFunctionNames.forEach(function (functionName) {
      describe(('.' + functionName + '(...)'), function () {
        it('should have a function with this name', function () {
          expect(emailInterface).to.have.ownProperty(functionName)
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
    ]
    var linkInterface = booky.Link()

    linkInterfaceFunctionNames.forEach(function (functionName) {
      describe(('.' + functionName + '(...)'), function () {
        it('should have a function with this name', function () {
          expect(linkInterface).to.have.ownProperty(functionName)
        })
      })
    })
  })

})
