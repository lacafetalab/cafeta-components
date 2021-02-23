/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module utils/spy
 */

/**
 * Creates a spy function (ala Sinon.js) that can be used to inspect call to it.
 *
 * The following are the present features:
 *
 * * spy.called: property set to `true` if the function has been called at least once.
 *
 * @returns {Function} The spy function.
 */
function spy() {
	return function spy() {
		spy.called = true;
	};
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * The event object passed to event callbacks. It is used to provide information about the event as well as a tool to
 * manipulate it.
 */
class EventInfo {
	/**
	 * @param {Object} source The emitter.
	 * @param {String} name The event name.
	 */
	constructor( source, name ) {
		/**
		 * The object that fired the event.
		 *
		 * @readonly
		 * @member {Object}
		 */
		this.source = source;

		/**
		 * The event name.
		 *
		 * @readonly
		 * @member {String}
		 */
		this.name = name;

		/**
		 * Path this event has followed. See {@link module:utils/emittermixin~EmitterMixin#delegate}.
		 *
		 * @readonly
		 * @member {Array.<Object>}
		 */
		this.path = [];

		// The following methods are defined in the constructor because they must be re-created per instance.

		/**
		 * Stops the event emitter to call further callbacks for this event interaction.
		 *
		 * @method #stop
		 */
		this.stop = spy();

		/**
		 * Removes the current callback from future interactions of this event.
		 *
		 * @method #off
		 */
		this.off = spy();

		/**
		 * The value which will be returned by {@link module:utils/emittermixin~EmitterMixin#fire}.
		 *
		 * It's `undefined` by default and can be changed by an event listener:
		 *
		 *		dataController.fire( 'getSelectedContent', ( evt ) => {
		 *			// This listener will make `dataController.fire( 'getSelectedContent' )`
		 *			// always return an empty DocumentFragment.
		 *			evt.return = new DocumentFragment();
		 *
		 *			// Make sure no other listeners are executed.
		 *			evt.stop();
		 *		} );
		 *
		 * @member #return
		 */
	}
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module utils/uid
 */

// A hash table of hex numbers to avoid using toString() in uid() which is costly.
// [ '00', '01', '02', ..., 'fe', 'ff' ]
const HEX_NUMBERS = new Array( 256 ).fill()
	.map( ( val, index ) => ( '0' + ( index ).toString( 16 ) ).slice( -2 ) );

/**
 * Returns a unique id. The id starts with an "e" character and a randomly generated string of
 * 32 alphanumeric characters.
 *
 * **Note**: The characters the unique id is built from correspond to the hex number notation
 * (from "0" to "9", from "a" to "f"). In other words, each id corresponds to an "e" followed
 * by 16 8-bit numbers next to each other.
 *
 * @returns {String} An unique id string.
 */
function uid() {
	// Let's create some positive random 32bit integers first.
	//
	// 1. Math.random() is a float between 0 and 1.
	// 2. 0x100000000 is 2^32 = 4294967296.
	// 3. >>> 0 enforces integer (in JS all numbers are floating point).
	//
	// For instance:
	//		Math.random() * 0x100000000 = 3366450031.853859
	// but
	//		Math.random() * 0x100000000 >>> 0 = 3366450031.
	const r1 = Math.random() * 0x100000000 >>> 0;
	const r2 = Math.random() * 0x100000000 >>> 0;
	const r3 = Math.random() * 0x100000000 >>> 0;
	const r4 = Math.random() * 0x100000000 >>> 0;

	// Make sure that id does not start with number.
	return 'e' +
		HEX_NUMBERS[ r1 >> 0 & 0xFF ] +
		HEX_NUMBERS[ r1 >> 8 & 0xFF ] +
		HEX_NUMBERS[ r1 >> 16 & 0xFF ] +
		HEX_NUMBERS[ r1 >> 24 & 0xFF ] +
		HEX_NUMBERS[ r2 >> 0 & 0xFF ] +
		HEX_NUMBERS[ r2 >> 8 & 0xFF ] +
		HEX_NUMBERS[ r2 >> 16 & 0xFF ] +
		HEX_NUMBERS[ r2 >> 24 & 0xFF ] +
		HEX_NUMBERS[ r3 >> 0 & 0xFF ] +
		HEX_NUMBERS[ r3 >> 8 & 0xFF ] +
		HEX_NUMBERS[ r3 >> 16 & 0xFF ] +
		HEX_NUMBERS[ r3 >> 24 & 0xFF ] +
		HEX_NUMBERS[ r4 >> 0 & 0xFF ] +
		HEX_NUMBERS[ r4 >> 8 & 0xFF ] +
		HEX_NUMBERS[ r4 >> 16 & 0xFF ] +
		HEX_NUMBERS[ r4 >> 24 & 0xFF ];
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module utils/priorities
 */

/**
 * String representing a priority value.
 *
 * @typedef {'highest'|'high'|'normal'|'low'|'lowest'} module:utils/priorities~PriorityString
 */

/**
 * Provides group of constants to use instead of hardcoding numeric priority values.
 *
 * @namespace
 */
const priorities = {
	/**
	 * Converts a string with priority name to it's numeric value. If `Number` is given, it just returns it.
	 *
	 * @static
	 * @param {module:utils/priorities~PriorityString|Number} priority Priority to convert.
	 * @returns {Number} Converted priority.
	 */
	get( priority ) {
		if ( typeof priority != 'number' ) {
			return this[ priority ] || this.normal;
		} else {
			return priority;
		}
	},

	highest: 100000,
	high: 1000,
	normal: 0,
	low: -1000,
	lowest: -100000
};

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module utils/ckeditorerror
 */

/* globals console */

/**
 * URL to the documentation with error codes.
 */
const DOCUMENTATION_URL =
	'https://ckeditor.com/docs/ckeditor5/latest/framework/guides/support/error-codes.html';

/**
 * The CKEditor error class.
 *
 * You should throw `CKEditorError` when:
 *
 * * An unexpected situation occurred and the editor (most probably) will not work properly. Such exception will be handled
 * by the {@link module:watchdog/watchdog~Watchdog watchdog} (if it is integrated),
 * * If the editor is incorrectly integrated or the editor API is used in the wrong way. This way you will give
 * feedback to the developer as soon as possible. Keep in mind that for common integration issues which should not
 * stop editor initialization (like missing upload adapter, wrong name of a toolbar component) we use
 * {@link module:utils/ckeditorerror~logWarning `logWarning()`} and
 * {@link module:utils/ckeditorerror~logError `logError()`}
 * to improve developers experience and let them see the a working editor as soon as possible.
 *
 *		/**
 *		 * Error thrown when a plugin cannot be loaded due to JavaScript errors, lack of plugins with a given name, etc.
 *		 *
 *		 * @error plugin-load
 *		 * @param pluginName The name of the plugin that could not be loaded.
 *		 * @param moduleName The name of the module which tried to load this plugin.
 *		 * /
 *		throw new CKEditorError( 'plugin-load', {
 *			pluginName: 'foo',
 *			moduleName: 'bar'
 *		} );
 *
 * @extends Error
 */
class CKEditorError extends Error {
	/**
	 * Creates an instance of the CKEditorError class.
	 *
	 * @param {String} errorName The error id in an `error-name` format. A link to this error documentation page will be added
	 * to the thrown error's `message`.
	 * @param {Object|null} context A context of the error by which the {@link module:watchdog/watchdog~Watchdog watchdog}
	 * is able to determine which editor crashed. It should be an editor instance or a property connected to it. It can be also
	 * a `null` value if the editor should not be restarted in case of the error (e.g. during the editor initialization).
	 * The error context should be checked using the `areConnectedThroughProperties( editor, context )` utility
	 * to check if the object works as the context.
	 * @param {Object} [data] Additional data describing the error. A stringified version of this object
	 * will be appended to the error message, so the data are quickly visible in the console. The original
	 * data object will also be later available under the {@link #data} property.
	 */
	constructor( errorName, context, data ) {
		const message = `${ errorName }${ ( data ? ` ${ JSON.stringify( data ) }` : '' ) }${ getLinkToDocumentationMessage( errorName ) }`;

		super( message );

		/**
		 * @type {String}
		 */
		this.name = 'CKEditorError';

		/**
		 * A context of the error by which the Watchdog is able to determine which editor crashed.
		 *
		 * @type {Object|null}
		 */
		this.context = context;

		/**
		 * The additional error data passed to the constructor. Undefined if none was passed.
		 *
		 * @type {Object|undefined}
		 */
		this.data = data;
	}

	/**
	 * Checks if the error is of the `CKEditorError` type.
	 */
	is( type ) {
		return type === 'CKEditorError';
	}

	/**
	 * A utility that ensures that the thrown error is a {@link module:utils/ckeditorerror~CKEditorError} one.
	 * It is useful when combined with the {@link module:watchdog/watchdog~Watchdog} feature, which can restart the editor in case
	 * of a {@link module:utils/ckeditorerror~CKEditorError} error.
	 *
	 * @static
	 * @param {Error} err The error to rethrow.
	 * @param {Object} context An object connected through properties with the editor instance. This context will be used
	 * by the watchdog to verify which editor should be restarted.
	 */
	static rethrowUnexpectedError( err, context ) {
		if ( err.is && err.is( 'CKEditorError' ) ) {
			throw err;
		}

		/**
		 * An unexpected error occurred inside the CKEditor 5 codebase. This error will look like the original one
		 * to make the debugging easier.
		 *
		 * This error is only useful when the editor is initialized using the {@link module:watchdog/watchdog~Watchdog} feature.
		 * In case of such error (or any {@link module:utils/ckeditorerror~CKEditorError} error) the watchdog should restart the editor.
		 *
		 * @error unexpected-error
		 */
		const error = new CKEditorError( err.message, context );

		// Restore the original stack trace to make the error look like the original one.
		// See https://github.com/ckeditor/ckeditor5/issues/5595 for more details.
		error.stack = err.stack;

		throw error;
	}
}

function getLinkToDocumentationMessage( errorName ) {
	return `\nRead more: ${ DOCUMENTATION_URL }#error-${ errorName }`;
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

const version = '25.0.0';

/* istanbul ignore next */
const windowOrGlobal = typeof window === 'object' ? window : global;

/* istanbul ignore next */
if ( windowOrGlobal.CKEDITOR_VERSION ) {
	/**
	 * This error is thrown when due to a mistake in how CKEditor 5 was installed or initialized, some
	 * of its modules were duplicated (evaluated and executed twice). Module duplication leads to inevitable runtime
	 * errors.
	 *
	 * There are many situations in which some modules can be loaded twice. In the worst case scenario,
	 * you may need to check your project for each of these issues and fix them all.
	 *
	 * # Trying to add a plugin to an existing build
	 *
	 * If you import an existing CKEditor 5 build and a plugin like this:
	 *
	 *		import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
	 *		import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
	 *
	 * Then your project loads some CKEditor 5 packages twice. How does it happen?
	 *
	 * The build package contains a file which is already compiled with webpack. This means
	 * that it contains all the necessary code from e.g. `@ckeditor/ckeditor5-engine` and `@ckeditor/ckeditor5-utils`.
	 *
	 * However, the `Highlight` plugin imports some of the modules from these packages, too. If you ask webpack to
	 * build such a project, you will end up with the modules being included (and run) twice &mdash; first, because they are
	 * included inside the build package, and second, because they are required by the `Highlight` plugin.
	 *
	 * Therefore, **you must never add plugins to an existing build** unless your plugin has no dependencies.
	 *
	 * Adding plugins to a build is done by taking the source version of this build (so, before it was built with webpack)
	 * and adding plugins there. In this situation, webpack will know that it only needs to load each plugin once.
	 *
	 * Read more in the {@glink builds/guides/integration/installing-plugins "Installing plugins"} guide.
	 *
	 * # Confused an editor build with an editor implementation
	 *
	 * This scenario is very similar to the previous one, but has a different origin.
	 *
	 * Let's assume that you wanted to use CKEditor 5 from source, as explained in the
	 * {@glink builds/guides/integration/advanced-setup#scenario-2-building-from-source "Building from source"} section
	 * or in the {@glink framework/guides/quick-start "Quick start"} guide of CKEditor 5 Framework.
	 *
	 * The correct way to do so is to import an editor and plugins and run them together like this:
	 *
	 *		import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
	 *		import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
	 *		import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
	 *		import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
	 *		import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
	 *
	 *		ClassicEditor
	 *			.create( document.querySelector( '#editor' ), {
	 *				plugins: [ Essentials, Paragraph, Bold, Italic ],
	 *				toolbar: [ 'bold', 'italic' ]
	 *			} )
	 *			.then( editor => {
	 *				console.log( 'Editor was initialized', editor );
	 *			} )
	 *			.catch( error => {
	 *				console.error( error.stack );
	 *			} );
	 *
	 * However, you might have mistakenly imported a build instead of the source `ClassicEditor`. In this case
	 * your imports will look like this:
	 *
	 *		import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
	 *		import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
	 *		import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
	 *		import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
	 *		import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
	 *
	 * This creates the same situation as in the previous section because you use a build together with source plugins.
	 *
	 * Remember: `@ckeditor/ckeditor5-build-*` packages contain editor builds and `@ckeditor/ckeditor5-editor-*` contain source editors.
	 *
	 * # Loading two or more builds on one page
	 *
	 * If you use CKEditor 5 builds, you might have loaded two (or more) `ckeditor.js` files on one web page.
	 * Check your web page for duplicated `<script>` elements or make sure your page builder/bundler includes CKEditor only once.
	 *
	 * If you want to use two different types of editors at once, see the
	 * {@glink builds/guides/integration/advanced-setup#scenario-3-using-two-different-editors "Using two different editors"}
	 * section.
	 *
	 * # Using outdated packages
	 *
	 * Building CKEditor 5 from source requires using multiple npm packages. These packages have their dependencies
	 * to other packages. If you use the latest version of, for example, `@ckeditor/ckeditor5-editor-classic` with
	 * an outdated version of `@ckeditor/ckeditor5-image`, npm or yarn will need to install two different versions of
	 * `@ckeditor/ckeditor5-core` because `@ckeditor/ckeditor5-editor-classic` and `@ckeditor/ckeditor5-image` may require
	 * different versions of the core package.
	 *
	 * The solution to this issue is to update all packages to their latest version. We recommend
	 * using tools like [`npm-check-updates`](https://www.npmjs.com/package/npm-check-updates) which simplify this process.
	 *
	 * # Conflicting version of dependencies
	 *
	 * This is a special case of the previous scenario. If you use CKEditor 5 with some third-party plugins,
	 * it may happen that even if you use the latest versions of the official packages and the latest version of
	 * these third-party packages, there will be a conflict between some of their dependencies.
	 *
	 * Such a problem can be resolved by either downgrading CKEditor 5 packages (which we do not recommend) or
	 * asking the author of the third-party package to upgrade its depdendencies (or forking their project and doing this yourself).
	 *
	 * **Note:** All official CKEditor 5 packages (excluding integrations and `ckeditor5-dev-*` packages) are released in the
	 * same major version. This is &mdash; in the `x.y.z`, the `x` is the same for all packages. This is the simplest way to check
	 * whether you use packages coming from the same CKEditor 5 version. You can read more about versioning in the
	 * {@glink framework/guides/support/versioning-policy Versioning policy} guide.
	 *
	 * # Packages were duplicated in `node_modules`
	 *
	 * In some situations, especially when calling `npm install` multiple times, it may happen
	 * that npm will not correctly "deduplicate" packages.
	 *
	 * Normally, npm deduplicates all packages so, for example, `@ckeditor/ckeditor5-core` is installed only once in `node_modules/`.
	 * However, it is known to fail to do so from time to time.
	 *
	 * We recommend checking if any of the steps listed below help:
	 *
	 * * `rm -rf node_modules && npm install` to make sure you have a clean `node_modules/` directory. This step
	 * is known to help in most cases.
	 * * If you use `yarn.lock` or `package-lock.json`, remove it before `npm install`.
	 * * Check whether all CKEditor 5 packages are up to date and reinstall them
	 * if you changed anything (`rm -rf node_modules && npm install`).
	 *
	 * If all packages are correct and compatible with each other, the steps above are known to help. If not, you may
	 * try to check with `npm ls` how many times packages like `@ckeditor/ckeditor5-core`, `@ckeditor/ckeditor5-engine` and
	 *`@ckeditor/ckeditor5-utils` are installed. If more than once, verify which package causes that.
	 *
	 * @error ckeditor-duplicated-modules
	 */
	throw new CKEditorError(
		'ckeditor-duplicated-modules',
		null
	);
} else {
	windowOrGlobal.CKEDITOR_VERSION = version;
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

const _listeningTo = Symbol( 'listeningTo' );
const _emitterId = Symbol( 'emitterId' );

/**
 * Mixin that injects the {@link ~Emitter events API} into its host.
 *
 * @mixin EmitterMixin
 * @implements module:utils/emittermixin~Emitter
 */
const EmitterMixin = {
	/**
	 * @inheritDoc
	 */
	on( event, callback, options = {} ) {
		this.listenTo( this, event, callback, options );
	},

	/**
	 * @inheritDoc
	 */
	once( event, callback, options ) {
		let wasFired = false;

		const onceCallback = function( event, ...args ) {
			// Ensure the callback is called only once even if the callback itself leads to re-firing the event
			// (which would call the callback again).
			if ( !wasFired ) {
				wasFired = true;

				// Go off() at the first call.
				event.off();

				// Go with the original callback.
				callback.call( this, event, ...args );
			}
		};

		// Make a similar on() call, simply replacing the callback.
		this.listenTo( this, event, onceCallback, options );
	},

	/**
	 * @inheritDoc
	 */
	off( event, callback ) {
		this.stopListening( this, event, callback );
	},

	/**
	 * @inheritDoc
	 */
	listenTo( emitter, event, callback, options = {} ) {
		let emitterInfo, eventCallbacks;

		// _listeningTo contains a list of emitters that this object is listening to.
		// This list has the following format:
		//
		// _listeningTo: {
		//     emitterId: {
		//         emitter: emitter,
		//         callbacks: {
		//             event1: [ callback1, callback2, ... ]
		//             ....
		//         }
		//     },
		//     ...
		// }

		if ( !this[ _listeningTo ] ) {
			this[ _listeningTo ] = {};
		}

		const emitters = this[ _listeningTo ];

		if ( !_getEmitterId( emitter ) ) {
			_setEmitterId( emitter );
		}

		const emitterId = _getEmitterId( emitter );

		if ( !( emitterInfo = emitters[ emitterId ] ) ) {
			emitterInfo = emitters[ emitterId ] = {
				emitter,
				callbacks: {}
			};
		}

		if ( !( eventCallbacks = emitterInfo.callbacks[ event ] ) ) {
			eventCallbacks = emitterInfo.callbacks[ event ] = [];
		}

		eventCallbacks.push( callback );

		// Finally register the callback to the event.
		createEventNamespace( emitter, event );
		const lists = getCallbacksListsForNamespace( emitter, event );
		const priority = priorities.get( options.priority );

		const callbackDefinition = {
			callback,
			priority
		};

		// Add the callback to all callbacks list.
		for ( const callbacks of lists ) {
			// Add the callback to the list in the right priority position.
			let added = false;

			for ( let i = 0; i < callbacks.length; i++ ) {
				if ( callbacks[ i ].priority < priority ) {
					callbacks.splice( i, 0, callbackDefinition );
					added = true;

					break;
				}
			}

			// Add at the end, if right place was not found.
			if ( !added ) {
				callbacks.push( callbackDefinition );
			}
		}
	},

	/**
	 * @inheritDoc
	 */
	stopListening( emitter, event, callback ) {
		const emitters = this[ _listeningTo ];
		let emitterId = emitter && _getEmitterId( emitter );
		const emitterInfo = emitters && emitterId && emitters[ emitterId ];
		const eventCallbacks = emitterInfo && event && emitterInfo.callbacks[ event ];

		// Stop if nothing has been listened.
		if ( !emitters || ( emitter && !emitterInfo ) || ( event && !eventCallbacks ) ) {
			return;
		}

		// All params provided. off() that single callback.
		if ( callback ) {
			removeCallback( emitter, event, callback );

			// We must remove callbacks as well in order to prevent memory leaks.
			// See https://github.com/ckeditor/ckeditor5/pull/8480
			const index = eventCallbacks.indexOf( callback );

			if ( index !== -1 ) {
				if ( eventCallbacks.length === 1 ) {
					delete emitterInfo.callbacks[ event ];
				} else {
					removeCallback( emitter, event, callback );
				}
			}
		}
		// Only `emitter` and `event` provided. off() all callbacks for that event.
		else if ( eventCallbacks ) {
			while ( ( callback = eventCallbacks.pop() ) ) {
				removeCallback( emitter, event, callback );
			}

			delete emitterInfo.callbacks[ event ];
		}
		// Only `emitter` provided. off() all events for that emitter.
		else if ( emitterInfo ) {
			for ( event in emitterInfo.callbacks ) {
				this.stopListening( emitter, event );
			}
			delete emitters[ emitterId ];
		}
		// No params provided. off() all emitters.
		else {
			for ( emitterId in emitters ) {
				this.stopListening( emitters[ emitterId ].emitter );
			}
			delete this[ _listeningTo ];
		}
	},

	/**
	 * @inheritDoc
	 */
	fire( eventOrInfo, ...args ) {
		try {
			const eventInfo = eventOrInfo instanceof EventInfo ? eventOrInfo : new EventInfo( this, eventOrInfo );
			const event = eventInfo.name;
			let callbacks = getCallbacksForEvent( this, event );

			// Record that the event passed this emitter on its path.
			eventInfo.path.push( this );

			// Handle event listener callbacks first.
			if ( callbacks ) {
				// Arguments passed to each callback.
				const callbackArgs = [ eventInfo, ...args ];

				// Copying callbacks array is the easiest and most secure way of preventing infinite loops, when event callbacks
				// are added while processing other callbacks. Previous solution involved adding counters (unique ids) but
				// failed if callbacks were added to the queue before currently processed callback.
				// If this proves to be too inefficient, another method is to change `.on()` so callbacks are stored if same
				// event is currently processed. Then, `.fire()` at the end, would have to add all stored events.
				callbacks = Array.from( callbacks );

				for ( let i = 0; i < callbacks.length; i++ ) {
					callbacks[ i ].callback.apply( this, callbackArgs );

					// Remove the callback from future requests if off() has been called.
					if ( eventInfo.off.called ) {
						// Remove the called mark for the next calls.
						delete eventInfo.off.called;

						removeCallback( this, event, callbacks[ i ].callback );
					}

					// Do not execute next callbacks if stop() was called.
					if ( eventInfo.stop.called ) {
						break;
					}
				}
			}

			// Delegate event to other emitters if needed.
			if ( this._delegations ) {
				const destinations = this._delegations.get( event );
				const passAllDestinations = this._delegations.get( '*' );

				if ( destinations ) {
					fireDelegatedEvents( destinations, eventInfo, args );
				}

				if ( passAllDestinations ) {
					fireDelegatedEvents( passAllDestinations, eventInfo, args );
				}
			}

			return eventInfo.return;
		} catch ( err ) {
			// @if CK_DEBUG // throw err;
			/* istanbul ignore next */
			CKEditorError.rethrowUnexpectedError( err, this );
		}
	},

	/**
	 * @inheritDoc
	 */
	delegate( ...events ) {
		return {
			to: ( emitter, nameOrFunction ) => {
				if ( !this._delegations ) {
					this._delegations = new Map();
				}

				// Originally there was a for..of loop which unfortunately caused an error in Babel that didn't allow
				// build an application. See: https://github.com/ckeditor/ckeditor5-react/issues/40.
				events.forEach( eventName => {
					const destinations = this._delegations.get( eventName );

					if ( !destinations ) {
						this._delegations.set( eventName, new Map( [ [ emitter, nameOrFunction ] ] ) );
					} else {
						destinations.set( emitter, nameOrFunction );
					}
				} );
			}
		};
	},

	/**
	 * @inheritDoc
	 */
	stopDelegating( event, emitter ) {
		if ( !this._delegations ) {
			return;
		}

		if ( !event ) {
			this._delegations.clear();
		} else if ( !emitter ) {
			this._delegations.delete( event );
		} else {
			const destinations = this._delegations.get( event );

			if ( destinations ) {
				destinations.delete( emitter );
			}
		}
	}
};

/**
 * Emitter/listener interface.
 *
 * Can be easily implemented by a class by mixing the {@link module:utils/emittermixin~EmitterMixin} mixin.
 *
 * @interface Emitter
 */

/**
 * Registers a callback function to be executed when an event is fired.
 *
 * Shorthand for {@link #listenTo `this.listenTo( this, event, callback, options )`} (it makes the emitter
 * listen on itself).
 *
 * @method #on
 * @param {String} event The name of the event.
 * @param {Function} callback The function to be called on event.
 * @param {Object} [options={}] Additional options.
 * @param {module:utils/priorities~PriorityString|Number} [options.priority='normal'] The priority of this event callback. The higher
 * the priority value the sooner the callback will be fired. Events having the same priority are called in the
 * order they were added.
 */

/**
 * Registers a callback function to be executed on the next time the event is fired only. This is similar to
 * calling {@link #on} followed by {@link #off} in the callback.
 *
 * @method #once
 * @param {String} event The name of the event.
 * @param {Function} callback The function to be called on event.
 * @param {Object} [options={}] Additional options.
 * @param {module:utils/priorities~PriorityString|Number} [options.priority='normal'] The priority of this event callback. The higher
 * the priority value the sooner the callback will be fired. Events having the same priority are called in the
 * order they were added.
 */

/**
 * Stops executing the callback on the given event.
 * Shorthand for {@link #stopListening `this.stopListening( this, event, callback )`}.
 *
 * @method #off
 * @param {String} event The name of the event.
 * @param {Function} callback The function to stop being called.
 */

/**
 * Registers a callback function to be executed when an event is fired in a specific (emitter) object.
 *
 * Events can be grouped in namespaces using `:`.
 * When namespaced event is fired, it additionally fires all callbacks for that namespace.
 *
 *		// myEmitter.on( ... ) is a shorthand for myEmitter.listenTo( myEmitter, ... ).
 *		myEmitter.on( 'myGroup', genericCallback );
 *		myEmitter.on( 'myGroup:myEvent', specificCallback );
 *
 *		// genericCallback is fired.
 *		myEmitter.fire( 'myGroup' );
 *		// both genericCallback and specificCallback are fired.
 *		myEmitter.fire( 'myGroup:myEvent' );
 *		// genericCallback is fired even though there are no callbacks for "foo".
 *		myEmitter.fire( 'myGroup:foo' );
 *
 * An event callback can {@link module:utils/eventinfo~EventInfo#stop stop the event} and
 * set the {@link module:utils/eventinfo~EventInfo#return return value} of the {@link #fire} method.
 *
 * @method #listenTo
 * @param {module:utils/emittermixin~Emitter} emitter The object that fires the event.
 * @param {String} event The name of the event.
 * @param {Function} callback The function to be called on event.
 * @param {Object} [options={}] Additional options.
 * @param {module:utils/priorities~PriorityString|Number} [options.priority='normal'] The priority of this event callback. The higher
 * the priority value the sooner the callback will be fired. Events having the same priority are called in the
 * order they were added.
 */

/**
 * Stops listening for events. It can be used at different levels:
 *
 * * To stop listening to a specific callback.
 * * To stop listening to a specific event.
 * * To stop listening to all events fired by a specific object.
 * * To stop listening to all events fired by all objects.
 *
 * @method #stopListening
 * @param {module:utils/emittermixin~Emitter} [emitter] The object to stop listening to. If omitted, stops it for all objects.
 * @param {String} [event] (Requires the `emitter`) The name of the event to stop listening to. If omitted, stops it
 * for all events from `emitter`.
 * @param {Function} [callback] (Requires the `event`) The function to be removed from the call list for the given
 * `event`.
 */

/**
 * Fires an event, executing all callbacks registered for it.
 *
 * The first parameter passed to callbacks is an {@link module:utils/eventinfo~EventInfo} object,
 * followed by the optional `args` provided in the `fire()` method call.
 *
 * @method #fire
 * @param {String|module:utils/eventinfo~EventInfo} eventOrInfo The name of the event or `EventInfo` object if event is delegated.
 * @param {...*} [args] Additional arguments to be passed to the callbacks.
 * @returns {*} By default the method returns `undefined`. However, the return value can be changed by listeners
 * through modification of the {@link module:utils/eventinfo~EventInfo#return `evt.return`}'s property (the event info
 * is the first param of every callback).
 */

/**
 * Delegates selected events to another {@link module:utils/emittermixin~Emitter}. For instance:
 *
 *		emitterA.delegate( 'eventX' ).to( emitterB );
 *		emitterA.delegate( 'eventX', 'eventY' ).to( emitterC );
 *
 * then `eventX` is delegated (fired by) `emitterB` and `emitterC` along with `data`:
 *
 *		emitterA.fire( 'eventX', data );
 *
 * and `eventY` is delegated (fired by) `emitterC` along with `data`:
 *
 *		emitterA.fire( 'eventY', data );
 *
 * @method #delegate
 * @param {...String} events Event names that will be delegated to another emitter.
 * @returns {module:utils/emittermixin~EmitterMixinDelegateChain}
 */

/**
 * Stops delegating events. It can be used at different levels:
 *
 * * To stop delegating all events.
 * * To stop delegating a specific event to all emitters.
 * * To stop delegating a specific event to a specific emitter.
 *
 * @method #stopDelegating
 * @param {String} [event] The name of the event to stop delegating. If omitted, stops it all delegations.
 * @param {module:utils/emittermixin~Emitter} [emitter] (requires `event`) The object to stop delegating a particular event to.
 * If omitted, stops delegation of `event` to all emitters.
 */

/**
 * Checks if `listeningEmitter` listens to an emitter with given `listenedToEmitterId` and if so, returns that emitter.
 * If not, returns `null`.
 *
 * @protected
 * @param {module:utils/emittermixin~Emitter} listeningEmitter An emitter that listens.
 * @param {String} listenedToEmitterId Unique emitter id of emitter listened to.
 * @returns {module:utils/emittermixin~Emitter|null}
 */
function _getEmitterListenedTo( listeningEmitter, listenedToEmitterId ) {
	if ( listeningEmitter[ _listeningTo ] && listeningEmitter[ _listeningTo ][ listenedToEmitterId ] ) {
		return listeningEmitter[ _listeningTo ][ listenedToEmitterId ].emitter;
	}

	return null;
}

/**
 * Sets emitter's unique id.
 *
 * **Note:** `_emitterId` can be set only once.
 *
 * @protected
 * @param {module:utils/emittermixin~Emitter} emitter An emitter for which id will be set.
 * @param {String} [id] Unique id to set. If not passed, random unique id will be set.
 */
function _setEmitterId( emitter, id ) {
	if ( !emitter[ _emitterId ] ) {
		emitter[ _emitterId ] = id || uid();
	}
}

/**
 * Returns emitter's unique id.
 *
 * @protected
 * @param {module:utils/emittermixin~Emitter} emitter An emitter which id will be returned.
 */
function _getEmitterId( emitter ) {
	return emitter[ _emitterId ];
}

// Gets the internal `_events` property of the given object.
// `_events` property store all lists with callbacks for registered event names.
// If there were no events registered on the object, empty `_events` object is created.
function getEvents( source ) {
	if ( !source._events ) {
		Object.defineProperty( source, '_events', {
			value: {}
		} );
	}

	return source._events;
}

// Creates event node for generic-specific events relation architecture.
function makeEventNode() {
	return {
		callbacks: [],
		childEvents: []
	};
}

// Creates an architecture for generic-specific events relation.
// If needed, creates all events for given eventName, i.e. if the first registered event
// is foo:bar:abc, it will create foo:bar:abc, foo:bar and foo event and tie them together.
// It also copies callbacks from more generic events to more specific events when
// specific events are created.
function createEventNamespace( source, eventName ) {
	const events = getEvents( source );

	// First, check if the event we want to add to the structure already exists.
	if ( events[ eventName ] ) {
		// If it exists, we don't have to do anything.
		return;
	}

	// In other case, we have to create the structure for the event.
	// Note, that we might need to create intermediate events too.
	// I.e. if foo:bar:abc is being registered and we only have foo in the structure,
	// we need to also register foo:bar.

	// Currently processed event name.
	let name = eventName;
	// Name of the event that is a child event for currently processed event.
	let childEventName = null;

	// Array containing all newly created specific events.
	const newEventNodes = [];

	// While loop can't check for ':' index because we have to handle generic events too.
	// In each loop, we truncate event name, going from the most specific name to the generic one.
	// I.e. foo:bar:abc -> foo:bar -> foo.
	while ( name !== '' ) {
		if ( events[ name ] ) {
			// If the currently processed event name is already registered, we can be sure
			// that it already has all the structure created, so we can break the loop here
			// as no more events need to be registered.
			break;
		}

		// If this event is not yet registered, create a new object for it.
		events[ name ] = makeEventNode();
		// Add it to the array with newly created events.
		newEventNodes.push( events[ name ] );

		// Add previously processed event name as a child of this event.
		if ( childEventName ) {
			events[ name ].childEvents.push( childEventName );
		}

		childEventName = name;
		// If `.lastIndexOf()` returns -1, `.substr()` will return '' which will break the loop.
		name = name.substr( 0, name.lastIndexOf( ':' ) );
	}

	if ( name !== '' ) {
		// If name is not empty, we found an already registered event that was a parent of the
		// event we wanted to register.

		// Copy that event's callbacks to newly registered events.
		for ( const node of newEventNodes ) {
			node.callbacks = events[ name ].callbacks.slice();
		}

		// Add last newly created event to the already registered event.
		events[ name ].childEvents.push( childEventName );
	}
}

// Gets an array containing callbacks list for a given event and it's more specific events.
// I.e. if given event is foo:bar and there is also foo:bar:abc event registered, this will
// return callback list of foo:bar and foo:bar:abc (but not foo).
function getCallbacksListsForNamespace( source, eventName ) {
	const eventNode = getEvents( source )[ eventName ];

	if ( !eventNode ) {
		return [];
	}

	let callbacksLists = [ eventNode.callbacks ];

	for ( let i = 0; i < eventNode.childEvents.length; i++ ) {
		const childCallbacksLists = getCallbacksListsForNamespace( source, eventNode.childEvents[ i ] );

		callbacksLists = callbacksLists.concat( childCallbacksLists );
	}

	return callbacksLists;
}

// Get the list of callbacks for a given event, but only if there any callbacks have been registered.
// If there are no callbacks registered for given event, it checks if this is a specific event and looks
// for callbacks for it's more generic version.
function getCallbacksForEvent( source, eventName ) {
	let event;

	if ( !source._events || !( event = source._events[ eventName ] ) || !event.callbacks.length ) {
		// There are no callbacks registered for specified eventName.
		// But this could be a specific-type event that is in a namespace.
		if ( eventName.indexOf( ':' ) > -1 ) {
			// If the eventName is specific, try to find callback lists for more generic event.
			return getCallbacksForEvent( source, eventName.substr( 0, eventName.lastIndexOf( ':' ) ) );
		} else {
			// If this is a top-level generic event, return null;
			return null;
		}
	}

	return event.callbacks;
}

// Fires delegated events for given map of destinations.
//
// @private
// * @param {Map.<utils.Emitter>} destinations A map containing
// `[ {@link module:utils/emittermixin~Emitter}, "event name" ]` pair destinations.
// * @param {utils.EventInfo} eventInfo The original event info object.
// * @param {Array.<*>} fireArgs Arguments the original event was fired with.
function fireDelegatedEvents( destinations, eventInfo, fireArgs ) {
	for ( let [ emitter, name ] of destinations ) {
		if ( !name ) {
			name = eventInfo.name;
		} else if ( typeof name == 'function' ) {
			name = name( eventInfo.name );
		}

		const delegatedInfo = new EventInfo( eventInfo.source, name );

		delegatedInfo.path = [ ...eventInfo.path ];

		emitter.fire( delegatedInfo, ...fireArgs );
	}
}

// Removes callback from emitter for given event.
//
// @param {module:utils/emittermixin~Emitter} emitter
// @param {String} event
// @param {Function} callback
function removeCallback( emitter, event, callback ) {
	const lists = getCallbacksListsForNamespace( emitter, event );

	for ( const callbacks of lists ) {
		for ( let i = 0; i < callbacks.length; i++ ) {
			if ( callbacks[ i ].callback == callback ) {
				// Remove the callback from the list (fixing the next index).
				callbacks.splice( i, 1 );
				i--;
			}
		}
	}
}

/**
 * The return value of {@link ~EmitterMixin#delegate}.
 *
 * @interface module:utils/emittermixin~EmitterMixinDelegateChain
 */

/**
 * Selects destination for {@link module:utils/emittermixin~EmitterMixin#delegate} events.
 *
 * @method #to
 * @param {module:utils/emittermixin~Emitter} emitter An `EmitterMixin` instance which is the destination for delegated events.
 * @param {String|Function} [nameOrFunction] A custom event name or function which converts the original name string.
 */

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var Symbol$1 = root.Symbol;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag$1 && symToStringTag$1 in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype,
    objectProto$2 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/* Built-in method references that are verified to be native. */
var WeakMap$1 = getNative(root, 'WeakMap');

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$2.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$4;

  return value === proto;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$5.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$3.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/** Detect free variable `exports`. */
var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports$1 && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule$1 && freeModule$1.require && freeModule$1.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$4.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$5.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$6.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

/**
 * This method is like `_.assign` except that it iterates over own and
 * inherited source properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @alias extend
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assign
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assignIn({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
 */
var assignIn = createAssigner(function(object, source) {
  copyObject(source, keysIn(source), object);
});

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$7.call(data, key) ? data[key] : undefined;
}

/** Used for built-in method references. */
var objectProto$a = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty$8.call(data, key);
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/* Built-in method references that are verified to be native. */
var Map$1 = getNative(root, 'Map');

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map$1 || ListCache),
    'string': new Hash
  };
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/** `Object#toString` result references. */
var objectTag$1 = '[object Object]';

/** Used for built-in method references. */
var funcProto$2 = Function.prototype,
    objectProto$b = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$2 = funcProto$2.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$b.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString$2.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag$1) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$9.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString$2.call(Ctor) == objectCtorString;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map$1 || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

/** Detect free variable `exports`. */
var freeExports$2 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$2 = freeExports$2 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;

/** Built-in value references. */
var Buffer$1 = moduleExports$2 ? root.Buffer : undefined,
    allocUnsafe = Buffer$1 ? Buffer$1.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/** Used for built-in method references. */
var objectProto$c = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$c.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable$1.call(object, symbol);
  });
};

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols$1 ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

/* Built-in method references that are verified to be native. */
var Set$1 = getNative(root, 'Set');

/** `Object#toString` result references. */
var mapTag$1 = '[object Map]',
    objectTag$2 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$1 = '[object Set]',
    weakMapTag$1 = '[object WeakMap]';

var dataViewTag$1 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map$1),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set$1),
    weakMapCtorString = toSource(WeakMap$1);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$1) ||
    (Map$1 && getTag(new Map$1) != mapTag$1) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set$1 && getTag(new Set$1) != setTag$1) ||
    (WeakMap$1 && getTag(new WeakMap$1) != weakMapTag$1)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag$2 ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag$1;
        case mapCtorString: return mapTag$1;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag$1;
        case weakMapCtorString: return weakMapTag$1;
      }
    }
    return result;
  };
}

const getTag$1 = getTag;

/** Used for built-in method references. */
var objectProto$d = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$a = objectProto$d.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty$a.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/** `Object#toString` result references. */
var boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    mapTag$2 = '[object Map]',
    numberTag$1 = '[object Number]',
    regexpTag$1 = '[object RegExp]',
    setTag$2 = '[object Set]',
    stringTag$1 = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$2 = '[object DataView]',
    float32Tag$1 = '[object Float32Array]',
    float64Tag$1 = '[object Float64Array]',
    int8Tag$1 = '[object Int8Array]',
    int16Tag$1 = '[object Int16Array]',
    int32Tag$1 = '[object Int32Array]',
    uint8Tag$1 = '[object Uint8Array]',
    uint8ClampedTag$1 = '[object Uint8ClampedArray]',
    uint16Tag$1 = '[object Uint16Array]',
    uint32Tag$1 = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object);

    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);

    case dataViewTag$2:
      return cloneDataView(object, isDeep);

    case float32Tag$1: case float64Tag$1:
    case int8Tag$1: case int16Tag$1: case int32Tag$1:
    case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
      return cloneTypedArray(object, isDeep);

    case mapTag$2:
      return new Ctor;

    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);

    case regexpTag$1:
      return cloneRegExp(object);

    case setTag$2:
      return new Ctor;

    case symbolTag:
      return cloneSymbol(object);
  }
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

/** `Object#toString` result references. */
var mapTag$3 = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike(value) && getTag$1(value) == mapTag$3;
}

/* Node.js helper references. */
var nodeIsMap = nodeUtil && nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

/** `Object#toString` result references. */
var setTag$3 = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike(value) && getTag$1(value) == setTag$3;
}

/* Node.js helper references. */
var nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    boolTag$2 = '[object Boolean]',
    dateTag$2 = '[object Date]',
    errorTag$1 = '[object Error]',
    funcTag$2 = '[object Function]',
    genTag$1 = '[object GeneratorFunction]',
    mapTag$4 = '[object Map]',
    numberTag$2 = '[object Number]',
    objectTag$3 = '[object Object]',
    regexpTag$2 = '[object RegExp]',
    setTag$4 = '[object Set]',
    stringTag$2 = '[object String]',
    symbolTag$1 = '[object Symbol]',
    weakMapTag$2 = '[object WeakMap]';

var arrayBufferTag$2 = '[object ArrayBuffer]',
    dataViewTag$3 = '[object DataView]',
    float32Tag$2 = '[object Float32Array]',
    float64Tag$2 = '[object Float64Array]',
    int8Tag$2 = '[object Int8Array]',
    int16Tag$2 = '[object Int16Array]',
    int32Tag$2 = '[object Int32Array]',
    uint8Tag$2 = '[object Uint8Array]',
    uint8ClampedTag$2 = '[object Uint8ClampedArray]',
    uint16Tag$2 = '[object Uint16Array]',
    uint32Tag$2 = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag$2] = cloneableTags[arrayTag$1] =
cloneableTags[arrayBufferTag$2] = cloneableTags[dataViewTag$3] =
cloneableTags[boolTag$2] = cloneableTags[dateTag$2] =
cloneableTags[float32Tag$2] = cloneableTags[float64Tag$2] =
cloneableTags[int8Tag$2] = cloneableTags[int16Tag$2] =
cloneableTags[int32Tag$2] = cloneableTags[mapTag$4] =
cloneableTags[numberTag$2] = cloneableTags[objectTag$3] =
cloneableTags[regexpTag$2] = cloneableTags[setTag$4] =
cloneableTags[stringTag$2] = cloneableTags[symbolTag$1] =
cloneableTags[uint8Tag$2] = cloneableTags[uint8ClampedTag$2] =
cloneableTags[uint16Tag$2] = cloneableTags[uint32Tag$2] = true;
cloneableTags[errorTag$1] = cloneableTags[funcTag$2] =
cloneableTags[weakMapTag$2] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag$1(value),
        isFunc = tag == funcTag$2 || tag == genTag$1;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag$3 || tag == argsTag$2 || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG$1 = 1,
    CLONE_SYMBOLS_FLAG$1 = 4;

/**
 * This method is like `_.cloneWith` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @param {Function} [customizer] The function to customize cloning.
 * @returns {*} Returns the deep cloned value.
 * @see _.cloneWith
 * @example
 *
 * function customizer(value) {
 *   if (_.isElement(value)) {
 *     return value.cloneNode(true);
 *   }
 * }
 *
 * var el = _.cloneDeepWith(document.body, customizer);
 *
 * console.log(el === document.body);
 * // => false
 * console.log(el.nodeName);
 * // => 'BODY'
 * console.log(el.childNodes.length);
 * // => 20
 */
function cloneDeepWith(value, customizer) {
  customizer = typeof customizer == 'function' ? customizer : undefined;
  return baseClone(value, CLONE_DEEP_FLAG$1 | CLONE_SYMBOLS_FLAG$1, customizer);
}

/**
 * Checks if `value` is likely a DOM element.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
 * @example
 *
 * _.isElement(document.body);
 * // => true
 *
 * _.isElement('<body>');
 * // => false
 */
function isElement(value) {
  return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

const observablePropertiesSymbol = Symbol( 'observableProperties' );
const boundObservablesSymbol = Symbol( 'boundObservables' );
const boundPropertiesSymbol = Symbol( 'boundProperties' );

/**
 * A mixin that injects the "observable properties" and data binding functionality described in the
 * {@link ~Observable} interface.
 *
 * Read more about the concept of observables in the:
 * * {@glink framework/guides/architecture/core-editor-architecture#event-system-and-observables "Event system and observables"}
 * section of the {@glink framework/guides/architecture/core-editor-architecture "Core editor architecture"} guide,
 * * {@glink framework/guides/deep-dive/observables "Observables" deep dive} guide.
 *
 * @mixin ObservableMixin
 * @mixes module:utils/emittermixin~EmitterMixin
 * @implements module:utils/observablemixin~Observable
 */
const ObservableMixin = {
	/**
	 * @inheritDoc
	 */
	set( name, value ) {
		// If the first parameter is an Object, iterate over its properties.
		if ( isObject( name ) ) {
			Object.keys( name ).forEach( property => {
				this.set( property, name[ property ] );
			}, this );

			return;
		}

		initObservable( this );

		const properties = this[ observablePropertiesSymbol ];

		if ( ( name in this ) && !properties.has( name ) ) {
			/**
			 * Cannot override an existing property.
			 *
			 * This error is thrown when trying to {@link ~Observable#set set} a property with
			 * a name of an already existing property. For example:
			 *
			 *		let observable = new Model();
			 *		observable.property = 1;
			 *		observable.set( 'property', 2 );			// throws
			 *
			 *		observable.set( 'property', 1 );
			 *		observable.set( 'property', 2 );			// ok, because this is an existing property.
			 *
			 * @error observable-set-cannot-override
			 */
			throw new CKEditorError( 'observable-set-cannot-override', this );
		}

		Object.defineProperty( this, name, {
			enumerable: true,
			configurable: true,

			get() {
				return properties.get( name );
			},

			set( value ) {
				const oldValue = properties.get( name );

				// Fire `set` event before the new value will be set to make it possible
				// to override observable property without affecting `change` event.
				// See https://github.com/ckeditor/ckeditor5-utils/issues/171.
				let newValue = this.fire( 'set:' + name, name, value, oldValue );

				if ( newValue === undefined ) {
					newValue = value;
				}

				// Allow undefined as an initial value like A.define( 'x', undefined ) (#132).
				// Note: When properties map has no such own property, then its value is undefined.
				if ( oldValue !== newValue || !properties.has( name ) ) {
					properties.set( name, newValue );
					this.fire( 'change:' + name, name, newValue, oldValue );
				}
			}
		} );

		this[ name ] = value;
	},

	/**
	 * @inheritDoc
	 */
	bind( ...bindProperties ) {
		if ( !bindProperties.length || !isStringArray( bindProperties ) ) {
			/**
			 * All properties must be strings.
			 *
			 * @error observable-bind-wrong-properties
			 */
			throw new CKEditorError( 'observable-bind-wrong-properties', this );
		}

		if ( ( new Set( bindProperties ) ).size !== bindProperties.length ) {
			/**
			 * Properties must be unique.
			 *
			 * @error observable-bind-duplicate-properties
			 */
			throw new CKEditorError( 'observable-bind-duplicate-properties', this );
		}

		initObservable( this );

		const boundProperties = this[ boundPropertiesSymbol ];

		bindProperties.forEach( propertyName => {
			if ( boundProperties.has( propertyName ) ) {
				/**
				 * Cannot bind the same property more than once.
				 *
				 * @error observable-bind-rebind
				 */
				throw new CKEditorError( 'observable-bind-rebind', this );
			}
		} );

		const bindings = new Map();

		// @typedef {Object} Binding
		// @property {Array} property Property which is bound.
		// @property {Array} to Array of observable–property components of the binding (`{ observable: ..., property: .. }`).
		// @property {Array} callback A function which processes `to` components.
		bindProperties.forEach( a => {
			const binding = { property: a, to: [] };

			boundProperties.set( a, binding );
			bindings.set( a, binding );
		} );

		// @typedef {Object} BindChain
		// @property {Function} to See {@link ~ObservableMixin#_bindTo}.
		// @property {Function} toMany See {@link ~ObservableMixin#_bindToMany}.
		// @property {module:utils/observablemixin~Observable} _observable The observable which initializes the binding.
		// @property {Array} _bindProperties Array of `_observable` properties to be bound.
		// @property {Array} _to Array of `to()` observable–properties (`{ observable: toObservable, properties: ...toProperties }`).
		// @property {Map} _bindings Stores bindings to be kept in
		// {@link ~ObservableMixin#_boundProperties}/{@link ~ObservableMixin#_boundObservables}
		// initiated in this binding chain.
		return {
			to: bindTo,
			toMany: bindToMany,

			_observable: this,
			_bindProperties: bindProperties,
			_to: [],
			_bindings: bindings
		};
	},

	/**
	 * @inheritDoc
	 */
	unbind( ...unbindProperties ) {
		// Nothing to do here if not inited yet.
		if ( !( this[ observablePropertiesSymbol ] ) ) {
			return;
		}

		const boundProperties = this[ boundPropertiesSymbol ];
		const boundObservables = this[ boundObservablesSymbol ];

		if ( unbindProperties.length ) {
			if ( !isStringArray( unbindProperties ) ) {
				/**
				 * Properties must be strings.
				 *
				 * @error observable-unbind-wrong-properties
				 */
				throw new CKEditorError( 'observable-unbind-wrong-properties', this );
			}

			unbindProperties.forEach( propertyName => {
				const binding = boundProperties.get( propertyName );

				// Nothing to do if the binding is not defined
				if ( !binding ) {
					return;
				}

				let toObservable, toProperty, toProperties, toPropertyBindings;

				binding.to.forEach( to => {
					// TODO: ES6 destructuring.
					toObservable = to[ 0 ];
					toProperty = to[ 1 ];
					toProperties = boundObservables.get( toObservable );
					toPropertyBindings = toProperties[ toProperty ];

					toPropertyBindings.delete( binding );

					if ( !toPropertyBindings.size ) {
						delete toProperties[ toProperty ];
					}

					if ( !Object.keys( toProperties ).length ) {
						boundObservables.delete( toObservable );
						this.stopListening( toObservable, 'change' );
					}
				} );

				boundProperties.delete( propertyName );
			} );
		} else {
			boundObservables.forEach( ( bindings, boundObservable ) => {
				this.stopListening( boundObservable, 'change' );
			} );

			boundObservables.clear();
			boundProperties.clear();
		}
	},

	/**
	 * @inheritDoc
	 */
	decorate( methodName ) {
		const originalMethod = this[ methodName ];

		if ( !originalMethod ) {
			/**
			 * Cannot decorate an undefined method.
			 *
			 * @error observablemixin-cannot-decorate-undefined
			 * @param {Object} object The object which method should be decorated.
			 * @param {String} methodName Name of the method which does not exist.
			 */
			throw new CKEditorError(
				'observablemixin-cannot-decorate-undefined',
				this,
				{ object: this, methodName }
			);
		}

		this.on( methodName, ( evt, args ) => {
			evt.return = originalMethod.apply( this, args );
		} );

		this[ methodName ] = function( ...args ) {
			return this.fire( methodName, args );
		};
	}
};

assignIn( ObservableMixin, EmitterMixin );

// Init symbol properties needed for the observable mechanism to work.
//
// @private
// @param {module:utils/observablemixin~ObservableMixin} observable
function initObservable( observable ) {
	// Do nothing if already inited.
	if ( observable[ observablePropertiesSymbol ] ) {
		return;
	}

	// The internal hash containing the observable's state.
	//
	// @private
	// @type {Map}
	Object.defineProperty( observable, observablePropertiesSymbol, {
		value: new Map()
	} );

	// Map containing bindings to external observables. It shares the binding objects
	// (`{ observable: A, property: 'a', to: ... }`) with {@link module:utils/observablemixin~ObservableMixin#_boundProperties} and
	// it is used to observe external observables to update own properties accordingly.
	// See {@link module:utils/observablemixin~ObservableMixin#bind}.
	//
	//		A.bind( 'a', 'b', 'c' ).to( B, 'x', 'y', 'x' );
	//		console.log( A._boundObservables );
	//
	//			Map( {
	//				B: {
	//					x: Set( [
	//						{ observable: A, property: 'a', to: [ [ B, 'x' ] ] },
	//						{ observable: A, property: 'c', to: [ [ B, 'x' ] ] }
	//					] ),
	//					y: Set( [
	//						{ observable: A, property: 'b', to: [ [ B, 'y' ] ] },
	//					] )
	//				}
	//			} )
	//
	//		A.bind( 'd' ).to( B, 'z' ).to( C, 'w' ).as( callback );
	//		console.log( A._boundObservables );
	//
	//			Map( {
	//				B: {
	//					x: Set( [
	//						{ observable: A, property: 'a', to: [ [ B, 'x' ] ] },
	//						{ observable: A, property: 'c', to: [ [ B, 'x' ] ] }
	//					] ),
	//					y: Set( [
	//						{ observable: A, property: 'b', to: [ [ B, 'y' ] ] },
	//					] ),
	//					z: Set( [
	//						{ observable: A, property: 'd', to: [ [ B, 'z' ], [ C, 'w' ] ], callback: callback }
	//					] )
	//				},
	//				C: {
	//					w: Set( [
	//						{ observable: A, property: 'd', to: [ [ B, 'z' ], [ C, 'w' ] ], callback: callback }
	//					] )
	//				}
	//			} )
	//
	// @private
	// @type {Map}
	Object.defineProperty( observable, boundObservablesSymbol, {
		value: new Map()
	} );

	// Object that stores which properties of this observable are bound and how. It shares
	// the binding objects (`{ observable: A, property: 'a', to: ... }`) with
	// {@link module:utils/observablemixin~ObservableMixin#_boundObservables}. This data structure is
	// a reverse of {@link module:utils/observablemixin~ObservableMixin#_boundObservables} and it is helpful for
	// {@link module:utils/observablemixin~ObservableMixin#unbind}.
	//
	// See {@link module:utils/observablemixin~ObservableMixin#bind}.
	//
	//		A.bind( 'a', 'b', 'c' ).to( B, 'x', 'y', 'x' );
	//		console.log( A._boundProperties );
	//
	//			Map( {
	//				a: { observable: A, property: 'a', to: [ [ B, 'x' ] ] },
	//				b: { observable: A, property: 'b', to: [ [ B, 'y' ] ] },
	//				c: { observable: A, property: 'c', to: [ [ B, 'x' ] ] }
	//			} )
	//
	//		A.bind( 'd' ).to( B, 'z' ).to( C, 'w' ).as( callback );
	//		console.log( A._boundProperties );
	//
	//			Map( {
	//				a: { observable: A, property: 'a', to: [ [ B, 'x' ] ] },
	//				b: { observable: A, property: 'b', to: [ [ B, 'y' ] ] },
	//				c: { observable: A, property: 'c', to: [ [ B, 'x' ] ] },
	//				d: { observable: A, property: 'd', to: [ [ B, 'z' ], [ C, 'w' ] ], callback: callback }
	//			} )
	//
	// @private
	// @type {Map}
	Object.defineProperty( observable, boundPropertiesSymbol, {
		value: new Map()
	} );
}

// A chaining for {@link module:utils/observablemixin~ObservableMixin#bind} providing `.to()` interface.
//
// @private
// @param {...[Observable|String|Function]} args Arguments of the `.to( args )` binding.
function bindTo( ...args ) {
	const parsedArgs = parseBindToArgs( ...args );
	const bindingsKeys = Array.from( this._bindings.keys() );
	const numberOfBindings = bindingsKeys.length;

	// Eliminate A.bind( 'x' ).to( B, C )
	if ( !parsedArgs.callback && parsedArgs.to.length > 1 ) {
		/**
		 * Binding multiple observables only possible with callback.
		 *
		 * @error observable-bind-to-no-callback
		 */
		throw new CKEditorError( 'observable-bind-to-no-callback', this );
	}

	// Eliminate A.bind( 'x', 'y' ).to( B, callback )
	if ( numberOfBindings > 1 && parsedArgs.callback ) {
		/**
		 * Cannot bind multiple properties and use a callback in one binding.
		 *
		 * @error observable-bind-to-extra-callback
		 */
		throw new CKEditorError(
			'observable-bind-to-extra-callback',
			this
		);
	}

	parsedArgs.to.forEach( to => {
		// Eliminate A.bind( 'x', 'y' ).to( B, 'a' )
		if ( to.properties.length && to.properties.length !== numberOfBindings ) {
			/**
			 * The number of properties must match.
			 *
			 * @error observable-bind-to-properties-length
			 */
			throw new CKEditorError( 'observable-bind-to-properties-length', this );
		}

		// When no to.properties specified, observing source properties instead i.e.
		// A.bind( 'x', 'y' ).to( B ) -> Observe B.x and B.y
		if ( !to.properties.length ) {
			to.properties = this._bindProperties;
		}
	} );

	this._to = parsedArgs.to;

	// Fill {@link BindChain#_bindings} with callback. When the callback is set there's only one binding.
	if ( parsedArgs.callback ) {
		this._bindings.get( bindingsKeys[ 0 ] ).callback = parsedArgs.callback;
	}

	attachBindToListeners( this._observable, this._to );

	// Update observable._boundProperties and observable._boundObservables.
	updateBindToBound( this );

	// Set initial values of bound properties.
	this._bindProperties.forEach( propertyName => {
		updateBoundObservableProperty( this._observable, propertyName );
	} );
}

// Binds to an attribute in a set of iterable observables.
//
// @private
// @param {Array.<Observable>} observables
// @param {String} attribute
// @param {Function} callback
function bindToMany( observables, attribute, callback ) {
	if ( this._bindings.size > 1 ) {
		/**
		 * Binding one attribute to many observables only possible with one attribute.
		 *
		 * @error observable-bind-to-many-not-one-binding
		 */
		throw new CKEditorError( 'observable-bind-to-many-not-one-binding', this );
	}

	this.to(
		// Bind to #attribute of each observable...
		...getBindingTargets( observables, attribute ),
		// ...using given callback to parse attribute values.
		callback
	);
}

// Returns an array of binding components for
// {@link Observable#bind} from a set of iterable observables.
//
// @param {Array.<Observable>} observables
// @param {String} attribute
// @returns {Array.<String|Observable>}
function getBindingTargets( observables, attribute ) {
	const observableAndAttributePairs = observables.map( observable => [ observable, attribute ] );

	// Merge pairs to one-dimension array of observables and attributes.
	return Array.prototype.concat.apply( [], observableAndAttributePairs );
}

// Check if all entries of the array are of `String` type.
//
// @private
// @param {Array} arr An array to be checked.
// @returns {Boolean}
function isStringArray( arr ) {
	return arr.every( a => typeof a == 'string' );
}

// Parses and validates {@link Observable#bind}`.to( args )` arguments and returns
// an object with a parsed structure. For example
//
//		A.bind( 'x' ).to( B, 'a', C, 'b', call );
//
// becomes
//
//		{
//			to: [
//				{ observable: B, properties: [ 'a' ] },
//				{ observable: C, properties: [ 'b' ] },
//			],
//			callback: call
// 		}
//
// @private
// @param {...*} args Arguments of {@link Observable#bind}`.to( args )`.
// @returns {Object}
function parseBindToArgs( ...args ) {
	// Eliminate A.bind( 'x' ).to()
	if ( !args.length ) {
		/**
		 * Invalid argument syntax in `to()`.
		 *
		 * @error observable-bind-to-parse-error
		 */
		throw new CKEditorError( 'observable-bind-to-parse-error', null );
	}

	const parsed = { to: [] };
	let lastObservable;

	if ( typeof args[ args.length - 1 ] == 'function' ) {
		parsed.callback = args.pop();
	}

	args.forEach( a => {
		if ( typeof a == 'string' ) {
			lastObservable.properties.push( a );
		} else if ( typeof a == 'object' ) {
			lastObservable = { observable: a, properties: [] };
			parsed.to.push( lastObservable );
		} else {
			throw new CKEditorError( 'observable-bind-to-parse-error', null );
		}
	} );

	return parsed;
}

// Synchronizes {@link module:utils/observablemixin#_boundObservables} with {@link Binding}.
//
// @private
// @param {Binding} binding A binding to store in {@link Observable#_boundObservables}.
// @param {Observable} toObservable A observable, which is a new component of `binding`.
// @param {String} toPropertyName A name of `toObservable`'s property, a new component of the `binding`.
function updateBoundObservables( observable, binding, toObservable, toPropertyName ) {
	const boundObservables = observable[ boundObservablesSymbol ];
	const bindingsToObservable = boundObservables.get( toObservable );
	const bindings = bindingsToObservable || {};

	if ( !bindings[ toPropertyName ] ) {
		bindings[ toPropertyName ] = new Set();
	}

	// Pass the binding to a corresponding Set in `observable._boundObservables`.
	bindings[ toPropertyName ].add( binding );

	if ( !bindingsToObservable ) {
		boundObservables.set( toObservable, bindings );
	}
}

// Synchronizes {@link Observable#_boundProperties} and {@link Observable#_boundObservables}
// with {@link BindChain}.
//
// Assuming the following binding being created
//
// 		A.bind( 'a', 'b' ).to( B, 'x', 'y' );
//
// the following bindings were initialized by {@link Observable#bind} in {@link BindChain#_bindings}:
//
// 		{
// 			a: { observable: A, property: 'a', to: [] },
// 			b: { observable: A, property: 'b', to: [] },
// 		}
//
// Iterate over all bindings in this chain and fill their `to` properties with
// corresponding to( ... ) arguments (components of the binding), so
//
// 		{
// 			a: { observable: A, property: 'a', to: [ B, 'x' ] },
// 			b: { observable: A, property: 'b', to: [ B, 'y' ] },
// 		}
//
// Then update the structure of {@link Observable#_boundObservables} with updated
// binding, so it becomes:
//
// 		Map( {
// 			B: {
// 				x: Set( [
// 					{ observable: A, property: 'a', to: [ [ B, 'x' ] ] }
// 				] ),
// 				y: Set( [
// 					{ observable: A, property: 'b', to: [ [ B, 'y' ] ] },
// 				] )
//			}
// 		} )
//
// @private
// @param {BindChain} chain The binding initialized by {@link Observable#bind}.
function updateBindToBound( chain ) {
	let toProperty;

	chain._bindings.forEach( ( binding, propertyName ) => {
		// Note: For a binding without a callback, this will run only once
		// like in A.bind( 'x', 'y' ).to( B, 'a', 'b' )
		// TODO: ES6 destructuring.
		chain._to.forEach( to => {
			toProperty = to.properties[ binding.callback ? 0 : chain._bindProperties.indexOf( propertyName ) ];

			binding.to.push( [ to.observable, toProperty ] );
			updateBoundObservables( chain._observable, binding, to.observable, toProperty );
		} );
	} );
}

// Updates an property of a {@link Observable} with a value
// determined by an entry in {@link Observable#_boundProperties}.
//
// @private
// @param {Observable} observable A observable which property is to be updated.
// @param {String} propertyName An property to be updated.
function updateBoundObservableProperty( observable, propertyName ) {
	const boundProperties = observable[ boundPropertiesSymbol ];
	const binding = boundProperties.get( propertyName );
	let propertyValue;

	// When a binding with callback is created like
	//
	// 		A.bind( 'a' ).to( B, 'b', C, 'c', callback );
	//
	// collect B.b and C.c, then pass them to callback to set A.a.
	if ( binding.callback ) {
		propertyValue = binding.callback.apply( observable, binding.to.map( to => to[ 0 ][ to[ 1 ] ] ) );
	} else {
		propertyValue = binding.to[ 0 ];
		propertyValue = propertyValue[ 0 ][ propertyValue[ 1 ] ];
	}

	if ( Object.prototype.hasOwnProperty.call( observable, propertyName ) ) {
		observable[ propertyName ] = propertyValue;
	} else {
		observable.set( propertyName, propertyValue );
	}
}

// Starts listening to changes in {@link BindChain._to} observables to update
// {@link BindChain._observable} {@link BindChain._bindProperties}. Also sets the
// initial state of {@link BindChain._observable}.
//
// @private
// @param {BindChain} chain The chain initialized by {@link Observable#bind}.
function attachBindToListeners( observable, toBindings ) {
	toBindings.forEach( to => {
		const boundObservables = observable[ boundObservablesSymbol ];
		let bindings;

		// If there's already a chain between the observables (`observable` listens to
		// `to.observable`), there's no need to create another `change` event listener.
		if ( !boundObservables.get( to.observable ) ) {
			observable.listenTo( to.observable, 'change', ( evt, propertyName ) => {
				bindings = boundObservables.get( to.observable )[ propertyName ];

				// Note: to.observable will fire for any property change, react
				// to changes of properties which are bound only.
				if ( bindings ) {
					bindings.forEach( binding => {
						updateBoundObservableProperty( observable, binding.property );
					} );
				}
			} );
		}
	} );
}

/**
 * An interface which adds "observable properties" and data binding functionality.
 *
 * Can be easily implemented by a class by mixing the {@link module:utils/observablemixin~ObservableMixin} mixin.
 *
 * Read more about the usage of this interface in the:
 * * {@glink framework/guides/architecture/core-editor-architecture#event-system-and-observables "Event system and observables"}
 * section of the {@glink framework/guides/architecture/core-editor-architecture "Core editor architecture"} guide,
 * * {@glink framework/guides/deep-dive/observables "Observables" deep dive} guide.
 *
 * @interface Observable
 * @extends module:utils/emittermixin~Emitter
 */

/**
 * Fired when a property changed value.
 *
 *		observable.set( 'prop', 1 );
 *
 *		observable.on( 'change:prop', ( evt, propertyName, newValue, oldValue ) => {
 *			console.log( `${ propertyName } has changed from ${ oldValue } to ${ newValue }` );
 *		} );
 *
 *		observable.prop = 2; // -> 'prop has changed from 1 to 2'
 *
 * @event change:{property}
 * @param {String} name The property name.
 * @param {*} value The new property value.
 * @param {*} oldValue The previous property value.
 */

/**
 * Fired when a property value is going to be set but is not set yet (before the `change` event is fired).
 *
 * You can control the final value of the property by using
 * the {@link module:utils/eventinfo~EventInfo#return event's `return` property}.
 *
 *		observable.set( 'prop', 1 );
 *
 *		observable.on( 'set:prop', ( evt, propertyName, newValue, oldValue ) => {
 *			console.log( `Value is going to be changed from ${ oldValue } to ${ newValue }` );
 *			console.log( `Current property value is ${ observable[ propertyName ] }` );
 *
 *			// Let's override the value.
 *			evt.return = 3;
 *		} );
 *
 *		observable.on( 'change:prop', ( evt, propertyName, newValue, oldValue ) => {
 *			console.log( `Value has changed from ${ oldValue } to ${ newValue }` );
 *		} );
 *
 *		observable.prop = 2; // -> 'Value is going to be changed from 1 to 2'
 *		                     // -> 'Current property value is 1'
 *		                     // -> 'Value has changed from 1 to 3'
 *
 * **Note:** The event is fired even when the new value is the same as the old value.
 *
 * @event set:{property}
 * @param {String} name The property name.
 * @param {*} value The new property value.
 * @param {*} oldValue The previous property value.
 */

/**
 * Creates and sets the value of an observable property of this object. Such a property becomes a part
 * of the state and is observable.
 *
 * It accepts also a single object literal containing key/value pairs with properties to be set.
 *
 * This method throws the `observable-set-cannot-override` error if the observable instance already
 * has a property with the given property name. This prevents from mistakenly overriding existing
 * properties and methods, but means that `foo.set( 'bar', 1 )` may be slightly slower than `foo.bar = 1`.
 *
 * @method #set
 * @param {String|Object} name The property's name or object with `name=>value` pairs.
 * @param {*} [value] The property's value (if `name` was passed in the first parameter).
 */

/**
 * Binds {@link #set observable properties} to other objects implementing the
 * {@link module:utils/observablemixin~Observable} interface.
 *
 * Read more in the {@glink framework/guides/deep-dive/observables#property-bindings dedicated guide}
 * covering the topic of property bindings with some additional examples.
 *
 * Consider two objects: a `button` and an associated `command` (both `Observable`).
 *
 * A simple property binding could be as follows:
 *
 *		button.bind( 'isEnabled' ).to( command, 'isEnabled' );
 *
 * or even shorter:
 *
 *		button.bind( 'isEnabled' ).to( command );
 *
 * which works in the following way:
 *
 * * `button.isEnabled` **instantly equals** `command.isEnabled`,
 * * whenever `command.isEnabled` changes, `button.isEnabled` will immediately reflect its value.
 *
 * **Note**: To release the binding, use {@link module:utils/observablemixin~Observable#unbind}.
 *
 * You can also "rename" the property in the binding by specifying the new name in the `to()` chain:
 *
 *		button.bind( 'isEnabled' ).to( command, 'isWorking' );
 *
 * It is possible to bind more than one property at a time to shorten the code:
 *
 *		button.bind( 'isEnabled', 'value' ).to( command );
 *
 * which corresponds to:
 *
 *		button.bind( 'isEnabled' ).to( command );
 *		button.bind( 'value' ).to( command );
 *
 * The binding can include more than one observable, combining multiple data sources in a custom callback:
 *
 *		button.bind( 'isEnabled' ).to( command, 'isEnabled', ui, 'isVisible',
 *			( isCommandEnabled, isUIVisible ) => isCommandEnabled && isUIVisible );
 *
 * Using a custom callback allows processing the value before passing it to the target property:
 *
 *		button.bind( 'isEnabled' ).to( command, 'value', value => value === 'heading1' );
 *
 * It is also possible to bind to the same property in an array of observables.
 * To bind a `button` to multiple commands (also `Observables`) so that each and every one of them
 * must be enabled for the button to become enabled, use the following code:
 *
 *		button.bind( 'isEnabled' ).toMany( [ commandA, commandB, commandC ], 'isEnabled',
 *			( isAEnabled, isBEnabled, isCEnabled ) => isAEnabled && isBEnabled && isCEnabled );
 *
 * @method #bind
 * @param {...String} bindProperties Observable properties that will be bound to other observable(s).
 * @returns {Object} The bind chain with the `to()` and `toMany()` methods.
 */

/**
 * Removes the binding created with {@link #bind}.
 *
 *		// Removes the binding for the 'a' property.
 *		A.unbind( 'a' );
 *
 *		// Removes bindings for all properties.
 *		A.unbind();
 *
 * @method #unbind
 * @param {...String} [unbindProperties] Observable properties to be unbound. All the bindings will
 * be released if no properties are provided.
 */

/**
 * Turns the given methods of this object into event-based ones. This means that the new method will fire an event
 * (named after the method) and the original action will be plugged as a listener to that event.
 *
 * Read more in the {@glink framework/guides/deep-dive/observables#decorating-object-methods dedicated guide}
 * covering the topic of decorating methods with some additional examples.
 *
 * Decorating the method does not change its behavior (it only adds an event),
 * but it allows to modify it later on by listening to the method's event.
 *
 * For example, to cancel the method execution the event can be {@link module:utils/eventinfo~EventInfo#stop stopped}:
 *
 *		class Foo {
 *			constructor() {
 *				this.decorate( 'method' );
 *			}
 *
 *			method() {
 *				console.log( 'called!' );
 *			}
 *		}
 *
 *		const foo = new Foo();
 *		foo.on( 'method', ( evt ) => {
 *			evt.stop();
 *		}, { priority: 'high' } );
 *
 *		foo.method(); // Nothing is logged.
 *
 *
 * **Note**: The high {@link module:utils/priorities~PriorityString priority} listener
 * has been used to execute this particular callback before the one which calls the original method
 * (which uses the "normal" priority).
 *
 * It is also possible to change the returned value:
 *
 *		foo.on( 'method', ( evt ) => {
 *			evt.return = 'Foo!';
 *		} );
 *
 *		foo.method(); // -> 'Foo'
 *
 * Finally, it is possible to access and modify the arguments the method is called with:
 *
 *		method( a, b ) {
 *			console.log( `${ a }, ${ b }`  );
 *		}
 *
 *		// ...
 *
 *		foo.on( 'method', ( evt, args ) => {
 *			args[ 0 ] = 3;
 *
 *			console.log( args[ 1 ] ); // -> 2
 *		}, { priority: 'high' } );
 *
 *		foo.method( 1, 2 ); // -> '3, 2'
 *
 * @method #decorate
 * @param {String} methodName Name of the method to decorate.
 */

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module utils/mix
 */

/**
 * Copies enumerable properties and symbols from the objects given as 2nd+ parameters to the
 * prototype of first object (a constructor).
 *
 *		class Editor {
 *			...
 *		}
 *
 *		const SomeMixin = {
 *			a() {
 *				return 'a';
 *			}
 *		};
 *
 *		mix( Editor, SomeMixin, ... );
 *
 *		new Editor().a(); // -> 'a'
 *
 * Note: Properties which already exist in the base class will not be overriden.
 *
 * @param {Function} [baseClass] Class which prototype will be extended.
 * @param {Object} [...mixins] Objects from which to get properties.
 */
function mix( baseClass, ...mixins ) {
	mixins.forEach( mixin => {
		Object.getOwnPropertyNames( mixin ).concat( Object.getOwnPropertySymbols( mixin ) )
			.forEach( key => {
				if ( key in baseClass.prototype ) {
					return;
				}

				const sourceDescriptor = Object.getOwnPropertyDescriptor( mixin, key );
				sourceDescriptor.enumerable = false;

				Object.defineProperty( baseClass.prototype, key, sourceDescriptor );
			} );
	} );
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * The base class for CKEditor plugin classes.
 *
 * @implements module:core/plugin~PluginInterface
 * @mixes module:utils/observablemixin~ObservableMixin
 */
class Plugin {
	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
		/**
		 * The editor instance.
		 *
		 * Note that most editors implement the {@link module:core/editor/editorwithui~EditorWithUI} interface in addition
		 * to the base {@link module:core/editor/editor~Editor} interface. However, editors with an external UI
		 * (i.e. Bootstrap-based) or a headless editor may not implement the {@link module:core/editor/editorwithui~EditorWithUI}
		 * interface.
		 *
		 * Because of above, to make plugins more universal, it is recommended to split features into:
		 *  - The "editing" part that only uses the {@link module:core/editor/editor~Editor} interface.
		 *  - The "UI" part that uses both the {@link module:core/editor/editor~Editor} interface and
		 *  the {@link module:core/editor/editorwithui~EditorWithUI} interface.
		 *
		 * @readonly
		 * @member {module:core/editor/editor~Editor} #editor
		 */
		this.editor = editor;

		/**
		 * Flag indicating whether a plugin is enabled or disabled.
		 * A disabled plugin will not transform text.
		 *
		 * Plugin can be simply disabled like that:
		 *
		 *		// Disable the plugin so that no toolbars are visible.
		 *		editor.plugins.get( 'TextTransformation' ).isEnabled = false;
		 *
		 * You can also use {@link #forceDisabled} method.
		 *
		 * @observable
		 * @readonly
		 * @member {Boolean} #isEnabled
		 */
		this.set( 'isEnabled', true );

		/**
		 * Holds identifiers for {@link #forceDisabled} mechanism.
		 *
		 * @type {Set.<String>}
		 * @private
		 */
		this._disableStack = new Set();
	}

	/**
	 * Disables the plugin.
	 *
	 * Plugin may be disabled by multiple features or algorithms (at once). When disabling a plugin, unique id should be passed
	 * (e.g. feature name). The same identifier should be used when {@link #clearForceDisabled enabling back} the plugin.
	 * The plugin becomes enabled only after all features {@link #clearForceDisabled enabled it back}.
	 *
	 * Disabling and enabling a plugin:
	 *
	 *		plugin.isEnabled; // -> true
	 *		plugin.forceDisabled( 'MyFeature' );
	 *		plugin.isEnabled; // -> false
	 *		plugin.clearForceDisabled( 'MyFeature' );
	 *		plugin.isEnabled; // -> true
	 *
	 * Plugin disabled by multiple features:
	 *
	 *		plugin.forceDisabled( 'MyFeature' );
	 *		plugin.forceDisabled( 'OtherFeature' );
	 *		plugin.clearForceDisabled( 'MyFeature' );
	 *		plugin.isEnabled; // -> false
	 *		plugin.clearForceDisabled( 'OtherFeature' );
	 *		plugin.isEnabled; // -> true
	 *
	 * Multiple disabling with the same identifier is redundant:
	 *
	 *		plugin.forceDisabled( 'MyFeature' );
	 *		plugin.forceDisabled( 'MyFeature' );
	 *		plugin.clearForceDisabled( 'MyFeature' );
	 *		plugin.isEnabled; // -> true
	 *
	 * **Note:** some plugins or algorithms may have more complex logic when it comes to enabling or disabling certain plugins,
	 * so the plugin might be still disabled after {@link #clearForceDisabled} was used.
	 *
	 * @param {String} id Unique identifier for disabling. Use the same id when {@link #clearForceDisabled enabling back} the plugin.
	 */
	forceDisabled( id ) {
		this._disableStack.add( id );

		if ( this._disableStack.size == 1 ) {
			this.on( 'set:isEnabled', forceDisable, { priority: 'highest' } );
			this.isEnabled = false;
		}
	}

	/**
	 * Clears forced disable previously set through {@link #forceDisabled}. See {@link #forceDisabled}.
	 *
	 * @param {String} id Unique identifier, equal to the one passed in {@link #forceDisabled} call.
	 */
	clearForceDisabled( id ) {
		this._disableStack.delete( id );

		if ( this._disableStack.size == 0 ) {
			this.off( 'set:isEnabled', forceDisable );
			this.isEnabled = true;
		}
	}

	/**
	 * @inheritDoc
	 */
	destroy() {
		this.stopListening();
	}

	/**
	 * @inheritDoc
	 */
	static get isContextPlugin() {
		return false;
	}
}

mix( Plugin, ObservableMixin );

/**
 * The base interface for CKEditor plugins.
 *
 * In its minimal form a plugin can be a simple function that accepts {@link module:core/editor/editor~Editor the editor}
 * as a parameter:
 *
 *		// A simple plugin that enables a data processor.
 *		function MyPlugin( editor ) {
 *			editor.data.processor = new MyDataProcessor();
 *		}
 *
 * In most cases however, you will want to inherit from the {@link module:core/plugin~Plugin} class which implements the
 * {@link module:utils/observablemixin~ObservableMixin} and is, therefore, more convenient:
 *
 *		class MyPlugin extends Plugin {
 *			init() {
 *				// `listenTo()` and `editor` are available thanks to `Plugin`.
 *				// By using `listenTo()` you will ensure that the listener is removed when
 *				// the plugin is destroyed.
 *				this.listenTo( this.editor.data, 'ready', () => {
 *					// Do something when the data is ready.
 *				} );
 *			}
 *		}
 *
 * The plugin can also implement methods (e.g. {@link module:core/plugin~PluginInterface#init `init()`} or
 * {@link module:core/plugin~PluginInterface#destroy `destroy()`}) which, when present, will be used to properly
 * initialize and destroy the plugin.
 *
 * **Note:** When defined as a plain function, the plugin acts as a constructor and will be
 * called in parallel with other plugins' {@link module:core/plugin~PluginInterface#constructor constructors}.
 * This means the code of that plugin will be executed **before** {@link module:core/plugin~PluginInterface#init `init()`} and
 * {@link module:core/plugin~PluginInterface#afterInit `afterInit()`} methods of other plugins and, for instance,
 * you cannot use it to extend other plugins' {@glink framework/guides/architecture/editing-engine#schema schema}
 * rules as they are defined later on during the `init()` stage.
 *
 * @interface PluginInterface
 */

/**
 * Creates a new plugin instance. This is the first step of the plugin initialization.
 * See also {@link #init} and {@link #afterInit}.
 *
 * A plugin is always instantiated after its {@link module:core/plugin~PluginInterface.requires dependencies} and the
 * {@link #init} and {@link #afterInit} methods are called in the same order.
 *
 * Usually, you will want to put your plugin's initialization code in the {@link #init} method.
 * The constructor can be understood as "before init" and used in special cases, just like
 * {@link #afterInit} serves the special "after init" scenarios (e.g.the code which depends on other
 * plugins, but which does not {@link module:core/plugin~PluginInterface.requires explicitly require} them).
 *
 * @method #constructor
 * @param {module:core/editor/editor~Editor} editor
 */

/**
 * An array of plugins required by this plugin.
 *
 * To keep the plugin class definition tight it is recommended to define this property as a static getter:
 *
 *		import Image from './image.js';
 *
 *		export default class ImageCaption {
 *			static get requires() {
 *				return [ Image ];
 *			}
 *		}
 *
 * @static
 * @readonly
 * @member {Array.<Function>|undefined} module:core/plugin~PluginInterface.requires
 */

/**
 * An optional name of the plugin. If set, the plugin will be available in
 * {@link module:core/plugincollection~PluginCollection#get} by its
 * name and its constructor. If not, then only by its constructor.
 *
 * The name should reflect the constructor name.
 *
 * To keep the plugin class definition tight, it is recommended to define this property as a static getter:
 *
 *		export default class ImageCaption {
 *			static get pluginName() {
 *				return 'ImageCaption';
 *			}
 *		}
 *
 * Note: The native `Function.name` property could not be used to keep the plugin name because
 * it will be mangled during code minification.
 *
 * Naming a plugin is necessary to enable removing it through the
 * {@link module:core/editor/editorconfig~EditorConfig#removePlugins `config.removePlugins`} option.
 *
 * @static
 * @readonly
 * @member {String|undefined} module:core/plugin~PluginInterface.pluginName
 */

/**
 * The second stage (after plugin {@link #constructor}) of the plugin initialization.
 * Unlike the plugin constructor this method can be asynchronous.
 *
 * A plugin's `init()` method is called after its {@link module:core/plugin~PluginInterface.requires dependencies} are initialized,
 * so in the same order as the constructors of these plugins.
 *
 * **Note:** This method is optional. A plugin instance does not need to have it defined.
 *
 * @method #init
 * @returns {null|Promise}
 */

/**
 * The third (and last) stage of the plugin initialization. See also {@link #constructor} and {@link #init}.
 *
 * **Note:** This method is optional. A plugin instance does not need to have it defined.
 *
 * @method #afterInit
 * @returns {null|Promise}
 */

/**
 * Destroys the plugin.
 *
 * **Note:** This method is optional. A plugin instance does not need to have it defined.
 *
 * @method #destroy
 * @returns {null|Promise}
 */

/**
 * A flag which defines if a plugin is allowed or not allowed to be used directly by a {@link module:core/context~Context}.
 *
 * @static
 * @readonly
 * @member {Boolean} module:core/plugin~PluginInterface.isContextPlugin
 */

/**
 * An array of loaded plugins.
 *
 * @typedef {Array.<module:core/plugin~PluginInterface>} module:core/plugin~LoadedPlugins
 */

// Helper function that forces plugin to be disabled.
function forceDisable( evt ) {
	evt.return = false;
	evt.stop();
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module utils/dom/isnode
 */

/**
 * Checks if the object is a native DOM Node.
 *
 * @param {*} obj
 * @returns {Boolean}
 */
function isNode( obj ) {
	if ( obj ) {
		if ( obj.defaultView ) {
			return obj instanceof obj.defaultView.Document;
		} else if ( obj.ownerDocument && obj.ownerDocument.defaultView ) {
			return obj instanceof obj.ownerDocument.defaultView.Node;
		}
	}

	return false;
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module utils/dom/iswindow
 */

/**
 * Checks if the object is a native DOM Window.
 *
 * @param {*} obj
 * @returns {Boolean}
 */
function isWindow( obj ) {
	const stringifiedObject = Object.prototype.toString.apply( obj );

	// Returns `true` for the `window` object in browser environments.
	if ( stringifiedObject == '[object Window]' ) {
		return true;
	}

	// Returns `true` for the `window` object in the Electron environment.
	if ( stringifiedObject == '[object global]' ) {
		return true;
	}

	return false;
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Mixin that injects the DOM events API into its host. It provides the API
 * compatible with {@link module:utils/emittermixin~EmitterMixin}.
 *
 * DOM emitter mixin is by default available in the {@link module:ui/view~View} class,
 * but it can also be mixed into any other class:
 *
 *		import mix from '../utils/mix.js';
 *		import DomEmitterMixin from '../utils/dom/emittermixin.js';
 *
 *		class SomeView {}
 *		mix( SomeView, DomEmitterMixin );
 *
 *		const view = new SomeView();
 *		view.listenTo( domElement, ( evt, domEvt ) => {
 *			console.log( evt, domEvt );
 *		} );
 *
 * @mixin EmitterMixin
 * @mixes module:utils/emittermixin~EmitterMixin
 * @implements module:utils/dom/emittermixin~Emitter
 */
const DomEmitterMixin = assignIn( {}, EmitterMixin, {
	/**
	 * Registers a callback function to be executed when an event is fired in a specific Emitter or DOM Node.
	 * It is backwards compatible with {@link module:utils/emittermixin~EmitterMixin#listenTo}.
	 *
	 * @param {module:utils/emittermixin~Emitter|Node} emitter The object that fires the event.
	 * @param {String} event The name of the event.
	 * @param {Function} callback The function to be called on event.
	 * @param {Object} [options={}] Additional options.
	 * @param {module:utils/priorities~PriorityString|Number} [options.priority='normal'] The priority of this event callback. The higher
	 * the priority value the sooner the callback will be fired. Events having the same priority are called in the
	 * order they were added.
	 * @param {Boolean} [options.useCapture=false] Indicates that events of this type will be dispatched to the registered
	 * listener before being dispatched to any EventTarget beneath it in the DOM tree.
	 * @param {Boolean} [options.usePassive=false] Indicates that the function specified by listener will never call preventDefault()
	 * and prevents blocking browser's main thread by this event handler.
	 */
	listenTo( emitter, ...rest ) {
		// Check if emitter is an instance of DOM Node. If so, replace the argument with
		// corresponding ProxyEmitter (or create one if not existing).
		if ( isNode( emitter ) || isWindow( emitter ) ) {
			const proxy = this._getProxyEmitter( emitter ) || new ProxyEmitter( emitter );

			proxy.attach( ...rest );

			emitter = proxy;
		}

		// Execute parent class method with Emitter (or ProxyEmitter) instance.
		EmitterMixin.listenTo.call( this, emitter, ...rest );
	},

	/**
	 * Stops listening for events. It can be used at different levels:
	 * It is backwards compatible with {@link module:utils/emittermixin~EmitterMixin#listenTo}.
	 *
	 * * To stop listening to a specific callback.
	 * * To stop listening to a specific event.
	 * * To stop listening to all events fired by a specific object.
	 * * To stop listening to all events fired by all object.
	 *
	 * @param {module:utils/emittermixin~Emitter|Node} [emitter] The object to stop listening to. If omitted, stops it for all objects.
	 * @param {String} [event] (Requires the `emitter`) The name of the event to stop listening to. If omitted, stops it
	 * for all events from `emitter`.
	 * @param {Function} [callback] (Requires the `event`) The function to be removed from the call list for the given
	 * `event`.
	 */
	stopListening( emitter, event, callback ) {
		// Check if emitter is an instance of DOM Node. If so, replace the argument with corresponding ProxyEmitter.
		if ( isNode( emitter ) || isWindow( emitter ) ) {
			const proxy = this._getProxyEmitter( emitter );

			// Element has no listeners.
			if ( !proxy ) {
				return;
			}

			emitter = proxy;
		}

		// Execute parent class method with Emitter (or ProxyEmitter) instance.
		EmitterMixin.stopListening.call( this, emitter, event, callback );

		if ( emitter instanceof ProxyEmitter ) {
			emitter.detach( event );
		}
	},

	/**
	 * Retrieves ProxyEmitter instance for given DOM Node residing in this Host.
	 *
	 * @private
	 * @param {Node} node DOM Node of the ProxyEmitter.
	 * @returns {module:utils/dom/emittermixin~ProxyEmitter} ProxyEmitter instance or null.
	 */
	_getProxyEmitter( node ) {
		return _getEmitterListenedTo( this, getNodeUID( node ) );
	}
} );

/**
 * Creates a ProxyEmitter instance. Such an instance is a bridge between a DOM Node firing events
 * and any Host listening to them. It is backwards compatible with {@link module:utils/emittermixin~EmitterMixin#on}.
 *
 *                                  listenTo( click, ... )
 *                    +-----------------------------------------+
 *                    |              stopListening( ... )       |
 *     +----------------------------+                           |             addEventListener( click, ... )
 *     | Host                       |                           |   +---------------------------------------------+
 *     +----------------------------+                           |   |       removeEventListener( click, ... )     |
 *     | _listeningTo: {            |                +----------v-------------+                                   |
 *     |   UID: {                   |                | ProxyEmitter           |                                   |
 *     |     emitter: ProxyEmitter, |                +------------------------+                      +------------v----------+
 *     |     callbacks: {           |                | events: {              |                      | Node (HTMLElement)    |
 *     |       click: [ callbacks ] |                |   click: [ callbacks ] |                      +-----------------------+
 *     |     }                      |                | },                     |                      | data-ck-expando: UID  |
 *     |   }                        |                | _domNode: Node,        |                      +-----------------------+
 *     | }                          |                | _domListeners: {},     |                                   |
 *     | +------------------------+ |                | _emitterId: UID        |                                   |
 *     | | DomEmitterMixin        | |                +--------------^---------+                                   |
 *     | +------------------------+ |                           |   |                                             |
 *     +--------------^-------------+                           |   +---------------------------------------------+
 *                    |                                         |                  click (DOM Event)
 *                    +-----------------------------------------+
 *                                fire( click, DOM Event )
 *
 * @mixes module:utils/emittermixin~EmitterMixin
 * @implements module:utils/dom/emittermixin~Emitter
 * @private
 */
class ProxyEmitter {
	/**
	 * @param {Node} node DOM Node that fires events.
	 * @returns {Object} ProxyEmitter instance bound to the DOM Node.
	 */
	constructor( node ) {
		// Set emitter ID to match DOM Node "expando" property.
		_setEmitterId( this, getNodeUID( node ) );

		// Remember the DOM Node this ProxyEmitter is bound to.
		this._domNode = node;
	}
}

assignIn( ProxyEmitter.prototype, EmitterMixin, {
	/**
	 * Collection of native DOM listeners.
	 *
	 * @private
	 * @member {Object} module:utils/dom/emittermixin~ProxyEmitter#_domListeners
	 */

	/**
	 * Registers a callback function to be executed when an event is fired.
	 *
	 * It attaches a native DOM listener to the DOM Node. When fired,
	 * a corresponding Emitter event will also fire with DOM Event object as an argument.
	 *
	 * @method module:utils/dom/emittermixin~ProxyEmitter#attach
	 * @param {String} event The name of the event.
	 * @param {Function} callback The function to be called on event.
	 * @param {Object} [options={}] Additional options.
	 * @param {Boolean} [options.useCapture=false] Indicates that events of this type will be dispatched to the registered
	 * listener before being dispatched to any EventTarget beneath it in the DOM tree.
	 * @param {Boolean} [options.usePassive=false] Indicates that the function specified by listener will never call preventDefault()
	 * and prevents blocking browser's main thread by this event handler.
	 */
	attach( event, callback, options = {} ) {
		// If the DOM Listener for given event already exist it is pointless
		// to attach another one.
		if ( this._domListeners && this._domListeners[ event ] ) {
			return;
		}

		const listenerOptions = {
			capture: !!options.useCapture,
			passive: !!options.usePassive
		};

		const domListener = this._createDomListener( event, listenerOptions );

		// Attach the native DOM listener to DOM Node.
		this._domNode.addEventListener( event, domListener, listenerOptions );

		if ( !this._domListeners ) {
			this._domListeners = {};
		}

		// Store the native DOM listener in this ProxyEmitter. It will be helpful
		// when stopping listening to the event.
		this._domListeners[ event ] = domListener;
	},

	/**
	 * Stops executing the callback on the given event.
	 *
	 * @method module:utils/dom/emittermixin~ProxyEmitter#detach
	 * @param {String} event The name of the event.
	 */
	detach( event ) {
		let events;

		// Remove native DOM listeners which are orphans. If no callbacks
		// are awaiting given event, detach native DOM listener from DOM Node.
		// See: {@link attach}.

		if ( this._domListeners[ event ] && ( !( events = this._events[ event ] ) || !events.callbacks.length ) ) {
			this._domListeners[ event ].removeListener();
		}
	},

	/**
	 * Creates a native DOM listener callback. When the native DOM event
	 * is fired it will fire corresponding event on this ProxyEmitter.
	 * Note: A native DOM Event is passed as an argument.
	 *
	 * @private
	 * @method module:utils/dom/emittermixin~ProxyEmitter#_createDomListener
	 * @param {String} event The name of the event.
	 * @param {Object} [options] Additional options.
	 * @param {Boolean} [options.capture=false] Indicates whether the listener was created for capturing event.
	 * @param {Boolean} [options.passive=false] Indicates that the function specified by listener will never call preventDefault()
	 * and prevents blocking browser's main thread by this event handler.
	 * @returns {Function} The DOM listener callback.
	 */
	_createDomListener( event, options ) {
		const domListener = domEvt => {
			this.fire( event, domEvt );
		};

		// Supply the DOM listener callback with a function that will help
		// detach it from the DOM Node, when it is no longer necessary.
		// See: {@link detach}.
		domListener.removeListener = () => {
			this._domNode.removeEventListener( event, domListener, options );
			delete this._domListeners[ event ];
		};

		return domListener;
	}
} );

// Gets an unique DOM Node identifier. The identifier will be set if not defined.
//
// @private
// @param {Node} node
// @returns {String} UID for given DOM Node.
function getNodeUID( node ) {
	return node[ 'data-ck-expando' ] || ( node[ 'data-ck-expando' ] = uid() );
}

/**
 * Interface representing classes which mix in {@link module:utils/dom/emittermixin~EmitterMixin}.
 *
 * @interface Emitter
 */

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Abstract base observer class. Observers are classes which listen to DOM events, do the preliminary
 * processing and fire events on the {@link module:engine/view/document~Document} objects.
 * Observers can also add features to the view, for instance by updating its status or marking elements
 * which need a refresh on DOM events.
 *
 * @abstract
 */
class Observer {
	/**
	 * Creates an instance of the observer.
	 *
	 * @param {module:engine/view/view~View} view
	 */
	constructor( view ) {
		/**
		 * An instance of the view controller.
		 *
		 * @readonly
		 * @member {module:engine/view/view~View}
		 */
		this.view = view;

		/**
		 * A reference to the {@link module:engine/view/document~Document} object.
		 *
		 * @readonly
		 * @member {module:engine/view/document~Document}
		 */
		this.document = view.document;

		/**
		 * The state of the observer. If it is disabled, no events will be fired.
		 *
		 * @readonly
		 * @member {Boolean}
		 */
		this.isEnabled = false;
	}

	/**
	 * Enables the observer. This method is called when the observer is registered to the
	 * {@link module:engine/view/view~View} and after {@link module:engine/view/view~View#forceRender rendering}
	 * (all observers are {@link #disable disabled} before rendering).
	 *
	 * A typical use case for disabling observers is that mutation observers need to be disabled for the rendering.
	 * However, a child class may not need to be disabled, so it can implement an empty method.
	 *
	 * @see module:engine/view/observer/observer~Observer#disable
	 */
	enable() {
		this.isEnabled = true;
	}

	/**
	 * Disables the observer. This method is called before
	 * {@link module:engine/view/view~View#forceRender rendering} to prevent firing events during rendering.
	 *
	 * @see module:engine/view/observer/observer~Observer#enable
	 */
	disable() {
		this.isEnabled = false;
	}

	/**
	 * Disables and destroys the observer, among others removes event listeners created by the observer.
	 */
	destroy() {
		this.disable();
		this.stopListening();
	}

	/**
	 * Checks whether a given DOM event should be ignored (should not be turned into a synthetic view document event).
	 *
	 * Currently, an event will be ignored only if its target or any of its ancestors has the `data-cke-ignore-events` attribute.
	 * This attribute can be used inside the structures generated by
	 * {@link module:engine/view/downcastwriter~DowncastWriter#createUIElement `DowncastWriter#createUIElement()`} to ignore events
	 * fired within a UI that should be excluded from CKEditor 5's realms.
	 *
	 * @param {Node} domTarget The DOM event target to check (usually an element, sometimes a text node and
	 * potentially sometimes a document, too).
	 * @returns {Boolean} Whether this event should be ignored by the observer.
	 */
	checkShouldIgnoreEventFromTarget( domTarget ) {
		if ( domTarget && domTarget.nodeType === 3 ) {
			domTarget = domTarget.parentNode;
		}

		if ( !domTarget || domTarget.nodeType !== 1 ) {
			return false;
		}

		return domTarget.matches( '[data-cke-ignore-events], [data-cke-ignore-events] *' );
	}

	/**
	 * Starts observing the given root element.
	 *
	 * @method #observe
	 * @param {HTMLElement} domElement
	 * @param {String} name The name of the root element.
	 */
}

mix( Observer, DomEmitterMixin );

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Observes all new images added to the {@link module:engine/view/document~Document},
 * fires {@link module:engine/view/document~Document#event:imageLoaded} and
 * {@link module:engine/view/document~Document#event:layoutChanged} event every time when the new image
 * has been loaded.
 *
 * **Note:** This event is not fired for images that has been added to the document and rendered as `complete` (already loaded).
 *
 * @extends module:engine/view/observer/observer~Observer
 */
class ImageLoadObserver extends Observer {
	/**
	 * @inheritDoc
	 */
	observe( domRoot ) {
		this.listenTo( domRoot, 'load', ( event, domEvent ) => {
			const domElement = domEvent.target;

			if ( this.checkShouldIgnoreEventFromTarget( domElement ) ) {
				return;
			}

			if ( domElement.tagName == 'IMG' ) {
				this._fireEvents( domEvent );
			}
			// Use capture phase for better performance (#4504).
		}, { useCapture: true } );
	}

	/**
	 * Fires {@link module:engine/view/document~Document#event:layoutChanged} and
	 * {@link module:engine/view/document~Document#event:imageLoaded}
	 * if observer {@link #isEnabled is enabled}.
	 *
	 * @protected
	 * @param {Event} domEvent The DOM event.
	 */
	_fireEvents( domEvent ) {
		if ( this.isEnabled ) {
			this.document.fire( 'layoutChanged' );
			this.document.fire( 'imageLoaded', domEvent );
		}
	}
}

/**
 * Fired when an <img/> DOM element has been loaded in the DOM root.
 *
 * Introduced by {@link module:image/image/imageloadobserver~ImageLoadObserver}.
 *
 * @see module:image/image/imageloadobserver~ImageLoadObserver
 * @event module:engine/view/document~Document#event:imageLoaded
 * @param {module:engine/view/observer/domeventdata~DomEventData} data Event data.
 */

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Class used to handle correct order of highlights on elements.
 *
 * When different highlights are applied to same element correct order should be preserved:
 *
 * * highlight with highest priority should be applied,
 * * if two highlights have same priority - sort by CSS class provided in
 * {@link module:engine/conversion/downcasthelpers~HighlightDescriptor}.
 *
 * This way, highlight will be applied with the same rules it is applied on texts.
 */
class HighlightStack {
	/**
	 * Creates class instance.
	 */
	constructor() {
		this._stack = [];
	}

	/**
	 * Adds highlight descriptor to the stack.
	 *
	 * @fires change:top
	 * @param {module:engine/conversion/downcasthelpers~HighlightDescriptor} descriptor
	 * @param {module:engine/view/downcastwriter~DowncastWriter} writer
	 */
	add( descriptor, writer ) {
		const stack = this._stack;

		// Save top descriptor and insert new one. If top is changed - fire event.
		const oldTop = stack[ 0 ];
		this._insertDescriptor( descriptor );
		const newTop = stack[ 0 ];

		// When new object is at the top and stores different information.
		if ( oldTop !== newTop && !compareDescriptors( oldTop, newTop ) ) {
			this.fire( 'change:top', {
				oldDescriptor: oldTop,
				newDescriptor: newTop,
				writer
			} );
		}
	}

	/**
	 * Removes highlight descriptor from the stack.
	 *
	 * @fires change:top
	 * @param {String} id Id of the descriptor to remove.
	 * @param {module:engine/view/downcastwriter~DowncastWriter} writer
	 */
	remove( id, writer ) {
		const stack = this._stack;

		const oldTop = stack[ 0 ];
		this._removeDescriptor( id );
		const newTop = stack[ 0 ];

		// When new object is at the top and stores different information.
		if ( oldTop !== newTop && !compareDescriptors( oldTop, newTop ) ) {
			this.fire( 'change:top', {
				oldDescriptor: oldTop,
				newDescriptor: newTop,
				writer
			} );
		}
	}

	/**
	 * Inserts given descriptor in correct place in the stack. It also takes care about updating information when
	 * descriptor with same id is already present.
	 *
	 * @private
	 * @param {module:engine/conversion/downcasthelpers~HighlightDescriptor} descriptor
	 */
	_insertDescriptor( descriptor ) {
		const stack = this._stack;
		const index = stack.findIndex( item => item.id === descriptor.id );

		// Inserting exact same descriptor - do nothing.
		if ( compareDescriptors( descriptor, stack[ index ] ) ) {
			return;
		}

		// If descriptor with same id but with different information is on the stack - remove it.
		if ( index > -1 ) {
			stack.splice( index, 1 );
		}

		// Find correct place to insert descriptor in the stack.
		// It have different information (for example priority) so it must be re-inserted in correct place.
		let i = 0;

		while ( stack[ i ] && shouldABeBeforeB( stack[ i ], descriptor ) ) {
			i++;
		}

		stack.splice( i, 0, descriptor );
	}

	/**
	 * Removes descriptor with given id from the stack.
	 *
	 * @private
	 * @param {String} id Descriptor's id.
	 */
	_removeDescriptor( id ) {
		const stack = this._stack;
		const index = stack.findIndex( item => item.id === id );

		// If descriptor with same id is on the list - remove it.
		if ( index > -1 ) {
			stack.splice( index, 1 );
		}
	}
}

mix( HighlightStack, EmitterMixin );

// Compares two descriptors by checking their priority and class list.
//
// @param {module:engine/conversion/downcasthelpers~HighlightDescriptor} a
// @param {module:engine/conversion/downcasthelpers~HighlightDescriptor} b
// @returns {Boolean} Returns true if both descriptors are defined and have same priority and classes.
function compareDescriptors( a, b ) {
	return a && b && a.priority == b.priority && classesToString( a.classes ) == classesToString( b.classes );
}

// Checks whenever first descriptor should be placed in the stack before second one.
//
// @param {module:engine/conversion/downcasthelpers~HighlightDescriptor} a
// @param {module:engine/conversion/downcasthelpers~HighlightDescriptor} b
// @returns {Boolean}
function shouldABeBeforeB( a, b ) {
	if ( a.priority > b.priority ) {
		return true;
	} else if ( a.priority < b.priority ) {
		return false;
	}

	// When priorities are equal and names are different - use classes to compare.
	return classesToString( a.classes ) > classesToString( b.classes );
}

// Converts CSS classes passed with {@link module:engine/conversion/downcasthelpers~HighlightDescriptor} to
// sorted string.
//
// @param {String|Array<String>} descriptor
// @returns {String}
function classesToString( classes ) {
	return Array.isArray( classes ) ? classes.sort().join( ',' ) : classes;
}

/**
 * Fired when top element on {@link module:widget/highlightstack~HighlightStack} has been changed
 *
 * @event change:top
 * @param {Object} data Additional information about the change.
 * @param {module:engine/conversion/downcasthelpers~HighlightDescriptor} [data.newDescriptor] New highlight
 * descriptor. It will be `undefined` when last descriptor is removed from the stack.
 * @param {module:engine/conversion/downcasthelpers~HighlightDescriptor} [data.oldDescriptor] Old highlight
 * descriptor. It will be `undefined` when first descriptor is added to the stack.
 * @param {module:engine/view/downcastwriter~DowncastWriter} writer View writer that can be used to modify element.
 */

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module utils/isiterable
 */

/**
 * Checks if value implements iterator interface.
 *
 * @param {*} value The value to check.
 * @returns {Boolean} True if value implements iterator interface.
 */
function isIterable( value ) {
	return !!( value && value[ Symbol.iterator ] );
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Collections are ordered sets of objects. Items in the collection can be retrieved by their indexes
 * in the collection (like in an array) or by their ids.
 *
 * If an object without an `id` property is being added to the collection, the `id` property will be generated
 * automatically. Note that the automatically generated id is unique only within this single collection instance.
 *
 * By default an item in the collection is identified by its `id` property. The name of the identifier can be
 * configured through the constructor of the collection.
 *
 * @mixes module:utils/emittermixin~EmitterMixin
 */
class Collection {
	/**
	 * Creates a new Collection instance.
	 *
	 * You can provide an iterable of initial items the collection will be created with:
	 *
	 *		const collection = new Collection( [ { id: 'John' }, { id: 'Mike' } ] );
	 *
	 *		console.log( collection.get( 0 ) ); // -> { id: 'John' }
	 *		console.log( collection.get( 1 ) ); // -> { id: 'Mike' }
	 *		console.log( collection.get( 'Mike' ) ); // -> { id: 'Mike' }
	 *
	 * Or you can first create a collection and then add new items using the {@link #add} method:
	 *
	 *		const collection = new Collection();
	 *
	 *		collection.add( { id: 'John' } );
	 *		console.log( collection.get( 0 ) ); // -> { id: 'John' }
	 *
	 * Whatever option you choose, you can always pass a configuration object as the last argument
	 * of the constructor:
	 *
	 *		const emptyCollection = new Collection( { idProperty: 'name' } );
	 *		emptyCollection.add( { name: 'John' } );
	 *		console.log( collection.get( 'John' ) ); // -> { name: 'John' }
	 *
	 *		const nonEmptyCollection = new Collection( [ { name: 'John' } ], { idProperty: 'name' } );
	 *		nonEmptyCollection.add( { name: 'George' } );
	 *		console.log( collection.get( 'George' ) ); // -> { name: 'George' }
	 *		console.log( collection.get( 'John' ) ); // -> { name: 'John' }
	 *
	 * @param {Iterable.<Object>|Object} initialItemsOrOptions The initial items of the collection or
	 * the options object.
	 * @param {Object} [options={}] The options object, when the first argument is an array of initial items.
	 * @param {String} [options.idProperty='id'] The name of the property which is used to identify an item.
	 * Items that do not have such a property will be assigned one when added to the collection.
	 */
	constructor( initialItemsOrOptions = {}, options = {} ) {
		const hasInitialItems = isIterable( initialItemsOrOptions );

		if ( !hasInitialItems ) {
			options = initialItemsOrOptions;
		}

		/**
		 * The internal list of items in the collection.
		 *
		 * @private
		 * @member {Object[]}
		 */
		this._items = [];

		/**
		 * The internal map of items in the collection.
		 *
		 * @private
		 * @member {Map}
		 */
		this._itemMap = new Map();

		/**
		 * The name of the property which is considered to identify an item.
		 *
		 * @private
		 * @member {String}
		 */
		this._idProperty = options.idProperty || 'id';

		/**
		 * A helper mapping external items of a bound collection ({@link #bindTo})
		 * and actual items of this collection. It provides information
		 * necessary to properly remove items bound to another collection.
		 *
		 * See {@link #_bindToInternalToExternalMap}.
		 *
		 * @protected
		 * @member {WeakMap}
		 */
		this._bindToExternalToInternalMap = new WeakMap();

		/**
		 * A helper mapping items of this collection to external items of a bound collection
		 * ({@link #bindTo}). It provides information necessary to manage the bindings, e.g.
		 * to avoid loops in two–way bindings.
		 *
		 * See {@link #_bindToExternalToInternalMap}.
		 *
		 * @protected
		 * @member {WeakMap}
		 */
		this._bindToInternalToExternalMap = new WeakMap();

		/**
		 * Stores indexes of skipped items from bound external collection.
		 *
		 * @private
		 * @member {Array}
		 */
		this._skippedIndexesFromExternal = [];

		// Set the initial content of the collection (if provided in the constructor).
		if ( hasInitialItems ) {
			for ( const item of initialItemsOrOptions ) {
				this._items.push( item );
				this._itemMap.set( this._getItemIdBeforeAdding( item ), item );
			}
		}

		/**
		 * A collection instance this collection is bound to as a result
		 * of calling {@link #bindTo} method.
		 *
		 * @protected
		 * @member {module:utils/collection~Collection} #_bindToCollection
		 */
	}

	/**
	 * The number of items available in the collection.
	 *
	 * @member {Number} #length
	 */
	get length() {
		return this._items.length;
	}

	/**
	 * Returns the first item from the collection or null when collection is empty.
	 *
	 * @returns {Object|null} The first item or `null` if collection is empty.
	 */
	get first() {
		return this._items[ 0 ] || null;
	}

	/**
	 * Returns the last item from the collection or null when collection is empty.
	 *
	 * @returns {Object|null} The last item or `null` if collection is empty.
	 */
	get last() {
		return this._items[ this.length - 1 ] || null;
	}

	/**
	 * Adds an item into the collection.
	 *
	 * If the item does not have an id, then it will be automatically generated and set on the item.
	 *
	 * @chainable
	 * @param {Object} item
	 * @param {Number} [index] The position of the item in the collection. The item
	 * is pushed to the collection when `index` not specified.
	 * @fires add
	 * @fires change
	 */
	add( item, index ) {
		return this.addMany( [ item ], index );
	}

	/**
	 * Adds multiple items into the collection.
	 *
	 * Any item not containing an id will get an automatically generated one.
	 *
	 * @chainable
	 * @param {Iterable.<Object>} item
	 * @param {Number} [index] The position of the insertion. Items will be appended if no `index` is specified.
	 * @fires add
	 * @fires change
	 */
	addMany( items, index ) {
		if ( index === undefined ) {
			index = this._items.length;
		} else if ( index > this._items.length || index < 0 ) {
			/**
			 * The `index` passed to {@link module:utils/collection~Collection#addMany `Collection#addMany()`}
			 * is invalid. It must be a number between 0 and the collection's length.
			 *
			 * @error collection-add-item-invalid-index
			 */
			throw new CKEditorError( 'collection-add-item-invalid-index', this );
		}

		for ( let offset = 0; offset < items.length; offset++ ) {
			const item = items[ offset ];
			const itemId = this._getItemIdBeforeAdding( item );
			const currentItemIndex = index + offset;

			this._items.splice( currentItemIndex, 0, item );
			this._itemMap.set( itemId, item );

			this.fire( 'add', item, currentItemIndex );
		}

		this.fire( 'change', {
			added: items,
			removed: [],
			index
		} );

		return this;
	}

	/**
	 * Gets an item by its ID or index.
	 *
	 * @param {String|Number} idOrIndex The item ID or index in the collection.
	 * @returns {Object|null} The requested item or `null` if such item does not exist.
	 */
	get( idOrIndex ) {
		let item;

		if ( typeof idOrIndex == 'string' ) {
			item = this._itemMap.get( idOrIndex );
		} else if ( typeof idOrIndex == 'number' ) {
			item = this._items[ idOrIndex ];
		} else {
			/**
			 * An index or ID must be given.
			 *
			 * @error collection-get-invalid-arg
			 */
			throw new CKEditorError( 'collection-get-invalid-arg', this );
		}

		return item || null;
	}

	/**
	 * Returns a Boolean indicating whether the collection contains an item.
	 *
	 * @param {Object|String} itemOrId The item or its ID in the collection.
	 * @returns {Boolean} `true` if the collection contains the item, `false` otherwise.
	 */
	has( itemOrId ) {
		if ( typeof itemOrId == 'string' ) {
			return this._itemMap.has( itemOrId );
		} else { // Object
			const idProperty = this._idProperty;
			const id = itemOrId[ idProperty ];

			return this._itemMap.has( id );
		}
	}

	/**
	 * Gets an index of an item in the collection.
	 * When an item is not defined in the collection, the index will equal -1.
	 *
	 * @param {Object|String} itemOrId The item or its ID in the collection.
	 * @returns {Number} The index of a given item.
	 */
	getIndex( itemOrId ) {
		let item;

		if ( typeof itemOrId == 'string' ) {
			item = this._itemMap.get( itemOrId );
		} else {
			item = itemOrId;
		}

		return this._items.indexOf( item );
	}

	/**
	 * Removes an item from the collection.
	 *
	 * @param {Object|Number|String} subject The item to remove, its ID or index in the collection.
	 * @returns {Object} The removed item.
	 * @fires remove
	 * @fires change
	 */
	remove( subject ) {
		const [ item, index ] = this._remove( subject );

		this.fire( 'change', {
			added: [],
			removed: [ item ],
			index
		} );

		return item;
	}

	/**
	 * Executes the callback for each item in the collection and composes an array or values returned by this callback.
	 *
	 * @param {Function} callback
	 * @param {Object} callback.item
	 * @param {Number} callback.index
	 * @param {Object} ctx Context in which the `callback` will be called.
	 * @returns {Array} The result of mapping.
	 */
	map( callback, ctx ) {
		return this._items.map( callback, ctx );
	}

	/**
	 * Finds the first item in the collection for which the `callback` returns a true value.
	 *
	 * @param {Function} callback
	 * @param {Object} callback.item
	 * @param {Number} callback.index
	 * @param {Object} ctx Context in which the `callback` will be called.
	 * @returns {Object} The item for which `callback` returned a true value.
	 */
	find( callback, ctx ) {
		return this._items.find( callback, ctx );
	}

	/**
	 * Returns an array with items for which the `callback` returned a true value.
	 *
	 * @param {Function} callback
	 * @param {Object} callback.item
	 * @param {Number} callback.index
	 * @param {Object} ctx Context in which the `callback` will be called.
	 * @returns {Object[]} The array with matching items.
	 */
	filter( callback, ctx ) {
		return this._items.filter( callback, ctx );
	}

	/**
	 * Removes all items from the collection and destroys the binding created using
	 * {@link #bindTo}.
	 *
	 * @fires remove
	 * @fires change
	 */
	clear() {
		if ( this._bindToCollection ) {
			this.stopListening( this._bindToCollection );
			this._bindToCollection = null;
		}

		const removedItems = Array.from( this._items );

		while ( this.length ) {
			this._remove( 0 );
		}

		this.fire( 'change', {
			added: [],
			removed: removedItems,
			index: 0
		} );
	}

	/**
	 * Binds and synchronizes the collection with another one.
	 *
	 * The binding can be a simple factory:
	 *
	 *		class FactoryClass {
	 *			constructor( data ) {
	 *				this.label = data.label;
	 *			}
	 *		}
	 *
	 *		const source = new Collection( { idProperty: 'label' } );
	 *		const target = new Collection();
	 *
	 *		target.bindTo( source ).as( FactoryClass );
	 *
	 *		source.add( { label: 'foo' } );
	 *		source.add( { label: 'bar' } );
	 *
	 *		console.log( target.length ); // 2
	 *		console.log( target.get( 1 ).label ); // 'bar'
	 *
	 *		source.remove( 0 );
	 *		console.log( target.length ); // 1
	 *		console.log( target.get( 0 ).label ); // 'bar'
	 *
	 * or the factory driven by a custom callback:
	 *
	 *		class FooClass {
	 *			constructor( data ) {
	 *				this.label = data.label;
	 *			}
	 *		}
	 *
	 *		class BarClass {
	 *			constructor( data ) {
	 *				this.label = data.label;
	 *			}
	 *		}
	 *
	 *		const source = new Collection( { idProperty: 'label' } );
	 *		const target = new Collection();
	 *
	 *		target.bindTo( source ).using( ( item ) => {
	 *			if ( item.label == 'foo' ) {
	 *				return new FooClass( item );
	 *			} else {
	 *				return new BarClass( item );
	 *			}
	 *		} );
	 *
	 *		source.add( { label: 'foo' } );
	 *		source.add( { label: 'bar' } );
	 *
	 *		console.log( target.length ); // 2
	 *		console.log( target.get( 0 ) instanceof FooClass ); // true
	 *		console.log( target.get( 1 ) instanceof BarClass ); // true
	 *
	 * or the factory out of property name:
	 *
	 *		const source = new Collection( { idProperty: 'label' } );
	 *		const target = new Collection();
	 *
	 *		target.bindTo( source ).using( 'label' );
	 *
	 *		source.add( { label: { value: 'foo' } } );
	 *		source.add( { label: { value: 'bar' } } );
	 *
	 *		console.log( target.length ); // 2
	 *		console.log( target.get( 0 ).value ); // 'foo'
	 *		console.log( target.get( 1 ).value ); // 'bar'
	 *
	 * It's possible to skip specified items by returning falsy value:
	 *
	 *		const source = new Collection();
	 *		const target = new Collection();
	 *
	 *		target.bindTo( source ).using( item => {
	 *			if ( item.hidden ) {
	 *				return null;
	 *			}
	 *
	 *			return item;
	 *		} );
	 *
	 *		source.add( { hidden: true } );
	 *		source.add( { hidden: false } );
	 *
	 *		console.log( source.length ); // 2
	 *		console.log( target.length ); // 1
	 *
	 * **Note**: {@link #clear} can be used to break the binding.
	 *
	 * @param {module:utils/collection~Collection} externalCollection A collection to be bound.
	 * @returns {Object}
	 * @returns {module:utils/collection~CollectionBindToChain} The binding chain object.
	 */
	bindTo( externalCollection ) {
		if ( this._bindToCollection ) {
			/**
			 * The collection cannot be bound more than once.
			 *
			 * @error collection-bind-to-rebind
			 */
			throw new CKEditorError( 'collection-bind-to-rebind', this );
		}

		this._bindToCollection = externalCollection;

		return {
			as: Class => {
				this._setUpBindToBinding( item => new Class( item ) );
			},

			using: callbackOrProperty => {
				if ( typeof callbackOrProperty == 'function' ) {
					this._setUpBindToBinding( item => callbackOrProperty( item ) );
				} else {
					this._setUpBindToBinding( item => item[ callbackOrProperty ] );
				}
			}
		};
	}

	/**
	 * Finalizes and activates a binding initiated by {#bindTo}.
	 *
	 * @protected
	 * @param {Function} factory A function which produces collection items.
	 */
	_setUpBindToBinding( factory ) {
		const externalCollection = this._bindToCollection;

		// Adds the item to the collection once a change has been done to the external collection.
		//
		// @private
		const addItem = ( evt, externalItem, index ) => {
			const isExternalBoundToThis = externalCollection._bindToCollection == this;
			const externalItemBound = externalCollection._bindToInternalToExternalMap.get( externalItem );

			// If an external collection is bound to this collection, which makes it a 2–way binding,
			// and the particular external collection item is already bound, don't add it here.
			// The external item has been created **out of this collection's item** and (re)adding it will
			// cause a loop.
			if ( isExternalBoundToThis && externalItemBound ) {
				this._bindToExternalToInternalMap.set( externalItem, externalItemBound );
				this._bindToInternalToExternalMap.set( externalItemBound, externalItem );
			} else {
				const item = factory( externalItem );

				// When there is no item we need to remember skipped index first and then we can skip this item.
				if ( !item ) {
					this._skippedIndexesFromExternal.push( index );

					return;
				}

				// Lets try to put item at the same index as index in external collection
				// but when there are a skipped items in one or both collections we need to recalculate this index.
				let finalIndex = index;

				// When we try to insert item after some skipped items from external collection we need
				// to include this skipped items and decrease index.
				//
				// For the following example:
				// external -> [ 'A', 'B - skipped for internal', 'C - skipped for internal' ]
				// internal -> [ A ]
				//
				// Another item is been added at the end of external collection:
				// external.add( 'D' )
				// external -> [ 'A', 'B - skipped for internal', 'C - skipped for internal', 'D' ]
				//
				// We can't just add 'D' to internal at the same index as index in external because
				// this will produce empty indexes what is invalid:
				// internal -> [ 'A', empty, empty, 'D' ]
				//
				// So we need to include skipped items and decrease index
				// internal -> [ 'A', 'D' ]
				for ( const skipped of this._skippedIndexesFromExternal ) {
					if ( index > skipped ) {
						finalIndex--;
					}
				}

				// We need to take into consideration that external collection could skip some items from
				// internal collection.
				//
				// For the following example:
				// internal -> [ 'A', 'B - skipped for external', 'C - skipped for external' ]
				// external -> [ A ]
				//
				// Another item is been added at the end of external collection:
				// external.add( 'D' )
				// external -> [ 'A', 'D' ]
				//
				// We need to include skipped items and place new item after them:
				// internal -> [ 'A', 'B - skipped for external', 'C - skipped for external', 'D' ]
				for ( const skipped of externalCollection._skippedIndexesFromExternal ) {
					if ( finalIndex >= skipped ) {
						finalIndex++;
					}
				}

				this._bindToExternalToInternalMap.set( externalItem, item );
				this._bindToInternalToExternalMap.set( item, externalItem );
				this.add( item, finalIndex );

				// After adding new element to internal collection we need update indexes
				// of skipped items in external collection.
				for ( let i = 0; i < externalCollection._skippedIndexesFromExternal.length; i++ ) {
					if ( finalIndex <= externalCollection._skippedIndexesFromExternal[ i ] ) {
						externalCollection._skippedIndexesFromExternal[ i ]++;
					}
				}
			}
		};

		// Load the initial content of the collection.
		for ( const externalItem of externalCollection ) {
			addItem( null, externalItem, externalCollection.getIndex( externalItem ) );
		}

		// Synchronize the with collection as new items are added.
		this.listenTo( externalCollection, 'add', addItem );

		// Synchronize the with collection as new items are removed.
		this.listenTo( externalCollection, 'remove', ( evt, externalItem, index ) => {
			const item = this._bindToExternalToInternalMap.get( externalItem );

			if ( item ) {
				this.remove( item );
			}

			// After removing element from external collection we need update/remove indexes
			// of skipped items in internal collection.
			this._skippedIndexesFromExternal = this._skippedIndexesFromExternal.reduce( ( result, skipped ) => {
				if ( index < skipped ) {
					result.push( skipped - 1 );
				}

				if ( index > skipped ) {
					result.push( skipped );
				}

				return result;
			}, [] );
		} );
	}

	/**
	 * Returns an unique id property for a given `item`.
	 *
	 * The method will generate new id and assign it to the `item` if it doesn't have any.
	 *
	 * @private
	 * @param {Object} item Item to be added.
	 * @returns {String}
	 */
	_getItemIdBeforeAdding( item ) {
		const idProperty = this._idProperty;
		let itemId;

		if ( ( idProperty in item ) ) {
			itemId = item[ idProperty ];

			if ( typeof itemId != 'string' ) {
				/**
				 * This item's ID should be a string.
				 *
				 * @error collection-add-invalid-id
				 */
				throw new CKEditorError( 'collection-add-invalid-id', this );
			}

			if ( this.get( itemId ) ) {
				/**
				 * This item already exists in the collection.
				 *
				 * @error collection-add-item-already-exists
				 */
				throw new CKEditorError( 'collection-add-item-already-exists', this );
			}
		} else {
			item[ idProperty ] = itemId = uid();
		}

		return itemId;
	}

	/**
	 * Core {@link #remove} method implementation shared in other functions.
	 *
	 * In contrast this method **does not** fire the {@link #event:change} event.
	 *
	 * @private
	 * @param {Object} subject The item to remove, its id or index in the collection.
	 * @returns {Array} Returns an array with the removed item and its index.
	 * @fires remove
	 */
	_remove( subject ) {
		let index, id, item;
		let itemDoesNotExist = false;
		const idProperty = this._idProperty;

		if ( typeof subject == 'string' ) {
			id = subject;
			item = this._itemMap.get( id );
			itemDoesNotExist = !item;

			if ( item ) {
				index = this._items.indexOf( item );
			}
		} else if ( typeof subject == 'number' ) {
			index = subject;
			item = this._items[ index ];
			itemDoesNotExist = !item;

			if ( item ) {
				id = item[ idProperty ];
			}
		} else {
			item = subject;
			id = item[ idProperty ];
			index = this._items.indexOf( item );
			itemDoesNotExist = ( index == -1 || !this._itemMap.get( id ) );
		}

		if ( itemDoesNotExist ) {
			/**
			 * Item not found.
			 *
			 * @error collection-remove-404
			 */
			throw new CKEditorError( 'collection-remove-404', this );
		}

		this._items.splice( index, 1 );
		this._itemMap.delete( id );

		const externalItem = this._bindToInternalToExternalMap.get( item );
		this._bindToInternalToExternalMap.delete( item );
		this._bindToExternalToInternalMap.delete( externalItem );

		this.fire( 'remove', item, index );

		return [ item, index ];
	}

	/**
	 * Iterable interface.
	 *
	 * @returns {Iterable.<*>}
	 */
	[ Symbol.iterator ]() {
		return this._items[ Symbol.iterator ]();
	}

	/**
	 * Fired when an item is added to the collection.
	 *
	 * @event add
	 * @param {Object} item The added item.
	 */

	/**
	 * Fired when the collection was changed due to adding or removing items.
	 *
	 * @event change
	 * @param {Iterable.<Object>} added A list of added items.
	 * @param {Iterable.<Object>} removed A list of removed items.
	 * @param {Number} index An index where the addition or removal occurred.
	 */

	/**
	 * Fired when an item is removed from the collection.
	 *
	 * @event remove
	 * @param {Object} item The removed item.
	 * @param {Number} index Index from which item was removed.
	 */
}

mix( Collection, EmitterMixin );

/**
 * An object returned by the {@link module:utils/collection~Collection#bindTo `bindTo()`} method
 * providing functions that specify the type of the binding.
 *
 * See the {@link module:utils/collection~Collection#bindTo `bindTo()`} documentation for examples.
 *
 * @interface module:utils/collection~CollectionBindToChain
 */

/**
 * Creates a callback or a property binding.
 *
 * @method #using
 * @param {Function|String} callbackOrProperty  When the function is passed, it should return
 * the collection items. When the string is provided, the property value is used to create the bound collection items.
 */

/**
 * Creates the class factory binding in which items of the source collection are passed to
 * the constructor of the specified class.
 *
 * @method #as
 * @param {Function} Class The class constructor used to create instances in the factory.
 */

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Collects {@link module:ui/view~View} instances.
 *
 *		const parentView = new ParentView( locale );
 *		const collection = new ViewCollection( locale );
 *
 *		collection.setParent( parentView.element );
 *
 *		const viewA = new ChildView( locale );
 *		const viewB = new ChildView( locale );
 *
 * View collection renders and manages view {@link module:ui/view~View#element elements}:
 *
 *		collection.add( viewA );
 *		collection.add( viewB );
 *
 *		console.log( parentView.element.firsChild ); // -> viewA.element
 *		console.log( parentView.element.lastChild ); // -> viewB.element
 *
 * It {@link module:ui/viewcollection~ViewCollection#delegate propagates} DOM events too:
 *
 *		// Delegate #click and #keydown events from viewA and viewB to the parentView.
 *		collection.delegate( 'click' ).to( parentView );
 *
 *		parentView.on( 'click', ( evt ) => {
 *			console.log( `${ evt.source } has been clicked.` );
 *		} );
 *
 *		// This event will be delegated to the parentView.
 *		viewB.fire( 'click' );
 *
 * **Note**: A view collection can be used directly in the {@link module:ui/template~TemplateDefinition definition}
 * of a {@link module:ui/template~Template template}.
 *
 * @extends module:utils/collection~Collection
 * @mixes module:utils/observablemixin~ObservableMixin
 */
class ViewCollection extends Collection {
	/**
	 * Creates a new instance of the {@link module:ui/viewcollection~ViewCollection}.
	 *
	 * @param {Iterable.<module:ui/view~View>} [initialItems] The initial items of the collection.
	 */
	constructor( initialItems = [] ) {
		super( initialItems, {
			// An #id Number attribute should be legal and not break the `ViewCollection` instance.
			// https://github.com/ckeditor/ckeditor5-ui/issues/93
			idProperty: 'viewUid'
		} );

		// Handle {@link module:ui/view~View#element} in DOM when a new view is added to the collection.
		this.on( 'add', ( evt, view, index ) => {
			this._renderViewIntoCollectionParent( view, index );
		} );

		// Handle {@link module:ui/view~View#element} in DOM when a view is removed from the collection.
		this.on( 'remove', ( evt, view ) => {
			if ( view.element && this._parentElement ) {
				view.element.remove();
			}
		} );

		/**
		 * A parent element within which child views are rendered and managed in DOM.
		 *
		 * @protected
		 * @member {HTMLElement}
		 */
		this._parentElement = null;
	}

	/**
	 * Destroys the view collection along with child views.
	 * See the view {@link module:ui/view~View#destroy} method.
	 */
	destroy() {
		this.map( view => view.destroy() );
	}

	/**
	 * Sets the parent HTML element of this collection. When parent is set, {@link #add adding} and
	 * {@link #remove removing} views in the collection synchronizes their
	 * {@link module:ui/view~View#element elements} in the parent element.
	 *
	 * @param {HTMLElement} element A new parent element.
	 */
	setParent( elementOrDocFragment ) {
		this._parentElement = elementOrDocFragment;

		// Take care of the initial collection items passed to the constructor.
		for ( const view of this ) {
			this._renderViewIntoCollectionParent( view );
		}
	}

	/**
	 * Delegates selected events coming from within views in the collection to any
	 * {@link module:utils/emittermixin~Emitter}.
	 *
	 * For the following views and collection:
	 *
	 *		const viewA = new View();
	 *		const viewB = new View();
	 *		const viewC = new View();
	 *
	 *		const views = parentView.createCollection();
	 *
	 *		views.delegate( 'eventX' ).to( viewB );
	 *		views.delegate( 'eventX', 'eventY' ).to( viewC );
	 *
	 *		views.add( viewA );
	 *
	 * the `eventX` is delegated (fired by) `viewB` and `viewC` along with `customData`:
	 *
	 *		viewA.fire( 'eventX', customData );
	 *
	 * and `eventY` is delegated (fired by) `viewC` along with `customData`:
	 *
	 *		viewA.fire( 'eventY', customData );
	 *
	 * See {@link module:utils/emittermixin~Emitter#delegate}.
	 *
	 * @param {...String} events {@link module:ui/view~View} event names to be delegated to another
	 * {@link module:utils/emittermixin~Emitter}.
	 * @returns {Object}
	 * @returns {Function} return.to A function which accepts the destination of
	 * {@link module:utils/emittermixin~Emitter#delegate delegated} events.
	 */
	delegate( ...events ) {
		if ( !events.length || !isStringArray$1( events ) ) {
			/**
			 * All event names must be strings.
			 *
			 * @error ui-viewcollection-delegate-wrong-events
			 */
			throw new CKEditorError(
				'ui-viewcollection-delegate-wrong-events',
				this
			);
		}

		return {
			/**
			 * Selects destination for {@link module:utils/emittermixin~Emitter#delegate} events.
			 *
			 * @memberOf module:ui/viewcollection~ViewCollection#delegate
			 * @function module:ui/viewcollection~ViewCollection#delegate.to
			 * @param {module:utils/emittermixin~Emitter} dest An `Emitter` instance which is
			 * the destination for delegated events.
			 */
			to: dest => {
				// Activate delegating on existing views in this collection.
				for ( const view of this ) {
					for ( const evtName of events ) {
						view.delegate( evtName ).to( dest );
					}
				}

				// Activate delegating on future views in this collection.
				this.on( 'add', ( evt, view ) => {
					for ( const evtName of events ) {
						view.delegate( evtName ).to( dest );
					}
				} );

				// Deactivate delegating when view is removed from this collection.
				this.on( 'remove', ( evt, view ) => {
					for ( const evtName of events ) {
						view.stopDelegating( evtName, dest );
					}
				} );
			}
		};
	}

	/**
	 * This method {@link module:ui/view~View#render renders} a new view added to the collection.
	 *
	 * If the {@link #_parentElement parent element} of the collection is set, this method also adds
	 * the view's {@link module:ui/view~View#element} as a child of the parent in DOM at a specified index.
	 *
	 * **Note**: If index is not specified, the view's element is pushed as the last child
	 * of the parent element.
	 *
	 * @private
	 * @param {module:ui/view~View} view A new view added to the collection.
	 * @param {Number} [index] An index the view holds in the collection. When not specified,
	 * the view is added at the end.
	 */
	_renderViewIntoCollectionParent( view, index ) {
		if ( !view.isRendered ) {
			view.render();
		}

		if ( view.element && this._parentElement ) {
			this._parentElement.insertBefore( view.element, this._parentElement.children[ index ] );
		}
	}

	/**
	 * Removes a child view from the collection. If the {@link #setParent parent element} of the
	 * collection has been set, the {@link module:ui/view~View#element element} of the view is also removed
	 * in DOM, reflecting the order of the collection.
	 *
	 * See the {@link #add} method.
	 *
	 * @method #remove
	 * @param {module:ui/view~View|Number|String} subject The view to remove, its id or index in the collection.
	 * @returns {Object} The removed view.
	 */
}

// Check if all entries of the array are of `String` type.
//
// @private
// @param {Array} arr An array to be checked.
// @returns {Boolean}
function isStringArray$1( arr ) {
	return arr.every( a => typeof a == 'string' );
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module utils/toarray
 */

/**
 * Transforms any value to an array. If the provided value is already an array, it is returned unchanged.
 *
 * @param {*} data The value to transform to an array.
 * @returns {Array} An array created from data.
 */
function toArray( data ) {
	return Array.isArray( data ) ? data : [ data ];
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

const xhtmlNs = 'http://www.w3.org/1999/xhtml';

/**
 * A basic Template class. It renders a DOM HTML element or text from a
 * {@link module:ui/template~TemplateDefinition definition} and supports element attributes, children,
 * bindings to {@link module:utils/observablemixin~Observable observables} and DOM event propagation.
 *
 * A simple template can look like this:
 *
 *		const bind = Template.bind( observable, emitter );
 *
 *		new Template( {
 *			tag: 'p',
 *			attributes: {
 *				class: 'foo',
 *				style: {
 *					backgroundColor: 'yellow'
 *				}
 *			},
 *			on: {
 *				click: bind.to( 'clicked' )
 *			},
 *			children: [
 *				'A paragraph.'
 *			]
 *		} ).render();
 *
 * and it will render the following HTML element:
 *
 *		<p class="foo" style="background-color: yellow;">A paragraph.</p>
 *
 * Additionally, the `observable` will always fire `clicked` upon clicking `<p>` in the DOM.
 *
 * See {@link module:ui/template~TemplateDefinition} to know more about templates and complex
 * template definitions.
 *
* @mixes module:utils/emittermixin~EmitterMixin
 */
class Template {
	/**
	 * Creates an instance of the {@link ~Template} class.
	 *
	 * @param {module:ui/template~TemplateDefinition} def The definition of the template.
	 */
	constructor( def ) {
		Object.assign( this, normalize( clone( def ) ) );

		/**
		 * Indicates whether this particular Template instance has been
		 * {@link #render rendered}.
		 *
		 * @readonly
		 * @protected
		 * @member {Boolean}
		 */
		this._isRendered = false;

		/**
		 * The tag (`tagName`) of this template, e.g. `div`. It also indicates that the template
		 * renders to an HTML element.
		 *
		 * @member {String} #tag
		 */

		/**
		 * The text of the template. It also indicates that the template renders to a DOM text node.
		 *
		 * @member {Array.<String|module:ui/template~TemplateValueSchema>} #text
		 */

		/**
		 * The attributes of the template, e.g. `{ id: [ 'ck-id' ] }`, corresponding with
		 * the attributes of an HTML element.
		 *
		 * **Note**: This property only makes sense when {@link #tag} is defined.
		 *
		 * @member {Object} #attributes
		 */

		/**
		 * The children of the template. They can be either:
		 * * independent instances of {@link ~Template} (sub–templates),
		 * * native DOM Nodes.
		 *
		 * **Note**: This property only makes sense when {@link #tag} is defined.
		 *
		 * @member {Array.<module:ui/template~Template|Node>} #children
		 */

		/**
		 * The DOM event listeners of the template.
		 *
		 * @member {Object} #eventListeners
		 */

		/**
		 * The data used by the {@link #revert} method to restore a node to its original state.
		 *
		 * See: {@link #apply}.
		 *
		 * @readonly
		 * @protected
		 * @member {module:ui/template~RenderData}
		 */
		this._revertData = null;
	}

	/**
	 * Renders a DOM Node (an HTML element or text) out of the template.
	 *
	 *		const domNode = new Template( { ... } ).render();
	 *
	 * See: {@link #apply}.
	 *
	 * @returns {HTMLElement|Text}
	 */
	render() {
		const node = this._renderNode( {
			intoFragment: true
		} );

		this._isRendered = true;

		return node;
	}

	/**
	 * Applies the template to an existing DOM Node, either HTML element or text.
	 *
	 * **Note:** No new DOM nodes will be created. Applying extends:
	 *
	 * {@link module:ui/template~TemplateDefinition attributes},
	 * {@link module:ui/template~TemplateDefinition event listeners}, and
	 * `textContent` of {@link module:ui/template~TemplateDefinition children} only.
	 *
	 * **Note:** Existing `class` and `style` attributes are extended when a template
	 * is applied to an HTML element, while other attributes and `textContent` are overridden.
	 *
	 * **Note:** The process of applying a template can be easily reverted using the
	 * {@link module:ui/template~Template#revert} method.
	 *
	 *		const element = document.createElement( 'div' );
	 *		const observable = new Model( { divClass: 'my-div' } );
	 *		const emitter = Object.create( EmitterMixin );
	 *		const bind = Template.bind( observable, emitter );
	 *
	 *		new Template( {
	 *			attributes: {
	 *				id: 'first-div',
	 *				class: bind.to( 'divClass' )
	 *			},
	 *			on: {
	 *				click: bind( 'elementClicked' ) // Will be fired by the observable.
	 *			},
	 *			children: [
	 *				'Div text.'
	 *			]
	 *		} ).apply( element );
	 *
	 *		console.log( element.outerHTML ); // -> '<div id="first-div" class="my-div"></div>'
	 *
	 * @see module:ui/template~Template#render
	 * @see module:ui/template~Template#revert
	 * @param {Node} node Root node for the template to apply.
	 */
	apply( node ) {
		this._revertData = getEmptyRevertData();

		this._renderNode( {
			node,
			isApplying: true,
			revertData: this._revertData
		} );

		return node;
	}

	/**
	 * Reverts a template {@link module:ui/template~Template#apply applied} to a DOM node.
	 *
	 * @param {Node} node The root node for the template to revert. In most of the cases, it is the
	 * same node used by {@link module:ui/template~Template#apply}.
	 */
	revert( node ) {
		if ( !this._revertData ) {
			/**
			 * Attempting to revert a template which has not been applied yet.
			 *
			 * @error ui-template-revert-not-applied
			 */
			throw new CKEditorError(
				'ui-template-revert-not-applied',
				[ this, node ]
			);
		}

		this._revertTemplateFromNode( node, this._revertData );
	}

	/**
	 * Returns an iterator which traverses the template in search of {@link module:ui/view~View}
	 * instances and returns them one by one.
	 *
	 *		const viewFoo = new View();
	 *		const viewBar = new View();
	 *		const viewBaz = new View();
	 *		const template = new Template( {
	 *			tag: 'div',
	 *			children: [
	 *				viewFoo,
	 *				{
	 *					tag: 'div',
	 *					children: [
	 *						viewBar
	 *					]
	 *				},
	 *				viewBaz
	 *			]
	 *		} );
	 *
	 *		// Logs: viewFoo, viewBar, viewBaz
	 *		for ( const view of template.getViews() ) {
	 *			console.log( view );
	 *		}
	 *
	 * @returns {Iterable.<module:ui/view~View>}
	 */
	* getViews() {
		function* search( def ) {
			if ( def.children ) {
				for ( const child of def.children ) {
					if ( isView( child ) ) {
						yield child;
					} else if ( isTemplate( child ) ) {
						yield* search( child );
					}
				}
			}
		}

		yield* search( this );
	}

	/**
	 * An entry point to the interface which binds DOM nodes to
	 * {@link module:utils/observablemixin~Observable observables}.
	 * There are two types of bindings:
	 *
	 * * HTML element attributes or text `textContent` synchronized with attributes of an
	 * {@link module:utils/observablemixin~Observable}. Learn more about {@link module:ui/template~BindChain#to}
	 * and {@link module:ui/template~BindChain#if}.
	 *
	 *		const bind = Template.bind( observable, emitter );
	 *
	 *		new Template( {
	 *			attributes: {
	 *				// Binds the element "class" attribute to observable#classAttribute.
	 *				class: bind.to( 'classAttribute' )
	 *			}
	 *		} ).render();
	 *
	 * * DOM events fired on HTML element propagated through
	 * {@link module:utils/observablemixin~Observable}. Learn more about {@link module:ui/template~BindChain#to}.
	 *
	 *		const bind = Template.bind( observable, emitter );
	 *
	 *		new Template( {
	 *			on: {
	 *				// Will be fired by the observable.
	 *				click: bind( 'elementClicked' )
	 *			}
	 *		} ).render();
	 *
	 * Also see {@link module:ui/view~View#bindTemplate}.
	 *
	 * @param {module:utils/observablemixin~Observable} observable An observable which provides boundable attributes.
	 * @param {module:utils/emittermixin~Emitter} emitter An emitter that listens to observable attribute
	 * changes or DOM Events (depending on the kind of the binding). Usually, a {@link module:ui/view~View} instance.
	 * @returns {module:ui/template~BindChain}
	 */
	static bind( observable, emitter ) {
		return {
			to( eventNameOrFunctionOrAttribute, callback ) {
				return new TemplateToBinding( {
					eventNameOrFunction: eventNameOrFunctionOrAttribute,
					attribute: eventNameOrFunctionOrAttribute,
					observable, emitter, callback
				} );
			},

			if( attribute, valueIfTrue, callback ) {
				return new TemplateIfBinding( {
					observable, emitter, attribute, valueIfTrue, callback
				} );
			}
		};
	}

	/**
	 * Extends an existing {@link module:ui/template~Template} instance with some additional content
	 * from another {@link module:ui/template~TemplateDefinition}.
	 *
	 *		const bind = Template.bind( observable, emitter );
	 *
	 *		const template = new Template( {
	 *			tag: 'p',
	 *			attributes: {
	 *				class: 'a',
	 *				data-x: bind.to( 'foo' )
	 *			},
	 *			children: [
	 *				{
	 *					tag: 'span',
	 *					attributes: {
	 *						class: 'b'
	 *					},
	 *					children: [
	 *						'Span'
	 *					]
	 *				}
	 *			]
	 *		 } );
	 *
	 *		// Instance-level extension.
	 *		Template.extend( template, {
	 *			attributes: {
	 *				class: 'b',
	 *				data-x: bind.to( 'bar' )
	 *			},
	 *			children: [
	 *				{
	 *					attributes: {
	 *						class: 'c'
	 *					}
	 *				}
	 *			]
	 *		} );
	 *
	 *		// Child extension.
	 *		Template.extend( template.children[ 0 ], {
	 *			attributes: {
	 *				class: 'd'
	 *			}
	 *		} );
	 *
	 * the `outerHTML` of `template.render()` is:
	 *
	 *		<p class="a b" data-x="{ observable.foo } { observable.bar }">
	 *			<span class="b c d">Span</span>
	 *		</p>
	 *
	 * @param {module:ui/template~Template} template An existing template instance to be extended.
	 * @param {module:ui/template~TemplateDefinition} def Additional definition to be applied to a template.
	 */
	static extend( template, def ) {
		if ( template._isRendered ) {
			/**
			 * Extending a template after rendering may not work as expected. To make sure
			 * the {@link module:ui/template~Template.extend extending} works for an element,
			 * make sure it happens before {@link #render} is called.
			 *
			 * @error template-extend-render
			 */
			throw new CKEditorError(
				'template-extend-render',
				[ this, template ]
			);
		}

		extendTemplate( template, normalize( clone( def ) ) );
	}

	/**
	 * Renders a DOM Node (either an HTML element or text) out of the template.
	 *
	 * @protected
	 * @param {module:ui/template~RenderData} data Rendering data.
	 */
	_renderNode( data ) {
		let isInvalid;

		if ( data.node ) {
			// When applying, a definition cannot have "tag" and "text" at the same time.
			isInvalid = this.tag && this.text;
		} else {
			// When rendering, a definition must have either "tag" or "text": XOR( this.tag, this.text ).
			isInvalid = this.tag ? this.text : !this.text;
		}

		if ( isInvalid ) {
			/**
			 * Node definition cannot have the "tag" and "text" properties at the same time.
			 * Node definition must have either "tag" or "text" when rendering a new Node.
			 *
			 * @error ui-template-wrong-syntax
			 */
			throw new CKEditorError(
				'ui-template-wrong-syntax',
				this
			);
		}

		if ( this.text ) {
			return this._renderText( data );
		} else {
			return this._renderElement( data );
		}
	}

	/**
	 * Renders an HTML element out of the template.
	 *
	 * @protected
	 * @param {module:ui/template~RenderData} data Rendering data.
	 */
	_renderElement( data ) {
		let node = data.node;

		if ( !node ) {
			node = data.node = document.createElementNS( this.ns || xhtmlNs, this.tag );
		}

		this._renderAttributes( data );
		this._renderElementChildren( data );
		this._setUpListeners( data );

		return node;
	}

	/**
	 * Renders a text node out of {@link module:ui/template~Template#text}.
	 *
	 * @protected
	 * @param {module:ui/template~RenderData} data Rendering data.
	 */
	_renderText( data ) {
		let node = data.node;

		// Save the original textContent to revert it in #revert().
		if ( node ) {
			data.revertData.text = node.textContent;
		} else {
			node = data.node = document.createTextNode( '' );
		}

		// Check if this Text Node is bound to Observable. Cases:
		//
		//		text: [ Template.bind( ... ).to( ... ) ]
		//
		//		text: [
		//			'foo',
		//			Template.bind( ... ).to( ... ),
		//			...
		//		]
		//
		if ( hasTemplateBinding( this.text ) ) {
			this._bindToObservable( {
				schema: this.text,
				updater: getTextUpdater( node ),
				data
			} );
		}
		// Simply set text. Cases:
		//
		//		text: [ 'all', 'are', 'static' ]
		//
		//		text: [ 'foo' ]
		//
		else {
			node.textContent = this.text.join( '' );
		}

		return node;
	}

	/**
	 * Renders HTML element attributes out of {@link module:ui/template~Template#attributes}.
	 *
	 * @protected
	 * @param {module:ui/template~RenderData} data Rendering data.
	 */
	_renderAttributes( data ) {
		let attrName, attrValue, domAttrValue, attrNs;

		if ( !this.attributes ) {
			return;
		}

		const node = data.node;
		const revertData = data.revertData;

		for ( attrName in this.attributes ) {
			// Current attribute value in DOM.
			domAttrValue = node.getAttribute( attrName );

			// The value to be set.
			attrValue = this.attributes[ attrName ];

			// Save revert data.
			if ( revertData ) {
				revertData.attributes[ attrName ] = domAttrValue;
			}

			// Detect custom namespace:
			//
			//		class: {
			//			ns: 'abc',
			//			value: Template.bind( ... ).to( ... )
			//		}
			//
			attrNs = ( isObject( attrValue[ 0 ] ) && attrValue[ 0 ].ns ) ? attrValue[ 0 ].ns : null;

			// Activate binding if one is found. Cases:
			//
			//		class: [
			//			Template.bind( ... ).to( ... )
			//		]
			//
			//		class: [
			//			'bar',
			//			Template.bind( ... ).to( ... ),
			//			'baz'
			//		]
			//
			//		class: {
			//			ns: 'abc',
			//			value: Template.bind( ... ).to( ... )
			//		}
			//
			if ( hasTemplateBinding( attrValue ) ) {
				// Normalize attributes with additional data like namespace:
				//
				//		class: {
				//			ns: 'abc',
				//			value: [ ... ]
				//		}
				//
				const valueToBind = attrNs ? attrValue[ 0 ].value : attrValue;

				// Extend the original value of attributes like "style" and "class",
				// don't override them.
				if ( revertData && shouldExtend( attrName ) ) {
					valueToBind.unshift( domAttrValue );
				}

				this._bindToObservable( {
					schema: valueToBind,
					updater: getAttributeUpdater( node, attrName, attrNs ),
					data
				} );
			}

			// Style attribute could be an Object so it needs to be parsed in a specific way.
			//
			//		style: {
			//			width: '100px',
			//			height: Template.bind( ... ).to( ... )
			//		}
			//
			else if ( attrName == 'style' && typeof attrValue[ 0 ] !== 'string' ) {
				this._renderStyleAttribute( attrValue[ 0 ], data );
			}

			// Otherwise simply set the static attribute:
			//
			//		class: [ 'foo' ]
			//
			//		class: [ 'all', 'are', 'static' ]
			//
			//		class: [
			//			{
			//				ns: 'abc',
			//				value: [ 'foo' ]
			//			}
			//		]
			//
			else {
				// Extend the original value of attributes like "style" and "class",
				// don't override them.
				if ( revertData && domAttrValue && shouldExtend( attrName ) ) {
					attrValue.unshift( domAttrValue );
				}

				attrValue = attrValue
					// Retrieve "values" from:
					//
					//		class: [
					//			{
					//				ns: 'abc',
					//				value: [ ... ]
					//			}
					//		]
					//
					.map( val => val ? ( val.value || val ) : val )
					// Flatten the array.
					.reduce( ( prev, next ) => prev.concat( next ), [] )
					// Convert into string.
					.reduce( arrayValueReducer, '' );

				if ( !isFalsy( attrValue ) ) {
					node.setAttributeNS( attrNs, attrName, attrValue );
				}
			}
		}
	}

	/**
	 * Renders the `style` attribute of an HTML element based on
	 * {@link module:ui/template~Template#attributes}.
	 *
	 * A style attribute is an {Object} with static values:
	 *
	 *		attributes: {
	 *			style: {
	 *				color: 'red'
	 *			}
	 *		}
	 *
	 * or values bound to {@link module:ui/model~Model} properties:
	 *
	 *		attributes: {
	 *			style: {
	 *				color: bind.to( ... )
	 *			}
	 *		}
	 *
	 * Note: The `style` attribute is rendered without setting the namespace. It does not seem to be
	 * needed.
	 *
	 * @private
	 * @param {Object} styles Styles located in `attributes.style` of {@link module:ui/template~TemplateDefinition}.
	 * @param {module:ui/template~RenderData} data Rendering data.
	 */
	_renderStyleAttribute( styles, data ) {
		const node = data.node;

		for ( const styleName in styles ) {
			const styleValue = styles[ styleName ];

			// Cases:
			//
			//		style: {
			//			color: bind.to( 'attribute' )
			//		}
			//
			if ( hasTemplateBinding( styleValue ) ) {
				this._bindToObservable( {
					schema: [ styleValue ],
					updater: getStyleUpdater( node, styleName ),
					data
				} );
			}

			// Cases:
			//
			//		style: {
			//			color: 'red'
			//		}
			//
			else {
				node.style[ styleName ] = styleValue;
			}
		}
	}

	/**
	 * Recursively renders HTML element's children from {@link module:ui/template~Template#children}.
	 *
	 * @protected
	 * @param {module:ui/template~RenderData} data Rendering data.
	 */
	_renderElementChildren( data ) {
		const node = data.node;
		const container = data.intoFragment ? document.createDocumentFragment() : node;
		const isApplying = data.isApplying;
		let childIndex = 0;

		for ( const child of this.children ) {
			if ( isViewCollection( child ) ) {
				if ( !isApplying ) {
					child.setParent( node );

					// Note: ViewCollection renders its children.
					for ( const view of child ) {
						container.appendChild( view.element );
					}
				}
			} else if ( isView( child ) ) {
				if ( !isApplying ) {
					if ( !child.isRendered ) {
						child.render();
					}

					container.appendChild( child.element );
				}
			} else if ( isNode( child ) ) {
				container.appendChild( child );
			} else {
				if ( isApplying ) {
					const revertData = data.revertData;
					const childRevertData = getEmptyRevertData();

					revertData.children.push( childRevertData );

					child._renderNode( {
						node: container.childNodes[ childIndex++ ],
						isApplying: true,
						revertData: childRevertData
					} );
				} else {
					container.appendChild( child.render() );
				}
			}
		}

		if ( data.intoFragment ) {
			node.appendChild( container );
		}
	}

	/**
	 * Activates `on` event listeners from the {@link module:ui/template~TemplateDefinition}
	 * on an HTML element.
	 *
	 * @protected
	 * @param {module:ui/template~RenderData} data Rendering data.
	 */
	_setUpListeners( data ) {
		if ( !this.eventListeners ) {
			return;
		}

		for ( const key in this.eventListeners ) {
			const revertBindings = this.eventListeners[ key ].map( schemaItem => {
				const [ domEvtName, domSelector ] = key.split( '@' );

				return schemaItem.activateDomEventListener( domEvtName, domSelector, data );
			} );

			if ( data.revertData ) {
				data.revertData.bindings.push( revertBindings );
			}
		}
	}

	/**
	 * For a given {@link module:ui/template~TemplateValueSchema} containing {@link module:ui/template~TemplateBinding}
	 * activates the binding and sets its initial value.
	 *
	 * Note: {@link module:ui/template~TemplateValueSchema} can be for HTML element attributes or
	 * text node `textContent`.
	 *
	 * @protected
	 * @param {Object} options Binding options.
	 * @param {module:ui/template~TemplateValueSchema} options.schema
	 * @param {Function} options.updater A function which updates the DOM (like attribute or text).
	 * @param {module:ui/template~RenderData} options.data Rendering data.
	 */
	_bindToObservable( { schema, updater, data } ) {
		const revertData = data.revertData;

		// Set initial values.
		syncValueSchemaValue( schema, updater, data );

		const revertBindings = schema
			// Filter "falsy" (false, undefined, null, '') value schema components out.
			.filter( item => !isFalsy( item ) )
			// Filter inactive bindings from schema, like static strings ('foo'), numbers (42), etc.
			.filter( item => item.observable )
			// Once only the actual binding are left, let the emitter listen to observable change:attribute event.
			// TODO: Reduce the number of listeners attached as many bindings may listen
			// to the same observable attribute.
			.map( templateBinding => templateBinding.activateAttributeListener( schema, updater, data ) );

		if ( revertData ) {
			revertData.bindings.push( revertBindings );
		}
	}

	/**
	 * Reverts {@link module:ui/template~RenderData#revertData template data} from a node to
	 * return it to the original state.
	 *
	 * @protected
	 * @param {HTMLElement|Text} node A node to be reverted.
	 * @param {Object} revertData An object that stores information about what changes have been made by
	 * {@link #apply} to the node. See {@link module:ui/template~RenderData#revertData} for more information.
	 */
	_revertTemplateFromNode( node, revertData ) {
		for ( const binding of revertData.bindings ) {
			// Each binding may consist of several observable+observable#attribute.
			// like the following has 2:
			//
			//		class: [
			//			'x',
			//			bind.to( 'foo' ),
			//			'y',
			//			bind.to( 'bar' )
			//		]
			//
			for ( const revertBinding of binding ) {
				revertBinding();
			}
		}

		if ( revertData.text ) {
			node.textContent = revertData.text;

			return;
		}

		for ( const attrName in revertData.attributes ) {
			const attrValue = revertData.attributes[ attrName ];

			// When the attribute has **not** been set before #apply().
			if ( attrValue === null ) {
				node.removeAttribute( attrName );
			} else {
				node.setAttribute( attrName, attrValue );
			}
		}

		for ( let i = 0; i < revertData.children.length; ++i ) {
			this._revertTemplateFromNode( node.childNodes[ i ], revertData.children[ i ] );
		}
	}
}

mix( Template, EmitterMixin );

/**
 * Describes a binding created by the {@link module:ui/template~Template.bind} interface.
 *
 * @protected
 */
class TemplateBinding {
	/**
	 * Creates an instance of the {@link module:ui/template~TemplateBinding} class.
	 *
	 * @param {module:ui/template~TemplateDefinition} def The definition of the binding.
	 */
	constructor( def ) {
		Object.assign( this, def );

		/**
		 * An observable instance of the binding. It either:
		 *
		 * * provides the attribute with the value,
		 * * or passes the event when a corresponding DOM event is fired.
		 *
		 * @member {module:utils/observablemixin~ObservableMixin} module:ui/template~TemplateBinding#observable
		 */

		/**
		 * An {@link module:utils/emittermixin~Emitter} used by the binding to:
		 *
		 * * listen to the attribute change in the {@link module:ui/template~TemplateBinding#observable},
		 * * or listen to the event in the DOM.
		 *
		 * @member {module:utils/emittermixin~EmitterMixin} module:ui/template~TemplateBinding#emitter
		 */

		/**
		 * The name of the {@link module:ui/template~TemplateBinding#observable observed attribute}.
		 *
		 * @member {String} module:ui/template~TemplateBinding#attribute
		 */

		/**
		 * A custom function to process the value of the {@link module:ui/template~TemplateBinding#attribute}.
		 *
		 * @member {Function} [module:ui/template~TemplateBinding#callback]
		 */
	}

	/**
	 * Returns the value of the binding. It is the value of the {@link module:ui/template~TemplateBinding#attribute} in
	 * {@link module:ui/template~TemplateBinding#observable}. The value may be processed by the
	 * {@link module:ui/template~TemplateBinding#callback}, if such has been passed to the binding.
	 *
	 * @param {Node} [node] A native DOM node, passed to the custom {@link module:ui/template~TemplateBinding#callback}.
	 * @returns {*} The value of {@link module:ui/template~TemplateBinding#attribute} in
	 * {@link module:ui/template~TemplateBinding#observable}.
	 */
	getValue( node ) {
		const value = this.observable[ this.attribute ];

		return this.callback ? this.callback( value, node ) : value;
	}

	/**
	 * Activates the listener which waits for changes of the {@link module:ui/template~TemplateBinding#attribute} in
	 * {@link module:ui/template~TemplateBinding#observable}, then updates the DOM with the aggregated
	 * value of {@link module:ui/template~TemplateValueSchema}.
	 *
	 * @param {module:ui/template~TemplateValueSchema} schema A full schema to generate an attribute or text in the DOM.
	 * @param {Function} updater A DOM updater function used to update the native DOM attribute or text.
	 * @param {module:ui/template~RenderData} data Rendering data.
	 * @returns {Function} A function to sever the listener binding.
	 */
	activateAttributeListener( schema, updater, data ) {
		const callback = () => syncValueSchemaValue( schema, updater, data );

		this.emitter.listenTo( this.observable, 'change:' + this.attribute, callback );

		// Allows revert of the listener.
		return () => {
			this.emitter.stopListening( this.observable, 'change:' + this.attribute, callback );
		};
	}
}

/**
 * Describes either:
 *
 * * a binding to an {@link module:utils/observablemixin~Observable},
 * * or a native DOM event binding.
 *
 * It is created by the {@link module:ui/template~BindChain#to} method.
 *
 * @protected
 */
class TemplateToBinding extends TemplateBinding {
	/**
	 * Activates the listener for the native DOM event, which when fired, is propagated by
	 * the {@link module:ui/template~TemplateBinding#emitter}.
	 *
	 * @param {String} domEvtName The name of the native DOM event.
	 * @param {String} domSelector The selector in the DOM to filter delegated events.
	 * @param {module:ui/template~RenderData} data Rendering data.
	 * @returns {Function} A function to sever the listener binding.
	 */
	activateDomEventListener( domEvtName, domSelector, data ) {
		const callback = ( evt, domEvt ) => {
			if ( !domSelector || domEvt.target.matches( domSelector ) ) {
				if ( typeof this.eventNameOrFunction == 'function' ) {
					this.eventNameOrFunction( domEvt );
				} else {
					this.observable.fire( this.eventNameOrFunction, domEvt );
				}
			}
		};

		this.emitter.listenTo( data.node, domEvtName, callback );

		// Allows revert of the listener.
		return () => {
			this.emitter.stopListening( data.node, domEvtName, callback );
		};
	}
}

/**
 * Describes a binding to {@link module:utils/observablemixin~ObservableMixin} created by the {@link module:ui/template~BindChain#if}
 * method.
 *
 * @protected
 */
class TemplateIfBinding extends TemplateBinding {
	/**
	 * @inheritDoc
	 */
	getValue( node ) {
		const value = super.getValue( node );

		return isFalsy( value ) ? false : ( this.valueIfTrue || true );
	}

	/**
	 * The value of the DOM attribute or text to be set if the {@link module:ui/template~TemplateBinding#attribute} in
	 * {@link module:ui/template~TemplateBinding#observable} is `true`.
	 *
	 * @member {String} [module:ui/template~TemplateIfBinding#valueIfTrue]
	 */
}

// Checks whether given {@link module:ui/template~TemplateValueSchema} contains a
// {@link module:ui/template~TemplateBinding}.
//
// @param {module:ui/template~TemplateValueSchema} schema
// @returns {Boolean}
function hasTemplateBinding( schema ) {
	if ( !schema ) {
		return false;
	}

	// Normalize attributes with additional data like namespace:
	//
	//		class: {
	//			ns: 'abc',
	//			value: [ ... ]
	//		}
	//
	if ( schema.value ) {
		schema = schema.value;
	}

	if ( Array.isArray( schema ) ) {
		return schema.some( hasTemplateBinding );
	} else if ( schema instanceof TemplateBinding ) {
		return true;
	}

	return false;
}

// Assembles the value using {@link module:ui/template~TemplateValueSchema} and stores it in a form of
// an Array. Each entry of the Array corresponds to one of {@link module:ui/template~TemplateValueSchema}
// items.
//
// @param {module:ui/template~TemplateValueSchema} schema
// @param {Node} node DOM Node updated when {@link module:utils/observablemixin~ObservableMixin} changes.
// @returns {Array}
function getValueSchemaValue( schema, node ) {
	return schema.map( schemaItem => {
		// Process {@link module:ui/template~TemplateBinding} bindings.
		if ( schemaItem instanceof TemplateBinding ) {
			return schemaItem.getValue( node );
		}

		// All static values like strings, numbers, and "falsy" values (false, null, undefined, '', etc.) just pass.
		return schemaItem;
	} );
}

// A function executed each time the bound Observable attribute changes, which updates the DOM with a value
// constructed from {@link module:ui/template~TemplateValueSchema}.
//
// @param {module:ui/template~TemplateValueSchema} schema
// @param {Function} updater A function which updates the DOM (like attribute or text).
// @param {Node} node DOM Node updated when {@link module:utils/observablemixin~ObservableMixin} changes.
function syncValueSchemaValue( schema, updater, { node } ) {
	let value = getValueSchemaValue( schema, node );

	// Check if schema is a single Template.bind.if, like:
	//
	//		class: Template.bind.if( 'foo' )
	//
	if ( schema.length == 1 && schema[ 0 ] instanceof TemplateIfBinding ) {
		value = value[ 0 ];
	} else {
		value = value.reduce( arrayValueReducer, '' );
	}

	if ( isFalsy( value ) ) {
		updater.remove();
	} else {
		updater.set( value );
	}
}

// Returns an object consisting of `set` and `remove` functions, which
// can be used in the context of DOM Node to set or reset `textContent`.
// @see module:ui/view~View#_bindToObservable
//
// @param {Node} node DOM Node to be modified.
// @returns {Object}
function getTextUpdater( node ) {
	return {
		set( value ) {
			node.textContent = value;
		},

		remove() {
			node.textContent = '';
		}
	};
}

// Returns an object consisting of `set` and `remove` functions, which
// can be used in the context of DOM Node to set or reset an attribute.
// @see module:ui/view~View#_bindToObservable
//
// @param {Node} node DOM Node to be modified.
// @param {String} attrName Name of the attribute to be modified.
// @param {String} [ns=null] Namespace to use.
// @returns {Object}
function getAttributeUpdater( el, attrName, ns ) {
	return {
		set( value ) {
			el.setAttributeNS( ns, attrName, value );
		},

		remove() {
			el.removeAttributeNS( ns, attrName );
		}
	};
}

// Returns an object consisting of `set` and `remove` functions, which
// can be used in the context of CSSStyleDeclaration to set or remove a style.
// @see module:ui/view~View#_bindToObservable
//
// @param {Node} node DOM Node to be modified.
// @param {String} styleName Name of the style to be modified.
// @returns {Object}
function getStyleUpdater( el, styleName ) {
	return {
		set( value ) {
			el.style[ styleName ] = value;
		},

		remove() {
			el.style[ styleName ] = null;
		}
	};
}

// Clones definition of the template.
//
// @param {module:ui/template~TemplateDefinition} def
// @returns {module:ui/template~TemplateDefinition}
function clone( def ) {
	const clone = cloneDeepWith( def, value => {
		// Don't clone the `Template.bind`* bindings because of the references to Observable
		// and DomEmitterMixin instances inside, which would also be traversed and cloned by greedy
		// cloneDeepWith algorithm. There's no point in cloning Observable/DomEmitterMixins
		// along with the definition.
		//
		// Don't clone Template instances if provided as a child. They're simply #render()ed
		// and nothing should interfere.
		//
		// Also don't clone View instances if provided as a child of the Template. The template
		// instance will be extracted from the View during the normalization and there's no need
		// to clone it.
		if ( value && ( value instanceof TemplateBinding || isTemplate( value ) || isView( value ) || isViewCollection( value ) ) ) {
			return value;
		}
	} );

	return clone;
}

// Normalizes given {@link module:ui/template~TemplateDefinition}.
//
// See:
//  * {@link normalizeAttributes}
//  * {@link normalizeListeners}
//  * {@link normalizePlainTextDefinition}
//  * {@link normalizeTextDefinition}
//
// @param {module:ui/template~TemplateDefinition} def
// @returns {module:ui/template~TemplateDefinition} Normalized definition.
function normalize( def ) {
	if ( typeof def == 'string' ) {
		def = normalizePlainTextDefinition( def );
	} else if ( def.text ) {
		normalizeTextDefinition( def );
	}

	if ( def.on ) {
		def.eventListeners = normalizeListeners( def.on );

		// Template mixes EmitterMixin, so delete #on to avoid collision.
		delete def.on;
	}

	if ( !def.text ) {
		if ( def.attributes ) {
			normalizeAttributes( def.attributes );
		}

		const children = [];

		if ( def.children ) {
			if ( isViewCollection( def.children ) ) {
				children.push( def.children );
			} else {
				for ( const child of def.children ) {
					if ( isTemplate( child ) || isView( child ) || isNode( child ) ) {
						children.push( child );
					} else {
						children.push( new Template( child ) );
					}
				}
			}
		}

		def.children = children;
	}

	return def;
}

// Normalizes "attributes" section of {@link module:ui/template~TemplateDefinition}.
//
//		attributes: {
//			a: 'bar',
//			b: {@link module:ui/template~TemplateBinding},
//			c: {
//				value: 'bar'
//			}
//		}
//
// becomes
//
//		attributes: {
//			a: [ 'bar' ],
//			b: [ {@link module:ui/template~TemplateBinding} ],
//			c: {
//				value: [ 'bar' ]
//			}
//		}
//
// @param {Object} attributes
function normalizeAttributes( attributes ) {
	for ( const a in attributes ) {
		if ( attributes[ a ].value ) {
			attributes[ a ].value = toArray( attributes[ a ].value );
		}

		arrayify( attributes, a );
	}
}

// Normalizes "on" section of {@link module:ui/template~TemplateDefinition}.
//
//		on: {
//			a: 'bar',
//			b: {@link module:ui/template~TemplateBinding},
//			c: [ {@link module:ui/template~TemplateBinding}, () => { ... } ]
//		}
//
// becomes
//
//		on: {
//			a: [ 'bar' ],
//			b: [ {@link module:ui/template~TemplateBinding} ],
//			c: [ {@link module:ui/template~TemplateBinding}, () => { ... } ]
//		}
//
// @param {Object} listeners
// @returns {Object} Object containing normalized listeners.
function normalizeListeners( listeners ) {
	for ( const l in listeners ) {
		arrayify( listeners, l );
	}

	return listeners;
}

// Normalizes "string" {@link module:ui/template~TemplateDefinition}.
//
//		"foo"
//
// becomes
//
//		{ text: [ 'foo' ] },
//
// @param {String} def
// @returns {module:ui/template~TemplateDefinition} Normalized template definition.
function normalizePlainTextDefinition( def ) {
	return {
		text: [ def ]
	};
}

// Normalizes text {@link module:ui/template~TemplateDefinition}.
//
//		children: [
//			{ text: 'def' },
//			{ text: {@link module:ui/template~TemplateBinding} }
//		]
//
// becomes
//
//		children: [
//			{ text: [ 'def' ] },
//			{ text: [ {@link module:ui/template~TemplateBinding} ] }
//		]
//
// @param {module:ui/template~TemplateDefinition} def
function normalizeTextDefinition( def ) {
	def.text = toArray( def.text );
}

// Wraps an entry in Object in an Array, if not already one.
//
//		{
//			x: 'y',
//			a: [ 'b' ]
//		}
//
// becomes
//
//		{
//			x: [ 'y' ],
//			a: [ 'b' ]
//		}
//
// @param {Object} obj
// @param {String} key
function arrayify( obj, key ) {
	obj[ key ] = toArray( obj[ key ] );
}

// A helper which concatenates the value avoiding unwanted
// leading white spaces.
//
// @param {String} prev
// @param {String} cur
// @returns {String}
function arrayValueReducer( prev, cur ) {
	if ( isFalsy( cur ) ) {
		return prev;
	} else if ( isFalsy( prev ) ) {
		return cur;
	} else {
		return `${ prev } ${ cur }`;
	}
}

// Extends one object defined in the following format:
//
//		{
//			key1: [Array1],
//			key2: [Array2],
//			...
//			keyN: [ArrayN]
//		}
//
// with another object of the same data format.
//
// @param {Object} obj Base object.
// @param {Object} ext Object extending base.
// @returns {String}
function extendObjectValueArray( obj, ext ) {
	for ( const a in ext ) {
		if ( obj[ a ] ) {
			obj[ a ].push( ...ext[ a ] );
		} else {
			obj[ a ] = ext[ a ];
		}
	}
}

// A helper for {@link module:ui/template~Template#extend}. Recursively extends {@link module:ui/template~Template} instance
// with content from {@link module:ui/template~TemplateDefinition}. See {@link module:ui/template~Template#extend} to learn more.
//
// @param {module:ui/template~Template} def A template instance to be extended.
// @param {module:ui/template~TemplateDefinition} def A definition which is to extend the template instance.
// @param {Object} Error context.
function extendTemplate( template, def ) {
	if ( def.attributes ) {
		if ( !template.attributes ) {
			template.attributes = {};
		}

		extendObjectValueArray( template.attributes, def.attributes );
	}

	if ( def.eventListeners ) {
		if ( !template.eventListeners ) {
			template.eventListeners = {};
		}

		extendObjectValueArray( template.eventListeners, def.eventListeners );
	}

	if ( def.text ) {
		template.text.push( ...def.text );
	}

	if ( def.children && def.children.length ) {
		if ( template.children.length != def.children.length ) {
			/**
			 * The number of children in extended definition does not match.
			 *
			 * @error ui-template-extend-children-mismatch
			 */
			throw new CKEditorError(
				'ui-template-extend-children-mismatch',
				template
			);
		}

		let childIndex = 0;

		for ( const childDef of def.children ) {
			extendTemplate( template.children[ childIndex++ ], childDef );
		}
	}
}

// Checks if value is "falsy".
// Note: 0 (Number) is not "falsy" in this context.
//
// @private
// @param {*} value Value to be checked.
function isFalsy( value ) {
	return !value && value !== 0;
}

// Checks if the item is an instance of {@link module:ui/view~View}
//
// @private
// @param {*} value Value to be checked.
function isView( item ) {
	return item instanceof View;
}

// Checks if the item is an instance of {@link module:ui/template~Template}
//
// @private
// @param {*} value Value to be checked.
function isTemplate( item ) {
	return item instanceof Template;
}

// Checks if the item is an instance of {@link module:ui/viewcollection~ViewCollection}
//
// @private
// @param {*} value Value to be checked.
function isViewCollection( item ) {
	return item instanceof ViewCollection;
}

// Creates an empty skeleton for {@link module:ui/template~Template#revert}
// data.
//
// @private
function getEmptyRevertData() {
	return {
		children: [],
		bindings: [],
		attributes: {}
	};
}

// Checks whether an attribute should be extended when
// {@link module:ui/template~Template#apply} is called.
//
// @private
// @param {String} attrName Attribute name to check.
function shouldExtend( attrName ) {
	return attrName == 'class' || attrName == 'style';
}

/**
 * A definition of the {@link module:ui/template~Template}. It describes what kind of
 * node a template will render (HTML element or text), attributes of an element, DOM event
 * listeners and children.
 *
 * Also see:
 * * {@link module:ui/template~TemplateValueSchema} to learn about HTML element attributes,
 * * {@link module:ui/template~TemplateListenerSchema} to learn about DOM event listeners.
 *
 * A sample definition on an HTML element can look like this:
 *
 *		new Template( {
 *			tag: 'p',
 *			children: [
 *				{
 *					tag: 'span',
 *					attributes: { ... },
 *					children: [ ... ],
 *				},
 *				{
 *					text: 'static–text'
 *				},
 *				'also-static–text',
 *			],
 *			attributes: {
 *				class: {@link module:ui/template~TemplateValueSchema},
 *				id: {@link module:ui/template~TemplateValueSchema},
 *				style: {@link module:ui/template~TemplateValueSchema}
 *
 *				// ...
 *			},
 *			on: {
 *				'click': {@link module:ui/template~TemplateListenerSchema}
 *
 *				// Document.querySelector format is also accepted.
 *				'keyup@a.some-class': {@link module:ui/template~TemplateListenerSchema}
 *
 *				// ...
 *			}
 *		} );
 *
 * A {@link module:ui/view~View}, another {@link module:ui/template~Template} or a native DOM node
 * can also become a child of a template. When a view is passed, its {@link module:ui/view~View#element} is used:
 *
 *		const view = new SomeView();
 *		const childTemplate = new Template( { ... } );
 *		const childNode = document.createElement( 'b' );
 *
 *		new Template( {
 *			tag: 'p',
 *
 *			children: [
 *				// view#element will be added as a child of this <p>.
 *				view,
 *
 * 				// The output of childTemplate.render() will be added here.
 *				childTemplate,
 *
 *				// Native DOM nodes are included directly in the rendered output.
 *				childNode
 *			]
 *		} );
 *
 * An entire {@link module:ui/viewcollection~ViewCollection} can be used as a child in the definition:
 *
 *		const collection = new ViewCollection();
 *		collection.add( someView );
 *
 *		new Template( {
 *			tag: 'p',
 *
 *			children: collection
 *		} );
 *
 * @typedef module:ui/template~TemplateDefinition
 * @type Object
 *
 * @property {String} tag See the template {@link module:ui/template~Template#tag} property.
 *
 * @property {Array.<module:ui/template~TemplateDefinition>} [children]
 * See the template {@link module:ui/template~Template#children} property.
 *
 * @property {Object.<String, module:ui/template~TemplateValueSchema>} [attributes]
 * See the template {@link module:ui/template~Template#attributes} property.
 *
 * @property {String|module:ui/template~TemplateValueSchema|Array.<String|module:ui/template~TemplateValueSchema>} [text]
 * See the template {@link module:ui/template~Template#text} property.
 *
 * @property {Object.<String, module:ui/template~TemplateListenerSchema>} [on]
 * See the template {@link module:ui/template~Template#eventListeners} property.
 */

/**
 * Describes a value of an HTML element attribute or `textContent`. It allows combining multiple
 * data sources like static values and {@link module:utils/observablemixin~Observable} attributes.
 *
 * Also see:
 * * {@link module:ui/template~TemplateDefinition} to learn where to use it,
 * * {@link module:ui/template~Template.bind} to learn how to configure
 * {@link module:utils/observablemixin~Observable} attribute bindings,
 * * {@link module:ui/template~Template#render} to learn how to render a template,
 * * {@link module:ui/template~BindChain#to `to()`} and {@link module:ui/template~BindChain#if `if()`}
 * methods to learn more about bindings.
 *
 * Attribute values can be described in many different ways:
 *
 *		// Bind helper will create bindings to attributes of the observable.
 *		const bind = Template.bind( observable, emitter );
 *
 *		new Template( {
 *			tag: 'p',
 *			attributes: {
 *				// A plain string schema.
 *				'class': 'static-text',
 *
 *				// An object schema, binds to the "foo" attribute of the
 *				// observable and follows its value.
 *				'class': bind.to( 'foo' ),
 *
 *				// An array schema, combines the above.
 *				'class': [
 *					'static-text',
 *					bind.to( 'bar', () => { ... } ),
 *
 * 					// Bindings can also be conditional.
 *					bind.if( 'baz', 'class-when-baz-is-true' )
 *				],
 *
 *				// An array schema, with a custom namespace, e.g. useful for creating SVGs.
 *				'class': {
 *					ns: 'http://ns.url',
 *					value: [
 *						bind.if( 'baz', 'value-when-true' ),
 *						'static-text'
 *					]
 *				},
 *
 *				// An object schema, specific for styles.
 *				style: {
 *					color: 'red',
 *					backgroundColor: bind.to( 'qux', () => { ... } )
 *				}
 *			}
 *		} );
 *
 * Text nodes can also have complex values:
 *
 *		const bind = Template.bind( observable, emitter );
 *
 *		// Will render a "foo" text node.
 *		new Template( {
 *			text: 'foo'
 *		} );
 *
 *		// Will render a "static text: {observable.foo}" text node.
 *		// The text of the node will be updated as the "foo" attribute changes.
 *		new Template( {
 *			text: [
 *				'static text: ',
 *				bind.to( 'foo', () => { ... } )
 *			]
 *		} );
 *
 * @typedef module:ui/template~TemplateValueSchema
 * @type {Object|String|Array}
 */

/**
 * Describes an event listener attached to an HTML element. Such listener can propagate DOM events
 * through an {@link module:utils/observablemixin~Observable} instance, execute custom callbacks
 * or both, if necessary.
 *
 * Also see:
 * * {@link module:ui/template~TemplateDefinition} to learn more about template definitions,
 * * {@link module:ui/template~BindChain#to `to()`} method to learn more about bindings.
 *
 * Check out different ways of attaching event listeners below:
 *
 *		// Bind helper will propagate events through the observable.
 *		const bind = Template.bind( observable, emitter );
 *
 *		new Template( {
 *			tag: 'p',
 *			on: {
 *				// An object schema. The observable will fire the "clicked" event upon DOM "click".
 *				click: bind.to( 'clicked' )
 *
 *				// An object schema. It will work for "click" event on "a.foo" children only.
 *				'click@a.foo': bind.to( 'clicked' )
 *
 *				// An array schema, makes the observable propagate multiple events.
 *				click: [
 *					bind.to( 'clicked' ),
 *					bind.to( 'executed' )
 *				],
 *
 *				// An array schema with a custom callback.
 *				'click@a.foo': {
 *					bind.to( 'clicked' ),
 *					bind.to( evt => {
 *						console.log( `${ evt.target } has been clicked!` );
 *					} }
 *				}
 *			}
 *		} );
 *
 * @typedef module:ui/template~TemplateListenerSchema
 * @type {Object|String|Array}
 */

/**
 * The return value of {@link ~Template.bind `Template.bind()`}. It provides `to()` and `if()`
 * methods to create the {@link module:utils/observablemixin~Observable observable} attribute and event bindings.
 *
 * @interface module:ui/template~BindChain
 */

/**
 * Binds an {@link module:utils/observablemixin~Observable observable} to either:
 *
 * * an HTML element attribute or a text node `textContent`, so it remains in sync with the observable
 * attribute as it changes,
 * * or an HTML element DOM event, so the DOM events are propagated through an observable.
 *
 * Some common use cases of `to()` bindings are presented below:
 *
 *		const bind = Template.bind( observable, emitter );
 *
 *		new Template( {
 *			tag: 'p',
 *			attributes: {
 *				// class="..." attribute gets bound to `observable#a`
 *				class: bind.to( 'a' )
 *			},
 *			children: [
 *				// <p>...</p> gets bound to observable#b; always `toUpperCase()`.
 *				{
 *					text: bind.to( 'b', ( value, node ) => value.toUpperCase() )
 *				}
 *			],
 *			on: {
 *				click: [
 *					// An observable will fire "clicked" upon "click" in the DOM.
 *					bind.to( 'clicked' ),
 *
 *					// A custom callback will be executed upon "click" in the DOM.
 *					bind.to( () => {
 *						...
 *					} )
 *				]
 *			}
 *		} ).render();
 *
 * Learn more about using `to()` in the {@link module:ui/template~TemplateValueSchema} and
 * {@link module:ui/template~TemplateListenerSchema}.
 *
 * @method #to
 * @param {String|Function} eventNameOrFunctionOrAttribute An attribute name of
 * {@link module:utils/observablemixin~Observable} or a DOM event name or an event callback.
 * @param {Function} [callback] Allows for processing of the value. Accepts `Node` and `value` as arguments.
 * @returns {module:ui/template~TemplateBinding}
 */

/**
 * Binds an {@link module:utils/observablemixin~Observable observable} to an HTML element attribute or a text
 * node `textContent` so it remains in sync with the observable attribute as it changes.
 *
 * Unlike {@link module:ui/template~BindChain#to}, it controls the presence of the attribute or `textContent`
 * depending on the "falseness" of an {@link module:utils/observablemixin~Observable} attribute.
 *
 *		const bind = Template.bind( observable, emitter );
 *
 *		new Template( {
 *			tag: 'input',
 *			attributes: {
 *				// <input checked> when `observable#a` is not undefined/null/false/''
 *				// <input> when `observable#a` is undefined/null/false
 *				checked: bind.if( 'a' )
 *			},
 *			children: [
 *				{
 *					// <input>"b-is-not-set"</input> when `observable#b` is undefined/null/false/''
 *					// <input></input> when `observable#b` is not "falsy"
 *					text: bind.if( 'b', 'b-is-not-set', ( value, node ) => !value )
 *				}
 *			]
 *		} ).render();
 *
 * Learn more about using `if()` in the {@link module:ui/template~TemplateValueSchema}.
 *
 * @method #if
 * @param {String} attribute An attribute name of {@link module:utils/observablemixin~Observable} used in the binding.
 * @param {String} [valueIfTrue] Value set when the {@link module:utils/observablemixin~Observable} attribute is not
 * undefined/null/false/'' (empty string).
 * @param {Function} [callback] Allows for processing of the value. Accepts `Node` and `value` as arguments.
 * @returns {module:ui/template~TemplateBinding}
 */

/**
 * The {@link module:ui/template~Template#_renderNode} configuration.
 *
 * @private
 * @interface module:ui/template~RenderData
 */

/**
 * Tells {@link module:ui/template~Template#_renderNode} to render
 * children into `DocumentFragment` first and then append the fragment
 * to the parent element. It is a speed optimization.
 *
 * @member {Boolean} #intoFragment
 */

/**
 * A node which is being rendered.
 *
 * @member {HTMLElement|Text} #node
 */

/**
 * Indicates whether the {@module:ui/template~RenderNodeOptions#node} has
 * been provided by {@module:ui/template~Template#apply}.
 *
 * @member {Boolean} #isApplying
 */

/**
 * An object storing the data that helps {@module:ui/template~Template#revert}
 * bringing back an element to its initial state, i.e. before
 * {@module:ui/template~Template#apply} was called.
 *
 * @member {Object} #revertData
 */

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * The basic view class, which represents an HTML element created out of a
 * {@link module:ui/view~View#template}. Views are building blocks of the user interface and handle
 * interaction
 *
 * Views {@link module:ui/view~View#registerChild aggregate} children in
 * {@link module:ui/view~View#createCollection collections} and manage the life cycle of DOM
 * listeners e.g. by handling rendering and destruction.
 *
 * See the {@link module:ui/template~TemplateDefinition} syntax to learn more about shaping view
 * elements, attributes and listeners.
 *
 *		class SampleView extends View {
 *			constructor( locale ) {
 *				super( locale );
 *
 *				const bind = this.bindTemplate;
 *
 *				// Views define their interface (state) using observable attributes.
 *				this.set( 'elementClass', 'bar' );
 *
 *				this.setTemplate( {
 *					tag: 'p',
 *
 *					// The element of the view can be defined with its children.
 *					children: [
 *						'Hello',
 *						{
 *							tag: 'b',
 *							children: [ 'world!' ]
 *						}
 *					],
 *					attributes: {
 *						class: [
 *							'foo',
 *
 *							// Observable attributes control the state of the view in DOM.
 *							bind.to( 'elementClass' )
 *						]
 *					},
 *					on: {
 *						// Views listen to DOM events and propagate them.
 *						click: bind.to( 'clicked' )
 *					}
 *				} );
 *			}
 *		}
 *
 *		const view = new SampleView( locale );
 *
 *		view.render();
 *
 *		// Append <p class="foo bar">Hello<b>world</b></p> to the <body>
 *		document.body.appendChild( view.element );
 *
 *		// Change the class attribute to <p class="foo baz">Hello<b>world</b></p>
 *		view.elementClass = 'baz';
 *
 *		// Respond to the "click" event in DOM by executing a custom action.
 *		view.on( 'clicked', () => {
 *			console.log( 'The view has been clicked!' );
 *		} );
 *
 * @mixes module:utils/observablemixin~ObservableMixin
 */
class View {
	/**
	 * Creates an instance of the {@link module:ui/view~View} class.
	 *
	 * Also see {@link #render}.
	 *
	 * @param {module:utils/locale~Locale} [locale] The localization services instance.
	 */
	constructor( locale ) {
		/**
		 * An HTML element of the view. `null` until {@link #render rendered}
		 * from the {@link #template}.
		 *
		 *		class SampleView extends View {
		 *			constructor() {
		 *				super();
		 *
		 *				// A template instance the #element will be created from.
		 *				this.setTemplate( {
		 *					tag: 'p'
		 *
		 *					// ...
		 *				} );
		 *			}
		 *		}
		 *
		 *		const view = new SampleView();
		 *
		 *		// Renders the #template.
		 *		view.render();
		 *
		 *		// Append the HTML element of the view to <body>.
		 *		document.body.appendChild( view.element );
		 *
		 * **Note**: The element of the view can also be assigned directly:
		 *
		 *		view.element = document.querySelector( '#my-container' );
		 *
		 * @member {HTMLElement}
		 */
		this.element = null;

		/**
		 * Set `true` when the view has already been {@link module:ui/view~View#render rendered}.
		 *
		 * @readonly
		 * @member {Boolean} #isRendered
		 */
		this.isRendered = false;

		/**
		 * A set of tools to localize the user interface.
		 *
		 * Also see {@link module:core/editor/editor~Editor#locale}.
		 *
		 * @readonly
		 * @member {module:utils/locale~Locale}
		 */
		this.locale = locale;

		/**
		 * Shorthand for {@link module:utils/locale~Locale#t}.
		 *
		 * Note: If {@link #locale} instance hasn't been passed to the view this method may not
		 * be available.
		 *
		 * @see module:utils/locale~Locale#t
		 * @method
		 */
		this.t = locale && locale.t;

		/**
		 * Collections registered with {@link #createCollection}.
		 *
		 * @protected
		 * @member {Set.<module:ui/viewcollection~ViewCollection>}
		 */
		this._viewCollections = new Collection();

		/**
		 * A collection of view instances, which have been added directly
		 * into the {@link module:ui/template~Template#children}.
		 *
		 * @protected
		 * @member {module:ui/viewcollection~ViewCollection}
		 */
		this._unboundChildren = this.createCollection();

		// Pass parent locale to its children.
		this._viewCollections.on( 'add', ( evt, collection ) => {
			collection.locale = locale;
		} );

		/**
		 * Template of this view. It provides the {@link #element} representing
		 * the view in DOM, which is {@link #render rendered}.
		 *
		 * @member {module:ui/template~Template} #template
		 */

		/**
		 * Cached {@link module:ui/template~BindChain bind chain} object created by the
		 * {@link #template}. See {@link #bindTemplate}.
		 *
		 * @private
		 * @member {Object} #_bindTemplate
		 */

		this.decorate( 'render' );
	}

	/**
	 * Shorthand for {@link module:ui/template~Template.bind}, a binding
	 * {@link module:ui/template~BindChain interface} pre–configured for the view instance.
	 *
	 * It provides {@link module:ui/template~BindChain#to `to()`} and
	 * {@link module:ui/template~BindChain#if `if()`} methods that initialize bindings with
	 * observable attributes and attach DOM listeners.
	 *
	 *		class SampleView extends View {
	 *			constructor( locale ) {
	 *				super( locale );
	 *
	 *				const bind = this.bindTemplate;
	 *
	 *				// These {@link module:utils/observablemixin~Observable observable} attributes will control
	 *				// the state of the view in DOM.
	 *				this.set( {
	 *					elementClass: 'foo',
	 *				 	isEnabled: true
	 *				 } );
	 *
	 *				this.setTemplate( {
	 *					tag: 'p',
	 *
	 *					attributes: {
	 *						// The class HTML attribute will follow elementClass
	 *						// and isEnabled view attributes.
	 *						class: [
	 *							bind.to( 'elementClass' )
	 *							bind.if( 'isEnabled', 'present-when-enabled' )
	 *						]
	 *					},
	 *
	 *					on: {
	 *						// The view will fire the "clicked" event upon clicking <p> in DOM.
	 *						click: bind.to( 'clicked' )
	 *					}
	 *				} );
	 *			}
	 *		}
	 *
	 * @method #bindTemplate
	 */
	get bindTemplate() {
		if ( this._bindTemplate ) {
			return this._bindTemplate;
		}

		return ( this._bindTemplate = Template.bind( this, this ) );
	}

	/**
	 * Creates a new collection of views, which can be used as
	 * {@link module:ui/template~Template#children} of this view.
	 *
	 *		class SampleView extends View {
	 *			constructor( locale ) {
	 *				super( locale );
	 *
	 *				const child = new ChildView( locale );
	 *				this.items = this.createCollection( [ child ] );
 	 *
	 *				this.setTemplate( {
	 *					tag: 'p',
	 *
	 *					// `items` collection will render here.
	 *					children: this.items
	 *				} );
	 *			}
	 *		}
	 *
	 *		const view = new SampleView( locale );
	 *		view.render();
	 *
	 *		// It will append <p><child#element></p> to the <body>.
	 *		document.body.appendChild( view.element );
	 *
	 * @param {Iterable.<module:ui/view~View>} [views] Initial views of the collection.
	 * @returns {module:ui/viewcollection~ViewCollection} A new collection of view instances.
	 */
	createCollection( views ) {
		const collection = new ViewCollection( views );

		this._viewCollections.add( collection );

		return collection;
	}

	/**
	 * Registers a new child view under the view instance. Once registered, a child
	 * view is managed by its parent, including {@link #render rendering}
	 * and {@link #destroy destruction}.
	 *
	 * To revert this, use {@link #deregisterChild}.
	 *
	 *		class SampleView extends View {
	 *			constructor( locale ) {
	 *				super( locale );
	 *
	 *				this.childA = new SomeChildView( locale );
	 *				this.childB = new SomeChildView( locale );
	 *
	 *				this.setTemplate( { tag: 'p' } );
	 *
	 *				// Register the children.
	 *				this.registerChild( [ this.childA, this.childB ] );
	 *			}
	 *
	 *			render() {
	 *				super.render();
	 *
	 *				this.element.appendChild( this.childA.element );
	 *				this.element.appendChild( this.childB.element );
	 *			}
	 *		}
	 *
	 *		const view = new SampleView( locale );
	 *
	 *		view.render();
	 *
	 *		// Will append <p><childA#element><b></b><childB#element></p>.
	 *		document.body.appendChild( view.element );
	 *
	 * **Note**: There's no need to add child views if they're already referenced in the
	 * {@link #template}:
	 *
	 *		class SampleView extends View {
	 *			constructor( locale ) {
	 *				super( locale );
	 *
	 *				this.childA = new SomeChildView( locale );
	 *				this.childB = new SomeChildView( locale );
	 *
	 *				this.setTemplate( {
	 *					tag: 'p',
	 *
 	 *					// These children will be added automatically. There's no
 	 *					// need to call {@link #registerChild} for any of them.
	 *					children: [ this.childA, this.childB ]
	 *				} );
	 *			}
	 *
	 *			// ...
	 *		}
	 *
	 * @param {module:ui/view~View|Iterable.<module:ui/view~View>} children Children views to be registered.
	 */
	registerChild( children ) {
		if ( !isIterable( children ) ) {
			children = [ children ];
		}

		for ( const child of children ) {
			this._unboundChildren.add( child );
		}
	}

	/**
	 * The opposite of {@link #registerChild}. Removes a child view from this view instance.
	 * Once removed, the child is no longer managed by its parent, e.g. it can safely
	 * become a child of another parent view.
	 *
	 * @see #registerChild
	 * @param {module:ui/view~View|Iterable.<module:ui/view~View>} children Child views to be removed.
	 */
	deregisterChild( children ) {
		if ( !isIterable( children ) ) {
			children = [ children ];
		}

		for ( const child of children ) {
			this._unboundChildren.remove( child );
		}
	}

	/**
	 * Sets the {@link #template} of the view with with given definition.
	 *
	 * A shorthand for:
	 *
	 *		view.setTemplate( definition );
	 *
	 * @param {module:ui/template~TemplateDefinition} definition Definition of view's template.
	 */
	setTemplate( definition ) {
		this.template = new Template( definition );
	}

	/**
	 * {@link module:ui/template~Template.extend Extends} the {@link #template} of the view with
	 * with given definition.
	 *
	 * A shorthand for:
	 *
	 *		Template.extend( view.template, definition );
	 *
	 * **Note**: Is requires the {@link #template} to be already set. See {@link #setTemplate}.
	 *
	 * @param {module:ui/template~TemplateDefinition} definition Definition which
	 * extends the {@link #template}.
	 */
	extendTemplate( definition ) {
		Template.extend( this.template, definition );
	}

	/**
	 * Recursively renders the view.
	 *
	 * Once the view is rendered:
	 * * the {@link #element} becomes an HTML element out of {@link #template},
	 * * the {@link #isRendered} flag is set `true`.
	 *
	 * **Note**: The children of the view:
	 * * defined directly in the {@link #template}
	 * * residing in collections created by the {@link #createCollection} method,
	 * * and added by {@link #registerChild}
	 * are also rendered in the process.
	 *
	 * In general, `render()` method is the right place to keep the code which refers to the
	 * {@link #element} and should be executed at the very beginning of the view's life cycle.
	 *
	 * It is possible to {@link module:ui/template~Template.extend} the {@link #template} before
	 * the view is rendered. To allow an early customization of the view (e.g. by its parent),
	 * such references should be done in `render()`.
	 *
	 *		class SampleView extends View {
	 *			constructor() {
	 *				this.setTemplate( {
	 *					// ...
	 *				} );
	 *			},
	 *
	 *			render() {
	 *				// View#element becomes available.
	 *				super.render();
	 *
	 *				// The "scroll" listener depends on #element.
	 *				this.listenTo( window, 'scroll', () => {
	 *					// A reference to #element would render the #template and make it non-extendable.
	 *					if ( window.scrollY > 0 ) {
	 *						this.element.scrollLeft = 100;
	 *					} else {
	 *						this.element.scrollLeft = 0;
	 *					}
	 *				} );
	 *			}
	 *		}
	 *
	 *		const view = new SampleView();
	 *
	 *		// Let's customize the view before it gets rendered.
	 *		view.extendTemplate( {
	 *			attributes: {
	 *				class: [
	 *					'additional-class'
	 *				]
	 *			}
	 *		} );
	 *
	 *		// Late rendering allows customization of the view.
	 *		view.render();
	 */
	render() {
		if ( this.isRendered ) {
			/**
			 * This View has already been rendered.
			 *
			 * @error ui-view-render-already-rendered
			 */
			throw new CKEditorError( 'ui-view-render-already-rendered', this );
		}

		// Render #element of the view.
		if ( this.template ) {
			this.element = this.template.render();

			// Auto–register view children from #template.
			this.registerChild( this.template.getViews() );
		}

		this.isRendered = true;
	}

	/**
	 * Recursively destroys the view instance and child views added by {@link #registerChild} and
	 * residing in collections created by the {@link #createCollection}.
	 *
	 * Destruction disables all event listeners:
	 * * created on the view, e.g. `view.on( 'event', () => {} )`,
	 * * defined in the {@link #template} for DOM events.
	 */
	destroy() {
		this.stopListening();

		this._viewCollections.map( c => c.destroy() );

		// Template isn't obligatory for views.
		if ( this.template && this.template._revertData ) {
			this.template.revert( this.element );
		}
	}

	/**
	 * Event fired by the {@link #render} method. Actual rendering is executed as a listener to
	 * this event with the default priority.
	 *
	 * See {@link module:utils/observablemixin~ObservableMixin#decorate} for more information and samples.
	 *
	 * @event render
	 */
}

mix( View, DomEmitterMixin );
mix( View, ObservableMixin );

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * The icon view class.
 *
 * @extends module:ui/view~View
 */
class IconView extends View {
	/**
	 * @inheritDoc
	 */
	constructor() {
		super();

		const bind = this.bindTemplate;

		/**
		 * The SVG source of the icon.
		 *
		 * @observable
		 * @member {String} #content
		 */
		this.set( 'content', '' );

		/**
		 * This attribute specifies the boundaries to which the
		 * icon content should stretch.
		 *
		 * @observable
		 * @default '0 0 20 20'
		 * @member {String} #viewBox
		 */
		this.set( 'viewBox', '0 0 20 20' );

		/**
		 * The fill color of the child `path.ck-icon__fill`.
		 *
		 * @observable
		 * @default ''
		 * @member {String} #fillColor
		 */
		this.set( 'fillColor', '' );

		this.setTemplate( {
			tag: 'svg',
			ns: 'http://www.w3.org/2000/svg',
			attributes: {
				class: [
					'ck',
					'ck-icon'
				],
				viewBox: bind.to( 'viewBox' )
			}
		} );
	}

	/**
	 * @inheritDoc
	 */
	render() {
		super.render();

		this._updateXMLContent();
		this._colorFillPaths();

		// This is a hack for lack of innerHTML binding.
		// See: https://github.com/ckeditor/ckeditor5-ui/issues/99.
		this.on( 'change:content', () => {
			this._updateXMLContent();
			this._colorFillPaths();
		} );

		this.on( 'change:fillColor', () => {
			this._colorFillPaths();
		} );
	}

	/**
	 * Updates the {@link #element} with the value of {@link #content}.
	 *
	 * @private
	 */
	_updateXMLContent() {
		if ( this.content ) {
			const parsed = new DOMParser().parseFromString( this.content.trim(), 'image/svg+xml' );
			const svg = parsed.querySelector( 'svg' );
			const viewBox = svg.getAttribute( 'viewBox' );

			if ( viewBox ) {
				this.viewBox = viewBox;
			}

			this.element.innerHTML = '';

			while ( svg.childNodes.length > 0 ) {
				this.element.appendChild( svg.childNodes[ 0 ] );
			}
		}
	}

	/**
	 * Fills all child `path.ck-icon__fill` with the `#fillColor`.
	 *
	 * @private
	 */
	_colorFillPaths() {
		if ( this.fillColor ) {
			this.element.querySelectorAll( '.ck-icon__fill' ).forEach( path => {
				path.style.fill = this.fillColor;
			} );
		}
	}
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module utils/dom/isrange
 */

/**
 * Checks if the object is a native DOM Range.
 *
 * @param {*} obj
 * @returns {Boolean}
 */
function isRange( obj ) {
	return Object.prototype.toString.apply( obj ) == '[object Range]';
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module utils/dom/getborderwidths
 */

/**
 * Returns an object containing CSS border widths of a specified HTML element.
 *
 * @param {HTMLElement} element An element which has CSS borders.
 * @returns {Object} An object containing `top`, `left`, `right` and `bottom` properties
 * with numerical values of the `border-[top,left,right,bottom]-width` CSS styles.
 */
function getBorderWidths( element ) {
	// Call getComputedStyle on the window the element document belongs to.
	const style = element.ownerDocument.defaultView.getComputedStyle( element );

	return {
		top: parseInt( style.borderTopWidth, 10 ),
		right: parseInt( style.borderRightWidth, 10 ),
		bottom: parseInt( style.borderBottomWidth, 10 ),
		left: parseInt( style.borderLeftWidth, 10 )
	};
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module utils/dom/istext
 */

/**
 * Checks if the object is a native DOM Text node.
 *
 * @param {*} obj
 * @returns {Boolean}
 */
function isText( obj ) {
	return Object.prototype.toString.call( obj ) == '[object Text]';
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

const rectProperties = [ 'top', 'right', 'bottom', 'left', 'width', 'height' ];

/**
 * A helper class representing a `ClientRect` object, e.g. value returned by
 * the native `object.getBoundingClientRect()` method. Provides a set of methods
 * to manipulate the rect and compare it against other rect instances.
 */
class Rect {
	/**
	 * Creates an instance of rect.
	 *
	 *		// Rect of an HTMLElement.
	 *		const rectA = new Rect( document.body );
	 *
	 *		// Rect of a DOM Range.
	 *		const rectB = new Rect( document.getSelection().getRangeAt( 0 ) );
	 *
	 *		// Rect of a window (web browser viewport).
	 *		const rectC = new Rect( window );
	 *
	 *		// Rect out of an object.
	 *		const rectD = new Rect( { top: 0, right: 10, bottom: 10, left: 0, width: 10, height: 10 } );
	 *
	 *		// Rect out of another Rect instance.
	 *		const rectE = new Rect( rectD );
	 *
	 *		// Rect out of a ClientRect.
	 *		const rectF = new Rect( document.body.getClientRects().item( 0 ) );
	 *
	 * **Note**: By default a rect of an HTML element includes its CSS borders and scrollbars (if any)
	 * ant the rect of a `window` includes scrollbars too. Use {@link #excludeScrollbarsAndBorders}
	 * to get the inner part of the rect.
	 *
	 * @param {HTMLElement|Range|Window|ClientRect|module:utils/dom/rect~Rect|Object} source A source object to create the rect.
	 */
	constructor( source ) {
		const isSourceRange = isRange( source );

		/**
		 * The object this rect is for.
		 *
		 * @protected
		 * @readonly
		 * @member {HTMLElement|Range|ClientRect|module:utils/dom/rect~Rect|Object} #_source
		 */
		Object.defineProperty( this, '_source', {
			// If the source is a Rect instance, copy it's #_source.
			value: source._source || source,
			writable: true,
			enumerable: false
		} );

		if ( isElement( source ) || isSourceRange ) {
			// The `Rect` class depends on `getBoundingClientRect` and `getClientRects` DOM methods. If the source
			// of a rect in an HTML element or a DOM range but it does not belong to any rendered DOM tree, these methods
			// will fail to obtain the geometry and the rect instance makes little sense to the features using it.
			// To get rid of this warning make sure the source passed to the constructor is a descendant of `window.document.body`.
			// @if CK_DEBUG // const sourceNode = isSourceRange ? source.startContainer : source;
			// @if CK_DEBUG // if ( !sourceNode.ownerDocument || !sourceNode.ownerDocument.body.contains( sourceNode ) ) {
			// @if CK_DEBUG // 	console.warn(
			// @if CK_DEBUG // 		'rect-source-not-in-dom: The source of this rect does not belong to any rendered DOM tree.',
			// @if CK_DEBUG // 		{ source } );
			// @if CK_DEBUG // }

			if ( isSourceRange ) {
				const rangeRects = Rect.getDomRangeRects( source );
				copyRectProperties( this, Rect.getBoundingRect( rangeRects ) );
			} else {
				copyRectProperties( this, source.getBoundingClientRect() );
			}
		} else if ( isWindow( source ) ) {
			const { innerWidth, innerHeight } = source;

			copyRectProperties( this, {
				top: 0,
				right: innerWidth,
				bottom: innerHeight,
				left: 0,
				width: innerWidth,
				height: innerHeight
			} );
		} else {
			copyRectProperties( this, source );
		}

		/**
		 * The "top" value of the rect.
		 *
		 * @readonly
		 * @member {Number} #top
		 */

		/**
		 * The "right" value of the rect.
		 *
		 * @readonly
		 * @member {Number} #right
		 */

		/**
		 * The "bottom" value of the rect.
		 *
		 * @readonly
		 * @member {Number} #bottom
		 */

		/**
		 * The "left" value of the rect.
		 *
		 * @readonly
		 * @member {Number} #left
		 */

		/**
		 * The "width" value of the rect.
		 *
		 * @readonly
		 * @member {Number} #width
		 */

		/**
		 * The "height" value of the rect.
		 *
		 * @readonly
		 * @member {Number} #height
		 */
	}

	/**
	 * Returns a clone of the rect.
	 *
	 * @returns {module:utils/dom/rect~Rect} A cloned rect.
	 */
	clone() {
		return new Rect( this );
	}

	/**
	 * Moves the rect so that its upper–left corner lands in desired `[ x, y ]` location.
	 *
	 * @param {Number} x Desired horizontal location.
	 * @param {Number} y Desired vertical location.
	 * @returns {module:utils/dom/rect~Rect} A rect which has been moved.
	 */
	moveTo( x, y ) {
		this.top = y;
		this.right = x + this.width;
		this.bottom = y + this.height;
		this.left = x;

		return this;
	}

	/**
	 * Moves the rect in–place by a dedicated offset.
	 *
	 * @param {Number} x A horizontal offset.
	 * @param {Number} y A vertical offset
	 * @returns {module:utils/dom/rect~Rect} A rect which has been moved.
	 */
	moveBy( x, y ) {
		this.top += y;
		this.right += x;
		this.left += x;
		this.bottom += y;

		return this;
	}

	/**
	 * Returns a new rect a a result of intersection with another rect.
	 *
	 * @param {module:utils/dom/rect~Rect} anotherRect
	 * @returns {module:utils/dom/rect~Rect}
	 */
	getIntersection( anotherRect ) {
		const rect = {
			top: Math.max( this.top, anotherRect.top ),
			right: Math.min( this.right, anotherRect.right ),
			bottom: Math.min( this.bottom, anotherRect.bottom ),
			left: Math.max( this.left, anotherRect.left )
		};

		rect.width = rect.right - rect.left;
		rect.height = rect.bottom - rect.top;

		if ( rect.width < 0 || rect.height < 0 ) {
			return null;
		} else {
			return new Rect( rect );
		}
	}

	/**
	 * Returns the area of intersection with another rect.
	 *
	 * @param {module:utils/dom/rect~Rect} anotherRect [description]
	 * @returns {Number} Area of intersection.
	 */
	getIntersectionArea( anotherRect ) {
		const rect = this.getIntersection( anotherRect );

		if ( rect ) {
			return rect.getArea();
		} else {
			return 0;
		}
	}

	/**
	 * Returns the area of the rect.
	 *
	 * @returns {Number}
	 */
	getArea() {
		return this.width * this.height;
	}

	/**
	 * Returns a new rect, a part of the original rect, which is actually visible to the user,
	 * e.g. an original rect cropped by parent element rects which have `overflow` set in CSS
	 * other than `"visible"`.
	 *
	 * If there's no such visible rect, which is when the rect is limited by one or many of
	 * the ancestors, `null` is returned.
	 *
	 * @returns {module:utils/dom/rect~Rect|null} A visible rect instance or `null`, if there's none.
	 */
	getVisible() {
		const source = this._source;
		let visibleRect = this.clone();

		// There's no ancestor to crop <body> with the overflow.
		if ( !isBody( source ) ) {
			let parent = source.parentNode || source.commonAncestorContainer;

			// Check the ancestors all the way up to the <body>.
			while ( parent && !isBody( parent ) ) {
				const parentRect = new Rect( parent );
				const intersectionRect = visibleRect.getIntersection( parentRect );

				if ( intersectionRect ) {
					if ( intersectionRect.getArea() < visibleRect.getArea() ) {
						// Reduce the visible rect to the intersection.
						visibleRect = intersectionRect;
					}
				} else {
					// There's no intersection, the rect is completely invisible.
					return null;
				}

				parent = parent.parentNode;
			}
		}

		return visibleRect;
	}

	/**
	 * Checks if all property values ({@link #top}, {@link #left}, {@link #right},
	 * {@link #bottom}, {@link #width} and {@link #height}) are the equal in both rect
	 * instances.
	 *
	 * @param {module:utils/dom/rect~Rect} rect A rect instance to compare with.
	 * @returns {Boolean} `true` when Rects are equal. `false` otherwise.
	 */
	isEqual( anotherRect ) {
		for ( const prop of rectProperties ) {
			if ( this[ prop ] !== anotherRect[ prop ] ) {
				return false;
			}
		}

		return true;
	}

	/**
	 * Checks whether a rect fully contains another rect instance.
	 *
	 * @param {module:utils/dom/rect~Rect} anotherRect
	 * @returns {Boolean} `true` if contains, `false` otherwise.
	 */
	contains( anotherRect ) {
		const intersectRect = this.getIntersection( anotherRect );

		return !!( intersectRect && intersectRect.isEqual( anotherRect ) );
	}

	/**
	 * Excludes scrollbars and CSS borders from the rect.
	 *
	 * * Borders are removed when {@link #_source} is an HTML element.
	 * * Scrollbars are excluded from HTML elements and the `window`.
	 *
	 * @returns {module:utils/dom/rect~Rect} A rect which has been updated.
	 */
	excludeScrollbarsAndBorders() {
		const source = this._source;
		let scrollBarWidth, scrollBarHeight, direction;

		if ( isWindow( source ) ) {
			scrollBarWidth = source.innerWidth - source.document.documentElement.clientWidth;
			scrollBarHeight = source.innerHeight - source.document.documentElement.clientHeight;
			direction = source.getComputedStyle( source.document.documentElement ).direction;
		} else {
			const borderWidths = getBorderWidths( this._source );

			scrollBarWidth = source.offsetWidth - source.clientWidth - borderWidths.left - borderWidths.right;
			scrollBarHeight = source.offsetHeight - source.clientHeight - borderWidths.top - borderWidths.bottom;
			direction = source.ownerDocument.defaultView.getComputedStyle( source ).direction;

			this.left += borderWidths.left;
			this.top += borderWidths.top;
			this.right -= borderWidths.right;
			this.bottom -= borderWidths.bottom;
			this.width = this.right - this.left;
			this.height = this.bottom - this.top;
		}

		this.width -= scrollBarWidth;

		if ( direction === 'ltr' ) {
			this.right -= scrollBarWidth;
		} else {
			this.left += scrollBarWidth;
		}

		this.height -= scrollBarHeight;
		this.bottom -= scrollBarHeight;

		return this;
	}

	/**
	 * Returns an array of rects of the given native DOM Range.
	 *
	 * @param {Range} range A native DOM range.
	 * @returns {Array.<module:utils/dom/rect~Rect>} DOM Range rects.
	 */
	static getDomRangeRects( range ) {
		const rects = [];
		// Safari does not iterate over ClientRectList using for...of loop.
		const clientRects = Array.from( range.getClientRects() );

		if ( clientRects.length ) {
			for ( const rect of clientRects ) {
				rects.push( new Rect( rect ) );
			}
		}
		// If there's no client rects for the Range, use parent container's bounding rect
		// instead and adjust rect's width to simulate the actual geometry of such range.
		// https://github.com/ckeditor/ckeditor5-utils/issues/153
		// https://github.com/ckeditor/ckeditor5-ui/issues/317
		else {
			let startContainer = range.startContainer;

			if ( isText( startContainer ) ) {
				startContainer = startContainer.parentNode;
			}

			const rect = new Rect( startContainer.getBoundingClientRect() );
			rect.right = rect.left;
			rect.width = 0;

			rects.push( rect );
		}

		return rects;
	}

	/**
	 * Returns a bounding rectangle that contains all the given `rects`.
	 *
	 * @param {Iterable.<module:utils/dom/rect~Rect>} rects A list of rectangles that should be contained in the result rectangle.
	 * @returns {module:utils/dom/rect~Rect|null} Bounding rectangle or `null` if no `rects` were given.
	 */
	static getBoundingRect( rects ) {
		const boundingRectData = {
			left: Number.POSITIVE_INFINITY,
			top: Number.POSITIVE_INFINITY,
			right: Number.NEGATIVE_INFINITY,
			bottom: Number.NEGATIVE_INFINITY
		};
		let rectangleCount = 0;

		for ( const rect of rects ) {
			rectangleCount++;

			boundingRectData.left = Math.min( boundingRectData.left, rect.left );
			boundingRectData.top = Math.min( boundingRectData.top, rect.top );
			boundingRectData.right = Math.max( boundingRectData.right, rect.right );
			boundingRectData.bottom = Math.max( boundingRectData.bottom, rect.bottom );
		}

		if ( rectangleCount == 0 ) {
			return null;
		}

		boundingRectData.width = boundingRectData.right - boundingRectData.left;
		boundingRectData.height = boundingRectData.bottom - boundingRectData.top;

		return new Rect( boundingRectData );
	}
}

// Acquires all the rect properties from the passed source.
//
// @private
// @param {module:utils/dom/rect~Rect} rect
// @param {ClientRect|module:utils/dom/rect~Rect|Object} source
function copyRectProperties( rect, source ) {
	for ( const p of rectProperties ) {
		rect[ p ] = source[ p ];
	}
}

// Checks if provided object is a <body> HTML element.
//
// @private
// @param {HTMLElement|Range} elementOrRange
// @returns {Boolean}
function isBody( elementOrRange ) {
	if ( !isElement( elementOrRange ) ) {
		return false;
	}

	return elementOrRange === elementOrRange.ownerDocument.body;
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* globals window, document */

/**
 * @module utils/dom/global
 */

/**
 * A helper (module) giving an access to the global DOM objects such as `window` and
 * `document`. Accessing these objects using this helper allows easy and bulletproof
 * testing, i.e. stubbing native properties:
 *
 *		import global from 'ckeditor5/utils/dom/global.js';
 *
 *		// This stub will work for any code using global module.
 *		testUtils.sinon.stub( global, 'window', {
 *			innerWidth: 10000
 *		} );
 *
 *		console.log( global.window.innerWidth );
 */
const global$1 = { window, document };

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * For a given element, returns the nearest ancestor element which CSS position is not "static".
 *
 * @param {HTMLElement} element The native DOM element to be checked.
 * @returns {HTMLElement|null}
 */
function getPositionedAncestor( element ) {
	if ( !element || !element.parentNode ) {
		return null;
	}

	if ( element.offsetParent === global$1.document.body ) {
		return null;
	}

	return element.offsetParent;
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Calculates the `position: absolute` coordinates of a given element so it can be positioned with respect to the
 * target in the visually most efficient way, taking various restrictions like viewport or limiter geometry
 * into consideration.
 *
 *		// The element which is to be positioned.
 *		const element = document.body.querySelector( '#toolbar' );
 *
 *		// A target to which the element is positioned relatively.
 *		const target = document.body.querySelector( '#container' );
 *
 *		// Finding the optimal coordinates for the positioning.
 *		const { left, top, name } = getOptimalPosition( {
 *			element: element,
 *			target: target,
 *
 * 			// The algorithm will chose among these positions to meet the requirements such
 * 			// as "limiter" element or "fitInViewport", set below. The positions are considered
 * 			// in the order of the array.
 *			positions: [
 *				//
 *			 	//	[ Target ]
 *				//	+-----------------+
 *				//	|     Element     |
 *				//	+-----------------+
 *				//
 *				targetRect => ( {
 *					top: targetRect.bottom,
 *					left: targetRect.left,
 *					name: 'mySouthEastPosition'
 *				} ),
 *
 *				//
 *				//	+-----------------+
 *				//	|     Element     |
 *				//	+-----------------+
 *				//	[ Target ]
 *				//
 *				( targetRect, elementRect ) => ( {
 *					top: targetRect.top - elementRect.height,
 *					left: targetRect.left,
 *					name: 'myNorthEastPosition'
 *				} )
 *			],
 *
 *			// Find a position such guarantees the element remains within visible boundaries of <body>.
 *			limiter: document.body,
 *
 *			// Find a position such guarantees the element remains within visible boundaries of the browser viewport.
 *			fitInViewport: true
 *		} );
 *
 *		// The best position which fits into document.body and the viewport. May be useful
 *		// to set proper class on the `element`.
 *		console.log( name ); // -> "myNorthEastPosition"
 *
 *		// Using the absolute coordinates which has been found to position the element
 *		// as in the diagram depicting the "myNorthEastPosition" position.
 *		element.style.top = top;
 *		element.style.left = left;
 *
 * @param {module:utils/dom/position~Options} options Positioning options object.
 * @returns {module:utils/dom/position~Position}
 */
function getOptimalPosition( { element, target, positions, limiter, fitInViewport } ) {
	// If the {@link module:utils/dom/position~Options#target} is a function, use what it returns.
	// https://github.com/ckeditor/ckeditor5-utils/issues/157
	if ( isFunction( target ) ) {
		target = target();
	}

	// If the {@link module:utils/dom/position~Options#limiter} is a function, use what it returns.
	// https://github.com/ckeditor/ckeditor5-ui/issues/260
	if ( isFunction( limiter ) ) {
		limiter = limiter();
	}

	const positionedElementAncestor = getPositionedAncestor( element );
	const elementRect = new Rect( element );
	const targetRect = new Rect( target );

	let bestPositionRect;
	let bestPositionName;

	// If there are no limits, just grab the very first position and be done with that drama.
	if ( !limiter && !fitInViewport ) {
		[ bestPositionName, bestPositionRect ] = getPositionNameAndRect( positions[ 0 ], targetRect, elementRect );
	} else {
		const limiterRect = limiter && new Rect( limiter ).getVisible();
		const viewportRect = fitInViewport && new Rect( global$1.window );
		const bestPosition = getBestPositionNameAndRect( positions, { targetRect, elementRect, limiterRect, viewportRect } );

		// If there's no best position found, i.e. when all intersections have no area because
		// rects have no width or height, then just use the first available position.
		[ bestPositionName, bestPositionRect ] = bestPosition || getPositionNameAndRect( positions[ 0 ], targetRect, elementRect );
	}

	let absoluteRectCoordinates = getAbsoluteRectCoordinates( bestPositionRect );

	if ( positionedElementAncestor ) {
		absoluteRectCoordinates = shiftRectCoordinatesDueToPositionedAncestor( absoluteRectCoordinates, positionedElementAncestor );
	}

	return {
		left: absoluteRectCoordinates.left,
		top: absoluteRectCoordinates.top,
		name: bestPositionName
	};
}

// For given position function, returns a corresponding `Rect` instance.
//
// @private
// @param {Function} position A function returning {@link module:utils/dom/position~Position}.
// @param {utils/dom/rect~Rect} targetRect A rect of the target.
// @param {utils/dom/rect~Rect} elementRect A rect of positioned element.
// @returns {Array|null} An array containing position name and its Rect (or null if position should be ignored).
function getPositionNameAndRect( position, targetRect, elementRect ) {
	const positionData = position( targetRect, elementRect );

	if ( !positionData ) {
		return null;
	}

	const { left, top, name } = positionData;

	return [ name, elementRect.clone().moveTo( left, top ) ];
}

// For a given array of positioning functions, returns such that provides the best
// fit of the `elementRect` into the `limiterRect` and `viewportRect`.
//
// @private
//
// @param {Object} options
// @param {module:utils/dom/position~Options#positions} positions Functions returning {@link module:utils/dom/position~Position}
// to be checked, in the order of preference.
// @param {Object} options
// @param {utils/dom/rect~Rect} options.targetRect A rect of the {@link module:utils/dom/position~Options#target}.
// @param {utils/dom/rect~Rect} options.elementRect A rect of positioned {@link module:utils/dom/position~Options#element}.
// @param {utils/dom/rect~Rect} options.limiterRect A rect of the {@link module:utils/dom/position~Options#limiter}.
// @param {utils/dom/rect~Rect} options.viewportRect A rect of the viewport.
//
// @returns {Array} An array containing the name of the position and it's rect.
function getBestPositionNameAndRect( positions, options ) {
	const { elementRect, viewportRect } = options;

	// This is when element is fully visible.
	const elementRectArea = elementRect.getArea();

	// Let's calculate intersection areas for positions. It will end early if best match is found.
	const processedPositions = processPositionsToAreas( positions, options );

	// First let's check all positions that fully fit in the viewport.
	if ( viewportRect ) {
		const processedPositionsInViewport = processedPositions.filter( ( { viewportIntersectArea } ) => {
			return viewportIntersectArea === elementRectArea;
		} );

		// Try to find best position from those which fit completely in viewport.
		const bestPositionData = getBestOfProcessedPositions( processedPositionsInViewport, elementRectArea );

		if ( bestPositionData ) {
			return bestPositionData;
		}
	}

	// Either there is no viewportRect or there is no position that fits completely in the viewport.
	return getBestOfProcessedPositions( processedPositions, elementRectArea );
}

// For a given array of positioning functions, calculates intersection areas for them.
//
// Note: If some position fully fits into the `limiterRect`, it will be returned early, without further consideration
// of other positions.
//
// @private
//
// @param {module:utils/dom/position~Options#positions} positions Functions returning {@link module:utils/dom/position~Position}
// to be checked, in the order of preference.
// @param {Object} options
// @param {utils/dom/rect~Rect} options.targetRect A rect of the {@link module:utils/dom/position~Options#target}.
// @param {utils/dom/rect~Rect} options.elementRect A rect of positioned {@link module:utils/dom/position~Options#element}.
// @param {utils/dom/rect~Rect} options.limiterRect A rect of the {@link module:utils/dom/position~Options#limiter}.
// @param {utils/dom/rect~Rect} options.viewportRect A rect of the viewport.
//
// @returns {Array.<Object>} Array of positions with calculated intersection areas. Each item is an object containing:
// * {String} positionName Name of position.
// * {utils/dom/rect~Rect} positionRect Rect of position.
// * {Number} limiterIntersectArea Area of intersection of the position with limiter part that is in the viewport.
// * {Number} viewportIntersectArea Area of intersection of the position with viewport.
function processPositionsToAreas( positions, { targetRect, elementRect, limiterRect, viewportRect } ) {
	const processedPositions = [];

	// This is when element is fully visible.
	const elementRectArea = elementRect.getArea();

	for ( const position of positions ) {
		const positionData = getPositionNameAndRect( position, targetRect, elementRect );

		if ( !positionData ) {
			continue;
		}

		const [ positionName, positionRect ] = positionData;
		let limiterIntersectArea = 0;
		let viewportIntersectArea = 0;

		if ( limiterRect ) {
			if ( viewportRect ) {
				// Consider only the part of the limiter which is visible in the viewport. So the limiter is getting limited.
				const limiterViewportIntersectRect = limiterRect.getIntersection( viewportRect );

				if ( limiterViewportIntersectRect ) {
					// If the limiter is within the viewport, then check the intersection between that part of the
					// limiter and actual position.
					limiterIntersectArea = limiterViewportIntersectRect.getIntersectionArea( positionRect );
				}
			} else {
				limiterIntersectArea = limiterRect.getIntersectionArea( positionRect );
			}
		}

		if ( viewportRect ) {
			viewportIntersectArea = viewportRect.getIntersectionArea( positionRect );
		}

		const processedPosition = {
			positionName,
			positionRect,
			limiterIntersectArea,
			viewportIntersectArea
		};

		// If a such position is found that element is fully contained by the limiter then, obviously,
		// there will be no better one, so finishing.
		if ( limiterIntersectArea === elementRectArea ) {
			return [ processedPosition ];
		}

		processedPositions.push( processedPosition );
	}

	return processedPositions;
}

// For a given array of processed position data (with calculated Rects for positions and intersection areas)
// returns such that provides the best fit of the `elementRect` into the `limiterRect` and `viewportRect` at the same time.
//
// **Note**: It will return early if some position fully fits into the `limiterRect`.
//
// @private
// @param {Array.<Object>} Array of positions with calculated intersection areas (in order of preference).
// Each item is an object containing:
//
//	* {String} positionName Name of position.
//	* {utils/dom/rect~Rect} positionRect Rect of position.
//	* {Number} limiterIntersectArea Area of intersection of the position with limiter part that is in the viewport.
//	* {Number} viewportIntersectArea Area of intersection of the position with viewport.
//
// @param {Number} elementRectArea Area of positioned {@link module:utils/dom/position~Options#element}.
// @returns {Array|null} An array containing the name of the position and it's rect, or null if not found.
function getBestOfProcessedPositions( processedPositions, elementRectArea ) {
	let maxFitFactor = 0;
	let bestPositionRect;
	let bestPositionName;

	for ( const { positionName, positionRect, limiterIntersectArea, viewportIntersectArea } of processedPositions ) {
		// If a such position is found that element is fully container by the limiter then, obviously,
		// there will be no better one, so finishing.
		if ( limiterIntersectArea === elementRectArea ) {
			return [ positionName, positionRect ];
		}

		// To maximize both viewport and limiter intersection areas we use distance on viewportIntersectArea
		// and limiterIntersectArea plane (without sqrt because we are looking for max value).
		const fitFactor = viewportIntersectArea ** 2 + limiterIntersectArea ** 2;

		if ( fitFactor > maxFitFactor ) {
			maxFitFactor = fitFactor;
			bestPositionRect = positionRect;
			bestPositionName = positionName;
		}
	}

	return bestPositionRect ? [ bestPositionName, bestPositionRect ] : null;
}

// For a given absolute Rect coordinates object and a positioned element ancestor, it returns an object with
// new Rect coordinates that make up for the position and the scroll of the ancestor.
//
// This is necessary because while Rects (and DOMRects) are relative to the browser's viewport, their coordinates
// are used in real–life to position elements with `position: absolute`, which are scoped by any positioned
// (and scrollable) ancestors.
//
// @private
//
// @param {Object} absoluteRectCoordinates An object with absolute rect coordinates.
// @param {Object} absoluteRectCoordinates.top
// @param {Object} absoluteRectCoordinates.left
// @param {HTMLElement} positionedElementAncestor An ancestor element that should be considered.
//
// @returns {Object} An object corresponding to `absoluteRectCoordinates` input but with values shifted
// to make up for the positioned element ancestor.
function shiftRectCoordinatesDueToPositionedAncestor( { left, top }, positionedElementAncestor ) {
	const ancestorPosition = getAbsoluteRectCoordinates( new Rect( positionedElementAncestor ) );
	const ancestorBorderWidths = getBorderWidths( positionedElementAncestor );

	// (https://github.com/ckeditor/ckeditor5-ui-default/issues/126)
	// If there's some positioned ancestor of the panel, then its `Rect` must be taken into
	// consideration. `Rect` is always relative to the viewport while `position: absolute` works
	// with respect to that positioned ancestor.
	left -= ancestorPosition.left;
	top -= ancestorPosition.top;

	// (https://github.com/ckeditor/ckeditor5-utils/issues/139)
	// If there's some positioned ancestor of the panel, not only its position must be taken into
	// consideration (see above) but also its internal scrolls. Scroll have an impact here because `Rect`
	// is relative to the viewport (it doesn't care about scrolling), while `position: absolute`
	// must compensate that scrolling.
	left += positionedElementAncestor.scrollLeft;
	top += positionedElementAncestor.scrollTop;

	// (https://github.com/ckeditor/ckeditor5-utils/issues/139)
	// If there's some positioned ancestor of the panel, then its `Rect` includes its CSS `borderWidth`
	// while `position: absolute` positioning does not consider it.
	// E.g. `{ position: absolute, top: 0, left: 0 }` means upper left corner of the element,
	// not upper-left corner of its border.
	left -= ancestorBorderWidths.left;
	top -= ancestorBorderWidths.top;

	return { left, top };
}

// DOMRect (also Rect) works in a scroll–independent geometry but `position: absolute` doesn't.
// This function converts Rect to `position: absolute` coordinates.
//
// @private
// @param {utils/dom/rect~Rect} rect A rect to be converted.
// @returns {Object} Object containing `left` and `top` properties, in absolute coordinates.
function getAbsoluteRectCoordinates( { left, top } ) {
	const { scrollX, scrollY } = global$1.window;

	return {
		left: left + scrollX,
		top: top + scrollY
	};
}

/**
 * The `getOptimalPosition()` helper options.
 *
 * @interface module:utils/dom/position~Options
 */

/**
 * Element that is to be positioned.
 *
 * @member {HTMLElement} #element
 */

/**
 * Target with respect to which the `element` is to be positioned.
 *
 * @member {HTMLElement|Range|ClientRect|Rect|Function} #target
 */

/**
 * An array of functions which return {@link module:utils/dom/position~Position} relative
 * to the `target`, in the order of preference.
 *
 * **Note**: If a function returns `null`, it is ignored by the `getOptimalPosition()`.
 *
 * @member {Array.<Function>} #positions
 */

/**
 * When set, the algorithm will chose position which fits the most in the
 * limiter's bounding rect.
 *
 * @member {HTMLElement|Range|ClientRect|Rect|Function} #limiter
 */

/**
 * When set, the algorithm will chose such a position which fits `element`
 * the most inside visible viewport.
 *
 * @member {Boolean} #fitInViewport
 */

/**
 * An object describing a position in `position: absolute` coordinate
 * system, along with position name.
 *
 * @typedef {Object} module:utils/dom/position~Position
 *
 * @property {Number} top Top position offset.
 * @property {Number} left Left position offset.
 * @property {String} name Name of the position.
 */

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module utils/dom/tounit
 */

/**
 * Returns a helper function, which adds a desired trailing
 * `unit` to the passed value.
 *
 * @param {String} unit An unit like "px" or "em".
 * @returns {module:utils/dom/tounit~helper}
 */
function toUnit( unit ) {
	/**
	 * A function, which adds a pre–defined trailing `unit`
	 * to the passed `value`.
	 *
	 * @function helper
 	 * @param {*} value A value to be given the unit.
 	 * @returns {String} A value with the trailing unit.
	 */
	return value => value + unit;
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

const toPx = toUnit( 'px' );
const defaultLimiterElement = global$1.document.body;

/**
 * The balloon panel view class.
 *
 * A floating container which can
 * {@link module:ui/panel/balloon/balloonpanelview~BalloonPanelView#pin pin} to any
 * {@link module:utils/dom/position~Options#target target} in the DOM and remain in that position
 * e.g. when the web page is scrolled.
 *
 * The balloon panel can be used to display contextual, non-blocking UI like forms, toolbars and
 * the like in its {@link module:ui/panel/balloon/balloonpanelview~BalloonPanelView#content} view
 * collection.
 *
 * There is a number of {@link module:ui/panel/balloon/balloonpanelview~BalloonPanelView.defaultPositions}
 * that the balloon can use, automatically switching from one to another when the viewport space becomes
 * scarce to keep the balloon visible to the user as long as it is possible. The balloon will also
 * accept any custom position set provided by the user compatible with the
 * {@link module:utils/dom/position~Options options}.
 *
 *		const panel = new BalloonPanelView( locale );
 *		const childView = new ChildView();
 *		const positions = BalloonPanelView.defaultPositions;
 *
 *		panel.render();
 *
 *		// Add a child view to the panel's content collection.
 *		panel.content.add( childView );
 *
 *		// Start pinning the panel to an element with the "target" id DOM.
 *		// The balloon will remain pinned until unpin() is called.
 *		panel.pin( {
 *			target: document.querySelector( '#target' ),
 *			positions: [
 *				positions.northArrowSouth,
 *				positions.southArrowNorth
 *			]
 *		} );
 *
 * @extends module:ui/view~View
 */
class BalloonPanelView extends View {
	/**
	 * @inheritDoc
	 */
	constructor( locale ) {
		super( locale );

		const bind = this.bindTemplate;

		/**
		 * The absolute top position of the balloon panel in pixels.
		 *
		 * @observable
		 * @default 0
		 * @member {Number} #top
		 */
		this.set( 'top', 0 );

		/**
		 * The absolute left position of the balloon panel in pixels.
		 *
		 * @observable
		 * @default 0
		 * @member {Number} #left
		 */
		this.set( 'left', 0 );

		/**
		 * The balloon panel's current position. The position name is reflected in the CSS class set
		 * to the balloon, i.e. `.ck-balloon-panel_arrow_nw` for the "arrow_nw" position. The class
		 * controls the minor aspects of the balloon's visual appearance like the placement
		 * of an {@link #withArrow arrow}. To support a new position, an additional CSS must be created.
		 *
		 * Default position names correspond with
		 * {@link module:ui/panel/balloon/balloonpanelview~BalloonPanelView.defaultPositions}.
		 *
		 * See the {@link #attachTo} and {@link #pin} methods to learn about custom balloon positions.
		 *
		 * @observable
		 * @default 'arrow_nw'
		 * @member {'arrow_nw'|'arrow_ne'|'arrow_sw'|'arrow_se'} #position
		 */
		this.set( 'position', 'arrow_nw' );

		/**
		 * Controls whether the balloon panel is visible or not.
		 *
		 * @observable
		 * @default false
		 * @member {Boolean} #isVisible
		 */
		this.set( 'isVisible', false );

		/**
		 * Controls whether the balloon panel has an arrow. The presence of the arrow
		 * is reflected in the `ck-balloon-panel_with-arrow` CSS class.
		 *
		 * @observable
		 * @default true
		 * @member {Boolean} #withArrow
		 */
		this.set( 'withArrow', true );

		/**
		 * An additional CSS class added to the {@link #element}.
		 *
		 * @observable
		 * @member {String} #class
		 */
		this.set( 'class' );

		/**
		 * A callback that starts pinning the panel when {@link #isVisible} gets
		 * `true`. Used by {@link #pin}.
		 *
		 * @private
		 * @member {Function} #_pinWhenIsVisibleCallback
		 */

		/**
		 * A collection of the child views that creates the balloon panel contents.
		 *
		 * @readonly
		 * @member {module:ui/viewcollection~ViewCollection}
		 */
		this.content = this.createCollection();

		this.setTemplate( {
			tag: 'div',
			attributes: {
				class: [
					'ck',
					'ck-balloon-panel',
					bind.to( 'position', value => `ck-balloon-panel_${ value }` ),
					bind.if( 'isVisible', 'ck-balloon-panel_visible' ),
					bind.if( 'withArrow', 'ck-balloon-panel_with-arrow' ),
					bind.to( 'class' )
				],

				style: {
					top: bind.to( 'top', toPx ),
					left: bind.to( 'left', toPx )
				}
			},

			children: this.content
		} );
	}

	/**
	 * Shows the panel.
	 *
	 * See {@link #isVisible}.
	 */
	show() {
		this.isVisible = true;
	}

	/**
	 * Hides the panel.
	 *
	 * See {@link #isVisible}.
	 */
	hide() {
		this.isVisible = false;
	}

	/**
	 * Attaches the panel to a specified {@link module:utils/dom/position~Options#target} with a
	 * smart positioning heuristics that chooses from available positions to make sure the panel
	 * is visible to the user i.e. within the limits of the viewport.
	 *
	 * This method accepts configuration {@link module:utils/dom/position~Options options}
	 * to set the `target`, optional `limiter` and `positions` the balloon should choose from.
	 *
	 *		const panel = new BalloonPanelView( locale );
	 *		const positions = BalloonPanelView.defaultPositions;
	 *
	 *		panel.render();
	 *
	 *		// Attach the panel to an element with the "target" id DOM.
	 *		panel.attachTo( {
	 *			target: document.querySelector( '#target' ),
	 *			positions: [
	 *				positions.northArrowSouth,
	 *				positions.southArrowNorth
	 *			]
	 *		} );
	 *
	 * **Note**: Attaching the panel will also automatically {@link #show} it.
	 *
	 * **Note**: An attached panel will not follow its target when the window is scrolled or resized.
	 * See the {@link #pin} method for a more permanent positioning strategy.
	 *
	 * @param {module:utils/dom/position~Options} options Positioning options compatible with
	 * {@link module:utils/dom/position~getOptimalPosition}. Default `positions` array is
	 * {@link module:ui/panel/balloon/balloonpanelview~BalloonPanelView.defaultPositions}.
	 */
	attachTo( options ) {
		this.show();

		const defaultPositions = BalloonPanelView.defaultPositions;
		const positionOptions = Object.assign( {}, {
			element: this.element,
			positions: [
				defaultPositions.southArrowNorth,
				defaultPositions.southArrowNorthMiddleWest,
				defaultPositions.southArrowNorthMiddleEast,
				defaultPositions.southArrowNorthWest,
				defaultPositions.southArrowNorthEast,
				defaultPositions.northArrowSouth,
				defaultPositions.northArrowSouthMiddleWest,
				defaultPositions.northArrowSouthMiddleEast,
				defaultPositions.northArrowSouthWest,
				defaultPositions.northArrowSouthEast
			],
			limiter: defaultLimiterElement,
			fitInViewport: true
		}, options );

		const optimalPosition = BalloonPanelView._getOptimalPosition( positionOptions );

		// Usually browsers make some problems with super accurate values like 104.345px
		// so it is better to use int values.
		const left = parseInt( optimalPosition.left );
		const top = parseInt( optimalPosition.top );
		const position = optimalPosition.name;

		Object.assign( this, { top, left, position } );
	}

	/**
	 * Works the same way as the {@link #attachTo} method except that the position of the panel is
	 * continuously updated when:
	 *
	 * * any ancestor of the {@link module:utils/dom/position~Options#target}
	 * or {@link module:utils/dom/position~Options#limiter} is scrolled,
	 * * the browser window gets resized or scrolled.
	 *
	 * Thanks to that, the panel always sticks to the {@link module:utils/dom/position~Options#target}
	 * and is immune to the changing environment.
	 *
	 *		const panel = new BalloonPanelView( locale );
	 *		const positions = BalloonPanelView.defaultPositions;
	 *
	 *		panel.render();
	 *
	 *		// Pin the panel to an element with the "target" id DOM.
	 *		panel.pin( {
	 *			target: document.querySelector( '#target' ),
	 *			positions: [
	 *				positions.northArrowSouth,
	 *				positions.southArrowNorth
	 *			]
	 *		} );
	 *
	 * To leave the pinned state, use the {@link #unpin} method.
	 *
	 * **Note**: Pinning the panel will also automatically {@link #show} it.
	 *
	 * @param {module:utils/dom/position~Options} options Positioning options compatible with
	 * {@link module:utils/dom/position~getOptimalPosition}. Default `positions` array is
	 * {@link module:ui/panel/balloon/balloonpanelview~BalloonPanelView.defaultPositions}.
	 */
	pin( options ) {
		this.unpin();

		this._pinWhenIsVisibleCallback = () => {
			if ( this.isVisible ) {
				this._startPinning( options );
			} else {
				this._stopPinning();
			}
		};

		this._startPinning( options );

		// Control the state of the listeners depending on whether the panel is visible
		// or not.
		// TODO: Use on() (https://github.com/ckeditor/ckeditor5-utils/issues/144).
		this.listenTo( this, 'change:isVisible', this._pinWhenIsVisibleCallback );
	}

	/**
	 * Stops pinning the panel, as set up by {@link #pin}.
	 */
	unpin() {
		if ( this._pinWhenIsVisibleCallback ) {
			// Deactivate listeners attached by pin().
			this._stopPinning();

			// Deactivate the panel pin() control logic.
			// TODO: Use off() (https://github.com/ckeditor/ckeditor5-utils/issues/144).
			this.stopListening( this, 'change:isVisible', this._pinWhenIsVisibleCallback );

			this._pinWhenIsVisibleCallback = null;

			this.hide();
		}
	}

	/**
	 * Starts managing the pinned state of the panel. See {@link #pin}.
	 *
	 * @private
	 * @param {module:utils/dom/position~Options} options Positioning options compatible with
	 * {@link module:utils/dom/position~getOptimalPosition}.
	 */
	_startPinning( options ) {
		this.attachTo( options );

		const targetElement = getDomElement( options.target );
		const limiterElement = options.limiter ? getDomElement( options.limiter ) : defaultLimiterElement;

		// Then we need to listen on scroll event of eny element in the document.
		this.listenTo( global$1.document, 'scroll', ( evt, domEvt ) => {
			const scrollTarget = domEvt.target;

			// The position needs to be updated if the positioning target is within the scrolled element.
			const isWithinScrollTarget = targetElement && scrollTarget.contains( targetElement );

			// The position needs to be updated if the positioning limiter is within the scrolled element.
			const isLimiterWithinScrollTarget = limiterElement && scrollTarget.contains( limiterElement );

			// The positioning target and/or limiter can be a Rect, object etc..
			// There's no way to optimize the listener then.
			if ( isWithinScrollTarget || isLimiterWithinScrollTarget || !targetElement || !limiterElement ) {
				this.attachTo( options );
			}
		}, { useCapture: true } );

		// We need to listen on window resize event and update position.
		this.listenTo( global$1.window, 'resize', () => {
			this.attachTo( options );
		} );
	}

	/**
	 * Stops managing the pinned state of the panel. See {@link #pin}.
	 *
	 * @private
	 */
	_stopPinning() {
		this.stopListening( global$1.document, 'scroll' );
		this.stopListening( global$1.window, 'resize' );
	}
}

// Returns the DOM element for given object or null, if there is none,
// e.g. when the passed object is a Rect instance or so.
//
// @private
// @param {*} object
// @returns {HTMLElement|null}
function getDomElement( object ) {
	if ( isElement( object ) ) {
		return object;
	}

	if ( isRange( object ) ) {
		return object.commonAncestorContainer;
	}

	if ( typeof object == 'function' ) {
		return getDomElement( object() );
	}

	return null;
}

/**
 * A horizontal offset of the arrow tip from the edge of the balloon. Controlled by CSS.
 *
 *		 +-----|---------...
 *		 |     |
 *		 |     |
 *		 |     |
 *		 |     |
 *		 +--+  |  +------...
 *		     \ | /
 *		      \|/
 *	    >|-----|<---------------- horizontal offset
 *
 * @default 30
 * @member {Number} module:ui/panel/balloon/balloonpanelview~BalloonPanelView.arrowHorizontalOffset
 */
BalloonPanelView.arrowHorizontalOffset = 25;

/**
 * A vertical offset of the arrow from the edge of the balloon. Controlled by CSS.
 *
 *		 +-------------...
 *		 |
 *		 |
 *		 |                      /-- vertical offset
 *		 |                     V
 *		 +--+    +-----...    ---------
 *		     \  /              |
 *		      \/               |
 *		-------------------------------
 *		                       ^
 *
 * @default 15
 * @member {Number} module:ui/panel/balloon/balloonpanelview~BalloonPanelView.arrowVerticalOffset
 */
BalloonPanelView.arrowVerticalOffset = 10;

/**
 * Function used to calculate the optimal position for the balloon.
 *
 * @protected
 * @member {Function} module:ui/panel/balloon/balloonpanelview~BalloonPanelView._getOptimalPosition
 */
BalloonPanelView._getOptimalPosition = getOptimalPosition;

/**
 * A default set of positioning functions used by the balloon panel view
 * when attaching using the {@link module:ui/panel/balloon/balloonpanelview~BalloonPanelView#attachTo} method.
 *
 * The available positioning functions are as follows:
 *
 *
 *
 * **North west**
 *
 * * `northWestArrowSouthWest`
 *
 *		+-----------------+
 *		|     Balloon     |
 *		+-----------------+
 *		 V
 *		 [ Target ]
 *
 * * `northWestArrowSouthMiddleWest`
 *
 *		+-----------------+
 *		|     Balloon     |
 *		+-----------------+
 *		    V
 *		    [ Target ]
 *
 * * `northWestArrowSouth`
 *
 *		+-----------------+
 *		|     Balloon     |
 *		+-----------------+
 *		         V
 *		         [ Target ]
 *
 * * `northWestArrowSouthMiddleEast`
 *
 *		+-----------------+
 *		|     Balloon     |
 *		+-----------------+
 *		             V
 *		             [ Target ]
 *
 * * `northWestArrowSouthEast`
 *
 *		+-----------------+
 *		|     Balloon     |
 *		+-----------------+
 *		                 V
 *		                 [ Target ]
 *
 *
 *
 * **North**
 *
 * * `northArrowSouthWest`
 *
 *		    +-----------------+
 *		    |     Balloon     |
 *		    +-----------------+
 *		     V
 *		[ Target ]
 *
 * * `northArrowSouthMiddleWest`
 *
 *		 +-----------------+
 *		 |     Balloon     |
 *		 +-----------------+
 *		     V
 *		[ Target ]
 *
 * * `northArrowSouth`
 *
 *		+-----------------+
 *		|     Balloon     |
 *		+-----------------+
 *		         V
 *		    [ Target ]
 *
 * * `northArrowSouthMiddleEast`
 *
 *		+-----------------+
 *		|     Balloon     |
 *		+-----------------+
 *		             V
 *		        [ Target ]
 *
 * * `northArrowSouthEast`
 *
 *		+-----------------+
 *		|     Balloon     |
 *		+-----------------+
 *		                V
 *		           [ Target ]
 *
 * **North east**
 *
 * * `northEastArrowSouthWest`
 *
 *		        +-----------------+
 *		        |     Balloon     |
 *		        +-----------------+
 *		         V
 *		[ Target ]
 *
 *
 * * `northEastArrowSouthMiddleWest`
 *
 *		     +-----------------+
 *		     |     Balloon     |
 *		     +-----------------+
 *		         V
 *		[ Target ]
 *
 * * `northEastArrowSouth`
 *
 *		+-----------------+
 *		|     Balloon     |
 *		+-----------------+
 *		         V
 *		[ Target ]
 *
 * * `northEastArrowSouthMiddleEast`
 *
 *		+-----------------+
 *		|     Balloon     |
 *		+-----------------+
 *		             V
 *		    [ Target ]
 *
 * * `northEastArrowSouthEast`
 *
 *		+-----------------+
 *		|     Balloon     |
 *		+-----------------+
 *		                 V
 *		        [ Target ]
 *
 *
 *
 * **South**
 *
 *
 * * `southArrowNorthWest`
 *
 *		[ Target ]
 *		     ^
 *		    +-----------------+
 *		    |     Balloon     |
 *		    +-----------------+
 *
 * * `southArrowNorthMiddleWest`
 *
 *		   [ Target ]
 *		        ^
 *		    +-----------------+
 *		    |     Balloon     |
 *		    +-----------------+
 *
 * * `southArrowNorth`
 *
 *		    [ Target ]
 *		         ^
 *		+-----------------+
 *		|     Balloon     |
 *		+-----------------+
 *
 * * `southArrowNorthMiddleEast`
 *
 *		            [ Target ]
 *		                 ^
 *		   +-----------------+
 *		   |     Balloon     |
 *		   +-----------------+
 *
 * * `southArrowNorthEast`
 *
 *		            [ Target ]
 *		                 ^
 *		+-----------------+
 *		|     Balloon     |
 *		+-----------------+
 *
 *
 *
 * **South west**
 *
 * * `southWestArrowNorthWest`
 *
 *		 [ Target ]
 *		 ^
 *		+-----------------+
 *		|     Balloon     |
 *		+-----------------+
 *
 * * `southWestArrowNorthMiddleWest`
 *
 *		     [ Target ]
 *		     ^
 *		 +-----------------+
 *		 |     Balloon     |
 *		 +-----------------+
 *
 * * `southWestArrowNorth`
 *
 *		         [ Target ]
 *		         ^
 *		+-----------------+
 *		|     Balloon     |
 *		+-----------------+
 *
 * * `southWestArrowNorthMiddleEast`
 *
 *		              [ Target ]
 *		              ^
 *		+-----------------+
 *		|     Balloon     |
 *		+-----------------+
 *
 * * `southWestArrowNorthEast`
 *
 *		                 [ Target ]
 *		                 ^
 *		+-----------------+
 *		|     Balloon     |
 *		+-----------------+
 *
 *
 *
 * **South east**
 *
 * * `southEastArrowNorthWest`
 *
 *		[ Target ]
 *		         ^
 *		        +-----------------+
 *		        |     Balloon     |
 *		        +-----------------+
* * `southEastArrowNorthMiddleWest`
 *
 *		   [ Target ]
 *		            ^
 *		        +-----------------+
 *		        |     Balloon     |
 *		        +-----------------+
 *
 * * `southEastArrowNorth`
 *
 *		[ Target ]
 *		         ^
 *		+-----------------+
 *		|     Balloon     |
 *		+-----------------+
 *
 * * `southEastArrowNorthMiddleEast`
 *
 *		     [ Target ]
 *		              ^
 *		+-----------------+
 *		|     Balloon     |
 *		+-----------------+
 *
 * * `southEastArrowNorthEast`
 *
 *		        [ Target ]
 *		                 ^
 *		+-----------------+
 *		|     Balloon     |
 *		+-----------------+
 *
 *
 * See {@link module:ui/panel/balloon/balloonpanelview~BalloonPanelView#attachTo}.
 *
 * Positioning functions must be compatible with {@link module:utils/dom/position~Position}.
 *
 * The name that the position function returns will be reflected in the balloon panel's class that
 * controls the placement of the "arrow". See {@link #position} to learn more.
 *
 * @member {Object} module:ui/panel/balloon/balloonpanelview~BalloonPanelView.defaultPositions
 */
BalloonPanelView.defaultPositions = {

	// ------- North west

	northWestArrowSouthWest: ( targetRect, balloonRect ) => ( {
		top: getNorthTop( targetRect, balloonRect ),
		left: targetRect.left - BalloonPanelView.arrowHorizontalOffset,
		name: 'arrow_sw'
	} ),

	northWestArrowSouthMiddleWest: ( targetRect, balloonRect ) => ( {
		top: getNorthTop( targetRect, balloonRect ),
		left: targetRect.left - ( balloonRect.width * .25 ) - BalloonPanelView.arrowHorizontalOffset,
		name: 'arrow_smw'
	} ),

	northWestArrowSouth: ( targetRect, balloonRect ) => ( {
		top: getNorthTop( targetRect, balloonRect ),
		left: targetRect.left - balloonRect.width / 2,
		name: 'arrow_s'
	} ),

	northWestArrowSouthMiddleEast: ( targetRect, balloonRect ) => ( {
		top: getNorthTop( targetRect, balloonRect ),
		left: targetRect.left - ( balloonRect.width * .75 ) + BalloonPanelView.arrowHorizontalOffset,
		name: 'arrow_sme'
	} ),

	northWestArrowSouthEast: ( targetRect, balloonRect ) => ( {
		top: getNorthTop( targetRect, balloonRect ),
		left: targetRect.left - balloonRect.width + BalloonPanelView.arrowHorizontalOffset,
		name: 'arrow_se'
	} ),

	// ------- North

	northArrowSouthWest: ( targetRect, balloonRect ) => ( {
		top: getNorthTop( targetRect, balloonRect ),
		left: targetRect.left + targetRect.width / 2 - BalloonPanelView.arrowHorizontalOffset,
		name: 'arrow_sw'
	} ),

	northArrowSouthMiddleWest: ( targetRect, balloonRect ) => ( {
		top: getNorthTop( targetRect, balloonRect ),
		left: targetRect.left + targetRect.width / 2 - ( balloonRect.width * .25 ) - BalloonPanelView.arrowHorizontalOffset,
		name: 'arrow_smw'
	} ),

	northArrowSouth: ( targetRect, balloonRect ) => ( {
		top: getNorthTop( targetRect, balloonRect ),
		left: targetRect.left + targetRect.width / 2 - balloonRect.width / 2,
		name: 'arrow_s'
	} ),

	northArrowSouthMiddleEast: ( targetRect, balloonRect ) => ( {
		top: getNorthTop( targetRect, balloonRect ),
		left: targetRect.left + targetRect.width / 2 - ( balloonRect.width * .75 ) + BalloonPanelView.arrowHorizontalOffset,
		name: 'arrow_sme'
	} ),

	northArrowSouthEast: ( targetRect, balloonRect ) => ( {
		top: getNorthTop( targetRect, balloonRect ),
		left: targetRect.left + targetRect.width / 2 - balloonRect.width + BalloonPanelView.arrowHorizontalOffset,
		name: 'arrow_se'
	} ),

	// ------- North east

	northEastArrowSouthWest: ( targetRect, balloonRect ) => ( {
		top: getNorthTop( targetRect, balloonRect ),
		left: targetRect.right - BalloonPanelView.arrowHorizontalOffset,
		name: 'arrow_sw'
	} ),

	northEastArrowSouthMiddleWest: ( targetRect, balloonRect ) => ( {
		top: getNorthTop( targetRect, balloonRect ),
		left: targetRect.right - ( balloonRect.width * .25 ) - BalloonPanelView.arrowHorizontalOffset,
		name: 'arrow_smw'
	} ),
	northEastArrowSouth: ( targetRect, balloonRect ) => ( {
		top: getNorthTop( targetRect, balloonRect ),
		left: targetRect.right - balloonRect.width / 2,
		name: 'arrow_s'
	} ),

	northEastArrowSouthMiddleEast: ( targetRect, balloonRect ) => ( {
		top: getNorthTop( targetRect, balloonRect ),
		left: targetRect.right - ( balloonRect.width * .75 ) + BalloonPanelView.arrowHorizontalOffset,
		name: 'arrow_sme'
	} ),

	northEastArrowSouthEast: ( targetRect, balloonRect ) => ( {
		top: getNorthTop( targetRect, balloonRect ),
		left: targetRect.right - balloonRect.width + BalloonPanelView.arrowHorizontalOffset,
		name: 'arrow_se'
	} ),
	// ------- South west

	southWestArrowNorthWest: ( targetRect, balloonRect ) => ( {
		top: getSouthTop( targetRect),
		left: targetRect.left - BalloonPanelView.arrowHorizontalOffset,
		name: 'arrow_nw'
	} ),

	southWestArrowNorthMiddleWest: ( targetRect, balloonRect ) => ( {
		top: getSouthTop( targetRect),
		left: targetRect.left - ( balloonRect.width * .25 ) - BalloonPanelView.arrowHorizontalOffset,
		name: 'arrow_nmw'
	} ),

	southWestArrowNorth: ( targetRect, balloonRect ) => ( {
		top: getSouthTop( targetRect),
		left: targetRect.left - balloonRect.width / 2,
		name: 'arrow_n'
	} ),

	southWestArrowNorthMiddleEast: ( targetRect, balloonRect ) => ( {
		top: getSouthTop( targetRect),
		left: targetRect.left - ( balloonRect.width * .75 ) + BalloonPanelView.arrowHorizontalOffset,
		name: 'arrow_nme'
	} ),

	southWestArrowNorthEast: ( targetRect, balloonRect ) => ( {
		top: getSouthTop( targetRect),
		left: targetRect.left - balloonRect.width + BalloonPanelView.arrowHorizontalOffset,
		name: 'arrow_ne'
	} ),

	// ------- South

	southArrowNorthWest: ( targetRect, balloonRect ) => ( {
		top: getSouthTop( targetRect),
		left: targetRect.left + targetRect.width / 2 - BalloonPanelView.arrowHorizontalOffset,
		name: 'arrow_nw'
	} ),
	southArrowNorthMiddleWest: ( targetRect, balloonRect ) => ( {
		top: getSouthTop( targetRect),
		left: targetRect.left + targetRect.width / 2 - ( balloonRect.width * 0.25 ) - BalloonPanelView.arrowHorizontalOffset,
		name: 'arrow_nmw'
	} ),

	southArrowNorth: ( targetRect, balloonRect ) => ( {
		top: getSouthTop( targetRect),
		left: targetRect.left + targetRect.width / 2 - balloonRect.width / 2,
		name: 'arrow_n'
	} ),

	southArrowNorthMiddleEast: ( targetRect, balloonRect ) => ( {
		top: getSouthTop( targetRect),
		left: targetRect.left + targetRect.width / 2 - ( balloonRect.width * 0.75 ) + BalloonPanelView.arrowHorizontalOffset,
		name: 'arrow_nme'
	} ),

	southArrowNorthEast: ( targetRect, balloonRect ) => ( {
		top: getSouthTop( targetRect),
		left: targetRect.left + targetRect.width / 2 - balloonRect.width + BalloonPanelView.arrowHorizontalOffset,
		name: 'arrow_ne'
	} ),

	// ------- South east

	southEastArrowNorthWest: ( targetRect, balloonRect ) => ( {
		top: getSouthTop( targetRect),
		left: targetRect.right - BalloonPanelView.arrowHorizontalOffset,
		name: 'arrow_nw'
	} ),

	southEastArrowNorthMiddleWest: ( targetRect, balloonRect ) => ( {
		top: getSouthTop( targetRect),
		left: targetRect.right - ( balloonRect.width * .25 ) - BalloonPanelView.arrowHorizontalOffset,
		name: 'arrow_nmw'
	} ),

	southEastArrowNorth: ( targetRect, balloonRect ) => ( {
		top: getSouthTop( targetRect),
		left: targetRect.right - balloonRect.width / 2,
		name: 'arrow_n'
	} ),

	southEastArrowNorthMiddleEast: ( targetRect, balloonRect ) => ( {
		top: getSouthTop( targetRect),
		left: targetRect.right - ( balloonRect.width * .75 ) + BalloonPanelView.arrowHorizontalOffset,
		name: 'arrow_nme'
	} ),

	southEastArrowNorthEast: ( targetRect, balloonRect ) => ( {
		top: getSouthTop( targetRect),
		left: targetRect.right - balloonRect.width + BalloonPanelView.arrowHorizontalOffset,
		name: 'arrow_ne'
	} )

};

// Returns the top coordinate for positions starting with `north*`.
//
// @private
// @param {utils/dom/rect~Rect} targetRect A rect of the target.
// @param {utils/dom/rect~Rect} elementRect A rect of the balloon.
// @returns {Number}
function getNorthTop( targetRect, balloonRect ) {
	return targetRect.top - balloonRect.height - BalloonPanelView.arrowVerticalOffset;
}

// Returns the top coordinate for positions starting with `south*`.
//
// @private
// @param {utils/dom/rect~Rect} targetRect A rect of the target.
// @param {utils/dom/rect~Rect} elementRect A rect of the balloon.
// @returns {Number}
function getSouthTop( targetRect ) {
	return targetRect.bottom + BalloonPanelView.arrowVerticalOffset;
}

const dragHandleSvg = 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTYgMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQgMHYxSDF2M0gwVi41QS41LjUgMCAwIDEgLjUgMEg0em04IDBoMy41YS41LjUgMCAwIDEgLjUuNVY0aC0xVjFoLTNWMHpNNCAxNkguNWEuNS41IDAgMCAxLS41LS41VjEyaDF2M2gzdjF6bTggMHYtMWgzdi0zaDF2My41YS41LjUgMCAwIDEtLjUuNUgxMnoiLz48cGF0aCBmaWxsLW9wYWNpdHk9Ii4yNTYiIGQ9Ik0xIDFoMTR2MTRIMXoiLz48ZyBjbGFzcz0iY2staWNvbl9fc2VsZWN0ZWQtaW5kaWNhdG9yIj48cGF0aCBkPSJNNyAwaDJ2MUg3VjB6TTAgN2gxdjJIMFY3em0xNSAwaDF2MmgtMVY3em0tOCA4aDJ2MUg3di0xeiIvPjxwYXRoIGZpbGwtb3BhY2l0eT0iLjI1NCIgZD0iTTEgMWgxNHYxNEgxeiIvPjwvZz48L3N2Zz4=';

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * The name of the type around model selection attribute responsible for
 * displaying a fake caret next to a selected widget.
 */
const TYPE_AROUND_SELECTION_ATTRIBUTE = 'widget-type-around';

/**
 * Checks if an element is a widget that qualifies to get the widget type around UI.
 *
 * @param {module:engine/view/element~Element} viewElement
 * @param {module:engine/model/element~Element} modelElement
 * @param {module:engine/model/schema~Schema} schema
 * @returns {Boolean}
 */
function isTypeAroundWidget( viewElement, modelElement, schema ) {
	return viewElement && isWidget( viewElement ) && !schema.isInline( modelElement );
}

/**
 * For the passed HTML element, this helper finds the closest widget type around button ancestor.
 *
 * @param {HTMLElement} domElement
 * @returns {HTMLElement|null}
 */
function getClosestTypeAroundDomButton( domElement ) {
	return domElement.closest( '.ck-widget__type-around__button' );
}

/**
 * For the passed widget type around button element, this helper determines at which position
 * the paragraph would be inserted into the content if, for instance, the button was
 * clicked by the user.
 *
 * @param {HTMLElement} domElement
 * @returns {'before'|'after'} The position of the button.
 */
function getTypeAroundButtonPosition( domElement ) {
	return domElement.classList.contains( 'ck-widget__type-around__button_before' ) ? 'before' : 'after';
}

/**
 * For the passed HTML element, this helper returns the closest view widget ancestor.
 *
 * @param {HTMLElement} domElement
 * @param {module:engine/view/domconverter~DomConverter} domConverter
 * @returns {module:engine/view/element~Element}
 */
function getClosestWidgetViewElement( domElement, domConverter ) {
	const widgetDomElement = domElement.closest( '.ck-widget' );

	return domConverter.mapDomToView( widgetDomElement );
}

/**
 * For the passed selection instance, it returns the position of the fake caret displayed next to a widget.
 *
 * **Note**: If the fake caret is not currently displayed, `null` is returned.
 *
 * @param {module:engine/model/selection~Selection|module:engine/model/documentselection~DocumentSelection} selection
 * @returns {'before'|'after'|null} The position of the fake caret or `null` when none is present.
 */
function getTypeAroundFakeCaretPosition( selection ) {
	return selection.getAttribute( TYPE_AROUND_SELECTION_ATTRIBUTE );
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * CSS class added to each widget element.
 *
 * @const {String}
 */
const WIDGET_CLASS_NAME = 'ck-widget';

/**
 * CSS class added to currently selected widget element.
 *
 * @const {String}
 */
const WIDGET_SELECTED_CLASS_NAME = 'ck-widget_selected';

/**
 * Returns `true` if given {@link module:engine/view/node~Node} is an {@link module:engine/view/element~Element} and a widget.
 *
 * @param {module:engine/view/node~Node} node
 * @returns {Boolean}
 */
function isWidget( node ) {
	if ( !node.is( 'element' ) ) {
		return false;
	}

	return !!node.getCustomProperty( 'widget' );
}

/**
 * Converts the given {@link module:engine/view/element~Element} to a widget in the following way:
 *
 * * sets the `contenteditable` attribute to `"false"`,
 * * adds the `ck-widget` CSS class,
 * * adds a custom {@link module:engine/view/element~Element#getFillerOffset `getFillerOffset()`} method returning `null`,
 * * adds a custom property allowing to recognize widget elements by using {@link ~isWidget `isWidget()`},
 * * implements the {@link ~setHighlightHandling view highlight on widgets}.
 *
 * This function needs to be used in conjunction with
 * {@link module:engine/conversion/downcasthelpers~DowncastHelpers downcast conversion helpers}
 * like {@link module:engine/conversion/downcasthelpers~DowncastHelpers#elementToElement `elementToElement()`}.
 * Moreover, typically you will want to use `toWidget()` only for `editingDowncast`, while keeping the `dataDowncast` clean.
 *
 * For example, in order to convert a `<widget>` model element to `<div class="widget">` in the view, you can define
 * such converters:
 *
 *		editor.conversion.for( 'editingDowncast' )
 *			.elementToElement( {
 *				model: 'widget',
 *				view: ( modelItem, { writer } ) => {
 *					const div = writer.createContainerElement( 'div', { class: 'widget' } );
 *
 *					return toWidget( div, writer, { label: 'some widget' } );
 *				}
 *			} );
 *
 *		editor.conversion.for( 'dataDowncast' )
 *			.elementToElement( {
 *				model: 'widget',
 *				view: ( modelItem, { writer } ) => {
 *					return writer.createContainerElement( 'div', { class: 'widget' } );
 *				}
 *			} );
 *
 * See the full source code of the widget (with a nested editable) schema definition and converters in
 * [this sample](https://github.com/ckeditor/ckeditor5-widget/blob/master/tests/manual/widget-with-nestededitable.js).
 *
 * @param {module:engine/view/element~Element} element
 * @param {module:engine/view/downcastwriter~DowncastWriter} writer
 * @param {Object} [options={}]
 * @param {String|Function} [options.label] Element's label provided to the {@link ~setLabel} function. It can be passed as
 * a plain string or a function returning a string. It represents the widget for assistive technologies (like screen readers).
 * @param {Boolean} [options.hasSelectionHandle=false] If `true`, the widget will have a selection handle added.
 * @returns {module:engine/view/element~Element} Returns the same element.
 */
function toWidget( element, writer, options = {} ) {
	if ( !element.is( 'containerElement' ) ) {
		/**
		 * The element passed to `toWidget()` must be a {@link module:engine/view/containerelement~ContainerElement}
		 * instance.
		 *
		 * @error widget-to-widget-wrong-element-type
		 * @param {String} element The view element passed to `toWidget()`.
		 */
		throw new CKEditorError(
			'widget-to-widget-wrong-element-type',
			null,
			{ element }
		);
	}

	writer.setAttribute( 'contenteditable', 'false', element );

	writer.addClass( WIDGET_CLASS_NAME, element );
	writer.setCustomProperty( 'widget', true, element );
	element.getFillerOffset = getFillerOffset;

	if ( options.label ) {
		setLabel( element, options.label, writer );
	}

	if ( options.hasSelectionHandle ) {
		addSelectionHandle( element, writer );
	}

	setHighlightHandling(
		element,
		writer,
		( element, descriptor, writer ) => writer.addClass( toArray( descriptor.classes ), element ),
		( element, descriptor, writer ) => writer.removeClass( toArray( descriptor.classes ), element )
	);

	return element;
}

/**
 * Sets highlight handling methods. Uses {@link module:widget/highlightstack~HighlightStack} to
 * properly determine which highlight descriptor should be used at given time.
 *
 * @param {module:engine/view/element~Element} element
 * @param {module:engine/view/downcastwriter~DowncastWriter} writer
 * @param {Function} add
 * @param {Function} remove
 */
function setHighlightHandling( element, writer, add, remove ) {
	const stack = new HighlightStack();

	stack.on( 'change:top', ( evt, data ) => {
		if ( data.oldDescriptor ) {
			remove( element, data.oldDescriptor, data.writer );
		}

		if ( data.newDescriptor ) {
			add( element, data.newDescriptor, data.writer );
		}
	} );

	writer.setCustomProperty( 'addHighlight', ( element, descriptor, writer ) => stack.add( descriptor, writer ), element );
	writer.setCustomProperty( 'removeHighlight', ( element, id, writer ) => stack.remove( id, writer ), element );
}

/**
 * Sets label for given element.
 * It can be passed as a plain string or a function returning a string. Function will be called each time label is retrieved by
 * {@link ~getLabel `getLabel()`}.
 *
 * @param {module:engine/view/element~Element} element
 * @param {String|Function} labelOrCreator
 * @param {module:engine/view/downcastwriter~DowncastWriter} writer
 */
function setLabel( element, labelOrCreator, writer ) {
	writer.setCustomProperty( 'widgetLabel', labelOrCreator, element );
}

/**
 * Returns the label of the provided element.
 *
 * @param {module:engine/view/element~Element} element
 * @returns {String}
 */
function getLabel( element ) {
	const labelCreator = element.getCustomProperty( 'widgetLabel' );

	if ( !labelCreator ) {
		return '';
	}

	return typeof labelCreator == 'function' ? labelCreator() : labelCreator;
}

/**
 * Returns a model position which is optimal (in terms of UX) for inserting a widget block.
 *
 * For instance, if a selection is in the middle of a paragraph, the position before this paragraph
 * will be returned so that it is not split. If the selection is at the end of a paragraph,
 * the position after this paragraph will be returned.
 *
 * Note: If the selection is placed in an empty block, that block will be returned. If that position
 * is then passed to {@link module:engine/model/model~Model#insertContent},
 * the block will be fully replaced by the image.
 *
 * @param {module:engine/model/selection~Selection|module:engine/model/documentselection~DocumentSelection} selection
 * The selection based on which the insertion position should be calculated.
 * @param {module:engine/model/model~Model} model Model instance.
 * @returns {module:engine/model/position~Position} The optimal position.
 */
function findOptimalInsertionPosition( selection, model ) {
	const selectedElement = selection.getSelectedElement();

	if ( selectedElement ) {
		const typeAroundFakeCaretPosition = getTypeAroundFakeCaretPosition( selection );

		// If the WidgetTypeAround "fake caret" is displayed, use its position for the insertion
		// to provide the most predictable UX (https://github.com/ckeditor/ckeditor5/issues/7438).
		if ( typeAroundFakeCaretPosition ) {
			return model.createPositionAt( selectedElement, typeAroundFakeCaretPosition );
		}

		if ( model.schema.isBlock( selectedElement ) ) {
			return model.createPositionAfter( selectedElement );
		}
	}

	const firstBlock = selection.getSelectedBlocks().next().value;

	if ( firstBlock ) {
		// If inserting into an empty block – return position in that block. It will get
		// replaced with the image by insertContent(). #42.
		if ( firstBlock.isEmpty ) {
			return model.createPositionAt( firstBlock, 0 );
		}

		const positionAfter = model.createPositionAfter( firstBlock );

		// If selection is at the end of the block - return position after the block.
		if ( selection.focus.isTouching( positionAfter ) ) {
			return positionAfter;
		}

		// Otherwise return position before the block.
		return model.createPositionBefore( firstBlock );
	}

	return selection.focus;
}

// Default filler offset function applied to all widget elements.
//
// @returns {null}
function getFillerOffset() {
	return null;
}

// Adds a drag handle to the widget.
//
// @param {module:engine/view/containerelement~ContainerElement}
// @param {module:engine/view/downcastwriter~DowncastWriter} writer
function addSelectionHandle( widgetElement, writer ) {
	const selectionHandle = writer.createUIElement( 'div', { class: 'ck ck-widget__selection-handle' }, function( domDocument ) {
		const domElement = this.toDomElement( domDocument );

		// Use the IconView from the ui library.
		const icon = new IconView();
		icon.set( 'content', dragHandleSvg );

		// Render the icon view right away to append its #element to the selectionHandle DOM element.
		icon.render();

		domElement.appendChild( icon.element );

		return domElement;
	} );

	// Append the selection handle into the widget wrapper.
	writer.insert( writer.createPositionAt( widgetElement, 0 ), selectionHandle );
	writer.addClass( [ 'ck-widget_with-selection-handle' ], widgetElement );
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Converts a given {@link module:engine/view/element~Element} to an image widget:
 * * Adds a {@link module:engine/view/element~Element#_setCustomProperty custom property} allowing to recognize the image widget element.
 * * Calls the {@link module:widget/utils~toWidget} function with the proper element's label creator.
 *
 * @param {module:engine/view/element~Element} viewElement
 * @param {module:engine/view/downcastwriter~DowncastWriter} writer An instance of the view writer.
 * @param {String} label The element's label. It will be concatenated with the image `alt` attribute if one is present.
 * @returns {module:engine/view/element~Element}
 */
function toImageWidget( viewElement, writer, label ) {
	writer.setCustomProperty( 'image', true, viewElement );

	return toWidget( viewElement, writer, { label: labelCreator } );

	function labelCreator() {
		const imgElement = getViewImgFromWidget( viewElement );
		const altText = imgElement.getAttribute( 'alt' );

		return altText ? `${ altText } ${ label }` : label;
	}
}

/**
 * Checks if a given view element is an image widget.
 *
 * @param {module:engine/view/element~Element} viewElement
 * @returns {Boolean}
 */
function isImageWidget( viewElement ) {
	return !!viewElement.getCustomProperty( 'image' ) && isWidget( viewElement );
}

/**
 * Returns an image widget editing view element if one is selected.
 *
 * @param {module:engine/view/selection~Selection|module:engine/view/documentselection~DocumentSelection} selection
 * @returns {module:engine/view/element~Element|null}
 */
function getSelectedImageWidget( selection ) {
	const viewElement = selection.getSelectedElement();

	if ( viewElement && isImageWidget( viewElement ) ) {
		return viewElement;
	}

	return null;
}

/**
 * Checks if the provided model element is an `image`.
 *
 * @param {module:engine/model/element~Element} modelElement
 * @returns {Boolean}
 */
function isImage( modelElement ) {
	return !!modelElement && modelElement.is( 'element', 'image' );
}

/**
 * Handles inserting single file. This method unifies image insertion using {@link module:widget/utils~findOptimalInsertionPosition} method.
 *
 *		insertImage( model, { src: 'path/to/image.jpg' } );
 *
 * @param {module:engine/model/model~Model} model
 * @param {Object} [attributes={}] Attributes of inserted image
 * @param {module:engine/model/position~Position} [insertPosition] Position to insert the image. If not specified,
 * the {@link module:widget/utils~findOptimalInsertionPosition} logic will be applied.
 */
function insertImage( model, attributes = {}, insertPosition = null ) {
	model.change( writer => {
		const imageElement = writer.createElement( 'image', attributes );

		const insertAtSelection = insertPosition || findOptimalInsertionPosition( model.document.selection, model );

		model.insertContent( imageElement, insertAtSelection );

		// Inserting an image might've failed due to schema regulations.
		if ( imageElement.parent ) {
			writer.setSelection( imageElement, 'on' );
		}
	} );
}

/**
 * Checks if image can be inserted at current model selection.
 *
 * @param {module:engine/model/model~Model} model
 * @returns {Boolean}
 */
function isImageAllowed( model ) {
	const schema = model.schema;
	const selection = model.document.selection;

	return isImageAllowedInParent( selection, schema, model ) &&
		!checkSelectionOnObject( selection, schema ) &&
		isInOtherImage( selection );
}

/**
 * Get view `<img>` element from the view widget (`<figure>`).
 *
 * Assuming that image is always a first child of a widget (ie. `figureView.getChild( 0 )`) is unsafe as other features might
 * inject their own elements to the widget.
 *
 * The `<img>` can be wrapped to other elements, e.g. `<a>`. Nested check required.
 *
 * @param {module:engine/view/element~Element} figureView
 * @returns {module:engine/view/element~Element}
 */
function getViewImgFromWidget( figureView ) {
	const figureChildren = [];

	for ( const figureChild of figureView.getChildren() ) {
		figureChildren.push( figureChild );

		if ( figureChild.is( 'element' ) ) {
			figureChildren.push( ...figureChild.getChildren() );
		}
	}

	return figureChildren.find( viewChild => viewChild.is( 'element', 'img' ) );
}

// Checks if image is allowed by schema in optimal insertion parent.
//
// @returns {Boolean}
function isImageAllowedInParent( selection, schema, model ) {
	const parent = getInsertImageParent( selection, model );

	return schema.checkChild( parent, 'image' );
}

// Check if selection is on object.
//
// @returns {Boolean}
function checkSelectionOnObject( selection, schema ) {
	const selectedElement = selection.getSelectedElement();

	return selectedElement && schema.isObject( selectedElement );
}

// Checks if selection is placed in other image (ie. in caption).
function isInOtherImage( selection ) {
	return [ ...selection.focus.getAncestors() ].every( ancestor => !ancestor.is( 'element', 'image' ) );
}

// Returns a node that will be used to insert image with `model.insertContent` to check if image can be placed there.
function getInsertImageParent( selection, model ) {
	const insertAt = findOptimalInsertionPosition( selection, model );

	const parent = insertAt.parent;

	if ( parent.isEmpty && !parent.is( 'element', '$root' ) ) {
		return parent.parent;
	}

	return parent;
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * The base class for CKEditor commands.
 *
 * Commands are the main way to manipulate editor contents and state. They are mostly used by UI elements (or by other
 * commands) to make changes in the model. Commands are available in every part of code that has access to
 * the {@link module:core/editor/editor~Editor editor} instance.
 *
 * Instances of registered commands can be retrieved from {@link module:core/editor/editor~Editor#commands `editor.commands`}.
 * The easiest way to execute a command is through {@link module:core/editor/editor~Editor#execute `editor.execute()`}.
 *
 * By default commands are disabled when the editor is in {@link module:core/editor/editor~Editor#isReadOnly read-only} mode.
 *
 * @mixes module:utils/observablemixin~ObservableMixin
 */
class Command {
	/**
	 * Creates a new `Command` instance.
	 *
	 * @param {module:core/editor/editor~Editor} editor Editor on which this command will be used.
	 */
	constructor( editor ) {
		/**
		 * The editor on which this command will be used.
		 *
		 * @readonly
		 * @member {module:core/editor/editor~Editor}
		 */
		this.editor = editor;

		/**
		 * The value of the command. A concrete command class should define what it represents for it.
		 *
		 * For example, the `'bold'` command's value indicates whether the selection starts in a bolded text.
		 * And the value of the `'link'` command may be an object with links details.
		 *
		 * It is possible for a command to have no value (e.g. for stateless actions such as `'imageUpload'`).
		 *
		 * A concrete command class should control this value by overriding the {@link #refresh `refresh()`} method.
		 *
		 * @observable
		 * @readonly
		 * @member #value
		 */
		this.set( 'value', undefined );

		/**
		 * Flag indicating whether a command is enabled or disabled.
		 * A disabled command will do nothing when executed.
		 *
		 * A concrete command class should control this value by overriding the {@link #refresh `refresh()`} method.
		 *
		 * It is possible to disable a command from "outside". For instance, in your integration you may want to disable
		 * a certain set of commands for the time being. To do that, you can use the fact that `isEnabled` is observable
		 * and it fires the `set:isEnabled` event every time anyone tries to modify its value:
		 *
		 *		function disableCommand( cmd ) {
		 *			cmd.on( 'set:isEnabled', forceDisable, { priority: 'highest' } );
		 *
		 *			cmd.isEnabled = false;
		 *
		 *			// Make it possible to enable the command again.
		 *			return () => {
		 *				cmd.off( 'set:isEnabled', forceDisable );
		 *				cmd.refresh();
		 *			};
		 *
		 *			function forceDisable( evt ) {
		 *				evt.return = false;
		 *				evt.stop();
		 *			}
		 *		}
		 *
		 *		// Usage:
		 *
		 *		// Disabling the command.
		 *		const enableBold = disableCommand( editor.commands.get( 'bold' ) );
		 *
		 *		// Enabling the command again.
		 *		enableBold();
		 *
		 * @observable
		 * @readonly
		 * @member {Boolean} #isEnabled
		 */
		this.set( 'isEnabled', false );

		/**
		 * Holds identifiers for {@link #forceDisabled} mechanism.
		 *
		 * @type {Set.<String>}
		 * @private
		 */
		this._disableStack = new Set();

		this.decorate( 'execute' );

		// By default every command is refreshed when changes are applied to the model.
		this.listenTo( this.editor.model.document, 'change', () => {
			this.refresh();
		} );

		this.on( 'execute', evt => {
			if ( !this.isEnabled ) {
				evt.stop();
			}
		}, { priority: 'high' } );

		// By default commands are disabled when the editor is in read-only mode.
		this.listenTo( editor, 'change:isReadOnly', ( evt, name, value ) => {
			if ( value ) {
				this.forceDisabled( 'readOnlyMode' );
			} else {
				this.clearForceDisabled( 'readOnlyMode' );
			}
		} );
	}

	/**
	 * Refreshes the command. The command should update its {@link #isEnabled} and {@link #value} properties
	 * in this method.
	 *
	 * This method is automatically called when
	 * {@link module:engine/model/document~Document#event:change any changes are applied to the document}.
	 */
	refresh() {
		this.isEnabled = true;
	}

	/**
	 * Disables the command.
	 *
	 * Command may be disabled by multiple features or algorithms (at once). When disabling a command, unique id should be passed
	 * (e.g. feature name). The same identifier should be used when {@link #clearForceDisabled enabling back} the command.
	 * The command becomes enabled only after all features {@link #clearForceDisabled enabled it back}.
	 *
	 * Disabling and enabling a command:
	 *
	 *		command.isEnabled; // -> true
	 *		command.forceDisabled( 'MyFeature' );
	 *		command.isEnabled; // -> false
	 *		command.clearForceDisabled( 'MyFeature' );
	 *		command.isEnabled; // -> true
	 *
	 * Command disabled by multiple features:
	 *
	 *		command.forceDisabled( 'MyFeature' );
	 *		command.forceDisabled( 'OtherFeature' );
	 *		command.clearForceDisabled( 'MyFeature' );
	 *		command.isEnabled; // -> false
	 *		command.clearForceDisabled( 'OtherFeature' );
	 *		command.isEnabled; // -> true
	 *
	 * Multiple disabling with the same identifier is redundant:
	 *
	 *		command.forceDisabled( 'MyFeature' );
	 *		command.forceDisabled( 'MyFeature' );
	 *		command.clearForceDisabled( 'MyFeature' );
	 *		command.isEnabled; // -> true
	 *
	 * **Note:** some commands or algorithms may have more complex logic when it comes to enabling or disabling certain commands,
	 * so the command might be still disabled after {@link #clearForceDisabled} was used.
	 *
	 * @param {String} id Unique identifier for disabling. Use the same id when {@link #clearForceDisabled enabling back} the command.
	 */
	forceDisabled( id ) {
		this._disableStack.add( id );

		if ( this._disableStack.size == 1 ) {
			this.on( 'set:isEnabled', forceDisable$1, { priority: 'highest' } );
			this.isEnabled = false;
		}
	}

	/**
	 * Clears forced disable previously set through {@link #forceDisabled}. See {@link #forceDisabled}.
	 *
	 * @param {String} id Unique identifier, equal to the one passed in {@link #forceDisabled} call.
	 */
	clearForceDisabled( id ) {
		this._disableStack.delete( id );

		if ( this._disableStack.size == 0 ) {
			this.off( 'set:isEnabled', forceDisable$1 );
			this.refresh();
		}
	}

	/**
	 * Executes the command.
	 *
	 * A command may accept parameters. They will be passed from {@link module:core/editor/editor~Editor#execute `editor.execute()`}
	 * to the command.
	 *
	 * The `execute()` method will automatically abort when the command is disabled ({@link #isEnabled} is `false`).
	 * This behavior is implemented by a high priority listener to the {@link #event:execute} event.
	 *
	 * In order to see how to disable a command from "outside" see the {@link #isEnabled} documentation.
	 *
	 * This method may return a value, which would be forwarded all the way down to the
	 * {@link module:core/editor/editor~Editor#execute `editor.execute()`}.
	 *
	 * @fires execute
	 */
	execute() {}

	/**
	 * Destroys the command.
	 */
	destroy() {
		this.stopListening();
	}

	/**
	 * Event fired by the {@link #execute} method. The command action is a listener to this event so it's
	 * possible to change/cancel the behavior of the command by listening to this event.
	 *
	 * See {@link module:utils/observablemixin~ObservableMixin#decorate} for more information and samples.
	 *
	 * **Note:** This event is fired even if command is disabled. However, it is automatically blocked
	 * by a high priority listener in order to prevent command execution.
	 *
	 * @event execute
	 */
}

mix( Command, ObservableMixin );

// Helper function that forces command to be disabled.
function forceDisable$1( evt ) {
	evt.return = false;
	evt.stop();
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Information about a DOM event in context of the {@link module:engine/view/document~Document}.
 * It wraps the native event, which usually should not be used as the wrapper contains
 * additional data (like key code for keyboard events).
 */
class DomEventData {
	/**
	 * @param {module:engine/view/view~View} view The instance of the view controller.
	 * @param {Event} domEvent The DOM event.
	 * @param {Object} [additionalData] Additional properties that the instance should contain.
	 */
	constructor( view, domEvent, additionalData ) {
		/**
		 * Instance of the view controller.
		 *
		 * @readonly
		 * @member {module:engine/view/view~View} module:engine/view/observer/observer~Observer.DomEvent#view
		 */
		this.view = view;

		/**
		 * The instance of the document.
		 *
		 * @readonly
		 * @member {module:engine/view/document~Document} module:engine/view/observer/observer~Observer.DomEvent#document
		 */
		this.document = view.document;

		/**
		 * The DOM event.
		 *
		 * @readonly
		 * @member {Event} module:engine/view/observer/observer~Observer.DomEvent#domEvent
		 */
		this.domEvent = domEvent;

		/**
		 * The DOM target.
		 *
		 * @readonly
		 * @member {HTMLElement} module:engine/view/observer/observer~Observer.DomEvent#target
		 */
		this.domTarget = domEvent.target;

		assignIn( this, additionalData );
	}

	/**
	 * The tree view element representing the target.
	 *
	 * @readonly
	 * @type module:engine/view/element~Element
	 */
	get target() {
		return this.view.domConverter.mapDomToView( this.domTarget );
	}

	/**
	 * Prevents the native's event default action.
	 */
	preventDefault() {
		this.domEvent.preventDefault();
	}

	/**
	 * Stops native event propagation.
	 */
	stopPropagation() {
		this.domEvent.stopPropagation();
	}
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Base class for DOM event observers. This class handles
 * {@link module:engine/view/observer/observer~Observer#observe adding} listeners to DOM elements,
 * {@link module:engine/view/observer/observer~Observer#disable disabling} and
 * {@link module:engine/view/observer/observer~Observer#enable re-enabling} events.
 * Child class needs to define
 * {@link module:engine/view/observer/domeventobserver~DomEventObserver#domEventType DOM event type} and
 * {@link module:engine/view/observer/domeventobserver~DomEventObserver#onDomEvent callback}.
 *
 * For instance:
 *
 *		class ClickObserver extends DomEventObserver {
 *			// It can also be defined as a normal property in the constructor.
 *			get domEventType() {
 *				return 'click';
 *			}
 *
 *			onDomEvent( domEvent ) {
 *				this.fire( 'click', domEvent );
 *			}
 *		}
 *
 * @extends module:engine/view/observer/observer~Observer
 */
class DomEventObserver extends Observer {
	/**
	 * Type of the DOM event the observer should listen to. Array of types can be defined
	 * if the observer should listen to multiple DOM events.
	 *
	 * @readonly
	 * @member {String|Array.<String>} #domEventType
	 */

	/**
	 * Callback which should be called when the DOM event occurred. Note that the callback will not be called if
	 * observer {@link #isEnabled is not enabled}.
	 *
	 * @see #domEventType
	 * @abstract
	 * @method #onDomEvent
	 */

	/**
	 * @inheritDoc
	 */
	constructor( view ) {
		super( view );

		/**
		 * If set to `true` DOM events will be listened on the capturing phase.
		 * Default value is `false`.
		 *
		 * @member {Boolean}
		 */
		this.useCapture = false;
	}

	/**
	 * @inheritDoc
	 */
	observe( domElement ) {
		const types = typeof this.domEventType == 'string' ? [ this.domEventType ] : this.domEventType;

		types.forEach( type => {
			this.listenTo( domElement, type, ( eventInfo, domEvent ) => {
				if ( this.isEnabled && !this.checkShouldIgnoreEventFromTarget( domEvent.target ) ) {
					this.onDomEvent( domEvent );
				}
			}, { useCapture: this.useCapture } );
		} );
	}

	/**
	 * Calls `Document#fire()` if observer {@link #isEnabled is enabled}.
	 *
	 * @see module:utils/emittermixin~EmitterMixin#fire
	 * @param {String} eventType The event type (name).
	 * @param {Event} domEvent The DOM event.
	 * @param {Object} [additionalData] The additional data which should extend the
	 * {@link module:engine/view/observer/domeventdata~DomEventData event data} object.
	 */
	fire( eventType, domEvent, additionalData ) {
		if ( this.isEnabled ) {
			this.document.fire( eventType, new DomEventData( this.view, domEvent, additionalData ) );
		}
	}
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Mouse events observer.
 *
 * Note that this observer is not available by default. To make it available it needs to be added to
 * {@link module:engine/view/view~View} by {@link module:engine/view/view~View#addObserver} method.
 *
 * @extends module:engine/view/observer/domeventobserver~DomEventObserver
 */
class MouseObserver extends DomEventObserver {
	constructor( view ) {
		super( view );

		this.domEventType = 'mousedown';
	}

	onDomEvent( domEvent ) {
		this.fire( domEvent.type, domEvent );
	}
}

/**
 * Fired when mouse button is pressed down on one of the editables.
 *
 * Introduced by {@link module:engine/view/observer/mouseobserver~MouseObserver}.
 *
 * Note that this event is not available by default. To make it available {@link module:engine/view/observer/mouseobserver~MouseObserver}
 * needs to be added to {@link module:engine/view/view~View} by a {@link module:engine/view/view~View#addObserver} method.
 *
 * @see module:engine/view/observer/mouseobserver~MouseObserver
 * @event module:engine/view/document~Document#event:mousedown
 * @param {module:engine/view/observer/domeventdata~DomEventData} data Event data.
 */

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* globals navigator:false */

/**
 * @module utils/env
 */

const userAgent = navigator.userAgent.toLowerCase();

/**
 * A namespace containing environment and browser information.
 *
 * @namespace
 */
const env = {
	/**
	 * Indicates that the application is running on Macintosh.
	 *
	 * @static
	 * @type {Boolean}
	 */
	isMac: isMac( userAgent ),

	/**
	 * Indicates that the application is running in Firefox (Gecko).
	 *
	 * @static
	 * @type {Boolean}
	 */
	isGecko: isGecko( userAgent ),

	/**
	 * Indicates that the application is running in Safari.
	 *
	 * @static
	 * @type {Boolean}
	 */
	isSafari: isSafari( userAgent ),

	/**
	 * Indicates that the application is running on Android mobile device.
	 *
	 * @static
	 * @type {Boolean}
	 */
	isAndroid: isAndroid( userAgent ),

	/**
	 * Indicates that the application is running in a browser using the Blink engine.
	 *
	 * @static
	 * @type {Boolean}
	 */
	isBlink: isBlink( userAgent ),

	/**
	 * Environment features information.
	 *
	 * @memberOf module:utils/env~env
	 * @namespace
	 */
	features: {
		/**
		 * Indicates that the environment supports ES2018 Unicode property escapes — like `\p{P}` or `\p{L}`.
		 * More information about unicode properties might be found
		 * [in Unicode Standard Annex #44](https://www.unicode.org/reports/tr44/#GC_Values_Table).
		 *
		 * @type {Boolean}
		 */
		isRegExpUnicodePropertySupported: isRegExpUnicodePropertySupported()
	}
};

/**
 * Checks if User Agent represented by the string is running on Macintosh.
 *
 * @param {String} userAgent **Lowercase** `navigator.userAgent` string.
 * @returns {Boolean} Whether User Agent is running on Macintosh or not.
 */
function isMac( userAgent ) {
	return userAgent.indexOf( 'macintosh' ) > -1;
}

/**
 * Checks if User Agent represented by the string is Firefox (Gecko).
 *
 * @param {String} userAgent **Lowercase** `navigator.userAgent` string.
 * @returns {Boolean} Whether User Agent is Firefox or not.
 */
function isGecko( userAgent ) {
	return !!userAgent.match( /gecko\/\d+/ );
}

/**
 * Checks if User Agent represented by the string is Safari.
 *
 * @param {String} userAgent **Lowercase** `navigator.userAgent` string.
 * @returns {Boolean} Whether User Agent is Safari or not.
 */
function isSafari( userAgent ) {
	return userAgent.indexOf( ' applewebkit/' ) > -1 && userAgent.indexOf( 'chrome' ) === -1;
}

/**
 * Checks if User Agent represented by the string is Android mobile device.
 *
 * @param {String} userAgent **Lowercase** `navigator.userAgent` string.
 * @returns {Boolean} Whether User Agent is Safari or not.
 */
function isAndroid( userAgent ) {
	return userAgent.indexOf( 'android' ) > -1;
}

/**
 * Checks if User Agent represented by the string is Blink engine.
 *
 * @param {String} userAgent **Lowercase** `navigator.userAgent` string.
 * @returns {Boolean} Whether User Agent is Blink engine or not.
 */
function isBlink( userAgent ) {
	// The Edge browser before switching to the Blink engine used to report itself as Chrome (and "Edge/")
	// but after switching to the Blink it replaced "Edge/" with "Edg/".
	return userAgent.indexOf( 'chrome/' ) > -1 && userAgent.indexOf( 'edge/' ) < 0;
}

/**
 * Checks if the current environment supports ES2018 Unicode properties like `\p{P}` or `\p{L}`.
 * More information about unicode properties might be found
 * [in Unicode Standard Annex #44](https://www.unicode.org/reports/tr44/#GC_Values_Table).
 *
 * @returns {Boolean}
 */
function isRegExpUnicodePropertySupported() {
	let isSupported = false;

	// Feature detection for Unicode properties. Added in ES2018. Currently Firefox does not support it.
	// See https://github.com/ckeditor/ckeditor5-mention/issues/44#issuecomment-487002174.

	try {
		// Usage of regular expression literal cause error during build (ckeditor/ckeditor5-dev#534).
		isSupported = 'ć'.search( new RegExp( '[\\p{L}]', 'u' ) ) === 0;
	} catch ( error ) {
		// Firefox throws a SyntaxError when the group is unsupported.
	}

	return isSupported;
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

const macGlyphsToModifiers = {
	'⌘': 'ctrl',
	'⇧': 'shift',
	'⌥': 'alt'
};

const modifiersToMacGlyphs = {
	'ctrl': '⌘',
	'shift': '⇧',
	'alt': '⌥'
};

/**
 * Object with `keyName => keyCode` pairs for a set of known keys.
 *
 * Contains:
 *
 * * `a-z`,
 * * `0-9`,
 * * `f1-f12`,
 * * `arrow(left|up|right|bottom)`,
 * * `backspace`, `delete`, `enter`, `esc`, `tab`,
 * * `ctrl`, `cmd`, `shift`, `alt`.
 */
const keyCodes = generateKnownKeyCodes();

/**
 * Converts a key name or a {@link module:utils/keyboard~KeystrokeInfo keystroke info} into a key code.
 *
 * Note: Key names are matched with {@link module:utils/keyboard~keyCodes} in a case-insensitive way.
 *
 * @param {String|module:utils/keyboard~KeystrokeInfo} Key name (see {@link module:utils/keyboard~keyCodes})
 * or a keystroke data object.
 * @returns {Number} Key or keystroke code.
 */
function getCode( key ) {
	let keyCode;

	if ( typeof key == 'string' ) {
		keyCode = keyCodes[ key.toLowerCase() ];

		if ( !keyCode ) {
			/**
			 * Unknown key name. Only key names contained by the {@link module:utils/keyboard~keyCodes} can be used.
			 *
			 * @error keyboard-unknown-key
			 * @param {String} key
			 */
			throw new CKEditorError( 'keyboard-unknown-key', null, { key } );
		}
	} else {
		keyCode = key.keyCode +
			( key.altKey ? keyCodes.alt : 0 ) +
			( key.ctrlKey ? keyCodes.ctrl : 0 ) +
			( key.shiftKey ? keyCodes.shift : 0 );
	}

	return keyCode;
}

/**
 * Parses keystroke and returns a keystroke code that will match the code returned by
 * link {@link module:utils/keyboard~getCode} for a corresponding {@link module:utils/keyboard~KeystrokeInfo keystroke info}.
 *
 * The keystroke can be passed in two formats:
 *
 * * as a single string – e.g. `ctrl + A`,
 * * as an array of {@link module:utils/keyboard~keyCodes known key names} and key codes – e.g.:
 *   * `[ 'ctrl', 32 ]` (ctrl + space),
 *   * `[ 'ctrl', 'a' ]` (ctrl + A).
 *
 * Note: Key names are matched with {@link module:utils/keyboard~keyCodes} in a case-insensitive way.
 *
 * Note: Only keystrokes with a single non-modifier key are supported (e.g. `ctrl+A` is OK, but `ctrl+A+B` is not).
 *
 * @param {String|Array.<Number|String>} keystroke Keystroke definition.
 * @returns {Number} Keystroke code.
 */
function parseKeystroke( keystroke ) {
	if ( typeof keystroke == 'string' ) {
		keystroke = splitKeystrokeText( keystroke );
	}

	return keystroke
		.map( key => ( typeof key == 'string' ) ? getCode( key ) : key )
		.reduce( ( key, sum ) => sum + key, 0 );
}

/**
 * It translates any keystroke string text like `"CTRL+A"` to an
 * environment–specific keystroke, i.e. `"⌘A"` on Mac OSX.
 *
 * @param {String} keystroke Keystroke text.
 * @returns {String} Keystroke text specific for the environment.
 */
function getEnvKeystrokeText( keystroke ) {
	if ( !env.isMac ) {
		return keystroke;
	}

	return splitKeystrokeText( keystroke )
		// Replace modifiers (e.g. "ctrl") with Mac glyphs (e.g. "⌘") first.
		.map( key => modifiersToMacGlyphs[ key.toLowerCase() ] || key )

		// Decide whether to put "+" between keys in the keystroke or not.
		.reduce( ( value, key ) => {
			if ( value.slice( -1 ) in macGlyphsToModifiers ) {
				return value + key;
			} else {
				return value + '+' + key;
			}
		} );
}

/**
 * Returns `true` if the provided key code represents one of the arrow keys.
 *
 * @param {Number} keyCode A key code as in {@link module:utils/keyboard~KeystrokeInfo#keyCode}.
 * @returns {Boolean}
 */
function isArrowKeyCode( keyCode ) {
	return keyCode == keyCodes.arrowright ||
		keyCode == keyCodes.arrowleft ||
		keyCode == keyCodes.arrowup ||
		keyCode == keyCodes.arrowdown;
}

/**
 * Returns the direction in which the {@link module:engine/model/documentselection~DocumentSelection selection}
 * will move when a provided arrow key code is pressed considering the language direction of the editor content.
 *
 * For instance, in right–to–left (RTL) content languages, pressing the left arrow means moving selection right (forward)
 * in the model structure. Similarly, pressing the right arrow moves the selection left (backward).
 *
 * @param {Number} keyCode A key code as in {@link module:utils/keyboard~KeystrokeInfo#keyCode}.
 * @param {'ltr'|'rtl'} contentLanguageDirection The content language direction, corresponding to
 * {@link module:utils/locale~Locale#contentLanguageDirection}.
 * @returns {'left'|'up'|'right'|'down'} Localized arrow direction.
 */
function getLocalizedArrowKeyCodeDirection( keyCode, contentLanguageDirection ) {
	const isLtrContent = contentLanguageDirection === 'ltr';

	switch ( keyCode ) {
		case keyCodes.arrowleft:
			return isLtrContent ? 'left' : 'right';

		case keyCodes.arrowright:
			return isLtrContent ? 'right' : 'left';

		case keyCodes.arrowup:
			return 'up';

		case keyCodes.arrowdown:
			return 'down';
	}
}

/**
 * Determines if the provided key code moves the {@link module:engine/model/documentselection~DocumentSelection selection}
 * forward or backward considering the language direction of the editor content.
 *
 * For instance, in right–to–left (RTL) languages, pressing the left arrow means moving forward
 * in the model structure. Similarly, pressing the right arrow moves the selection backward.
 *
 * @param {Number} keyCode A key code as in {@link module:utils/keyboard~KeystrokeInfo#keyCode}.
 * @param {'ltr'|'rtl'} contentLanguageDirection The content language direction, corresponding to
 * {@link module:utils/locale~Locale#contentLanguageDirection}.
 * @returns {Boolean}
 */
function isForwardArrowKeyCode( keyCode, contentLanguageDirection ) {
	const localizedKeyCodeDirection = getLocalizedArrowKeyCodeDirection( keyCode, contentLanguageDirection );

	return localizedKeyCodeDirection === 'down' || localizedKeyCodeDirection === 'right';
}

function generateKnownKeyCodes() {
	const keyCodes = {
		arrowleft: 37,
		arrowup: 38,
		arrowright: 39,
		arrowdown: 40,
		backspace: 8,
		delete: 46,
		enter: 13,
		space: 32,
		esc: 27,
		tab: 9,

		// The idea about these numbers is that they do not collide with any real key codes, so we can use them
		// like bit masks.
		ctrl: 0x110000,
		// Has the same code as ctrl, because their behaviour should be unified across the editor.
		// See http://ckeditor.github.io/editor-recommendations/general-policies#ctrl-vs-cmd
		cmd: 0x110000,
		shift: 0x220000,
		alt: 0x440000
	};

	// a-z
	for ( let code = 65; code <= 90; code++ ) {
		const letter = String.fromCharCode( code );

		keyCodes[ letter.toLowerCase() ] = code;
	}

	// 0-9
	for ( let code = 48; code <= 57; code++ ) {
		keyCodes[ code - 48 ] = code;
	}

	// F1-F12
	for ( let code = 112; code <= 123; code++ ) {
		keyCodes[ 'f' + ( code - 111 ) ] = code;
	}

	return keyCodes;
}

function splitKeystrokeText( keystroke ) {
	return keystroke.split( /\s*\+\s*/ );
}

/**
 * Information about a keystroke.
 *
 * @interface module:utils/keyboard~KeystrokeInfo
 */

/**
 * The [key code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode).
 *
 * @member {Number} module:utils/keyboard~KeystrokeInfo#keyCode
 */

/**
 * Whether the <kbd>Alt</kbd> modifier was pressed.
 *
 * @member {Bolean} module:utils/keyboard~KeystrokeInfo#altKey
 */

/**
 * Whether the <kbd>Ctrl</kbd> or <kbd>Cmd</kbd> modifier was pressed.
 *
 * @member {Bolean} module:utils/keyboard~KeystrokeInfo#ctrlKey
 */

/**
 * Whether the <kbd>Shift</kbd> modifier was pressed.
 *
 * @member {Bolean} module:utils/keyboard~KeystrokeInfo#shiftKey
 */

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * The tooltip view class.
 *
 * @extends module:ui/view~View
 */
class TooltipView extends View {
	/**
	 * @inheritDoc
	 */
	constructor( locale ) {
		super( locale );

		/**
		 * The text of the tooltip visible to the user.
		 *
		 * @observable
		 * @member {String} #text
		 */
		this.set( 'text', '' );

		/**
		 * The position of the tooltip (south, south-west, south-east, or north).
		 *
		 *		+-----------+
		 *		|   north   |
		 *		+-----------+
		 *		      V
		 *		  [element]
		 *
		 *		  [element]
		 *		      ^
		 *		+-----------+
		 *		|   south   |
		 *		+-----------+
		 *
		 *                +----------+
		 *    [element] < |   east   |
		 *                +----------+
		 *
		 *    +----------+
		 *    |   west   | > [element]
		 *    +----------+
		 *
		 *		         [element]
		 *		             ^
		 *		+--------------+
		 *		|  south west  |
		 *		+--------------+
		 *
		 *	  [element]
		 *		  ^
		 *		+--------------+
		 *		|  south east  |
		 *		+--------------+

		 * @observable
		 * @default 's'
		 * @member {'s'|'n'|'e'|'w'|'sw'|'se'} #position
		 */
		this.set( 'position', 's' );

		const bind = this.bindTemplate;

		this.setTemplate( {
			tag: 'span',
			attributes: {
				class: [
					'ck',
					'ck-tooltip',
					bind.to( 'position', position => 'ck-tooltip_' + position ),
					bind.if( 'text', 'ck-hidden', value => !value.trim() )
				]
			},
			children: [
				{
					tag: 'span',

					attributes: {
						class: [
							'ck',
							'ck-tooltip__text'
						]
					},

					children: [
						{
							text: bind.to( 'text' )
						}
					]
				}
			]
		} );
	}
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * The button view class.
 *
 *		const view = new ButtonView();
 *
 *		view.set( {
 *			label: 'A button',
 *			keystroke: 'Ctrl+B',
 *			tooltip: true,
 *			withText: true
 *		} );
 *
 *		view.render();
 *
 *		document.body.append( view.element );
 *
 * @extends module:ui/view~View
 * @implements module:ui/button/button~Button
 */
class ButtonView extends View {
	/**
	 * @inheritDoc
	 */
	constructor( locale ) {
		super( locale );

		const bind = this.bindTemplate;
		const ariaLabelUid = uid();

		// Implement the Button interface.
		this.set( 'class' );
		this.set( 'labelStyle' );
		this.set( 'icon' );
		this.set( 'isEnabled', true );
		this.set( 'isOn', false );
		this.set( 'isVisible', true );
		this.set( 'isToggleable', false );
		this.set( 'keystroke' );
		this.set( 'label' );
		this.set( 'tabindex', -1 );
		this.set( 'tooltip' );
		this.set( 'tooltipPosition', 's' );
		this.set( 'type', 'button' );
		this.set( 'withText', false );
		this.set( 'withKeystroke', false );

		/**
		 * Collection of the child views inside of the button {@link #element}.
		 *
		 * @readonly
		 * @member {module:ui/viewcollection~ViewCollection}
		 */
		this.children = this.createCollection();

		/**
		 * Tooltip of the button view. It is configurable using the {@link #tooltip tooltip attribute}.
		 *
		 * @readonly
		 * @member {module:ui/tooltip/tooltipview~TooltipView} #tooltipView
		 */
		this.tooltipView = this._createTooltipView();

		/**
		 * Label of the button view. It is configurable using the {@link #label label attribute}.
		 *
		 * @readonly
		 * @member {module:ui/view~View} #labelView
		 */
		this.labelView = this._createLabelView( ariaLabelUid );

		/**
		 * The icon view of the button. Will be added to {@link #children} when the
		 * {@link #icon icon attribute} is defined.
		 *
		 * @readonly
		 * @member {module:ui/icon/iconview~IconView} #iconView
		 */
		this.iconView = new IconView();

		this.iconView.extendTemplate( {
			attributes: {
				class: 'ck-button__icon'
			}
		} );

		/**
		 * A view displaying the keystroke of the button next to the {@link #labelView label}.
		 * Added to {@link #children} when the {@link #withKeystroke `withKeystroke` attribute}
		 * is defined.
		 *
		 * @readonly
		 * @member {module:ui/view/view~View} #keystrokeView
		 */
		this.keystrokeView = this._createKeystrokeView();

		/**
		 * Tooltip of the button bound to the template.
		 *
		 * @see #tooltip
		 * @see #_getTooltipString
		 * @private
		 * @observable
		 * @member {Boolean} #_tooltipString
		 */
		this.bind( '_tooltipString' ).to(
			this, 'tooltip',
			this, 'label',
			this, 'keystroke',
			this._getTooltipString.bind( this )
		);

		this.setTemplate( {
			tag: 'button',

			attributes: {
				class: [
					'ck',
					'ck-button',
					bind.to( 'class' ),
					bind.if( 'isEnabled', 'ck-disabled', value => !value ),
					bind.if( 'isVisible', 'ck-hidden', value => !value ),
					bind.to( 'isOn', value => value ? 'ck-on' : 'ck-off' ),
					bind.if( 'withText', 'ck-button_with-text' ),
					bind.if( 'withKeystroke', 'ck-button_with-keystroke' )
				],
				type: bind.to( 'type', value => value ? value : 'button' ),
				tabindex: bind.to( 'tabindex' ),
				'aria-labelledby': `ck-editor__aria-label_${ ariaLabelUid }`,
				'aria-disabled': bind.if( 'isEnabled', true, value => !value ),
				'aria-pressed': bind.to( 'isOn', value => this.isToggleable ? String( value ) : false )
			},

			children: this.children,

			on: {
				mousedown: bind.to( evt => {
					evt.preventDefault();
				} ),

				click: bind.to( evt => {
					// We can't make the button disabled using the disabled attribute, because it won't be focusable.
					// Though, shouldn't this condition be moved to the button controller?
					if ( this.isEnabled ) {
						this.fire( 'execute' );
					} else {
						// Prevent the default when button is disabled, to block e.g.
						// automatic form submitting. See ckeditor/ckeditor5-link#74.
						evt.preventDefault();
					}
				} )
			}
		} );
	}

	/**
	 * @inheritDoc
	 */
	render() {
		super.render();

		if ( this.icon ) {
			this.iconView.bind( 'content' ).to( this, 'icon' );
			this.children.add( this.iconView );
		}

		this.children.add( this.tooltipView );
		this.children.add( this.labelView );

		if ( this.withKeystroke ) {
			this.children.add( this.keystrokeView );
		}
	}

	/**
	 * Focuses the {@link #element} of the button.
	 */
	focus() {
		this.element.focus();
	}

	/**
	 * Creates a {@link module:ui/tooltip/tooltipview~TooltipView} instance and binds it with button
	 * attributes.
	 *
	 * @private
	 * @returns {module:ui/tooltip/tooltipview~TooltipView}
	 */
	_createTooltipView() {
		const tooltipView = new TooltipView();

		tooltipView.bind( 'text' ).to( this, '_tooltipString' );
		tooltipView.bind( 'position' ).to( this, 'tooltipPosition' );

		return tooltipView;
	}

	/**
	 * Creates a label view instance and binds it with button attributes.
	 *
	 * @private
	 * @param {String} ariaLabelUid The aria label UID.
	 * @returns {module:ui/view~View}
	 */
	_createLabelView( ariaLabelUid ) {
		const labelView = new View();
		const bind = this.bindTemplate;

		labelView.setTemplate( {
			tag: 'span',

			attributes: {
				class: [
					'ck',
					'ck-button__label'
				],
				style: bind.to( 'labelStyle' ),
				id: `ck-editor__aria-label_${ ariaLabelUid }`
			},

			children: [
				{
					text: this.bindTemplate.to( 'label' )
				}
			]
		} );

		return labelView;
	}

	/**
	 * Creates a view that displays a keystroke next to a {@link #labelView label }
	 * and binds it with button attributes.
	 *
	 * @private
	 * @returns {module:ui/view~View}
	 */
	_createKeystrokeView() {
		const keystrokeView = new View();

		keystrokeView.setTemplate( {
			tag: 'span',

			attributes: {
				class: [
					'ck',
					'ck-button__keystroke'
				]
			},

			children: [
				{
					text: this.bindTemplate.to( 'keystroke', text => getEnvKeystrokeText( text ) )
				}
			]
		} );

		return keystrokeView;
	}

	/**
	 * Gets the text for the {@link #tooltipView} from the combination of
	 * {@link #tooltip}, {@link #label} and {@link #keystroke} attributes.
	 *
	 * @private
	 * @see #tooltip
	 * @see #_tooltipString
	 * @param {Boolean|String|Function} tooltip Button tooltip.
	 * @param {String} label Button label.
	 * @param {String} keystroke Button keystroke.
	 * @returns {String}
	 */
	_getTooltipString( tooltip, label, keystroke ) {
		if ( tooltip ) {
			if ( typeof tooltip == 'string' ) {
				return tooltip;
			} else {
				if ( keystroke ) {
					keystroke = getEnvKeystrokeText( keystroke );
				}

				if ( tooltip instanceof Function ) {
					return tooltip( label, keystroke );
				} else {
					return `${ label }${ keystroke ? ` (${ keystroke })` : '' }`;
				}
			}
		}

		return '';
	}
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module ui/bindings/clickoutsidehandler
 */

/* global document */

/**
 * Handles clicking **outside** of a specified set of elements, then fires an action.
 *
 * **Note**: Actually, the action is executed upon `mousedown`, not `click`. It prevents
 * certain issues when the user keeps holding the mouse button and the UI cannot react
 * properly.
 *
 * @param {Object} options Configuration options.
 * @param {module:utils/dom/emittermixin~Emitter} options.emitter The emitter to which this behavior
 * should be added.
 * @param {Function} options.activator Function returning a `Boolean`, to determine whether the handler is active.
 * @param {Array.<HTMLElement>} options.contextElements HTML elements that determine the scope of the
 * handler. Clicking any of them or their descendants will **not** fire the callback.
 * @param {Function} options.callback An action executed by the handler.
 */
function clickOutsideHandler( { emitter, activator, callback, contextElements } ) {
	emitter.listenTo( document, 'mousedown', ( evt, domEvt ) => {
		if ( !activator() ) {
			return;
		}

		// Check if `composedPath` is `undefined` in case the browser does not support native shadow DOM.
		// Can be removed when all supported browsers support native shadow DOM.
		const path = typeof domEvt.composedPath == 'function' ? domEvt.composedPath() : [];

		for ( const contextElement of contextElements ) {
			if ( contextElement.contains( domEvt.target ) || path.includes( contextElement ) ) {
				return;
			}
		}

		callback();
	} );
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Allows observing a group of `HTMLElement`s whether at least one of them is focused.
 *
 * Used by the {@link module:core/editor/editor~Editor} in order to track whether the focus is still within the application,
 * or were used outside of its UI.
 *
 * **Note** `focus` and `blur` listeners use event capturing, so it is only needed to register wrapper `HTMLElement`
 * which contain other `focusable` elements. But note that this wrapper element has to be focusable too
 * (have e.g. `tabindex="-1"`).
 *
 * Check out the {@glink framework/guides/deep-dive/ui/focus-tracking "Deep dive into focus tracking" guide} to learn more.
 *
 * @mixes module:utils/dom/emittermixin~EmitterMixin
 * @mixes module:utils/observablemixin~ObservableMixin
 */
class FocusTracker {
	constructor() {
		/**
		 * True when one of the registered elements is focused.
		 *
		 * @readonly
		 * @observable
		 * @member {Boolean} #isFocused
		 */
		this.set( 'isFocused', false );

		/**
		 * The currently focused element.
		 *
		 * While {@link #isFocused `isFocused`} remains `true`, the focus can
		 * move between different UI elements. This property tracks those
		 * elements and tells which one is currently focused.
		 *
		 * @readonly
		 * @observable
		 * @member {HTMLElement|null} #focusedElement
		 */
		this.set( 'focusedElement', null );

		/**
		 * List of registered elements.
		 *
		 * @private
		 * @member {Set.<HTMLElement>}
		 */
		this._elements = new Set();

		/**
		 * Event loop timeout.
		 *
		 * @private
		 * @member {Number}
		 */
		this._nextEventLoopTimeout = null;
	}

	/**
	 * Starts tracking the specified element.
	 *
	 * @param {HTMLElement} element
	 */
	add( element ) {
		if ( this._elements.has( element ) ) {
			/**
			 * This element is already tracked by {@link module:utils/focustracker~FocusTracker}.
			 *
			 * @error focustracker-add-element-already-exist
			 */
			throw new CKEditorError( 'focustracker-add-element-already-exist', this );
		}

		this.listenTo( element, 'focus', () => this._focus( element ), { useCapture: true } );
		this.listenTo( element, 'blur', () => this._blur(), { useCapture: true } );
		this._elements.add( element );
	}

	/**
	 * Stops tracking the specified element and stops listening on this element.
	 *
	 * @param {HTMLElement} element
	 */
	remove( element ) {
		if ( element === this.focusedElement ) {
			this._blur( element );
		}

		if ( this._elements.has( element ) ) {
			this.stopListening( element );
			this._elements.delete( element );
		}
	}

	/**
	 * Destroys the focus tracker by:
	 * - Disabling all event listeners attached to tracked elements.
	 * - Removing all tracked elements that were previously added.
	 */
	destroy() {
		this.stopListening();
	}

	/**
	 * Stores currently focused element and set {#isFocused} as `true`.
	 *
	 * @private
	 * @param {HTMLElement} element Element which has been focused.
	 */
	_focus( element ) {
		clearTimeout( this._nextEventLoopTimeout );

		this.focusedElement = element;
		this.isFocused = true;
	}

	/**
	 * Clears currently focused element and set {@link #isFocused} as `false`.
	 * This method uses `setTimeout` to change order of fires `blur` and `focus` events.
	 *
	 * @private
	 * @fires blur
	 */
	_blur() {
		clearTimeout( this._nextEventLoopTimeout );

		this._nextEventLoopTimeout = setTimeout( () => {
			this.focusedElement = null;
			this.isFocused = false;
		}, 0 );
	}

	/**
	 * @event focus
	 */

	/**
	 * @event blur
	 */
}

mix( FocusTracker, DomEmitterMixin );
mix( FocusTracker, ObservableMixin );

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Keystroke handler allows registering callbacks for given keystrokes.
 *
 * The most frequent use of this class is through the {@link module:core/editor/editor~Editor#keystrokes `editor.keystrokes`}
 * property. It allows listening to keystrokes executed in the editing view:
 *
 *		editor.keystrokes.set( 'Ctrl+A', ( keyEvtData, cancel ) => {
 *			console.log( 'Ctrl+A has been pressed' );
 *			cancel();
 *		} );
 *
 * However, this utility class can be used in various part of the UI. For instance, a certain {@link module:ui/view~View}
 * can use it like this:
 *
 *		class MyView extends View {
 *			constructor() {
 *				this.keystrokes = new KeystrokeHandler();
 *
 * 				this.keystrokes.set( 'tab', handleTabKey );
 *			}
 *
 *			render() {
 *				super.render();
 *
 *				this.keystrokes.listenTo( this.element );
 *			}
 *		}
 *
 * That keystroke handler will listen to `keydown` events fired in this view's main element.
 *
 */
class KeystrokeHandler {
	/**
	 * Creates an instance of the keystroke handler.
	 */
	constructor() {
		/**
		 * Listener used to listen to events for easier keystroke handler destruction.
		 *
		 * @protected
		 * @member {module:utils/dom/emittermixin~Emitter}
		 */
		this._listener = Object.create( DomEmitterMixin );
	}

	/**
	 * Starts listening for `keydown` events from a given emitter.
	 *
	 * @param {module:utils/emittermixin~Emitter} emitter
	 */
	listenTo( emitter ) {
		// The #_listener works here as a kind of dispatcher. It groups the events coming from the same
		// keystroke so the listeners can be attached to them with different priorities.
		//
		// E.g. all the keystrokes with the `keyCode` of 42 coming from the `emitter` are propagated
		// as a `_keydown:42` event by the `_listener`. If there's a callback created by the `set`
		// method for this 42 keystroke, it listens to the `_listener#_keydown:42` event only and interacts
		// only with other listeners of this particular event, thus making it possible to prioritize
		// the listeners and safely cancel execution, when needed. Instead of duplicating the Emitter logic,
		// the KeystrokeHandler re–uses it to do its job.
		this._listener.listenTo( emitter, 'keydown', ( evt, keyEvtData ) => {
			this._listener.fire( '_keydown:' + getCode( keyEvtData ), keyEvtData );
		} );
	}

	/**
	 * Registers a handler for the specified keystroke.
	 *
	 * @param {String|Array.<String|Number>} keystroke Keystroke defined in a format accepted by
	 * the {@link module:utils/keyboard~parseKeystroke} function.
	 * @param {Function} callback A function called with the
	 * {@link module:engine/view/observer/keyobserver~KeyEventData key event data} object and
	 * a helper funcion to call both `preventDefault()` and `stopPropagation()` on the underlying event.
	 * @param {Object} [options={}] Additional options.
	 * @param {module:utils/priorities~PriorityString|Number} [options.priority='normal'] The priority of the keystroke
	 * callback. The higher the priority value the sooner the callback will be executed. Keystrokes having the same priority
	 * are called in the order they were added.
	 */
	set( keystroke, callback, options = {} ) {
		const keyCode = parseKeystroke( keystroke );
		const priority = options.priority;

		// Execute the passed callback on KeystrokeHandler#_keydown.
		// TODO: https://github.com/ckeditor/ckeditor5-utils/issues/144
		this._listener.listenTo( this._listener, '_keydown:' + keyCode, ( evt, keyEvtData ) => {
			callback( keyEvtData, () => {
				// Stop the event in the DOM: no listener in the web page
				// will be triggered by this event.
				keyEvtData.preventDefault();
				keyEvtData.stopPropagation();

				// Stop the event in the KeystrokeHandler: no more callbacks
				// will be executed for this keystroke.
				evt.stop();
			} );

			// Mark this keystroke as handled by the callback. See: #press.
			evt.return = true;
		}, { priority } );
	}

	/**
	 * Triggers a keystroke handler for a specified key combination, if such a keystroke was {@link #set defined}.
	 *
	 * @param {module:engine/view/observer/keyobserver~KeyEventData} keyEvtData Key event data.
	 * @returns {Boolean} Whether the keystroke was handled.
	 */
	press( keyEvtData ) {
		return !!this._listener.fire( '_keydown:' + getCode( keyEvtData ), keyEvtData );
	}

	/**
	 * Destroys the keystroke handler.
	 */
	destroy() {
		this._listener.stopListening();
	}
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * The dropdown view class. It manages the dropdown button and dropdown panel.
 *
 * In most cases, the easiest way to create a dropdown is by using the {@link module:ui/dropdown/utils~createDropdown}
 * util:
 *
 *		const dropdown = createDropdown( locale );
 *
 *		// Configure dropdown's button properties:
 *		dropdown.buttonView.set( {
 *			label: 'A dropdown',
 *			withText: true
 *		} );
 *
 *		dropdown.render();
 *
 *		dropdown.panelView.element.textContent = 'Content of the panel';
 *
 *		// Will render a dropdown with a panel containing a "Content of the panel" text.
 *		document.body.appendChild( dropdown.element );
 *
 * If you want to add a richer content to the dropdown panel, you can use the {@link module:ui/dropdown/utils~addListToDropdown}
 * and {@link module:ui/dropdown/utils~addToolbarToDropdown} helpers. See more examples in
 * {@link module:ui/dropdown/utils~createDropdown} documentation.
 *
 * If you want to create a completely custom dropdown, then you can compose it manually:
 *
 *		const button = new DropdownButtonView( locale );
 *		const panel = new DropdownPanelView( locale );
 *		const dropdown = new DropdownView( locale, button, panel );
 *
 *		button.set( {
 *			label: 'A dropdown',
 *			withText: true
 *		} );
 *
 *		dropdown.render();
 *
 *		panel.element.textContent = 'Content of the panel';
 *
 *		// Will render a dropdown with a panel containing a "Content of the panel" text.
 *		document.body.appendChild( dropdown.element );
 *
 * However, dropdown created this way will contain little behavior. You will need to implement handlers for actions
 * such as {@link module:ui/bindings/clickoutsidehandler~clickOutsideHandler clicking outside an open dropdown}
 * (which should close it) and support for arrow keys inside the panel. Therefore, unless you really know what
 * you do and you really need to do it, it is recommended to use the {@link module:ui/dropdown/utils~createDropdown} helper.
 *
 * @extends module:ui/view~View
 */
class DropdownView extends View {
	/**
	 * Creates an instance of the dropdown.
	 *
	 * Also see {@link #render}.
	 *
	 * @param {module:utils/locale~Locale} [locale] The localization services instance.
	 * @param {module:ui/dropdown/button/dropdownbutton~DropdownButton} buttonView
	 * @param {module:ui/dropdown/dropdownpanelview~DropdownPanelView} panelView
	 */
	constructor( locale, buttonView, panelView ) {
		super( locale );

		const bind = this.bindTemplate;

		/**
		 * Button of the dropdown view. Clicking the button opens the {@link #panelView}.
		 *
		 * @readonly
		 * @member {module:ui/button/buttonview~ButtonView} #buttonView
		 */
		this.buttonView = buttonView;

		/**
		 * Panel of the dropdown. It opens when the {@link #buttonView} is
		 * {@link module:ui/button/buttonview~ButtonView#event:execute executed} (i.e. clicked).
		 *
		 * Child views can be added to the panel's `children` collection:
		 *
		 *		dropdown.panelView.children.add( childView );
		 *
		 * See {@link module:ui/dropdown/dropdownpanelview~DropdownPanelView#children} and
		 * {@link module:ui/viewcollection~ViewCollection#add}.
		 *
		 * @readonly
		 * @member {module:ui/dropdown/dropdownpanelview~DropdownPanelView} #panelView
		 */
		this.panelView = panelView;

		/**
		 * Controls whether the dropdown view is open, i.e. shows or hides the {@link #panelView panel}.
		 *
		 * @observable
		 * @member {Boolean} #isOpen
		 */
		this.set( 'isOpen', false );

		/**
		 * Controls whether the dropdown is enabled, i.e. it can be clicked and execute an action.
		 *
		 * See {@link module:ui/button/buttonview~ButtonView#isEnabled}.
		 *
		 * @observable
		 * @member {Boolean} #isEnabled
		 */
		this.set( 'isEnabled', true );

		/**
		 * (Optional) The additional CSS class set on the dropdown {@link #element}.
		 *
		 * @observable
		 * @member {String} #class
		 */
		this.set( 'class' );

		/**
		 * (Optional) The `id` attribute of the dropdown (i.e. to pair with a `<label>` element).
		 *
		 * @observable
		 * @member {String} #id
		 */
		this.set( 'id' );

		/**
		 * The position of the panel, relative to the dropdown.
		 *
		 * **Note**: When `'auto'`, the panel will use one of the remaining positions to stay
		 * in the viewport, visible to the user. The positions correspond directly to
		 * {@link module:ui/dropdown/dropdownview~DropdownView.defaultPanelPositions default panel positions}.
		 *
		 * **Note**: This value has an impact on the
		 * {@link module:ui/dropdown/dropdownpanelview~DropdownPanelView#position} property
		 * each time the panel becomes {@link #isOpen open}.
		 *
		 * @observable
		 * @default 'auto'
		 * @member {'auto'|'s'|'se'|'sw'|'sme'|'smw'|'n'|'ne'|'nw'|'nme'|'nmw'} #panelPosition
		 */
		this.set( 'panelPosition', 'auto' );

		/**
		 * Instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}. It manages
		 * keystrokes of the dropdown:
		 *
		 * * <kbd>▼</kbd> opens the dropdown,
		 * * <kbd>◀</kbd> and <kbd>Esc</kbd> closes the dropdown.
		 *
		 * @readonly
		 * @member {module:utils/keystrokehandler~KeystrokeHandler}
		 */
		this.keystrokes = new KeystrokeHandler();

		this.setTemplate( {
			tag: 'div',

			attributes: {
				class: [
					'ck',
					'ck-dropdown',
					bind.to( 'class' ),
					bind.if( 'isEnabled', 'ck-disabled', value => !value )
				],
				id: bind.to( 'id' ),
				'aria-describedby': bind.to( 'ariaDescribedById' )
			},

			children: [
				buttonView,
				panelView
			]
		} );

		buttonView.extendTemplate( {
			attributes: {
				class: [
					'ck-dropdown__button'
				]
			}
		} );

		/**
		 * A child {@link module:ui/list/listview~ListView list view} of the dropdown located
		 * in its {@link module:ui/dropdown/dropdownview~DropdownView#panelView panel}.
		 *
		 * **Note**: Only supported when dropdown has list view added using {@link module:ui/dropdown/utils~addListToDropdown}.
		 *
		 * @readonly
		 * @member {module:ui/list/listview~ListView} #listView
		 */

		/**
		 * A child toolbar of the dropdown located in the
		 * {@link module:ui/dropdown/dropdownview~DropdownView#panelView panel}.
		 *
		 * **Note**: Only supported when dropdown has list view added using {@link module:ui/dropdown/utils~addToolbarToDropdown}.
		 *
		 * @readonly
		 * @member {module:ui/toolbar/toolbarview~ToolbarView} #toolbarView
		 */

		/**
		 * Fired when the toolbar button or list item is executed.
		 *
		 * For {@link #listView} It fires when a child of some {@link module:ui/list/listitemview~ListItemView}
		 * fired `execute`.
		 *
		 * For {@link #toolbarView} It fires when one of the buttons has been
		 * {@link module:ui/button/buttonview~ButtonView#event:execute executed}.
		 *
		 * **Note**: Only supported when dropdown has list view added using {@link module:ui/dropdown/utils~addListToDropdown}
		 * or {@link module:ui/dropdown/utils~addToolbarToDropdown}.
		 *
		 * @event execute
		 */
	}

	/**
	 * @inheritDoc
	 */
	render() {
		super.render();

		// Toggle the dropdown when its button has been clicked.
		this.listenTo( this.buttonView, 'open', () => {
			this.isOpen = !this.isOpen;
		} );

		// Toggle the visibility of the panel when the dropdown becomes open.
		this.panelView.bind( 'isVisible' ).to( this, 'isOpen' );

		// Let the dropdown control the position of the panel. The position must
		// be updated every time the dropdown is open.
		this.on( 'change:isOpen', () => {
			if ( !this.isOpen ) {
				return;
			}

			// If "auto", find the best position of the panel to fit into the viewport.
			// Otherwise, simply assign the static position.
			if ( this.panelPosition === 'auto' ) {
				this.panelView.position = DropdownView._getOptimalPosition( {
					element: this.panelView.element,
					target: this.buttonView.element,
					fitInViewport: true,
					positions: this._panelPositions
				} ).name;
			} else {
				this.panelView.position = this.panelPosition;
			}
		} );

		// Listen for keystrokes coming from within #element.
		this.keystrokes.listenTo( this.element );

		const closeDropdown = ( data, cancel ) => {
			if ( this.isOpen ) {
				this.buttonView.focus();
				this.isOpen = false;
				cancel();
			}
		};

		// Open the dropdown panel using the arrow down key, just like with return or space.
		this.keystrokes.set( 'arrowdown', ( data, cancel ) => {
			// Don't open if the dropdown is disabled or already open.
			if ( this.buttonView.isEnabled && !this.isOpen ) {
				this.isOpen = true;
				cancel();
			}
		} );

		// Block the right arrow key (until nested dropdowns are implemented).
		this.keystrokes.set( 'arrowright', ( data, cancel ) => {
			if ( this.isOpen ) {
				cancel();
			}
		} );

		// Close the dropdown using the arrow left/escape key.
		this.keystrokes.set( 'arrowleft', closeDropdown );
		this.keystrokes.set( 'esc', closeDropdown );
	}

	/**
	 * Focuses the {@link #buttonView}.
	 */
	focus() {
		this.buttonView.focus();
	}

	/**
	 * Returns {@link #panelView panel} positions to be used by the
	 * {@link module:utils/dom/position~getOptimalPosition `getOptimalPosition()`}
	 * utility considering the direction of the language the UI of the editor is displayed in.
	 *
	 * @type {module:utils/dom/position~Options#positions}
	 * @private
	 */
	get _panelPositions() {
		const {
			south, north,
			southEast, southWest,
			northEast, northWest,
			southMiddleEast, southMiddleWest,
			northMiddleEast, northMiddleWest
		} = DropdownView.defaultPanelPositions;

		if ( this.locale.uiLanguageDirection !== 'rtl' ) {
			return [
				southEast, southWest, southMiddleEast, southMiddleWest, south,
				northEast, northWest, northMiddleEast, northMiddleWest, north
			];
		} else {
			return [
				southWest, southEast, southMiddleWest, southMiddleEast, south,
				northWest, northEast, northMiddleWest, northMiddleEast, north
			];
		}
	}
}

/**
 * A set of positioning functions used by the dropdown view to determine
 * the optimal position (i.e. fitting into the browser viewport) of its
 * {@link module:ui/dropdown/dropdownview~DropdownView#panelView panel} when
 * {@link module:ui/dropdown/dropdownview~DropdownView#panelPosition} is set to 'auto'`.
 *
 * The available positioning functions are as follow:
 *
 * **South**
 *
 * * `south`
 *
 *			[ Button ]
 *		+-----------------+
 *		|      Panel      |
 *		+-----------------+
 *
 * * `southEast`
 *
 *		[ Button ]
 *		+-----------------+
 *		|      Panel      |
 *		+-----------------+
 *
 * * `southWest`
 *
 *		         [ Button ]
 *		+-----------------+
 *		|      Panel      |
 *		+-----------------+
 *
 * * `southMiddleEast`
 *
 *		  [ Button ]
 *		+-----------------+
 *		|      Panel      |
 *		+-----------------+
 *
 * * `southMiddleWest`
 *
 *		       [ Button ]
 *		+-----------------+
 *		|      Panel      |
 *		+-----------------+
 *
 * **North**
 *
 * * `north`
 *
 *		+-----------------+
 *		|      Panel      |
 *		+-----------------+
 *		    [ Button ]
 *
 * * `northEast`
 *
 *		+-----------------+
 *		|      Panel      |
 *		+-----------------+
 *		[ Button ]
 *
 * * `northWest`
 *
 *		+-----------------+
 *		|      Panel      |
 *		+-----------------+
 *		         [ Button ]
 *
 * * `northMiddleEast`
 *
 *		+-----------------+
 *		|      Panel      |
 *		+-----------------+
 *		  [ Button ]
 *
 * * `northMiddleWest`
 *
 *		+-----------------+
 *		|      Panel      |
 *		+-----------------+
 *		       [ Button ]
 *
 * Positioning functions are compatible with {@link module:utils/dom/position~Position}.
 *
 * The name that position function returns will be reflected in dropdown panel's class that
 * controls its placement. See {@link module:ui/dropdown/dropdownview~DropdownView#panelPosition}
 * to learn more.
 *
 * @member {Object} module:ui/dropdown/dropdownview~DropdownView.defaultPanelPositions
 */
DropdownView.defaultPanelPositions = {
	south: ( buttonRect, panelRect ) => {
		return {
			top: buttonRect.bottom,
			left: buttonRect.left - ( panelRect.width - buttonRect.width ) / 2,
			name: 's'
		};
	},
	southEast: buttonRect => {
		return {
			top: buttonRect.bottom,
			left: buttonRect.left,
			name: 'se'
		};
	},
	southWest: ( buttonRect, panelRect ) => {
		return {
			top: buttonRect.bottom,
			left: buttonRect.left - panelRect.width + buttonRect.width,
			name: 'sw'
		};
	},
	southMiddleEast: ( buttonRect, panelRect ) => {
		return {
			top: buttonRect.bottom,
			left: buttonRect.left - ( panelRect.width - buttonRect.width ) / 4,
			name: 'sme'
		};
	},
	southMiddleWest: ( buttonRect, panelRect ) => {
		return {
			top: buttonRect.bottom,
			left: buttonRect.left - ( panelRect.width - buttonRect.width ) * 3 / 4,
			name: 'smw'
		};
	},
	north: ( buttonRect, panelRect ) => {
		return {
			top: buttonRect.top - panelRect.height,
			left: buttonRect.left - ( panelRect.width - buttonRect.width ) / 2,
			name: 'n'
		};
	},
	northEast: ( buttonRect, panelRect ) => {
		return {
			top: buttonRect.top - panelRect.height,
			left: buttonRect.left,
			name: 'ne'
		};
	},
	northWest: ( buttonRect, panelRect ) => {
		return {
			top: buttonRect.top - panelRect.height,
			left: buttonRect.left - panelRect.width + buttonRect.width,
			name: 'nw'
		};
	},
	northMiddleEast: ( buttonRect, panelRect ) => {
		return {
			top: buttonRect.top - panelRect.height,
			left: buttonRect.left - ( panelRect.width - buttonRect.width ) / 4,
			name: 'nme'
		};
	},
	northMiddleWest: ( buttonRect, panelRect ) => {
		return {
			top: buttonRect.top - panelRect.height,
			left: buttonRect.left - ( panelRect.width - buttonRect.width ) * 3 / 4,
			name: 'nmw'
		};
	}
};

/**
 * A function used to calculate the optimal position for the dropdown panel.
 *
 * @protected
 * @member {Function} module:ui/dropdown/dropdownview~DropdownView._getOptimalPosition
 */
DropdownView._getOptimalPosition = getOptimalPosition;

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A utility class that helps cycling over focusable {@link module:ui/view~View views} in a
 * {@link module:ui/viewcollection~ViewCollection} when the focus is tracked by the
 * {@link module:utils/focustracker~FocusTracker} instance. It helps implementing keyboard
 * navigation in HTML forms, toolbars, lists and the like.
 *
 * To work properly it requires:
 * * a collection of focusable (HTML `tabindex` attribute) views that implement the `focus()` method,
 * * an associated focus tracker to determine which view is focused.
 *
 * A simple cycler setup can look like this:
 *
 *		const focusables = new ViewCollection();
 *		const focusTracker = new FocusTracker();
 *
 *		// Add focusable views to the focus tracker.
 *		focusTracker.add( ... );
 *
 * Then, the cycler can be used manually:
 *
 *		const cycler = new FocusCycler( { focusables, focusTracker } );
 *
 *		// Will focus the first focusable view in #focusables.
 *		cycler.focusFirst();
 *
 *		// Will log the next focusable item in #focusables.
 *		console.log( cycler.next );
 *
 * Alternatively, it can work side by side with the {@link module:utils/keystrokehandler~KeystrokeHandler}:
 *
 *		const keystrokeHandler = new KeystrokeHandler();
 *
 *		// Activate the keystroke handler.
 *		keystrokeHandler.listenTo( sourceOfEvents );
 *
 *		const cycler = new FocusCycler( {
 *			focusables, focusTracker, keystrokeHandler,
 *			actions: {
 *				// When arrowup of arrowleft is detected by the #keystrokeHandler,
 *				// focusPrevious() will be called on the cycler.
 *				focusPrevious: [ 'arrowup', 'arrowleft' ],
 *			}
 *		} );
 *
 * Check out the {@glink framework/guides/deep-dive/ui/focus-tracking "Deep dive into focus tracking" guide} to learn more.
 */
class FocusCycler {
	/**
	 * Creates an instance of the focus cycler utility.
	 *
	 * @param {Object} options Configuration options.
	 * @param {module:utils/collection~Collection|Object} options.focusables
	 * @param {module:utils/focustracker~FocusTracker} options.focusTracker
	 * @param {module:utils/keystrokehandler~KeystrokeHandler} [options.keystrokeHandler]
	 * @param {Object} [options.actions]
	 */
	constructor( options ) {
		Object.assign( this, options );

		/**
		 * A {@link module:ui/view~View view} collection that the cycler operates on.
		 *
		 * @readonly
		 * @member {module:utils/collection~Collection} #focusables
		 */

		/**
		 * A focus tracker instance that the cycler uses to determine the current focus
		 * state in {@link #focusables}.
		 *
		 * @readonly
		 * @member {module:utils/focustracker~FocusTracker} #focusTracker
		 */

		/**
		 * An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}
		 * which can respond to certain keystrokes and cycle the focus.
		 *
		 * @readonly
		 * @member {module:utils/keystrokehandler~KeystrokeHandler} #keystrokeHandler
		 */

		/**
		 * Actions that the cycler can take when a keystroke is pressed. Requires
		 * `options.keystrokeHandler` to be passed and working. When an action is
		 * performed, `preventDefault` and `stopPropagation` will be called on the event
		 * the keystroke fired in the DOM.
		 *
		 *		actions: {
		 *			// Will call #focusPrevious() when arrowleft or arrowup is pressed.
		 *			focusPrevious: [ 'arrowleft', 'arrowup' ],
		 *
		 *			// Will call #focusNext() when arrowdown is pressed.
		 *			focusNext: 'arrowdown'
		 *		}
		 *
		 * @readonly
		 * @member {Object} #actions
		 */

		if ( options.actions && options.keystrokeHandler ) {
			for ( const methodName in options.actions ) {
				let actions = options.actions[ methodName ];

				if ( typeof actions == 'string' ) {
					actions = [ actions ];
				}

				for ( const keystroke of actions ) {
					options.keystrokeHandler.set( keystroke, ( data, cancel ) => {
						this[ methodName ]();
						cancel();
					} );
				}
			}
		}
	}

	/**
	 * Returns the first focusable view in {@link #focusables}.
	 * Returns `null` if there is none.
	 *
	 * @readonly
	 * @member {module:ui/view~View|null} #first
	 */
	get first() {
		return this.focusables.find( isFocusable ) || null;
	}

	/**
	 * Returns the last focusable view in {@link #focusables}.
	 * Returns `null` if there is none.
	 *
	 * @readonly
	 * @member {module:ui/view~View|null} #last
	 */
	get last() {
		return this.focusables.filter( isFocusable ).slice( -1 )[ 0 ] || null;
	}

	/**
	 * Returns the next focusable view in {@link #focusables} based on {@link #current}.
	 * Returns `null` if there is none.
	 *
	 * @readonly
	 * @member {module:ui/view~View|null} #next
	 */
	get next() {
		return this._getFocusableItem( 1 );
	}

	/**
	 * Returns the previous focusable view in {@link #focusables} based on {@link #current}.
	 * Returns `null` if there is none.
	 *
	 * @readonly
	 * @member {module:ui/view~View|null} #previous
	 */
	get previous() {
		return this._getFocusableItem( -1 );
	}

	/**
	 * An index of the view in the {@link #focusables} which is focused according
	 * to {@link #focusTracker}. Returns `null` when there is no such view.
	 *
	 * @readonly
	 * @member {Number|null} #current
	 */
	get current() {
		let index = null;

		// There's no focused view in the focusables.
		if ( this.focusTracker.focusedElement === null ) {
			return null;
		}

		this.focusables.find( ( view, viewIndex ) => {
			const focused = view.element === this.focusTracker.focusedElement;

			if ( focused ) {
				index = viewIndex;
			}

			return focused;
		} );

		return index;
	}

	/**
	 * Focuses the {@link #first} item in {@link #focusables}.
	 */
	focusFirst() {
		this._focus( this.first );
	}

	/**
	 * Focuses the {@link #last} item in {@link #focusables}.
	 */
	focusLast() {
		this._focus( this.last );
	}

	/**
	 * Focuses the {@link #next} item in {@link #focusables}.
	 */
	focusNext() {
		this._focus( this.next );
	}

	/**
	 * Focuses the {@link #previous} item in {@link #focusables}.
	 */
	focusPrevious() {
		this._focus( this.previous );
	}

	/**
	 * Focuses the given view if it exists.
	 *
	 * @protected
	 * @param {module:ui/view~View} view
	 */
	_focus( view ) {
		if ( view ) {
			view.focus();
		}
	}

	/**
	 * Returns the next or previous focusable view in {@link #focusables} with respect
	 * to {@link #current}.
	 *
	 * @protected
	 * @param {Number} step Either `1` for checking forward from {@link #current} or
	 * `-1` for checking backwards.
	 * @returns {module:ui/view~View|null}
	 */
	_getFocusableItem( step ) {
		// Cache for speed.
		const current = this.current;
		const collectionLength = this.focusables.length;

		if ( !collectionLength ) {
			return null;
		}

		// Start from the beginning if no view is focused.
		// https://github.com/ckeditor/ckeditor5-ui/issues/206
		if ( current === null ) {
			return this[ step === 1 ? 'first' : 'last' ];
		}

		// Cycle in both directions.
		let index = ( current + collectionLength + step ) % collectionLength;

		do {
			const view = this.focusables.get( index );

			// TODO: Check if view is visible.
			if ( isFocusable( view ) ) {
				return view;
			}

			// Cycle in both directions.
			index = ( index + collectionLength + step ) % collectionLength;
		} while ( index !== current );

		return null;
	}
}

// Checks whether a view is focusable.
//
// @private
// @param {module:ui/view~View} view A view to be checked.
// @returns {Boolean}
function isFocusable( view ) {
	return !!( view.focus && global$1.window.getComputedStyle( view.element ).display != 'none' );
}

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

const RESIZE_CHECK_INTERVAL = 100;

/**
 * A polyfill class for the native [`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).
 *
 * @private
 * @mixes module:utils/domemittermixin~DomEmitterMixin
 */
class ResizeObserverPolyfill {
	/**
	 * Creates an instance of the {@link module:utils/dom/resizeobserver~ResizeObserverPolyfill} class.
	 *
	 * It synchronously reacts to resize of the window to check if observed elements' geometry changed.
	 *
	 * Additionally, the polyfilled observer uses a timeout to check if observed elements' geometry has changed
	 * in some other way (dynamic layouts, scrollbars showing up, etc.), so its response can also be asynchronous.
	 *
	 * @param {Function} callback A function called when any observed element was resized. Refer to the
	 * native [`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) API to
	 * learn more.
	 */
	constructor( callback ) {
		/**
		 * A function called when any observed {@link #_elements element} was resized.
		 *
		 * @readonly
		 * @protected
		 * @member {Function}
		 */
		this._callback = callback;

		/**
		 * DOM elements currently observed by the observer instance.
		 *
		 * @readonly
		 * @protected
		 * @member {Set}
		 */
		this._elements = new Set();

		/**
		 * Cached DOM {@link #_elements elements} bounding rects to compare to upon the next check.
		 *
		 * @readonly
		 * @protected
		 * @member {Map.<HTMLElement,module:utils/dom/rect~Rect>}
		 */
		this._previousRects = new Map();

		/**
		 * An UID of the current timeout upon which the observed elements rects
		 * will be compared to the {@link #_previousRects previous rects} from the past.
		 *
		 * @readonly
		 * @protected
		 * @member {Map.<HTMLElement,module:utils/dom/rect~Rect>}
		 */
		this._periodicCheckTimeout = null;
	}

	/**
	 * Starts observing a DOM element.
	 *
	 * Learn more in the
	 * [native method documentation](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/observe).
	 *
	 * @param {HTMLElement} element
	 */
	observe( element ) {
		this._elements.add( element );

		this._checkElementRectsAndExecuteCallback();

		if ( this._elements.size === 1 ) {
			this._startPeriodicCheck();
		}
	}

	/**
	 * Stops observing a DOM element.
	 *
	 * Learn more in the
	 * [native method documentation](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/unobserve).
	 *
	 * @param {HTMLElement} element
	 */
	unobserve( element ) {
		this._elements.delete( element );
		this._previousRects.delete( element );

		if ( !this._elements.size ) {
			this._stopPeriodicCheck();
		}
	}

	/**
	 * When called, the observer calls the {@link #_callback resize callback} for all observed
	 * {@link #_elements elements} but also starts checking periodically for changes in the elements' geometry.
	 * If some are detected, {@link #_callback resize callback} is called for relevant elements that were resized.
	 *
	 * @protected
	 */
	_startPeriodicCheck() {
		const periodicCheck = () => {
			this._checkElementRectsAndExecuteCallback();
			this._periodicCheckTimeout = setTimeout( periodicCheck, RESIZE_CHECK_INTERVAL );
		};

		this.listenTo( global$1.window, 'resize', () => {
			this._checkElementRectsAndExecuteCallback();
		} );

		this._periodicCheckTimeout = setTimeout( periodicCheck, RESIZE_CHECK_INTERVAL );
	}

	/**
	 * Stops checking for changes in all observed {@link #_elements elements} geometry.
	 *
	 * @protected
	 */
	_stopPeriodicCheck() {
		clearTimeout( this._periodicCheckTimeout );
		this.stopListening();
		this._previousRects.clear();
	}

	/**
	 * Checks if the geometry of any of the {@link #_elements element} has changed. If so, executes
	 * the {@link #_callback resize callback} with element geometry data.
	 *
	 * @protected
	 */
	_checkElementRectsAndExecuteCallback() {
		const entries = [];

		for ( const element of this._elements ) {
			if ( this._hasRectChanged( element ) ) {
				entries.push( {
					target: element,
					contentRect: this._previousRects.get( element )
				} );
			}
		}

		if ( entries.length ) {
			this._callback( entries );
		}
	}

	/**
	 * Compares the DOM element geometry to the {@link #_previousRects cached geometry} from the past.
	 * Returns `true` if geometry has changed or the element is checked for the first time.
	 *
	 * @protected
	 * @param {HTMLElement} element
	 * @returns {Boolean}
	 */
	_hasRectChanged( element ) {
		if ( !element.ownerDocument.body.contains( element ) ) {
			return false;
		}

		const currentRect = new Rect( element );
		const previousRect = this._previousRects.get( element );

		// The first check should always yield true despite no Previous rect to compare to.
		// The native ResizeObserver does that and... that makes sense. Sort of.
		const hasChanged = !previousRect || !previousRect.isEqual( currentRect );

		this._previousRects.set( element, currentRect );

		return hasChanged;
	}
}

mix( ResizeObserverPolyfill, DomEmitterMixin );

export { getSelectedImageWidget as A, ButtonView as B, Command as C, clickOutsideHandler as D, isObjectLike as E, FocusTracker as F, baseGetTag as G, isObject as H, ImageLoadObserver as I, root as J, KeystrokeHandler as K, IconView as L, MouseObserver as M, DropdownView as N, assignIn as O, Plugin as P, mix as Q, Rect as R, ObservableMixin as S, TYPE_AROUND_SELECTION_ATTRIBUTE as T, Collection as U, View as V, WIDGET_SELECTED_CLASS_NAME as W, DomEmitterMixin as X, global$1 as Y, insertImage as a, toImageWidget as b, getCode as c, getTypeAroundFakeCaretPosition as d, isTypeAroundWidget as e, isArrowKeyCode as f, getViewImgFromWidget as g, getClosestTypeAroundDomButton as h, isImageAllowed as i, getTypeAroundButtonPosition as j, getClosestWidgetViewElement as k, isForwardArrowKeyCode as l, keyCodes as m, Template as n, isWidget as o, priorities as p, getLabel as q, env as r, isImage as s, toArray as t, uid as u, ViewCollection as v, FocusCycler as w, BalloonPanelView as x, CKEditorError as y, toUnit as z };
