"use strict";
(self["webpackChunkjuno_shopify_template"] = self["webpackChunkjuno_shopify_template"] || []).push([["product-page"],{

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

/***/ "./src/assets/js/main/product/AddToCart.js":
/*!*************************************************!*\
  !*** ./src/assets/js/main/product/AddToCart.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AddToCart)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/fetch.ts");
/* harmony import */ var _cart_functions_quantity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../cart/functions/quantity */ "./src/assets/js/main/cart/functions/quantity.js");
/* harmony import */ var _cart_functions_submit__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../cart/functions/submit */ "./src/assets/js/main/cart/functions/submit.js");
/* harmony import */ var _cart_functions_itemCount__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cart/functions/itemCount */ "./src/assets/js/main/cart/functions/itemCount.js");
/* harmony import */ var _cart_functions_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../cart/functions/modal */ "./src/assets/js/main/cart/functions/modal.js");
/* harmony import */ var _cart_functions_variant__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../cart/functions/variant */ "./src/assets/js/main/cart/functions/variant.js");







class AddToCart {
  constructor(element) {
    this.fetchNewCart = () => {
      fetch("/cart").then(response => response.text()).then(html => this.renderCart(html)).catch(err => console.warn("Something went wrong.", err));
    };

    this.element = element;
    this.submit = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.get)(".js-product-form-submit", this.element);
    this.cartTrigger = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.get)(".c-mini-cart__trigger", document);
    this.openTrigger = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.get)(".c-mini-cart__trigger", document);
    this.miniCart = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.get)("mini-cart", document);
    this.bindEvents();
  }

  bindEvents() {
    this.element.addEventListener("submit", event => {
      event.preventDefault();
      this.onSubmitHandler();
    });
  }

  onSubmitHandler() {
    this.submit.setAttribute("disabled", true);
    this.submit.innerHTML = "Adding";
    this.submitData();
  }

  submitData() {
    fetch("/cart.js").then(response => response.json()).then(data => {
      //cartCount.innerHTML = data.item_count;
      var pri_product = false;
      var enable_prime = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.get)("#kl-prime-product", document);
      var prime_id = '';

      if (enable_prime) {
        prime_id = enable_prime.getAttribute('data-id');
      }

      if (prime_id != '') {
        data.items.forEach(item => {
          if (item.variant_id == prime_id) {
            pri_product = true;
          }
        });
      }

      const body = JSON.stringify((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, JSON.parse((0,_utils__WEBPACK_IMPORTED_MODULE_2__.serializeForm)(this.element)), {
        sections_url: window.location.pathname
      }));

      if (pri_product == false & prime_id != '') {
        var data = {
          form_type: "product",
          id: prime_id,
          quantity: "1",
          sections_url: "/products/prime-insured-shipping",
          utf8: "✓"
        };
        fetch(`${routes.cart_add_url}`, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, (0,_utils__WEBPACK_IMPORTED_MODULE_2__.fetchConfig)("javascript"), {
          body: JSON.stringify(data)
        })).then(response => response.json()).finally(() => {
          fetch(`${routes.cart_add_url}`, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, (0,_utils__WEBPACK_IMPORTED_MODULE_2__.fetchConfig)("javascript"), {
            body
          })).then(response => response.json()).then(() => this.fetchCart()).catch(e => console.error(e)).finally(() => {
            this.submit.removeAttribute("disabled");
            this.submit.innerHTML = "Added";
            this.initCart();
          });
        });
      } else {
        fetch(`${routes.cart_add_url}`, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, (0,_utils__WEBPACK_IMPORTED_MODULE_2__.fetchConfig)("javascript"), {
          body
        })).then(response => response.json()).then(() => this.fetchCart()).catch(e => console.error(e)).finally(() => {
          this.submit.removeAttribute("disabled");
          this.submit.innerHTML = "Added";
          this.initCart();
        });
      }
    });
  }

  fetchCart() {
    fetch("/cart").then(response => response.text()).then(html => this.renderCart(html)).catch(err => console.warn("Something went wrong.", err));
  }

  renderCart(cart) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(cart, "text/html");
    const cartItems = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.get)(".js-mini-cart", doc);
    this.miniCart.innerHTML = cartItems.innerHTML;
    this.initCart();
    (0,_cart_functions_itemCount__WEBPACK_IMPORTED_MODULE_3__.itemCount)();
  }

  initCart() {
    (0,_cart_functions_modal__WEBPACK_IMPORTED_MODULE_4__.openModal)(this.miniCart, this.openTrigger); // closeModal(this.miniCart);

    new _cart_functions_quantity__WEBPACK_IMPORTED_MODULE_5__.Quantity(this.miniCart, this.fetchNewCart);
    new _cart_functions_submit__WEBPACK_IMPORTED_MODULE_6__.SubmitBtn(this.miniCart, this.fetchNewCart);
    new _cart_functions_variant__WEBPACK_IMPORTED_MODULE_7__.Variant(document.querySelector('.js-mini-cart'), this.fetchNewCart);
    this.cartTrigger.click();
  }

}

/***/ }),

/***/ "./src/assets/js/main/product/Product.js":
/*!***********************************************!*\
  !*** ./src/assets/js/main/product/Product.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Product": () => (/* binding */ Product)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/cookies.ts");
/* harmony import */ var _AddToCart_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./AddToCart.js */ "./src/assets/js/main/product/AddToCart.js");
/* harmony import */ var _functions_quickLinks_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./functions/quickLinks.js */ "./src/assets/js/main/product/functions/quickLinks.js");
/* harmony import */ var _cart_functions_quantity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cart/functions/quantity */ "./src/assets/js/main/cart/functions/quantity.js");
/* harmony import */ var _cart_functions_itemCount__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cart/functions/itemCount */ "./src/assets/js/main/cart/functions/itemCount.js");
/* harmony import */ var _cart_functions_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../cart/functions/modal */ "./src/assets/js/main/cart/functions/modal.js");
/* harmony import */ var _cart_functions_variant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../cart/functions/variant */ "./src/assets/js/main/cart/functions/variant.js");
/* harmony import */ var _cart_functions_submit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../cart/functions/submit */ "./src/assets/js/main/cart/functions/submit.js");










class Product extends HTMLElement {
  constructor() {
    super();

    this.fetchNewCart = () => {
      fetch("/cart").then(response => response.text()).then(html => this.renderCart(html)).catch(err => console.warn("Something went wrong.", err));
    };

    this.element = this;

    if (!this.element.hasChildNodes()) {
      this.element = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('product-component');
    }

    this.product = JSON.parse((0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('#product-info', this.element).innerHTML);
    this.addToCartForm = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-product-form", this.element);
    this.variantDrop = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".c-product-dropdown", this.element);
    this.variantSelects = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)(".js-product-variant", this.element);
    this.quantitySelect = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-product-quantity", this.element);
    this.prices = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)(".js-product-price", this.element);
    this.priceVat = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-product-price-vat", this.element);
    this.returnToSearch = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-back-to-search", this.element);
    this.swatchLabel = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.js-swatch-value', this.element);
    this.accordions = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)('.js-accordion', this.element);
    this.miniCart = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-mini-cart", document);
    this.videomodalBtn = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)('.see-in-action', this.element);
    this.closevideoBtn = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.c-modal-video__close-btn', document);
    this.closevideoBtn1 = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.c-modal-video__close', document);
    this.cartTrigger = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".c-mini-cart__trigger", document);
    this.customizeBtn = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.js-customize-btn', this.element);
    this.submitBtn = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-product-form-submit", this.element);
    this.shipInfoBtn = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.ship_modal_info_icon', this.element);
    this.closeShipBtn = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.c-modal-ship__close-btn', this.element);
    this.giftButtons = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)('.c-product__gift-buttons-item', this.element);
    const checkMobileCTA = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.js-product-mobile-cta');

    if (checkMobileCTA) {} else {
      const footerDiv = document.createElement('div');
      footerDiv.classList.add("js-product-mobile-cta");
      const mobileCTA = document.createElement('button');
      mobileCTA.classList.add("mobile-cta");
      mobileCTA.innerHTML = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.js-product-form-submit').innerHTML;
      footerDiv.appendChild(mobileCTA);
      document.body.appendChild(footerDiv);
      mobileCTA.addEventListener('click', () => {
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.js-product-form-submit').click();
      });
    }

    if (this.variantDrop) {
      this.variantDrop.addEventListener('click', e => {
        e.preventDefault();
        var variantSelect = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.c-product__select', document);

        if (variantSelect.style.display == "none") {
          variantSelect.style.display = "block";
        } else {
          variantSelect.style.display = "none";
        }
      });
    }

    this.customBtn = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('#customize-btn', document);

    if (this.customBtn) {
      this.customBtn.addEventListener('click', e => {
        e.preventDefault();

        if (this.count == 0) {
          let formData = {
            'items': [{
              'id': '41926468599999',
              'quantity': 1,
              'properties': {
                'product_title': this.product.title,
                'product_variant': Number(this.customBtn.getAttribute('data-variant')),
                'font': this.customizeObj.font,
                'letter': this.customizeObj.text
              }
            }, {
              'id': Number(this.customBtn.getAttribute('data-variant')),
              'quantity': 1,
              'properties': {
                'customize_font': this.customizeObj.font,
                'customize_letter': this.customizeObj.text
              }
            }]
          };
          fetch("/cart.js").then(response => response.json()).then(data => {
            //cartCount.innerHTML = data.item_count;
            var pri_product = false;
            var enable_prime = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)("#kl-prime-product", document);
            var prime_id = '';

            if (enable_prime) {
              prime_id = enable_prime.getAttribute('data-id');
            }

            if (prime_id != '') {
              data.items.forEach(item => {
                if (item.variant_id == prime_id) {
                  pri_product = true;
                }
              });
            }

            if (pri_product == false & prime_id != '') {
              formData = {
                'items': [{
                  'id': '41926468599999',
                  'quantity': 1,
                  'properties': {
                    'product_title': this.product.title,
                    'product_variant': Number(this.customBtn.getAttribute('data-variant')),
                    'font': this.customizeObj.font,
                    'letter': this.customizeObj.text
                  }
                }, {
                  'id': Number(this.customBtn.getAttribute('data-variant')),
                  'quantity': 1,
                  'properties': {
                    'customize_font': this.customizeObj.font,
                    'customize_letter': this.customizeObj.text
                  }
                }, {
                  'id': prime_id,
                  'quantity': 1
                }]
              };
              fetch('/cart/add.js', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
              }).then(response => response.json()).then(data => {
                this.count = 0;
                this.fetchCart();
                document.querySelector('.c-modal-customize__close-btn').click();
              }).catch(e => {
                this.count = 0;
              });
            } else {
              fetch('/cart/add.js', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
              }).then(response => response.json()).then(data => {
                this.count = 0;
                this.fetchCart();
                document.querySelector('.c-modal-customize__close-btn').click();
              }).catch(e => {
                this.count = 0;
              });
            }
          });
        }
      });
    }

    if (this.giftButtons) {
      this.giftButtons.forEach(button => {
        button.addEventListener('click', e => {
          if (button.classList.contains('active')) {
            return;
          } else {
            this.giftButtons.forEach(g_button => {
              g_button.classList.remove('active');
            });
            button.classList.add('active');
            let product_handle = button.dataset.handle;
            fetch(`/products/${product_handle}?section_id=main-product`).then(response => response.text()).then(html => {
              const parser = new DOMParser();
              const doc = parser.parseFromString(html, "text/html");
              const productComponent = doc.querySelector('product-component');
              (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('product-component').innerHTML = productComponent.innerHTML;
              new Product();
            }).catch(err => console.warn("Something went wrong.", err));
          }
        });
      });
    }

    this.count = 0;
    this.customizeObj = {
      font: '',
      text: ''
    };
    var image_count = 0;
    this.mainImgs = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)('.product-main-image');
    this.thumbImgs = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)('.product-thumb-image');

    if (this.thumbImgs.length > 0) {
      this.thumbImgs.forEach(item => {
        const pic = item.querySelector('img');

        if (pic) {
          image_count = image_count + 1;
        }
      });
      this.thumbswiper = new Swiper(".mySwiper", {
        slidesPerView: 'auto',
        spaceBetween: 10,
        centeredSlides: true,
        loop: true,
        slideToClickedSlide: true
      });
      this.mainswiper = new Swiper(".mySwiper2", {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1,
        loopedSlides: image_count,
        centeredSlides: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });
      this.thumbswiper.controller.control = this.mainswiper;
      this.mainswiper.controller.control = this.thumbswiper;
    }

    this.bindEvents();
    this.backToSearch();
    this.eventAccordion();
    this.eventVariants();
    this.eventQuantity();
    this.eventCustomize();
    this.eventshipModal();
    this.eventvideoModal();
    this.eventMultiVariants();
    this.variantText();
  }

  variantText() {
    if (this.variantDrop) {
      this.variantSelects.forEach(variant => {
        if (variant.classList.contains('active')) {
          //selectedVariant = variant.getAttribute('data-product-id');
          var data_postion = variant.getAttribute('data-position');

          if (data_postion == 1) {
            if (variant.getAttribute('data-text').includes(".00")) {
              (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.c-product__selected', this.element).innerHTML = variant.getAttribute('data-text');
            }
          }

          if (data_postion != 1) {
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.c-product__selected', this.element).innerHTML = variant.getAttribute('data-text');
          }
        }
      });
    }
  }

  eventvideoModal() {
    if (this.videomodalBtn.length > 0) {
      this.videoModalContent = document.querySelector('.c-modal-video');
      this.videomodalBtn.forEach(button => {
        button.addEventListener('click', e => {
          e.preventDefault();
          this.videoModalContent.classList.add('active');
          this.videoiframe = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)("iframe", this.videoModalContent);
          this.videoiframe.src += "&autoplay=1&mute=1";
        });
      });
      this.closevideoBtn.addEventListener('click', e => {
        e.preventDefault();
        this.videoModalContent.classList.remove('active');
        this.videoiframe = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)("iframe", this.videoModalContent);
        var iframeSrc = this.videoiframe.src;
        this.videoiframe.src = iframeSrc;
        this.videoiframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
      });
      this.closevideoBtn1.addEventListener('click', e => {
        e.preventDefault();
        this.videoModalContent.classList.remove('active');
        this.videoiframe = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)("iframe", this.videoModalContent);
        var iframeSrc = this.videoiframe.src;
        this.videoiframe.src = iframeSrc;
        this.videoiframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
      });
    }
  }

  eventCustomize() {
    if (this.customizeBtn) {
      this.customizeModal = document.querySelector('.js-customize-modal');
      this.closeBtns = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)('.js-customize-close', this.customizeModal);
      this.customizeBtn.addEventListener('click', e => {
        e.preventDefault();
        this.customizeModal.classList.add('active');
        this.renderStepHtml();
        this.eventSteps();
        this.step2.classList.add('active');
        this.count = 0;
        const sticybutton = document.querySelector('.js-product-mobile-cta');

        if (sticybutton) {
          sticybutton.style.display = "none";
        }
      });
    }
  }

  eventshipModal() {
    if (this.shipInfoBtn) {
      this.shipInfoModal = document.querySelector('.c-modal-ship');
      this.shipInfoBtn.addEventListener('click', e => {
        e.preventDefault();
        this.shipInfoModal.classList.add('active');
      });
      this.shipInfoBtn.addEventListener('mouseover', e => {
        e.preventDefault();
        this.shipInfoModal.classList.add('show');
      });
      this.shipInfoBtn.addEventListener('mouseout', e => {
        e.preventDefault();
        this.shipInfoModal.classList.remove('show');
      });
    }

    if (this.closeShipBtn) {
      this.shipInfoModal = document.querySelector('.c-modal-ship');
      this.closeShipBtn.addEventListener('click', e => {
        e.preventDefault();
        this.shipInfoModal.classList.remove('active');
      });
    }
  }

  renderStepHtml() {
    let selectedVariant = null;
    this.variantSelects.forEach(variant => {
      if (variant.classList.contains('active')) {
        selectedVariant = variant.getAttribute('data-product-id');
      }
    });
    const variantInput = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.c-product__variantId', this.addToCartForm);
    selectedVariant = variantInput.value;
    var product_title = this.product.title;
    var prodict_price = this.product.price + engraving_price;
    this.product.variants.forEach(p_variant => {
      if (p_variant.id == selectedVariant) {
        prodict_price = p_variant.price + engraving_price;
      }
    });
    document.querySelector('.customize_title').innerHTML = product_title;
    document.querySelector('.customize_price').innerHTML = `${this.formatPrice(prodict_price)}`;
    document.querySelector('.mobile_customize_title').innerHTML = product_title;
    document.querySelector('.mobile_customize_price').innerHTML = `${this.formatPrice(prodict_price)}`;
    var option_color = null;
    var custom_color = null;
    var product_options = document.querySelectorAll('.c-product__swatch-item.c-product-card__option');

    if (product_options) {
      product_options.forEach(product_option => {
        if (product_option.classList.contains('active')) {
          option_color = product_option.getAttribute('data-text');
        }
      });
    }

    if (selectedVariant == null) {
      selectedVariant = this.product.variants[0].id.toString();
    }

    let customizeImg = this.product.featured_image;

    if (option_color != null) {
      var custom_alt = option_color + " Custom";
      custom_color = option_color.replace(" ", "-").toLowerCase();
      this.product.media.forEach(media => {
        if (media.alt == custom_alt) {
          customizeImg = media.src;
          return false;
        }
      });
    }

    if (customizeImg != '') {
      const html = `
                <img src="${customizeImg}"/>

                <div class="customize-text" custom-color="${custom_color}">
                <div class="customize-content"></div>
                </div>
            `;
      const content = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.js-step-img', document);
      const checkoutBtn = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('#customize-btn', document);
      checkoutBtn.setAttribute('data-variant', selectedVariant);
      content.innerHTML = html;
    }
  }

  eventSteps() {
    this.step2 = document.querySelector('.c-modal-customize__step2');
    var fontItems = document.querySelectorAll('.fonts-content .item');
    var customizeInput = document.querySelector('#customize-input');
    var step2Btn = document.querySelector('#customize-btn');
    step2Btn.classList.add("disabled");
    var fontDrop1 = document.querySelector('.custom_font_section');
    fontDrop1.addEventListener('click', e => {
      const fontContent = document.querySelector('.fonts');

      if (fontContent.style.display == "none") {
        fontContent.style.display = "block";
      } else {
        fontContent.style.display = "none";
      }
    });
    var fontDrop2 = document.querySelector('.custom_dropdown');
    fontDrop2.addEventListener('click', e => {
      const fontContent = document.querySelector('.fonts');

      if (fontContent.style.display == "none") {
        fontContent.style.display = "block";
      } else {
        fontContent.style.display = "none";
      }
    });
    this.closeBtns.forEach(button => {
      button.addEventListener('click', e => {
        this.customizeModal.classList.remove('active');
        this.step2.classList.remove('active');

        if (screen.width < 786) {
          const sticybutton = document.querySelector('.js-product-mobile-cta');

          if (sticybutton) {
            sticybutton.style.display = "block";
          }
        }
      });
    });

    if (customizeInput) {
      customizeInput.value = "";
      customizeInput.addEventListener('input', e => {
        e.preventDefault();
        const value = e.target.value;
        var MAX_WIDTH = 160;
        var MAX_FONT_SIZE = 23;
        var MIN_FONT_SIZE = 11;
        var font_object = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.product-font-size', document);

        if (font_object) {
          var prd_de_max_size = font_object.getAttribute("data-desktop-max");
          var prd_de_min_size = font_object.getAttribute("data-desktop-min");
          var prd_mb_max_size = font_object.getAttribute("data-mobile-max");
          var prd_mb_min_size = font_object.getAttribute("data-mobile-min");
          var desk_max_width = font_object.getAttribute("desktop-max-width");
          var mb_max_width = font_object.getAttribute("mobile-max-width");
        }

        const el = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.customize-text', document);
        ;
        const customizeText = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.customize-content', document);

        if (screen.width > 768) {
          if (prd_de_max_size != '') {
            MAX_FONT_SIZE = parseInt(prd_de_max_size);
          }

          if (prd_de_min_size != '') {
            MIN_FONT_SIZE = parseInt(prd_de_min_size);
          }

          if (desk_max_width != '') {
            MAX_WIDTH = parseInt(desk_max_width);
          }
        } else {
          MAX_WIDTH = 110;
          var MAX_FONT_SIZE = 15;
          var MIN_FONT_SIZE = 7;

          if (prd_mb_max_size != '') {
            MAX_FONT_SIZE = parseInt(prd_mb_max_size);
          }

          if (prd_mb_min_size != '') {
            MIN_FONT_SIZE = parseInt(prd_mb_min_size);
          }

          if (mb_max_width != '') {
            MAX_WIDTH = parseInt(mb_max_width);
          }
        }

        el.style.width = MAX_WIDTH + 'px';
        let fontSize = MAX_FONT_SIZE;
        customizeText.style.fontSize = fontSize + 'px';

        while (fontSize > MIN_FONT_SIZE && customizeText.scrollWidth + 10 > MAX_WIDTH) {
          fontSize--;
          customizeText.style.fontSize = fontSize + 'px';
        }

        var numChars = value.length;
        customizeText.innerHTML = value;

        if (this.isCheckoutBtn()) {
          step2Btn.classList.remove('disabled');
        } else {
          step2Btn.classList.add('disabled');
        }
      });
    }

    fontItems.forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault();
        fontItems.forEach(rmItem => {
          rmItem.classList.remove('active');
        });
        item.classList.add('active');

        if (!this.isCheckoutBtn()) {
          step2Btn.classList.add('disabled');
        } else {
          step2Btn.classList.remove('disabled');
        }

        const customizeText = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.customize-text', document);
        const previewFont = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.preview_font span', document);

        if (customizeText && item && item.getAttribute('data-font')) {
          customizeText.classList.remove('font-como');
          customizeText.classList.remove('font-montserrat');
          customizeText.classList.remove('font-petit');
          previewFont.classList.remove('font-como');
          previewFont.classList.remove('font-montserrat');
          previewFont.classList.remove('font-petit');

          switch (item.getAttribute('data-font')) {
            case 'Cormorant Garamond':
              customizeText.classList.add('font-como');
              previewFont.innerHTML = '&nbsp;Cormorant Garamond';
              previewFont.classList.add('font-como');
              break;

            case 'Montserrat':
              customizeText.classList.add('font-montserrat');
              previewFont.innerHTML = '&nbsp;Montserrat';
              previewFont.classList.add('font-montserrat');
              break;

            case 'Petit Formal Script':
              customizeText.classList.add('font-petit');
              previewFont.innerHTML = '&nbsp;Petit Formal Script';
              previewFont.classList.add('font-petit');
              break;

            default:
              break;
          }
        }

        document.querySelector('.fonts').style.display = "none";
      });
    });
  }

  fetchCart() {
    fetch("/cart").then(response => response.text()).then(html => this.renderCart(html)).catch(err => console.warn("Something went wrong.", err));
  }

  renderCart(cart) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(cart, "text/html");
    const cartItems = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-mini-cart", doc);
    this.miniCart.innerHTML = cartItems.innerHTML;
    this.initCart();
    (0,_cart_functions_itemCount__WEBPACK_IMPORTED_MODULE_1__.itemCount)();
  }

  initCart() {
    (0,_cart_functions_modal__WEBPACK_IMPORTED_MODULE_2__.openModal)(this.miniCart, this.openTrigger);
    (0,_cart_functions_modal__WEBPACK_IMPORTED_MODULE_2__.closeModal)(this.miniCart);
    new _cart_functions_quantity__WEBPACK_IMPORTED_MODULE_3__.Quantity(this.miniCart, this.fetchNewCart);
    new _cart_functions_variant__WEBPACK_IMPORTED_MODULE_4__.Variant(document.querySelector('.js-mini-cart'), this.fetchNewCart);
    new _cart_functions_submit__WEBPACK_IMPORTED_MODULE_5__.SubmitBtn(document.querySelector('.js-mini-cart'), this.fetchCart);
    this.cartTrigger.click();
  }

  isCheckoutBtn() {
    let result = false;
    const fontItems = document.querySelectorAll('.fonts-content .item');
    const customizeInput = document.querySelector('#customize-input');
    this.customizeObj.text = customizeInput.value;
    fontItems.forEach(item => {
      if (item.classList.contains('active')) {
        this.customizeObj.font = item.getAttribute('data-font');
      }
    });

    if (this.customizeObj.text != '' && this.customizeObj.font != '') {
      return true;
    }

    return result;
  }

  eventQuantity() {
    if (this.quantitySelect) {
      const plusBtn = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.js-qty-plus', this.quantitySelect);
      const minusBtn = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.js-qty-minus', this.quantitySelect);
      const input = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.js-qty-value', this.quantitySelect);
      let inputValue = input.value;
      plusBtn.addEventListener('click', e => {
        e.preventDefault();
        inputValue++;
        input.value = inputValue;
      });
      minusBtn.addEventListener('click', e => {
        e.preventDefault();

        if (inputValue > 1) {
          inputValue--;
          input.value = inputValue;
        }
      });
    }
  }

  eventMultiVariants() {}

  eventVariants() {
    this.variantSelects.forEach(select => {
      select.addEventListener('click', e => {
        const option_pos = select.getAttribute('data-position');
        this.variantSelects.forEach(rmItem => {
          const rmPos = rmItem.getAttribute('data-position');
          if (option_pos == rmPos) rmItem.classList.remove('active');
        });
        select.classList.add('active');

        if (option_pos == '1') {
          if (this.swatchLabel) {
            this.swatchLabel.innerHTML = `Color: ${select.getAttribute('data-text')}`;
          } else {
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.c-product__selected', this.element).innerHTML = select.getAttribute('data-text');
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.c-product__select', this.element).style.display = "none";
          }

          this.renderImages(false);
        } else {
          if (select.parentElement.classList.contains('c-product__select-field-hybrid')) {} else {
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.c-product__selected', this.element).innerHTML = select.getAttribute('data-text');
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.c-product__select', this.element).style.display = "none";
          }
        }

        this.appendText();
      });
    });
  }

  appendText() {
    let obj = [];
    this.variantSelects.forEach(variant => {
      if (variant.classList.contains('active')) {
        const item = variant.getAttribute('data-text');
        obj.push(item);
      }
    });
    let result = '';
    obj.forEach((item, index) => {
      if (index == obj.length - 1) {
        result += item;
      } else {
        result += `${item} / `;
      }
    });
    result = result.replace(/\r?\n|\r/g, "");
    this.product.variants.forEach(variant => {
      if (variant.title == result) {
        const variantId = variant.id;
        const variantInput = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.c-product__variantId', this.addToCartForm);
        variantInput.value = variantId;
        this.updateProductPrice(variantId);
        const variantUrl = `?variant=${variantId}`;
        this.updateWindowLocationSearch(variantUrl);
      }
    });
  }

  updateWindowLocationSearch(choices) {
    let url = window.location.href.replace(window.location.search, `?${choices}`);

    if (window.location.search === '') {
      url = window.location.href.replace(window.location.href, `${window.location.href}?${choices}`);
    }

    if (!url.includes('&')) {
      url = url.replace('?', '');
    }

    window.history.pushState({}, '', url);
  }

  updateProductPrice(id) {
    this.product.variants.forEach(variant => {
      if (variant.id == id) {
        if (this.customizeBtn) {
          if (variant.available) {
            this.customizeBtn.style.display = 'flex';
          } else {
            this.customizeBtn.style.display = 'none';
          }
        }

        if (this.submitBtn) {
          if (variant.available) {
            this.submitBtn.disabled = false;
            this.submitBtn.innerHTML = 'Add to Cart';
          } else {
            this.submitBtn.disabled = true;
            this.submitBtn.innerHTML = "Sold Out";
          }
        }

        let html = '';

        if (variant.compare_at_price == null) {
          html = `
                        <p class="c-price">
                            ${this.formatPrice(variant.price)}
                        </p>
                    `;
        } else {
          html = `
                        <p class="c-price">
                            <s class="c-price__compare">
                                ${this.formatPrice(variant.compare_at_price)}
                            </s>

                            ${this.formatPrice(variant.price)}
                        </p>
                    `;
        }

        const priceElement = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.c-product__price', this.element);
        priceElement.innerHTML = html;

        if (variant.option2 === 'Gift Bundle') {
          this.renderImages(true);

          if (variant.title.includes('/')) {
            const optionLabel = variant.title;
            let gallery = document.querySelector('.swiper.mySwiper2');
            const mainImage = gallery.querySelector(`img[alt="${optionLabel}"]`);

            if (mainImage) {
              const mainSlider = mainImage.closest('.product-main-image');

              if (mainSlider) {
                const sliderIndex = Number(mainSlider.dataset.swiperSlideIndex);
                this.mainswiper.slideTo(sliderIndex);
              }
            } else {
              this.mainswiper.slideTo(0);
            }
          }
        } else {
          if (variant.option2 === 'Wallet') {
            this.renderImages(false);
          }
        }
      }
    });
  }

  eventAccordion() {
    this.accordions.forEach(accordion => {
      const header = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.js-accordion-trigger', accordion);
      const content = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.js-accordion-content', accordion);
      header.addEventListener('click', e => {
        if (header.classList.contains('active')) {
          header.classList.remove('active');
          content.classList.remove('active');
        } else {
          header.classList.add('active');
          content.classList.add('active');
        }
      });
    });
  }

  bindEvents() {
    new _AddToCart_js__WEBPACK_IMPORTED_MODULE_6__["default"](this.addToCartForm);
    new _functions_quickLinks_js__WEBPACK_IMPORTED_MODULE_7__["default"](this.element);

    if (this.variantSelect) {
      this.variantSelect.addEventListener("change", () => {
        this.updatePrice();
      });
    }

    if (this.quantitySelect) {
      this.quantitySelect.addEventListener("change", () => {
        this.updatePrice();
      });
    }

    this.renderImages(false);
  }

  renderImages(isGiftBundle) {
    let variantId = this.product.variants[0].id;
    let option1 = this.product.variants[0].option1;
    let option2 = this.product.variants[0].option2;
    this.variantSelects.forEach(select => {
      if (select.classList.contains('active') && select.getAttribute('data-position') == '1') {
        variantId = select.getAttribute('data-product-id');
      }
    });
    this.product.variants.forEach(variant => {
      if (variantId == variant.id) {
        option1 = variant.option1;
        option2 = variant.option2;
      }
    });

    if (this.product.variants.length > 1 && option1 != null) {
      if (this.thumbImgs.length > 0) {
        this.mainImgs.forEach(item => {
          item.classList.remove('hidden');
          item.classList.remove('non-swiper-slide');
          item.classList.add('swiper-slide');
        });
        this.thumbImgs.forEach(item => {
          item.classList.remove('hidden');
          item.classList.remove('non-swiper-slide');
          item.classList.add('swiper-slide');
        });
        let activeIdx = -1;
        this.mainImgs.forEach((item, index) => {
          const pic = item.querySelector('img');

          if (pic) {
            const alt = pic.getAttribute('alt');

            if (isGiftBundle) {
              if (!alt.includes(option1)) {
                item.classList.add('hidden');
                item.classList.add('non-swiper-slide');
                item.classList.remove('swiper-slide');
              } else if (alt == option1 && activeIdx == -1) {
                activeIdx = index;
              }
            } else {
              if (alt != option1) {
                item.classList.add('hidden');
                item.classList.add('non-swiper-slide');
                item.classList.remove('swiper-slide');
              } else if (alt == option1 && activeIdx == -1) {
                activeIdx = index;
              }
            }
          }
        });
        var activeThumbidx = 0;
        var count = 0;
        this.thumbImgs.forEach(item => {
          const pic = item.querySelector('img');

          if (pic) {
            const alt = pic.getAttribute('alt');

            if (isGiftBundle) {
              if (!alt.includes(option1)) {
                item.classList.add('hidden');
                item.classList.add('non-swiper-slide');
                item.classList.remove('swiper-slide');
              } else {
                count = count + 1;

                if (activeThumbidx == 0) {
                  activeThumbidx = 1;
                }
              }
            } else {
              if (alt != option1) {
                item.classList.add('hidden');
                item.classList.add('non-swiper-slide');
                item.classList.remove('swiper-slide');
              } else {
                count = count + 1;

                if (activeThumbidx == 0) {
                  activeThumbidx = 1;
                }
              }
            }
          }
        });
        this.thumbswiper.destroy();
        this.mainswiper.destroy();
        this.thumbswiper = new Swiper(".mySwiper", {
          slidesPerView: 'auto',
          spaceBetween: 10,
          centeredSlides: true,
          loop: true,
          slideToClickedSlide: true
        });
        this.mainswiper = new Swiper(".mySwiper2", {
          spaceBetween: 10,
          loop: true,
          slidesPerView: 1,
          loopedSlides: count,
          centeredSlides: true,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }
        });
        this.thumbswiper.controller.control = this.mainswiper;
        this.mainswiper.controller.control = this.thumbswiper;
      }
    }
  }

  updatePrice() {
    const variantSelected = this.variantSelect.options[this.variantSelect.selectedIndex];
    const qtySelected = this.quantitySelect.options[this.quantitySelect.selectedIndex];
    const variantPrice = variantSelected.dataset.price;
    const qtyPrice = qtySelected.value;
    const totalPrice = variantPrice * qtyPrice;
    const vatPrice = totalPrice * theme.tax;
    this.prices.forEach(price => {
      price.innerHTML = this.formatPrice(totalPrice);
    });
    this.priceVat.innerHTML = this.formatPrice(vatPrice);
  }

  formatPrice(price) {
    const total = Intl.NumberFormat(Shopify.locale, {
      style: "currency",
      currency: Shopify.currency.active,
      useGrouping: true,
      minimumFractionDigits: 0
    }).format(price / 100);
    return total;
  }

  backToSearch() {
    const searchCookie = (0,_utils__WEBPACK_IMPORTED_MODULE_8__.getCookie)("js-search-cookie");
    if (!searchCookie) return;
    this.returnToSearch.classList.remove("is-hidden");
    this.returnToSearch.href = searchCookie;
    this.returnToSearch.addEventListener("click", () => {
      this.removeCookie();
    });
  }

  removeCookie() {
    (0,_utils__WEBPACK_IMPORTED_MODULE_8__.setCookie)("js-search-cookie", "", 28);
  }

}



/***/ }),

/***/ "./src/assets/js/main/product/functions/quickLinks.js":
/*!************************************************************!*\
  !*** ./src/assets/js/main/product/functions/quickLinks.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ QuickLinks)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/smooth-scroll.ts");

class QuickLinks {
  constructor(element) {
    this.element = element;
    this.quickLinks = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)(".js-quick-link", this.element);
    this.header = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-header", document);
    this.headerHeight = this.header.offsetHeight;
    this.bindEvents();
  }

  bindEvents() {
    this.handleClick();
  }

  handleClick() {
    this.quickLinks.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const offset = this.header.classList.contains("is-hidden") ? 30 : this.headerHeight;
        const duration = 500;
        const {
          id
        } = link.dataset;
        const element = document.querySelector(id); // console.log('data = ', document.querySelectorAll('id-features'));

        if (element) {
          (0,_utils__WEBPACK_IMPORTED_MODULE_1__.smoothScroll)(element, duration, offset);
        }
      });
    });
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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFVBQVUsR0FBR0ksUUFBYixHQUF3QkYsV0FBeEIsR0FBc0NGLFVBQVUsR0FBR0UsV0FBbkQsR0FBaUVFLFFBTC9FO0VBQUEsTUFNSUksSUFBSSxHQUFHRCxPQUFPLEdBQUdKLFNBTnJCO0VBQUEsTUFPSU0sTUFBTSxHQUFJQyxDQUFELElBQVFBLENBQUMsR0FBRyxHQUFKLEdBQVUsSUFBSUEsQ0FBSixHQUFRQSxDQUFSLEdBQVlBLENBQXRCLEdBQTBCLENBQUNBLENBQUMsR0FBRyxDQUFMLEtBQVcsSUFBSUEsQ0FBSixHQUFRLENBQW5CLEtBQXlCLElBQUlBLENBQUosR0FBUSxDQUFqQyxJQUFzQyxDQVByRjs7RUFRQSxJQUFJQyxLQUFKO0VBRUEsSUFBSSxDQUFDSCxJQUFMLEVBQVc7RUFFWDdSLE1BQU0sQ0FBQ2lTLHFCQUFQLENBQTZCLFNBQVNDLElBQVQsQ0FBY0MsU0FBZCxFQUF5QjtJQUNsRCxJQUFJLENBQUNILEtBQUwsRUFBWUEsS0FBSyxHQUFHRyxTQUFSO0lBRVosTUFBTUMsSUFBSSxHQUFHRCxTQUFTLEdBQUdILEtBQXpCO0lBQ0EsSUFBSUssT0FBTyxHQUFHQyxJQUFJLENBQUNDLEdBQUwsQ0FBU0gsSUFBSSxHQUFHbEIsR0FBaEIsRUFBcUIsQ0FBckIsQ0FBZDtJQUVBbUIsT0FBTyxHQUFHUCxNQUFNLENBQUNPLE9BQUQsQ0FBaEI7SUFFQSxNQUFNRyxHQUFHLEdBQUdoQixTQUFTLEdBQUdLLElBQUksR0FBR1EsT0FBbkIsR0FBNkJwRCxNQUF6QztJQUVBalAsTUFBTSxDQUFDeVMsUUFBUCxDQUFnQixDQUFoQixFQUFtQkQsR0FBbkI7SUFFQSxJQUFJSixJQUFJLEdBQUdsQixHQUFYLEVBQWdCbFIsTUFBTSxDQUFDaVMscUJBQVAsQ0FBNkJDLElBQTdCO0VBQ25CLENBYkQ7QUFjSCIsInNvdXJjZXMiOlsid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvbWFpbi9jYXJ0L2Z1bmN0aW9ucy9pdGVtQ291bnQuanMiLCJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vc3JjL2Fzc2V0cy9qcy9tYWluL2NhcnQvZnVuY3Rpb25zL21vZGFsLmpzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvbWFpbi9wcm9kdWN0L0FkZFRvQ2FydC5qcyIsIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL21haW4vcHJvZHVjdC9Qcm9kdWN0LmpzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvbWFpbi9wcm9kdWN0L2Z1bmN0aW9ucy9xdWlja0xpbmtzLmpzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvdXRpbHMvYm9keS1zY3JvbGwtbG9jay50cyIsIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL3V0aWxzL2Nvb2tpZXMudHMiLCJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vc3JjL2Fzc2V0cy9qcy91dGlscy9zbW9vdGgtc2Nyb2xsLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldCB9IGZyb20gXCJAL3V0aWxzXCI7XHJcblxyXG5jb25zdCBpdGVtQ291bnQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBjYXJ0Q291bnQgPSBnZXQoXCIuanMtbWluaWNhcnQtY291bnRcIiwgZG9jdW1lbnQpO1xyXG4gICAgZmV0Y2goXCIvY2FydC5qc1wiKVxyXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGNhcnRDb3VudC5pbm5lckhUTUwgPSBkYXRhLml0ZW1fY291bnQ7XHJcbiAgICAgICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgeyBpdGVtQ291bnQgfTtcclxuIiwiaW1wb3J0IHsgZ2V0LCBib2R5U2Nyb2xsTG9jayB9IGZyb20gXCJAL3V0aWxzXCI7XHJcblxyXG5jb25zdCBvcGVuTW9kYWwgPSAoZWxlbWVudCwgb3BlblRyaWdnZXIpID0+IHtcclxuICAgIGlmIChvcGVuVHJpZ2dlcikge1xyXG4gICAgICAgIG9wZW5UcmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaXMtYWN0aXZlXCIpO1xyXG4gICAgICAgIH0pOyAgICBcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgY2xvc2VNb2RhbCA9IChlbGVtZW50KSA9PiB7XHJcbiAgICBjb25zdCBjbG9zZVRyaWdnZXIgPSBnZXQoXCIubW9kYWxfY2xvc2VcIiwgZWxlbWVudCk7XHJcbiAgICBpZiAoY2xvc2VUcmlnZ2VyKSB7XHJcbiAgICAgICAgY2xvc2VUcmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtYWN0aXZlXCIpO3RoaXMub3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy1tb2RlbF9fb3ZlcmxheScpLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICBib2R5U2Nyb2xsTG9jay5yZWxlYXNlKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGVmYXVsdCBtb2RhbCBoZXJlXCIpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jykuc3R5bGUub3ZlcmZsb3dZPVwiYXV0b1wiO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge29wZW5Nb2RhbCwgIGNsb3NlTW9kYWx9IiwiaW1wb3J0IHsgZ2V0LCBzZXJpYWxpemVGb3JtLCBmZXRjaENvbmZpZyB9IGZyb20gXCJAL3V0aWxzXCI7XHJcbmltcG9ydCB7IFF1YW50aXR5IH0gZnJvbSBcIi4uL2NhcnQvZnVuY3Rpb25zL3F1YW50aXR5XCI7XHJcbmltcG9ydCB7IFN1Ym1pdEJ0biB9IGZyb20gXCIuLi9jYXJ0L2Z1bmN0aW9ucy9zdWJtaXRcIjtcclxuaW1wb3J0IHsgaXRlbUNvdW50IH0gZnJvbSBcIi4uL2NhcnQvZnVuY3Rpb25zL2l0ZW1Db3VudFwiO1xyXG5pbXBvcnQgeyBvcGVuTW9kYWwsIGNsb3NlTW9kYWwgfSBmcm9tIFwiLi4vY2FydC9mdW5jdGlvbnMvbW9kYWxcIjtcclxuaW1wb3J0IHsgVmFyaWFudCB9IGZyb20gXCIuLi9jYXJ0L2Z1bmN0aW9ucy92YXJpYW50XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZGRUb0NhcnQge1xyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5zdWJtaXQgPSBnZXQoXCIuanMtcHJvZHVjdC1mb3JtLXN1Ym1pdFwiLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMuY2FydFRyaWdnZXIgPSBnZXQoXCIuYy1taW5pLWNhcnRfX3RyaWdnZXJcIiwgZG9jdW1lbnQpO1xyXG4gICAgICAgIHRoaXMub3BlblRyaWdnZXIgPSBnZXQoXCIuYy1taW5pLWNhcnRfX3RyaWdnZXJcIiwgZG9jdW1lbnQpO1xyXG4gICAgICAgIHRoaXMubWluaUNhcnQgPSBnZXQoXCJtaW5pLWNhcnRcIiwgZG9jdW1lbnQpO1xyXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRFdmVudHMoKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHRoaXMub25TdWJtaXRIYW5kbGVyKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TdWJtaXRIYW5kbGVyKCkge1xyXG4gICAgICAgIHRoaXMuc3VibWl0LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuc3VibWl0LmlubmVySFRNTCA9IFwiQWRkaW5nXCI7XHJcbiAgICAgICAgdGhpcy5zdWJtaXREYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3VibWl0RGF0YSgpIHtcclxuICAgICAgICBmZXRjaChcIi9jYXJ0LmpzXCIpXHJcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgLy9jYXJ0Q291bnQuaW5uZXJIVE1MID0gZGF0YS5pdGVtX2NvdW50O1xyXG4gICAgICAgICAgICB2YXIgcHJpX3Byb2R1Y3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIGVuYWJsZV9wcmltZSA9IGdldChcIiNrbC1wcmltZS1wcm9kdWN0XCIsIGRvY3VtZW50KTtcclxuICAgICAgICAgICAgdmFyIHByaW1lX2lkID0gJyc7XHJcbiAgICAgICAgICAgIGlmIChlbmFibGVfcHJpbWUgKXtcclxuICAgICAgICAgICAgICAgIHByaW1lX2lkID0gZW5hYmxlX3ByaW1lLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcmltZV9pZCAhPSAnJykge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaXRlbS52YXJpYW50X2lkID09IHByaW1lX2lkICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaV9wcm9kdWN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgIC4uLkpTT04ucGFyc2Uoc2VyaWFsaXplRm9ybSh0aGlzLmVsZW1lbnQpKSxcclxuICAgICAgICAgICAgICAgIHNlY3Rpb25zX3VybDogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmKHByaV9wcm9kdWN0ID09ICBmYWxzZSAmIHByaW1lX2lkICE9JycgKXtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge2Zvcm1fdHlwZTogXCJwcm9kdWN0XCIsXHJcbiAgICAgICAgICAgICAgICBpZDogcHJpbWVfaWQsXHJcbiAgICAgICAgICAgICAgICBxdWFudGl0eTogXCIxXCIsXHJcbiAgICAgICAgICAgICAgICBzZWN0aW9uc191cmw6IFwiL3Byb2R1Y3RzL3ByaW1lLWluc3VyZWQtc2hpcHBpbmdcIixcclxuICAgICAgICAgICAgICAgIHV0Zjg6IFwi4pyTXCJ9O1xyXG4gICAgICAgICAgICAgICAgZmV0Y2goYCR7cm91dGVzLmNhcnRfYWRkX3VybH1gLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4uZmV0Y2hDb25maWcoXCJqYXZhc2NyaXB0XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpXHJcbiAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZldGNoKGAke3JvdXRlcy5jYXJ0X2FkZF91cmx9YCwgeyAuLi5mZXRjaENvbmZpZyhcImphdmFzY3JpcHRcIiksIGJvZHkgfSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLmZldGNoQ2FydCgpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4gY29uc29sZS5lcnJvcihlKSlcclxuICAgICAgICAgICAgICAgICAgICAuZmluYWxseSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VibWl0LnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdC5pbm5lckhUTUwgPSBcIkFkZGVkXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdENhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBmZXRjaChgJHtyb3V0ZXMuY2FydF9hZGRfdXJsfWAsIHsgLi4uZmV0Y2hDb25maWcoXCJqYXZhc2NyaXB0XCIpLCBib2R5IH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuZmV0Y2hDYXJ0KCkpXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IGNvbnNvbGUuZXJyb3IoZSkpXHJcbiAgICAgICAgICAgICAgICAuZmluYWxseSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJtaXQucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJtaXQuaW5uZXJIVE1MID0gXCJBZGRlZFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdENhcnQoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGZldGNoQ2FydCgpIHtcclxuICAgICAgICBmZXRjaChcIi9jYXJ0XCIpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UudGV4dCgpKVxyXG4gICAgICAgICAgICAudGhlbigoaHRtbCkgPT4gdGhpcy5yZW5kZXJDYXJ0KGh0bWwpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS53YXJuKFwiU29tZXRoaW5nIHdlbnQgd3JvbmcuXCIsIGVycikpO1xyXG4gICAgfVxyXG5cclxuICAgIGZldGNoTmV3Q2FydCA9ICgpID0+IHtcclxuICAgICAgICBmZXRjaChcIi9jYXJ0XCIpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UudGV4dCgpKVxyXG4gICAgICAgICAgICAudGhlbigoaHRtbCkgPT4gdGhpcy5yZW5kZXJDYXJ0KGh0bWwpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS53YXJuKFwiU29tZXRoaW5nIHdlbnQgd3JvbmcuXCIsIGVycikpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXJDYXJ0KGNhcnQpIHtcclxuICAgICAgICBjb25zdCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XHJcbiAgICAgICAgY29uc3QgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhjYXJ0LCBcInRleHQvaHRtbFwiKTtcclxuICAgICAgICBjb25zdCBjYXJ0SXRlbXMgPSBnZXQoXCIuanMtbWluaS1jYXJ0XCIsIGRvYyk7XHJcblxyXG4gICAgICAgIHRoaXMubWluaUNhcnQuaW5uZXJIVE1MID0gY2FydEl0ZW1zLmlubmVySFRNTDtcclxuICAgICAgICB0aGlzLmluaXRDYXJ0KCk7XHJcblxyXG4gICAgICAgIGl0ZW1Db3VudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRDYXJ0KCkge1xyXG4gICAgICAgIG9wZW5Nb2RhbCh0aGlzLm1pbmlDYXJ0LCB0aGlzLm9wZW5UcmlnZ2VyKTtcclxuICAgICAgIC8vIGNsb3NlTW9kYWwodGhpcy5taW5pQ2FydCk7XHJcbiAgICAgICAgbmV3IFF1YW50aXR5KHRoaXMubWluaUNhcnQsIHRoaXMuZmV0Y2hOZXdDYXJ0KTtcclxuICAgICAgICBuZXcgU3VibWl0QnRuKHRoaXMubWluaUNhcnQsIHRoaXMuZmV0Y2hOZXdDYXJ0KTtcclxuICAgICAgICBuZXcgVmFyaWFudChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbWluaS1jYXJ0JyksIHRoaXMuZmV0Y2hOZXdDYXJ0KTtcclxuICAgICAgICB0aGlzLmNhcnRUcmlnZ2VyLmNsaWNrKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgZ2V0LCBnZXRBbGwsIHNldENvb2tpZSwgZ2V0Q29va2llIH0gZnJvbSBcIkAvdXRpbHNcIjtcclxuaW1wb3J0IEFkZFRvQ2FydCBmcm9tIFwiLi9BZGRUb0NhcnQuanNcIjtcclxuaW1wb3J0IFF1aWNrTGlua3MgZnJvbSBcIi4vZnVuY3Rpb25zL3F1aWNrTGlua3MuanNcIjtcclxuaW1wb3J0IHsgUXVhbnRpdHkgfSBmcm9tIFwiLi4vY2FydC9mdW5jdGlvbnMvcXVhbnRpdHlcIjtcclxuaW1wb3J0IHsgaXRlbUNvdW50IH0gZnJvbSBcIi4uL2NhcnQvZnVuY3Rpb25zL2l0ZW1Db3VudFwiO1xyXG5pbXBvcnQgeyBvcGVuTW9kYWwsIGNsb3NlTW9kYWwgfSBmcm9tIFwiLi4vY2FydC9mdW5jdGlvbnMvbW9kYWxcIjtcclxuXHJcbmltcG9ydCB7IFZhcmlhbnQgfSBmcm9tIFwiLi4vY2FydC9mdW5jdGlvbnMvdmFyaWFudFwiO1xyXG5pbXBvcnQgeyBTdWJtaXRCdG4gfSBmcm9tIFwiLi4vY2FydC9mdW5jdGlvbnMvc3VibWl0XCI7XHJcblxyXG5pbXBvcnQgUHJvZHVjdENvbnRyb2xsZXIgZnJvbSAnLi9pbmRleC5qcyc7XHJcblxyXG5jbGFzcyBQcm9kdWN0IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzO1xyXG4gICAgICAgIGlmICghdGhpcy5lbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBnZXQoJ3Byb2R1Y3QtY29tcG9uZW50Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJvZHVjdCA9IEpTT04ucGFyc2UoZ2V0KCcjcHJvZHVjdC1pbmZvJywgdGhpcy5lbGVtZW50KS5pbm5lckhUTUwpO1xyXG4gICAgICAgIHRoaXMuYWRkVG9DYXJ0Rm9ybSA9IGdldChcIi5qcy1wcm9kdWN0LWZvcm1cIiwgdGhpcy5lbGVtZW50KTtcclxuICAgICAgICB0aGlzLnZhcmlhbnREcm9wID0gZ2V0KFwiLmMtcHJvZHVjdC1kcm9wZG93blwiLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMudmFyaWFudFNlbGVjdHMgPSBnZXRBbGwoXCIuanMtcHJvZHVjdC12YXJpYW50XCIsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5xdWFudGl0eVNlbGVjdCA9IGdldChcIi5qcy1wcm9kdWN0LXF1YW50aXR5XCIsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5wcmljZXMgPSBnZXRBbGwoXCIuanMtcHJvZHVjdC1wcmljZVwiLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMucHJpY2VWYXQgPSBnZXQoXCIuanMtcHJvZHVjdC1wcmljZS12YXRcIiwgdGhpcy5lbGVtZW50KTtcclxuICAgICAgICB0aGlzLnJldHVyblRvU2VhcmNoID0gZ2V0KFwiLmpzLWJhY2stdG8tc2VhcmNoXCIsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5zd2F0Y2hMYWJlbCA9IGdldCgnLmpzLXN3YXRjaC12YWx1ZScsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5hY2NvcmRpb25zID0gZ2V0QWxsKCcuanMtYWNjb3JkaW9uJywgdGhpcy5lbGVtZW50KTtcclxuICAgICAgICB0aGlzLm1pbmlDYXJ0ID0gZ2V0KFwiLmpzLW1pbmktY2FydFwiLCBkb2N1bWVudCk7XHJcblxyXG4gICAgICAgIHRoaXMudmlkZW9tb2RhbEJ0biA9IGdldEFsbCgnLnNlZS1pbi1hY3Rpb24nLCB0aGlzLmVsZW1lbnQpOyBcclxuICAgICAgICB0aGlzLmNsb3NldmlkZW9CdG4gPSBnZXQoJy5jLW1vZGFsLXZpZGVvX19jbG9zZS1idG4nLCBkb2N1bWVudCk7XHJcbiAgICAgICAgdGhpcy5jbG9zZXZpZGVvQnRuMSA9IGdldCgnLmMtbW9kYWwtdmlkZW9fX2Nsb3NlJywgZG9jdW1lbnQpO1xyXG5cclxuICAgICAgICB0aGlzLmNhcnRUcmlnZ2VyID0gZ2V0KFwiLmMtbWluaS1jYXJ0X190cmlnZ2VyXCIsIGRvY3VtZW50KTtcclxuICAgICAgICB0aGlzLmN1c3RvbWl6ZUJ0biA9IGdldCgnLmpzLWN1c3RvbWl6ZS1idG4nLCB0aGlzLmVsZW1lbnQpOyBcclxuICAgICAgICB0aGlzLnN1Ym1pdEJ0biA9IGdldChcIi5qcy1wcm9kdWN0LWZvcm0tc3VibWl0XCIsIHRoaXMuZWxlbWVudCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2hpcEluZm9CdG4gPSBnZXQoJy5zaGlwX21vZGFsX2luZm9faWNvbicsIHRoaXMuZWxlbWVudCk7IFxyXG4gICAgICAgIHRoaXMuY2xvc2VTaGlwQnRuID0gZ2V0KCcuYy1tb2RhbC1zaGlwX19jbG9zZS1idG4nLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMuZ2lmdEJ1dHRvbnMgPSBnZXRBbGwoJy5jLXByb2R1Y3RfX2dpZnQtYnV0dG9ucy1pdGVtJywgdGhpcy5lbGVtZW50KTtcclxuICAgICAgICBjb25zdCBjaGVja01vYmlsZUNUQSA9IGdldCgnLmpzLXByb2R1Y3QtbW9iaWxlLWN0YScpO1xyXG4gICAgICAgIGlmIChjaGVja01vYmlsZUNUQSkge1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBmb290ZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZm9vdGVyRGl2LmNsYXNzTGlzdC5hZGQoXCJqcy1wcm9kdWN0LW1vYmlsZS1jdGFcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vYmlsZUNUQSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICBtb2JpbGVDVEEuY2xhc3NMaXN0LmFkZChcIm1vYmlsZS1jdGFcIik7XHJcbiAgICAgICAgICAgIG1vYmlsZUNUQS5pbm5lckhUTUwgPSBnZXQoJy5qcy1wcm9kdWN0LWZvcm0tc3VibWl0JykuaW5uZXJIVE1MO1xyXG4gICAgICAgICAgICBmb290ZXJEaXYuYXBwZW5kQ2hpbGQobW9iaWxlQ1RBKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb290ZXJEaXYpO1xyXG5cclxuICAgICAgICAgICAgbW9iaWxlQ1RBLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZ2V0KCcuanMtcHJvZHVjdC1mb3JtLXN1Ym1pdCcpLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnZhcmlhbnREcm9wKXtcclxuICAgICAgICAgICAgdGhpcy52YXJpYW50RHJvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFyaWFudFNlbGVjdCA9IGdldCgnLmMtcHJvZHVjdF9fc2VsZWN0JywgZG9jdW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgaWYodmFyaWFudFNlbGVjdC5zdHlsZS5kaXNwbGF5ID09IFwibm9uZVwiKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXJpYW50U2VsZWN0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB2YXJpYW50U2VsZWN0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmN1c3RvbUJ0biA9IGdldCgnI2N1c3RvbWl6ZS1idG4nLCBkb2N1bWVudCk7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tQnRuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvdW50ID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm1EYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnaXRlbXMnOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lkJzogJzQxOTI2NDY4NTk5OTk5JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncXVhbnRpdHknOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwcm9wZXJ0aWVzJzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncHJvZHVjdF90aXRsZSc6IHRoaXMucHJvZHVjdC50aXRsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Byb2R1Y3RfdmFyaWFudCc6IE51bWJlcih0aGlzLmN1c3RvbUJ0bi5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmFyaWFudCcpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ZvbnQnOiB0aGlzLmN1c3RvbWl6ZU9iai5mb250LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbGV0dGVyJzogdGhpcy5jdXN0b21pemVPYmoudGV4dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lkJzogTnVtYmVyKHRoaXMuY3VzdG9tQnRuLmdldEF0dHJpYnV0ZSgnZGF0YS12YXJpYW50JykpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdxdWFudGl0eSc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Byb3BlcnRpZXMnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjdXN0b21pemVfZm9udCc6IHRoaXMuY3VzdG9taXplT2JqLmZvbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjdXN0b21pemVfbGV0dGVyJzogdGhpcy5jdXN0b21pemVPYmoudGV4dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9OyBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2goXCIvY2FydC5qc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2FydENvdW50LmlubmVySFRNTCA9IGRhdGEuaXRlbV9jb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByaV9wcm9kdWN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbmFibGVfcHJpbWUgPSBnZXQoXCIja2wtcHJpbWUtcHJvZHVjdFwiLCBkb2N1bWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmltZV9pZCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW5hYmxlX3ByaW1lICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltZV9pZCA9IGVuYWJsZV9wcmltZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByaW1lX2lkICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpdGVtLnZhcmlhbnRfaWQgPT0gcHJpbWVfaWQgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpX3Byb2R1Y3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihwcmlfcHJvZHVjdCA9PSAgZmFsc2UgJiBwcmltZV9pZCAhPScnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpdGVtcyc6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lkJzogJzQxOTI2NDY4NTk5OTk5JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdxdWFudGl0eSc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncHJvcGVydGllcyc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncHJvZHVjdF90aXRsZSc6IHRoaXMucHJvZHVjdC50aXRsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncHJvZHVjdF92YXJpYW50JzogTnVtYmVyKHRoaXMuY3VzdG9tQnRuLmdldEF0dHJpYnV0ZSgnZGF0YS12YXJpYW50JykpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdmb250JzogdGhpcy5jdXN0b21pemVPYmouZm9udCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbGV0dGVyJzogdGhpcy5jdXN0b21pemVPYmoudGV4dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWQnOiBOdW1iZXIodGhpcy5jdXN0b21CdG4uZ2V0QXR0cmlidXRlKCdkYXRhLXZhcmlhbnQnKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncXVhbnRpdHknOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Byb3BlcnRpZXMnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2N1c3RvbWl6ZV9mb250JzogdGhpcy5jdXN0b21pemVPYmouZm9udCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY3VzdG9taXplX2xldHRlcic6IHRoaXMuY3VzdG9taXplT2JqLnRleHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZCc6IHByaW1lX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3F1YW50aXR5JzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2goJy9jYXJ0L2FkZC5qcycsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGZvcm1EYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hDYXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtbW9kYWwtY3VzdG9taXplX19jbG9zZS1idG4nKS5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZXRjaCgnL2NhcnQvYWRkLmpzJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZm9ybURhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mZXRjaENhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy1tb2RhbC1jdXN0b21pemVfX2Nsb3NlLWJ0bicpLmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmdpZnRCdXR0b25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2lmdEJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2lmdEJ1dHRvbnMuZm9yRWFjaChnX2J1dHRvbiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnX2J1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb2R1Y3RfaGFuZGxlID0gYnV0dG9uLmRhdGFzZXQuaGFuZGxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmZXRjaChgL3Byb2R1Y3RzLyR7cHJvZHVjdF9oYW5kbGV9P3NlY3Rpb25faWQ9bWFpbi1wcm9kdWN0YClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS50ZXh0KCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChodG1sKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGh0bWwsIFwidGV4dC9odG1sXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdENvbXBvbmVudCA9IGRvYy5xdWVyeVNlbGVjdG9yKCdwcm9kdWN0LWNvbXBvbmVudCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQoJ3Byb2R1Y3QtY29tcG9uZW50JykuaW5uZXJIVE1MID0gcHJvZHVjdENvbXBvbmVudC5pbm5lckhUTUw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUHJvZHVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS53YXJuKFwiU29tZXRoaW5nIHdlbnQgd3JvbmcuXCIsIGVycikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuY3VzdG9taXplT2JqID0ge1xyXG4gICAgICAgICAgICBmb250OiAnJyxcclxuICAgICAgICAgICAgdGV4dDogJydcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgaW1hZ2VfY291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMubWFpbkltZ3MgPSBnZXRBbGwoJy5wcm9kdWN0LW1haW4taW1hZ2UnKTtcclxuICAgICAgICB0aGlzLnRodW1iSW1ncyA9IGdldEFsbCgnLnByb2R1Y3QtdGh1bWItaW1hZ2UnKTtcclxuICAgICAgICBpZih0aGlzLnRodW1iSW1ncy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgdGhpcy50aHVtYkltZ3MuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBpYyA9IGl0ZW0ucXVlcnlTZWxlY3RvcignaW1nJyk7XHJcbiAgICAgICAgICAgICAgICBpZihwaWMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZV9jb3VudCA9IGltYWdlX2NvdW50ICsgMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMudGh1bWJzd2lwZXIgPSBuZXcgU3dpcGVyKFwiLm15U3dpcGVyXCIsIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTAsXHJcbiAgICAgICAgICAgICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGxvb3A6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzbGlkZVRvQ2xpY2tlZFNsaWRlOiB0cnVlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5tYWluc3dpcGVyID0gbmV3IFN3aXBlcihcIi5teVN3aXBlcjJcIiwge1xyXG4gICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxMCxcclxuICAgICAgICAgICAgICAgIGxvb3A6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gICAgICAgICAgICAgICAgbG9vcGVkU2xpZGVzOiBpbWFnZV9jb3VudCxcclxuICAgICAgICAgICAgICAgIGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRFbDogXCIuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldkVsOiBcIi5zd2lwZXItYnV0dG9uLXByZXZcIixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudGh1bWJzd2lwZXIuY29udHJvbGxlci5jb250cm9sID0gdGhpcy5tYWluc3dpcGVyO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5zd2lwZXIuY29udHJvbGxlci5jb250cm9sID0gdGhpcy50aHVtYnN3aXBlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbiAgICAgICAgdGhpcy5iYWNrVG9TZWFyY2goKTtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudEFjY29yZGlvbigpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRWYXJpYW50cygpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRRdWFudGl0eSgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRDdXN0b21pemUoKTtcclxuICAgICAgICB0aGlzLmV2ZW50c2hpcE1vZGFsKCk7XHJcbiAgICAgICAgdGhpcy5ldmVudHZpZGVvTW9kYWwoKTtcclxuICAgICAgICB0aGlzLmV2ZW50TXVsdGlWYXJpYW50cygpO1xyXG4gICAgICAgIHRoaXMudmFyaWFudFRleHQoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXJpYW50VGV4dCgpIHtcclxuICAgICAgICBpZih0aGlzLnZhcmlhbnREcm9wKXtcclxuICAgICAgICAgICAgdGhpcy52YXJpYW50U2VsZWN0cy5mb3JFYWNoKCh2YXJpYW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZih2YXJpYW50LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3NlbGVjdGVkVmFyaWFudCA9IHZhcmlhbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2R1Y3QtaWQnKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YV9wb3N0aW9uID0gdmFyaWFudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcG9zaXRpb24nKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhX3Bvc3Rpb24gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih2YXJpYW50LmdldEF0dHJpYnV0ZSgnZGF0YS10ZXh0JykuaW5jbHVkZXMoXCIuMDBcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0KCcuYy1wcm9kdWN0X19zZWxlY3RlZCcsIHRoaXMuZWxlbWVudCkuaW5uZXJIVE1MID0gdmFyaWFudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGV4dCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGFfcG9zdGlvbiAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldCgnLmMtcHJvZHVjdF9fc2VsZWN0ZWQnLCB0aGlzLmVsZW1lbnQpLmlubmVySFRNTCA9IHZhcmlhbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRleHQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV2ZW50dmlkZW9Nb2RhbCgpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudmlkZW9tb2RhbEJ0bi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlkZW9Nb2RhbENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy1tb2RhbC12aWRlbycpO1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvbW9kYWxCdG4uZm9yRWFjaChidXR0b24gPT4ge1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWRlb01vZGFsQ29udGVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlkZW9pZnJhbWUgPSBnZXQoXCJpZnJhbWVcIiwgdGhpcy52aWRlb01vZGFsQ29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWRlb2lmcmFtZS5zcmMgKz0gXCImYXV0b3BsYXk9MSZtdXRlPTFcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5jbG9zZXZpZGVvQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9Nb2RhbENvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvaWZyYW1lID0gZ2V0KFwiaWZyYW1lXCIsIHRoaXMudmlkZW9Nb2RhbENvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGlmcmFtZVNyYyA9IHRoaXMudmlkZW9pZnJhbWUuc3JjO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb2lmcmFtZS5zcmMgPSBpZnJhbWVTcmM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvaWZyYW1lLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UoJ3tcImV2ZW50XCI6XCJjb21tYW5kXCIsXCJmdW5jXCI6XCJzdG9wVmlkZW9cIixcImFyZ3NcIjpcIlwifScsICcqJylcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2V2aWRlb0J0bjEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb01vZGFsQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9pZnJhbWUgPSBnZXQoXCJpZnJhbWVcIiwgdGhpcy52aWRlb01vZGFsQ29udGVudCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaWZyYW1lU3JjID0gdGhpcy52aWRlb2lmcmFtZS5zcmM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvaWZyYW1lLnNyYyA9IGlmcmFtZVNyYztcclxuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9pZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZSgne1wiZXZlbnRcIjpcImNvbW1hbmRcIixcImZ1bmNcIjpcInN0b3BWaWRlb1wiLFwiYXJnc1wiOlwiXCJ9JywgJyonKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBldmVudEN1c3RvbWl6ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXN0b21pemVCdG4pIHtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21pemVNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1jdXN0b21pemUtbW9kYWwnKTtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZUJ0bnMgPSBnZXRBbGwoJy5qcy1jdXN0b21pemUtY2xvc2UnLCB0aGlzLmN1c3RvbWl6ZU1vZGFsKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9taXplQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21pemVNb2RhbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyU3RlcEh0bWwoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRTdGVwcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGVwMi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RpY3lidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtcHJvZHVjdC1tb2JpbGUtY3RhJyk7XHJcbiAgICAgICAgICAgICAgICBpZihzdGljeWJ1dHRvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RpY3lidXR0b24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzaGlwTW9kYWwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hpcEluZm9CdG4pIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hpcEluZm9Nb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jLW1vZGFsLXNoaXAnKTtcclxuICAgICAgICAgICAgdGhpcy5zaGlwSW5mb0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBJbmZvTW9kYWwuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnNoaXBJbmZvQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBJbmZvTW9kYWwuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zaGlwSW5mb0J0bi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBJbmZvTW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNsb3NlU2hpcEJ0bikge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zaGlwSW5mb01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtbW9kYWwtc2hpcCcpO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlU2hpcEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBJbmZvTW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyU3RlcEh0bWwoKSB7XHJcblxyXG4gICAgICAgIGxldCBzZWxlY3RlZFZhcmlhbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudmFyaWFudFNlbGVjdHMuZm9yRWFjaCgodmFyaWFudCkgPT4ge1xyXG4gICAgICAgICAgICBpZih2YXJpYW50LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkVmFyaWFudCA9IHZhcmlhbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2R1Y3QtaWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHZhcmlhbnRJbnB1dCA9IGdldCgnLmMtcHJvZHVjdF9fdmFyaWFudElkJywgdGhpcy5hZGRUb0NhcnRGb3JtKTtcclxuICAgICAgICBzZWxlY3RlZFZhcmlhbnQgPSB2YXJpYW50SW5wdXQudmFsdWU7XHJcblxyXG4gICAgICAgIHZhciBwcm9kdWN0X3RpdGxlID0gdGhpcy5wcm9kdWN0LnRpdGxlO1xyXG4gICAgICAgIHZhciBwcm9kaWN0X3ByaWNlID0gdGhpcy5wcm9kdWN0LnByaWNlICsgZW5ncmF2aW5nX3ByaWNlO1xyXG5cclxuICAgICAgICB0aGlzLnByb2R1Y3QudmFyaWFudHMuZm9yRWFjaChwX3ZhcmlhbnQgPT4ge1xyXG4gICAgICAgICAgICBpZiAocF92YXJpYW50LmlkID09IHNlbGVjdGVkVmFyaWFudCkge1xyXG4gICAgICAgICAgICAgICAgcHJvZGljdF9wcmljZSA9IHBfdmFyaWFudC5wcmljZSArIGVuZ3JhdmluZ19wcmljZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VzdG9taXplX3RpdGxlJykuaW5uZXJIVE1MID0gcHJvZHVjdF90aXRsZTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VzdG9taXplX3ByaWNlJykuaW5uZXJIVE1MID0gYCR7dGhpcy5mb3JtYXRQcmljZShwcm9kaWN0X3ByaWNlKX1gO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9iaWxlX2N1c3RvbWl6ZV90aXRsZScpLmlubmVySFRNTCA9IHByb2R1Y3RfdGl0bGU7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vYmlsZV9jdXN0b21pemVfcHJpY2UnKS5pbm5lckhUTUwgPSBgJHt0aGlzLmZvcm1hdFByaWNlKHByb2RpY3RfcHJpY2UpfWA7XHJcblxyXG4gICAgICAgIHZhciBvcHRpb25fY29sb3IgPSBudWxsO1xyXG4gICAgICAgIHZhciBjdXN0b21fY29sb3IgPSBudWxsO1xyXG4gICAgICAgIHZhciBwcm9kdWN0X29wdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYy1wcm9kdWN0X19zd2F0Y2gtaXRlbS5jLXByb2R1Y3QtY2FyZF9fb3B0aW9uJyk7XHJcblxyXG4gICAgICAgIGlmKHByb2R1Y3Rfb3B0aW9ucyl7XHJcbiAgICAgICAgICAgIHByb2R1Y3Rfb3B0aW9ucy5mb3JFYWNoKChwcm9kdWN0X29wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYocHJvZHVjdF9vcHRpb24uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbl9jb2xvciA9IHByb2R1Y3Rfb3B0aW9uLmdldEF0dHJpYnV0ZSgnZGF0YS10ZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkVmFyaWFudCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkVmFyaWFudCA9IHRoaXMucHJvZHVjdC52YXJpYW50c1swXS5pZC50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGN1c3RvbWl6ZUltZyA9IHRoaXMucHJvZHVjdC5mZWF0dXJlZF9pbWFnZTtcclxuXHJcbiAgICAgICAgaWYob3B0aW9uX2NvbG9yICE9IG51bGwpe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGN1c3RvbV9hbHQgPSBvcHRpb25fY29sb3IrXCIgQ3VzdG9tXCI7XHJcbiAgICAgICAgICAgIGN1c3RvbV9jb2xvciA9IG9wdGlvbl9jb2xvci5yZXBsYWNlKFwiIFwiLCAgXCItXCIpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdC5tZWRpYS5mb3JFYWNoKG1lZGlhID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChtZWRpYS5hbHQgPT0gY3VzdG9tX2FsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbWl6ZUltZyA9IG1lZGlhLnNyYztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjdXN0b21pemVJbWcgIT0gJycpIHtcclxuICAgICAgICAgICAgY29uc3QgaHRtbCA9IGBcclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtjdXN0b21pemVJbWd9XCIvPlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjdXN0b21pemUtdGV4dFwiIGN1c3RvbS1jb2xvcj1cIiR7Y3VzdG9tX2NvbG9yfVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImN1c3RvbWl6ZS1jb250ZW50XCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGdldCgnLmpzLXN0ZXAtaW1nJywgZG9jdW1lbnQpO1xyXG4gICAgICAgICAgICBjb25zdCBjaGVja291dEJ0biA9IGdldCgnI2N1c3RvbWl6ZS1idG4nLCBkb2N1bWVudCk7XHJcbiAgICAgICAgICAgIGNoZWNrb3V0QnRuLnNldEF0dHJpYnV0ZSgnZGF0YS12YXJpYW50Jywgc2VsZWN0ZWRWYXJpYW50KVxyXG4gICAgICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50U3RlcHMoKSB7XHJcbiAgICAgICAgdGhpcy5zdGVwMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jLW1vZGFsLWN1c3RvbWl6ZV9fc3RlcDInKTtcclxuICAgICAgICB2YXIgZm9udEl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZvbnRzLWNvbnRlbnQgLml0ZW0nKTtcclxuICAgICAgICB2YXIgY3VzdG9taXplSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY3VzdG9taXplLWlucHV0Jyk7XHJcbiAgICAgICAgdmFyIHN0ZXAyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2N1c3RvbWl6ZS1idG4nKTtcclxuICAgICAgICBzdGVwMkJ0bi5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XHJcblxyXG4gICAgICAgIHZhciBmb250RHJvcDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VzdG9tX2ZvbnRfc2VjdGlvbicpO1xyXG5cclxuICAgICAgICBmb250RHJvcDEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgIGNvbnN0IGZvbnRDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvbnRzJyk7XHJcbiAgICAgICAgICAgaWYoZm9udENvbnRlbnQuc3R5bGUuZGlzcGxheSA9PSBcIm5vbmVcIil7XHJcbiAgICAgICAgICAgICAgZm9udENvbnRlbnQuc3R5bGUuZGlzcGxheT1cImJsb2NrXCI7XHJcbiAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgZm9udENvbnRlbnQuc3R5bGUuZGlzcGxheT1cIm5vbmVcIjtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIGZvbnREcm9wMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXN0b21fZHJvcGRvd24nKTtcclxuXHJcbiAgICAgICAgZm9udERyb3AyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICBjb25zdCBmb250Q29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb250cycpO1xyXG4gICAgICAgICAgIGlmKGZvbnRDb250ZW50LnN0eWxlLmRpc3BsYXkgPT0gXCJub25lXCIpe1xyXG4gICAgICAgICAgICAgIGZvbnRDb250ZW50LnN0eWxlLmRpc3BsYXk9XCJibG9ja1wiO1xyXG4gICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIGZvbnRDb250ZW50LnN0eWxlLmRpc3BsYXk9XCJub25lXCI7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNsb3NlQnRucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWl6ZU1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGVwMi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIGlmKHNjcmVlbi53aWR0aCA8IDc4Nil7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RpY3lidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtcHJvZHVjdC1tb2JpbGUtY3RhJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3RpY3lidXR0b24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGljeWJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoY3VzdG9taXplSW5wdXQpIHtcclxuICAgICAgICAgICAgY3VzdG9taXplSW5wdXQudmFsdWU9XCJcIjtcclxuICAgICAgICAgICAgY3VzdG9taXplSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZS50YXJnZXQudmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIE1BWF9XSURUSCA9IDE2MDtcclxuICAgICAgICAgICAgICAgIHZhciBNQVhfRk9OVF9TSVpFID0gMjM7XHJcbiAgICAgICAgICAgICAgICB2YXIgTUlOX0ZPTlRfU0laRSA9IDExO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBmb250X29iamVjdCA9IGdldCgnLnByb2R1Y3QtZm9udC1zaXplJywgZG9jdW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgaWYoZm9udF9vYmplY3Qpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmRfZGVfbWF4X3NpemUgPSBmb250X29iamVjdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWRlc2t0b3AtbWF4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmRfZGVfbWluX3NpemUgPSBmb250X29iamVjdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWRlc2t0b3AtbWluXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmRfbWJfbWF4X3NpemUgPSBmb250X29iamVjdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1vYmlsZS1tYXhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZF9tYl9taW5fc2l6ZSA9IGZvbnRfb2JqZWN0LmdldEF0dHJpYnV0ZShcImRhdGEtbW9iaWxlLW1pblwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGVza19tYXhfd2lkdGggPSBmb250X29iamVjdC5nZXRBdHRyaWJ1dGUoXCJkZXNrdG9wLW1heC13aWR0aFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWJfbWF4X3dpZHRoID0gZm9udF9vYmplY3QuZ2V0QXR0cmlidXRlKFwibW9iaWxlLW1heC13aWR0aFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gZ2V0KCcuY3VzdG9taXplLXRleHQnLCBkb2N1bWVudCk7O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY3VzdG9taXplVGV4dCA9IGdldCgnLmN1c3RvbWl6ZS1jb250ZW50JywgZG9jdW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHNjcmVlbi53aWR0aCA+IDc2OCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHByZF9kZV9tYXhfc2l6ZSAhPSAnJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1BWF9GT05UX1NJWkUgPSBwYXJzZUludChwcmRfZGVfbWF4X3NpemUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihwcmRfZGVfbWluX3NpemUgIT0gJycpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNSU5fRk9OVF9TSVpFID0gcGFyc2VJbnQocHJkX2RlX21pbl9zaXplKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlc2tfbWF4X3dpZHRoICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1BWF9XSURUSCA9IHBhcnNlSW50KGRlc2tfbWF4X3dpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTUFYX1dJRFRIID0gMTEwO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBNQVhfRk9OVF9TSVpFID0gMTU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIE1JTl9GT05UX1NJWkUgPSA3O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHByZF9tYl9tYXhfc2l6ZSAhPSAnJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1BWF9GT05UX1NJWkUgPSBwYXJzZUludChwcmRfbWJfbWF4X3NpemUpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHByZF9tYl9taW5fc2l6ZSAhPSAnJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1JTl9GT05UX1NJWkUgPSBwYXJzZUludChwcmRfbWJfbWluX3NpemUpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYl9tYXhfd2lkdGggIT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTUFYX1dJRFRIID0gcGFyc2VJbnQobWJfbWF4X3dpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZWwuc3R5bGUud2lkdGggPSBNQVhfV0lEVEggKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmb250U2l6ZSA9IE1BWF9GT05UX1NJWkU7XHJcbiAgICAgICAgICAgICAgICBjdXN0b21pemVUZXh0LnN0eWxlLmZvbnRTaXplID0gZm9udFNpemUgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgICAgIHdoaWxlIChmb250U2l6ZSA+IE1JTl9GT05UX1NJWkUgJiYgKCAoY3VzdG9taXplVGV4dC5zY3JvbGxXaWR0aCArIDEwKSA+IE1BWF9XSURUSCkpIHtcclxuICAgICAgICAgICAgICAgICAgZm9udFNpemUtLTtcclxuICAgICAgICAgICAgICAgICAgY3VzdG9taXplVGV4dC5zdHlsZS5mb250U2l6ZSA9IGZvbnRTaXplICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbnVtQ2hhcnMgPSB2YWx1ZS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGN1c3RvbWl6ZVRleHQuaW5uZXJIVE1MID0gdmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc0NoZWNrb3V0QnRuKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGVwMkJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGVwMkJ0bi5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgXHJcblxyXG4gICAgICAgIGZvbnRJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb250SXRlbXMuZm9yRWFjaChybUl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJtSXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0NoZWNrb3V0QnRuKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGVwMkJ0bi5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXAyQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJylcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjdXN0b21pemVUZXh0ID0gZ2V0KCcuY3VzdG9taXplLXRleHQnLCBkb2N1bWVudCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcmV2aWV3Rm9udCA9IGdldCgnLnByZXZpZXdfZm9udCBzcGFuJywgZG9jdW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1c3RvbWl6ZVRleHQgJiYgaXRlbSAmJiBpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1mb250JykpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21pemVUZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ2ZvbnQtY29tbycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbWl6ZVRleHQuY2xhc3NMaXN0LnJlbW92ZSgnZm9udC1tb250c2VycmF0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9taXplVGV4dC5jbGFzc0xpc3QucmVtb3ZlKCdmb250LXBldGl0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZpZXdGb250LmNsYXNzTGlzdC5yZW1vdmUoJ2ZvbnQtY29tbycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXZpZXdGb250LmNsYXNzTGlzdC5yZW1vdmUoJ2ZvbnQtbW9udHNlcnJhdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXZpZXdGb250LmNsYXNzTGlzdC5yZW1vdmUoJ2ZvbnQtcGV0aXQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1mb250JykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnQ29ybW9yYW50IEdhcmFtb25kJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbWl6ZVRleHQuY2xhc3NMaXN0LmFkZCgnZm9udC1jb21vJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2aWV3Rm9udC5pbm5lckhUTUwgPSAnJm5ic3A7Q29ybW9yYW50IEdhcmFtb25kJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpZXdGb250LmNsYXNzTGlzdC5hZGQoJ2ZvbnQtY29tbycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ01vbnRzZXJyYXQnOiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbWl6ZVRleHQuY2xhc3NMaXN0LmFkZCgnZm9udC1tb250c2VycmF0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2aWV3Rm9udC5pbm5lckhUTUwgPSAnJm5ic3A7TW9udHNlcnJhdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2aWV3Rm9udC5jbGFzc0xpc3QuYWRkKCdmb250LW1vbnRzZXJyYXQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdQZXRpdCBGb3JtYWwgU2NyaXB0JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbWl6ZVRleHQuY2xhc3NMaXN0LmFkZCgnZm9udC1wZXRpdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlld0ZvbnQuaW5uZXJIVE1MID0nJm5ic3A7UGV0aXQgRm9ybWFsIFNjcmlwdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2aWV3Rm9udC5jbGFzc0xpc3QuYWRkKCdmb250LXBldGl0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb250cycpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBmZXRjaENhcnQoKSB7XHJcbiAgICAgICAgZmV0Y2goXCIvY2FydFwiKVxyXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLnRleHQoKSlcclxuICAgICAgICAgICAgLnRoZW4oKGh0bWwpID0+IHRoaXMucmVuZGVyQ2FydChodG1sKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUud2FybihcIlNvbWV0aGluZyB3ZW50IHdyb25nLlwiLCBlcnIpKTtcclxuICAgIH1cclxuXHJcbiAgICBmZXRjaE5ld0NhcnQgPSAoKSA9PiB7XHJcbiAgICAgICAgZmV0Y2goXCIvY2FydFwiKVxyXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLnRleHQoKSlcclxuICAgICAgICAgICAgLnRoZW4oKGh0bWwpID0+IHRoaXMucmVuZGVyQ2FydChodG1sKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUud2FybihcIlNvbWV0aGluZyB3ZW50IHdyb25nLlwiLCBlcnIpKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyQ2FydChjYXJ0KSB7XHJcbiAgICAgICAgY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xyXG4gICAgICAgIGNvbnN0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoY2FydCwgXCJ0ZXh0L2h0bWxcIik7XHJcbiAgICAgICAgY29uc3QgY2FydEl0ZW1zID0gZ2V0KFwiLmpzLW1pbmktY2FydFwiLCBkb2MpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubWluaUNhcnQuaW5uZXJIVE1MID0gY2FydEl0ZW1zLmlubmVySFRNTDtcclxuICAgICAgICB0aGlzLmluaXRDYXJ0KCk7XHJcbiAgICAgICAgaXRlbUNvdW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdENhcnQoKSB7XHJcbiAgICAgICAgb3Blbk1vZGFsKHRoaXMubWluaUNhcnQsIHRoaXMub3BlblRyaWdnZXIpO1xyXG4gICAgICAgIGNsb3NlTW9kYWwodGhpcy5taW5pQ2FydCk7XHJcbiAgICAgICAgbmV3IFF1YW50aXR5KHRoaXMubWluaUNhcnQsIHRoaXMuZmV0Y2hOZXdDYXJ0KTtcclxuXHJcbiAgICAgICAgbmV3IFZhcmlhbnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLW1pbmktY2FydCcpLCB0aGlzLmZldGNoTmV3Q2FydCk7XHJcbiAgICAgICAgbmV3IFN1Ym1pdEJ0bihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbWluaS1jYXJ0JyksIHRoaXMuZmV0Y2hDYXJ0KTtcclxuICAgICAgICB0aGlzLmNhcnRUcmlnZ2VyLmNsaWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNDaGVja291dEJ0bigpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgZm9udEl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZvbnRzLWNvbnRlbnQgLml0ZW0nKTtcclxuICAgICAgICBjb25zdCBjdXN0b21pemVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjdXN0b21pemUtaW5wdXQnKTtcclxuXHJcbiAgICAgICAgdGhpcy5jdXN0b21pemVPYmoudGV4dCA9IGN1c3RvbWl6ZUlucHV0LnZhbHVlO1xyXG4gICAgICAgIGZvbnRJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBpZihpdGVtLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9taXplT2JqLmZvbnQgPSBpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1mb250Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY3VzdG9taXplT2JqLnRleHQgIT0gJycgJiYgdGhpcy5jdXN0b21pemVPYmouZm9udCAhPSAnJyApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50UXVhbnRpdHkoKSB7XHJcbiAgICAgICAgaWYodGhpcy5xdWFudGl0eVNlbGVjdCkge1xyXG4gICAgICAgICAgICBjb25zdCBwbHVzQnRuID0gZ2V0KCcuanMtcXR5LXBsdXMnLCB0aGlzLnF1YW50aXR5U2VsZWN0KTtcclxuICAgICAgICAgICAgY29uc3QgbWludXNCdG4gPSBnZXQoJy5qcy1xdHktbWludXMnLCB0aGlzLnF1YW50aXR5U2VsZWN0KTtcclxuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBnZXQoJy5qcy1xdHktdmFsdWUnLCB0aGlzLnF1YW50aXR5U2VsZWN0KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBpbnB1dFZhbHVlID0gaW5wdXQudmFsdWU7XHJcblxyXG4gICAgICAgICAgICBwbHVzQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSArKztcclxuICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBpbnB1dFZhbHVlOyBcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBtaW51c0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXRWYWx1ZSA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dFZhbHVlIC0tO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gaW5wdXRWYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50TXVsdGlWYXJpYW50cyAoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50VmFyaWFudHMoKSB7XHJcbiAgICAgICAgdGhpcy52YXJpYW50U2VsZWN0cy5mb3JFYWNoKHNlbGVjdCA9PiB7XHJcbiAgICAgICAgICAgIHNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25fcG9zID0gc2VsZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1wb3NpdGlvbicpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YXJpYW50U2VsZWN0cy5mb3JFYWNoKHJtSXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm1Qb3MgPSBybUl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXBvc2l0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbl9wb3MgPT0gcm1Qb3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJtSXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZWN0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25fcG9zID09ICcxJykge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN3YXRjaExhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhdGNoTGFiZWwuaW5uZXJIVE1MID0gYENvbG9yOiAke3NlbGVjdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGV4dCcpfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldCgnLmMtcHJvZHVjdF9fc2VsZWN0ZWQnLCB0aGlzLmVsZW1lbnQpLmlubmVySFRNTCA9IHNlbGVjdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGV4dCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXQoJy5jLXByb2R1Y3RfX3NlbGVjdCcsIHRoaXMuZWxlbWVudCkuc3R5bGUuZGlzcGxheT1cIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJJbWFnZXMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnYy1wcm9kdWN0X19zZWxlY3QtZmllbGQtaHlicmlkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0KCcuYy1wcm9kdWN0X19zZWxlY3RlZCcsIHRoaXMuZWxlbWVudCkuaW5uZXJIVE1MID0gc2VsZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS10ZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldCgnLmMtcHJvZHVjdF9fc2VsZWN0JywgdGhpcy5lbGVtZW50KS5zdHlsZS5kaXNwbGF5PVwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kVGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwZW5kVGV4dCgpIHtcclxuICAgICAgICBsZXQgb2JqID0gW107XHJcblxyXG4gICAgICAgIHRoaXMudmFyaWFudFNlbGVjdHMuZm9yRWFjaCh2YXJpYW50ID0+IHtcclxuICAgICAgICAgICAgaWYgKHZhcmlhbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdmFyaWFudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGV4dCcpO1xyXG4gICAgICAgICAgICAgICBvYmoucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgcmVzdWx0ID0gJydcclxuICAgICAgICBvYmouZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID09IChvYmoubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBpdGVtO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IGAke2l0ZW19IC8gYDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKC9cXHI/XFxufFxcci9nLCBcIlwiKVxyXG5cclxuICAgICAgICB0aGlzLnByb2R1Y3QudmFyaWFudHMuZm9yRWFjaCh2YXJpYW50ID0+IHtcclxuICAgICAgICAgICAgaWYgKHZhcmlhbnQudGl0bGUgPT0gcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YXJpYW50SWQgPSB2YXJpYW50LmlkXHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YXJpYW50SW5wdXQgPSBnZXQoJy5jLXByb2R1Y3RfX3ZhcmlhbnRJZCcsIHRoaXMuYWRkVG9DYXJ0Rm9ybSk7XHJcbiAgICAgICAgICAgICAgICB2YXJpYW50SW5wdXQudmFsdWUgPSB2YXJpYW50SWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQcm9kdWN0UHJpY2UodmFyaWFudElkKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YXJpYW50VXJsID0gYD92YXJpYW50PSR7dmFyaWFudElkfWBcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlV2luZG93TG9jYXRpb25TZWFyY2godmFyaWFudFVybClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVdpbmRvd0xvY2F0aW9uU2VhcmNoKGNob2ljZXMpIHtcclxuICAgICAgICBsZXQgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSh3aW5kb3cubG9jYXRpb24uc2VhcmNoLCBgPyR7Y2hvaWNlc31gKVxyXG4gIFxyXG4gICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uc2VhcmNoID09PSAnJykge1xyXG4gICAgICAgICAgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgYCR7d2luZG93LmxvY2F0aW9uLmhyZWZ9PyR7Y2hvaWNlc31gKVxyXG4gICAgICAgIH1cclxuICBcclxuICAgICAgICBpZiAoIXVybC5pbmNsdWRlcygnJicpKSB7XHJcbiAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSgnPycsICcnKVxyXG4gICAgICAgIH1cclxuICBcclxuICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sICcnLCB1cmwpXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUHJvZHVjdFByaWNlKGlkKSB7XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0LnZhcmlhbnRzLmZvckVhY2godmFyaWFudCA9PiB7XHJcbiAgICAgICAgICAgIGlmICh2YXJpYW50LmlkID09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1c3RvbWl6ZUJ0bikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YXJpYW50LmF2YWlsYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWl6ZUJ0bi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9taXplQnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN1Ym1pdEJ0bikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YXJpYW50LmF2YWlsYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdEJ0bi5pbm5lckhUTUwgPSAnQWRkIHRvIENhcnQnO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VibWl0QnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJtaXRCdG4uaW5uZXJIVE1MID0gXCJTb2xkIE91dFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBodG1sID0gJyc7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFyaWFudC5jb21wYXJlX2F0X3ByaWNlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBodG1sID0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImMtcHJpY2VcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5mb3JtYXRQcmljZSh2YXJpYW50LnByaWNlKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaHRtbCA9IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJjLXByaWNlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cyBjbGFzcz1cImMtcHJpY2VfX2NvbXBhcmVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuZm9ybWF0UHJpY2UodmFyaWFudC5jb21wYXJlX2F0X3ByaWNlKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuZm9ybWF0UHJpY2UodmFyaWFudC5wcmljZSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJpY2VFbGVtZW50ID0gZ2V0KCcuYy1wcm9kdWN0X19wcmljZScsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICBwcmljZUVsZW1lbnQuaW5uZXJIVE1MID0gaHRtbDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodmFyaWFudC5vcHRpb24yID09PSAnR2lmdCBCdW5kbGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJJbWFnZXModHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhcmlhbnQudGl0bGUuaW5jbHVkZXMoJy8nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25MYWJlbCA9IHZhcmlhbnQudGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBnYWxsZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN3aXBlci5teVN3aXBlcjInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFpbkltYWdlID0gZ2FsbGVyeS5xdWVyeVNlbGVjdG9yKGBpbWdbYWx0PVwiJHtvcHRpb25MYWJlbH1cIl1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1haW5JbWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFpblNsaWRlciA9IG1haW5JbWFnZS5jbG9zZXN0KCcucHJvZHVjdC1tYWluLWltYWdlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1haW5TbGlkZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGlkZXJJbmRleCA9IE51bWJlcihtYWluU2xpZGVyLmRhdGFzZXQuc3dpcGVyU2xpZGVJbmRleCk7ICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1haW5zd2lwZXIuc2xpZGVUbyhzbGlkZXJJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1haW5zd2lwZXIuc2xpZGVUbygwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhcmlhbnQub3B0aW9uMiA9PT0gJ1dhbGxldCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJJbWFnZXMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBldmVudEFjY29yZGlvbigpIHtcclxuICAgICAgICB0aGlzLmFjY29yZGlvbnMuZm9yRWFjaChhY2NvcmRpb24gPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBoZWFkZXIgPSBnZXQoJy5qcy1hY2NvcmRpb24tdHJpZ2dlcicsIGFjY29yZGlvbik7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBnZXQoJy5qcy1hY2NvcmRpb24tY29udGVudCcsIGFjY29yZGlvbik7XHJcblxyXG4gICAgICAgICAgICBoZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGhlYWRlci5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kRXZlbnRzKCkge1xyXG4gICAgICAgIG5ldyBBZGRUb0NhcnQodGhpcy5hZGRUb0NhcnRGb3JtKTtcclxuICAgICAgICBuZXcgUXVpY2tMaW5rcyh0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgIGlmICh0aGlzLnZhcmlhbnRTZWxlY3QpIHtcclxuICAgICAgICAgICAgdGhpcy52YXJpYW50U2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQcmljZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5xdWFudGl0eVNlbGVjdCkge1xyXG4gICAgICAgICAgICB0aGlzLnF1YW50aXR5U2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQcmljZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5yZW5kZXJJbWFnZXMoZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckltYWdlcyhpc0dpZnRCdW5kbGUpIHtcclxuICAgICAgICBsZXQgdmFyaWFudElkID0gdGhpcy5wcm9kdWN0LnZhcmlhbnRzWzBdLmlkO1xyXG4gICAgICAgIGxldCBvcHRpb24xID0gdGhpcy5wcm9kdWN0LnZhcmlhbnRzWzBdLm9wdGlvbjE7XHJcbiAgICAgICAgbGV0IG9wdGlvbjIgPSB0aGlzLnByb2R1Y3QudmFyaWFudHNbMF0ub3B0aW9uMjtcclxuICAgICAgICB0aGlzLnZhcmlhbnRTZWxlY3RzLmZvckVhY2goc2VsZWN0ID0+IHtcclxuICAgICAgICAgICAgaWYoc2VsZWN0LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykgJiYgc2VsZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1wb3NpdGlvbicpID09ICcxJykge1xyXG4gICAgICAgICAgICAgICAgdmFyaWFudElkID0gc2VsZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9kdWN0LWlkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9kdWN0LnZhcmlhbnRzLmZvckVhY2godmFyaWFudCA9PiB7XHJcbiAgICAgICAgICAgIGlmICh2YXJpYW50SWQgPT0gdmFyaWFudC5pZCkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uMSA9IHZhcmlhbnQub3B0aW9uMTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbjIgPSB2YXJpYW50Lm9wdGlvbjI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5wcm9kdWN0LnZhcmlhbnRzLmxlbmd0aCA+IDEgJiYgIG9wdGlvbjEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLnRodW1iSW1ncy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5JbWdzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ25vbi1zd2lwZXItc2xpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ3N3aXBlci1zbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMudGh1bWJJbWdzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ25vbi1zd2lwZXItc2xpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ3N3aXBlci1zbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IGFjdGl2ZUlkeCA9IC0xO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5JbWdzLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGljID0gaXRlbS5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihwaWMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhbHQgPSBwaWMuZ2V0QXR0cmlidXRlKCdhbHQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzR2lmdEJ1bmRsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhbHQuaW5jbHVkZXMob3B0aW9uMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnbm9uLXN3aXBlci1zbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnc3dpcGVyLXNsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoYWx0ID09IG9wdGlvbjEgJiYgYWN0aXZlSWR4ID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlSWR4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWx0ICE9IG9wdGlvbjEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnbm9uLXN3aXBlci1zbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnc3dpcGVyLXNsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoYWx0ID09IG9wdGlvbjEgJiYgYWN0aXZlSWR4ID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlSWR4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB2YXIgYWN0aXZlVGh1bWJpZHggPSAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMudGh1bWJJbWdzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGljID0gaXRlbS5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihwaWMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWx0ID0gcGljLmdldEF0dHJpYnV0ZSgnYWx0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNHaWZ0QnVuZGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFsdC5pbmNsdWRlcyhvcHRpb24xKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ25vbi1zd2lwZXItc2xpZGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnc3dpcGVyLXNsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ID0gY291bnQgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggYWN0aXZlVGh1bWJpZHggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVUaHVtYmlkeCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbHQgIT0gb3B0aW9uMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ25vbi1zd2lwZXItc2xpZGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnc3dpcGVyLXNsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ID0gY291bnQgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggYWN0aXZlVGh1bWJpZHggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVUaHVtYmlkeCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy50aHVtYnN3aXBlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5zd2lwZXIuZGVzdHJveSgpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRodW1ic3dpcGVyID0gbmV3IFN3aXBlcihcIi5teVN3aXBlclwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyZWRTbGlkZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbG9vcDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZVRvQ2xpY2tlZFNsaWRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5zd2lwZXIgPSBuZXcgU3dpcGVyKFwiLm15U3dpcGVyMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxMCxcclxuICAgICAgICAgICAgICAgICAgICBsb29wOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgbG9vcGVkU2xpZGVzOiBjb3VudCxcclxuICAgICAgICAgICAgICAgICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRFbDogXCIuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZFbDogXCIuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRodW1ic3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbCA9IHRoaXMubWFpbnN3aXBlcjtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbnN3aXBlci5jb250cm9sbGVyLmNvbnRyb2wgPSB0aGlzLnRodW1ic3dpcGVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVByaWNlKCkge1xyXG4gICAgICAgIGNvbnN0IHZhcmlhbnRTZWxlY3RlZCA9IHRoaXMudmFyaWFudFNlbGVjdC5vcHRpb25zW3RoaXMudmFyaWFudFNlbGVjdC5zZWxlY3RlZEluZGV4XTtcclxuICAgICAgICBjb25zdCBxdHlTZWxlY3RlZCA9IHRoaXMucXVhbnRpdHlTZWxlY3Qub3B0aW9uc1t0aGlzLnF1YW50aXR5U2VsZWN0LnNlbGVjdGVkSW5kZXhdO1xyXG5cclxuICAgICAgICBjb25zdCB2YXJpYW50UHJpY2UgPSB2YXJpYW50U2VsZWN0ZWQuZGF0YXNldC5wcmljZTtcclxuICAgICAgICBjb25zdCBxdHlQcmljZSA9IHF0eVNlbGVjdGVkLnZhbHVlO1xyXG5cclxuICAgICAgICBjb25zdCB0b3RhbFByaWNlID0gdmFyaWFudFByaWNlICogcXR5UHJpY2U7XHJcbiAgICAgICAgY29uc3QgdmF0UHJpY2UgPSB0b3RhbFByaWNlICogdGhlbWUudGF4O1xyXG5cclxuICAgICAgICB0aGlzLnByaWNlcy5mb3JFYWNoKChwcmljZSkgPT4ge1xyXG4gICAgICAgICAgICBwcmljZS5pbm5lckhUTUwgPSB0aGlzLmZvcm1hdFByaWNlKHRvdGFsUHJpY2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnByaWNlVmF0LmlubmVySFRNTCA9IHRoaXMuZm9ybWF0UHJpY2UodmF0UHJpY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvcm1hdFByaWNlKHByaWNlKSB7XHJcbiAgICAgICAgY29uc3QgdG90YWwgPSBJbnRsLk51bWJlckZvcm1hdChTaG9waWZ5LmxvY2FsZSwge1xyXG4gICAgICAgICAgICBzdHlsZTogXCJjdXJyZW5jeVwiLFxyXG4gICAgICAgICAgICBjdXJyZW5jeTogU2hvcGlmeS5jdXJyZW5jeS5hY3RpdmUsXHJcbiAgICAgICAgICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxyXG4gICAgICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDAsIFxyXG4gICAgICAgIH0pLmZvcm1hdChwcmljZSAvIDEwMCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0b3RhbDtcclxuICAgIH1cclxuXHJcbiAgICBiYWNrVG9TZWFyY2goKSB7XHJcbiAgICAgICAgY29uc3Qgc2VhcmNoQ29va2llID0gZ2V0Q29va2llKFwianMtc2VhcmNoLWNvb2tpZVwiKTtcclxuXHJcbiAgICAgICAgaWYgKCFzZWFyY2hDb29raWUpIHJldHVybjtcclxuICAgICAgICB0aGlzLnJldHVyblRvU2VhcmNoLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1oaWRkZW5cIik7XHJcbiAgICAgICAgdGhpcy5yZXR1cm5Ub1NlYXJjaC5ocmVmID0gc2VhcmNoQ29va2llO1xyXG4gICAgICAgIHRoaXMucmV0dXJuVG9TZWFyY2guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVDb29raWUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVDb29raWUoKSB7XHJcbiAgICAgICAgc2V0Q29va2llKFwianMtc2VhcmNoLWNvb2tpZVwiLCBcIlwiLCAyOCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHsgUHJvZHVjdCB9O1xyXG4iLCJpbXBvcnQgeyBnZXRBbGwsIGdldCwgc21vb3RoU2Nyb2xsIH0gZnJvbSBcIkAvdXRpbHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFF1aWNrTGlua3Mge1xyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5xdWlja0xpbmtzID0gZ2V0QWxsKFwiLmpzLXF1aWNrLWxpbmtcIiwgdGhpcy5lbGVtZW50KTtcclxuICAgICAgICB0aGlzLmhlYWRlciA9IGdldChcIi5qcy1oZWFkZXJcIiwgZG9jdW1lbnQpO1xyXG4gICAgICAgIHRoaXMuaGVhZGVySGVpZ2h0ID0gdGhpcy5oZWFkZXIub2Zmc2V0SGVpZ2h0O1xyXG5cclxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kRXZlbnRzKCkge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2xpY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDbGljaygpIHtcclxuICAgICAgICB0aGlzLnF1aWNrTGlua3MuZm9yRWFjaCgobGluaykgPT4ge1xyXG4gICAgICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5oZWFkZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaXMtaGlkZGVuXCIpID8gMzAgOiB0aGlzLmhlYWRlckhlaWdodDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGR1cmF0aW9uID0gNTAwO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeyBpZCB9ID0gbGluay5kYXRhc2V0O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaWQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdkYXRhID0gJywgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaWQtZmVhdHVyZXMnKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzbW9vdGhTY3JvbGwoZWxlbWVudCwgZHVyYXRpb24sIG9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsImNvbnN0IGVsSHRtbCA9IGRvY3VtZW50LmJvZHk7XHJcblxyXG5sZXQgcHJldmlvdXNIdG1sU3R5bGVzID0ge307XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9jaygpIHtcclxuICAgIGNvbnN0IHsgc3R5bGU6IGh0bWxTdHlsZSB9ID0gZWxIdG1sO1xyXG5cclxuICAgIHByZXZpb3VzSHRtbFN0eWxlcyA9IHtcclxuICAgICAgICBvdmVyZmxvd1k6IGh0bWxTdHlsZS5vdmVyZmxvd1ksXHJcbiAgICAgICAgbWluSGVpZ2h0OiBodG1sU3R5bGUubWluSGVpZ2h0LFxyXG4gICAgICAgIG1heEhlaWdodDogXCJhdXRvXCIsXHJcbiAgICB9O1xyXG5cclxuICAgIE9iamVjdC5hc3NpZ24oZWxIdG1sLnN0eWxlLCB7XHJcbiAgICAgICAgb3ZlcmZsb3dZOiBcImhpZGRlblwiLFxyXG4gICAgICAgIG1pbkhlaWdodDogXCIxMDB2aFwiLFxyXG4gICAgICAgIG1heEhlaWdodDogXCIxMDB2aFwiLFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZWxlYXNlKCkge1xyXG4gICAgT2JqZWN0LmFzc2lnbihlbEh0bWwuc3R5bGUsIHByZXZpb3VzSHRtbFN0eWxlcyk7XHJcbn1cclxuIiwiLyogZXNsaW50LWRpc2FibGUgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldENvb2tpZShjbmFtZSwgY3ZhbHVlLCBleGRheXMpIHtcclxuICAgIHZhciBkID0gbmV3IERhdGUoKTtcclxuICAgIGQuc2V0VGltZShkLmdldFRpbWUoKSArIGV4ZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDApO1xyXG4gICAgdmFyIGV4cGlyZXMgPSBcImV4cGlyZXM9XCIgKyBkLnRvVVRDU3RyaW5nKCk7XHJcbiAgICBkb2N1bWVudC5jb29raWUgPSBjbmFtZSArIFwiPVwiICsgY3ZhbHVlICsgXCI7XCIgKyBleHBpcmVzICsgXCI7cGF0aD0vXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb29raWUoY25hbWUpIHtcclxuICAgIHZhciBuYW1lID0gY25hbWUgKyBcIj1cIjtcclxuICAgIHZhciBjYSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjtcIik7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGMgPSBjYVtpXTtcclxuICAgICAgICB3aGlsZSAoYy5jaGFyQXQoMCkgPT09IFwiIFwiKSB7XHJcbiAgICAgICAgICAgIGMgPSBjLnN1YnN0cmluZygxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGMuaW5kZXhPZihuYW1lKSA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYy5zdWJzdHJpbmcobmFtZS5sZW5ndGgsIGMubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXCJcIjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrQ29va2llKCkge1xyXG4gICAgdmFyIHVzZXIgPSBnZXRDb29raWUoXCJ1c2VybmFtZVwiKTtcclxuICAgIGlmICh1c2VyICE9PSBcIlwiKSB7XHJcbiAgICAgICAgYWxlcnQoXCJXZWxjb21lIGFnYWluIFwiICsgdXNlcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHVzZXIgPSBwcm9tcHQoXCJQbGVhc2UgZW50ZXIgeW91ciBuYW1lOlwiLCBcIlwiKTtcclxuICAgICAgICBpZiAodXNlciAhPSBcIlwiICYmIHVzZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzZXRDb29raWUoXCJ1c2VybmFtZVwiLCB1c2VyLCAzNjUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gc21vb3RoU2Nyb2xsKGVsbSwgZHVyLCBvZmZzZXQpIHtcclxuICAgIGNvbnN0IHBhZ2VZID0gd2luZG93LnBhZ2VZT2Zmc2V0LFxyXG4gICAgICAgIGJvZHlIZWlnaHQgPSBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCxcclxuICAgICAgICB7IGlubmVySGVpZ2h0IH0gPSB3aW5kb3csXHJcbiAgICAgICAgc3RhcnRpbmdZID0gcGFnZVkgKyBvZmZzZXQsXHJcbiAgICAgICAgZWxlbWVudFkgPSBwYWdlWSArIGVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AsXHJcbiAgICAgICAgdGFyZ2V0WSA9IGJvZHlIZWlnaHQgLSBlbGVtZW50WSA8IGlubmVySGVpZ2h0ID8gYm9keUhlaWdodCAtIGlubmVySGVpZ2h0IDogZWxlbWVudFksXHJcbiAgICAgICAgZGlmZiA9IHRhcmdldFkgLSBzdGFydGluZ1ksXHJcbiAgICAgICAgZWFzaW5nID0gKHQpID0+ICh0IDwgMC41ID8gNCAqIHQgKiB0ICogdCA6ICh0IC0gMSkgKiAoMiAqIHQgLSAyKSAqICgyICogdCAtIDIpICsgMSk7XHJcbiAgICBsZXQgc3RhcnQ7XHJcblxyXG4gICAgaWYgKCFkaWZmKSByZXR1cm47XHJcblxyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiBzdGVwKHRpbWVzdGFtcCkge1xyXG4gICAgICAgIGlmICghc3RhcnQpIHN0YXJ0ID0gdGltZXN0YW1wO1xyXG5cclxuICAgICAgICBjb25zdCB0aW1lID0gdGltZXN0YW1wIC0gc3RhcnQ7XHJcbiAgICAgICAgbGV0IHBlcmNlbnQgPSBNYXRoLm1pbih0aW1lIC8gZHVyLCAxKTtcclxuXHJcbiAgICAgICAgcGVyY2VudCA9IGVhc2luZyhwZXJjZW50KTtcclxuXHJcbiAgICAgICAgY29uc3QgZW5kID0gc3RhcnRpbmdZICsgZGlmZiAqIHBlcmNlbnQgLSBvZmZzZXQ7XHJcblxyXG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBlbmQpO1xyXG5cclxuICAgICAgICBpZiAodGltZSA8IGR1cikgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcclxuICAgIH0pO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJnZXQiLCJpdGVtQ291bnQiLCJjYXJ0Q291bnQiLCJkb2N1bWVudCIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJpbm5lckhUTUwiLCJpdGVtX2NvdW50IiwiYm9keVNjcm9sbExvY2siLCJvcGVuTW9kYWwiLCJlbGVtZW50Iiwib3BlblRyaWdnZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImNsYXNzTGlzdCIsImFkZCIsImNsb3NlTW9kYWwiLCJjbG9zZVRyaWdnZXIiLCJyZW1vdmUiLCJvdmVybGF5IiwicXVlcnlTZWxlY3RvciIsInJlbGVhc2UiLCJjb25zb2xlIiwibG9nIiwic3R5bGUiLCJvdmVyZmxvd1kiLCJzZXJpYWxpemVGb3JtIiwiZmV0Y2hDb25maWciLCJRdWFudGl0eSIsIlN1Ym1pdEJ0biIsIlZhcmlhbnQiLCJBZGRUb0NhcnQiLCJjb25zdHJ1Y3RvciIsImZldGNoTmV3Q2FydCIsInRleHQiLCJodG1sIiwicmVuZGVyQ2FydCIsImNhdGNoIiwiZXJyIiwid2FybiIsInN1Ym1pdCIsImNhcnRUcmlnZ2VyIiwibWluaUNhcnQiLCJiaW5kRXZlbnRzIiwib25TdWJtaXRIYW5kbGVyIiwic2V0QXR0cmlidXRlIiwic3VibWl0RGF0YSIsInByaV9wcm9kdWN0IiwiZW5hYmxlX3ByaW1lIiwicHJpbWVfaWQiLCJnZXRBdHRyaWJ1dGUiLCJpdGVtcyIsImZvckVhY2giLCJpdGVtIiwidmFyaWFudF9pZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicGFyc2UiLCJzZWN0aW9uc191cmwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwiZm9ybV90eXBlIiwiaWQiLCJxdWFudGl0eSIsInV0ZjgiLCJyb3V0ZXMiLCJjYXJ0X2FkZF91cmwiLCJmaW5hbGx5IiwiZmV0Y2hDYXJ0IiwiZSIsImVycm9yIiwicmVtb3ZlQXR0cmlidXRlIiwiaW5pdENhcnQiLCJjYXJ0IiwicGFyc2VyIiwiRE9NUGFyc2VyIiwiZG9jIiwicGFyc2VGcm9tU3RyaW5nIiwiY2FydEl0ZW1zIiwiY2xpY2siLCJnZXRBbGwiLCJzZXRDb29raWUiLCJnZXRDb29raWUiLCJRdWlja0xpbmtzIiwiUHJvZHVjdENvbnRyb2xsZXIiLCJQcm9kdWN0IiwiSFRNTEVsZW1lbnQiLCJoYXNDaGlsZE5vZGVzIiwicHJvZHVjdCIsImFkZFRvQ2FydEZvcm0iLCJ2YXJpYW50RHJvcCIsInZhcmlhbnRTZWxlY3RzIiwicXVhbnRpdHlTZWxlY3QiLCJwcmljZXMiLCJwcmljZVZhdCIsInJldHVyblRvU2VhcmNoIiwic3dhdGNoTGFiZWwiLCJhY2NvcmRpb25zIiwidmlkZW9tb2RhbEJ0biIsImNsb3NldmlkZW9CdG4iLCJjbG9zZXZpZGVvQnRuMSIsImN1c3RvbWl6ZUJ0biIsInN1Ym1pdEJ0biIsInNoaXBJbmZvQnRuIiwiY2xvc2VTaGlwQnRuIiwiZ2lmdEJ1dHRvbnMiLCJjaGVja01vYmlsZUNUQSIsImZvb3RlckRpdiIsImNyZWF0ZUVsZW1lbnQiLCJtb2JpbGVDVEEiLCJhcHBlbmRDaGlsZCIsInZhcmlhbnRTZWxlY3QiLCJkaXNwbGF5IiwiY3VzdG9tQnRuIiwiY291bnQiLCJmb3JtRGF0YSIsInRpdGxlIiwiTnVtYmVyIiwiY3VzdG9taXplT2JqIiwiZm9udCIsIm1ldGhvZCIsImhlYWRlcnMiLCJidXR0b24iLCJjb250YWlucyIsImdfYnV0dG9uIiwicHJvZHVjdF9oYW5kbGUiLCJkYXRhc2V0IiwiaGFuZGxlIiwicHJvZHVjdENvbXBvbmVudCIsImltYWdlX2NvdW50IiwibWFpbkltZ3MiLCJ0aHVtYkltZ3MiLCJsZW5ndGgiLCJwaWMiLCJ0aHVtYnN3aXBlciIsIlN3aXBlciIsInNsaWRlc1BlclZpZXciLCJzcGFjZUJldHdlZW4iLCJjZW50ZXJlZFNsaWRlcyIsImxvb3AiLCJzbGlkZVRvQ2xpY2tlZFNsaWRlIiwibWFpbnN3aXBlciIsImxvb3BlZFNsaWRlcyIsIm5hdmlnYXRpb24iLCJuZXh0RWwiLCJwcmV2RWwiLCJjb250cm9sbGVyIiwiY29udHJvbCIsImJhY2tUb1NlYXJjaCIsImV2ZW50QWNjb3JkaW9uIiwiZXZlbnRWYXJpYW50cyIsImV2ZW50UXVhbnRpdHkiLCJldmVudEN1c3RvbWl6ZSIsImV2ZW50c2hpcE1vZGFsIiwiZXZlbnR2aWRlb01vZGFsIiwiZXZlbnRNdWx0aVZhcmlhbnRzIiwidmFyaWFudFRleHQiLCJ2YXJpYW50IiwiZGF0YV9wb3N0aW9uIiwiaW5jbHVkZXMiLCJ2aWRlb01vZGFsQ29udGVudCIsInZpZGVvaWZyYW1lIiwic3JjIiwiaWZyYW1lU3JjIiwiY29udGVudFdpbmRvdyIsInBvc3RNZXNzYWdlIiwiY3VzdG9taXplTW9kYWwiLCJjbG9zZUJ0bnMiLCJyZW5kZXJTdGVwSHRtbCIsImV2ZW50U3RlcHMiLCJzdGVwMiIsInN0aWN5YnV0dG9uIiwic2hpcEluZm9Nb2RhbCIsInNlbGVjdGVkVmFyaWFudCIsInZhcmlhbnRJbnB1dCIsInZhbHVlIiwicHJvZHVjdF90aXRsZSIsInByb2RpY3RfcHJpY2UiLCJwcmljZSIsImVuZ3JhdmluZ19wcmljZSIsInZhcmlhbnRzIiwicF92YXJpYW50IiwiZm9ybWF0UHJpY2UiLCJvcHRpb25fY29sb3IiLCJjdXN0b21fY29sb3IiLCJwcm9kdWN0X29wdGlvbnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwicHJvZHVjdF9vcHRpb24iLCJ0b1N0cmluZyIsImN1c3RvbWl6ZUltZyIsImZlYXR1cmVkX2ltYWdlIiwiY3VzdG9tX2FsdCIsInJlcGxhY2UiLCJ0b0xvd2VyQ2FzZSIsIm1lZGlhIiwiYWx0IiwiY29udGVudCIsImNoZWNrb3V0QnRuIiwiZm9udEl0ZW1zIiwiY3VzdG9taXplSW5wdXQiLCJzdGVwMkJ0biIsImZvbnREcm9wMSIsImZvbnRDb250ZW50IiwiZm9udERyb3AyIiwic2NyZWVuIiwid2lkdGgiLCJ0YXJnZXQiLCJNQVhfV0lEVEgiLCJNQVhfRk9OVF9TSVpFIiwiTUlOX0ZPTlRfU0laRSIsImZvbnRfb2JqZWN0IiwicHJkX2RlX21heF9zaXplIiwicHJkX2RlX21pbl9zaXplIiwicHJkX21iX21heF9zaXplIiwicHJkX21iX21pbl9zaXplIiwiZGVza19tYXhfd2lkdGgiLCJtYl9tYXhfd2lkdGgiLCJlbCIsImN1c3RvbWl6ZVRleHQiLCJwYXJzZUludCIsImZvbnRTaXplIiwic2Nyb2xsV2lkdGgiLCJudW1DaGFycyIsImlzQ2hlY2tvdXRCdG4iLCJybUl0ZW0iLCJwcmV2aWV3Rm9udCIsInJlc3VsdCIsInBsdXNCdG4iLCJtaW51c0J0biIsImlucHV0IiwiaW5wdXRWYWx1ZSIsInNlbGVjdCIsIm9wdGlvbl9wb3MiLCJybVBvcyIsInJlbmRlckltYWdlcyIsInBhcmVudEVsZW1lbnQiLCJhcHBlbmRUZXh0Iiwib2JqIiwicHVzaCIsImluZGV4IiwidmFyaWFudElkIiwidXBkYXRlUHJvZHVjdFByaWNlIiwidmFyaWFudFVybCIsInVwZGF0ZVdpbmRvd0xvY2F0aW9uU2VhcmNoIiwiY2hvaWNlcyIsInVybCIsImhyZWYiLCJzZWFyY2giLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwiYXZhaWxhYmxlIiwiZGlzYWJsZWQiLCJjb21wYXJlX2F0X3ByaWNlIiwicHJpY2VFbGVtZW50Iiwib3B0aW9uMiIsIm9wdGlvbkxhYmVsIiwiZ2FsbGVyeSIsIm1haW5JbWFnZSIsIm1haW5TbGlkZXIiLCJjbG9zZXN0Iiwic2xpZGVySW5kZXgiLCJzd2lwZXJTbGlkZUluZGV4Iiwic2xpZGVUbyIsImFjY29yZGlvbiIsImhlYWRlciIsInVwZGF0ZVByaWNlIiwiaXNHaWZ0QnVuZGxlIiwib3B0aW9uMSIsImFjdGl2ZUlkeCIsImFjdGl2ZVRodW1iaWR4IiwiZGVzdHJveSIsInZhcmlhbnRTZWxlY3RlZCIsIm9wdGlvbnMiLCJzZWxlY3RlZEluZGV4IiwicXR5U2VsZWN0ZWQiLCJ2YXJpYW50UHJpY2UiLCJxdHlQcmljZSIsInRvdGFsUHJpY2UiLCJ2YXRQcmljZSIsInRoZW1lIiwidGF4IiwidG90YWwiLCJJbnRsIiwiTnVtYmVyRm9ybWF0IiwiU2hvcGlmeSIsImxvY2FsZSIsImN1cnJlbmN5IiwiYWN0aXZlIiwidXNlR3JvdXBpbmciLCJtaW5pbXVtRnJhY3Rpb25EaWdpdHMiLCJmb3JtYXQiLCJzZWFyY2hDb29raWUiLCJyZW1vdmVDb29raWUiLCJzbW9vdGhTY3JvbGwiLCJxdWlja0xpbmtzIiwiaGVhZGVySGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0IiwiaGFuZGxlQ2xpY2siLCJsaW5rIiwib2Zmc2V0IiwiZHVyYXRpb24iLCJlbEh0bWwiLCJwcmV2aW91c0h0bWxTdHlsZXMiLCJsb2NrIiwiaHRtbFN0eWxlIiwibWluSGVpZ2h0IiwibWF4SGVpZ2h0IiwiT2JqZWN0IiwiYXNzaWduIiwiY25hbWUiLCJjdmFsdWUiLCJleGRheXMiLCJkIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwiZXhwaXJlcyIsInRvVVRDU3RyaW5nIiwiY29va2llIiwibmFtZSIsImNhIiwic3BsaXQiLCJpIiwiYyIsImNoYXJBdCIsInN1YnN0cmluZyIsImluZGV4T2YiLCJjaGVja0Nvb2tpZSIsInVzZXIiLCJhbGVydCIsInByb21wdCIsImVsbSIsImR1ciIsInBhZ2VZIiwicGFnZVlPZmZzZXQiLCJib2R5SGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJzdGFydGluZ1kiLCJlbGVtZW50WSIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsInRhcmdldFkiLCJkaWZmIiwiZWFzaW5nIiwidCIsInN0YXJ0IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic3RlcCIsInRpbWVzdGFtcCIsInRpbWUiLCJwZXJjZW50IiwiTWF0aCIsIm1pbiIsImVuZCIsInNjcm9sbFRvIl0sInNvdXJjZVJvb3QiOiIifQ==