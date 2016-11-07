# swinch
The best and most flexible alternative to full-page scroll-controlling javascript plugins

> There are no dependencies!!!

## Installation

1. `npm install swinch`, `bower install swinch`, `yarn add swinch`
2. Include `dist/swinch.js` or `swinch.min.js` (**uses UMD**)

## Setup

1. After the DOM loads, call `swinch.init([sections][, options])`
2. When you're done with it, you can call `swinch.destroy()`

> If no sections are set, then `document.querySelectorAll('section')` will be used by default.

## Options

```js
{
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
     * Force snap on a part of each section.
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
}
```

## Example

Checkout `test.html` for an example.
