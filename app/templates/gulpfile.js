/**
 * gulp project generator
 *
 * @author  willHu
 * @date    2015-09-01
 * @contact email:huweiwei1@jd.com erp:huweiwei3 qq:226297845
 * 功能
 * 一、启动 gulp
 *      1. 编译 sass文件 (src目录下的 scss文件夹下的scss和component文件夹下的scss文件)
 *      2. 合并 生成的CSS文件
 *      3. 对JS文件 进行 jshint
 *      5. 开启browsersync，并监听css和js文件
 * 二、启动 gulp build
 *      1. 将img文件夹下的文件复制到dist目录
 *      2. 将html下的html文件复制到dist目录
 *      3. 将js和css文件按照规则合并压缩，复制到dist目录
 *      4. css和js生成版本
 *      5. 自动替换HTML中的引用css/js文件至最新版
 * 三、启动 gulp img
 *      1. 将src/img/sprite下的文件夹的png 拼接css sprite并输出sass文件(congif.js中配置是否输出@2x)
 *      2. 压缩所有image
 * 四、启动 gulp run
 *      执行 gulp default相同任务，除去监听和自动刷新
 */

'use strict';

/* global module */
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins();

/* config */
var settings = require('./tasks/config')();


/* ========== tasks moudles ========== */
/* css tasks */
// sass
// command:  gulp sass
require('./tasks/sass')(gulp, $, settings);
// minify css
// command:  gulp minifycss
//require('./tasks/minifycss')(gulp, $, settings);


/* javascript tasks */
// jshint
// command:  gulp jshint
require('./tasks/jshint')(gulp, $, settings);
// uglify js
// command:  gulp uglify
require('./tasks/uglify')(gulp, $, settings);

/* images tasks */
// sprite images
// command:  gulp sprite
require('./tasks/sprite')(gulp, $, settings);
// imagemin
// command:  gulp imagemin
require('./tasks/imagemin')(gulp, $, settings);

/* tools */
// command:  gulp cleanDist cleanDemo
require('./tasks/clean')(gulp, $, settings);
// command:  gulp clear-cache
require('./tasks/cache')(gulp, $, settings);
// browserSync
// command:  gulp browsersync
require('./tasks/browsersync')(gulp, $, settings);
// copy
require('./tasks/copy')(gulp, $, settings);
// usemin
require('./tasks/usemin')(gulp, $, settings);
//TODO sftp active mode have same bug to fixed
// sftp
// command:  gulp ftp
require('./tasks/ftp')(gulp, $, settings);

// tasks
// imagemin&sprite
gulp.task('img', [
    'sprite',
    'imagemin'
]);
// just watch js & scss
gulp.task('watch', function() {
    gulp.watch(settings.srcPath + '/**/*.scss', ['sass']);
    gulp.watch([settings.srcPath + '/js/demo/*.js', settings.srcPath + '/component/**/*.js'], ['jshint']);
});
// watch & browsersunc
gulp.task('default',[
    'browsersync',
    'watch'
]);
// build sass, jshint
gulp.task('run', [
    'sass',
    'jshint'
]);
// build to dist
gulp.task('build', [
    'copy-img',
    'usemin'
]);

// preview dist floder
gulp.task('serve', [
    'browsersync:dist'
]);

// clean demo
gulp.task('clean-demo', [
    'browsersync:dist'
]);
