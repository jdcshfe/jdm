/**
 * minify css
 *
 * @author  willHu
 * @date    2015-09-03
 * @contact email:huweiwei1@jd.com erp:huweiwei3 qq:226297845
 */

module.exports = function (gulp, $, settings) {
    gulp.task('minifycss', function() {
        return gulp.src(settings.srcPath + '/css/**/*.css')
                .pipe($.minifyCss())
                .pipe(gulp.dest(settings.distPath + '/css/'));
    });
};