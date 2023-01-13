"use strict";
(self["webpackChunkjuno_shopify_template"] = self["webpackChunkjuno_shopify_template"] || []).push([["accordion"],{

/***/ "./src/assets/js/main/accordion/Accordion.ts":
/*!***************************************************!*\
  !*** ./src/assets/js/main/accordion/Accordion.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Accordion)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");

class Accordion {
  constructor(element) {
    this.element = void 0;
    this.triggers = void 0;
    this.element = element;
    this.triggers = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAll)(".js-accordion-trigger", this.element);
    this.bindEvents();
  }

  bindEvents() {
    let elActivePanel;
    let elActiveTrigger = this.triggers.find(el => el.classList.contains("is-open"));

    if (elActiveTrigger) {
      elActivePanel = elActiveTrigger.nextElementSibling;
    }

    this.triggers.forEach(trigger => {
      const elPanel = trigger.nextElementSibling;
      let savedHeight;

      if (trigger.classList.contains("is-open")) {
        savedHeight = elPanel.offsetHeight;
        elPanel.style.maxHeight = `${savedHeight + 30}px`;
      }

      trigger.addEventListener("click", event => {
        const elTrigger = event.currentTarget;

        if (elActiveTrigger && elActiveTrigger !== elTrigger) {
          elActiveTrigger.classList.remove("is-open");
          elActivePanel.style.maxHeight = "0px";
        }

        if (!savedHeight) {
          elPanel.style.maxHeight = "none";
          savedHeight = elPanel.offsetHeight;
          elPanel.style.maxHeight = "0px";
        }

        requestAnimationFrame(() => {
          const isOpen = elTrigger.classList.toggle("is-open");
          elPanel.style.maxHeight = `${isOpen ? savedHeight + 30 : 0}px`;
          elActivePanel = elPanel;
          elActiveTrigger = elTrigger;
        });
      });
    });
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2FjY29yZGlvbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBRWUsTUFBTUMsU0FBTixDQUFnQjtFQUkzQkMsV0FBVyxDQUFDQyxPQUFELEVBQXVCO0lBQUEsS0FIbENBLE9BR2tDO0lBQUEsS0FGbENDLFFBRWtDO0lBQzlCLEtBQUtELE9BQUwsR0FBZUEsT0FBZjtJQUNBLEtBQUtDLFFBQUwsR0FBZ0JKLDhDQUFNLENBQUMsdUJBQUQsRUFBMEIsS0FBS0csT0FBL0IsQ0FBdEI7SUFFQSxLQUFLRSxVQUFMO0VBQ0g7O0VBRURBLFVBQVUsR0FBRztJQUNULElBQUlDLGFBQUo7SUFDQSxJQUFJQyxlQUFlLEdBQUcsS0FBS0gsUUFBTCxDQUFjSSxJQUFkLENBQW9CQyxFQUFELElBQVFBLEVBQUUsQ0FBQ0MsU0FBSCxDQUFhQyxRQUFiLENBQXNCLFNBQXRCLENBQTNCLENBQXRCOztJQUVBLElBQUlKLGVBQUosRUFBcUI7TUFDakJELGFBQWEsR0FBR0MsZUFBZSxDQUFDSyxrQkFBaEM7SUFDSDs7SUFFRCxLQUFLUixRQUFMLENBQWNTLE9BQWQsQ0FBdUJDLE9BQUQsSUFBYTtNQUMvQixNQUFNQyxPQUFPLEdBQUdELE9BQU8sQ0FBQ0Ysa0JBQXhCO01BQ0EsSUFBSUksV0FBSjs7TUFFQSxJQUFJRixPQUFPLENBQUNKLFNBQVIsQ0FBa0JDLFFBQWxCLENBQTJCLFNBQTNCLENBQUosRUFBMkM7UUFDdkNLLFdBQVcsR0FBR0QsT0FBTyxDQUFDRSxZQUF0QjtRQUNBRixPQUFPLENBQUNHLEtBQVIsQ0FBY0MsU0FBZCxHQUEyQixHQUFFSCxXQUFXLEdBQUcsRUFBRyxJQUE5QztNQUNIOztNQUVERixPQUFPLENBQUNNLGdCQUFSLENBQXlCLE9BQXpCLEVBQW1DQyxLQUFELElBQVc7UUFDekMsTUFBTUMsU0FBUyxHQUFHRCxLQUFLLENBQUNFLGFBQXhCOztRQUNBLElBQUloQixlQUFlLElBQUlBLGVBQWUsS0FBS2UsU0FBM0MsRUFBc0Q7VUFDbERmLGVBQWUsQ0FBQ0csU0FBaEIsQ0FBMEJjLE1BQTFCLENBQWlDLFNBQWpDO1VBQ0FsQixhQUFhLENBQUNZLEtBQWQsQ0FBb0JDLFNBQXBCLEdBQWdDLEtBQWhDO1FBQ0g7O1FBRUQsSUFBSSxDQUFDSCxXQUFMLEVBQWtCO1VBQ2RELE9BQU8sQ0FBQ0csS0FBUixDQUFjQyxTQUFkLEdBQTBCLE1BQTFCO1VBQ0FILFdBQVcsR0FBR0QsT0FBTyxDQUFDRSxZQUF0QjtVQUNBRixPQUFPLENBQUNHLEtBQVIsQ0FBY0MsU0FBZCxHQUEwQixLQUExQjtRQUNIOztRQUVETSxxQkFBcUIsQ0FBQyxNQUFNO1VBQ3hCLE1BQU1DLE1BQU0sR0FBR0osU0FBUyxDQUFDWixTQUFWLENBQW9CaUIsTUFBcEIsQ0FBMkIsU0FBM0IsQ0FBZjtVQUNBWixPQUFPLENBQUNHLEtBQVIsQ0FBY0MsU0FBZCxHQUEyQixHQUFFTyxNQUFNLEdBQUdWLFdBQVcsR0FBRyxFQUFqQixHQUFzQixDQUFFLElBQTNEO1VBQ0FWLGFBQWEsR0FBR1MsT0FBaEI7VUFDQVIsZUFBZSxHQUFHZSxTQUFsQjtRQUNILENBTG9CLENBQXJCO01BTUgsQ0FuQkQ7SUFvQkgsQ0E3QkQ7RUE4Qkg7O0FBakQwQiIsInNvdXJjZXMiOlsid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvbWFpbi9hY2NvcmRpb24vQWNjb3JkaW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldEFsbCB9IGZyb20gXCJAL3V0aWxzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY2NvcmRpb24ge1xyXG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgICB0cmlnZ2VyczogSFRNTEVsZW1lbnRbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy50cmlnZ2VycyA9IGdldEFsbChcIi5qcy1hY2NvcmRpb24tdHJpZ2dlclwiLCB0aGlzLmVsZW1lbnQpO1xyXG5cclxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kRXZlbnRzKCkge1xyXG4gICAgICAgIGxldCBlbEFjdGl2ZVBhbmVsOiBIVE1MRWxlbWVudDtcclxuICAgICAgICBsZXQgZWxBY3RpdmVUcmlnZ2VyID0gdGhpcy50cmlnZ2Vycy5maW5kKChlbCkgPT4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaXMtb3BlblwiKSk7XHJcblxyXG4gICAgICAgIGlmIChlbEFjdGl2ZVRyaWdnZXIpIHtcclxuICAgICAgICAgICAgZWxBY3RpdmVQYW5lbCA9IGVsQWN0aXZlVHJpZ2dlci5uZXh0RWxlbWVudFNpYmxpbmcgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnRyaWdnZXJzLmZvckVhY2goKHRyaWdnZXIpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZWxQYW5lbCA9IHRyaWdnZXIubmV4dEVsZW1lbnRTaWJsaW5nIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgICAgICBsZXQgc2F2ZWRIZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgICAgICAgICAgIGlmICh0cmlnZ2VyLmNsYXNzTGlzdC5jb250YWlucyhcImlzLW9wZW5cIikpIHtcclxuICAgICAgICAgICAgICAgIHNhdmVkSGVpZ2h0ID0gZWxQYW5lbC5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBlbFBhbmVsLnN0eWxlLm1heEhlaWdodCA9IGAke3NhdmVkSGVpZ2h0ICsgMzB9cHhgO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsVHJpZ2dlciA9IGV2ZW50LmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxBY3RpdmVUcmlnZ2VyICYmIGVsQWN0aXZlVHJpZ2dlciAhPT0gZWxUcmlnZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxBY3RpdmVUcmlnZ2VyLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1vcGVuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsQWN0aXZlUGFuZWwuc3R5bGUubWF4SGVpZ2h0ID0gXCIwcHhcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXNhdmVkSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxQYW5lbC5zdHlsZS5tYXhIZWlnaHQgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICBzYXZlZEhlaWdodCA9IGVsUGFuZWwub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIGVsUGFuZWwuc3R5bGUubWF4SGVpZ2h0ID0gXCIwcHhcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzT3BlbiA9IGVsVHJpZ2dlci5jbGFzc0xpc3QudG9nZ2xlKFwiaXMtb3BlblwiKTtcclxuICAgICAgICAgICAgICAgICAgICBlbFBhbmVsLnN0eWxlLm1heEhlaWdodCA9IGAke2lzT3BlbiA/IHNhdmVkSGVpZ2h0ICsgMzAgOiAwfXB4YDtcclxuICAgICAgICAgICAgICAgICAgICBlbEFjdGl2ZVBhbmVsID0gZWxQYW5lbDtcclxuICAgICAgICAgICAgICAgICAgICBlbEFjdGl2ZVRyaWdnZXIgPSBlbFRyaWdnZXI7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbImdldEFsbCIsIkFjY29yZGlvbiIsImNvbnN0cnVjdG9yIiwiZWxlbWVudCIsInRyaWdnZXJzIiwiYmluZEV2ZW50cyIsImVsQWN0aXZlUGFuZWwiLCJlbEFjdGl2ZVRyaWdnZXIiLCJmaW5kIiwiZWwiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsIm5leHRFbGVtZW50U2libGluZyIsImZvckVhY2giLCJ0cmlnZ2VyIiwiZWxQYW5lbCIsInNhdmVkSGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0Iiwic3R5bGUiLCJtYXhIZWlnaHQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJlbFRyaWdnZXIiLCJjdXJyZW50VGFyZ2V0IiwicmVtb3ZlIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiaXNPcGVuIiwidG9nZ2xlIl0sInNvdXJjZVJvb3QiOiIifQ==