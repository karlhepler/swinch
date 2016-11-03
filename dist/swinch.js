;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.swinch = factory();
  }
}(this, function() {
'use strict';

function extend(target, source) {
    for (var prop in source) {
        target[prop] = source[prop];
    }
    return target;
}

function merge(target, source) {
    target = target || {};
    for (var prop in source) {
        if (typeof source[prop] === 'object') {
            target[prop] = extend(target[prop], source[prop]);
        } else {
            target[prop] = source[prop];
        }
    }
    return target;
}

var config = {
    
    /**
     * The duration of the snap, in milliseconds
     *
     * @type {Number}
     */
    duration: 500,

    /**
     * The offset of the snapping target
     *
     * @type {Number}
     */
    offset: 0,

    /**
     * Force ScrollControl to snap on a part of each section.
     *
     * null     Snap to the bottom of each section if going up & top if going down.
     * 'top'    Force snap to the top of each section
     * 'bottom' Force snap to the bottom of each section
     * 
     * @type {string|null}
     */
    snapTo: null,

    /**
     * Called before the snapping starts
     *
     * @param  {Node}   currentSection
     * @param  {Node}   nextSection
     * @param  {Object} scrollDirection {isUp: <boolean>, isDown: <boolean>}
     *
     * @return {void}
     */
    onBeforeSnap: function onBeforeSnap(currentSection, nextSection, scrollDirection) {
        //
    },

    /**
     * Called after the snapping completes
     *
     * @param  {Node}   currentSection
     * @param  {Node}   previousSection
     * @param  {Object} scrollDirection {isUp: <boolean>, isDown: <boolean>}
     *
     * @return {void}
     */
    onSnapped: function onSnapped(currentSection, previousSection, scrollDirection) {
        //
    }
};

var viewport = function viewport() {
    var top = 0;
    var lastTop = 0;

    return {
        isAtTop: function isAtTop() {},
        isScrollingDown: function isScrollingDown() {},
        isScrollingUp: function isScrollingUp() {},
        height: function height() {}
    };
};

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

var swinch = {

    /**
     * Initialize swinch & all event listeners
     *
     * @param  {NodeList} sections
     * @param  {object}   options
     *
     * @return {void}
     */
    init: function init(sections, options) {
        // Set defaults
        sections = sections || document.querySelectorAll('section');
        options = options || {};

        // Merge config with options
        merge(config, options);

        // Extend section with the given sections
        section = extend(sections, section());

        // Initialize viewport
        viewport = viewport();
    },

    /**
     * Destroy swinch & all event listeners
     *
     * @return {void}
     */
    destroy: function destroy() {
        //
    }

};

return swinch;
}));
