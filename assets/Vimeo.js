"use strict";
(self["webpackChunkjuno_shopify_template"] = self["webpackChunkjuno_shopify_template"] || []).push([["Vimeo"],{

/***/ "./node_modules/@shopify/theme-currency/currency.js":
/*!**********************************************************!*\
  !*** ./node_modules/@shopify/theme-currency/currency.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatMoney": () => (/* binding */ formatMoney)
/* harmony export */ });
/**
 * Currency Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help with currency formatting
 *
 * Current contents
 * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
 *
 */

const moneyFormat = '${{amount}}';

/**
 * Format money values based on your shop currency settings
 * @param  {Number|string} cents - value in cents or dollar amount e.g. 300 cents
 * or 3.00 dollars
 * @param  {String} format - shop money_format setting
 * @return {String} value - formatted value
 */
function formatMoney(cents, format) {
  if (typeof cents === 'string') {
    cents = cents.replace('.', '');
  }
  let value = '';
  const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  const formatString = format || moneyFormat;

  function formatWithDelimiters(
    number,
    precision = 2,
    thousands = ',',
    decimal = '.'
  ) {
    if (isNaN(number) || number == null) {
      return 0;
    }

    number = (number / 100.0).toFixed(precision);

    const parts = number.split('.');
    const dollarsAmount = parts[0].replace(
      /(\d)(?=(\d\d\d)+(?!\d))/g,
      `$1${thousands}`
    );
    const centsAmount = parts[1] ? decimal + parts[1] : '';

    return dollarsAmount + centsAmount;
  }

  switch (formatString.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;
    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;
    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, '.', ',');
      break;
  }

  return formatString.replace(placeholderRegex, value);
}


/***/ }),

/***/ "./node_modules/@vimeo/player/dist/player.es.js":
/*!******************************************************!*\
  !*** ./node_modules/@vimeo/player/dist/player.es.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*! @vimeo/player v2.17.1 | (c) 2022 Vimeo | MIT License | https://github.com/vimeo/player.js */
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/**
 * @module lib/functions
 */

/**
 * Check to see this is a node environment.
 * @type {Boolean}
 */

/* global global */
var isNode = typeof __webpack_require__.g !== 'undefined' && {}.toString.call(__webpack_require__.g) === '[object global]';
/**
 * Get the name of the method for a given getter or setter.
 *
 * @param {string} prop The name of the property.
 * @param {string} type Either “get” or “set”.
 * @return {string}
 */

function getMethodName(prop, type) {
  if (prop.indexOf(type.toLowerCase()) === 0) {
    return prop;
  }

  return "".concat(type.toLowerCase()).concat(prop.substr(0, 1).toUpperCase()).concat(prop.substr(1));
}
/**
 * Check to see if the object is a DOM Element.
 *
 * @param {*} element The object to check.
 * @return {boolean}
 */

function isDomElement(element) {
  return Boolean(element && element.nodeType === 1 && 'nodeName' in element && element.ownerDocument && element.ownerDocument.defaultView);
}
/**
 * Check to see whether the value is a number.
 *
 * @see http://dl.dropboxusercontent.com/u/35146/js/tests/isNumber.html
 * @param {*} value The value to check.
 * @param {boolean} integer Check if the value is an integer.
 * @return {boolean}
 */

function isInteger(value) {
  // eslint-disable-next-line eqeqeq
  return !isNaN(parseFloat(value)) && isFinite(value) && Math.floor(value) == value;
}
/**
 * Check to see if the URL is a Vimeo url.
 *
 * @param {string} url The url string.
 * @return {boolean}
 */

function isVimeoUrl(url) {
  return /^(https?:)?\/\/((player|www)\.)?vimeo\.com(?=$|\/)/.test(url);
}
/**
 * Check to see if the URL is for a Vimeo embed.
 *
 * @param {string} url The url string.
 * @return {boolean}
 */

function isVimeoEmbed(url) {
  var expr = /^https:\/\/player\.vimeo\.com\/video\/\d+/;
  return expr.test(url);
}
/**
 * Get the Vimeo URL from an element.
 * The element must have either a data-vimeo-id or data-vimeo-url attribute.
 *
 * @param {object} oEmbedParameters The oEmbed parameters.
 * @return {string}
 */

function getVimeoUrl() {
  var oEmbedParameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var id = oEmbedParameters.id;
  var url = oEmbedParameters.url;
  var idOrUrl = id || url;

  if (!idOrUrl) {
    throw new Error('An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.');
  }

  if (isInteger(idOrUrl)) {
    return "https://vimeo.com/".concat(idOrUrl);
  }

  if (isVimeoUrl(idOrUrl)) {
    return idOrUrl.replace('http:', 'https:');
  }

  if (id) {
    throw new TypeError("\u201C".concat(id, "\u201D is not a valid video id."));
  }

  throw new TypeError("\u201C".concat(idOrUrl, "\u201D is not a vimeo.com url."));
}

var arrayIndexOfSupport = typeof Array.prototype.indexOf !== 'undefined';
var postMessageSupport = typeof window !== 'undefined' && typeof window.postMessage !== 'undefined';

if (!isNode && (!arrayIndexOfSupport || !postMessageSupport)) {
  throw new Error('Sorry, the Vimeo Player API is not available in this browser.');
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/*!
 * weakmap-polyfill v2.0.4 - ECMAScript6 WeakMap polyfill
 * https://github.com/polygonplanet/weakmap-polyfill
 * Copyright (c) 2015-2021 polygonplanet <polygon.planet.aqua@gmail.com>
 * @license MIT
 */
(function (self) {

  if (self.WeakMap) {
    return;
  }

  var hasOwnProperty = Object.prototype.hasOwnProperty;

  var hasDefine = Object.defineProperty && function () {
    try {
      // Avoid IE8's broken Object.defineProperty
      return Object.defineProperty({}, 'x', {
        value: 1
      }).x === 1;
    } catch (e) {}
  }();

  var defineProperty = function (object, name, value) {
    if (hasDefine) {
      Object.defineProperty(object, name, {
        configurable: true,
        writable: true,
        value: value
      });
    } else {
      object[name] = value;
    }
  };

  self.WeakMap = function () {
    // ECMA-262 23.3 WeakMap Objects
    function WeakMap() {
      if (this === void 0) {
        throw new TypeError("Constructor WeakMap requires 'new'");
      }

      defineProperty(this, '_id', genId('_WeakMap')); // ECMA-262 23.3.1.1 WeakMap([iterable])

      if (arguments.length > 0) {
        // Currently, WeakMap `iterable` argument is not supported
        throw new TypeError('WeakMap iterable is not supported');
      }
    } // ECMA-262 23.3.3.2 WeakMap.prototype.delete(key)


    defineProperty(WeakMap.prototype, 'delete', function (key) {
      checkInstance(this, 'delete');

      if (!isObject(key)) {
        return false;
      }

      var entry = key[this._id];

      if (entry && entry[0] === key) {
        delete key[this._id];
        return true;
      }

      return false;
    }); // ECMA-262 23.3.3.3 WeakMap.prototype.get(key)

    defineProperty(WeakMap.prototype, 'get', function (key) {
      checkInstance(this, 'get');

      if (!isObject(key)) {
        return void 0;
      }

      var entry = key[this._id];

      if (entry && entry[0] === key) {
        return entry[1];
      }

      return void 0;
    }); // ECMA-262 23.3.3.4 WeakMap.prototype.has(key)

    defineProperty(WeakMap.prototype, 'has', function (key) {
      checkInstance(this, 'has');

      if (!isObject(key)) {
        return false;
      }

      var entry = key[this._id];

      if (entry && entry[0] === key) {
        return true;
      }

      return false;
    }); // ECMA-262 23.3.3.5 WeakMap.prototype.set(key, value)

    defineProperty(WeakMap.prototype, 'set', function (key, value) {
      checkInstance(this, 'set');

      if (!isObject(key)) {
        throw new TypeError('Invalid value used as weak map key');
      }

      var entry = key[this._id];

      if (entry && entry[0] === key) {
        entry[1] = value;
        return this;
      }

      defineProperty(key, this._id, [key, value]);
      return this;
    });

    function checkInstance(x, methodName) {
      if (!isObject(x) || !hasOwnProperty.call(x, '_id')) {
        throw new TypeError(methodName + ' method called on incompatible receiver ' + typeof x);
      }
    }

    function genId(prefix) {
      return prefix + '_' + rand() + '.' + rand();
    }

    function rand() {
      return Math.random().toString().substring(2);
    }

    defineProperty(WeakMap, '_polyfill', true);
    return WeakMap;
  }();

  function isObject(x) {
    return Object(x) === x;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : commonjsGlobal);

var npo_src = createCommonjsModule(function (module) {
/*! Native Promise Only
    v0.8.1 (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
(function UMD(name, context, definition) {
  // special form of UMD for polyfilling across evironments
  context[name] = context[name] || definition();

  if ( module.exports) {
    module.exports = context[name];
  }
})("Promise", typeof commonjsGlobal != "undefined" ? commonjsGlobal : commonjsGlobal, function DEF() {

  var builtInProp,
      cycle,
      scheduling_queue,
      ToString = Object.prototype.toString,
      timer = typeof setImmediate != "undefined" ? function timer(fn) {
    return setImmediate(fn);
  } : setTimeout; // dammit, IE8.

  try {
    Object.defineProperty({}, "x", {});

    builtInProp = function builtInProp(obj, name, val, config) {
      return Object.defineProperty(obj, name, {
        value: val,
        writable: true,
        configurable: config !== false
      });
    };
  } catch (err) {
    builtInProp = function builtInProp(obj, name, val) {
      obj[name] = val;
      return obj;
    };
  } // Note: using a queue instead of array for efficiency


  scheduling_queue = function Queue() {
    var first, last, item;

    function Item(fn, self) {
      this.fn = fn;
      this.self = self;
      this.next = void 0;
    }

    return {
      add: function add(fn, self) {
        item = new Item(fn, self);

        if (last) {
          last.next = item;
        } else {
          first = item;
        }

        last = item;
        item = void 0;
      },
      drain: function drain() {
        var f = first;
        first = last = cycle = void 0;

        while (f) {
          f.fn.call(f.self);
          f = f.next;
        }
      }
    };
  }();

  function schedule(fn, self) {
    scheduling_queue.add(fn, self);

    if (!cycle) {
      cycle = timer(scheduling_queue.drain);
    }
  } // promise duck typing


  function isThenable(o) {
    var _then,
        o_type = typeof o;

    if (o != null && (o_type == "object" || o_type == "function")) {
      _then = o.then;
    }

    return typeof _then == "function" ? _then : false;
  }

  function notify() {
    for (var i = 0; i < this.chain.length; i++) {
      notifyIsolated(this, this.state === 1 ? this.chain[i].success : this.chain[i].failure, this.chain[i]);
    }

    this.chain.length = 0;
  } // NOTE: This is a separate function to isolate
  // the `try..catch` so that other code can be
  // optimized better


  function notifyIsolated(self, cb, chain) {
    var ret, _then;

    try {
      if (cb === false) {
        chain.reject(self.msg);
      } else {
        if (cb === true) {
          ret = self.msg;
        } else {
          ret = cb.call(void 0, self.msg);
        }

        if (ret === chain.promise) {
          chain.reject(TypeError("Promise-chain cycle"));
        } else if (_then = isThenable(ret)) {
          _then.call(ret, chain.resolve, chain.reject);
        } else {
          chain.resolve(ret);
        }
      }
    } catch (err) {
      chain.reject(err);
    }
  }

  function resolve(msg) {
    var _then,
        self = this; // already triggered?


    if (self.triggered) {
      return;
    }

    self.triggered = true; // unwrap

    if (self.def) {
      self = self.def;
    }

    try {
      if (_then = isThenable(msg)) {
        schedule(function () {
          var def_wrapper = new MakeDefWrapper(self);

          try {
            _then.call(msg, function $resolve$() {
              resolve.apply(def_wrapper, arguments);
            }, function $reject$() {
              reject.apply(def_wrapper, arguments);
            });
          } catch (err) {
            reject.call(def_wrapper, err);
          }
        });
      } else {
        self.msg = msg;
        self.state = 1;

        if (self.chain.length > 0) {
          schedule(notify, self);
        }
      }
    } catch (err) {
      reject.call(new MakeDefWrapper(self), err);
    }
  }

  function reject(msg) {
    var self = this; // already triggered?

    if (self.triggered) {
      return;
    }

    self.triggered = true; // unwrap

    if (self.def) {
      self = self.def;
    }

    self.msg = msg;
    self.state = 2;

    if (self.chain.length > 0) {
      schedule(notify, self);
    }
  }

  function iteratePromises(Constructor, arr, resolver, rejecter) {
    for (var idx = 0; idx < arr.length; idx++) {
      (function IIFE(idx) {
        Constructor.resolve(arr[idx]).then(function $resolver$(msg) {
          resolver(idx, msg);
        }, rejecter);
      })(idx);
    }
  }

  function MakeDefWrapper(self) {
    this.def = self;
    this.triggered = false;
  }

  function MakeDef(self) {
    this.promise = self;
    this.state = 0;
    this.triggered = false;
    this.chain = [];
    this.msg = void 0;
  }

  function Promise(executor) {
    if (typeof executor != "function") {
      throw TypeError("Not a function");
    }

    if (this.__NPO__ !== 0) {
      throw TypeError("Not a promise");
    } // instance shadowing the inherited "brand"
    // to signal an already "initialized" promise


    this.__NPO__ = 1;
    var def = new MakeDef(this);

    this["then"] = function then(success, failure) {
      var o = {
        success: typeof success == "function" ? success : true,
        failure: typeof failure == "function" ? failure : false
      }; // Note: `then(..)` itself can be borrowed to be used against
      // a different promise constructor for making the chained promise,
      // by substituting a different `this` binding.

      o.promise = new this.constructor(function extractChain(resolve, reject) {
        if (typeof resolve != "function" || typeof reject != "function") {
          throw TypeError("Not a function");
        }

        o.resolve = resolve;
        o.reject = reject;
      });
      def.chain.push(o);

      if (def.state !== 0) {
        schedule(notify, def);
      }

      return o.promise;
    };

    this["catch"] = function $catch$(failure) {
      return this.then(void 0, failure);
    };

    try {
      executor.call(void 0, function publicResolve(msg) {
        resolve.call(def, msg);
      }, function publicReject(msg) {
        reject.call(def, msg);
      });
    } catch (err) {
      reject.call(def, err);
    }
  }

  var PromisePrototype = builtInProp({}, "constructor", Promise,
  /*configurable=*/
  false); // Note: Android 4 cannot use `Object.defineProperty(..)` here

  Promise.prototype = PromisePrototype; // built-in "brand" to signal an "uninitialized" promise

  builtInProp(PromisePrototype, "__NPO__", 0,
  /*configurable=*/
  false);
  builtInProp(Promise, "resolve", function Promise$resolve(msg) {
    var Constructor = this; // spec mandated checks
    // note: best "isPromise" check that's practical for now

    if (msg && typeof msg == "object" && msg.__NPO__ === 1) {
      return msg;
    }

    return new Constructor(function executor(resolve, reject) {
      if (typeof resolve != "function" || typeof reject != "function") {
        throw TypeError("Not a function");
      }

      resolve(msg);
    });
  });
  builtInProp(Promise, "reject", function Promise$reject(msg) {
    return new this(function executor(resolve, reject) {
      if (typeof resolve != "function" || typeof reject != "function") {
        throw TypeError("Not a function");
      }

      reject(msg);
    });
  });
  builtInProp(Promise, "all", function Promise$all(arr) {
    var Constructor = this; // spec mandated checks

    if (ToString.call(arr) != "[object Array]") {
      return Constructor.reject(TypeError("Not an array"));
    }

    if (arr.length === 0) {
      return Constructor.resolve([]);
    }

    return new Constructor(function executor(resolve, reject) {
      if (typeof resolve != "function" || typeof reject != "function") {
        throw TypeError("Not a function");
      }

      var len = arr.length,
          msgs = Array(len),
          count = 0;
      iteratePromises(Constructor, arr, function resolver(idx, msg) {
        msgs[idx] = msg;

        if (++count === len) {
          resolve(msgs);
        }
      }, reject);
    });
  });
  builtInProp(Promise, "race", function Promise$race(arr) {
    var Constructor = this; // spec mandated checks

    if (ToString.call(arr) != "[object Array]") {
      return Constructor.reject(TypeError("Not an array"));
    }

    return new Constructor(function executor(resolve, reject) {
      if (typeof resolve != "function" || typeof reject != "function") {
        throw TypeError("Not a function");
      }

      iteratePromises(Constructor, arr, function resolver(idx, msg) {
        resolve(msg);
      }, reject);
    });
  });
  return Promise;
});
});

/**
 * @module lib/callbacks
 */
var callbackMap = new WeakMap();
/**
 * Store a callback for a method or event for a player.
 *
 * @param {Player} player The player object.
 * @param {string} name The method or event name.
 * @param {(function(this:Player, *): void|{resolve: function, reject: function})} callback
 *        The callback to call or an object with resolve and reject functions for a promise.
 * @return {void}
 */

function storeCallback(player, name, callback) {
  var playerCallbacks = callbackMap.get(player.element) || {};

  if (!(name in playerCallbacks)) {
    playerCallbacks[name] = [];
  }

  playerCallbacks[name].push(callback);
  callbackMap.set(player.element, playerCallbacks);
}
/**
 * Get the callbacks for a player and event or method.
 *
 * @param {Player} player The player object.
 * @param {string} name The method or event name
 * @return {function[]}
 */

function getCallbacks(player, name) {
  var playerCallbacks = callbackMap.get(player.element) || {};
  return playerCallbacks[name] || [];
}
/**
 * Remove a stored callback for a method or event for a player.
 *
 * @param {Player} player The player object.
 * @param {string} name The method or event name
 * @param {function} [callback] The specific callback to remove.
 * @return {boolean} Was this the last callback?
 */

function removeCallback(player, name, callback) {
  var playerCallbacks = callbackMap.get(player.element) || {};

  if (!playerCallbacks[name]) {
    return true;
  } // If no callback is passed, remove all callbacks for the event


  if (!callback) {
    playerCallbacks[name] = [];
    callbackMap.set(player.element, playerCallbacks);
    return true;
  }

  var index = playerCallbacks[name].indexOf(callback);

  if (index !== -1) {
    playerCallbacks[name].splice(index, 1);
  }

  callbackMap.set(player.element, playerCallbacks);
  return playerCallbacks[name] && playerCallbacks[name].length === 0;
}
/**
 * Return the first stored callback for a player and event or method.
 *
 * @param {Player} player The player object.
 * @param {string} name The method or event name.
 * @return {function} The callback, or false if there were none
 */

function shiftCallbacks(player, name) {
  var playerCallbacks = getCallbacks(player, name);

  if (playerCallbacks.length < 1) {
    return false;
  }

  var callback = playerCallbacks.shift();
  removeCallback(player, name, callback);
  return callback;
}
/**
 * Move callbacks associated with an element to another element.
 *
 * @param {HTMLElement} oldElement The old element.
 * @param {HTMLElement} newElement The new element.
 * @return {void}
 */

function swapCallbacks(oldElement, newElement) {
  var playerCallbacks = callbackMap.get(oldElement);
  callbackMap.set(newElement, playerCallbacks);
  callbackMap.delete(oldElement);
}

/**
 * @module lib/postmessage
 */
/**
 * Parse a message received from postMessage.
 *
 * @param {*} data The data received from postMessage.
 * @return {object}
 */

function parseMessageData(data) {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (error) {
      // If the message cannot be parsed, throw the error as a warning
      console.warn(error);
      return {};
    }
  }

  return data;
}
/**
 * Post a message to the specified target.
 *
 * @param {Player} player The player object to use.
 * @param {string} method The API method to call.
 * @param {object} params The parameters to send to the player.
 * @return {void}
 */

function postMessage(player, method, params) {
  if (!player.element.contentWindow || !player.element.contentWindow.postMessage) {
    return;
  }

  var message = {
    method: method
  };

  if (params !== undefined) {
    message.value = params;
  } // IE 8 and 9 do not support passing messages, so stringify them


  var ieVersion = parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, '$1'));

  if (ieVersion >= 8 && ieVersion < 10) {
    message = JSON.stringify(message);
  }

  player.element.contentWindow.postMessage(message, player.origin);
}
/**
 * Parse the data received from a message event.
 *
 * @param {Player} player The player that received the message.
 * @param {(Object|string)} data The message data. Strings will be parsed into JSON.
 * @return {void}
 */

function processData(player, data) {
  data = parseMessageData(data);
  var callbacks = [];
  var param;

  if (data.event) {
    if (data.event === 'error') {
      var promises = getCallbacks(player, data.data.method);
      promises.forEach(function (promise) {
        var error = new Error(data.data.message);
        error.name = data.data.name;
        promise.reject(error);
        removeCallback(player, data.data.method, promise);
      });
    }

    callbacks = getCallbacks(player, "event:".concat(data.event));
    param = data.data;
  } else if (data.method) {
    var callback = shiftCallbacks(player, data.method);

    if (callback) {
      callbacks.push(callback);
      param = data.value;
    }
  }

  callbacks.forEach(function (callback) {
    try {
      if (typeof callback === 'function') {
        callback.call(player, param);
        return;
      }

      callback.resolve(param);
    } catch (e) {// empty
    }
  });
}

/**
 * @module lib/embed
 */
var oEmbedParameters = ['autopause', 'autoplay', 'background', 'byline', 'color', 'controls', 'dnt', 'height', 'id', 'interactive_params', 'keyboard', 'loop', 'maxheight', 'maxwidth', 'muted', 'playsinline', 'portrait', 'responsive', 'speed', 'texttrack', 'title', 'transparent', 'url', 'width'];
/**
 * Get the 'data-vimeo'-prefixed attributes from an element as an object.
 *
 * @param {HTMLElement} element The element.
 * @param {Object} [defaults={}] The default values to use.
 * @return {Object<string, string>}
 */

function getOEmbedParameters(element) {
  var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return oEmbedParameters.reduce(function (params, param) {
    var value = element.getAttribute("data-vimeo-".concat(param));

    if (value || value === '') {
      params[param] = value === '' ? 1 : value;
    }

    return params;
  }, defaults);
}
/**
 * Create an embed from oEmbed data inside an element.
 *
 * @param {object} data The oEmbed data.
 * @param {HTMLElement} element The element to put the iframe in.
 * @return {HTMLIFrameElement} The iframe embed.
 */

function createEmbed(_ref, element) {
  var html = _ref.html;

  if (!element) {
    throw new TypeError('An element must be provided');
  }

  if (element.getAttribute('data-vimeo-initialized') !== null) {
    return element.querySelector('iframe');
  }

  var div = document.createElement('div');
  div.innerHTML = html;
  element.appendChild(div.firstChild);
  element.setAttribute('data-vimeo-initialized', 'true');
  return element.querySelector('iframe');
}
/**
 * Make an oEmbed call for the specified URL.
 *
 * @param {string} videoUrl The vimeo.com url for the video.
 * @param {Object} [params] Parameters to pass to oEmbed.
 * @param {HTMLElement} element The element.
 * @return {Promise}
 */

function getOEmbedData(videoUrl) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var element = arguments.length > 2 ? arguments[2] : undefined;
  return new Promise(function (resolve, reject) {
    if (!isVimeoUrl(videoUrl)) {
      throw new TypeError("\u201C".concat(videoUrl, "\u201D is not a vimeo.com url."));
    }

    var url = "https://vimeo.com/api/oembed.json?url=".concat(encodeURIComponent(videoUrl));

    for (var param in params) {
      if (params.hasOwnProperty(param)) {
        url += "&".concat(param, "=").concat(encodeURIComponent(params[param]));
      }
    }

    var xhr = 'XDomainRequest' in window ? new XDomainRequest() : new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function () {
      if (xhr.status === 404) {
        reject(new Error("\u201C".concat(videoUrl, "\u201D was not found.")));
        return;
      }

      if (xhr.status === 403) {
        reject(new Error("\u201C".concat(videoUrl, "\u201D is not embeddable.")));
        return;
      }

      try {
        var json = JSON.parse(xhr.responseText); // Check api response for 403 on oembed

        if (json.domain_status_code === 403) {
          // We still want to create the embed to give users visual feedback
          createEmbed(json, element);
          reject(new Error("\u201C".concat(videoUrl, "\u201D is not embeddable.")));
          return;
        }

        resolve(json);
      } catch (error) {
        reject(error);
      }
    };

    xhr.onerror = function () {
      var status = xhr.status ? " (".concat(xhr.status, ")") : '';
      reject(new Error("There was an error fetching the embed code from Vimeo".concat(status, ".")));
    };

    xhr.send();
  });
}
/**
 * Initialize all embeds within a specific element
 *
 * @param {HTMLElement} [parent=document] The parent element.
 * @return {void}
 */

function initializeEmbeds() {
  var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var elements = [].slice.call(parent.querySelectorAll('[data-vimeo-id], [data-vimeo-url]'));

  var handleError = function handleError(error) {
    if ('console' in window && console.error) {
      console.error("There was an error creating an embed: ".concat(error));
    }
  };

  elements.forEach(function (element) {
    try {
      // Skip any that have data-vimeo-defer
      if (element.getAttribute('data-vimeo-defer') !== null) {
        return;
      }

      var params = getOEmbedParameters(element);
      var url = getVimeoUrl(params);
      getOEmbedData(url, params, element).then(function (data) {
        return createEmbed(data, element);
      }).catch(handleError);
    } catch (error) {
      handleError(error);
    }
  });
}
/**
 * Resize embeds when messaged by the player.
 *
 * @param {HTMLElement} [parent=document] The parent element.
 * @return {void}
 */

function resizeEmbeds() {
  var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

  // Prevent execution if users include the player.js script multiple times.
  if (window.VimeoPlayerResizeEmbeds_) {
    return;
  }

  window.VimeoPlayerResizeEmbeds_ = true;

  var onMessage = function onMessage(event) {
    if (!isVimeoUrl(event.origin)) {
      return;
    } // 'spacechange' is fired only on embeds with cards


    if (!event.data || event.data.event !== 'spacechange') {
      return;
    }

    var iframes = parent.querySelectorAll('iframe');

    for (var i = 0; i < iframes.length; i++) {
      if (iframes[i].contentWindow !== event.source) {
        continue;
      } // Change padding-bottom of the enclosing div to accommodate
      // card carousel without distorting aspect ratio


      var space = iframes[i].parentElement;
      space.style.paddingBottom = "".concat(event.data.data[0].bottom, "px");
      break;
    }
  };

  window.addEventListener('message', onMessage);
}
/**
 * Add chapters to existing metadata for Google SEO
 *
 * @param {HTMLElement} [parent=document] The parent element.
 * @return {void}
 */

function initAppendVideoMetadata() {
  var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

  //  Prevent execution if users include the player.js script multiple times.
  if (window.VimeoSeoMetadataAppended) {
    return;
  }

  window.VimeoSeoMetadataAppended = true;

  var onMessage = function onMessage(event) {
    if (!isVimeoUrl(event.origin)) {
      return;
    }

    var data = parseMessageData(event.data);

    if (!data || data.event !== 'ready') {
      return;
    }

    var iframes = parent.querySelectorAll('iframe');

    for (var i = 0; i < iframes.length; i++) {
      var iframe = iframes[i]; // Initiate appendVideoMetadata if iframe is a Vimeo embed

      var isValidMessageSource = iframe.contentWindow === event.source;

      if (isVimeoEmbed(iframe.src) && isValidMessageSource) {
        var player = new Player(iframe);
        player.callMethod('appendVideoMetadata', window.location.href);
      }
    }
  };

  window.addEventListener('message', onMessage);
}

/* MIT License

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
Terms */
function initializeScreenfull() {
  var fn = function () {
    var val;
    var fnMap = [['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'], // New WebKit
    ['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'], // Old WebKit
    ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'], ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'], ['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError']];
    var i = 0;
    var l = fnMap.length;
    var ret = {};

    for (; i < l; i++) {
      val = fnMap[i];

      if (val && val[1] in document) {
        for (i = 0; i < val.length; i++) {
          ret[fnMap[0][i]] = val[i];
        }

        return ret;
      }
    }

    return false;
  }();

  var eventNameMap = {
    fullscreenchange: fn.fullscreenchange,
    fullscreenerror: fn.fullscreenerror
  };
  var screenfull = {
    request: function request(element) {
      return new Promise(function (resolve, reject) {
        var onFullScreenEntered = function onFullScreenEntered() {
          screenfull.off('fullscreenchange', onFullScreenEntered);
          resolve();
        };

        screenfull.on('fullscreenchange', onFullScreenEntered);
        element = element || document.documentElement;
        var returnPromise = element[fn.requestFullscreen]();

        if (returnPromise instanceof Promise) {
          returnPromise.then(onFullScreenEntered).catch(reject);
        }
      });
    },
    exit: function exit() {
      return new Promise(function (resolve, reject) {
        if (!screenfull.isFullscreen) {
          resolve();
          return;
        }

        var onFullScreenExit = function onFullScreenExit() {
          screenfull.off('fullscreenchange', onFullScreenExit);
          resolve();
        };

        screenfull.on('fullscreenchange', onFullScreenExit);
        var returnPromise = document[fn.exitFullscreen]();

        if (returnPromise instanceof Promise) {
          returnPromise.then(onFullScreenExit).catch(reject);
        }
      });
    },
    on: function on(event, callback) {
      var eventName = eventNameMap[event];

      if (eventName) {
        document.addEventListener(eventName, callback);
      }
    },
    off: function off(event, callback) {
      var eventName = eventNameMap[event];

      if (eventName) {
        document.removeEventListener(eventName, callback);
      }
    }
  };
  Object.defineProperties(screenfull, {
    isFullscreen: {
      get: function get() {
        return Boolean(document[fn.fullscreenElement]);
      }
    },
    element: {
      enumerable: true,
      get: function get() {
        return document[fn.fullscreenElement];
      }
    },
    isEnabled: {
      enumerable: true,
      get: function get() {
        // Coerce to boolean in case of old WebKit
        return Boolean(document[fn.fullscreenEnabled]);
      }
    }
  });
  return screenfull;
}

var playerMap = new WeakMap();
var readyMap = new WeakMap();
var screenfull = {};

var Player = /*#__PURE__*/function () {
  /**
   * Create a Player.
   *
   * @param {(HTMLIFrameElement|HTMLElement|string|jQuery)} element A reference to the Vimeo
   *        player iframe, and id, or a jQuery object.
   * @param {object} [options] oEmbed parameters to use when creating an embed in the element.
   * @return {Player}
   */
  function Player(element) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Player);

    /* global jQuery */
    if (window.jQuery && element instanceof jQuery) {
      if (element.length > 1 && window.console && console.warn) {
        console.warn('A jQuery object with multiple elements was passed, using the first element.');
      }

      element = element[0];
    } // Find an element by ID


    if (typeof document !== 'undefined' && typeof element === 'string') {
      element = document.getElementById(element);
    } // Not an element!


    if (!isDomElement(element)) {
      throw new TypeError('You must pass either a valid element or a valid id.');
    } // Already initialized an embed in this div, so grab the iframe


    if (element.nodeName !== 'IFRAME') {
      var iframe = element.querySelector('iframe');

      if (iframe) {
        element = iframe;
      }
    } // iframe url is not a Vimeo url


    if (element.nodeName === 'IFRAME' && !isVimeoUrl(element.getAttribute('src') || '')) {
      throw new Error('The player element passed isn’t a Vimeo embed.');
    } // If there is already a player object in the map, return that


    if (playerMap.has(element)) {
      return playerMap.get(element);
    }

    this._window = element.ownerDocument.defaultView;
    this.element = element;
    this.origin = '*';
    var readyPromise = new npo_src(function (resolve, reject) {
      _this._onMessage = function (event) {
        if (!isVimeoUrl(event.origin) || _this.element.contentWindow !== event.source) {
          return;
        }

        if (_this.origin === '*') {
          _this.origin = event.origin;
        }

        var data = parseMessageData(event.data);
        var isError = data && data.event === 'error';
        var isReadyError = isError && data.data && data.data.method === 'ready';

        if (isReadyError) {
          var error = new Error(data.data.message);
          error.name = data.data.name;
          reject(error);
          return;
        }

        var isReadyEvent = data && data.event === 'ready';
        var isPingResponse = data && data.method === 'ping';

        if (isReadyEvent || isPingResponse) {
          _this.element.setAttribute('data-ready', 'true');

          resolve();
          return;
        }

        processData(_this, data);
      };

      _this._window.addEventListener('message', _this._onMessage);

      if (_this.element.nodeName !== 'IFRAME') {
        var params = getOEmbedParameters(element, options);
        var url = getVimeoUrl(params);
        getOEmbedData(url, params, element).then(function (data) {
          var iframe = createEmbed(data, element); // Overwrite element with the new iframe,
          // but store reference to the original element

          _this.element = iframe;
          _this._originalElement = element;
          swapCallbacks(element, iframe);
          playerMap.set(_this.element, _this);
          return data;
        }).catch(reject);
      }
    }); // Store a copy of this Player in the map

    readyMap.set(this, readyPromise);
    playerMap.set(this.element, this); // Send a ping to the iframe so the ready promise will be resolved if
    // the player is already ready.

    if (this.element.nodeName === 'IFRAME') {
      postMessage(this, 'ping');
    }

    if (screenfull.isEnabled) {
      var exitFullscreen = function exitFullscreen() {
        return screenfull.exit();
      };

      this.fullscreenchangeHandler = function () {
        if (screenfull.isFullscreen) {
          storeCallback(_this, 'event:exitFullscreen', exitFullscreen);
        } else {
          removeCallback(_this, 'event:exitFullscreen', exitFullscreen);
        } // eslint-disable-next-line


        _this.ready().then(function () {
          postMessage(_this, 'fullscreenchange', screenfull.isFullscreen);
        });
      };

      screenfull.on('fullscreenchange', this.fullscreenchangeHandler);
    }

    return this;
  }
  /**
   * Get a promise for a method.
   *
   * @param {string} name The API method to call.
   * @param {Object} [args={}] Arguments to send via postMessage.
   * @return {Promise}
   */


  _createClass(Player, [{
    key: "callMethod",
    value: function callMethod(name) {
      var _this2 = this;

      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new npo_src(function (resolve, reject) {
        // We are storing the resolve/reject handlers to call later, so we
        // can’t return here.
        // eslint-disable-next-line promise/always-return
        return _this2.ready().then(function () {
          storeCallback(_this2, name, {
            resolve: resolve,
            reject: reject
          });
          postMessage(_this2, name, args);
        }).catch(reject);
      });
    }
    /**
     * Get a promise for the value of a player property.
     *
     * @param {string} name The property name
     * @return {Promise}
     */

  }, {
    key: "get",
    value: function get(name) {
      var _this3 = this;

      return new npo_src(function (resolve, reject) {
        name = getMethodName(name, 'get'); // We are storing the resolve/reject handlers to call later, so we
        // can’t return here.
        // eslint-disable-next-line promise/always-return

        return _this3.ready().then(function () {
          storeCallback(_this3, name, {
            resolve: resolve,
            reject: reject
          });
          postMessage(_this3, name);
        }).catch(reject);
      });
    }
    /**
     * Get a promise for setting the value of a player property.
     *
     * @param {string} name The API method to call.
     * @param {mixed} value The value to set.
     * @return {Promise}
     */

  }, {
    key: "set",
    value: function set(name, value) {
      var _this4 = this;

      return new npo_src(function (resolve, reject) {
        name = getMethodName(name, 'set');

        if (value === undefined || value === null) {
          throw new TypeError('There must be a value to set.');
        } // We are storing the resolve/reject handlers to call later, so we
        // can’t return here.
        // eslint-disable-next-line promise/always-return


        return _this4.ready().then(function () {
          storeCallback(_this4, name, {
            resolve: resolve,
            reject: reject
          });
          postMessage(_this4, name, value);
        }).catch(reject);
      });
    }
    /**
     * Add an event listener for the specified event. Will call the
     * callback with a single parameter, `data`, that contains the data for
     * that event.
     *
     * @param {string} eventName The name of the event.
     * @param {function(*)} callback The function to call when the event fires.
     * @return {void}
     */

  }, {
    key: "on",
    value: function on(eventName, callback) {
      if (!eventName) {
        throw new TypeError('You must pass an event name.');
      }

      if (!callback) {
        throw new TypeError('You must pass a callback function.');
      }

      if (typeof callback !== 'function') {
        throw new TypeError('The callback must be a function.');
      }

      var callbacks = getCallbacks(this, "event:".concat(eventName));

      if (callbacks.length === 0) {
        this.callMethod('addEventListener', eventName).catch(function () {// Ignore the error. There will be an error event fired that
          // will trigger the error callback if they are listening.
        });
      }

      storeCallback(this, "event:".concat(eventName), callback);
    }
    /**
     * Remove an event listener for the specified event. Will remove all
     * listeners for that event if a `callback` isn’t passed, or only that
     * specific callback if it is passed.
     *
     * @param {string} eventName The name of the event.
     * @param {function} [callback] The specific callback to remove.
     * @return {void}
     */

  }, {
    key: "off",
    value: function off(eventName, callback) {
      if (!eventName) {
        throw new TypeError('You must pass an event name.');
      }

      if (callback && typeof callback !== 'function') {
        throw new TypeError('The callback must be a function.');
      }

      var lastCallback = removeCallback(this, "event:".concat(eventName), callback); // If there are no callbacks left, remove the listener

      if (lastCallback) {
        this.callMethod('removeEventListener', eventName).catch(function (e) {// Ignore the error. There will be an error event fired that
          // will trigger the error callback if they are listening.
        });
      }
    }
    /**
     * A promise to load a new video.
     *
     * @promise LoadVideoPromise
     * @fulfill {number} The video with this id or url successfully loaded.
     * @reject {TypeError} The id was not a number.
     */

    /**
     * Load a new video into this embed. The promise will be resolved if
     * the video is successfully loaded, or it will be rejected if it could
     * not be loaded.
     *
     * @param {number|string|object} options The id of the video, the url of the video, or an object with embed options.
     * @return {LoadVideoPromise}
     */

  }, {
    key: "loadVideo",
    value: function loadVideo(options) {
      return this.callMethod('loadVideo', options);
    }
    /**
     * A promise to perform an action when the Player is ready.
     *
     * @todo document errors
     * @promise LoadVideoPromise
     * @fulfill {void}
     */

    /**
     * Trigger a function when the player iframe has initialized. You do not
     * need to wait for `ready` to trigger to begin adding event listeners
     * or calling other methods.
     *
     * @return {ReadyPromise}
     */

  }, {
    key: "ready",
    value: function ready() {
      var readyPromise = readyMap.get(this) || new npo_src(function (resolve, reject) {
        reject(new Error('Unknown player. Probably unloaded.'));
      });
      return npo_src.resolve(readyPromise);
    }
    /**
     * A promise to add a cue point to the player.
     *
     * @promise AddCuePointPromise
     * @fulfill {string} The id of the cue point to use for removeCuePoint.
     * @reject {RangeError} the time was less than 0 or greater than the
     *         video’s duration.
     * @reject {UnsupportedError} Cue points are not supported with the current
     *         player or browser.
     */

    /**
     * Add a cue point to the player.
     *
     * @param {number} time The time for the cue point.
     * @param {object} [data] Arbitrary data to be returned with the cue point.
     * @return {AddCuePointPromise}
     */

  }, {
    key: "addCuePoint",
    value: function addCuePoint(time) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.callMethod('addCuePoint', {
        time: time,
        data: data
      });
    }
    /**
     * A promise to remove a cue point from the player.
     *
     * @promise AddCuePointPromise
     * @fulfill {string} The id of the cue point that was removed.
     * @reject {InvalidCuePoint} The cue point with the specified id was not
     *         found.
     * @reject {UnsupportedError} Cue points are not supported with the current
     *         player or browser.
     */

    /**
     * Remove a cue point from the video.
     *
     * @param {string} id The id of the cue point to remove.
     * @return {RemoveCuePointPromise}
     */

  }, {
    key: "removeCuePoint",
    value: function removeCuePoint(id) {
      return this.callMethod('removeCuePoint', id);
    }
    /**
     * A representation of a text track on a video.
     *
     * @typedef {Object} VimeoTextTrack
     * @property {string} language The ISO language code.
     * @property {string} kind The kind of track it is (captions or subtitles).
     * @property {string} label The human‐readable label for the track.
     */

    /**
     * A promise to enable a text track.
     *
     * @promise EnableTextTrackPromise
     * @fulfill {VimeoTextTrack} The text track that was enabled.
     * @reject {InvalidTrackLanguageError} No track was available with the
     *         specified language.
     * @reject {InvalidTrackError} No track was available with the specified
     *         language and kind.
     */

    /**
     * Enable the text track with the specified language, and optionally the
     * specified kind (captions or subtitles).
     *
     * When set via the API, the track language will not change the viewer’s
     * stored preference.
     *
     * @param {string} language The two‐letter language code.
     * @param {string} [kind] The kind of track to enable (captions or subtitles).
     * @return {EnableTextTrackPromise}
     */

  }, {
    key: "enableTextTrack",
    value: function enableTextTrack(language, kind) {
      if (!language) {
        throw new TypeError('You must pass a language.');
      }

      return this.callMethod('enableTextTrack', {
        language: language,
        kind: kind
      });
    }
    /**
     * A promise to disable the active text track.
     *
     * @promise DisableTextTrackPromise
     * @fulfill {void} The track was disabled.
     */

    /**
     * Disable the currently-active text track.
     *
     * @return {DisableTextTrackPromise}
     */

  }, {
    key: "disableTextTrack",
    value: function disableTextTrack() {
      return this.callMethod('disableTextTrack');
    }
    /**
     * A promise to pause the video.
     *
     * @promise PausePromise
     * @fulfill {void} The video was paused.
     */

    /**
     * Pause the video if it’s playing.
     *
     * @return {PausePromise}
     */

  }, {
    key: "pause",
    value: function pause() {
      return this.callMethod('pause');
    }
    /**
     * A promise to play the video.
     *
     * @promise PlayPromise
     * @fulfill {void} The video was played.
     */

    /**
     * Play the video if it’s paused. **Note:** on iOS and some other
     * mobile devices, you cannot programmatically trigger play. Once the
     * viewer has tapped on the play button in the player, however, you
     * will be able to use this function.
     *
     * @return {PlayPromise}
     */

  }, {
    key: "play",
    value: function play() {
      return this.callMethod('play');
    }
    /**
     * Request that the player enters fullscreen.
     * @return {Promise}
     */

  }, {
    key: "requestFullscreen",
    value: function requestFullscreen() {
      if (screenfull.isEnabled) {
        return screenfull.request(this.element);
      }

      return this.callMethod('requestFullscreen');
    }
    /**
     * Request that the player exits fullscreen.
     * @return {Promise}
     */

  }, {
    key: "exitFullscreen",
    value: function exitFullscreen() {
      if (screenfull.isEnabled) {
        return screenfull.exit();
      }

      return this.callMethod('exitFullscreen');
    }
    /**
     * Returns true if the player is currently fullscreen.
     * @return {Promise}
     */

  }, {
    key: "getFullscreen",
    value: function getFullscreen() {
      if (screenfull.isEnabled) {
        return npo_src.resolve(screenfull.isFullscreen);
      }

      return this.get('fullscreen');
    }
    /**
     * Request that the player enters picture-in-picture.
     * @return {Promise}
     */

  }, {
    key: "requestPictureInPicture",
    value: function requestPictureInPicture() {
      return this.callMethod('requestPictureInPicture');
    }
    /**
     * Request that the player exits picture-in-picture.
     * @return {Promise}
     */

  }, {
    key: "exitPictureInPicture",
    value: function exitPictureInPicture() {
      return this.callMethod('exitPictureInPicture');
    }
    /**
     * Returns true if the player is currently picture-in-picture.
     * @return {Promise}
     */

  }, {
    key: "getPictureInPicture",
    value: function getPictureInPicture() {
      return this.get('pictureInPicture');
    }
    /**
     * A promise to unload the video.
     *
     * @promise UnloadPromise
     * @fulfill {void} The video was unloaded.
     */

    /**
     * Return the player to its initial state.
     *
     * @return {UnloadPromise}
     */

  }, {
    key: "unload",
    value: function unload() {
      return this.callMethod('unload');
    }
    /**
     * Cleanup the player and remove it from the DOM
     *
     * It won't be usable and a new one should be constructed
     *  in order to do any operations.
     *
     * @return {Promise}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this5 = this;

      return new npo_src(function (resolve) {
        readyMap.delete(_this5);
        playerMap.delete(_this5.element);

        if (_this5._originalElement) {
          playerMap.delete(_this5._originalElement);

          _this5._originalElement.removeAttribute('data-vimeo-initialized');
        }

        if (_this5.element && _this5.element.nodeName === 'IFRAME' && _this5.element.parentNode) {
          // If we've added an additional wrapper div, remove that from the DOM.
          // If not, just remove the iframe element.
          if (_this5.element.parentNode.parentNode && _this5._originalElement && _this5._originalElement !== _this5.element.parentNode) {
            _this5.element.parentNode.parentNode.removeChild(_this5.element.parentNode);
          } else {
            _this5.element.parentNode.removeChild(_this5.element);
          }
        } // If the clip is private there is a case where the element stays the
        // div element. Destroy should reset the div and remove the iframe child.


        if (_this5.element && _this5.element.nodeName === 'DIV' && _this5.element.parentNode) {
          _this5.element.removeAttribute('data-vimeo-initialized');

          var iframe = _this5.element.querySelector('iframe');

          if (iframe && iframe.parentNode) {
            // If we've added an additional wrapper div, remove that from the DOM.
            // If not, just remove the iframe element.
            if (iframe.parentNode.parentNode && _this5._originalElement && _this5._originalElement !== iframe.parentNode) {
              iframe.parentNode.parentNode.removeChild(iframe.parentNode);
            } else {
              iframe.parentNode.removeChild(iframe);
            }
          }
        }

        _this5._window.removeEventListener('message', _this5._onMessage);

        if (screenfull.isEnabled) {
          screenfull.off('fullscreenchange', _this5.fullscreenchangeHandler);
        }

        resolve();
      });
    }
    /**
     * A promise to get the autopause behavior of the video.
     *
     * @promise GetAutopausePromise
     * @fulfill {boolean} Whether autopause is turned on or off.
     * @reject {UnsupportedError} Autopause is not supported with the current
     *         player or browser.
     */

    /**
     * Get the autopause behavior for this player.
     *
     * @return {GetAutopausePromise}
     */

  }, {
    key: "getAutopause",
    value: function getAutopause() {
      return this.get('autopause');
    }
    /**
     * A promise to set the autopause behavior of the video.
     *
     * @promise SetAutopausePromise
     * @fulfill {boolean} Whether autopause is turned on or off.
     * @reject {UnsupportedError} Autopause is not supported with the current
     *         player or browser.
     */

    /**
     * Enable or disable the autopause behavior of this player.
     *
     * By default, when another video is played in the same browser, this
     * player will automatically pause. Unless you have a specific reason
     * for doing so, we recommend that you leave autopause set to the
     * default (`true`).
     *
     * @param {boolean} autopause
     * @return {SetAutopausePromise}
     */

  }, {
    key: "setAutopause",
    value: function setAutopause(autopause) {
      return this.set('autopause', autopause);
    }
    /**
     * A promise to get the buffered property of the video.
     *
     * @promise GetBufferedPromise
     * @fulfill {Array} Buffered Timeranges converted to an Array.
     */

    /**
     * Get the buffered property of the video.
     *
     * @return {GetBufferedPromise}
     */

  }, {
    key: "getBuffered",
    value: function getBuffered() {
      return this.get('buffered');
    }
    /**
     * @typedef {Object} CameraProperties
     * @prop {number} props.yaw - Number between 0 and 360.
     * @prop {number} props.pitch - Number between -90 and 90.
     * @prop {number} props.roll - Number between -180 and 180.
     * @prop {number} props.fov - The field of view in degrees.
     */

    /**
     * A promise to get the camera properties of the player.
     *
     * @promise GetCameraPromise
     * @fulfill {CameraProperties} The camera properties.
     */

    /**
     * For 360° videos get the camera properties for this player.
     *
     * @return {GetCameraPromise}
     */

  }, {
    key: "getCameraProps",
    value: function getCameraProps() {
      return this.get('cameraProps');
    }
    /**
     * A promise to set the camera properties of the player.
     *
     * @promise SetCameraPromise
     * @fulfill {Object} The camera was successfully set.
     * @reject {RangeError} The range was out of bounds.
     */

    /**
     * For 360° videos set the camera properties for this player.
     *
     * @param {CameraProperties} camera The camera properties
     * @return {SetCameraPromise}
     */

  }, {
    key: "setCameraProps",
    value: function setCameraProps(camera) {
      return this.set('cameraProps', camera);
    }
    /**
     * A representation of a chapter.
     *
     * @typedef {Object} VimeoChapter
     * @property {number} startTime The start time of the chapter.
     * @property {object} title The title of the chapter.
     * @property {number} index The place in the order of Chapters. Starts at 1.
     */

    /**
     * A promise to get chapters for the video.
     *
     * @promise GetChaptersPromise
     * @fulfill {VimeoChapter[]} The chapters for the video.
     */

    /**
     * Get an array of all the chapters for the video.
     *
     * @return {GetChaptersPromise}
     */

  }, {
    key: "getChapters",
    value: function getChapters() {
      return this.get('chapters');
    }
    /**
     * A promise to get the currently active chapter.
     *
     * @promise GetCurrentChaptersPromise
     * @fulfill {VimeoChapter|undefined} The current chapter for the video.
     */

    /**
     * Get the currently active chapter for the video.
     *
     * @return {GetCurrentChaptersPromise}
     */

  }, {
    key: "getCurrentChapter",
    value: function getCurrentChapter() {
      return this.get('currentChapter');
    }
    /**
     * A promise to get the color of the player.
     *
     * @promise GetColorPromise
     * @fulfill {string} The hex color of the player.
     */

    /**
     * Get the color for this player.
     *
     * @return {GetColorPromise}
     */

  }, {
    key: "getColor",
    value: function getColor() {
      return this.get('color');
    }
    /**
     * A promise to set the color of the player.
     *
     * @promise SetColorPromise
     * @fulfill {string} The color was successfully set.
     * @reject {TypeError} The string was not a valid hex or rgb color.
     * @reject {ContrastError} The color was set, but the contrast is
     *         outside of the acceptable range.
     * @reject {EmbedSettingsError} The owner of the player has chosen to
     *         use a specific color.
     */

    /**
     * Set the color of this player to a hex or rgb string. Setting the
     * color may fail if the owner of the video has set their embed
     * preferences to force a specific color.
     *
     * @param {string} color The hex or rgb color string to set.
     * @return {SetColorPromise}
     */

  }, {
    key: "setColor",
    value: function setColor(color) {
      return this.set('color', color);
    }
    /**
     * A representation of a cue point.
     *
     * @typedef {Object} VimeoCuePoint
     * @property {number} time The time of the cue point.
     * @property {object} data The data passed when adding the cue point.
     * @property {string} id The unique id for use with removeCuePoint.
     */

    /**
     * A promise to get the cue points of a video.
     *
     * @promise GetCuePointsPromise
     * @fulfill {VimeoCuePoint[]} The cue points added to the video.
     * @reject {UnsupportedError} Cue points are not supported with the current
     *         player or browser.
     */

    /**
     * Get an array of the cue points added to the video.
     *
     * @return {GetCuePointsPromise}
     */

  }, {
    key: "getCuePoints",
    value: function getCuePoints() {
      return this.get('cuePoints');
    }
    /**
     * A promise to get the current time of the video.
     *
     * @promise GetCurrentTimePromise
     * @fulfill {number} The current time in seconds.
     */

    /**
     * Get the current playback position in seconds.
     *
     * @return {GetCurrentTimePromise}
     */

  }, {
    key: "getCurrentTime",
    value: function getCurrentTime() {
      return this.get('currentTime');
    }
    /**
     * A promise to set the current time of the video.
     *
     * @promise SetCurrentTimePromise
     * @fulfill {number} The actual current time that was set.
     * @reject {RangeError} the time was less than 0 or greater than the
     *         video’s duration.
     */

    /**
     * Set the current playback position in seconds. If the player was
     * paused, it will remain paused. Likewise, if the player was playing,
     * it will resume playing once the video has buffered.
     *
     * You can provide an accurate time and the player will attempt to seek
     * to as close to that time as possible. The exact time will be the
     * fulfilled value of the promise.
     *
     * @param {number} currentTime
     * @return {SetCurrentTimePromise}
     */

  }, {
    key: "setCurrentTime",
    value: function setCurrentTime(currentTime) {
      return this.set('currentTime', currentTime);
    }
    /**
     * A promise to get the duration of the video.
     *
     * @promise GetDurationPromise
     * @fulfill {number} The duration in seconds.
     */

    /**
     * Get the duration of the video in seconds. It will be rounded to the
     * nearest second before playback begins, and to the nearest thousandth
     * of a second after playback begins.
     *
     * @return {GetDurationPromise}
     */

  }, {
    key: "getDuration",
    value: function getDuration() {
      return this.get('duration');
    }
    /**
     * A promise to get the ended state of the video.
     *
     * @promise GetEndedPromise
     * @fulfill {boolean} Whether or not the video has ended.
     */

    /**
     * Get the ended state of the video. The video has ended if
     * `currentTime === duration`.
     *
     * @return {GetEndedPromise}
     */

  }, {
    key: "getEnded",
    value: function getEnded() {
      return this.get('ended');
    }
    /**
     * A promise to get the loop state of the player.
     *
     * @promise GetLoopPromise
     * @fulfill {boolean} Whether or not the player is set to loop.
     */

    /**
     * Get the loop state of the player.
     *
     * @return {GetLoopPromise}
     */

  }, {
    key: "getLoop",
    value: function getLoop() {
      return this.get('loop');
    }
    /**
     * A promise to set the loop state of the player.
     *
     * @promise SetLoopPromise
     * @fulfill {boolean} The loop state that was set.
     */

    /**
     * Set the loop state of the player. When set to `true`, the player
     * will start over immediately once playback ends.
     *
     * @param {boolean} loop
     * @return {SetLoopPromise}
     */

  }, {
    key: "setLoop",
    value: function setLoop(loop) {
      return this.set('loop', loop);
    }
    /**
     * A promise to set the muted state of the player.
     *
     * @promise SetMutedPromise
     * @fulfill {boolean} The muted state that was set.
     */

    /**
     * Set the muted state of the player. When set to `true`, the player
     * volume will be muted.
     *
     * @param {boolean} muted
     * @return {SetMutedPromise}
     */

  }, {
    key: "setMuted",
    value: function setMuted(muted) {
      return this.set('muted', muted);
    }
    /**
     * A promise to get the muted state of the player.
     *
     * @promise GetMutedPromise
     * @fulfill {boolean} Whether or not the player is muted.
     */

    /**
     * Get the muted state of the player.
     *
     * @return {GetMutedPromise}
     */

  }, {
    key: "getMuted",
    value: function getMuted() {
      return this.get('muted');
    }
    /**
     * A promise to get the paused state of the player.
     *
     * @promise GetLoopPromise
     * @fulfill {boolean} Whether or not the video is paused.
     */

    /**
     * Get the paused state of the player.
     *
     * @return {GetLoopPromise}
     */

  }, {
    key: "getPaused",
    value: function getPaused() {
      return this.get('paused');
    }
    /**
     * A promise to get the playback rate of the player.
     *
     * @promise GetPlaybackRatePromise
     * @fulfill {number} The playback rate of the player on a scale from 0.5 to 2.
     */

    /**
     * Get the playback rate of the player on a scale from `0.5` to `2`.
     *
     * @return {GetPlaybackRatePromise}
     */

  }, {
    key: "getPlaybackRate",
    value: function getPlaybackRate() {
      return this.get('playbackRate');
    }
    /**
     * A promise to set the playbackrate of the player.
     *
     * @promise SetPlaybackRatePromise
     * @fulfill {number} The playback rate was set.
     * @reject {RangeError} The playback rate was less than 0.5 or greater than 2.
     */

    /**
     * Set the playback rate of the player on a scale from `0.5` to `2`. When set
     * via the API, the playback rate will not be synchronized to other
     * players or stored as the viewer's preference.
     *
     * @param {number} playbackRate
     * @return {SetPlaybackRatePromise}
     */

  }, {
    key: "setPlaybackRate",
    value: function setPlaybackRate(playbackRate) {
      return this.set('playbackRate', playbackRate);
    }
    /**
     * A promise to get the played property of the video.
     *
     * @promise GetPlayedPromise
     * @fulfill {Array} Played Timeranges converted to an Array.
     */

    /**
     * Get the played property of the video.
     *
     * @return {GetPlayedPromise}
     */

  }, {
    key: "getPlayed",
    value: function getPlayed() {
      return this.get('played');
    }
    /**
     * A promise to get the qualities available of the current video.
     *
     * @promise GetQualitiesPromise
     * @fulfill {Array} The qualities of the video.
     */

    /**
     * Get the qualities of the current video.
     *
     * @return {GetQualitiesPromise}
     */

  }, {
    key: "getQualities",
    value: function getQualities() {
      return this.get('qualities');
    }
    /**
     * A promise to get the current set quality of the video.
     *
     * @promise GetQualityPromise
     * @fulfill {string} The current set quality.
     */

    /**
     * Get the current set quality of the video.
     *
     * @return {GetQualityPromise}
     */

  }, {
    key: "getQuality",
    value: function getQuality() {
      return this.get('quality');
    }
    /**
     * A promise to set the video quality.
     *
     * @promise SetQualityPromise
     * @fulfill {number} The quality was set.
     * @reject {RangeError} The quality is not available.
     */

    /**
     * Set a video quality.
     *
     * @param {string} quality
     * @return {SetQualityPromise}
     */

  }, {
    key: "setQuality",
    value: function setQuality(quality) {
      return this.set('quality', quality);
    }
    /**
     * A promise to get the seekable property of the video.
     *
     * @promise GetSeekablePromise
     * @fulfill {Array} Seekable Timeranges converted to an Array.
     */

    /**
     * Get the seekable property of the video.
     *
     * @return {GetSeekablePromise}
     */

  }, {
    key: "getSeekable",
    value: function getSeekable() {
      return this.get('seekable');
    }
    /**
     * A promise to get the seeking property of the player.
     *
     * @promise GetSeekingPromise
     * @fulfill {boolean} Whether or not the player is currently seeking.
     */

    /**
     * Get if the player is currently seeking.
     *
     * @return {GetSeekingPromise}
     */

  }, {
    key: "getSeeking",
    value: function getSeeking() {
      return this.get('seeking');
    }
    /**
     * A promise to get the text tracks of a video.
     *
     * @promise GetTextTracksPromise
     * @fulfill {VimeoTextTrack[]} The text tracks associated with the video.
     */

    /**
     * Get an array of the text tracks that exist for the video.
     *
     * @return {GetTextTracksPromise}
     */

  }, {
    key: "getTextTracks",
    value: function getTextTracks() {
      return this.get('textTracks');
    }
    /**
     * A promise to get the embed code for the video.
     *
     * @promise GetVideoEmbedCodePromise
     * @fulfill {string} The `<iframe>` embed code for the video.
     */

    /**
     * Get the `<iframe>` embed code for the video.
     *
     * @return {GetVideoEmbedCodePromise}
     */

  }, {
    key: "getVideoEmbedCode",
    value: function getVideoEmbedCode() {
      return this.get('videoEmbedCode');
    }
    /**
     * A promise to get the id of the video.
     *
     * @promise GetVideoIdPromise
     * @fulfill {number} The id of the video.
     */

    /**
     * Get the id of the video.
     *
     * @return {GetVideoIdPromise}
     */

  }, {
    key: "getVideoId",
    value: function getVideoId() {
      return this.get('videoId');
    }
    /**
     * A promise to get the title of the video.
     *
     * @promise GetVideoTitlePromise
     * @fulfill {number} The title of the video.
     */

    /**
     * Get the title of the video.
     *
     * @return {GetVideoTitlePromise}
     */

  }, {
    key: "getVideoTitle",
    value: function getVideoTitle() {
      return this.get('videoTitle');
    }
    /**
     * A promise to get the native width of the video.
     *
     * @promise GetVideoWidthPromise
     * @fulfill {number} The native width of the video.
     */

    /**
     * Get the native width of the currently‐playing video. The width of
     * the highest‐resolution available will be used before playback begins.
     *
     * @return {GetVideoWidthPromise}
     */

  }, {
    key: "getVideoWidth",
    value: function getVideoWidth() {
      return this.get('videoWidth');
    }
    /**
     * A promise to get the native height of the video.
     *
     * @promise GetVideoHeightPromise
     * @fulfill {number} The native height of the video.
     */

    /**
     * Get the native height of the currently‐playing video. The height of
     * the highest‐resolution available will be used before playback begins.
     *
     * @return {GetVideoHeightPromise}
     */

  }, {
    key: "getVideoHeight",
    value: function getVideoHeight() {
      return this.get('videoHeight');
    }
    /**
     * A promise to get the vimeo.com url for the video.
     *
     * @promise GetVideoUrlPromise
     * @fulfill {number} The vimeo.com url for the video.
     * @reject {PrivacyError} The url isn’t available because of the video’s privacy setting.
     */

    /**
     * Get the vimeo.com url for the video.
     *
     * @return {GetVideoUrlPromise}
     */

  }, {
    key: "getVideoUrl",
    value: function getVideoUrl() {
      return this.get('videoUrl');
    }
    /**
     * A promise to get the volume level of the player.
     *
     * @promise GetVolumePromise
     * @fulfill {number} The volume level of the player on a scale from 0 to 1.
     */

    /**
     * Get the current volume level of the player on a scale from `0` to `1`.
     *
     * Most mobile devices do not support an independent volume from the
     * system volume. In those cases, this method will always return `1`.
     *
     * @return {GetVolumePromise}
     */

  }, {
    key: "getVolume",
    value: function getVolume() {
      return this.get('volume');
    }
    /**
     * A promise to set the volume level of the player.
     *
     * @promise SetVolumePromise
     * @fulfill {number} The volume was set.
     * @reject {RangeError} The volume was less than 0 or greater than 1.
     */

    /**
     * Set the volume of the player on a scale from `0` to `1`. When set
     * via the API, the volume level will not be synchronized to other
     * players or stored as the viewer’s preference.
     *
     * Most mobile devices do not support setting the volume. An error will
     * *not* be triggered in that situation.
     *
     * @param {number} volume
     * @return {SetVolumePromise}
     */

  }, {
    key: "setVolume",
    value: function setVolume(volume) {
      return this.set('volume', volume);
    }
  }]);

  return Player;
}(); // Setup embed only if this is not a node environment


if (!isNode) {
  screenfull = initializeScreenfull();
  initializeEmbeds();
  resizeEmbeds();
  initAppendVideoMetadata();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);


/***/ }),

/***/ "./src/assets/js/main/video/Video.ts":
/*!*******************************************!*\
  !*** ./src/assets/js/main/video/Video.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");
/* harmony import */ var _utils_observer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/observer */ "./src/assets/js/utils/observer.ts");



/**
 * This is video base class.
 */
class Video {
  constructor(element) {
    this.element = void 0;
    this.container = void 0;
    this.id = void 0;
    this.settings = void 0;
    this.canAutoplay = void 0;
    this.canHaveSound = void 0;
    this.isMuted = void 0;
    this.isPlaying = void 0;
    this.isReady = void 0;
    this.playTrigger = void 0;
    this.queue = void 0;
    this.player = void 0;
    this.playPromise = void 0;
    this.element = element;
    this.settings = this.element.getAttribute("data-settings");
    this.canAutoplay = this.settings.includes("autoplay");
    this.canHaveSound = !((/iPad|iPhone|iPod/.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && // @ts-expect-error
    !window.MSStream);
    this.container = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-video-container", element);
    this.id = element.getAttribute("data-id") || "";
    this.isMuted = this.settings.includes("muted");
    this.isPlaying = false;
    this.isReady = false;
    this.playTrigger = element.querySelector(".js-video-trigger");
    this.queue = new Set();
    this.createPlayer();

    this._bindTrigger();

    this._observeElement();

    element.dispatchEvent(new CustomEvent("videoloaded"));
  }

  play() {
    if (this.isPlaying) return;

    if (!this.isReady) {
      this.createPlayer();

      this._queueTask("play");

      return;
    }

    this.playPromise = Promise.resolve(this.playVideo());
  }

  async pause() {
    if (!this.isPlaying) return;

    if (!this.isReady || typeof this.playPromise === "undefined") {
      this._queueTask("pause");

      return;
    }

    await this.playPromise;
    this.pauseVideo();
    this.onStop();
  }

  onEnded() {
    this.onStop();
  }

  onPlay() {
    this.element.setAttribute("data-status", "loaded playing");
    this.isPlaying = true;
  }

  onStop() {
    this.element.setAttribute("data-status", "loaded paused");
    this.isPlaying = false;
  }

  watchResize(videoWidth, videoHeight) {
    const aspectRatio = videoHeight / videoWidth;

    const updateSize = () => {
      const containerWidth = this.element.clientWidth;
      this.container.style.width = `${containerWidth}px`;
      this.container.style.height = `${containerWidth * aspectRatio}px`;
    };

    updateSize();
    this.element.dispatchEvent(new CustomEvent("videosize"));
    window.dispatchEvent(new CustomEvent("resize"));
    window.addEventListener("resize", () => updateSize());
    this.player.element.setAttribute("tabindex", "-1");
  }

  flushQueue() {
    this.queue.forEach(command => this[command]());
    this.queue.clear();
  }

  _queueTask(command) {
    this.queue.add(command);
  }

  _bindTrigger() {
    if (!this.playTrigger) return;
    this.playTrigger.addEventListener("click", () => {
      this.isPlaying ? this.pause() : this.play();
    });
  }

  _observeElement() {
    (0,_utils_observer__WEBPACK_IMPORTED_MODULE_1__.observe)(this.container, inView => {
      if (inView && this.canAutoplay) {
        this.play();
      } else if (this.isReady) {
        this.pause();
      }
    }, {
      threshold: 0.25,
      rootMargin: "-50px"
    });
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Video);

/***/ }),

/***/ "./src/assets/js/main/video/types/Vimeo.ts":
/*!*************************************************!*\
  !*** ./src/assets/js/main/video/types/Vimeo.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _vimeo_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vimeo/player */ "./node_modules/@vimeo/player/dist/player.es.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/add-prefetch.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/device.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/index.ts");
/* harmony import */ var _Video__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Video */ "./src/assets/js/main/video/Video.ts");




class VimeoVideo extends _Video__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(...args) {
    super(...args);
    this.firstBuffer = true;
    this.player = void 0;
  }

  static _warmConnections() {
    if (VimeoVideo.preconnected) return; // The iframe document and most of its subresources come right off player.vimeo.com

    (0,_utils__WEBPACK_IMPORTED_MODULE_2__.addPrefetch)("preconnect", "https://player.vimeo.com"); // Images

    (0,_utils__WEBPACK_IMPORTED_MODULE_2__.addPrefetch)("preconnect", "https://i.vimeocdn.com"); // Files .js, .css

    (0,_utils__WEBPACK_IMPORTED_MODULE_2__.addPrefetch)("preconnect", "https://f.vimeocdn.com"); // Metrics

    (0,_utils__WEBPACK_IMPORTED_MODULE_2__.addPrefetch)("preconnect", "https://fresnel.vimeocdn.com");
    VimeoVideo.preconnected = true;
  }

  createPlayer() {
    if (this.player) return;

    VimeoVideo._warmConnections(); // Check if private video has two part id


    const url = this.container.getAttribute("data-url") || undefined;
    const player = new _vimeo_player__WEBPACK_IMPORTED_MODULE_0__["default"](this.container, {
      // background: this.autoplay,
      // autoplay: this.autoplay,
      byline: false,
      color: "ffffff",
      id: +this.id,
      url,
      loop: true,
      muted: true,
      portrait: false,
      title: false,
      controls: false
    });
    player.on("ended", () => this.onEnded());
    player.on("loaded", () => this._onReady(player));
    player.on("pause", () => this.pause());
    player.on("play", () => this.onPlay());
    if (_utils__WEBPACK_IMPORTED_MODULE_3__.isIOS) player.on("bufferend", () => {
      if (this.firstBuffer) {
        this.firstBuffer = false;
        this.onPlay();
      }
    });
  }

  playVideo() {
    this.player.play();
  }

  pauseVideo() {
    this.player.pause();
  }

  async _onReady(player) {
    this.player = player;
    this.isReady = true;
    const [width, height] = await Promise.all([player.getVideoWidth(), player.getVideoHeight()]);
    this.watchResize(width, height);
    (0,_utils__WEBPACK_IMPORTED_MODULE_4__.rIC)(() => this.flushQueue());
  }

}

VimeoVideo.preconnected = void 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VimeoVideo);

/***/ }),

/***/ "./src/assets/js/utils/add-prefetch.ts":
/*!*********************************************!*\
  !*** ./src/assets/js/utils/add-prefetch.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addPrefetch": () => (/* binding */ addPrefetch)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./element */ "./src/assets/js/utils/element.ts");


/**
 * Add a <link rel={preload | preconnect} ...> to the head
 */

function addPrefetch(kind, url, as) {
  (0,_element__WEBPACK_IMPORTED_MODULE_1__.renderElement)({
    type: "link",
    props: (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      rel: kind,
      href: url
    }, as && {
      as
    }, {
      crossOrigin: "anonymous"
    })
  }, document.head);
}

/***/ }),

/***/ "./src/assets/js/utils/animate.ts":
/*!****************************************!*\
  !*** ./src/assets/js/utils/animate.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "animateFrom": () => (/* binding */ animateFrom),
/* harmony export */   "animateTo": () => (/* binding */ animateTo)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");


/**
 * @param {HTMLElement} element
 * @param {Keyframe[] | PropertyIndexedKeyframes} to
 * @param {KeyframeAnimationOptions} options
 */
function animateTo(element, keyframes, options) {
  const anim = element.animate(keyframes, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, options, {
    fill: "both"
  }));
  anim.addEventListener("finish", () => {
    anim.commitStyles();
    anim.cancel();
  });
  return anim;
}
/**
 * @param {HTMLElement} element
 * @param {PropertyIndexedKeyframes} from
 * @param {KeyframeAnimationOptions} options
 */

function animateFrom(element, from, options) {
  return element.animate((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, from, {
    offset: 0
  }), (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, options, {
    fill: "backwards"
  }));
}

/***/ }),

/***/ "./src/assets/js/utils/animation-interval.ts":
/*!***************************************************!*\
  !*** ./src/assets/js/utils/animation-interval.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "animationInterval": () => (/* binding */ animationInterval)
/* harmony export */ });
/*
Usage:
import { animationInterval } from './1.js';

const controller = new AbortController();

// Create an animation callback every second:
animationInterval(1000, controller.signal, time => {
  console.log('tick!', time);
});

// And to stop it:
controller.abort();
*/
function animationInterval(ms, signal, callback) {
  const start = document.timeline.currentTime;

  function frame(time) {
    if (signal && signal.aborted) return;
    callback(time);
    scheduleFrame(time);
  }

  function scheduleFrame(time) {
    const elapsed = time - start;
    const roundedElapsed = Math.round(elapsed / ms) * ms;
    const targetNext = start + roundedElapsed + ms;
    const delay = targetNext - performance.now();
    setTimeout(() => requestAnimationFrame(frame), delay);
  }

  scheduleFrame(start);
}

/***/ }),

/***/ "./src/assets/js/utils/body-scroll-lock.ts":
/*!*************************************************!*\
  !*** ./src/assets/js/utils/body-scroll-lock.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lock": () => (/* binding */ lock),
/* harmony export */   "release": () => (/* binding */ release)
/* harmony export */ });
const elHtml = document.body;
let previousHtmlStyles = {};
function lock() {
  const {
    style: htmlStyle
  } = elHtml;
  previousHtmlStyles = {
    overflowY: htmlStyle.overflowY,
    minHeight: htmlStyle.minHeight,
    maxHeight: "auto"
  };
  Object.assign(elHtml.style, {
    overflowY: "hidden",
    minHeight: "100vh",
    maxHeight: "100vh"
  });
}
function release() {
  Object.assign(elHtml.style, previousHtmlStyles);
}

/***/ }),

/***/ "./src/assets/js/utils/constants.ts":
/*!******************************************!*\
  !*** ./src/assets/js/utils/constants.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "./src/assets/js/utils/cookies.ts":
/*!****************************************!*\
  !*** ./src/assets/js/utils/cookies.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkCookie": () => (/* binding */ checkCookie),
/* harmony export */   "getCookie": () => (/* binding */ getCookie),
/* harmony export */   "setCookie": () => (/* binding */ setCookie)
/* harmony export */ });
/* eslint-disable */
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }

    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return "";
}
function checkCookie() {
  var user = getCookie("username");

  if (user !== "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");

    if (user != "" && user != null) {
      setCookie("username", user, 365);
    }
  }
}

/***/ }),

/***/ "./src/assets/js/utils/debounce.ts":
/*!*****************************************!*\
  !*** ./src/assets/js/utils/debounce.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "debounce": () => (/* binding */ debounce),
/* harmony export */   "debouncePromise": () => (/* binding */ debouncePromise)
/* harmony export */ });
const debounce = (fn, ms = 0) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
const debouncePromise = (fn, ms = 0) => {
  let timeoutId;
  const pending = [];
  return (...args) => new Promise((res, rej) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const currentPending = [...pending];
      pending.length = 0;
      Promise.resolve(fn.apply(undefined, args)).then(data => {
        currentPending.forEach(({
          resolve
        }) => resolve(data));
      }, error => {
        currentPending.forEach(({
          reject
        }) => reject(error));
      });
    }, ms);
    pending.push({
      resolve: res,
      reject: rej
    });
  });
};

/***/ }),

/***/ "./src/assets/js/utils/device.ts":
/*!***************************************!*\
  !*** ./src/assets/js/utils/device.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "canHover": () => (/* binding */ canHover),
/* harmony export */   "isIOS": () => (/* binding */ isIOS),
/* harmony export */   "screenWidth": () => (/* binding */ screenWidth)
/* harmony export */ });
const isIOS = (/iPad|iPhone|iPod/.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && // @ts-expect-error
!window.MSStream;
const canHover = matchMedia("(hover: hover)").matches;
const screenWidth = window.innerWidth;

/***/ }),

/***/ "./src/assets/js/utils/fetch.ts":
/*!**************************************!*\
  !*** ./src/assets/js/utils/fetch.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchConfig": () => (/* binding */ fetchConfig),
/* harmony export */   "serializeForm": () => (/* binding */ serializeForm)
/* harmony export */ });
function serializeForm(form) {
  const obj = {};
  const formData = new FormData(form);

  for (const key of formData.keys()) {
    obj[key] = formData.get(key);
  }

  return JSON.stringify(obj);
}
function fetchConfig(type = "json") {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: `application/${type}`
    }
  };
}

/***/ }),

/***/ "./src/assets/js/utils/index.ts":
/*!**************************************!*\
  !*** ./src/assets/js/utils/index.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CONSTANTS": () => (/* reexport module object */ _constants__WEBPACK_IMPORTED_MODULE_9__),
/* harmony export */   "addPrefetch": () => (/* reexport safe */ _add_prefetch__WEBPACK_IMPORTED_MODULE_0__.addPrefetch),
/* harmony export */   "animateFrom": () => (/* reexport safe */ _animate__WEBPACK_IMPORTED_MODULE_6__.animateFrom),
/* harmony export */   "animateTo": () => (/* reexport safe */ _animate__WEBPACK_IMPORTED_MODULE_6__.animateTo),
/* harmony export */   "animationInterval": () => (/* reexport safe */ _animation_interval__WEBPACK_IMPORTED_MODULE_7__.animationInterval),
/* harmony export */   "attachEvent": () => (/* reexport safe */ _attach_event__WEBPACK_IMPORTED_MODULE_1__.attachEvent),
/* harmony export */   "bodyScrollLock": () => (/* reexport module object */ _body_scroll_lock__WEBPACK_IMPORTED_MODULE_8__),
/* harmony export */   "checkCookie": () => (/* reexport safe */ _cookies__WEBPACK_IMPORTED_MODULE_16__.checkCookie),
/* harmony export */   "debounce": () => (/* reexport safe */ _debounce__WEBPACK_IMPORTED_MODULE_4__.debounce),
/* harmony export */   "debouncePromise": () => (/* reexport safe */ _debounce__WEBPACK_IMPORTED_MODULE_4__.debouncePromise),
/* harmony export */   "device": () => (/* reexport module object */ _device__WEBPACK_IMPORTED_MODULE_10__),
/* harmony export */   "elementIsVisibleInViewport": () => (/* binding */ elementIsVisibleInViewport),
/* harmony export */   "fetchConfig": () => (/* reexport safe */ _fetch__WEBPACK_IMPORTED_MODULE_14__.fetchConfig),
/* harmony export */   "get": () => (/* reexport safe */ _element__WEBPACK_IMPORTED_MODULE_2__.get),
/* harmony export */   "getAll": () => (/* reexport safe */ _element__WEBPACK_IMPORTED_MODULE_2__.getAll),
/* harmony export */   "getCookie": () => (/* reexport safe */ _cookies__WEBPACK_IMPORTED_MODULE_16__.getCookie),
/* harmony export */   "getSiblings": () => (/* reexport safe */ _element__WEBPACK_IMPORTED_MODULE_2__.getSiblings),
/* harmony export */   "noop": () => (/* reexport safe */ _noop__WEBPACK_IMPORTED_MODULE_3__.noop),
/* harmony export */   "observer": () => (/* reexport module object */ _observer__WEBPACK_IMPORTED_MODULE_11__),
/* harmony export */   "rIC": () => (/* binding */ rIC),
/* harmony export */   "renderElement": () => (/* reexport safe */ _element__WEBPACK_IMPORTED_MODULE_2__.renderElement),
/* harmony export */   "serializeForm": () => (/* reexport safe */ _fetch__WEBPACK_IMPORTED_MODULE_14__.serializeForm),
/* harmony export */   "setCookie": () => (/* reexport safe */ _cookies__WEBPACK_IMPORTED_MODULE_16__.setCookie),
/* harmony export */   "shopifyUtils": () => (/* reexport module object */ _shopify__WEBPACK_IMPORTED_MODULE_13__),
/* harmony export */   "smoothScroll": () => (/* reexport safe */ _smooth_scroll__WEBPACK_IMPORTED_MODULE_15__.smoothScroll),
/* harmony export */   "stringUtils": () => (/* reexport module object */ _string__WEBPACK_IMPORTED_MODULE_12__),
/* harmony export */   "throttle": () => (/* reexport safe */ _throttle__WEBPACK_IMPORTED_MODULE_5__.throttle)
/* harmony export */ });
/* harmony import */ var _body_scroll_lock__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./body-scroll-lock */ "./src/assets/js/utils/body-scroll-lock.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./constants */ "./src/assets/js/utils/constants.ts");
/* harmony import */ var _device__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./device */ "./src/assets/js/utils/device.ts");
/* harmony import */ var _observer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./observer */ "./src/assets/js/utils/observer.ts");
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./string */ "./src/assets/js/utils/string.ts");
/* harmony import */ var _shopify__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./shopify */ "./src/assets/js/utils/shopify.ts");
/* harmony import */ var _add_prefetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-prefetch */ "./src/assets/js/utils/add-prefetch.ts");
/* harmony import */ var _attach_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attach-event */ "./src/assets/js/utils/attach-event.ts");
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./element */ "./src/assets/js/utils/element.ts");
/* harmony import */ var _noop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./noop */ "./src/assets/js/utils/noop.ts");
/* harmony import */ var _debounce__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./debounce */ "./src/assets/js/utils/debounce.ts");
/* harmony import */ var _throttle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./throttle */ "./src/assets/js/utils/throttle.ts");
/* harmony import */ var _animate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./animate */ "./src/assets/js/utils/animate.ts");
/* harmony import */ var _animation_interval__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./animation-interval */ "./src/assets/js/utils/animation-interval.ts");
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./fetch */ "./src/assets/js/utils/fetch.ts");
/* harmony import */ var _smooth_scroll__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./smooth-scroll */ "./src/assets/js/utils/smooth-scroll.ts");
/* harmony import */ var _cookies__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./cookies */ "./src/assets/js/utils/cookies.ts");


















const elementIsVisibleInViewport = el => {
  const {
    top,
    left,
    bottom,
    right
  } = el.getBoundingClientRect();
  const {
    innerHeight,
    innerWidth
  } = window;
  return (top > 0 && top < innerHeight || bottom > 0 && bottom < innerHeight) && (left > 0 && left < innerWidth || right > 0 && right < innerWidth);
};
const rIC = "requestIdleCallback" in window ? requestIdleCallback : setTimeout;

/***/ }),

/***/ "./src/assets/js/utils/noop.ts":
/*!*************************************!*\
  !*** ./src/assets/js/utils/noop.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "noop": () => (/* binding */ noop)
/* harmony export */ });
const noop = () => {};

/***/ }),

/***/ "./src/assets/js/utils/observer.ts":
/*!*****************************************!*\
  !*** ./src/assets/js/utils/observer.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "destroy": () => (/* binding */ destroy),
/* harmony export */   "observe": () => (/* binding */ observe),
/* harmony export */   "unobserve": () => (/* binding */ unobserve)
/* harmony export */ });
const INSTANCE_MAP = new Map();
const OBSERVER_MAP = new Map();
const ROOT_IDS = new Map();
let consecutiveRootId = 0;
/**
 * Generate a unique ID for the root element
 * @param root
 */

function getRootId(root) {
  if (!root) return "";
  if (ROOT_IDS.has(root)) return ROOT_IDS.get(root);
  consecutiveRootId += 1;
  ROOT_IDS.set(root, consecutiveRootId.toString());
  return `${ROOT_IDS.get(root)}_`;
}
/**
 * Monitor element, and trigger callback when element becomes inView
 * @param element {HTMLElement}
 * @param callback {Function} Called with inView
 * @param options {Object} InterSection observer options
 * @param options.threshold {Number} Number between 0 and 1, indicating how much of the element should be inView before triggering
 * @param options.root {HTMLElement}
 * @param options.rootMargin {String} The CSS margin to apply to the root element.
 *
 * @returns {ObserverInstance | undefined}
 */


function observe(element, callback, // eslint-disable-next-line no-undef
options = {}) {
  // IntersectionObserver needs a threshold to trigger, so set it to 0 if it's not defined.
  // Modify the options object, since it's used in the onChange handler.
  const {
    root,
    rootMargin,
    threshold = 0
  } = options; // Bail early if element is undefined

  if (!element) return; // Create a unique ID for this observer instance, based on the root, root margin and threshold.
  // An observer with the same options can be reused, so lets use this fact

  const observerId = // @ts-ignore
  getRootId(root) + (rootMargin ? `${threshold.toString()}_${rootMargin}` : threshold.toString());
  let observerInstance = OBSERVER_MAP.get(observerId);

  if (!observerInstance) {
    observerInstance = new IntersectionObserver(onChange, options);
    if (observerId) OBSERVER_MAP.set(observerId, observerInstance);
  }

  const instance = {
    callback,
    element,
    inView: false,
    observerId,
    observer: observerInstance,
    // Make sure we have the thresholds value. It's undefined on a browser like Chrome 51.
    thresholds: observerInstance.thresholds || (Array.isArray(threshold) ? threshold : [threshold])
  };
  INSTANCE_MAP.set(element, instance);
  observerInstance.observe(element);
  return instance;
}
/**
 * Stop observing an element. If an element is removed from the DOM or otherwise destroyed,
 * make sure to call this method.
 * @param element {Element}
 */

function unobserve(element) {
  if (!element) return;
  const instance = INSTANCE_MAP.get(element);

  if (instance) {
    const {
      observerId,
      observer
    } = instance;
    const {
      root
    } = observer;
    observer.unobserve(element); // Check if we are still observing any elements with the same threshold.

    let itemsLeft = false; // Check if we still have observers configured with the same root.

    let rootObserved = false;

    if (observerId) {
      INSTANCE_MAP.forEach((item, key) => {
        if (key !== element) {
          if (item.observerId === observerId) {
            itemsLeft = true;
            rootObserved = true;
          }

          if (item.observer.root === root) {
            rootObserved = true;
          }
        }
      });
    } // @ts-ignore


    if (!rootObserved && root) ROOT_IDS.delete(root);

    if (observer && !itemsLeft) {
      // No more elements to observe for threshold, disconnect observer
      observer.disconnect();
    } // Remove reference to element


    INSTANCE_MAP.delete(element);
  }
}
/**
 * Destroy all IntersectionObservers currently connected
 * */

function destroy() {
  OBSERVER_MAP.forEach(observer => {
    observer.disconnect();
  });
  OBSERVER_MAP.clear();
  INSTANCE_MAP.clear();
  ROOT_IDS.clear();
  consecutiveRootId = 0;
}

function onChange(changes) {
  changes.forEach(intersection => {
    const {
      isIntersecting,
      intersectionRatio,
      target
    } = intersection;
    const instance = INSTANCE_MAP.get(target); // Firefox can report a negative intersectionRatio when scrolling.

    if (instance && intersectionRatio >= 0) {
      // If threshold is an array, check if any of them intersects. This just triggers the onChange event multiple times.
      let inView = instance.thresholds.some(threshold => instance.inView ? intersectionRatio > threshold : intersectionRatio >= threshold);

      if (isIntersecting !== undefined) {
        // If isIntersecting is defined, ensure that the element is actually intersecting.
        // Otherwise it reports a threshold of 0
        inView = inView && isIntersecting;
      }

      instance.inView = inView;
      instance.callback(inView, intersection);
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  observe,
  unobserve,
  destroy
});

/***/ }),

/***/ "./src/assets/js/utils/shopify.ts":
/*!****************************************!*\
  !*** ./src/assets/js/utils/shopify.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CURRENCY_CHANGE_EVENT": () => (/* binding */ CURRENCY_CHANGE_EVENT),
/* harmony export */   "addToCart": () => (/* binding */ addToCart),
/* harmony export */   "changeCartItem": () => (/* binding */ changeCartItem),
/* harmony export */   "clearCart": () => (/* binding */ clearCart),
/* harmony export */   "formatMoney": () => (/* binding */ formatMoney),
/* harmony export */   "getProductsInfo": () => (/* binding */ getProductsInfo),
/* harmony export */   "updateCart": () => (/* binding */ updateCart)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _shopify_theme_currency__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shopify/theme-currency */ "./node_modules/@shopify/theme-currency/currency.js");


/* eslint-disable */
 // EVENTS

const CURRENCY_CHANGE_EVENT = "CURRENCY_CHANGED"; // FORMAT MONEY

function formatMoney({
  money,
  format
}) {
  var _window$ACSCurrency;

  if (typeof ((_window$ACSCurrency = window.ACSCurrency) == null ? void 0 : _window$ACSCurrency.formatMoney) === "function") {
    var _ref$moneyFormats$ref;

    const ref = window.ACSCurrency;
    const convertedMoney = ref.convert(money, "GBP", ref.currentCurrency);
    return ref.formatMoney(Number.isNaN(convertedMoney) ? money : convertedMoney, // @ts-expect-error
    format || ((_ref$moneyFormats$ref = ref.moneyFormats[ref.currentCurrency]) == null ? void 0 : _ref$moneyFormats$ref.money_format) || window.shopMoneyFormat);
  } // @ts-expect-error


  return _shopify_theme_currency__WEBPACK_IMPORTED_MODULE_1__.formatMoney(money, format || window.shopMoneyFormat);
}
async function clearCart() {
  return fetch("/cart/clear.js", {
    method: "POST"
  });
} // ADD TO CART

async function addToCart(data) {
  return fetch("/cart/add.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      items: data
    })
  });
} //  UPDATE CART

async function updateCart(data) {
  return fetch("/cart/update.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      updates: data
    })
  });
} // CHANGE CART ITEM

async function changeCartItem(data) {
  return fetch("/cart/change.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
} // GET PRODUCTS

async function getProductsInfo(handles) {
  const parser = new DOMParser();
  const API_URL = new URL("/search", window.location.origin);
  API_URL.searchParams.set("section_id", "json-products");
  const promises = [];
  const handlesCopy = [...handles];

  while (handlesCopy.length > 0) {
    const chunk = handlesCopy.splice(0, 15);
    API_URL.searchParams.set("q", chunk.join(","));
    promises.push((async () => {
      const response = await fetch(`${API_URL}`).then(res => res.text());
      const DOM = parser.parseFromString(response, "text/html");
      const productsResponseHTML = DOM.querySelector("#products-data");
      return JSON.parse(productsResponseHTML.innerHTML);
    })());
  }

  return Promise.all(promises).then(res => res.reduce((acc, curr) => (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, acc, curr), {}));
}

/***/ }),

/***/ "./src/assets/js/utils/smooth-scroll.ts":
/*!**********************************************!*\
  !*** ./src/assets/js/utils/smooth-scroll.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "smoothScroll": () => (/* binding */ smoothScroll)
/* harmony export */ });
function smoothScroll(elm, dur, offset) {
  const pageY = window.pageYOffset,
        bodyHeight = document.body.scrollHeight,
        {
    innerHeight
  } = window,
        startingY = pageY + offset,
        elementY = pageY + elm.getBoundingClientRect().top,
        targetY = bodyHeight - elementY < innerHeight ? bodyHeight - innerHeight : elementY,
        diff = targetY - startingY,
        easing = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

  let start;
  if (!diff) return;
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    let percent = Math.min(time / dur, 1);
    percent = easing(percent);
    const end = startingY + diff * percent - offset;
    window.scrollTo(0, end);
    if (time < dur) window.requestAnimationFrame(step);
  });
}

/***/ }),

/***/ "./src/assets/js/utils/string.ts":
/*!***************************************!*\
  !*** ./src/assets/js/utils/string.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "capitalizeFirstLetter": () => (/* binding */ capitalizeFirstLetter)
/* harmony export */ });
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCLGdCQUFnQjtBQUNoQjs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCLGdCQUFnQjtBQUNoQjs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixRQUFRO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixRQUFRO0FBQ3pCLGdCQUFnQixZQUFZO0FBQzVCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkIsZ0JBQWdCO0FBQ2hCOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFHN0wsSUFBSSxDQUFDOEwsR0FBTCxDQUFTbk0sSUFBSSxHQUFHcUwsR0FBaEIsRUFBcUIsQ0FBckIsQ0FBZDtJQUVBYSxPQUFPLEdBQUdKLE1BQU0sQ0FBQ0ksT0FBRCxDQUFoQjtJQUVBLE1BQU1FLEdBQUcsR0FBR1YsU0FBUyxHQUFHRyxJQUFJLEdBQUdLLE9BQW5CLEdBQTZCM00sTUFBekM7SUFFQWxGLE1BQU0sQ0FBQ2dTLFFBQVAsQ0FBZ0IsQ0FBaEIsRUFBbUJELEdBQW5CO0lBRUEsSUFBSXBNLElBQUksR0FBR3FMLEdBQVgsRUFBZ0JoUixNQUFNLENBQUN1RyxxQkFBUCxDQUE2Qm9MLElBQTdCO0VBQ25CLENBYkQ7QUFjSDs7Ozs7Ozs7Ozs7Ozs7QUMzQk0sU0FBU00scUJBQVQsQ0FBK0JDLE1BQS9CLEVBQStDO0VBQ2xELE9BQU9BLE1BQU0sQ0FBQzdKLE1BQVAsQ0FBYyxDQUFkLEVBQWlCOEosV0FBakIsS0FBaUNELE1BQU0sQ0FBQ0UsS0FBUCxDQUFhLENBQWIsQ0FBeEM7QUFDSDs7Ozs7Ozs7Ozs7Ozs7QUNGYztBQUNmO0FBQ0Esb0JBQW9CLHNCQUFzQjtBQUMxQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvQHNob3BpZnkvdGhlbWUtY3VycmVuY3kvY3VycmVuY3kuanMiLCJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL0B2aW1lby9wbGF5ZXIvZGlzdC9wbGF5ZXIuZXMuanMiLCJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vc3JjL2Fzc2V0cy9qcy9tYWluL3ZpZGVvL1ZpZGVvLnRzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvbWFpbi92aWRlby90eXBlcy9WaW1lby50cyIsIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL3V0aWxzL2FkZC1wcmVmZXRjaC50cyIsIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL3V0aWxzL2FuaW1hdGUudHMiLCJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vc3JjL2Fzc2V0cy9qcy91dGlscy9hbmltYXRpb24taW50ZXJ2YWwudHMiLCJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vc3JjL2Fzc2V0cy9qcy91dGlscy9ib2R5LXNjcm9sbC1sb2NrLnRzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvdXRpbHMvY29uc3RhbnRzLnRzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvdXRpbHMvY29va2llcy50cyIsIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL3V0aWxzL2RlYm91bmNlLnRzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvdXRpbHMvZGV2aWNlLnRzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvdXRpbHMvZmV0Y2gudHMiLCJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vc3JjL2Fzc2V0cy9qcy91dGlscy9pbmRleC50cyIsIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL3V0aWxzL25vb3AudHMiLCJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vc3JjL2Fzc2V0cy9qcy91dGlscy9vYnNlcnZlci50cyIsIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL3V0aWxzL3Nob3BpZnkudHMiLCJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vc3JjL2Fzc2V0cy9qcy91dGlscy9zbW9vdGgtc2Nyb2xsLnRzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvdXRpbHMvc3RyaW5nLnRzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3VycmVuY3kgSGVscGVyc1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEEgY29sbGVjdGlvbiBvZiB1c2VmdWwgZnVuY3Rpb25zIHRoYXQgaGVscCB3aXRoIGN1cnJlbmN5IGZvcm1hdHRpbmdcbiAqXG4gKiBDdXJyZW50IGNvbnRlbnRzXG4gKiAtIGZvcm1hdE1vbmV5IC0gVGFrZXMgYW4gYW1vdW50IGluIGNlbnRzIGFuZCByZXR1cm5zIGl0IGFzIGEgZm9ybWF0dGVkIGRvbGxhciB2YWx1ZS5cbiAqXG4gKi9cblxuY29uc3QgbW9uZXlGb3JtYXQgPSAnJHt7YW1vdW50fX0nO1xuXG4vKipcbiAqIEZvcm1hdCBtb25leSB2YWx1ZXMgYmFzZWQgb24geW91ciBzaG9wIGN1cnJlbmN5IHNldHRpbmdzXG4gKiBAcGFyYW0gIHtOdW1iZXJ8c3RyaW5nfSBjZW50cyAtIHZhbHVlIGluIGNlbnRzIG9yIGRvbGxhciBhbW91bnQgZS5nLiAzMDAgY2VudHNcbiAqIG9yIDMuMDAgZG9sbGFyc1xuICogQHBhcmFtICB7U3RyaW5nfSBmb3JtYXQgLSBzaG9wIG1vbmV5X2Zvcm1hdCBzZXR0aW5nXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHZhbHVlIC0gZm9ybWF0dGVkIHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRNb25leShjZW50cywgZm9ybWF0KSB7XG4gIGlmICh0eXBlb2YgY2VudHMgPT09ICdzdHJpbmcnKSB7XG4gICAgY2VudHMgPSBjZW50cy5yZXBsYWNlKCcuJywgJycpO1xuICB9XG4gIGxldCB2YWx1ZSA9ICcnO1xuICBjb25zdCBwbGFjZWhvbGRlclJlZ2V4ID0gL1xce1xce1xccyooXFx3KylcXHMqXFx9XFx9LztcbiAgY29uc3QgZm9ybWF0U3RyaW5nID0gZm9ybWF0IHx8IG1vbmV5Rm9ybWF0O1xuXG4gIGZ1bmN0aW9uIGZvcm1hdFdpdGhEZWxpbWl0ZXJzKFxuICAgIG51bWJlcixcbiAgICBwcmVjaXNpb24gPSAyLFxuICAgIHRob3VzYW5kcyA9ICcsJyxcbiAgICBkZWNpbWFsID0gJy4nXG4gICkge1xuICAgIGlmIChpc05hTihudW1iZXIpIHx8IG51bWJlciA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBudW1iZXIgPSAobnVtYmVyIC8gMTAwLjApLnRvRml4ZWQocHJlY2lzaW9uKTtcblxuICAgIGNvbnN0IHBhcnRzID0gbnVtYmVyLnNwbGl0KCcuJyk7XG4gICAgY29uc3QgZG9sbGFyc0Ftb3VudCA9IHBhcnRzWzBdLnJlcGxhY2UoXG4gICAgICAvKFxcZCkoPz0oXFxkXFxkXFxkKSsoPyFcXGQpKS9nLFxuICAgICAgYCQxJHt0aG91c2FuZHN9YFxuICAgICk7XG4gICAgY29uc3QgY2VudHNBbW91bnQgPSBwYXJ0c1sxXSA/IGRlY2ltYWwgKyBwYXJ0c1sxXSA6ICcnO1xuXG4gICAgcmV0dXJuIGRvbGxhcnNBbW91bnQgKyBjZW50c0Ftb3VudDtcbiAgfVxuXG4gIHN3aXRjaCAoZm9ybWF0U3RyaW5nLm1hdGNoKHBsYWNlaG9sZGVyUmVnZXgpWzFdKSB7XG4gICAgY2FzZSAnYW1vdW50JzpcbiAgICAgIHZhbHVlID0gZm9ybWF0V2l0aERlbGltaXRlcnMoY2VudHMsIDIpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYW1vdW50X25vX2RlY2ltYWxzJzpcbiAgICAgIHZhbHVlID0gZm9ybWF0V2l0aERlbGltaXRlcnMoY2VudHMsIDApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYW1vdW50X3dpdGhfY29tbWFfc2VwYXJhdG9yJzpcbiAgICAgIHZhbHVlID0gZm9ybWF0V2l0aERlbGltaXRlcnMoY2VudHMsIDIsICcuJywgJywnKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2Ftb3VudF9ub19kZWNpbWFsc193aXRoX2NvbW1hX3NlcGFyYXRvcic6XG4gICAgICB2YWx1ZSA9IGZvcm1hdFdpdGhEZWxpbWl0ZXJzKGNlbnRzLCAwLCAnLicsICcsJyk7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIHJldHVybiBmb3JtYXRTdHJpbmcucmVwbGFjZShwbGFjZWhvbGRlclJlZ2V4LCB2YWx1ZSk7XG59XG4iLCIvKiEgQHZpbWVvL3BsYXllciB2Mi4xNy4xIHwgKGMpIDIwMjIgVmltZW8gfCBNSVQgTGljZW5zZSB8IGh0dHBzOi8vZ2l0aHViLmNvbS92aW1lby9wbGF5ZXIuanMgKi9cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxuLyoqXG4gKiBAbW9kdWxlIGxpYi9mdW5jdGlvbnNcbiAqL1xuXG4vKipcbiAqIENoZWNrIHRvIHNlZSB0aGlzIGlzIGEgbm9kZSBlbnZpcm9ubWVudC5cbiAqIEB0eXBlIHtCb29sZWFufVxuICovXG5cbi8qIGdsb2JhbCBnbG9iYWwgKi9cbnZhciBpc05vZGUgPSB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyAmJiB7fS50b1N0cmluZy5jYWxsKGdsb2JhbCkgPT09ICdbb2JqZWN0IGdsb2JhbF0nO1xuLyoqXG4gKiBHZXQgdGhlIG5hbWUgb2YgdGhlIG1ldGhvZCBmb3IgYSBnaXZlbiBnZXR0ZXIgb3Igc2V0dGVyLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIEVpdGhlciDigJxnZXTigJ0gb3Ig4oCcc2V04oCdLlxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5cbmZ1bmN0aW9uIGdldE1ldGhvZE5hbWUocHJvcCwgdHlwZSkge1xuICBpZiAocHJvcC5pbmRleE9mKHR5cGUudG9Mb3dlckNhc2UoKSkgPT09IDApIHtcbiAgICByZXR1cm4gcHJvcDtcbiAgfVxuXG4gIHJldHVybiBcIlwiLmNvbmNhdCh0eXBlLnRvTG93ZXJDYXNlKCkpLmNvbmNhdChwcm9wLnN1YnN0cigwLCAxKS50b1VwcGVyQ2FzZSgpKS5jb25jYXQocHJvcC5zdWJzdHIoMSkpO1xufVxuLyoqXG4gKiBDaGVjayB0byBzZWUgaWYgdGhlIG9iamVjdCBpcyBhIERPTSBFbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7Kn0gZWxlbWVudCBUaGUgb2JqZWN0IHRvIGNoZWNrLlxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuXG5mdW5jdGlvbiBpc0RvbUVsZW1lbnQoZWxlbWVudCkge1xuICByZXR1cm4gQm9vbGVhbihlbGVtZW50ICYmIGVsZW1lbnQubm9kZVR5cGUgPT09IDEgJiYgJ25vZGVOYW1lJyBpbiBlbGVtZW50ICYmIGVsZW1lbnQub3duZXJEb2N1bWVudCAmJiBlbGVtZW50Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcpO1xufVxuLyoqXG4gKiBDaGVjayB0byBzZWUgd2hldGhlciB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKlxuICogQHNlZSBodHRwOi8vZGwuZHJvcGJveHVzZXJjb250ZW50LmNvbS91LzM1MTQ2L2pzL3Rlc3RzL2lzTnVtYmVyLmh0bWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtib29sZWFufSBpbnRlZ2VyIENoZWNrIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuXG5mdW5jdGlvbiBpc0ludGVnZXIodmFsdWUpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQodmFsdWUpKSAmJiBpc0Zpbml0ZSh2YWx1ZSkgJiYgTWF0aC5mbG9vcih2YWx1ZSkgPT0gdmFsdWU7XG59XG4vKipcbiAqIENoZWNrIHRvIHNlZSBpZiB0aGUgVVJMIGlzIGEgVmltZW8gdXJsLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIHVybCBzdHJpbmcuXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5cbmZ1bmN0aW9uIGlzVmltZW9VcmwodXJsKSB7XG4gIHJldHVybiAvXihodHRwcz86KT9cXC9cXC8oKHBsYXllcnx3d3cpXFwuKT92aW1lb1xcLmNvbSg/PSR8XFwvKS8udGVzdCh1cmwpO1xufVxuLyoqXG4gKiBDaGVjayB0byBzZWUgaWYgdGhlIFVSTCBpcyBmb3IgYSBWaW1lbyBlbWJlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSB1cmwgc3RyaW5nLlxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuXG5mdW5jdGlvbiBpc1ZpbWVvRW1iZWQodXJsKSB7XG4gIHZhciBleHByID0gL15odHRwczpcXC9cXC9wbGF5ZXJcXC52aW1lb1xcLmNvbVxcL3ZpZGVvXFwvXFxkKy87XG4gIHJldHVybiBleHByLnRlc3QodXJsKTtcbn1cbi8qKlxuICogR2V0IHRoZSBWaW1lbyBVUkwgZnJvbSBhbiBlbGVtZW50LlxuICogVGhlIGVsZW1lbnQgbXVzdCBoYXZlIGVpdGhlciBhIGRhdGEtdmltZW8taWQgb3IgZGF0YS12aW1lby11cmwgYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvRW1iZWRQYXJhbWV0ZXJzIFRoZSBvRW1iZWQgcGFyYW1ldGVycy5cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuXG5mdW5jdGlvbiBnZXRWaW1lb1VybCgpIHtcbiAgdmFyIG9FbWJlZFBhcmFtZXRlcnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICB2YXIgaWQgPSBvRW1iZWRQYXJhbWV0ZXJzLmlkO1xuICB2YXIgdXJsID0gb0VtYmVkUGFyYW1ldGVycy51cmw7XG4gIHZhciBpZE9yVXJsID0gaWQgfHwgdXJsO1xuXG4gIGlmICghaWRPclVybCkge1xuICAgIHRocm93IG5ldyBFcnJvcignQW4gaWQgb3IgdXJsIG11c3QgYmUgcGFzc2VkLCBlaXRoZXIgaW4gYW4gb3B0aW9ucyBvYmplY3Qgb3IgYXMgYSBkYXRhLXZpbWVvLWlkIG9yIGRhdGEtdmltZW8tdXJsIGF0dHJpYnV0ZS4nKTtcbiAgfVxuXG4gIGlmIChpc0ludGVnZXIoaWRPclVybCkpIHtcbiAgICByZXR1cm4gXCJodHRwczovL3ZpbWVvLmNvbS9cIi5jb25jYXQoaWRPclVybCk7XG4gIH1cblxuICBpZiAoaXNWaW1lb1VybChpZE9yVXJsKSkge1xuICAgIHJldHVybiBpZE9yVXJsLnJlcGxhY2UoJ2h0dHA6JywgJ2h0dHBzOicpO1xuICB9XG5cbiAgaWYgKGlkKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlxcdTIwMUNcIi5jb25jYXQoaWQsIFwiXFx1MjAxRCBpcyBub3QgYSB2YWxpZCB2aWRlbyBpZC5cIikpO1xuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlxcdTIwMUNcIi5jb25jYXQoaWRPclVybCwgXCJcXHUyMDFEIGlzIG5vdCBhIHZpbWVvLmNvbSB1cmwuXCIpKTtcbn1cblxudmFyIGFycmF5SW5kZXhPZlN1cHBvcnQgPSB0eXBlb2YgQXJyYXkucHJvdG90eXBlLmluZGV4T2YgIT09ICd1bmRlZmluZWQnO1xudmFyIHBvc3RNZXNzYWdlU3VwcG9ydCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cucG9zdE1lc3NhZ2UgIT09ICd1bmRlZmluZWQnO1xuXG5pZiAoIWlzTm9kZSAmJiAoIWFycmF5SW5kZXhPZlN1cHBvcnQgfHwgIXBvc3RNZXNzYWdlU3VwcG9ydCkpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgdGhlIFZpbWVvIFBsYXllciBBUEkgaXMgbm90IGF2YWlsYWJsZSBpbiB0aGlzIGJyb3dzZXIuJyk7XG59XG5cbnZhciBjb21tb25qc0dsb2JhbCA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFRoaXMgOiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHt9O1xuXG5mdW5jdGlvbiBjcmVhdGVDb21tb25qc01vZHVsZShmbiwgbW9kdWxlKSB7XG5cdHJldHVybiBtb2R1bGUgPSB7IGV4cG9ydHM6IHt9IH0sIGZuKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMpLCBtb2R1bGUuZXhwb3J0cztcbn1cblxuLyohXG4gKiB3ZWFrbWFwLXBvbHlmaWxsIHYyLjAuNCAtIEVDTUFTY3JpcHQ2IFdlYWtNYXAgcG9seWZpbGxcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9wb2x5Z29ucGxhbmV0L3dlYWttYXAtcG9seWZpbGxcbiAqIENvcHlyaWdodCAoYykgMjAxNS0yMDIxIHBvbHlnb25wbGFuZXQgPHBvbHlnb24ucGxhbmV0LmFxdWFAZ21haWwuY29tPlxuICogQGxpY2Vuc2UgTUlUXG4gKi9cbihmdW5jdGlvbiAoc2VsZikge1xuXG4gIGlmIChzZWxmLldlYWtNYXApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4gIHZhciBoYXNEZWZpbmUgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgJiYgZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAvLyBBdm9pZCBJRTgncyBicm9rZW4gT2JqZWN0LmRlZmluZVByb3BlcnR5XG4gICAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAneCcsIHtcbiAgICAgICAgdmFsdWU6IDFcbiAgICAgIH0pLnggPT09IDE7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfSgpO1xuXG4gIHZhciBkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWUsIHZhbHVlKSB7XG4gICAgaWYgKGhhc0RlZmluZSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwgbmFtZSwge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmplY3RbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG4gIH07XG5cbiAgc2VsZi5XZWFrTWFwID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIEVDTUEtMjYyIDIzLjMgV2Vha01hcCBPYmplY3RzXG4gICAgZnVuY3Rpb24gV2Vha01hcCgpIHtcbiAgICAgIGlmICh0aGlzID09PSB2b2lkIDApIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNvbnN0cnVjdG9yIFdlYWtNYXAgcmVxdWlyZXMgJ25ldydcIik7XG4gICAgICB9XG5cbiAgICAgIGRlZmluZVByb3BlcnR5KHRoaXMsICdfaWQnLCBnZW5JZCgnX1dlYWtNYXAnKSk7IC8vIEVDTUEtMjYyIDIzLjMuMS4xIFdlYWtNYXAoW2l0ZXJhYmxlXSlcblxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIEN1cnJlbnRseSwgV2Vha01hcCBgaXRlcmFibGVgIGFyZ3VtZW50IGlzIG5vdCBzdXBwb3J0ZWRcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignV2Vha01hcCBpdGVyYWJsZSBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgICB9XG4gICAgfSAvLyBFQ01BLTI2MiAyMy4zLjMuMiBXZWFrTWFwLnByb3RvdHlwZS5kZWxldGUoa2V5KVxuXG5cbiAgICBkZWZpbmVQcm9wZXJ0eShXZWFrTWFwLnByb3RvdHlwZSwgJ2RlbGV0ZScsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGNoZWNrSW5zdGFuY2UodGhpcywgJ2RlbGV0ZScpO1xuXG4gICAgICBpZiAoIWlzT2JqZWN0KGtleSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB2YXIgZW50cnkgPSBrZXlbdGhpcy5faWRdO1xuXG4gICAgICBpZiAoZW50cnkgJiYgZW50cnlbMF0gPT09IGtleSkge1xuICAgICAgICBkZWxldGUga2V5W3RoaXMuX2lkXTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTsgLy8gRUNNQS0yNjIgMjMuMy4zLjMgV2Vha01hcC5wcm90b3R5cGUuZ2V0KGtleSlcblxuICAgIGRlZmluZVByb3BlcnR5KFdlYWtNYXAucHJvdG90eXBlLCAnZ2V0JywgZnVuY3Rpb24gKGtleSkge1xuICAgICAgY2hlY2tJbnN0YW5jZSh0aGlzLCAnZ2V0Jyk7XG5cbiAgICAgIGlmICghaXNPYmplY3Qoa2V5KSkge1xuICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgfVxuXG4gICAgICB2YXIgZW50cnkgPSBrZXlbdGhpcy5faWRdO1xuXG4gICAgICBpZiAoZW50cnkgJiYgZW50cnlbMF0gPT09IGtleSkge1xuICAgICAgICByZXR1cm4gZW50cnlbMV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfSk7IC8vIEVDTUEtMjYyIDIzLjMuMy40IFdlYWtNYXAucHJvdG90eXBlLmhhcyhrZXkpXG5cbiAgICBkZWZpbmVQcm9wZXJ0eShXZWFrTWFwLnByb3RvdHlwZSwgJ2hhcycsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGNoZWNrSW5zdGFuY2UodGhpcywgJ2hhcycpO1xuXG4gICAgICBpZiAoIWlzT2JqZWN0KGtleSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB2YXIgZW50cnkgPSBrZXlbdGhpcy5faWRdO1xuXG4gICAgICBpZiAoZW50cnkgJiYgZW50cnlbMF0gPT09IGtleSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pOyAvLyBFQ01BLTI2MiAyMy4zLjMuNSBXZWFrTWFwLnByb3RvdHlwZS5zZXQoa2V5LCB2YWx1ZSlcblxuICAgIGRlZmluZVByb3BlcnR5KFdlYWtNYXAucHJvdG90eXBlLCAnc2V0JywgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgIGNoZWNrSW5zdGFuY2UodGhpcywgJ3NldCcpO1xuXG4gICAgICBpZiAoIWlzT2JqZWN0KGtleSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCB2YWx1ZSB1c2VkIGFzIHdlYWsgbWFwIGtleScpO1xuICAgICAgfVxuXG4gICAgICB2YXIgZW50cnkgPSBrZXlbdGhpcy5faWRdO1xuXG4gICAgICBpZiAoZW50cnkgJiYgZW50cnlbMF0gPT09IGtleSkge1xuICAgICAgICBlbnRyeVsxXSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgZGVmaW5lUHJvcGVydHkoa2V5LCB0aGlzLl9pZCwgW2tleSwgdmFsdWVdKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gY2hlY2tJbnN0YW5jZSh4LCBtZXRob2ROYW1lKSB7XG4gICAgICBpZiAoIWlzT2JqZWN0KHgpIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKHgsICdfaWQnKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKG1ldGhvZE5hbWUgKyAnIG1ldGhvZCBjYWxsZWQgb24gaW5jb21wYXRpYmxlIHJlY2VpdmVyICcgKyB0eXBlb2YgeCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2VuSWQocHJlZml4KSB7XG4gICAgICByZXR1cm4gcHJlZml4ICsgJ18nICsgcmFuZCgpICsgJy4nICsgcmFuZCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJhbmQoKSB7XG4gICAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnN1YnN0cmluZygyKTtcbiAgICB9XG5cbiAgICBkZWZpbmVQcm9wZXJ0eShXZWFrTWFwLCAnX3BvbHlmaWxsJywgdHJ1ZSk7XG4gICAgcmV0dXJuIFdlYWtNYXA7XG4gIH0oKTtcblxuICBmdW5jdGlvbiBpc09iamVjdCh4KSB7XG4gICAgcmV0dXJuIE9iamVjdCh4KSA9PT0geDtcbiAgfVxufSkodHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6IHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHR5cGVvZiBjb21tb25qc0dsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBjb21tb25qc0dsb2JhbCA6IGNvbW1vbmpzR2xvYmFsKTtcblxudmFyIG5wb19zcmMgPSBjcmVhdGVDb21tb25qc01vZHVsZShmdW5jdGlvbiAobW9kdWxlKSB7XG4vKiEgTmF0aXZlIFByb21pc2UgT25seVxuICAgIHYwLjguMSAoYykgS3lsZSBTaW1wc29uXG4gICAgTUlUIExpY2Vuc2U6IGh0dHA6Ly9nZXRpZnkubWl0LWxpY2Vuc2Uub3JnXG4qL1xuKGZ1bmN0aW9uIFVNRChuYW1lLCBjb250ZXh0LCBkZWZpbml0aW9uKSB7XG4gIC8vIHNwZWNpYWwgZm9ybSBvZiBVTUQgZm9yIHBvbHlmaWxsaW5nIGFjcm9zcyBldmlyb25tZW50c1xuICBjb250ZXh0W25hbWVdID0gY29udGV4dFtuYW1lXSB8fCBkZWZpbml0aW9uKCk7XG5cbiAgaWYgKCBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGV4dFtuYW1lXTtcbiAgfVxufSkoXCJQcm9taXNlXCIsIHR5cGVvZiBjb21tb25qc0dsb2JhbCAhPSBcInVuZGVmaW5lZFwiID8gY29tbW9uanNHbG9iYWwgOiBjb21tb25qc0dsb2JhbCwgZnVuY3Rpb24gREVGKCkge1xuXG4gIHZhciBidWlsdEluUHJvcCxcbiAgICAgIGN5Y2xlLFxuICAgICAgc2NoZWR1bGluZ19xdWV1ZSxcbiAgICAgIFRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyxcbiAgICAgIHRpbWVyID0gdHlwZW9mIHNldEltbWVkaWF0ZSAhPSBcInVuZGVmaW5lZFwiID8gZnVuY3Rpb24gdGltZXIoZm4pIHtcbiAgICByZXR1cm4gc2V0SW1tZWRpYXRlKGZuKTtcbiAgfSA6IHNldFRpbWVvdXQ7IC8vIGRhbW1pdCwgSUU4LlxuXG4gIHRyeSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCBcInhcIiwge30pO1xuXG4gICAgYnVpbHRJblByb3AgPSBmdW5jdGlvbiBidWlsdEluUHJvcChvYmosIG5hbWUsIHZhbCwgY29uZmlnKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbmFtZSwge1xuICAgICAgICB2YWx1ZTogdmFsLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBjb25maWcgIT09IGZhbHNlXG4gICAgICB9KTtcbiAgICB9O1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBidWlsdEluUHJvcCA9IGZ1bmN0aW9uIGJ1aWx0SW5Qcm9wKG9iaiwgbmFtZSwgdmFsKSB7XG4gICAgICBvYmpbbmFtZV0gPSB2YWw7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH07XG4gIH0gLy8gTm90ZTogdXNpbmcgYSBxdWV1ZSBpbnN0ZWFkIG9mIGFycmF5IGZvciBlZmZpY2llbmN5XG5cblxuICBzY2hlZHVsaW5nX3F1ZXVlID0gZnVuY3Rpb24gUXVldWUoKSB7XG4gICAgdmFyIGZpcnN0LCBsYXN0LCBpdGVtO1xuXG4gICAgZnVuY3Rpb24gSXRlbShmbiwgc2VsZikge1xuICAgICAgdGhpcy5mbiA9IGZuO1xuICAgICAgdGhpcy5zZWxmID0gc2VsZjtcbiAgICAgIHRoaXMubmV4dCA9IHZvaWQgMDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgYWRkOiBmdW5jdGlvbiBhZGQoZm4sIHNlbGYpIHtcbiAgICAgICAgaXRlbSA9IG5ldyBJdGVtKGZuLCBzZWxmKTtcblxuICAgICAgICBpZiAobGFzdCkge1xuICAgICAgICAgIGxhc3QubmV4dCA9IGl0ZW07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmlyc3QgPSBpdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgbGFzdCA9IGl0ZW07XG4gICAgICAgIGl0ZW0gPSB2b2lkIDA7XG4gICAgICB9LFxuICAgICAgZHJhaW46IGZ1bmN0aW9uIGRyYWluKCkge1xuICAgICAgICB2YXIgZiA9IGZpcnN0O1xuICAgICAgICBmaXJzdCA9IGxhc3QgPSBjeWNsZSA9IHZvaWQgMDtcblxuICAgICAgICB3aGlsZSAoZikge1xuICAgICAgICAgIGYuZm4uY2FsbChmLnNlbGYpO1xuICAgICAgICAgIGYgPSBmLm5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9KCk7XG5cbiAgZnVuY3Rpb24gc2NoZWR1bGUoZm4sIHNlbGYpIHtcbiAgICBzY2hlZHVsaW5nX3F1ZXVlLmFkZChmbiwgc2VsZik7XG5cbiAgICBpZiAoIWN5Y2xlKSB7XG4gICAgICBjeWNsZSA9IHRpbWVyKHNjaGVkdWxpbmdfcXVldWUuZHJhaW4pO1xuICAgIH1cbiAgfSAvLyBwcm9taXNlIGR1Y2sgdHlwaW5nXG5cblxuICBmdW5jdGlvbiBpc1RoZW5hYmxlKG8pIHtcbiAgICB2YXIgX3RoZW4sXG4gICAgICAgIG9fdHlwZSA9IHR5cGVvZiBvO1xuXG4gICAgaWYgKG8gIT0gbnVsbCAmJiAob190eXBlID09IFwib2JqZWN0XCIgfHwgb190eXBlID09IFwiZnVuY3Rpb25cIikpIHtcbiAgICAgIF90aGVuID0gby50aGVuO1xuICAgIH1cblxuICAgIHJldHVybiB0eXBlb2YgX3RoZW4gPT0gXCJmdW5jdGlvblwiID8gX3RoZW4gOiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vdGlmeSgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hhaW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIG5vdGlmeUlzb2xhdGVkKHRoaXMsIHRoaXMuc3RhdGUgPT09IDEgPyB0aGlzLmNoYWluW2ldLnN1Y2Nlc3MgOiB0aGlzLmNoYWluW2ldLmZhaWx1cmUsIHRoaXMuY2hhaW5baV0pO1xuICAgIH1cblxuICAgIHRoaXMuY2hhaW4ubGVuZ3RoID0gMDtcbiAgfSAvLyBOT1RFOiBUaGlzIGlzIGEgc2VwYXJhdGUgZnVuY3Rpb24gdG8gaXNvbGF0ZVxuICAvLyB0aGUgYHRyeS4uY2F0Y2hgIHNvIHRoYXQgb3RoZXIgY29kZSBjYW4gYmVcbiAgLy8gb3B0aW1pemVkIGJldHRlclxuXG5cbiAgZnVuY3Rpb24gbm90aWZ5SXNvbGF0ZWQoc2VsZiwgY2IsIGNoYWluKSB7XG4gICAgdmFyIHJldCwgX3RoZW47XG5cbiAgICB0cnkge1xuICAgICAgaWYgKGNiID09PSBmYWxzZSkge1xuICAgICAgICBjaGFpbi5yZWplY3Qoc2VsZi5tc2cpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGNiID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0ID0gc2VsZi5tc2c7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0ID0gY2IuY2FsbCh2b2lkIDAsIHNlbGYubXNnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXQgPT09IGNoYWluLnByb21pc2UpIHtcbiAgICAgICAgICBjaGFpbi5yZWplY3QoVHlwZUVycm9yKFwiUHJvbWlzZS1jaGFpbiBjeWNsZVwiKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoX3RoZW4gPSBpc1RoZW5hYmxlKHJldCkpIHtcbiAgICAgICAgICBfdGhlbi5jYWxsKHJldCwgY2hhaW4ucmVzb2x2ZSwgY2hhaW4ucmVqZWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaGFpbi5yZXNvbHZlKHJldCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNoYWluLnJlamVjdChlcnIpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc29sdmUobXNnKSB7XG4gICAgdmFyIF90aGVuLFxuICAgICAgICBzZWxmID0gdGhpczsgLy8gYWxyZWFkeSB0cmlnZ2VyZWQ/XG5cblxuICAgIGlmIChzZWxmLnRyaWdnZXJlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNlbGYudHJpZ2dlcmVkID0gdHJ1ZTsgLy8gdW53cmFwXG5cbiAgICBpZiAoc2VsZi5kZWYpIHtcbiAgICAgIHNlbGYgPSBzZWxmLmRlZjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgaWYgKF90aGVuID0gaXNUaGVuYWJsZShtc2cpKSB7XG4gICAgICAgIHNjaGVkdWxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgZGVmX3dyYXBwZXIgPSBuZXcgTWFrZURlZldyYXBwZXIoc2VsZik7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgX3RoZW4uY2FsbChtc2csIGZ1bmN0aW9uICRyZXNvbHZlJCgpIHtcbiAgICAgICAgICAgICAgcmVzb2x2ZS5hcHBseShkZWZfd3JhcHBlciwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICRyZWplY3QkKCkge1xuICAgICAgICAgICAgICByZWplY3QuYXBwbHkoZGVmX3dyYXBwZXIsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdC5jYWxsKGRlZl93cmFwcGVyLCBlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLm1zZyA9IG1zZztcbiAgICAgICAgc2VsZi5zdGF0ZSA9IDE7XG5cbiAgICAgICAgaWYgKHNlbGYuY2hhaW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHNjaGVkdWxlKG5vdGlmeSwgc2VsZik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJlamVjdC5jYWxsKG5ldyBNYWtlRGVmV3JhcHBlcihzZWxmKSwgZXJyKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWplY3QobXNnKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzOyAvLyBhbHJlYWR5IHRyaWdnZXJlZD9cblxuICAgIGlmIChzZWxmLnRyaWdnZXJlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNlbGYudHJpZ2dlcmVkID0gdHJ1ZTsgLy8gdW53cmFwXG5cbiAgICBpZiAoc2VsZi5kZWYpIHtcbiAgICAgIHNlbGYgPSBzZWxmLmRlZjtcbiAgICB9XG5cbiAgICBzZWxmLm1zZyA9IG1zZztcbiAgICBzZWxmLnN0YXRlID0gMjtcblxuICAgIGlmIChzZWxmLmNoYWluLmxlbmd0aCA+IDApIHtcbiAgICAgIHNjaGVkdWxlKG5vdGlmeSwgc2VsZik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXRlcmF0ZVByb21pc2VzKENvbnN0cnVjdG9yLCBhcnIsIHJlc29sdmVyLCByZWplY3Rlcikge1xuICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGFyci5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAoZnVuY3Rpb24gSUlGRShpZHgpIHtcbiAgICAgICAgQ29uc3RydWN0b3IucmVzb2x2ZShhcnJbaWR4XSkudGhlbihmdW5jdGlvbiAkcmVzb2x2ZXIkKG1zZykge1xuICAgICAgICAgIHJlc29sdmVyKGlkeCwgbXNnKTtcbiAgICAgICAgfSwgcmVqZWN0ZXIpO1xuICAgICAgfSkoaWR4KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBNYWtlRGVmV3JhcHBlcihzZWxmKSB7XG4gICAgdGhpcy5kZWYgPSBzZWxmO1xuICAgIHRoaXMudHJpZ2dlcmVkID0gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBNYWtlRGVmKHNlbGYpIHtcbiAgICB0aGlzLnByb21pc2UgPSBzZWxmO1xuICAgIHRoaXMuc3RhdGUgPSAwO1xuICAgIHRoaXMudHJpZ2dlcmVkID0gZmFsc2U7XG4gICAgdGhpcy5jaGFpbiA9IFtdO1xuICAgIHRoaXMubXNnID0gdm9pZCAwO1xuICB9XG5cbiAgZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIGlmICh0eXBlb2YgZXhlY3V0b3IgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJOb3QgYSBmdW5jdGlvblwiKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fX05QT19fICE9PSAwKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJOb3QgYSBwcm9taXNlXCIpO1xuICAgIH0gLy8gaW5zdGFuY2Ugc2hhZG93aW5nIHRoZSBpbmhlcml0ZWQgXCJicmFuZFwiXG4gICAgLy8gdG8gc2lnbmFsIGFuIGFscmVhZHkgXCJpbml0aWFsaXplZFwiIHByb21pc2VcblxuXG4gICAgdGhpcy5fX05QT19fID0gMTtcbiAgICB2YXIgZGVmID0gbmV3IE1ha2VEZWYodGhpcyk7XG5cbiAgICB0aGlzW1widGhlblwiXSA9IGZ1bmN0aW9uIHRoZW4oc3VjY2VzcywgZmFpbHVyZSkge1xuICAgICAgdmFyIG8gPSB7XG4gICAgICAgIHN1Y2Nlc3M6IHR5cGVvZiBzdWNjZXNzID09IFwiZnVuY3Rpb25cIiA/IHN1Y2Nlc3MgOiB0cnVlLFxuICAgICAgICBmYWlsdXJlOiB0eXBlb2YgZmFpbHVyZSA9PSBcImZ1bmN0aW9uXCIgPyBmYWlsdXJlIDogZmFsc2VcbiAgICAgIH07IC8vIE5vdGU6IGB0aGVuKC4uKWAgaXRzZWxmIGNhbiBiZSBib3Jyb3dlZCB0byBiZSB1c2VkIGFnYWluc3RcbiAgICAgIC8vIGEgZGlmZmVyZW50IHByb21pc2UgY29uc3RydWN0b3IgZm9yIG1ha2luZyB0aGUgY2hhaW5lZCBwcm9taXNlLFxuICAgICAgLy8gYnkgc3Vic3RpdHV0aW5nIGEgZGlmZmVyZW50IGB0aGlzYCBiaW5kaW5nLlxuXG4gICAgICBvLnByb21pc2UgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihmdW5jdGlvbiBleHRyYWN0Q2hhaW4ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzb2x2ZSAhPSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIHJlamVjdCAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJOb3QgYSBmdW5jdGlvblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG8ucmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgIG8ucmVqZWN0ID0gcmVqZWN0O1xuICAgICAgfSk7XG4gICAgICBkZWYuY2hhaW4ucHVzaChvKTtcblxuICAgICAgaWYgKGRlZi5zdGF0ZSAhPT0gMCkge1xuICAgICAgICBzY2hlZHVsZShub3RpZnksIGRlZik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvLnByb21pc2U7XG4gICAgfTtcblxuICAgIHRoaXNbXCJjYXRjaFwiXSA9IGZ1bmN0aW9uICRjYXRjaCQoZmFpbHVyZSkge1xuICAgICAgcmV0dXJuIHRoaXMudGhlbih2b2lkIDAsIGZhaWx1cmUpO1xuICAgIH07XG5cbiAgICB0cnkge1xuICAgICAgZXhlY3V0b3IuY2FsbCh2b2lkIDAsIGZ1bmN0aW9uIHB1YmxpY1Jlc29sdmUobXNnKSB7XG4gICAgICAgIHJlc29sdmUuY2FsbChkZWYsIG1zZyk7XG4gICAgICB9LCBmdW5jdGlvbiBwdWJsaWNSZWplY3QobXNnKSB7XG4gICAgICAgIHJlamVjdC5jYWxsKGRlZiwgbXNnKTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmVqZWN0LmNhbGwoZGVmLCBlcnIpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBQcm9taXNlUHJvdG90eXBlID0gYnVpbHRJblByb3Aoe30sIFwiY29uc3RydWN0b3JcIiwgUHJvbWlzZSxcbiAgLypjb25maWd1cmFibGU9Ki9cbiAgZmFsc2UpOyAvLyBOb3RlOiBBbmRyb2lkIDQgY2Fubm90IHVzZSBgT2JqZWN0LmRlZmluZVByb3BlcnR5KC4uKWAgaGVyZVxuXG4gIFByb21pc2UucHJvdG90eXBlID0gUHJvbWlzZVByb3RvdHlwZTsgLy8gYnVpbHQtaW4gXCJicmFuZFwiIHRvIHNpZ25hbCBhbiBcInVuaW5pdGlhbGl6ZWRcIiBwcm9taXNlXG5cbiAgYnVpbHRJblByb3AoUHJvbWlzZVByb3RvdHlwZSwgXCJfX05QT19fXCIsIDAsXG4gIC8qY29uZmlndXJhYmxlPSovXG4gIGZhbHNlKTtcbiAgYnVpbHRJblByb3AoUHJvbWlzZSwgXCJyZXNvbHZlXCIsIGZ1bmN0aW9uIFByb21pc2UkcmVzb2x2ZShtc2cpIHtcbiAgICB2YXIgQ29uc3RydWN0b3IgPSB0aGlzOyAvLyBzcGVjIG1hbmRhdGVkIGNoZWNrc1xuICAgIC8vIG5vdGU6IGJlc3QgXCJpc1Byb21pc2VcIiBjaGVjayB0aGF0J3MgcHJhY3RpY2FsIGZvciBub3dcblxuICAgIGlmIChtc2cgJiYgdHlwZW9mIG1zZyA9PSBcIm9iamVjdFwiICYmIG1zZy5fX05QT19fID09PSAxKSB7XG4gICAgICByZXR1cm4gbXNnO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQ29uc3RydWN0b3IoZnVuY3Rpb24gZXhlY3V0b3IocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBpZiAodHlwZW9mIHJlc29sdmUgIT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiByZWplY3QgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRocm93IFR5cGVFcnJvcihcIk5vdCBhIGZ1bmN0aW9uXCIpO1xuICAgICAgfVxuXG4gICAgICByZXNvbHZlKG1zZyk7XG4gICAgfSk7XG4gIH0pO1xuICBidWlsdEluUHJvcChQcm9taXNlLCBcInJlamVjdFwiLCBmdW5jdGlvbiBQcm9taXNlJHJlamVjdChtc2cpIHtcbiAgICByZXR1cm4gbmV3IHRoaXMoZnVuY3Rpb24gZXhlY3V0b3IocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBpZiAodHlwZW9mIHJlc29sdmUgIT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiByZWplY3QgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRocm93IFR5cGVFcnJvcihcIk5vdCBhIGZ1bmN0aW9uXCIpO1xuICAgICAgfVxuXG4gICAgICByZWplY3QobXNnKTtcbiAgICB9KTtcbiAgfSk7XG4gIGJ1aWx0SW5Qcm9wKFByb21pc2UsIFwiYWxsXCIsIGZ1bmN0aW9uIFByb21pc2UkYWxsKGFycikge1xuICAgIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7IC8vIHNwZWMgbWFuZGF0ZWQgY2hlY2tzXG5cbiAgICBpZiAoVG9TdHJpbmcuY2FsbChhcnIpICE9IFwiW29iamVjdCBBcnJheV1cIikge1xuICAgICAgcmV0dXJuIENvbnN0cnVjdG9yLnJlamVjdChUeXBlRXJyb3IoXCJOb3QgYW4gYXJyYXlcIikpO1xuICAgIH1cblxuICAgIGlmIChhcnIubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gQ29uc3RydWN0b3IucmVzb2x2ZShbXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBDb25zdHJ1Y3RvcihmdW5jdGlvbiBleGVjdXRvcihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGlmICh0eXBlb2YgcmVzb2x2ZSAhPSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIHJlamVjdCAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiTm90IGEgZnVuY3Rpb25cIik7XG4gICAgICB9XG5cbiAgICAgIHZhciBsZW4gPSBhcnIubGVuZ3RoLFxuICAgICAgICAgIG1zZ3MgPSBBcnJheShsZW4pLFxuICAgICAgICAgIGNvdW50ID0gMDtcbiAgICAgIGl0ZXJhdGVQcm9taXNlcyhDb25zdHJ1Y3RvciwgYXJyLCBmdW5jdGlvbiByZXNvbHZlcihpZHgsIG1zZykge1xuICAgICAgICBtc2dzW2lkeF0gPSBtc2c7XG5cbiAgICAgICAgaWYgKCsrY291bnQgPT09IGxlbikge1xuICAgICAgICAgIHJlc29sdmUobXNncyk7XG4gICAgICAgIH1cbiAgICAgIH0sIHJlamVjdCk7XG4gICAgfSk7XG4gIH0pO1xuICBidWlsdEluUHJvcChQcm9taXNlLCBcInJhY2VcIiwgZnVuY3Rpb24gUHJvbWlzZSRyYWNlKGFycikge1xuICAgIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7IC8vIHNwZWMgbWFuZGF0ZWQgY2hlY2tzXG5cbiAgICBpZiAoVG9TdHJpbmcuY2FsbChhcnIpICE9IFwiW29iamVjdCBBcnJheV1cIikge1xuICAgICAgcmV0dXJuIENvbnN0cnVjdG9yLnJlamVjdChUeXBlRXJyb3IoXCJOb3QgYW4gYXJyYXlcIikpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQ29uc3RydWN0b3IoZnVuY3Rpb24gZXhlY3V0b3IocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBpZiAodHlwZW9mIHJlc29sdmUgIT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiByZWplY3QgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRocm93IFR5cGVFcnJvcihcIk5vdCBhIGZ1bmN0aW9uXCIpO1xuICAgICAgfVxuXG4gICAgICBpdGVyYXRlUHJvbWlzZXMoQ29uc3RydWN0b3IsIGFyciwgZnVuY3Rpb24gcmVzb2x2ZXIoaWR4LCBtc2cpIHtcbiAgICAgICAgcmVzb2x2ZShtc2cpO1xuICAgICAgfSwgcmVqZWN0KTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBQcm9taXNlO1xufSk7XG59KTtcblxuLyoqXG4gKiBAbW9kdWxlIGxpYi9jYWxsYmFja3NcbiAqL1xudmFyIGNhbGxiYWNrTWFwID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogU3RvcmUgYSBjYWxsYmFjayBmb3IgYSBtZXRob2Qgb3IgZXZlbnQgZm9yIGEgcGxheWVyLlxuICpcbiAqIEBwYXJhbSB7UGxheWVyfSBwbGF5ZXIgVGhlIHBsYXllciBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbWV0aG9kIG9yIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0geyhmdW5jdGlvbih0aGlzOlBsYXllciwgKik6IHZvaWR8e3Jlc29sdmU6IGZ1bmN0aW9uLCByZWplY3Q6IGZ1bmN0aW9ufSl9IGNhbGxiYWNrXG4gKiAgICAgICAgVGhlIGNhbGxiYWNrIHRvIGNhbGwgb3IgYW4gb2JqZWN0IHdpdGggcmVzb2x2ZSBhbmQgcmVqZWN0IGZ1bmN0aW9ucyBmb3IgYSBwcm9taXNlLlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuXG5mdW5jdGlvbiBzdG9yZUNhbGxiYWNrKHBsYXllciwgbmFtZSwgY2FsbGJhY2spIHtcbiAgdmFyIHBsYXllckNhbGxiYWNrcyA9IGNhbGxiYWNrTWFwLmdldChwbGF5ZXIuZWxlbWVudCkgfHwge307XG5cbiAgaWYgKCEobmFtZSBpbiBwbGF5ZXJDYWxsYmFja3MpKSB7XG4gICAgcGxheWVyQ2FsbGJhY2tzW25hbWVdID0gW107XG4gIH1cblxuICBwbGF5ZXJDYWxsYmFja3NbbmFtZV0ucHVzaChjYWxsYmFjayk7XG4gIGNhbGxiYWNrTWFwLnNldChwbGF5ZXIuZWxlbWVudCwgcGxheWVyQ2FsbGJhY2tzKTtcbn1cbi8qKlxuICogR2V0IHRoZSBjYWxsYmFja3MgZm9yIGEgcGxheWVyIGFuZCBldmVudCBvciBtZXRob2QuXG4gKlxuICogQHBhcmFtIHtQbGF5ZXJ9IHBsYXllciBUaGUgcGxheWVyIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBtZXRob2Qgb3IgZXZlbnQgbmFtZVxuICogQHJldHVybiB7ZnVuY3Rpb25bXX1cbiAqL1xuXG5mdW5jdGlvbiBnZXRDYWxsYmFja3MocGxheWVyLCBuYW1lKSB7XG4gIHZhciBwbGF5ZXJDYWxsYmFja3MgPSBjYWxsYmFja01hcC5nZXQocGxheWVyLmVsZW1lbnQpIHx8IHt9O1xuICByZXR1cm4gcGxheWVyQ2FsbGJhY2tzW25hbWVdIHx8IFtdO1xufVxuLyoqXG4gKiBSZW1vdmUgYSBzdG9yZWQgY2FsbGJhY2sgZm9yIGEgbWV0aG9kIG9yIGV2ZW50IGZvciBhIHBsYXllci5cbiAqXG4gKiBAcGFyYW0ge1BsYXllcn0gcGxheWVyIFRoZSBwbGF5ZXIgb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG1ldGhvZCBvciBldmVudCBuYW1lXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBbY2FsbGJhY2tdIFRoZSBzcGVjaWZpYyBjYWxsYmFjayB0byByZW1vdmUuXG4gKiBAcmV0dXJuIHtib29sZWFufSBXYXMgdGhpcyB0aGUgbGFzdCBjYWxsYmFjaz9cbiAqL1xuXG5mdW5jdGlvbiByZW1vdmVDYWxsYmFjayhwbGF5ZXIsIG5hbWUsIGNhbGxiYWNrKSB7XG4gIHZhciBwbGF5ZXJDYWxsYmFja3MgPSBjYWxsYmFja01hcC5nZXQocGxheWVyLmVsZW1lbnQpIHx8IHt9O1xuXG4gIGlmICghcGxheWVyQ2FsbGJhY2tzW25hbWVdKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gLy8gSWYgbm8gY2FsbGJhY2sgaXMgcGFzc2VkLCByZW1vdmUgYWxsIGNhbGxiYWNrcyBmb3IgdGhlIGV2ZW50XG5cblxuICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgcGxheWVyQ2FsbGJhY2tzW25hbWVdID0gW107XG4gICAgY2FsbGJhY2tNYXAuc2V0KHBsYXllci5lbGVtZW50LCBwbGF5ZXJDYWxsYmFja3MpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgdmFyIGluZGV4ID0gcGxheWVyQ2FsbGJhY2tzW25hbWVdLmluZGV4T2YoY2FsbGJhY2spO1xuXG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICBwbGF5ZXJDYWxsYmFja3NbbmFtZV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIGNhbGxiYWNrTWFwLnNldChwbGF5ZXIuZWxlbWVudCwgcGxheWVyQ2FsbGJhY2tzKTtcbiAgcmV0dXJuIHBsYXllckNhbGxiYWNrc1tuYW1lXSAmJiBwbGF5ZXJDYWxsYmFja3NbbmFtZV0ubGVuZ3RoID09PSAwO1xufVxuLyoqXG4gKiBSZXR1cm4gdGhlIGZpcnN0IHN0b3JlZCBjYWxsYmFjayBmb3IgYSBwbGF5ZXIgYW5kIGV2ZW50IG9yIG1ldGhvZC5cbiAqXG4gKiBAcGFyYW0ge1BsYXllcn0gcGxheWVyIFRoZSBwbGF5ZXIgb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG1ldGhvZCBvciBldmVudCBuYW1lLlxuICogQHJldHVybiB7ZnVuY3Rpb259IFRoZSBjYWxsYmFjaywgb3IgZmFsc2UgaWYgdGhlcmUgd2VyZSBub25lXG4gKi9cblxuZnVuY3Rpb24gc2hpZnRDYWxsYmFja3MocGxheWVyLCBuYW1lKSB7XG4gIHZhciBwbGF5ZXJDYWxsYmFja3MgPSBnZXRDYWxsYmFja3MocGxheWVyLCBuYW1lKTtcblxuICBpZiAocGxheWVyQ2FsbGJhY2tzLmxlbmd0aCA8IDEpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgY2FsbGJhY2sgPSBwbGF5ZXJDYWxsYmFja3Muc2hpZnQoKTtcbiAgcmVtb3ZlQ2FsbGJhY2socGxheWVyLCBuYW1lLCBjYWxsYmFjayk7XG4gIHJldHVybiBjYWxsYmFjaztcbn1cbi8qKlxuICogTW92ZSBjYWxsYmFja3MgYXNzb2NpYXRlZCB3aXRoIGFuIGVsZW1lbnQgdG8gYW5vdGhlciBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG9sZEVsZW1lbnQgVGhlIG9sZCBlbGVtZW50LlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbmV3RWxlbWVudCBUaGUgbmV3IGVsZW1lbnQuXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5cbmZ1bmN0aW9uIHN3YXBDYWxsYmFja3Mob2xkRWxlbWVudCwgbmV3RWxlbWVudCkge1xuICB2YXIgcGxheWVyQ2FsbGJhY2tzID0gY2FsbGJhY2tNYXAuZ2V0KG9sZEVsZW1lbnQpO1xuICBjYWxsYmFja01hcC5zZXQobmV3RWxlbWVudCwgcGxheWVyQ2FsbGJhY2tzKTtcbiAgY2FsbGJhY2tNYXAuZGVsZXRlKG9sZEVsZW1lbnQpO1xufVxuXG4vKipcbiAqIEBtb2R1bGUgbGliL3Bvc3RtZXNzYWdlXG4gKi9cbi8qKlxuICogUGFyc2UgYSBtZXNzYWdlIHJlY2VpdmVkIGZyb20gcG9zdE1lc3NhZ2UuXG4gKlxuICogQHBhcmFtIHsqfSBkYXRhIFRoZSBkYXRhIHJlY2VpdmVkIGZyb20gcG9zdE1lc3NhZ2UuXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cblxuZnVuY3Rpb24gcGFyc2VNZXNzYWdlRGF0YShkYXRhKSB7XG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICB0cnkge1xuICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIElmIHRoZSBtZXNzYWdlIGNhbm5vdCBiZSBwYXJzZWQsIHRocm93IHRoZSBlcnJvciBhcyBhIHdhcm5pbmdcbiAgICAgIGNvbnNvbGUud2FybihlcnJvcik7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRhdGE7XG59XG4vKipcbiAqIFBvc3QgYSBtZXNzYWdlIHRvIHRoZSBzcGVjaWZpZWQgdGFyZ2V0LlxuICpcbiAqIEBwYXJhbSB7UGxheWVyfSBwbGF5ZXIgVGhlIHBsYXllciBvYmplY3QgdG8gdXNlLlxuICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZCBUaGUgQVBJIG1ldGhvZCB0byBjYWxsLlxuICogQHBhcmFtIHtvYmplY3R9IHBhcmFtcyBUaGUgcGFyYW1ldGVycyB0byBzZW5kIHRvIHRoZSBwbGF5ZXIuXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5cbmZ1bmN0aW9uIHBvc3RNZXNzYWdlKHBsYXllciwgbWV0aG9kLCBwYXJhbXMpIHtcbiAgaWYgKCFwbGF5ZXIuZWxlbWVudC5jb250ZW50V2luZG93IHx8ICFwbGF5ZXIuZWxlbWVudC5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIG1lc3NhZ2UgPSB7XG4gICAgbWV0aG9kOiBtZXRob2RcbiAgfTtcblxuICBpZiAocGFyYW1zICE9PSB1bmRlZmluZWQpIHtcbiAgICBtZXNzYWdlLnZhbHVlID0gcGFyYW1zO1xuICB9IC8vIElFIDggYW5kIDkgZG8gbm90IHN1cHBvcnQgcGFzc2luZyBtZXNzYWdlcywgc28gc3RyaW5naWZ5IHRoZW1cblxuXG4gIHZhciBpZVZlcnNpb24gPSBwYXJzZUZsb2F0KG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9eLiptc2llIChcXGQrKS4qJC8sICckMScpKTtcblxuICBpZiAoaWVWZXJzaW9uID49IDggJiYgaWVWZXJzaW9uIDwgMTApIHtcbiAgICBtZXNzYWdlID0gSlNPTi5zdHJpbmdpZnkobWVzc2FnZSk7XG4gIH1cblxuICBwbGF5ZXIuZWxlbWVudC5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKG1lc3NhZ2UsIHBsYXllci5vcmlnaW4pO1xufVxuLyoqXG4gKiBQYXJzZSB0aGUgZGF0YSByZWNlaXZlZCBmcm9tIGEgbWVzc2FnZSBldmVudC5cbiAqXG4gKiBAcGFyYW0ge1BsYXllcn0gcGxheWVyIFRoZSBwbGF5ZXIgdGhhdCByZWNlaXZlZCB0aGUgbWVzc2FnZS5cbiAqIEBwYXJhbSB7KE9iamVjdHxzdHJpbmcpfSBkYXRhIFRoZSBtZXNzYWdlIGRhdGEuIFN0cmluZ3Mgd2lsbCBiZSBwYXJzZWQgaW50byBKU09OLlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuXG5mdW5jdGlvbiBwcm9jZXNzRGF0YShwbGF5ZXIsIGRhdGEpIHtcbiAgZGF0YSA9IHBhcnNlTWVzc2FnZURhdGEoZGF0YSk7XG4gIHZhciBjYWxsYmFja3MgPSBbXTtcbiAgdmFyIHBhcmFtO1xuXG4gIGlmIChkYXRhLmV2ZW50KSB7XG4gICAgaWYgKGRhdGEuZXZlbnQgPT09ICdlcnJvcicpIHtcbiAgICAgIHZhciBwcm9taXNlcyA9IGdldENhbGxiYWNrcyhwbGF5ZXIsIGRhdGEuZGF0YS5tZXRob2QpO1xuICAgICAgcHJvbWlzZXMuZm9yRWFjaChmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoZGF0YS5kYXRhLm1lc3NhZ2UpO1xuICAgICAgICBlcnJvci5uYW1lID0gZGF0YS5kYXRhLm5hbWU7XG4gICAgICAgIHByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICAgICAgcmVtb3ZlQ2FsbGJhY2socGxheWVyLCBkYXRhLmRhdGEubWV0aG9kLCBwcm9taXNlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhbGxiYWNrcyA9IGdldENhbGxiYWNrcyhwbGF5ZXIsIFwiZXZlbnQ6XCIuY29uY2F0KGRhdGEuZXZlbnQpKTtcbiAgICBwYXJhbSA9IGRhdGEuZGF0YTtcbiAgfSBlbHNlIGlmIChkYXRhLm1ldGhvZCkge1xuICAgIHZhciBjYWxsYmFjayA9IHNoaWZ0Q2FsbGJhY2tzKHBsYXllciwgZGF0YS5tZXRob2QpO1xuXG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgICBwYXJhbSA9IGRhdGEudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgY2FsbGJhY2tzLmZvckVhY2goZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChwbGF5ZXIsIHBhcmFtKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjYWxsYmFjay5yZXNvbHZlKHBhcmFtKTtcbiAgICB9IGNhdGNoIChlKSB7Ly8gZW1wdHlcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIEBtb2R1bGUgbGliL2VtYmVkXG4gKi9cbnZhciBvRW1iZWRQYXJhbWV0ZXJzID0gWydhdXRvcGF1c2UnLCAnYXV0b3BsYXknLCAnYmFja2dyb3VuZCcsICdieWxpbmUnLCAnY29sb3InLCAnY29udHJvbHMnLCAnZG50JywgJ2hlaWdodCcsICdpZCcsICdpbnRlcmFjdGl2ZV9wYXJhbXMnLCAna2V5Ym9hcmQnLCAnbG9vcCcsICdtYXhoZWlnaHQnLCAnbWF4d2lkdGgnLCAnbXV0ZWQnLCAncGxheXNpbmxpbmUnLCAncG9ydHJhaXQnLCAncmVzcG9uc2l2ZScsICdzcGVlZCcsICd0ZXh0dHJhY2snLCAndGl0bGUnLCAndHJhbnNwYXJlbnQnLCAndXJsJywgJ3dpZHRoJ107XG4vKipcbiAqIEdldCB0aGUgJ2RhdGEtdmltZW8nLXByZWZpeGVkIGF0dHJpYnV0ZXMgZnJvbSBhbiBlbGVtZW50IGFzIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50LlxuICogQHBhcmFtIHtPYmplY3R9IFtkZWZhdWx0cz17fV0gVGhlIGRlZmF1bHQgdmFsdWVzIHRvIHVzZS5cbiAqIEByZXR1cm4ge09iamVjdDxzdHJpbmcsIHN0cmluZz59XG4gKi9cblxuZnVuY3Rpb24gZ2V0T0VtYmVkUGFyYW1ldGVycyhlbGVtZW50KSB7XG4gIHZhciBkZWZhdWx0cyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gIHJldHVybiBvRW1iZWRQYXJhbWV0ZXJzLnJlZHVjZShmdW5jdGlvbiAocGFyYW1zLCBwYXJhbSkge1xuICAgIHZhciB2YWx1ZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS12aW1lby1cIi5jb25jYXQocGFyYW0pKTtcblxuICAgIGlmICh2YWx1ZSB8fCB2YWx1ZSA9PT0gJycpIHtcbiAgICAgIHBhcmFtc1twYXJhbV0gPSB2YWx1ZSA9PT0gJycgPyAxIDogdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfSwgZGVmYXVsdHMpO1xufVxuLyoqXG4gKiBDcmVhdGUgYW4gZW1iZWQgZnJvbSBvRW1iZWQgZGF0YSBpbnNpZGUgYW4gZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSBUaGUgb0VtYmVkIGRhdGEuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRvIHB1dCB0aGUgaWZyYW1lIGluLlxuICogQHJldHVybiB7SFRNTElGcmFtZUVsZW1lbnR9IFRoZSBpZnJhbWUgZW1iZWQuXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlRW1iZWQoX3JlZiwgZWxlbWVudCkge1xuICB2YXIgaHRtbCA9IF9yZWYuaHRtbDtcblxuICBpZiAoIWVsZW1lbnQpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBbiBlbGVtZW50IG11c3QgYmUgcHJvdmlkZWQnKTtcbiAgfVxuXG4gIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS12aW1lby1pbml0aWFsaXplZCcpICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQucXVlcnlTZWxlY3RvcignaWZyYW1lJyk7XG4gIH1cblxuICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRpdi5pbm5lckhUTUwgPSBodG1sO1xuICBlbGVtZW50LmFwcGVuZENoaWxkKGRpdi5maXJzdENoaWxkKTtcbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdmltZW8taW5pdGlhbGl6ZWQnLCAndHJ1ZScpO1xuICByZXR1cm4gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpZnJhbWUnKTtcbn1cbi8qKlxuICogTWFrZSBhbiBvRW1iZWQgY2FsbCBmb3IgdGhlIHNwZWNpZmllZCBVUkwuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHZpZGVvVXJsIFRoZSB2aW1lby5jb20gdXJsIGZvciB0aGUgdmlkZW8uXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gUGFyYW1ldGVycyB0byBwYXNzIHRvIG9FbWJlZC5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQuXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5cbmZ1bmN0aW9uIGdldE9FbWJlZERhdGEodmlkZW9VcmwpIHtcbiAgdmFyIHBhcmFtcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gIHZhciBlbGVtZW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQ7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgaWYgKCFpc1ZpbWVvVXJsKHZpZGVvVXJsKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlxcdTIwMUNcIi5jb25jYXQodmlkZW9VcmwsIFwiXFx1MjAxRCBpcyBub3QgYSB2aW1lby5jb20gdXJsLlwiKSk7XG4gICAgfVxuXG4gICAgdmFyIHVybCA9IFwiaHR0cHM6Ly92aW1lby5jb20vYXBpL29lbWJlZC5qc29uP3VybD1cIi5jb25jYXQoZW5jb2RlVVJJQ29tcG9uZW50KHZpZGVvVXJsKSk7XG5cbiAgICBmb3IgKHZhciBwYXJhbSBpbiBwYXJhbXMpIHtcbiAgICAgIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkocGFyYW0pKSB7XG4gICAgICAgIHVybCArPSBcIiZcIi5jb25jYXQocGFyYW0sIFwiPVwiKS5jb25jYXQoZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtc1twYXJhbV0pKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgeGhyID0gJ1hEb21haW5SZXF1ZXN0JyBpbiB3aW5kb3cgPyBuZXcgWERvbWFpblJlcXVlc3QoKSA6IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhoci5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh4aHIuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIlxcdTIwMUNcIi5jb25jYXQodmlkZW9VcmwsIFwiXFx1MjAxRCB3YXMgbm90IGZvdW5kLlwiKSkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh4aHIuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIlxcdTIwMUNcIi5jb25jYXQodmlkZW9VcmwsIFwiXFx1MjAxRCBpcyBub3QgZW1iZWRkYWJsZS5cIikpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICB2YXIganNvbiA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7IC8vIENoZWNrIGFwaSByZXNwb25zZSBmb3IgNDAzIG9uIG9lbWJlZFxuXG4gICAgICAgIGlmIChqc29uLmRvbWFpbl9zdGF0dXNfY29kZSA9PT0gNDAzKSB7XG4gICAgICAgICAgLy8gV2Ugc3RpbGwgd2FudCB0byBjcmVhdGUgdGhlIGVtYmVkIHRvIGdpdmUgdXNlcnMgdmlzdWFsIGZlZWRiYWNrXG4gICAgICAgICAgY3JlYXRlRW1iZWQoanNvbiwgZWxlbWVudCk7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIlxcdTIwMUNcIi5jb25jYXQodmlkZW9VcmwsIFwiXFx1MjAxRCBpcyBub3QgZW1iZWRkYWJsZS5cIikpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXNvbHZlKGpzb24pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc3RhdHVzID0geGhyLnN0YXR1cyA/IFwiIChcIi5jb25jYXQoeGhyLnN0YXR1cywgXCIpXCIpIDogJyc7XG4gICAgICByZWplY3QobmV3IEVycm9yKFwiVGhlcmUgd2FzIGFuIGVycm9yIGZldGNoaW5nIHRoZSBlbWJlZCBjb2RlIGZyb20gVmltZW9cIi5jb25jYXQoc3RhdHVzLCBcIi5cIikpKTtcbiAgICB9O1xuXG4gICAgeGhyLnNlbmQoKTtcbiAgfSk7XG59XG4vKipcbiAqIEluaXRpYWxpemUgYWxsIGVtYmVkcyB3aXRoaW4gYSBzcGVjaWZpYyBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW3BhcmVudD1kb2N1bWVudF0gVGhlIHBhcmVudCBlbGVtZW50LlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuXG5mdW5jdGlvbiBpbml0aWFsaXplRW1iZWRzKCkge1xuICB2YXIgcGFyZW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBkb2N1bWVudDtcbiAgdmFyIGVsZW1lbnRzID0gW10uc2xpY2UuY2FsbChwYXJlbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdmltZW8taWRdLCBbZGF0YS12aW1lby11cmxdJykpO1xuXG4gIHZhciBoYW5kbGVFcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKGVycm9yKSB7XG4gICAgaWYgKCdjb25zb2xlJyBpbiB3aW5kb3cgJiYgY29uc29sZS5lcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIlRoZXJlIHdhcyBhbiBlcnJvciBjcmVhdGluZyBhbiBlbWJlZDogXCIuY29uY2F0KGVycm9yKSk7XG4gICAgfVxuICB9O1xuXG4gIGVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICB0cnkge1xuICAgICAgLy8gU2tpcCBhbnkgdGhhdCBoYXZlIGRhdGEtdmltZW8tZGVmZXJcbiAgICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS12aW1lby1kZWZlcicpICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHBhcmFtcyA9IGdldE9FbWJlZFBhcmFtZXRlcnMoZWxlbWVudCk7XG4gICAgICB2YXIgdXJsID0gZ2V0VmltZW9VcmwocGFyYW1zKTtcbiAgICAgIGdldE9FbWJlZERhdGEodXJsLCBwYXJhbXMsIGVsZW1lbnQpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUVtYmVkKGRhdGEsIGVsZW1lbnQpO1xuICAgICAgfSkuY2F0Y2goaGFuZGxlRXJyb3IpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBoYW5kbGVFcnJvcihlcnJvcik7XG4gICAgfVxuICB9KTtcbn1cbi8qKlxuICogUmVzaXplIGVtYmVkcyB3aGVuIG1lc3NhZ2VkIGJ5IHRoZSBwbGF5ZXIuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW3BhcmVudD1kb2N1bWVudF0gVGhlIHBhcmVudCBlbGVtZW50LlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuXG5mdW5jdGlvbiByZXNpemVFbWJlZHMoKSB7XG4gIHZhciBwYXJlbnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IGRvY3VtZW50O1xuXG4gIC8vIFByZXZlbnQgZXhlY3V0aW9uIGlmIHVzZXJzIGluY2x1ZGUgdGhlIHBsYXllci5qcyBzY3JpcHQgbXVsdGlwbGUgdGltZXMuXG4gIGlmICh3aW5kb3cuVmltZW9QbGF5ZXJSZXNpemVFbWJlZHNfKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgd2luZG93LlZpbWVvUGxheWVyUmVzaXplRW1iZWRzXyA9IHRydWU7XG5cbiAgdmFyIG9uTWVzc2FnZSA9IGZ1bmN0aW9uIG9uTWVzc2FnZShldmVudCkge1xuICAgIGlmICghaXNWaW1lb1VybChldmVudC5vcmlnaW4pKSB7XG4gICAgICByZXR1cm47XG4gICAgfSAvLyAnc3BhY2VjaGFuZ2UnIGlzIGZpcmVkIG9ubHkgb24gZW1iZWRzIHdpdGggY2FyZHNcblxuXG4gICAgaWYgKCFldmVudC5kYXRhIHx8IGV2ZW50LmRhdGEuZXZlbnQgIT09ICdzcGFjZWNoYW5nZScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgaWZyYW1lcyA9IHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKCdpZnJhbWUnKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaWZyYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGlmcmFtZXNbaV0uY29udGVudFdpbmRvdyAhPT0gZXZlbnQuc291cmNlKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfSAvLyBDaGFuZ2UgcGFkZGluZy1ib3R0b20gb2YgdGhlIGVuY2xvc2luZyBkaXYgdG8gYWNjb21tb2RhdGVcbiAgICAgIC8vIGNhcmQgY2Fyb3VzZWwgd2l0aG91dCBkaXN0b3J0aW5nIGFzcGVjdCByYXRpb1xuXG5cbiAgICAgIHZhciBzcGFjZSA9IGlmcmFtZXNbaV0ucGFyZW50RWxlbWVudDtcbiAgICAgIHNwYWNlLnN0eWxlLnBhZGRpbmdCb3R0b20gPSBcIlwiLmNvbmNhdChldmVudC5kYXRhLmRhdGFbMF0uYm90dG9tLCBcInB4XCIpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9O1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgb25NZXNzYWdlKTtcbn1cbi8qKlxuICogQWRkIGNoYXB0ZXJzIHRvIGV4aXN0aW5nIG1ldGFkYXRhIGZvciBHb29nbGUgU0VPXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW3BhcmVudD1kb2N1bWVudF0gVGhlIHBhcmVudCBlbGVtZW50LlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuXG5mdW5jdGlvbiBpbml0QXBwZW5kVmlkZW9NZXRhZGF0YSgpIHtcbiAgdmFyIHBhcmVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogZG9jdW1lbnQ7XG5cbiAgLy8gIFByZXZlbnQgZXhlY3V0aW9uIGlmIHVzZXJzIGluY2x1ZGUgdGhlIHBsYXllci5qcyBzY3JpcHQgbXVsdGlwbGUgdGltZXMuXG4gIGlmICh3aW5kb3cuVmltZW9TZW9NZXRhZGF0YUFwcGVuZGVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgd2luZG93LlZpbWVvU2VvTWV0YWRhdGFBcHBlbmRlZCA9IHRydWU7XG5cbiAgdmFyIG9uTWVzc2FnZSA9IGZ1bmN0aW9uIG9uTWVzc2FnZShldmVudCkge1xuICAgIGlmICghaXNWaW1lb1VybChldmVudC5vcmlnaW4pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGRhdGEgPSBwYXJzZU1lc3NhZ2VEYXRhKGV2ZW50LmRhdGEpO1xuXG4gICAgaWYgKCFkYXRhIHx8IGRhdGEuZXZlbnQgIT09ICdyZWFkeScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgaWZyYW1lcyA9IHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKCdpZnJhbWUnKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaWZyYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlmcmFtZSA9IGlmcmFtZXNbaV07IC8vIEluaXRpYXRlIGFwcGVuZFZpZGVvTWV0YWRhdGEgaWYgaWZyYW1lIGlzIGEgVmltZW8gZW1iZWRcblxuICAgICAgdmFyIGlzVmFsaWRNZXNzYWdlU291cmNlID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cgPT09IGV2ZW50LnNvdXJjZTtcblxuICAgICAgaWYgKGlzVmltZW9FbWJlZChpZnJhbWUuc3JjKSAmJiBpc1ZhbGlkTWVzc2FnZVNvdXJjZSkge1xuICAgICAgICB2YXIgcGxheWVyID0gbmV3IFBsYXllcihpZnJhbWUpO1xuICAgICAgICBwbGF5ZXIuY2FsbE1ldGhvZCgnYXBwZW5kVmlkZW9NZXRhZGF0YScsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBvbk1lc3NhZ2UpO1xufVxuXG4vKiBNSVQgTGljZW5zZVxuXG5Db3B5cmlnaHQgKGMpIFNpbmRyZSBTb3JodXMgPHNpbmRyZXNvcmh1c0BnbWFpbC5jb20+IChzaW5kcmVzb3JodXMuY29tKVxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5UZXJtcyAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVNjcmVlbmZ1bGwoKSB7XG4gIHZhciBmbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmFsO1xuICAgIHZhciBmbk1hcCA9IFtbJ3JlcXVlc3RGdWxsc2NyZWVuJywgJ2V4aXRGdWxsc2NyZWVuJywgJ2Z1bGxzY3JlZW5FbGVtZW50JywgJ2Z1bGxzY3JlZW5FbmFibGVkJywgJ2Z1bGxzY3JlZW5jaGFuZ2UnLCAnZnVsbHNjcmVlbmVycm9yJ10sIC8vIE5ldyBXZWJLaXRcbiAgICBbJ3dlYmtpdFJlcXVlc3RGdWxsc2NyZWVuJywgJ3dlYmtpdEV4aXRGdWxsc2NyZWVuJywgJ3dlYmtpdEZ1bGxzY3JlZW5FbGVtZW50JywgJ3dlYmtpdEZ1bGxzY3JlZW5FbmFibGVkJywgJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnLCAnd2Via2l0ZnVsbHNjcmVlbmVycm9yJ10sIC8vIE9sZCBXZWJLaXRcbiAgICBbJ3dlYmtpdFJlcXVlc3RGdWxsU2NyZWVuJywgJ3dlYmtpdENhbmNlbEZ1bGxTY3JlZW4nLCAnd2Via2l0Q3VycmVudEZ1bGxTY3JlZW5FbGVtZW50JywgJ3dlYmtpdENhbmNlbEZ1bGxTY3JlZW4nLCAnd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsICd3ZWJraXRmdWxsc2NyZWVuZXJyb3InXSwgWydtb3pSZXF1ZXN0RnVsbFNjcmVlbicsICdtb3pDYW5jZWxGdWxsU2NyZWVuJywgJ21vekZ1bGxTY3JlZW5FbGVtZW50JywgJ21vekZ1bGxTY3JlZW5FbmFibGVkJywgJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLCAnbW96ZnVsbHNjcmVlbmVycm9yJ10sIFsnbXNSZXF1ZXN0RnVsbHNjcmVlbicsICdtc0V4aXRGdWxsc2NyZWVuJywgJ21zRnVsbHNjcmVlbkVsZW1lbnQnLCAnbXNGdWxsc2NyZWVuRW5hYmxlZCcsICdNU0Z1bGxzY3JlZW5DaGFuZ2UnLCAnTVNGdWxsc2NyZWVuRXJyb3InXV07XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBsID0gZm5NYXAubGVuZ3RoO1xuICAgIHZhciByZXQgPSB7fTtcblxuICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB2YWwgPSBmbk1hcFtpXTtcblxuICAgICAgaWYgKHZhbCAmJiB2YWxbMV0gaW4gZG9jdW1lbnQpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHZhbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHJldFtmbk1hcFswXVtpXV0gPSB2YWxbaV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfSgpO1xuXG4gIHZhciBldmVudE5hbWVNYXAgPSB7XG4gICAgZnVsbHNjcmVlbmNoYW5nZTogZm4uZnVsbHNjcmVlbmNoYW5nZSxcbiAgICBmdWxsc2NyZWVuZXJyb3I6IGZuLmZ1bGxzY3JlZW5lcnJvclxuICB9O1xuICB2YXIgc2NyZWVuZnVsbCA9IHtcbiAgICByZXF1ZXN0OiBmdW5jdGlvbiByZXF1ZXN0KGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBvbkZ1bGxTY3JlZW5FbnRlcmVkID0gZnVuY3Rpb24gb25GdWxsU2NyZWVuRW50ZXJlZCgpIHtcbiAgICAgICAgICBzY3JlZW5mdWxsLm9mZignZnVsbHNjcmVlbmNoYW5nZScsIG9uRnVsbFNjcmVlbkVudGVyZWQpO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBzY3JlZW5mdWxsLm9uKCdmdWxsc2NyZWVuY2hhbmdlJywgb25GdWxsU2NyZWVuRW50ZXJlZCk7XG4gICAgICAgIGVsZW1lbnQgPSBlbGVtZW50IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgdmFyIHJldHVyblByb21pc2UgPSBlbGVtZW50W2ZuLnJlcXVlc3RGdWxsc2NyZWVuXSgpO1xuXG4gICAgICAgIGlmIChyZXR1cm5Qcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgIHJldHVyblByb21pc2UudGhlbihvbkZ1bGxTY3JlZW5FbnRlcmVkKS5jYXRjaChyZWplY3QpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGV4aXQ6IGZ1bmN0aW9uIGV4aXQoKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBpZiAoIXNjcmVlbmZ1bGwuaXNGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBvbkZ1bGxTY3JlZW5FeGl0ID0gZnVuY3Rpb24gb25GdWxsU2NyZWVuRXhpdCgpIHtcbiAgICAgICAgICBzY3JlZW5mdWxsLm9mZignZnVsbHNjcmVlbmNoYW5nZScsIG9uRnVsbFNjcmVlbkV4aXQpO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBzY3JlZW5mdWxsLm9uKCdmdWxsc2NyZWVuY2hhbmdlJywgb25GdWxsU2NyZWVuRXhpdCk7XG4gICAgICAgIHZhciByZXR1cm5Qcm9taXNlID0gZG9jdW1lbnRbZm4uZXhpdEZ1bGxzY3JlZW5dKCk7XG5cbiAgICAgICAgaWYgKHJldHVyblByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgcmV0dXJuUHJvbWlzZS50aGVuKG9uRnVsbFNjcmVlbkV4aXQpLmNhdGNoKHJlamVjdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG4gICAgb246IGZ1bmN0aW9uIG9uKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgdmFyIGV2ZW50TmFtZSA9IGV2ZW50TmFtZU1hcFtldmVudF07XG5cbiAgICAgIGlmIChldmVudE5hbWUpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG9mZjogZnVuY3Rpb24gb2ZmKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgdmFyIGV2ZW50TmFtZSA9IGV2ZW50TmFtZU1hcFtldmVudF07XG5cbiAgICAgIGlmIChldmVudE5hbWUpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHNjcmVlbmZ1bGwsIHtcbiAgICBpc0Z1bGxzY3JlZW46IHtcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gQm9vbGVhbihkb2N1bWVudFtmbi5mdWxsc2NyZWVuRWxlbWVudF0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgZWxlbWVudDoge1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnRbZm4uZnVsbHNjcmVlbkVsZW1lbnRdO1xuICAgICAgfVxuICAgIH0sXG4gICAgaXNFbmFibGVkOiB7XG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIC8vIENvZXJjZSB0byBib29sZWFuIGluIGNhc2Ugb2Ygb2xkIFdlYktpdFxuICAgICAgICByZXR1cm4gQm9vbGVhbihkb2N1bWVudFtmbi5mdWxsc2NyZWVuRW5hYmxlZF0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiBzY3JlZW5mdWxsO1xufVxuXG52YXIgcGxheWVyTWFwID0gbmV3IFdlYWtNYXAoKTtcbnZhciByZWFkeU1hcCA9IG5ldyBXZWFrTWFwKCk7XG52YXIgc2NyZWVuZnVsbCA9IHt9O1xuXG52YXIgUGxheWVyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIFBsYXllci5cbiAgICpcbiAgICogQHBhcmFtIHsoSFRNTElGcmFtZUVsZW1lbnR8SFRNTEVsZW1lbnR8c3RyaW5nfGpRdWVyeSl9IGVsZW1lbnQgQSByZWZlcmVuY2UgdG8gdGhlIFZpbWVvXG4gICAqICAgICAgICBwbGF5ZXIgaWZyYW1lLCBhbmQgaWQsIG9yIGEgalF1ZXJ5IG9iamVjdC5cbiAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXSBvRW1iZWQgcGFyYW1ldGVycyB0byB1c2Ugd2hlbiBjcmVhdGluZyBhbiBlbWJlZCBpbiB0aGUgZWxlbWVudC5cbiAgICogQHJldHVybiB7UGxheWVyfVxuICAgKi9cbiAgZnVuY3Rpb24gUGxheWVyKGVsZW1lbnQpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFBsYXllcik7XG5cbiAgICAvKiBnbG9iYWwgalF1ZXJ5ICovXG4gICAgaWYgKHdpbmRvdy5qUXVlcnkgJiYgZWxlbWVudCBpbnN0YW5jZW9mIGpRdWVyeSkge1xuICAgICAgaWYgKGVsZW1lbnQubGVuZ3RoID4gMSAmJiB3aW5kb3cuY29uc29sZSAmJiBjb25zb2xlLndhcm4pIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdBIGpRdWVyeSBvYmplY3Qgd2l0aCBtdWx0aXBsZSBlbGVtZW50cyB3YXMgcGFzc2VkLCB1c2luZyB0aGUgZmlyc3QgZWxlbWVudC4nKTtcbiAgICAgIH1cblxuICAgICAgZWxlbWVudCA9IGVsZW1lbnRbMF07XG4gICAgfSAvLyBGaW5kIGFuIGVsZW1lbnQgYnkgSURcblxuXG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudCk7XG4gICAgfSAvLyBOb3QgYW4gZWxlbWVudCFcblxuXG4gICAgaWYgKCFpc0RvbUVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1lvdSBtdXN0IHBhc3MgZWl0aGVyIGEgdmFsaWQgZWxlbWVudCBvciBhIHZhbGlkIGlkLicpO1xuICAgIH0gLy8gQWxyZWFkeSBpbml0aWFsaXplZCBhbiBlbWJlZCBpbiB0aGlzIGRpdiwgc28gZ3JhYiB0aGUgaWZyYW1lXG5cblxuICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lICE9PSAnSUZSQU1FJykge1xuICAgICAgdmFyIGlmcmFtZSA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignaWZyYW1lJyk7XG5cbiAgICAgIGlmIChpZnJhbWUpIHtcbiAgICAgICAgZWxlbWVudCA9IGlmcmFtZTtcbiAgICAgIH1cbiAgICB9IC8vIGlmcmFtZSB1cmwgaXMgbm90IGEgVmltZW8gdXJsXG5cblxuICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lID09PSAnSUZSQU1FJyAmJiAhaXNWaW1lb1VybChlbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJykgfHwgJycpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBwbGF5ZXIgZWxlbWVudCBwYXNzZWQgaXNu4oCZdCBhIFZpbWVvIGVtYmVkLicpO1xuICAgIH0gLy8gSWYgdGhlcmUgaXMgYWxyZWFkeSBhIHBsYXllciBvYmplY3QgaW4gdGhlIG1hcCwgcmV0dXJuIHRoYXRcblxuXG4gICAgaWYgKHBsYXllck1hcC5oYXMoZWxlbWVudCkpIHtcbiAgICAgIHJldHVybiBwbGF5ZXJNYXAuZ2V0KGVsZW1lbnQpO1xuICAgIH1cblxuICAgIHRoaXMuX3dpbmRvdyA9IGVsZW1lbnQub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldztcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMub3JpZ2luID0gJyonO1xuICAgIHZhciByZWFkeVByb21pc2UgPSBuZXcgbnBvX3NyYyhmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBfdGhpcy5fb25NZXNzYWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmICghaXNWaW1lb1VybChldmVudC5vcmlnaW4pIHx8IF90aGlzLmVsZW1lbnQuY29udGVudFdpbmRvdyAhPT0gZXZlbnQuc291cmNlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF90aGlzLm9yaWdpbiA9PT0gJyonKSB7XG4gICAgICAgICAgX3RoaXMub3JpZ2luID0gZXZlbnQub3JpZ2luO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRhdGEgPSBwYXJzZU1lc3NhZ2VEYXRhKGV2ZW50LmRhdGEpO1xuICAgICAgICB2YXIgaXNFcnJvciA9IGRhdGEgJiYgZGF0YS5ldmVudCA9PT0gJ2Vycm9yJztcbiAgICAgICAgdmFyIGlzUmVhZHlFcnJvciA9IGlzRXJyb3IgJiYgZGF0YS5kYXRhICYmIGRhdGEuZGF0YS5tZXRob2QgPT09ICdyZWFkeSc7XG5cbiAgICAgICAgaWYgKGlzUmVhZHlFcnJvcikge1xuICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihkYXRhLmRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgZXJyb3IubmFtZSA9IGRhdGEuZGF0YS5uYW1lO1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGlzUmVhZHlFdmVudCA9IGRhdGEgJiYgZGF0YS5ldmVudCA9PT0gJ3JlYWR5JztcbiAgICAgICAgdmFyIGlzUGluZ1Jlc3BvbnNlID0gZGF0YSAmJiBkYXRhLm1ldGhvZCA9PT0gJ3BpbmcnO1xuXG4gICAgICAgIGlmIChpc1JlYWR5RXZlbnQgfHwgaXNQaW5nUmVzcG9uc2UpIHtcbiAgICAgICAgICBfdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1yZWFkeScsICd0cnVlJyk7XG5cbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvY2Vzc0RhdGEoX3RoaXMsIGRhdGEpO1xuICAgICAgfTtcblxuICAgICAgX3RoaXMuX3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgX3RoaXMuX29uTWVzc2FnZSk7XG5cbiAgICAgIGlmIChfdGhpcy5lbGVtZW50Lm5vZGVOYW1lICE9PSAnSUZSQU1FJykge1xuICAgICAgICB2YXIgcGFyYW1zID0gZ2V0T0VtYmVkUGFyYW1ldGVycyhlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgdmFyIHVybCA9IGdldFZpbWVvVXJsKHBhcmFtcyk7XG4gICAgICAgIGdldE9FbWJlZERhdGEodXJsLCBwYXJhbXMsIGVsZW1lbnQpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICB2YXIgaWZyYW1lID0gY3JlYXRlRW1iZWQoZGF0YSwgZWxlbWVudCk7IC8vIE92ZXJ3cml0ZSBlbGVtZW50IHdpdGggdGhlIG5ldyBpZnJhbWUsXG4gICAgICAgICAgLy8gYnV0IHN0b3JlIHJlZmVyZW5jZSB0byB0aGUgb3JpZ2luYWwgZWxlbWVudFxuXG4gICAgICAgICAgX3RoaXMuZWxlbWVudCA9IGlmcmFtZTtcbiAgICAgICAgICBfdGhpcy5fb3JpZ2luYWxFbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgICBzd2FwQ2FsbGJhY2tzKGVsZW1lbnQsIGlmcmFtZSk7XG4gICAgICAgICAgcGxheWVyTWFwLnNldChfdGhpcy5lbGVtZW50LCBfdGhpcyk7XG4gICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH0pLmNhdGNoKHJlamVjdCk7XG4gICAgICB9XG4gICAgfSk7IC8vIFN0b3JlIGEgY29weSBvZiB0aGlzIFBsYXllciBpbiB0aGUgbWFwXG5cbiAgICByZWFkeU1hcC5zZXQodGhpcywgcmVhZHlQcm9taXNlKTtcbiAgICBwbGF5ZXJNYXAuc2V0KHRoaXMuZWxlbWVudCwgdGhpcyk7IC8vIFNlbmQgYSBwaW5nIHRvIHRoZSBpZnJhbWUgc28gdGhlIHJlYWR5IHByb21pc2Ugd2lsbCBiZSByZXNvbHZlZCBpZlxuICAgIC8vIHRoZSBwbGF5ZXIgaXMgYWxyZWFkeSByZWFkeS5cblxuICAgIGlmICh0aGlzLmVsZW1lbnQubm9kZU5hbWUgPT09ICdJRlJBTUUnKSB7XG4gICAgICBwb3N0TWVzc2FnZSh0aGlzLCAncGluZycpO1xuICAgIH1cblxuICAgIGlmIChzY3JlZW5mdWxsLmlzRW5hYmxlZCkge1xuICAgICAgdmFyIGV4aXRGdWxsc2NyZWVuID0gZnVuY3Rpb24gZXhpdEZ1bGxzY3JlZW4oKSB7XG4gICAgICAgIHJldHVybiBzY3JlZW5mdWxsLmV4aXQoKTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuZnVsbHNjcmVlbmNoYW5nZUhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChzY3JlZW5mdWxsLmlzRnVsbHNjcmVlbikge1xuICAgICAgICAgIHN0b3JlQ2FsbGJhY2soX3RoaXMsICdldmVudDpleGl0RnVsbHNjcmVlbicsIGV4aXRGdWxsc2NyZWVuKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZW1vdmVDYWxsYmFjayhfdGhpcywgJ2V2ZW50OmV4aXRGdWxsc2NyZWVuJywgZXhpdEZ1bGxzY3JlZW4pO1xuICAgICAgICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuXG5cbiAgICAgICAgX3RoaXMucmVhZHkoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBwb3N0TWVzc2FnZShfdGhpcywgJ2Z1bGxzY3JlZW5jaGFuZ2UnLCBzY3JlZW5mdWxsLmlzRnVsbHNjcmVlbik7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgc2NyZWVuZnVsbC5vbignZnVsbHNjcmVlbmNoYW5nZScsIHRoaXMuZnVsbHNjcmVlbmNoYW5nZUhhbmRsZXIpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKlxuICAgKiBHZXQgYSBwcm9taXNlIGZvciBhIG1ldGhvZC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIEFQSSBtZXRob2QgdG8gY2FsbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IFthcmdzPXt9XSBBcmd1bWVudHMgdG8gc2VuZCB2aWEgcG9zdE1lc3NhZ2UuXG4gICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKFBsYXllciwgW3tcbiAgICBrZXk6IFwiY2FsbE1ldGhvZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjYWxsTWV0aG9kKG5hbWUpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgICByZXR1cm4gbmV3IG5wb19zcmMoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAvLyBXZSBhcmUgc3RvcmluZyB0aGUgcmVzb2x2ZS9yZWplY3QgaGFuZGxlcnMgdG8gY2FsbCBsYXRlciwgc28gd2VcbiAgICAgICAgLy8gY2Fu4oCZdCByZXR1cm4gaGVyZS5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByb21pc2UvYWx3YXlzLXJldHVyblxuICAgICAgICByZXR1cm4gX3RoaXMyLnJlYWR5KCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc3RvcmVDYWxsYmFjayhfdGhpczIsIG5hbWUsIHtcbiAgICAgICAgICAgIHJlc29sdmU6IHJlc29sdmUsXG4gICAgICAgICAgICByZWplY3Q6IHJlamVjdFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHBvc3RNZXNzYWdlKF90aGlzMiwgbmFtZSwgYXJncyk7XG4gICAgICAgIH0pLmNhdGNoKHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IGEgcHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mIGEgcGxheWVyIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIHByb3BlcnR5IG5hbWVcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldChuYW1lKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgcmV0dXJuIG5ldyBucG9fc3JjKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgbmFtZSA9IGdldE1ldGhvZE5hbWUobmFtZSwgJ2dldCcpOyAvLyBXZSBhcmUgc3RvcmluZyB0aGUgcmVzb2x2ZS9yZWplY3QgaGFuZGxlcnMgdG8gY2FsbCBsYXRlciwgc28gd2VcbiAgICAgICAgLy8gY2Fu4oCZdCByZXR1cm4gaGVyZS5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByb21pc2UvYWx3YXlzLXJldHVyblxuXG4gICAgICAgIHJldHVybiBfdGhpczMucmVhZHkoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzdG9yZUNhbGxiYWNrKF90aGlzMywgbmFtZSwge1xuICAgICAgICAgICAgcmVzb2x2ZTogcmVzb2x2ZSxcbiAgICAgICAgICAgIHJlamVjdDogcmVqZWN0XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcG9zdE1lc3NhZ2UoX3RoaXMzLCBuYW1lKTtcbiAgICAgICAgfSkuY2F0Y2gocmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgYSBwcm9taXNlIGZvciBzZXR0aW5nIHRoZSB2YWx1ZSBvZiBhIHBsYXllciBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBBUEkgbWV0aG9kIHRvIGNhbGwuXG4gICAgICogQHBhcmFtIHttaXhlZH0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwic2V0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldChuYW1lLCB2YWx1ZSkge1xuICAgICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBuZXcgbnBvX3NyYyhmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIG5hbWUgPSBnZXRNZXRob2ROYW1lKG5hbWUsICdzZXQnKTtcblxuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZXJlIG11c3QgYmUgYSB2YWx1ZSB0byBzZXQuJyk7XG4gICAgICAgIH0gLy8gV2UgYXJlIHN0b3JpbmcgdGhlIHJlc29sdmUvcmVqZWN0IGhhbmRsZXJzIHRvIGNhbGwgbGF0ZXIsIHNvIHdlXG4gICAgICAgIC8vIGNhbuKAmXQgcmV0dXJuIGhlcmUuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcm9taXNlL2Fsd2F5cy1yZXR1cm5cblxuXG4gICAgICAgIHJldHVybiBfdGhpczQucmVhZHkoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzdG9yZUNhbGxiYWNrKF90aGlzNCwgbmFtZSwge1xuICAgICAgICAgICAgcmVzb2x2ZTogcmVzb2x2ZSxcbiAgICAgICAgICAgIHJlamVjdDogcmVqZWN0XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcG9zdE1lc3NhZ2UoX3RoaXM0LCBuYW1lLCB2YWx1ZSk7XG4gICAgICAgIH0pLmNhdGNoKHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGFuIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50LiBXaWxsIGNhbGwgdGhlXG4gICAgICogY2FsbGJhY2sgd2l0aCBhIHNpbmdsZSBwYXJhbWV0ZXIsIGBkYXRhYCwgdGhhdCBjb250YWlucyB0aGUgZGF0YSBmb3JcbiAgICAgKiB0aGF0IGV2ZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbigqKX0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB0aGUgZXZlbnQgZmlyZXMuXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcIm9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICAgIGlmICghZXZlbnROYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1lvdSBtdXN0IHBhc3MgYW4gZXZlbnQgbmFtZS4nKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdZb3UgbXVzdCBwYXNzIGEgY2FsbGJhY2sgZnVuY3Rpb24uJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGNhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGNhbGxiYWNrcyA9IGdldENhbGxiYWNrcyh0aGlzLCBcImV2ZW50OlwiLmNvbmNhdChldmVudE5hbWUpKTtcblxuICAgICAgaWYgKGNhbGxiYWNrcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5jYWxsTWV0aG9kKCdhZGRFdmVudExpc3RlbmVyJywgZXZlbnROYW1lKS5jYXRjaChmdW5jdGlvbiAoKSB7Ly8gSWdub3JlIHRoZSBlcnJvci4gVGhlcmUgd2lsbCBiZSBhbiBlcnJvciBldmVudCBmaXJlZCB0aGF0XG4gICAgICAgICAgLy8gd2lsbCB0cmlnZ2VyIHRoZSBlcnJvciBjYWxsYmFjayBpZiB0aGV5IGFyZSBsaXN0ZW5pbmcuXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBzdG9yZUNhbGxiYWNrKHRoaXMsIFwiZXZlbnQ6XCIuY29uY2F0KGV2ZW50TmFtZSksIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50LiBXaWxsIHJlbW92ZSBhbGxcbiAgICAgKiBsaXN0ZW5lcnMgZm9yIHRoYXQgZXZlbnQgaWYgYSBgY2FsbGJhY2tgIGlzbuKAmXQgcGFzc2VkLCBvciBvbmx5IHRoYXRcbiAgICAgKiBzcGVjaWZpYyBjYWxsYmFjayBpZiBpdCBpcyBwYXNzZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudC5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbY2FsbGJhY2tdIFRoZSBzcGVjaWZpYyBjYWxsYmFjayB0byByZW1vdmUuXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcIm9mZlwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvZmYoZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgICAgaWYgKCFldmVudE5hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignWW91IG11c3QgcGFzcyBhbiBldmVudCBuYW1lLicpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2FsbGJhY2sgJiYgdHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBjYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgICB9XG5cbiAgICAgIHZhciBsYXN0Q2FsbGJhY2sgPSByZW1vdmVDYWxsYmFjayh0aGlzLCBcImV2ZW50OlwiLmNvbmNhdChldmVudE5hbWUpLCBjYWxsYmFjayk7IC8vIElmIHRoZXJlIGFyZSBubyBjYWxsYmFja3MgbGVmdCwgcmVtb3ZlIHRoZSBsaXN0ZW5lclxuXG4gICAgICBpZiAobGFzdENhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuY2FsbE1ldGhvZCgncmVtb3ZlRXZlbnRMaXN0ZW5lcicsIGV2ZW50TmFtZSkuY2F0Y2goZnVuY3Rpb24gKGUpIHsvLyBJZ25vcmUgdGhlIGVycm9yLiBUaGVyZSB3aWxsIGJlIGFuIGVycm9yIGV2ZW50IGZpcmVkIHRoYXRcbiAgICAgICAgICAvLyB3aWxsIHRyaWdnZXIgdGhlIGVycm9yIGNhbGxiYWNrIGlmIHRoZXkgYXJlIGxpc3RlbmluZy5cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBsb2FkIGEgbmV3IHZpZGVvLlxuICAgICAqXG4gICAgICogQHByb21pc2UgTG9hZFZpZGVvUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtudW1iZXJ9IFRoZSB2aWRlbyB3aXRoIHRoaXMgaWQgb3IgdXJsIHN1Y2Nlc3NmdWxseSBsb2FkZWQuXG4gICAgICogQHJlamVjdCB7VHlwZUVycm9yfSBUaGUgaWQgd2FzIG5vdCBhIG51bWJlci5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIExvYWQgYSBuZXcgdmlkZW8gaW50byB0aGlzIGVtYmVkLiBUaGUgcHJvbWlzZSB3aWxsIGJlIHJlc29sdmVkIGlmXG4gICAgICogdGhlIHZpZGVvIGlzIHN1Y2Nlc3NmdWxseSBsb2FkZWQsIG9yIGl0IHdpbGwgYmUgcmVqZWN0ZWQgaWYgaXQgY291bGRcbiAgICAgKiBub3QgYmUgbG9hZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfG9iamVjdH0gb3B0aW9ucyBUaGUgaWQgb2YgdGhlIHZpZGVvLCB0aGUgdXJsIG9mIHRoZSB2aWRlbywgb3IgYW4gb2JqZWN0IHdpdGggZW1iZWQgb3B0aW9ucy5cbiAgICAgKiBAcmV0dXJuIHtMb2FkVmlkZW9Qcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwibG9hZFZpZGVvXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGxvYWRWaWRlbyhvcHRpb25zKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWxsTWV0aG9kKCdsb2FkVmlkZW8nLCBvcHRpb25zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIHBlcmZvcm0gYW4gYWN0aW9uIHdoZW4gdGhlIFBsYXllciBpcyByZWFkeS5cbiAgICAgKlxuICAgICAqIEB0b2RvIGRvY3VtZW50IGVycm9yc1xuICAgICAqIEBwcm9taXNlIExvYWRWaWRlb1Byb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7dm9pZH1cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXIgYSBmdW5jdGlvbiB3aGVuIHRoZSBwbGF5ZXIgaWZyYW1lIGhhcyBpbml0aWFsaXplZC4gWW91IGRvIG5vdFxuICAgICAqIG5lZWQgdG8gd2FpdCBmb3IgYHJlYWR5YCB0byB0cmlnZ2VyIHRvIGJlZ2luIGFkZGluZyBldmVudCBsaXN0ZW5lcnNcbiAgICAgKiBvciBjYWxsaW5nIG90aGVyIG1ldGhvZHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtSZWFkeVByb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJyZWFkeVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZWFkeSgpIHtcbiAgICAgIHZhciByZWFkeVByb21pc2UgPSByZWFkeU1hcC5nZXQodGhpcykgfHwgbmV3IG5wb19zcmMoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKCdVbmtub3duIHBsYXllci4gUHJvYmFibHkgdW5sb2FkZWQuJykpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbnBvX3NyYy5yZXNvbHZlKHJlYWR5UHJvbWlzZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBhZGQgYSBjdWUgcG9pbnQgdG8gdGhlIHBsYXllci5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIEFkZEN1ZVBvaW50UHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtzdHJpbmd9IFRoZSBpZCBvZiB0aGUgY3VlIHBvaW50IHRvIHVzZSBmb3IgcmVtb3ZlQ3VlUG9pbnQuXG4gICAgICogQHJlamVjdCB7UmFuZ2VFcnJvcn0gdGhlIHRpbWUgd2FzIGxlc3MgdGhhbiAwIG9yIGdyZWF0ZXIgdGhhbiB0aGVcbiAgICAgKiAgICAgICAgIHZpZGVv4oCZcyBkdXJhdGlvbi5cbiAgICAgKiBAcmVqZWN0IHtVbnN1cHBvcnRlZEVycm9yfSBDdWUgcG9pbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGhlIGN1cnJlbnRcbiAgICAgKiAgICAgICAgIHBsYXllciBvciBicm93c2VyLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQWRkIGEgY3VlIHBvaW50IHRvIHRoZSBwbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZSBUaGUgdGltZSBmb3IgdGhlIGN1ZSBwb2ludC5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW2RhdGFdIEFyYml0cmFyeSBkYXRhIHRvIGJlIHJldHVybmVkIHdpdGggdGhlIGN1ZSBwb2ludC5cbiAgICAgKiBAcmV0dXJuIHtBZGRDdWVQb2ludFByb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJhZGRDdWVQb2ludFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRDdWVQb2ludCh0aW1lKSB7XG4gICAgICB2YXIgZGF0YSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgICByZXR1cm4gdGhpcy5jYWxsTWV0aG9kKCdhZGRDdWVQb2ludCcsIHtcbiAgICAgICAgdGltZTogdGltZSxcbiAgICAgICAgZGF0YTogZGF0YVxuICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byByZW1vdmUgYSBjdWUgcG9pbnQgZnJvbSB0aGUgcGxheWVyLlxuICAgICAqXG4gICAgICogQHByb21pc2UgQWRkQ3VlUG9pbnRQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge3N0cmluZ30gVGhlIGlkIG9mIHRoZSBjdWUgcG9pbnQgdGhhdCB3YXMgcmVtb3ZlZC5cbiAgICAgKiBAcmVqZWN0IHtJbnZhbGlkQ3VlUG9pbnR9IFRoZSBjdWUgcG9pbnQgd2l0aCB0aGUgc3BlY2lmaWVkIGlkIHdhcyBub3RcbiAgICAgKiAgICAgICAgIGZvdW5kLlxuICAgICAqIEByZWplY3Qge1Vuc3VwcG9ydGVkRXJyb3J9IEN1ZSBwb2ludHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0aGUgY3VycmVudFxuICAgICAqICAgICAgICAgcGxheWVyIG9yIGJyb3dzZXIuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYSBjdWUgcG9pbnQgZnJvbSB0aGUgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgVGhlIGlkIG9mIHRoZSBjdWUgcG9pbnQgdG8gcmVtb3ZlLlxuICAgICAqIEByZXR1cm4ge1JlbW92ZUN1ZVBvaW50UHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInJlbW92ZUN1ZVBvaW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZUN1ZVBvaW50KGlkKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWxsTWV0aG9kKCdyZW1vdmVDdWVQb2ludCcsIGlkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSByZXByZXNlbnRhdGlvbiBvZiBhIHRleHQgdHJhY2sgb24gYSB2aWRlby5cbiAgICAgKlxuICAgICAqIEB0eXBlZGVmIHtPYmplY3R9IFZpbWVvVGV4dFRyYWNrXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9IGxhbmd1YWdlIFRoZSBJU08gbGFuZ3VhZ2UgY29kZS5cbiAgICAgKiBAcHJvcGVydHkge3N0cmluZ30ga2luZCBUaGUga2luZCBvZiB0cmFjayBpdCBpcyAoY2FwdGlvbnMgb3Igc3VidGl0bGVzKS5cbiAgICAgKiBAcHJvcGVydHkge3N0cmluZ30gbGFiZWwgVGhlIGh1bWFu4oCQcmVhZGFibGUgbGFiZWwgZm9yIHRoZSB0cmFjay5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBlbmFibGUgYSB0ZXh0IHRyYWNrLlxuICAgICAqXG4gICAgICogQHByb21pc2UgRW5hYmxlVGV4dFRyYWNrUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtWaW1lb1RleHRUcmFja30gVGhlIHRleHQgdHJhY2sgdGhhdCB3YXMgZW5hYmxlZC5cbiAgICAgKiBAcmVqZWN0IHtJbnZhbGlkVHJhY2tMYW5ndWFnZUVycm9yfSBObyB0cmFjayB3YXMgYXZhaWxhYmxlIHdpdGggdGhlXG4gICAgICogICAgICAgICBzcGVjaWZpZWQgbGFuZ3VhZ2UuXG4gICAgICogQHJlamVjdCB7SW52YWxpZFRyYWNrRXJyb3J9IE5vIHRyYWNrIHdhcyBhdmFpbGFibGUgd2l0aCB0aGUgc3BlY2lmaWVkXG4gICAgICogICAgICAgICBsYW5ndWFnZSBhbmQga2luZC5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEVuYWJsZSB0aGUgdGV4dCB0cmFjayB3aXRoIHRoZSBzcGVjaWZpZWQgbGFuZ3VhZ2UsIGFuZCBvcHRpb25hbGx5IHRoZVxuICAgICAqIHNwZWNpZmllZCBraW5kIChjYXB0aW9ucyBvciBzdWJ0aXRsZXMpLlxuICAgICAqXG4gICAgICogV2hlbiBzZXQgdmlhIHRoZSBBUEksIHRoZSB0cmFjayBsYW5ndWFnZSB3aWxsIG5vdCBjaGFuZ2UgdGhlIHZpZXdlcuKAmXNcbiAgICAgKiBzdG9yZWQgcHJlZmVyZW5jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZSBUaGUgdHdv4oCQbGV0dGVyIGxhbmd1YWdlIGNvZGUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtraW5kXSBUaGUga2luZCBvZiB0cmFjayB0byBlbmFibGUgKGNhcHRpb25zIG9yIHN1YnRpdGxlcykuXG4gICAgICogQHJldHVybiB7RW5hYmxlVGV4dFRyYWNrUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImVuYWJsZVRleHRUcmFja1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlbmFibGVUZXh0VHJhY2sobGFuZ3VhZ2UsIGtpbmQpIHtcbiAgICAgIGlmICghbGFuZ3VhZ2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignWW91IG11c3QgcGFzcyBhIGxhbmd1YWdlLicpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jYWxsTWV0aG9kKCdlbmFibGVUZXh0VHJhY2snLCB7XG4gICAgICAgIGxhbmd1YWdlOiBsYW5ndWFnZSxcbiAgICAgICAga2luZDoga2luZFxuICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBkaXNhYmxlIHRoZSBhY3RpdmUgdGV4dCB0cmFjay5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIERpc2FibGVUZXh0VHJhY2tQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge3ZvaWR9IFRoZSB0cmFjayB3YXMgZGlzYWJsZWQuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBEaXNhYmxlIHRoZSBjdXJyZW50bHktYWN0aXZlIHRleHQgdHJhY2suXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtEaXNhYmxlVGV4dFRyYWNrUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImRpc2FibGVUZXh0VHJhY2tcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGlzYWJsZVRleHRUcmFjaygpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhbGxNZXRob2QoJ2Rpc2FibGVUZXh0VHJhY2snKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIHBhdXNlIHRoZSB2aWRlby5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIFBhdXNlUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHt2b2lkfSBUaGUgdmlkZW8gd2FzIHBhdXNlZC5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIFBhdXNlIHRoZSB2aWRlbyBpZiBpdOKAmXMgcGxheWluZy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1BhdXNlUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInBhdXNlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBhdXNlKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FsbE1ldGhvZCgncGF1c2UnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIHBsYXkgdGhlIHZpZGVvLlxuICAgICAqXG4gICAgICogQHByb21pc2UgUGxheVByb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7dm9pZH0gVGhlIHZpZGVvIHdhcyBwbGF5ZWQuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBQbGF5IHRoZSB2aWRlbyBpZiBpdOKAmXMgcGF1c2VkLiAqKk5vdGU6Kiogb24gaU9TIGFuZCBzb21lIG90aGVyXG4gICAgICogbW9iaWxlIGRldmljZXMsIHlvdSBjYW5ub3QgcHJvZ3JhbW1hdGljYWxseSB0cmlnZ2VyIHBsYXkuIE9uY2UgdGhlXG4gICAgICogdmlld2VyIGhhcyB0YXBwZWQgb24gdGhlIHBsYXkgYnV0dG9uIGluIHRoZSBwbGF5ZXIsIGhvd2V2ZXIsIHlvdVxuICAgICAqIHdpbGwgYmUgYWJsZSB0byB1c2UgdGhpcyBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1BsYXlQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwicGxheVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwbGF5KCkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FsbE1ldGhvZCgncGxheScpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0IHRoYXQgdGhlIHBsYXllciBlbnRlcnMgZnVsbHNjcmVlbi5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwicmVxdWVzdEZ1bGxzY3JlZW5cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVxdWVzdEZ1bGxzY3JlZW4oKSB7XG4gICAgICBpZiAoc2NyZWVuZnVsbC5pc0VuYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuIHNjcmVlbmZ1bGwucmVxdWVzdCh0aGlzLmVsZW1lbnQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jYWxsTWV0aG9kKCdyZXF1ZXN0RnVsbHNjcmVlbicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0IHRoYXQgdGhlIHBsYXllciBleGl0cyBmdWxsc2NyZWVuLlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJleGl0RnVsbHNjcmVlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBleGl0RnVsbHNjcmVlbigpIHtcbiAgICAgIGlmIChzY3JlZW5mdWxsLmlzRW5hYmxlZCkge1xuICAgICAgICByZXR1cm4gc2NyZWVuZnVsbC5leGl0KCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNhbGxNZXRob2QoJ2V4aXRGdWxsc2NyZWVuJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcGxheWVyIGlzIGN1cnJlbnRseSBmdWxsc2NyZWVuLlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJnZXRGdWxsc2NyZWVuXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEZ1bGxzY3JlZW4oKSB7XG4gICAgICBpZiAoc2NyZWVuZnVsbC5pc0VuYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuIG5wb19zcmMucmVzb2x2ZShzY3JlZW5mdWxsLmlzRnVsbHNjcmVlbik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmdldCgnZnVsbHNjcmVlbicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0IHRoYXQgdGhlIHBsYXllciBlbnRlcnMgcGljdHVyZS1pbi1waWN0dXJlLlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJyZXF1ZXN0UGljdHVyZUluUGljdHVyZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXF1ZXN0UGljdHVyZUluUGljdHVyZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhbGxNZXRob2QoJ3JlcXVlc3RQaWN0dXJlSW5QaWN0dXJlJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlcXVlc3QgdGhhdCB0aGUgcGxheWVyIGV4aXRzIHBpY3R1cmUtaW4tcGljdHVyZS5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZXhpdFBpY3R1cmVJblBpY3R1cmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZXhpdFBpY3R1cmVJblBpY3R1cmUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWxsTWV0aG9kKCdleGl0UGljdHVyZUluUGljdHVyZScpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHBsYXllciBpcyBjdXJyZW50bHkgcGljdHVyZS1pbi1waWN0dXJlLlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJnZXRQaWN0dXJlSW5QaWN0dXJlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFBpY3R1cmVJblBpY3R1cmUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ3BpY3R1cmVJblBpY3R1cmUnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIHVubG9hZCB0aGUgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBVbmxvYWRQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge3ZvaWR9IFRoZSB2aWRlbyB3YXMgdW5sb2FkZWQuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIHBsYXllciB0byBpdHMgaW5pdGlhbCBzdGF0ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1VubG9hZFByb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJ1bmxvYWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdW5sb2FkKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FsbE1ldGhvZCgndW5sb2FkJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFudXAgdGhlIHBsYXllciBhbmQgcmVtb3ZlIGl0IGZyb20gdGhlIERPTVxuICAgICAqXG4gICAgICogSXQgd29uJ3QgYmUgdXNhYmxlIGFuZCBhIG5ldyBvbmUgc2hvdWxkIGJlIGNvbnN0cnVjdGVkXG4gICAgICogIGluIG9yZGVyIHRvIGRvIGFueSBvcGVyYXRpb25zLlxuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImRlc3Ryb3lcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gbmV3IG5wb19zcmMoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgcmVhZHlNYXAuZGVsZXRlKF90aGlzNSk7XG4gICAgICAgIHBsYXllck1hcC5kZWxldGUoX3RoaXM1LmVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChfdGhpczUuX29yaWdpbmFsRWxlbWVudCkge1xuICAgICAgICAgIHBsYXllck1hcC5kZWxldGUoX3RoaXM1Ll9vcmlnaW5hbEVsZW1lbnQpO1xuXG4gICAgICAgICAgX3RoaXM1Ll9vcmlnaW5hbEVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXZpbWVvLWluaXRpYWxpemVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX3RoaXM1LmVsZW1lbnQgJiYgX3RoaXM1LmVsZW1lbnQubm9kZU5hbWUgPT09ICdJRlJBTUUnICYmIF90aGlzNS5lbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAvLyBJZiB3ZSd2ZSBhZGRlZCBhbiBhZGRpdGlvbmFsIHdyYXBwZXIgZGl2LCByZW1vdmUgdGhhdCBmcm9tIHRoZSBET00uXG4gICAgICAgICAgLy8gSWYgbm90LCBqdXN0IHJlbW92ZSB0aGUgaWZyYW1lIGVsZW1lbnQuXG4gICAgICAgICAgaWYgKF90aGlzNS5lbGVtZW50LnBhcmVudE5vZGUucGFyZW50Tm9kZSAmJiBfdGhpczUuX29yaWdpbmFsRWxlbWVudCAmJiBfdGhpczUuX29yaWdpbmFsRWxlbWVudCAhPT0gX3RoaXM1LmVsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgX3RoaXM1LmVsZW1lbnQucGFyZW50Tm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKF90aGlzNS5lbGVtZW50LnBhcmVudE5vZGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpczUuZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKF90aGlzNS5lbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gLy8gSWYgdGhlIGNsaXAgaXMgcHJpdmF0ZSB0aGVyZSBpcyBhIGNhc2Ugd2hlcmUgdGhlIGVsZW1lbnQgc3RheXMgdGhlXG4gICAgICAgIC8vIGRpdiBlbGVtZW50LiBEZXN0cm95IHNob3VsZCByZXNldCB0aGUgZGl2IGFuZCByZW1vdmUgdGhlIGlmcmFtZSBjaGlsZC5cblxuXG4gICAgICAgIGlmIChfdGhpczUuZWxlbWVudCAmJiBfdGhpczUuZWxlbWVudC5ub2RlTmFtZSA9PT0gJ0RJVicgJiYgX3RoaXM1LmVsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgICAgICAgIF90aGlzNS5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS12aW1lby1pbml0aWFsaXplZCcpO1xuXG4gICAgICAgICAgdmFyIGlmcmFtZSA9IF90aGlzNS5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lmcmFtZScpO1xuXG4gICAgICAgICAgaWYgKGlmcmFtZSAmJiBpZnJhbWUucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgLy8gSWYgd2UndmUgYWRkZWQgYW4gYWRkaXRpb25hbCB3cmFwcGVyIGRpdiwgcmVtb3ZlIHRoYXQgZnJvbSB0aGUgRE9NLlxuICAgICAgICAgICAgLy8gSWYgbm90LCBqdXN0IHJlbW92ZSB0aGUgaWZyYW1lIGVsZW1lbnQuXG4gICAgICAgICAgICBpZiAoaWZyYW1lLnBhcmVudE5vZGUucGFyZW50Tm9kZSAmJiBfdGhpczUuX29yaWdpbmFsRWxlbWVudCAmJiBfdGhpczUuX29yaWdpbmFsRWxlbWVudCAhPT0gaWZyYW1lLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgaWZyYW1lLnBhcmVudE5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpZnJhbWUucGFyZW50Tm9kZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZnJhbWUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzNS5fd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBfdGhpczUuX29uTWVzc2FnZSk7XG5cbiAgICAgICAgaWYgKHNjcmVlbmZ1bGwuaXNFbmFibGVkKSB7XG4gICAgICAgICAgc2NyZWVuZnVsbC5vZmYoJ2Z1bGxzY3JlZW5jaGFuZ2UnLCBfdGhpczUuZnVsbHNjcmVlbmNoYW5nZUhhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBnZXQgdGhlIGF1dG9wYXVzZSBiZWhhdmlvciBvZiB0aGUgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBHZXRBdXRvcGF1c2VQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge2Jvb2xlYW59IFdoZXRoZXIgYXV0b3BhdXNlIGlzIHR1cm5lZCBvbiBvciBvZmYuXG4gICAgICogQHJlamVjdCB7VW5zdXBwb3J0ZWRFcnJvcn0gQXV0b3BhdXNlIGlzIG5vdCBzdXBwb3J0ZWQgd2l0aCB0aGUgY3VycmVudFxuICAgICAqICAgICAgICAgcGxheWVyIG9yIGJyb3dzZXIuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGF1dG9wYXVzZSBiZWhhdmlvciBmb3IgdGhpcyBwbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtHZXRBdXRvcGF1c2VQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0QXV0b3BhdXNlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEF1dG9wYXVzZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldCgnYXV0b3BhdXNlJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBzZXQgdGhlIGF1dG9wYXVzZSBiZWhhdmlvciBvZiB0aGUgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBTZXRBdXRvcGF1c2VQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge2Jvb2xlYW59IFdoZXRoZXIgYXV0b3BhdXNlIGlzIHR1cm5lZCBvbiBvciBvZmYuXG4gICAgICogQHJlamVjdCB7VW5zdXBwb3J0ZWRFcnJvcn0gQXV0b3BhdXNlIGlzIG5vdCBzdXBwb3J0ZWQgd2l0aCB0aGUgY3VycmVudFxuICAgICAqICAgICAgICAgcGxheWVyIG9yIGJyb3dzZXIuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBFbmFibGUgb3IgZGlzYWJsZSB0aGUgYXV0b3BhdXNlIGJlaGF2aW9yIG9mIHRoaXMgcGxheWVyLlxuICAgICAqXG4gICAgICogQnkgZGVmYXVsdCwgd2hlbiBhbm90aGVyIHZpZGVvIGlzIHBsYXllZCBpbiB0aGUgc2FtZSBicm93c2VyLCB0aGlzXG4gICAgICogcGxheWVyIHdpbGwgYXV0b21hdGljYWxseSBwYXVzZS4gVW5sZXNzIHlvdSBoYXZlIGEgc3BlY2lmaWMgcmVhc29uXG4gICAgICogZm9yIGRvaW5nIHNvLCB3ZSByZWNvbW1lbmQgdGhhdCB5b3UgbGVhdmUgYXV0b3BhdXNlIHNldCB0byB0aGVcbiAgICAgKiBkZWZhdWx0IChgdHJ1ZWApLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtib29sZWFufSBhdXRvcGF1c2VcbiAgICAgKiBAcmV0dXJuIHtTZXRBdXRvcGF1c2VQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwic2V0QXV0b3BhdXNlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldEF1dG9wYXVzZShhdXRvcGF1c2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnNldCgnYXV0b3BhdXNlJywgYXV0b3BhdXNlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIGdldCB0aGUgYnVmZmVyZWQgcHJvcGVydHkgb2YgdGhlIHZpZGVvLlxuICAgICAqXG4gICAgICogQHByb21pc2UgR2V0QnVmZmVyZWRQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge0FycmF5fSBCdWZmZXJlZCBUaW1lcmFuZ2VzIGNvbnZlcnRlZCB0byBhbiBBcnJheS5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYnVmZmVyZWQgcHJvcGVydHkgb2YgdGhlIHZpZGVvLlxuICAgICAqXG4gICAgICogQHJldHVybiB7R2V0QnVmZmVyZWRQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0QnVmZmVyZWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QnVmZmVyZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ2J1ZmZlcmVkJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEB0eXBlZGVmIHtPYmplY3R9IENhbWVyYVByb3BlcnRpZXNcbiAgICAgKiBAcHJvcCB7bnVtYmVyfSBwcm9wcy55YXcgLSBOdW1iZXIgYmV0d2VlbiAwIGFuZCAzNjAuXG4gICAgICogQHByb3Age251bWJlcn0gcHJvcHMucGl0Y2ggLSBOdW1iZXIgYmV0d2VlbiAtOTAgYW5kIDkwLlxuICAgICAqIEBwcm9wIHtudW1iZXJ9IHByb3BzLnJvbGwgLSBOdW1iZXIgYmV0d2VlbiAtMTgwIGFuZCAxODAuXG4gICAgICogQHByb3Age251bWJlcn0gcHJvcHMuZm92IC0gVGhlIGZpZWxkIG9mIHZpZXcgaW4gZGVncmVlcy5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBnZXQgdGhlIGNhbWVyYSBwcm9wZXJ0aWVzIG9mIHRoZSBwbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBHZXRDYW1lcmFQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge0NhbWVyYVByb3BlcnRpZXN9IFRoZSBjYW1lcmEgcHJvcGVydGllcy5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEZvciAzNjDCsCB2aWRlb3MgZ2V0IHRoZSBjYW1lcmEgcHJvcGVydGllcyBmb3IgdGhpcyBwbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtHZXRDYW1lcmFQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0Q2FtZXJhUHJvcHNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2FtZXJhUHJvcHMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ2NhbWVyYVByb3BzJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBzZXQgdGhlIGNhbWVyYSBwcm9wZXJ0aWVzIG9mIHRoZSBwbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBTZXRDYW1lcmFQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge09iamVjdH0gVGhlIGNhbWVyYSB3YXMgc3VjY2Vzc2Z1bGx5IHNldC5cbiAgICAgKiBAcmVqZWN0IHtSYW5nZUVycm9yfSBUaGUgcmFuZ2Ugd2FzIG91dCBvZiBib3VuZHMuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBGb3IgMzYwwrAgdmlkZW9zIHNldCB0aGUgY2FtZXJhIHByb3BlcnRpZXMgZm9yIHRoaXMgcGxheWVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtDYW1lcmFQcm9wZXJ0aWVzfSBjYW1lcmEgVGhlIGNhbWVyYSBwcm9wZXJ0aWVzXG4gICAgICogQHJldHVybiB7U2V0Q2FtZXJhUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInNldENhbWVyYVByb3BzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldENhbWVyYVByb3BzKGNhbWVyYSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0KCdjYW1lcmFQcm9wcycsIGNhbWVyYSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcmVwcmVzZW50YXRpb24gb2YgYSBjaGFwdGVyLlxuICAgICAqXG4gICAgICogQHR5cGVkZWYge09iamVjdH0gVmltZW9DaGFwdGVyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHN0YXJ0VGltZSBUaGUgc3RhcnQgdGltZSBvZiB0aGUgY2hhcHRlci5cbiAgICAgKiBAcHJvcGVydHkge29iamVjdH0gdGl0bGUgVGhlIHRpdGxlIG9mIHRoZSBjaGFwdGVyLlxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBpbmRleCBUaGUgcGxhY2UgaW4gdGhlIG9yZGVyIG9mIENoYXB0ZXJzLiBTdGFydHMgYXQgMS5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBnZXQgY2hhcHRlcnMgZm9yIHRoZSB2aWRlby5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIEdldENoYXB0ZXJzUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtWaW1lb0NoYXB0ZXJbXX0gVGhlIGNoYXB0ZXJzIGZvciB0aGUgdmlkZW8uXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBHZXQgYW4gYXJyYXkgb2YgYWxsIHRoZSBjaGFwdGVycyBmb3IgdGhlIHZpZGVvLlxuICAgICAqXG4gICAgICogQHJldHVybiB7R2V0Q2hhcHRlcnNQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0Q2hhcHRlcnNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2hhcHRlcnMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ2NoYXB0ZXJzJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBnZXQgdGhlIGN1cnJlbnRseSBhY3RpdmUgY2hhcHRlci5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIEdldEN1cnJlbnRDaGFwdGVyc1Byb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7VmltZW9DaGFwdGVyfHVuZGVmaW5lZH0gVGhlIGN1cnJlbnQgY2hhcHRlciBmb3IgdGhlIHZpZGVvLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjdXJyZW50bHkgYWN0aXZlIGNoYXB0ZXIgZm9yIHRoZSB2aWRlby5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0dldEN1cnJlbnRDaGFwdGVyc1Byb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJnZXRDdXJyZW50Q2hhcHRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDdXJyZW50Q2hhcHRlcigpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldCgnY3VycmVudENoYXB0ZXInKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIGdldCB0aGUgY29sb3Igb2YgdGhlIHBsYXllci5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIEdldENvbG9yUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtzdHJpbmd9IFRoZSBoZXggY29sb3Igb2YgdGhlIHBsYXllci5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY29sb3IgZm9yIHRoaXMgcGxheWVyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7R2V0Q29sb3JQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0Q29sb3JcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q29sb3IoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ2NvbG9yJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBzZXQgdGhlIGNvbG9yIG9mIHRoZSBwbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBTZXRDb2xvclByb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7c3RyaW5nfSBUaGUgY29sb3Igd2FzIHN1Y2Nlc3NmdWxseSBzZXQuXG4gICAgICogQHJlamVjdCB7VHlwZUVycm9yfSBUaGUgc3RyaW5nIHdhcyBub3QgYSB2YWxpZCBoZXggb3IgcmdiIGNvbG9yLlxuICAgICAqIEByZWplY3Qge0NvbnRyYXN0RXJyb3J9IFRoZSBjb2xvciB3YXMgc2V0LCBidXQgdGhlIGNvbnRyYXN0IGlzXG4gICAgICogICAgICAgICBvdXRzaWRlIG9mIHRoZSBhY2NlcHRhYmxlIHJhbmdlLlxuICAgICAqIEByZWplY3Qge0VtYmVkU2V0dGluZ3NFcnJvcn0gVGhlIG93bmVyIG9mIHRoZSBwbGF5ZXIgaGFzIGNob3NlbiB0b1xuICAgICAqICAgICAgICAgdXNlIGEgc3BlY2lmaWMgY29sb3IuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGNvbG9yIG9mIHRoaXMgcGxheWVyIHRvIGEgaGV4IG9yIHJnYiBzdHJpbmcuIFNldHRpbmcgdGhlXG4gICAgICogY29sb3IgbWF5IGZhaWwgaWYgdGhlIG93bmVyIG9mIHRoZSB2aWRlbyBoYXMgc2V0IHRoZWlyIGVtYmVkXG4gICAgICogcHJlZmVyZW5jZXMgdG8gZm9yY2UgYSBzcGVjaWZpYyBjb2xvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvciBUaGUgaGV4IG9yIHJnYiBjb2xvciBzdHJpbmcgdG8gc2V0LlxuICAgICAqIEByZXR1cm4ge1NldENvbG9yUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInNldENvbG9yXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldENvbG9yKGNvbG9yKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXQoJ2NvbG9yJywgY29sb3IpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHJlcHJlc2VudGF0aW9uIG9mIGEgY3VlIHBvaW50LlxuICAgICAqXG4gICAgICogQHR5cGVkZWYge09iamVjdH0gVmltZW9DdWVQb2ludFxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB0aW1lIFRoZSB0aW1lIG9mIHRoZSBjdWUgcG9pbnQuXG4gICAgICogQHByb3BlcnR5IHtvYmplY3R9IGRhdGEgVGhlIGRhdGEgcGFzc2VkIHdoZW4gYWRkaW5nIHRoZSBjdWUgcG9pbnQuXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9IGlkIFRoZSB1bmlxdWUgaWQgZm9yIHVzZSB3aXRoIHJlbW92ZUN1ZVBvaW50LlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIGdldCB0aGUgY3VlIHBvaW50cyBvZiBhIHZpZGVvLlxuICAgICAqXG4gICAgICogQHByb21pc2UgR2V0Q3VlUG9pbnRzUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtWaW1lb0N1ZVBvaW50W119IFRoZSBjdWUgcG9pbnRzIGFkZGVkIHRvIHRoZSB2aWRlby5cbiAgICAgKiBAcmVqZWN0IHtVbnN1cHBvcnRlZEVycm9yfSBDdWUgcG9pbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGhlIGN1cnJlbnRcbiAgICAgKiAgICAgICAgIHBsYXllciBvciBicm93c2VyLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogR2V0IGFuIGFycmF5IG9mIHRoZSBjdWUgcG9pbnRzIGFkZGVkIHRvIHRoZSB2aWRlby5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0dldEN1ZVBvaW50c1Byb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJnZXRDdWVQb2ludHNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q3VlUG9pbnRzKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdjdWVQb2ludHMnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIGdldCB0aGUgY3VycmVudCB0aW1lIG9mIHRoZSB2aWRlby5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIEdldEN1cnJlbnRUaW1lUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtudW1iZXJ9IFRoZSBjdXJyZW50IHRpbWUgaW4gc2Vjb25kcy5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudCBwbGF5YmFjayBwb3NpdGlvbiBpbiBzZWNvbmRzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7R2V0Q3VycmVudFRpbWVQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0Q3VycmVudFRpbWVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q3VycmVudFRpbWUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ2N1cnJlbnRUaW1lJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBzZXQgdGhlIGN1cnJlbnQgdGltZSBvZiB0aGUgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBTZXRDdXJyZW50VGltZVByb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7bnVtYmVyfSBUaGUgYWN0dWFsIGN1cnJlbnQgdGltZSB0aGF0IHdhcyBzZXQuXG4gICAgICogQHJlamVjdCB7UmFuZ2VFcnJvcn0gdGhlIHRpbWUgd2FzIGxlc3MgdGhhbiAwIG9yIGdyZWF0ZXIgdGhhbiB0aGVcbiAgICAgKiAgICAgICAgIHZpZGVv4oCZcyBkdXJhdGlvbi5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY3VycmVudCBwbGF5YmFjayBwb3NpdGlvbiBpbiBzZWNvbmRzLiBJZiB0aGUgcGxheWVyIHdhc1xuICAgICAqIHBhdXNlZCwgaXQgd2lsbCByZW1haW4gcGF1c2VkLiBMaWtld2lzZSwgaWYgdGhlIHBsYXllciB3YXMgcGxheWluZyxcbiAgICAgKiBpdCB3aWxsIHJlc3VtZSBwbGF5aW5nIG9uY2UgdGhlIHZpZGVvIGhhcyBidWZmZXJlZC5cbiAgICAgKlxuICAgICAqIFlvdSBjYW4gcHJvdmlkZSBhbiBhY2N1cmF0ZSB0aW1lIGFuZCB0aGUgcGxheWVyIHdpbGwgYXR0ZW1wdCB0byBzZWVrXG4gICAgICogdG8gYXMgY2xvc2UgdG8gdGhhdCB0aW1lIGFzIHBvc3NpYmxlLiBUaGUgZXhhY3QgdGltZSB3aWxsIGJlIHRoZVxuICAgICAqIGZ1bGZpbGxlZCB2YWx1ZSBvZiB0aGUgcHJvbWlzZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJyZW50VGltZVxuICAgICAqIEByZXR1cm4ge1NldEN1cnJlbnRUaW1lUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInNldEN1cnJlbnRUaW1lXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldEN1cnJlbnRUaW1lKGN1cnJlbnRUaW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXQoJ2N1cnJlbnRUaW1lJywgY3VycmVudFRpbWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdG8gZ2V0IHRoZSBkdXJhdGlvbiBvZiB0aGUgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBHZXREdXJhdGlvblByb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7bnVtYmVyfSBUaGUgZHVyYXRpb24gaW4gc2Vjb25kcy5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZHVyYXRpb24gb2YgdGhlIHZpZGVvIGluIHNlY29uZHMuIEl0IHdpbGwgYmUgcm91bmRlZCB0byB0aGVcbiAgICAgKiBuZWFyZXN0IHNlY29uZCBiZWZvcmUgcGxheWJhY2sgYmVnaW5zLCBhbmQgdG8gdGhlIG5lYXJlc3QgdGhvdXNhbmR0aFxuICAgICAqIG9mIGEgc2Vjb25kIGFmdGVyIHBsYXliYWNrIGJlZ2lucy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0dldER1cmF0aW9uUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImdldER1cmF0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldER1cmF0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdkdXJhdGlvbicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdG8gZ2V0IHRoZSBlbmRlZCBzdGF0ZSBvZiB0aGUgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBHZXRFbmRlZFByb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIHZpZGVvIGhhcyBlbmRlZC5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZW5kZWQgc3RhdGUgb2YgdGhlIHZpZGVvLiBUaGUgdmlkZW8gaGFzIGVuZGVkIGlmXG4gICAgICogYGN1cnJlbnRUaW1lID09PSBkdXJhdGlvbmAuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtHZXRFbmRlZFByb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJnZXRFbmRlZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRFbmRlZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldCgnZW5kZWQnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIGdldCB0aGUgbG9vcCBzdGF0ZSBvZiB0aGUgcGxheWVyLlxuICAgICAqXG4gICAgICogQHByb21pc2UgR2V0TG9vcFByb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIHBsYXllciBpcyBzZXQgdG8gbG9vcC5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbG9vcCBzdGF0ZSBvZiB0aGUgcGxheWVyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7R2V0TG9vcFByb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJnZXRMb29wXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldExvb3AoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ2xvb3AnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIHNldCB0aGUgbG9vcCBzdGF0ZSBvZiB0aGUgcGxheWVyLlxuICAgICAqXG4gICAgICogQHByb21pc2UgU2V0TG9vcFByb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7Ym9vbGVhbn0gVGhlIGxvb3Agc3RhdGUgdGhhdCB3YXMgc2V0LlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBsb29wIHN0YXRlIG9mIHRoZSBwbGF5ZXIuIFdoZW4gc2V0IHRvIGB0cnVlYCwgdGhlIHBsYXllclxuICAgICAqIHdpbGwgc3RhcnQgb3ZlciBpbW1lZGlhdGVseSBvbmNlIHBsYXliYWNrIGVuZHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGxvb3BcbiAgICAgKiBAcmV0dXJuIHtTZXRMb29wUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInNldExvb3BcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0TG9vcChsb29wKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXQoJ2xvb3AnLCBsb29wKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIHNldCB0aGUgbXV0ZWQgc3RhdGUgb2YgdGhlIHBsYXllci5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIFNldE11dGVkUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtib29sZWFufSBUaGUgbXV0ZWQgc3RhdGUgdGhhdCB3YXMgc2V0LlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBtdXRlZCBzdGF0ZSBvZiB0aGUgcGxheWVyLiBXaGVuIHNldCB0byBgdHJ1ZWAsIHRoZSBwbGF5ZXJcbiAgICAgKiB2b2x1bWUgd2lsbCBiZSBtdXRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbXV0ZWRcbiAgICAgKiBAcmV0dXJuIHtTZXRNdXRlZFByb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJzZXRNdXRlZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRNdXRlZChtdXRlZCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0KCdtdXRlZCcsIG11dGVkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIGdldCB0aGUgbXV0ZWQgc3RhdGUgb2YgdGhlIHBsYXllci5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIEdldE11dGVkUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCB0aGUgcGxheWVyIGlzIG11dGVkLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBtdXRlZCBzdGF0ZSBvZiB0aGUgcGxheWVyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7R2V0TXV0ZWRQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0TXV0ZWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0TXV0ZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ211dGVkJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBnZXQgdGhlIHBhdXNlZCBzdGF0ZSBvZiB0aGUgcGxheWVyLlxuICAgICAqXG4gICAgICogQHByb21pc2UgR2V0TG9vcFByb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIHZpZGVvIGlzIHBhdXNlZC5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcGF1c2VkIHN0YXRlIG9mIHRoZSBwbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtHZXRMb29wUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImdldFBhdXNlZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRQYXVzZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ3BhdXNlZCcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdG8gZ2V0IHRoZSBwbGF5YmFjayByYXRlIG9mIHRoZSBwbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBHZXRQbGF5YmFja1JhdGVQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge251bWJlcn0gVGhlIHBsYXliYWNrIHJhdGUgb2YgdGhlIHBsYXllciBvbiBhIHNjYWxlIGZyb20gMC41IHRvIDIuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHBsYXliYWNrIHJhdGUgb2YgdGhlIHBsYXllciBvbiBhIHNjYWxlIGZyb20gYDAuNWAgdG8gYDJgLlxuICAgICAqXG4gICAgICogQHJldHVybiB7R2V0UGxheWJhY2tSYXRlUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImdldFBsYXliYWNrUmF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRQbGF5YmFja1JhdGUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ3BsYXliYWNrUmF0ZScpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdG8gc2V0IHRoZSBwbGF5YmFja3JhdGUgb2YgdGhlIHBsYXllci5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIFNldFBsYXliYWNrUmF0ZVByb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7bnVtYmVyfSBUaGUgcGxheWJhY2sgcmF0ZSB3YXMgc2V0LlxuICAgICAqIEByZWplY3Qge1JhbmdlRXJyb3J9IFRoZSBwbGF5YmFjayByYXRlIHdhcyBsZXNzIHRoYW4gMC41IG9yIGdyZWF0ZXIgdGhhbiAyLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBwbGF5YmFjayByYXRlIG9mIHRoZSBwbGF5ZXIgb24gYSBzY2FsZSBmcm9tIGAwLjVgIHRvIGAyYC4gV2hlbiBzZXRcbiAgICAgKiB2aWEgdGhlIEFQSSwgdGhlIHBsYXliYWNrIHJhdGUgd2lsbCBub3QgYmUgc3luY2hyb25pemVkIHRvIG90aGVyXG4gICAgICogcGxheWVycyBvciBzdG9yZWQgYXMgdGhlIHZpZXdlcidzIHByZWZlcmVuY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcGxheWJhY2tSYXRlXG4gICAgICogQHJldHVybiB7U2V0UGxheWJhY2tSYXRlUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInNldFBsYXliYWNrUmF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRQbGF5YmFja1JhdGUocGxheWJhY2tSYXRlKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXQoJ3BsYXliYWNrUmF0ZScsIHBsYXliYWNrUmF0ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBnZXQgdGhlIHBsYXllZCBwcm9wZXJ0eSBvZiB0aGUgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBHZXRQbGF5ZWRQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge0FycmF5fSBQbGF5ZWQgVGltZXJhbmdlcyBjb252ZXJ0ZWQgdG8gYW4gQXJyYXkuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHBsYXllZCBwcm9wZXJ0eSBvZiB0aGUgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtHZXRQbGF5ZWRQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0UGxheWVkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFBsYXllZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldCgncGxheWVkJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBnZXQgdGhlIHF1YWxpdGllcyBhdmFpbGFibGUgb2YgdGhlIGN1cnJlbnQgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBHZXRRdWFsaXRpZXNQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge0FycmF5fSBUaGUgcXVhbGl0aWVzIG9mIHRoZSB2aWRlby5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcXVhbGl0aWVzIG9mIHRoZSBjdXJyZW50IHZpZGVvLlxuICAgICAqXG4gICAgICogQHJldHVybiB7R2V0UXVhbGl0aWVzUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImdldFF1YWxpdGllc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRRdWFsaXRpZXMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ3F1YWxpdGllcycpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdG8gZ2V0IHRoZSBjdXJyZW50IHNldCBxdWFsaXR5IG9mIHRoZSB2aWRlby5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIEdldFF1YWxpdHlQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge3N0cmluZ30gVGhlIGN1cnJlbnQgc2V0IHF1YWxpdHkuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnQgc2V0IHF1YWxpdHkgb2YgdGhlIHZpZGVvLlxuICAgICAqXG4gICAgICogQHJldHVybiB7R2V0UXVhbGl0eVByb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJnZXRRdWFsaXR5XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFF1YWxpdHkoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ3F1YWxpdHknKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIHNldCB0aGUgdmlkZW8gcXVhbGl0eS5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIFNldFF1YWxpdHlQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge251bWJlcn0gVGhlIHF1YWxpdHkgd2FzIHNldC5cbiAgICAgKiBAcmVqZWN0IHtSYW5nZUVycm9yfSBUaGUgcXVhbGl0eSBpcyBub3QgYXZhaWxhYmxlLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogU2V0IGEgdmlkZW8gcXVhbGl0eS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBxdWFsaXR5XG4gICAgICogQHJldHVybiB7U2V0UXVhbGl0eVByb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJzZXRRdWFsaXR5XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldFF1YWxpdHkocXVhbGl0eSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0KCdxdWFsaXR5JywgcXVhbGl0eSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBnZXQgdGhlIHNlZWthYmxlIHByb3BlcnR5IG9mIHRoZSB2aWRlby5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIEdldFNlZWthYmxlUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtBcnJheX0gU2Vla2FibGUgVGltZXJhbmdlcyBjb252ZXJ0ZWQgdG8gYW4gQXJyYXkuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHNlZWthYmxlIHByb3BlcnR5IG9mIHRoZSB2aWRlby5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0dldFNlZWthYmxlUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImdldFNlZWthYmxlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFNlZWthYmxlKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdzZWVrYWJsZScpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdG8gZ2V0IHRoZSBzZWVraW5nIHByb3BlcnR5IG9mIHRoZSBwbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBHZXRTZWVraW5nUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCB0aGUgcGxheWVyIGlzIGN1cnJlbnRseSBzZWVraW5nLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogR2V0IGlmIHRoZSBwbGF5ZXIgaXMgY3VycmVudGx5IHNlZWtpbmcuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtHZXRTZWVraW5nUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImdldFNlZWtpbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0U2Vla2luZygpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldCgnc2Vla2luZycpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdG8gZ2V0IHRoZSB0ZXh0IHRyYWNrcyBvZiBhIHZpZGVvLlxuICAgICAqXG4gICAgICogQHByb21pc2UgR2V0VGV4dFRyYWNrc1Byb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7VmltZW9UZXh0VHJhY2tbXX0gVGhlIHRleHQgdHJhY2tzIGFzc29jaWF0ZWQgd2l0aCB0aGUgdmlkZW8uXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBHZXQgYW4gYXJyYXkgb2YgdGhlIHRleHQgdHJhY2tzIHRoYXQgZXhpc3QgZm9yIHRoZSB2aWRlby5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0dldFRleHRUcmFja3NQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0VGV4dFRyYWNrc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRUZXh0VHJhY2tzKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KCd0ZXh0VHJhY2tzJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBnZXQgdGhlIGVtYmVkIGNvZGUgZm9yIHRoZSB2aWRlby5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIEdldFZpZGVvRW1iZWRDb2RlUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtzdHJpbmd9IFRoZSBgPGlmcmFtZT5gIGVtYmVkIGNvZGUgZm9yIHRoZSB2aWRlby5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYDxpZnJhbWU+YCBlbWJlZCBjb2RlIGZvciB0aGUgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtHZXRWaWRlb0VtYmVkQ29kZVByb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJnZXRWaWRlb0VtYmVkQ29kZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRWaWRlb0VtYmVkQ29kZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldCgndmlkZW9FbWJlZENvZGUnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIGdldCB0aGUgaWQgb2YgdGhlIHZpZGVvLlxuICAgICAqXG4gICAgICogQHByb21pc2UgR2V0VmlkZW9JZFByb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7bnVtYmVyfSBUaGUgaWQgb2YgdGhlIHZpZGVvLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBpZCBvZiB0aGUgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtHZXRWaWRlb0lkUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImdldFZpZGVvSWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VmlkZW9JZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldCgndmlkZW9JZCcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdG8gZ2V0IHRoZSB0aXRsZSBvZiB0aGUgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBHZXRWaWRlb1RpdGxlUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtudW1iZXJ9IFRoZSB0aXRsZSBvZiB0aGUgdmlkZW8uXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRpdGxlIG9mIHRoZSB2aWRlby5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0dldFZpZGVvVGl0bGVQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0VmlkZW9UaXRsZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRWaWRlb1RpdGxlKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KCd2aWRlb1RpdGxlJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBnZXQgdGhlIG5hdGl2ZSB3aWR0aCBvZiB0aGUgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBHZXRWaWRlb1dpZHRoUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtudW1iZXJ9IFRoZSBuYXRpdmUgd2lkdGggb2YgdGhlIHZpZGVvLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBuYXRpdmUgd2lkdGggb2YgdGhlIGN1cnJlbnRseeKAkHBsYXlpbmcgdmlkZW8uIFRoZSB3aWR0aCBvZlxuICAgICAqIHRoZSBoaWdoZXN04oCQcmVzb2x1dGlvbiBhdmFpbGFibGUgd2lsbCBiZSB1c2VkIGJlZm9yZSBwbGF5YmFjayBiZWdpbnMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtHZXRWaWRlb1dpZHRoUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImdldFZpZGVvV2lkdGhcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VmlkZW9XaWR0aCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldCgndmlkZW9XaWR0aCcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdG8gZ2V0IHRoZSBuYXRpdmUgaGVpZ2h0IG9mIHRoZSB2aWRlby5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIEdldFZpZGVvSGVpZ2h0UHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtudW1iZXJ9IFRoZSBuYXRpdmUgaGVpZ2h0IG9mIHRoZSB2aWRlby5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbmF0aXZlIGhlaWdodCBvZiB0aGUgY3VycmVudGx54oCQcGxheWluZyB2aWRlby4gVGhlIGhlaWdodCBvZlxuICAgICAqIHRoZSBoaWdoZXN04oCQcmVzb2x1dGlvbiBhdmFpbGFibGUgd2lsbCBiZSB1c2VkIGJlZm9yZSBwbGF5YmFjayBiZWdpbnMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtHZXRWaWRlb0hlaWdodFByb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJnZXRWaWRlb0hlaWdodFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRWaWRlb0hlaWdodCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldCgndmlkZW9IZWlnaHQnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIGdldCB0aGUgdmltZW8uY29tIHVybCBmb3IgdGhlIHZpZGVvLlxuICAgICAqXG4gICAgICogQHByb21pc2UgR2V0VmlkZW9VcmxQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge251bWJlcn0gVGhlIHZpbWVvLmNvbSB1cmwgZm9yIHRoZSB2aWRlby5cbiAgICAgKiBAcmVqZWN0IHtQcml2YWN5RXJyb3J9IFRoZSB1cmwgaXNu4oCZdCBhdmFpbGFibGUgYmVjYXVzZSBvZiB0aGUgdmlkZW/igJlzIHByaXZhY3kgc2V0dGluZy5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdmltZW8uY29tIHVybCBmb3IgdGhlIHZpZGVvLlxuICAgICAqXG4gICAgICogQHJldHVybiB7R2V0VmlkZW9VcmxQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0VmlkZW9VcmxcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VmlkZW9VcmwoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ3ZpZGVvVXJsJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBnZXQgdGhlIHZvbHVtZSBsZXZlbCBvZiB0aGUgcGxheWVyLlxuICAgICAqXG4gICAgICogQHByb21pc2UgR2V0Vm9sdW1lUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtudW1iZXJ9IFRoZSB2b2x1bWUgbGV2ZWwgb2YgdGhlIHBsYXllciBvbiBhIHNjYWxlIGZyb20gMCB0byAxLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjdXJyZW50IHZvbHVtZSBsZXZlbCBvZiB0aGUgcGxheWVyIG9uIGEgc2NhbGUgZnJvbSBgMGAgdG8gYDFgLlxuICAgICAqXG4gICAgICogTW9zdCBtb2JpbGUgZGV2aWNlcyBkbyBub3Qgc3VwcG9ydCBhbiBpbmRlcGVuZGVudCB2b2x1bWUgZnJvbSB0aGVcbiAgICAgKiBzeXN0ZW0gdm9sdW1lLiBJbiB0aG9zZSBjYXNlcywgdGhpcyBtZXRob2Qgd2lsbCBhbHdheXMgcmV0dXJuIGAxYC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0dldFZvbHVtZVByb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJnZXRWb2x1bWVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Vm9sdW1lKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KCd2b2x1bWUnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIHNldCB0aGUgdm9sdW1lIGxldmVsIG9mIHRoZSBwbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBTZXRWb2x1bWVQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge251bWJlcn0gVGhlIHZvbHVtZSB3YXMgc2V0LlxuICAgICAqIEByZWplY3Qge1JhbmdlRXJyb3J9IFRoZSB2b2x1bWUgd2FzIGxlc3MgdGhhbiAwIG9yIGdyZWF0ZXIgdGhhbiAxLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB2b2x1bWUgb2YgdGhlIHBsYXllciBvbiBhIHNjYWxlIGZyb20gYDBgIHRvIGAxYC4gV2hlbiBzZXRcbiAgICAgKiB2aWEgdGhlIEFQSSwgdGhlIHZvbHVtZSBsZXZlbCB3aWxsIG5vdCBiZSBzeW5jaHJvbml6ZWQgdG8gb3RoZXJcbiAgICAgKiBwbGF5ZXJzIG9yIHN0b3JlZCBhcyB0aGUgdmlld2Vy4oCZcyBwcmVmZXJlbmNlLlxuICAgICAqXG4gICAgICogTW9zdCBtb2JpbGUgZGV2aWNlcyBkbyBub3Qgc3VwcG9ydCBzZXR0aW5nIHRoZSB2b2x1bWUuIEFuIGVycm9yIHdpbGxcbiAgICAgKiAqbm90KiBiZSB0cmlnZ2VyZWQgaW4gdGhhdCBzaXR1YXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdm9sdW1lXG4gICAgICogQHJldHVybiB7U2V0Vm9sdW1lUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInNldFZvbHVtZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRWb2x1bWUodm9sdW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXQoJ3ZvbHVtZScsIHZvbHVtZSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFBsYXllcjtcbn0oKTsgLy8gU2V0dXAgZW1iZWQgb25seSBpZiB0aGlzIGlzIG5vdCBhIG5vZGUgZW52aXJvbm1lbnRcblxuXG5pZiAoIWlzTm9kZSkge1xuICBzY3JlZW5mdWxsID0gaW5pdGlhbGl6ZVNjcmVlbmZ1bGwoKTtcbiAgaW5pdGlhbGl6ZUVtYmVkcygpO1xuICByZXNpemVFbWJlZHMoKTtcbiAgaW5pdEFwcGVuZFZpZGVvTWV0YWRhdGEoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiaW1wb3J0IHsgZ2V0IH0gZnJvbSBcIkAvdXRpbHNcIjtcclxuaW1wb3J0IHsgb2JzZXJ2ZSB9IGZyb20gXCIuLi8uLi91dGlscy9vYnNlcnZlclwiO1xyXG5pbXBvcnQgdHlwZSB7IEhUTUw1UGxheWVyIH0gZnJvbSBcIi4vdHlwZXMvSFRNTDVcIjtcclxuaW1wb3J0IHR5cGUgeyBWaW1lb1BsYXllciB9IGZyb20gXCIuL3R5cGVzL1ZpbWVvXCI7XHJcbmltcG9ydCB0eXBlIHsgWXRQbGF5ZXIgfSBmcm9tIFwiLi90eXBlcy9Zb3VUdWJlXCI7XHJcblxyXG50eXBlIFZpZGVvUGxheWVyID0gVmltZW9QbGF5ZXIgfCBZdFBsYXllciB8IEhUTUw1UGxheWVyO1xyXG5cclxudHlwZSBUYXNrID0gXCJwbGF5XCIgfCBcInBhdXNlXCI7XHJcblxyXG4vKipcclxuICogVGhpcyBpcyB2aWRlbyBiYXNlIGNsYXNzLlxyXG4gKi9cclxuYWJzdHJhY3QgY2xhc3MgVmlkZW8ge1xyXG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgICBjb250YWluZXI6IEhUTUxFbGVtZW50O1xyXG4gICAgaWQ6IHN0cmluZztcclxuICAgIHNldHRpbmdzOiBzdHJpbmc7XHJcbiAgICBjYW5BdXRvcGxheTogYm9vbGVhbjtcclxuICAgIGNhbkhhdmVTb3VuZDogYm9vbGVhbjtcclxuICAgIGlzTXV0ZWQ6IGJvb2xlYW47XHJcbiAgICBpc1BsYXlpbmc6IGJvb2xlYW47XHJcbiAgICBpc1JlYWR5OiBib29sZWFuO1xyXG4gICAgcGxheVRyaWdnZXI6IEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgcXVldWU6IFNldDxUYXNrPjtcclxuICAgIGFic3RyYWN0IHBsYXllcjogVmlkZW9QbGF5ZXI7XHJcbiAgICBwbGF5UHJvbWlzZT86IFByb21pc2U8YW55PjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNldHRpbmdzXCIpO1xyXG5cclxuICAgICAgICB0aGlzLmNhbkF1dG9wbGF5ID0gdGhpcy5zZXR0aW5ncy5pbmNsdWRlcyhcImF1dG9wbGF5XCIpO1xyXG4gICAgICAgIHRoaXMuY2FuSGF2ZVNvdW5kID0gIShcclxuICAgICAgICAgICAgKC9pUGFkfGlQaG9uZXxpUG9kLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpIHx8XHJcbiAgICAgICAgICAgICAgICAobmF2aWdhdG9yLnBsYXRmb3JtID09PSBcIk1hY0ludGVsXCIgJiYgbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMSkpICYmXHJcbiAgICAgICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcclxuICAgICAgICAgICAgIXdpbmRvdy5NU1N0cmVhbVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBnZXQoXCIuanMtdmlkZW8tY29udGFpbmVyXCIsIGVsZW1lbnQpITtcclxuICAgICAgICB0aGlzLmlkID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpIHx8IFwiXCI7XHJcbiAgICAgICAgdGhpcy5pc011dGVkID0gdGhpcy5zZXR0aW5ncy5pbmNsdWRlcyhcIm11dGVkXCIpO1xyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1JlYWR5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wbGF5VHJpZ2dlciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy12aWRlby10cmlnZ2VyXCIpO1xyXG4gICAgICAgIHRoaXMucXVldWUgPSBuZXcgU2V0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgdGhpcy5fYmluZFRyaWdnZXIoKTtcclxuICAgICAgICB0aGlzLl9vYnNlcnZlRWxlbWVudCgpO1xyXG4gICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJ2aWRlb2xvYWRlZFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWJzdHJhY3QgY3JlYXRlUGxheWVyKCk6IHZvaWQ7XHJcbiAgICBhYnN0cmFjdCBwbGF5VmlkZW8oKTogdm9pZDtcclxuICAgIGFic3RyYWN0IHBhdXNlVmlkZW8oKTogdm9pZDtcclxuXHJcbiAgICBwbGF5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUGxheWluZykgcmV0dXJuO1xyXG4gICAgICAgIGlmICghdGhpcy5pc1JlYWR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3F1ZXVlVGFzayhcInBsYXlcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucGxheVByb21pc2UgPSBQcm9taXNlLnJlc29sdmUodGhpcy5wbGF5VmlkZW8oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgcGF1c2UoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUGxheWluZykgcmV0dXJuO1xyXG4gICAgICAgIGlmICghdGhpcy5pc1JlYWR5IHx8IHR5cGVvZiB0aGlzLnBsYXlQcm9taXNlID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3F1ZXVlVGFzayhcInBhdXNlXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhd2FpdCB0aGlzLnBsYXlQcm9taXNlO1xyXG4gICAgICAgIHRoaXMucGF1c2VWaWRlbygpO1xyXG4gICAgICAgIHRoaXMub25TdG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmRlZCgpIHtcclxuICAgICAgICB0aGlzLm9uU3RvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUGxheSgpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1zdGF0dXNcIiwgXCJsb2FkZWQgcGxheWluZ1wiKTtcclxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgb25TdG9wKCkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXN0YXR1c1wiLCBcImxvYWRlZCBwYXVzZWRcIik7XHJcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB3YXRjaFJlc2l6ZSh2aWRlb1dpZHRoOiBudW1iZXIsIHZpZGVvSGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBhc3BlY3RSYXRpbyA9IHZpZGVvSGVpZ2h0IC8gdmlkZW9XaWR0aDtcclxuXHJcbiAgICAgICAgY29uc3QgdXBkYXRlU2l6ZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyV2lkdGggPSB0aGlzLmVsZW1lbnQuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyIS5zdHlsZS53aWR0aCA9IGAke2NvbnRhaW5lcldpZHRofXB4YDtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIhLnN0eWxlLmhlaWdodCA9IGAke2NvbnRhaW5lcldpZHRoICogYXNwZWN0UmF0aW99cHhgO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHVwZGF0ZVNpemUoKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJ2aWRlb3NpemVcIikpO1xyXG4gICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcInJlc2l6ZVwiKSk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4gdXBkYXRlU2l6ZSgpKTtcclxuXHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuZWxlbWVudCEuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBmbHVzaFF1ZXVlKCkge1xyXG4gICAgICAgIHRoaXMucXVldWUuZm9yRWFjaCgoY29tbWFuZCkgPT4gdGhpc1tjb21tYW5kXSgpKTtcclxuICAgICAgICB0aGlzLnF1ZXVlLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfcXVldWVUYXNrKGNvbW1hbmQ6IFRhc2spIHtcclxuICAgICAgICB0aGlzLnF1ZXVlLmFkZChjb21tYW5kKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9iaW5kVHJpZ2dlcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMucGxheVRyaWdnZXIpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5wbGF5VHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzUGxheWluZyA/IHRoaXMucGF1c2UoKSA6IHRoaXMucGxheSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfb2JzZXJ2ZUVsZW1lbnQoKSB7XHJcbiAgICAgICAgb2JzZXJ2ZShcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIsXHJcbiAgICAgICAgICAgIChpblZpZXcpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpblZpZXcgJiYgdGhpcy5jYW5BdXRvcGxheSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzUmVhZHkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocmVzaG9sZDogMC4yNSxcclxuICAgICAgICAgICAgICAgIHJvb3RNYXJnaW46IFwiLTUwcHhcIixcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZpZGVvO1xyXG4iLCJpbXBvcnQgUGxheWVyIGZyb20gXCJAdmltZW8vcGxheWVyXCI7XHJcbmltcG9ydCB7IGFkZFByZWZldGNoLCBkZXZpY2UsIHJJQyB9IGZyb20gXCJAL3V0aWxzXCI7XHJcbmltcG9ydCBWaWRlbyBmcm9tIFwiLi4vVmlkZW9cIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVmltZW9QbGF5ZXIgZXh0ZW5kcyBQbGF5ZXIge1xyXG4gICAgZWxlbWVudD86IEhUTUxJRnJhbWVFbGVtZW50O1xyXG59XHJcblxyXG5jbGFzcyBWaW1lb1ZpZGVvIGV4dGVuZHMgVmlkZW8ge1xyXG4gICAgZmlyc3RCdWZmZXIgPSB0cnVlO1xyXG4gICAgcGxheWVyOiBWaW1lb1BsYXllcjtcclxuICAgIHN0YXRpYyBwcmVjb25uZWN0ZWQ/OiBib29sZWFuO1xyXG5cclxuICAgIHN0YXRpYyBfd2FybUNvbm5lY3Rpb25zKCkge1xyXG4gICAgICAgIGlmIChWaW1lb1ZpZGVvLnByZWNvbm5lY3RlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBUaGUgaWZyYW1lIGRvY3VtZW50IGFuZCBtb3N0IG9mIGl0cyBzdWJyZXNvdXJjZXMgY29tZSByaWdodCBvZmYgcGxheWVyLnZpbWVvLmNvbVxyXG4gICAgICAgIGFkZFByZWZldGNoKFwicHJlY29ubmVjdFwiLCBcImh0dHBzOi8vcGxheWVyLnZpbWVvLmNvbVwiKTtcclxuICAgICAgICAvLyBJbWFnZXNcclxuICAgICAgICBhZGRQcmVmZXRjaChcInByZWNvbm5lY3RcIiwgXCJodHRwczovL2kudmltZW9jZG4uY29tXCIpO1xyXG4gICAgICAgIC8vIEZpbGVzIC5qcywgLmNzc1xyXG4gICAgICAgIGFkZFByZWZldGNoKFwicHJlY29ubmVjdFwiLCBcImh0dHBzOi8vZi52aW1lb2Nkbi5jb21cIik7XHJcbiAgICAgICAgLy8gTWV0cmljc1xyXG4gICAgICAgIGFkZFByZWZldGNoKFwicHJlY29ubmVjdFwiLCBcImh0dHBzOi8vZnJlc25lbC52aW1lb2Nkbi5jb21cIik7XHJcblxyXG4gICAgICAgIFZpbWVvVmlkZW8ucHJlY29ubmVjdGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVQbGF5ZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGxheWVyKSByZXR1cm47XHJcbiAgICAgICAgVmltZW9WaWRlby5fd2FybUNvbm5lY3Rpb25zKCk7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHByaXZhdGUgdmlkZW8gaGFzIHR3byBwYXJ0IGlkXHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jb250YWluZXIuZ2V0QXR0cmlidXRlKFwiZGF0YS11cmxcIikgfHwgdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICBjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKHRoaXMuY29udGFpbmVyLCB7XHJcbiAgICAgICAgICAgIC8vIGJhY2tncm91bmQ6IHRoaXMuYXV0b3BsYXksXHJcbiAgICAgICAgICAgIC8vIGF1dG9wbGF5OiB0aGlzLmF1dG9wbGF5LFxyXG4gICAgICAgICAgICBieWxpbmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb2xvcjogXCJmZmZmZmZcIixcclxuICAgICAgICAgICAgaWQ6ICt0aGlzLmlkLFxyXG4gICAgICAgICAgICB1cmwsXHJcbiAgICAgICAgICAgIGxvb3A6IHRydWUsXHJcbiAgICAgICAgICAgIG11dGVkOiB0cnVlLFxyXG4gICAgICAgICAgICBwb3J0cmFpdDogZmFsc2UsXHJcbiAgICAgICAgICAgIHRpdGxlOiBmYWxzZSxcclxuICAgICAgICAgICAgY29udHJvbHM6IGZhbHNlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBwbGF5ZXIub24oXCJlbmRlZFwiLCAoKSA9PiB0aGlzLm9uRW5kZWQoKSk7XHJcbiAgICAgICAgcGxheWVyLm9uKFwibG9hZGVkXCIsICgpID0+IHRoaXMuX29uUmVhZHkocGxheWVyKSk7XHJcbiAgICAgICAgcGxheWVyLm9uKFwicGF1c2VcIiwgKCkgPT4gdGhpcy5wYXVzZSgpKTtcclxuICAgICAgICBwbGF5ZXIub24oXCJwbGF5XCIsICgpID0+IHRoaXMub25QbGF5KCkpO1xyXG4gICAgICAgIGlmIChkZXZpY2UuaXNJT1MpXHJcbiAgICAgICAgICAgIHBsYXllci5vbihcImJ1ZmZlcmVuZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maXJzdEJ1ZmZlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RCdWZmZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUGxheSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwbGF5VmlkZW8oKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIucGxheSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhdXNlVmlkZW8oKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIucGF1c2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIF9vblJlYWR5KHBsYXllcjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcblxyXG4gICAgICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XHJcblxyXG4gICAgICAgIGNvbnN0IFt3aWR0aCwgaGVpZ2h0XSA9IGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgICAgICAgcGxheWVyLmdldFZpZGVvV2lkdGgoKSxcclxuICAgICAgICAgICAgcGxheWVyLmdldFZpZGVvSGVpZ2h0KCksXHJcbiAgICAgICAgXSk7XHJcbiAgICAgICAgdGhpcy53YXRjaFJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgcklDKCgpID0+IHRoaXMuZmx1c2hRdWV1ZSgpKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVmltZW9WaWRlbztcclxuIiwiLyoqXHJcbiAqIEFkZCBhIDxsaW5rIHJlbD17cHJlbG9hZCB8IHByZWNvbm5lY3R9IC4uLj4gdG8gdGhlIGhlYWRcclxuICovXHJcblxyXG5pbXBvcnQgeyByZW5kZXJFbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFByZWZldGNoKGtpbmQ6IHN0cmluZywgdXJsOiBzdHJpbmcsIGFzPzogc3RyaW5nKSB7XHJcbiAgICByZW5kZXJFbGVtZW50KFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogXCJsaW5rXCIsXHJcbiAgICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgICAgICByZWw6IGtpbmQsXHJcbiAgICAgICAgICAgICAgICBocmVmOiB1cmwsXHJcbiAgICAgICAgICAgICAgICAuLi4oYXMgJiYgeyBhcyB9KSxcclxuICAgICAgICAgICAgICAgIGNyb3NzT3JpZ2luOiBcImFub255bW91c1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZG9jdW1lbnQuaGVhZFxyXG4gICAgKTtcclxufVxyXG4iLCIvKipcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gKiBAcGFyYW0ge0tleWZyYW1lW10gfCBQcm9wZXJ0eUluZGV4ZWRLZXlmcmFtZXN9IHRvXHJcbiAqIEBwYXJhbSB7S2V5ZnJhbWVBbmltYXRpb25PcHRpb25zfSBvcHRpb25zXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYW5pbWF0ZVRvKFxyXG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQsXHJcbiAgICBrZXlmcmFtZXM6IEtleWZyYW1lW10gfCBQcm9wZXJ0eUluZGV4ZWRLZXlmcmFtZXMsXHJcbiAgICBvcHRpb25zOiBLZXlmcmFtZUFuaW1hdGlvbk9wdGlvbnNcclxuKSB7XHJcbiAgICBjb25zdCBhbmltID0gZWxlbWVudC5hbmltYXRlKGtleWZyYW1lcywgeyAuLi5vcHRpb25zLCBmaWxsOiBcImJvdGhcIiB9KTtcclxuICAgIGFuaW0uYWRkRXZlbnRMaXN0ZW5lcihcImZpbmlzaFwiLCAoKSA9PiB7XHJcbiAgICAgICAgYW5pbS5jb21taXRTdHlsZXMoKTtcclxuICAgICAgICBhbmltLmNhbmNlbCgpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gYW5pbTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICogQHBhcmFtIHtQcm9wZXJ0eUluZGV4ZWRLZXlmcmFtZXN9IGZyb21cclxuICogQHBhcmFtIHtLZXlmcmFtZUFuaW1hdGlvbk9wdGlvbnN9IG9wdGlvbnNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhbmltYXRlRnJvbShcclxuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50LFxyXG4gICAgZnJvbTogUHJvcGVydHlJbmRleGVkS2V5ZnJhbWVzLFxyXG4gICAgb3B0aW9uczogS2V5ZnJhbWVBbmltYXRpb25PcHRpb25zXHJcbikge1xyXG4gICAgcmV0dXJuIGVsZW1lbnQuYW5pbWF0ZSh7IC4uLmZyb20sIG9mZnNldDogMCB9LCB7IC4uLm9wdGlvbnMsIGZpbGw6IFwiYmFja3dhcmRzXCIgfSk7XHJcbn1cclxuIiwiLypcclxuVXNhZ2U6XHJcbmltcG9ydCB7IGFuaW1hdGlvbkludGVydmFsIH0gZnJvbSAnLi8xLmpzJztcclxuXHJcbmNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XHJcblxyXG4vLyBDcmVhdGUgYW4gYW5pbWF0aW9uIGNhbGxiYWNrIGV2ZXJ5IHNlY29uZDpcclxuYW5pbWF0aW9uSW50ZXJ2YWwoMTAwMCwgY29udHJvbGxlci5zaWduYWwsIHRpbWUgPT4ge1xyXG4gIGNvbnNvbGUubG9nKCd0aWNrIScsIHRpbWUpO1xyXG59KTtcclxuXHJcbi8vIEFuZCB0byBzdG9wIGl0OlxyXG5jb250cm9sbGVyLmFib3J0KCk7XHJcbiovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYW5pbWF0aW9uSW50ZXJ2YWwoXHJcbiAgICBtczogbnVtYmVyLFxyXG4gICAgc2lnbmFsOiBBYm9ydFNpZ25hbCB8IG51bGwsXHJcbiAgICBjYWxsYmFjazogKHRpbWU6IG51bWJlcikgPT4gdm9pZFxyXG4pIHtcclxuICAgIGNvbnN0IHN0YXJ0ID0gZG9jdW1lbnQudGltZWxpbmUuY3VycmVudFRpbWU7XHJcblxyXG4gICAgZnVuY3Rpb24gZnJhbWUodGltZSkge1xyXG4gICAgICAgIGlmIChzaWduYWwgJiYgc2lnbmFsLmFib3J0ZWQpIHJldHVybjtcclxuICAgICAgICBjYWxsYmFjayh0aW1lKTtcclxuICAgICAgICBzY2hlZHVsZUZyYW1lKHRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNjaGVkdWxlRnJhbWUodGltZSkge1xyXG4gICAgICAgIGNvbnN0IGVsYXBzZWQgPSB0aW1lIC0gc3RhcnQ7XHJcbiAgICAgICAgY29uc3Qgcm91bmRlZEVsYXBzZWQgPSBNYXRoLnJvdW5kKGVsYXBzZWQgLyBtcykgKiBtcztcclxuICAgICAgICBjb25zdCB0YXJnZXROZXh0ID0gc3RhcnQgKyByb3VuZGVkRWxhcHNlZCArIG1zO1xyXG4gICAgICAgIGNvbnN0IGRlbGF5ID0gdGFyZ2V0TmV4dCAtIHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZyYW1lKSwgZGVsYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNjaGVkdWxlRnJhbWUoc3RhcnQpO1xyXG59XHJcbiIsImNvbnN0IGVsSHRtbCA9IGRvY3VtZW50LmJvZHk7XHJcblxyXG5sZXQgcHJldmlvdXNIdG1sU3R5bGVzID0ge307XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9jaygpIHtcclxuICAgIGNvbnN0IHsgc3R5bGU6IGh0bWxTdHlsZSB9ID0gZWxIdG1sO1xyXG5cclxuICAgIHByZXZpb3VzSHRtbFN0eWxlcyA9IHtcclxuICAgICAgICBvdmVyZmxvd1k6IGh0bWxTdHlsZS5vdmVyZmxvd1ksXHJcbiAgICAgICAgbWluSGVpZ2h0OiBodG1sU3R5bGUubWluSGVpZ2h0LFxyXG4gICAgICAgIG1heEhlaWdodDogXCJhdXRvXCIsXHJcbiAgICB9O1xyXG5cclxuICAgIE9iamVjdC5hc3NpZ24oZWxIdG1sLnN0eWxlLCB7XHJcbiAgICAgICAgb3ZlcmZsb3dZOiBcImhpZGRlblwiLFxyXG4gICAgICAgIG1pbkhlaWdodDogXCIxMDB2aFwiLFxyXG4gICAgICAgIG1heEhlaWdodDogXCIxMDB2aFwiLFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZWxlYXNlKCkge1xyXG4gICAgT2JqZWN0LmFzc2lnbihlbEh0bWwuc3R5bGUsIHByZXZpb3VzSHRtbFN0eWxlcyk7XHJcbn1cclxuIiwiZXhwb3J0IHt9O1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0Q29va2llKGNuYW1lLCBjdmFsdWUsIGV4ZGF5cykge1xyXG4gICAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgZC5zZXRUaW1lKGQuZ2V0VGltZSgpICsgZXhkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCk7XHJcbiAgICB2YXIgZXhwaXJlcyA9IFwiZXhwaXJlcz1cIiArIGQudG9VVENTdHJpbmcoKTtcclxuICAgIGRvY3VtZW50LmNvb2tpZSA9IGNuYW1lICsgXCI9XCIgKyBjdmFsdWUgKyBcIjtcIiArIGV4cGlyZXMgKyBcIjtwYXRoPS9cIjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENvb2tpZShjbmFtZSkge1xyXG4gICAgdmFyIG5hbWUgPSBjbmFtZSArIFwiPVwiO1xyXG4gICAgdmFyIGNhID0gZG9jdW1lbnQuY29va2llLnNwbGl0KFwiO1wiKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2EubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgYyA9IGNhW2ldO1xyXG4gICAgICAgIHdoaWxlIChjLmNoYXJBdCgwKSA9PT0gXCIgXCIpIHtcclxuICAgICAgICAgICAgYyA9IGMuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYy5pbmRleE9mKG5hbWUpID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjLnN1YnN0cmluZyhuYW1lLmxlbmd0aCwgYy5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBcIlwiO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tDb29raWUoKSB7XHJcbiAgICB2YXIgdXNlciA9IGdldENvb2tpZShcInVzZXJuYW1lXCIpO1xyXG4gICAgaWYgKHVzZXIgIT09IFwiXCIpIHtcclxuICAgICAgICBhbGVydChcIldlbGNvbWUgYWdhaW4gXCIgKyB1c2VyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdXNlciA9IHByb21wdChcIlBsZWFzZSBlbnRlciB5b3VyIG5hbWU6XCIsIFwiXCIpO1xyXG4gICAgICAgIGlmICh1c2VyICE9IFwiXCIgJiYgdXNlciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHNldENvb2tpZShcInVzZXJuYW1lXCIsIHVzZXIsIDM2NSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBjb25zdCBkZWJvdW5jZSA9IChmbiwgbXMgPSAwKSA9PiB7XHJcbiAgICBsZXQgdGltZW91dElkO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XHJcbiAgICAgICAgdGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiBmbi5hcHBseSh0aGlzLCBhcmdzKSwgbXMpO1xyXG4gICAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWJvdW5jZVByb21pc2UgPSAoZm4sIG1zID0gMCkgPT4ge1xyXG4gICAgbGV0IHRpbWVvdXRJZDtcclxuICAgIGNvbnN0IHBlbmRpbmcgPSBbXTtcclxuICAgIHJldHVybiAoLi4uYXJncykgPT5cclxuICAgICAgICBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XHJcbiAgICAgICAgICAgIHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFBlbmRpbmcgPSBbLi4ucGVuZGluZ107XHJcbiAgICAgICAgICAgICAgICBwZW5kaW5nLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoZm4uYXBwbHkodGhpcywgYXJncykpLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFBlbmRpbmcuZm9yRWFjaCgoeyByZXNvbHZlIH0pID0+IHJlc29sdmUoZGF0YSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQZW5kaW5nLmZvckVhY2goKHsgcmVqZWN0IH0pID0+IHJlamVjdChlcnJvcikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0sIG1zKTtcclxuICAgICAgICAgICAgcGVuZGluZy5wdXNoKHsgcmVzb2x2ZTogcmVzLCByZWplY3Q6IHJlaiB9KTtcclxuICAgICAgICB9KTtcclxufTtcclxuIiwiZXhwb3J0IGNvbnN0IGlzSU9TID1cclxuICAgICgvaVBhZHxpUGhvbmV8aVBvZC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSB8fFxyXG4gICAgICAgIChuYXZpZ2F0b3IucGxhdGZvcm0gPT09IFwiTWFjSW50ZWxcIiAmJiBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAxKSkgJiZcclxuICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcclxuICAgICF3aW5kb3cuTVNTdHJlYW07XHJcblxyXG5leHBvcnQgY29uc3QgY2FuSG92ZXIgPSBtYXRjaE1lZGlhKFwiKGhvdmVyOiBob3ZlcilcIikubWF0Y2hlcztcclxuXHJcbmV4cG9ydCBjb25zdCBzY3JlZW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4iLCJleHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplRm9ybShmb3JtKSB7XHJcbiAgICBjb25zdCBvYmogPSB7fTtcclxuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xyXG4gICAgZm9yIChjb25zdCBrZXkgb2YgZm9ybURhdGEua2V5cygpKSB7XHJcbiAgICAgICAgb2JqW2tleV0gPSBmb3JtRGF0YS5nZXQoa2V5KTtcclxuICAgIH1cclxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hDb25maWcodHlwZSA9IFwianNvblwiKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgQWNjZXB0OiBgYXBwbGljYXRpb24vJHt0eXBlfWAsXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgYm9keVNjcm9sbExvY2sgZnJvbSBcIi4vYm9keS1zY3JvbGwtbG9ja1wiO1xyXG5pbXBvcnQgKiBhcyBDT05TVEFOVFMgZnJvbSBcIi4vY29uc3RhbnRzXCI7XHJcbmltcG9ydCAqIGFzIGRldmljZSBmcm9tIFwiLi9kZXZpY2VcIjtcclxuaW1wb3J0ICogYXMgb2JzZXJ2ZXIgZnJvbSBcIi4vb2JzZXJ2ZXJcIjtcclxuaW1wb3J0ICogYXMgc3RyaW5nVXRpbHMgZnJvbSBcIi4vc3RyaW5nXCI7XHJcbmltcG9ydCAqIGFzIHNob3BpZnlVdGlscyBmcm9tIFwiLi9zaG9waWZ5XCI7XHJcblxyXG5leHBvcnQgeyBhZGRQcmVmZXRjaCB9IGZyb20gXCIuL2FkZC1wcmVmZXRjaFwiO1xyXG5leHBvcnQgeyBhdHRhY2hFdmVudCB9IGZyb20gXCIuL2F0dGFjaC1ldmVudFwiO1xyXG5leHBvcnQgeyBnZXQsIGdldEFsbCwgZ2V0U2libGluZ3MsIHJlbmRlckVsZW1lbnQgfSBmcm9tIFwiLi9lbGVtZW50XCI7XHJcbmV4cG9ydCB7IG5vb3AgfSBmcm9tIFwiLi9ub29wXCI7XHJcbmV4cG9ydCB7IGRlYm91bmNlLCBkZWJvdW5jZVByb21pc2UgfSBmcm9tIFwiLi9kZWJvdW5jZVwiO1xyXG5leHBvcnQgeyB0aHJvdHRsZSB9IGZyb20gXCIuL3Rocm90dGxlXCI7XHJcbmV4cG9ydCB7IGFuaW1hdGVGcm9tLCBhbmltYXRlVG8gfSBmcm9tIFwiLi9hbmltYXRlXCI7XHJcbmV4cG9ydCB7IGFuaW1hdGlvbkludGVydmFsIH0gZnJvbSBcIi4vYW5pbWF0aW9uLWludGVydmFsXCI7XHJcbmV4cG9ydCB7IGJvZHlTY3JvbGxMb2NrLCBDT05TVEFOVFMsIGRldmljZSwgb2JzZXJ2ZXIsIHN0cmluZ1V0aWxzLCBzaG9waWZ5VXRpbHMgfTtcclxuZXhwb3J0IHsgc2VyaWFsaXplRm9ybSwgZmV0Y2hDb25maWcgfSBmcm9tIFwiLi9mZXRjaFwiO1xyXG5leHBvcnQgeyBzbW9vdGhTY3JvbGwgfSBmcm9tIFwiLi9zbW9vdGgtc2Nyb2xsXCI7XHJcbmV4cG9ydCB7IHNldENvb2tpZSwgZ2V0Q29va2llLCBjaGVja0Nvb2tpZSB9IGZyb20gXCIuL2Nvb2tpZXNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBlbGVtZW50SXNWaXNpYmxlSW5WaWV3cG9ydCA9IChlbDogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgIGNvbnN0IHsgdG9wLCBsZWZ0LCBib3R0b20sIHJpZ2h0IH0gPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGNvbnN0IHsgaW5uZXJIZWlnaHQsIGlubmVyV2lkdGggfSA9IHdpbmRvdztcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgKCh0b3AgPiAwICYmIHRvcCA8IGlubmVySGVpZ2h0KSB8fCAoYm90dG9tID4gMCAmJiBib3R0b20gPCBpbm5lckhlaWdodCkpICYmXHJcbiAgICAgICAgKChsZWZ0ID4gMCAmJiBsZWZ0IDwgaW5uZXJXaWR0aCkgfHwgKHJpZ2h0ID4gMCAmJiByaWdodCA8IGlubmVyV2lkdGgpKVxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBySUMgPSBcInJlcXVlc3RJZGxlQ2FsbGJhY2tcIiBpbiB3aW5kb3cgPyByZXF1ZXN0SWRsZUNhbGxiYWNrIDogc2V0VGltZW91dDtcclxuIiwiZXhwb3J0IGNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcclxuIiwidHlwZSBPYnNlcnZlckluc3RhbmNlQ2FsbGJhY2sgPSAoaW5WaWV3OiBib29sZWFuLCBpbnRlcnNlY3Rpb246IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnkpID0+IHZvaWQ7XHJcblxyXG50eXBlIE9ic2VydmVySW5zdGFuY2UgPSB7XHJcbiAgICBpblZpZXc6IGJvb2xlYW47XHJcbiAgICByZWFkb25seSBjYWxsYmFjazogT2JzZXJ2ZXJJbnN0YW5jZUNhbGxiYWNrO1xyXG4gICAgcmVhZG9ubHkgZWxlbWVudDogRWxlbWVudDtcclxuICAgIHJlYWRvbmx5IG9ic2VydmVySWQ6IHN0cmluZztcclxuICAgIHJlYWRvbmx5IG9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlcjtcclxuICAgIHJlYWRvbmx5IHRocmVzaG9sZHM6IFJlYWRvbmx5QXJyYXk8bnVtYmVyPjtcclxufTtcclxuXHJcbmNvbnN0IElOU1RBTkNFX01BUDogTWFwPEVsZW1lbnQsIE9ic2VydmVySW5zdGFuY2U+ID0gbmV3IE1hcCgpO1xyXG5jb25zdCBPQlNFUlZFUl9NQVA6IE1hcDxzdHJpbmcsIEludGVyc2VjdGlvbk9ic2VydmVyPiA9IG5ldyBNYXAoKTtcclxuY29uc3QgUk9PVF9JRFM6IE1hcDxFbGVtZW50LCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xyXG5cclxubGV0IGNvbnNlY3V0aXZlUm9vdElkID0gMDtcclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZSBhIHVuaXF1ZSBJRCBmb3IgdGhlIHJvb3QgZWxlbWVudFxyXG4gKiBAcGFyYW0gcm9vdFxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Um9vdElkKHJvb3Q/OiBFbGVtZW50IHwgbnVsbCkge1xyXG4gICAgaWYgKCFyb290KSByZXR1cm4gXCJcIjtcclxuICAgIGlmIChST09UX0lEUy5oYXMocm9vdCkpIHJldHVybiBST09UX0lEUy5nZXQocm9vdCk7XHJcbiAgICBjb25zZWN1dGl2ZVJvb3RJZCArPSAxO1xyXG4gICAgUk9PVF9JRFMuc2V0KHJvb3QsIGNvbnNlY3V0aXZlUm9vdElkLnRvU3RyaW5nKCkpO1xyXG4gICAgcmV0dXJuIGAke1JPT1RfSURTLmdldChyb290KX1fYDtcclxufVxyXG5cclxuLyoqXHJcbiAqIE1vbml0b3IgZWxlbWVudCwgYW5kIHRyaWdnZXIgY2FsbGJhY2sgd2hlbiBlbGVtZW50IGJlY29tZXMgaW5WaWV3XHJcbiAqIEBwYXJhbSBlbGVtZW50IHtIVE1MRWxlbWVudH1cclxuICogQHBhcmFtIGNhbGxiYWNrIHtGdW5jdGlvbn0gQ2FsbGVkIHdpdGggaW5WaWV3XHJcbiAqIEBwYXJhbSBvcHRpb25zIHtPYmplY3R9IEludGVyU2VjdGlvbiBvYnNlcnZlciBvcHRpb25zXHJcbiAqIEBwYXJhbSBvcHRpb25zLnRocmVzaG9sZCB7TnVtYmVyfSBOdW1iZXIgYmV0d2VlbiAwIGFuZCAxLCBpbmRpY2F0aW5nIGhvdyBtdWNoIG9mIHRoZSBlbGVtZW50IHNob3VsZCBiZSBpblZpZXcgYmVmb3JlIHRyaWdnZXJpbmdcclxuICogQHBhcmFtIG9wdGlvbnMucm9vdCB7SFRNTEVsZW1lbnR9XHJcbiAqIEBwYXJhbSBvcHRpb25zLnJvb3RNYXJnaW4ge1N0cmluZ30gVGhlIENTUyBtYXJnaW4gdG8gYXBwbHkgdG8gdGhlIHJvb3QgZWxlbWVudC5cclxuICpcclxuICogQHJldHVybnMge09ic2VydmVySW5zdGFuY2UgfCB1bmRlZmluZWR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gb2JzZXJ2ZShcclxuICAgIGVsZW1lbnQ6IEVsZW1lbnQsXHJcbiAgICBjYWxsYmFjazogT2JzZXJ2ZXJJbnN0YW5jZUNhbGxiYWNrLFxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXHJcbiAgICBvcHRpb25zOiBJbnRlcnNlY3Rpb25PYnNlcnZlckluaXQgPSB7fVxyXG4pIHtcclxuICAgIC8vIEludGVyc2VjdGlvbk9ic2VydmVyIG5lZWRzIGEgdGhyZXNob2xkIHRvIHRyaWdnZXIsIHNvIHNldCBpdCB0byAwIGlmIGl0J3Mgbm90IGRlZmluZWQuXHJcbiAgICAvLyBNb2RpZnkgdGhlIG9wdGlvbnMgb2JqZWN0LCBzaW5jZSBpdCdzIHVzZWQgaW4gdGhlIG9uQ2hhbmdlIGhhbmRsZXIuXHJcbiAgICBjb25zdCB7IHJvb3QsIHJvb3RNYXJnaW4sIHRocmVzaG9sZCA9IDAgfSA9IG9wdGlvbnM7XHJcblxyXG4gICAgLy8gQmFpbCBlYXJseSBpZiBlbGVtZW50IGlzIHVuZGVmaW5lZFxyXG4gICAgaWYgKCFlbGVtZW50KSByZXR1cm47XHJcblxyXG4gICAgLy8gQ3JlYXRlIGEgdW5pcXVlIElEIGZvciB0aGlzIG9ic2VydmVyIGluc3RhbmNlLCBiYXNlZCBvbiB0aGUgcm9vdCwgcm9vdCBtYXJnaW4gYW5kIHRocmVzaG9sZC5cclxuICAgIC8vIEFuIG9ic2VydmVyIHdpdGggdGhlIHNhbWUgb3B0aW9ucyBjYW4gYmUgcmV1c2VkLCBzbyBsZXRzIHVzZSB0aGlzIGZhY3RcclxuICAgIGNvbnN0IG9ic2VydmVySWQ6IHN0cmluZyA9XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGdldFJvb3RJZChyb290KSArXHJcbiAgICAgICAgKHJvb3RNYXJnaW4gPyBgJHt0aHJlc2hvbGQudG9TdHJpbmcoKX1fJHtyb290TWFyZ2lufWAgOiB0aHJlc2hvbGQudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgbGV0IG9ic2VydmVySW5zdGFuY2UgPSBPQlNFUlZFUl9NQVAuZ2V0KG9ic2VydmVySWQpO1xyXG4gICAgaWYgKCFvYnNlcnZlckluc3RhbmNlKSB7XHJcbiAgICAgICAgb2JzZXJ2ZXJJbnN0YW5jZSA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihvbkNoYW5nZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgaWYgKG9ic2VydmVySWQpIE9CU0VSVkVSX01BUC5zZXQob2JzZXJ2ZXJJZCwgb2JzZXJ2ZXJJbnN0YW5jZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaW5zdGFuY2U6IE9ic2VydmVySW5zdGFuY2UgPSB7XHJcbiAgICAgICAgY2FsbGJhY2ssXHJcbiAgICAgICAgZWxlbWVudCxcclxuICAgICAgICBpblZpZXc6IGZhbHNlLFxyXG4gICAgICAgIG9ic2VydmVySWQsXHJcbiAgICAgICAgb2JzZXJ2ZXI6IG9ic2VydmVySW5zdGFuY2UsXHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGhhdmUgdGhlIHRocmVzaG9sZHMgdmFsdWUuIEl0J3MgdW5kZWZpbmVkIG9uIGEgYnJvd3NlciBsaWtlIENocm9tZSA1MS5cclxuICAgICAgICB0aHJlc2hvbGRzOlxyXG4gICAgICAgICAgICBvYnNlcnZlckluc3RhbmNlLnRocmVzaG9sZHMgfHwgKEFycmF5LmlzQXJyYXkodGhyZXNob2xkKSA/IHRocmVzaG9sZCA6IFt0aHJlc2hvbGRdKSxcclxuICAgIH07XHJcblxyXG4gICAgSU5TVEFOQ0VfTUFQLnNldChlbGVtZW50LCBpbnN0YW5jZSk7XHJcbiAgICBvYnNlcnZlckluc3RhbmNlLm9ic2VydmUoZWxlbWVudCk7XHJcblxyXG4gICAgcmV0dXJuIGluc3RhbmNlO1xyXG59XHJcblxyXG4vKipcclxuICogU3RvcCBvYnNlcnZpbmcgYW4gZWxlbWVudC4gSWYgYW4gZWxlbWVudCBpcyByZW1vdmVkIGZyb20gdGhlIERPTSBvciBvdGhlcndpc2UgZGVzdHJveWVkLFxyXG4gKiBtYWtlIHN1cmUgdG8gY2FsbCB0aGlzIG1ldGhvZC5cclxuICogQHBhcmFtIGVsZW1lbnQge0VsZW1lbnR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdW5vYnNlcnZlKGVsZW1lbnQ6IEVsZW1lbnQgfCBudWxsKSB7XHJcbiAgICBpZiAoIWVsZW1lbnQpIHJldHVybjtcclxuICAgIGNvbnN0IGluc3RhbmNlID0gSU5TVEFOQ0VfTUFQLmdldChlbGVtZW50KTtcclxuXHJcbiAgICBpZiAoaW5zdGFuY2UpIHtcclxuICAgICAgICBjb25zdCB7IG9ic2VydmVySWQsIG9ic2VydmVyIH0gPSBpbnN0YW5jZTtcclxuICAgICAgICBjb25zdCB7IHJvb3QgfSA9IG9ic2VydmVyO1xyXG5cclxuICAgICAgICBvYnNlcnZlci51bm9ic2VydmUoZWxlbWVudCk7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHdlIGFyZSBzdGlsbCBvYnNlcnZpbmcgYW55IGVsZW1lbnRzIHdpdGggdGhlIHNhbWUgdGhyZXNob2xkLlxyXG4gICAgICAgIGxldCBpdGVtc0xlZnQgPSBmYWxzZTtcclxuICAgICAgICAvLyBDaGVjayBpZiB3ZSBzdGlsbCBoYXZlIG9ic2VydmVycyBjb25maWd1cmVkIHdpdGggdGhlIHNhbWUgcm9vdC5cclxuICAgICAgICBsZXQgcm9vdE9ic2VydmVkID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKG9ic2VydmVySWQpIHtcclxuICAgICAgICAgICAgSU5TVEFOQ0VfTUFQLmZvckVhY2goKGl0ZW0sIGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleSAhPT0gZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLm9ic2VydmVySWQgPT09IG9ic2VydmVySWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNMZWZ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9vdE9ic2VydmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ub2JzZXJ2ZXIucm9vdCA9PT0gcm9vdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb290T2JzZXJ2ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBpZiAoIXJvb3RPYnNlcnZlZCAmJiByb290KSBST09UX0lEUy5kZWxldGUocm9vdCk7XHJcbiAgICAgICAgaWYgKG9ic2VydmVyICYmICFpdGVtc0xlZnQpIHtcclxuICAgICAgICAgICAgLy8gTm8gbW9yZSBlbGVtZW50cyB0byBvYnNlcnZlIGZvciB0aHJlc2hvbGQsIGRpc2Nvbm5lY3Qgb2JzZXJ2ZXJcclxuICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIHJlZmVyZW5jZSB0byBlbGVtZW50XHJcbiAgICAgICAgSU5TVEFOQ0VfTUFQLmRlbGV0ZShlbGVtZW50KTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERlc3Ryb3kgYWxsIEludGVyc2VjdGlvbk9ic2VydmVycyBjdXJyZW50bHkgY29ubmVjdGVkXHJcbiAqICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkZXN0cm95KCkge1xyXG4gICAgT0JTRVJWRVJfTUFQLmZvckVhY2goKG9ic2VydmVyKSA9PiB7XHJcbiAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgT0JTRVJWRVJfTUFQLmNsZWFyKCk7XHJcbiAgICBJTlNUQU5DRV9NQVAuY2xlYXIoKTtcclxuICAgIFJPT1RfSURTLmNsZWFyKCk7XHJcbiAgICBjb25zZWN1dGl2ZVJvb3RJZCA9IDA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uQ2hhbmdlKGNoYW5nZXM6IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnlbXSkge1xyXG4gICAgY2hhbmdlcy5mb3JFYWNoKChpbnRlcnNlY3Rpb24pID0+IHtcclxuICAgICAgICBjb25zdCB7IGlzSW50ZXJzZWN0aW5nLCBpbnRlcnNlY3Rpb25SYXRpbywgdGFyZ2V0IH0gPSBpbnRlcnNlY3Rpb247XHJcbiAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBJTlNUQU5DRV9NQVAuZ2V0KHRhcmdldCk7XHJcblxyXG4gICAgICAgIC8vIEZpcmVmb3ggY2FuIHJlcG9ydCBhIG5lZ2F0aXZlIGludGVyc2VjdGlvblJhdGlvIHdoZW4gc2Nyb2xsaW5nLlxyXG4gICAgICAgIGlmIChpbnN0YW5jZSAmJiBpbnRlcnNlY3Rpb25SYXRpbyA+PSAwKSB7XHJcbiAgICAgICAgICAgIC8vIElmIHRocmVzaG9sZCBpcyBhbiBhcnJheSwgY2hlY2sgaWYgYW55IG9mIHRoZW0gaW50ZXJzZWN0cy4gVGhpcyBqdXN0IHRyaWdnZXJzIHRoZSBvbkNoYW5nZSBldmVudCBtdWx0aXBsZSB0aW1lcy5cclxuICAgICAgICAgICAgbGV0IGluVmlldyA9IGluc3RhbmNlLnRocmVzaG9sZHMuc29tZSgodGhyZXNob2xkKSA9PlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuaW5WaWV3ID8gaW50ZXJzZWN0aW9uUmF0aW8gPiB0aHJlc2hvbGQgOiBpbnRlcnNlY3Rpb25SYXRpbyA+PSB0aHJlc2hvbGRcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc0ludGVyc2VjdGluZyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiBpc0ludGVyc2VjdGluZyBpcyBkZWZpbmVkLCBlbnN1cmUgdGhhdCB0aGUgZWxlbWVudCBpcyBhY3R1YWxseSBpbnRlcnNlY3RpbmcuXHJcbiAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UgaXQgcmVwb3J0cyBhIHRocmVzaG9sZCBvZiAwXHJcbiAgICAgICAgICAgICAgICBpblZpZXcgPSBpblZpZXcgJiYgaXNJbnRlcnNlY3Rpbmc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGluc3RhbmNlLmluVmlldyA9IGluVmlldztcclxuICAgICAgICAgICAgaW5zdGFuY2UuY2FsbGJhY2soaW5WaWV3LCBpbnRlcnNlY3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBvYnNlcnZlLFxyXG4gICAgdW5vYnNlcnZlLFxyXG4gICAgZGVzdHJveSxcclxufTtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgKi9cclxuaW1wb3J0ICogYXMgY3VycmVuY3kgZnJvbSBcIkBzaG9waWZ5L3RoZW1lLWN1cnJlbmN5XCI7XHJcblxyXG4vLyBFVkVOVFNcclxuXHJcbmV4cG9ydCBjb25zdCBDVVJSRU5DWV9DSEFOR0VfRVZFTlQgPSBcIkNVUlJFTkNZX0NIQU5HRURcIjtcclxuXHJcbi8vIEZPUk1BVCBNT05FWVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdE1vbmV5KHsgbW9uZXksIGZvcm1hdCB9OiB7IG1vbmV5OiBudW1iZXI7IGZvcm1hdD86IHN0cmluZyB9KSB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdy5BQ1NDdXJyZW5jeT8uZm9ybWF0TW9uZXkgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIGNvbnN0IHJlZiA9IHdpbmRvdy5BQ1NDdXJyZW5jeTtcclxuICAgICAgICBjb25zdCBjb252ZXJ0ZWRNb25leSA9IHJlZi5jb252ZXJ0KG1vbmV5LCBcIkdCUFwiLCByZWYuY3VycmVudEN1cnJlbmN5KTtcclxuICAgICAgICByZXR1cm4gcmVmLmZvcm1hdE1vbmV5KFxyXG4gICAgICAgICAgICBOdW1iZXIuaXNOYU4oY29udmVydGVkTW9uZXkpID8gbW9uZXkgOiBjb252ZXJ0ZWRNb25leSxcclxuICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxyXG4gICAgICAgICAgICBmb3JtYXQgfHwgcmVmLm1vbmV5Rm9ybWF0c1tyZWYuY3VycmVudEN1cnJlbmN5XT8ubW9uZXlfZm9ybWF0IHx8IHdpbmRvdy5zaG9wTW9uZXlGb3JtYXRcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcclxuICAgIHJldHVybiBjdXJyZW5jeS5mb3JtYXRNb25leShtb25leSwgZm9ybWF0IHx8IHdpbmRvdy5zaG9wTW9uZXlGb3JtYXQpO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2xlYXJDYXJ0KCkge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiL2NhcnQvY2xlYXIuanNcIiwgeyBtZXRob2Q6IFwiUE9TVFwiIH0pO1xyXG59XHJcblxyXG4vLyBBREQgVE8gQ0FSVFxyXG50eXBlIEFkZFRvQ2FydERhdGEgPSB7IGlkOiBudW1iZXI7IHF1YW50aXR5OiBudW1iZXIgfSB8IHsgbGluZTogbnVtYmVyOyBxdWFudGl0eTogbnVtYmVyIH07XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkVG9DYXJ0KGRhdGE6IEFkZFRvQ2FydERhdGFbXSkge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiL2NhcnQvYWRkLmpzXCIsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGl0ZW1zOiBkYXRhIH0pLFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vICBVUERBVEUgQ0FSVFxyXG50eXBlIFVwZGF0ZUNhcnREYXRhID0gUmVjb3JkPHN0cmluZywgbnVtYmVyPjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVDYXJ0KGRhdGE6IFVwZGF0ZUNhcnREYXRhKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCIvY2FydC91cGRhdGUuanNcIiwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdXBkYXRlczogZGF0YSB9KSxcclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyBDSEFOR0UgQ0FSVCBJVEVNXHJcblxyXG50eXBlIENoYW5nZUNhcnRJdGVtID0gUmVjb3JkPHN0cmluZywgbnVtYmVyPjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGFuZ2VDYXJ0SXRlbShkYXRhOiBDaGFuZ2VDYXJ0SXRlbSkge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiL2NhcnQvY2hhbmdlLmpzXCIsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyBHRVQgUFJPRFVDVFNcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUHJvZHVjdEluZm8ge1xyXG4gICAgYXZhaWxhYmxlOiBib29sZWFuO1xyXG4gICAgcHJpY2U6IG51bWJlcjtcclxuICAgIHZhcmlhbnRzOiBSZWNvcmQ8XHJcbiAgICAgICAgbnVtYmVyLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYXZhaWxhYmxlOiBib29sZWFuO1xyXG4gICAgICAgICAgICBpbnZlbnRvcnlRdWFudGl0eTogbnVtYmVyIHwgbnVsbDtcclxuICAgICAgICB9XHJcbiAgICA+O1xyXG4gICAgY29tcGFyZUF0UHJpY2U/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQcm9kdWN0c0luZm8oaGFuZGxlczogc3RyaW5nW10pOiBQcm9taXNlPFJlY29yZDxudW1iZXIsIFByb2R1Y3RJbmZvPj4ge1xyXG4gICAgY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xyXG4gICAgY29uc3QgQVBJX1VSTCA9IG5ldyBVUkwoXCIvc2VhcmNoXCIsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xyXG4gICAgQVBJX1VSTC5zZWFyY2hQYXJhbXMuc2V0KFwic2VjdGlvbl9pZFwiLCBcImpzb24tcHJvZHVjdHNcIik7XHJcblxyXG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcclxuICAgIGNvbnN0IGhhbmRsZXNDb3B5ID0gWy4uLmhhbmRsZXNdO1xyXG4gICAgd2hpbGUgKGhhbmRsZXNDb3B5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICBjb25zdCBjaHVuayA9IGhhbmRsZXNDb3B5LnNwbGljZSgwLCAxNSk7XHJcbiAgICAgICAgQVBJX1VSTC5zZWFyY2hQYXJhbXMuc2V0KFwicVwiLCBjaHVuay5qb2luKFwiLFwiKSk7XHJcbiAgICAgICAgcHJvbWlzZXMucHVzaChcclxuICAgICAgICAgICAgKGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QVBJX1VSTH1gKS50aGVuKChyZXMpID0+IHJlcy50ZXh0KCkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgRE9NID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhyZXNwb25zZSwgXCJ0ZXh0L2h0bWxcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0c1Jlc3BvbnNlSFRNTCA9IERPTS5xdWVyeVNlbGVjdG9yKFwiI3Byb2R1Y3RzLWRhdGFcIikhO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocHJvZHVjdHNSZXNwb25zZUhUTUwuaW5uZXJIVE1MKTtcclxuICAgICAgICAgICAgfSkoKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKChyZXMpID0+XHJcbiAgICAgICAgcmVzLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiAoeyAuLi5hY2MsIC4uLmN1cnIgfSksIHt9KVxyXG4gICAgKTtcclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gc21vb3RoU2Nyb2xsKGVsbSwgZHVyLCBvZmZzZXQpIHtcclxuICAgIGNvbnN0IHBhZ2VZID0gd2luZG93LnBhZ2VZT2Zmc2V0LFxyXG4gICAgICAgIGJvZHlIZWlnaHQgPSBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCxcclxuICAgICAgICB7IGlubmVySGVpZ2h0IH0gPSB3aW5kb3csXHJcbiAgICAgICAgc3RhcnRpbmdZID0gcGFnZVkgKyBvZmZzZXQsXHJcbiAgICAgICAgZWxlbWVudFkgPSBwYWdlWSArIGVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AsXHJcbiAgICAgICAgdGFyZ2V0WSA9IGJvZHlIZWlnaHQgLSBlbGVtZW50WSA8IGlubmVySGVpZ2h0ID8gYm9keUhlaWdodCAtIGlubmVySGVpZ2h0IDogZWxlbWVudFksXHJcbiAgICAgICAgZGlmZiA9IHRhcmdldFkgLSBzdGFydGluZ1ksXHJcbiAgICAgICAgZWFzaW5nID0gKHQpID0+ICh0IDwgMC41ID8gNCAqIHQgKiB0ICogdCA6ICh0IC0gMSkgKiAoMiAqIHQgLSAyKSAqICgyICogdCAtIDIpICsgMSk7XHJcbiAgICBsZXQgc3RhcnQ7XHJcblxyXG4gICAgaWYgKCFkaWZmKSByZXR1cm47XHJcblxyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiBzdGVwKHRpbWVzdGFtcCkge1xyXG4gICAgICAgIGlmICghc3RhcnQpIHN0YXJ0ID0gdGltZXN0YW1wO1xyXG5cclxuICAgICAgICBjb25zdCB0aW1lID0gdGltZXN0YW1wIC0gc3RhcnQ7XHJcbiAgICAgICAgbGV0IHBlcmNlbnQgPSBNYXRoLm1pbih0aW1lIC8gZHVyLCAxKTtcclxuXHJcbiAgICAgICAgcGVyY2VudCA9IGVhc2luZyhwZXJjZW50KTtcclxuXHJcbiAgICAgICAgY29uc3QgZW5kID0gc3RhcnRpbmdZICsgZGlmZiAqIHBlcmNlbnQgLSBvZmZzZXQ7XHJcblxyXG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBlbmQpO1xyXG5cclxuICAgICAgICBpZiAodGltZSA8IGR1cikgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcclxuICAgIH0pO1xyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyaW5nOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiA/IE9iamVjdC5hc3NpZ24uYmluZCgpIDogZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG4gIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufSJdLCJuYW1lcyI6WyJnZXQiLCJvYnNlcnZlIiwiVmlkZW8iLCJjb25zdHJ1Y3RvciIsImVsZW1lbnQiLCJjb250YWluZXIiLCJpZCIsInNldHRpbmdzIiwiY2FuQXV0b3BsYXkiLCJjYW5IYXZlU291bmQiLCJpc011dGVkIiwiaXNQbGF5aW5nIiwiaXNSZWFkeSIsInBsYXlUcmlnZ2VyIiwicXVldWUiLCJwbGF5ZXIiLCJwbGF5UHJvbWlzZSIsImdldEF0dHJpYnV0ZSIsImluY2x1ZGVzIiwidGVzdCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInBsYXRmb3JtIiwibWF4VG91Y2hQb2ludHMiLCJ3aW5kb3ciLCJNU1N0cmVhbSIsInF1ZXJ5U2VsZWN0b3IiLCJTZXQiLCJjcmVhdGVQbGF5ZXIiLCJfYmluZFRyaWdnZXIiLCJfb2JzZXJ2ZUVsZW1lbnQiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJwbGF5IiwiX3F1ZXVlVGFzayIsIlByb21pc2UiLCJyZXNvbHZlIiwicGxheVZpZGVvIiwicGF1c2UiLCJwYXVzZVZpZGVvIiwib25TdG9wIiwib25FbmRlZCIsIm9uUGxheSIsInNldEF0dHJpYnV0ZSIsIndhdGNoUmVzaXplIiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0IiwiYXNwZWN0UmF0aW8iLCJ1cGRhdGVTaXplIiwiY29udGFpbmVyV2lkdGgiLCJjbGllbnRXaWR0aCIsInN0eWxlIiwid2lkdGgiLCJoZWlnaHQiLCJhZGRFdmVudExpc3RlbmVyIiwiZmx1c2hRdWV1ZSIsImZvckVhY2giLCJjb21tYW5kIiwiY2xlYXIiLCJhZGQiLCJpblZpZXciLCJ0aHJlc2hvbGQiLCJyb290TWFyZ2luIiwiUGxheWVyIiwiYWRkUHJlZmV0Y2giLCJkZXZpY2UiLCJySUMiLCJWaW1lb1ZpZGVvIiwiZmlyc3RCdWZmZXIiLCJfd2FybUNvbm5lY3Rpb25zIiwicHJlY29ubmVjdGVkIiwidXJsIiwidW5kZWZpbmVkIiwiYnlsaW5lIiwiY29sb3IiLCJsb29wIiwibXV0ZWQiLCJwb3J0cmFpdCIsInRpdGxlIiwiY29udHJvbHMiLCJvbiIsIl9vblJlYWR5IiwiaXNJT1MiLCJhbGwiLCJnZXRWaWRlb1dpZHRoIiwiZ2V0VmlkZW9IZWlnaHQiLCJyZW5kZXJFbGVtZW50Iiwia2luZCIsImFzIiwidHlwZSIsInByb3BzIiwicmVsIiwiaHJlZiIsImNyb3NzT3JpZ2luIiwiZG9jdW1lbnQiLCJoZWFkIiwiYW5pbWF0ZVRvIiwia2V5ZnJhbWVzIiwib3B0aW9ucyIsImFuaW0iLCJhbmltYXRlIiwiZmlsbCIsImNvbW1pdFN0eWxlcyIsImNhbmNlbCIsImFuaW1hdGVGcm9tIiwiZnJvbSIsIm9mZnNldCIsImFuaW1hdGlvbkludGVydmFsIiwibXMiLCJzaWduYWwiLCJjYWxsYmFjayIsInN0YXJ0IiwidGltZWxpbmUiLCJjdXJyZW50VGltZSIsImZyYW1lIiwidGltZSIsImFib3J0ZWQiLCJzY2hlZHVsZUZyYW1lIiwiZWxhcHNlZCIsInJvdW5kZWRFbGFwc2VkIiwiTWF0aCIsInJvdW5kIiwidGFyZ2V0TmV4dCIsImRlbGF5IiwicGVyZm9ybWFuY2UiLCJub3ciLCJzZXRUaW1lb3V0IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiZWxIdG1sIiwiYm9keSIsInByZXZpb3VzSHRtbFN0eWxlcyIsImxvY2siLCJodG1sU3R5bGUiLCJvdmVyZmxvd1kiLCJtaW5IZWlnaHQiLCJtYXhIZWlnaHQiLCJPYmplY3QiLCJhc3NpZ24iLCJyZWxlYXNlIiwic2V0Q29va2llIiwiY25hbWUiLCJjdmFsdWUiLCJleGRheXMiLCJkIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwiZXhwaXJlcyIsInRvVVRDU3RyaW5nIiwiY29va2llIiwiZ2V0Q29va2llIiwibmFtZSIsImNhIiwic3BsaXQiLCJpIiwibGVuZ3RoIiwiYyIsImNoYXJBdCIsInN1YnN0cmluZyIsImluZGV4T2YiLCJjaGVja0Nvb2tpZSIsInVzZXIiLCJhbGVydCIsInByb21wdCIsImRlYm91bmNlIiwiZm4iLCJ0aW1lb3V0SWQiLCJhcmdzIiwiY2xlYXJUaW1lb3V0IiwiYXBwbHkiLCJkZWJvdW5jZVByb21pc2UiLCJwZW5kaW5nIiwicmVzIiwicmVqIiwiY3VycmVudFBlbmRpbmciLCJ0aGVuIiwiZGF0YSIsImVycm9yIiwicmVqZWN0IiwicHVzaCIsImNhbkhvdmVyIiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJzY3JlZW5XaWR0aCIsImlubmVyV2lkdGgiLCJzZXJpYWxpemVGb3JtIiwiZm9ybSIsIm9iaiIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJrZXkiLCJrZXlzIiwiSlNPTiIsInN0cmluZ2lmeSIsImZldGNoQ29uZmlnIiwibWV0aG9kIiwiaGVhZGVycyIsIkFjY2VwdCIsImJvZHlTY3JvbGxMb2NrIiwiQ09OU1RBTlRTIiwib2JzZXJ2ZXIiLCJzdHJpbmdVdGlscyIsInNob3BpZnlVdGlscyIsImF0dGFjaEV2ZW50IiwiZ2V0QWxsIiwiZ2V0U2libGluZ3MiLCJub29wIiwidGhyb3R0bGUiLCJzbW9vdGhTY3JvbGwiLCJlbGVtZW50SXNWaXNpYmxlSW5WaWV3cG9ydCIsImVsIiwidG9wIiwibGVmdCIsImJvdHRvbSIsInJpZ2h0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiaW5uZXJIZWlnaHQiLCJyZXF1ZXN0SWRsZUNhbGxiYWNrIiwiSU5TVEFOQ0VfTUFQIiwiTWFwIiwiT0JTRVJWRVJfTUFQIiwiUk9PVF9JRFMiLCJjb25zZWN1dGl2ZVJvb3RJZCIsImdldFJvb3RJZCIsInJvb3QiLCJoYXMiLCJzZXQiLCJ0b1N0cmluZyIsIm9ic2VydmVySWQiLCJvYnNlcnZlckluc3RhbmNlIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJvbkNoYW5nZSIsImluc3RhbmNlIiwidGhyZXNob2xkcyIsIkFycmF5IiwiaXNBcnJheSIsInVub2JzZXJ2ZSIsIml0ZW1zTGVmdCIsInJvb3RPYnNlcnZlZCIsIml0ZW0iLCJkZWxldGUiLCJkaXNjb25uZWN0IiwiZGVzdHJveSIsImNoYW5nZXMiLCJpbnRlcnNlY3Rpb24iLCJpc0ludGVyc2VjdGluZyIsImludGVyc2VjdGlvblJhdGlvIiwidGFyZ2V0Iiwic29tZSIsImN1cnJlbmN5IiwiQ1VSUkVOQ1lfQ0hBTkdFX0VWRU5UIiwiZm9ybWF0TW9uZXkiLCJtb25leSIsImZvcm1hdCIsIkFDU0N1cnJlbmN5IiwicmVmIiwiY29udmVydGVkTW9uZXkiLCJjb252ZXJ0IiwiY3VycmVudEN1cnJlbmN5IiwiTnVtYmVyIiwiaXNOYU4iLCJtb25leUZvcm1hdHMiLCJtb25leV9mb3JtYXQiLCJzaG9wTW9uZXlGb3JtYXQiLCJjbGVhckNhcnQiLCJmZXRjaCIsImFkZFRvQ2FydCIsIml0ZW1zIiwidXBkYXRlQ2FydCIsInVwZGF0ZXMiLCJjaGFuZ2VDYXJ0SXRlbSIsImdldFByb2R1Y3RzSW5mbyIsImhhbmRsZXMiLCJwYXJzZXIiLCJET01QYXJzZXIiLCJBUElfVVJMIiwiVVJMIiwibG9jYXRpb24iLCJvcmlnaW4iLCJzZWFyY2hQYXJhbXMiLCJwcm9taXNlcyIsImhhbmRsZXNDb3B5IiwiY2h1bmsiLCJzcGxpY2UiLCJqb2luIiwicmVzcG9uc2UiLCJ0ZXh0IiwiRE9NIiwicGFyc2VGcm9tU3RyaW5nIiwicHJvZHVjdHNSZXNwb25zZUhUTUwiLCJwYXJzZSIsImlubmVySFRNTCIsInJlZHVjZSIsImFjYyIsImN1cnIiLCJlbG0iLCJkdXIiLCJwYWdlWSIsInBhZ2VZT2Zmc2V0IiwiYm9keUhlaWdodCIsInNjcm9sbEhlaWdodCIsInN0YXJ0aW5nWSIsImVsZW1lbnRZIiwidGFyZ2V0WSIsImRpZmYiLCJlYXNpbmciLCJ0Iiwic3RlcCIsInRpbWVzdGFtcCIsInBlcmNlbnQiLCJtaW4iLCJlbmQiLCJzY3JvbGxUbyIsImNhcGl0YWxpemVGaXJzdExldHRlciIsInN0cmluZyIsInRvVXBwZXJDYXNlIiwic2xpY2UiXSwic291cmNlUm9vdCI6IiJ9