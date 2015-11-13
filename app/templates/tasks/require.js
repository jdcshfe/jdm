/**
 * Optimize AMD modules in javascript files using the requirejs optimizer.
 *
 * @author  willHu
 * @date    2015-11-10
 * @contact email:huweiwei1@jd.com erp:huweiwei3 qq:226297845
 */

module.exports = function (gulp, $, settings) {
    return gulp.src([
        settings.srcPath + '/js/*.js',
        '!' + settings.srcPath + '/js/' + 'require-config.js'
        ])
        .pipe($.requirejsOptimize ({
                mainConfigFile: settings.srcPath + '/js/require-config.js'
            })
        )
        .pipe(gulp.dest(settings.distPath + '/js'));
};