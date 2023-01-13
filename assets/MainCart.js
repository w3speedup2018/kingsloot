"use strict";
(self["webpackChunkjuno_shopify_template"] = self["webpackChunkjuno_shopify_template"] || []).push([["MainCart"],{

/***/ "./src/assets/js/main/cart/Cart.js":
/*!*****************************************!*\
  !*** ./src/assets/js/main/cart/Cart.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cart": () => (/* binding */ Cart)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");
/* harmony import */ var _functions_quantity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions/quantity */ "./src/assets/js/main/cart/functions/quantity.js");
/* harmony import */ var _functions_remove__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./functions/remove */ "./src/assets/js/main/cart/functions/remove.js");
/* harmony import */ var _functions_variant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./functions/variant */ "./src/assets/js/main/cart/functions/variant.js");
/* harmony import */ var _functions_submit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./functions/submit */ "./src/assets/js/main/cart/functions/submit.js");






class Cart {
  constructor(element) {
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
      const cartItems = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".c-main-cart", doc);
      this.cart.innerHTML = cartItems.innerHTML;
      this.initCart(); //itemCount();
      // BOLD PRICING

      if (window.BOLD && BOLD.common && BOLD.common.eventEmitter && typeof BOLD.common.eventEmitter.emit === "function") {
        BOLD.common.eventEmitter.emit("BOLD_COMMON_cart_loaded");
      }
    };

    this.initCart = () => {
      new _functions_quantity__WEBPACK_IMPORTED_MODULE_1__.Quantity(this.cart, this.fetchCart);
      new _functions_remove__WEBPACK_IMPORTED_MODULE_2__.Remove(this.cart, this.fetchCart);
      new _functions_variant__WEBPACK_IMPORTED_MODULE_3__.Variant(this.cart, this.fetchCart);
      new _functions_submit__WEBPACK_IMPORTED_MODULE_4__.SubmitBtn(this.cart, this.fetchCart);
    };

    this.cart = element;
    this.bindListener();
  }

  bindListener() {
    new _functions_quantity__WEBPACK_IMPORTED_MODULE_1__.Quantity(this.cart, this.fetchCart);
    new _functions_remove__WEBPACK_IMPORTED_MODULE_2__.Remove(this.cart, this.fetchCart);
  }

}



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



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBTCxHQUFZYixPQUFaO0lBQ0EsS0FBSzZCLEtBQUwsR0FBYUYsOENBQU0sQ0FBQyxlQUFELEVBQWtCLEtBQUtkLElBQXZCLENBQW5CO0lBQ0EsS0FBS1osU0FBTCxHQUFpQkEsU0FBakI7SUFDQSxLQUFLeUIsWUFBTDtFQUNIOztBQU5RIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vc3JjL2Fzc2V0cy9qcy9tYWluL2NhcnQvQ2FydC5qcyIsIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL21haW4vY2FydC9mdW5jdGlvbnMvcmVtb3ZlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldCB9IGZyb20gXCJAL3V0aWxzXCI7XHJcbmltcG9ydCB7IFF1YW50aXR5IH0gZnJvbSBcIi4vZnVuY3Rpb25zL3F1YW50aXR5XCI7XHJcbmltcG9ydCB7IFJlbW92ZSB9IGZyb20gXCIuL2Z1bmN0aW9ucy9yZW1vdmVcIjtcclxuaW1wb3J0IHsgVmFyaWFudCB9IGZyb20gXCIuL2Z1bmN0aW9ucy92YXJpYW50XCI7XHJcbmltcG9ydCB7IFN1Ym1pdEJ0biB9IGZyb20gXCIuL2Z1bmN0aW9ucy9zdWJtaXRcIjtcclxuXHJcbmNsYXNzIENhcnQge1xyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuY2FydCA9IGVsZW1lbnQ7XHJcblxyXG4gICAgICAgIHRoaXMuYmluZExpc3RlbmVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZExpc3RlbmVyKCkge1xyXG4gICAgICAgIG5ldyBRdWFudGl0eSh0aGlzLmNhcnQsIHRoaXMuZmV0Y2hDYXJ0KTtcclxuICAgICAgICBuZXcgUmVtb3ZlKHRoaXMuY2FydCwgdGhpcy5mZXRjaENhcnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZldGNoQ2FydCA9ICgpID0+IHtcclxuICAgICAgICBmZXRjaChcIi9jYXJ0XCIpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VcclxuICAgICAgICAgICAgICAgICAgICAudGV4dCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGh0bWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJDYXJ0KGh0bWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcInJlc3BvbnNlLnRleHQgZXJyb3I6IFwiLCBlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUud2FybihcIlNvbWV0aGluZyB3ZW50IHdyb25nLlwiLCBlcnIpKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyQ2FydCA9IChjYXJ0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xyXG4gICAgICAgIGNvbnN0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoY2FydCwgXCJ0ZXh0L2h0bWxcIik7XHJcbiAgICAgICAgY29uc3QgY2FydEl0ZW1zID0gZ2V0KFwiLmMtbWFpbi1jYXJ0XCIsIGRvYyk7XHJcblxyXG4gICAgICAgIHRoaXMuY2FydC5pbm5lckhUTUwgPSBjYXJ0SXRlbXMuaW5uZXJIVE1MO1xyXG4gICAgICAgIHRoaXMuaW5pdENhcnQoKTtcclxuICAgICAgICAvL2l0ZW1Db3VudCgpO1xyXG4gICAgICAgIC8vIEJPTEQgUFJJQ0lOR1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgd2luZG93LkJPTEQgJiZcclxuICAgICAgICAgICAgQk9MRC5jb21tb24gJiZcclxuICAgICAgICAgICAgQk9MRC5jb21tb24uZXZlbnRFbWl0dGVyICYmXHJcbiAgICAgICAgICAgIHR5cGVvZiBCT0xELmNvbW1vbi5ldmVudEVtaXR0ZXIuZW1pdCA9PT0gXCJmdW5jdGlvblwiXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIEJPTEQuY29tbW9uLmV2ZW50RW1pdHRlci5lbWl0KFwiQk9MRF9DT01NT05fY2FydF9sb2FkZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpbml0Q2FydCA9ICgpID0+IHtcclxuICAgICAgICBuZXcgUXVhbnRpdHkodGhpcy5jYXJ0LCB0aGlzLmZldGNoQ2FydCk7XHJcbiAgICAgICAgbmV3IFJlbW92ZSh0aGlzLmNhcnQsIHRoaXMuZmV0Y2hDYXJ0KTtcclxuICAgICAgICBuZXcgVmFyaWFudCh0aGlzLmNhcnQsIHRoaXMuZmV0Y2hDYXJ0KTtcclxuICAgICAgICBuZXcgU3VibWl0QnRuKHRoaXMuY2FydCwgdGhpcy5mZXRjaENhcnQpO1xyXG5cclxuICAgIH07XHJcblxyXG4gXHJcbn1cclxuXHJcbmV4cG9ydCB7IENhcnQgfTtcclxuIiwiaW1wb3J0IHsgZ2V0LCBnZXRBbGwgfSBmcm9tIFwiQC91dGlsc1wiO1xyXG5pbXBvcnQgeyBjaGFuZ2VDYXJ0SXRlbSB9IGZyb20gXCJAL3V0aWxzL3Nob3BpZnlcIjtcclxuXHJcbmNsYXNzIFJlbW92ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBmZXRjaENhcnQpIHtcclxuICAgICAgICB0aGlzLmNhcnQgPSBlbGVtZW50O1xyXG4gICAgICAgIHRoaXMuaXRlbXMgPSBnZXRBbGwoXCIuanMtY2FydC1pdGVtXCIsIHRoaXMuY2FydCk7XHJcbiAgICAgICAgdGhpcy5mZXRjaENhcnQgPSBmZXRjaENhcnQ7XHJcbiAgICAgICAgdGhpcy5iaW5kTGlzdGVuZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kTGlzdGVuZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZSA9IGdldChcIi5qcy1yZW1vdmUtaXRlbVwiLCBpdGVtKTtcclxuICAgICAgICAgICAgY29uc3QgY3VzdG9tX3Byb2R1Y3QgPSBnZXQoXCIuY3VzdG9tLXByb2R1Y3RcIiwgaXRlbSk7XHJcblxyXG4gICAgICAgICAgICByZW1vdmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBxdHkgPSBnZXQoXCIuanMtcXR5LXZhbHVlXCIsIGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFyaWFudElkID0gcXR5LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIik7XHJcbiAgICAgICAgICAgICAgICBpZihnZXQoXCIuZm9udF92YWx1ZVwiLCBpdGVtKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvbnRfdmFsdWUgPSBnZXQoXCIuZm9udF92YWx1ZVwiLCBpdGVtKS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGdldChcIi5sZXR0ZXJfdmFsdWVcIiwgaXRlbSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsZXR0ZXJfdmFsdWUgPWdldChcIi5sZXR0ZXJfdmFsdWVcIiwgaXRlbSkudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoY3VzdG9tX3Byb2R1Y3Qpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaCgobmV3aXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9udF9jYXJkID0gZ2V0KCcucF92YXJpYW50X2lkJywgbmV3aXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZvbnRfY2FyZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0X3Byb2R1Y3QgPSBmb250X2NhcmQudGV4dENvbnRlbnQucmVwbGFjZSgvXFxuL2csIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1c3RvbV9mb250X3ZhbHVlID0gZ2V0KFwiLmZvbnRfdmFsdWVcIiwgbmV3aXRlbSkudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VzdG9tX2xldHRlcl92YWx1ZSA9Z2V0KFwiLmxldHRlcl92YWx1ZVwiLCBuZXdpdGVtKS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9kdWN0X3RpdGxlPWdldChcIi5wcm9kdWN0X3RpdGxlXCIsIG5ld2l0ZW0pLnRleHRDb250ZW50LnJlcGxhY2UoL1xcbi9nLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld3JlbW92ZSA9IGdldChcIi5qcy1yZW1vdmUtaXRlbVwiLCBuZXdpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHZhcmlhbnRJZCA9PSB0YXJnZXRfcHJvZHVjdCAmJiBmb250X3ZhbHVlID09IGN1c3RvbV9mb250X3ZhbHVlICYmIGxldHRlcl92YWx1ZSA9PSBjdXN0b21fbGV0dGVyX3ZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VDYXJ0SXRlbSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBuZXdyZW1vdmUuZGF0YXNldC5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVhbnRpdHk6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlSXRlbShpdGVtLCByZW1vdmUuZGF0YXNldC5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiRXJyb3Igd2l0aCByZW1vdmVJdGVtOiBcIiwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3aXRlbS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlSXRlbShpdGVtLCByZW1vdmUuZGF0YXNldC5pZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbW92ZUl0ZW0gPSAoaXRlbSwgaXRlbUlkKSA9PiB7XHJcbiAgICAgICAgY2hhbmdlQ2FydEl0ZW0oe1xyXG4gICAgICAgICAgICBpZDogaXRlbUlkLFxyXG4gICAgICAgICAgICBxdWFudGl0eTogMCxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICB0aGlzLmZldGNoQ2FydCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkVycm9yIHdpdGggcmVtb3ZlSXRlbTogXCIsIGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGl0ZW0ucmVtb3ZlKCk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgeyBSZW1vdmUgfTtcclxuIl0sIm5hbWVzIjpbImdldCIsIlF1YW50aXR5IiwiUmVtb3ZlIiwiVmFyaWFudCIsIlN1Ym1pdEJ0biIsIkNhcnQiLCJjb25zdHJ1Y3RvciIsImVsZW1lbnQiLCJmZXRjaENhcnQiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsInRleHQiLCJodG1sIiwicmVuZGVyQ2FydCIsImNhdGNoIiwiZSIsImNvbnNvbGUiLCJ3YXJuIiwiZXJyIiwiY2FydCIsInBhcnNlciIsIkRPTVBhcnNlciIsImRvYyIsInBhcnNlRnJvbVN0cmluZyIsImNhcnRJdGVtcyIsImlubmVySFRNTCIsImluaXRDYXJ0Iiwid2luZG93IiwiQk9MRCIsImNvbW1vbiIsImV2ZW50RW1pdHRlciIsImVtaXQiLCJiaW5kTGlzdGVuZXIiLCJnZXRBbGwiLCJjaGFuZ2VDYXJ0SXRlbSIsIml0ZW1zIiwiZm9yRWFjaCIsIml0ZW0iLCJyZW1vdmUiLCJjdXN0b21fcHJvZHVjdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJxdHkiLCJ2YXJpYW50SWQiLCJnZXRBdHRyaWJ1dGUiLCJmb250X3ZhbHVlIiwidGV4dENvbnRlbnQiLCJsZXR0ZXJfdmFsdWUiLCJuZXdpdGVtIiwiZm9udF9jYXJkIiwidGFyZ2V0X3Byb2R1Y3QiLCJyZXBsYWNlIiwiY3VzdG9tX2ZvbnRfdmFsdWUiLCJjdXN0b21fbGV0dGVyX3ZhbHVlIiwicHJvZHVjdF90aXRsZSIsIm5ld3JlbW92ZSIsImlkIiwiZGF0YXNldCIsInF1YW50aXR5IiwicmVtb3ZlSXRlbSIsInByZXZlbnREZWZhdWx0IiwiaXRlbUlkIl0sInNvdXJjZVJvb3QiOiIifQ==