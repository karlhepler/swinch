var snapper = function snapper() {
    return {
        /**
         * Handle the scroll event
         *
         * @param  {object} event
         *
         * @return {void}
         */
        onScroll: function onScroll(event) {
            viewport.updateTop();
            section.updateActive();

            if (isAllowedToSnap()) {
                var args = getSnapCallbackArguments();

                config.onBeforeSnap.apply(undefined, args.before);

                snapToActiveSection(function onSnapped() {
                    config.onSnapped.apply(undefined, args.after);
                });
            }

            section.updateLastActive();
            viewport.updateLastTop();
        },

        /**
         * Handle the wheel event
         *
         * @param  {object} event
         *
         * @return {void}
         */
        onWheel: function onWheel(event) {
            // Don't allow the wheel event while auto scrolling
            if (scroller.isAutoScrolling()) {
                event.preventDefault();
            }
        },

        /**
         * Handle the click event
         *
         * @param  {object} event
         *
         * @return {void}
         */
        onClick: function onClick(event) {
            var anchor = event.target;
            while (anchor && anchor.tagName !== 'A') {
                anchor = anchor.parentNode;
            }

            // Only handle links that were clicked with the primary button, without modifier keys:
            if (!anchor || event.which !== 1 || event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) {
                return;
            }

            // Get the href tag
            var href = anchor.getAttribute('href') || '';

            // Return early if it's not a tag
            if (href.indexOf('#') !== 0) {
                return;
            }

            // If it's just a tag and nothing else, then go to top
            if (href === '#') {
                event.preventDefault();
                replaceUrl('');
                scrollToWithEvents(section[0]);

                // Return early
                return;
            }

            // Get the target
            var targetId = anchor.hash.substring(1);
            var targetElem = document.getElementById(targetId);

            // If there is a target element, then go to it!
            if (targetElem) {
                event.preventDefault();
                replaceUrl('#' + targetId);
                scrollToWithEvents(targetElem);
            }
        }
    };

    ///////////////////////
    // PRIVATE FUNCTIONS //
    ///////////////////////

    /**
     * Determine if the scroller is allowed to snap
     *
     * @return {boolean}
     */
    function isAllowedToSnap() {
        return !scroller.isAutoScrolling() && section.activeChanged();
    }

    /**
     * Get the snap callback arguments
     *
     * @return {object}
     */
    function getSnapCallbackArguments() {
        var scrollDirection = {
            isUp: viewport.isScrollingUp(),
            isDown: viewport.isScrollingDown()
        };

        return {
            before: [section.lastActive(), section.active(), scrollDirection],
            after: [section.active(), section.lastActive(), scrollDirection]
        };
    }

    /**
     * Scroll to the currently-active section
     *
     * @param  {function} callback
     *
     * @return {void}
     */
    function snapToActiveSection(callback) {
        // Get the offset & duration from the element
        var offset = getOffsetFromElement(section.active());
        var duration = getDurationFromElement(section.active());

        if (config.snapTo !== 'bottom' && viewport.isScrollingDown() || config.snapTo === 'top') {
            scroller.scrollTo(
                viewport.top() + section.active().getBoundingClientRect().top,
                callback,
                offset,
                duration
            );
        }
        else if (config.snapTo !== 'top' && viewport.isScrollingUp() || config.snapTo === 'bottom') {
            scroller.scrollTo(
                viewport.top() - viewport.height() + section.active().getBoundingClientRect().bottom,
                callback,
                offset,
                duration
            );
        }
    }

    /**
     * Replace the url hash
     *
     * @param  {string} hash
     *
     * @return {void}
     */
    function replaceUrl(hash) {
        try {
            history.replaceState({}, '', window.location.href.split('#')[0] + hash);
        }
        catch (e) {
            // To avoid the Security exception in Chrome when the page was opened via the file protocol, e.g., file://index.html
        }
    } 

    /**
     * Scroll to a target with events
     *
     * @param  {Node} target
     *
     * @return {void}
     */
    function scrollToWithEvents(target) {
        // Get the offset & duration from the element
        var offset = getOffsetFromElement(target);
        var duration = getDurationFromElement(target);

        // Get the callback arguments, with a little modification
        var args = getSnapCallbackArguments();
        args.before[1] = args.after[0] = target;

        // Customize the direction based on the current & next sections
        args.before[2] = args.after[2] = {
            isUp: args.before[0].getBoundingClientRect().top > args.before[1].getBoundingClientRect().top,
            isDown: args.before[0].getBoundingClientRect().top < args.before[1].getBoundingClientRect().top
        };

        // Scroll with callbacks
        config.onBeforeSnap.apply(undefined, args.before);
        scroller.scrollTo(target, function onScrollToHash() {
            config.onSnapped.apply(undefined, args.after);
        }, offset, duration);
    }

    /**
     * Get the offset value from the given element
     *
     * @param  {mixed} elem
     *
     * @return {float|undefined}
     */
    function getOffsetFromElement(elem) {
        if (elem instanceof window.Element && elem.hasAttribute('swinch-offset')) {
            return parseFloat(elem.getAttribute('swinch-offset'));
        }

        return undefined;
    }

    /**
     * Get the duration value from the given element
     *
     * @param  {mixed} elem
     *
     * @return {float|undefined}
     */
    function getDurationFromElement(elem) {
        if (elem instanceof window.Element && elem.hasAttribute('swinch-duration')) {
            return parseFloat(elem.getAttribute('swinch-duration'));
        }

        return undefined;
    }
};
