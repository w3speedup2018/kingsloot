"use strict";
(self["webpackChunkjuno_shopify_template"] = self["webpackChunkjuno_shopify_template"] || []).push([["src_assets_js_main_cart_functions_quantity_js-src_assets_js_main_cart_functions_submit_js-src-377480"],{

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

/***/ "./src/assets/js/main/cart/functions/variant.js":
/*!******************************************************!*\
  !*** ./src/assets/js/main/cart/functions/variant.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Variant": () => (/* binding */ Variant)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");


class Variant {
  constructor(element, fetchCart) {
    this.bindListener = () => {
      this.items.forEach(item => {
        const variants = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)('.js-product-variant', item);
        variants.forEach(variant => {
          variant.addEventListener('click', e => {
            const prod_id = variant.getAttribute('data-product-id');
            var product_form = variant.closest('.js-product-form');
            var variant_id = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".c-product__variantId", product_form);
            variant_id.value = prod_id;
            const img = variant.getAttribute('data-img-url');
            variants.forEach(rmItem => {
              rmItem.classList.remove('active');
            });
            variant.classList.add('active');

            if (img != null && img != '') {
              const firstImg = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.c-product-card__image.first-image', variant.parentNode.parentNode.parentNode.parentNode);
              firstImg.innerHTML = '';
              const html = `
                            <img src="${img}" class="o-img o-img--cover  o-ar__item"/>
                        `;
              firstImg.innerHTML = html;
            }
          });
        });
      });
    };

    this.cart = element;
    this.items = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)(".upsell_section_product", this.cart);
    this.fetchCart = fetchCart;
    this.bindListener();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL3NyY19hc3NldHNfanNfbWFpbl9jYXJ0X2Z1bmN0aW9uc19xdWFudGl0eV9qcy1zcmNfYXNzZXRzX2pzX21haW5fY2FydF9mdW5jdGlvbnNfc3VibWl0X2pzLXNyYy0zNzc0ODAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3QkFBd0IsUUFBUTs7QUFFaEM7QUFDQTtBQUNBLFlBQVksZUFBZTtBQUMzQjtBQUNBLFlBQVksUUFBUTtBQUNwQixZQUFZLFFBQVE7QUFDcEI7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLEVBQUUsYUFBYSxFQUFFO0FBQy9DOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRUE7QUFDQTs7QUFFQSxNQUFNRyxRQUFOLENBQWU7RUFDWEMsV0FBVyxDQUFDQyxPQUFELEVBQVVDLFNBQVYsRUFBcUI7SUFDNUIsS0FBS0MsSUFBTCxHQUFZRixPQUFaO0lBQ0EsS0FBS0MsU0FBTCxHQUFpQkEsU0FBakI7SUFDQSxLQUFLRSxZQUFMO0VBQ0g7O0VBRURBLFlBQVksR0FBRztJQUNYLEtBQUtDLFNBQUw7RUFDSDs7RUFFREEsU0FBUyxHQUFHO0lBQ1IsS0FBS0MsS0FBTCxHQUFhVCw4Q0FBTSxDQUFDLGVBQUQsRUFBa0IsS0FBS00sSUFBdkIsQ0FBbkI7SUFFQSxLQUFLRyxLQUFMLENBQVdDLE9BQVgsQ0FBb0JDLElBQUQsSUFBVTtNQUN6QixNQUFNQyxRQUFRLEdBQUdiLDJDQUFHLENBQUMsZUFBRCxFQUFrQlksSUFBbEIsQ0FBcEI7TUFDQSxNQUFNRSxPQUFPLEdBQUdkLDJDQUFHLENBQUMsY0FBRCxFQUFpQlksSUFBakIsQ0FBbkI7TUFDQSxNQUFNRyxHQUFHLEdBQUdmLDJDQUFHLENBQUMsZUFBRCxFQUFrQlksSUFBbEIsQ0FBZjtNQUNBLE1BQU1JLFNBQVMsR0FBR0QsR0FBRyxDQUFDRSxZQUFKLENBQWlCLFNBQWpCLENBQWxCO01BQ0EsTUFBTUMsY0FBYyxHQUFHbEIsMkNBQUcsQ0FBQyxpQkFBRCxFQUFvQlksSUFBcEIsQ0FBMUI7TUFDQSxNQUFNTyxXQUFXLEdBQUduQiwyQ0FBRyxDQUFDLGVBQUQsRUFBa0JZLElBQWxCLENBQXZCO01BRUFDLFFBQVEsQ0FBQ08sZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsTUFBTTtRQUNyQyxJQUFHRixjQUFILEVBQWtCO1VBQ2QsSUFBSUcsTUFBTSxHQUFHLEtBQWI7VUFDQSxJQUFJQyxVQUFVLEdBQUd0QiwyQ0FBRyxDQUFDLGFBQUQsRUFBZ0JZLElBQWhCLENBQUgsQ0FBeUJXLFdBQTFDO1VBQ0EsSUFBSUMsWUFBWSxHQUFFeEIsMkNBQUcsQ0FBQyxlQUFELEVBQWtCWSxJQUFsQixDQUFILENBQTJCVyxXQUE3QztVQUVBLEtBQUtiLEtBQUwsQ0FBV0MsT0FBWCxDQUFvQkMsSUFBRCxJQUFVO1lBQ3pCLElBQUlhLFNBQVMsR0FBR3pCLDJDQUFHLENBQUMsZUFBRCxFQUFrQlksSUFBbEIsQ0FBbkI7O1lBQ0EsSUFBR2EsU0FBSCxFQUFhO2NBQ1QsSUFBSUMsY0FBYyxHQUFHRCxTQUFTLENBQUNGLFdBQVYsQ0FBc0JJLE9BQXRCLENBQThCLEtBQTlCLEVBQXFDLEVBQXJDLENBQXJCO2NBQ0EsSUFBSUMsaUJBQWlCLEdBQUc1QiwyQ0FBRyxDQUFDLGFBQUQsRUFBZ0JZLElBQWhCLENBQUgsQ0FBeUJXLFdBQWpEO2NBQ0EsSUFBSU0sbUJBQW1CLEdBQUU3QiwyQ0FBRyxDQUFDLGVBQUQsRUFBa0JZLElBQWxCLENBQUgsQ0FBMkJXLFdBQXBEO2NBQ0EsSUFBSU8sYUFBYSxHQUFDOUIsMkNBQUcsQ0FBQyxnQkFBRCxFQUFtQlksSUFBbkIsQ0FBSCxDQUE0QlcsV0FBNUIsQ0FBd0NJLE9BQXhDLENBQWdELEtBQWhELEVBQXVELEVBQXZELENBQWxCOztjQUVBLElBQUdYLFNBQVMsSUFBSVUsY0FBYixJQUErQkosVUFBVSxJQUFJTSxpQkFBN0MsSUFBa0VKLFlBQVksSUFBSUssbUJBQXJGLEVBQXlHO2dCQUVyR1IsTUFBTSxHQUFFLElBQVI7Z0JBQ0EsSUFBSVUsT0FBTyxHQUFHL0IsMkNBQUcsQ0FBQyxlQUFELEVBQWtCWSxJQUFsQixDQUFqQjtnQkFDQSxJQUFJb0IsYUFBYSxHQUFHRCxPQUFPLENBQUNkLFlBQVIsQ0FBcUIsU0FBckIsQ0FBcEI7O2dCQUVBLElBQUljLE9BQU8sQ0FBQ0UsS0FBUixJQUFpQixDQUFyQixFQUF3QjtrQkFDcEJGLE9BQU8sQ0FBQ0UsS0FBUjtrQkFDQS9CLDhEQUFjLENBQUM7b0JBQ1hnQyxFQUFFLEVBQUVGLGFBRE87b0JBRVhHLFFBQVEsRUFBRUosT0FBTyxDQUFDRSxLQUZQO29CQUdYRyxVQUFVLEVBQUU7c0JBQ1JOLGFBQWEsRUFBRUEsYUFEUDtzQkFFUk8sZUFBZSxFQUFHLENBQUNYLGNBRlg7c0JBR1JZLElBQUksRUFBRVYsaUJBQWlCLENBQUNELE9BQWxCLENBQTBCLEtBQTFCLEVBQWlDLEVBQWpDLENBSEU7c0JBSVJZLE1BQU0sRUFBRVYsbUJBQW1CLENBQUNGLE9BQXBCLENBQTRCLEtBQTVCLEVBQW1DLEVBQW5DO29CQUpBO2tCQUhELENBQUQsQ0FBZCxDQVVDYSxJQVZELENBVU0sTUFBTTtvQkFDUnpCLEdBQUcsQ0FBQ2tCLEtBQUo7b0JBQ0EvQiw4REFBYyxDQUFDO3NCQUNYZ0MsRUFBRSxFQUFFbEIsU0FETztzQkFFWG1CLFFBQVEsRUFBRXBCLEdBQUcsQ0FBQ2tCLEtBRkg7c0JBR1hHLFVBQVUsRUFBRTt3QkFDUkssY0FBYyxFQUFFbkIsVUFBVSxDQUFDSyxPQUFYLENBQW1CLEtBQW5CLEVBQTBCLEVBQTFCLENBRFI7d0JBRVJlLGdCQUFnQixFQUFFbEIsWUFBWSxDQUFDRyxPQUFiLENBQXFCLEtBQXJCLEVBQTRCLEVBQTVCO3NCQUZWO29CQUhELENBQUQsQ0FBZCxDQVFDYSxJQVJELENBUU0sTUFBTTtzQkFDUixLQUFLbEMsU0FBTDtvQkFDSCxDQVZELEVBV0NxQyxLQVhELENBV1FDLENBQUQsSUFBTztzQkFDVkMsT0FBTyxDQUFDQyxJQUFSLENBQWEsNEJBQWIsRUFBMkNGLENBQTNDO29CQUNILENBYkQ7a0JBY0gsQ0ExQkQsRUEyQkNELEtBM0JELENBMkJRQyxDQUFELElBQU87b0JBQ1ZDLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLDRCQUFiLEVBQTJDRixDQUEzQztrQkFDSCxDQTdCRDtnQkE4Qkg7Y0FDSjtZQUNKO1VBRUosQ0FsREQ7O1VBb0RBLElBQUd2QixNQUFNLElBQUksS0FBYixFQUFtQjtZQUNmLEtBQUtmLFNBQUwsR0FDRSxLQUFLeUMsYUFBTCxDQUFtQi9CLFNBQW5CLEVBQThCRCxHQUE5QixFQUFtQyxLQUFLVCxTQUF4QyxDQURGLEdBRUUsS0FBS3lDLGFBQUwsQ0FBbUIvQixTQUFuQixFQUE4QkQsR0FBOUIsQ0FGRjtVQUdIO1FBQ0osQ0E5REQsTUE4REs7VUFDRCxLQUFLVCxTQUFMLEdBQ0UsS0FBS3lDLGFBQUwsQ0FBbUIvQixTQUFuQixFQUE4QkQsR0FBOUIsRUFBbUMsS0FBS1QsU0FBeEMsQ0FERixHQUVFLEtBQUt5QyxhQUFMLENBQW1CL0IsU0FBbkIsRUFBOEJELEdBQTlCLENBRkY7UUFHSCxDQW5Fb0MsQ0FxRXJDOzs7UUFDQSxJQUNJaUMsTUFBTSxDQUFDQyxJQUFQLElBQ0FBLElBQUksQ0FBQ0MsTUFETCxJQUVBRCxJQUFJLENBQUNDLE1BQUwsQ0FBWUMsWUFGWixJQUdBLE9BQU9GLElBQUksQ0FBQ0MsTUFBTCxDQUFZQyxZQUFaLENBQXlCQyxJQUFoQyxLQUF5QyxVQUo3QyxFQUtFO1VBQ0VILElBQUksQ0FBQ0MsTUFBTCxDQUFZQyxZQUFaLENBQXlCQyxJQUF6QixDQUE4Qix5QkFBOUI7UUFDSDtNQUNKLENBOUVEO01BZ0ZBdEMsT0FBTyxDQUFDTSxnQkFBUixDQUF5QixPQUF6QixFQUFrQyxNQUFNO1FBQ3BDLElBQUdGLGNBQUgsRUFBa0I7VUFDZCxJQUFJSSxVQUFVLEdBQUd0QiwyQ0FBRyxDQUFDLGFBQUQsRUFBZ0JZLElBQWhCLENBQUgsQ0FBeUJXLFdBQTFDO1VBQ0EsSUFBSUMsWUFBWSxHQUFFeEIsMkNBQUcsQ0FBQyxlQUFELEVBQWtCWSxJQUFsQixDQUFILENBQTJCVyxXQUE3QztVQUVBLEtBQUtiLEtBQUwsQ0FBV0MsT0FBWCxDQUFvQkMsSUFBRCxJQUFVO1lBQ3pCLElBQUlhLFNBQVMsR0FBR3pCLDJDQUFHLENBQUMsZUFBRCxFQUFrQlksSUFBbEIsQ0FBbkI7O1lBRUEsSUFBR2EsU0FBSCxFQUFhO2NBQ1QsSUFBSUMsY0FBYyxHQUFHRCxTQUFTLENBQUNGLFdBQVYsQ0FBc0JJLE9BQXRCLENBQThCLEtBQTlCLEVBQXFDLEVBQXJDLENBQXJCO2NBQ0EsSUFBSUMsaUJBQWlCLEdBQUc1QiwyQ0FBRyxDQUFDLGFBQUQsRUFBZ0JZLElBQWhCLENBQUgsQ0FBeUJXLFdBQWpEO2NBQ0EsSUFBSU0sbUJBQW1CLEdBQUU3QiwyQ0FBRyxDQUFDLGVBQUQsRUFBa0JZLElBQWxCLENBQUgsQ0FBMkJXLFdBQXBEO2NBQ0EsSUFBSU8sYUFBYSxHQUFDOUIsMkNBQUcsQ0FBQyxnQkFBRCxFQUFtQlksSUFBbkIsQ0FBSCxDQUE0QlcsV0FBNUIsQ0FBd0NJLE9BQXhDLENBQWdELEtBQWhELEVBQXVELEVBQXZELENBQWxCOztjQUNBLElBQUdYLFNBQVMsSUFBSVUsY0FBYixJQUErQkosVUFBVSxJQUFJTSxpQkFBN0MsSUFBa0VKLFlBQVksSUFBSUssbUJBQXJGLEVBQXlHO2dCQUNyRyxJQUFJRSxPQUFPLEdBQUcvQiwyQ0FBRyxDQUFDLGVBQUQsRUFBa0JZLElBQWxCLENBQWpCO2dCQUNBLElBQUlvQixhQUFhLEdBQUdELE9BQU8sQ0FBQ2QsWUFBUixDQUFxQixTQUFyQixDQUFwQjs7Z0JBQ0EsSUFBSWMsT0FBTyxDQUFDRSxLQUFSLElBQWlCLENBQXJCLEVBQXdCO2tCQUNwQkYsT0FBTyxDQUFDRSxLQUFSO2tCQUNBL0IsOERBQWMsQ0FBQztvQkFDWGdDLEVBQUUsRUFBRUYsYUFETztvQkFFWEcsUUFBUSxFQUFFSixPQUFPLENBQUNFLEtBRlA7b0JBR1hHLFVBQVUsRUFBRTtzQkFDUk4sYUFBYSxFQUFFQSxhQURQO3NCQUVSTyxlQUFlLEVBQUcsQ0FBQ1gsY0FGWDtzQkFHUlksSUFBSSxFQUFFVixpQkFBaUIsQ0FBQ0QsT0FBbEIsQ0FBMEIsS0FBMUIsRUFBaUMsRUFBakMsQ0FIRTtzQkFJUlksTUFBTSxFQUFFVixtQkFBbUIsQ0FBQ0YsT0FBcEIsQ0FBNEIsS0FBNUIsRUFBbUMsRUFBbkM7b0JBSkE7a0JBSEQsQ0FBRCxDQUFkLENBVUNhLElBVkQsQ0FVTSxNQUFNO29CQUNSekIsR0FBRyxDQUFDa0IsS0FBSjtvQkFDQS9CLDhEQUFjLENBQUM7c0JBQ1hnQyxFQUFFLEVBQUVsQixTQURPO3NCQUVYbUIsUUFBUSxFQUFFcEIsR0FBRyxDQUFDa0IsS0FGSDtzQkFHWEcsVUFBVSxFQUFFO3dCQUNSSyxjQUFjLEVBQUVuQixVQUFVLENBQUNLLE9BQVgsQ0FBbUIsS0FBbkIsRUFBMEIsRUFBMUIsQ0FEUjt3QkFFUmUsZ0JBQWdCLEVBQUVsQixZQUFZLENBQUNHLE9BQWIsQ0FBcUIsS0FBckIsRUFBNEIsRUFBNUI7c0JBRlY7b0JBSEQsQ0FBRCxDQUFkLENBUUNhLElBUkQsQ0FRTSxNQUFNO3NCQUNSLEtBQUtsQyxTQUFMO29CQUNILENBVkQsRUFXQ3FDLEtBWEQsQ0FXUUMsQ0FBRCxJQUFPO3NCQUNWQyxPQUFPLENBQUNDLElBQVIsQ0FBYSwyQkFBYixFQUEwQ0YsQ0FBMUM7b0JBQ0gsQ0FiRDtrQkFjSCxDQTFCRCxFQTJCQ0QsS0EzQkQsQ0EyQlFDLENBQUQsSUFBTztvQkFDVkMsT0FBTyxDQUFDQyxJQUFSLENBQWEsMkJBQWIsRUFBMENGLENBQTFDO2tCQUNILENBN0JEO2dCQThCSDtjQUNKO1lBQ0o7VUFFSixDQS9DRDtRQWdESCxDQXBERCxNQW9ESztVQUNELEtBQUt0QyxTQUFMLEdBQ00sS0FBSytDLFlBQUwsQ0FBa0JyQyxTQUFsQixFQUE2QkQsR0FBN0IsRUFBa0MsS0FBS1QsU0FBdkMsQ0FETixHQUVNLEtBQUsrQyxZQUFMLENBQWtCckMsU0FBbEIsRUFBNkJELEdBQTdCLENBRk47UUFJSCxDQTFEbUMsQ0E2RHBDOzs7UUFDQSxJQUNJaUMsTUFBTSxDQUFDQyxJQUFQLElBQ0FBLElBQUksQ0FBQ0MsTUFETCxJQUVBRCxJQUFJLENBQUNDLE1BQUwsQ0FBWUMsWUFGWixJQUdBLE9BQU9GLElBQUksQ0FBQ0MsTUFBTCxDQUFZQyxZQUFaLENBQXlCQyxJQUFoQyxLQUF5QyxVQUo3QyxFQUtFO1VBQ0VILElBQUksQ0FBQ0MsTUFBTCxDQUFZQyxZQUFaLENBQXlCQyxJQUF6QixDQUE4Qix5QkFBOUI7UUFDSDtNQUNKLENBdEVEO01Bd0VBckMsR0FBRyxDQUFDSyxnQkFBSixDQUFxQixRQUFyQixFQUFnQ3dCLENBQUQsSUFBTztRQUNsQyxLQUFLdEMsU0FBTCxHQUNNLEtBQUtnRCxXQUFMLENBQWlCdEMsU0FBakIsRUFBNEI0QixDQUFDLENBQUNXLE1BQUYsQ0FBU3RCLEtBQXJDLEVBQTRDLEtBQUszQixTQUFqRCxDQUROLEdBRU0sS0FBS2dELFdBQUwsQ0FBaUJ0QyxTQUFqQixFQUE0QjRCLENBQUMsQ0FBQ1csTUFBRixDQUFTdEIsS0FBckMsQ0FGTjtNQUdILENBSkQ7SUFLSCxDQXJLRDtFQXNLSDs7RUFFRHFCLFdBQVcsQ0FBQ0UsTUFBRCxFQUFTekMsR0FBVCxFQUFjVCxTQUFkLEVBQXlCO0lBQ2hDSiw4REFBYyxDQUFDO01BQ1hnQyxFQUFFLEVBQUVzQixNQURPO01BRVhyQixRQUFRLEVBQUVwQjtJQUZDLENBQUQsQ0FBZCxDQUlLeUIsSUFKTCxDQUlVLE1BQU07TUFDUmxDLFNBQVMsR0FBR0EsU0FBUyxFQUFaLEdBQWlCMEMsTUFBTSxDQUFDUyxRQUFQLENBQWdCQyxNQUFoQixFQUExQjtJQUNILENBTkwsRUFPS2YsS0FQTCxDQU9ZQyxDQUFELElBQU87TUFDVkMsT0FBTyxDQUFDQyxJQUFSLENBQWEsMEJBQWIsRUFBeUNGLENBQXpDO0lBQ0gsQ0FUTDtFQVVIOztFQUVEUyxZQUFZLENBQUNHLE1BQUQsRUFBU0csT0FBVCxFQUFrQnJELFNBQWxCLEVBQTZCO0lBQ3JDcUQsT0FBTyxDQUFDMUIsS0FBUjtJQUNBL0IsOERBQWMsQ0FBQztNQUNYZ0MsRUFBRSxFQUFFc0IsTUFETztNQUVYckIsUUFBUSxFQUFFd0IsT0FBTyxDQUFDMUI7SUFGUCxDQUFELENBQWQsQ0FJS08sSUFKTCxDQUlVLE1BQU07TUFDUmxDLFNBQVMsR0FBR0EsU0FBUyxFQUFaLEdBQWlCMEMsTUFBTSxDQUFDUyxRQUFQLENBQWdCQyxNQUFoQixFQUExQjtJQUNILENBTkwsRUFPS2YsS0FQTCxDQU9ZQyxDQUFELElBQU87TUFDVkMsT0FBTyxDQUFDQyxJQUFSLENBQWEsMkJBQWIsRUFBMENGLENBQTFDO0lBQ0gsQ0FUTDtFQVVIOztFQUVERyxhQUFhLENBQUNTLE1BQUQsRUFBU0csT0FBVCxFQUFrQnJELFNBQWxCLEVBQTZCO0lBQ3RDLElBQUlxRCxPQUFPLENBQUMxQixLQUFSLElBQWlCLENBQXJCLEVBQXdCO01BQ3BCMEIsT0FBTyxDQUFDMUIsS0FBUjtNQUNBL0IsOERBQWMsQ0FBQztRQUNYZ0MsRUFBRSxFQUFFc0IsTUFETztRQUVYckIsUUFBUSxFQUFFd0IsT0FBTyxDQUFDMUI7TUFGUCxDQUFELENBQWQsQ0FJS08sSUFKTCxDQUlVLE1BQU07UUFDUmxDLFNBQVMsR0FBR0EsU0FBUyxFQUFaLEdBQWlCMEMsTUFBTSxDQUFDUyxRQUFQLENBQWdCQyxNQUFoQixFQUExQjtNQUNILENBTkwsRUFPS2YsS0FQTCxDQU9ZQyxDQUFELElBQU87UUFDVkMsT0FBTyxDQUFDQyxJQUFSLENBQWEsNEJBQWIsRUFBMkNGLENBQTNDO01BQ0gsQ0FUTDtJQVVIO0VBQ0o7O0FBL05VOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0hmOztBQUVBLE1BQU1rQixTQUFOLENBQWdCO0VBQ1oxRCxXQUFXLENBQUNDLE9BQUQsRUFBVUMsU0FBVixFQUFxQjtJQUFBLEtBT2hDRSxZQVBnQyxHQU9qQixNQUFNO01BQ2pCLEtBQUtFLEtBQUwsQ0FBV0MsT0FBWCxDQUFvQkMsSUFBRCxJQUFVO1FBQzFCLE1BQU1tRCxTQUFTLEdBQUkvRCwyQ0FBRyxDQUFDLHlCQUFELEVBQTRCWSxJQUE1QixDQUF0QjtRQUVBbUQsU0FBUyxDQUFDM0MsZ0JBQVYsQ0FBMkIsT0FBM0IsRUFBcUN3QixDQUFELElBQU87VUFFdENBLENBQUMsQ0FBQ29CLGNBQUY7VUFDQSxJQUFJQyxZQUFZLEdBQUdGLFNBQVMsQ0FBQ0csT0FBVixDQUFrQixrQkFBbEIsQ0FBbkI7VUFDQUgsU0FBUyxDQUFDSSxZQUFWLENBQXVCLFVBQXZCLEVBQW1DLElBQW5DO1VBQ0FKLFNBQVMsQ0FBQ0ssU0FBVixHQUFzQixRQUF0QjtVQUNBLEtBQUtDLFVBQUwsQ0FBZ0JKLFlBQWhCO1FBQ0gsQ0FQRjtNQVNGLENBWkQ7SUFhSCxDQXJCK0I7O0lBQzVCLEtBQUsxRCxJQUFMLEdBQVlGLE9BQVo7SUFDQSxLQUFLSyxLQUFMLEdBQWFULDhDQUFNLENBQUMseUJBQUQsRUFBNEIsS0FBS00sSUFBakMsQ0FBbkI7SUFDQSxLQUFLRCxTQUFMLEdBQWlCQSxTQUFqQjtJQUNBLEtBQUtFLFlBQUw7RUFDSDs7RUFpQkQ2RCxVQUFVLENBQUNDLFdBQUQsRUFBYztJQUNwQixJQUFJQyxHQUFHLEdBQUd2RSwyQ0FBRyxDQUFDLHlCQUFELEVBQTRCLEtBQUtPLElBQWpDLENBQWI7SUFDQSxNQUFNaUUsSUFBSSxHQUFHQyxJQUFJLENBQUNDLFNBQUwsb0ZBQ05ELElBQUksQ0FBQ0UsS0FBTCxDQUFXZixxREFBYSxDQUFDVSxXQUFELENBQXhCLENBRE07TUFFVE0sWUFBWSxFQUFFNUIsTUFBTSxDQUFDUyxRQUFQLENBQWdCb0I7SUFGckIsR0FBYjtJQUtBQyxLQUFLLENBQUUsR0FBRUMsTUFBTSxDQUFDQyxZQUFhLEVBQXhCLHFGQUFnQ25CLG1EQUFXLENBQUMsWUFBRCxDQUEzQztNQUEyRFc7SUFBM0QsR0FBTCxDQUNLaEMsSUFETCxDQUNXeUMsUUFBRCxJQUFjQSxRQUFRLENBQUNDLElBQVQsRUFEeEIsRUFFSzFDLElBRkwsQ0FFVSxNQUFNLEtBQUtsQyxTQUFMLEVBRmhCLEVBR0txQyxLQUhMLENBR1lDLENBQUQsSUFBT0MsT0FBTyxDQUFDc0MsS0FBUixDQUFjdkMsQ0FBZCxDQUhsQixFQUlLd0MsT0FKTCxDQUlhLE1BQU07TUFDWGIsR0FBRyxDQUFDSCxTQUFKLEdBQWdCLE9BQWhCO0lBQ1AsQ0FORDtFQU9IOztBQXJDVzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGaEI7O0FBRUEsTUFBTWlCLE9BQU4sQ0FBYztFQUNWakYsV0FBVyxDQUFDQyxPQUFELEVBQVVDLFNBQVYsRUFBcUI7SUFBQSxLQU9oQ0UsWUFQZ0MsR0FPakIsTUFBTTtNQUNqQixLQUFLRSxLQUFMLENBQVdDLE9BQVgsQ0FBb0JDLElBQUQsSUFBVTtRQUMxQixNQUFNMEUsUUFBUSxHQUFJckYsOENBQU0sQ0FBQyxxQkFBRCxFQUF3QlcsSUFBeEIsQ0FBeEI7UUFFQzBFLFFBQVEsQ0FBQzNFLE9BQVQsQ0FBaUI0RSxPQUFPLElBQUk7VUFDeEJBLE9BQU8sQ0FBQ25FLGdCQUFSLENBQXlCLE9BQXpCLEVBQW1Dd0IsQ0FBRCxJQUFPO1lBRXJDLE1BQU00QyxPQUFPLEdBQUdELE9BQU8sQ0FBQ3RFLFlBQVIsQ0FBcUIsaUJBQXJCLENBQWhCO1lBQ0EsSUFBSWdELFlBQVksR0FBR3NCLE9BQU8sQ0FBQ3JCLE9BQVIsQ0FBZ0Isa0JBQWhCLENBQW5CO1lBQ0EsSUFBSXVCLFVBQVUsR0FBR3pGLDJDQUFHLENBQUMsdUJBQUQsRUFBMEJpRSxZQUExQixDQUFwQjtZQUNBd0IsVUFBVSxDQUFDeEQsS0FBWCxHQUFtQnVELE9BQW5CO1lBRUEsTUFBTUUsR0FBRyxHQUFHSCxPQUFPLENBQUN0RSxZQUFSLENBQXFCLGNBQXJCLENBQVo7WUFFQXFFLFFBQVEsQ0FBQzNFLE9BQVQsQ0FBaUJnRixNQUFNLElBQUk7Y0FDdkJBLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0IsUUFBeEI7WUFDSCxDQUZEO1lBSUFOLE9BQU8sQ0FBQ0ssU0FBUixDQUFrQkUsR0FBbEIsQ0FBc0IsUUFBdEI7O1lBRUEsSUFBSUosR0FBRyxJQUFJLElBQVAsSUFBZUEsR0FBRyxJQUFJLEVBQTFCLEVBQThCO2NBQzFCLE1BQU1LLFFBQVEsR0FBRy9GLDJDQUFHLENBQUMsb0NBQUQsRUFBdUN1RixPQUFPLENBQUNTLFVBQVIsQ0FBbUJBLFVBQW5CLENBQThCQSxVQUE5QixDQUF5Q0EsVUFBaEYsQ0FBcEI7Y0FDQUQsUUFBUSxDQUFDM0IsU0FBVCxHQUFxQixFQUFyQjtjQUVBLE1BQU02QixJQUFJLEdBQUk7QUFDdEMsd0NBQXdDUCxHQUFJO0FBQzVDLHlCQUZ3QjtjQUlBSyxRQUFRLENBQUMzQixTQUFULEdBQXFCNkIsSUFBckI7WUFDSDtVQUNKLENBekJEO1FBMEJILENBM0JEO01BNkJILENBaENEO0lBaUNILENBekMrQjs7SUFDNUIsS0FBSzFGLElBQUwsR0FBWUYsT0FBWjtJQUNBLEtBQUtLLEtBQUwsR0FBYVQsOENBQU0sQ0FBQyx5QkFBRCxFQUE0QixLQUFLTSxJQUFqQyxDQUFuQjtJQUNBLEtBQUtELFNBQUwsR0FBaUJBLFNBQWpCO0lBQ0EsS0FBS0UsWUFBTDtFQUNIOztBQU5TOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZQLFNBQVNvRCxhQUFULENBQXVCc0MsSUFBdkIsRUFBNkI7RUFDaEMsTUFBTUMsR0FBRyxHQUFHLEVBQVo7RUFDQSxNQUFNQyxRQUFRLEdBQUcsSUFBSUMsUUFBSixDQUFhSCxJQUFiLENBQWpCOztFQUNBLEtBQUssTUFBTUksR0FBWCxJQUFrQkYsUUFBUSxDQUFDRyxJQUFULEVBQWxCLEVBQW1DO0lBQy9CSixHQUFHLENBQUNHLEdBQUQsQ0FBSCxHQUFXRixRQUFRLENBQUNwRyxHQUFULENBQWFzRyxHQUFiLENBQVg7RUFDSDs7RUFDRCxPQUFPN0IsSUFBSSxDQUFDQyxTQUFMLENBQWV5QixHQUFmLENBQVA7QUFDSDtBQUVNLFNBQVN0QyxXQUFULENBQXFCMkMsSUFBSSxHQUFHLE1BQTVCLEVBQW9DO0VBQ3ZDLE9BQU87SUFDSEMsTUFBTSxFQUFFLE1BREw7SUFFSEMsT0FBTyxFQUFFO01BQ0wsZ0JBQWdCLGtCQURYO01BRUxDLE1BQU0sRUFBRyxlQUFjSCxJQUFLO0lBRnZCO0VBRk4sQ0FBUDtBQU9IOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQkQ7Q0FHQTs7QUFFTyxNQUFNSyxxQkFBcUIsR0FBRyxrQkFBOUIsRUFFUDs7QUFFTyxTQUFTQyxXQUFULENBQXFCO0VBQUVDLEtBQUY7RUFBU0M7QUFBVCxDQUFyQixFQUE0RTtFQUFBOztFQUMvRSxJQUFJLCtCQUFPaEUsTUFBTSxDQUFDaUUsV0FBZCxxQkFBTyxvQkFBb0JILFdBQTNCLE1BQTJDLFVBQS9DLEVBQTJEO0lBQUE7O0lBQ3ZELE1BQU1JLEdBQUcsR0FBR2xFLE1BQU0sQ0FBQ2lFLFdBQW5CO0lBQ0EsTUFBTUUsY0FBYyxHQUFHRCxHQUFHLENBQUNFLE9BQUosQ0FBWUwsS0FBWixFQUFtQixLQUFuQixFQUEwQkcsR0FBRyxDQUFDRyxlQUE5QixDQUF2QjtJQUNBLE9BQU9ILEdBQUcsQ0FBQ0osV0FBSixDQUNIUSxNQUFNLENBQUNDLEtBQVAsQ0FBYUosY0FBYixJQUErQkosS0FBL0IsR0FBdUNJLGNBRHBDLEVBRUg7SUFDQUgsTUFBTSw4QkFBSUUsR0FBRyxDQUFDTSxZQUFKLENBQWlCTixHQUFHLENBQUNHLGVBQXJCLENBQUoscUJBQUksc0JBQXVDSSxZQUEzQyxDQUFOLElBQWlFekUsTUFBTSxDQUFDMEUsZUFIckUsQ0FBUDtFQUtILENBVDhFLENBVy9FOzs7RUFDQSxPQUFPZCxnRUFBQSxDQUFxQkcsS0FBckIsRUFBNEJDLE1BQU0sSUFBSWhFLE1BQU0sQ0FBQzBFLGVBQTdDLENBQVA7QUFDSDtBQUVNLGVBQWVDLFNBQWYsR0FBMkI7RUFDOUIsT0FBTzdDLEtBQUssQ0FBQyxnQkFBRCxFQUFtQjtJQUFFMkIsTUFBTSxFQUFFO0VBQVYsQ0FBbkIsQ0FBWjtBQUNILEVBRUQ7O0FBR08sZUFBZW1CLFNBQWYsQ0FBeUJDLElBQXpCLEVBQWdEO0VBQ25ELE9BQU8vQyxLQUFLLENBQUMsY0FBRCxFQUFpQjtJQUN6QjJCLE1BQU0sRUFBRSxNQURpQjtJQUV6QkMsT0FBTyxFQUFFO01BQ0wsZ0JBQWdCO0lBRFgsQ0FGZ0I7SUFLekJsQyxJQUFJLEVBQUVDLElBQUksQ0FBQ0MsU0FBTCxDQUFlO01BQUVoRSxLQUFLLEVBQUVtSDtJQUFULENBQWY7RUFMbUIsQ0FBakIsQ0FBWjtBQU9ILEVBRUQ7O0FBR08sZUFBZUMsVUFBZixDQUEwQkQsSUFBMUIsRUFBZ0Q7RUFDbkQsT0FBTy9DLEtBQUssQ0FBQyxpQkFBRCxFQUFvQjtJQUM1QjJCLE1BQU0sRUFBRSxNQURvQjtJQUU1QkMsT0FBTyxFQUFFO01BQ0wsZ0JBQWdCO0lBRFgsQ0FGbUI7SUFLNUJsQyxJQUFJLEVBQUVDLElBQUksQ0FBQ0MsU0FBTCxDQUFlO01BQUVxRCxPQUFPLEVBQUVGO0lBQVgsQ0FBZjtFQUxzQixDQUFwQixDQUFaO0FBT0gsRUFFRDs7QUFJTyxlQUFlM0gsY0FBZixDQUE4QjJILElBQTlCLEVBQW9EO0VBQ3ZELE9BQU8vQyxLQUFLLENBQUMsaUJBQUQsRUFBb0I7SUFDNUIyQixNQUFNLEVBQUUsTUFEb0I7SUFFNUJDLE9BQU8sRUFBRTtNQUNMLGdCQUFnQjtJQURYLENBRm1CO0lBSzVCbEMsSUFBSSxFQUFFQyxJQUFJLENBQUNDLFNBQUwsQ0FBZW1ELElBQWY7RUFMc0IsQ0FBcEIsQ0FBWjtBQU9ILEVBRUQ7O0FBZU8sZUFBZUcsZUFBZixDQUErQkMsT0FBL0IsRUFBd0Y7RUFDM0YsTUFBTUMsTUFBTSxHQUFHLElBQUlDLFNBQUosRUFBZjtFQUNBLE1BQU1DLE9BQU8sR0FBRyxJQUFJQyxHQUFKLENBQVEsU0FBUixFQUFtQnJGLE1BQU0sQ0FBQ1MsUUFBUCxDQUFnQjZFLE1BQW5DLENBQWhCO0VBQ0FGLE9BQU8sQ0FBQ0csWUFBUixDQUFxQkMsR0FBckIsQ0FBeUIsWUFBekIsRUFBdUMsZUFBdkM7RUFFQSxNQUFNQyxRQUFRLEdBQUcsRUFBakI7RUFDQSxNQUFNQyxXQUFXLEdBQUcsQ0FBQyxHQUFHVCxPQUFKLENBQXBCOztFQUNBLE9BQU9TLFdBQVcsQ0FBQ0MsTUFBWixHQUFxQixDQUE1QixFQUErQjtJQUMzQixNQUFNQyxLQUFLLEdBQUdGLFdBQVcsQ0FBQ0csTUFBWixDQUFtQixDQUFuQixFQUFzQixFQUF0QixDQUFkO0lBQ0FULE9BQU8sQ0FBQ0csWUFBUixDQUFxQkMsR0FBckIsQ0FBeUIsR0FBekIsRUFBOEJJLEtBQUssQ0FBQ0UsSUFBTixDQUFXLEdBQVgsQ0FBOUI7SUFDQUwsUUFBUSxDQUFDTSxJQUFULENBQ0ksQ0FBQyxZQUFZO01BQ1QsTUFBTTlELFFBQVEsR0FBRyxNQUFNSCxLQUFLLENBQUUsR0FBRXNELE9BQVEsRUFBWixDQUFMLENBQW9CNUYsSUFBcEIsQ0FBMEJ3RyxHQUFELElBQVNBLEdBQUcsQ0FBQ0MsSUFBSixFQUFsQyxDQUF2QjtNQUNBLE1BQU1DLEdBQUcsR0FBR2hCLE1BQU0sQ0FBQ2lCLGVBQVAsQ0FBdUJsRSxRQUF2QixFQUFpQyxXQUFqQyxDQUFaO01BQ0EsTUFBTW1FLG9CQUFvQixHQUFHRixHQUFHLENBQUNHLGFBQUosQ0FBa0IsZ0JBQWxCLENBQTdCO01BQ0EsT0FBTzVFLElBQUksQ0FBQ0UsS0FBTCxDQUFXeUUsb0JBQW9CLENBQUNoRixTQUFoQyxDQUFQO0lBQ0gsQ0FMRCxHQURKO0VBUUg7O0VBRUQsT0FBT2tGLE9BQU8sQ0FBQ0MsR0FBUixDQUFZZCxRQUFaLEVBQXNCakcsSUFBdEIsQ0FBNEJ3RyxHQUFELElBQzlCQSxHQUFHLENBQUNRLE1BQUosQ0FBVyxDQUFDQyxHQUFELEVBQU1DLElBQU4sd0ZBQXFCRCxHQUFyQixFQUE2QkMsSUFBN0IsQ0FBWCxFQUFpRCxFQUFqRCxDQURHLENBQVA7QUFHSDs7Ozs7Ozs7Ozs7Ozs7QUMxR2M7QUFDZjtBQUNBLG9CQUFvQixzQkFBc0I7QUFDMUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL0BzaG9waWZ5L3RoZW1lLWN1cnJlbmN5L2N1cnJlbmN5LmpzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvbWFpbi9jYXJ0L2Z1bmN0aW9ucy9xdWFudGl0eS5qcyIsIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL21haW4vY2FydC9mdW5jdGlvbnMvc3VibWl0LmpzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvbWFpbi9jYXJ0L2Z1bmN0aW9ucy92YXJpYW50LmpzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvdXRpbHMvZmV0Y2gudHMiLCJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vc3JjL2Fzc2V0cy9qcy91dGlscy9zaG9waWZ5LnRzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3VycmVuY3kgSGVscGVyc1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEEgY29sbGVjdGlvbiBvZiB1c2VmdWwgZnVuY3Rpb25zIHRoYXQgaGVscCB3aXRoIGN1cnJlbmN5IGZvcm1hdHRpbmdcbiAqXG4gKiBDdXJyZW50IGNvbnRlbnRzXG4gKiAtIGZvcm1hdE1vbmV5IC0gVGFrZXMgYW4gYW1vdW50IGluIGNlbnRzIGFuZCByZXR1cm5zIGl0IGFzIGEgZm9ybWF0dGVkIGRvbGxhciB2YWx1ZS5cbiAqXG4gKi9cblxuY29uc3QgbW9uZXlGb3JtYXQgPSAnJHt7YW1vdW50fX0nO1xuXG4vKipcbiAqIEZvcm1hdCBtb25leSB2YWx1ZXMgYmFzZWQgb24geW91ciBzaG9wIGN1cnJlbmN5IHNldHRpbmdzXG4gKiBAcGFyYW0gIHtOdW1iZXJ8c3RyaW5nfSBjZW50cyAtIHZhbHVlIGluIGNlbnRzIG9yIGRvbGxhciBhbW91bnQgZS5nLiAzMDAgY2VudHNcbiAqIG9yIDMuMDAgZG9sbGFyc1xuICogQHBhcmFtICB7U3RyaW5nfSBmb3JtYXQgLSBzaG9wIG1vbmV5X2Zvcm1hdCBzZXR0aW5nXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHZhbHVlIC0gZm9ybWF0dGVkIHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRNb25leShjZW50cywgZm9ybWF0KSB7XG4gIGlmICh0eXBlb2YgY2VudHMgPT09ICdzdHJpbmcnKSB7XG4gICAgY2VudHMgPSBjZW50cy5yZXBsYWNlKCcuJywgJycpO1xuICB9XG4gIGxldCB2YWx1ZSA9ICcnO1xuICBjb25zdCBwbGFjZWhvbGRlclJlZ2V4ID0gL1xce1xce1xccyooXFx3KylcXHMqXFx9XFx9LztcbiAgY29uc3QgZm9ybWF0U3RyaW5nID0gZm9ybWF0IHx8IG1vbmV5Rm9ybWF0O1xuXG4gIGZ1bmN0aW9uIGZvcm1hdFdpdGhEZWxpbWl0ZXJzKFxuICAgIG51bWJlcixcbiAgICBwcmVjaXNpb24gPSAyLFxuICAgIHRob3VzYW5kcyA9ICcsJyxcbiAgICBkZWNpbWFsID0gJy4nXG4gICkge1xuICAgIGlmIChpc05hTihudW1iZXIpIHx8IG51bWJlciA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBudW1iZXIgPSAobnVtYmVyIC8gMTAwLjApLnRvRml4ZWQocHJlY2lzaW9uKTtcblxuICAgIGNvbnN0IHBhcnRzID0gbnVtYmVyLnNwbGl0KCcuJyk7XG4gICAgY29uc3QgZG9sbGFyc0Ftb3VudCA9IHBhcnRzWzBdLnJlcGxhY2UoXG4gICAgICAvKFxcZCkoPz0oXFxkXFxkXFxkKSsoPyFcXGQpKS9nLFxuICAgICAgYCQxJHt0aG91c2FuZHN9YFxuICAgICk7XG4gICAgY29uc3QgY2VudHNBbW91bnQgPSBwYXJ0c1sxXSA/IGRlY2ltYWwgKyBwYXJ0c1sxXSA6ICcnO1xuXG4gICAgcmV0dXJuIGRvbGxhcnNBbW91bnQgKyBjZW50c0Ftb3VudDtcbiAgfVxuXG4gIHN3aXRjaCAoZm9ybWF0U3RyaW5nLm1hdGNoKHBsYWNlaG9sZGVyUmVnZXgpWzFdKSB7XG4gICAgY2FzZSAnYW1vdW50JzpcbiAgICAgIHZhbHVlID0gZm9ybWF0V2l0aERlbGltaXRlcnMoY2VudHMsIDIpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYW1vdW50X25vX2RlY2ltYWxzJzpcbiAgICAgIHZhbHVlID0gZm9ybWF0V2l0aERlbGltaXRlcnMoY2VudHMsIDApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYW1vdW50X3dpdGhfY29tbWFfc2VwYXJhdG9yJzpcbiAgICAgIHZhbHVlID0gZm9ybWF0V2l0aERlbGltaXRlcnMoY2VudHMsIDIsICcuJywgJywnKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2Ftb3VudF9ub19kZWNpbWFsc193aXRoX2NvbW1hX3NlcGFyYXRvcic6XG4gICAgICB2YWx1ZSA9IGZvcm1hdFdpdGhEZWxpbWl0ZXJzKGNlbnRzLCAwLCAnLicsICcsJyk7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIHJldHVybiBmb3JtYXRTdHJpbmcucmVwbGFjZShwbGFjZWhvbGRlclJlZ2V4LCB2YWx1ZSk7XG59XG4iLCJpbXBvcnQgeyBnZXQsIGdldEFsbCB9IGZyb20gXCJAL3V0aWxzXCI7XHJcbmltcG9ydCB7IGNoYW5nZUNhcnRJdGVtIH0gZnJvbSBcIkAvdXRpbHMvc2hvcGlmeVwiO1xyXG5cclxuY2xhc3MgUXVhbnRpdHkge1xyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgZmV0Y2hDYXJ0KSB7XHJcbiAgICAgICAgdGhpcy5jYXJ0ID0gZWxlbWVudDtcclxuICAgICAgICB0aGlzLmZldGNoQ2FydCA9IGZldGNoQ2FydDtcclxuICAgICAgICB0aGlzLmJpbmRMaXN0ZW5lcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRMaXN0ZW5lcigpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVF0eSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVF0eSgpIHtcclxuICAgICAgICB0aGlzLml0ZW1zID0gZ2V0QWxsKFwiLmpzLWNhcnQtaXRlbVwiLCB0aGlzLmNhcnQpO1xyXG5cclxuICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbWludXNRdHkgPSBnZXQoXCIuanMtcXR5LW1pbnVzXCIsIGl0ZW0pO1xyXG4gICAgICAgICAgICBjb25zdCBwbHVzUXR5ID0gZ2V0KFwiLmpzLXF0eS1wbHVzXCIsIGl0ZW0pO1xyXG4gICAgICAgICAgICBjb25zdCBxdHkgPSBnZXQoXCIuanMtcXR5LXZhbHVlXCIsIGl0ZW0pO1xyXG4gICAgICAgICAgICBjb25zdCB2YXJpYW50SWQgPSBxdHkuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcclxuICAgICAgICAgICAgY29uc3QgY3VzdG9tX3Byb2R1Y3QgPSBnZXQoXCIuY3VzdG9tLXByb2R1Y3RcIiwgaXRlbSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1c3RvbV9mb250ID0gZ2V0KFwiLnBfdmFyaWFudF9pZFwiLCBpdGVtKTtcclxuXHJcbiAgICAgICAgICAgIG1pbnVzUXR5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihjdXN0b21fcHJvZHVjdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmb250X3ZhbHVlID0gZ2V0KFwiLmZvbnRfdmFsdWVcIiwgaXRlbSkudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxldHRlcl92YWx1ZSA9Z2V0KFwiLmxldHRlcl92YWx1ZVwiLCBpdGVtKS50ZXh0Q29udGVudDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb250X2NhcmQgPSBnZXQoJy5wX3ZhcmlhbnRfaWQnLCBpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZm9udF9jYXJkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXRfcHJvZHVjdCA9IGZvbnRfY2FyZC50ZXh0Q29udGVudC5yZXBsYWNlKC9cXG4vZywgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VzdG9tX2ZvbnRfdmFsdWUgPSBnZXQoXCIuZm9udF92YWx1ZVwiLCBpdGVtKS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXN0b21fbGV0dGVyX3ZhbHVlID1nZXQoXCIubGV0dGVyX3ZhbHVlXCIsIGl0ZW0pLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2R1Y3RfdGl0bGU9Z2V0KFwiLnByb2R1Y3RfdGl0bGVcIiwgaXRlbSkudGV4dENvbnRlbnQucmVwbGFjZSgvXFxuL2csIFwiXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHZhcmlhbnRJZCA9PSB0YXJnZXRfcHJvZHVjdCAmJiBmb250X3ZhbHVlID09IGN1c3RvbV9mb250X3ZhbHVlICYmIGxldHRlcl92YWx1ZSA9PSBjdXN0b21fbGV0dGVyX3ZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHF0eV9uZXcgPSBnZXQoXCIuanMtcXR5LXZhbHVlXCIsIGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YXJpYW50SWRfbmV3ID0gcXR5X25ldy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocXR5X25ldy52YWx1ZSA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF0eV9uZXcudmFsdWUtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlQ2FydEl0ZW0oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHZhcmlhbnRJZF9uZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWFudGl0eTogcXR5X25ldy52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF90aXRsZTogcHJvZHVjdF90aXRsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0X3ZhcmlhbnQgOiArdGFyZ2V0X3Byb2R1Y3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udDogY3VzdG9tX2ZvbnRfdmFsdWUucmVwbGFjZSgvXFxuL2csIFwiXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlcjogY3VzdG9tX2xldHRlcl92YWx1ZS5yZXBsYWNlKC9cXG4vZywgXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXR5LnZhbHVlLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VDYXJ0SXRlbSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHZhcmlhbnRJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWFudGl0eTogcXR5LnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbWl6ZV9mb250OiBmb250X3ZhbHVlLnJlcGxhY2UoL1xcbi9nLCBcIlwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9taXplX2xldHRlcjogbGV0dGVyX3ZhbHVlLnJlcGxhY2UoL1xcbi9nLCBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mZXRjaENhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJFcnJvciB3aXRoIG1pbnVzUXVhbnRpdHk6IFwiLCBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkVycm9yIHdpdGggbWludXNRdWFudGl0eTogXCIsIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHN0YXR1cyA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hDYXJ0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5taW51c1F1YW50aXR5KHZhcmlhbnRJZCwgcXR5LCB0aGlzLmZldGNoQ2FydClcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLm1pbnVzUXVhbnRpdHkodmFyaWFudElkLCBxdHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hDYXJ0XHJcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLm1pbnVzUXVhbnRpdHkodmFyaWFudElkLCBxdHksIHRoaXMuZmV0Y2hDYXJ0KVxyXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5taW51c1F1YW50aXR5KHZhcmlhbnRJZCwgcXR5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gQk9MRCBQUklDSU5HXHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LkJPTEQgJiZcclxuICAgICAgICAgICAgICAgICAgICBCT0xELmNvbW1vbiAmJlxyXG4gICAgICAgICAgICAgICAgICAgIEJPTEQuY29tbW9uLmV2ZW50RW1pdHRlciAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiBCT0xELmNvbW1vbi5ldmVudEVtaXR0ZXIuZW1pdCA9PT0gXCJmdW5jdGlvblwiXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICBCT0xELmNvbW1vbi5ldmVudEVtaXR0ZXIuZW1pdChcIkJPTERfQ09NTU9OX2NhcnRfbG9hZGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHBsdXNRdHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGN1c3RvbV9wcm9kdWN0KXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9udF92YWx1ZSA9IGdldChcIi5mb250X3ZhbHVlXCIsIGl0ZW0pLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsZXR0ZXJfdmFsdWUgPWdldChcIi5sZXR0ZXJfdmFsdWVcIiwgaXRlbSkudGV4dENvbnRlbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9udF9jYXJkID0gZ2V0KCcucF92YXJpYW50X2lkJywgaXRlbSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihmb250X2NhcmQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldF9wcm9kdWN0ID0gZm9udF9jYXJkLnRleHRDb250ZW50LnJlcGxhY2UoL1xcbi9nLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXN0b21fZm9udF92YWx1ZSA9IGdldChcIi5mb250X3ZhbHVlXCIsIGl0ZW0pLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1c3RvbV9sZXR0ZXJfdmFsdWUgPWdldChcIi5sZXR0ZXJfdmFsdWVcIiwgaXRlbSkudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvZHVjdF90aXRsZT1nZXQoXCIucHJvZHVjdF90aXRsZVwiLCBpdGVtKS50ZXh0Q29udGVudC5yZXBsYWNlKC9cXG4vZywgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih2YXJpYW50SWQgPT0gdGFyZ2V0X3Byb2R1Y3QgJiYgZm9udF92YWx1ZSA9PSBjdXN0b21fZm9udF92YWx1ZSAmJiBsZXR0ZXJfdmFsdWUgPT0gY3VzdG9tX2xldHRlcl92YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHF0eV9uZXcgPSBnZXQoXCIuanMtcXR5LXZhbHVlXCIsIGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YXJpYW50SWRfbmV3ID0gcXR5X25ldy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdHlfbmV3LnZhbHVlID49IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXR5X25ldy52YWx1ZSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VDYXJ0SXRlbSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogdmFyaWFudElkX25ldyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1YW50aXR5OiBxdHlfbmV3LnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczogeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0X3RpdGxlOiBwcm9kdWN0X3RpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RfdmFyaWFudCA6ICt0YXJnZXRfcHJvZHVjdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250OiBjdXN0b21fZm9udF92YWx1ZS5yZXBsYWNlKC9cXG4vZywgXCJcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyOiBjdXN0b21fbGV0dGVyX3ZhbHVlLnJlcGxhY2UoL1xcbi9nLCBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdHkudmFsdWUrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZUNhcnRJdGVtKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogdmFyaWFudElkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1YW50aXR5OiBxdHkudmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczogeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9taXplX2ZvbnQ6IGZvbnRfdmFsdWUucmVwbGFjZSgvXFxuL2csIFwiXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21pemVfbGV0dGVyOiBsZXR0ZXJfdmFsdWUucmVwbGFjZSgvXFxuL2csIFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZldGNoQ2FydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkVycm9yIHdpdGggUGx1c1F1YW50aXR5OiBcIiwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJFcnJvciB3aXRoIFBsdXNRdWFudGl0eTogXCIsIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZldGNoQ2FydFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMucGx1c1F1YW50aXR5KHZhcmlhbnRJZCwgcXR5LCB0aGlzLmZldGNoQ2FydClcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnBsdXNRdWFudGl0eSh2YXJpYW50SWQsIHF0eSk7XHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIEJPTEQgUFJJQ0lOR1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5CT0xEICYmXHJcbiAgICAgICAgICAgICAgICAgICAgQk9MRC5jb21tb24gJiZcclxuICAgICAgICAgICAgICAgICAgICBCT0xELmNvbW1vbi5ldmVudEVtaXR0ZXIgJiZcclxuICAgICAgICAgICAgICAgICAgICB0eXBlb2YgQk9MRC5jb21tb24uZXZlbnRFbWl0dGVyLmVtaXQgPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgQk9MRC5jb21tb24uZXZlbnRFbWl0dGVyLmVtaXQoXCJCT0xEX0NPTU1PTl9jYXJ0X2xvYWRlZFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBxdHkuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mZXRjaENhcnRcclxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMuc2V0UXVhbnRpdHkodmFyaWFudElkLCBlLnRhcmdldC52YWx1ZSwgdGhpcy5mZXRjaENhcnQpXHJcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnNldFF1YW50aXR5KHZhcmlhbnRJZCwgZS50YXJnZXQudmFsdWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRRdWFudGl0eShpdGVtSWQsIHF0eSwgZmV0Y2hDYXJ0KSB7XHJcbiAgICAgICAgY2hhbmdlQ2FydEl0ZW0oe1xyXG4gICAgICAgICAgICBpZDogaXRlbUlkLFxyXG4gICAgICAgICAgICBxdWFudGl0eTogcXR5LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGZldGNoQ2FydCA/IGZldGNoQ2FydCgpIDogd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkVycm9yIHdpdGggc2V0UXVhbnRpdHk6IFwiLCBlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcGx1c1F1YW50aXR5KGl0ZW1JZCwgcXR5RWxlbSwgZmV0Y2hDYXJ0KSB7XHJcbiAgICAgICAgcXR5RWxlbS52YWx1ZSsrO1xyXG4gICAgICAgIGNoYW5nZUNhcnRJdGVtKHtcclxuICAgICAgICAgICAgaWQ6IGl0ZW1JZCxcclxuICAgICAgICAgICAgcXVhbnRpdHk6IHF0eUVsZW0udmFsdWUsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZmV0Y2hDYXJ0ID8gZmV0Y2hDYXJ0KCkgOiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiRXJyb3Igd2l0aCBwbHVzUXVhbnRpdHk6IFwiLCBlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbWludXNRdWFudGl0eShpdGVtSWQsIHF0eUVsZW0sIGZldGNoQ2FydCkge1xyXG4gICAgICAgIGlmIChxdHlFbGVtLnZhbHVlID49IDEpIHtcclxuICAgICAgICAgICAgcXR5RWxlbS52YWx1ZS0tO1xyXG4gICAgICAgICAgICBjaGFuZ2VDYXJ0SXRlbSh7XHJcbiAgICAgICAgICAgICAgICBpZDogaXRlbUlkLFxyXG4gICAgICAgICAgICAgICAgcXVhbnRpdHk6IHF0eUVsZW0udmFsdWUsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2hDYXJ0ID8gZmV0Y2hDYXJ0KCkgOiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiRXJyb3Igd2l0aCBtaW51c1F1YW50aXR5OiBcIiwgZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFF1YW50aXR5IH07XHJcbiIsImltcG9ydCB7IGdldCwgZ2V0QWxsLCBzZXJpYWxpemVGb3JtLCBmZXRjaENvbmZpZyB9IGZyb20gXCJAL3V0aWxzXCI7XHJcblxyXG5jbGFzcyBTdWJtaXRCdG4ge1xyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgZmV0Y2hDYXJ0KSB7XHJcbiAgICAgICAgdGhpcy5jYXJ0ID0gZWxlbWVudDtcclxuICAgICAgICB0aGlzLml0ZW1zID0gZ2V0QWxsKFwiLnVwc2VsbF9zZWN0aW9uX3Byb2R1Y3RcIiwgdGhpcy5jYXJ0KTtcclxuICAgICAgICB0aGlzLmZldGNoQ2FydCA9IGZldGNoQ2FydDtcclxuICAgICAgICB0aGlzLmJpbmRMaXN0ZW5lcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRMaXN0ZW5lciA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICBjb25zdCBzdWJtaXRidG4gPSAgZ2V0KCcuanMtcHJvZHVjdC1mb3JtLXN1Ym1pdCcsIGl0ZW0pO1xyXG4gICAgICAgXHJcbiAgICAgICAgICAgc3VibWl0YnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHZhciBwcm9kdWN0X2Zvcm0gPSBzdWJtaXRidG4uY2xvc2VzdCgnLmpzLXByb2R1Y3QtZm9ybScpO1xyXG4gICAgICAgICAgICAgICAgc3VibWl0YnRuLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgc3VibWl0YnRuLmlubmVySFRNTCA9IFwiQWRkaW5nXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdERhdGEocHJvZHVjdF9mb3JtKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHN1Ym1pdERhdGEoUHJvZHVjdEZvcm0pIHtcclxuICAgICAgICB2YXIgYnRuID0gZ2V0KFwiLmpzLXByb2R1Y3QtZm9ybS1zdWJtaXRcIiwgdGhpcy5jYXJ0KTtcclxuICAgICAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAuLi5KU09OLnBhcnNlKHNlcmlhbGl6ZUZvcm0oUHJvZHVjdEZvcm0pKSxcclxuICAgICAgICAgICAgc2VjdGlvbnNfdXJsOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZldGNoKGAke3JvdXRlcy5jYXJ0X2FkZF91cmx9YCwgeyAuLi5mZXRjaENvbmZpZyhcImphdmFzY3JpcHRcIiksIGJvZHkgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuZmV0Y2hDYXJ0KCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4gY29uc29sZS5lcnJvcihlKSlcclxuICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYnRuLmlubmVySFRNTCA9IFwiQWRkZWRcIjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgIFxyXG59XHJcblxyXG5leHBvcnQgeyBTdWJtaXRCdG4gfTtcclxuIiwiaW1wb3J0IHsgZ2V0LCBnZXRBbGwgfSBmcm9tIFwiQC91dGlsc1wiO1xyXG5cclxuY2xhc3MgVmFyaWFudCB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBmZXRjaENhcnQpIHtcclxuICAgICAgICB0aGlzLmNhcnQgPSBlbGVtZW50O1xyXG4gICAgICAgIHRoaXMuaXRlbXMgPSBnZXRBbGwoXCIudXBzZWxsX3NlY3Rpb25fcHJvZHVjdFwiLCB0aGlzLmNhcnQpO1xyXG4gICAgICAgIHRoaXMuZmV0Y2hDYXJ0ID0gZmV0Y2hDYXJ0O1xyXG4gICAgICAgIHRoaXMuYmluZExpc3RlbmVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZExpc3RlbmVyID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgIGNvbnN0IHZhcmlhbnRzID0gIGdldEFsbCgnLmpzLXByb2R1Y3QtdmFyaWFudCcsIGl0ZW0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyaWFudHMuZm9yRWFjaCh2YXJpYW50ID0+IHtcclxuICAgICAgICAgICAgICAgIHZhcmlhbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2RfaWQgPSB2YXJpYW50LmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9kdWN0LWlkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb2R1Y3RfZm9ybSA9IHZhcmlhbnQuY2xvc2VzdCgnLmpzLXByb2R1Y3QtZm9ybScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2YXJpYW50X2lkID0gZ2V0KFwiLmMtcHJvZHVjdF9fdmFyaWFudElkXCIsIHByb2R1Y3RfZm9ybSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyaWFudF9pZC52YWx1ZSA9IHByb2RfaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IHZhcmlhbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWltZy11cmwnKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB2YXJpYW50cy5mb3JFYWNoKHJtSXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJtSXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXJpYW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW1nICE9IG51bGwgJiYgaW1nICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0SW1nID0gZ2V0KCcuYy1wcm9kdWN0LWNhcmRfX2ltYWdlLmZpcnN0LWltYWdlJywgdmFyaWFudC5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RJbWcuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGh0bWwgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7aW1nfVwiIGNsYXNzPVwiby1pbWcgby1pbWctLWNvdmVyICBvLWFyX19pdGVtXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RJbWcuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IHsgVmFyaWFudCB9O1xyXG4iLCJleHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplRm9ybShmb3JtKSB7XHJcbiAgICBjb25zdCBvYmogPSB7fTtcclxuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xyXG4gICAgZm9yIChjb25zdCBrZXkgb2YgZm9ybURhdGEua2V5cygpKSB7XHJcbiAgICAgICAgb2JqW2tleV0gPSBmb3JtRGF0YS5nZXQoa2V5KTtcclxuICAgIH1cclxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hDb25maWcodHlwZSA9IFwianNvblwiKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgQWNjZXB0OiBgYXBwbGljYXRpb24vJHt0eXBlfWAsXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbn1cclxuIiwiLyogZXNsaW50LWRpc2FibGUgKi9cclxuaW1wb3J0ICogYXMgY3VycmVuY3kgZnJvbSBcIkBzaG9waWZ5L3RoZW1lLWN1cnJlbmN5XCI7XHJcblxyXG4vLyBFVkVOVFNcclxuXHJcbmV4cG9ydCBjb25zdCBDVVJSRU5DWV9DSEFOR0VfRVZFTlQgPSBcIkNVUlJFTkNZX0NIQU5HRURcIjtcclxuXHJcbi8vIEZPUk1BVCBNT05FWVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdE1vbmV5KHsgbW9uZXksIGZvcm1hdCB9OiB7IG1vbmV5OiBudW1iZXI7IGZvcm1hdD86IHN0cmluZyB9KSB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdy5BQ1NDdXJyZW5jeT8uZm9ybWF0TW9uZXkgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIGNvbnN0IHJlZiA9IHdpbmRvdy5BQ1NDdXJyZW5jeTtcclxuICAgICAgICBjb25zdCBjb252ZXJ0ZWRNb25leSA9IHJlZi5jb252ZXJ0KG1vbmV5LCBcIkdCUFwiLCByZWYuY3VycmVudEN1cnJlbmN5KTtcclxuICAgICAgICByZXR1cm4gcmVmLmZvcm1hdE1vbmV5KFxyXG4gICAgICAgICAgICBOdW1iZXIuaXNOYU4oY29udmVydGVkTW9uZXkpID8gbW9uZXkgOiBjb252ZXJ0ZWRNb25leSxcclxuICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxyXG4gICAgICAgICAgICBmb3JtYXQgfHwgcmVmLm1vbmV5Rm9ybWF0c1tyZWYuY3VycmVudEN1cnJlbmN5XT8ubW9uZXlfZm9ybWF0IHx8IHdpbmRvdy5zaG9wTW9uZXlGb3JtYXRcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcclxuICAgIHJldHVybiBjdXJyZW5jeS5mb3JtYXRNb25leShtb25leSwgZm9ybWF0IHx8IHdpbmRvdy5zaG9wTW9uZXlGb3JtYXQpO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2xlYXJDYXJ0KCkge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiL2NhcnQvY2xlYXIuanNcIiwgeyBtZXRob2Q6IFwiUE9TVFwiIH0pO1xyXG59XHJcblxyXG4vLyBBREQgVE8gQ0FSVFxyXG50eXBlIEFkZFRvQ2FydERhdGEgPSB7IGlkOiBudW1iZXI7IHF1YW50aXR5OiBudW1iZXIgfSB8IHsgbGluZTogbnVtYmVyOyBxdWFudGl0eTogbnVtYmVyIH07XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkVG9DYXJ0KGRhdGE6IEFkZFRvQ2FydERhdGFbXSkge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiL2NhcnQvYWRkLmpzXCIsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGl0ZW1zOiBkYXRhIH0pLFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vICBVUERBVEUgQ0FSVFxyXG50eXBlIFVwZGF0ZUNhcnREYXRhID0gUmVjb3JkPHN0cmluZywgbnVtYmVyPjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVDYXJ0KGRhdGE6IFVwZGF0ZUNhcnREYXRhKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCIvY2FydC91cGRhdGUuanNcIiwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdXBkYXRlczogZGF0YSB9KSxcclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyBDSEFOR0UgQ0FSVCBJVEVNXHJcblxyXG50eXBlIENoYW5nZUNhcnRJdGVtID0gUmVjb3JkPHN0cmluZywgbnVtYmVyPjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGFuZ2VDYXJ0SXRlbShkYXRhOiBDaGFuZ2VDYXJ0SXRlbSkge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiL2NhcnQvY2hhbmdlLmpzXCIsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyBHRVQgUFJPRFVDVFNcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUHJvZHVjdEluZm8ge1xyXG4gICAgYXZhaWxhYmxlOiBib29sZWFuO1xyXG4gICAgcHJpY2U6IG51bWJlcjtcclxuICAgIHZhcmlhbnRzOiBSZWNvcmQ8XHJcbiAgICAgICAgbnVtYmVyLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYXZhaWxhYmxlOiBib29sZWFuO1xyXG4gICAgICAgICAgICBpbnZlbnRvcnlRdWFudGl0eTogbnVtYmVyIHwgbnVsbDtcclxuICAgICAgICB9XHJcbiAgICA+O1xyXG4gICAgY29tcGFyZUF0UHJpY2U/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQcm9kdWN0c0luZm8oaGFuZGxlczogc3RyaW5nW10pOiBQcm9taXNlPFJlY29yZDxudW1iZXIsIFByb2R1Y3RJbmZvPj4ge1xyXG4gICAgY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xyXG4gICAgY29uc3QgQVBJX1VSTCA9IG5ldyBVUkwoXCIvc2VhcmNoXCIsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xyXG4gICAgQVBJX1VSTC5zZWFyY2hQYXJhbXMuc2V0KFwic2VjdGlvbl9pZFwiLCBcImpzb24tcHJvZHVjdHNcIik7XHJcblxyXG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcclxuICAgIGNvbnN0IGhhbmRsZXNDb3B5ID0gWy4uLmhhbmRsZXNdO1xyXG4gICAgd2hpbGUgKGhhbmRsZXNDb3B5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICBjb25zdCBjaHVuayA9IGhhbmRsZXNDb3B5LnNwbGljZSgwLCAxNSk7XHJcbiAgICAgICAgQVBJX1VSTC5zZWFyY2hQYXJhbXMuc2V0KFwicVwiLCBjaHVuay5qb2luKFwiLFwiKSk7XHJcbiAgICAgICAgcHJvbWlzZXMucHVzaChcclxuICAgICAgICAgICAgKGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QVBJX1VSTH1gKS50aGVuKChyZXMpID0+IHJlcy50ZXh0KCkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgRE9NID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhyZXNwb25zZSwgXCJ0ZXh0L2h0bWxcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0c1Jlc3BvbnNlSFRNTCA9IERPTS5xdWVyeVNlbGVjdG9yKFwiI3Byb2R1Y3RzLWRhdGFcIikhO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocHJvZHVjdHNSZXNwb25zZUhUTUwuaW5uZXJIVE1MKTtcclxuICAgICAgICAgICAgfSkoKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKChyZXMpID0+XHJcbiAgICAgICAgcmVzLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiAoeyAuLi5hY2MsIC4uLmN1cnIgfSksIHt9KVxyXG4gICAgKTtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduID8gT2JqZWN0LmFzc2lnbi5iaW5kKCkgOiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59Il0sIm5hbWVzIjpbImdldCIsImdldEFsbCIsImNoYW5nZUNhcnRJdGVtIiwiUXVhbnRpdHkiLCJjb25zdHJ1Y3RvciIsImVsZW1lbnQiLCJmZXRjaENhcnQiLCJjYXJ0IiwiYmluZExpc3RlbmVyIiwidXBkYXRlUXR5IiwiaXRlbXMiLCJmb3JFYWNoIiwiaXRlbSIsIm1pbnVzUXR5IiwicGx1c1F0eSIsInF0eSIsInZhcmlhbnRJZCIsImdldEF0dHJpYnV0ZSIsImN1c3RvbV9wcm9kdWN0IiwiY3VzdG9tX2ZvbnQiLCJhZGRFdmVudExpc3RlbmVyIiwic3RhdHVzIiwiZm9udF92YWx1ZSIsInRleHRDb250ZW50IiwibGV0dGVyX3ZhbHVlIiwiZm9udF9jYXJkIiwidGFyZ2V0X3Byb2R1Y3QiLCJyZXBsYWNlIiwiY3VzdG9tX2ZvbnRfdmFsdWUiLCJjdXN0b21fbGV0dGVyX3ZhbHVlIiwicHJvZHVjdF90aXRsZSIsInF0eV9uZXciLCJ2YXJpYW50SWRfbmV3IiwidmFsdWUiLCJpZCIsInF1YW50aXR5IiwicHJvcGVydGllcyIsInByb2R1Y3RfdmFyaWFudCIsImZvbnQiLCJsZXR0ZXIiLCJ0aGVuIiwiY3VzdG9taXplX2ZvbnQiLCJjdXN0b21pemVfbGV0dGVyIiwiY2F0Y2giLCJlIiwiY29uc29sZSIsIndhcm4iLCJtaW51c1F1YW50aXR5Iiwid2luZG93IiwiQk9MRCIsImNvbW1vbiIsImV2ZW50RW1pdHRlciIsImVtaXQiLCJwbHVzUXVhbnRpdHkiLCJzZXRRdWFudGl0eSIsInRhcmdldCIsIml0ZW1JZCIsImxvY2F0aW9uIiwicmVsb2FkIiwicXR5RWxlbSIsInNlcmlhbGl6ZUZvcm0iLCJmZXRjaENvbmZpZyIsIlN1Ym1pdEJ0biIsInN1Ym1pdGJ0biIsInByZXZlbnREZWZhdWx0IiwicHJvZHVjdF9mb3JtIiwiY2xvc2VzdCIsInNldEF0dHJpYnV0ZSIsImlubmVySFRNTCIsInN1Ym1pdERhdGEiLCJQcm9kdWN0Rm9ybSIsImJ0biIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicGFyc2UiLCJzZWN0aW9uc191cmwiLCJwYXRobmFtZSIsImZldGNoIiwicm91dGVzIiwiY2FydF9hZGRfdXJsIiwicmVzcG9uc2UiLCJqc29uIiwiZXJyb3IiLCJmaW5hbGx5IiwiVmFyaWFudCIsInZhcmlhbnRzIiwidmFyaWFudCIsInByb2RfaWQiLCJ2YXJpYW50X2lkIiwiaW1nIiwicm1JdGVtIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwiZmlyc3RJbWciLCJwYXJlbnROb2RlIiwiaHRtbCIsImZvcm0iLCJvYmoiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwia2V5Iiwia2V5cyIsInR5cGUiLCJtZXRob2QiLCJoZWFkZXJzIiwiQWNjZXB0IiwiY3VycmVuY3kiLCJDVVJSRU5DWV9DSEFOR0VfRVZFTlQiLCJmb3JtYXRNb25leSIsIm1vbmV5IiwiZm9ybWF0IiwiQUNTQ3VycmVuY3kiLCJyZWYiLCJjb252ZXJ0ZWRNb25leSIsImNvbnZlcnQiLCJjdXJyZW50Q3VycmVuY3kiLCJOdW1iZXIiLCJpc05hTiIsIm1vbmV5Rm9ybWF0cyIsIm1vbmV5X2Zvcm1hdCIsInNob3BNb25leUZvcm1hdCIsImNsZWFyQ2FydCIsImFkZFRvQ2FydCIsImRhdGEiLCJ1cGRhdGVDYXJ0IiwidXBkYXRlcyIsImdldFByb2R1Y3RzSW5mbyIsImhhbmRsZXMiLCJwYXJzZXIiLCJET01QYXJzZXIiLCJBUElfVVJMIiwiVVJMIiwib3JpZ2luIiwic2VhcmNoUGFyYW1zIiwic2V0IiwicHJvbWlzZXMiLCJoYW5kbGVzQ29weSIsImxlbmd0aCIsImNodW5rIiwic3BsaWNlIiwiam9pbiIsInB1c2giLCJyZXMiLCJ0ZXh0IiwiRE9NIiwicGFyc2VGcm9tU3RyaW5nIiwicHJvZHVjdHNSZXNwb25zZUhUTUwiLCJxdWVyeVNlbGVjdG9yIiwiUHJvbWlzZSIsImFsbCIsInJlZHVjZSIsImFjYyIsImN1cnIiXSwic291cmNlUm9vdCI6IiJ9