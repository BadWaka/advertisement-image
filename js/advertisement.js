/**
 * Created by BadWaka on 2017/3/16.
 */
(function () {
    var advertisement = {
        countDown: 5,   // 倒计时，默认5s
        $el: {},    // 要绑定的DOM
        $countDown: {}, // 倒计时span
        $skipButton: {},    // 跳过按钮
        /**
         * 初始化
         * @param $el   dom
         * @param countDown 倒计时秒数
         * @param cbItIsTimeTo  到时间的回调
         */
        init: function ($el, countDown, cbItIsTimeTo) {
            var that = this;
            // 获得DOM的引用
            this.$el = $el;
            this.$countDown = $el.querySelector('.countDown');
            this.$skipButton = $el.querySelector('btn-skip');
            // 判断倒计时是否是数字类型
            countDown = parseInt(countDown);    // 对字符串也做兼容处理
            if (typeof countDown === 'number') {    // 如果是数字的话，赋值给this.countDown
                this.countDown = countDown;
            }
            // 初始化显示
            that.$countDown.innerText = countDown;
            // 周期调用，每隔一秒显示一次倒计时
            this.interval = setInterval(function () {
                countDown--;
                that.$countDown.innerText = countDown;
            }, 1000);
            // 倒计时之后调用回调
            this.timeout = setTimeout(function () {
                clearInterval(that.interval);    // 清除周期调用
                cbItIsTimeTo(); // 调用回调
            }, this.countDown * 1000);
        },
        /**
         * 设置广告图
         * @param url
         */
        setAdImage: function (url) {
            this.$el.style.backgroundImage = 'url(' + url + ')';
        },
        /**
         * 停止倒计时
         */
        stopCountDown: function () {
            console.log('停止倒计时');
            if (this.interval) {   // 停止轮循器
                clearInterval(this.interval);
            }
            if (this.timeout) {    // 停止定时器
                clearTimeout(this.timeout);
            }
        }
    };
    window.advertisement = advertisement;
})();