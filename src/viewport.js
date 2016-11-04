var viewport = function viewport() {
    // Instantiate
    var _top = 0;
    var _lastTop = 0;

    return {
        /**
         * Determine if the viewport is at the top of the screen
         *
         * @return {boolean}
         */
        isAtTop: function isAtTop() {
            return _top <= 0;
        },

        /**
         * Determine if the viewport is scrolling down
         *
         * @return {boolean}
         */
        isScrollingDown: function isScrollingDown() {
            return _top > _lastTop;
        },

        /**
         * Determine if the viewport is scrolling up
         *
         * @return {boolean}
         */
        isScrollingUp: function isScrollingUp() {
            return _top < _lastTop;
        },

        /**
         * Get the height of the viewport
         *
         * @return {float}
         */
        height: function height() {
            return window.innerHeight;
        },

        /**
         * Update the top of the viewport
         *
         * @return {void}
         */
        updateTop: function updateTop() {
            _top = window.pageYOffset;
        },

        /**
         * Update the last top of the viewport
         *
         * @return {void}
         */
        updateLastTop: function updateLastTop() {
            _lastTop = window.pageYOffset;
        },

        /**
         * Get the top of the viewport
         *
         * @return {float}
         */
        top: function top() {
            return _top;
        }
    };
};
