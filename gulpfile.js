var gulp = require('gulp');
var server = require('gulp-webserver');
var minCss = require('gulp-clean-css');
var scss = require('gulp-sass');
var uglify = require('gulp-uglify');
var path = require('path');
var url = require('url');
var fs = require('fs')
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            livereload: true,
            port: 8080,
            open: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                //  console.log(pathname)
                if (pathname === '/favicon.ico') {
                    return false
                }
                pathname = '/' ? '/index.html' : pathname;
                fs.readFileSync(path.join(__dirname, 'src', pathname))
            }
        }));
})