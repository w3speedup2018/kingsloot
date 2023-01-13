(self["webpackChunkjuno_shopify_template"] = self["webpackChunkjuno_shopify_template"] || []).push([["theme"],{

/***/ "./src/assets/js/main/accordion/index.ts":
/*!***********************************************!*\
  !*** ./src/assets/js/main/accordion/index.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");


class AccordionController {
  constructor() {
    const elAccordion = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)(".js-accordion");
    if (elAccordion.length) this._load(elAccordion);
  }

  async _load(elements) {
    const {
      default: Accordion
    } = await __webpack_require__.e(/*! import() | accordion */ "accordion").then(__webpack_require__.bind(__webpack_require__, /*! ./Accordion */ "./src/assets/js/main/accordion/Accordion.ts"));
    elements.forEach(el => new Accordion(el));
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AccordionController);

/***/ }),

/***/ "./src/assets/js/main/carousel/index.ts":
/*!**********************************************!*\
  !*** ./src/assets/js/main/carousel/index.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");


class CarouselController {
  constructor() {
    const elements = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)(".js-carousel");
    if (elements.length === 0) return;
    if (elements.length === 1 && elements[0].childElementCount === 1) return;

    this._createInstances(elements);
  }

  async _createInstances(elements) {
    const {
      Carousel
    } = await __webpack_require__.e(/*! import() | carousel */ "carousel").then(__webpack_require__.bind(__webpack_require__, /*! ./Carousel */ "./src/assets/js/main/carousel/Carousel.ts"));

    for (const element of elements) {
      if (element.childElementCount > 1) {
        new Carousel(element);
      }
    }
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CarouselController);

/***/ }),

/***/ "./src/assets/js/main/cart/index.js":
/*!******************************************!*\
  !*** ./src/assets/js/main/cart/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");


class CartController {
  constructor() {
    const elMiniCart = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-mini-cart");
    if (elMiniCart) this._load(elMiniCart);
    const elCart = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-cart");
    if (elCart) this._cartLoad(elCart);
  }

  async _load(el) {
    const {
      MiniCart
    } = await Promise.all(/*! import() | minicart */[__webpack_require__.e("src_assets_js_main_cart_functions_quantity_js-src_assets_js_main_cart_functions_submit_js-src-377480"), __webpack_require__.e("minicart")]).then(__webpack_require__.bind(__webpack_require__, /*! ./Minicart */ "./src/assets/js/main/cart/Minicart.js"));
    new MiniCart(el);
  }

  async _cartLoad(el) {
    const {
      Cart
    } = await Promise.all(/*! import() | MainCart */[__webpack_require__.e("src_assets_js_main_cart_functions_quantity_js-src_assets_js_main_cart_functions_submit_js-src-377480"), __webpack_require__.e("MainCart")]).then(__webpack_require__.bind(__webpack_require__, /*! ./Cart */ "./src/assets/js/main/cart/Cart.js"));
    new Cart(el);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CartController);

/***/ }),

/***/ "./src/assets/js/main/collection/index.js":
/*!************************************************!*\
  !*** ./src/assets/js/main/collection/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");


class CollectionController {
  constructor() {
    const elCollection = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)("collection-section");
    if (elCollection) this._load();
    console.log('init');
  }

  async _load() {
    const {
      Collection
    } = await __webpack_require__.e(/*! import() | collection-page */ "collection-page").then(__webpack_require__.bind(__webpack_require__, /*! ./Collection */ "./src/assets/js/main/collection/Collection.js"));
    customElements.define("collection-section", Collection);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CollectionController);

/***/ }),

/***/ "./src/assets/js/main/featured-products/index.js":
/*!*******************************************************!*\
  !*** ./src/assets/js/main/featured-products/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");


class FeaturedProductsController {
  constructor() {
    const elNav = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-featured-products");
    if (elNav) this._load(elNav);
  }

  async _load(el) {
    const {
      FeaturedProducts
    } = await __webpack_require__.e(/*! import() | featured-products */ "featured-products").then(__webpack_require__.bind(__webpack_require__, /*! ./FeaturedProducts */ "./src/assets/js/main/featured-products/FeaturedProducts.js"));
    new FeaturedProducts(el);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FeaturedProductsController);

/***/ }),

/***/ "./src/assets/js/main/form/index.js":
/*!******************************************!*\
  !*** ./src/assets/js/main/form/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");


class FormController {
  constructor() {
    const elForms = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)(".js-form");
    if (elForms) this._load(elForms);
  }

  async _load(elements) {
    const {
      FormHandler
    } = await __webpack_require__.e(/*! import() | form */ "form").then(__webpack_require__.bind(__webpack_require__, /*! ./Form */ "./src/assets/js/main/form/Form.js"));
    elements.forEach(form => {
      form.addEventListener("submit", new FormHandler(form));
    });
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormController);

/***/ }),

/***/ "./src/assets/js/main/header/index.js":
/*!********************************************!*\
  !*** ./src/assets/js/main/header/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/throttle.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/attach-event.ts");


class HeaderController {
  constructor() {
    const elHeader = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-header");
    const elAnnouncementBar = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-announcement-bar");

    if (elHeader) {
      this._load(elHeader);

      this._setHeaderHeightAsCssCustomProperty(elHeader);
    }

    if (elAnnouncementBar) {
      this._setAnnouncementBarHeightAsCssCustomProperty(elAnnouncementBar);
    }
  }

  async _load(el) {
    const {
      Header
    } = await __webpack_require__.e(/*! import() | header */ "header").then(__webpack_require__.bind(__webpack_require__, /*! ./Header */ "./src/assets/js/main/header/Header.js"));
    new Header(el);
  }

  _setHeaderHeightAsCssCustomProperty(el) {
    const throttled = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.throttle)(() => {
      document.documentElement.style.setProperty("--header-height", `${el.getBoundingClientRect().height}px`);
    }, 250);
    throttled();
    (0,_utils__WEBPACK_IMPORTED_MODULE_2__.attachEvent)("scroll", window, throttled);
  }

  _setAnnouncementBarHeightAsCssCustomProperty(el) {
    const throttled = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.throttle)(() => {
      document.documentElement.style.setProperty("--announce-bar", `${el.getBoundingClientRect().height}px`);
    }, 250);
    throttled();
    (0,_utils__WEBPACK_IMPORTED_MODULE_2__.attachEvent)("scroll", window, throttled);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeaderController);

/***/ }),

/***/ "./src/assets/js/main/model/index.js":
/*!*******************************************!*\
  !*** ./src/assets/js/main/model/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");


class ModelController {
  constructor() {
    const el = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)(".js-model");
    if (el) this._load(el);
  }

  async _load(elements) {
    const {
      Model
    } = await __webpack_require__.e(/*! import() | model */ "model").then(__webpack_require__.bind(__webpack_require__, /*! ./model */ "./src/assets/js/main/model/model.js"));
    new Model(elements);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModelController);

/***/ }),

/***/ "./src/assets/js/main/navigation/index.js":
/*!************************************************!*\
  !*** ./src/assets/js/main/navigation/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");


class NavigationController {
  constructor() {
    const elNav = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-nav");
    if (elNav) this._load(elNav);
  }

  async _load(el) {
    const {
      Navigation
    } = await __webpack_require__.e(/*! import() | navigation */ "navigation").then(__webpack_require__.bind(__webpack_require__, /*! ./Navigation */ "./src/assets/js/main/navigation/Navigation.js"));
    new Navigation(el);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavigationController);

/***/ }),

/***/ "./src/assets/js/main/product-card/index.js":
/*!**************************************************!*\
  !*** ./src/assets/js/main/product-card/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");


class ProductCardController {
  constructor() {
    const elNav = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)(".js-product-card");
    if (elNav) this._load(elNav);
  }

  async _load(el) {
    const {
      ProductCard
    } = await __webpack_require__.e(/*! import() | featured-products */ "featured-products").then(__webpack_require__.bind(__webpack_require__, /*! ./ProductCard */ "./src/assets/js/main/product-card/ProductCard.js"));
    el.forEach(item => {
      new ProductCard(item);
    });
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductCardController);

/***/ }),

/***/ "./src/assets/js/main/product/index.js":
/*!*********************************************!*\
  !*** ./src/assets/js/main/product/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");


class ProductController {
  constructor() {
    const elProduct = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)("product-component");
    if (elProduct) this._load();
  }

  async _load() {
    const {
      Product
    } = await Promise.all(/*! import() | product-page */[__webpack_require__.e("src_assets_js_main_cart_functions_quantity_js-src_assets_js_main_cart_functions_submit_js-src-377480"), __webpack_require__.e("product-page")]).then(__webpack_require__.bind(__webpack_require__, /*! ./Product */ "./src/assets/js/main/product/Product.js"));

    if (customElements.get('product-component') === undefined) {
      customElements.define("product-component", Product);
    }
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductController);

/***/ }),

/***/ "./src/assets/js/main/shop-look/index.js":
/*!***********************************************!*\
  !*** ./src/assets/js/main/shop-look/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");


class ShopLook {
  constructor() {
    const Els = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)("shop-the-look");
    if (Els) this._load(Els);
  }

  async _load(elements) {
    const {
      ShopLook
    } = await __webpack_require__.e(/*! import() | shoplook */ "shoplook").then(__webpack_require__.bind(__webpack_require__, /*! ./ShopLook */ "./src/assets/js/main/shop-look/ShopLook.js"));
    customElements.define("shop-the-look", ShopLook);

    for (const element of elements) {
      if (element.childElementCount > 1) {
        new ShopLook(element);
      }
    }
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ShopLook);

/***/ }),

/***/ "./src/assets/js/main/video/index.ts":
/*!*******************************************!*\
  !*** ./src/assets/js/main/video/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/attach-event.ts");

const typesMap = {
  HTML5: "HTML5",
  youtube: "YouTube",
  vimeo: "Vimeo"
};

class VideoController {
  constructor() {
    const elVideos = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)(".js-video");
    if (elVideos.length === 0) return;
    const videos = {
      HTML5: [],
      vimeo: [],
      youtube: []
    };

    for (const elVideo of elVideos) {
      // @ts-ignore
      const {
        type
      } = elVideo.dataset;

      if (type) {
        videos[type].push(elVideo);
      }
    }

    const videosMap = Object.entries(videos);
    videosMap.forEach(this._createVideos);
    this.carouselVideos();
  }

  async _createVideos([type, elements]) {
    if (elements.length === 0) return;
    const {
      default: VideoInstance
    } = await __webpack_require__("./src/assets/js/main/video/types lazy recursive ^\\.\\/.*$")(`./${typesMap[type]}`);
    elements.forEach(e => new VideoInstance(e));
  }

  async carouselVideos() {
    const elVideos = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)(".js-video");

    for (const el of elVideos) {
      const videoStatus = el.getAttribute("data-status") || "";
      const slide = el.closest(".c-carousel__slide");

      if (slide) {
        if (videoStatus.includes("playing")) {
          slide.classList.add("video-loaded");
        } else {
          // @ts-ignore
          (0,_utils__WEBPACK_IMPORTED_MODULE_1__.attachEvent)("videosize", el, () => {
            slide.classList.add("video-loaded");
          });
        }
      }
    }
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VideoController);

/***/ }),

/***/ "./src/assets/js/theme.js":
/*!********************************!*\
  !*** ./src/assets/js/theme.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_throttle__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @/utils/throttle */ "./src/assets/js/utils/throttle.ts");
/* harmony import */ var _main_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/main/header */ "./src/assets/js/main/header/index.js");
/* harmony import */ var _main_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/main/navigation */ "./src/assets/js/main/navigation/index.js");
/* harmony import */ var _main_accordion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/main/accordion */ "./src/assets/js/main/accordion/index.ts");
/* harmony import */ var _main_carousel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/main/carousel */ "./src/assets/js/main/carousel/index.ts");
/* harmony import */ var _main_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/main/model */ "./src/assets/js/main/model/index.js");
/* harmony import */ var _main_video__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/main/video */ "./src/assets/js/main/video/index.ts");
/* harmony import */ var _main_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/main/form */ "./src/assets/js/main/form/index.js");
/* harmony import */ var _main_cart__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/main/cart */ "./src/assets/js/main/cart/index.js");
/* harmony import */ var _main_shop_look__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/main/shop-look */ "./src/assets/js/main/shop-look/index.js");
/* harmony import */ var _main_collection__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/main/collection */ "./src/assets/js/main/collection/index.js");
/* harmony import */ var _main_product__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/main/product */ "./src/assets/js/main/product/index.js");
/* harmony import */ var _main_product_card__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/main/product-card */ "./src/assets/js/main/product-card/index.js");
/* harmony import */ var _main_featured_products___WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @/main/featured-products/ */ "./src/assets/js/main/featured-products/index.js");


 //import Search from "@/main/search";








 // import Customer from "@/main/customer";




const initClasses = [_main_accordion__WEBPACK_IMPORTED_MODULE_0__["default"], _main_header__WEBPACK_IMPORTED_MODULE_1__["default"], _main_model__WEBPACK_IMPORTED_MODULE_2__["default"], _main_navigation__WEBPACK_IMPORTED_MODULE_3__["default"], //Search,
_main_carousel__WEBPACK_IMPORTED_MODULE_4__["default"], _main_video__WEBPACK_IMPORTED_MODULE_5__["default"], _main_form__WEBPACK_IMPORTED_MODULE_6__["default"], _main_cart__WEBPACK_IMPORTED_MODULE_7__["default"], _main_shop_look__WEBPACK_IMPORTED_MODULE_8__["default"], _main_collection__WEBPACK_IMPORTED_MODULE_9__["default"], // Customer,
_main_product__WEBPACK_IMPORTED_MODULE_10__["default"], _main_product_card__WEBPACK_IMPORTED_MODULE_11__["default"], _main_featured_products___WEBPACK_IMPORTED_MODULE_12__["default"]];

for (const InitClass of initClasses) {
  new InitClass();
}

(function () {
  window.addEventListener("resize", (0,_utils_throttle__WEBPACK_IMPORTED_MODULE_13__.throttle)(setCssProperties, 250));
  setCssProperties();

  function setCssProperties() {
    document.documentElement.style.setProperty("--scrollbar-width", `${window.innerWidth - document.documentElement.clientWidth + 0.5}px`);
    document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
  }

  window.addEventListener("resize", updateResize);
  window.addEventListener("onload", updateResize);

  window.onscroll = function () {
    updatePosition();
  };

  function updatePosition() {
    if (document.getElementsByClassName('c-header')[0].classList.contains('is-scrolled')) {
      document.getElementById("mobile_addition_header").style.position = "fixed";
      document.getElementById("mobile_addition_header").style.top = "0px";
    } else {
      const promotion = document.querySelector('.c-announcement-bar__copy');

      if (promotion) {
        document.getElementById("mobile_addition_header").setAttribute("style", "top: 80px;");
      } else {
        document.getElementById("mobile_addition_header").setAttribute("style", "top: 49px;");
      }
    }
  }

  function updateResize() {
    if (document.getElementsByClassName('c-header')[0].classList.contains('is-scrolled')) {
      document.getElementById("mobile_addition_header").style.position = "fixed";
      document.getElementById("mobile_addition_header").style.top = "0px";
    } else {
      const promotion = document.querySelector('.c-announcement-bar__copy');

      if (promotion) {
        document.getElementById("mobile_addition_header").setAttribute("style", "top: 80px;");
      } else {
        document.getElementById("mobile_addition_header").setAttribute("style", "top: 49px;");
      }
    }

    document.querySelector('#mobile_addition_header .c-accordion__items-item--content.js-accordion-content').setAttribute("style", "max-height: 199px;");

    if (screen.width > 768) {
      document.querySelector('body main').setAttribute("style", "margin-top: 0px;");
    } else {
      document.querySelector('body main').setAttribute("style", "margin-top: 190px;");
    }
  }

  var mobile_btn = document.querySelector('#mobile_addition_header .js-accordion-trigger');
  mobile_btn.addEventListener("click", function (e) {
    if (mobile_btn.classList.contains('is-open')) {
      document.querySelector('body main').setAttribute("style", "margin-top: 10px;");
    } else {
      document.querySelector('body main').setAttribute("style", "margin-top: 190px;");
    }
  }, false);
  var lifemodalbtn = document.getElementsByClassName('modal_lifetime')[0];

  if (lifemodalbtn) {
    lifemodalbtn.addEventListener("click", function (e) {
      document.getElementsByClassName('c-modal-lifetime')[0].classList.add("active");
    }, false);
    document.getElementsByClassName('c-modal-lifetime__close-btn')[0].addEventListener("click", function (e) {
      document.getElementsByClassName('c-modal-lifetime')[0].classList.remove("active");
    }, false);
  }

  setTimeout(() => {
    var access_btn = document.getElementsByClassName('access_btn')[0];

    if (access_btn) {
      access_btn.addEventListener("click", function (e) {
        const triggerBtn = document.querySelector('.acsb-trigger.acsb-bg-lead');

        if (triggerBtn) {
          triggerBtn.click();
        }
      }, false);
    }
  }, 2000);
})();

/***/ }),

/***/ "./src/assets/js/utils/attach-event.ts":
/*!*********************************************!*\
  !*** ./src/assets/js/utils/attach-event.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "attachEvent": () => (/* binding */ attachEvent)
/* harmony export */ });
function attachEvent(event, node = window, listener, options) {
  node.addEventListener(event, listener, options);
  return () => node.removeEventListener(event, listener, options);
}

/***/ }),

/***/ "./src/assets/js/utils/element.ts":
/*!****************************************!*\
  !*** ./src/assets/js/utils/element.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "get": () => (/* binding */ get),
/* harmony export */   "getAll": () => (/* binding */ getAll),
/* harmony export */   "getSiblings": () => (/* binding */ getSiblings),
/* harmony export */   "renderElement": () => (/* binding */ renderElement)
/* harmony export */ });
function get(selector, node = document) {
  return node.querySelector(selector);
}
function getAll(selector, node = document) {
  return Array.from(node.querySelectorAll(selector));
}
function getSiblings(element) {
  const nodes = Array.from(element.parentElement.children);
  return nodes.filter(node => node !== element);
}
function renderElement({
  type,
  props = {}
}, container) {
  const isTextElement = !type;
  const element = isTextElement ? document.createTextNode("") : document.createElement(type);

  const isListener = p => p.startsWith("on");

  const isAttribute = p => !isListener(p) && p !== "children";

  Object.keys(props).forEach(p => {
    // @ts-expect-error
    if (isAttribute(p)) element[p] = props[p];
    if (!isTextElement && isListener(p)) element.addEventListener(p.toLowerCase().slice(2), props[p]);
  });
  if (!isTextElement && props.children && props.children.length) // @ts-expect-error
    props.children.forEach(childElement => renderElement(childElement, element));
  container.append(element);
}

/***/ }),

/***/ "./src/assets/js/utils/throttle.ts":
/*!*****************************************!*\
  !*** ./src/assets/js/utils/throttle.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "./src/assets/scss/theme.scss":
/*!************************************!*\
  !*** ./src/assets/scss/theme.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/assets/js/main/video/types lazy recursive ^\\.\\/.*$":
/*!*********************************************************************************************!*\
  !*** ./src/assets/js/main/video/types/ lazy ^\.\/.*$ chunkName: [request] namespace object ***!
  \*********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./HTML5": [
		"./src/assets/js/main/video/types/HTML5.ts",
		"HTML5"
	],
	"./HTML5.ts": [
		"./src/assets/js/main/video/types/HTML5.ts",
		"HTML5"
	],
	"./Vimeo": [
		"./src/assets/js/main/video/types/Vimeo.ts",
		"Vimeo"
	],
	"./Vimeo.ts": [
		"./src/assets/js/main/video/types/Vimeo.ts",
		"Vimeo"
	],
	"./YouTube": [
		"./src/assets/js/main/video/types/YouTube.ts",
		"YouTube"
	],
	"./YouTube.ts": [
		"./src/assets/js/main/video/types/YouTube.ts",
		"YouTube"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = "./src/assets/js/main/video/types lazy recursive ^\\.\\/.*$";
module.exports = webpackAsyncContext;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/assets/js/theme.js"), __webpack_exec__("./src/assets/scss/theme.scss"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL21haW4vYWNjb3JkaW9uL2luZGV4LnRzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvbWFpbi9jYXJvdXNlbC9pbmRleC50cyIsIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL21haW4vY2FydC9pbmRleC5qcyIsIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL21haW4vY29sbGVjdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL21haW4vZmVhdHVyZWQtcHJvZHVjdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vc3JjL2Fzc2V0cy9qcy9tYWluL2Zvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vc3JjL2Fzc2V0cy9qcy9tYWluL2hlYWRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL21haW4vbW9kZWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vc3JjL2Fzc2V0cy9qcy9tYWluL25hdmlnYXRpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vc3JjL2Fzc2V0cy9qcy9tYWluL3Byb2R1Y3QtY2FyZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL21haW4vcHJvZHVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL21haW4vc2hvcC1sb29rL2luZGV4LmpzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvbWFpbi92aWRlby9pbmRleC50cyIsIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL3RoZW1lLmpzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvdXRpbHMvYXR0YWNoLWV2ZW50LnRzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvdXRpbHMvZWxlbWVudC50cyIsIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL3V0aWxzL3Rocm90dGxlLnRzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvc2Nzcy90aGVtZS5zY3NzPzczZDAiLCJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vc3JjL2Fzc2V0cy9qcy9tYWluL3ZpZGVvL3R5cGVzLyBsYXp5IF5cXC5cXC8uKiQgY2h1bmtOYW1lOiBbcmVxdWVzdF0gbmFtZXNwYWNlIG9iamVjdCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRBbGwgfSBmcm9tIFwiQC91dGlsc1wiO1xyXG5cclxuY2xhc3MgQWNjb3JkaW9uQ29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBjb25zdCBlbEFjY29yZGlvbiA9IGdldEFsbChcIi5qcy1hY2NvcmRpb25cIik7XHJcbiAgICAgICAgaWYgKGVsQWNjb3JkaW9uLmxlbmd0aCkgdGhpcy5fbG9hZChlbEFjY29yZGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgX2xvYWQoZWxlbWVudHM6IEhUTUxFbGVtZW50W10pIHtcclxuICAgICAgICBjb25zdCB7IGRlZmF1bHQ6IEFjY29yZGlvbiB9ID0gYXdhaXQgaW1wb3J0KFxyXG4gICAgICAgICAgICAvKiB3ZWJwYWNrQ2h1bmtOYW1lOiBcImFjY29yZGlvblwiICovIFwiLi9BY2NvcmRpb25cIlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgZWxlbWVudHMuZm9yRWFjaCgoZWwpID0+IG5ldyBBY2NvcmRpb24oZWwpKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWNjb3JkaW9uQ29udHJvbGxlcjtcclxuIiwiaW1wb3J0IHsgZ2V0QWxsIH0gZnJvbSBcIkAvdXRpbHNcIjtcclxuXHJcbmNsYXNzIENhcm91c2VsQ29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBjb25zdCBlbGVtZW50cyA9IGdldEFsbChcIi5qcy1jYXJvdXNlbFwiKTtcclxuICAgICAgICBpZiAoZWxlbWVudHMubGVuZ3RoID09PSAwKSByZXR1cm47XHJcbiAgICAgICAgaWYgKGVsZW1lbnRzLmxlbmd0aCA9PT0gMSAmJiBlbGVtZW50c1swXS5jaGlsZEVsZW1lbnRDb3VudCA9PT0gMSkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLl9jcmVhdGVJbnN0YW5jZXMoZWxlbWVudHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIF9jcmVhdGVJbnN0YW5jZXMoZWxlbWVudHMpIHtcclxuICAgICAgICBjb25zdCB7IENhcm91c2VsIH0gPSBhd2FpdCBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogXCJjYXJvdXNlbFwiICovIFwiLi9DYXJvdXNlbFwiKTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmNoaWxkRWxlbWVudENvdW50ID4gMSkge1xyXG4gICAgICAgICAgICAgICAgbmV3IENhcm91c2VsKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IENhcm91c2VsQ29udHJvbGxlcjtcclxuIiwiaW1wb3J0IHsgZ2V0IH0gZnJvbSBcIkAvdXRpbHNcIjtcclxuXHJcbmNsYXNzIENhcnRDb250cm9sbGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGNvbnN0IGVsTWluaUNhcnQgPSBnZXQoXCIuanMtbWluaS1jYXJ0XCIpO1xyXG4gICAgICAgIGlmIChlbE1pbmlDYXJ0KSB0aGlzLl9sb2FkKGVsTWluaUNhcnQpO1xyXG5cclxuICAgICAgICBjb25zdCBlbENhcnQgPSBnZXQoXCIuanMtY2FydFwiKTtcclxuICAgICAgICBpZiAoZWxDYXJ0KSB0aGlzLl9jYXJ0TG9hZChlbENhcnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIF9sb2FkKGVsKSB7XHJcbiAgICAgICAgY29uc3QgeyBNaW5pQ2FydCB9ID0gYXdhaXQgaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6IFwibWluaWNhcnRcIiAqLyBcIi4vTWluaWNhcnRcIik7XHJcbiAgICAgICAgbmV3IE1pbmlDYXJ0KGVsKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBfY2FydExvYWQoZWwpIHtcclxuICAgICAgICBjb25zdCB7IENhcnQgfSA9IGF3YWl0IGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiBcIk1haW5DYXJ0XCIgKi8gXCIuL0NhcnRcIik7XHJcbiAgICAgICAgbmV3IENhcnQoZWwpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYXJ0Q29udHJvbGxlcjtcclxuIiwiaW1wb3J0IHsgZ2V0IH0gZnJvbSBcIkAvdXRpbHNcIjtcclxuXHJcbmNsYXNzIENvbGxlY3Rpb25Db250cm9sbGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGNvbnN0IGVsQ29sbGVjdGlvbiA9IGdldChcImNvbGxlY3Rpb24tc2VjdGlvblwiKTtcclxuICAgICAgICBpZiAoZWxDb2xsZWN0aW9uKSB0aGlzLl9sb2FkKCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdpbml0JylcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBfbG9hZCgpIHtcclxuICAgICAgICBjb25zdCB7IENvbGxlY3Rpb24gfSA9IGF3YWl0IGltcG9ydChcclxuICAgICAgICAgICAgLyogd2VicGFja0NodW5rTmFtZTogXCJjb2xsZWN0aW9uLXBhZ2VcIiAqLyBcIi4vQ29sbGVjdGlvblwiXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjdXN0b21FbGVtZW50cy5kZWZpbmUoXCJjb2xsZWN0aW9uLXNlY3Rpb25cIiwgQ29sbGVjdGlvbik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbGxlY3Rpb25Db250cm9sbGVyO1xyXG4iLCJpbXBvcnQgeyBnZXQgfSBmcm9tIFwiQC91dGlsc1wiO1xyXG5cclxuY2xhc3MgRmVhdHVyZWRQcm9kdWN0c0NvbnRyb2xsZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgY29uc3QgZWxOYXYgPSBnZXQoXCIuanMtZmVhdHVyZWQtcHJvZHVjdHNcIik7XHJcbiAgICAgICAgaWYgKGVsTmF2KSB0aGlzLl9sb2FkKGVsTmF2KTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBfbG9hZChlbCkge1xyXG4gICAgICAgIGNvbnN0IHsgRmVhdHVyZWRQcm9kdWN0cyB9ID0gYXdhaXQgaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6IFwiZmVhdHVyZWQtcHJvZHVjdHNcIiAqLyBcIi4vRmVhdHVyZWRQcm9kdWN0c1wiKTtcclxuICAgICAgICBuZXcgRmVhdHVyZWRQcm9kdWN0cyhlbCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZlYXR1cmVkUHJvZHVjdHNDb250cm9sbGVyO1xyXG4iLCJpbXBvcnQgeyBnZXRBbGwgfSBmcm9tIFwiQC91dGlsc1wiO1xyXG5cclxuY2xhc3MgRm9ybUNvbnRyb2xsZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgY29uc3QgZWxGb3JtcyA9IGdldEFsbChcIi5qcy1mb3JtXCIpO1xyXG4gICAgICAgIGlmIChlbEZvcm1zKSB0aGlzLl9sb2FkKGVsRm9ybXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIF9sb2FkKGVsZW1lbnRzKSB7XHJcbiAgICAgICAgY29uc3QgeyBGb3JtSGFuZGxlciB9ID0gYXdhaXQgaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6IFwiZm9ybVwiICovIFwiLi9Gb3JtXCIpO1xyXG5cclxuICAgICAgICBlbGVtZW50cy5mb3JFYWNoKChmb3JtKSA9PiB7XHJcbiAgICAgICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBuZXcgRm9ybUhhbmRsZXIoZm9ybSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGb3JtQ29udHJvbGxlcjtcclxuIiwiaW1wb3J0IHsgZ2V0LCBhdHRhY2hFdmVudCwgdGhyb3R0bGUgfSBmcm9tIFwiQC91dGlsc1wiO1xyXG5cclxuY2xhc3MgSGVhZGVyQ29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBjb25zdCBlbEhlYWRlciA9IGdldChcIi5qcy1oZWFkZXJcIik7XHJcbiAgICAgICAgY29uc3QgZWxBbm5vdW5jZW1lbnRCYXIgPSBnZXQoXCIuanMtYW5ub3VuY2VtZW50LWJhclwiKTtcclxuICAgICAgICBpZiAoZWxIZWFkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9hZChlbEhlYWRlcik7XHJcbiAgICAgICAgICAgIHRoaXMuX3NldEhlYWRlckhlaWdodEFzQ3NzQ3VzdG9tUHJvcGVydHkoZWxIZWFkZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGVsQW5ub3VuY2VtZW50QmFyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NldEFubm91bmNlbWVudEJhckhlaWdodEFzQ3NzQ3VzdG9tUHJvcGVydHkoZWxBbm5vdW5jZW1lbnRCYXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBfbG9hZChlbCkge1xyXG4gICAgICAgIGNvbnN0IHsgSGVhZGVyIH0gPSBhd2FpdCBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogXCJoZWFkZXJcIiAqLyBcIi4vSGVhZGVyXCIpO1xyXG4gICAgICAgIG5ldyBIZWFkZXIoZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zZXRIZWFkZXJIZWlnaHRBc0Nzc0N1c3RvbVByb3BlcnR5KGVsKSB7XHJcbiAgICAgICAgY29uc3QgdGhyb3R0bGVkID0gdGhyb3R0bGUoKCkgPT4ge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXHJcbiAgICAgICAgICAgICAgICBcIi0taGVhZGVyLWhlaWdodFwiLFxyXG4gICAgICAgICAgICAgICAgYCR7ZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0fXB4YFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sIDI1MCk7XHJcblxyXG4gICAgICAgIHRocm90dGxlZCgpO1xyXG4gICAgICAgIGF0dGFjaEV2ZW50KFwic2Nyb2xsXCIsIHdpbmRvdywgdGhyb3R0bGVkKTtcclxuICAgIH1cclxuXHJcbiAgICBfc2V0QW5ub3VuY2VtZW50QmFySGVpZ2h0QXNDc3NDdXN0b21Qcm9wZXJ0eShlbCkge1xyXG4gICAgICAgIGNvbnN0IHRocm90dGxlZCA9IHRocm90dGxlKCgpID0+IHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFxyXG4gICAgICAgICAgICAgICAgXCItLWFubm91bmNlLWJhclwiLFxyXG4gICAgICAgICAgICAgICAgYCR7ZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0fXB4YFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sIDI1MCk7XHJcblxyXG4gICAgICAgIHRocm90dGxlZCgpO1xyXG4gICAgICAgIGF0dGFjaEV2ZW50KFwic2Nyb2xsXCIsIHdpbmRvdywgdGhyb3R0bGVkKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGVhZGVyQ29udHJvbGxlcjtcclxuIiwiaW1wb3J0IHsgZ2V0QWxsIH0gZnJvbSBcIkAvdXRpbHNcIjtcclxuXHJcbmNsYXNzIE1vZGVsQ29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBjb25zdCBlbCA9IGdldEFsbChcIi5qcy1tb2RlbFwiKTtcclxuICAgICAgICBpZiAoZWwpIHRoaXMuX2xvYWQoZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIF9sb2FkKGVsZW1lbnRzKSB7XHJcbiAgICAgICAgY29uc3QgeyBNb2RlbCB9ID0gYXdhaXQgaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6IFwibW9kZWxcIiAqLyBcIi4vbW9kZWxcIik7XHJcbiAgICAgICAgbmV3IE1vZGVsKGVsZW1lbnRzKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTW9kZWxDb250cm9sbGVyO1xyXG4iLCJpbXBvcnQgeyBnZXQgfSBmcm9tIFwiQC91dGlsc1wiO1xyXG5cclxuY2xhc3MgTmF2aWdhdGlvbkNvbnRyb2xsZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgY29uc3QgZWxOYXYgPSBnZXQoXCIuanMtbmF2XCIpO1xyXG4gICAgICAgIGlmIChlbE5hdikgdGhpcy5fbG9hZChlbE5hdik7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgX2xvYWQoZWwpIHtcclxuICAgICAgICBjb25zdCB7IE5hdmlnYXRpb24gfSA9IGF3YWl0IGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiBcIm5hdmlnYXRpb25cIiAqLyBcIi4vTmF2aWdhdGlvblwiKTtcclxuICAgICAgICBuZXcgTmF2aWdhdGlvbihlbCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5hdmlnYXRpb25Db250cm9sbGVyO1xyXG4iLCJpbXBvcnQgeyBnZXRBbGwgfSBmcm9tIFwiQC91dGlsc1wiO1xyXG5cclxuY2xhc3MgUHJvZHVjdENhcmRDb250cm9sbGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGNvbnN0IGVsTmF2ID0gZ2V0QWxsKFwiLmpzLXByb2R1Y3QtY2FyZFwiKTtcclxuICAgICAgICBpZiAoZWxOYXYpIHRoaXMuX2xvYWQoZWxOYXYpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIF9sb2FkKGVsKSB7XHJcbiAgICAgICAgY29uc3QgeyBQcm9kdWN0Q2FyZCB9ID0gYXdhaXQgaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6IFwiZmVhdHVyZWQtcHJvZHVjdHNcIiAqLyBcIi4vUHJvZHVjdENhcmRcIik7XHJcbiAgICAgICAgZWwuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgbmV3IFByb2R1Y3RDYXJkKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQcm9kdWN0Q2FyZENvbnRyb2xsZXI7XHJcbiIsImltcG9ydCB7IGdldCB9IGZyb20gXCJAL3V0aWxzXCI7XHJcblxyXG5jbGFzcyBQcm9kdWN0Q29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBjb25zdCBlbFByb2R1Y3QgPSBnZXQoXCJwcm9kdWN0LWNvbXBvbmVudFwiKTtcclxuICAgICAgICBpZiAoZWxQcm9kdWN0KSB0aGlzLl9sb2FkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgX2xvYWQoKSB7XHJcbiAgICAgICAgY29uc3QgeyBQcm9kdWN0IH0gPSBhd2FpdCBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogXCJwcm9kdWN0LXBhZ2VcIiAqLyBcIi4vUHJvZHVjdFwiKTtcclxuICAgICAgICBpZihjdXN0b21FbGVtZW50cy5nZXQoJ3Byb2R1Y3QtY29tcG9uZW50JykgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjdXN0b21FbGVtZW50cy5kZWZpbmUoXCJwcm9kdWN0LWNvbXBvbmVudFwiLCBQcm9kdWN0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2R1Y3RDb250cm9sbGVyO1xyXG4iLCJpbXBvcnQgeyBnZXRBbGwgfSBmcm9tIFwiQC91dGlsc1wiO1xyXG5cclxuY2xhc3MgU2hvcExvb2sge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgY29uc3QgRWxzID0gZ2V0QWxsKFwic2hvcC10aGUtbG9va1wiKTtcclxuICAgICAgICBpZiAoRWxzKSB0aGlzLl9sb2FkKEVscyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgX2xvYWQoZWxlbWVudHMpIHtcclxuICAgICAgICBjb25zdCB7IFNob3BMb29rIH0gPSBhd2FpdCBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogXCJzaG9wbG9va1wiICovIFwiLi9TaG9wTG9va1wiKTtcclxuICAgICAgICBjdXN0b21FbGVtZW50cy5kZWZpbmUoXCJzaG9wLXRoZS1sb29rXCIsIFNob3BMb29rKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2hpbGRFbGVtZW50Q291bnQgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBuZXcgU2hvcExvb2soZWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNob3BMb29rO1xyXG4iLCJpbXBvcnQgeyBnZXRBbGwsIGF0dGFjaEV2ZW50IH0gZnJvbSBcIkAvdXRpbHNcIjtcclxuXHJcbnR5cGUgVmlkZW9UeXBlcyA9IFwiSFRNTDVcIiB8IFwidmltZW9cIiB8IFwieW91dHViZVwiO1xyXG50eXBlIFZpZGVvTWFwID0gUmVjb3JkPFZpZGVvVHlwZXMsIEhUTUxFbGVtZW50W10+O1xyXG5cclxuY29uc3QgdHlwZXNNYXAgPSB7XHJcbiAgICBIVE1MNTogXCJIVE1MNVwiLFxyXG4gICAgeW91dHViZTogXCJZb3VUdWJlXCIsXHJcbiAgICB2aW1lbzogXCJWaW1lb1wiLFxyXG59O1xyXG5cclxuY2xhc3MgVmlkZW9Db250cm9sbGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGNvbnN0IGVsVmlkZW9zID0gZ2V0QWxsKFwiLmpzLXZpZGVvXCIpO1xyXG4gICAgICAgIGlmIChlbFZpZGVvcy5sZW5ndGggPT09IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgdmlkZW9zOiBWaWRlb01hcCA9IHtcclxuICAgICAgICAgICAgSFRNTDU6IFtdLFxyXG4gICAgICAgICAgICB2aW1lbzogW10sXHJcbiAgICAgICAgICAgIHlvdXR1YmU6IFtdLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgZWxWaWRlbyBvZiBlbFZpZGVvcykge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGNvbnN0IHsgdHlwZSB9OiB7IHR5cGU6IFZpZGVvVHlwZXMgfSA9IGVsVmlkZW8uZGF0YXNldDtcclxuICAgICAgICAgICAgaWYgKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHZpZGVvc1t0eXBlXS5wdXNoKGVsVmlkZW8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB2aWRlb3NNYXAgPSBPYmplY3QuZW50cmllcyh2aWRlb3MpIGFzIFtWaWRlb1R5cGVzLCBIVE1MRWxlbWVudFtdXVtdO1xyXG4gICAgICAgIHZpZGVvc01hcC5mb3JFYWNoKHRoaXMuX2NyZWF0ZVZpZGVvcyk7XHJcblxyXG4gICAgICAgIHRoaXMuY2Fyb3VzZWxWaWRlb3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBfY3JlYXRlVmlkZW9zKFt0eXBlLCBlbGVtZW50c106IFtWaWRlb1R5cGVzLCBIVE1MRWxlbWVudFtdXSkge1xyXG4gICAgICAgIGlmIChlbGVtZW50cy5sZW5ndGggPT09IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgeyBkZWZhdWx0OiBWaWRlb0luc3RhbmNlIH0gPSBhd2FpdCBpbXBvcnQoXHJcbiAgICAgICAgICAgIC8qIHdlYnBhY2tDaHVua05hbWU6IFwiW3JlcXVlc3RdXCIgKi8gYC4vdHlwZXMvJHt0eXBlc01hcFt0eXBlXX1gXHJcbiAgICAgICAgKTtcclxuICAgICAgICBlbGVtZW50cy5mb3JFYWNoKChlKSA9PiBuZXcgVmlkZW9JbnN0YW5jZShlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgY2Fyb3VzZWxWaWRlb3MoKSB7XHJcbiAgICAgICAgY29uc3QgZWxWaWRlb3MgPSBnZXRBbGwoXCIuanMtdmlkZW9cIik7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgZWwgb2YgZWxWaWRlb3MpIHtcclxuICAgICAgICAgICAgY29uc3QgdmlkZW9TdGF0dXMgPSBlbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXN0YXR1c1wiKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICBjb25zdCBzbGlkZSA9IGVsLmNsb3Nlc3QoXCIuYy1jYXJvdXNlbF9fc2xpZGVcIik7XHJcbiAgICAgICAgICAgIGlmIChzbGlkZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZpZGVvU3RhdHVzLmluY2x1ZGVzKFwicGxheWluZ1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQoXCJ2aWRlby1sb2FkZWRcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICBhdHRhY2hFdmVudChcInZpZGVvc2l6ZVwiLCBlbCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKFwidmlkZW8tbG9hZGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWaWRlb0NvbnRyb2xsZXI7XHJcbiIsImltcG9ydCB7IHRocm90dGxlIH0gZnJvbSBcIkAvdXRpbHMvdGhyb3R0bGVcIjtcclxuXHJcbmltcG9ydCBIZWFkZXIgZnJvbSBcIkAvbWFpbi9oZWFkZXJcIjtcclxuaW1wb3J0IE5hdmlnYXRpb24gZnJvbSBcIkAvbWFpbi9uYXZpZ2F0aW9uXCI7XHJcbi8vaW1wb3J0IFNlYXJjaCBmcm9tIFwiQC9tYWluL3NlYXJjaFwiO1xyXG5pbXBvcnQgQWNjb3JkaW9uIGZyb20gXCJAL21haW4vYWNjb3JkaW9uXCI7XHJcbmltcG9ydCBDYXJvdXNlbCBmcm9tIFwiQC9tYWluL2Nhcm91c2VsXCI7XHJcbmltcG9ydCBNb2RlbCBmcm9tIFwiQC9tYWluL21vZGVsXCI7XHJcbmltcG9ydCBWaWRlbyBmcm9tIFwiQC9tYWluL3ZpZGVvXCI7XHJcbmltcG9ydCBGb3JtIGZyb20gXCJAL21haW4vZm9ybVwiO1xyXG5pbXBvcnQgQ2FydCBmcm9tIFwiQC9tYWluL2NhcnRcIjtcclxuaW1wb3J0IFNob3BMb29rIGZyb20gXCJAL21haW4vc2hvcC1sb29rXCI7XHJcbmltcG9ydCBDb2xsZWN0aW9uIGZyb20gXCJAL21haW4vY29sbGVjdGlvblwiO1xyXG4vLyBpbXBvcnQgQ3VzdG9tZXIgZnJvbSBcIkAvbWFpbi9jdXN0b21lclwiO1xyXG5pbXBvcnQgUHJvZHVjdCBmcm9tIFwiQC9tYWluL3Byb2R1Y3RcIjtcclxuaW1wb3J0IFByb2R1Y3RDYXJkIGZyb20gXCJAL21haW4vcHJvZHVjdC1jYXJkXCI7XHJcbmltcG9ydCBGZWF0dXJlZFByb2R1Y3RzIGZyb20gXCJAL21haW4vZmVhdHVyZWQtcHJvZHVjdHMvXCI7XHJcblxyXG5jb25zdCBpbml0Q2xhc3NlcyA9IFtcclxuICAgIEFjY29yZGlvbixcclxuICAgIEhlYWRlcixcclxuICAgIE1vZGVsLFxyXG4gICAgTmF2aWdhdGlvbixcclxuICAgIC8vU2VhcmNoLFxyXG4gICAgQ2Fyb3VzZWwsXHJcbiAgICBWaWRlbyxcclxuICAgIEZvcm0sXHJcbiAgICBDYXJ0LFxyXG4gICAgU2hvcExvb2ssXHJcbiAgICBDb2xsZWN0aW9uLFxyXG4gICAgLy8gQ3VzdG9tZXIsXHJcbiAgICBQcm9kdWN0LFxyXG4gICAgUHJvZHVjdENhcmQsXHJcbiAgICBGZWF0dXJlZFByb2R1Y3RzXHJcbl07XHJcblxyXG5mb3IgKGNvbnN0IEluaXRDbGFzcyBvZiBpbml0Q2xhc3Nlcykge1xyXG4gICAgbmV3IEluaXRDbGFzcygpO1xyXG59XHJcblxyXG5cclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aHJvdHRsZShzZXRDc3NQcm9wZXJ0aWVzLCAyNTApKTtcclxuICAgIHNldENzc1Byb3BlcnRpZXMoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBzZXRDc3NQcm9wZXJ0aWVzKCkge1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcclxuICAgICAgICAgICAgXCItLXNjcm9sbGJhci13aWR0aFwiLFxyXG4gICAgICAgICAgICBgJHt3aW5kb3cuaW5uZXJXaWR0aCAtIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCArIDAuNX1weGBcclxuICAgICAgICApO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tdmhcIiwgYCR7d2luZG93LmlubmVySGVpZ2h0ICogMC4wMX1weGApO1xyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHVwZGF0ZVJlc2l6ZSk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm9ubG9hZFwiLCB1cGRhdGVSZXNpemUpO1xyXG4gICAgd2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24oKSB7dXBkYXRlUG9zaXRpb24oKX07XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlUG9zaXRpb24oKSB7XHJcbiAgICAgICAgaWYoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYy1oZWFkZXInKVswXS5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLXNjcm9sbGVkJykpe1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vYmlsZV9hZGRpdGlvbl9oZWFkZXJcIikuc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCI7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9iaWxlX2FkZGl0aW9uX2hlYWRlclwiKS5zdHlsZS50b3AgPSBcIjBweFwiO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjb25zdCBwcm9tb3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy1hbm5vdW5jZW1lbnQtYmFyX19jb3B5Jyk7XHJcbiAgICAgICAgICAgIGlmIChwcm9tb3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9iaWxlX2FkZGl0aW9uX2hlYWRlclwiKS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcInRvcDogODBweDtcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vYmlsZV9hZGRpdGlvbl9oZWFkZXJcIikuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJ0b3A6IDQ5cHg7XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVJlc2l6ZSgpe1xyXG4gICAgICAgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2MtaGVhZGVyJylbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1zY3JvbGxlZCcpKXtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2JpbGVfYWRkaXRpb25faGVhZGVyXCIpLnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vYmlsZV9hZGRpdGlvbl9oZWFkZXJcIikuc3R5bGUudG9wID0gXCIwcHhcIjtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY29uc3QgcHJvbW90aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtYW5ub3VuY2VtZW50LWJhcl9fY29weScpO1xyXG4gICAgICAgICAgICBpZiAocHJvbW90aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vYmlsZV9hZGRpdGlvbl9oZWFkZXJcIikuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJ0b3A6IDgwcHg7XCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2JpbGVfYWRkaXRpb25faGVhZGVyXCIpLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwidG9wOiA0OXB4O1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9iaWxlX2FkZGl0aW9uX2hlYWRlciAuYy1hY2NvcmRpb25fX2l0ZW1zLWl0ZW0tLWNvbnRlbnQuanMtYWNjb3JkaW9uLWNvbnRlbnQnKS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIm1heC1oZWlnaHQ6IDE5OXB4O1wiKTtcclxuICAgICAgICBpZihzY3JlZW4ud2lkdGggPiA3Njgpe1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5IG1haW4nKS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIm1hcmdpbi10b3A6IDBweDtcIik7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5IG1haW4nKS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIm1hcmdpbi10b3A6IDE5MHB4O1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG1vYmlsZV9idG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9iaWxlX2FkZGl0aW9uX2hlYWRlciAuanMtYWNjb3JkaW9uLXRyaWdnZXInKTtcclxuXHJcbiAgICBtb2JpbGVfYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGlmKG1vYmlsZV9idG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1vcGVuJykpe1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5IG1haW4nKS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIm1hcmdpbi10b3A6IDEwcHg7XCIpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5IG1haW4nKS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIm1hcmdpbi10b3A6IDE5MHB4O1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgfSxmYWxzZSk7XHJcblxyXG4gICAgdmFyIGxpZmVtb2RhbGJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21vZGFsX2xpZmV0aW1lJylbMF07XHJcbiAgICBcclxuXHJcbiAgICBpZihsaWZlbW9kYWxidG4pe1xyXG4gICAgICAgIGxpZmVtb2RhbGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixmdW5jdGlvbihlKXtcclxuICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjLW1vZGFsLWxpZmV0aW1lJylbMF0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICB9LGZhbHNlKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjLW1vZGFsLWxpZmV0aW1lX19jbG9zZS1idG4nKVswXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYy1tb2RhbC1saWZldGltZScpWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgfSxmYWxzZSk7XHJcbiAgICB9XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB2YXIgYWNjZXNzX2J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FjY2Vzc19idG4nKVswXTtcclxuICAgICAgICBpZihhY2Nlc3NfYnRuKXtcclxuICAgICAgICAgICAgYWNjZXNzX2J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0cmlnZ2VyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFjc2ItdHJpZ2dlci5hY3NiLWJnLWxlYWQnKTtcclxuICAgICAgICAgICAgICAgIGlmICh0cmlnZ2VyQnRuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckJ0bi5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSwgMjAwMCk7XHJcblxyXG5cclxufSkoKTtcclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGF0dGFjaEV2ZW50PFRFdmVudCBleHRlbmRzIEV2ZW50ID0gRXZlbnQ+KFxyXG4gICAgZXZlbnQ6IGtleW9mIFdpbmRvd0V2ZW50TWFwLFxyXG4gICAgbm9kZTogV2luZG93IHwgRG9jdW1lbnQgfCBIVE1MRWxlbWVudCA9IHdpbmRvdyxcclxuICAgIGxpc3RlbmVyOiBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0IHwgKChldmVudDogVEV2ZW50KSA9PiB2b2lkKSxcclxuICAgIG9wdGlvbnM/OiBBZGRFdmVudExpc3RlbmVyT3B0aW9ucyB8IHVuZGVmaW5lZFxyXG4pIHtcclxuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIsIG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuICgpID0+IG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIsIG9wdGlvbnMpO1xyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBnZXQoc2VsZWN0b3I6IHN0cmluZywgbm9kZTogRG9jdW1lbnQgfCBIVE1MRWxlbWVudCA9IGRvY3VtZW50KSB7XHJcbiAgICByZXR1cm4gbm9kZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSBhcyBIVE1MRWxlbWVudCB8IG51bGw7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBbGwoc2VsZWN0b3I6IHN0cmluZywgbm9kZTogRG9jdW1lbnQgfCBIVE1MRWxlbWVudCA9IGRvY3VtZW50KSB7XHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKSBhcyBIVE1MRWxlbWVudFtdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2libGluZ3MoZWxlbWVudDogRWxlbWVudCkge1xyXG4gICAgY29uc3Qgbm9kZXMgPSBBcnJheS5mcm9tKGVsZW1lbnQucGFyZW50RWxlbWVudCEuY2hpbGRyZW4pO1xyXG4gICAgcmV0dXJuIG5vZGVzLmZpbHRlcigobm9kZSkgPT4gbm9kZSAhPT0gZWxlbWVudCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJFbGVtZW50KFxyXG4gICAgeyB0eXBlLCBwcm9wcyA9IHt9IH06IHsgdHlwZToga2V5b2YgSFRNTEVsZW1lbnRUYWdOYW1lTWFwOyBwcm9wczogUmVjb3JkPHN0cmluZywgYW55PiB9LFxyXG4gICAgY29udGFpbmVyOiBFbGVtZW50XHJcbikge1xyXG4gICAgY29uc3QgaXNUZXh0RWxlbWVudCA9ICF0eXBlO1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGlzVGV4dEVsZW1lbnQgPyBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XHJcblxyXG4gICAgY29uc3QgaXNMaXN0ZW5lciA9IChwOiBhbnkpOiBwIGlzIHN0cmluZyA9PiBwLnN0YXJ0c1dpdGgoXCJvblwiKTtcclxuICAgIGNvbnN0IGlzQXR0cmlidXRlID0gKHA6IGFueSkgPT4gIWlzTGlzdGVuZXIocCkgJiYgcCAhPT0gXCJjaGlsZHJlblwiO1xyXG5cclxuICAgIE9iamVjdC5rZXlzKHByb3BzKS5mb3JFYWNoKChwOiB1bmtub3duKSA9PiB7XHJcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxyXG4gICAgICAgIGlmIChpc0F0dHJpYnV0ZShwKSkgZWxlbWVudFtwXSA9IHByb3BzW3BdO1xyXG4gICAgICAgIGlmICghaXNUZXh0RWxlbWVudCAmJiBpc0xpc3RlbmVyKHApKVxyXG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIocC50b0xvd2VyQ2FzZSgpLnNsaWNlKDIpLCBwcm9wc1twXSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIWlzVGV4dEVsZW1lbnQgJiYgcHJvcHMuY2hpbGRyZW4gJiYgcHJvcHMuY2hpbGRyZW4ubGVuZ3RoKVxyXG4gICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcclxuICAgICAgICBwcm9wcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZEVsZW1lbnQpID0+IHJlbmRlckVsZW1lbnQoY2hpbGRFbGVtZW50LCBlbGVtZW50KSk7XHJcblxyXG4gICAgY29udGFpbmVyLmFwcGVuZChlbGVtZW50KTtcclxufVxyXG4iLCJleHBvcnQgY29uc3QgdGhyb3R0bGUgPSAoZm4sIHdhaXQpID0+IHtcclxuICAgIGxldCBpblRocm90dGxlLCBsYXN0Rm4sIGxhc3RUaW1lO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XHJcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFpblRocm90dGxlKSB7XHJcbiAgICAgICAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgICAgICAgICBsYXN0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgICAgIGluVGhyb3R0bGUgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChsYXN0Rm4pO1xyXG4gICAgICAgICAgICBsYXN0Rm4gPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChEYXRlLm5vdygpIC0gbGFzdFRpbWUgPj0gd2FpdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgTWF0aC5tYXgod2FpdCAtIChEYXRlLm5vdygpIC0gbGFzdFRpbWUpLCAwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwidmFyIG1hcCA9IHtcblx0XCIuL0hUTUw1XCI6IFtcblx0XHRcIi4vc3JjL2Fzc2V0cy9qcy9tYWluL3ZpZGVvL3R5cGVzL0hUTUw1LnRzXCIsXG5cdFx0XCJIVE1MNVwiXG5cdF0sXG5cdFwiLi9IVE1MNS50c1wiOiBbXG5cdFx0XCIuL3NyYy9hc3NldHMvanMvbWFpbi92aWRlby90eXBlcy9IVE1MNS50c1wiLFxuXHRcdFwiSFRNTDVcIlxuXHRdLFxuXHRcIi4vVmltZW9cIjogW1xuXHRcdFwiLi9zcmMvYXNzZXRzL2pzL21haW4vdmlkZW8vdHlwZXMvVmltZW8udHNcIixcblx0XHRcIlZpbWVvXCJcblx0XSxcblx0XCIuL1ZpbWVvLnRzXCI6IFtcblx0XHRcIi4vc3JjL2Fzc2V0cy9qcy9tYWluL3ZpZGVvL3R5cGVzL1ZpbWVvLnRzXCIsXG5cdFx0XCJWaW1lb1wiXG5cdF0sXG5cdFwiLi9Zb3VUdWJlXCI6IFtcblx0XHRcIi4vc3JjL2Fzc2V0cy9qcy9tYWluL3ZpZGVvL3R5cGVzL1lvdVR1YmUudHNcIixcblx0XHRcIllvdVR1YmVcIlxuXHRdLFxuXHRcIi4vWW91VHViZS50c1wiOiBbXG5cdFx0XCIuL3NyYy9hc3NldHMvanMvbWFpbi92aWRlby90eXBlcy9Zb3VUdWJlLnRzXCIsXG5cdFx0XCJZb3VUdWJlXCJcblx0XVxufTtcbmZ1bmN0aW9uIHdlYnBhY2tBc3luY0NvbnRleHQocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuXHRcdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdFx0dGhyb3cgZTtcblx0XHR9KTtcblx0fVxuXG5cdHZhciBpZHMgPSBtYXBbcmVxXSwgaWQgPSBpZHNbMF07XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoaWRzWzFdKS50aGVuKCgpID0+IHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG5cdH0pO1xufVxud2VicGFja0FzeW5jQ29udGV4dC5rZXlzID0gKCkgPT4gKE9iamVjdC5rZXlzKG1hcCkpO1xud2VicGFja0FzeW5jQ29udGV4dC5pZCA9IFwiLi9zcmMvYXNzZXRzL2pzL21haW4vdmlkZW8vdHlwZXMgbGF6eSByZWN1cnNpdmUgXlxcXFwuXFxcXC8uKiRcIjtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0FzeW5jQ29udGV4dDsiXSwibmFtZXMiOlsiZ2V0QWxsIiwiQWNjb3JkaW9uQ29udHJvbGxlciIsImNvbnN0cnVjdG9yIiwiZWxBY2NvcmRpb24iLCJsZW5ndGgiLCJfbG9hZCIsImVsZW1lbnRzIiwiZGVmYXVsdCIsIkFjY29yZGlvbiIsImZvckVhY2giLCJlbCIsIkNhcm91c2VsQ29udHJvbGxlciIsImNoaWxkRWxlbWVudENvdW50IiwiX2NyZWF0ZUluc3RhbmNlcyIsIkNhcm91c2VsIiwiZWxlbWVudCIsImdldCIsIkNhcnRDb250cm9sbGVyIiwiZWxNaW5pQ2FydCIsImVsQ2FydCIsIl9jYXJ0TG9hZCIsIk1pbmlDYXJ0IiwiQ2FydCIsIkNvbGxlY3Rpb25Db250cm9sbGVyIiwiZWxDb2xsZWN0aW9uIiwiY29uc29sZSIsImxvZyIsIkNvbGxlY3Rpb24iLCJjdXN0b21FbGVtZW50cyIsImRlZmluZSIsIkZlYXR1cmVkUHJvZHVjdHNDb250cm9sbGVyIiwiZWxOYXYiLCJGZWF0dXJlZFByb2R1Y3RzIiwiRm9ybUNvbnRyb2xsZXIiLCJlbEZvcm1zIiwiRm9ybUhhbmRsZXIiLCJmb3JtIiwiYWRkRXZlbnRMaXN0ZW5lciIsImF0dGFjaEV2ZW50IiwidGhyb3R0bGUiLCJIZWFkZXJDb250cm9sbGVyIiwiZWxIZWFkZXIiLCJlbEFubm91bmNlbWVudEJhciIsIl9zZXRIZWFkZXJIZWlnaHRBc0Nzc0N1c3RvbVByb3BlcnR5IiwiX3NldEFubm91bmNlbWVudEJhckhlaWdodEFzQ3NzQ3VzdG9tUHJvcGVydHkiLCJIZWFkZXIiLCJ0aHJvdHRsZWQiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsInN0eWxlIiwic2V0UHJvcGVydHkiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJoZWlnaHQiLCJ3aW5kb3ciLCJNb2RlbENvbnRyb2xsZXIiLCJNb2RlbCIsIk5hdmlnYXRpb25Db250cm9sbGVyIiwiTmF2aWdhdGlvbiIsIlByb2R1Y3RDYXJkQ29udHJvbGxlciIsIlByb2R1Y3RDYXJkIiwiaXRlbSIsIlByb2R1Y3RDb250cm9sbGVyIiwiZWxQcm9kdWN0IiwiUHJvZHVjdCIsInVuZGVmaW5lZCIsIlNob3BMb29rIiwiRWxzIiwidHlwZXNNYXAiLCJIVE1MNSIsInlvdXR1YmUiLCJ2aW1lbyIsIlZpZGVvQ29udHJvbGxlciIsImVsVmlkZW9zIiwidmlkZW9zIiwiZWxWaWRlbyIsInR5cGUiLCJkYXRhc2V0IiwicHVzaCIsInZpZGVvc01hcCIsIk9iamVjdCIsImVudHJpZXMiLCJfY3JlYXRlVmlkZW9zIiwiY2Fyb3VzZWxWaWRlb3MiLCJWaWRlb0luc3RhbmNlIiwiZSIsInZpZGVvU3RhdHVzIiwiZ2V0QXR0cmlidXRlIiwic2xpZGUiLCJjbG9zZXN0IiwiaW5jbHVkZXMiLCJjbGFzc0xpc3QiLCJhZGQiLCJWaWRlbyIsIkZvcm0iLCJpbml0Q2xhc3NlcyIsIkluaXRDbGFzcyIsInNldENzc1Byb3BlcnRpZXMiLCJpbm5lcldpZHRoIiwiY2xpZW50V2lkdGgiLCJpbm5lckhlaWdodCIsInVwZGF0ZVJlc2l6ZSIsIm9uc2Nyb2xsIiwidXBkYXRlUG9zaXRpb24iLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY29udGFpbnMiLCJnZXRFbGVtZW50QnlJZCIsInBvc2l0aW9uIiwidG9wIiwicHJvbW90aW9uIiwicXVlcnlTZWxlY3RvciIsInNldEF0dHJpYnV0ZSIsInNjcmVlbiIsIndpZHRoIiwibW9iaWxlX2J0biIsImxpZmVtb2RhbGJ0biIsInJlbW92ZSIsInNldFRpbWVvdXQiLCJhY2Nlc3NfYnRuIiwidHJpZ2dlckJ0biIsImNsaWNrIiwiZXZlbnQiLCJub2RlIiwibGlzdGVuZXIiLCJvcHRpb25zIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNlbGVjdG9yIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImdldFNpYmxpbmdzIiwibm9kZXMiLCJwYXJlbnRFbGVtZW50IiwiY2hpbGRyZW4iLCJmaWx0ZXIiLCJyZW5kZXJFbGVtZW50IiwicHJvcHMiLCJjb250YWluZXIiLCJpc1RleHRFbGVtZW50IiwiY3JlYXRlVGV4dE5vZGUiLCJjcmVhdGVFbGVtZW50IiwiaXNMaXN0ZW5lciIsInAiLCJzdGFydHNXaXRoIiwiaXNBdHRyaWJ1dGUiLCJrZXlzIiwidG9Mb3dlckNhc2UiLCJzbGljZSIsImNoaWxkRWxlbWVudCIsImFwcGVuZCIsImZuIiwid2FpdCIsImluVGhyb3R0bGUiLCJsYXN0Rm4iLCJsYXN0VGltZSIsImFyZ3MiLCJjb250ZXh0IiwiYXBwbHkiLCJEYXRlIiwibm93IiwiY2xlYXJUaW1lb3V0IiwiTWF0aCIsIm1heCJdLCJzb3VyY2VSb290IjoiIn0=