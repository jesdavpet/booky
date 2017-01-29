Booky - a fluid interface for creating bookmarklets
======================================================

Combine canned functions to easily generate custom JavaScript bookmarklets, without having to write them from scratch.

API Documentation
=================

Link generation using ```booky.Link()```
----------------------------------------

- ```baseUrl(string[])``` set the base URL for the generated link
- ```parameters(object[])``` adds query parameter key value pairs
- ```fragemnnt(string[])``` adds a fragment identifier for anchors

Example: automatically search for a highlighted term on a page:
```
booky.Link()
  .baseUrl('http://www.google.com/search')
  .parameters({ 'q': booky.SELECTED_TEXT })
  .inSameWindow();
```


Email generation using ```booky.Email()```:
-------------------------------------------

- ```.to(string[])``` adds a recipient email to the list of recipients
- ```.cc(string[])``` adds a recipient email to the carbon copy list
- ```.bcc(string[])``` adds a recipient to the blind carbon copy list
- ```.subject(string[])``` the collection of values to concatenate into the subject
- ```.body(string[])``` the collection of values to concatenate into the email body
- ```.inNewWindow()``` opens the mailto: link in a new browser window

Example: creating a boilerplate e-mail to share an excerpt from article:
```
booky.Email()
  .to('potus@us.gov')
  .cc(['flotues@us.gov', 'presidential.dog@us.gov'])
  .bcc(['news@cnn.com'])
  .subject(['Article: ', booky.TITLE])
  .body([
    'Dear Sir/Madam,',
    '\n',

    'Please read this interesting page: \"',
    booky.TITLE,
    ' by ',
    booky.AUTHOR
    '\" online at: ',
    Booky.URL,
    '\n',

    'Here\'s an excerpt: \"',
    booky.SELECTED_TEXT,
    '\"',
    "\n",

    'Yours, truly.'
  ])
  .inNewWindow();
```


Getting values from an HTML page using ```booky```
--------------------------------------------------

- ```AUTHOR()``` gets the author of the current page if present
- ```LAST_MODIFIED()``` gets the last modified date of the page
- ```SELECTED_TEXT()``` gets selected text on the page at the time of execution
- ```TITLE()``` gets the title of the HTML page
- ```URL()``` gets the URL of the HTML page
