/**
 * concat javascript & css
 *
 * @author  willHu
 * @date    2015-09-03
 * @contact email:huweiwei1@jd.com erp:huweiwei3 qq:226297845
 */

module.exports = function (gulp, $, settings) {
    // normal
    gulp.task('concat-js-normal', function() {
        return gulp.src([
            settings.srcPath + '/js/page/*.js',
            '!' + settings.srcPath + '/js/**/*.min.js',
            '!' + settings.srcPath + '/js/min/*.js',
            '!' + settings.srcPath + '/js/' + settings.jsName,
            '!' + settings.srcPath + '/js/' + settings.uiJsName
        ])
            .pipe($.concat(settings.jsName))
            .pipe(gulp.dest(settings.srcPath + '/js/'));

    });
    // component
    gulp.task('concat-js-component', function() {
        return gulp.src([
            settings.srcPath + '/component/**/*.js'
        ])
            .pipe($.concat(settings.uiJsName))
            .pipe(gulp.dest(settings.srcPath + '/js/'));
    });
    // normal
    gulp.task('concat-css-normal', ['sass'], function() {
        // normal
        return gulp.src([
            settings.srcPath + '/css/**/*.css',
            '!' + settings.srcPath + '/css/**/*.min.css',
            '!' + settings.srcPath + '/css/min/*.css',
            '!' + settings.srcPath + '/css/' + settings.cssName,
            '!' + settings.srcPath + '/css/' + settings.uiCssName
        ])
            .pipe($.concat(settings.cssName))
            .pipe(gulp.dest(settings.srcPath + '/css/'));
    });
    // component
    gulp.task('concat-css-component', ['sass'], function() {
        return gulp.src([
            settings.srcPath + '/component/**/*.css'
        ])
            .pipe($.concat(settings.uiCssName))
            .pipe(gulp.dest(settings.srcPath + '/css/'));
    });
    gulp.task('concat-js', ['concat-js-normal', 'concat-js-component']);
    gulp.task('concat-css', ['concat-css-normal', 'concat-css-component']);
};