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

        // Extend the given sections with the section object
        section = extend(sections, section());

        // Initialize viewport
        viewport = viewport();

        // Initialize scroller
        scroller = scoller();

        // Initialize snapper
        snapper = snapper();

        // Add event listeners
        window.addEventListener('scroll', snapper.onScroll, false);
        window.addEventListener('wheel', snapper.onWheel, false);
        window.addEventListener('click', snapper.onClick, false);
    },

    /**
     * Destroy all event listeners
     *
     * @return {void}
     */
    destroy: function destroy() {
        window.removeEventListener('scroll', snapper.onScroll, false);
        window.removeEventListener('wheel', snapper.onWheel, false);
        window.removeEventListener('click', snapper.onClick, false);
    }

};
