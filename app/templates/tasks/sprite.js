/**
 * images sprite  output css/scss
 *
 * @author  willhu
 * @date    2015-09-01
 * @contact email:huweiwei1@jd.com erp:huweiwei3 qq:226297845
 */

module.exports = function (gulp, $, settings) {
    var fs = require('fs');
    gulp.task('sprite', function() {
        var spriteList = fs.readdirSync(settings.srcPath + '/img/sprite/');
        if (spriteList.length > 0) {
            spriteList.forEach(function(spriteFile) {
                if (spriteFile.indexOf('.') < 0) {
                    var spriteData;
                    if (settings.imgRetina === true) {
                        spriteData = gulp.src(settings.srcPath + '/img/sprite/' + spriteFile + '/*.png')
                            .pipe($.spritesmith({
                                retinaSrcFilter: [settings.srcPath + '/img/sprite/' + spriteFile + '/*@2x.png'],
                                imgName: spriteFile + '.png',
                                retinaImgName: spriteFile + '@2x.png',
                                cssName: '_' + spriteFile + '.scss',
                                padding: 5
                            })
                        );
                        spriteData.img.pipe(gulp.dest(settings.srcPath + '/img/sprite/'));
                        spriteData.css.pipe(gulp.dest(settings.srcPath + '/stylesheet/scss/sprite/'));
                    } else {
                        spriteData = gulp.src(settings.srcPath + '/img/sprite/' + spriteFile + '/*.png')
                            .pipe($.spritesmith({
                                imgName: spriteFile + '.png',
                                cssName: '_' + spriteFile + '.scss',
                                padding: 5
                            })
                        );
                        spriteData.img.pipe(gulp.dest(settings.srcPath + '/img/sprite/'));
                        spriteData.css.pipe(gulp.dest(settings.srcPath + '/stylesheet/scss/sprite/'));
                    }
                }
            });
        } else {
            console.log('hey man,there is no images');
        }

    });
};