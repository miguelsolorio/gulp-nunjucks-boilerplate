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
1. Install Bower globally using npm: ```npm install -g bower```
2. Install project dependencies with: ```bower install```.
3. For more details, visit [Bower's website](http://bower.io/).


### Installing Gulp
1. Change to the project's root directory.
2. Install the CLI by running: ```npm install --global gulp-cli```
3. Run Gulp with: ```gulp```.
4. For more details, visit [Gulp's website](http://gulpjs.com/).

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

*Note: If you're using Visual Studio Code, running ``` cmd+shift+b ``` will run the command in your editor without having to open the terminal. When you are done and want to stop the task, run ```cmd+shift+p``` and type ```task terminate``` to stop the task.*

## Production
Running ```gulp production``` will build and compress your pages for production.