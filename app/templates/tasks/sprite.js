/**
 * images sprite  output css/scss
 *
 * @author  willhu
 * @date    2015-09-01
 * @contact email:huweiwei1@jd.com erp:huweiwei3 qq:226297845
 */


module.exports = function(gulp, $, settings) {
    var fs = require('fs');
    var sizeOf = require('image-size');
    var merge = require('merge-stream');
    var rootPath = settings.srcPath + '/img/sprite/';
    var spriteDirArr = fs.readdirSync(rootPath);
    var imgNum = 0;



    // 图片遍历生成数组
    var spriteArr = {};
    function spriteDirInit() {
        spriteArr = {};
        // 遍历第一层  sprite下
        spriteDirArr.forEach(function (spriteDir) {
            var spriteDirPath = rootPath + spriteDir;
            //  是否为文件夹
            var isDir = fs.statSync(spriteDirPath).isDirectory();
            if (isDir === true) {
                spriteArr[spriteDir] = {};
                var spriteImgArr = fs.readdirSync(spriteDirPath);
                // 遍历第二层  iconfolder下
                spriteImgArr.forEach(function(spriteImg) {
                    //  是否为文件夹
                    var isDir2 = fs.statSync(spriteDirPath + '/' + spriteImg).isDirectory();
                    if (isDir2 !== true) {
                        imgNum += 1;
                        spriteDirPath = rootPath + spriteDir;
                        var imgPath = spriteDirPath + '/' + spriteImg;
                        var spriteImgSize = sizeOf(imgPath);
                        var spriteName = spriteImg.split(".")[0];
                        spriteArr[spriteDir][spriteImg] = {};
                        spriteArr[spriteDir][spriteImg]['name'] = spriteName;
                        spriteArr[spriteDir][spriteImg]['width'] = spriteImgSize.width;
                        spriteArr[spriteDir][spriteImg]['height'] = spriteImgSize.height;
                        spriteArr[spriteDir][spriteImg]['type'] = spriteImgSize.type;
                    }
                });

            }
        });
        console.log(spriteArr);
    }

    gulp.task('spriteInit', function() {
        spriteDirInit();
    });

    // 当前图片数组遍历
    function spriteImg(spriteArr) {
        for (var key in spriteArr) {
            var spriteDirPath = rootPath + key;
            var spriteImgArr = fs.readdirSync(spriteDirPath);
            gulp.src(spriteDirPath + '/tmp', {read: false}).pipe($.clean());
            spriteImgArr.forEach(function (spriteImg) {
                var imgPath = spriteDirPath + '/' + spriteImg;
                var isDir = fs.statSync(imgPath).isDirectory();
                if (isDir !== true) {
                    var imgW = spriteArr[key][spriteImg]['width'];
                    var imgH = spriteArr[key][spriteImg]['height'];
                    var imgName = spriteArr[key][spriteImg]['name'];
                    var imgType = spriteArr[key][spriteImg]['type'];
                    if (settings.imgRetina === true) {
                        sprite2x(spriteDirPath, imgPath, imgName, imgW, imgH, imgType);
                        sprite1x(spriteDirPath, imgPath, imgName, imgW, imgH, imgType);
                    }
                }
            });
        }
    }

    // 输出剪裁后的标准图并命名xx@2x.png
    function sprite2x(spriteDirPath, imgPath, imgName, imgW, imgH, imgType) {
        var imgName2x = imgName + '@2x.' + imgType;
        if (imgW % 2 === 1 || imgH % 2 === 1) {
            imgW % 2 === 1 ? imgW -= 1 : imgW;
            imgH % 2 === 1 ? imgH -= 1 : imgH;
            var stream = gulp.src(imgPath)
                .pipe($.gm(function (gmfile) {
                    return gmfile.resize(imgW, imgH, '!');
                }, {
                    imageMagick: true
                }))
                .pipe($.rename(imgName2x))
                .pipe(gulp.dest(spriteDirPath + '/tmp'));
            return stream;
        }
    }

    // 输出缩放后的小图，命名xx.png
    function sprite1x(spriteDirPath, imgPath, imgName, imgW, imgH, imgType) {
        var imgName1x = imgName + '.' + imgType;
        if (imgW % 2 === 1 || imgH % 2 === 1) {
            imgW % 2 === 1 ? imgW -= 1 : imgW;
            imgH % 2 === 1 ? imgH -= 1 : imgH;
            var stream = gulp.src(imgPath)
                .pipe($.gm(function (gmfile) {
                    return gmfile.resize(imgW / 2, imgH / 2, '!');
                }, {
                    imageMagick: true
                }))
                .pipe($.rename(imgName1x))
                .pipe(gulp.dest(spriteDirPath + '/tmp'));
            return stream;
        }
    }


    gulp.task('spriteCut', ['spriteInit'], function() {
        spriteImg(spriteArr);
    });


    // 输出SCSS和雪碧图
    function spriteOutput(spriteArr) {
        console.log('output scss & images, just a moment!');
        var t = setTimeout(function(){
            for (var key in spriteArr) {
                var spriteDirPath = rootPath + key;
                var spriteImgArr = fs.readdirSync(spriteDirPath);
                spriteImgArr.forEach(function(spriteImg) {
                    var imgPath = spriteDirPath + '/' + spriteImg;
                    var isDir = fs.statSync(imgPath).isDirectory();
                    if (isDir === true) {
                        var spriteData;
                        var imgStream;
                        var cssStream;
                        if (settings.imgRetina === true) {
                            spriteData = gulp.src(imgPath + '/*.png')
                                .pipe($.spritesmith({
                                    retinaSrcFilter: [imgPath + '/*@2x.png'],
                                    imgName: key + '.png',
                                    retinaImgName: key + '@2x.png',
                                    cssName: '_' + key + '.scss',
                                    retinaImgPath: '../img/sprite/' + key + '@2x.png',
                                    imgPath: '../img/sprite/' + key + '.png',
                                    padding: 2,
                                    engines: 'gmsmith',
                                    imgOpts: {
                                        quality: settings.spriteLevel
                                    }
                                })
                            );
                            imgStream = spriteData.img.pipe(gulp.dest(rootPath));
                            cssStream = spriteData.css.pipe(gulp.dest(settings.srcPath + '/scss/sprite/'));
                            return merge(imgStream, cssStream);
                        } else {
                            spriteData = gulp.src(spriteDirPath + '/*.png')
                                .pipe($.spritesmith({
                                    imgName: key + '.png',
                                    cssName: '_' + key + '.scss',
                                    imgPath: '../img/sprite/' + key + '.png',
                                    padding: 2,
                                    engines: 'gmsmith',
                                    imgOpts: {
                                        quality: settings.spriteLevel
                                    }
                                })
                            );
                            imgStream = spriteData.img.pipe(gulp.dest(rootPath));
                            cssStream = spriteData.css.pipe(gulp.dest(settings.srcPath + '/scss/sprite/'));
                            return merge(imgStream, cssStream);
                        }
                    }
                });
            }
            console.log('css sprite complete');
        }, imgNum* 300);


    }

    gulp.task('sprite', ['spriteCut'], function() {
        spriteOutput(spriteArr);
    });
};