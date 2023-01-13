"use strict";
(self["webpackChunkjuno_shopify_template"] = self["webpackChunkjuno_shopify_template"] || []).push([["shoplook"],{

/***/ "./src/assets/js/main/shop-look/ShopLook.js":
/*!**************************************************!*\
  !*** ./src/assets/js/main/shop-look/ShopLook.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShopLook": () => (/* binding */ ShopLook)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");


class ShopLook extends HTMLElement {
  constructor() {
    super();
    this.element = this;
    this.trigger = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-look-button", this.element);
    this.bag = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-look-button-bag", this.element);
    this.close = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-look-button-close", this.element);
    this.container = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-look-products", this.element);
    if (this.trigger) this.bindEvents();
  }

  bindEvents() {
    this.toggleModal();
  }

  toggleModal() {
    this.trigger.addEventListener("click", () => {
      this.trigger.classList.toggle("is-active");
      this.container.classList.toggle("is-active");
      this.bag.classList.toggle("is-hidden");
      this.close.classList.toggle("is-hidden");
    });
  }

}



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL3Nob3Bsb29rLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUEsTUFBTUMsUUFBTixTQUF1QkMsV0FBdkIsQ0FBbUM7RUFDL0JDLFdBQVcsR0FBRztJQUNWO0lBQ0EsS0FBS0MsT0FBTCxHQUFlLElBQWY7SUFDQSxLQUFLQyxPQUFMLEdBQWVMLDJDQUFHLENBQUMsaUJBQUQsRUFBb0IsS0FBS0ksT0FBekIsQ0FBbEI7SUFDQSxLQUFLRSxHQUFMLEdBQVdOLDJDQUFHLENBQUMscUJBQUQsRUFBd0IsS0FBS0ksT0FBN0IsQ0FBZDtJQUNBLEtBQUtHLEtBQUwsR0FBYVAsMkNBQUcsQ0FBQyx1QkFBRCxFQUEwQixLQUFLSSxPQUEvQixDQUFoQjtJQUNBLEtBQUtJLFNBQUwsR0FBaUJSLDJDQUFHLENBQUMsbUJBQUQsRUFBc0IsS0FBS0ksT0FBM0IsQ0FBcEI7SUFFQSxJQUFJLEtBQUtDLE9BQVQsRUFBa0IsS0FBS0ksVUFBTDtFQUNyQjs7RUFFREEsVUFBVSxHQUFHO0lBQ1QsS0FBS0MsV0FBTDtFQUNIOztFQUVEQSxXQUFXLEdBQUc7SUFDVixLQUFLTCxPQUFMLENBQWFNLGdCQUFiLENBQThCLE9BQTlCLEVBQXVDLE1BQU07TUFDekMsS0FBS04sT0FBTCxDQUFhTyxTQUFiLENBQXVCQyxNQUF2QixDQUE4QixXQUE5QjtNQUNBLEtBQUtMLFNBQUwsQ0FBZUksU0FBZixDQUF5QkMsTUFBekIsQ0FBZ0MsV0FBaEM7TUFDQSxLQUFLUCxHQUFMLENBQVNNLFNBQVQsQ0FBbUJDLE1BQW5CLENBQTBCLFdBQTFCO01BQ0EsS0FBS04sS0FBTCxDQUFXSyxTQUFYLENBQXFCQyxNQUFyQixDQUE0QixXQUE1QjtJQUNILENBTEQ7RUFNSDs7QUF2QjhCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vc3JjL2Fzc2V0cy9qcy9tYWluL3Nob3AtbG9vay9TaG9wTG9vay5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXQgfSBmcm9tIFwiQC91dGlsc1wiO1xyXG5cclxuY2xhc3MgU2hvcExvb2sgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy50cmlnZ2VyID0gZ2V0KFwiLmpzLWxvb2stYnV0dG9uXCIsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5iYWcgPSBnZXQoXCIuanMtbG9vay1idXR0b24tYmFnXCIsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5jbG9zZSA9IGdldChcIi5qcy1sb29rLWJ1dHRvbi1jbG9zZVwiLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gZ2V0KFwiLmpzLWxvb2stcHJvZHVjdHNcIiwgdGhpcy5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlcikgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZEV2ZW50cygpIHtcclxuICAgICAgICB0aGlzLnRvZ2dsZU1vZGFsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlTW9kYWwoKSB7XHJcbiAgICAgICAgdGhpcy50cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlci5jbGFzc0xpc3QudG9nZ2xlKFwiaXMtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKFwiaXMtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmJhZy5jbGFzc0xpc3QudG9nZ2xlKFwiaXMtaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlLmNsYXNzTGlzdC50b2dnbGUoXCJpcy1oaWRkZW5cIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHsgU2hvcExvb2sgfTtcclxuIl0sIm5hbWVzIjpbImdldCIsIlNob3BMb29rIiwiSFRNTEVsZW1lbnQiLCJjb25zdHJ1Y3RvciIsImVsZW1lbnQiLCJ0cmlnZ2VyIiwiYmFnIiwiY2xvc2UiLCJjb250YWluZXIiLCJiaW5kRXZlbnRzIiwidG9nZ2xlTW9kYWwiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xhc3NMaXN0IiwidG9nZ2xlIl0sInNvdXJjZVJvb3QiOiIifQ==