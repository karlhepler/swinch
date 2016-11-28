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
         * @param  {float|Node} top
         * @param  {function}   callback
         * @param  {float}      offset
         * @param  {float}      duration
         *
         * @return {void}
         */
        scrollTo: function scrollTo(top, callback, offset, duration) {
            // Set the offset & duration - possibly custom
            var offset = offset || config.offset;
            var duration = duration || config.duration;

            // If it's a number, just scroll to that Y position
            if (typeof top === 'number') {
                window.zenscroll.toY(top + offset, duration, callback);
                return;
            }

            // Set the zenscroll target offset
            window.zenscroll.setup(duration, offset);

            // Scroll
            window.zenscroll.to(top, duration, callback);

            // Set the zenscroll target offset back to default
            window.zenscroll.setup(config.duration, config.offset);
        }
    };
};
