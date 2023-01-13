"use strict";
(self["webpackChunkjuno_shopify_template"] = self["webpackChunkjuno_shopify_template"] || []).push([["predictiveSearch"],{

/***/ "./src/assets/js/main/search/predictiveSearch.js":
/*!*******************************************************!*\
  !*** ./src/assets/js/main/search/predictiveSearch.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PredictiveSearch": () => (/* binding */ PredictiveSearch)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");
// import PredictiveSearch from "@shopify/theme-predictive-search";


class PredictiveSearch extends HTMLElement {
  constructor() {
    super();
    this.element = this;
    this.form = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-search-form", this.element);
    this.trigger = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-search-trigger");
    this.target = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-search-target");
    this.close = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-search-close");
    this.overlay = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-overlay");
    this.header = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-header");
    this.input = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-search-input", this.form);
    this.results = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-search-results", this.element);
    this.searchPage = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-search-grid");
    this.page = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-page");
    this.itemClickedTest = false; // this.bindEvents();
  }

  bindEvents() {
    this.trigger.addEventListener("click", () => this.handleOpen());
    this.close.addEventListener("click", () => this.handleClose());
    this.results.addEventListener("click", () => {
      this.itemClickedTest = true;
    });

    if (this.input) {
      this.input.addEventListener("input", () => {
        if (this.isInputEmpty(this.input.value)) {
          this.results.classList.remove("is-active");
        } else {
          this.predictiveSearch(this.input.value);
          this.results.classList.add("is-active");
        }
      });
    }

    this.page.addEventListener("click", () => {
      if (this.input !== document.activeElement) this.closeSearchResults();
    });
    this.input.addEventListener("focusin", () => {
      if (!this.isInputEmpty(this.input.value)) {
        this.predictiveSearch(this.input.value);
        this.results.classList.add("is-active");
      }
    });
  }

  handleOpen() {
    alert(1);
    this.target.classList.remove("is-hidden");
    this.close.classList.remove("is-hidden");
    this.trigger.classList.add("is-hidden");
    this.overlay.classList.add("is-active");
    this.header.classList.add("is-top");
  }

  handleClose() {
    this.target.classList.add("is-hidden");
    this.close.classList.add("is-hidden");
    this.trigger.classList.remove("is-hidden");
    this.overlay.classList.remove("is-active");
    this.header.classList.remove("is-top");
  }

  closeSearchResults() {
    if (this.results.classList.contains("is-active") && this.itemClickedTest === false) {
      this.results.classList.remove("is-active");
    }
  }

  predictiveSearch(searchTerm) {
    fetch(`/search/suggest?q=${searchTerm}&resources[type]=product&resources[limit]=4&section_id=predictive-search`).then(response => {
      if (!response.ok) {
        const error = new Error(response.status);
        this.close();
        throw error;
      }

      return response.text();
    }).then(text => {
      const resultsMarkup = new DOMParser().parseFromString(text, "text/html").querySelector("#shopify-section-predictive-search").innerHTML;
      this.predictiveSearchResults.innerHTML = resultsMarkup;
      this.open();
    }).catch(error => {
      this.close();
      throw error;
    });
    const predictiveSearch = new PredictiveSearch({
      resources: {
        type: [PredictiveSearch.TYPES.PRODUCT],
        limit: 6,
        options: {
          unavailable_products: PredictiveSearch.UNAVAILABLE_PRODUCTS.HIDE,
          fields: [PredictiveSearch.FIELDS.TITLE, PredictiveSearch.FIELDS.VENDOR, PredictiveSearch.FIELDS.PRODUCT_TYPE, PredictiveSearch.FIELDS.VARIANTS_TITLE, PredictiveSearch.FIELDS.VARIANTS_SKU, PredictiveSearch.FIELDS.VARIANTS_BARCODE, PredictiveSearch.FIELDS.TAG]
        }
      }
    }); // Set success event listener

    predictiveSearch.on("success", suggestions => {
      const productSuggestions = suggestions.resources.results.products;

      if (productSuggestions.length > 0) {
        this.searchRender(productSuggestions);
      } else {
        this.results.innerHTML = "<span>No suggestions</span>";
      }
    }); // Set error event listener

    predictiveSearch.on("error", error => {
      console.error("Error message:", error.message);
    }); // Send query

    predictiveSearch.query(query);
  }

  getSearchResults(searchTerm) {
    const queryKey = searchTerm.replace(" ", "-").toLowerCase();
    this.setLiveRegionLoadingState();

    if (this.cachedResults[queryKey]) {
      this.renderSearchResults(this.cachedResults[queryKey]);
      return;
    }

    fetch(`${routes.predictive_search_url}?q=${encodeURIComponent(searchTerm)}&${encodeURIComponent("resources[type]")}=product&${encodeURIComponent("resources[limit]")}=4&section_id=predictive-search`).then(response => {
      if (!response.ok) {
        const error = new Error(response.status);
        this.close();
        throw error;
      }

      return response.text();
    }).then(text => {
      const resultsMarkup = new DOMParser().parseFromString(text, "text/html").querySelector("#shopify-section-predictive-search").innerHTML;
      this.cachedResults[queryKey] = resultsMarkup;
      this.renderSearchResults(resultsMarkup);
    }).catch(error => {
      this.close();
      throw error;
    });
  }

  searchRender(suggestions) {
    let results = "";
    suggestions.forEach(suggestion => {
      const format = window.theme.moneyFormat.includes("{{amount_no_decimals}}") ? "{{amount_no_decimals}}" : "{{amount}}";
      const moneyPrice = window.theme.moneyFormat.replace(format, suggestion.price);
      results += `
                <a href="${suggestion.url}" class="c-product-card">
                    <picture class="c-product-card__image  o-img__frame  o-ar  o-ar--square  js-image">
                        <img 
                            class="o-img  o-img--cover  o-ar__item" 
                            src="${suggestion.image}" 
                            alt="{{ object_image.alt }}" 
                            loading="lazy"
                            width="100%"
                            height="100%"
                        />
                    </picture>
                    <div class="c-product-card__details">
                        <h4 class="t-heading  t-font-size--zeta">
                            ${suggestion.title}
                        </h4>
                        <p class="c-product-card__price  money" data-product-id="${suggestion.id}">
                            ${moneyPrice} <span class="c-product-card__price-vat">Incl. VAT</span>
                        </p>
                    </div>
                </a>
            `;
    });
    this.results.innerHTML = results;
  }

  isInputEmpty(str) {
    return !str || /^\s*$/.test(str);
  } //     constructor() {
  //     super();
  //     this.input = this.querySelector('input[type="search"]');
  //     this.predictiveSearchResults = this.querySelector('#predictive-search');
  //     this.input.addEventListener('input', this.debounce((event) => {
  //       this.onChange(event);
  //     }, 300).bind(this));
  //   }


  onChange() {
    const searchTerm = this.input.value.trim();

    if (!searchTerm.length) {
      this.close();
      return;
    }

    this.getSearchResults(searchTerm);
  } //   getSearchResults(searchTerm) {
  //     fetch(`/search/suggest?q=${searchTerm}&resources[type]=product&resources[limit]=4&section_id=predictive-search`)
  //       .then((response) => {
  //         if (!response.ok) {
  //           const error = new Error(response.status);
  //           this.close();
  //           throw error;
  //         }
  //         return response.text();
  //       })
  //       .then((text) => {
  //         const resultsMarkup = new DOMParser().parseFromString(text, 'text/html').querySelector('#shopify-section-predictive-search').innerHTML;
  //         this.predictiveSearchResults.innerHTML = resultsMarkup;
  //         this.open();
  //       })
  //       .catch((error) => {
  //         this.close();
  //         throw error;
  //       });
  //   }
  //   open() {
  //     this.predictiveSearchResults.style.display = 'block';
  //   }
  //   close() {
  //     this.predictiveSearchResults.style.display = 'none';
  //   }


  debounce(fn, wait) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

}



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VSxDQUFDVyxFQUFHO0FBQ2pHLDhCQUE4QkwsVUFBVztBQUN6QztBQUNBO0FBQ0E7QUFDQSxhQXJCWTtJQXNCSCxDQTNCRDtJQTRCQSxLQUFLaEYsT0FBTCxDQUFhZ0MsU0FBYixHQUF5QmhDLE9BQXpCO0VBQ0g7O0VBRURRLFlBQVksQ0FBQzhFLEdBQUQsRUFBTTtJQUNkLE9BQU8sQ0FBQ0EsR0FBRCxJQUFRLFFBQVFDLElBQVIsQ0FBYUQsR0FBYixDQUFmO0VBQ0gsQ0FsTnNDLENBb052QztFQUNBO0VBRUE7RUFDQTtFQUVBO0VBQ0E7RUFDQTtFQUNBOzs7RUFFQUUsUUFBUSxHQUFHO0lBQ1AsTUFBTXJFLFVBQVUsR0FBRyxLQUFLcEIsS0FBTCxDQUFXVSxLQUFYLENBQWlCZ0YsSUFBakIsRUFBbkI7O0lBRUEsSUFBSSxDQUFDdEUsVUFBVSxDQUFDdUMsTUFBaEIsRUFBd0I7TUFDcEIsS0FBSzlELEtBQUw7TUFDQTtJQUNIOztJQUVELEtBQUttRSxnQkFBTCxDQUFzQjVDLFVBQXRCO0VBQ0gsQ0F4T3NDLENBME92QztFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBRUE7RUFDQTtFQUNBO0VBRUE7RUFDQTtFQUNBOzs7RUFFQXVFLFFBQVEsQ0FBQ0MsRUFBRCxFQUFLQyxJQUFMLEVBQVc7SUFDZixJQUFJQyxDQUFKO0lBQ0EsT0FBTyxDQUFDLEdBQUdDLElBQUosS0FBYTtNQUNoQkMsWUFBWSxDQUFDRixDQUFELENBQVo7TUFDQUEsQ0FBQyxHQUFHRyxVQUFVLENBQUMsTUFBTUwsRUFBRSxDQUFDTSxLQUFILENBQVMsSUFBVCxFQUFlSCxJQUFmLENBQVAsRUFBNkJGLElBQTdCLENBQWQ7SUFDSCxDQUhEO0VBSUg7O0FBOVFzQyIsInNvdXJjZXMiOlsid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvbWFpbi9zZWFyY2gvcHJlZGljdGl2ZVNlYXJjaC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgUHJlZGljdGl2ZVNlYXJjaCBmcm9tIFwiQHNob3BpZnkvdGhlbWUtcHJlZGljdGl2ZS1zZWFyY2hcIjtcclxuaW1wb3J0IHsgZ2V0IH0gZnJvbSBcIkAvdXRpbHNcIjtcclxuXHJcbmNsYXNzIFByZWRpY3RpdmVTZWFyY2ggZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5mb3JtID0gZ2V0KFwiLmpzLXNlYXJjaC1mb3JtXCIsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy50cmlnZ2VyID0gZ2V0KFwiLmpzLXNlYXJjaC10cmlnZ2VyXCIpO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gZ2V0KFwiLmpzLXNlYXJjaC10YXJnZXRcIik7XHJcbiAgICAgICAgdGhpcy5jbG9zZSA9IGdldChcIi5qcy1zZWFyY2gtY2xvc2VcIik7XHJcbiAgICAgICAgdGhpcy5vdmVybGF5ID0gZ2V0KFwiLmpzLW92ZXJsYXlcIik7XHJcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBnZXQoXCIuanMtaGVhZGVyXCIpO1xyXG5cclxuICAgICAgICB0aGlzLmlucHV0ID0gZ2V0KFwiLmpzLXNlYXJjaC1pbnB1dFwiLCB0aGlzLmZvcm0pO1xyXG4gICAgICAgIHRoaXMucmVzdWx0cyA9IGdldChcIi5qcy1zZWFyY2gtcmVzdWx0c1wiLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoUGFnZSA9IGdldChcIi5qcy1zZWFyY2gtZ3JpZFwiKTtcclxuICAgICAgICB0aGlzLnBhZ2UgPSBnZXQoXCIuanMtcGFnZVwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5pdGVtQ2xpY2tlZFRlc3QgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5iaW5kRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZEV2ZW50cygpIHtcclxuICAgICAgICB0aGlzLnRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMuaGFuZGxlT3BlbigpKTtcclxuICAgICAgICB0aGlzLmNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLmhhbmRsZUNsb3NlKCkpO1xyXG5cclxuICAgICAgICB0aGlzLnJlc3VsdHMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtQ2xpY2tlZFRlc3QgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pbnB1dCkge1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0lucHV0RW1wdHkodGhpcy5pbnB1dC52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdHMuY2xhc3NMaXN0LnJlbW92ZShcImlzLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVkaWN0aXZlU2VhcmNoKHRoaXMuaW5wdXQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0cy5jbGFzc0xpc3QuYWRkKFwiaXMtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucGFnZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pbnB1dCAhPT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgdGhpcy5jbG9zZVNlYXJjaFJlc3VsdHMoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5pbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNpblwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0lucHV0RW1wdHkodGhpcy5pbnB1dC52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJlZGljdGl2ZVNlYXJjaCh0aGlzLmlucHV0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0cy5jbGFzc0xpc3QuYWRkKFwiaXMtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBoYW5kbGVPcGVuKCkge1xyXG4gICAgICAgIGFsZXJ0KDEpO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1oaWRkZW5cIik7XHJcbiAgICAgICAgdGhpcy5jbG9zZS5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtaGlkZGVuXCIpO1xyXG4gICAgICAgIHRoaXMudHJpZ2dlci5jbGFzc0xpc3QuYWRkKFwiaXMtaGlkZGVuXCIpO1xyXG4gICAgICAgIHRoaXMub3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwiaXMtYWN0aXZlXCIpO1xyXG4gICAgICAgIHRoaXMuaGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJpcy10b3BcIik7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXQuY2xhc3NMaXN0LmFkZChcImlzLWhpZGRlblwiKTtcclxuICAgICAgICB0aGlzLmNsb3NlLmNsYXNzTGlzdC5hZGQoXCJpcy1oaWRkZW5cIik7XHJcbiAgICAgICAgdGhpcy50cmlnZ2VyLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1oaWRkZW5cIik7XHJcbiAgICAgICAgdGhpcy5vdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1hY3RpdmVcIik7XHJcbiAgICAgICAgdGhpcy5oZWFkZXIuY2xhc3NMaXN0LnJlbW92ZShcImlzLXRvcFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZVNlYXJjaFJlc3VsdHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVzdWx0cy5jbGFzc0xpc3QuY29udGFpbnMoXCJpcy1hY3RpdmVcIikgJiYgdGhpcy5pdGVtQ2xpY2tlZFRlc3QgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0cy5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtYWN0aXZlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcmVkaWN0aXZlU2VhcmNoKHNlYXJjaFRlcm0pIHtcclxuICAgICAgICBmZXRjaChcclxuICAgICAgICAgICAgYC9zZWFyY2gvc3VnZ2VzdD9xPSR7c2VhcmNoVGVybX0mcmVzb3VyY2VzW3R5cGVdPXByb2R1Y3QmcmVzb3VyY2VzW2xpbWl0XT00JnNlY3Rpb25faWQ9cHJlZGljdGl2ZS1zZWFyY2hgXHJcbiAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcihyZXNwb25zZS5zdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UudGV4dCgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigodGV4dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0c01hcmt1cCA9IG5ldyBET01QYXJzZXIoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJzZUZyb21TdHJpbmcodGV4dCwgXCJ0ZXh0L2h0bWxcIilcclxuICAgICAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcihcIiNzaG9waWZ5LXNlY3Rpb24tcHJlZGljdGl2ZS1zZWFyY2hcIikuaW5uZXJIVE1MO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmVkaWN0aXZlU2VhcmNoUmVzdWx0cy5pbm5lckhUTUwgPSByZXN1bHRzTWFya3VwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBwcmVkaWN0aXZlU2VhcmNoID0gbmV3IFByZWRpY3RpdmVTZWFyY2goe1xyXG4gICAgICAgICAgICByZXNvdXJjZXM6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFtQcmVkaWN0aXZlU2VhcmNoLlRZUEVTLlBST0RVQ1RdLFxyXG4gICAgICAgICAgICAgICAgbGltaXQ6IDYsXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdW5hdmFpbGFibGVfcHJvZHVjdHM6IFByZWRpY3RpdmVTZWFyY2guVU5BVkFJTEFCTEVfUFJPRFVDVFMuSElERSxcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUHJlZGljdGl2ZVNlYXJjaC5GSUVMRFMuVElUTEUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFByZWRpY3RpdmVTZWFyY2guRklFTERTLlZFTkRPUixcclxuICAgICAgICAgICAgICAgICAgICAgICAgUHJlZGljdGl2ZVNlYXJjaC5GSUVMRFMuUFJPRFVDVF9UWVBFLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQcmVkaWN0aXZlU2VhcmNoLkZJRUxEUy5WQVJJQU5UU19USVRMRSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUHJlZGljdGl2ZVNlYXJjaC5GSUVMRFMuVkFSSUFOVFNfU0tVLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQcmVkaWN0aXZlU2VhcmNoLkZJRUxEUy5WQVJJQU5UU19CQVJDT0RFLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQcmVkaWN0aXZlU2VhcmNoLkZJRUxEUy5UQUcsXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFNldCBzdWNjZXNzIGV2ZW50IGxpc3RlbmVyXHJcbiAgICAgICAgcHJlZGljdGl2ZVNlYXJjaC5vbihcInN1Y2Nlc3NcIiwgKHN1Z2dlc3Rpb25zKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RTdWdnZXN0aW9ucyA9IHN1Z2dlc3Rpb25zLnJlc291cmNlcy5yZXN1bHRzLnByb2R1Y3RzO1xyXG5cclxuICAgICAgICAgICAgaWYgKHByb2R1Y3RTdWdnZXN0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFJlbmRlcihwcm9kdWN0U3VnZ2VzdGlvbnMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRzLmlubmVySFRNTCA9IFwiPHNwYW4+Tm8gc3VnZ2VzdGlvbnM8L3NwYW4+XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gU2V0IGVycm9yIGV2ZW50IGxpc3RlbmVyXHJcbiAgICAgICAgcHJlZGljdGl2ZVNlYXJjaC5vbihcImVycm9yXCIsIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgbWVzc2FnZTpcIiwgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFNlbmQgcXVlcnlcclxuICAgICAgICBwcmVkaWN0aXZlU2VhcmNoLnF1ZXJ5KHF1ZXJ5KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTZWFyY2hSZXN1bHRzKHNlYXJjaFRlcm0pIHtcclxuICAgICAgICBjb25zdCBxdWVyeUtleSA9IHNlYXJjaFRlcm0ucmVwbGFjZShcIiBcIiwgXCItXCIpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgdGhpcy5zZXRMaXZlUmVnaW9uTG9hZGluZ1N0YXRlKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNhY2hlZFJlc3VsdHNbcXVlcnlLZXldKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyU2VhcmNoUmVzdWx0cyh0aGlzLmNhY2hlZFJlc3VsdHNbcXVlcnlLZXldKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmV0Y2goXHJcbiAgICAgICAgICAgIGAke3JvdXRlcy5wcmVkaWN0aXZlX3NlYXJjaF91cmx9P3E9JHtlbmNvZGVVUklDb21wb25lbnQoXHJcbiAgICAgICAgICAgICAgICBzZWFyY2hUZXJtXHJcbiAgICAgICAgICAgICl9JiR7ZW5jb2RlVVJJQ29tcG9uZW50KFwicmVzb3VyY2VzW3R5cGVdXCIpfT1wcm9kdWN0JiR7ZW5jb2RlVVJJQ29tcG9uZW50KFxyXG4gICAgICAgICAgICAgICAgXCJyZXNvdXJjZXNbbGltaXRdXCJcclxuICAgICAgICAgICAgKX09NCZzZWN0aW9uX2lkPXByZWRpY3RpdmUtc2VhcmNoYFxyXG4gICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IocmVzcG9uc2Uuc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHRleHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdHNNYXJrdXAgPSBuZXcgRE9NUGFyc2VyKClcclxuICAgICAgICAgICAgICAgICAgICAucGFyc2VGcm9tU3RyaW5nKHRleHQsIFwidGV4dC9odG1sXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIjc2hvcGlmeS1zZWN0aW9uLXByZWRpY3RpdmUtc2VhcmNoXCIpLmlubmVySFRNTDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVkUmVzdWx0c1txdWVyeUtleV0gPSByZXN1bHRzTWFya3VwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJTZWFyY2hSZXN1bHRzKHJlc3VsdHNNYXJrdXApO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VhcmNoUmVuZGVyKHN1Z2dlc3Rpb25zKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdHMgPSBcIlwiO1xyXG4gICAgICAgIHN1Z2dlc3Rpb25zLmZvckVhY2goKHN1Z2dlc3Rpb24pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0ID0gd2luZG93LnRoZW1lLm1vbmV5Rm9ybWF0LmluY2x1ZGVzKFwie3thbW91bnRfbm9fZGVjaW1hbHN9fVwiKVxyXG4gICAgICAgICAgICAgICAgPyBcInt7YW1vdW50X25vX2RlY2ltYWxzfX1cIlxyXG4gICAgICAgICAgICAgICAgOiBcInt7YW1vdW50fX1cIjtcclxuICAgICAgICAgICAgY29uc3QgbW9uZXlQcmljZSA9IHdpbmRvdy50aGVtZS5tb25leUZvcm1hdC5yZXBsYWNlKGZvcm1hdCwgc3VnZ2VzdGlvbi5wcmljZSk7XHJcbiAgICAgICAgICAgIHJlc3VsdHMgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIiR7c3VnZ2VzdGlvbi51cmx9XCIgY2xhc3M9XCJjLXByb2R1Y3QtY2FyZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwaWN0dXJlIGNsYXNzPVwiYy1wcm9kdWN0LWNhcmRfX2ltYWdlICBvLWltZ19fZnJhbWUgIG8tYXIgIG8tYXItLXNxdWFyZSAganMtaW1hZ2VcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiby1pbWcgIG8taW1nLS1jb3ZlciAgby1hcl9faXRlbVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPVwiJHtzdWdnZXN0aW9uLmltYWdlfVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwie3sgb2JqZWN0X2ltYWdlLmFsdCB9fVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZz1cImxhenlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9XCIxMDAlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodD1cIjEwMCVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvcGljdHVyZT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYy1wcm9kdWN0LWNhcmRfX2RldGFpbHNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwidC1oZWFkaW5nICB0LWZvbnQtc2l6ZS0temV0YVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtzdWdnZXN0aW9uLnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImMtcHJvZHVjdC1jYXJkX19wcmljZSAgbW9uZXlcIiBkYXRhLXByb2R1Y3QtaWQ9XCIke3N1Z2dlc3Rpb24uaWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke21vbmV5UHJpY2V9IDxzcGFuIGNsYXNzPVwiYy1wcm9kdWN0LWNhcmRfX3ByaWNlLXZhdFwiPkluY2wuIFZBVDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucmVzdWx0cy5pbm5lckhUTUwgPSByZXN1bHRzO1xyXG4gICAgfVxyXG5cclxuICAgIGlzSW5wdXRFbXB0eShzdHIpIHtcclxuICAgICAgICByZXR1cm4gIXN0ciB8fCAvXlxccyokLy50ZXN0KHN0cik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLy8gICAgIHN1cGVyKCk7XHJcblxyXG4gICAgLy8gICAgIHRoaXMuaW5wdXQgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJzZWFyY2hcIl0nKTtcclxuICAgIC8vICAgICB0aGlzLnByZWRpY3RpdmVTZWFyY2hSZXN1bHRzID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcjcHJlZGljdGl2ZS1zZWFyY2gnKTtcclxuXHJcbiAgICAvLyAgICAgdGhpcy5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMuZGVib3VuY2UoKGV2ZW50KSA9PiB7XHJcbiAgICAvLyAgICAgICB0aGlzLm9uQ2hhbmdlKGV2ZW50KTtcclxuICAgIC8vICAgICB9LCAzMDApLmJpbmQodGhpcykpO1xyXG4gICAgLy8gICB9XHJcblxyXG4gICAgb25DaGFuZ2UoKSB7XHJcbiAgICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IHRoaXMuaW5wdXQudmFsdWUudHJpbSgpO1xyXG5cclxuICAgICAgICBpZiAoIXNlYXJjaFRlcm0ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5nZXRTZWFyY2hSZXN1bHRzKHNlYXJjaFRlcm0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICAgZ2V0U2VhcmNoUmVzdWx0cyhzZWFyY2hUZXJtKSB7XHJcbiAgICAvLyAgICAgZmV0Y2goYC9zZWFyY2gvc3VnZ2VzdD9xPSR7c2VhcmNoVGVybX0mcmVzb3VyY2VzW3R5cGVdPXByb2R1Y3QmcmVzb3VyY2VzW2xpbWl0XT00JnNlY3Rpb25faWQ9cHJlZGljdGl2ZS1zZWFyY2hgKVxyXG4gICAgLy8gICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAvLyAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgIC8vICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcihyZXNwb25zZS5zdGF0dXMpO1xyXG4gICAgLy8gICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIC8vICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgIC8vICAgICAgICAgfVxyXG5cclxuICAgIC8vICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKTtcclxuICAgIC8vICAgICAgIH0pXHJcbiAgICAvLyAgICAgICAudGhlbigodGV4dCkgPT4ge1xyXG4gICAgLy8gICAgICAgICBjb25zdCByZXN1bHRzTWFya3VwID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyh0ZXh0LCAndGV4dC9odG1sJykucXVlcnlTZWxlY3RvcignI3Nob3BpZnktc2VjdGlvbi1wcmVkaWN0aXZlLXNlYXJjaCcpLmlubmVySFRNTDtcclxuICAgIC8vICAgICAgICAgdGhpcy5wcmVkaWN0aXZlU2VhcmNoUmVzdWx0cy5pbm5lckhUTUwgPSByZXN1bHRzTWFya3VwO1xyXG4gICAgLy8gICAgICAgICB0aGlzLm9wZW4oKTtcclxuICAgIC8vICAgICAgIH0pXHJcbiAgICAvLyAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIC8vICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAvLyAgICAgICB9KTtcclxuICAgIC8vICAgfVxyXG5cclxuICAgIC8vICAgb3BlbigpIHtcclxuICAgIC8vICAgICB0aGlzLnByZWRpY3RpdmVTZWFyY2hSZXN1bHRzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgLy8gICB9XHJcblxyXG4gICAgLy8gICBjbG9zZSgpIHtcclxuICAgIC8vICAgICB0aGlzLnByZWRpY3RpdmVTZWFyY2hSZXN1bHRzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAvLyAgIH1cclxuXHJcbiAgICBkZWJvdW5jZShmbiwgd2FpdCkge1xyXG4gICAgICAgIGxldCB0O1xyXG4gICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodCk7XHJcbiAgICAgICAgICAgIHQgPSBzZXRUaW1lb3V0KCgpID0+IGZuLmFwcGx5KHRoaXMsIGFyZ3MpLCB3YWl0KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7IFByZWRpY3RpdmVTZWFyY2ggfTtcclxuIl0sIm5hbWVzIjpbImdldCIsIlByZWRpY3RpdmVTZWFyY2giLCJIVE1MRWxlbWVudCIsImNvbnN0cnVjdG9yIiwiZWxlbWVudCIsImZvcm0iLCJ0cmlnZ2VyIiwidGFyZ2V0IiwiY2xvc2UiLCJvdmVybGF5IiwiaGVhZGVyIiwiaW5wdXQiLCJyZXN1bHRzIiwic2VhcmNoUGFnZSIsInBhZ2UiLCJpdGVtQ2xpY2tlZFRlc3QiLCJiaW5kRXZlbnRzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZU9wZW4iLCJoYW5kbGVDbG9zZSIsImlzSW5wdXRFbXB0eSIsInZhbHVlIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwicHJlZGljdGl2ZVNlYXJjaCIsImFkZCIsImRvY3VtZW50IiwiYWN0aXZlRWxlbWVudCIsImNsb3NlU2VhcmNoUmVzdWx0cyIsImFsZXJ0IiwiY29udGFpbnMiLCJzZWFyY2hUZXJtIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJvayIsImVycm9yIiwiRXJyb3IiLCJzdGF0dXMiLCJ0ZXh0IiwicmVzdWx0c01hcmt1cCIsIkRPTVBhcnNlciIsInBhcnNlRnJvbVN0cmluZyIsInF1ZXJ5U2VsZWN0b3IiLCJpbm5lckhUTUwiLCJwcmVkaWN0aXZlU2VhcmNoUmVzdWx0cyIsIm9wZW4iLCJjYXRjaCIsInJlc291cmNlcyIsInR5cGUiLCJUWVBFUyIsIlBST0RVQ1QiLCJsaW1pdCIsIm9wdGlvbnMiLCJ1bmF2YWlsYWJsZV9wcm9kdWN0cyIsIlVOQVZBSUxBQkxFX1BST0RVQ1RTIiwiSElERSIsImZpZWxkcyIsIkZJRUxEUyIsIlRJVExFIiwiVkVORE9SIiwiUFJPRFVDVF9UWVBFIiwiVkFSSUFOVFNfVElUTEUiLCJWQVJJQU5UU19TS1UiLCJWQVJJQU5UU19CQVJDT0RFIiwiVEFHIiwib24iLCJzdWdnZXN0aW9ucyIsInByb2R1Y3RTdWdnZXN0aW9ucyIsInByb2R1Y3RzIiwibGVuZ3RoIiwic2VhcmNoUmVuZGVyIiwiY29uc29sZSIsIm1lc3NhZ2UiLCJxdWVyeSIsImdldFNlYXJjaFJlc3VsdHMiLCJxdWVyeUtleSIsInJlcGxhY2UiLCJ0b0xvd2VyQ2FzZSIsInNldExpdmVSZWdpb25Mb2FkaW5nU3RhdGUiLCJjYWNoZWRSZXN1bHRzIiwicmVuZGVyU2VhcmNoUmVzdWx0cyIsInJvdXRlcyIsInByZWRpY3RpdmVfc2VhcmNoX3VybCIsImVuY29kZVVSSUNvbXBvbmVudCIsImZvckVhY2giLCJzdWdnZXN0aW9uIiwiZm9ybWF0Iiwid2luZG93IiwidGhlbWUiLCJtb25leUZvcm1hdCIsImluY2x1ZGVzIiwibW9uZXlQcmljZSIsInByaWNlIiwidXJsIiwiaW1hZ2UiLCJ0aXRsZSIsImlkIiwic3RyIiwidGVzdCIsIm9uQ2hhbmdlIiwidHJpbSIsImRlYm91bmNlIiwiZm4iLCJ3YWl0IiwidCIsImFyZ3MiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiYXBwbHkiXSwic291cmNlUm9vdCI6IiJ9