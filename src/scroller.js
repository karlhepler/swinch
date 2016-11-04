var scroller = function scroller() {
    // Set zenscroll defaults
    window.zenscroll.setup(config.duration, config.offset);

    return {
        /**
         * Determine if the scroller is auto-scrolling
         *
         * @return {boolean}
         */
        isAutoScrolling: function isAutoScrolling() {
            return window.zenscroll.moving();
        },

        /**
         * Scroll to the given top coordinate
         *
         * @param  {float|Node}    top
         * @param  {function} callback
         *
         * @return {void}
         */
        scrollTo: function scrollTo(top, callback) {
            if (typeof top === 'number') {
                window.zenscroll.toY(top + config.offset, config.duration, callback);
                return;
            }

            window.zenscroll.to(top, config.duration, callback);
        }
    };
};
