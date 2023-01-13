"use strict";
(self["webpackChunkjuno_shopify_template"] = self["webpackChunkjuno_shopify_template"] || []).push([["collection-page"],{

/***/ "./src/assets/js/main/collection/Collection.js":
/*!*****************************************************!*\
  !*** ./src/assets/js/main/collection/Collection.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Collection": () => (/* binding */ Collection)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/body-scroll-lock.ts");
/* harmony import */ var _product_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../product-card */ "./src/assets/js/main/product-card/index.js");
 //import ReadMore from "./Readmore.js";
// import AddToCart from "../product/AddToCart.js";
//import ProductCardQty from "../product/CardQty";



class Collection extends HTMLElement {
  constructor() {
    super();
    this.element = this;
    this.filter_url = '';
    this.page = 1;
    this.collection_url = this.element.getAttribute('data-value');
    this.readMore = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-read-more", document);
    this.addToCartForms = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)(".js-product-form", this.element);
    this.filtersOpen = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-filter-toggle ", this.element);
    this.filtersClose = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-filter-close ", this.element);
    this.filters = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)("collection-filters ", this.element);
    this.sortBy = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-sort-by", this.element);
    this.sortValue = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.js-sort-by-value', this.element);
    this.sortList = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.js-sort-list', this.element);
    this.sortByMobile = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-sort-by-mobile", this.element);
    this.sortValueMobile = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.js-sort-by-value-mobile', this.element);
    this.sortListMobile = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.js-sort-list-mobile', this.element);
    this.sortByItems = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)('.js-sort-item', this.element);
    this.sortByItemsMobile = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)('.js-sort-item-mobile', this.element);
    this.collectionGrid = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('#collection-grid', this.element);
    this.filterBtn = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.js-filter-btn', this.element);
    this.filterModal = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.js-filter-modal', this.element); // this.filterModalBg = get('.js-filter-modal--bg', this.element);

    this.filterCloseBtn = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.js-filter-close', this.element);
    this.filterTitleBtn = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)('.js-filter-title', this.element);
    this.filterContents = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)('.js-filter-content', this.element);
    this.filters = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)('.js-filter-item', this.element);
    this.filterRemoveBtns = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)('.remove-btn', this.element);
    this.resetFilterBtn = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.js-filter-reset-btn', this.element);
    this.searchInput = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.js-search-input', this.element);
    this.searchBtn = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.js-search-btn', this.element);
    this.bindEvents();
  }

  bindEvents() {
    this.initFilters();
    this.eventPagination();
    this.sortByChange();
    this.sortByChangeMobile();
    this.eventFilterButton();
    this.eventPriceRange();

    if (this.searchBtn) {
      this.searchBtn.addEventListener('click', e => {
        e.preventDefault();
        window.location.href = `/search?type=product&q=${this.searchInput.value}`;
      });
      this.searchInput.addEventListener('keypress', e => {
        if (e.keyCode == 13) {
          window.location.href = `/search?type=product&q=${this.searchInput.value}`;
        }
      });
    }
  }

  eventPriceRange() {
    const rangeInput = document.querySelectorAll(".js-filter-content .range-input input"),
          priceInput = document.querySelectorAll(".js-filter-content .price-input input"),
          range = document.querySelector(".js-filter-content .slider .progress");
    let priceGap = 10;
    let gtePrice = 0,
        ltePrice = 0;
    priceInput.forEach(input => {
      input.addEventListener("input", e => {
        let minPrice = parseInt(priceInput[0].value),
            maxPrice = parseInt(priceInput[1].value);

        if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
          if (e.target.className === "input-min") {
            rangeInput[0].value = minPrice;
            range.style.left = minPrice / rangeInput[0].max * 100 + "%";
            gtePrice = minPrice * 100;
            ltePrice = maxPrice * 100;
          } else {
            rangeInput[1].value = maxPrice;
            range.style.right = 100 - maxPrice / rangeInput[1].max * 100 + "%";
            gtePrice = minPrice * 100;
            ltePrice = maxPrice * 100;
          }
        }
      });
      input.addEventListener('change', e => {
        this.updatePriceFilter(gtePrice, ltePrice);
      });
    });
    rangeInput.forEach(input => {
      input.addEventListener("input", e => {
        let minVal = parseInt(rangeInput[0].value),
            maxVal = parseInt(rangeInput[1].value);

        if (maxVal - minVal < priceGap) {
          if (e.target.className === "range-min") {
            rangeInput[0].value = maxVal - priceGap;
          } else {
            rangeInput[1].value = minVal + priceGap;
          }

          gtePrice = (maxVal - priceGap) * 100;
          ltePrice = (minVal + priceGap) * 100;
        } else {
          priceInput[0].value = minVal;
          priceInput[1].value = maxVal;
          range.style.left = minVal / rangeInput[0].max * 100 + "%";
          range.style.right = 100 - maxVal / rangeInput[1].max * 100 + "%";
          gtePrice = minVal * 100;
          ltePrice = maxVal * 100;
        }
      });
      input.addEventListener('change', e => {
        this.updatePriceFilter(gtePrice, ltePrice);
      });
    });
  }

  updatePriceFilter(min, max) {
    const priceArr = [{
      key: 'filter.v.price.gte',
      value: min / 100
    }, {
      key: 'filter.v.price.lte',
      value: max / 100
    }];
    let url = window.location.href.split('?')[1];
    let result = '';
    priceArr.forEach(item => {
      const param = item.key;
      const value = item.value;
      let isExist = false;

      if (url && url != '') {
        url = url.replaceAll('%20&%20', '%20##%20');
        const strs = url.split('&');
        strs.forEach(str => {
          if (str != '') {
            const key = str.split('=')[0];
            const data = str.split('=')[1].replaceAll(/ /g, '%20').replaceAll('##', '&');

            if (key.includes('filter.v.price')) {
              if (key == param) {
                result += `${key}=${value}&`;
                isExist = true;
              }
            } else if (!result.includes(key) && key != 'page') {
              result += `${key}=${data}&`;
            }
          }
        });
      }

      if (!isExist) {
        result += `${param}=${value}&`;
      }
    });
    this.filter_url = result;
    this.getProducts();
  }

  initFilters() {
    let url = window.location.href.split('?')[1];

    if (url && url != '') {
      url = url.replaceAll('%20&%20', '%20##%20');
      const strs = url.split('&');
      strs.forEach(str => {
        if (str != '') {
          if (str.includes('filter.v.price')) {
            const key = str.split('=')[0];
            const value = str.split('=')[1];
            const rangeInput = document.querySelectorAll(".js-filter-content .range-input input"),
                  priceInput = document.querySelectorAll(".js-filter-content .price-input input"),
                  range = document.querySelector(".js-filter-content .slider .progress");
            rangeInput.forEach(input => {
              const param = input.getAttribute('data-key');

              if (param == key) {
                input.value = Number(value * 0.01);

                if (key.includes('gte')) {
                  range.style.left = input.value / rangeInput[0].max * 100 + "%";
                } else {
                  range.style.right = 100 - input.value / rangeInput[1].max * 100 + "%";
                }
              }
            });
            priceInput.forEach(input => {
              const param = input.getAttribute('data-key');

              if (param == key) {
                input.value = Number(value * 0.01);
              }
            });
            this.filterTitleBtn.forEach(item => {
              if (item.getAttribute('data-value') == 'Price') {
                item.classList.add('active');
              }
            });
            this.filterContents.forEach(item => {
              if (item.getAttribute('data-label') == 'Price') {
                item.classList.add('active');
              }
            });
          } else {
            const key = str.split('=')[0];
            const value = str.split('=')[1];
            this.filters.forEach(filter => {
              const filter_key = filter.getAttribute('data-key');
              const filter_value = filter.getAttribute('data-value').replaceAll(/ /g, '%20').replaceAll('&', '##');

              if (filter_key == key && filter_value == value) {
                filter.classList.add('active');
                const filterTitle = filter.parentNode.parentNode.parentNode.querySelector('.js-filter-title');
                const filterContent = filter.parentNode.parentNode.parentNode.querySelector('.js-filter-content');

                if (filterTitle) {
                  filterTitle.classList.add('active');
                }

                if (filterContent) {
                  filterContent.classList.add('active');
                }
              }
            });
          }
        }
      });
    }
  }

  slideUp(target, duration = 500) {
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.style.display = 'none';
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property'); //alert("!");
    }, duration);
  }

  slideDown(target, duration = 500) {
    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;
    if (display === 'none') display = 'block';
    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
    }, duration);
  }

  slideToggle(target, duration = 500) {
    if (window.getComputedStyle(target).display === 'none') {
      this.slideDown(target, duration);
    } else {
      this.slideUp(target, duration);
    }
  }

  eventFilterButton() {
    // this.filterCloseBtn.addEventListener('click', (e) => {
    //     this.filterModal.classList.remove('is-active');
    //     // this.filterModalBg.classList.remove('is-active');
    // });
    this.filterBtn.addEventListener('click', e => {
      e.preventDefault();

      if (this.filterBtn.classList.contains('is-active')) {
        this.filterBtn.classList.remove('is-active');
      } else {
        this.filterBtn.classList.add('is-active');
      }

      this.slideToggle(this.filterModal, 500); // this.filterModalBg.classList.add('is-active');
    }); // this.filterModalBg.addEventListener('click', (e) => {
    //     this.filterModal.classList.remove('is-active');
    //     this.filterModalBg.classList.remove('is-active');
    // });

    if (this.resetFilterBtn) {
      this.resetFilterBtn.addEventListener('click', e => {
        let url = window.location.href.split('?')[1];
        let result = '';

        if (url && url != '') {
          const strs = url.split('&');
          strs.forEach(str => {
            if (str != '') {
              const key = str.split('=')[0];
              const data = str.split('=')[1];

              if (str.includes('filter.v.price')) {
                const rangeInput = document.querySelectorAll(".js-filter-content .range-input input"),
                      priceInput = document.querySelectorAll(".js-filter-content .price-input input"),
                      range = document.querySelector(".js-filter-content .slider .progress");
                rangeInput.forEach(input => {
                  const param = input.getAttribute('data-key');

                  if (param == key) {
                    if (key.includes('gte')) {
                      input.value = rangeInput[0].min;
                      range.style.left = rangeInput[0].min / rangeInput[0].max * 100 + "%";
                    } else {
                      input.value = rangeInput[0].max;
                      range.style.right = 100 - rangeInput[0].max / rangeInput[1].max * 100 + "%";
                    }
                  }
                });
                priceInput.forEach(input => {
                  const param = input.getAttribute('data-key');

                  if (param == key) {
                    if (key.includes('gte')) {
                      input.value = 0;
                    } else {
                      input.value = rangeInput[0].max;
                    }
                  }
                });
              }

              if (key == 'page' || key == 'sort_by') {
                result += `${key}=${data}&`;
              }
            }

            ;
          });
        }

        this.filter_url = result;
        this.getProducts();
        this.removeClassFilters();
      });
    }

    this.filterTitleBtn.forEach(button => {
      button.addEventListener('click', e => {
        const value = button.getAttribute('data-value');
        this.filterContents.forEach(content => {
          const label = content.getAttribute('data-label');

          if (value == label) {
            if (content.classList.contains('active')) {
              content.classList.remove('active');
              button.classList.remove('active');
            } else {
              content.classList.add('active');
              button.classList.add('active');
            }
          }
        });
      });
    });
    this.filters.forEach(filter => {
      filter.addEventListener('click', e => {
        const value = filter.getAttribute('data-value');
        const param = filter.getAttribute('data-key');
        const exchange_value = value.replaceAll(/ /g, '%20').replaceAll('&', '##');
        let addFilter = false;

        if (filter.classList.contains('active')) {
          filter.classList.remove('active');
          addFilter = false;
        } else {
          filter.classList.add('active');
          addFilter = true;
        }

        let url = window.location.href.split('?')[1];
        let result = '',
            isExist = false;

        if (url && url != '') {
          url = url.replaceAll('%20&%20', '%20##%20');
          const strs = url.split('&');
          strs.forEach(str => {
            if (str != '') {
              const key = str.split('=')[0];
              const data = str.split('=')[1];

              if (key == param && exchange_value == data) {
                isExist = true;
              } else if (key != 'page') {
                result += `${key}=${data}&`;
              }
            }
          });
        }

        if (!isExist && addFilter) {
          result += `${param}=${value}&`;
        }

        this.filter_url = result.replaceAll('##', '&');
        this.getProducts();
      });
    });
    this.filterRemoveBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const label = btn.getAttribute('data-label');

        if (label == 'Price') {
          let url = window.location.href.split('?')[1];
          let result = '',
              isExist = false;

          if (url && url != '') {
            const strs = url.split('&');
            strs.forEach(str => {
              if (str != '') {
                const key = str.split('=')[0];
                const data = str.split('=')[1];

                if (str.includes('filter.v.price')) {
                  const rangeInput = document.querySelectorAll(".js-filter-content .range-input input"),
                        priceInput = document.querySelectorAll(".js-filter-content .price-input input"),
                        range = document.querySelector(".js-filter-content .slider .progress");
                  rangeInput.forEach(input => {
                    const param = input.getAttribute('data-key');

                    if (param == key) {
                      if (key.includes('gte')) {
                        input.value = rangeInput[0].min;
                        range.style.left = rangeInput[0].min / rangeInput[0].max * 100 + "%";
                      } else {
                        input.value = rangeInput[0].max;
                        range.style.right = 100 - rangeInput[0].max / rangeInput[0].max * 100 + "%";
                      }
                    }
                  });
                  priceInput.forEach(input => {
                    const param = input.getAttribute('data-key');

                    if (param == key) {
                      if (key.includes('gte')) {
                        input.value = 0;
                      } else {
                        input.value = rangeInput[0].max;
                      }
                    }
                  });
                } else {
                  result += `${key}=${data}&`;
                }
              }

              ;
            });
          }

          this.filter_url = result;
          this.getProducts();
        } else {
          this.filters.forEach(filter => {
            const filter_label = filter.getAttribute('data-label');

            if (filter_label == label) {
              const value = filter.getAttribute('data-value');
              const param = filter.getAttribute('data-key');
              const exchange_value = value.replaceAll(/ /g, '%20').replaceAll('&', '##');
              filter.classList.remove('active');
              let url = window.location.href.split('?')[1];
              let result = '',
                  isExist = false;

              if (url && url != '') {
                url = url.replaceAll('%20&%20', '%20##%20');
                const strs = url.split('&');
                strs.forEach(str => {
                  if (str != '') {
                    const key = str.split('=')[0];
                    const data = str.split('=')[1];

                    if (key == param && exchange_value == data) {
                      isExist = true;
                    } else if (key != 'page') {
                      result += `${key}=${data}&`;
                    }
                  }
                });
              }

              if (isExist) {
                this.filter_url = result.replaceAll('##', '&');
                this.getProducts();
              }
            }
          });
        }
      });
    });
  }

  removeClassFilters() {
    this.filters.forEach(filter => {
      filter.classList.remove('active');
    });
  }

  initAddToCartButtons() {// this.addToCartForms.forEach((form) => new AddToCart(form));
  }

  mobileNav() {
    this.filtersOpen.addEventListener("click", event => {
      event.preventDefault();
      this.filters.classList.add("is-active");
      this.filtersClose.classList.add("is-active");
      _utils__WEBPACK_IMPORTED_MODULE_1__.lock();
    });
    this.filtersClose.addEventListener("click", () => {
      this.filters.classList.remove("is-active");
      this.filtersClose.classList.remove("is-active");
      _utils__WEBPACK_IMPORTED_MODULE_1__.release();
      document.querySelector('body').style.overflowY = "auto";
    });
  }

  eventPagination() {
    this.pageBtns = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)('.js-page-link', this.element);
    this.pageBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();

        if (btn.classList.contains('c-pagination__link--ends')) {
          const button_type = btn.getAttribute('data-button');

          if (button_type == 'prev') {
            if (this.page != 1) {
              this.page -= 1;
            }
          } else {
            this.page += 1;
          }

          const obj = {
            type: 'page',
            value: this.page
          };
          this.renderSortAndPage(obj);
        } else {
          const button_value = btn.getAttribute('data-button');
          this.page = Number(button_value);
          const obj = {
            type: 'page',
            value: this.page
          };
          this.renderSortAndPage(obj);
        }
      });
    });
  }

  sortByChange() {
    this.sortBy.addEventListener('click', e => {
      e.preventDefault();

      if (this.sortList.classList.contains('hidden')) {
        this.sortList.classList.remove('hidden');
        this.sortBy.classList.add('active');
      } else {
        this.sortList.classList.add('hidden');
        this.sortBy.classList.remove('active');
      }
    });
    this.sortByItems.forEach(item => {
      item.addEventListener('click', e => {
        this.sortValue.innerHTML = item.getAttribute('value');
        this.sortList.classList.add('hidden');
        this.sortBy.classList.remove('active');
        var obj = {
          type: 'sort_by',
          value: item.getAttribute('value')
        };
        this.renderSortAndPage(obj);
      });
    });
  }

  sortByChangeMobile() {
    this.sortByMobile.addEventListener('click', e => {
      e.preventDefault();

      if (this.sortListMobile.classList.contains('hidden')) {
        this.sortListMobile.classList.remove('hidden');
        this.sortByMobile.classList.add('active');
      } else {
        this.sortListMobile.classList.add('hidden');
        this.sortByMobile.classList.remove('active');
      }
    });
    this.sortByItemsMobile.forEach(item => {
      item.addEventListener('click', e => {
        this.sortValueMobile.innerHTML = item.getAttribute('value');
        this.sortListMobile.classList.add('hidden');
        this.sortByMobile.classList.remove('active');
        var obj = {
          type: 'sort_by',
          value: item.getAttribute('value')
        };
        this.renderSortAndPage(obj);
      });
    });
  }

  renderSortAndPage(data) {
    let values = data;

    if (values == null) {
      values = {
        type: '',
        value: ''
      };
    }

    let result = '';
    let isExist = false;
    const url = window.location.href.split('?')[1];

    if (url) {
      const filters = url.split('&');
      filters.forEach(filter => {
        const key = filter.split('=')[0];
        const value = filter.split('=')[1];

        if (key == data.type) {
          result += `${key}=${data.value}&`;
          isExist = true;
        } else if (key != '') {
          result += `${key}=${value}&`;
        }
      });
    }

    if (!isExist) {
      result += `${values.type}=${values.value}`;
    }

    this.filter_url = result;
    this.getProducts();
  }

  getProducts() {
    this.updateWindowsUrl();
    let url = '';

    if (this.filter_url.charAt(this.filter_url.length - 1) == '&') {
      url = `${this.collection_url}?${this.filter_url}view=ajax`;
    } else {
      url = `${this.collection_url}?${this.filter_url}&view=ajax`;
    }

    fetch(url).then(response => response.text()).then(html => {
      this.collectionGrid.innerHTML = '';
      this.collectionGrid.innerHTML = html;
      const productCards = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)('.js-product-card', document);
      productCards.forEach(card => {
        new _product_card__WEBPACK_IMPORTED_MODULE_2__["default"](card);
      });
      this.eventPagination();
    });
  }

  updateWindowsUrl() {
    window.history.pushState({}, '', `${this.collection_url}?${this.filter_url}`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQXhCO0FBRUEsSUFBSUMsa0JBQWtCLEdBQUcsRUFBekI7QUFFTyxTQUFTekIsSUFBVCxHQUFnQjtFQUNuQixNQUFNO0lBQUU3RCxLQUFLLEVBQUV1RjtFQUFULElBQXVCSCxNQUE3QjtFQUVBRSxrQkFBa0IsR0FBRztJQUNqQnZCLFNBQVMsRUFBRXdCLFNBQVMsQ0FBQ3hCLFNBREo7SUFFakJ5QixTQUFTLEVBQUVELFNBQVMsQ0FBQ0MsU0FGSjtJQUdqQkMsU0FBUyxFQUFFO0VBSE0sQ0FBckI7RUFNQUMsTUFBTSxDQUFDQyxNQUFQLENBQWNQLE1BQU0sQ0FBQ3BGLEtBQXJCLEVBQTRCO0lBQ3hCK0QsU0FBUyxFQUFFLFFBRGE7SUFFeEJ5QixTQUFTLEVBQUUsT0FGYTtJQUd4QkMsU0FBUyxFQUFFO0VBSGEsQ0FBNUI7QUFLSDtBQUVNLFNBQVMzQixPQUFULEdBQW1CO0VBQ3RCNEIsTUFBTSxDQUFDQyxNQUFQLENBQWNQLE1BQU0sQ0FBQ3BGLEtBQXJCLEVBQTRCc0Ysa0JBQTVCO0FBQ0giLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL21haW4vY29sbGVjdGlvbi9Db2xsZWN0aW9uLmpzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvdXRpbHMvYm9keS1zY3JvbGwtbG9jay50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXQsIGdldEFsbCwgYm9keVNjcm9sbExvY2sgfSBmcm9tIFwiQC91dGlsc1wiO1xyXG4vL2ltcG9ydCBSZWFkTW9yZSBmcm9tIFwiLi9SZWFkbW9yZS5qc1wiO1xyXG4vLyBpbXBvcnQgQWRkVG9DYXJ0IGZyb20gXCIuLi9wcm9kdWN0L0FkZFRvQ2FydC5qc1wiO1xyXG4vL2ltcG9ydCBQcm9kdWN0Q2FyZFF0eSBmcm9tIFwiLi4vcHJvZHVjdC9DYXJkUXR5XCI7XHJcblxyXG5pbXBvcnQgUHJvZHVjdENhcmQgZnJvbSAnLi4vcHJvZHVjdC1jYXJkJztcclxuXHJcbmNsYXNzIENvbGxlY3Rpb24gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJfdXJsID0gJyc7XHJcbiAgICAgICAgdGhpcy5wYWdlID0gMTtcclxuICAgICAgICB0aGlzLmNvbGxlY3Rpb25fdXJsID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpO1xyXG4gICAgICAgIHRoaXMucmVhZE1vcmUgPSBnZXQoXCIuanMtcmVhZC1tb3JlXCIsIGRvY3VtZW50KTtcclxuICAgICAgICB0aGlzLmFkZFRvQ2FydEZvcm1zID0gZ2V0QWxsKFwiLmpzLXByb2R1Y3QtZm9ybVwiLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVyc09wZW4gPSBnZXQoXCIuanMtZmlsdGVyLXRvZ2dsZSBcIiwgdGhpcy5lbGVtZW50KTtcclxuICAgICAgICB0aGlzLmZpbHRlcnNDbG9zZSA9IGdldChcIi5qcy1maWx0ZXItY2xvc2UgXCIsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJzID0gZ2V0KFwiY29sbGVjdGlvbi1maWx0ZXJzIFwiLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMuc29ydEJ5ID0gZ2V0KFwiLmpzLXNvcnQtYnlcIiwgdGhpcy5lbGVtZW50KTtcclxuICAgICAgICB0aGlzLnNvcnRWYWx1ZSA9IGdldCgnLmpzLXNvcnQtYnktdmFsdWUnLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMuc29ydExpc3QgPSBnZXQoJy5qcy1zb3J0LWxpc3QnLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMuc29ydEJ5TW9iaWxlID0gZ2V0KFwiLmpzLXNvcnQtYnktbW9iaWxlXCIsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5zb3J0VmFsdWVNb2JpbGUgPSBnZXQoJy5qcy1zb3J0LWJ5LXZhbHVlLW1vYmlsZScsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5zb3J0TGlzdE1vYmlsZSA9IGdldCgnLmpzLXNvcnQtbGlzdC1tb2JpbGUnLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMuc29ydEJ5SXRlbXMgPSBnZXRBbGwoJy5qcy1zb3J0LWl0ZW0nLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMuc29ydEJ5SXRlbXNNb2JpbGUgPSBnZXRBbGwoJy5qcy1zb3J0LWl0ZW0tbW9iaWxlJywgdGhpcy5lbGVtZW50KTtcclxuICAgICAgICB0aGlzLmNvbGxlY3Rpb25HcmlkID0gZ2V0KCcjY29sbGVjdGlvbi1ncmlkJywgdGhpcy5lbGVtZW50KTtcclxuICAgICAgICB0aGlzLmZpbHRlckJ0biA9IGdldCgnLmpzLWZpbHRlci1idG4nLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVyTW9kYWwgPSBnZXQoJy5qcy1maWx0ZXItbW9kYWwnLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgIC8vIHRoaXMuZmlsdGVyTW9kYWxCZyA9IGdldCgnLmpzLWZpbHRlci1tb2RhbC0tYmcnLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVyQ2xvc2VCdG4gPSBnZXQoJy5qcy1maWx0ZXItY2xvc2UnLCB0aGlzLmVsZW1lbnQpO1xyXG5cclxuICAgICAgICB0aGlzLmZpbHRlclRpdGxlQnRuID0gZ2V0QWxsKCcuanMtZmlsdGVyLXRpdGxlJywgdGhpcy5lbGVtZW50KTtcclxuICAgICAgICB0aGlzLmZpbHRlckNvbnRlbnRzID0gZ2V0QWxsKCcuanMtZmlsdGVyLWNvbnRlbnQnLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVycyA9IGdldEFsbCgnLmpzLWZpbHRlci1pdGVtJywgdGhpcy5lbGVtZW50KTtcclxuICAgICAgICB0aGlzLmZpbHRlclJlbW92ZUJ0bnMgPSBnZXRBbGwoJy5yZW1vdmUtYnRuJywgdGhpcy5lbGVtZW50KTtcclxuICAgICAgICB0aGlzLnJlc2V0RmlsdGVyQnRuID0gZ2V0KCcuanMtZmlsdGVyLXJlc2V0LWJ0bicsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hJbnB1dCA9IGdldCgnLmpzLXNlYXJjaC1pbnB1dCcsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hCdG4gPSBnZXQoJy5qcy1zZWFyY2gtYnRuJywgdGhpcy5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbiAgICB9XHJcbiAgICBiaW5kRXZlbnRzKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdEZpbHRlcnMoKTtcclxuICAgICAgICB0aGlzLmV2ZW50UGFnaW5hdGlvbigpO1xyXG4gICAgICAgIHRoaXMuc29ydEJ5Q2hhbmdlKCk7XHJcbiAgICAgICAgdGhpcy5zb3J0QnlDaGFuZ2VNb2JpbGUoKTtcclxuICAgICAgICB0aGlzLmV2ZW50RmlsdGVyQnV0dG9uKCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFByaWNlUmFuZ2UoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoQnRuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAvc2VhcmNoP3R5cGU9cHJvZHVjdCZxPSR7dGhpcy5zZWFyY2hJbnB1dC52YWx1ZX1gXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09IDEzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgL3NlYXJjaD90eXBlPXByb2R1Y3QmcT0ke3RoaXMuc2VhcmNoSW5wdXQudmFsdWV9YFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRQcmljZVJhbmdlICgpIHtcclxuICAgICAgICBjb25zdCByYW5nZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1maWx0ZXItY29udGVudCAucmFuZ2UtaW5wdXQgaW5wdXRcIiksXHJcbiAgICAgICAgcHJpY2VJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtZmlsdGVyLWNvbnRlbnQgLnByaWNlLWlucHV0IGlucHV0XCIpLFxyXG4gICAgICAgIHJhbmdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1maWx0ZXItY29udGVudCAuc2xpZGVyIC5wcm9ncmVzc1wiKTtcclxuXHJcbiAgICAgICAgbGV0IHByaWNlR2FwID0gMTA7XHJcbiAgICAgICAgbGV0IGd0ZVByaWNlID0gMCwgbHRlUHJpY2UgPSAwO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHByaWNlSW5wdXQuZm9yRWFjaChpbnB1dCA9PntcclxuICAgICAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGUgPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgbWluUHJpY2UgPSBwYXJzZUludChwcmljZUlucHV0WzBdLnZhbHVlKSxcclxuICAgICAgICAgICAgICAgIG1heFByaWNlID0gcGFyc2VJbnQocHJpY2VJbnB1dFsxXS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKChtYXhQcmljZSAtIG1pblByaWNlID49IHByaWNlR2FwKSAmJiBtYXhQcmljZSA8PSByYW5nZUlucHV0WzFdLm1heCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZS50YXJnZXQuY2xhc3NOYW1lID09PSBcImlucHV0LW1pblwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VJbnB1dFswXS52YWx1ZSA9IG1pblByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZS5zdHlsZS5sZWZ0ID0gKChtaW5QcmljZSAvIHJhbmdlSW5wdXRbMF0ubWF4KSAqIDEwMCkgKyBcIiVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3RlUHJpY2UgPSBtaW5QcmljZSAqIDEwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbHRlUHJpY2UgPSBtYXhQcmljZSAqIDEwMDtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VJbnB1dFsxXS52YWx1ZSA9IG1heFByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZS5zdHlsZS5yaWdodCA9IDEwMCAtIChtYXhQcmljZSAvIHJhbmdlSW5wdXRbMV0ubWF4KSAqIDEwMCArIFwiJVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBndGVQcmljZSA9IG1pblByaWNlICogMTAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsdGVQcmljZSA9IG1heFByaWNlICogMTAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQcmljZUZpbHRlcihndGVQcmljZSwgbHRlUHJpY2UpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJhbmdlSW5wdXQuZm9yRWFjaChpbnB1dCA9PntcclxuICAgICAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGUgPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgbWluVmFsID0gcGFyc2VJbnQocmFuZ2VJbnB1dFswXS52YWx1ZSksXHJcbiAgICAgICAgICAgICAgICBtYXhWYWwgPSBwYXJzZUludChyYW5nZUlucHV0WzFdLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmKChtYXhWYWwgLSBtaW5WYWwpIDwgcHJpY2VHYXApe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJyYW5nZS1taW5cIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlSW5wdXRbMF0udmFsdWUgPSBtYXhWYWwgLSBwcmljZUdhcFxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZUlucHV0WzFdLnZhbHVlID0gbWluVmFsICsgcHJpY2VHYXA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGd0ZVByaWNlID0gKG1heFZhbCAtIHByaWNlR2FwKSAqIDEwMDtcclxuICAgICAgICAgICAgICAgICAgICBsdGVQcmljZSA9IChtaW5WYWwgKyBwcmljZUdhcCkgKiAxMDA7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBwcmljZUlucHV0WzBdLnZhbHVlID0gbWluVmFsO1xyXG4gICAgICAgICAgICAgICAgICAgIHByaWNlSW5wdXRbMV0udmFsdWUgPSBtYXhWYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2Uuc3R5bGUubGVmdCA9ICgobWluVmFsIC8gcmFuZ2VJbnB1dFswXS5tYXgpICogMTAwKSArIFwiJVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlLnN0eWxlLnJpZ2h0ID0gMTAwIC0gKG1heFZhbCAvIHJhbmdlSW5wdXRbMV0ubWF4KSAqIDEwMCArIFwiJVwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBndGVQcmljZSA9IG1pblZhbCAqIDEwMDtcclxuICAgICAgICAgICAgICAgICAgICBsdGVQcmljZSA9IG1heFZhbCAqIDEwMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQcmljZUZpbHRlcihndGVQcmljZSwgbHRlUHJpY2UpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVByaWNlRmlsdGVyKG1pbiwgbWF4KSB7ICAgICAgICBcclxuICAgICAgICBjb25zdCBwcmljZUFyciA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAga2V5OiAnZmlsdGVyLnYucHJpY2UuZ3RlJyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBtaW4vMTAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGtleTogJ2ZpbHRlci52LnByaWNlLmx0ZScsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogbWF4LzEwMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJz8nKVsxXTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XHJcblxyXG4gICAgICAgIHByaWNlQXJyLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtID0gaXRlbS5rZXk7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gaXRlbS52YWx1ZTtcclxuICAgICAgICAgICAgbGV0IGlzRXhpc3QgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh1cmwgJiYgdXJsICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZUFsbCgnJTIwJiUyMCcsICclMjAjIyUyMCcpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RycyA9IHVybC5zcGxpdCgnJicpO1xyXG4gICAgICAgICAgICAgICAgc3Rycy5mb3JFYWNoKHN0ciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0ciAhPSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBzdHIuc3BsaXQoJz0nKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHN0ci5zcGxpdCgnPScpWzFdLnJlcGxhY2VBbGwoLyAvZywgJyUyMCcpLnJlcGxhY2VBbGwoJyMjJywgJyYnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkuaW5jbHVkZXMoJ2ZpbHRlci52LnByaWNlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gcGFyYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gYCR7a2V5fT0ke3ZhbHVlfSZgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRXhpc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFyZXN1bHQuaW5jbHVkZXMoa2V5KSAmJiBrZXkgIT0gJ3BhZ2UnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBgJHtrZXl9PSR7ZGF0YX0mYDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgaWYgKCFpc0V4aXN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gYCR7cGFyYW19PSR7dmFsdWV9JmA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5maWx0ZXJfdXJsID0gcmVzdWx0O1xyXG4gICAgICAgIHRoaXMuZ2V0UHJvZHVjdHMoKVxyXG4gICAgfVxyXG5cclxuICAgIGluaXRGaWx0ZXJzKCkge1xyXG4gICAgICAgIGxldCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnPycpWzFdO1xyXG4gICAgICAgIGlmICh1cmwgJiYgdXJsICE9ICcnKSB7XHJcbiAgICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlQWxsKCclMjAmJTIwJywgJyUyMCMjJTIwJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0cnMgPSB1cmwuc3BsaXQoJyYnKTtcclxuXHJcbiAgICAgICAgICAgIHN0cnMuZm9yRWFjaChzdHIgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0ciAhPSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHIuaW5jbHVkZXMoJ2ZpbHRlci52LnByaWNlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gc3RyLnNwbGl0KCc9JylbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gc3RyLnNwbGl0KCc9JylbMV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByYW5nZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1maWx0ZXItY29udGVudCAucmFuZ2UtaW5wdXQgaW5wdXRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmljZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1maWx0ZXItY29udGVudCAucHJpY2UtaW5wdXQgaW5wdXRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtZmlsdGVyLWNvbnRlbnQgLnNsaWRlciAucHJvZ3Jlc3NcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZUlucHV0LmZvckVhY2goaW5wdXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyYW0gPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEta2V5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW0gPT0ga2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBOdW1iZXIodmFsdWUgKiAwLjAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleS5pbmNsdWRlcygnZ3RlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2Uuc3R5bGUubGVmdCA9ICgoaW5wdXQudmFsdWUgLyByYW5nZUlucHV0WzBdLm1heCkgKiAxMDApICsgXCIlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2Uuc3R5bGUucmlnaHQgPSAoMTAwIC0gKGlucHV0LnZhbHVlIC8gcmFuZ2VJbnB1dFsxXS5tYXgpICogMTAwKSArIFwiJVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZUlucHV0LmZvckVhY2goaW5wdXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyYW0gPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEta2V5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW0gPT0ga2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBOdW1iZXIodmFsdWUgKiAwLjAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclRpdGxlQnRuLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnKSA9PSAnUHJpY2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlckNvbnRlbnRzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGFiZWwnKSA9PSAnUHJpY2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gc3RyLnNwbGl0KCc9JylbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gc3RyLnNwbGl0KCc9JylbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcnMuZm9yRWFjaChmaWx0ZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyX2tleSA9IGZpbHRlci5nZXRBdHRyaWJ1dGUoJ2RhdGEta2V5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJfdmFsdWUgPSBmaWx0ZXIuZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJykucmVwbGFjZUFsbCgvIC9nLCAnJTIwJykucmVwbGFjZUFsbCgnJicsJyMjJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcl9rZXkgPT0ga2V5ICYmIGZpbHRlcl92YWx1ZSA9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyVGl0bGUgPSBmaWx0ZXIucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLmpzLWZpbHRlci10aXRsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlckNvbnRlbnQgPSBmaWx0ZXIucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLmpzLWZpbHRlci1jb250ZW50Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJUaXRsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJUaXRsZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJDb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzbGlkZVVwKHRhcmdldCwgZHVyYXRpb249NTAwKSB7XHJcbiAgICAgICAgdGFyZ2V0LnN0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eSA9ICdoZWlnaHQsIG1hcmdpbiwgcGFkZGluZyc7XHJcbiAgICAgICAgdGFyZ2V0LnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGR1cmF0aW9uICsgJ21zJztcclxuICAgICAgICB0YXJnZXQuc3R5bGUuYm94U2l6aW5nID0gJ2JvcmRlci1ib3gnO1xyXG4gICAgICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSB0YXJnZXQub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICB0YXJnZXQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgIHRhcmdldC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG4gICAgICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSAwO1xyXG4gICAgICAgIHRhcmdldC5zdHlsZS5wYWRkaW5nVG9wID0gMDtcclxuICAgICAgICB0YXJnZXQuc3R5bGUucGFkZGluZ0JvdHRvbSA9IDA7XHJcbiAgICAgICAgdGFyZ2V0LnN0eWxlLm1hcmdpblRvcCA9IDA7XHJcbiAgICAgICAgdGFyZ2V0LnN0eWxlLm1hcmdpbkJvdHRvbSA9IDA7XHJcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoICgpID0+IHtcclxuICAgICAgICAgICAgICB0YXJnZXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2hlaWdodCcpO1xyXG4gICAgICAgICAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgncGFkZGluZy10b3AnKTtcclxuICAgICAgICAgICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3BhZGRpbmctYm90dG9tJyk7XHJcbiAgICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdtYXJnaW4tdG9wJyk7XHJcbiAgICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdtYXJnaW4tYm90dG9tJyk7XHJcbiAgICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdvdmVyZmxvdycpO1xyXG4gICAgICAgICAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNpdGlvbi1kdXJhdGlvbicpO1xyXG4gICAgICAgICAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNpdGlvbi1wcm9wZXJ0eScpO1xyXG4gICAgICAgICAgICAgIC8vYWxlcnQoXCIhXCIpO1xyXG4gICAgICAgIH0sIGR1cmF0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBzbGlkZURvd24odGFyZ2V0LCBkdXJhdGlvbj01MDApIHtcclxuICAgICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2Rpc3BsYXknKTtcclxuICAgICAgICBsZXQgZGlzcGxheSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRhcmdldCkuZGlzcGxheTtcclxuICAgICAgICBpZiAoZGlzcGxheSA9PT0gJ25vbmUnKSBkaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICB0YXJnZXQuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IHRhcmdldC5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgdGFyZ2V0LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcbiAgICAgICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IDA7XHJcbiAgICAgICAgdGFyZ2V0LnN0eWxlLnBhZGRpbmdUb3AgPSAwO1xyXG4gICAgICAgIHRhcmdldC5zdHlsZS5wYWRkaW5nQm90dG9tID0gMDtcclxuICAgICAgICB0YXJnZXQuc3R5bGUubWFyZ2luVG9wID0gMDtcclxuICAgICAgICB0YXJnZXQuc3R5bGUubWFyZ2luQm90dG9tID0gMDtcclxuICAgICAgICB0YXJnZXQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgIHRhcmdldC5zdHlsZS5ib3hTaXppbmcgPSAnYm9yZGVyLWJveCc7XHJcbiAgICAgICAgdGFyZ2V0LnN0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eSA9IFwiaGVpZ2h0LCBtYXJnaW4sIHBhZGRpbmdcIjtcclxuICAgICAgICB0YXJnZXQuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gZHVyYXRpb24gKyAnbXMnO1xyXG4gICAgICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xyXG4gICAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgncGFkZGluZy10b3AnKTtcclxuICAgICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3BhZGRpbmctYm90dG9tJyk7XHJcbiAgICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdtYXJnaW4tdG9wJyk7XHJcbiAgICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdtYXJnaW4tYm90dG9tJyk7XHJcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoICgpID0+IHtcclxuICAgICAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnaGVpZ2h0Jyk7XHJcbiAgICAgICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ292ZXJmbG93Jyk7XHJcbiAgICAgICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24tZHVyYXRpb24nKTtcclxuICAgICAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNpdGlvbi1wcm9wZXJ0eScpO1xyXG4gICAgICAgIH0sIGR1cmF0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBzbGlkZVRvZ2dsZSh0YXJnZXQsIGR1cmF0aW9uPTUwMCkge1xyXG4gICAgICAgIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnZXQpLmRpc3BsYXkgPT09ICdub25lJykge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlRG93bih0YXJnZXQsIGR1cmF0aW9uKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVVcCh0YXJnZXQsIGR1cmF0aW9uKTtcclxuICAgICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBldmVudEZpbHRlckJ1dHRvbiAoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5maWx0ZXJDbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuZmlsdGVyTW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgLy8gICAgIC8vIHRoaXMuZmlsdGVyTW9kYWxCZy5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAvLyB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5maWx0ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJCdG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1hY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlckJ0bi5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zbGlkZVRvZ2dsZSh0aGlzLmZpbHRlck1vZGFsLCA1MDApO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmZpbHRlck1vZGFsQmcuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuZmlsdGVyTW9kYWxCZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuZmlsdGVyTW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuZmlsdGVyTW9kYWxCZy5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAvLyB9KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucmVzZXRGaWx0ZXJCdG4pIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldEZpbHRlckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJz8nKVsxXTtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSAnJztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodXJsICYmIHVybCAhPSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0cnMgPSB1cmwuc3BsaXQoJyYnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3Rycy5mb3JFYWNoKHN0ciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHIgIT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IHN0ci5zcGxpdCgnPScpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHN0ci5zcGxpdCgnPScpWzFdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHIuaW5jbHVkZXMoJ2ZpbHRlci52LnByaWNlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByYW5nZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1maWx0ZXItY29udGVudCAucmFuZ2UtaW5wdXQgaW5wdXRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLWZpbHRlci1jb250ZW50IC5wcmljZS1pbnB1dCBpbnB1dFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLWZpbHRlci1jb250ZW50IC5zbGlkZXIgLnByb2dyZXNzXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZUlucHV0LmZvckVhY2goaW5wdXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJhbSA9IGlucHV0LmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtID09IGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleS5pbmNsdWRlcygnZ3RlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHJhbmdlSW5wdXRbMF0ubWluO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlLnN0eWxlLmxlZnQgPSAoKHJhbmdlSW5wdXRbMF0ubWluIC8gcmFuZ2VJbnB1dFswXS5tYXgpICogMTAwKSArIFwiJVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHJhbmdlSW5wdXRbMF0ubWF4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlLnN0eWxlLnJpZ2h0ID0gKDEwMCAtIChyYW5nZUlucHV0WzBdLm1heCAvIHJhbmdlSW5wdXRbMV0ubWF4KSAqIDEwMCkgKyBcIiVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmljZUlucHV0LmZvckVhY2goaW5wdXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJhbSA9IGlucHV0LmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtID09IGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleS5pbmNsdWRlcygnZ3RlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gcmFuZ2VJbnB1dFswXS5tYXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ID09ICdwYWdlJyB8fCBrZXkgPT0gJ3NvcnRfYnknKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGAke2tleX09JHtkYXRhfSZgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJfdXJsID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRQcm9kdWN0cygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDbGFzc0ZpbHRlcnMoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmZpbHRlclRpdGxlQnRuLmZvckVhY2goYnV0dG9uID0+IHtcclxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gYnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyQ29udGVudHMuZm9yRWFjaChjb250ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IGNvbnRlbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWxhYmVsJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBsYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5maWx0ZXJzLmZvckVhY2goZmlsdGVyID0+IHtcclxuICAgICAgICAgICAgZmlsdGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZmlsdGVyLmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyYW0gPSBmaWx0ZXIuZ2V0QXR0cmlidXRlKCdkYXRhLWtleScpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXhjaGFuZ2VfdmFsdWUgPSB2YWx1ZS5yZXBsYWNlQWxsKC8gL2csICclMjAnKS5yZXBsYWNlQWxsKCcmJywgJyMjJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGFkZEZpbHRlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkRmlsdGVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlci5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIGFkZEZpbHRlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KCc/JylbMV07XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gJycsIGlzRXhpc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmICh1cmwgJiYgdXJsICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2VBbGwoJyUyMCYlMjAnLCAnJTIwIyMlMjAnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdHJzID0gdXJsLnNwbGl0KCcmJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0cnMuZm9yRWFjaChzdHIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RyICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBzdHIuc3BsaXQoJz0nKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBzdHIuc3BsaXQoJz0nKVsxXTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PSBwYXJhbSAmJiBleGNoYW5nZV92YWx1ZSA9PSBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNFeGlzdCA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ICE9ICdwYWdlJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGAke2tleX09JHtkYXRhfSZgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc0V4aXN0ICYmIGFkZEZpbHRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBgJHtwYXJhbX09JHt2YWx1ZX0mYDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyX3VybCA9IHJlc3VsdC5yZXBsYWNlQWxsKCcjIycsICcmJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFByb2R1Y3RzKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmZpbHRlclJlbW92ZUJ0bnMuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBidG4uZ2V0QXR0cmlidXRlKCdkYXRhLWxhYmVsJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGxhYmVsID09ICdQcmljZScpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJz8nKVsxXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gJycsIGlzRXhpc3QgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVybCAmJiB1cmwgIT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RycyA9IHVybC5zcGxpdCgnJicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Rycy5mb3JFYWNoKHN0ciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RyICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gc3RyLnNwbGl0KCc9JylbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHN0ci5zcGxpdCgnPScpWzFdO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0ci5pbmNsdWRlcygnZmlsdGVyLnYucHJpY2UnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByYW5nZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1maWx0ZXItY29udGVudCAucmFuZ2UtaW5wdXQgaW5wdXRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmljZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1maWx0ZXItY29udGVudCAucHJpY2UtaW5wdXQgaW5wdXRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtZmlsdGVyLWNvbnRlbnQgLnNsaWRlciAucHJvZ3Jlc3NcIik7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VJbnB1dC5mb3JFYWNoKGlucHV0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtID0gaW5wdXQuZ2V0QXR0cmlidXRlKCdkYXRhLWtleScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtID09IGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkuaW5jbHVkZXMoJ2d0ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gcmFuZ2VJbnB1dFswXS5taW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlLnN0eWxlLmxlZnQgPSAoKHJhbmdlSW5wdXRbMF0ubWluIC8gcmFuZ2VJbnB1dFswXS5tYXgpICogMTAwKSArIFwiJVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gcmFuZ2VJbnB1dFswXS5tYXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlLnN0eWxlLnJpZ2h0ID0gKDEwMCAtIChyYW5nZUlucHV0WzBdLm1heCAvIHJhbmdlSW5wdXRbMF0ubWF4KSAqIDEwMCkgKyBcIiVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlSW5wdXQuZm9yRWFjaChpbnB1dCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJhbSA9IGlucHV0LmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbSA9PSBrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5LmluY2x1ZGVzKCdndGUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSByYW5nZUlucHV0WzBdLm1heDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBgJHtrZXl9PSR7ZGF0YX0mYDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJfdXJsID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UHJvZHVjdHMoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJzLmZvckVhY2goZmlsdGVyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyX2xhYmVsID0gZmlsdGVyLmdldEF0dHJpYnV0ZSgnZGF0YS1sYWJlbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyX2xhYmVsID09IGxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGZpbHRlci5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtID0gZmlsdGVyLmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4Y2hhbmdlX3ZhbHVlID0gdmFsdWUucmVwbGFjZUFsbCgvIC9nLCAnJTIwJykucmVwbGFjZUFsbCgnJicsICcjIycpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnPycpWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9ICcnLCBpc0V4aXN0ID0gZmFsc2U7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cmwgJiYgdXJsICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2VBbGwoJyUyMCYlMjAnLCAnJTIwIyMlMjAnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdHJzID0gdXJsLnNwbGl0KCcmJyk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJzLmZvckVhY2goc3RyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0ciAhPSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gc3RyLnNwbGl0KCc9JylbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gc3RyLnNwbGl0KCc9JylbMV07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gcGFyYW0gJiYgZXhjaGFuZ2VfdmFsdWUgPT0gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRXhpc3QgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGtleSAhPSAncGFnZScpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBgJHtrZXl9PSR7ZGF0YX0mYDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRXhpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcl91cmwgPSByZXN1bHQucmVwbGFjZUFsbCgnIyMnLCAnJicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UHJvZHVjdHMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUNsYXNzRmlsdGVycygpIHtcclxuICAgICAgICB0aGlzLmZpbHRlcnMuZm9yRWFjaChmaWx0ZXIgPT4ge1xyXG4gICAgICAgICAgICBmaWx0ZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEFkZFRvQ2FydEJ1dHRvbnMoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5hZGRUb0NhcnRGb3Jtcy5mb3JFYWNoKChmb3JtKSA9PiBuZXcgQWRkVG9DYXJ0KGZvcm0pKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2JpbGVOYXYoKSB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJzT3Blbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVycy5jbGFzc0xpc3QuYWRkKFwiaXMtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlcnNDbG9zZS5jbGFzc0xpc3QuYWRkKFwiaXMtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICBib2R5U2Nyb2xsTG9jay5sb2NrKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZmlsdGVyc0Nsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVycy5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlcnNDbG9zZS5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICBib2R5U2Nyb2xsTG9jay5yZWxlYXNlKCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5zdHlsZS5vdmVyZmxvd1k9XCJhdXRvXCI7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRQYWdpbmF0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnBhZ2VCdG5zID0gZ2V0QWxsKCcuanMtcGFnZS1saW5rJywgdGhpcy5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgdGhpcy5wYWdlQnRucy5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChidG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdjLXBhZ2luYXRpb25fX2xpbmstLWVuZHMnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ1dHRvbl90eXBlID0gYnRuLmdldEF0dHJpYnV0ZSgnZGF0YS1idXR0b24nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYnV0dG9uX3R5cGUgPT0gJ3ByZXYnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UgIT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlIC09IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2UgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9iaiA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3BhZ2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5wYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclNvcnRBbmRQYWdlKG9iaik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ1dHRvbl92YWx1ZSA9IGJ0bi5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnV0dG9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlID0gTnVtYmVyKGJ1dHRvbl92YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9iaiA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3BhZ2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5wYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyU29ydEFuZFBhZ2Uob2JqKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzb3J0QnlDaGFuZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5zb3J0QnkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc29ydExpc3QuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRkZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0TGlzdC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc29ydEJ5LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0TGlzdC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc29ydEJ5LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc29ydEJ5SXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRWYWx1ZS5pbm5lckhUTUwgPSBpdGVtLmdldEF0dHJpYnV0ZSgndmFsdWUnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc29ydExpc3QuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRCeS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgb2JqID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzb3J0X2J5JyxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogaXRlbS5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJylcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclNvcnRBbmRQYWdlKG9iaik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNvcnRCeUNoYW5nZU1vYmlsZSgpIHtcclxuICAgICAgICB0aGlzLnNvcnRCeU1vYmlsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuc29ydExpc3RNb2JpbGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRkZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0TGlzdE1vYmlsZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc29ydEJ5TW9iaWxlLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0TGlzdE1vYmlsZS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc29ydEJ5TW9iaWxlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy5zb3J0QnlJdGVtc01vYmlsZS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc29ydFZhbHVlTW9iaWxlLmlubmVySFRNTCA9IGl0ZW0uZ2V0QXR0cmlidXRlKCd2YWx1ZScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0TGlzdE1vYmlsZS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc29ydEJ5TW9iaWxlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBvYmogPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3NvcnRfYnknLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBpdGVtLmdldEF0dHJpYnV0ZSgndmFsdWUnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyU29ydEFuZFBhZ2Uob2JqKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyU29ydEFuZFBhZ2UoZGF0YSkge1xyXG4gICAgICAgIGxldCB2YWx1ZXMgPSBkYXRhO1xyXG4gICAgICAgIGlmKHZhbHVlcyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHZhbHVlcyA9IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICcnLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByZXN1bHQgPSAnJztcclxuICAgICAgICBsZXQgaXNFeGlzdCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnPycpWzFdO1xyXG4gICAgICAgIGlmICh1cmwpIHtcclxuICAgICAgICAgICAgY29uc3QgZmlsdGVycyA9IHVybC5zcGxpdCgnJicpO1xyXG5cclxuICAgICAgICAgICAgZmlsdGVycy5mb3JFYWNoKGZpbHRlciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBmaWx0ZXIuc3BsaXQoJz0nKVswXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZmlsdGVyLnNwbGl0KCc9JylbMV07XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gZGF0YS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGAke2tleX09JHtkYXRhLnZhbHVlfSZgXHJcbiAgICAgICAgICAgICAgICAgICAgaXNFeGlzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoa2V5ICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGAke2tleX09JHt2YWx1ZX0mYFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghaXNFeGlzdCkge1xyXG4gICAgICAgICAgICByZXN1bHQgKz0gYCR7dmFsdWVzLnR5cGV9PSR7dmFsdWVzLnZhbHVlfWBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZmlsdGVyX3VybCA9IHJlc3VsdDtcclxuICAgICAgICB0aGlzLmdldFByb2R1Y3RzKClcclxuICAgIH1cclxuXHJcbiAgICBnZXRQcm9kdWN0cyAoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVXaW5kb3dzVXJsKCk7XHJcblxyXG4gICAgICAgIGxldCB1cmwgPSAnJztcclxuICAgICAgICBpZiAodGhpcy5maWx0ZXJfdXJsLmNoYXJBdCh0aGlzLmZpbHRlcl91cmwubGVuZ3RoIC0gMSkgPT0gJyYnKSB7XHJcbiAgICAgICAgICAgIHVybCA9IGAke3RoaXMuY29sbGVjdGlvbl91cmx9PyR7dGhpcy5maWx0ZXJfdXJsfXZpZXc9YWpheGA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXJsID0gYCR7dGhpcy5jb2xsZWN0aW9uX3VybH0/JHt0aGlzLmZpbHRlcl91cmx9JnZpZXc9YWpheGA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmZXRjaCh1cmwpLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UudGV4dCgpKS50aGVuKGh0bWwgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb25HcmlkLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb25HcmlkLmlubmVySFRNTCA9IGh0bWw7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0Q2FyZHMgPSBnZXRBbGwoJy5qcy1wcm9kdWN0LWNhcmQnLCBkb2N1bWVudCk7XHJcbiAgICAgICAgICAgIHByb2R1Y3RDYXJkcy5mb3JFYWNoKGNhcmQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmV3IFByb2R1Y3RDYXJkKGNhcmQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRQYWdpbmF0aW9uKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlV2luZG93c1VybCgpIHtcclxuICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sICcnLCBgJHt0aGlzLmNvbGxlY3Rpb25fdXJsfT8ke3RoaXMuZmlsdGVyX3VybH1gKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IENvbGxlY3Rpb24gfTtcclxuIiwiY29uc3QgZWxIdG1sID0gZG9jdW1lbnQuYm9keTtcclxuXHJcbmxldCBwcmV2aW91c0h0bWxTdHlsZXMgPSB7fTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2NrKCkge1xyXG4gICAgY29uc3QgeyBzdHlsZTogaHRtbFN0eWxlIH0gPSBlbEh0bWw7XHJcblxyXG4gICAgcHJldmlvdXNIdG1sU3R5bGVzID0ge1xyXG4gICAgICAgIG92ZXJmbG93WTogaHRtbFN0eWxlLm92ZXJmbG93WSxcclxuICAgICAgICBtaW5IZWlnaHQ6IGh0bWxTdHlsZS5taW5IZWlnaHQsXHJcbiAgICAgICAgbWF4SGVpZ2h0OiBcImF1dG9cIixcclxuICAgIH07XHJcblxyXG4gICAgT2JqZWN0LmFzc2lnbihlbEh0bWwuc3R5bGUsIHtcclxuICAgICAgICBvdmVyZmxvd1k6IFwiaGlkZGVuXCIsXHJcbiAgICAgICAgbWluSGVpZ2h0OiBcIjEwMHZoXCIsXHJcbiAgICAgICAgbWF4SGVpZ2h0OiBcIjEwMHZoXCIsXHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbGVhc2UoKSB7XHJcbiAgICBPYmplY3QuYXNzaWduKGVsSHRtbC5zdHlsZSwgcHJldmlvdXNIdG1sU3R5bGVzKTtcclxufVxyXG4iXSwibmFtZXMiOlsiZ2V0IiwiZ2V0QWxsIiwiYm9keVNjcm9sbExvY2siLCJQcm9kdWN0Q2FyZCIsIkNvbGxlY3Rpb24iLCJIVE1MRWxlbWVudCIsImNvbnN0cnVjdG9yIiwiZWxlbWVudCIsImZpbHRlcl91cmwiLCJwYWdlIiwiY29sbGVjdGlvbl91cmwiLCJnZXRBdHRyaWJ1dGUiLCJyZWFkTW9yZSIsImRvY3VtZW50IiwiYWRkVG9DYXJ0Rm9ybXMiLCJmaWx0ZXJzT3BlbiIsImZpbHRlcnNDbG9zZSIsImZpbHRlcnMiLCJzb3J0QnkiLCJzb3J0VmFsdWUiLCJzb3J0TGlzdCIsInNvcnRCeU1vYmlsZSIsInNvcnRWYWx1ZU1vYmlsZSIsInNvcnRMaXN0TW9iaWxlIiwic29ydEJ5SXRlbXMiLCJzb3J0QnlJdGVtc01vYmlsZSIsImNvbGxlY3Rpb25HcmlkIiwiZmlsdGVyQnRuIiwiZmlsdGVyTW9kYWwiLCJmaWx0ZXJDbG9zZUJ0biIsImZpbHRlclRpdGxlQnRuIiwiZmlsdGVyQ29udGVudHMiLCJmaWx0ZXJSZW1vdmVCdG5zIiwicmVzZXRGaWx0ZXJCdG4iLCJzZWFyY2hJbnB1dCIsInNlYXJjaEJ0biIsImJpbmRFdmVudHMiLCJpbml0RmlsdGVycyIsImV2ZW50UGFnaW5hdGlvbiIsInNvcnRCeUNoYW5nZSIsInNvcnRCeUNoYW5nZU1vYmlsZSIsImV2ZW50RmlsdGVyQnV0dG9uIiwiZXZlbnRQcmljZVJhbmdlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInZhbHVlIiwia2V5Q29kZSIsInJhbmdlSW5wdXQiLCJxdWVyeVNlbGVjdG9yQWxsIiwicHJpY2VJbnB1dCIsInJhbmdlIiwicXVlcnlTZWxlY3RvciIsInByaWNlR2FwIiwiZ3RlUHJpY2UiLCJsdGVQcmljZSIsImZvckVhY2giLCJpbnB1dCIsIm1pblByaWNlIiwicGFyc2VJbnQiLCJtYXhQcmljZSIsIm1heCIsInRhcmdldCIsImNsYXNzTmFtZSIsInN0eWxlIiwibGVmdCIsInJpZ2h0IiwidXBkYXRlUHJpY2VGaWx0ZXIiLCJtaW5WYWwiLCJtYXhWYWwiLCJtaW4iLCJwcmljZUFyciIsImtleSIsInVybCIsInNwbGl0IiwicmVzdWx0IiwiaXRlbSIsInBhcmFtIiwiaXNFeGlzdCIsInJlcGxhY2VBbGwiLCJzdHJzIiwic3RyIiwiZGF0YSIsImluY2x1ZGVzIiwiZ2V0UHJvZHVjdHMiLCJOdW1iZXIiLCJjbGFzc0xpc3QiLCJhZGQiLCJmaWx0ZXIiLCJmaWx0ZXJfa2V5IiwiZmlsdGVyX3ZhbHVlIiwiZmlsdGVyVGl0bGUiLCJwYXJlbnROb2RlIiwiZmlsdGVyQ29udGVudCIsInNsaWRlVXAiLCJkdXJhdGlvbiIsInRyYW5zaXRpb25Qcm9wZXJ0eSIsInRyYW5zaXRpb25EdXJhdGlvbiIsImJveFNpemluZyIsImhlaWdodCIsIm9mZnNldEhlaWdodCIsIm92ZXJmbG93IiwicGFkZGluZ1RvcCIsInBhZGRpbmdCb3R0b20iLCJtYXJnaW5Ub3AiLCJtYXJnaW5Cb3R0b20iLCJzZXRUaW1lb3V0IiwiZGlzcGxheSIsInJlbW92ZVByb3BlcnR5Iiwic2xpZGVEb3duIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInNsaWRlVG9nZ2xlIiwiY29udGFpbnMiLCJyZW1vdmUiLCJyZW1vdmVDbGFzc0ZpbHRlcnMiLCJidXR0b24iLCJjb250ZW50IiwibGFiZWwiLCJleGNoYW5nZV92YWx1ZSIsImFkZEZpbHRlciIsImJ0biIsImZpbHRlcl9sYWJlbCIsImluaXRBZGRUb0NhcnRCdXR0b25zIiwibW9iaWxlTmF2IiwiZXZlbnQiLCJsb2NrIiwicmVsZWFzZSIsIm92ZXJmbG93WSIsInBhZ2VCdG5zIiwiYnV0dG9uX3R5cGUiLCJvYmoiLCJ0eXBlIiwicmVuZGVyU29ydEFuZFBhZ2UiLCJidXR0b25fdmFsdWUiLCJpbm5lckhUTUwiLCJ2YWx1ZXMiLCJ1cGRhdGVXaW5kb3dzVXJsIiwiY2hhckF0IiwibGVuZ3RoIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJ0ZXh0IiwiaHRtbCIsInByb2R1Y3RDYXJkcyIsImNhcmQiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwiZWxIdG1sIiwiYm9keSIsInByZXZpb3VzSHRtbFN0eWxlcyIsImh0bWxTdHlsZSIsIm1pbkhlaWdodCIsIm1heEhlaWdodCIsIk9iamVjdCIsImFzc2lnbiJdLCJzb3VyY2VSb290IjoiIn0=