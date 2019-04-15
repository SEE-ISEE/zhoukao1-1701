var gulp = require('gulp');
var sass = require('gulp-sass');
var minCss = require('gulp-clean-css')
var server = require('gulp-webserver');
var uglify = require('gulp-uglify');
gulp.task('server', function () {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            open: true,
            livereload: true
        }))

})
gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})
gulp.task('minCss', function () {
    return gulp.src('./src/css/**/*.css')
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest('./dist/css'))
})
gulp.task('minJs', function () {
    return gulp.src('./src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
})
gulp.task('watch', function () {
    return gulp.watch(['./src/sass/**/*.scss', './src/js/**/*.js'], gulp.series('sass', 'minJs'))
})

gulp.task('default', gulp.series('minJs', 'sass', 'server', 'watch'))