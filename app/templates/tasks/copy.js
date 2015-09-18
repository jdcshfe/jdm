/**
 * copy html & img src to dist
 *
 * @author  willHu
 * @date    2015-09-07
 * @contact email:huweiwei1@jd.com erp:huweiwei3 qq:226297845
 */

module.exports = function (gulp, $, settings) {
    gulp.task('copy-html', function() {
        return gulp.src(settings.srcPath + '/html/**/*.html')
                .pipe(gulp.dest(settings.distPath + "/html/"));
    });
    gulp.task('copy-img', function() {
        gulp.src(settings.srcPath + '/img/*.*')
            .pipe(gulp.dest(settings.distPath+"/img/"));

        gulp.src(settings.srcPath + '/img/sprite/*.*')
            .pipe(gulp.dest(settings.distPath+"/img/sprite/"));
    });
    gulp.task('copy-js', function() {
        return gulp.src(settings.srcPath + '/js/lib/*.js')
            .pipe(gulp.dest(settings.distPath+"/js/lib/"));
    });

};