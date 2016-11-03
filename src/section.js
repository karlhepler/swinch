var section = function section() {
    var activeIndex = 0;
    var lastActiveIndex = 0;

    return {
        active: function active() {
            return this[activeIndex];
        },
        lastActive: function lastActive() {
            return this[lastActiveIndex];
        },
        updateActive: function updateActive() {
            if (viewport.isAtTop()) {
                return;
            }

            var index = activeIndex;

            if (viewport.isScrollingDown()) {
                for (index = 0; index < this.length; index++) {
                    if (this[index].getBoundingClientRect().bottom > viewport.height()) {
                        break;
                    }
                }
            }
            else if (viewport.isScrollingUp()) {
                for (index = this.length - 1; index >= 0; index--) {
                    if (this[index].getBoundingClientRect().top < 0) {
                        break;
                    }
                }
            }

            activeIndex = index >= this.length ? this.length - 1 : index;
        },
        updateLastActive: function updateLastActive() {
            lastActiveIndex = activeIndex;
        },
        changed: function changed() {
            return activeIndex !== lastActiveIndex;
        }
    };
};
