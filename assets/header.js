"use strict";
(self["webpackChunkjuno_shopify_template"] = self["webpackChunkjuno_shopify_template"] || []).push([["header"],{

/***/ "./src/assets/js/main/header/Header.js":
/*!*********************************************!*\
  !*** ./src/assets/js/main/header/Header.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Header": () => (/* binding */ Header)
/* harmony export */ });
// import { get } from "@/utils";
class Header {
  constructor(element) {
    this.header = element; // set scrolling variables

    this.scrolling = false;
    this.previousTop = 0;
    this.currentTop = 0;
    this.scrollDelta = 10;
    this.scrollOffset = 150;
    this.bindListener();
  }

  bindListener() {
    this.setBackgroundHeader();
    this.scroll();
  }

  setBackgroundHeader() {
    const transparentValue = document.querySelector('.is-transparent');
    const sectionHeader = document.querySelector('#shopify-section-header');

    if (transparentValue) {
      sectionHeader.style.background = '#fff';
    }

    const mobileHeader = document.querySelector('#mobile_addition_header');
    const trigger = mobileHeader.querySelector('.js-accordion-trigger');

    if (!trigger.classList.contains('is-open')) {
      const content = mobileHeader.querySelector('.js-accordion-content');
      content.style.maxHeight = 0;
      document.querySelector('body main').setAttribute("style", "margin-top: 10px;");
    } else {
      if (screen.width < 768) {
        document.querySelector('body main').setAttribute("style", "margin-top: 190px;");
      }
    }
  }

  scroll() {
    window.addEventListener("scroll", () => {
      if (!this.scrolling) {
        this.scrolling = true;
        window.requestAnimationFrame ? window.requestAnimationFrame(() => this.autoHideHeader()) : setTimeout(this.autoHideHeader(), 250);
      }

      const mobileHeader = document.querySelector('#mobile_addition_header');

      if (mobileHeader) {
        if (screen.width < 768) {
          const mobileBannerContent = mobileHeader.querySelector('.js-accordion-content');
          const mobileBannerTrigger = mobileHeader.querySelector('.js-accordion-trigger');
          if (mobileBannerTrigger) mobileBannerTrigger.classList.remove('is-open');

          if (mobileBannerContent) {
            mobileBannerContent.style.maxHeight = 0;
            document.querySelector('body main').setAttribute("style", "margin-top: 10px;");
          }
        }
      }
    });
  }

  autoHideHeader() {
    const currentTop = window.scrollY || window.pageYOffset;
    this.checkHeaderPosition(currentTop);
    this.previousTop = currentTop;
    this.scrolling = false;
  }

  checkHeaderPosition(currentTop) {
    if (this.previousTop - currentTop > this.scrollDelta) {
      // if scrolling up...
      this.header.classList.remove("is-hidden");
    } else if (currentTop - this.previousTop > this.scrollDelta && currentTop > this.scrollOffset) {
      // if scrolling down...
      this.header.classList.add("is-hidden");
    } // add/remove classes after scrolling


    if (currentTop > this.scrollOffset) {
      this.header.classList.add("is-scrolled");
    } else {
      this.header.classList.remove("is-scrolled");
    }
  }

}



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2hlYWRlci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQSxNQUFNQSxNQUFOLENBQWE7RUFDVEMsV0FBVyxDQUFDQyxPQUFELEVBQVU7SUFDakIsS0FBS0MsTUFBTCxHQUFjRCxPQUFkLENBRGlCLENBR2pCOztJQUNBLEtBQUtFLFNBQUwsR0FBaUIsS0FBakI7SUFDQSxLQUFLQyxXQUFMLEdBQW1CLENBQW5CO0lBQ0EsS0FBS0MsVUFBTCxHQUFrQixDQUFsQjtJQUNBLEtBQUtDLFdBQUwsR0FBbUIsRUFBbkI7SUFDQSxLQUFLQyxZQUFMLEdBQW9CLEdBQXBCO0lBRUEsS0FBS0MsWUFBTDtFQUNIOztFQUVEQSxZQUFZLEdBQUc7SUFDWCxLQUFLQyxtQkFBTDtJQUNBLEtBQUtDLE1BQUw7RUFDSDs7RUFFREQsbUJBQW1CLEdBQUc7SUFDbEIsTUFBTUUsZ0JBQWdCLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixpQkFBdkIsQ0FBekI7SUFDQSxNQUFNQyxhQUFhLEdBQUdGLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1Qix5QkFBdkIsQ0FBdEI7O0lBQ0EsSUFBSUYsZ0JBQUosRUFBc0I7TUFDbEJHLGFBQWEsQ0FBQ0MsS0FBZCxDQUFvQkMsVUFBcEIsR0FBaUMsTUFBakM7SUFDSDs7SUFFRCxNQUFNQyxZQUFZLEdBQUdMLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1Qix5QkFBdkIsQ0FBckI7SUFDQSxNQUFNSyxPQUFPLEdBQUdELFlBQVksQ0FBQ0osYUFBYixDQUEyQix1QkFBM0IsQ0FBaEI7O0lBRUEsSUFBSSxDQUFDSyxPQUFPLENBQUNDLFNBQVIsQ0FBa0JDLFFBQWxCLENBQTJCLFNBQTNCLENBQUwsRUFBNEM7TUFDeEMsTUFBTUMsT0FBTyxHQUFHSixZQUFZLENBQUNKLGFBQWIsQ0FBMkIsdUJBQTNCLENBQWhCO01BQ0FRLE9BQU8sQ0FBQ04sS0FBUixDQUFjTyxTQUFkLEdBQTBCLENBQTFCO01BQ0FWLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixXQUF2QixFQUFvQ1UsWUFBcEMsQ0FBaUQsT0FBakQsRUFBMEQsbUJBQTFEO0lBQ0gsQ0FKRCxNQUlPO01BQ0gsSUFBR0MsTUFBTSxDQUFDQyxLQUFQLEdBQWUsR0FBbEIsRUFBdUI7UUFDbkJiLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixXQUF2QixFQUFvQ1UsWUFBcEMsQ0FBaUQsT0FBakQsRUFBMEQsb0JBQTFEO01BQ0g7SUFDSjtFQUNKOztFQUVEYixNQUFNLEdBQUc7SUFDTGdCLE1BQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsTUFBTTtNQUNwQyxJQUFJLENBQUMsS0FBS3hCLFNBQVYsRUFBcUI7UUFDakIsS0FBS0EsU0FBTCxHQUFpQixJQUFqQjtRQUNBdUIsTUFBTSxDQUFDRSxxQkFBUCxHQUNNRixNQUFNLENBQUNFLHFCQUFQLENBQTZCLE1BQU0sS0FBS0MsY0FBTCxFQUFuQyxDQUROLEdBRU1DLFVBQVUsQ0FBQyxLQUFLRCxjQUFMLEVBQUQsRUFBd0IsR0FBeEIsQ0FGaEI7TUFHSDs7TUFFRCxNQUFNWixZQUFZLEdBQUdMLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1Qix5QkFBdkIsQ0FBckI7O01BRUEsSUFBSUksWUFBSixFQUFrQjtRQUNkLElBQUdPLE1BQU0sQ0FBQ0MsS0FBUCxHQUFlLEdBQWxCLEVBQXVCO1VBQ25CLE1BQU1NLG1CQUFtQixHQUFHZCxZQUFZLENBQUNKLGFBQWIsQ0FBMkIsdUJBQTNCLENBQTVCO1VBQ0EsTUFBTW1CLG1CQUFtQixHQUFHZixZQUFZLENBQUNKLGFBQWIsQ0FBMkIsdUJBQTNCLENBQTVCO1VBQ0EsSUFBSW1CLG1CQUFKLEVBQXlCQSxtQkFBbUIsQ0FBQ2IsU0FBcEIsQ0FBOEJjLE1BQTlCLENBQXFDLFNBQXJDOztVQUN6QixJQUFJRixtQkFBSixFQUF5QjtZQUNyQkEsbUJBQW1CLENBQUNoQixLQUFwQixDQUEwQk8sU0FBMUIsR0FBc0MsQ0FBdEM7WUFDQVYsUUFBUSxDQUFDQyxhQUFULENBQXVCLFdBQXZCLEVBQW9DVSxZQUFwQyxDQUFpRCxPQUFqRCxFQUEwRCxtQkFBMUQ7VUFDSDtRQUNKO01BRUo7SUFDSixDQXRCRDtFQXVCSDs7RUFFRE0sY0FBYyxHQUFHO0lBQ2IsTUFBTXhCLFVBQVUsR0FBR3FCLE1BQU0sQ0FBQ1EsT0FBUCxJQUFrQlIsTUFBTSxDQUFDUyxXQUE1QztJQUVBLEtBQUtDLG1CQUFMLENBQXlCL0IsVUFBekI7SUFFQSxLQUFLRCxXQUFMLEdBQW1CQyxVQUFuQjtJQUNBLEtBQUtGLFNBQUwsR0FBaUIsS0FBakI7RUFDSDs7RUFFRGlDLG1CQUFtQixDQUFDL0IsVUFBRCxFQUFhO0lBQzVCLElBQUksS0FBS0QsV0FBTCxHQUFtQkMsVUFBbkIsR0FBZ0MsS0FBS0MsV0FBekMsRUFBc0Q7TUFDbEQ7TUFDQSxLQUFLSixNQUFMLENBQVlpQixTQUFaLENBQXNCYyxNQUF0QixDQUE2QixXQUE3QjtJQUNILENBSEQsTUFHTyxJQUNINUIsVUFBVSxHQUFHLEtBQUtELFdBQWxCLEdBQWdDLEtBQUtFLFdBQXJDLElBQ0FELFVBQVUsR0FBRyxLQUFLRSxZQUZmLEVBR0w7TUFDRTtNQUNBLEtBQUtMLE1BQUwsQ0FBWWlCLFNBQVosQ0FBc0JrQixHQUF0QixDQUEwQixXQUExQjtJQUNILENBVjJCLENBWTVCOzs7SUFDQSxJQUFJaEMsVUFBVSxHQUFHLEtBQUtFLFlBQXRCLEVBQW9DO01BQ2hDLEtBQUtMLE1BQUwsQ0FBWWlCLFNBQVosQ0FBc0JrQixHQUF0QixDQUEwQixhQUExQjtJQUNILENBRkQsTUFFTztNQUNILEtBQUtuQyxNQUFMLENBQVlpQixTQUFaLENBQXNCYyxNQUF0QixDQUE2QixhQUE3QjtJQUNIO0VBQ0o7O0FBN0ZRIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vc3JjL2Fzc2V0cy9qcy9tYWluL2hlYWRlci9IZWFkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHsgZ2V0IH0gZnJvbSBcIkAvdXRpbHNcIjtcclxuXHJcbmNsYXNzIEhlYWRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBlbGVtZW50O1xyXG5cclxuICAgICAgICAvLyBzZXQgc2Nyb2xsaW5nIHZhcmlhYmxlc1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wcmV2aW91c1RvcCA9IDA7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VG9wID0gMDtcclxuICAgICAgICB0aGlzLnNjcm9sbERlbHRhID0gMTA7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxPZmZzZXQgPSAxNTA7XHJcblxyXG4gICAgICAgIHRoaXMuYmluZExpc3RlbmVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZExpc3RlbmVyKCkge1xyXG4gICAgICAgIHRoaXMuc2V0QmFja2dyb3VuZEhlYWRlcigpXHJcbiAgICAgICAgdGhpcy5zY3JvbGwoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRCYWNrZ3JvdW5kSGVhZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHRyYW5zcGFyZW50VmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaXMtdHJhbnNwYXJlbnQnKTtcclxuICAgICAgICBjb25zdCBzZWN0aW9uSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Nob3BpZnktc2VjdGlvbi1oZWFkZXInKTtcclxuICAgICAgICBpZiAodHJhbnNwYXJlbnRWYWx1ZSkge1xyXG4gICAgICAgICAgICBzZWN0aW9uSGVhZGVyLnN0eWxlLmJhY2tncm91bmQgPSAnI2ZmZic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBtb2JpbGVIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9iaWxlX2FkZGl0aW9uX2hlYWRlcicpO1xyXG4gICAgICAgIGNvbnN0IHRyaWdnZXIgPSBtb2JpbGVIZWFkZXIucXVlcnlTZWxlY3RvcignLmpzLWFjY29yZGlvbi10cmlnZ2VyJyk7XHJcblxyXG4gICAgICAgIGlmICghdHJpZ2dlci5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gbW9iaWxlSGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5qcy1hY2NvcmRpb24tY29udGVudCcpO1xyXG4gICAgICAgICAgICBjb250ZW50LnN0eWxlLm1heEhlaWdodCA9IDA7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHkgbWFpbicpLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwibWFyZ2luLXRvcDogMTBweDtcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYoc2NyZWVuLndpZHRoIDwgNzY4ICl7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5IG1haW4nKS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIm1hcmdpbi10b3A6IDE5MHB4O1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzY3JvbGwoKSB7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2Nyb2xsaW5nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgPyB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuYXV0b0hpZGVIZWFkZXIoKSlcclxuICAgICAgICAgICAgICAgICAgICA6IHNldFRpbWVvdXQodGhpcy5hdXRvSGlkZUhlYWRlcigpLCAyNTApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBtb2JpbGVIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9iaWxlX2FkZGl0aW9uX2hlYWRlcicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1vYmlsZUhlYWRlcikge1xyXG4gICAgICAgICAgICAgICAgaWYoc2NyZWVuLndpZHRoIDwgNzY4ICl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9iaWxlQmFubmVyQ29udGVudCA9IG1vYmlsZUhlYWRlci5xdWVyeVNlbGVjdG9yKCcuanMtYWNjb3JkaW9uLWNvbnRlbnQnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtb2JpbGVCYW5uZXJUcmlnZ2VyID0gbW9iaWxlSGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5qcy1hY2NvcmRpb24tdHJpZ2dlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2JpbGVCYW5uZXJUcmlnZ2VyKSBtb2JpbGVCYW5uZXJUcmlnZ2VyLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobW9iaWxlQmFubmVyQ29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2JpbGVCYW5uZXJDb250ZW50LnN0eWxlLm1heEhlaWdodCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHkgbWFpbicpLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwibWFyZ2luLXRvcDogMTBweDtcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhdXRvSGlkZUhlYWRlcigpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50VG9wID0gd2luZG93LnNjcm9sbFkgfHwgd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cclxuICAgICAgICB0aGlzLmNoZWNrSGVhZGVyUG9zaXRpb24oY3VycmVudFRvcCk7XHJcblxyXG4gICAgICAgIHRoaXMucHJldmlvdXNUb3AgPSBjdXJyZW50VG9wO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsaW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tIZWFkZXJQb3NpdGlvbihjdXJyZW50VG9wKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJldmlvdXNUb3AgLSBjdXJyZW50VG9wID4gdGhpcy5zY3JvbGxEZWx0YSkge1xyXG4gICAgICAgICAgICAvLyBpZiBzY3JvbGxpbmcgdXAuLi5cclxuICAgICAgICAgICAgdGhpcy5oZWFkZXIuY2xhc3NMaXN0LnJlbW92ZShcImlzLWhpZGRlblwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgICBjdXJyZW50VG9wIC0gdGhpcy5wcmV2aW91c1RvcCA+IHRoaXMuc2Nyb2xsRGVsdGEgJiZcclxuICAgICAgICAgICAgY3VycmVudFRvcCA+IHRoaXMuc2Nyb2xsT2Zmc2V0XHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIC8vIGlmIHNjcm9sbGluZyBkb3duLi4uXHJcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJpcy1oaWRkZW5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBhZGQvcmVtb3ZlIGNsYXNzZXMgYWZ0ZXIgc2Nyb2xsaW5nXHJcbiAgICAgICAgaWYgKGN1cnJlbnRUb3AgPiB0aGlzLnNjcm9sbE9mZnNldCkge1xyXG4gICAgICAgICAgICB0aGlzLmhlYWRlci5jbGFzc0xpc3QuYWRkKFwiaXMtc2Nyb2xsZWRcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5oZWFkZXIuY2xhc3NMaXN0LnJlbW92ZShcImlzLXNjcm9sbGVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgSGVhZGVyIH07XHJcbiJdLCJuYW1lcyI6WyJIZWFkZXIiLCJjb25zdHJ1Y3RvciIsImVsZW1lbnQiLCJoZWFkZXIiLCJzY3JvbGxpbmciLCJwcmV2aW91c1RvcCIsImN1cnJlbnRUb3AiLCJzY3JvbGxEZWx0YSIsInNjcm9sbE9mZnNldCIsImJpbmRMaXN0ZW5lciIsInNldEJhY2tncm91bmRIZWFkZXIiLCJzY3JvbGwiLCJ0cmFuc3BhcmVudFZhbHVlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwic2VjdGlvbkhlYWRlciIsInN0eWxlIiwiYmFja2dyb3VuZCIsIm1vYmlsZUhlYWRlciIsInRyaWdnZXIiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImNvbnRlbnQiLCJtYXhIZWlnaHQiLCJzZXRBdHRyaWJ1dGUiLCJzY3JlZW4iLCJ3aWR0aCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJhdXRvSGlkZUhlYWRlciIsInNldFRpbWVvdXQiLCJtb2JpbGVCYW5uZXJDb250ZW50IiwibW9iaWxlQmFubmVyVHJpZ2dlciIsInJlbW92ZSIsInNjcm9sbFkiLCJwYWdlWU9mZnNldCIsImNoZWNrSGVhZGVyUG9zaXRpb24iLCJhZGQiXSwic291cmNlUm9vdCI6IiJ9