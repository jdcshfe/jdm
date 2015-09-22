/**
 * ftp to test sever
 *
 * @author  willHu
 * @date    2015-09-21
 * @contact email:huweiwei1@jd.com erp:huweiwei3 qq:226297845
 */


module.exports = function (gulp, $, settings) {
    gulp.task('ftp', function() {
        return gulp.src(settings.distPath + '/*')
            .pipe($.sftp({
                host: settings.testServer.host,
                remotePath: settings.testServer.path,
                user: settings.testServer.user,
                pass: settings.testServer.pass,
                port: 21

            }));
    });
};