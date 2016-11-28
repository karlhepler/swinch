var section = function section() {
    // Instantiate
    var _activeIndex = 0;
    var _lastActiveIndex = 0;

    return {
        /**
         * Get the currently-active section
         *
         * @return {Node}
         */
        active: function active() {
            return this[_activeIndex];
        },

        /**
         * Get the last active section
         *
         * @return {Node}
         */
        lastActive: function lastActive() {
            return this[_lastActiveIndex];
        },

        /**
         * Update the currently-active section
         *
         * @return {void}
         */
        updateActive: function updateActive() {
            // Don't do anything if the viewport is at the top
            if (viewport.isAtTop()) {
                return;
            }

            // Copy the active index so we don't mess it up during the loops
            var index = _activeIndex;

            // If we're scrolling down,
            // find the the first section that has its bottom below the bottom of the viewport
            if (viewport.isScrollingDown()) {
                for (index = 0; index < this.length; index++) {
                    if (this[index].getBoundingClientRect().bottom >= viewport.height()) {
                        break;
                    }
                }
            }

            // If we're scrolling up,
            // find the first section that has its top above the top of the viewport
            else if (viewport.isScrollingUp()) {
                for (index = this.length - 1; index >= 0; index--) {
                    if (this[index].getBoundingClientRect().top <= 0) {
                        break;
                    }
                }
            }

            // Set the active index, limit by the last section
            if (index >= this.length) {
                _activeIndex = this.length - 1;
            }
            else if (index <= 0) {
                _activeIndex = 0;
            }
            else {
                _activeIndex = index;
            }
        },

        /**
         * Update the last active section
         *
         * @return {void}
         */
        updateLastActive: function updateLastActive() {
            _lastActiveIndex = _activeIndex;
        },

        /**
         * Determine if the active section changed
         *
         * @return {boolean}
         */
        activeChanged: function activeChanged() {
            return _activeIndex !== _lastActiveIndex;
        }
    };

    // Return the api
    return api;
};
