//引入模块
var gulp = require('gulp');
var server = require('gulp-webserver');
var minCss = require('gulp-clean-css');
var scss = require('gulp-sass');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var path = require('path');
var url = require('url');
var fs = require('fs');
//起服务
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
});
//css文件压缩并合并
gulp.task('minCss', function() {
    gulp.src('src/sass/*.scss', { base: 'src' })
        .pipe(scss())
        .pipe(minCss())
        .pipe(concat('/css/all.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
        }))
        .pipe(gulp.dest('bulid'))
});
//js文件压缩并合并
gulp.task('uglify', function() {
    gulp.src('src/js/*.js', { base: 'src' })
        .pipe(uglify())
        .pipe(concat('/js/all.js'))
        .pipe(gulp.dest('bulid'))
});
//监听
gulp.task('watch', function() {
    gulp.watch('./src/sass/*.scss', ['minCss']);
    gulp.watch('/src/js/*.js', ['uglify']);
});
//默认任务
gulp.task('default', ['watch', 'minCss', 'uglify'])