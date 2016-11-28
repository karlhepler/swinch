var config = {
    /**
     * The duration of the snap, in milliseconds.
     * 
     * This can be overridden with the attribute "swinch-duration" on a section.
     * ex. <section swinch-duration="1000"></section>
     *
     * @type {Number}
     */
    duration: 500,

    /**
     * The offset of the snapping target.
     *
     * This can be overridden with the attribute "swinch-offset" on a section.
     * ex. <section swinch-offset="100"></section>
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
