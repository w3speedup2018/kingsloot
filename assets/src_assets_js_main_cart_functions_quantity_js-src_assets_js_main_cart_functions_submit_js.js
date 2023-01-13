"use strict";
(self["webpackChunkjuno_shopify_template"] = self["webpackChunkjuno_shopify_template"] || []).push([["src_assets_js_main_cart_functions_quantity_js-src_assets_js_main_cart_functions_submit_js"],{

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

/***/ "./src/assets/js/main/cart/functions/quantity.js":
/*!*******************************************************!*\
  !*** ./src/assets/js/main/cart/functions/quantity.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Quantity": () => (/* binding */ Quantity)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");
/* harmony import */ var _utils_shopify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/shopify */ "./src/assets/js/utils/shopify.ts");



class Quantity {
  constructor(element, fetchCart) {
    this.cart = element;
    this.fetchCart = fetchCart;
    this.bindListener();
  }

  bindListener() {
    this.updateQty();
  }

  updateQty() {
    this.items = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)(".js-cart-item", this.cart);
    this.items.forEach(item => {
      const minusQty = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-qty-minus", item);
      const plusQty = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-qty-plus", item);
      const qty = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-qty-value", item);
      const variantId = qty.getAttribute("data-id");
      const custom_product = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".custom-product", item);
      const custom_font = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".p_variant_id", item);
      minusQty.addEventListener("click", () => {
        if (custom_product) {
          var status = false;
          var font_value = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".font_value", item).textContent;
          var letter_value = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".letter_value", item).textContent;
          this.items.forEach(item => {
            var font_card = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.p_variant_id', item);

            if (font_card) {
              var target_product = font_card.textContent.replace(/\n/g, "");
              var custom_font_value = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".font_value", item).textContent;
              var custom_letter_value = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".letter_value", item).textContent;
              var product_title = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".product_title", item).textContent.replace(/\n/g, "");

              if (variantId == target_product && font_value == custom_font_value && letter_value == custom_letter_value) {
                status = true;
                var qty_new = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-qty-value", item);
                var variantId_new = qty_new.getAttribute("data-id");

                if (qty_new.value >= 1) {
                  qty_new.value--;
                  (0,_utils_shopify__WEBPACK_IMPORTED_MODULE_1__.changeCartItem)({
                    id: variantId_new,
                    quantity: qty_new.value,
                    properties: {
                      product_title: product_title,
                      product_variant: +target_product,
                      font: custom_font_value.replace(/\n/g, ""),
                      letter: custom_letter_value.replace(/\n/g, "")
                    }
                  }).then(() => {
                    qty.value--;
                    (0,_utils_shopify__WEBPACK_IMPORTED_MODULE_1__.changeCartItem)({
                      id: variantId,
                      quantity: qty.value,
                      properties: {
                        customize_font: font_value.replace(/\n/g, ""),
                        customize_letter: letter_value.replace(/\n/g, "")
                      }
                    }).then(() => {
                      this.fetchCart();
                    }).catch(e => {
                      console.warn("Error with minusQuantity: ", e);
                    });
                  }).catch(e => {
                    console.warn("Error with minusQuantity: ", e);
                  });
                }
              }
            }
          });

          if (status == false) {
            this.fetchCart ? this.minusQuantity(variantId, qty, this.fetchCart) : this.minusQuantity(variantId, qty);
          }
        } else {
          this.fetchCart ? this.minusQuantity(variantId, qty, this.fetchCart) : this.minusQuantity(variantId, qty);
        } // BOLD PRICING


        if (window.BOLD && BOLD.common && BOLD.common.eventEmitter && typeof BOLD.common.eventEmitter.emit === "function") {
          BOLD.common.eventEmitter.emit("BOLD_COMMON_cart_loaded");
        }
      });
      plusQty.addEventListener("click", () => {
        if (custom_product) {
          var font_value = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".font_value", item).textContent;
          var letter_value = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".letter_value", item).textContent;
          this.items.forEach(item => {
            var font_card = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.p_variant_id', item);

            if (font_card) {
              var target_product = font_card.textContent.replace(/\n/g, "");
              var custom_font_value = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".font_value", item).textContent;
              var custom_letter_value = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".letter_value", item).textContent;
              var product_title = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".product_title", item).textContent.replace(/\n/g, "");

              if (variantId == target_product && font_value == custom_font_value && letter_value == custom_letter_value) {
                var qty_new = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-qty-value", item);
                var variantId_new = qty_new.getAttribute("data-id");

                if (qty_new.value >= 1) {
                  qty_new.value++;
                  (0,_utils_shopify__WEBPACK_IMPORTED_MODULE_1__.changeCartItem)({
                    id: variantId_new,
                    quantity: qty_new.value,
                    properties: {
                      product_title: product_title,
                      product_variant: +target_product,
                      font: custom_font_value.replace(/\n/g, ""),
                      letter: custom_letter_value.replace(/\n/g, "")
                    }
                  }).then(() => {
                    qty.value++;
                    (0,_utils_shopify__WEBPACK_IMPORTED_MODULE_1__.changeCartItem)({
                      id: variantId,
                      quantity: qty.value,
                      properties: {
                        customize_font: font_value.replace(/\n/g, ""),
                        customize_letter: letter_value.replace(/\n/g, "")
                      }
                    }).then(() => {
                      this.fetchCart();
                    }).catch(e => {
                      console.warn("Error with PlusQuantity: ", e);
                    });
                  }).catch(e => {
                    console.warn("Error with PlusQuantity: ", e);
                  });
                }
              }
            }
          });
        } else {
          this.fetchCart ? this.plusQuantity(variantId, qty, this.fetchCart) : this.plusQuantity(variantId, qty);
        } // BOLD PRICING


        if (window.BOLD && BOLD.common && BOLD.common.eventEmitter && typeof BOLD.common.eventEmitter.emit === "function") {
          BOLD.common.eventEmitter.emit("BOLD_COMMON_cart_loaded");
        }
      });
      qty.addEventListener("change", e => {
        this.fetchCart ? this.setQuantity(variantId, e.target.value, this.fetchCart) : this.setQuantity(variantId, e.target.value);
      });
    });
  }

  setQuantity(itemId, qty, fetchCart) {
    (0,_utils_shopify__WEBPACK_IMPORTED_MODULE_1__.changeCartItem)({
      id: itemId,
      quantity: qty
    }).then(() => {
      fetchCart ? fetchCart() : window.location.reload();
    }).catch(e => {
      console.warn("Error with setQuantity: ", e);
    });
  }

  plusQuantity(itemId, qtyElem, fetchCart) {
    qtyElem.value++;
    (0,_utils_shopify__WEBPACK_IMPORTED_MODULE_1__.changeCartItem)({
      id: itemId,
      quantity: qtyElem.value
    }).then(() => {
      fetchCart ? fetchCart() : window.location.reload();
    }).catch(e => {
      console.warn("Error with plusQuantity: ", e);
    });
  }

  minusQuantity(itemId, qtyElem, fetchCart) {
    if (qtyElem.value >= 1) {
      qtyElem.value--;
      (0,_utils_shopify__WEBPACK_IMPORTED_MODULE_1__.changeCartItem)({
        id: itemId,
        quantity: qtyElem.value
      }).then(() => {
        fetchCart ? fetchCart() : window.location.reload();
      }).catch(e => {
        console.warn("Error with minusQuantity: ", e);
      });
    }
  }

}



/***/ }),

/***/ "./src/assets/js/main/cart/functions/submit.js":
/*!*****************************************************!*\
  !*** ./src/assets/js/main/cart/functions/submit.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SubmitBtn": () => (/* binding */ SubmitBtn)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/fetch.ts");



class SubmitBtn {
  constructor(element, fetchCart) {
    this.bindListener = () => {
      this.items.forEach(item => {
        const submitbtn = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.get)('.js-product-form-submit', item);
        submitbtn.addEventListener('click', e => {
          e.preventDefault();
          var product_form = submitbtn.closest('.js-product-form');
          submitbtn.setAttribute("disabled", true);
          submitbtn.innerHTML = "Adding";
          this.submitData(product_form);
        });
      });
    };

    this.cart = element;
    this.items = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getAll)(".upsell_section_product", this.cart);
    this.fetchCart = fetchCart;
    this.bindListener();
  }

  submitData(ProductForm) {
    var btn = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.get)(".js-product-form-submit", this.cart);
    const body = JSON.stringify((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, JSON.parse((0,_utils__WEBPACK_IMPORTED_MODULE_2__.serializeForm)(ProductForm)), {
      sections_url: window.location.pathname
    }));
    fetch(`${routes.cart_add_url}`, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, (0,_utils__WEBPACK_IMPORTED_MODULE_2__.fetchConfig)("javascript"), {
      body
    })).then(response => response.json()).then(() => this.fetchCart()).catch(e => console.error(e)).finally(() => {
      btn.innerHTML = "Added";
    });
  }

}



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL3NyY19hc3NldHNfanNfbWFpbl9jYXJ0X2Z1bmN0aW9uc19xdWFudGl0eV9qcy1zcmNfYXNzZXRzX2pzX21haW5fY2FydF9mdW5jdGlvbnNfc3VibWl0X2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLFFBQVE7O0FBRWhDO0FBQ0E7QUFDQSxZQUFZLGVBQWU7QUFDM0I7QUFDQSxZQUFZLFFBQVE7QUFDcEIsWUFBWSxRQUFRO0FBQ3BCO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixFQUFFLGFBQWEsRUFBRTtBQUMvQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakVBO0FBQ0E7O0FBRUEsTUFBTUcsUUFBTixDQUFlO0VBQ1hDLFdBQVcsQ0FBQ0MsT0FBRCxFQUFVQyxTQUFWLEVBQXFCO0lBQzVCLEtBQUtDLElBQUwsR0FBWUYsT0FBWjtJQUNBLEtBQUtDLFNBQUwsR0FBaUJBLFNBQWpCO0lBQ0EsS0FBS0UsWUFBTDtFQUNIOztFQUVEQSxZQUFZLEdBQUc7SUFDWCxLQUFLQyxTQUFMO0VBQ0g7O0VBRURBLFNBQVMsR0FBRztJQUNSLEtBQUtDLEtBQUwsR0FBYVQsOENBQU0sQ0FBQyxlQUFELEVBQWtCLEtBQUtNLElBQXZCLENBQW5CO0lBRUEsS0FBS0csS0FBTCxDQUFXQyxPQUFYLENBQW9CQyxJQUFELElBQVU7TUFDekIsTUFBTUMsUUFBUSxHQUFHYiwyQ0FBRyxDQUFDLGVBQUQsRUFBa0JZLElB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akQsUUFBUSxHQUFHLE1BQU1ILEtBQUssQ0FBRSxHQUFFeUMsT0FBUSxFQUFaLENBQUwsQ0FBb0IvRSxJQUFwQixDQUEwQjJGLEdBQUQsSUFBU0EsR0FBRyxDQUFDQyxJQUFKLEVBQWxDLENBQXZCO01BQ0EsTUFBTUMsR0FBRyxHQUFHaEIsTUFBTSxDQUFDaUIsZUFBUCxDQUF1QnJELFFBQXZCLEVBQWlDLFdBQWpDLENBQVo7TUFDQSxNQUFNc0Qsb0JBQW9CLEdBQUdGLEdBQUcsQ0FBQ0csYUFBSixDQUFrQixnQkFBbEIsQ0FBN0I7TUFDQSxPQUFPL0QsSUFBSSxDQUFDRSxLQUFMLENBQVc0RCxvQkFBb0IsQ0FBQ25FLFNBQWhDLENBQVA7SUFDSCxDQUxELEdBREo7RUFRSDs7RUFFRCxPQUFPcUUsT0FBTyxDQUFDQyxHQUFSLENBQVlkLFFBQVosRUFBc0JwRixJQUF0QixDQUE0QjJGLEdBQUQsSUFDOUJBLEdBQUcsQ0FBQ1EsTUFBSixDQUFXLENBQUNDLEdBQUQsRUFBTUMsSUFBTix3RkFBcUJELEdBQXJCLEVBQTZCQyxJQUE3QixDQUFYLEVBQWlELEVBQWpELENBREcsQ0FBUDtBQUdIOzs7Ozs7Ozs7Ozs7OztBQzFHYztBQUNmO0FBQ0Esb0JBQW9CLHNCQUFzQjtBQUMxQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvQHNob3BpZnkvdGhlbWUtY3VycmVuY3kvY3VycmVuY3kuanMiLCJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vc3JjL2Fzc2V0cy9qcy9tYWluL2NhcnQvZnVuY3Rpb25zL3F1YW50aXR5LmpzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvbWFpbi9jYXJ0L2Z1bmN0aW9ucy9zdWJtaXQuanMiLCJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vc3JjL2Fzc2V0cy9qcy91dGlscy9mZXRjaC50cyIsIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL3V0aWxzL3Nob3BpZnkudHMiLCJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDdXJyZW5jeSBIZWxwZXJzXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQSBjb2xsZWN0aW9uIG9mIHVzZWZ1bCBmdW5jdGlvbnMgdGhhdCBoZWxwIHdpdGggY3VycmVuY3kgZm9ybWF0dGluZ1xuICpcbiAqIEN1cnJlbnQgY29udGVudHNcbiAqIC0gZm9ybWF0TW9uZXkgLSBUYWtlcyBhbiBhbW91bnQgaW4gY2VudHMgYW5kIHJldHVybnMgaXQgYXMgYSBmb3JtYXR0ZWQgZG9sbGFyIHZhbHVlLlxuICpcbiAqL1xuXG5jb25zdCBtb25leUZvcm1hdCA9ICcke3thbW91bnR9fSc7XG5cbi8qKlxuICogRm9ybWF0IG1vbmV5IHZhbHVlcyBiYXNlZCBvbiB5b3VyIHNob3AgY3VycmVuY3kgc2V0dGluZ3NcbiAqIEBwYXJhbSAge051bWJlcnxzdHJpbmd9IGNlbnRzIC0gdmFsdWUgaW4gY2VudHMgb3IgZG9sbGFyIGFtb3VudCBlLmcuIDMwMCBjZW50c1xuICogb3IgMy4wMCBkb2xsYXJzXG4gKiBAcGFyYW0gIHtTdHJpbmd9IGZvcm1hdCAtIHNob3AgbW9uZXlfZm9ybWF0IHNldHRpbmdcbiAqIEByZXR1cm4ge1N0cmluZ30gdmFsdWUgLSBmb3JtYXR0ZWQgdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdE1vbmV5KGNlbnRzLCBmb3JtYXQpIHtcbiAgaWYgKHR5cGVvZiBjZW50cyA9PT0gJ3N0cmluZycpIHtcbiAgICBjZW50cyA9IGNlbnRzLnJlcGxhY2UoJy4nLCAnJyk7XG4gIH1cbiAgbGV0IHZhbHVlID0gJyc7XG4gIGNvbnN0IHBsYWNlaG9sZGVyUmVnZXggPSAvXFx7XFx7XFxzKihcXHcrKVxccypcXH1cXH0vO1xuICBjb25zdCBmb3JtYXRTdHJpbmcgPSBmb3JtYXQgfHwgbW9uZXlGb3JtYXQ7XG5cbiAgZnVuY3Rpb24gZm9ybWF0V2l0aERlbGltaXRlcnMoXG4gICAgbnVtYmVyLFxuICAgIHByZWNpc2lvbiA9IDIsXG4gICAgdGhvdXNhbmRzID0gJywnLFxuICAgIGRlY2ltYWwgPSAnLidcbiAgKSB7XG4gICAgaWYgKGlzTmFOKG51bWJlcikgfHwgbnVtYmVyID09IG51bGwpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIG51bWJlciA9IChudW1iZXIgLyAxMDAuMCkudG9GaXhlZChwcmVjaXNpb24pO1xuXG4gICAgY29uc3QgcGFydHMgPSBudW1iZXIuc3BsaXQoJy4nKTtcbiAgICBjb25zdCBkb2xsYXJzQW1vdW50ID0gcGFydHNbMF0ucmVwbGFjZShcbiAgICAgIC8oXFxkKSg/PShcXGRcXGRcXGQpKyg/IVxcZCkpL2csXG4gICAgICBgJDEke3Rob3VzYW5kc31gXG4gICAgKTtcbiAgICBjb25zdCBjZW50c0Ftb3VudCA9IHBhcnRzWzFdID8gZGVjaW1hbCArIHBhcnRzWzFdIDogJyc7XG5cbiAgICByZXR1cm4gZG9sbGFyc0Ftb3VudCArIGNlbnRzQW1vdW50O1xuICB9XG5cbiAgc3dpdGNoIChmb3JtYXRTdHJpbmcubWF0Y2gocGxhY2Vob2xkZXJSZWdleClbMV0pIHtcbiAgICBjYXNlICdhbW91bnQnOlxuICAgICAgdmFsdWUgPSBmb3JtYXRXaXRoRGVsaW1pdGVycyhjZW50cywgMik7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdhbW91bnRfbm9fZGVjaW1hbHMnOlxuICAgICAgdmFsdWUgPSBmb3JtYXRXaXRoRGVsaW1pdGVycyhjZW50cywgMCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdhbW91bnRfd2l0aF9jb21tYV9zZXBhcmF0b3InOlxuICAgICAgdmFsdWUgPSBmb3JtYXRXaXRoRGVsaW1pdGVycyhjZW50cywgMiwgJy4nLCAnLCcpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYW1vdW50X25vX2RlY2ltYWxzX3dpdGhfY29tbWFfc2VwYXJhdG9yJzpcbiAgICAgIHZhbHVlID0gZm9ybWF0V2l0aERlbGltaXRlcnMoY2VudHMsIDAsICcuJywgJywnKTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIGZvcm1hdFN0cmluZy5yZXBsYWNlKHBsYWNlaG9sZGVyUmVnZXgsIHZhbHVlKTtcbn1cbiIsImltcG9ydCB7IGdldCwgZ2V0QWxsIH0gZnJvbSBcIkAvdXRpbHNcIjtcclxuaW1wb3J0IHsgY2hhbmdlQ2FydEl0ZW0gfSBmcm9tIFwiQC91dGlscy9zaG9waWZ5XCI7XHJcblxyXG5jbGFzcyBRdWFudGl0eSB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBmZXRjaENhcnQpIHtcclxuICAgICAgICB0aGlzLmNhcnQgPSBlbGVtZW50O1xyXG4gICAgICAgIHRoaXMuZmV0Y2hDYXJ0ID0gZmV0Y2hDYXJ0O1xyXG4gICAgICAgIHRoaXMuYmluZExpc3RlbmVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZExpc3RlbmVyKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlUXR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUXR5KCkge1xyXG4gICAgICAgIHRoaXMuaXRlbXMgPSBnZXRBbGwoXCIuanMtY2FydC1pdGVtXCIsIHRoaXMuY2FydCk7XHJcblxyXG4gICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtaW51c1F0eSA9IGdldChcIi5qcy1xdHktbWludXNcIiwgaXRlbSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBsdXNRdHkgPSBnZXQoXCIuanMtcXR5LXBsdXNcIiwgaXRlbSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHF0eSA9IGdldChcIi5qcy1xdHktdmFsdWVcIiwgaXRlbSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhcmlhbnRJZCA9IHF0eS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBjdXN0b21fcHJvZHVjdCA9IGdldChcIi5jdXN0b20tcHJvZHVjdFwiLCBpdGVtKTtcclxuICAgICAgICAgICAgY29uc3QgY3VzdG9tX2ZvbnQgPSBnZXQoXCIucF92YXJpYW50X2lkXCIsIGl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgbWludXNRdHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGN1c3RvbV9wcm9kdWN0KXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvbnRfdmFsdWUgPSBnZXQoXCIuZm9udF92YWx1ZVwiLCBpdGVtKS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGV0dGVyX3ZhbHVlID1nZXQoXCIubGV0dGVyX3ZhbHVlXCIsIGl0ZW0pLnRleHRDb250ZW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvbnRfY2FyZCA9IGdldCgnLnBfdmFyaWFudF9pZCcsIGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihmb250X2NhcmQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldF9wcm9kdWN0ID0gZm9udF9jYXJkLnRleHRDb250ZW50LnJlcGxhY2UoL1xcbi9nLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXN0b21fZm9udF92YWx1ZSA9IGdldChcIi5mb250X3ZhbHVlXCIsIGl0ZW0pLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1c3RvbV9sZXR0ZXJfdmFsdWUgPWdldChcIi5sZXR0ZXJfdmFsdWVcIiwgaXRlbSkudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvZHVjdF90aXRsZT1nZXQoXCIucHJvZHVjdF90aXRsZVwiLCBpdGVtKS50ZXh0Q29udGVudC5yZXBsYWNlKC9cXG4vZywgXCJcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodmFyaWFudElkID09IHRhcmdldF9wcm9kdWN0ICYmIGZvbnRfdmFsdWUgPT0gY3VzdG9tX2ZvbnRfdmFsdWUgJiYgbGV0dGVyX3ZhbHVlID09IGN1c3RvbV9sZXR0ZXJfdmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cz0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcXR5X25ldyA9IGdldChcIi5qcy1xdHktdmFsdWVcIiwgaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhcmlhbnRJZF9uZXcgPSBxdHlfbmV3LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdHlfbmV3LnZhbHVlID49IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXR5X25ldy52YWx1ZS0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VDYXJ0SXRlbSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogdmFyaWFudElkX25ldyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1YW50aXR5OiBxdHlfbmV3LnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczogeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0X3RpdGxlOiBwcm9kdWN0X3RpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RfdmFyaWFudCA6ICt0YXJnZXRfcHJvZHVjdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250OiBjdXN0b21fZm9udF92YWx1ZS5yZXBsYWNlKC9cXG4vZywgXCJcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyOiBjdXN0b21fbGV0dGVyX3ZhbHVlLnJlcGxhY2UoL1xcbi9nLCBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdHkudmFsdWUtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZUNhcnRJdGVtKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogdmFyaWFudElkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1YW50aXR5OiBxdHkudmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczogeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9taXplX2ZvbnQ6IGZvbnRfdmFsdWUucmVwbGFjZSgvXFxuL2csIFwiXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21pemVfbGV0dGVyOiBsZXR0ZXJfdmFsdWUucmVwbGFjZSgvXFxuL2csIFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZldGNoQ2FydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkVycm9yIHdpdGggbWludXNRdWFudGl0eTogXCIsIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiRXJyb3Igd2l0aCBtaW51c1F1YW50aXR5OiBcIiwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3RhdHVzID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mZXRjaENhcnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLm1pbnVzUXVhbnRpdHkodmFyaWFudElkLCBxdHksIHRoaXMuZmV0Y2hDYXJ0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMubWludXNRdWFudGl0eSh2YXJpYW50SWQsIHF0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mZXRjaENhcnRcclxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMubWludXNRdWFudGl0eSh2YXJpYW50SWQsIHF0eSwgdGhpcy5mZXRjaENhcnQpXHJcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLm1pbnVzUXVhbnRpdHkodmFyaWFudElkLCBxdHkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBCT0xEIFBSSUNJTkdcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuQk9MRCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIEJPTEQuY29tbW9uICYmXHJcbiAgICAgICAgICAgICAgICAgICAgQk9MRC5jb21tb24uZXZlbnRFbWl0dGVyICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIEJPTEQuY29tbW9uLmV2ZW50RW1pdHRlci5lbWl0ID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgIEJPTEQuY29tbW9uLmV2ZW50RW1pdHRlci5lbWl0KFwiQk9MRF9DT01NT05fY2FydF9sb2FkZWRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcGx1c1F0eS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoY3VzdG9tX3Byb2R1Y3Qpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmb250X3ZhbHVlID0gZ2V0KFwiLmZvbnRfdmFsdWVcIiwgaXRlbSkudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxldHRlcl92YWx1ZSA9Z2V0KFwiLmxldHRlcl92YWx1ZVwiLCBpdGVtKS50ZXh0Q29udGVudDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb250X2NhcmQgPSBnZXQoJy5wX3ZhcmlhbnRfaWQnLCBpdGVtKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZvbnRfY2FyZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0X3Byb2R1Y3QgPSBmb250X2NhcmQudGV4dENvbnRlbnQucmVwbGFjZSgvXFxuL2csIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1c3RvbV9mb250X3ZhbHVlID0gZ2V0KFwiLmZvbnRfdmFsdWVcIiwgaXRlbSkudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VzdG9tX2xldHRlcl92YWx1ZSA9Z2V0KFwiLmxldHRlcl92YWx1ZVwiLCBpdGVtKS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9kdWN0X3RpdGxlPWdldChcIi5wcm9kdWN0X3RpdGxlXCIsIGl0ZW0pLnRleHRDb250ZW50LnJlcGxhY2UoL1xcbi9nLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHZhcmlhbnRJZCA9PSB0YXJnZXRfcHJvZHVjdCAmJiBmb250X3ZhbHVlID09IGN1c3RvbV9mb250X3ZhbHVlICYmIGxldHRlcl92YWx1ZSA9PSBjdXN0b21fbGV0dGVyX3ZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcXR5X25ldyA9IGdldChcIi5qcy1xdHktdmFsdWVcIiwgaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhcmlhbnRJZF9uZXcgPSBxdHlfbmV3LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF0eV9uZXcudmFsdWUgPj0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdHlfbmV3LnZhbHVlKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZUNhcnRJdGVtKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB2YXJpYW50SWRfbmV3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVhbnRpdHk6IHF0eV9uZXcudmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RfdGl0bGU6IHByb2R1Y3RfdGl0bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF92YXJpYW50IDogK3RhcmdldF9wcm9kdWN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQ6IGN1c3RvbV9mb250X3ZhbHVlLnJlcGxhY2UoL1xcbi9nLCBcIlwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXI6IGN1c3RvbV9sZXR0ZXJfdmFsdWUucmVwbGFjZSgvXFxuL2csIFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF0eS52YWx1ZSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlQ2FydEl0ZW0oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB2YXJpYW50SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVhbnRpdHk6IHF0eS52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21pemVfZm9udDogZm9udF92YWx1ZS5yZXBsYWNlKC9cXG4vZywgXCJcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbWl6ZV9sZXR0ZXI6IGxldHRlcl92YWx1ZS5yZXBsYWNlKC9cXG4vZywgXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hDYXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiRXJyb3Igd2l0aCBQbHVzUXVhbnRpdHk6IFwiLCBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkVycm9yIHdpdGggUGx1c1F1YW50aXR5OiBcIiwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hDYXJ0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5wbHVzUXVhbnRpdHkodmFyaWFudElkLCBxdHksIHRoaXMuZmV0Y2hDYXJ0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMucGx1c1F1YW50aXR5KHZhcmlhbnRJZCwgcXR5KTtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gQk9MRCBQUklDSU5HXHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LkJPTEQgJiZcclxuICAgICAgICAgICAgICAgICAgICBCT0xELmNvbW1vbiAmJlxyXG4gICAgICAgICAgICAgICAgICAgIEJPTEQuY29tbW9uLmV2ZW50RW1pdHRlciAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiBCT0xELmNvbW1vbi5ldmVudEVtaXR0ZXIuZW1pdCA9PT0gXCJmdW5jdGlvblwiXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICBCT0xELmNvbW1vbi5ldmVudEVtaXR0ZXIuZW1pdChcIkJPTERfQ09NTU9OX2NhcnRfbG9hZGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHF0eS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZldGNoQ2FydFxyXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5zZXRRdWFudGl0eSh2YXJpYW50SWQsIGUudGFyZ2V0LnZhbHVlLCB0aGlzLmZldGNoQ2FydClcclxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuc2V0UXVhbnRpdHkodmFyaWFudElkLCBlLnRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFF1YW50aXR5KGl0ZW1JZCwgcXR5LCBmZXRjaENhcnQpIHtcclxuICAgICAgICBjaGFuZ2VDYXJ0SXRlbSh7XHJcbiAgICAgICAgICAgIGlkOiBpdGVtSWQsXHJcbiAgICAgICAgICAgIHF1YW50aXR5OiBxdHksXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZmV0Y2hDYXJ0ID8gZmV0Y2hDYXJ0KCkgOiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiRXJyb3Igd2l0aCBzZXRRdWFudGl0eTogXCIsIGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwbHVzUXVhbnRpdHkoaXRlbUlkLCBxdHlFbGVtLCBmZXRjaENhcnQpIHtcclxuICAgICAgICBxdHlFbGVtLnZhbHVlKys7XHJcbiAgICAgICAgY2hhbmdlQ2FydEl0ZW0oe1xyXG4gICAgICAgICAgICBpZDogaXRlbUlkLFxyXG4gICAgICAgICAgICBxdWFudGl0eTogcXR5RWxlbS52YWx1ZSxcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmZXRjaENhcnQgPyBmZXRjaENhcnQoKSA6IHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJFcnJvciB3aXRoIHBsdXNRdWFudGl0eTogXCIsIGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBtaW51c1F1YW50aXR5KGl0ZW1JZCwgcXR5RWxlbSwgZmV0Y2hDYXJ0KSB7XHJcbiAgICAgICAgaWYgKHF0eUVsZW0udmFsdWUgPj0gMSkge1xyXG4gICAgICAgICAgICBxdHlFbGVtLnZhbHVlLS07XHJcbiAgICAgICAgICAgIGNoYW5nZUNhcnRJdGVtKHtcclxuICAgICAgICAgICAgICAgIGlkOiBpdGVtSWQsXHJcbiAgICAgICAgICAgICAgICBxdWFudGl0eTogcXR5RWxlbS52YWx1ZSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmZXRjaENhcnQgPyBmZXRjaENhcnQoKSA6IHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJFcnJvciB3aXRoIG1pbnVzUXVhbnRpdHk6IFwiLCBlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgUXVhbnRpdHkgfTtcclxuIiwiaW1wb3J0IHsgZ2V0LCBnZXRBbGwsIHNlcmlhbGl6ZUZvcm0sIGZldGNoQ29uZmlnIH0gZnJvbSBcIkAvdXRpbHNcIjtcclxuXHJcbmNsYXNzIFN1Ym1pdEJ0biB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBmZXRjaENhcnQpIHtcclxuICAgICAgICB0aGlzLmNhcnQgPSBlbGVtZW50O1xyXG4gICAgICAgIHRoaXMuaXRlbXMgPSBnZXRBbGwoXCIudXBzZWxsX3NlY3Rpb25fcHJvZHVjdFwiLCB0aGlzLmNhcnQpO1xyXG4gICAgICAgIHRoaXMuZmV0Y2hDYXJ0ID0gZmV0Y2hDYXJ0O1xyXG4gICAgICAgIHRoaXMuYmluZExpc3RlbmVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZExpc3RlbmVyID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgIGNvbnN0IHN1Ym1pdGJ0biA9ICBnZXQoJy5qcy1wcm9kdWN0LWZvcm0tc3VibWl0JywgaXRlbSk7XHJcbiAgICAgICBcclxuICAgICAgICAgICBzdWJtaXRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb2R1Y3RfZm9ybSA9IHN1Ym1pdGJ0bi5jbG9zZXN0KCcuanMtcHJvZHVjdC1mb3JtJyk7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRidG4uc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRidG4uaW5uZXJIVE1MID0gXCJBZGRpbmdcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3VibWl0RGF0YShwcm9kdWN0X2Zvcm0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgc3VibWl0RGF0YShQcm9kdWN0Rm9ybSkge1xyXG4gICAgICAgIHZhciBidG4gPSBnZXQoXCIuanMtcHJvZHVjdC1mb3JtLXN1Ym1pdFwiLCB0aGlzLmNhcnQpO1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIC4uLkpTT04ucGFyc2Uoc2VyaWFsaXplRm9ybShQcm9kdWN0Rm9ybSkpLFxyXG4gICAgICAgICAgICBzZWN0aW9uc191cmw6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZmV0Y2goYCR7cm91dGVzLmNhcnRfYWRkX3VybH1gLCB7IC4uLmZldGNoQ29uZmlnKFwiamF2YXNjcmlwdFwiKSwgYm9keSB9KVxyXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5mZXRjaENhcnQoKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlKSA9PiBjb25zb2xlLmVycm9yKGUpKVxyXG4gICAgICAgICAgICAuZmluYWxseSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBidG4uaW5uZXJIVE1MID0gXCJBZGRlZFwiO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgXHJcbn1cclxuXHJcbmV4cG9ydCB7IFN1Ym1pdEJ0biB9O1xyXG4iLCJleHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplRm9ybShmb3JtKSB7XHJcbiAgICBjb25zdCBvYmogPSB7fTtcclxuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xyXG4gICAgZm9yIChjb25zdCBrZXkgb2YgZm9ybURhdGEua2V5cygpKSB7XHJcbiAgICAgICAgb2JqW2tleV0gPSBmb3JtRGF0YS5nZXQoa2V5KTtcclxuICAgIH1cclxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hDb25maWcodHlwZSA9IFwianNvblwiKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgQWNjZXB0OiBgYXBwbGljYXRpb24vJHt0eXBlfWAsXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbn1cclxuIiwiLyogZXNsaW50LWRpc2FibGUgKi9cclxuaW1wb3J0ICogYXMgY3VycmVuY3kgZnJvbSBcIkBzaG9waWZ5L3RoZW1lLWN1cnJlbmN5XCI7XHJcblxyXG4vLyBFVkVOVFNcclxuXHJcbmV4cG9ydCBjb25zdCBDVVJSRU5DWV9DSEFOR0VfRVZFTlQgPSBcIkNVUlJFTkNZX0NIQU5HRURcIjtcclxuXHJcbi8vIEZPUk1BVCBNT05FWVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdE1vbmV5KHsgbW9uZXksIGZvcm1hdCB9OiB7IG1vbmV5OiBudW1iZXI7IGZvcm1hdD86IHN0cmluZyB9KSB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdy5BQ1NDdXJyZW5jeT8uZm9ybWF0TW9uZXkgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIGNvbnN0IHJlZiA9IHdpbmRvdy5BQ1NDdXJyZW5jeTtcclxuICAgICAgICBjb25zdCBjb252ZXJ0ZWRNb25leSA9IHJlZi5jb252ZXJ0KG1vbmV5LCBcIkdCUFwiLCByZWYuY3VycmVudEN1cnJlbmN5KTtcclxuICAgICAgICByZXR1cm4gcmVmLmZvcm1hdE1vbmV5KFxyXG4gICAgICAgICAgICBOdW1iZXIuaXNOYU4oY29udmVydGVkTW9uZXkpID8gbW9uZXkgOiBjb252ZXJ0ZWRNb25leSxcclxuICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxyXG4gICAgICAgICAgICBmb3JtYXQgfHwgcmVmLm1vbmV5Rm9ybWF0c1tyZWYuY3VycmVudEN1cnJlbmN5XT8ubW9uZXlfZm9ybWF0IHx8IHdpbmRvdy5zaG9wTW9uZXlGb3JtYXRcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcclxuICAgIHJldHVybiBjdXJyZW5jeS5mb3JtYXRNb25leShtb25leSwgZm9ybWF0IHx8IHdpbmRvdy5zaG9wTW9uZXlGb3JtYXQpO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2xlYXJDYXJ0KCkge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiL2NhcnQvY2xlYXIuanNcIiwgeyBtZXRob2Q6IFwiUE9TVFwiIH0pO1xyXG59XHJcblxyXG4vLyBBREQgVE8gQ0FSVFxyXG50eXBlIEFkZFRvQ2FydERhdGEgPSB7IGlkOiBudW1iZXI7IHF1YW50aXR5OiBudW1iZXIgfSB8IHsgbGluZTogbnVtYmVyOyBxdWFudGl0eTogbnVtYmVyIH07XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkVG9DYXJ0KGRhdGE6IEFkZFRvQ2FydERhdGFbXSkge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiL2NhcnQvYWRkLmpzXCIsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGl0ZW1zOiBkYXRhIH0pLFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vICBVUERBVEUgQ0FSVFxyXG50eXBlIFVwZGF0ZUNhcnREYXRhID0gUmVjb3JkPHN0cmluZywgbnVtYmVyPjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVDYXJ0KGRhdGE6IFVwZGF0ZUNhcnREYXRhKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCIvY2FydC91cGRhdGUuanNcIiwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdXBkYXRlczogZGF0YSB9KSxcclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyBDSEFOR0UgQ0FSVCBJVEVNXHJcblxyXG50eXBlIENoYW5nZUNhcnRJdGVtID0gUmVjb3JkPHN0cmluZywgbnVtYmVyPjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGFuZ2VDYXJ0SXRlbShkYXRhOiBDaGFuZ2VDYXJ0SXRlbSkge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiL2NhcnQvY2hhbmdlLmpzXCIsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyBHRVQgUFJPRFVDVFNcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUHJvZHVjdEluZm8ge1xyXG4gICAgYXZhaWxhYmxlOiBib29sZWFuO1xyXG4gICAgcHJpY2U6IG51bWJlcjtcclxuICAgIHZhcmlhbnRzOiBSZWNvcmQ8XHJcbiAgICAgICAgbnVtYmVyLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYXZhaWxhYmxlOiBib29sZWFuO1xyXG4gICAgICAgICAgICBpbnZlbnRvcnlRdWFudGl0eTogbnVtYmVyIHwgbnVsbDtcclxuICAgICAgICB9XHJcbiAgICA+O1xyXG4gICAgY29tcGFyZUF0UHJpY2U/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQcm9kdWN0c0luZm8oaGFuZGxlczogc3RyaW5nW10pOiBQcm9taXNlPFJlY29yZDxudW1iZXIsIFByb2R1Y3RJbmZvPj4ge1xyXG4gICAgY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xyXG4gICAgY29uc3QgQVBJX1VSTCA9IG5ldyBVUkwoXCIvc2VhcmNoXCIsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xyXG4gICAgQVBJX1VSTC5zZWFyY2hQYXJhbXMuc2V0KFwic2VjdGlvbl9pZFwiLCBcImpzb24tcHJvZHVjdHNcIik7XHJcblxyXG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcclxuICAgIGNvbnN0IGhhbmRsZXNDb3B5ID0gWy4uLmhhbmRsZXNdO1xyXG4gICAgd2hpbGUgKGhhbmRsZXNDb3B5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICBjb25zdCBjaHVuayA9IGhhbmRsZXNDb3B5LnNwbGljZSgwLCAxNSk7XHJcbiAgICAgICAgQVBJX1VSTC5zZWFyY2hQYXJhbXMuc2V0KFwicVwiLCBjaHVuay5qb2luKFwiLFwiKSk7XHJcbiAgICAgICAgcHJvbWlzZXMucHVzaChcclxuICAgICAgICAgICAgKGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QVBJX1VSTH1gKS50aGVuKChyZXMpID0+IHJlcy50ZXh0KCkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgRE9NID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhyZXNwb25zZSwgXCJ0ZXh0L2h0bWxcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0c1Jlc3BvbnNlSFRNTCA9IERPTS5xdWVyeVNlbGVjdG9yKFwiI3Byb2R1Y3RzLWRhdGFcIikhO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocHJvZHVjdHNSZXNwb25zZUhUTUwuaW5uZXJIVE1MKTtcclxuICAgICAgICAgICAgfSkoKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKChyZXMpID0+XHJcbiAgICAgICAgcmVzLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiAoeyAuLi5hY2MsIC4uLmN1cnIgfSksIHt9KVxyXG4gICAgKTtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduID8gT2JqZWN0LmFzc2lnbi5iaW5kKCkgOiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59Il0sIm5hbWVzIjpbImdldCIsImdldEFsbCIsImNoYW5nZUNhcnRJdGVtIiwiUXVhbnRpdHkiLCJjb25zdHJ1Y3RvciIsImVsZW1lbnQiLCJmZXRjaENhcnQiLCJjYXJ0IiwiYmluZExpc3RlbmVyIiwidXBkYXRlUXR5IiwiaXRlbXMiLCJmb3JFYWNoIiwiaXRlbSIsIm1pbnVzUXR5IiwicGx1c1F0eSIsInF0eSIsInZhcmlhbnRJZCIsImdldEF0dHJpYnV0ZSIsImN1c3RvbV9wcm9kdWN0IiwiY3VzdG9tX2ZvbnQiLCJhZGRFdmVudExpc3RlbmVyIiwic3RhdHVzIiwiZm9udF92YWx1ZSIsInRleHRDb250ZW50IiwibGV0dGVyX3ZhbHVlIiwiZm9udF9jYXJkIiwidGFyZ2V0X3Byb2R1Y3QiLCJyZXBsYWNlIiwiY3VzdG9tX2ZvbnRfdmFsdWUiLCJjdXN0b21fbGV0dGVyX3ZhbHVlIiwicHJvZHVjdF90aXRsZSIsInF0eV9uZXciLCJ2YXJpYW50SWRfbmV3IiwidmFsdWUiLCJpZCIsInF1YW50aXR5IiwicHJvcGVydGllcyIsInByb2R1Y3RfdmFyaWFudCIsImZvbnQiLCJsZXR0ZXIiLCJ0aGVuIiwiY3VzdG9taXplX2ZvbnQiLCJjdXN0b21pemVfbGV0dGVyIiwiY2F0Y2giLCJlIiwiY29uc29sZSIsIndhcm4iLCJtaW51c1F1YW50aXR5Iiwid2luZG93IiwiQk9MRCIsImNvbW1vbiIsImV2ZW50RW1pdHRlciIsImVtaXQiLCJwbHVzUXVhbnRpdHkiLCJzZXRRdWFudGl0eSIsInRhcmdldCIsIml0ZW1JZCIsImxvY2F0aW9uIiwicmVsb2FkIiwicXR5RWxlbSIsInNlcmlhbGl6ZUZvcm0iLCJmZXRjaENvbmZpZyIsIlN1Ym1pdEJ0biIsInN1Ym1pdGJ0biIsInByZXZlbnREZWZhdWx0IiwicHJvZHVjdF9mb3JtIiwiY2xvc2VzdCIsInNldEF0dHJpYnV0ZSIsImlubmVySFRNTCIsInN1Ym1pdERhdGEiLCJQcm9kdWN0Rm9ybSIsImJ0biIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicGFyc2UiLCJzZWN0aW9uc191cmwiLCJwYXRobmFtZSIsImZldGNoIiwicm91dGVzIiwiY2FydF9hZGRfdXJsIiwicmVzcG9uc2UiLCJqc29uIiwiZXJyb3IiLCJmaW5hbGx5IiwiZm9ybSIsIm9iaiIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJrZXkiLCJrZXlzIiwidHlwZSIsIm1ldGhvZCIsImhlYWRlcnMiLCJBY2NlcHQiLCJjdXJyZW5jeSIsIkNVUlJFTkNZX0NIQU5HRV9FVkVOVCIsImZvcm1hdE1vbmV5IiwibW9uZXkiLCJmb3JtYXQiLCJBQ1NDdXJyZW5jeSIsInJlZiIsImNvbnZlcnRlZE1vbmV5IiwiY29udmVydCIsImN1cnJlbnRDdXJyZW5jeSIsIk51bWJlciIsImlzTmFOIiwibW9uZXlGb3JtYXRzIiwibW9uZXlfZm9ybWF0Iiwic2hvcE1vbmV5Rm9ybWF0IiwiY2xlYXJDYXJ0IiwiYWRkVG9DYXJ0IiwiZGF0YSIsInVwZGF0ZUNhcnQiLCJ1cGRhdGVzIiwiZ2V0UHJvZHVjdHNJbmZvIiwiaGFuZGxlcyIsInBhcnNlciIsIkRPTVBhcnNlciIsIkFQSV9VUkwiLCJVUkwiLCJvcmlnaW4iLCJzZWFyY2hQYXJhbXMiLCJzZXQiLCJwcm9taXNlcyIsImhhbmRsZXNDb3B5IiwibGVuZ3RoIiwiY2h1bmsiLCJzcGxpY2UiLCJqb2luIiwicHVzaCIsInJlcyIsInRleHQiLCJET00iLCJwYXJzZUZyb21TdHJpbmciLCJwcm9kdWN0c1Jlc3BvbnNlSFRNTCIsInF1ZXJ5U2VsZWN0b3IiLCJQcm9taXNlIiwiYWxsIiwicmVkdWNlIiwiYWNjIiwiY3VyciJdLCJzb3VyY2VSb290IjoiIn0=