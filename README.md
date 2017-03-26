VueJS Markdown Live Reload
==========================

[![Build Status](https://img.shields.io/travis/neilrussell6/vuejs-markdown-live-reload/master.svg?style=flat)](https://travis-ci.org/neilrussell6/vuejs-markdown-live-reload)
[![Coverage Status](https://coveralls.io/repos/github/neilrussell6/vuejs-markdown-live-reload/badge.svg?branch=master)](https://coveralls.io/github/neilrussell6/vuejs-markdown-live-reload?branch=master)

> A VueJS / Python markdown to html app with live reload.
> Uses [GNU Make](https://www.gnu.org/software/make/) as a build tool.

## Install

`git clone` & `npm install`:

```
git clone https://github.com/neilrussell6/vuejs-markdown-live-reload.git
cd vuejs-markdown-live-reload
npm install
```

## Usage

Run dev server

```bash
make serve
```

Will automatically open `http://localhost:8080/` in your browser.

## Markdown

To use:

1) create the markdown in ``src/data/content/md/YOURFILENAME.md``

2) update the template map ``src/data/content/template-map.js`` (using existing maps as reference)

2) open 2 terminals and run the following commands:
 
**terminal 1:** ``make serve`` 
This will serve the VueJS web-app on a dev server and will automatically open `http://localhost:8080/` in your browser.

**terminal 2:** ``make build-md-w``
This will automatically convert the markdown files to HTML as they are changed). 

Together you will have live-reload of the the markdown in the VueJS web-app.

## Make commands

 * **todo** – Lists all TODOs in JavaScript.
 * **jslint** – Lints JavaScript.
 * **jslint-w** – Lints source JavaScript and watches files for change.
 * **sasslint** – Lints SASS.
 * **sasslint-w** – Lints SASS and watches files for change.
 * **test** – Tests the source JavaScript.
 * **test-w** – Tests the source JavaScript and watches files for change.
 * **coverage** – Generates a testing coverage report for source JavaScript.
 * **serve** – Runs webpack-dev-server with live reloading.
 * **build** – Creates a production build for distribution and copies assets directory.
 * **build-md** – Converts to markdown to HTML, and generates template-map.js.
 * **build-md-w** – Converts to markdown to HTML, generates template-map.js and watches files for change.
 * **push** – Pushes local repository to GitHub.
 * **publish** – Creates a new GitHub release. [ MESSAGE ]


## Make commands : build-md

This rule does 2 things:

#### 1) Converts MD files to HTML (makefile variables are converted to their values for easier readability)

```bash
find ./src/data/content/md -type f | awk '{ system("node ./md-2-html/index.js "$$1" ./src/data/content/md ./src/data/content/html") }'
```

First part gets a list of all the md files in the src/data/content/md directory:

```bash
find ./src/data/content/md -type f ...
```

Which it pipes to an AWK script:

```bash
... -type f | awk '{ ... }'
```

The AWK script calls the /md-2-html/index.js node entry script for each file piped in.
So if the `find ...` commands returns the following:

```bash
./src/data/content/md/code-examples.md
./src/data/content/md/sub-dir/sub-page.md
./src/data/content/md/index.md
```

Then the AWK script will run the node script for each of those files eg.

```bash
node ./md-2-html/index.js ./src/data/content/md/code-examples.md ./src/data/content/md ./src/data/content/html
node ./md-2-html/index.js ./src/data/content/md/sub-dir/sub-page.md ./src/data/content/md ./src/data/content/html
node ./md-2-html/index.js ./src/data/content/md/index.md ./src/data/content/md ./src/data/content/html
```

2) Generates `template-map.js`, which exports all the generated HTML files so that VueJS can easily import them and automatically update the menu.

```bash
python dir-2-js-export/dir-2-js-export.py ./src/data/content/html -e html -o ./src/data/content/template-map.js -r ./src
```

This part just calls the `dir-2-js-export.py` python script with the following args/options:

 * target source directory: `./src/data/content/html`
 * extension (-e): `html`
 * output file path (-o): `./src/data/content/template-map.js`
 * text to remove from import url (-r): `./src`

Which will 

License
-------

[MIT](https://github.com/neilrussell6/vuejs-markdown-live-reload/blob/master/LICENSE)
