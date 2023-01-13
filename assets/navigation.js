"use strict";
(self["webpackChunkjuno_shopify_template"] = self["webpackChunkjuno_shopify_template"] || []).push([["navigation"],{

/***/ "./src/assets/js/main/navigation/Navigation.js":
/*!*****************************************************!*\
  !*** ./src/assets/js/main/navigation/Navigation.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Navigation": () => (/* binding */ Navigation)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/body-scroll-lock.ts");


class Navigation {
  constructor(element) {
    this.element = element;
    this.desktopNav = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".destkop-nav");
    this.mobileNav = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".mobile-nav");
    this.navOverlay = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".nav-overlay"); //header search icon

    this.headerSearchIcon = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".c-header__search-open");
    this.headerSearchForm = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".c-header__search-form");
    this.navInner = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-nav-inner", this.element);
    this.navItems = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)(".js-nav-item", this.element);
    this.navLinkItems = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)(".js-nav-link", this.element);
    this.burgerButton = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-nav-toggle");
    this.closeButton = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-nav-close");
    this.brand = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-brand");
    this.subnavTriggers = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)(".js-subnav-link", this.element);
    this.subnavTargets = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)(".js-subnav-target", this.element);
    this.subnavInners = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)(".js-subnav-inner", this.element);
    this.subsubnavTargets = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)(".js-subsubnav-target", this.element);
    this.subnavMobileTriggers = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)(".js-next-level", this.element);
    this.subsubnavMobileTriggers = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)(".js-next-next-level", this.element);
    this.bindEvents();
  }

  bindEvents() {
    if (window.innerWidth > 820) {
      this.deskNavOpen();
    } else {
      this.deskNavOpen();
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth < 820) this.deskNavOpen();
    });
    this.searchFormOpen();
  }

  searchFormOpen() {
    this.headerSearchIcon.addEventListener("click", () => {
      this.headerSearchForm.classList.remove("is-hidden");
      _utils__WEBPACK_IMPORTED_MODULE_1__.lock();
    });
  }

  mobileNavOpen() {
    this.burgerButton.addEventListener("click", () => {
      this.element.classList.add("is-active");
      this.burgerButton.classList.add("is-active");
      this.closeButton.classList.add("is-active");
      this.brand.classList.add("is-top");
      _utils__WEBPACK_IMPORTED_MODULE_1__.lock();
    });
    this.subnavTrigger();
    this.mobileNavClose();
  }

  deskNavOpen() {
    this.burgerButton.addEventListener("click", () => {
      this.element.classList.add("is-active");
      this.desktopNav.classList.add("is-active");
      this.navOverlay.classList.add("is-active");
      this.burgerButton.classList.add("is-active");
      this.closeButton.classList.add("is-active");
      this.brand.classList.add("is-top");
      _utils__WEBPACK_IMPORTED_MODULE_1__.lock();
    });
    this.mobileNavClose();
  }

  mobileNavClose() {
    this.closeButton.addEventListener("click", () => {
      this.element.classList.remove("is-active");
      this.desktopNav.classList.remove("is-active");
      this.navOverlay.classList.remove("is-active");
      this.burgerButton.classList.remove("is-active");
      this.closeButton.classList.remove("is-active");
      this.brand.classList.remove("is-top");
      this.navReset();
      _utils__WEBPACK_IMPORTED_MODULE_1__.release();
    });
    this.navOverlay.addEventListener("click", () => {
      this.element.classList.remove("is-active");
      this.navOverlay.classList.remove("is-active");
      this.desktopNav.classList.remove("is-active");
      this.burgerButton.classList.remove("is-active");
      this.closeButton.classList.remove("is-active");
      this.brand.classList.remove("is-top");
      this.navReset();
      _utils__WEBPACK_IMPORTED_MODULE_1__.release();
    });
  }

  subnavTrigger() {
    // Uncomment below for opening subnav when title is clicked
    this.subnavTriggers.forEach(trigger => {
      trigger.addEventListener("click", event => {
        const elTrigger = event.currentTarget;
        event.preventDefault();
        this.subnavOpen(elTrigger);
        this.brand.classList.remove("is-top");
      });
    });
    this.subnavMobileTriggers.forEach(trigger => {
      trigger.addEventListener("click", event => {
        const elTrigger = event.currentTarget;
        this.subnavOpen(elTrigger);
        this.brand.classList.remove("is-top");
      });
    });
  }

  subnavOpen(element) {
    const triggerId = element.getAttribute("data-id");
    this.subnavTargets.forEach(target => {
      const targetId = target.getAttribute("data-id");

      if (targetId === triggerId) {
        target.classList.add("is-active");
        this.element.classList.add("is-closed");
        this.navInner.classList.add("is-closed");
        this.subnavReturn(target);
      } else {
        target.classList.remove("is-active");
      }
    });
  }

  subnavReturn(target) {
    const subnavReturn = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-subnav-return", target);
    subnavReturn.addEventListener("click", () => {
      this.element.classList.remove("is-closed");
      this.navInner.classList.remove("is-closed");
      target.classList.remove("is-active");
      this.brand.classList.add("is-top");
    });
  }

  navReset() {
    this.navInner.classList.remove("is-closed");
    this.subnavInners.forEach(inner => {
      if (inner.classList.contains("is-closed")) inner.classList.remove("is-closed");
    });
    this.subnavTargets.forEach(target => {
      if (target.classList.contains("is-active")) target.classList.remove("is-active");
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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUU7RUFIYSxDQUE1QjtBQUtIO0FBRU0sU0FBU3ZCLE9BQVQsR0FBbUI7RUFDdEJ3QixNQUFNLENBQUNDLE1BQVAsQ0FBY1YsTUFBTSxDQUFDSSxLQUFyQixFQUE0QkQsa0JBQTVCO0FBQ0giLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL21haW4vbmF2aWdhdGlvbi9OYXZpZ2F0aW9uLmpzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvdXRpbHMvYm9keS1zY3JvbGwtbG9jay50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRBbGwsIGdldCwgYm9keVNjcm9sbExvY2sgfSBmcm9tIFwiQC91dGlsc1wiO1xyXG5cclxuY2xhc3MgTmF2aWdhdGlvbiB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICB0aGlzLmRlc2t0b3BOYXYgPSBnZXQoXCIuZGVzdGtvcC1uYXZcIik7XHJcbiAgICAgICAgdGhpcy5tb2JpbGVOYXYgPSBnZXQoXCIubW9iaWxlLW5hdlwiKTtcclxuICAgICAgICB0aGlzLm5hdk92ZXJsYXkgID0gZ2V0KFwiLm5hdi1vdmVybGF5XCIpO1xyXG5cclxuICAgICAgICAvL2hlYWRlciBzZWFyY2ggaWNvblxyXG4gICAgICAgIHRoaXMuaGVhZGVyU2VhcmNoSWNvbiA9IGdldChcIi5jLWhlYWRlcl9fc2VhcmNoLW9wZW5cIik7XHJcbiAgICAgICAgdGhpcy5oZWFkZXJTZWFyY2hGb3JtID0gZ2V0KFwiLmMtaGVhZGVyX19zZWFyY2gtZm9ybVwiKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMubmF2SW5uZXIgPSBnZXQoXCIuanMtbmF2LWlubmVyXCIsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5uYXZJdGVtcyA9IGdldEFsbChcIi5qcy1uYXYtaXRlbVwiLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMubmF2TGlua0l0ZW1zID0gZ2V0QWxsKFwiLmpzLW5hdi1saW5rXCIsIHRoaXMuZWxlbWVudCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnVyZ2VyQnV0dG9uID0gZ2V0KFwiLmpzLW5hdi10b2dnbGVcIik7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbiA9IGdldChcIi5qcy1uYXYtY2xvc2VcIik7XHJcbiAgICAgICAgdGhpcy5icmFuZCA9IGdldChcIi5qcy1icmFuZFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdWJuYXZUcmlnZ2VycyA9IGdldEFsbChcIi5qcy1zdWJuYXYtbGlua1wiLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMuc3VibmF2VGFyZ2V0cyA9IGdldEFsbChcIi5qcy1zdWJuYXYtdGFyZ2V0XCIsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5zdWJuYXZJbm5lcnMgPSBnZXRBbGwoXCIuanMtc3VibmF2LWlubmVyXCIsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5zdWJzdWJuYXZUYXJnZXRzID0gZ2V0QWxsKFwiLmpzLXN1YnN1Ym5hdi10YXJnZXRcIiwgdGhpcy5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgdGhpcy5zdWJuYXZNb2JpbGVUcmlnZ2VycyA9IGdldEFsbChcIi5qcy1uZXh0LWxldmVsXCIsIHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5zdWJzdWJuYXZNb2JpbGVUcmlnZ2VycyA9IGdldEFsbChcIi5qcy1uZXh0LW5leHQtbGV2ZWxcIiwgdGhpcy5lbGVtZW50KTtcclxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kRXZlbnRzKCkge1xyXG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDgyMCl7XHJcbiAgICAgICAgICAgIHRoaXMuZGVza05hdk9wZW4oKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5kZXNrTmF2T3BlbigpO1xyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgODIwKSB0aGlzLmRlc2tOYXZPcGVuKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2VhcmNoRm9ybU9wZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWFyY2hGb3JtT3BlbigpIHtcclxuICAgICAgICB0aGlzLmhlYWRlclNlYXJjaEljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5oZWFkZXJTZWFyY2hGb3JtLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1oaWRkZW5cIik7XHJcbiAgICAgICAgICAgIGJvZHlTY3JvbGxMb2NrLmxvY2soKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBtb2JpbGVOYXZPcGVuKCkge1xyXG4gICAgICAgIHRoaXMuYnVyZ2VyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaXMtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmJ1cmdlckJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiaXMtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJpcy1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIHRoaXMuYnJhbmQuY2xhc3NMaXN0LmFkZChcImlzLXRvcFwiKTtcclxuICAgICAgICAgICAgYm9keVNjcm9sbExvY2subG9jaygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnN1Ym5hdlRyaWdnZXIoKTtcclxuICAgICAgICB0aGlzLm1vYmlsZU5hdkNsb3NlKCk7XHJcbiAgICB9XHJcbiAgICBkZXNrTmF2T3BlbigpIHtcclxuICAgICAgICB0aGlzLmJ1cmdlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImlzLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5kZXNrdG9wTmF2LmNsYXNzTGlzdC5hZGQoXCJpcy1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIHRoaXMubmF2T3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwiaXMtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmJ1cmdlckJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiaXMtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJpcy1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIHRoaXMuYnJhbmQuY2xhc3NMaXN0LmFkZChcImlzLXRvcFwiKTtcclxuICAgICAgICAgICAgYm9keVNjcm9sbExvY2subG9jaygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLm1vYmlsZU5hdkNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9iaWxlTmF2Q2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImlzLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5kZXNrdG9wTmF2LmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIHRoaXMubmF2T3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmJ1cmdlckJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIHRoaXMuYnJhbmQuY2xhc3NMaXN0LnJlbW92ZShcImlzLXRvcFwiKTtcclxuICAgICAgICAgICAgdGhpcy5uYXZSZXNldCgpO1xyXG4gICAgICAgICAgICBib2R5U2Nyb2xsTG9jay5yZWxlYXNlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5uYXZPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLm5hdk92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZShcImlzLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5kZXNrdG9wTmF2LmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIHRoaXMuYnVyZ2VyQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImlzLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5icmFuZC5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtdG9wXCIpO1xyXG4gICAgICAgICAgICB0aGlzLm5hdlJlc2V0KCk7XHJcbiAgICAgICAgICAgIGJvZHlTY3JvbGxMb2NrLnJlbGVhc2UoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgXHJcblxyXG4gICAgc3VibmF2VHJpZ2dlcigpIHtcclxuICAgICAgICAvLyBVbmNvbW1lbnQgYmVsb3cgZm9yIG9wZW5pbmcgc3VibmF2IHdoZW4gdGl0bGUgaXMgY2xpY2tlZFxyXG4gICAgICAgIHRoaXMuc3VibmF2VHJpZ2dlcnMuZm9yRWFjaCgodHJpZ2dlcikgPT4ge1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsVHJpZ2dlciA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdWJuYXZPcGVuKGVsVHJpZ2dlcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJyYW5kLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy10b3BcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc3VibmF2TW9iaWxlVHJpZ2dlcnMuZm9yRWFjaCgodHJpZ2dlcikgPT4ge1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsVHJpZ2dlciA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1Ym5hdk9wZW4oZWxUcmlnZ2VyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnJhbmQuY2xhc3NMaXN0LnJlbW92ZShcImlzLXRvcFwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3VibmF2T3BlbihlbGVtZW50KSB7XHJcbiAgICAgICAgY29uc3QgdHJpZ2dlcklkID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xyXG4gICAgICAgIHRoaXMuc3VibmF2VGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0SWQgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0YXJnZXRJZCA9PT0gdHJpZ2dlcklkKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcImlzLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaXMtY2xvc2VkXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXZJbm5lci5jbGFzc0xpc3QuYWRkKFwiaXMtY2xvc2VkXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdWJuYXZSZXR1cm4odGFyZ2V0KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3VibmF2UmV0dXJuKHRhcmdldCkge1xyXG4gICAgICAgIGNvbnN0IHN1Ym5hdlJldHVybiA9IGdldChcIi5qcy1zdWJuYXYtcmV0dXJuXCIsIHRhcmdldCk7XHJcblxyXG4gICAgICAgIHN1Ym5hdlJldHVybi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImlzLWNsb3NlZFwiKTtcclxuICAgICAgICAgICAgdGhpcy5uYXZJbm5lci5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtY2xvc2VkXCIpO1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImlzLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5icmFuZC5jbGFzc0xpc3QuYWRkKFwiaXMtdG9wXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5hdlJlc2V0KCkge1xyXG4gICAgICAgIHRoaXMubmF2SW5uZXIuY2xhc3NMaXN0LnJlbW92ZShcImlzLWNsb3NlZFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdWJuYXZJbm5lcnMuZm9yRWFjaCgoaW5uZXIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGlubmVyLmNsYXNzTGlzdC5jb250YWlucyhcImlzLWNsb3NlZFwiKSkgaW5uZXIuY2xhc3NMaXN0LnJlbW92ZShcImlzLWNsb3NlZFwiKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zdWJuYXZUYXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImlzLWFjdGl2ZVwiKSkgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1hY3RpdmVcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IE5hdmlnYXRpb24gfTtcclxuIiwiY29uc3QgZWxIdG1sID0gZG9jdW1lbnQuYm9keTtcclxuXHJcbmxldCBwcmV2aW91c0h0bWxTdHlsZXMgPSB7fTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2NrKCkge1xyXG4gICAgY29uc3QgeyBzdHlsZTogaHRtbFN0eWxlIH0gPSBlbEh0bWw7XHJcblxyXG4gICAgcHJldmlvdXNIdG1sU3R5bGVzID0ge1xyXG4gICAgICAgIG92ZXJmbG93WTogaHRtbFN0eWxlLm92ZXJmbG93WSxcclxuICAgICAgICBtaW5IZWlnaHQ6IGh0bWxTdHlsZS5taW5IZWlnaHQsXHJcbiAgICAgICAgbWF4SGVpZ2h0OiBcImF1dG9cIixcclxuICAgIH07XHJcblxyXG4gICAgT2JqZWN0LmFzc2lnbihlbEh0bWwuc3R5bGUsIHtcclxuICAgICAgICBvdmVyZmxvd1k6IFwiaGlkZGVuXCIsXHJcbiAgICAgICAgbWluSGVpZ2h0OiBcIjEwMHZoXCIsXHJcbiAgICAgICAgbWF4SGVpZ2h0OiBcIjEwMHZoXCIsXHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbGVhc2UoKSB7XHJcbiAgICBPYmplY3QuYXNzaWduKGVsSHRtbC5zdHlsZSwgcHJldmlvdXNIdG1sU3R5bGVzKTtcclxufVxyXG4iXSwibmFtZXMiOlsiZ2V0QWxsIiwiZ2V0IiwiYm9keVNjcm9sbExvY2siLCJOYXZpZ2F0aW9uIiwiY29uc3RydWN0b3IiLCJlbGVtZW50IiwiZGVza3RvcE5hdiIsIm1vYmlsZU5hdiIsIm5hdk92ZXJsYXkiLCJoZWFkZXJTZWFyY2hJY29uIiwiaGVhZGVyU2VhcmNoRm9ybSIsIm5hdklubmVyIiwibmF2SXRlbXMiLCJuYXZMaW5rSXRlbXMiLCJidXJnZXJCdXR0b24iLCJjbG9zZUJ1dHRvbiIsImJyYW5kIiwic3VibmF2VHJpZ2dlcnMiLCJzdWJuYXZUYXJnZXRzIiwic3VibmF2SW5uZXJzIiwic3Vic3VibmF2VGFyZ2V0cyIsInN1Ym5hdk1vYmlsZVRyaWdnZXJzIiwic3Vic3VibmF2TW9iaWxlVHJpZ2dlcnMiLCJiaW5kRXZlbnRzIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImRlc2tOYXZPcGVuIiwiYWRkRXZlbnRMaXN0ZW5lciIsInNlYXJjaEZvcm1PcGVuIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwibG9jayIsIm1vYmlsZU5hdk9wZW4iLCJhZGQiLCJzdWJuYXZUcmlnZ2VyIiwibW9iaWxlTmF2Q2xvc2UiLCJuYXZSZXNldCIsInJlbGVhc2UiLCJmb3JFYWNoIiwidHJpZ2dlciIsImV2ZW50IiwiZWxUcmlnZ2VyIiwiY3VycmVudFRhcmdldCIsInByZXZlbnREZWZhdWx0Iiwic3VibmF2T3BlbiIsInRyaWdnZXJJZCIsImdldEF0dHJpYnV0ZSIsInRhcmdldCIsInRhcmdldElkIiwic3VibmF2UmV0dXJuIiwiaW5uZXIiLCJjb250YWlucyIsImVsSHRtbCIsImRvY3VtZW50IiwiYm9keSIsInByZXZpb3VzSHRtbFN0eWxlcyIsInN0eWxlIiwiaHRtbFN0eWxlIiwib3ZlcmZsb3dZIiwibWluSGVpZ2h0IiwibWF4SGVpZ2h0IiwiT2JqZWN0IiwiYXNzaWduIl0sInNvdXJjZVJvb3QiOiIifQ==