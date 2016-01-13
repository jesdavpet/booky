#### "Booky.js" a customizable bookmarklet module
Combine canned functions to easily generate custom JavaScript bookmarklets.

###### Automatically search for a highlighted term on a page:
```
Booky.webpage(
        'http://www.google.com/search',
        [ { 'q': Booky.getSelection } ],
        ''
    )
    .get()
    .inNewWindow();
```


###### Generate a boilerplate email to share excerpts from online articles:
```
Booky.email(
        [ 'potus@us.gov', 'flotus@us.gov' ],
        [
            { 'title': Booky.title },
            { 'body' : [
                    'Dear Sir/Madam,',
                    '\n',

                    'Please read this interesting page: \"',
                    Booky.title,
                    '\" online at: ',
                    Booky.url,
                    '\n',

                    'Here\'s an excerpt: \"',
                    Booky.selectedText,
                    '\"',
                    "\n",

                    'Yours, truly.'
                ]
            }
        ]
    )
    .get()
    .inSameWindow();
```
