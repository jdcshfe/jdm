/**
 * gulp usemin
 * Replaces references to non-optimized scripts or stylesheets into a set of HTML files (or any templates/views)
 *
 * @author  willHu
 * @date    2015-09-01
 * @contact email:huweiwei1@jd.com erp:huweiwei3 qq:226297845
 */

module.exports = function (gulp, $, settings) {
    gulp.task('usemin', function() {
        return gulp.src(settings.srcPath + '/html/**/*.html')
            .pipe($.usemin({
                css: [$.minifyCss, $.rev],
                cssBase: [$.minifyCss, $.rev],
                cssUi: [$.minifyCss, $.rev],
                cssPage: [$.minifyCss, $.rev],
                js: [$.uglify, $.rev],
                jsLib: [$.uglify, $.rev],
                jsComponent: [$.uglify, $.rev],
                jsPage: [$.uglify, $.rev],
                inlinejs: [$.uglify],
                inlinecss: [$.minifyCss]
            }))
            .pipe(gulp.dest(settings.distPath + '/html/'));
    });
};