/// <binding AfterBuild='default' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');

var paths = {
    root: './wwwroot',
    libPath: './wwwroot/lib',
    polyfills: ['node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/systemjs/dist/system.src.js']
};

gulp.task('polyfill-copy', function () {
    gulp.src(paths.polyfills).pipe(gulp.dest(paths.libPath))
});

gulp.task('angular-copy', function () {
    return gulp.src('node_modules/@angular/**/*.js', { base: 'node_modules/@angular' })
        .pipe(gulp.dest(paths.libPath + '/npm/@angular'));
});

gulp.task('rxjs-copy', function () {
    return gulp.src('node_modules/rxjs/**/*.js', { base: 'node_modules/rxjs' })
        .pipe(gulp.dest(paths.libPath + '/npm/rxjs'));
});

gulp.task('tslib-copy', function () {
    return gulp.src('node_modules/tslib/**/*.js', { base: 'node_modules/tslib' })
        .pipe(gulp.dest(paths.libPath + '/npm/tslib'));
});

gulp.task('angular-in-memory-web-api-copy', function () {
    return gulp.src('node_modules/angular-in-memory-web-api/**/*.js', { base: 'node_modules/angular-in-memory-web-api' })
        .pipe(gulp.dest(paths.libPath + '/npm/angular-in-memory-web-api'));
});

gulp.task('bootstrap-copy', function () {
    return gulp.src('bower_components/bootstrap/dist/**/*', { base: 'bower_components/bootstrap/dist' })
        .pipe(gulp.dest(paths.libPath + '/bootstrap'));
});

gulp.task('default',
    [
        'polyfill-copy', 'angular-copy', 'rxjs-copy',
        'tslib-copy', 'angular-in-memory-web-api-copy', 'bootstrap-copy'
    ],
    function () {
        // place code for your default task here
        console.log("Tarea por defecto de Gulp ejecutada!");
    });