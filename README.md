# gulp-nunjucks-boilerplate
This boilerplate runs on [Gulp](http://gulpjs.com/) and [Bower](http://bower.io/), which depend on [Node](http://nodejs.org/) and [npm](http://npmjs.org/). Ensure that you have Node and npm installed before you begin. Additionally, this project utilizes the following packages:
- [browser-sync](https://github.com/BrowserSync/browser-sync)
- [gulp-concat](https://github.com/contra/gulp-concat)
- [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin)
- [gulp-sass](https://github.com/dlmanning/gulp-sass)
- [gulp-uglify](https://github.com/terinjokes/gulp-uglify)
- [gulp-util](https://github.com/gulpjs/gulp-util)
- [gulp-nunjucks-render](https://github.com/carlosl/gulp-nunjucks-render)

## Dependencies

### Installing Bower
1. Install Bower globally using npm: <code>npm install -g bower</code>
2. Install project dependencies with: <code>bower install</code>.
3. For more details, visit [Bower's website](http://bower.io/).


### Installing Gulp
1. Change to the project's root directory.
2. Install the CLI by running: <code>npm install --global gulp-cli</code>
3. Run Gulp with: <code>gulp</code>.
4. For more details, visit [Gulp's website](http://gulpjs.com/).

## File Structure

### HTML
All pages can be found under <code>src > template > pages</code> which use the default layout template found under <code>src > template > layouts > default.njk</code>.

You can also find all partials under <code>src > template > partials > *.njk</code>.

### SASS
All CSS dependencies are imported at <code>src > css > main.scss</code>.

### JavaScript
All JS files are part of the <code>scriptFiles</code> array in the <code>gulpfile.js</code>.

## Build for Production

### Gulp Build
When you're ready to build for production simply run: <code>gulp build --production</code> and your files will be minified under the <code>public</code> directory.