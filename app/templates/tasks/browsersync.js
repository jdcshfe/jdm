/**
 * browserSync
 *
 * @author  willHu
 * @date    2015-09-07
 * @contact email:huweiwei1@jd.com erp:huweiwei3 qq:226297845
 */

module.exports = function (gulp, $, settings) {
    var browserSync = require('browser-sync').create();
    var files = [
        settings.srcPath + '/**/*.css',
        settings.srcPath + '/**/*.js',
        settings.srcPath + '/**/*.html'
    ];
    gulp.task('browsersync', function() {
        //if (settings.server.proxy && settings.server.proxy !== '') {
        //    browserSync.init({
        //        proxy: settings.server.proxy,
        //        open: 'external',
        //        port: settings.server.port
        //    });
        //} else {
        //
        //}
        browserSync.init(files,{
            server: {
                baseDir: './'
            },
            browser: settings.browser
        });
    });
    gulp.task('browsersync:dist', function() {
        //if (settings.server.proxy && settings.server.proxy !== '') {
        //    browserSync.init({
        //        proxy: settings.server.proxy,
        //        open: 'external',
        //        port: settings.server.port
        //    });
        //} else {
        //
        //}
        browserSync.init(files,{
            server: {
                baseDir: './dist/'
            },
            browser: settings.browser
        });
    });
};