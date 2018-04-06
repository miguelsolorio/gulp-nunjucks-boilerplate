# Gulp Nunjucks Boilerplate
This boilerplate runs on [Gulp](http://gulpjs.com/) and [Nunjucks](https://mozilla.github.io/nunjucks/).

## Install dependencies
1. Install npm packages: ```npm install```
2. Install gulp: ```npm install --global gulp-cli```

## File Structure

### HTML
All pages can be found under ```src > template > pages``` which use the default layout template found under ```src > template > layouts > default.njk```.

You can also find all partials under ```src > template > partials > *.njk```.

### SASS
All CSS dependencies are imported at ```src > css > main.scss```.

### JavaScript
All JS files are part of the ```scriptFiles``` array in the ```gulpfile.js```.

## Developemnt
When working locally, running the local build command ```gulp``` will start a local server of the site and will automatically open your browser. Whenever changes are saved, the site will automaticaly regenerate your files and update your browser.

## Production
Running ```gulp production``` will build and compress your pages for production.