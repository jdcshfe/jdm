/**
 * generator settings
 *
 * @author  willhu
 * @date    2015-09-03
 * @contact email:huweiwei1@jd.com erp:huweiwei3 qq:226297845
 */

module.exports = function () {
    var settings = {
        srcPath:    'src',          // 开发目录
        distPath:   'dist',         // 发布目录
        pngLevel:   3,              // png 压缩等级
        spriteLevel:    60,         // sprite 压缩等级
        imgRetina:  true,           // css sprite是否支持高清屏
        sassOutputType: 'compact',  // sass 输出 css 是否压缩
        browser: ['google chrome'], // 启动浏览器种类
        testServer: {
            // 测试服务器地址，用户名，密码
            host:   '',
            user:    '',
            pass:    '',
            path:   ''
        }
        //server: {
        //    host:       'localhost',
        //    port:        '3000'
        //}

    };
    return settings;
};