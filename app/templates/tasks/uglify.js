/**
 * uglify javascript
 *
 * @author  willHu
 * @date    2015-09-03
 * @contact email:huweiwei1@jd.com erp:huweiwei3 qq:226297845
 */

module.exports = function (gulp, $, settings) {
    gulp.task('uglify', function() {
            return gulp.src(settings.srcPath + '/js/**/*.js')
            .pipe($.uglify())
            .pipe(gulp.dest(settings.distPath + '/js/'));
    });
};