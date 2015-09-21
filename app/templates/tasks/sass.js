/**
 * sass to css
 *
 * @author  willHu
 * @date    2015-09-01
 * @contact email:huweiwei1@jd.com erp:huweiwei3 qq:226297845
 */

module.exports = function (gulp, $, settings) {
    var fs = require('fs');
    gulp.task('sass-normal', function() {
        // normal
        return gulp.src([settings.srcPath + '/scss/*.scss', settings.srcPath + '/scss/*.css'])
            .pipe($.sourcemaps.init())    // sourcemaps init
            .pipe($.sass({
                /** outputstyle: default: nested  nested/expanded/compact/compressed
                 nested:     层级缩进
                 expanded:   无缩进，每个样式间有空行
                 compact:    一行显示
                 compressed: 全部压缩到一行
                 */
                outputStyle: settings.sassOutputType
            }))
            .pipe($.sourcemaps.write())   // output sourcemaps
            .pipe(gulp.dest(settings.srcPath + '/css/'));
    });
        // component
    gulp.task('sass-component', function() {
        var componentList = fs.readdirSync(settings.srcPath + '/component/');
        if (componentList.length > 0) {
            componentList.forEach(function(componentFile) {
                return gulp.src(settings.srcPath + '/component/' + componentFile + '/*.scss')
                    .pipe($.sourcemaps.init())    // sourcemaps init
                    .pipe($.sass({
                        /** outputstyle: default: nested  nested/expanded/compact/compressed
                         nested:     层级缩进
                         expanded:   无缩进，每个样式间有空行
                         compact:    一行显示
                         compressed: 全部压缩到一行
                         */
                        outputStyle: settings.sassOutputType
                    }))
                    .pipe($.sourcemaps.write())   // output sourcemaps
                    .pipe(gulp.dest(settings.srcPath + '/component/' + componentFile));
            });
        }
    });
    gulp.task('sass', ['sass-normal', 'sass-component']);
};