"use strict";
(self["webpackChunkjuno_shopify_template"] = self["webpackChunkjuno_shopify_template"] || []).push([["form"],{

/***/ "./src/assets/js/main/form/Form.js":
/*!*****************************************!*\
  !*** ./src/assets/js/main/form/Form.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormHandler": () => (/* binding */ FormHandler)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");

class FormHandler {
  constructor(form) {
    this.elForm = form;
    this.showRecover = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-show-recover-password");
    this.handleEvent();
  }

  handleEvent() {
    // form.addEventListener('submit', (e) => {
    //     e.preventDefault();
    // });
    if (this.showRecover) this.recoverPassword();
  }

  recoverPassword() {
    this.showRecover.addEventListener("click", () => {
      this.openRecoverPassword();
    });
  }

  openRecoverPassword() {
    const loginForm = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-login");
    const loginFooter = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-login-footer");
    const recoverForm = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-password-recover");
    this.showRecover.classList.add("is-hidden");
    loginForm.classList.add("is-hidden");
    if (loginFooter) loginFooter.classList.add("is-hidden");
    recoverForm.classList.remove("is-hidden");
    this.closeRecoverPassword(loginForm, loginFooter, recoverForm);
  }

  closeRecoverPassword(loginForm, loginFooter, recoverForm) {
    const closeRecoverForm = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-password-recover-cancel");
    closeRecoverForm.addEventListener("click", () => {
      this.showRecover.classList.remove("is-hidden");
      loginForm.classList.remove("is-hidden");
      if (loginFooter) loginFooter.classList.remove("is-hidden");
      recoverForm.classList.add("is-hidden");
    });
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2Zvcm0uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUVPLE1BQU1DLFdBQU4sQ0FBa0I7RUFDckJDLFdBQVcsQ0FBQ0MsSUFBRCxFQUFPO0lBQ2QsS0FBS0MsTUFBTCxHQUFjRCxJQUFkO0lBQ0EsS0FBS0UsV0FBTCxHQUFtQkwsMkNBQUcsQ0FBQywyQkFBRCxDQUF0QjtJQUVBLEtBQUtNLFdBQUw7RUFDSDs7RUFFREEsV0FBVyxHQUFHO0lBQ1Y7SUFDQTtJQUNBO0lBRUEsSUFBSSxLQUFLRCxXQUFULEVBQXNCLEtBQUtFLGVBQUw7RUFDekI7O0VBRURBLGVBQWUsR0FBRztJQUNkLEtBQUtGLFdBQUwsQ0FBaUJHLGdCQUFqQixDQUFrQyxPQUFsQyxFQUEyQyxNQUFNO01BQzdDLEtBQUtDLG1CQUFMO0lBQ0gsQ0FGRDtFQUdIOztFQUVEQSxtQkFBbUIsR0FBRztJQUNsQixNQUFNQyxTQUFTLEdBQUdWLDJDQUFHLENBQUMsV0FBRCxDQUFyQjtJQUNBLE1BQU1XLFdBQVcsR0FBR1gsMkNBQUcsQ0FBQyxrQkFBRCxDQUF2QjtJQUNBLE1BQU1ZLFdBQVcsR0FBR1osMkNBQUcsQ0FBQyxzQkFBRCxDQUF2QjtJQUVBLEtBQUtLLFdBQUwsQ0FBaUJRLFNBQWpCLENBQTJCQyxHQUEzQixDQUErQixXQUEvQjtJQUNBSixTQUFTLENBQUNHLFNBQVYsQ0FBb0JDLEdBQXBCLENBQXdCLFdBQXhCO0lBQ0EsSUFBSUgsV0FBSixFQUFpQkEsV0FBVyxDQUFDRSxTQUFaLENBQXNCQyxHQUF0QixDQUEwQixXQUExQjtJQUNqQkYsV0FBVyxDQUFDQyxTQUFaLENBQXNCRSxNQUF0QixDQUE2QixXQUE3QjtJQUNBLEtBQUtDLG9CQUFMLENBQTBCTixTQUExQixFQUFxQ0MsV0FBckMsRUFBa0RDLFdBQWxEO0VBQ0g7O0VBRURJLG9CQUFvQixDQUFDTixTQUFELEVBQVlDLFdBQVosRUFBeUJDLFdBQXpCLEVBQXNDO0lBQ3RELE1BQU1LLGdCQUFnQixHQUFHakIsMkNBQUcsQ0FBQyw2QkFBRCxDQUE1QjtJQUNBaUIsZ0JBQWdCLENBQUNULGdCQUFqQixDQUFrQyxPQUFsQyxFQUEyQyxNQUFNO01BQzdDLEtBQUtILFdBQUwsQ0FBaUJRLFNBQWpCLENBQTJCRSxNQUEzQixDQUFrQyxXQUFsQztNQUNBTCxTQUFTLENBQUNHLFNBQVYsQ0FBb0JFLE1BQXBCLENBQTJCLFdBQTNCO01BQ0EsSUFBSUosV0FBSixFQUFpQkEsV0FBVyxDQUFDRSxTQUFaLENBQXNCRSxNQUF0QixDQUE2QixXQUE3QjtNQUNqQkgsV0FBVyxDQUFDQyxTQUFaLENBQXNCQyxHQUF0QixDQUEwQixXQUExQjtJQUNILENBTEQ7RUFNSDs7QUExQ29CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vc3JjL2Fzc2V0cy9qcy9tYWluL2Zvcm0vRm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXQgfSBmcm9tIFwiQC91dGlsc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZvcm1IYW5kbGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGZvcm0pIHtcclxuICAgICAgICB0aGlzLmVsRm9ybSA9IGZvcm07XHJcbiAgICAgICAgdGhpcy5zaG93UmVjb3ZlciA9IGdldChcIi5qcy1zaG93LXJlY292ZXItcGFzc3dvcmRcIik7XHJcblxyXG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFdmVudCgpIHtcclxuICAgICAgICAvLyBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAvLyB9KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2hvd1JlY292ZXIpIHRoaXMucmVjb3ZlclBhc3N3b3JkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVjb3ZlclBhc3N3b3JkKCkge1xyXG4gICAgICAgIHRoaXMuc2hvd1JlY292ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vcGVuUmVjb3ZlclBhc3N3b3JkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb3BlblJlY292ZXJQYXNzd29yZCgpIHtcclxuICAgICAgICBjb25zdCBsb2dpbkZvcm0gPSBnZXQoXCIuanMtbG9naW5cIik7XHJcbiAgICAgICAgY29uc3QgbG9naW5Gb290ZXIgPSBnZXQoXCIuanMtbG9naW4tZm9vdGVyXCIpO1xyXG4gICAgICAgIGNvbnN0IHJlY292ZXJGb3JtID0gZ2V0KFwiLmpzLXBhc3N3b3JkLXJlY292ZXJcIik7XHJcblxyXG4gICAgICAgIHRoaXMuc2hvd1JlY292ZXIuY2xhc3NMaXN0LmFkZChcImlzLWhpZGRlblwiKTtcclxuICAgICAgICBsb2dpbkZvcm0uY2xhc3NMaXN0LmFkZChcImlzLWhpZGRlblwiKTtcclxuICAgICAgICBpZiAobG9naW5Gb290ZXIpIGxvZ2luRm9vdGVyLmNsYXNzTGlzdC5hZGQoXCJpcy1oaWRkZW5cIik7XHJcbiAgICAgICAgcmVjb3ZlckZvcm0uY2xhc3NMaXN0LnJlbW92ZShcImlzLWhpZGRlblwiKTtcclxuICAgICAgICB0aGlzLmNsb3NlUmVjb3ZlclBhc3N3b3JkKGxvZ2luRm9ybSwgbG9naW5Gb290ZXIsIHJlY292ZXJGb3JtKTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZVJlY292ZXJQYXNzd29yZChsb2dpbkZvcm0sIGxvZ2luRm9vdGVyLCByZWNvdmVyRm9ybSkge1xyXG4gICAgICAgIGNvbnN0IGNsb3NlUmVjb3ZlckZvcm0gPSBnZXQoXCIuanMtcGFzc3dvcmQtcmVjb3Zlci1jYW5jZWxcIik7XHJcbiAgICAgICAgY2xvc2VSZWNvdmVyRm9ybS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dSZWNvdmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1oaWRkZW5cIik7XHJcbiAgICAgICAgICAgIGxvZ2luRm9ybS5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICBpZiAobG9naW5Gb290ZXIpIGxvZ2luRm9vdGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1oaWRkZW5cIik7XHJcbiAgICAgICAgICAgIHJlY292ZXJGb3JtLmNsYXNzTGlzdC5hZGQoXCJpcy1oaWRkZW5cIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbImdldCIsIkZvcm1IYW5kbGVyIiwiY29uc3RydWN0b3IiLCJmb3JtIiwiZWxGb3JtIiwic2hvd1JlY292ZXIiLCJoYW5kbGVFdmVudCIsInJlY292ZXJQYXNzd29yZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJvcGVuUmVjb3ZlclBhc3N3b3JkIiwibG9naW5Gb3JtIiwibG9naW5Gb290ZXIiLCJyZWNvdmVyRm9ybSIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImNsb3NlUmVjb3ZlclBhc3N3b3JkIiwiY2xvc2VSZWNvdmVyRm9ybSJdLCJzb3VyY2VSb290IjoiIn0=