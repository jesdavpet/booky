#### "Booky.js" a customizable bookmarklet module
Combine canned functions to easily generate custom JavaScript bookmarklets.

###### Automatically searches for a highlighted term on a page:
```
Booky.webpage(
        'http://www.google.com/search',
        [ { 'q': Booky.getSelection } ],
        ''
    )
    .get()
    .inNewWindow();
```


###### Generates a boilerplate email to share interesting excerpts:
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
    .inThisWindow();

```
