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
