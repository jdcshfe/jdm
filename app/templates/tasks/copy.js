/**
 * copy html & img src to dist
 *
 * @author  willHu
 * @date    2015-09-07
 * @contact email:huweiwei1@jd.com erp:huweiwei3 qq:226297845
 */

module.exports = function (gulp, $, settings) {
    gulp.task('copy-img', function() {
        return gulp.src(settings.srcPath + '/img/*.*')
            .pipe(gulp.dest(settings.distPath+'/img/'));
    });
    gulp.task('copy-sprite', function() {
        return gulp.src(settings.srcPath + '/img/sprite/*.png')
            .pipe(gulp.dest(settings.distPath+'/img/sprite/'));
    });
    gulp.task('copyImg',['copy-img', 'copy-sprite']);
};