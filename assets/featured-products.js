"use strict";
(self["webpackChunkjuno_shopify_template"] = self["webpackChunkjuno_shopify_template"] || []).push([["featured-products"],{

/***/ "./src/assets/js/main/featured-products/FeaturedProducts.js":
/*!******************************************************************!*\
  !*** ./src/assets/js/main/featured-products/FeaturedProducts.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FeaturedProducts": () => (/* binding */ FeaturedProducts)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");


class FeaturedProducts {
  constructor(element) {
    this.element = element;
    this.select = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.js-select-collection', this.element);
    this.collectionList = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.js-collection-list', this.element);
    this.collectionItems = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)('li', this.collectionList);
    this.productList = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.js-products-list', this.element);
    this.bindEvents();
    this.changeVariants();
  }

  bindEvents() {
    this.select.addEventListener('click', e => {
      e.preventDefault();

      if (this.select.classList.contains('active')) {
        this.select.classList.remove('active');
        this.collectionList.classList.remove('active');
      } else {
        this.select.classList.add('active');
        this.collectionList.classList.add('active');
      }
    });
    this.collectionItems.forEach(item => {
      item.addEventListener('click', e => {
        const handle = item.getAttribute('data-handle');
        const span = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('span', this.select);
        span.innerHTML = item.innerHTML;
        this.select.classList.remove('active');
        this.collectionList.classList.remove('active');
        fetch(`/collections/${handle}?view=ajax`).then(res => res.text()).then(data => {
          this.productList.innerHTML = '';
          this.productList.innerHTML = data;
          this.hideOtherCards();
          this.changeVariants();
        });
      });
    });
  }

  hideOtherCards() {
    const productCards = document.querySelectorAll('.js-products-list .c-product-card');
    productCards.forEach((card, index) => {
      if (index > 3) {
        card.classList.add('hidden');
      }
    });
  }

  changeVariants() {
    this.variants = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)('.js-product-variant', this.element);
    this.variants.forEach(variant => {
      variant.addEventListener('click', e => {
        const id = variant.getAttribute('data-product-id');
        e.preventDefault();
        const img = variant.getAttribute('data-img-url');
        this.variants.forEach(rmItem => {
          const productId = rmItem.getAttribute('data-product-id');

          if (productId == id) {
            rmItem.classList.remove('active');
          }
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
  }

}



/***/ }),

/***/ "./src/assets/js/main/product-card/ProductCard.js":
/*!********************************************************!*\
  !*** ./src/assets/js/main/product-card/ProductCard.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProductCard": () => (/* binding */ ProductCard)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");


class ProductCard {
  constructor(element) {
    this.element = element;
    this.pImg = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)('.js-product-image', this.element);
    this.variants = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)('.js-product-variant', this.element);
    this.bindEvents();
  }

  bindEvents() {
    this.updateVariants(this.element);
  }

  updateVariants(element) {
    this.variants.forEach(variant => {
      variant.addEventListener('click', e => {
        e.preventDefault();
        const img = variant.getAttribute('data-img-url');
        this.variants.forEach(rmItem => {
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
  }

}



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXFCb0IsSUFBckI7UUFDSDtNQUVKLENBcEJEO0lBcUJILENBdEJEO0VBdUJIOztBQXJDYSIsInNvdXJjZXMiOlsid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvbWFpbi9mZWF0dXJlZC1wcm9kdWN0cy9GZWF0dXJlZFByb2R1Y3RzLmpzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvbWFpbi9wcm9kdWN0LWNhcmQvUHJvZHVjdENhcmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0QWxsLCBnZXQgfSBmcm9tIFwiQC91dGlsc1wiO1xyXG5cclxuY2xhc3MgRmVhdHVyZWRQcm9kdWN0cyB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICB0aGlzLnNlbGVjdCA9IGdldCgnLmpzLXNlbGVjdC1jb2xsZWN0aW9uJywgdGhpcy5lbGVtZW50KTtcclxuICAgICAgICB0aGlzLmNvbGxlY3Rpb25MaXN0ID0gZ2V0KCcuanMtY29sbGVjdGlvbi1saXN0JywgdGhpcy5lbGVtZW50KTtcclxuICAgICAgICB0aGlzLmNvbGxlY3Rpb25JdGVtcyA9IGdldEFsbCgnbGknLCB0aGlzLmNvbGxlY3Rpb25MaXN0KTtcclxuICAgICAgICB0aGlzLnByb2R1Y3RMaXN0ID0gZ2V0KCcuanMtcHJvZHVjdHMtbGlzdCcsIHRoaXMuZWxlbWVudCk7XHJcblxyXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlVmFyaWFudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kRXZlbnRzKCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3QuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb25MaXN0LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3QuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb25MaXN0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuY29sbGVjdGlvbkl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaGFuZGxlJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcGFuID0gZ2V0KCdzcGFuJywgdGhpcy5zZWxlY3QpO1xyXG4gICAgICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSBpdGVtLmlubmVySFRNTDtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvbkxpc3QuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgZmV0Y2goYC9jb2xsZWN0aW9ucy8ke2hhbmRsZX0/dmlldz1hamF4YCkudGhlbihyZXMgPT4gcmVzLnRleHQoKSkudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3RMaXN0LmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdExpc3QuaW5uZXJIVE1MID0gZGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlT3RoZXJDYXJkcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlVmFyaWFudHMoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGVPdGhlckNhcmRzICgpIHtcclxuICAgICAgICBjb25zdCBwcm9kdWN0Q2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtcHJvZHVjdHMtbGlzdCAuYy1wcm9kdWN0LWNhcmQnKTtcclxuICAgICAgICBwcm9kdWN0Q2FyZHMuZm9yRWFjaCgoY2FyZCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID4gMykge1xyXG4gICAgICAgICAgICAgICAgY2FyZC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVZhcmlhbnRzKCkge1xyXG4gICAgICAgIHRoaXMudmFyaWFudHMgPSBnZXRBbGwoJy5qcy1wcm9kdWN0LXZhcmlhbnQnLCB0aGlzLmVsZW1lbnQpO1xyXG5cclxuICAgICAgICB0aGlzLnZhcmlhbnRzLmZvckVhY2godmFyaWFudCA9PiB7XHJcbiAgICAgICAgICAgIHZhcmlhbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaWQgPSB2YXJpYW50LmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9kdWN0LWlkJylcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc3QgaW1nID0gdmFyaWFudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW1nLXVybCcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YXJpYW50cy5mb3JFYWNoKHJtSXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdElkID0gcm1JdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9kdWN0LWlkJylcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvZHVjdElkID09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJtSXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhcmlhbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW1nICE9IG51bGwgJiYgaW1nICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlyc3RJbWcgPSBnZXQoJy5jLXByb2R1Y3QtY2FyZF9faW1hZ2UuZmlyc3QtaW1hZ2UnLCB2YXJpYW50LnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0SW1nLmlubmVySFRNTCA9ICcnO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaHRtbCA9IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke2ltZ31cIiBjbGFzcz1cIm8taW1nIG8taW1nLS1jb3ZlciAgby1hcl9faXRlbVwiLz5cclxuICAgICAgICAgICAgICAgICAgICBgO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmaXJzdEltZy5pbm5lckhUTUwgPSBodG1sO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBGZWF0dXJlZFByb2R1Y3RzIH07XHJcbiIsImltcG9ydCB7IGdldEFsbCwgZ2V0IH0gZnJvbSBcIkAvdXRpbHNcIjtcclxuXHJcbmNsYXNzIFByb2R1Y3RDYXJkIHtcclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgIHRoaXMucEltZyA9IGdldCgnLmpzLXByb2R1Y3QtaW1hZ2UnLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMudmFyaWFudHMgPSBnZXRBbGwoJy5qcy1wcm9kdWN0LXZhcmlhbnQnLCB0aGlzLmVsZW1lbnQpO1xyXG5cclxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kRXZlbnRzKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlVmFyaWFudHModGhpcy5lbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVWYXJpYW50cyhlbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy52YXJpYW50cy5mb3JFYWNoKHZhcmlhbnQgPT4ge1xyXG4gICAgICAgICAgICB2YXJpYW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc3QgaW1nID0gdmFyaWFudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW1nLXVybCcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YXJpYW50cy5mb3JFYWNoKHJtSXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm1JdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXJpYW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGltZyAhPSBudWxsICYmIGltZyAhPSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0SW1nID0gZ2V0KCcuYy1wcm9kdWN0LWNhcmRfX2ltYWdlLmZpcnN0LWltYWdlJywgdmFyaWFudC5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdEltZy5pbm5lckhUTUwgPSAnJztcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGh0bWwgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtpbWd9XCIgY2xhc3M9XCJvLWltZyBvLWltZy0tY292ZXIgIG8tYXJfX2l0ZW1cIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgYDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RJbWcuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgUHJvZHVjdENhcmQgfTtcclxuIl0sIm5hbWVzIjpbImdldEFsbCIsImdldCIsIkZlYXR1cmVkUHJvZHVjdHMiLCJjb25zdHJ1Y3RvciIsImVsZW1lbnQiLCJzZWxlY3QiLCJjb2xsZWN0aW9uTGlzdCIsImNvbGxlY3Rpb25JdGVtcyIsInByb2R1Y3RMaXN0IiwiYmluZEV2ZW50cyIsImNoYW5nZVZhcmlhbnRzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwicmVtb3ZlIiwiYWRkIiwiZm9yRWFjaCIsIml0ZW0iLCJoYW5kbGUiLCJnZXRBdHRyaWJ1dGUiLCJzcGFuIiwiaW5uZXJIVE1MIiwiZmV0Y2giLCJ0aGVuIiwicmVzIiwidGV4dCIsImRhdGEiLCJoaWRlT3RoZXJDYXJkcyIsInByb2R1Y3RDYXJkcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImNhcmQiLCJpbmRleCIsInZhcmlhbnRzIiwidmFyaWFudCIsImlkIiwiaW1nIiwicm1JdGVtIiwicHJvZHVjdElkIiwiZmlyc3RJbWciLCJwYXJlbnROb2RlIiwiaHRtbCIsIlByb2R1Y3RDYXJkIiwicEltZyIsInVwZGF0ZVZhcmlhbnRzIl0sInNvdXJjZVJvb3QiOiIifQ==