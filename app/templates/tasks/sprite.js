/**
 * images sprite  output css/scss
 *
 * @author  willhu
 * @date    2015-09-01
 * @contact email:huweiwei1@jd.com erp:huweiwei3 qq:226297845
 */

module.exports = function (gulp, $, settings) {
    var fs = require('fs');
    var sizeOf = require('image-size');
    var spriteList = fs.readdirSync(settings.srcPath + '/img/sprite/');
    var merge = require('merge-stream');
    // retina图片处理
    gulp.task('spriteCut', function () {
        spriteList.forEach(function (spriteItem) {
            var path = settings.srcPath + '/img/sprite/' + spriteItem;
            var states = fs.statSync(path);
            if (states.isDirectory() === true) {
                var spriteItemList = fs.readdirSync(path);
                spriteItemList.forEach(function (imgFile) {
                    var imgPath = path + '/' + imgFile;
                    if (settings.imgRetina === true) {
                        var imgSize = sizeOf(imgPath);
                        var imgW = imgSize.width;
                        var imgH = imgSize.height;
                        if (imgFile.indexOf('@2x') > -1) {
                            if (imgW % 2 === 1 || imgH % 2 === 1) {
                                imgW % 2 === 1 ? imgW -= 1 : imgW;
                                imgW % 2 === 1 ? imgH -= 1 : imgH;
                                return gulp.src(imgPath)
                                    .pipe($.gm(function (gmfile) {
                                        return gmfile.resize(imgW, imgH);
                                    }, {
                                        imageMagick: true
                                    }))
                                    .pipe(gulp.dest(path));
                            }
                        }
                    }
                });
            }
        });
    });
    // 图片缩放
    gulp.task('spriteResize', function () {
        spriteList.forEach(function (spriteItem) {
            var path = settings.srcPath + '/img/sprite/' + spriteItem;
            var states = fs.statSync(path);
            if (states.isDirectory() === true) {
                var spriteItemList = fs.readdirSync(path);
                spriteItemList.forEach(function (imgFile) {
                    var imgPath = path + '/' + imgFile;
                    if (settings.imgRetina === true) {
                        var imgSize = sizeOf(imgPath);
                        var imgW = imgSize.width;
                        var imgH = imgSize.height;
                        var imgName = imgFile.split("@2x")[0] + '.png';
                        if (imgFile.indexOf('@2x') > -1) {
                            return gulp.src(imgPath)
                                .pipe($.gm(function (gmfile) {
                                    return gmfile.resize(imgW / 2, imgH / 2);
                                }, {
                                    imageMagick: true
                                }))
                                .pipe($.rename(imgName))
                                .pipe(gulp.dest(path));
                        }
                    }
                });
            }
        });
    });
    // 图片拼接
    gulp.task('spriteImg', function () {
        if (spriteList.length > 0) {
            spriteList.forEach(function (spriteFile) {
                if (spriteFile.indexOf('.') < 0) {
                    var spriteData;
                    var imgStream;
                    var cssStream
                    if (settings.imgRetina === true) {
                        spriteData = gulp.src(settings.srcPath + '/img/sprite/' + spriteFile + '/*.png')
                            .pipe($.spritesmith({
                                retinaSrcFilter: [settings.srcPath + '/img/sprite/' + spriteFile + '/*@2x.png'],
                                imgName: spriteFile + '.png',
                                retinaImgName: spriteFile + '@2x.png',
                                cssName: '_' + spriteFile + '.scss',
                                imgPath: '/img/sprite',
                                padding: 2
                            })
                        );
                        imgStream = spriteData.img.pipe(gulp.dest(settings.srcPath + '/img/sprite/'));
                        cssStream = spriteData.css.pipe(gulp.dest(settings.srcPath + '/scss/sprite/'));
                        return merge(imgStream, cssStream);
                    } else {
                        spriteData = gulp.src(settings.srcPath + '/img/sprite/' + spriteFile + '/*.png')
                            .pipe($.spritesmith({
                                imgName: spriteFile + '.png',
                                cssName: '_' + spriteFile + '.scss',
                                imgPath: '/img/sprite',
                                padding: 2
                            })
                        );
                        imgStream = spriteData.img.pipe(gulp.dest(settings.srcPath + '/img/sprite/'));
                        cssStream = spriteData.css.pipe(gulp.dest(settings.srcPath + '/scss/sprite/'));
                        return merge(imgStream, cssStream);
                    }
                }
            });
        } else {
            console.log('hey man,there is no images');
        }
    });

    // 整合
    gulp.task('sprite',['spriteCut', 'spriteResize'], function () {
    });
};