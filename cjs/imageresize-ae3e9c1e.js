'use strict';

const resizeobserver = require('./resizeobserver-1e751ef6.js');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (resizeobserver.isObjectLike(value) && resizeobserver.baseGetTag(value) == symbolTag);
}

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (resizeobserver.isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = resizeobserver.isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return resizeobserver.root.Date.now();
};

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (resizeobserver.isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/** Error message constants. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  if (resizeobserver.isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * The dropdown panel view class.
 *
 * See {@link module:ui/dropdown/dropdownview~DropdownView} to learn about the common usage.
 *
 * @extends module:ui/view~View
 */
class DropdownPanelView extends resizeobserver.View {
	/**
	 * @inheritDoc
	 */
	constructor( locale ) {
		super( locale );

		const bind = this.bindTemplate;

		/**
		 * Controls whether the panel is visible.
		 *
		 * @observable
		 * @member {Boolean} #isVisible
		 */
		this.set( 'isVisible', false );

		/**
		 * The position of the panel, relative to the parent.
		 *
		 * This property is reflected in the CSS class set to {@link #element} that controls
		 * the position of the panel.
		 *
		 * @observable
		 * @default 'se'
		 * @member {'s'|'se'|'sw'|'sme'|'smw'|'n'|'ne'|'nw'|'nme'|'nmw'} #position
		 */
		this.set( 'position', 'se' );

		/**
		 * Collection of the child views in this panel.
		 *
		 * A common child type is the {@link module:ui/list/listview~ListView} and {@link module:ui/toolbar/toolbarview~ToolbarView}.
		 * See {@link module:ui/dropdown/utils~addListToDropdown} and
		 * {@link module:ui/dropdown/utils~addToolbarToDropdown} to learn more about child views of dropdowns.
		 *
		 * @readonly
		 * @member {module:ui/viewcollection~ViewCollection}
		 */
		this.children = this.createCollection();

		this.setTemplate( {
			tag: 'div',

			attributes: {
				class: [
					'ck',
					'ck-reset',
					'ck-dropdown__panel',
					bind.to( 'position', value => `ck-dropdown__panel_${ value }` ),
					bind.if( 'isVisible', 'ck-dropdown__panel-visible' )
				]
			},

			children: this.children,

			on: {
				// Drag and drop in the panel should not break the selection in the editor.
				// https://github.com/ckeditor/ckeditor5-ui/issues/228
				selectstart: bind.to( evt => evt.preventDefault() )
			}
		} );
	}

	/**
	 * Focuses the view element or first item in view collection on opening dropdown's panel.
	 *
	 * See also {@link module:ui/dropdown/dropdownpanelfocusable~DropdownPanelFocusable}.
	 */
	focus() {
		if ( this.children.length ) {
			this.children.first.focus();
		}
	}

	/**
	 * Focuses the view element or last item in view collection on opening dropdown's panel.
	 *
	 * See also {@link module:ui/dropdown/dropdownpanelfocusable~DropdownPanelFocusable}.
	 */
	focusLast() {
		if ( this.children.length ) {
			const lastChild = this.children.last;

			if ( typeof lastChild.focusLast === 'function' ) {
				lastChild.focusLast();
			} else {
				lastChild.focus();
			}
		}
	}
}

const dropdownArrowSvg = 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAgMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTS45NDEgNC41MjNhLjc1Ljc1IDAgMSAxIDEuMDYtMS4wNmwzLjAwNiAzLjAwNSAzLjAwNS0zLjAwNWEuNzUuNzUgMCAxIDEgMS4wNiAxLjA2bC0zLjU0OSAzLjU1YS43NS43NSAwIDAgMS0xLjE2OC0uMTM2TC45NDEgNC41MjN6Ii8+PC9zdmc+';

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * The default dropdown button view class.
 *
 *		const view = new DropdownButtonView();
 *
 *		view.set( {
 *			label: 'A button',
 *			keystroke: 'Ctrl+B',
 *			tooltip: true
 *		} );
 *
 *		view.render();
 *
 *		document.body.append( view.element );
 *
 * Also see the {@link module:ui/dropdown/utils~createDropdown `createDropdown()` util}.
 *
 * @implements module:ui/dropdown/button/dropdownbutton~DropdownButton
 * @extends module:ui/button/buttonview~ButtonView
 */
class DropdownButtonView extends resizeobserver.ButtonView {
	/**
	 * @inheritDoc
	 */
	constructor( locale ) {
		super( locale );

		/**
		 * An icon that displays arrow to indicate a dropdown button.
		 *
		 * @readonly
		 * @member {module:ui/icon/iconview~IconView}
		 */
		this.arrowView = this._createArrowView();

		this.extendTemplate( {
			attributes: {
				'aria-haspopup': true
			}
		} );

		// The DropdownButton interface expects the open event upon which will open the dropdown.
		this.delegate( 'execute' ).to( this, 'open' );
	}

	/**
	 * @inheritDoc
	 */
	render() {
		super.render();

		this.children.add( this.arrowView );
	}

	/**
	 * Creates a {@link module:ui/icon/iconview~IconView} instance as {@link #arrowView}.
	 *
	 * @private
	 * @returns {module:ui/icon/iconview~IconView}
	 */
	_createArrowView() {
		const arrowView = new resizeobserver.IconView();

		arrowView.content = dropdownArrowSvg;

		arrowView.extendTemplate( {
			attributes: {
				class: 'ck-dropdown__arrow'
			}
		} );

		return arrowView;
	}
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * The list view class.
 *
 * @extends module:ui/view~View
 * @implements module:ui/dropdown/dropdownpanelfocusable~DropdownPanelFocusable
 */
class ListView extends resizeobserver.View {
	/**
	 * @inheritDoc
	 */
	constructor() {
		super();

		/**
		 * Collection of the child list views.
		 *
		 * @readonly
		 * @member {module:ui/viewcollection~ViewCollection}
		 */
		this.items = this.createCollection();

		/**
		 * Tracks information about DOM focus in the list.
		 *
		 * @readonly
		 * @member {module:utils/focustracker~FocusTracker}
		 */
		this.focusTracker = new resizeobserver.FocusTracker();

		/**
		 * Instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
		 *
		 * @readonly
		 * @member {module:utils/keystrokehandler~KeystrokeHandler}
		 */
		this.keystrokes = new resizeobserver.KeystrokeHandler();

		/**
		 * Helps cycling over focusable {@link #items} in the list.
		 *
		 * @readonly
		 * @protected
		 * @member {module:ui/focuscycler~FocusCycler}
		 */
		this._focusCycler = new resizeobserver.FocusCycler( {
			focusables: this.items,
			focusTracker: this.focusTracker,
			keystrokeHandler: this.keystrokes,
			actions: {
				// Navigate list items backwards using the arrowup key.
				focusPrevious: 'arrowup',

				// Navigate toolbar items forwards using the arrowdown key.
				focusNext: 'arrowdown'
			}
		} );

		this.setTemplate( {
			tag: 'ul',

			attributes: {
				class: [
					'ck',
					'ck-reset',
					'ck-list'
				]
			},

			children: this.items
		} );
	}

	/**
	 * @inheritDoc
	 */
	render() {
		super.render();

		// Items added before rendering should be known to the #focusTracker.
		for ( const item of this.items ) {
			this.focusTracker.add( item.element );
		}

		this.items.on( 'add', ( evt, item ) => {
			this.focusTracker.add( item.element );
		} );

		this.items.on( 'remove', ( evt, item ) => {
			this.focusTracker.remove( item.element );
		} );

		// Start listening for the keystrokes coming from #element.
		this.keystrokes.listenTo( this.element );
	}

	/**
	 * Focuses the first focusable in {@link #items}.
	 */
	focus() {
		this._focusCycler.focusFirst();
	}

	/**
	 * Focuses the last focusable in {@link #items}.
	 */
	focusLast() {
		this._focusCycler.focusLast();
	}
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * The list item view class.
 *
 * @extends module:ui/view~View
 */
class ListItemView extends resizeobserver.View {
	/**
	 * @inheritDoc
	 */
	constructor( locale ) {
		super( locale );

		/**
		 * Collection of the child views inside of the list item {@link #element}.
		 *
		 * @readonly
		 * @member {module:ui/viewcollection~ViewCollection}
		 */
		this.children = this.createCollection();

		this.setTemplate( {
			tag: 'li',

			attributes: {
				class: [
					'ck',
					'ck-list__item'
				]
			},

			children: this.children
		} );
	}

	/**
	 * Focuses the list item.
	 */
	focus() {
		this.children.first.focus();
	}
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * The list separator view class.
 *
 * @extends module:ui/view~View
 */
class ListSeparatorView extends resizeobserver.View {
	/**
	 * @inheritDoc
	 */
	constructor( locale ) {
		super( locale );

		this.setTemplate( {
			tag: 'li',
			attributes: {
				class: [
					'ck',
					'ck-list__separator'
				]
			}
		} );
	}
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * The switch button view class.
 *
 *		const view = new SwitchButtonView();
 *
 *		view.set( {
 *			withText: true,
 *			label: 'Switch me!'
 *		} );
 *
 *		view.render();
 *
 *		document.body.append( view.element );
 *
 * @extends module:ui/button/buttonview~ButtonView
 */
class SwitchButtonView extends resizeobserver.ButtonView {
	/**
	 * @inheritDoc
	 */
	constructor( locale ) {
		super( locale );

		this.isToggleable = true;

		/**
		 * The toggle switch of the button.
		 *
		 * @readonly
		 * @member {module:ui/view~View} #toggleSwitchView
		 */
		this.toggleSwitchView = this._createToggleView();

		this.extendTemplate( {
			attributes: {
				class: 'ck-switchbutton'
			}
		} );
	}

	/**
	 * @inheritDoc
	 */
	render() {
		super.render();

		this.children.add( this.toggleSwitchView );
	}

	/**
	 * Creates a toggle child view.
	 *
	 * @private
	 * @returns {module:ui/view~View}
	 */
	_createToggleView() {
		const toggleSwitchView = new resizeobserver.View();

		toggleSwitchView.setTemplate( {
			tag: 'span',

			attributes: {
				class: [
					'ck',
					'ck-button__toggle'
				]
			},

			children: [
				{
					tag: 'span',

					attributes: {
						class: [
							'ck',
							'ck-button__toggle__inner'
						]
					}
				}
			]
		} );

		return toggleSwitchView;
	}
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A helper for creating dropdowns. It creates an instance of a {@link module:ui/dropdown/dropdownview~DropdownView dropdown},
 * with a {@link module:ui/dropdown/button/dropdownbutton~DropdownButton button},
 * {@link module:ui/dropdown/dropdownpanelview~DropdownPanelView panel} and all standard dropdown's behaviors.
 *
 * # Creating dropdowns
 *
 * By default, the default {@link module:ui/dropdown/button/dropdownbuttonview~DropdownButtonView} class is used as
 * definition of the button:
 *
 *		const dropdown = createDropdown( model );
 *
 *		// Configure dropdown's button properties:
 *		dropdown.buttonView.set( {
 *			label: 'A dropdown',
 *			withText: true
 *		} );
 *
 *		dropdown.render();
 *
 *		// Will render a dropdown labeled "A dropdown" with an empty panel.
 *		document.body.appendChild( dropdown.element );
 *
 * You can also provide other button views (they need to implement the
 * {@link module:ui/dropdown/button/dropdownbutton~DropdownButton} interface). For instance, you can use
 * {@link module:ui/dropdown/button/splitbuttonview~SplitButtonView} to create a dropdown with a split button.
 *
 *		const dropdown = createDropdown( model, SplitButtonView );
 *
 *		// Configure dropdown's button properties:
 *		dropdown.buttonView.set( {
 *			label: 'A dropdown',
 *			withText: true
 *		} );
 *
 *		dropdown.buttonView.on( 'execute', () => {
 *			// Add the behavior of the "action part" of the split button.
 *			// Split button consists of the "action part" and "arrow part".
 *			// The arrow opens the dropdown while the action part can have some other behavior.
 * 		} );
 *
 *		dropdown.render();
 *
 *		// Will render a dropdown labeled "A dropdown" with an empty panel.
 *		document.body.appendChild( dropdown.element );
 *
 * # Adding content to the dropdown's panel
 *
 * The content of the panel can be inserted directly into the `dropdown.panelView.element`:
 *
 *		dropdown.panelView.element.textContent = 'Content of the panel';
 *
 * However, most of the time you will want to add there either a {@link module:ui/list/listview~ListView list of options}
 * or a list of buttons (i.e. a {@link module:ui/toolbar/toolbarview~ToolbarView toolbar}).
 * To simplify the task, you can use, respectively, {@link module:ui/dropdown/utils~addListToDropdown} or
 * {@link module:ui/dropdown/utils~addToolbarToDropdown} utils.
 *
 * @param {module:utils/locale~Locale} locale The locale instance.
 * @param {Function} ButtonClass The dropdown button view class. Needs to implement the
 * {@link module:ui/dropdown/button/dropdownbutton~DropdownButton} interface.
 * @returns {module:ui/dropdown/dropdownview~DropdownView} The dropdown view instance.
 */
function createDropdown( locale, ButtonClass = DropdownButtonView ) {
	const buttonView = new ButtonClass( locale );

	const panelView = new DropdownPanelView( locale );
	const dropdownView = new resizeobserver.DropdownView( locale, buttonView, panelView );

	buttonView.bind( 'isEnabled' ).to( dropdownView );

	if ( buttonView instanceof DropdownButtonView ) {
		buttonView.bind( 'isOn' ).to( dropdownView, 'isOpen' );
	} else {
		buttonView.arrowView.bind( 'isOn' ).to( dropdownView, 'isOpen' );
	}

	addDefaultBehavior( dropdownView );

	return dropdownView;
}

/**
 * Adds an instance of {@link module:ui/list/listview~ListView} to a dropdown.
 *
 *		const items = new Collection();
 *
 *		items.add( {
 *			type: 'button',
 *			model: new Model( {
 *				withText: true,
 *				label: 'First item',
 *				labelStyle: 'color: red'
 *			} )
 *		} );
 *
 *		items.add( {
 *			 type: 'button',
 *			 model: new Model( {
 *				withText: true,
 *				label: 'Second item',
 *				labelStyle: 'color: green',
 *				class: 'foo'
 *			} )
 *		} );
 *
 *		const dropdown = createDropdown( locale );
 *
 *		addListToDropdown( dropdown, items );
 *
 *		// Will render a dropdown with a list in the panel containing two items.
 *		dropdown.render()
 *		document.body.appendChild( dropdown.element );
 *
 * The `items` collection passed to this methods controls the presence and attributes of respective
 * {@link module:ui/list/listitemview~ListItemView list items}.
 *
 *
 * See {@link module:ui/dropdown/utils~createDropdown} and {@link module:list/list~List}.
 *
 * @param {module:ui/dropdown/dropdownview~DropdownView} dropdownView A dropdown instance to which `ListVIew` will be added.
 * @param {Iterable.<module:ui/dropdown/utils~ListDropdownItemDefinition>} items
 * A collection of the list item definitions to populate the list.
 */
function addListToDropdown( dropdownView, items ) {
	const locale = dropdownView.locale;
	const listView = dropdownView.listView = new ListView( locale );

	listView.items.bindTo( items ).using( ( { type, model } ) => {
		if ( type === 'separator' ) {
			return new ListSeparatorView( locale );
		} else if ( type === 'button' || type === 'switchbutton' ) {
			const listItemView = new ListItemView( locale );
			let buttonView;

			if ( type === 'button' ) {
				buttonView = new resizeobserver.ButtonView( locale );
			} else {
				buttonView = new SwitchButtonView( locale );
			}

			// Bind all model properties to the button view.
			buttonView.bind( ...Object.keys( model ) ).to( model );
			buttonView.delegate( 'execute' ).to( listItemView );

			listItemView.children.add( buttonView );

			return listItemView;
		}
	} );

	dropdownView.panelView.children.add( listView );

	listView.items.delegate( 'execute' ).to( dropdownView );
}

// Add a set of default behaviors to dropdown view.
//
// @param {module:ui/dropdown/dropdownview~DropdownView} dropdownView
function addDefaultBehavior( dropdownView ) {
	closeDropdownOnBlur( dropdownView );
	closeDropdownOnExecute( dropdownView );
	focusDropdownContentsOnArrows( dropdownView );
}

// Adds a behavior to a dropdownView that closes opened dropdown when user clicks outside the dropdown.
//
// @param {module:ui/dropdown/dropdownview~DropdownView} dropdownView
function closeDropdownOnBlur( dropdownView ) {
	dropdownView.on( 'render', () => {
		resizeobserver.clickOutsideHandler( {
			emitter: dropdownView,
			activator: () => dropdownView.isOpen,
			callback: () => {
				dropdownView.isOpen = false;
			},
			contextElements: [ dropdownView.element ]
		} );
	} );
}

// Adds a behavior to a dropdownView that closes the dropdown view on "execute" event.
//
// @param {module:ui/dropdown/dropdownview~DropdownView} dropdownView
function closeDropdownOnExecute( dropdownView ) {
	// Close the dropdown when one of the list items has been executed.
	dropdownView.on( 'execute', evt => {
		// Toggling a switch button view should not close the dropdown.
		if ( evt.source instanceof SwitchButtonView ) {
			return;
		}

		dropdownView.isOpen = false;
	} );
}

// Adds a behavior to a dropdownView that focuses the dropdown's panel view contents on keystrokes.
//
// @param {module:ui/dropdown/dropdownview~DropdownView} dropdownView
function focusDropdownContentsOnArrows( dropdownView ) {
	// If the dropdown panel is already open, the arrow down key should focus the first child of the #panelView.
	dropdownView.keystrokes.set( 'arrowdown', ( data, cancel ) => {
		if ( dropdownView.isOpen ) {
			dropdownView.panelView.focus();
			cancel();
		}
	} );

	// If the dropdown panel is already open, the arrow up key should focus the last child of the #panelView.
	dropdownView.keystrokes.set( 'arrowup', ( data, cancel ) => {
		if ( dropdownView.isOpen ) {
			dropdownView.panelView.focusLast();
			cancel();
		}
	} );
}

/**
 * A definition of the list item used by the {@link module:ui/dropdown/utils~addListToDropdown}
 * utility.
 *
 * @typedef {Object} module:ui/dropdown/utils~ListDropdownItemDefinition
 *
 * @property {String} type Either `'separator'`, `'button'` or `'switchbutton'`.
 * @property {module:ui/model~Model} [model] Model of the item (when **not** `'separator'`).
 * Its properties fuel the newly created list item (or its children, depending on the `type`).
 */

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * The image resize command. Currently, it only supports the width attribute.
 *
 * @extends module:core/command~Command
 */
class ImageResizeCommand extends resizeobserver.Command {
	/**
	 * @inheritDoc
	 */
	refresh() {
		const element = this.editor.model.document.selection.getSelectedElement();

		this.isEnabled = resizeobserver.isImage( element );

		if ( !element || !element.hasAttribute( 'width' ) ) {
			this.value = null;
		} else {
			this.value = {
				width: element.getAttribute( 'width' ),
				height: null
			};
		}
	}

	/**
	 * Executes the command.
	 *
	 *		// Sets the width to 50%:
	 *		editor.execute( 'imageResize', { width: '50%' } );
	 *
	 *		// Removes the width attribute:
	 *		editor.execute( 'imageResize', { width: null } );
	 *
	 * @param {Object} options
	 * @param {String|null} options.width The new width of the image.
	 * @fires execute
	 */
	execute( options ) {
		const model = this.editor.model;
		const imageElement = model.document.selection.getSelectedElement();

		this.value = {
			width: options.width,
			height: null
		};

		if ( imageElement ) {
			model.change( writer => {
				writer.setAttribute( 'width', options.width, imageElement );
			} );
		}
	}
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * The image resize editing feature.
 *
 * It adds the ability to resize each image using handles or manually by
 * {@link module:image/imageresize/imageresizebuttons~ImageResizeButtons} buttons.
 *
 * @extends module:core/plugin~Plugin
 */
class ImageResizeEditing extends resizeobserver.Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'ImageResizeEditing';
	}

	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
		super( editor );

		editor.config.define( 'image', {
			resizeUnit: '%',
			resizeOptions: [ {
				name: 'imageResize:original',
				value: null,
				icon: 'original'
			},
			{
				name: 'imageResize:25',
				value: '25',
				icon: 'small'
			},
			{
				name: 'imageResize:50',
				value: '50',
				icon: 'medium'
			},
			{
				name: 'imageResize:75',
				value: '75',
				icon: 'large'
			} ]
		} );
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const command = new ImageResizeCommand( editor );

		this._registerSchema();
		this._registerConverters();

		editor.commands.add( 'imageResize', command );
	}

	/**
	 * @private
	 */
	_registerSchema() {
		this.editor.model.schema.extend( 'image', { allowAttributes: 'width' } );
		this.editor.model.schema.setAttributeProperties( 'width', {
			isFormatting: true
		} );
	}

	/**
	 * Registers image resize converters.
	 *
	 * @private
	 */
	_registerConverters() {
		const editor = this.editor;

		// Dedicated converter to propagate image's attribute to the img tag.
		editor.conversion.for( 'downcast' ).add( dispatcher =>
			dispatcher.on( 'attribute:width:image', ( evt, data, conversionApi ) => {
				if ( !conversionApi.consumable.consume( data.item, evt.name ) ) {
					return;
				}

				const viewWriter = conversionApi.writer;
				const figure = conversionApi.mapper.toViewElement( data.item );

				if ( data.attributeNewValue !== null ) {
					viewWriter.setStyle( 'width', data.attributeNewValue, figure );
					viewWriter.addClass( 'image_resized', figure );
				} else {
					viewWriter.removeStyle( 'width', figure );
					viewWriter.removeClass( 'image_resized', figure );
				}
			} )
		);

		editor.conversion.for( 'upcast' )
			.attributeToAttribute( {
				view: {
					name: 'figure',
					styles: {
						width: /.+/
					}
				},
				model: {
					key: 'width',
					value: viewElement => viewElement.getStyle( 'width' )
				}
			} );
	}
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * The base MVC model class.
 *
 * @mixes module:utils/observablemixin~ObservableMixin
 */
class Model {
	/**
	 * Creates a new Model instance.
	 *
	 * @param {Object} [attributes] The model state attributes to be defined during the instance creation.
	 * @param {Object} [properties] The (out of state) properties to be appended to the instance during creation.
	 */
	constructor( attributes, properties ) {
		// Extend this instance with the additional (out of state) properties.
		if ( properties ) {
			resizeobserver.assignIn( this, properties );
		}

		// Initialize the attributes.
		if ( attributes ) {
			this.set( attributes );
		}
	}
}

resizeobserver.mix( Model, resizeobserver.ObservableMixin );

const objectSizeSmallSvg = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggZD0iTTIuNSAxN3YxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6TTEgMTUuNXYxSDB2LTFoMXptMTkgMHYxaC0xdi0xaDF6bS0xOS0ydjFIMHYtMWgxem0xOSAwdjFoLTF2LTFoMXptLTE5LTJ2MUgwdi0xaDF6bTE5IDB2MWgtMXYtMWgxem0tMTktMnYxSDB2LTFoMXptMTkgMHYxaC0xdi0xaDF6bS0xOS0ydjFIMHYtMWgxem0xOSAwdjFoLTF2LTFoMXptLTE5LTJ2MUgwdi0xaDF6bTE5IDB2MWgtMXYtMWgxem0wLTJ2MWgtMXYtMWgxem0tMTkgMHYxSDB2LTFoMXpNMTQuNSAydjFoLTFWMmgxem0yIDB2MWgtMVYyaDF6bTIgMHYxaC0xVjJoMXptLTggMHYxaC0xVjJoMXptLTIgMHYxaC0xVjJoMXptLTIgMHYxaC0xVjJoMXptLTIgMHYxaC0xVjJoMXptOCAwdjFoLTFWMmgxem0tMTAgMHYxaC0xVjJoMXoiLz48cGF0aCBkPSJNNyAxMEgyYTIgMiAwIDAgMC0yIDJ2NGEyIDIgMCAwIDAgMiAyaDVhMiAyIDAgMCAwIDItMnYtNGEyIDIgMCAwIDAtMi0yem0wIDEuNWEuNS41IDAgMCAxIC41LjV2NGEuNS41IDAgMCAxLS41LjVIMmEuNS41IDAgMCAxLS41LS41di00YS41LjUgMCAwIDEgLjUtLjVoNXoiLz48L3N2Zz4=';

const objectSizeMediumSvg = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggZD0iTTIuNSAxN3YxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6TTEgMTUuNXYxSDB2LTFoMXptMTkgMHYxaC0xdi0xaDF6bS0xOS0ydjFIMHYtMWgxem0xOSAwdjFoLTF2LTFoMXptLTE5LTJ2MUgwdi0xaDF6bTE5IDB2MWgtMXYtMWgxem0tMTktMnYxSDB2LTFoMXptMTkgMHYxaC0xdi0xaDF6bS0xOS0ydjFIMHYtMWgxem0xOSAwdjFoLTF2LTFoMXptLTE5LTJ2MUgwdi0xaDF6bTE5IDB2MWgtMXYtMWgxem0wLTJ2MWgtMXYtMWgxem0tMTkgMHYxSDB2LTFoMXpNMTQuNSAydjFoLTFWMmgxem0yIDB2MWgtMVYyaDF6bTIgMHYxaC0xVjJoMXptLTggMHYxaC0xVjJoMXptLTIgMHYxaC0xVjJoMXptLTIgMHYxaC0xVjJoMXptLTIgMHYxaC0xVjJoMXptOCAwdjFoLTFWMmgxem0tMTAgMHYxaC0xVjJoMXoiLz48cGF0aCBkPSJNMTAgOEgyYTIgMiAwIDAgMC0yIDJ2NmEyIDIgMCAwIDAgMiAyaDhhMiAyIDAgMCAwIDItMnYtNmEyIDIgMCAwIDAtMi0yem0wIDEuNWEuNS41IDAgMCAxIC41LjV2NmEuNS41IDAgMCAxLS41LjVIMmEuNS41IDAgMCAxLS41LS41di02YS41LjUgMCAwIDEgLjUtLjVoOHoiLz48L3N2Zz4=';

const objectSizeLargeSvg = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggZD0iTTIuNSAxN3YxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6TTEgMTUuNXYxSDB2LTFoMXptMTkgMHYxaC0xdi0xaDF6bS0xOS0ydjFIMHYtMWgxem0xOSAwdjFoLTF2LTFoMXptLTE5LTJ2MUgwdi0xaDF6bTE5IDB2MWgtMXYtMWgxem0tMTktMnYxSDB2LTFoMXptMTkgMHYxaC0xdi0xaDF6bS0xOS0ydjFIMHYtMWgxem0xOSAwdjFoLTF2LTFoMXptLTE5LTJ2MUgwdi0xaDF6bTE5IDB2MWgtMXYtMWgxem0wLTJ2MWgtMXYtMWgxem0tMTkgMHYxSDB2LTFoMXpNMTQuNSAydjFoLTFWMmgxem0yIDB2MWgtMVYyaDF6bTIgMHYxaC0xVjJoMXptLTggMHYxaC0xVjJoMXptLTIgMHYxaC0xVjJoMXptLTIgMHYxaC0xVjJoMXptLTIgMHYxaC0xVjJoMXptOCAwdjFoLTFWMmgxem0tMTAgMHYxaC0xVjJoMXoiLz48cGF0aCBkPSJNMTMgNkgyYTIgMiAwIDAgMC0yIDJ2OGEyIDIgMCAwIDAgMiAyaDExYTIgMiAwIDAgMCAyLTJWOGEyIDIgMCAwIDAtMi0yem0wIDEuNWEuNS41IDAgMCAxIC41LjV2OGEuNS41IDAgMCAxLS41LjVIMmEuNS41IDAgMCAxLS41LS41VjhhLjUuNSAwIDAgMSAuNS0uNWgxMXoiLz48L3N2Zz4=';

const objectSizeFullSvg = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggZD0iTTIuNSAxN3YxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6bTIgMHYxaC0xdi0xaDF6TTEgMTUuNXYxSDB2LTFoMXptMTkgMHYxaC0xdi0xaDF6bS0xOS0ydjFIMHYtMWgxem0xOSAwdjFoLTF2LTFoMXptLTE5LTJ2MUgwdi0xaDF6bTE5IDB2MWgtMXYtMWgxem0tMTktMnYxSDB2LTFoMXptMTkgMHYxaC0xdi0xaDF6bS0xOS0ydjFIMHYtMWgxem0xOSAwdjFoLTF2LTFoMXptLTE5LTJ2MUgwdi0xaDF6bTE5IDB2MWgtMXYtMWgxem0wLTJ2MWgtMXYtMWgxem0tMTkgMHYxSDB2LTFoMXpNMTQuNSAydjFoLTFWMmgxem0yIDB2MWgtMVYyaDF6bTIgMHYxaC0xVjJoMXptLTggMHYxaC0xVjJoMXptLTIgMHYxaC0xVjJoMXptLTIgMHYxaC0xVjJoMXptLTIgMHYxaC0xVjJoMXptOCAwdjFoLTFWMmgxem0tMTAgMHYxaC0xVjJoMXoiLz48cGF0aCBkPSJNMTguMDk1IDJIMS45MDVDLjg1MyAyIDAgMi44OTUgMCA0djEyYzAgMS4xMDUuODUzIDIgMS45MDUgMmgxNi4xOUMxOS4xNDcgMTggMjAgMTcuMTA1IDIwIDE2VjRjMC0xLjEwNS0uODUzLTItMS45MDUtMnptMCAxLjVjLjI2MyAwIC40NzYuMjI0LjQ3Ni41djEyYzAgLjI3Ni0uMjEzLjUtLjQ3Ni41SDEuOTA1YS40ODkuNDg5IDAgMCAxLS40NzYtLjVWNGMwLS4yNzYuMjEzLS41LjQ3Ni0uNWgxNi4xOXoiLz48L3N2Zz4=';

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

const RESIZE_ICONS = {
	small: objectSizeSmallSvg,
	medium: objectSizeMediumSvg,
	large: objectSizeLargeSvg,
	original: objectSizeFullSvg
};

/**
 * The image resize buttons plugin.
 *
 * It adds a possibility to resize images using the toolbar dropdown or individual buttons, depending on the plugin configuration.
 *
 * @extends module:core/plugin~Plugin
 */
class ImageResizeButtons extends resizeobserver.Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ ImageResizeEditing ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'ImageResizeButtons';
	}

	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
		super( editor );

		/**
		 * The resize unit.
		 *
		 * @readonly
		 * @private
		 * @type {module:image/image~ImageConfig#resizeUnit}
		 * @default '%'
		 */
		this._resizeUnit = editor.config.get( 'image.resizeUnit' );
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const options = editor.config.get( 'image.resizeOptions' );
		const command = editor.commands.get( 'imageResize' );

		this.bind( 'isEnabled' ).to( command );

		for ( const option of options ) {
			this._registerImageResizeButton( option );
		}

		this._registerImageResizeDropdown( options );
	}

	/**
	 * A helper function that creates a standalone button component for the plugin.
	 *
	 * @private
	 * @param {module:image/imageresize/imageresizebuttons~ImageResizeOption} resizeOption A model of the resize option.
	 */
	_registerImageResizeButton( option ) {
		const editor = this.editor;
		const { name, value, icon } = option;
		const optionValueWithUnit = value ? value + this._resizeUnit : null;

		editor.ui.componentFactory.add( name, locale => {
			const button = new resizeobserver.ButtonView( locale );
			const command = editor.commands.get( 'imageResize' );
			const labelText = this._getOptionLabelValue( option, true );

			if ( !RESIZE_ICONS[ icon ] ) {
				/**
				 * When configuring {@link module:image/image~ImageConfig#resizeOptions `config.image.resizeOptions`} for standalone
				 * buttons, a valid `icon` token must be set for each option.
				 *
				 * See all valid options described in the
				 * {@link module:image/imageresize/imageresizebuttons~ImageResizeOption plugin configuration}.
				 *
				 * @error imageresizebuttons-missing-icon
				 * @param {module:image/imageresize/imageresizebuttons~ImageResizeOption} option Invalid image resize option.
				*/
				throw new resizeobserver.CKEditorError(
					'imageresizebuttons-missing-icon',
					editor,
					option
				);
			}

			button.set( {
				// Use the `label` property for a verbose description (because of ARIA).
				label: labelText,
				icon: RESIZE_ICONS[ icon ],
				tooltip: labelText,
				isToggleable: true
			} );

			// Bind button to the command.
			button.bind( 'isEnabled' ).to( this );
			button.bind( 'isOn' ).to( command, 'value', getIsOnButtonCallback( optionValueWithUnit ) );

			this.listenTo( button, 'execute', () => {
				editor.execute( 'imageResize', { width: optionValueWithUnit } );
			} );

			return button;
		} );
	}

	/**
	 * A helper function that creates a dropdown component for the plugin containing all the resize options defined in
	 * the editor configuration.
	 *
	 * @private
	 * @param {Array.<module:image/imageresize/imageresizebuttons~ImageResizeOption>} options An array of configured options.
	 */
	_registerImageResizeDropdown( options ) {
		const editor = this.editor;
		const t = editor.t;
		const originalSizeOption = options.find( option => !option.value );

		// Register dropdown.
		editor.ui.componentFactory.add( 'imageResize', locale => {
			const command = editor.commands.get( 'imageResize' );
			const dropdownView = createDropdown( locale, DropdownButtonView );
			const dropdownButton = dropdownView.buttonView;

			dropdownButton.set( {
				tooltip: t( 'Resize image' ),
				commandValue: originalSizeOption.value,
				icon: objectSizeMediumSvg,
				isToggleable: true,
				label: this._getOptionLabelValue( originalSizeOption ),
				withText: true,
				class: 'ck-resize-image-button'
			} );

			dropdownButton.bind( 'label' ).to( command, 'value', commandValue => {
				if ( commandValue && commandValue.width ) {
					return commandValue.width;
				} else {
					return this._getOptionLabelValue( originalSizeOption );
				}
			} );
			dropdownView.bind( 'isOn' ).to( command );
			dropdownView.bind( 'isEnabled' ).to( this );

			addListToDropdown( dropdownView, this._getResizeDropdownListItemDefinitions( options, command ) );

			dropdownView.listView.ariaLabel = t( 'Image resize list' );

			// Execute command when an item from the dropdown is selected.
			this.listenTo( dropdownView, 'execute', evt => {
				editor.execute( evt.source.commandName, { width: evt.source.commandValue } );
				editor.editing.view.focus();
			} );

			return dropdownView;
		} );
	}

	/**
	 * A helper function for creating an option label value string.
	 *
	 * @private
	 * @param {module:image/imageresize/imageresizebuttons~ImageResizeOption} option A resize option object.
	 * @param {Boolean} [forTooltip] An optional flag for creating a tooltip label.
	 * @returns {String} A user-defined label combined from the numeric value and the resize unit or the default label
	 * for reset options (`Original`).
	 */
	_getOptionLabelValue( option, forTooltip ) {
		const t = this.editor.t;

		if ( option.label ) {
			return option.label;
		} else if ( forTooltip ) {
			if ( option.value ) {
				return t( 'Resize image to %0', option.value + this._resizeUnit );
			} else {
				return t( 'Resize image to the original size' );
			}
		} else {
			if ( option.value ) {
				return option.value + this._resizeUnit;
			} else {
				return t( 'Original' );
			}
		}
	}

	/**
	 * A helper function that parses the resize options and returns list item definitions ready for use in the dropdown.
	 *
	 * @private
	 * @param {Array.<module:image/imageresize/imageresizebuttons~ImageResizeOption>} options The resize options.
	 * @param {module:image/imageresize/imageresizecommand~ImageResizeCommand} command The resize image command.
	 * @returns {Iterable.<module:ui/dropdown/utils~ListDropdownItemDefinition>} Dropdown item definitions.
	 */
	_getResizeDropdownListItemDefinitions( options, command ) {
		const itemDefinitions = new resizeobserver.Collection();

		options.map( option => {
			const optionValueWithUnit = option.value ? option.value + this._resizeUnit : null;
			const definition = {
				type: 'button',
				model: new Model( {
					commandName: 'imageResize',
					commandValue: optionValueWithUnit,
					label: this._getOptionLabelValue( option ),
					withText: true,
					icon: null
				} )
			};

			definition.model.bind( 'isOn' ).to( command, 'value', getIsOnButtonCallback( optionValueWithUnit ) );

			itemDefinitions.add( definition );
		} );

		return itemDefinitions;
	}
}

// A helper function for setting the `isOn` state of buttons in value bindings.
function getIsOnButtonCallback( value ) {
	return commandValue => {
		if ( value === null && commandValue === value ) {
			return true;
		}

		return commandValue && commandValue.width === value;
	};
}

/**
 * The image resize option used in the {@link module:image/image~ImageConfig#resizeOptions image resize configuration}.
 *
 * @typedef {Object} module:image/imageresize/imageresizebuttons~ImageResizeOption
 * @property {String} name The name of the UI component that changes the image size.
 * * If you configure the feature using individual resize buttons, you can refer to this name in the
 * {@link module:image/image~ImageConfig#toolbar image toolbar configuration}.
 * * If you configure the feature using the resize dropdown, this name will be used for a list item in the dropdown.
 * @property {String} value The value of the resize option without the unit
 * ({@link module:image/image~ImageConfig#resizeUnit configured separately}). `null` resets an image to its original size.
 * @property {String} [resizeOptions.icon] An icon used by an individual resize button (see the `name` property to learn more).
 * Available icons are: `'small'`, `'medium'`, `'large'`, `'original'`.
 * @property {String} [label] An option label displayed in the dropdown or, if the feature is configured using
 * individual buttons, a {@link module:ui/button/buttonview~ButtonView#tooltip} and an ARIA attribute of a button.
 * If not specified, the label is generated automatically based on the `value` option and the
 * {@link module:image/image~ImageConfig#resizeUnit `config.image.resizeUnit`}.
 */

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module utils/comparearrays
 */

/**
 * Compares how given arrays relate to each other. One array can be: same as another array, prefix of another array
 * or completely different. If arrays are different, first index at which they differ is returned. Otherwise,
 * a flag specifying the relation is returned. Flags are negative numbers, so whenever a number >= 0 is returned
 * it means that arrays differ.
 *
 *		compareArrays( [ 0, 2 ], [ 0, 2 ] );		// 'same'
 *		compareArrays( [ 0, 2 ], [ 0, 2, 1 ] );		// 'prefix'
 *		compareArrays( [ 0, 2 ], [ 0 ] );			// 'extension'
 *		compareArrays( [ 0, 2 ], [ 1, 2 ] );		// 0
 *		compareArrays( [ 0, 2 ], [ 0, 1 ] );		// 1
 *
 * @param {Array} a Array that is compared.
 * @param {Array} b Array to compare with.
 * @returns {module:utils/comparearrays~ArrayRelation} How array `a` is related to `b`.
 */
function compareArrays( a, b ) {
	const minLen = Math.min( a.length, b.length );

	for ( let i = 0; i < minLen; i++ ) {
		if ( a[ i ] != b[ i ] ) {
			// The arrays are different.
			return i;
		}
	}

	// Both arrays were same at all points.
	if ( a.length == b.length ) {
		// If their length is also same, they are the same.
		return 'same';
	} else if ( a.length < b.length ) {
		// Compared array is shorter so it is a prefix of the other array.
		return 'prefix';
	} else {
		// Compared array is longer so it is an extension of the other array.
		return 'extension';
	}
}

/**
 * @typedef {'extension'|'same'|'prefix'} module:utils/comparearrays~ArrayRelation
 */

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Stores the internal state of a single resizable object.
 *
 */
class ResizeState {
	/**
	 * @param {module:widget/widgetresize~ResizerOptions} options Resizer options.
	 */
	constructor( options ) {
		/**
		 * The original width (pixels) of the resized object when the resize process was started.
		 *
		 * @readonly
		 * @member {Number} #originalWidth
		 */

		/**
		 * The original height (pixels) of the resized object when the resize process was started.
		 *
		 * @readonly
		 * @member {Number} #originalHeight
		 */

		/**
		 * The original width (percents) of the resized object when the resize process was started.
		 *
		 * @readonly
		 * @member {Number} #originalWidthPercents
		 */

		/**
		 * The position of the handle that initiated the resizing. E.g. `"top-left"`, `"bottom-right"` etc. or `null`
		 * if unknown.
		 *
		 * @readonly
		 * @observable
		 * @member {String|null} #activeHandlePosition
		 */
		this.set( 'activeHandlePosition', null );

		/**
		 * The width (percents) proposed, but not committed yet, in the current resize process.
		 *
		 * @readonly
		 * @observable
		 * @member {Number|null} #proposedWidthPercents
		 */
		this.set( 'proposedWidthPercents', null );

		/**
		 * The width (pixels) proposed, but not committed yet, in the current resize process.
		 *
		 * @readonly
		 * @observable
		 * @member {Number|null} #proposedWidthPixels
		 */
		this.set( 'proposedWidth', null );

		/**
		 * The height (pixels) proposed, but not committed yet, in the current resize process.
		 *
		 * @readonly
		 * @observable
		 * @member {Number|null} #proposedHeightPixels
		 */
		this.set( 'proposedHeight', null );

		this.set( 'proposedHandleHostWidth', null );
		this.set( 'proposedHandleHostHeight', null );

		/**
		 * A width to height ratio of the resized image.
		 *
		 * @readonly
		 * @member {Number} #aspectRatio
		 */

		/**
		 * @private
		 * @type {module:widget/widgetresize~ResizerOptions}
		 */
		this._options = options;

		/**
		 * The reference point of the resizer where the dragging started. It is used to measure the distance the user cursor
		 * traveled, so how much the image should be enlarged.
		 * This information is only known after the DOM was rendered, so it will be updated later.
		 *
		 * @private
		 * @type {Object}
		 */
		this._referenceCoordinates = null;
	}

	/**
	 *
	 * @param {HTMLElement} domResizeHandle The handle used to calculate the reference point.
	 * @param {HTMLElement} domHandleHost
	 * @param {HTMLElement} domResizeHost
	 */
	begin( domResizeHandle, domHandleHost, domResizeHost ) {
		const clientRect = new resizeobserver.Rect( domHandleHost );

		this.activeHandlePosition = getHandlePosition( domResizeHandle );

		this._referenceCoordinates = getAbsoluteBoundaryPoint( domHandleHost, getOppositePosition( this.activeHandlePosition ) );

		this.originalWidth = clientRect.width;
		this.originalHeight = clientRect.height;

		this.aspectRatio = clientRect.width / clientRect.height;

		const widthStyle = domResizeHost.style.width;

		if ( widthStyle && widthStyle.match( /^\d+\.?\d*%$/ ) ) {
			this.originalWidthPercents = parseFloat( widthStyle );
		} else {
			this.originalWidthPercents = calculateHostPercentageWidth( domResizeHost, clientRect );
		}
	}

	update( newSize ) {
		this.proposedWidth = newSize.width;
		this.proposedHeight = newSize.height;
		this.proposedWidthPercents = newSize.widthPercents;

		this.proposedHandleHostWidth = newSize.handleHostWidth;
		this.proposedHandleHostHeight = newSize.handleHostHeight;
	}
}

resizeobserver.mix( ResizeState, resizeobserver.ObservableMixin );

// Calculates a relative width of a `domResizeHost` compared to it's parent in percents.
//
// @private
// @param {HTMLElement} domResizeHost
// @param {module:utils/dom/rect~Rect} resizeHostRect
// @returns {Number}
function calculateHostPercentageWidth( domResizeHost, resizeHostRect ) {
	const domResizeHostParent = domResizeHost.parentElement;
	// Need to use computed style as it properly excludes parent's paddings from the returned value.
	const parentWidth = parseFloat( domResizeHostParent.ownerDocument.defaultView.getComputedStyle( domResizeHostParent ).width );

	return resizeHostRect.width / parentWidth * 100;
}

// Returns coordinates of the top-left corner of an element, relative to the document's top-left corner.
//
// @private
// @param {HTMLElement} element
// @param {String} resizerPosition The position of the resize handle, e.g. `"top-left"`, `"bottom-right"`.
// @returns {Object} return
// @returns {Number} return.x
// @returns {Number} return.y
function getAbsoluteBoundaryPoint( element, resizerPosition ) {
	const elementRect = new resizeobserver.Rect( element );
	const positionParts = resizerPosition.split( '-' );
	const ret = {
		x: positionParts[ 1 ] == 'right' ? elementRect.right : elementRect.left,
		y: positionParts[ 0 ] == 'bottom' ? elementRect.bottom : elementRect.top
	};

	ret.x += element.ownerDocument.defaultView.scrollX;
	ret.y += element.ownerDocument.defaultView.scrollY;

	return ret;
}

// @private
// @param {String} resizerPosition The expected resizer position, like `"top-left"`, `"bottom-right"`.
// @returns {String} A prefixed HTML class name for the resizer element.
function getResizerHandleClass( resizerPosition ) {
	return `ck-widget__resizer__handle-${ resizerPosition }`;
}

// Determines the position of a given resize handle.
//
// @private
// @param {HTMLElement} domHandle Handle used to calculate the reference point.
// @returns {String|undefined} Returns a string like `"top-left"` or `undefined` if not matched.
function getHandlePosition( domHandle ) {
	const resizerPositions = [ 'top-left', 'top-right', 'bottom-right', 'bottom-left' ];

	for ( const position of resizerPositions ) {
		if ( domHandle.classList.contains( getResizerHandleClass( position ) ) ) {
			return position;
		}
	}
}

// @private
// @param {String} position Like `"top-left"`.
// @returns {String} Inverted `position`, e.g. it returns `"bottom-right"` if `"top-left"` was given as `position`.
function getOppositePosition( position ) {
	const parts = position.split( '-' );
	const replacements = {
		top: 'bottom',
		bottom: 'top',
		left: 'right',
		right: 'left'
	};

	return `${ replacements[ parts[ 0 ] ] }-${ replacements[ parts[ 1 ] ] }`;
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Represents a resizer for a single resizable object.
 *
 * @mixes module:utils/observablemixin~ObservableMixin
 */
class Resizer {
	/**
	 * @param {module:widget/widgetresize~ResizerOptions} options Resizer options.
	 */
	constructor( options ) {
		/**
		 * Stores the state of the resizable host geometry, such as the original width, the currently proposed height, etc.
		 *
		 * Note that a new state is created for each resize transaction.
		 *
		 * @readonly
		 * @member {module:widget/widgetresize/resizerstate~ResizerState} #state
		 */

		/**
		 * A view displaying the proposed new element size during the resizing.
		 *
		 * @protected
		 * @readonly
		 * @member {module:widget/widgetresize/resizer~SizeView} #_sizeUI
		 */

		/**
		 * Options passed to the {@link #constructor}.
		 *
		 * @private
		 * @type {module:widget/widgetresize~ResizerOptions}
		 */
		this._options = options;

		/**
		 * Container of the entire resize UI.
		 *
		 * Note that this property is initialized only after the element bound with the resizer is drawn
		 * so it will be a `null` when uninitialized.
		 *
		 * @private
		 * @type {HTMLElement|null}
		 */
		this._domResizerWrapper = null;

		/**
		 * A wrapper that is controlled by the resizer. This is usually a widget element.
		 *
		 * @private
		 * @type {module:engine/view/element~Element|null}
		 */
		this._viewResizerWrapper = null;

		/**
		 * The width of the resized {@link module:widget/widgetresize~ResizerOptions#viewElement viewElement} before the resizing started.
		 *
		 * @private
		 * @member {Number|String|undefined} #_initialViewWidth
		 */

		/**
		 * @observable
		 */
		this.set( 'isEnabled', true );

		this.decorate( 'begin' );
		this.decorate( 'cancel' );
		this.decorate( 'commit' );
		this.decorate( 'updateSize' );

		this.on( 'commit', event => {
			// State might not be initialized yet. In this case, prevent further handling and make sure that the resizer is
			// cleaned up (#5195).
			if ( !this.state.proposedWidth && !this.state.proposedWidthPercents ) {
				this._cleanup();
				event.stop();
			}
		}, { priority: 'high' } );

		this.on( 'change:isEnabled', () => {
			// We should redraw the resize handles when the plugin is enabled again.
			// Otherwise they won't show up.
			if ( this.isEnabled ) {
				this.redraw();
			}
		} );
	}

	/**
	 * Attaches the resizer to the DOM.
	 */
	attach() {
		const that = this;
		const widgetElement = this._options.viewElement;
		const editingView = this._options.editor.editing.view;

		editingView.change( writer => {
			const viewResizerWrapper = writer.createUIElement( 'div', {
				class: 'ck ck-reset_all ck-widget__resizer'
			}, function( domDocument ) {
				const domElement = this.toDomElement( domDocument );

				that._appendHandles( domElement );
				that._appendSizeUI( domElement );

				that._domResizerWrapper = domElement;

				that.on( 'change:isEnabled', ( evt, propName, newValue ) => {
					domElement.style.display = newValue ? '' : 'none';
				} );

				domElement.style.display = that.isEnabled ? '' : 'none';

				return domElement;
			} );

			// Append the resizer wrapper to the widget's wrapper.
			writer.insert( writer.createPositionAt( widgetElement, 'end' ), viewResizerWrapper );
			writer.addClass( 'ck-widget_with-resizer', widgetElement );

			this._viewResizerWrapper = viewResizerWrapper;
		} );
	}

	/**
	 * Starts the resizing process.
	 *
	 * Creates a new {@link #state} for the current process.
	 *
	 * @fires begin
	 * @param {HTMLElement} domResizeHandle Clicked handle.
	 */
	begin( domResizeHandle ) {
		this.state = new ResizeState( this._options );

		this._sizeUI.bindToState( this._options, this.state );

		this._initialViewWidth = this._options.viewElement.getStyle( 'width' );

		this.state.begin( domResizeHandle, this._getHandleHost(), this._getResizeHost() );
	}

	/**
	 * Updates the proposed size based on `domEventData`.
	 *
	 * @fires updateSize
	 * @param {Event} domEventData
	 */
	updateSize( domEventData ) {
		const newSize = this._proposeNewSize( domEventData );
		const editingView = this._options.editor.editing.view;

		editingView.change( writer => {
			const unit = this._options.unit || '%';
			const newWidth = ( unit === '%' ? newSize.widthPercents : newSize.width ) + unit;

			writer.setStyle( 'width', newWidth, this._options.viewElement );
		} );

		// Get an actual image width, and:
		// * reflect this size to the resize wrapper
		// * apply this **real** size to the state
		const domHandleHost = this._getHandleHost();
		const domHandleHostRect = new resizeobserver.Rect( domHandleHost );

		newSize.handleHostWidth = Math.round( domHandleHostRect.width );
		newSize.handleHostHeight = Math.round( domHandleHostRect.height );

		// Handle max-width limitation.
		const domResizeHostRect = new resizeobserver.Rect( domHandleHost );

		newSize.width = Math.round( domResizeHostRect.width );
		newSize.height = Math.round( domResizeHostRect.height );

		this.redraw( domHandleHostRect );

		this.state.update( newSize );
	}

	/**
	 * Applies the geometry proposed with the resizer.
	 *
	 * @fires commit
	 */
	commit() {
		const unit = this._options.unit || '%';
		const newValue = ( unit === '%' ? this.state.proposedWidthPercents : this.state.proposedWidth ) + unit;

		// Both cleanup and onCommit callback are very likely to make view changes. Ensure that it is made in a single step.
		this._options.editor.editing.view.change( () => {
			this._cleanup();
			this._options.onCommit( newValue );
		} );
	}

	/**
	 * Cancels and rejects the proposed resize dimensions, hiding the UI.
	 *
	 * @fires cancel
	 */
	cancel() {
		this._cleanup();
	}

	/**
	 * Destroys the resizer.
	 */
	destroy() {
		this.cancel();
	}

	/**
	 * Redraws the resizer.
	 *
	 * @param {module:utils/dom/rect~Rect} [handleHostRect] Handle host rectangle might be given to improve performance.
	 */
	redraw( handleHostRect ) {
		const domWrapper = this._domResizerWrapper;

		// Refresh only if resizer exists in the DOM.
		if ( !existsInDom( domWrapper ) ) {
			return;
		}

		const widgetWrapper = domWrapper.parentElement;
		const handleHost = this._getHandleHost();
		const resizerWrapper = this._viewResizerWrapper;
		const currentDimensions = [
			resizerWrapper.getStyle( 'width' ),
			resizerWrapper.getStyle( 'height' ),
			resizerWrapper.getStyle( 'left' ),
			resizerWrapper.getStyle( 'top' )
		];
		let newDimensions;

		if ( widgetWrapper.isSameNode( handleHost ) ) {
			const clientRect = handleHostRect || new resizeobserver.Rect( handleHost );

			newDimensions = [
				clientRect.width + 'px',
				clientRect.height + 'px',
				undefined,
				undefined
			];
		}
		// In case a resizing host is not a widget wrapper, we need to compensate
		// for any additional offsets the resize host might have. E.g. wrapper padding
		// or simply another editable. By doing that the border and resizers are shown
		// only around the resize host.
		else {
			newDimensions = [
				handleHost.offsetWidth + 'px',
				handleHost.offsetHeight + 'px',
				handleHost.offsetLeft + 'px',
				handleHost.offsetTop + 'px'
			];
		}

		// Make changes to the view only if the resizer should actually get new dimensions.
		// Otherwise, if View#change() was always called, this would cause EditorUI#update
		// loops because the WidgetResize plugin listens to EditorUI#update and updates
		// the resizer.
		// https://github.com/ckeditor/ckeditor5/issues/7633
		if ( compareArrays( currentDimensions, newDimensions ) !== 'same' ) {
			this._options.editor.editing.view.change( writer => {
				writer.setStyle( {
					width: newDimensions[ 0 ],
					height: newDimensions[ 1 ],
					left: newDimensions[ 2 ],
					top: newDimensions[ 3 ]
				}, resizerWrapper );
			} );
		}
	}

	containsHandle( domElement ) {
		return this._domResizerWrapper.contains( domElement );
	}

	static isResizeHandle( domElement ) {
		return domElement.classList.contains( 'ck-widget__resizer__handle' );
	}

	/**
	 * Cleans up the context state.
	 *
	 * @protected
	 */
	_cleanup() {
		this._sizeUI.dismiss();
		this._sizeUI.isVisible = false;

		const editingView = this._options.editor.editing.view;

		editingView.change( writer => {
			writer.setStyle( 'width', this._initialViewWidth, this._options.viewElement );
		} );
	}

	/**
	 * Calculates the proposed size as the resize handles are dragged.
	 *
	 * @private
	 * @param {Event} domEventData Event data that caused the size update request. It should be used to calculate the proposed size.
	 * @returns {Object} return
	 * @returns {Number} return.width Proposed width.
	 * @returns {Number} return.height Proposed height.
	 */
	_proposeNewSize( domEventData ) {
		const state = this.state;
		const currentCoordinates = extractCoordinates( domEventData );
		const isCentered = this._options.isCentered ? this._options.isCentered( this ) : true;

		// Enlargement defines how much the resize host has changed in a given axis. Naturally it could be a negative number
		// meaning that it has been shrunk.
		//
		// +----------------+--+
		// |                |  |
		// |       img      |  |
		// |  /handle host  |  |
		// +----------------+  | ^
		// |                   | | - enlarge y
		// +-------------------+ v
		// 					<-->
		// 					 enlarge x
		const enlargement = {
			x: state._referenceCoordinates.x - ( currentCoordinates.x + state.originalWidth ),
			y: ( currentCoordinates.y - state.originalHeight ) - state._referenceCoordinates.y
		};

		if ( isCentered && state.activeHandlePosition.endsWith( '-right' ) ) {
			enlargement.x = currentCoordinates.x - ( state._referenceCoordinates.x + state.originalWidth );
		}

		// Objects needs to be resized twice as much in horizontal axis if centered, since enlargement is counted from
		// one resized corner to your cursor. It needs to be duplicated to compensate for the other side too.
		if ( isCentered ) {
			enlargement.x *= 2;
		}

		// const resizeHost = this._getResizeHost();

		// The size proposed by the user. It does not consider the aspect ratio.
		const proposedSize = {
			width: Math.abs( state.originalWidth + enlargement.x ),
			height: Math.abs( state.originalHeight + enlargement.y )
		};

		// Dominant determination must take the ratio into account.
		proposedSize.dominant = proposedSize.width / state.aspectRatio > proposedSize.height ? 'width' : 'height';
		proposedSize.max = proposedSize[ proposedSize.dominant ];

		// Proposed size, respecting the aspect ratio.
		const targetSize = {
			width: proposedSize.width,
			height: proposedSize.height
		};

		if ( proposedSize.dominant == 'width' ) {
			targetSize.height = targetSize.width / state.aspectRatio;
		} else {
			targetSize.width = targetSize.height * state.aspectRatio;
		}

		return {
			width: Math.round( targetSize.width ),
			height: Math.round( targetSize.height ),
			widthPercents: Math.min( Math.round( state.originalWidthPercents / state.originalWidth * targetSize.width * 100 ) / 100, 100 )
		};
	}

	/**
	 * Obtains the resize host.
	 *
	 * Resize host is an object that receives dimensions which are the result of resizing.
	 *
	 * @protected
	 * @returns {HTMLElement}
	 */
	_getResizeHost() {
		const widgetWrapper = this._domResizerWrapper.parentElement;

		return this._options.getResizeHost( widgetWrapper );
	}

	/**
	 * Obtains the handle host.
	 *
	 * Handle host is an object that the handles are aligned to.
	 *
	 * Handle host will not always be an entire widget itself. Take an image as an example. The image widget
	 * contains an image and a caption. Only the image should be surrounded with handles.
	 *
	 * @protected
	 * @returns {HTMLElement}
	 */
	_getHandleHost() {
		const widgetWrapper = this._domResizerWrapper.parentElement;

		return this._options.getHandleHost( widgetWrapper );
	}

	/**
	 * Renders the resize handles in the DOM.
	 *
	 * @private
	 * @param {HTMLElement} domElement The resizer wrapper.
	 */
	_appendHandles( domElement ) {
		const resizerPositions = [ 'top-left', 'top-right', 'bottom-right', 'bottom-left' ];

		for ( const currentPosition of resizerPositions ) {
			domElement.appendChild( ( new resizeobserver.Template( {
				tag: 'div',
				attributes: {
					class: `ck-widget__resizer__handle ${ getResizerClass( currentPosition ) }`
				}
			} ).render() ) );
		}
	}

	/**
	 * Sets up the {@link #_sizeUI} property and adds it to the passed `domElement`.
	 *
	 * @private
	 * @param {HTMLElement} domElement
	 */
	_appendSizeUI( domElement ) {
		const sizeUI = new SizeView();

		// Make sure icon#element is rendered before passing to appendChild().
		sizeUI.render();

		this._sizeUI = sizeUI;

		domElement.appendChild( sizeUI.element );
	}

	/**
	 * @event begin
	 */

	/**
	 * @event updateSize
	 */

	/**
	 * @event commit
	 */

	/**
	 * @event cancel
	 */
}

resizeobserver.mix( Resizer, resizeobserver.ObservableMixin );

/**
 * A view displaying the proposed new element size during the resizing.
 *
 * @extends {module:ui/view~View}
 */
class SizeView extends resizeobserver.View {
	constructor() {
		super();

		const bind = this.bindTemplate;

		this.setTemplate( {
			tag: 'div',
			attributes: {
				class: [
					'ck',
					'ck-size-view',
					bind.to( 'activeHandlePosition', value => value ? `ck-orientation-${ value }` : '' )
				],
				style: {
					display: bind.if( 'isVisible', 'none', visible => !visible )
				}
			},
			children: [ {
				text: bind.to( 'label' )
			} ]
		} );
	}

	bindToState( options, resizerState ) {
		this.bind( 'isVisible' ).to( resizerState, 'proposedWidth', resizerState, 'proposedHeight', ( width, height ) =>
			width !== null && height !== null );

		this.bind( 'label' ).to(
			resizerState, 'proposedHandleHostWidth',
			resizerState, 'proposedHandleHostHeight',
			resizerState, 'proposedWidthPercents',
			( width, height, widthPercents ) => {
				if ( options.unit === 'px' ) {
					return `${ width }×${ height }`;
				} else {
					return `${ widthPercents }%`;
				}
			}
		);

		this.bind( 'activeHandlePosition' ).to( resizerState );
	}

	dismiss() {
		this.unbind();
		this.isVisible = false;
	}
}

// @private
// @param {String} resizerPosition Expected resizer position like `"top-left"`, `"bottom-right"`.
// @returns {String} A prefixed HTML class name for the resizer element
function getResizerClass( resizerPosition ) {
	return `ck-widget__resizer__handle-${ resizerPosition }`;
}

function extractCoordinates( event ) {
	return {
		x: event.pageX,
		y: event.pageY
	};
}

function existsInDom( element ) {
	return element && element.ownerDocument && element.ownerDocument.contains( element );
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * The widget resize feature plugin.
 *
 * Use the {@link module:widget/widgetresize~WidgetResize#attachTo} method to create a resizer for the specified widget.
 *
 * @extends module:core/plugin~Plugin
 * @mixes module:utils/observablemixin~ObservableMixin
 */
class WidgetResize extends resizeobserver.Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'WidgetResize';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		/**
		 * The currently visible resizer.
		 *
		 * @observable
		 * @member {module:widget/widgetresize/resizer~Resizer|null} #visibleResizer
		 */
		this.set( 'visibleResizer', null );

		/**
		 * References an active resizer.
		 *
		 * Active resizer means a resizer which handle is actively used by the end user.
		 *
		 * @protected
		 * @observable
		 * @member {module:widget/widgetresize/resizer~Resizer|null} #_activeResizer
		 */
		this.set( '_activeResizer', null );

		/**
		 * A map of resizers created using this plugin instance.
		 *
		 * @private
		 * @type {Map.<module:engine/view/containerelement~ContainerElement, module:widget/widgetresize/resizer~Resizer>}
		 */
		this._resizers = new Map();

		const domDocument = resizeobserver.global.window.document;

		this.editor.model.schema.setAttributeProperties( 'width', {
			isFormatting: true
		} );

		this.editor.editing.view.addObserver( resizeobserver.MouseObserver );

		this._observer = Object.create( resizeobserver.DomEmitterMixin );

		this.listenTo( this.editor.editing.view.document, 'mousedown', this._mouseDownListener.bind( this ), { priority: 'high' } );

		this._observer.listenTo( domDocument, 'mousemove', this._mouseMoveListener.bind( this ) );
		this._observer.listenTo( domDocument, 'mouseup', this._mouseUpListener.bind( this ) );

		const redrawFocusedResizer = () => {
			if ( this.visibleResizer ) {
				this.visibleResizer.redraw();
			}
		};

		const redrawFocusedResizerThrottled = throttle( redrawFocusedResizer, 200 );

		// Redraws occurring upon a change of visible resizer must not be throttled, as it is crucial for the initial
		// render. Without it the resizer frame would be misaligned with resizing host for a fraction of second.
		this.on( 'change:visibleResizer', redrawFocusedResizer );

		// Redrawing on any change of the UI of the editor (including content changes).
		this.editor.ui.on( 'update', redrawFocusedResizerThrottled );

		// Resizers need to be redrawn upon window resize, because new window might shrink resize host.
		this._observer.listenTo( resizeobserver.global.window, 'resize', redrawFocusedResizerThrottled );

		const viewSelection = this.editor.editing.view.document.selection;

		viewSelection.on( 'change', () => {
			const selectedElement = viewSelection.getSelectedElement();

			this.visibleResizer = this.getResizerByViewElement( selectedElement ) || null;
		} );
	}

	/**
	 * @inheritDoc
	 */
	destroy() {
		this._observer.stopListening();

		for ( const resizer of this._resizers.values() ) {
			resizer.destroy();
		}
	}

	/**
	 * @param {module:widget/widgetresize~ResizerOptions} [options] Resizer options.
	 * @returns {module:widget/widgetresize/resizer~Resizer}
	 */
	attachTo( options ) {
		const resizer = new Resizer( options );
		const plugins = this.editor.plugins;

		resizer.attach();

		if ( plugins.has( 'WidgetToolbarRepository' ) ) {
			// Hiding widget toolbar to improve the performance
			// (https://github.com/ckeditor/ckeditor5-widget/pull/112#issuecomment-564528765).
			const widgetToolbarRepository = plugins.get( 'WidgetToolbarRepository' );

			resizer.on( 'begin', () => {
				widgetToolbarRepository.forceDisabled( 'resize' );
			}, { priority: 'lowest' } );

			resizer.on( 'cancel', () => {
				widgetToolbarRepository.clearForceDisabled( 'resize' );
			}, { priority: 'highest' } );

			resizer.on( 'commit', () => {
				widgetToolbarRepository.clearForceDisabled( 'resize' );
			}, { priority: 'highest' } );
		}

		this._resizers.set( options.viewElement, resizer );

		const viewSelection = this.editor.editing.view.document.selection;
		const selectedElement = viewSelection.getSelectedElement();

		// If the element the resizer is created for is currently focused, it should become visible.
		if ( this.getResizerByViewElement( selectedElement ) == resizer ) {
			this.visibleResizer = resizer;
		}

		return resizer;
	}

	/**
	 * Returns a resizer created for a given view element (widget element).
	 *
	 * @param {module:engine/view/containerelement~ContainerElement} viewElement View element associated with the resizer.
	 * @returns {module:widget/widgetresize/resizer~Resizer|undefined}
	 */
	getResizerByViewElement( viewElement ) {
		return this._resizers.get( viewElement );
	}

	/**
	 * Returns a resizer that contains a given resize handle.
	 *
	 * @protected
	 * @param {HTMLElement} domResizeHandle
	 * @returns {module:widget/widgetresize/resizer~Resizer}
	 */
	_getResizerByHandle( domResizeHandle ) {
		for ( const resizer of this._resizers.values() ) {
			if ( resizer.containsHandle( domResizeHandle ) ) {
				return resizer;
			}
		}
	}

	/**
	 * @protected
	 * @param {module:utils/eventinfo~EventInfo} event
	 * @param {Event} domEventData Native DOM event.
	 */
	_mouseDownListener( event, domEventData ) {
		const resizeHandle = domEventData.domTarget;

		if ( !Resizer.isResizeHandle( resizeHandle ) ) {
			return;
		}

		this._activeResizer = this._getResizerByHandle( resizeHandle );

		if ( this._activeResizer ) {
			this._activeResizer.begin( resizeHandle );

			// Do not call other events when resizing. See: #6755.
			event.stop();
			domEventData.preventDefault();
		}
	}

	/**
	 * @protected
	 * @param {module:utils/eventinfo~EventInfo} event
	 * @param {Event} domEventData Native DOM event.
	 */
	_mouseMoveListener( event, domEventData ) {
		if ( this._activeResizer ) {
			this._activeResizer.updateSize( domEventData );
		}
	}

	/**
	 * @protected
	 */
	_mouseUpListener() {
		if ( this._activeResizer ) {
			this._activeResizer.commit();
			this._activeResizer = null;
		}
	}
}

resizeobserver.mix( WidgetResize, resizeobserver.ObservableMixin );

/**
 * Interface describing a resizer. It allows to specify the resizing host, custom logic for calculating aspect ratio, etc.
 *
 * @interface ResizerOptions
 */

/**
 * Editor instance associated with the resizer.
 *
 * @member {module:core/editor/editor~Editor} module:widget/widgetresize~ResizerOptions#editor
 */

/**
 * @member {module:engine/model/element~Element} module:widget/widgetresize~ResizerOptions#modelElement
 */

/**
 * A view of an element to be resized. Typically it's the main widget's view instance.
 *
 * @member {module:engine/view/containerelement~ContainerElement} module:widget/widgetresize~ResizerOptions#viewElement
 */

/**
 * A callback to be executed once the resizing process is done.
 *
 * It receives a `Number` (`newValue`) as a parameter.
 *
 * For example, {@link module:image/imageresize~ImageResize} uses it to execute the image resize command
 * which puts the new value into the model.
 *
 * ```js
 * {
 *	editor,
 *	modelElement: data.item,
 *	viewElement: widget,
 *
 *	onCommit( newValue ) {
 *		editor.execute( 'imageResize', { width: newValue } );
 *	}
 * };
 * ```
 *
 *
 * @member {Function} module:widget/widgetresize~ResizerOptions#onCommit
 */

/**
 * @member {Function} module:widget/widgetresize~ResizerOptions#getResizeHost
 */

/**
 * @member {Function} module:widget/widgetresize~ResizerOptions#isCentered
 */

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * The image resize by handles feature.
 *
 * It adds the ability to resize each image using handles or manually by
 * {@link module:image/imageresize/imageresizebuttons~ImageResizeButtons} buttons.
 *
 * @extends module:core/plugin~Plugin
 */
class ImageResizeHandles extends resizeobserver.Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ WidgetResize ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'ImageResizeHandles';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const command = this.editor.commands.get( 'imageResize' );
		this.bind( 'isEnabled' ).to( command );

		this._setupResizerCreator();
	}

	/**
	 * Attaches the listeners responsible for creating a resizer for each image, except for images inside the HTML embed preview.
	 *
	 * @private
	 */
	_setupResizerCreator() {
		const editor = this.editor;
		const editingView = editor.editing.view;

		editingView.addObserver( resizeobserver.ImageLoadObserver );

		this.listenTo( editingView.document, 'imageLoaded', ( evt, domEvent ) => {
			// The resizer must be attached only to images loaded by the `ImageInsert`, `ImageUpload` or `LinkImage` plugins.
			if ( !domEvent.target.matches( 'figure.image.ck-widget > img, figure.image.ck-widget > a > img' ) ) {
				return;
			}

			const imageView = editor.editing.view.domConverter.domToView( domEvent.target );
			const widgetView = imageView.findAncestor( 'figure' );
			let resizer = this.editor.plugins.get( WidgetResize ).getResizerByViewElement( widgetView );

			if ( resizer ) {
				// There are rare cases when the image will be triggered multiple times for the same widget, e.g. when
				// the image's source was changed after upload (https://github.com/ckeditor/ckeditor5/pull/8108#issuecomment-708302992).
				resizer.redraw();

				return;
			}

			const mapper = editor.editing.mapper;
			const imageModel = mapper.toModelElement( widgetView );

			resizer = editor.plugins
				.get( WidgetResize )
				.attachTo( {
					unit: editor.config.get( 'image.resizeUnit' ),

					modelElement: imageModel,
					viewElement: widgetView,
					editor,

					getHandleHost( domWidgetElement ) {
						return domWidgetElement.querySelector( 'img' );
					},
					getResizeHost( domWidgetElement ) {
						return domWidgetElement;
					},
					// TODO consider other positions.
					isCentered() {
						const imageStyle = imageModel.getAttribute( 'imageStyle' );

						return !imageStyle || imageStyle == 'full' || imageStyle == 'alignCenter';
					},

					onCommit( newValue ) {
						editor.execute( 'imageResize', { width: newValue } );
					}
				} );

			resizer.on( 'updateSize', () => {
				if ( !widgetView.hasClass( 'image_resized' ) ) {
					editingView.change( writer => {
						writer.addClass( 'image_resized', widgetView );
					} );
				}
			} );

			resizer.bind( 'isEnabled' ).to( this );
		} );
	}
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * The image resize plugin.
 *
 * It adds a possibility to resize each image using handles.
 *
 * @extends module:core/plugin~Plugin
 */
class ImageResize extends resizeobserver.Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ ImageResizeEditing, ImageResizeHandles, ImageResizeButtons ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'ImageResize';
	}
}

/**
 * The available options are `'px'` or `'%'`.
 *
 * Determines the size unit applied to the resized image.
 *
 *		ClassicEditor
 *			.create( editorElement, {
 *				image: {
 *					resizeUnit: 'px'
 *				}
 *			} )
 *			.then( ... )
 *			.catch( ... );
 *
 *
 * This option is used by the {@link module:image/imageresize~ImageResize} feature.
 *
 * @default '%'
 * @member {String} module:image/image~ImageConfig#resizeUnit
 */

/**
 * The image resize options.
 *
 * Each option should have at least these two properties:
 *
 * * name: The name of the UI component registered in the global
 * {@link module:core/editor/editorui~EditorUI#componentFactory component factory} of the editor,
 * representing the button a user can click to change the size of an image,
 * * value: An actual image width applied when a user clicks the mentioned button
 * ({@link module:image/imageresize/imageresizecommand~ImageResizeCommand} gets executed).
 * The value property is combined with the {@link module:image/image~ImageConfig#resizeUnit `config.image.resizeUnit`} (`%` by default).
 * For instance: `value: '50'` and `resizeUnit: '%'` will render as `'50%'` in the UI.
 *
 * **Resetting the image size**
 *
 * If you want to set an option that will reset image to its original size, you need to pass a `null` value
 * to one of the options. The `:original` token is not mandatory, you can call it anything you wish, but it must reflect
 * in the standalone buttons configuration for the image toolbar.
 *
 *		ClassicEditor
 *			.create( editorElement, {
 *				image: {
 *					resizeUnit: "%",
 *					resizeOptions: [ {
 *						name: 'imageResize:original',
 *						value: null
 *					},
 *					{
 *						name: 'imageResize:50',
 *						value: '50'
 *					},
 *					{
 *						name: 'imageResize:75',
 *						value: '75'
 *					} ]
 *				}
 *			} )
 *			.then( ... )
 *			.catch( ... );
 *
 * **Resizing images using a dropdown**
 *
 * With resize options defined, you can decide whether you want to display them as a dropdown or as standalone buttons.
 * For the dropdown, you need to pass only the `imageResize` token to the
{@link module:image/image~ImageConfig#toolbar `config.image.toolbar`}. The dropdown contains all defined options by default:
 *
 *		ClassicEditor
 *			.create( editorElement, {
 *				image: {
 *					resizeUnit: "%",
 *					resizeOptions: [ {
 *						name: 'imageResize:original',
 *						value: null
 *					},
 *					{
 *						name: 'imageResize:50',
 *						value: '50'
 *					},
 *					{
 *						name: 'imageResize:75',
 *						value: '75'
 *					} ],
 *					toolbar: [ 'imageResize', ... ],
 *				}
 *			} )
 *			.then( ... )
 *			.catch( ... );
 *
 * **Resizing images using individual buttons**
 *
 * If you want to have separate buttons for {@link module:image/imageresize/imageresizebuttons~ImageResizeOption each option},
 * pass their names to the {@link module:image/image~ImageConfig#toolbar `config.image.toolbar`} instead. Please keep in mind
 * that this time **you must define the additional
 * {@link module:image/imageresize/imageresizebuttons~ImageResizeOption `icon` property}**:
 *
 *		ClassicEditor
 *			.create( editorElement, {
 *				image: {
 *					resizeUnit: "%",
 *					resizeOptions: [ {
 *						name: 'imageResize:original',
 *						value: null,
 *						icon: 'original'
 *					},
 *					{
 *						name: 'imageResize:25',
 *						value: '25',
 *						icon: 'small'
 *					},
 *					{
 *						name: 'imageResize:50',
 *						value: '50',
 *						icon: 'medium'
 *					},
 *					{
 *						name: 'imageResize:75',
 *						value: '75',
 *						icon: 'large'
 *					} ],
 *					toolbar: [ 'imageResize:25', 'imageResize:50', 'imageResize:75', 'imageResize:original', ... ],
 *				}
 *			} )
 *			.then( ... )
 *			.catch( ... );
 *
 * **Customizing resize button labels**
 *
 * You can set your own label for each resize button. To do that, add the `label` property like in the example below.
 *
 * * When using the **dropdown**, the labels are displayed on the list of all options when you open the dropdown.
 * * When using **standalone buttons**, the labels will are displayed as tooltips when a user hovers over the button.
 *
 *		ClassicEditor
 *			.create( editorElement, {
 *				image: {
 *					resizeUnit: "%",
 *					resizeOptions: [ {
 *						name: 'imageResize:original',
 *						value: null,
 *						label: 'Original size'
 *						// Note: add the "icon" property if you're configuring a standalone button.
 *					},
 *					{
 *						name: 'imageResize:50',
 *						value: '50',
 *						label: 'Medium size'
 *						// Note: add the "icon" property if you're configuring a standalone button.
 *					},
 *					{
 *						name: 'imageResize:75',
 *						value: '75',
 *						label: 'Large size'
 *						// Note: add the "icon" property if you're configuring a standalone button.
 *					} ]
 *				}
 *			} )
 *			.then( ... )
 *			.catch( ... );
 *
 * **Default value**
 *
 * The following configuration is used by default:
 *
 *		resizeOptions = [
 *			{
 *				name: 'imageResize:original',
 *				value: null,
 *				icon: 'original'
 *			},
 *			{
 *				name: 'imageResize:25',
 *				value: '25',
 *				icon: 'small'
 *			},
 *			{
 *				name: 'imageResize:50',
 *				value: '50',
 *				icon: 'medium'
 *			},
 *			{
 *				name: 'imageResize:75',
 *				value: '75',
 *				icon: 'large'
 *			}
 *		];
 *
 * @member {Array.<module:image/imageresize/imageresizebuttons~ImageResizeOption>} module:image/image~ImageConfig#resizeOptions
 */

exports.default = ImageResize;
