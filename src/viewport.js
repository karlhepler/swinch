var viewport = function viewport() {
    // Instantiate
    var top;
    var lastTop;

    // Initialize
    this.updateTop();
    this.updateLastTop();

    return {
        /**
         * Determine if the viewport is at the top of the screen
         *
         * @return {boolean}
         */
        isAtTop: function isAtTop() {
            return top <= 0;
        },

        /**
         * Determine if the viewport is scrolling down
         *
         * @return {boolean}
         */
        isScrollingDown: function isScrollingDown() {
            return top > lastTop;
        },

        /**
         * Determine if the viewport is scrolling up
         *
         * @return {boolean}
         */
        isScrollingUp: function isScrollingUp() {
            return top < lastTop;
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
            top = window.pageYOffset;
        },

        /**
         * Update the last top of the viewport
         *
         * @return {void}
         */
        updateLastTop: function updateLastTop() {
            lastTop = window.pageYOffset;
        },

        /**
         * Get the top of the viewport
         *
         * @return {float}
         */
        top: function top() {
            return top;
        }
    };
};
