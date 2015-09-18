/**
 * minify css
 *
 * @author  willHu
 * @date    2015-09-03
 * @contact email:huweiwei1@jd.com erp:huweiwei3 qq:226297845
 */

module.exports = function (gulp, $, settings) {
    gulp.task('minifycss', ['concat-css'], function() {
        return gulp.src([
                    settings.srcPath + '/css/' + settings.uiCssName,
                    settings.srcPath + '/css/' + settings.cssName
                ])
                //.pipe($.sourcemaps.init())  // sourcemaps init
                .pipe($.minifyCss())
                //.pipe($.sourcemaps.write()) // output sourcemaps
                .pipe(gulp.dest(settings.distPath + '/css/'));
    });
};