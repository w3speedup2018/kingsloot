"use strict";
(self["webpackChunkjuno_shopify_template"] = self["webpackChunkjuno_shopify_template"] || []).push([["checkout"],{

/***/ "./src/assets/js/checkout.js":
/*!***********************************!*\
  !*** ./src/assets/js/checkout.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_throttle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/throttle */ "./src/assets/js/utils/throttle.ts");
 // import Header from "@/main/header";

const initClasses = [// Header,
];

for (const InitClass of initClasses) {
  new InitClass();
}

(function () {
  window.addEventListener("resize", (0,_utils_throttle__WEBPACK_IMPORTED_MODULE_0__.throttle)(setCssProperties, 250));
  setCssProperties();

  function setCssProperties() {
    document.documentElement.style.setProperty("--scrollbar-width", `${window.innerWidth - document.documentElement.clientWidth + 0.5}px`);
    document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
  }

  function createVATField() {
    const field = document.createElement("div");
    field.setAttribute("class", "field");
    field.setAttribute("data-address-field", "eori-number");
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "EORI/VAT Number");
    input.setAttribute("label", "EORI/VAT Number");
    input.setAttribute("size", "30");
    input.setAttribute("name", "checkout[eori_number]");
    input.setAttribute("class", "field__input  field__input--eori-number");
    field.appendChild(input);
    const addressFields = document.querySelector(".address-fields[data-address-fields]");
    addressFields.appendChild(field);
  }

  function appendCheckoutMessages(step) {
    const VATMessage = document.querySelector(".js-checkout-message-vat");
    const shippingMessage = document.querySelector(".js-checkout-message-shipping");

    if (step === "contact_information") {
      const addressFields = document.querySelector(".address-fields[data-address-fields]");
      addressFields.appendChild(VATMessage);
      VATMessage.style.display = "flex";
      shippingMessage.style.display = "none";
    } else if (step === "shipping_method") {
      const shippingFields = document.querySelector(".step__sections");
      shippingFields.appendChild(shippingMessage);
      VATMessage.style.display = "none";
      shippingMessage.style.display = "flex";
    }
  }

  window.onload = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const stepParam = urlParams.get("step"); // Can be 'contact_information', 'shipping_method' or 'payment_method'

    if (stepParam === "contact_information") {
      createVATField();
    }

    appendCheckoutMessages(stepParam);
  };
})();

/***/ }),

/***/ "./src/assets/js/utils/throttle.ts":
/*!*****************************************!*\
  !*** ./src/assets/js/utils/throttle.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "throttle": () => (/* binding */ throttle)
/* harmony export */ });
const throttle = (fn, wait) => {
  let inThrottle, lastFn, lastTime;
  return function (...args) {
    const context = this;

    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(() => {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};

/***/ }),

/***/ "./src/assets/scss/checkout.scss":
/*!***************************************!*\
  !*** ./src/assets/scss/checkout.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/assets/js/checkout.js"), __webpack_exec__("./src/assets/scss/checkout.scss"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SU8sSUFBSSxDQUFDQyxHQUFMLEtBQWFMLFFBQWpCLENBQWIsRUFBeUMsQ0FBekMsQ0FMZ0IsQ0FBbkI7SUFNSDtFQUNKLENBZkQ7QUFnQkgsQ0FsQk07Ozs7Ozs7Ozs7O0FDQVAiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL2NoZWNrb3V0LmpzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvdXRpbHMvdGhyb3R0bGUudHMiLCJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vc3JjL2Fzc2V0cy9zY3NzL2NoZWNrb3V0LnNjc3M/OTNlOSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0aHJvdHRsZSB9IGZyb20gXCJAL3V0aWxzL3Rocm90dGxlXCI7XHJcblxyXG4vLyBpbXBvcnQgSGVhZGVyIGZyb20gXCJAL21haW4vaGVhZGVyXCI7XHJcblxyXG5jb25zdCBpbml0Q2xhc3NlcyA9IFtcclxuICAgIC8vIEhlYWRlcixcclxuXTtcclxuXHJcbmZvciAoY29uc3QgSW5pdENsYXNzIG9mIGluaXRDbGFzc2VzKSB7XHJcbiAgICBuZXcgSW5pdENsYXNzKCk7XHJcbn1cclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aHJvdHRsZShzZXRDc3NQcm9wZXJ0aWVzLCAyNTApKTtcclxuICAgIHNldENzc1Byb3BlcnRpZXMoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBzZXRDc3NQcm9wZXJ0aWVzKCkge1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcclxuICAgICAgICAgICAgXCItLXNjcm9sbGJhci13aWR0aFwiLFxyXG4gICAgICAgICAgICBgJHt3aW5kb3cuaW5uZXJXaWR0aCAtIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCArIDAuNX1weGBcclxuICAgICAgICApO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tdmhcIiwgYCR7d2luZG93LmlubmVySGVpZ2h0ICogMC4wMX1weGApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVZBVEZpZWxkKCkge1xyXG4gICAgICAgIGNvbnN0IGZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBmaWVsZC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZpZWxkXCIpO1xyXG4gICAgICAgIGZpZWxkLnNldEF0dHJpYnV0ZShcImRhdGEtYWRkcmVzcy1maWVsZFwiLCBcImVvcmktbnVtYmVyXCIpO1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xyXG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIsIFwiRU9SSS9WQVQgTnVtYmVyXCIpO1xyXG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZShcImxhYmVsXCIsIFwiRU9SSS9WQVQgTnVtYmVyXCIpO1xyXG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZShcInNpemVcIiwgXCIzMFwiKTtcclxuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwiY2hlY2tvdXRbZW9yaV9udW1iZXJdXCIpO1xyXG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZmllbGRfX2lucHV0ICBmaWVsZF9faW5wdXQtLWVvcmktbnVtYmVyXCIpO1xyXG5cclxuICAgICAgICBmaWVsZC5hcHBlbmRDaGlsZChpbnB1dCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGFkZHJlc3NGaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZHJlc3MtZmllbGRzW2RhdGEtYWRkcmVzcy1maWVsZHNdXCIpO1xyXG4gICAgICAgIGFkZHJlc3NGaWVsZHMuYXBwZW5kQ2hpbGQoZmllbGQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFwcGVuZENoZWNrb3V0TWVzc2FnZXMoc3RlcCkge1xyXG4gICAgICAgIGNvbnN0IFZBVE1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLWNoZWNrb3V0LW1lc3NhZ2UtdmF0XCIpO1xyXG4gICAgICAgIGNvbnN0IHNoaXBwaW5nTWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtY2hlY2tvdXQtbWVzc2FnZS1zaGlwcGluZ1wiKTtcclxuXHJcbiAgICAgICAgaWYgKHN0ZXAgPT09IFwiY29udGFjdF9pbmZvcm1hdGlvblwiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFkZHJlc3NGaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZHJlc3MtZmllbGRzW2RhdGEtYWRkcmVzcy1maWVsZHNdXCIpO1xyXG4gICAgICAgICAgICBhZGRyZXNzRmllbGRzLmFwcGVuZENoaWxkKFZBVE1lc3NhZ2UpO1xyXG4gICAgICAgICAgICBWQVRNZXNzYWdlLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgICAgICAgICAgc2hpcHBpbmdNZXNzYWdlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB9IGVsc2UgaWYgKHN0ZXAgPT09IFwic2hpcHBpbmdfbWV0aG9kXCIpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2hpcHBpbmdGaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0ZXBfX3NlY3Rpb25zXCIpO1xyXG4gICAgICAgICAgICBzaGlwcGluZ0ZpZWxkcy5hcHBlbmRDaGlsZChzaGlwcGluZ01lc3NhZ2UpO1xyXG4gICAgICAgICAgICBWQVRNZXNzYWdlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgc2hpcHBpbmdNZXNzYWdlLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93Lm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XHJcbiAgICAgICAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhxdWVyeVN0cmluZyk7XHJcbiAgICAgICAgY29uc3Qgc3RlcFBhcmFtID0gdXJsUGFyYW1zLmdldChcInN0ZXBcIik7IC8vIENhbiBiZSAnY29udGFjdF9pbmZvcm1hdGlvbicsICdzaGlwcGluZ19tZXRob2QnIG9yICdwYXltZW50X21ldGhvZCdcclxuICAgICAgICBpZiAoc3RlcFBhcmFtID09PSBcImNvbnRhY3RfaW5mb3JtYXRpb25cIikge1xyXG4gICAgICAgICAgICBjcmVhdGVWQVRGaWVsZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhcHBlbmRDaGVja291dE1lc3NhZ2VzKHN0ZXBQYXJhbSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4iLCJleHBvcnQgY29uc3QgdGhyb3R0bGUgPSAoZm4sIHdhaXQpID0+IHtcclxuICAgIGxldCBpblRocm90dGxlLCBsYXN0Rm4sIGxhc3RUaW1lO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XHJcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFpblRocm90dGxlKSB7XHJcbiAgICAgICAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgICAgICAgICBsYXN0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgICAgIGluVGhyb3R0bGUgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChsYXN0Rm4pO1xyXG4gICAgICAgICAgICBsYXN0Rm4gPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChEYXRlLm5vdygpIC0gbGFzdFRpbWUgPj0gd2FpdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgTWF0aC5tYXgod2FpdCAtIChEYXRlLm5vdygpIC0gbGFzdFRpbWUpLCAwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbInRocm90dGxlIiwiaW5pdENsYXNzZXMiLCJJbml0Q2xhc3MiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwic2V0Q3NzUHJvcGVydGllcyIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50Iiwic3R5bGUiLCJzZXRQcm9wZXJ0eSIsImlubmVyV2lkdGgiLCJjbGllbnRXaWR0aCIsImlubmVySGVpZ2h0IiwiY3JlYXRlVkFURmllbGQiLCJmaWVsZCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJpbnB1dCIsImFwcGVuZENoaWxkIiwiYWRkcmVzc0ZpZWxkcyIsInF1ZXJ5U2VsZWN0b3IiLCJhcHBlbmRDaGVja291dE1lc3NhZ2VzIiwic3RlcCIsIlZBVE1lc3NhZ2UiLCJzaGlwcGluZ01lc3NhZ2UiLCJkaXNwbGF5Iiwic2hpcHBpbmdGaWVsZHMiLCJvbmxvYWQiLCJxdWVyeVN0cmluZyIsImxvY2F0aW9uIiwic2VhcmNoIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwic3RlcFBhcmFtIiwiZ2V0IiwiZm4iLCJ3YWl0IiwiaW5UaHJvdHRsZSIsImxhc3RGbiIsImxhc3RUaW1lIiwiYXJncyIsImNvbnRleHQiLCJhcHBseSIsIkRhdGUiLCJub3ciLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiTWF0aCIsIm1heCJdLCJzb3VyY2VSb290IjoiIn0=