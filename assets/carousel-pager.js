"use strict";
(self["webpackChunkjuno_shopify_template"] = self["webpackChunkjuno_shopify_template"] || []).push([["carousel-pager"],{

/***/ "./src/assets/js/main/carousel/Pager.ts":
/*!**********************************************!*\
  !*** ./src/assets/js/main/carousel/Pager.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/attach-event.ts");
// http://jongund.github.io/aria-examples/bootstrap-carousel/carousel-3.html
// https://www.w3.org/WAI/tutorials/carousels/functionality/


class Pager {
  constructor(container, carousel) {
    this.activeItem = void 0;
    this.pageDots = void 0;
    this.pageDots = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)("[data-slide]", container);
    this.activeItem = this.pageDots.find(el => el.hasAttribute("aria-current"));
    this.bindClick(carousel);
    carousel.on("change", slideIndex => this.updateCurrentDot(slideIndex));
  }

  bindClick(carousel) {
    this.pageDots.forEach(element => {
      (0,_utils__WEBPACK_IMPORTED_MODULE_1__.attachEvent)("click", element, () => {
        if (element === this.activeItem) return;
        const slideIndex = element.getAttribute("data-slide");
        carousel.select(slideIndex);
      });
    });
  }

  updateCurrentDot(slideIndex) {
    this.activeItem.removeAttribute("aria-current");
    this.activeItem = this.pageDots[slideIndex];
    this.activeItem.setAttribute("aria-current", "step");
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pager);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2Nhcm91c2VsLXBhZ2VyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFFQTs7QUFFQSxNQUFNRSxLQUFOLENBQVk7RUFJUkMsV0FBVyxDQUFDQyxTQUFELEVBQXlCQyxRQUF6QixFQUF3QztJQUFBLEtBSG5EQyxVQUdtRDtJQUFBLEtBRm5EQyxRQUVtRDtJQUMvQyxLQUFLQSxRQUFMLEdBQWdCUCw4Q0FBTSxDQUFDLGNBQUQsRUFBaUJJLFNBQWpCLENBQXRCO0lBQ0EsS0FBS0UsVUFBTCxHQUFrQixLQUFLQyxRQUFMLENBQWNDLElBQWQsQ0FBb0JDLEVBQUQsSUFBUUEsRUFBRSxDQUFDQyxZQUFILENBQWdCLGNBQWhCLENBQTNCLENBQWxCO0lBRUEsS0FBS0MsU0FBTCxDQUFlTixRQUFmO0lBQ0FBLFFBQVEsQ0FBQ08sRUFBVCxDQUFZLFFBQVosRUFBdUJDLFVBQUQsSUFBd0IsS0FBS0MsZ0JBQUwsQ0FBc0JELFVBQXRCLENBQTlDO0VBQ0g7O0VBRURGLFNBQVMsQ0FBQ04sUUFBRCxFQUFnQjtJQUNyQixLQUFLRSxRQUFMLENBQWNRLE9BQWQsQ0FBdUJDLE9BQUQsSUFBYTtNQUMvQmYsbURBQVcsQ0FBQyxPQUFELEVBQVVlLE9BQVYsRUFBbUIsTUFBTTtRQUNoQyxJQUFJQSxPQUFPLEtBQUssS0FBS1YsVUFBckIsRUFBaUM7UUFDakMsTUFBTU8sVUFBVSxHQUFHRyxPQUFPLENBQUNDLFlBQVIsQ0FBcUIsWUFBckIsQ0FBbkI7UUFDQVosUUFBUSxDQUFDYSxNQUFULENBQWdCTCxVQUFoQjtNQUNILENBSlUsQ0FBWDtJQUtILENBTkQ7RUFPSDs7RUFFREMsZ0JBQWdCLENBQUNELFVBQUQsRUFBcUI7SUFDakMsS0FBS1AsVUFBTCxDQUFnQmEsZUFBaEIsQ0FBZ0MsY0FBaEM7SUFDQSxLQUFLYixVQUFMLEdBQWtCLEtBQUtDLFFBQUwsQ0FBY00sVUFBZCxDQUFsQjtJQUNBLEtBQUtQLFVBQUwsQ0FBZ0JjLFlBQWhCLENBQTZCLGNBQTdCLEVBQTZDLE1BQTdDO0VBQ0g7O0FBMUJPOztBQTZCWixpRUFBZWxCLEtBQWYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL21haW4vY2Fyb3VzZWwvUGFnZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gaHR0cDovL2pvbmd1bmQuZ2l0aHViLmlvL2FyaWEtZXhhbXBsZXMvYm9vdHN0cmFwLWNhcm91c2VsL2Nhcm91c2VsLTMuaHRtbFxyXG4vLyBodHRwczovL3d3dy53My5vcmcvV0FJL3R1dG9yaWFscy9jYXJvdXNlbHMvZnVuY3Rpb25hbGl0eS9cclxuXHJcbmltcG9ydCB7IGdldEFsbCwgYXR0YWNoRXZlbnQgfSBmcm9tIFwiQC91dGlsc1wiO1xyXG5cclxuY2xhc3MgUGFnZXIge1xyXG4gICAgYWN0aXZlSXRlbTogSFRNTEVsZW1lbnQ7XHJcbiAgICBwYWdlRG90czogSFRNTEVsZW1lbnRbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXI6IEhUTUxFbGVtZW50LCBjYXJvdXNlbDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5wYWdlRG90cyA9IGdldEFsbChcIltkYXRhLXNsaWRlXVwiLCBjb250YWluZXIpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IHRoaXMucGFnZURvdHMuZmluZCgoZWwpID0+IGVsLmhhc0F0dHJpYnV0ZShcImFyaWEtY3VycmVudFwiKSkhO1xyXG5cclxuICAgICAgICB0aGlzLmJpbmRDbGljayhjYXJvdXNlbCk7XHJcbiAgICAgICAgY2Fyb3VzZWwub24oXCJjaGFuZ2VcIiwgKHNsaWRlSW5kZXg6IG51bWJlcikgPT4gdGhpcy51cGRhdGVDdXJyZW50RG90KHNsaWRlSW5kZXgpKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kQ2xpY2soY2Fyb3VzZWw6IGFueSkge1xyXG4gICAgICAgIHRoaXMucGFnZURvdHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBhdHRhY2hFdmVudChcImNsaWNrXCIsIGVsZW1lbnQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50ID09PSB0aGlzLmFjdGl2ZUl0ZW0pIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNsaWRlSW5kZXggPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtc2xpZGVcIik7XHJcbiAgICAgICAgICAgICAgICBjYXJvdXNlbC5zZWxlY3Qoc2xpZGVJbmRleCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUN1cnJlbnREb3Qoc2xpZGVJbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVJdGVtLnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtY3VycmVudFwiKTtcclxuICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSB0aGlzLnBhZ2VEb3RzW3NsaWRlSW5kZXhdO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWN1cnJlbnRcIiwgXCJzdGVwXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQYWdlcjtcclxuIl0sIm5hbWVzIjpbImdldEFsbCIsImF0dGFjaEV2ZW50IiwiUGFnZXIiLCJjb25zdHJ1Y3RvciIsImNvbnRhaW5lciIsImNhcm91c2VsIiwiYWN0aXZlSXRlbSIsInBhZ2VEb3RzIiwiZmluZCIsImVsIiwiaGFzQXR0cmlidXRlIiwiYmluZENsaWNrIiwib24iLCJzbGlkZUluZGV4IiwidXBkYXRlQ3VycmVudERvdCIsImZvckVhY2giLCJlbGVtZW50IiwiZ2V0QXR0cmlidXRlIiwic2VsZWN0IiwicmVtb3ZlQXR0cmlidXRlIiwic2V0QXR0cmlidXRlIl0sInNvdXJjZVJvb3QiOiIifQ==