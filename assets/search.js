"use strict";
(self["webpackChunkjuno_shopify_template"] = self["webpackChunkjuno_shopify_template"] || []).push([["search"],{

/***/ "./node_modules/@shopify/theme-predictive-search/src/request.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@shopify/theme-predictive-search/src/request.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ request)
/* harmony export */ });
/* harmony import */ var _utilities_CustomError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities/CustomError */ "./node_modules/@shopify/theme-predictive-search/src/utilities/CustomError.js");


function request(searchPath, configParams, query, onSuccess, onError) {
  var xhr = new XMLHttpRequest();
  var route = searchPath + '/suggest.json';

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      var contentType = xhr.getResponseHeader("Content-Type");

      if (xhr.status >= 500) {
        onError(new _utilities_CustomError__WEBPACK_IMPORTED_MODULE_0__.ServerError());

        return;
      }

      if (xhr.status === 404) {
        onError(new _utilities_CustomError__WEBPACK_IMPORTED_MODULE_0__.NotFoundError(xhr.status));

        return;
      }

      if (
        typeof contentType !== "string" ||
        contentType.toLowerCase().match("application/json") === null
      ) {
        onError(new _utilities_CustomError__WEBPACK_IMPORTED_MODULE_0__.ContentTypeError(xhr.status));

        return;
      }

      if (xhr.status === 417) {
        try {
          var invalidParameterJson = JSON.parse(xhr.responseText);

          onError(
            new _utilities_CustomError__WEBPACK_IMPORTED_MODULE_0__.InvalidParameterError(
              xhr.status,
              invalidParameterJson.message,
              invalidParameterJson.description
            )
          );
        } catch (error) {
          onError(new _utilities_CustomError__WEBPACK_IMPORTED_MODULE_0__.JsonParseError(xhr.status));
        }

        return;
      }

      if (xhr.status === 422) {
        try {
          var expectationFailedJson = JSON.parse(xhr.responseText);

          onError(
            new _utilities_CustomError__WEBPACK_IMPORTED_MODULE_0__.ExpectationFailedError(
              xhr.status,
              expectationFailedJson.message,
              expectationFailedJson.description
            )
          );
        } catch (error) {
          onError(new _utilities_CustomError__WEBPACK_IMPORTED_MODULE_0__.JsonParseError(xhr.status));
        }

        return;
      }

      if (xhr.status === 429) {
        try {
          var throttledJson = JSON.parse(xhr.responseText);

          onError(
            new _utilities_CustomError__WEBPACK_IMPORTED_MODULE_0__.ThrottledError(
              xhr.status,
              throttledJson.message,
              throttledJson.description,
              xhr.getResponseHeader("Retry-After")
            )
          );
        } catch (error) {
          onError(new _utilities_CustomError__WEBPACK_IMPORTED_MODULE_0__.JsonParseError(xhr.status));
        }

        return;
      }

      if (xhr.status === 200) {
        try {
          var res = JSON.parse(xhr.responseText);
          res.query = query;
          onSuccess(res);
        } catch (error) {
          onError(new _utilities_CustomError__WEBPACK_IMPORTED_MODULE_0__.JsonParseError(xhr.status));
        }

        return;
      }

      try {
        var genericErrorJson = JSON.parse(xhr.responseText);
        onError(
          new _utilities_CustomError__WEBPACK_IMPORTED_MODULE_0__.GenericError(
            xhr.status,
            genericErrorJson.message,
            genericErrorJson.description
          )
        );
      } catch (error) {
        onError(new _utilities_CustomError__WEBPACK_IMPORTED_MODULE_0__.JsonParseError(xhr.status));
      }

      return;
    }
  };

  xhr.open(
    "get",
    route + "?q=" + encodeURIComponent(query) + "&" + configParams
  );

  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send();
}

/***/ }),

/***/ "./node_modules/@shopify/theme-predictive-search/src/theme-predictive-search.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@shopify/theme-predictive-search/src/theme-predictive-search.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PredictiveSearch)
/* harmony export */ });
/* harmony import */ var _validate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./validate */ "./node_modules/@shopify/theme-predictive-search/src/validate.js");
/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./request */ "./node_modules/@shopify/theme-predictive-search/src/request.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ "./node_modules/@shopify/theme-predictive-search/src/utilities/debounce.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities */ "./node_modules/@shopify/theme-predictive-search/src/utilities/Dispatcher.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utilities */ "./node_modules/@shopify/theme-predictive-search/src/utilities/Cache.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utilities */ "./node_modules/@shopify/theme-predictive-search/src/utilities/objectToQueryParams.js");




var DEBOUNCE_RATE = 10;
var requestDebounced = (0,_utilities__WEBPACK_IMPORTED_MODULE_0__["default"])(_request__WEBPACK_IMPORTED_MODULE_1__["default"], DEBOUNCE_RATE);

function PredictiveSearch(config) {
  if (!config) {
    throw new TypeError("No config object was specified");
  }

  var configParameters = config;

  this._retryAfter = null;
  this._currentQuery = null;

  this.dispatcher = new _utilities__WEBPACK_IMPORTED_MODULE_2__["default"]();
  this.cache = new _utilities__WEBPACK_IMPORTED_MODULE_3__["default"]({ bucketSize: 40 });

  this.searchPath = configParameters.search_path || "/search";

  if(configParameters.search_path) {
    delete configParameters['search_path'];
  }

  this.configParams = (0,_utilities__WEBPACK_IMPORTED_MODULE_4__["default"])(configParameters);
}

PredictiveSearch.SEARCH_PATH = "/search";

PredictiveSearch.TYPES = {
  PRODUCT: "product",
  PAGE: "page",
  ARTICLE: "article",
  COLLECTION: "collection"
};

PredictiveSearch.FIELDS = {
  AUTHOR: "author",
  BODY: "body",
  PRODUCT_TYPE: "product_type",
  TAG: "tag",
  TITLE: "title",
  VARIANTS_BARCODE: "variants.barcode",
  VARIANTS_SKU: "variants.sku",
  VARIANTS_TITLE: "variants.title",
  VENDOR: "vendor"
};

PredictiveSearch.UNAVAILABLE_PRODUCTS = {
  SHOW: "show",
  HIDE: "hide",
  LAST: "last"
};

PredictiveSearch.prototype.query = function query(query) {
  try {
    (0,_validate__WEBPACK_IMPORTED_MODULE_5__.validateQuery)(query);
  } catch (error) {
    this.dispatcher.dispatch("error", error);
    return;
  }

  if (query === "") {
    return this;
  }

  this._currentQuery = normalizeQuery(query);
  var cacheResult = this.cache.get(this._currentQuery);
  if (cacheResult) {
    this.dispatcher.dispatch("success", cacheResult);
    return this;
  }

  requestDebounced(
    this.searchPath,
    this.configParams,
    query,
    function(result) {
      this.cache.set(normalizeQuery(result.query), result);
      if (normalizeQuery(result.query) === this._currentQuery) {
        this._retryAfter = null;
        this.dispatcher.dispatch("success", result);
      }
    }.bind(this),
    function(error) {
      if (error.retryAfter) {
        this._retryAfter = error.retryAfter;
      }
      this.dispatcher.dispatch("error", error);
    }.bind(this)
  );

  return this;
};

PredictiveSearch.prototype.on = function on(eventName, callback) {
  this.dispatcher.on(eventName, callback);

  return this;
};

PredictiveSearch.prototype.off = function on(eventName, callback) {
  this.dispatcher.off(eventName, callback);

  return this;
};

function normalizeQuery(query) {
  if (typeof query !== "string") {
    return null;
  }

  return query
    .trim()
    .replace(" ", "-")
    .toLowerCase();
}


/***/ }),

/***/ "./node_modules/@shopify/theme-predictive-search/src/utilities/Cache.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@shopify/theme-predictive-search/src/utilities/Cache.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cache)
/* harmony export */ });
function Cache(config) {
  this._store = {};
  this._keys = [];
  if (config && config.bucketSize) {
    this.bucketSize = config.bucketSize;
  } else {
    this.bucketSize = 20;
  }
}

Cache.prototype.set = function(key, value) {
  if (this.count() >= this.bucketSize) {
    var deleteKey = this._keys.splice(0, 1);
    this.delete(deleteKey);
  }

  this._keys.push(key);
  this._store[key] = value;

  return this._store;
};

Cache.prototype.get = function(key) {
  return this._store[key];
};

Cache.prototype.has = function(key) {
  return Boolean(this._store[key]);
};

Cache.prototype.count = function() {
  return Object.keys(this._store).length;
};

Cache.prototype.delete = function(key) {
  var exists = Boolean(this._store[key]);
  delete this._store[key];
  return exists && !this._store[key];
};


/***/ }),

/***/ "./node_modules/@shopify/theme-predictive-search/src/utilities/CustomError.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@shopify/theme-predictive-search/src/utilities/CustomError.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContentTypeError": () => (/* binding */ ContentTypeError),
/* harmony export */   "ExpectationFailedError": () => (/* binding */ ExpectationFailedError),
/* harmony export */   "GenericError": () => (/* binding */ GenericError),
/* harmony export */   "InvalidParameterError": () => (/* binding */ InvalidParameterError),
/* harmony export */   "JsonParseError": () => (/* binding */ JsonParseError),
/* harmony export */   "NotFoundError": () => (/* binding */ NotFoundError),
/* harmony export */   "ServerError": () => (/* binding */ ServerError),
/* harmony export */   "ThrottledError": () => (/* binding */ ThrottledError)
/* harmony export */ });
function GenericError() {
  var error = Error.call(this);

  error.name = "Server error";
  error.message = "Something went wrong on the server";
  error.status = 500;

  return error;
}

function NotFoundError(status) {
  var error = Error.call(this);

  error.name = "Not found";
  error.message = "Not found";
  error.status = status;

  return error;
}

function ServerError() {
  var error = Error.call(this);

  error.name = "Server error";
  error.message = "Something went wrong on the server";
  error.status = 500;

  return error;
}

function ContentTypeError(status) {
  var error = Error.call(this);

  error.name = "Content-Type error";
  error.message = "Content-Type was not provided or is of wrong type";
  error.status = status;

  return error;
}

function JsonParseError(status) {
  var error = Error.call(this);

  error.name = "JSON parse error";
  error.message = "JSON syntax error";
  error.status = status;

  return error;
}

function ThrottledError(status, name, message, retryAfter) {
  var error = Error.call(this);

  error.name = name;
  error.message = message;
  error.status = status;
  error.retryAfter = retryAfter;

  return error;
}

function InvalidParameterError(status, name, message) {
  var error = Error.call(this);

  error.name = name;
  error.message = message;
  error.status = status;

  return error;
}

function ExpectationFailedError(status, name, message) {
  var error = Error.call(this);

  error.name = name;
  error.message = message;
  error.status = status;

  return error;
}


/***/ }),

/***/ "./node_modules/@shopify/theme-predictive-search/src/utilities/Dispatcher.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@shopify/theme-predictive-search/src/utilities/Dispatcher.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Dispatcher)
/* harmony export */ });
function Dispatcher() {
  this.events = {};
}

Dispatcher.prototype.on = function(eventName, callback) {
  var event = this.events[eventName];
  if (!event) {
    event = new DispatcherEvent(eventName);
    this.events[eventName] = event;
  }
  event.registerCallback(callback);
};

Dispatcher.prototype.off = function(eventName, callback) {
  var event = this.events[eventName];
  if (event && event.callbacks.indexOf(callback) > -1) {
    event.unregisterCallback(callback);
    if (event.callbacks.length === 0) {
      delete this.events[eventName];
    }
  }
};

Dispatcher.prototype.dispatch = function(eventName, payload) {
  var event = this.events[eventName];
  if (event) {
    event.fire(payload);
  }
};

function DispatcherEvent(eventName) {
  this.eventName = eventName;
  this.callbacks = [];
}

DispatcherEvent.prototype.registerCallback = function(callback) {
  this.callbacks.push(callback);
};

DispatcherEvent.prototype.unregisterCallback = function(callback) {
  var index = this.callbacks.indexOf(callback);
  if (index > -1) {
    this.callbacks.splice(index, 1);
  }
};

DispatcherEvent.prototype.fire = function(payload) {
  var callbacks = this.callbacks.slice(0);
  callbacks.forEach(function(callback) {
    callback(payload);
  });
};


/***/ }),

/***/ "./node_modules/@shopify/theme-predictive-search/src/utilities/debounce.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@shopify/theme-predictive-search/src/utilities/debounce.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ debounce)
/* harmony export */ });
function debounce(func, wait) {
  var timeout = null;
  return function() {
    var context = this;
    var args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      func.apply(context, args);
    }, wait || 0);
  };
}


/***/ }),

/***/ "./node_modules/@shopify/theme-predictive-search/src/utilities/objectToQueryParams.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@shopify/theme-predictive-search/src/utilities/objectToQueryParams.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ objectToQueryParams)
/* harmony export */ });
function objectToQueryParams(obj, parentKey) {
  var output = "";
  parentKey = parentKey || null;

  Object.keys(obj).forEach(function (key) {
    var outputKey = key + "=";
    if (parentKey) {
      outputKey = parentKey + "[" + key + "]";
    }

    switch (trueTypeOf(obj[key])) {
      case "object":
        output += objectToQueryParams(obj[key], parentKey ? outputKey : key);
        break;
      case "array":
        output += outputKey + "=" + obj[key].join(",") + "&";
        break;
      default:
        if (parentKey) {
          outputKey += "=";
        }
        output += outputKey + encodeURIComponent(obj[key]) + "&";
        break;
    }
  });

  return output;
}

function trueTypeOf(obj) {
  return Object.prototype.toString
    .call(obj)
    .slice(8, -1)
    .toLowerCase();
}

/***/ }),

/***/ "./node_modules/@shopify/theme-predictive-search/src/validate.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@shopify/theme-predictive-search/src/validate.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validateQuery": () => (/* binding */ validateQuery)
/* harmony export */ });
function validateQuery(query) {
  var error;

  if (query === null || query === undefined) {
    error = new TypeError("'query' is missing");
    error.type = "argument";
    throw error;
  }

  if (typeof query !== "string") {
    error = new TypeError("'query' is not a string");
    error.type = "argument";
    throw error;
  }
}


/***/ }),

/***/ "./src/assets/js/main/search/Search.js":
/*!*********************************************!*\
  !*** ./src/assets/js/main/search/Search.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SearchForm": () => (/* binding */ SearchForm)
/* harmony export */ });
/* harmony import */ var _shopify_theme_predictive_search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shopify/theme-predictive-search */ "./node_modules/@shopify/theme-predictive-search/src/theme-predictive-search.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/cookies.ts");



class SearchForm extends HTMLElement {
  constructor() {
    super();
    this.element = this;
    this.form = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-search-form", this.element);
    this.input = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-search-input", this.form);
    this.results = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-search-results", this.element);
    this.searchPage = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-search-grid", document);
    this.page = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-page", document);
    this.itemClicked = false;
    this.bindEvents();
    this.trigger = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-search-trigger");
  }

  bindEvents() {
    this.input.addEventListener("input", () => {
      if (this.isInputEmpty(this.input.value)) {
        this.results.classList.remove("is-active");
      } else {
        this.predictiveSearch(this.input.value);
        this.results.classList.add("is-active");
      }
    });
    this.results.addEventListener('click', () => {
      this.itemClicked = true;
    });
    this.page.addEventListener('click', () => {
      if (this.input !== document.activeElement) {
        this.closeSearchDropdown();
      }
    });
    this.input.addEventListener("focusin", () => {
      if (!this.isInputEmpty(this.input.value)) {
        this.predictiveSearch(this.input.value);
        this.results.classList.add("is-active");
      }
    });

    if (this.searchPage) {
      this.initSearchCookie();
    }
  }

  closeSearchDropdown() {
    if (this.results.classList.contains("is-active") && this.itemClicked === false) {
      this.results.classList.remove("is-active");
    }
  }

  predictiveSearch(query) {
    const predictiveSearch = new _shopify_theme_predictive_search__WEBPACK_IMPORTED_MODULE_1__["default"]({
      resources: {
        type: [_shopify_theme_predictive_search__WEBPACK_IMPORTED_MODULE_1__["default"].TYPES.PRODUCT],
        limit: 6,
        options: {
          // unavailable_products: PredictiveSearch.UNAVAILABLE_PRODUCTS.HIDE,    // Uncomment to hide OOS products
          fields: [_shopify_theme_predictive_search__WEBPACK_IMPORTED_MODULE_1__["default"].FIELDS.TITLE, _shopify_theme_predictive_search__WEBPACK_IMPORTED_MODULE_1__["default"].FIELDS.VENDOR, _shopify_theme_predictive_search__WEBPACK_IMPORTED_MODULE_1__["default"].FIELDS.PRODUCT_TYPE, _shopify_theme_predictive_search__WEBPACK_IMPORTED_MODULE_1__["default"].FIELDS.VARIANTS_TITLE, _shopify_theme_predictive_search__WEBPACK_IMPORTED_MODULE_1__["default"].FIELDS.VARIANTS_SKU, _shopify_theme_predictive_search__WEBPACK_IMPORTED_MODULE_1__["default"].FIELDS.VARIANTS_BARCODE, _shopify_theme_predictive_search__WEBPACK_IMPORTED_MODULE_1__["default"].FIELDS.TAG]
        }
      }
    }); // Set success event listener

    predictiveSearch.on("success", suggestions => {
      const productSuggestions = suggestions.resources.results.products;

      if (productSuggestions.length > 0) {
        this.searchRender(productSuggestions);
      } else {
        this.results.innerHTML = "<span>No suggestions</span>";
      }
    }); // Set error event listener

    predictiveSearch.on("error", error => {
      console.error("Error message:", error.message);
    }); // Send query

    predictiveSearch.query(query);
  }

  searchRender(suggestions) {
    let results = "";
    suggestions.forEach(suggestion => {
      const format = window.theme.moneyFormat.includes("{{amount_no_decimals}}") ? "{{amount_no_decimals}}" : "{{amount}}";
      let moneyPrice = window.theme.moneyFormat.replace(format, suggestion.price);
      suggestion.tags.forEach(tag => {
        if (tag.includes('coogar_enquire')) moneyPrice = moneyPrice.replace('£', '$');
      });
      results += `
                <a href="${suggestion.url}" class="c-product-card">
                    <picture class="c-product-card__image  c-product-card__image--suggestion  o-img__frame  o-ar--cart-image  js-image">
                        <img
                            class="o-img  o-img--cover  o-ar__item"
                            src="${suggestion.image}"
                            alt="${suggestion.image.alt}"
                            loading="lazy"
                            width="100%"
                            height="100%"
                        />
                    </picture>
                    <div class="c-product-card__details  c-product-card__details--suggestion">
                        <h4 class="t-heading c-product-card__details-title  t-font-size--eta">
                            ${suggestion.title}
                        </h4>
                        <p class="c-product-card__price" >
                            ${moneyPrice}
                        </p>
                    </div>
                </a>
            `;
    });
    this.results.innerHTML = results;
  }

  isInputEmpty(str) {
    return !str || /^\s*$/.test(str);
  }

  initSearchCookie() {
    const searchResults = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)(".js-product-card", this.searchPage);
    searchResults.forEach(card => {
      card.addEventListener("click", () => {
        const currentUrl = window.location.href;
        (0,_utils__WEBPACK_IMPORTED_MODULE_2__.setCookie)("js-search-cookie", currentUrl, 28);
      });
    });
  }

}



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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TUFDNUI5RixTQUFTLENBQUMsVUFBRCxFQUFhOEYsSUFBYixFQUFtQixHQUFuQixDQUFUO0lBQ0g7RUFDSjtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL0BzaG9waWZ5L3RoZW1lLXByZWRpY3RpdmUtc2VhcmNoL3NyYy9yZXF1ZXN0LmpzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9Ac2hvcGlmeS90aGVtZS1wcmVkaWN0aXZlLXNlYXJjaC9zcmMvdGhlbWUtcHJlZGljdGl2ZS1zZWFyY2guanMiLCJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL0BzaG9waWZ5L3RoZW1lLXByZWRpY3RpdmUtc2VhcmNoL3NyYy91dGlsaXRpZXMvQ2FjaGUuanMiLCJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL0BzaG9waWZ5L3RoZW1lLXByZWRpY3RpdmUtc2VhcmNoL3NyYy91dGlsaXRpZXMvQ3VzdG9tRXJyb3IuanMiLCJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL0BzaG9waWZ5L3RoZW1lLXByZWRpY3RpdmUtc2VhcmNoL3NyYy91dGlsaXRpZXMvRGlzcGF0Y2hlci5qcyIsIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvQHNob3BpZnkvdGhlbWUtcHJlZGljdGl2ZS1zZWFyY2gvc3JjL3V0aWxpdGllcy9kZWJvdW5jZS5qcyIsIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvQHNob3BpZnkvdGhlbWUtcHJlZGljdGl2ZS1zZWFyY2gvc3JjL3V0aWxpdGllcy9vYmplY3RUb1F1ZXJ5UGFyYW1zLmpzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9Ac2hvcGlmeS90aGVtZS1wcmVkaWN0aXZlLXNlYXJjaC9zcmMvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vc3JjL2Fzc2V0cy9qcy9tYWluL3NlYXJjaC9TZWFyY2guanMiLCJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vc3JjL2Fzc2V0cy9qcy91dGlscy9jb29raWVzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFNlcnZlckVycm9yLFxuICBOb3RGb3VuZEVycm9yLFxuICBDb250ZW50VHlwZUVycm9yLFxuICBJbnZhbGlkUGFyYW1ldGVyRXJyb3IsXG4gIEpzb25QYXJzZUVycm9yLFxuICBFeHBlY3RhdGlvbkZhaWxlZEVycm9yLFxuICBUaHJvdHRsZWRFcnJvcixcbiAgR2VuZXJpY0Vycm9yXG59IGZyb20gXCIuL3V0aWxpdGllcy9DdXN0b21FcnJvclwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXF1ZXN0KHNlYXJjaFBhdGgsIGNvbmZpZ1BhcmFtcywgcXVlcnksIG9uU3VjY2Vzcywgb25FcnJvcikge1xuICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIHZhciByb3V0ZSA9IHNlYXJjaFBhdGggKyAnL3N1Z2dlc3QuanNvbic7XG5cbiAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IFhNTEh0dHBSZXF1ZXN0LkRPTkUpIHtcbiAgICAgIHZhciBjb250ZW50VHlwZSA9IHhoci5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtVHlwZVwiKTtcblxuICAgICAgaWYgKHhoci5zdGF0dXMgPj0gNTAwKSB7XG4gICAgICAgIG9uRXJyb3IobmV3IFNlcnZlckVycm9yKCkpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICBvbkVycm9yKG5ldyBOb3RGb3VuZEVycm9yKHhoci5zdGF0dXMpKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIGNvbnRlbnRUeXBlICE9PSBcInN0cmluZ1wiIHx8XG4gICAgICAgIGNvbnRlbnRUeXBlLnRvTG93ZXJDYXNlKCkubWF0Y2goXCJhcHBsaWNhdGlvbi9qc29uXCIpID09PSBudWxsXG4gICAgICApIHtcbiAgICAgICAgb25FcnJvcihuZXcgQ29udGVudFR5cGVFcnJvcih4aHIuc3RhdHVzKSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gNDE3KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFyIGludmFsaWRQYXJhbWV0ZXJKc29uID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcblxuICAgICAgICAgIG9uRXJyb3IoXG4gICAgICAgICAgICBuZXcgSW52YWxpZFBhcmFtZXRlckVycm9yKFxuICAgICAgICAgICAgICB4aHIuc3RhdHVzLFxuICAgICAgICAgICAgICBpbnZhbGlkUGFyYW1ldGVySnNvbi5tZXNzYWdlLFxuICAgICAgICAgICAgICBpbnZhbGlkUGFyYW1ldGVySnNvbi5kZXNjcmlwdGlvblxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgb25FcnJvcihuZXcgSnNvblBhcnNlRXJyb3IoeGhyLnN0YXR1cykpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gNDIyKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFyIGV4cGVjdGF0aW9uRmFpbGVkSnNvbiA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG5cbiAgICAgICAgICBvbkVycm9yKFxuICAgICAgICAgICAgbmV3IEV4cGVjdGF0aW9uRmFpbGVkRXJyb3IoXG4gICAgICAgICAgICAgIHhoci5zdGF0dXMsXG4gICAgICAgICAgICAgIGV4cGVjdGF0aW9uRmFpbGVkSnNvbi5tZXNzYWdlLFxuICAgICAgICAgICAgICBleHBlY3RhdGlvbkZhaWxlZEpzb24uZGVzY3JpcHRpb25cbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIG9uRXJyb3IobmV3IEpzb25QYXJzZUVycm9yKHhoci5zdGF0dXMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDQyOSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhciB0aHJvdHRsZWRKc29uID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcblxuICAgICAgICAgIG9uRXJyb3IoXG4gICAgICAgICAgICBuZXcgVGhyb3R0bGVkRXJyb3IoXG4gICAgICAgICAgICAgIHhoci5zdGF0dXMsXG4gICAgICAgICAgICAgIHRocm90dGxlZEpzb24ubWVzc2FnZSxcbiAgICAgICAgICAgICAgdGhyb3R0bGVkSnNvbi5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgeGhyLmdldFJlc3BvbnNlSGVhZGVyKFwiUmV0cnktQWZ0ZXJcIilcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIG9uRXJyb3IobmV3IEpzb25QYXJzZUVycm9yKHhoci5zdGF0dXMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhciByZXMgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgIHJlcy5xdWVyeSA9IHF1ZXJ5O1xuICAgICAgICAgIG9uU3VjY2VzcyhyZXMpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIG9uRXJyb3IobmV3IEpzb25QYXJzZUVycm9yKHhoci5zdGF0dXMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGdlbmVyaWNFcnJvckpzb24gPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICBvbkVycm9yKFxuICAgICAgICAgIG5ldyBHZW5lcmljRXJyb3IoXG4gICAgICAgICAgICB4aHIuc3RhdHVzLFxuICAgICAgICAgICAgZ2VuZXJpY0Vycm9ySnNvbi5tZXNzYWdlLFxuICAgICAgICAgICAgZ2VuZXJpY0Vycm9ySnNvbi5kZXNjcmlwdGlvblxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIG9uRXJyb3IobmV3IEpzb25QYXJzZUVycm9yKHhoci5zdGF0dXMpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfTtcblxuICB4aHIub3BlbihcbiAgICBcImdldFwiLFxuICAgIHJvdXRlICsgXCI/cT1cIiArIGVuY29kZVVSSUNvbXBvbmVudChxdWVyeSkgKyBcIiZcIiArIGNvbmZpZ1BhcmFtc1xuICApO1xuXG4gIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcblxuICB4aHIuc2VuZCgpO1xufSIsImltcG9ydCB7IHZhbGlkYXRlUXVlcnkgfSBmcm9tIFwiLi92YWxpZGF0ZVwiO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSBcIi4vcmVxdWVzdFwiO1xuaW1wb3J0IHsgZGVib3VuY2UsIG9iamVjdFRvUXVlcnlQYXJhbXMsIERpc3BhdGNoZXIsIENhY2hlIH0gZnJvbSBcIi4vdXRpbGl0aWVzXCI7XG5cbnZhciBERUJPVU5DRV9SQVRFID0gMTA7XG52YXIgcmVxdWVzdERlYm91bmNlZCA9IGRlYm91bmNlKHJlcXVlc3QsIERFQk9VTkNFX1JBVEUpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQcmVkaWN0aXZlU2VhcmNoKGNvbmZpZykge1xuICBpZiAoIWNvbmZpZykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJObyBjb25maWcgb2JqZWN0IHdhcyBzcGVjaWZpZWRcIik7XG4gIH1cblxuICB2YXIgY29uZmlnUGFyYW1ldGVycyA9IGNvbmZpZztcblxuICB0aGlzLl9yZXRyeUFmdGVyID0gbnVsbDtcbiAgdGhpcy5fY3VycmVudFF1ZXJ5ID0gbnVsbDtcblxuICB0aGlzLmRpc3BhdGNoZXIgPSBuZXcgRGlzcGF0Y2hlcigpO1xuICB0aGlzLmNhY2hlID0gbmV3IENhY2hlKHsgYnVja2V0U2l6ZTogNDAgfSk7XG5cbiAgdGhpcy5zZWFyY2hQYXRoID0gY29uZmlnUGFyYW1ldGVycy5zZWFyY2hfcGF0aCB8fCBcIi9zZWFyY2hcIjtcblxuICBpZihjb25maWdQYXJhbWV0ZXJzLnNlYXJjaF9wYXRoKSB7XG4gICAgZGVsZXRlIGNvbmZpZ1BhcmFtZXRlcnNbJ3NlYXJjaF9wYXRoJ107XG4gIH1cblxuICB0aGlzLmNvbmZpZ1BhcmFtcyA9IG9iamVjdFRvUXVlcnlQYXJhbXMoY29uZmlnUGFyYW1ldGVycyk7XG59XG5cblByZWRpY3RpdmVTZWFyY2guU0VBUkNIX1BBVEggPSBcIi9zZWFyY2hcIjtcblxuUHJlZGljdGl2ZVNlYXJjaC5UWVBFUyA9IHtcbiAgUFJPRFVDVDogXCJwcm9kdWN0XCIsXG4gIFBBR0U6IFwicGFnZVwiLFxuICBBUlRJQ0xFOiBcImFydGljbGVcIixcbiAgQ09MTEVDVElPTjogXCJjb2xsZWN0aW9uXCJcbn07XG5cblByZWRpY3RpdmVTZWFyY2guRklFTERTID0ge1xuICBBVVRIT1I6IFwiYXV0aG9yXCIsXG4gIEJPRFk6IFwiYm9keVwiLFxuICBQUk9EVUNUX1RZUEU6IFwicHJvZHVjdF90eXBlXCIsXG4gIFRBRzogXCJ0YWdcIixcbiAgVElUTEU6IFwidGl0bGVcIixcbiAgVkFSSUFOVFNfQkFSQ09ERTogXCJ2YXJpYW50cy5iYXJjb2RlXCIsXG4gIFZBUklBTlRTX1NLVTogXCJ2YXJpYW50cy5za3VcIixcbiAgVkFSSUFOVFNfVElUTEU6IFwidmFyaWFudHMudGl0bGVcIixcbiAgVkVORE9SOiBcInZlbmRvclwiXG59O1xuXG5QcmVkaWN0aXZlU2VhcmNoLlVOQVZBSUxBQkxFX1BST0RVQ1RTID0ge1xuICBTSE9XOiBcInNob3dcIixcbiAgSElERTogXCJoaWRlXCIsXG4gIExBU1Q6IFwibGFzdFwiXG59O1xuXG5QcmVkaWN0aXZlU2VhcmNoLnByb3RvdHlwZS5xdWVyeSA9IGZ1bmN0aW9uIHF1ZXJ5KHF1ZXJ5KSB7XG4gIHRyeSB7XG4gICAgdmFsaWRhdGVRdWVyeShxdWVyeSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhpcy5kaXNwYXRjaGVyLmRpc3BhdGNoKFwiZXJyb3JcIiwgZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChxdWVyeSA9PT0gXCJcIikge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdGhpcy5fY3VycmVudFF1ZXJ5ID0gbm9ybWFsaXplUXVlcnkocXVlcnkpO1xuICB2YXIgY2FjaGVSZXN1bHQgPSB0aGlzLmNhY2hlLmdldCh0aGlzLl9jdXJyZW50UXVlcnkpO1xuICBpZiAoY2FjaGVSZXN1bHQpIHtcbiAgICB0aGlzLmRpc3BhdGNoZXIuZGlzcGF0Y2goXCJzdWNjZXNzXCIsIGNhY2hlUmVzdWx0KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJlcXVlc3REZWJvdW5jZWQoXG4gICAgdGhpcy5zZWFyY2hQYXRoLFxuICAgIHRoaXMuY29uZmlnUGFyYW1zLFxuICAgIHF1ZXJ5LFxuICAgIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgdGhpcy5jYWNoZS5zZXQobm9ybWFsaXplUXVlcnkocmVzdWx0LnF1ZXJ5KSwgcmVzdWx0KTtcbiAgICAgIGlmIChub3JtYWxpemVRdWVyeShyZXN1bHQucXVlcnkpID09PSB0aGlzLl9jdXJyZW50UXVlcnkpIHtcbiAgICAgICAgdGhpcy5fcmV0cnlBZnRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hlci5kaXNwYXRjaChcInN1Y2Nlc3NcIiwgcmVzdWx0KTtcbiAgICAgIH1cbiAgICB9LmJpbmQodGhpcyksXG4gICAgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgIGlmIChlcnJvci5yZXRyeUFmdGVyKSB7XG4gICAgICAgIHRoaXMuX3JldHJ5QWZ0ZXIgPSBlcnJvci5yZXRyeUFmdGVyO1xuICAgICAgfVxuICAgICAgdGhpcy5kaXNwYXRjaGVyLmRpc3BhdGNoKFwiZXJyb3JcIiwgZXJyb3IpO1xuICAgIH0uYmluZCh0aGlzKVxuICApO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuUHJlZGljdGl2ZVNlYXJjaC5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gIHRoaXMuZGlzcGF0Y2hlci5vbihldmVudE5hbWUsIGNhbGxiYWNrKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cblByZWRpY3RpdmVTZWFyY2gucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIG9uKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgdGhpcy5kaXNwYXRjaGVyLm9mZihldmVudE5hbWUsIGNhbGxiYWNrKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVF1ZXJ5KHF1ZXJ5KSB7XG4gIGlmICh0eXBlb2YgcXVlcnkgIT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBxdWVyeVxuICAgIC50cmltKClcbiAgICAucmVwbGFjZShcIiBcIiwgXCItXCIpXG4gICAgLnRvTG93ZXJDYXNlKCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDYWNoZShjb25maWcpIHtcbiAgdGhpcy5fc3RvcmUgPSB7fTtcbiAgdGhpcy5fa2V5cyA9IFtdO1xuICBpZiAoY29uZmlnICYmIGNvbmZpZy5idWNrZXRTaXplKSB7XG4gICAgdGhpcy5idWNrZXRTaXplID0gY29uZmlnLmJ1Y2tldFNpemU7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5idWNrZXRTaXplID0gMjA7XG4gIH1cbn1cblxuQ2FjaGUucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgaWYgKHRoaXMuY291bnQoKSA+PSB0aGlzLmJ1Y2tldFNpemUpIHtcbiAgICB2YXIgZGVsZXRlS2V5ID0gdGhpcy5fa2V5cy5zcGxpY2UoMCwgMSk7XG4gICAgdGhpcy5kZWxldGUoZGVsZXRlS2V5KTtcbiAgfVxuXG4gIHRoaXMuX2tleXMucHVzaChrZXkpO1xuICB0aGlzLl9zdG9yZVtrZXldID0gdmFsdWU7XG5cbiAgcmV0dXJuIHRoaXMuX3N0b3JlO1xufTtcblxuQ2FjaGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKGtleSkge1xuICByZXR1cm4gdGhpcy5fc3RvcmVba2V5XTtcbn07XG5cbkNhY2hlLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbihrZXkpIHtcbiAgcmV0dXJuIEJvb2xlYW4odGhpcy5fc3RvcmVba2V5XSk7XG59O1xuXG5DYWNoZS5wcm90b3R5cGUuY291bnQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3N0b3JlKS5sZW5ndGg7XG59O1xuXG5DYWNoZS5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24oa2V5KSB7XG4gIHZhciBleGlzdHMgPSBCb29sZWFuKHRoaXMuX3N0b3JlW2tleV0pO1xuICBkZWxldGUgdGhpcy5fc3RvcmVba2V5XTtcbiAgcmV0dXJuIGV4aXN0cyAmJiAhdGhpcy5fc3RvcmVba2V5XTtcbn07XG4iLCJleHBvcnQgZnVuY3Rpb24gR2VuZXJpY0Vycm9yKCkge1xuICB2YXIgZXJyb3IgPSBFcnJvci5jYWxsKHRoaXMpO1xuXG4gIGVycm9yLm5hbWUgPSBcIlNlcnZlciBlcnJvclwiO1xuICBlcnJvci5tZXNzYWdlID0gXCJTb21ldGhpbmcgd2VudCB3cm9uZyBvbiB0aGUgc2VydmVyXCI7XG4gIGVycm9yLnN0YXR1cyA9IDUwMDtcblxuICByZXR1cm4gZXJyb3I7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBOb3RGb3VuZEVycm9yKHN0YXR1cykge1xuICB2YXIgZXJyb3IgPSBFcnJvci5jYWxsKHRoaXMpO1xuXG4gIGVycm9yLm5hbWUgPSBcIk5vdCBmb3VuZFwiO1xuICBlcnJvci5tZXNzYWdlID0gXCJOb3QgZm91bmRcIjtcbiAgZXJyb3Iuc3RhdHVzID0gc3RhdHVzO1xuXG4gIHJldHVybiBlcnJvcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNlcnZlckVycm9yKCkge1xuICB2YXIgZXJyb3IgPSBFcnJvci5jYWxsKHRoaXMpO1xuXG4gIGVycm9yLm5hbWUgPSBcIlNlcnZlciBlcnJvclwiO1xuICBlcnJvci5tZXNzYWdlID0gXCJTb21ldGhpbmcgd2VudCB3cm9uZyBvbiB0aGUgc2VydmVyXCI7XG4gIGVycm9yLnN0YXR1cyA9IDUwMDtcblxuICByZXR1cm4gZXJyb3I7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDb250ZW50VHlwZUVycm9yKHN0YXR1cykge1xuICB2YXIgZXJyb3IgPSBFcnJvci5jYWxsKHRoaXMpO1xuXG4gIGVycm9yLm5hbWUgPSBcIkNvbnRlbnQtVHlwZSBlcnJvclwiO1xuICBlcnJvci5tZXNzYWdlID0gXCJDb250ZW50LVR5cGUgd2FzIG5vdCBwcm92aWRlZCBvciBpcyBvZiB3cm9uZyB0eXBlXCI7XG4gIGVycm9yLnN0YXR1cyA9IHN0YXR1cztcblxuICByZXR1cm4gZXJyb3I7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBKc29uUGFyc2VFcnJvcihzdGF0dXMpIHtcbiAgdmFyIGVycm9yID0gRXJyb3IuY2FsbCh0aGlzKTtcblxuICBlcnJvci5uYW1lID0gXCJKU09OIHBhcnNlIGVycm9yXCI7XG4gIGVycm9yLm1lc3NhZ2UgPSBcIkpTT04gc3ludGF4IGVycm9yXCI7XG4gIGVycm9yLnN0YXR1cyA9IHN0YXR1cztcblxuICByZXR1cm4gZXJyb3I7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBUaHJvdHRsZWRFcnJvcihzdGF0dXMsIG5hbWUsIG1lc3NhZ2UsIHJldHJ5QWZ0ZXIpIHtcbiAgdmFyIGVycm9yID0gRXJyb3IuY2FsbCh0aGlzKTtcblxuICBlcnJvci5uYW1lID0gbmFtZTtcbiAgZXJyb3IubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIGVycm9yLnN0YXR1cyA9IHN0YXR1cztcbiAgZXJyb3IucmV0cnlBZnRlciA9IHJldHJ5QWZ0ZXI7XG5cbiAgcmV0dXJuIGVycm9yO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gSW52YWxpZFBhcmFtZXRlckVycm9yKHN0YXR1cywgbmFtZSwgbWVzc2FnZSkge1xuICB2YXIgZXJyb3IgPSBFcnJvci5jYWxsKHRoaXMpO1xuXG4gIGVycm9yLm5hbWUgPSBuYW1lO1xuICBlcnJvci5tZXNzYWdlID0gbWVzc2FnZTtcbiAgZXJyb3Iuc3RhdHVzID0gc3RhdHVzO1xuXG4gIHJldHVybiBlcnJvcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEV4cGVjdGF0aW9uRmFpbGVkRXJyb3Ioc3RhdHVzLCBuYW1lLCBtZXNzYWdlKSB7XG4gIHZhciBlcnJvciA9IEVycm9yLmNhbGwodGhpcyk7XG5cbiAgZXJyb3IubmFtZSA9IG5hbWU7XG4gIGVycm9yLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICBlcnJvci5zdGF0dXMgPSBzdGF0dXM7XG5cbiAgcmV0dXJuIGVycm9yO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGlzcGF0Y2hlcigpIHtcbiAgdGhpcy5ldmVudHMgPSB7fTtcbn1cblxuRGlzcGF0Y2hlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gIHZhciBldmVudCA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV07XG4gIGlmICghZXZlbnQpIHtcbiAgICBldmVudCA9IG5ldyBEaXNwYXRjaGVyRXZlbnQoZXZlbnROYW1lKTtcbiAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gZXZlbnQ7XG4gIH1cbiAgZXZlbnQucmVnaXN0ZXJDYWxsYmFjayhjYWxsYmFjayk7XG59O1xuXG5EaXNwYXRjaGVyLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gIHZhciBldmVudCA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV07XG4gIGlmIChldmVudCAmJiBldmVudC5jYWxsYmFja3MuaW5kZXhPZihjYWxsYmFjaykgPiAtMSkge1xuICAgIGV2ZW50LnVucmVnaXN0ZXJDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgaWYgKGV2ZW50LmNhbGxiYWNrcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmV2ZW50c1tldmVudE5hbWVdO1xuICAgIH1cbiAgfVxufTtcblxuRGlzcGF0Y2hlci5wcm90b3R5cGUuZGlzcGF0Y2ggPSBmdW5jdGlvbihldmVudE5hbWUsIHBheWxvYWQpIHtcbiAgdmFyIGV2ZW50ID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXTtcbiAgaWYgKGV2ZW50KSB7XG4gICAgZXZlbnQuZmlyZShwYXlsb2FkKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gRGlzcGF0Y2hlckV2ZW50KGV2ZW50TmFtZSkge1xuICB0aGlzLmV2ZW50TmFtZSA9IGV2ZW50TmFtZTtcbiAgdGhpcy5jYWxsYmFja3MgPSBbXTtcbn1cblxuRGlzcGF0Y2hlckV2ZW50LnByb3RvdHlwZS5yZWdpc3RlckNhbGxiYWNrID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgdGhpcy5jYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG59O1xuXG5EaXNwYXRjaGVyRXZlbnQucHJvdG90eXBlLnVucmVnaXN0ZXJDYWxsYmFjayA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciBpbmRleCA9IHRoaXMuY2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2spO1xuICBpZiAoaW5kZXggPiAtMSkge1xuICAgIHRoaXMuY2FsbGJhY2tzLnNwbGljZShpbmRleCwgMSk7XG4gIH1cbn07XG5cbkRpc3BhdGNoZXJFdmVudC5wcm90b3R5cGUuZmlyZSA9IGZ1bmN0aW9uKHBheWxvYWQpIHtcbiAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuY2FsbGJhY2tzLnNsaWNlKDApO1xuICBjYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIGNhbGxiYWNrKHBheWxvYWQpO1xuICB9KTtcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0KSB7XG4gIHZhciB0aW1lb3V0ID0gbnVsbDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgfSwgd2FpdCB8fCAwKTtcbiAgfTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9iamVjdFRvUXVlcnlQYXJhbXMob2JqLCBwYXJlbnRLZXkpIHtcbiAgdmFyIG91dHB1dCA9IFwiXCI7XG4gIHBhcmVudEtleSA9IHBhcmVudEtleSB8fCBudWxsO1xuXG4gIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIG91dHB1dEtleSA9IGtleSArIFwiPVwiO1xuICAgIGlmIChwYXJlbnRLZXkpIHtcbiAgICAgIG91dHB1dEtleSA9IHBhcmVudEtleSArIFwiW1wiICsga2V5ICsgXCJdXCI7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0cnVlVHlwZU9mKG9ialtrZXldKSkge1xuICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICBvdXRwdXQgKz0gb2JqZWN0VG9RdWVyeVBhcmFtcyhvYmpba2V5XSwgcGFyZW50S2V5ID8gb3V0cHV0S2V5IDoga2V5KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiYXJyYXlcIjpcbiAgICAgICAgb3V0cHV0ICs9IG91dHB1dEtleSArIFwiPVwiICsgb2JqW2tleV0uam9pbihcIixcIikgKyBcIiZcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAocGFyZW50S2V5KSB7XG4gICAgICAgICAgb3V0cHV0S2V5ICs9IFwiPVwiO1xuICAgICAgICB9XG4gICAgICAgIG91dHB1dCArPSBvdXRwdXRLZXkgKyBlbmNvZGVVUklDb21wb25lbnQob2JqW2tleV0pICsgXCImXCI7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gdHJ1ZVR5cGVPZihvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcbiAgICAuY2FsbChvYmopXG4gICAgLnNsaWNlKDgsIC0xKVxuICAgIC50b0xvd2VyQ2FzZSgpO1xufSIsImV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVF1ZXJ5KHF1ZXJ5KSB7XG4gIHZhciBlcnJvcjtcblxuICBpZiAocXVlcnkgPT09IG51bGwgfHwgcXVlcnkgPT09IHVuZGVmaW5lZCkge1xuICAgIGVycm9yID0gbmV3IFR5cGVFcnJvcihcIidxdWVyeScgaXMgbWlzc2luZ1wiKTtcbiAgICBlcnJvci50eXBlID0gXCJhcmd1bWVudFwiO1xuICAgIHRocm93IGVycm9yO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBxdWVyeSAhPT0gXCJzdHJpbmdcIikge1xuICAgIGVycm9yID0gbmV3IFR5cGVFcnJvcihcIidxdWVyeScgaXMgbm90IGEgc3RyaW5nXCIpO1xuICAgIGVycm9yLnR5cGUgPSBcImFyZ3VtZW50XCI7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cbiIsImltcG9ydCBQcmVkaWN0aXZlU2VhcmNoIGZyb20gXCJAc2hvcGlmeS90aGVtZS1wcmVkaWN0aXZlLXNlYXJjaFwiO1xyXG5pbXBvcnQgeyBnZXQsIGdldEFsbCwgc2V0Q29va2llIH0gZnJvbSBcIkAvdXRpbHNcIjtcclxuXHJcbmNsYXNzIFNlYXJjaEZvcm0gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5mb3JtID0gZ2V0KFwiLmpzLXNlYXJjaC1mb3JtXCIsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGdldChcIi5qcy1zZWFyY2gtaW5wdXRcIiwgdGhpcy5mb3JtKTtcclxuICAgICAgICB0aGlzLnJlc3VsdHMgPSBnZXQoXCIuanMtc2VhcmNoLXJlc3VsdHNcIiwgdGhpcy5lbGVtZW50KTtcclxuICAgICAgICB0aGlzLnNlYXJjaFBhZ2UgPSBnZXQoXCIuanMtc2VhcmNoLWdyaWRcIiwgZG9jdW1lbnQpO1xyXG4gICAgICAgIHRoaXMucGFnZSA9IGdldChcIi5qcy1wYWdlXCIsIGRvY3VtZW50KTtcclxuXHJcbiAgICAgICAgdGhpcy5pdGVtQ2xpY2tlZCA9IGZhbHNlXHJcblxyXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG4gICAgICAgIHRoaXMudHJpZ2dlciA9IGdldChcIi5qcy1zZWFyY2gtdHJpZ2dlclwiKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kRXZlbnRzKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNJbnB1dEVtcHR5KHRoaXMuaW5wdXQudmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdHMuY2xhc3NMaXN0LnJlbW92ZShcImlzLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJlZGljdGl2ZVNlYXJjaCh0aGlzLmlucHV0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0cy5jbGFzc0xpc3QuYWRkKFwiaXMtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucmVzdWx0cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtQ2xpY2tlZCA9IHRydWVcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLnBhZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlucHV0ICE9PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlU2VhcmNoRHJvcGRvd24oKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy5pbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNpblwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0lucHV0RW1wdHkodGhpcy5pbnB1dC52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJlZGljdGl2ZVNlYXJjaCh0aGlzLmlucHV0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0cy5jbGFzc0xpc3QuYWRkKFwiaXMtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaFBhZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0U2VhcmNoQ29va2llKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlU2VhcmNoRHJvcGRvd24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVzdWx0cy5jbGFzc0xpc3QuY29udGFpbnMoXCJpcy1hY3RpdmVcIikgJiYgdGhpcy5pdGVtQ2xpY2tlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXN1bHRzLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1hY3RpdmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByZWRpY3RpdmVTZWFyY2gocXVlcnkpIHtcclxuICAgICAgICBjb25zdCBwcmVkaWN0aXZlU2VhcmNoID0gbmV3IFByZWRpY3RpdmVTZWFyY2goe1xyXG4gICAgICAgICAgICByZXNvdXJjZXM6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFtQcmVkaWN0aXZlU2VhcmNoLlRZUEVTLlBST0RVQ1RdLFxyXG4gICAgICAgICAgICAgICAgbGltaXQ6IDYsXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdW5hdmFpbGFibGVfcHJvZHVjdHM6IFByZWRpY3RpdmVTZWFyY2guVU5BVkFJTEFCTEVfUFJPRFVDVFMuSElERSwgICAgLy8gVW5jb21tZW50IHRvIGhpZGUgT09TIHByb2R1Y3RzXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFByZWRpY3RpdmVTZWFyY2guRklFTERTLlRJVExFLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQcmVkaWN0aXZlU2VhcmNoLkZJRUxEUy5WRU5ET1IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFByZWRpY3RpdmVTZWFyY2guRklFTERTLlBST0RVQ1RfVFlQRSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUHJlZGljdGl2ZVNlYXJjaC5GSUVMRFMuVkFSSUFOVFNfVElUTEUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFByZWRpY3RpdmVTZWFyY2guRklFTERTLlZBUklBTlRTX1NLVSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUHJlZGljdGl2ZVNlYXJjaC5GSUVMRFMuVkFSSUFOVFNfQkFSQ09ERSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUHJlZGljdGl2ZVNlYXJjaC5GSUVMRFMuVEFHLFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBTZXQgc3VjY2VzcyBldmVudCBsaXN0ZW5lclxyXG4gICAgICAgIHByZWRpY3RpdmVTZWFyY2gub24oXCJzdWNjZXNzXCIsIChzdWdnZXN0aW9ucykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0U3VnZ2VzdGlvbnMgPSBzdWdnZXN0aW9ucy5yZXNvdXJjZXMucmVzdWx0cy5wcm9kdWN0cztcclxuXHJcbiAgICAgICAgICAgIGlmIChwcm9kdWN0U3VnZ2VzdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hSZW5kZXIocHJvZHVjdFN1Z2dlc3Rpb25zKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0cy5pbm5lckhUTUwgPSBcIjxzcGFuPk5vIHN1Z2dlc3Rpb25zPC9zcGFuPlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFNldCBlcnJvciBldmVudCBsaXN0ZW5lclxyXG4gICAgICAgIHByZWRpY3RpdmVTZWFyY2gub24oXCJlcnJvclwiLCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIG1lc3NhZ2U6XCIsIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBTZW5kIHF1ZXJ5XHJcbiAgICAgICAgcHJlZGljdGl2ZVNlYXJjaC5xdWVyeShxdWVyeSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VhcmNoUmVuZGVyKHN1Z2dlc3Rpb25zKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdHMgPSBcIlwiO1xyXG4gICAgICAgIHN1Z2dlc3Rpb25zLmZvckVhY2goKHN1Z2dlc3Rpb24pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0ID0gd2luZG93LnRoZW1lLm1vbmV5Rm9ybWF0LmluY2x1ZGVzKFwie3thbW91bnRfbm9fZGVjaW1hbHN9fVwiKVxyXG4gICAgICAgICAgICAgICAgPyBcInt7YW1vdW50X25vX2RlY2ltYWxzfX1cIlxyXG4gICAgICAgICAgICAgICAgOiBcInt7YW1vdW50fX1cIjtcclxuICAgICAgICAgICAgbGV0IG1vbmV5UHJpY2UgPSB3aW5kb3cudGhlbWUubW9uZXlGb3JtYXQucmVwbGFjZShmb3JtYXQsIHN1Z2dlc3Rpb24ucHJpY2UpO1xyXG4gICAgICAgICAgICBzdWdnZXN0aW9uLnRhZ3MuZm9yRWFjaCh0YWcgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhZy5pbmNsdWRlcygnY29vZ2FyX2VucXVpcmUnKSkgbW9uZXlQcmljZSA9IG1vbmV5UHJpY2UucmVwbGFjZSgnwqMnLCAnJCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmVzdWx0cyArPSBgXHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiJHtzdWdnZXN0aW9uLnVybH1cIiBjbGFzcz1cImMtcHJvZHVjdC1jYXJkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHBpY3R1cmUgY2xhc3M9XCJjLXByb2R1Y3QtY2FyZF9faW1hZ2UgIGMtcHJvZHVjdC1jYXJkX19pbWFnZS0tc3VnZ2VzdGlvbiAgby1pbWdfX2ZyYW1lICBvLWFyLS1jYXJ0LWltYWdlICBqcy1pbWFnZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm8taW1nICBvLWltZy0tY292ZXIgIG8tYXJfX2l0ZW1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPVwiJHtzdWdnZXN0aW9uLmltYWdlfVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9XCIke3N1Z2dlc3Rpb24uaW1hZ2UuYWx0fVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nPVwibGF6eVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD1cIjEwMCVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PVwiMTAwJVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9waWN0dXJlPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjLXByb2R1Y3QtY2FyZF9fZGV0YWlscyAgYy1wcm9kdWN0LWNhcmRfX2RldGFpbHMtLXN1Z2dlc3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwidC1oZWFkaW5nIGMtcHJvZHVjdC1jYXJkX19kZXRhaWxzLXRpdGxlICB0LWZvbnQtc2l6ZS0tZXRhXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3N1Z2dlc3Rpb24udGl0bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiYy1wcm9kdWN0LWNhcmRfX3ByaWNlXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHttb25leVByaWNlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRzLmlubmVySFRNTCA9IHJlc3VsdHM7XHJcbiAgICB9XHJcblxyXG4gICAgaXNJbnB1dEVtcHR5KHN0cikge1xyXG4gICAgICAgIHJldHVybiAhc3RyIHx8IC9eXFxzKiQvLnRlc3Qoc3RyKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0U2VhcmNoQ29va2llKCkge1xyXG4gICAgICAgIGNvbnN0IHNlYXJjaFJlc3VsdHMgPSBnZXRBbGwoXCIuanMtcHJvZHVjdC1jYXJkXCIsIHRoaXMuc2VhcmNoUGFnZSk7XHJcblxyXG4gICAgICAgIHNlYXJjaFJlc3VsdHMuZm9yRWFjaCgoY2FyZCkgPT4ge1xyXG4gICAgICAgICAgICBjYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50VXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbiAgICAgICAgICAgICAgICBzZXRDb29raWUoXCJqcy1zZWFyY2gtY29va2llXCIsIGN1cnJlbnRVcmwsIDI4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHsgU2VhcmNoRm9ybSB9O1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0Q29va2llKGNuYW1lLCBjdmFsdWUsIGV4ZGF5cykge1xyXG4gICAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgZC5zZXRUaW1lKGQuZ2V0VGltZSgpICsgZXhkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCk7XHJcbiAgICB2YXIgZXhwaXJlcyA9IFwiZXhwaXJlcz1cIiArIGQudG9VVENTdHJpbmcoKTtcclxuICAgIGRvY3VtZW50LmNvb2tpZSA9IGNuYW1lICsgXCI9XCIgKyBjdmFsdWUgKyBcIjtcIiArIGV4cGlyZXMgKyBcIjtwYXRoPS9cIjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENvb2tpZShjbmFtZSkge1xyXG4gICAgdmFyIG5hbWUgPSBjbmFtZSArIFwiPVwiO1xyXG4gICAgdmFyIGNhID0gZG9jdW1lbnQuY29va2llLnNwbGl0KFwiO1wiKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2EubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgYyA9IGNhW2ldO1xyXG4gICAgICAgIHdoaWxlIChjLmNoYXJBdCgwKSA9PT0gXCIgXCIpIHtcclxuICAgICAgICAgICAgYyA9IGMuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYy5pbmRleE9mKG5hbWUpID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjLnN1YnN0cmluZyhuYW1lLmxlbmd0aCwgYy5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBcIlwiO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tDb29raWUoKSB7XHJcbiAgICB2YXIgdXNlciA9IGdldENvb2tpZShcInVzZXJuYW1lXCIpO1xyXG4gICAgaWYgKHVzZXIgIT09IFwiXCIpIHtcclxuICAgICAgICBhbGVydChcIldlbGNvbWUgYWdhaW4gXCIgKyB1c2VyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdXNlciA9IHByb21wdChcIlBsZWFzZSBlbnRlciB5b3VyIG5hbWU6XCIsIFwiXCIpO1xyXG4gICAgICAgIGlmICh1c2VyICE9IFwiXCIgJiYgdXNlciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHNldENvb2tpZShcInVzZXJuYW1lXCIsIHVzZXIsIDM2NSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJQcmVkaWN0aXZlU2VhcmNoIiwiZ2V0IiwiZ2V0QWxsIiwic2V0Q29va2llIiwiU2VhcmNoRm9ybSIsIkhUTUxFbGVtZW50IiwiY29uc3RydWN0b3IiLCJlbGVtZW50IiwiZm9ybSIsImlucHV0IiwicmVzdWx0cyIsInNlYXJjaFBhZ2UiLCJkb2N1bWVudCIsInBhZ2UiLCJpdGVtQ2xpY2tlZCIsImJpbmRFdmVudHMiLCJ0cmlnZ2VyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImlzSW5wdXRFbXB0eSIsInZhbHVlIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwicHJlZGljdGl2ZVNlYXJjaCIsImFkZCIsImFjdGl2ZUVsZW1lbnQiLCJjbG9zZVNlYXJjaERyb3Bkb3duIiwiaW5pdFNlYXJjaENvb2tpZSIsImNvbnRhaW5zIiwicXVlcnkiLCJyZXNvdXJjZXMiLCJ0eXBlIiwiVFlQRVMiLCJQUk9EVUNUIiwibGltaXQiLCJvcHRpb25zIiwiZmllbGRzIiwiRklFTERTIiwiVElUTEUiLCJWRU5ET1IiLCJQUk9EVUNUX1RZUEUiLCJWQVJJQU5UU19USVRMRSIsIlZBUklBTlRTX1NLVSIsIlZBUklBTlRTX0JBUkNPREUiLCJUQUciLCJvbiIsInN1Z2dlc3Rpb25zIiwicHJvZHVjdFN1Z2dlc3Rpb25zIiwicHJvZHVjdHMiLCJsZW5ndGgiLCJzZWFyY2hSZW5kZXIiLCJpbm5lckhUTUwiLCJlcnJvciIsImNvbnNvbGUiLCJtZXNzYWdlIiwiZm9yRWFjaCIsInN1Z2dlc3Rpb24iLCJmb3JtYXQiLCJ3aW5kb3ciLCJ0aGVtZSIsIm1vbmV5Rm9ybWF0IiwiaW5jbHVkZXMiLCJtb25leVByaWNlIiwicmVwbGFjZSIsInByaWNlIiwidGFncyIsInRhZyIsInVybCIsImltYWdlIiwiYWx0IiwidGl0bGUiLCJzdHIiLCJ0ZXN0Iiwic2VhcmNoUmVzdWx0cyIsImNhcmQiLCJjdXJyZW50VXJsIiwibG9jYXRpb24iLCJocmVmIiwiY25hbWUiLCJjdmFsdWUiLCJleGRheXMiLCJkIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwiZXhwaXJlcyIsInRvVVRDU3RyaW5nIiwiY29va2llIiwiZ2V0Q29va2llIiwibmFtZSIsImNhIiwic3BsaXQiLCJpIiwiYyIsImNoYXJBdCIsInN1YnN0cmluZyIsImluZGV4T2YiLCJjaGVja0Nvb2tpZSIsInVzZXIiLCJhbGVydCIsInByb21wdCJdLCJzb3VyY2VSb290IjoiIn0=