/**
 * cache
 *
 * @author  willhu
 * @date    2015-09-07
 * @contact email:huweiwei1@jd.com erp:huweiwei3 qq:226297845
 */

module.exports = function (gulp, $, settings) {
    gulp.task('clear-cache', function (done) {
        return $.cache.clearAll(done);
    });
};