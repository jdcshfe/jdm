/**
 * generator settings
 *
 * @author  willhu
 * @date    2015-09-03
 * @contact email:huweiwei1@jd.com erp:huweiwei3 qq:226297845
 */

module.exports = function () {
    var settings = {
        srcPath:    "src",          // 开发目录
        distPath:   "dist",         // 发布目录
        pngLevel:   3,              // png 压缩等级
        imgRetina:  true,           // css sprite是否支持高清屏
        sassOutputType: "compact",  // sass 输出 css 是否压缩
        cssName:    "app.css",      // 业务 css 打包名称
        uiCssName:  "jdMobi.css",   // 通用&组件 css 打包名称
        jsName:     "app.js",       // 业务 js 打包名称
        uiJsName:   "jdMobi.js",    // 通用&组件 js 打包名称
        browser: ["google chrome"]  // 启动浏览器种类
        //server: {
        //    host:       "localhost",
        //    port:        "3000"
        //}

    };
    return settings;
};