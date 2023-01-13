"use strict";
(self["webpackChunkjuno_shopify_template"] = self["webpackChunkjuno_shopify_template"] || []).push([["minicart"],{

/***/ "./src/assets/js/main/cart/Minicart.js":
/*!*********************************************!*\
  !*** ./src/assets/js/main/cart/Minicart.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MiniCart": () => (/* binding */ MiniCart)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");
/* harmony import */ var _functions_quantity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions/quantity */ "./src/assets/js/main/cart/functions/quantity.js");
/* harmony import */ var _functions_itemCount__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./functions/itemCount */ "./src/assets/js/main/cart/functions/itemCount.js");
/* harmony import */ var _functions_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/modal */ "./src/assets/js/main/cart/functions/modal.js");
/* harmony import */ var _functions_remove__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./functions/remove */ "./src/assets/js/main/cart/functions/remove.js");
/* harmony import */ var _functions_variant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./functions/variant */ "./src/assets/js/main/cart/functions/variant.js");
/* harmony import */ var _functions_submit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./functions/submit */ "./src/assets/js/main/cart/functions/submit.js");







class MiniCart {
  constructor(element) {
    this.initCart = () => {
      (0,_functions_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(this.element, this.openTrigger);
      (0,_functions_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(this.element);
      new _functions_quantity__WEBPACK_IMPORTED_MODULE_1__.Quantity(this.element, this.fetchCart);
      new _functions_remove__WEBPACK_IMPORTED_MODULE_2__.Remove(this.element, this.fetchCart);
      new _functions_variant__WEBPACK_IMPORTED_MODULE_3__.Variant(this.element, this.fetchCart);
      new _functions_submit__WEBPACK_IMPORTED_MODULE_4__.SubmitBtn(this.element, this.fetchCart);
    };

    this.fetchCart = () => {
      fetch("/cart").then(response => {
        response.text().then(html => {
          this.renderCart(html);
        }).catch(e => {
          console.warn("response.text error: ", e);
        });
      }).catch(err => console.warn("Something went wrong.", err));
    };

    this.renderCart = cart => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(cart, "text/html");
      const cartItems = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.get)(".js-mini-cart", doc);
      this.element.innerHTML = cartItems.innerHTML;
      this.initCart();
      (0,_functions_itemCount__WEBPACK_IMPORTED_MODULE_6__.itemCount)(); // BOLD PRICING

      if (window.BOLD && BOLD.common && BOLD.common.eventEmitter && typeof BOLD.common.eventEmitter.emit === "function") {
        BOLD.common.eventEmitter.emit("BOLD_COMMON_cart_loaded");
      }
    };

    this.element = element;
    this.openTrigger = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.get)(".js-minicart-trigger", document);
    this.container = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.get)(".js-mini-cart", this.element);
    if (this.openTrigger) this.bindEvents();
  }

  bindEvents() {
    (0,_functions_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(this.element, this.openTrigger);
    (0,_functions_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(this.element);
    new _functions_quantity__WEBPACK_IMPORTED_MODULE_1__.Quantity(this.element, this.fetchCart);
    new _functions_remove__WEBPACK_IMPORTED_MODULE_2__.Remove(this.element, this.fetchCart);
    new _functions_variant__WEBPACK_IMPORTED_MODULE_3__.Variant(this.element, this.fetchCart);
    new _functions_submit__WEBPACK_IMPORTED_MODULE_4__.SubmitBtn(this.element, this.fetchCart);
  }

}

/***/ }),

/***/ "./src/assets/js/main/cart/functions/itemCount.js":
/*!********************************************************!*\
  !*** ./src/assets/js/main/cart/functions/itemCount.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "itemCount": () => (/* binding */ itemCount)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");


const itemCount = () => {
  const cartCount = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-minicart-count", document);
  fetch("/cart.js").then(response => response.json()).then(data => {
    cartCount.innerHTML = data.item_count;
  });
};



/***/ }),

/***/ "./src/assets/js/main/cart/functions/modal.js":
/*!****************************************************!*\
  !*** ./src/assets/js/main/cart/functions/modal.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/body-scroll-lock.ts");


const openModal = (element, openTrigger) => {
  if (openTrigger) {
    openTrigger.addEventListener("click", event => {
      event.preventDefault();
      element.classList.add("is-active");
    });
  }
};

const closeModal = element => {
  const closeTrigger = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".modal_close", element);

  if (closeTrigger) {
    closeTrigger.addEventListener("click", event => {
      event.preventDefault();
      element.classList.remove("is-active");
      undefined.overlay.classList.remove("is-active");
      document.querySelector('.c-model__overlay').classList.remove('is-active');
      _utils__WEBPACK_IMPORTED_MODULE_1__.release();
      console.log("default modal here");
      document.querySelector('body').style.overflowY = "auto";
    });
  }
};



/***/ }),

/***/ "./src/assets/js/main/cart/functions/remove.js":
/*!*****************************************************!*\
  !*** ./src/assets/js/main/cart/functions/remove.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Remove": () => (/* binding */ Remove)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");
/* harmony import */ var _utils_shopify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/shopify */ "./src/assets/js/utils/shopify.ts");



class Remove {
  constructor(element, fetchCart) {
    this.bindListener = () => {
      this.items.forEach(item => {
        const remove = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-remove-item", item);
        const custom_product = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".custom-product", item);
        remove.addEventListener("click", e => {
          const qty = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-qty-value", item);
          const variantId = qty.getAttribute("data-id");

          if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".font_value", item)) {
            var font_value = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".font_value", item).textContent;
          }

          if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".letter_value", item)) {
            var letter_value = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".letter_value", item).textContent;
          }

          if (custom_product) {
            this.items.forEach(newitem => {
              var font_card = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.p_variant_id', newitem);

              if (font_card) {
                var target_product = font_card.textContent.replace(/\n/g, "");
                var custom_font_value = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".font_value", newitem).textContent;
                var custom_letter_value = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".letter_value", newitem).textContent;
                var product_title = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".product_title", newitem).textContent.replace(/\n/g, "");
                const newremove = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-remove-item", newitem);

                if (variantId == target_product && font_value == custom_font_value && letter_value == custom_letter_value) {
                  (0,_utils_shopify__WEBPACK_IMPORTED_MODULE_1__.changeCartItem)({
                    id: newremove.dataset.id,
                    quantity: 0
                  }).then(() => {
                    this.removeItem(item, remove.dataset.id);
                  }).catch(e => {
                    console.warn("Error with removeItem: ", e);
                  });
                  newitem.remove();
                }
              }
            });
          } else {
            e.preventDefault();
            this.removeItem(item, remove.dataset.id);
          }
        });
      });
    };

    this.removeItem = (item, itemId) => {
      (0,_utils_shopify__WEBPACK_IMPORTED_MODULE_1__.changeCartItem)({
        id: itemId,
        quantity: 0
      }).then(() => {
        this.fetchCart();
      }).catch(e => {
        console.warn("Error with removeItem: ", e);
      });
      item.remove();
    };

    this.cart = element;
    this.items = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)(".js-cart-item", this.cart);
    this.fetchCart = fetchCart;
    this.bindListener();
  }

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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL21pbmljYXJ0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFTyxNQUFNUSxRQUFOLENBQWU7RUFDbEJDLFdBQVcsQ0FBQ0MsT0FBRCxFQUFVO0lBQUEsS0FvQnJCQyxRQXBCcUIsR0FvQlYsTUFBTTtNQUNiUiwyREFBUyxDQUFDLEtBQUtPLE9BQU4sRUFBZSxLQUFLRSxXQUFwQixDQUFUO01BQ0FSLDREQUFVLENBQUMsS0FBS00sT0FBTixDQUFWO01BQ0EsSUFBSVQseURBQUosQ0FBYSxLQUFLUyxPQUFsQixFQUEyQixLQUFLRyxTQUFoQztNQUNBLElBQUlSLHFEQUFKLENBQVcsS0FBS0ssT0FBaEIsRUFBeUIsS0FBS0csU0FBOUI7TUFDQSxJQUFJUCx1REFBSixDQUFZLEtBQUtJLE9BQWpCLEVBQTBCLEtBQUtHLFNBQS9CO01BQ0EsSUFBSU4sd0RBQUosQ0FBYyxLQUFLRyxPQUFuQixFQUE0QixLQUFLRyxTQUFqQztJQUVILENBNUJvQjs7SUFBQSxLQThCckJBLFNBOUJxQixHQThCVCxNQUFNO01BQ2RDLEtBQUssQ0FBQyxPQUFELENBQUwsQ0FDS0MsSUFETCxDQUNXQyxRQUFELElBQWM7UUFDaEJBLFFBQVEsQ0FDSEMsSUFETCxHQUVLRixJQUZMLENBRVdHLElBQUQsSUFBVTtVQUNaLEtBQUtDLFVBQUwsQ0FBZ0JELElBQWhCO1FBQ0gsQ0FKTCxFQUtLRSxLQUxMLENBS1lDLENBQUQsSUFBTztVQUNWQyxPQUFPLENBQUNDLElBQVIsQ0FBYSx1QkFBYixFQUFzQ0YsQ0FBdEM7UUFDSCxDQVBMO01BUUgsQ0FWTCxFQVdLRCxLQVhMLENBV1lJLEdBQUQsSUFBU0YsT0FBTyxDQUFDQyxJQUFSLENBQWEsdUJBQWIsRUFBc0NDLEdBQXRDLENBWHBCO0lBWUgsQ0EzQ29COztJQUFBLEtBNkNyQkwsVUE3Q3FCLEdBNkNQTSxJQUFELElBQVU7TUFDbkIsTUFBTUMsTUFBTSxHQUFHLElBQUlDLFNBQUosRUFBZjtNQUNBLE1BQU1DLEdBQUcsR0FBR0YsTUFBTSxDQUFDRyxlQUFQLENBQXVCSixJQUF2QixFQUE2QixXQUE3QixDQUFaO01BQ0EsTUFBTUssU0FBUyxHQUFHOUIsMkNBQUcsQ0FBQyxlQUFELEVBQWtCNEIsR0FBbEIsQ0FBckI7TUFFQSxLQUFLbEIsT0FBTCxDQUFhcUIsU0FBYixHQUF5QkQsU0FBUyxDQUFDQyxTQUFuQztNQUNBLEtBQUtwQixRQUFMO01BQ0FULCtEQUFTLEdBUFUsQ0FRbkI7O01BQ0EsSUFDSThCLE1BQU0sQ0FBQ0MsSUFBUCxJQUNBQSxJQUFJLENBQUNDLE1BREwsSUFFQUQsSUFBSSxDQUFDQyxNQUFMLENBQVlDLFlBRlosSUFHQSxPQUFPRixJQUFJLENBQUNDLE1BQUwsQ0FBWUMsWUFBWixDQUF5QkMsSUFBaEMsS0FBeUMsVUFKN0MsRUFLRTtRQUNFSCxJQUFJLENBQUNDLE1BQUwsQ0FBWUMsWUFBWixDQUF5QkMsSUFBekIsQ0FBOEIseUJBQTlCO01BQ0g7SUFDSixDQTlEb0I7O0lBRWpCLEtBQUsxQixPQUFMLEdBQWVBLE9BQWY7SUFDQSxLQUFLRSxXQUFMLEdBQW1CWiwyQ0FBRyxDQUFDLHNCQUFELEVBQXlCcUMsUUFBekIsQ0FBdEI7SUFDQSxLQUFLQyxTQUFMLEdBQWlCdEMsMkNBQUcsQ0FBQyxlQUFELEVBQWtCLEtBQUtVLE9BQXZCLENBQXBCO0lBQ0EsSUFBSSxLQUFLRSxXQUFULEVBQXNCLEtBQUsyQixVQUFMO0VBRXpCOztFQUVEQSxVQUFVLEdBQUc7SUFFVHBDLDJEQUFTLENBQUMsS0FBS08sT0FBTixFQUFlLEtBQUtFLFdBQXBCLENBQVQ7SUFDQVIsNERBQVUsQ0FBQyxLQUFLTSxPQUFOLENBQVY7SUFDQSxJQUFJVCx5REFBSixDQUFhLEtBQUtTLE9BQWxCLEVBQTJCLEtBQUtHLFNBQWhDO0lBQ0EsSUFBSVIscURBQUosQ0FBVyxLQUFLSyxPQUFoQixFQUF5QixLQUFLRyxTQUE5QjtJQUNBLElBQUlQLHVEQUFKLENBQVksS0FBS0ksT0FBakIsRUFBMEIsS0FBS0csU0FBL0I7SUFDQSxJQUFJTix3REFBSixDQUFjLEtBQUtHLE9BQW5CLEVBQTRCLEtBQUtHLFNBQWpDO0VBQ0g7O0FBbEJpQjs7Ozs7Ozs7Ozs7Ozs7O0FDUnRCOztBQUVBLE1BQU1YLFNBQVMsR0FBRyxNQUFNO0VBQ3BCLE1BQU1zQyxTQUFTLEdBQUd4QywyQ0FBRyxDQUFDLG9CQUFELEVBQXVCcUMsUUFBdkIsQ0FBckI7RUFDQXZCLEtBQUssQ0FBQyxVQUFELENBQUwsQ0FDS0MsSUFETCxDQUNXQyxRQUFELElBQWNBLFFBQVEsQ0FBQ3lCLElBQVQsRUFEeEIsRUFFSzFCLElBRkwsQ0FFVzJCLElBQUQsSUFBVTtJQUNaRixTQUFTLENBQUNULFNBQVYsR0FBc0JXLElBQUksQ0FBQ0MsVUFBM0I7RUFDSCxDQUpMO0FBS0gsQ0FQRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBOztBQUVBLE1BQU14QyxTQUFTLEdBQUcsQ0FBQ08sT0FBRCxFQUFVRSxXQUFWLEtBQTBCO0VBQ3hDLElBQUlBLFdBQUosRUFBaUI7SUFDYkEsV0FBVyxDQUFDaUMsZ0JBQVosQ0FBNkIsT0FBN0IsRUFBdUNDLEtBQUQsSUFBVztNQUM3Q0EsS0FBSyxDQUFDQyxjQUFOO01BQ0FyQyxPQUFPLENBQUNzQyxTQUFSLENBQWtCQyxHQUFsQixDQUFzQixXQUF0QjtJQUNILENBSEQ7RUFJSDtBQUNKLENBUEQ7O0FBU0EsTUFBTTdDLFVBQVUsR0FBSU0sT0FBRCxJQUFhO0VBQzVCLE1BQU13QyxZQUFZLEdBQUdsRCwyQ0FBRyxDQUFDLGNBQUQsRUFBaUJVLE9BQWpCLENBQXhCOztFQUNBLElBQUl3QyxZQUFKLEVBQWtCO0lBQ2RBLFlBQVksQ0FBQ0wsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBd0NDLEtBQUQsSUFBVztNQUM5Q0EsS0FBSyxDQUFDQyxjQUFOO01BQ0FyQyxPQUFPLENBQUNzQyxTQUFSLENBQWtCRyxNQUFsQixDQUF5QixXQUF6QjtNQUFzQyxTQUFJLENBQUNDLE9BQUwsQ0FBYUosU0FBYixDQUF1QkcsTUFBdkIsQ0FBOEIsV0FBOUI7TUFDdENkLFFBQVEsQ0FBQ2dCLGFBQVQsQ0FBdUIsbUJBQXZCLEVBQTRDTCxTQUE1QyxDQUFzREcsTUFBdEQsQ0FBNkQsV0FBN0Q7TUFDQVAsMkNBQUE7TUFDQXRCLE9BQU8sQ0FBQ2lDLEdBQVIsQ0FBWSxvQkFBWjtNQUNBbEIsUUFBUSxDQUFDZ0IsYUFBVCxDQUF1QixNQUF2QixFQUErQkcsS0FBL0IsQ0FBcUNDLFNBQXJDLEdBQStDLE1BQS9DO0lBQ0gsQ0FQRDtFQVFIO0FBQ0osQ0FaRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTs7QUFFQSxNQUFNcEQsTUFBTixDQUFhO0VBQ1RJLFdBQVcsQ0FBQ0MsT0FBRCxFQUFVRyxTQUFWLEVBQXFCO0lBQUEsS0FPaEMrQyxZQVBnQyxHQU9qQixNQUFNO01BQ2pCLEtBQUtDLEtBQUwsQ0FBV0MsT0FBWCxDQUFvQkMsSUFBRCxJQUFVO1FBQ3pCLE1BQU1aLE1BQU0sR0FBR25ELDJDQUFHLENBQUMsaUJBQUQsRUFBb0IrRCxJQUFwQixDQUFsQjtRQUNBLE1BQU1DLGNBQWMsR0FBR2hFLDJDQUFHLENBQUMsaUJBQUQsRUFBb0IrRCxJQUFwQixDQUExQjtRQUVBWixNQUFNLENBQUNOLGdCQUFQLENBQXdCLE9BQXhCLEVBQWtDeEIsQ0FBRCxJQUFPO1VBQ3BDLE1BQU00QyxHQUFHLEdBQUdqRSwyQ0FBRyxDQUFDLGVBQUQsRUFBa0IrRCxJQUFsQixDQUFmO1VBQ0EsTUFBTUcsU0FBUyxHQUFHRCxHQUFHLENBQUNFLFlBQUosQ0FBaUIsU0FBakIsQ0FBbEI7O1VBQ0EsSUFBR25FLDJDQUFHLENBQUMsYUFBRCxFQUFnQitELElBQWhCLENBQU4sRUFBNEI7WUFDeEIsSUFBSUssVUFBVSxHQUFHcEUsMkNBQUcsQ0FBQyxhQUFELEVBQWdCK0QsSUFBaEIsQ0FBSCxDQUF5Qk0sV0FBMUM7VUFDSDs7VUFDRCxJQUFHckUsMkNBQUcsQ0FBQyxlQUFELEVBQWtCK0QsSUFBbEIsQ0FBTixFQUE4QjtZQUMxQixJQUFJTyxZQUFZLEdBQUV0RSwyQ0FBRyxDQUFDLGVBQUQsRUFBa0IrRCxJQUFsQixDQUFILENBQTJCTSxXQUE3QztVQUNIOztVQUVELElBQUdMLGNBQUgsRUFBa0I7WUFDZCxLQUFLSCxLQUFMLENBQVdDLE9BQVgsQ0FBb0JTLE9BQUQsSUFBYTtjQUM1QixJQUFJQyxTQUFTLEdBQUd4RSwyQ0FBRyxDQUFDLGVBQUQsRUFBa0J1RSxPQUFsQixDQUFuQjs7Y0FDQSxJQUFHQyxTQUFILEVBQWE7Z0JBQ1QsSUFBSUMsY0FBYyxHQUFHRCxTQUFTLENBQUNILFdBQVYsQ0FBc0JLLE9BQXRCLENBQThCLEtBQTlCLEVBQXFDLEVBQXJDLENBQXJCO2dCQUNBLElBQUlDLGlCQUFpQixHQUFHM0UsMkNBQUcsQ0FBQyxhQUFELEVBQWdCdUUsT0FBaEIsQ0FBSCxDQUE0QkYsV0FBcEQ7Z0JBQ0EsSUFBSU8sbUJBQW1CLEdBQUU1RSwyQ0FBRyxDQUFDLGVBQUQsRUFBa0J1RSxPQUFsQixDQUFILENBQThCRixXQUF2RDtnQkFDQSxJQUFJUSxhQUFhLEdBQUM3RSwyQ0FBRyxDQUFDLGdCQUFELEVBQW1CdUUsT0FBbkIsQ0FBSCxDQUErQkYsV0FBL0IsQ0FBMkNLLE9BQTNDLENBQW1ELEtBQW5ELEVBQTBELEVBQTFELENBQWxCO2dCQUNBLE1BQU1JLFNBQVMsR0FBRzlFLDJDQUFHLENBQUMsaUJBQUQsRUFBb0J1RSxPQUFwQixDQUFyQjs7Z0JBQ0EsSUFBR0wsU0FBUyxJQUFJTyxjQUFiLElBQStCTCxVQUFVLElBQUlPLGlCQUE3QyxJQUFrRUwsWUFBWSxJQUFJTSxtQkFBckYsRUFBeUc7a0JBQ3JHakIsOERBQWMsQ0FBQztvQkFDWG9CLEVBQUUsRUFBRUQsU0FBUyxDQUFDRSxPQUFWLENBQWtCRCxFQURYO29CQUVYRSxRQUFRLEVBQUU7a0JBRkMsQ0FBRCxDQUFkLENBSUNsRSxJQUpELENBSU0sTUFBTTtvQkFDUixLQUFLbUUsVUFBTCxDQUFnQm5CLElBQWhCLEVBQXNCWixNQUFNLENBQUM2QixPQUFQLENBQWVELEVBQXJDO2tCQUNILENBTkQsRUFPQzNELEtBUEQsQ0FPUUMsQ0FBRCxJQUFPO29CQUNWQyxPQUFPLENBQUNDLElBQVIsQ0FBYSx5QkFBYixFQUF3Q0YsQ0FBeEM7a0JBQ0gsQ0FURDtrQkFVQWtELE9BQU8sQ0FBQ3BCLE1BQVI7Z0JBQ0g7Y0FDSjtZQUNKLENBdEJEO1VBd0JILENBekJELE1BeUJLO1lBQ0Q5QixDQUFDLENBQUMwQixjQUFGO1lBQ0EsS0FBS21DLFVBQUwsQ0FBZ0JuQixJQUFoQixFQUFzQlosTUFBTSxDQUFDNkIsT0FBUCxDQUFlRCxFQUFyQztVQUNIO1FBRUosQ0F4Q0Q7TUF5Q0gsQ0E3Q0Q7SUE4Q0gsQ0F0RCtCOztJQUFBLEtBd0RoQ0csVUF4RGdDLEdBd0RuQixDQUFDbkIsSUFBRCxFQUFPb0IsTUFBUCxLQUFrQjtNQUMzQnhCLDhEQUFjLENBQUM7UUFDWG9CLEVBQUUsRUFBRUksTUFETztRQUVYRixRQUFRLEVBQUU7TUFGQyxDQUFELENBQWQsQ0FJQ2xFLElBSkQsQ0FJTSxNQUFNO1FBQ1QsS0FBS0YsU0FBTDtNQUNGLENBTkQsRUFPQ08sS0FQRCxDQU9RQyxDQUFELElBQU87UUFDVkMsT0FBTyxDQUFDQyxJQUFSLENBQWEseUJBQWIsRUFBd0NGLENBQXhDO01BQ0gsQ0FURDtNQVVBMEMsSUFBSSxDQUFDWixNQUFMO0lBQ0gsQ0FwRStCOztJQUM1QixLQUFLMUIsSUFBTCxHQUFZZixPQUFaO0lBQ0EsS0FBS21ELEtBQUwsR0FBYUgsOENBQU0sQ0FBQyxlQUFELEVBQWtCLEtBQUtqQyxJQUF2QixDQUFuQjtJQUNBLEtBQUtaLFNBQUwsR0FBaUJBLFNBQWpCO0lBQ0EsS0FBSytDLFlBQUw7RUFDSDs7QUFOUTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIYixNQUFNd0IsTUFBTSxHQUFHL0MsUUFBUSxDQUFDZ0QsSUFBeEI7QUFFQSxJQUFJQyxrQkFBa0IsR0FBRyxFQUF6QjtBQUVPLFNBQVNDLElBQVQsR0FBZ0I7RUFDbkIsTUFBTTtJQUFFL0IsS0FBSyxFQUFFZ0M7RUFBVCxJQUF1QkosTUFBN0I7RUFFQUUsa0JBQWtCLEdBQUc7SUFDakI3QixTQUFTLEVBQUUrQixTQUFTLENBQUMvQixTQURKO0lBRWpCZ0MsU0FBUyxFQUFFRCxTQUFTLENBQUNDLFNBRko7SUFHakJDLFNBQVMsRUFBRTtFQUhNLENBQXJCO0VBTUFDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjUixNQUFNLENBQUM1QixLQUFyQixFQUE0QjtJQUN4QkMsU0FBUyxFQUFFLFFBRGE7SUFFeEJnQyxTQUFTLEVBQUUsT0FGYTtJQUd4QkMsU0FBUyxFQUFFO0VBSGEsQ0FBNUI7QUFLSDtBQUVNLFNBQVNwQyxPQUFULEdBQW1CO0VBQ3RCcUMsTUFBTSxDQUFDQyxNQUFQLENBQWNSLE1BQU0sQ0FBQzVCLEtBQXJCLEVBQTRCOEIsa0JBQTVCO0FBQ0giLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL21haW4vY2FydC9NaW5pY2FydC5qcyIsIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL21haW4vY2FydC9mdW5jdGlvbnMvaXRlbUNvdW50LmpzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvbWFpbi9jYXJ0L2Z1bmN0aW9ucy9tb2RhbC5qcyIsIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL21haW4vY2FydC9mdW5jdGlvbnMvcmVtb3ZlLmpzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvdXRpbHMvYm9keS1zY3JvbGwtbG9jay50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXQgfSBmcm9tIFwiQC91dGlsc1wiO1xyXG5pbXBvcnQgeyBRdWFudGl0eSB9IGZyb20gXCIuL2Z1bmN0aW9ucy9xdWFudGl0eVwiO1xyXG5pbXBvcnQgeyBpdGVtQ291bnQgfSBmcm9tIFwiLi9mdW5jdGlvbnMvaXRlbUNvdW50XCI7XHJcbmltcG9ydCB7IG9wZW5Nb2RhbCwgY2xvc2VNb2RhbCB9IGZyb20gXCIuL2Z1bmN0aW9ucy9tb2RhbFwiO1xyXG5pbXBvcnQgeyBSZW1vdmUgfSBmcm9tIFwiLi9mdW5jdGlvbnMvcmVtb3ZlXCI7XHJcbmltcG9ydCB7IFZhcmlhbnQgfSBmcm9tIFwiLi9mdW5jdGlvbnMvdmFyaWFudFwiO1xyXG5pbXBvcnQgeyBTdWJtaXRCdG4gfSBmcm9tIFwiLi9mdW5jdGlvbnMvc3VibWl0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWluaUNhcnQge1xyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5vcGVuVHJpZ2dlciA9IGdldChcIi5qcy1taW5pY2FydC10cmlnZ2VyXCIsIGRvY3VtZW50KTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGdldChcIi5qcy1taW5pLWNhcnRcIiwgdGhpcy5lbGVtZW50KTtcclxuICAgICAgICBpZiAodGhpcy5vcGVuVHJpZ2dlcikgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBiaW5kRXZlbnRzKCkge1xyXG5cclxuICAgICAgICBvcGVuTW9kYWwodGhpcy5lbGVtZW50LCB0aGlzLm9wZW5UcmlnZ2VyKTtcclxuICAgICAgICBjbG9zZU1vZGFsKHRoaXMuZWxlbWVudCApO1xyXG4gICAgICAgIG5ldyBRdWFudGl0eSh0aGlzLmVsZW1lbnQsIHRoaXMuZmV0Y2hDYXJ0KTtcclxuICAgICAgICBuZXcgUmVtb3ZlKHRoaXMuZWxlbWVudCwgdGhpcy5mZXRjaENhcnQpO1xyXG4gICAgICAgIG5ldyBWYXJpYW50KHRoaXMuZWxlbWVudCwgdGhpcy5mZXRjaENhcnQpO1xyXG4gICAgICAgIG5ldyBTdWJtaXRCdG4odGhpcy5lbGVtZW50LCB0aGlzLmZldGNoQ2FydCk7XHJcbiAgICB9XHJcblxyXG4gICBcclxuICAgIGluaXRDYXJ0ID0gKCkgPT4ge1xyXG4gICAgICAgIG9wZW5Nb2RhbCh0aGlzLmVsZW1lbnQsIHRoaXMub3BlblRyaWdnZXIpO1xyXG4gICAgICAgIGNsb3NlTW9kYWwodGhpcy5lbGVtZW50KTtcclxuICAgICAgICBuZXcgUXVhbnRpdHkodGhpcy5lbGVtZW50LCB0aGlzLmZldGNoQ2FydCk7XHJcbiAgICAgICAgbmV3IFJlbW92ZSh0aGlzLmVsZW1lbnQsIHRoaXMuZmV0Y2hDYXJ0KTtcclxuICAgICAgICBuZXcgVmFyaWFudCh0aGlzLmVsZW1lbnQsIHRoaXMuZmV0Y2hDYXJ0KTtcclxuICAgICAgICBuZXcgU3VibWl0QnRuKHRoaXMuZWxlbWVudCwgdGhpcy5mZXRjaENhcnQpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgZmV0Y2hDYXJ0ID0gKCkgPT4ge1xyXG4gICAgICAgIGZldGNoKFwiL2NhcnRcIilcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZVxyXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigoaHRtbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckNhcnQoaHRtbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwicmVzcG9uc2UudGV4dCBlcnJvcjogXCIsIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS53YXJuKFwiU29tZXRoaW5nIHdlbnQgd3JvbmcuXCIsIGVycikpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXJDYXJ0ID0gKGNhcnQpID0+IHtcclxuICAgICAgICBjb25zdCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XHJcbiAgICAgICAgY29uc3QgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhjYXJ0LCBcInRleHQvaHRtbFwiKTtcclxuICAgICAgICBjb25zdCBjYXJ0SXRlbXMgPSBnZXQoXCIuanMtbWluaS1jYXJ0XCIsIGRvYyk7XHJcblxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5pbm5lckhUTUwgPSBjYXJ0SXRlbXMuaW5uZXJIVE1MO1xyXG4gICAgICAgIHRoaXMuaW5pdENhcnQoKTtcclxuICAgICAgICBpdGVtQ291bnQoKTtcclxuICAgICAgICAvLyBCT0xEIFBSSUNJTkdcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHdpbmRvdy5CT0xEICYmXHJcbiAgICAgICAgICAgIEJPTEQuY29tbW9uICYmXHJcbiAgICAgICAgICAgIEJPTEQuY29tbW9uLmV2ZW50RW1pdHRlciAmJlxyXG4gICAgICAgICAgICB0eXBlb2YgQk9MRC5jb21tb24uZXZlbnRFbWl0dGVyLmVtaXQgPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBCT0xELmNvbW1vbi5ldmVudEVtaXR0ZXIuZW1pdChcIkJPTERfQ09NTU9OX2NhcnRfbG9hZGVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgZ2V0IH0gZnJvbSBcIkAvdXRpbHNcIjtcclxuXHJcbmNvbnN0IGl0ZW1Db3VudCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGNhcnRDb3VudCA9IGdldChcIi5qcy1taW5pY2FydC1jb3VudFwiLCBkb2N1bWVudCk7XHJcbiAgICBmZXRjaChcIi9jYXJ0LmpzXCIpXHJcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgY2FydENvdW50LmlubmVySFRNTCA9IGRhdGEuaXRlbV9jb3VudDtcclxuICAgICAgICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCB7IGl0ZW1Db3VudCB9O1xyXG4iLCJpbXBvcnQgeyBnZXQsIGJvZHlTY3JvbGxMb2NrIH0gZnJvbSBcIkAvdXRpbHNcIjtcclxuXHJcbmNvbnN0IG9wZW5Nb2RhbCA9IChlbGVtZW50LCBvcGVuVHJpZ2dlcikgPT4ge1xyXG4gICAgaWYgKG9wZW5UcmlnZ2VyKSB7XHJcbiAgICAgICAgb3BlblRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpcy1hY3RpdmVcIik7XHJcbiAgICAgICAgfSk7ICAgIFxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBjbG9zZU1vZGFsID0gKGVsZW1lbnQpID0+IHtcclxuICAgIGNvbnN0IGNsb3NlVHJpZ2dlciA9IGdldChcIi5tb2RhbF9jbG9zZVwiLCBlbGVtZW50KTtcclxuICAgIGlmIChjbG9zZVRyaWdnZXIpIHtcclxuICAgICAgICBjbG9zZVRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1hY3RpdmVcIik7dGhpcy5vdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jLW1vZGVsX19vdmVybGF5JykuY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGJvZHlTY3JvbGxMb2NrLnJlbGVhc2UoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJkZWZhdWx0IG1vZGFsIGhlcmVcIik7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5zdHlsZS5vdmVyZmxvd1k9XCJhdXRvXCI7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7b3Blbk1vZGFsLCAgY2xvc2VNb2RhbH0iLCJpbXBvcnQgeyBnZXQsIGdldEFsbCB9IGZyb20gXCJAL3V0aWxzXCI7XHJcbmltcG9ydCB7IGNoYW5nZUNhcnRJdGVtIH0gZnJvbSBcIkAvdXRpbHMvc2hvcGlmeVwiO1xyXG5cclxuY2xhc3MgUmVtb3ZlIHtcclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGZldGNoQ2FydCkge1xyXG4gICAgICAgIHRoaXMuY2FydCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5pdGVtcyA9IGdldEFsbChcIi5qcy1jYXJ0LWl0ZW1cIiwgdGhpcy5jYXJ0KTtcclxuICAgICAgICB0aGlzLmZldGNoQ2FydCA9IGZldGNoQ2FydDtcclxuICAgICAgICB0aGlzLmJpbmRMaXN0ZW5lcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRMaXN0ZW5lciA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gZ2V0KFwiLmpzLXJlbW92ZS1pdGVtXCIsIGl0ZW0pO1xyXG4gICAgICAgICAgICBjb25zdCBjdXN0b21fcHJvZHVjdCA9IGdldChcIi5jdXN0b20tcHJvZHVjdFwiLCBpdGVtKTtcclxuXHJcbiAgICAgICAgICAgIHJlbW92ZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHF0eSA9IGdldChcIi5qcy1xdHktdmFsdWVcIiwgaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YXJpYW50SWQgPSBxdHkuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcclxuICAgICAgICAgICAgICAgIGlmKGdldChcIi5mb250X3ZhbHVlXCIsIGl0ZW0pKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9udF92YWx1ZSA9IGdldChcIi5mb250X3ZhbHVlXCIsIGl0ZW0pLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoZ2V0KFwiLmxldHRlcl92YWx1ZVwiLCBpdGVtKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxldHRlcl92YWx1ZSA9Z2V0KFwiLmxldHRlcl92YWx1ZVwiLCBpdGVtKS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihjdXN0b21fcHJvZHVjdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKChuZXdpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb250X2NhcmQgPSBnZXQoJy5wX3ZhcmlhbnRfaWQnLCBuZXdpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZm9udF9jYXJkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXRfcHJvZHVjdCA9IGZvbnRfY2FyZC50ZXh0Q29udGVudC5yZXBsYWNlKC9cXG4vZywgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VzdG9tX2ZvbnRfdmFsdWUgPSBnZXQoXCIuZm9udF92YWx1ZVwiLCBuZXdpdGVtKS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXN0b21fbGV0dGVyX3ZhbHVlID1nZXQoXCIubGV0dGVyX3ZhbHVlXCIsIG5ld2l0ZW0pLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2R1Y3RfdGl0bGU9Z2V0KFwiLnByb2R1Y3RfdGl0bGVcIiwgbmV3aXRlbSkudGV4dENvbnRlbnQucmVwbGFjZSgvXFxuL2csIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3cmVtb3ZlID0gZ2V0KFwiLmpzLXJlbW92ZS1pdGVtXCIsIG5ld2l0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodmFyaWFudElkID09IHRhcmdldF9wcm9kdWN0ICYmIGZvbnRfdmFsdWUgPT0gY3VzdG9tX2ZvbnRfdmFsdWUgJiYgbGV0dGVyX3ZhbHVlID09IGN1c3RvbV9sZXR0ZXJfdmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZUNhcnRJdGVtKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IG5ld3JlbW92ZS5kYXRhc2V0LmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWFudGl0eTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVJdGVtKGl0ZW0sIHJlbW92ZS5kYXRhc2V0LmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJFcnJvciB3aXRoIHJlbW92ZUl0ZW06IFwiLCBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdpdGVtLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVJdGVtKGl0ZW0sIHJlbW92ZS5kYXRhc2V0LmlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmVtb3ZlSXRlbSA9IChpdGVtLCBpdGVtSWQpID0+IHtcclxuICAgICAgICBjaGFuZ2VDYXJ0SXRlbSh7XHJcbiAgICAgICAgICAgIGlkOiBpdGVtSWQsXHJcbiAgICAgICAgICAgIHF1YW50aXR5OiAwLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgIHRoaXMuZmV0Y2hDYXJ0KCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGUpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiRXJyb3Igd2l0aCByZW1vdmVJdGVtOiBcIiwgZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaXRlbS5yZW1vdmUoKTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCB7IFJlbW92ZSB9O1xyXG4iLCJjb25zdCBlbEh0bWwgPSBkb2N1bWVudC5ib2R5O1xyXG5cclxubGV0IHByZXZpb3VzSHRtbFN0eWxlcyA9IHt9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxvY2soKSB7XHJcbiAgICBjb25zdCB7IHN0eWxlOiBodG1sU3R5bGUgfSA9IGVsSHRtbDtcclxuXHJcbiAgICBwcmV2aW91c0h0bWxTdHlsZXMgPSB7XHJcbiAgICAgICAgb3ZlcmZsb3dZOiBodG1sU3R5bGUub3ZlcmZsb3dZLFxyXG4gICAgICAgIG1pbkhlaWdodDogaHRtbFN0eWxlLm1pbkhlaWdodCxcclxuICAgICAgICBtYXhIZWlnaHQ6IFwiYXV0b1wiLFxyXG4gICAgfTtcclxuXHJcbiAgICBPYmplY3QuYXNzaWduKGVsSHRtbC5zdHlsZSwge1xyXG4gICAgICAgIG92ZXJmbG93WTogXCJoaWRkZW5cIixcclxuICAgICAgICBtaW5IZWlnaHQ6IFwiMTAwdmhcIixcclxuICAgICAgICBtYXhIZWlnaHQ6IFwiMTAwdmhcIixcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVsZWFzZSgpIHtcclxuICAgIE9iamVjdC5hc3NpZ24oZWxIdG1sLnN0eWxlLCBwcmV2aW91c0h0bWxTdHlsZXMpO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJnZXQiLCJRdWFudGl0eSIsIml0ZW1Db3VudCIsIm9wZW5Nb2RhbCIsImNsb3NlTW9kYWwiLCJSZW1vdmUiLCJWYXJpYW50IiwiU3VibWl0QnRuIiwiTWluaUNhcnQiLCJjb25zdHJ1Y3RvciIsImVsZW1lbnQiLCJpbml0Q2FydCIsIm9wZW5UcmlnZ2VyIiwiZmV0Y2hDYXJ0IiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJ0ZXh0IiwiaHRtbCIsInJlbmRlckNhcnQiLCJjYXRjaCIsImUiLCJjb25zb2xlIiwid2FybiIsImVyciIsImNhcnQiLCJwYXJzZXIiLCJET01QYXJzZXIiLCJkb2MiLCJwYXJzZUZyb21TdHJpbmciLCJjYXJ0SXRlbXMiLCJpbm5lckhUTUwiLCJ3aW5kb3ciLCJCT0xEIiwiY29tbW9uIiwiZXZlbnRFbWl0dGVyIiwiZW1pdCIsImRvY3VtZW50IiwiY29udGFpbmVyIiwiYmluZEV2ZW50cyIsImNhcnRDb3VudCIsImpzb24iLCJkYXRhIiwiaXRlbV9jb3VudCIsImJvZHlTY3JvbGxMb2NrIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJjbGFzc0xpc3QiLCJhZGQiLCJjbG9zZVRyaWdnZXIiLCJyZW1vdmUiLCJvdmVybGF5IiwicXVlcnlTZWxlY3RvciIsInJlbGVhc2UiLCJsb2ciLCJzdHlsZSIsIm92ZXJmbG93WSIsImdldEFsbCIsImNoYW5nZUNhcnRJdGVtIiwiYmluZExpc3RlbmVyIiwiaXRlbXMiLCJmb3JFYWNoIiwiaXRlbSIsImN1c3RvbV9wcm9kdWN0IiwicXR5IiwidmFyaWFudElkIiwiZ2V0QXR0cmlidXRlIiwiZm9udF92YWx1ZSIsInRleHRDb250ZW50IiwibGV0dGVyX3ZhbHVlIiwibmV3aXRlbSIsImZvbnRfY2FyZCIsInRhcmdldF9wcm9kdWN0IiwicmVwbGFjZSIsImN1c3RvbV9mb250X3ZhbHVlIiwiY3VzdG9tX2xldHRlcl92YWx1ZSIsInByb2R1Y3RfdGl0bGUiLCJuZXdyZW1vdmUiLCJpZCIsImRhdGFzZXQiLCJxdWFudGl0eSIsInJlbW92ZUl0ZW0iLCJpdGVtSWQiLCJlbEh0bWwiLCJib2R5IiwicHJldmlvdXNIdG1sU3R5bGVzIiwibG9jayIsImh0bWxTdHlsZSIsIm1pbkhlaWdodCIsIm1heEhlaWdodCIsIk9iamVjdCIsImFzc2lnbiJdLCJzb3VyY2VSb290IjoiIn0=