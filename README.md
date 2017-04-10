# swinch
It's a vanilla.js page section snapper thingy

> There are no runtime dependencies!!!

> The build is dependent on the fantastic [zenscroll](https://github.com/zengabor/zenscroll) plugin!

> It's a little buggy. Check out the github issues to see what I'm talking about. After building this, I ended up using a similar jQuery plugin in my own project and never actually used this.

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
