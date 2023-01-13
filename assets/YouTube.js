"use strict";
(self["webpackChunkjuno_shopify_template"] = self["webpackChunkjuno_shopify_template"] || []).push([["YouTube"],{

/***/ "./src/assets/js/main/video/Video.ts":
/*!*******************************************!*\
  !*** ./src/assets/js/main/video/Video.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/element.ts");
/* harmony import */ var _utils_observer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/observer */ "./src/assets/js/utils/observer.ts");



/**
 * This is video base class.
 */
class Video {
  constructor(element) {
    this.element = void 0;
    this.container = void 0;
    this.id = void 0;
    this.settings = void 0;
    this.canAutoplay = void 0;
    this.canHaveSound = void 0;
    this.isMuted = void 0;
    this.isPlaying = void 0;
    this.isReady = void 0;
    this.playTrigger = void 0;
    this.queue = void 0;
    this.player = void 0;
    this.playPromise = void 0;
    this.element = element;
    this.settings = this.element.getAttribute("data-settings");
    this.canAutoplay = this.settings.includes("autoplay");
    this.canHaveSound = !((/iPad|iPhone|iPod/.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && // @ts-expect-error
    !window.MSStream);
    this.container = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.get)(".js-video-container", element);
    this.id = element.getAttribute("data-id") || "";
    this.isMuted = this.settings.includes("muted");
    this.isPlaying = false;
    this.isReady = false;
    this.playTrigger = element.querySelector(".js-video-trigger");
    this.queue = new Set();
    this.createPlayer();

    this._bindTrigger();

    this._observeElement();

    element.dispatchEvent(new CustomEvent("videoloaded"));
  }

  play() {
    if (this.isPlaying) return;

    if (!this.isReady) {
      this.createPlayer();

      this._queueTask("play");

      return;
    }

    this.playPromise = Promise.resolve(this.playVideo());
  }

  async pause() {
    if (!this.isPlaying) return;

    if (!this.isReady || typeof this.playPromise === "undefined") {
      this._queueTask("pause");

      return;
    }

    await this.playPromise;
    this.pauseVideo();
    this.onStop();
  }

  onEnded() {
    this.onStop();
  }

  onPlay() {
    this.element.setAttribute("data-status", "loaded playing");
    this.isPlaying = true;
  }

  onStop() {
    this.element.setAttribute("data-status", "loaded paused");
    this.isPlaying = false;
  }

  watchResize(videoWidth, videoHeight) {
    const aspectRatio = videoHeight / videoWidth;

    const updateSize = () => {
      const containerWidth = this.element.clientWidth;
      this.container.style.width = `${containerWidth}px`;
      this.container.style.height = `${containerWidth * aspectRatio}px`;
    };

    updateSize();
    this.element.dispatchEvent(new CustomEvent("videosize"));
    window.dispatchEvent(new CustomEvent("resize"));
    window.addEventListener("resize", () => updateSize());
    this.player.element.setAttribute("tabindex", "-1");
  }

  flushQueue() {
    this.queue.forEach(command => this[command]());
    this.queue.clear();
  }

  _queueTask(command) {
    this.queue.add(command);
  }

  _bindTrigger() {
    if (!this.playTrigger) return;
    this.playTrigger.addEventListener("click", () => {
      this.isPlaying ? this.pause() : this.play();
    });
  }

  _observeElement() {
    (0,_utils_observer__WEBPACK_IMPORTED_MODULE_1__.observe)(this.container, inView => {
      if (inView && this.canAutoplay) {
        this.play();
      } else if (this.isReady) {
        this.pause();
      }
    }, {
      threshold: 0.25,
      rootMargin: "-50px"
    });
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Video);

/***/ }),

/***/ "./src/assets/js/main/video/types/YouTube.ts":
/*!***************************************************!*\
  !*** ./src/assets/js/main/video/types/YouTube.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils */ "./src/assets/js/utils/add-prefetch.ts");
/* harmony import */ var _Video__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Video */ "./src/assets/js/main/video/Video.ts");

 // https://developers.google.com/youtube/player_parameters#release_notes_08_23_2018

class YTVideo extends _Video__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(...args) {
    super(...args);
    this.player = void 0;
    this.stateChange = {
      /**
       * -1 - Unstarted
       *  0 - Ended
       *  1 - Playing
       *  2 = Paused
       *  3 - Buffering
       *  5 - Cued
       */
      0: () => this.onEnded(),
      1: () => this.onPlay(),
      2: () => this.pause()
    };
  }

  createPlayer() {
    if (this.player) return;

    YTVideo._warmConnections();

    const {
      Player: YoutubePlayer
    } = window.YT || {};

    if (!YoutubePlayer) {
      this._loadYT();

      return;
    }

    this.container.innerHTML = "<div></div>";
    this.player = new YoutubePlayer(this.container.firstElementChild, {
      videoId: this.id,
      playerVars: {
        autoplay: 0,
        controls: 0,
        loop: 1,
        modestbranding: 1,
        playlist: this.id,
        playsinline: 1,
        rel: 0,
        color: "white"
      },
      events: {
        onReady: () => this._onReady(),
        onStateChange: ({
          data
        }) => {
          if (this.stateChange[data]) {
            this.stateChange[data]();
          }
        }
      }
    });
    this.player.element = this.player.getIframe();
  }

  playVideo() {
    this.player.playVideo();
  }

  pauseVideo() {
    this.player.pauseVideo();
  }

  _onReady() {
    this.isReady = true;

    if (this.isMuted || !this.canHaveSound) {
      this.player.mute();
    }

    const {
      width,
      height
    } = this.player.element;
    this.watchResize(+width, +height);
    "requestIdleCallback" in window ? // @ts-ignore
    requestIdleCallback(() => this.flushQueue()) : this.flushQueue();
  }

  _loadYT() {
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/player_api";
    script.async = true; // @ts-ignore

    window.onYouTubeIframeAPIReady = () => this.createPlayer();

    document.body.appendChild(script);
  }

  static _warmConnections() {
    if (YTVideo.preconnected) return; // The iframe document and most of its subresources come right off youtube.com

    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.addPrefetch)("preconnect", "https://www.youtube-nocookie.com"); // The botguard script is fetched off from google.com

    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.addPrefetch)("preconnect", "https://www.google.com"); // Not certain if these ad related domains are in the critical path. Could verify with domain-specific throttling.

    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.addPrefetch)("preconnect", "https://googleads.g.doubleclick.net");
    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.addPrefetch)("preconnect", "https://static.doubleclick.net");
    YTVideo.preconnected = true;
  }

}

YTVideo.preconnected = void 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (YTVideo);

/***/ }),

/***/ "./src/assets/js/utils/add-prefetch.ts":
/*!*********************************************!*\
  !*** ./src/assets/js/utils/add-prefetch.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addPrefetch": () => (/* binding */ addPrefetch)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./element */ "./src/assets/js/utils/element.ts");


/**
 * Add a <link rel={preload | preconnect} ...> to the head
 */

function addPrefetch(kind, url, as) {
  (0,_element__WEBPACK_IMPORTED_MODULE_1__.renderElement)({
    type: "link",
    props: (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      rel: kind,
      href: url
    }, as && {
      as
    }, {
      crossOrigin: "anonymous"
    })
  }, document.head);
}

/***/ }),

/***/ "./src/assets/js/utils/observer.ts":
/*!*****************************************!*\
  !*** ./src/assets/js/utils/observer.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "destroy": () => (/* binding */ destroy),
/* harmony export */   "observe": () => (/* binding */ observe),
/* harmony export */   "unobserve": () => (/* binding */ unobserve)
/* harmony export */ });
const INSTANCE_MAP = new Map();
const OBSERVER_MAP = new Map();
const ROOT_IDS = new Map();
let consecutiveRootId = 0;
/**
 * Generate a unique ID for the root element
 * @param root
 */

function getRootId(root) {
  if (!root) return "";
  if (ROOT_IDS.has(root)) return ROOT_IDS.get(root);
  consecutiveRootId += 1;
  ROOT_IDS.set(root, consecutiveRootId.toString());
  return `${ROOT_IDS.get(root)}_`;
}
/**
 * Monitor element, and trigger callback when element becomes inView
 * @param element {HTMLElement}
 * @param callback {Function} Called with inView
 * @param options {Object} InterSection observer options
 * @param options.threshold {Number} Number between 0 and 1, indicating how much of the element should be inView before triggering
 * @param options.root {HTMLElement}
 * @param options.rootMargin {String} The CSS margin to apply to the root element.
 *
 * @returns {ObserverInstance | undefined}
 */


function observe(element, callback, // eslint-disable-next-line no-undef
options = {}) {
  // IntersectionObserver needs a threshold to trigger, so set it to 0 if it's not defined.
  // Modify the options object, since it's used in the onChange handler.
  const {
    root,
    rootMargin,
    threshold = 0
  } = options; // Bail early if element is undefined

  if (!element) return; // Create a unique ID for this observer instance, based on the root, root margin and threshold.
  // An observer with the same options can be reused, so lets use this fact

  const observerId = // @ts-ignore
  getRootId(root) + (rootMargin ? `${threshold.toString()}_${rootMargin}` : threshold.toString());
  let observerInstance = OBSERVER_MAP.get(observerId);

  if (!observerInstance) {
    observerInstance = new IntersectionObserver(onChange, options);
    if (observerId) OBSERVER_MAP.set(observerId, observerInstance);
  }

  const instance = {
    callback,
    element,
    inView: false,
    observerId,
    observer: observerInstance,
    // Make sure we have the thresholds value. It's undefined on a browser like Chrome 51.
    thresholds: observerInstance.thresholds || (Array.isArray(threshold) ? threshold : [threshold])
  };
  INSTANCE_MAP.set(element, instance);
  observerInstance.observe(element);
  return instance;
}
/**
 * Stop observing an element. If an element is removed from the DOM or otherwise destroyed,
 * make sure to call this method.
 * @param element {Element}
 */

function unobserve(element) {
  if (!element) return;
  const instance = INSTANCE_MAP.get(element);

  if (instance) {
    const {
      observerId,
      observer
    } = instance;
    const {
      root
    } = observer;
    observer.unobserve(element); // Check if we are still observing any elements with the same threshold.

    let itemsLeft = false; // Check if we still have observers configured with the same root.

    let rootObserved = false;

    if (observerId) {
      INSTANCE_MAP.forEach((item, key) => {
        if (key !== element) {
          if (item.observerId === observerId) {
            itemsLeft = true;
            rootObserved = true;
          }

          if (item.observer.root === root) {
            rootObserved = true;
          }
        }
      });
    } // @ts-ignore


    if (!rootObserved && root) ROOT_IDS.delete(root);

    if (observer && !itemsLeft) {
      // No more elements to observe for threshold, disconnect observer
      observer.disconnect();
    } // Remove reference to element


    INSTANCE_MAP.delete(element);
  }
}
/**
 * Destroy all IntersectionObservers currently connected
 * */

function destroy() {
  OBSERVER_MAP.forEach(observer => {
    observer.disconnect();
  });
  OBSERVER_MAP.clear();
  INSTANCE_MAP.clear();
  ROOT_IDS.clear();
  consecutiveRootId = 0;
}

function onChange(changes) {
  changes.forEach(intersection => {
    const {
      isIntersecting,
      intersectionRatio,
      target
    } = intersection;
    const instance = INSTANCE_MAP.get(target); // Firefox can report a negative intersectionRatio when scrolling.

    if (instance && intersectionRatio >= 0) {
      // If threshold is an array, check if any of them intersects. This just triggers the onChange event multiple times.
      let inView = instance.thresholds.some(threshold => instance.inView ? intersectionRatio > threshold : intersectionRatio >= threshold);

      if (isIntersecting !== undefined) {
        // If isIntersecting is defined, ensure that the element is actually intersecting.
        // Otherwise it reports a threshold of 0
        inView = inView && isIntersecting;
      }

      instance.inView = inView;
      instance.callback(inView, intersection);
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  observe,
  unobserve,
  destroy
});

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QjtBQUNIOztBQUVELFNBQVNXLFFBQVQsQ0FBa0JjLE9BQWxCLEVBQXdEO0VBQ3BEQSxPQUFPLENBQUNsRixPQUFSLENBQWlCbUYsWUFBRCxJQUFrQjtJQUM5QixNQUFNO01BQUVDLGNBQUY7TUFBa0JDLGlCQUFsQjtNQUFxQ0M7SUFBckMsSUFBZ0RILFlBQXREO0lBQ0EsTUFBTWQsUUFBUSxHQUFHaEIsWUFBWSxDQUFDN0csR0FBYixDQUFpQjhJLE1BQWpCLENBQWpCLENBRjhCLENBSTlCOztJQUNBLElBQUlqQixRQUFRLElBQUlnQixpQkFBaUIsSUFBSSxDQUFyQyxFQUF3QztNQUNwQztNQUNBLElBQUlqRixNQUFNLEdBQUdpRSxRQUFRLENBQUNFLFVBQVQsQ0FBb0JnQixJQUFwQixDQUEwQmxGLFNBQUQsSUFDbENnRSxRQUFRLENBQUNqRSxNQUFULEdBQWtCaUYsaUJBQWlCLEdBQUdoRixTQUF0QyxHQUFrRGdGLGlCQUFpQixJQUFJaEYsU0FEOUQsQ0FBYjs7TUFJQSxJQUFJK0UsY0FBYyxLQUFLSSxTQUF2QixFQUFrQztRQUM5QjtRQUNBO1FBQ0FwRixNQUFNLEdBQUdBLE1BQU0sSUFBSWdGLGNBQW5CO01BQ0g7O01BRURmLFFBQVEsQ0FBQ2pFLE1BQVQsR0FBa0JBLE1BQWxCO01BQ0FpRSxRQUFRLENBQUNOLFFBQVQsQ0FBa0IzRCxNQUFsQixFQUEwQitFLFlBQTFCO0lBQ0g7RUFDSixDQXBCRDtBQXFCSDs7QUFFRCxpRUFBZTtFQUNYMUksT0FEVztFQUVYaUksU0FGVztFQUdYTztBQUhXLENBQWY7Ozs7Ozs7Ozs7Ozs7O0FDcktlO0FBQ2Y7QUFDQSxvQkFBb0Isc0JBQXNCO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvbWFpbi92aWRlby9WaWRlby50cyIsIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL21haW4vdmlkZW8vdHlwZXMvWW91VHViZS50cyIsIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL3V0aWxzL2FkZC1wcmVmZXRjaC50cyIsIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL3V0aWxzL29ic2VydmVyLnRzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldCB9IGZyb20gXCJAL3V0aWxzXCI7XHJcbmltcG9ydCB7IG9ic2VydmUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvb2JzZXJ2ZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBIVE1MNVBsYXllciB9IGZyb20gXCIuL3R5cGVzL0hUTUw1XCI7XHJcbmltcG9ydCB0eXBlIHsgVmltZW9QbGF5ZXIgfSBmcm9tIFwiLi90eXBlcy9WaW1lb1wiO1xyXG5pbXBvcnQgdHlwZSB7IFl0UGxheWVyIH0gZnJvbSBcIi4vdHlwZXMvWW91VHViZVwiO1xyXG5cclxudHlwZSBWaWRlb1BsYXllciA9IFZpbWVvUGxheWVyIHwgWXRQbGF5ZXIgfCBIVE1MNVBsYXllcjtcclxuXHJcbnR5cGUgVGFzayA9IFwicGxheVwiIHwgXCJwYXVzZVwiO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgdmlkZW8gYmFzZSBjbGFzcy5cclxuICovXHJcbmFic3RyYWN0IGNsYXNzIFZpZGVvIHtcclxuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gICAgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICAgIGlkOiBzdHJpbmc7XHJcbiAgICBzZXR0aW5nczogc3RyaW5nO1xyXG4gICAgY2FuQXV0b3BsYXk6IGJvb2xlYW47XHJcbiAgICBjYW5IYXZlU291bmQ6IGJvb2xlYW47XHJcbiAgICBpc011dGVkOiBib29sZWFuO1xyXG4gICAgaXNQbGF5aW5nOiBib29sZWFuO1xyXG4gICAgaXNSZWFkeTogYm9vbGVhbjtcclxuICAgIHBsYXlUcmlnZ2VyOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgIHF1ZXVlOiBTZXQ8VGFzaz47XHJcbiAgICBhYnN0cmFjdCBwbGF5ZXI6IFZpZGVvUGxheWVyO1xyXG4gICAgcGxheVByb21pc2U/OiBQcm9taXNlPGFueT47XHJcblxyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1zZXR0aW5nc1wiKTtcclxuXHJcbiAgICAgICAgdGhpcy5jYW5BdXRvcGxheSA9IHRoaXMuc2V0dGluZ3MuaW5jbHVkZXMoXCJhdXRvcGxheVwiKTtcclxuICAgICAgICB0aGlzLmNhbkhhdmVTb3VuZCA9ICEoXHJcbiAgICAgICAgICAgICgvaVBhZHxpUGhvbmV8aVBvZC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSB8fFxyXG4gICAgICAgICAgICAgICAgKG5hdmlnYXRvci5wbGF0Zm9ybSA9PT0gXCJNYWNJbnRlbFwiICYmIG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDEpKSAmJlxyXG4gICAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yXHJcbiAgICAgICAgICAgICF3aW5kb3cuTVNTdHJlYW1cclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gZ2V0KFwiLmpzLXZpZGVvLWNvbnRhaW5lclwiLCBlbGVtZW50KSE7XHJcbiAgICAgICAgdGhpcy5pZCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKSB8fCBcIlwiO1xyXG4gICAgICAgIHRoaXMuaXNNdXRlZCA9IHRoaXMuc2V0dGluZ3MuaW5jbHVkZXMoXCJtdXRlZFwiKTtcclxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNSZWFkeSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGxheVRyaWdnZXIgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtdmlkZW8tdHJpZ2dlclwiKTtcclxuICAgICAgICB0aGlzLnF1ZXVlID0gbmV3IFNldCgpO1xyXG5cclxuICAgICAgICB0aGlzLmNyZWF0ZVBsYXllcigpO1xyXG4gICAgICAgIHRoaXMuX2JpbmRUcmlnZ2VyKCk7XHJcbiAgICAgICAgdGhpcy5fb2JzZXJ2ZUVsZW1lbnQoKTtcclxuICAgICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwidmlkZW9sb2FkZWRcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIGFic3RyYWN0IGNyZWF0ZVBsYXllcigpOiB2b2lkO1xyXG4gICAgYWJzdHJhY3QgcGxheVZpZGVvKCk6IHZvaWQ7XHJcbiAgICBhYnN0cmFjdCBwYXVzZVZpZGVvKCk6IHZvaWQ7XHJcblxyXG4gICAgcGxheSgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1BsYXlpbmcpIHJldHVybjtcclxuICAgICAgICBpZiAoIXRoaXMuaXNSZWFkeSkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVBsYXllcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9xdWV1ZVRhc2soXCJwbGF5XCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnBsYXlQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHRoaXMucGxheVZpZGVvKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHBhdXNlKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1BsYXlpbmcpIHJldHVybjtcclxuICAgICAgICBpZiAoIXRoaXMuaXNSZWFkeSB8fCB0eXBlb2YgdGhpcy5wbGF5UHJvbWlzZSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9xdWV1ZVRhc2soXCJwYXVzZVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXdhaXQgdGhpcy5wbGF5UHJvbWlzZTtcclxuICAgICAgICB0aGlzLnBhdXNlVmlkZW8oKTtcclxuICAgICAgICB0aGlzLm9uU3RvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRW5kZWQoKSB7XHJcbiAgICAgICAgdGhpcy5vblN0b3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblBsYXkoKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtc3RhdHVzXCIsIFwibG9hZGVkIHBsYXlpbmdcIik7XHJcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU3RvcCgpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1zdGF0dXNcIiwgXCJsb2FkZWQgcGF1c2VkXCIpO1xyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgd2F0Y2hSZXNpemUodmlkZW9XaWR0aDogbnVtYmVyLCB2aWRlb0hlaWdodDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgYXNwZWN0UmF0aW8gPSB2aWRlb0hlaWdodCAvIHZpZGVvV2lkdGg7XHJcblxyXG4gICAgICAgIGNvbnN0IHVwZGF0ZVNpemUgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gdGhpcy5lbGVtZW50LmNsaWVudFdpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciEuc3R5bGUud2lkdGggPSBgJHtjb250YWluZXJXaWR0aH1weGA7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyIS5zdHlsZS5oZWlnaHQgPSBgJHtjb250YWluZXJXaWR0aCAqIGFzcGVjdFJhdGlvfXB4YDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB1cGRhdGVTaXplKCk7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwidmlkZW9zaXplXCIpKTtcclxuICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJyZXNpemVcIikpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHVwZGF0ZVNpemUoKSk7XHJcblxyXG4gICAgICAgIHRoaXMucGxheWVyLmVsZW1lbnQhLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZmx1c2hRdWV1ZSgpIHtcclxuICAgICAgICB0aGlzLnF1ZXVlLmZvckVhY2goKGNvbW1hbmQpID0+IHRoaXNbY29tbWFuZF0oKSk7XHJcbiAgICAgICAgdGhpcy5xdWV1ZS5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3F1ZXVlVGFzayhjb21tYW5kOiBUYXNrKSB7XHJcbiAgICAgICAgdGhpcy5xdWV1ZS5hZGQoY29tbWFuZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfYmluZFRyaWdnZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnBsYXlUcmlnZ2VyKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMucGxheVRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc1BsYXlpbmcgPyB0aGlzLnBhdXNlKCkgOiB0aGlzLnBsYXkoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX29ic2VydmVFbGVtZW50KCkge1xyXG4gICAgICAgIG9ic2VydmUoXHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLFxyXG4gICAgICAgICAgICAoaW5WaWV3KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5WaWV3ICYmIHRoaXMuY2FuQXV0b3BsYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1JlYWR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aHJlc2hvbGQ6IDAuMjUsXHJcbiAgICAgICAgICAgICAgICByb290TWFyZ2luOiBcIi01MHB4XCIsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWaWRlbztcclxuIiwiaW1wb3J0IHsgYWRkUHJlZmV0Y2ggfSBmcm9tIFwiQC91dGlsc1wiO1xyXG5pbXBvcnQgVmlkZW8gZnJvbSBcIi4uL1ZpZGVvXCI7XHJcblxyXG4vLyBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS95b3V0dWJlL3BsYXllcl9wYXJhbWV0ZXJzI3JlbGVhc2Vfbm90ZXNfMDhfMjNfMjAxOFxyXG5leHBvcnQgaW50ZXJmYWNlIFl0UGxheWVyIGV4dGVuZHMgWVQuUGxheWVyIHtcclxuICAgIGdldElmcmFtZSgpOiBIVE1MSUZyYW1lRWxlbWVudDtcclxuICAgIHBsYXlWaWRlbygpO1xyXG4gICAgcGF1c2VWaWRlbygpO1xyXG4gICAgbXV0ZSgpO1xyXG4gICAgZWxlbWVudD86IEhUTUxJRnJhbWVFbGVtZW50O1xyXG59XHJcblxyXG50eXBlIFN0YXRlQ2hhbmdlTWFwID0gUmVjb3JkPG51bWJlciwgKCkgPT4gdm9pZD47XHJcblxyXG5jbGFzcyBZVFZpZGVvIGV4dGVuZHMgVmlkZW8ge1xyXG4gICAgcGxheWVyITogWXRQbGF5ZXI7XHJcbiAgICBzdGF0aWMgcHJlY29ubmVjdGVkPzogYm9vbGVhbjtcclxuICAgIHN0YXRlQ2hhbmdlOiBTdGF0ZUNoYW5nZU1hcCA9IHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAtMSAtIFVuc3RhcnRlZFxyXG4gICAgICAgICAqICAwIC0gRW5kZWRcclxuICAgICAgICAgKiAgMSAtIFBsYXlpbmdcclxuICAgICAgICAgKiAgMiA9IFBhdXNlZFxyXG4gICAgICAgICAqICAzIC0gQnVmZmVyaW5nXHJcbiAgICAgICAgICogIDUgLSBDdWVkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgMDogKCkgPT4gdGhpcy5vbkVuZGVkKCksXHJcbiAgICAgICAgMTogKCkgPT4gdGhpcy5vblBsYXkoKSxcclxuICAgICAgICAyOiAoKSA9PiB0aGlzLnBhdXNlKCksXHJcbiAgICB9O1xyXG5cclxuICAgIGNyZWF0ZVBsYXllcigpIHtcclxuICAgICAgICBpZiAodGhpcy5wbGF5ZXIpIHJldHVybjtcclxuICAgICAgICBZVFZpZGVvLl93YXJtQ29ubmVjdGlvbnMoKTtcclxuICAgICAgICBjb25zdCB7IFBsYXllcjogWW91dHViZVBsYXllciB9ID0gd2luZG93LllUIHx8IHt9O1xyXG4gICAgICAgIGlmICghWW91dHViZVBsYXllcikge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2FkWVQoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuaW5uZXJIVE1MID0gXCI8ZGl2PjwvZGl2PlwiO1xyXG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IFlvdXR1YmVQbGF5ZXIodGhpcy5jb250YWluZXIuZmlyc3RFbGVtZW50Q2hpbGQgYXMgSFRNTEVsZW1lbnQsIHtcclxuICAgICAgICAgICAgdmlkZW9JZDogdGhpcy5pZCxcclxuICAgICAgICAgICAgcGxheWVyVmFyczoge1xyXG4gICAgICAgICAgICAgICAgYXV0b3BsYXk6IDAsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sczogMCxcclxuICAgICAgICAgICAgICAgIGxvb3A6IDEsXHJcbiAgICAgICAgICAgICAgICBtb2Rlc3RicmFuZGluZzogMSxcclxuICAgICAgICAgICAgICAgIHBsYXlsaXN0OiB0aGlzLmlkLFxyXG4gICAgICAgICAgICAgICAgcGxheXNpbmxpbmU6IDEsXHJcbiAgICAgICAgICAgICAgICByZWw6IDAsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogXCJ3aGl0ZVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBldmVudHM6IHtcclxuICAgICAgICAgICAgICAgIG9uUmVhZHk6ICgpID0+IHRoaXMuX29uUmVhZHkoKSxcclxuICAgICAgICAgICAgICAgIG9uU3RhdGVDaGFuZ2U6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlQ2hhbmdlW2RhdGFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VbZGF0YV0oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnBsYXllci5lbGVtZW50ID0gdGhpcy5wbGF5ZXIuZ2V0SWZyYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheVZpZGVvKCkge1xyXG4gICAgICAgIHRoaXMucGxheWVyLnBsYXlWaWRlbygpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhdXNlVmlkZW8oKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIucGF1c2VWaWRlbygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX29uUmVhZHkoKSB7XHJcbiAgICAgICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5pc011dGVkIHx8ICF0aGlzLmNhbkhhdmVTb3VuZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5tdXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMucGxheWVyLmVsZW1lbnQhO1xyXG4gICAgICAgIHRoaXMud2F0Y2hSZXNpemUoK3dpZHRoLCAraGVpZ2h0KTtcclxuXHJcbiAgICAgICAgXCJyZXF1ZXN0SWRsZUNhbGxiYWNrXCIgaW4gd2luZG93XHJcbiAgICAgICAgICAgID8gLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgIHJlcXVlc3RJZGxlQ2FsbGJhY2soKCkgPT4gdGhpcy5mbHVzaFF1ZXVlKCkpXHJcbiAgICAgICAgICAgIDogdGhpcy5mbHVzaFF1ZXVlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZFlUKCkge1xyXG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XHJcbiAgICAgICAgc2NyaXB0LnNyYyA9IFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vcGxheWVyX2FwaVwiO1xyXG4gICAgICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHdpbmRvdy5vbllvdVR1YmVJZnJhbWVBUElSZWFkeSA9ICgpID0+IHRoaXMuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF93YXJtQ29ubmVjdGlvbnMoKSB7XHJcbiAgICAgICAgaWYgKFlUVmlkZW8ucHJlY29ubmVjdGVkKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIFRoZSBpZnJhbWUgZG9jdW1lbnQgYW5kIG1vc3Qgb2YgaXRzIHN1YnJlc291cmNlcyBjb21lIHJpZ2h0IG9mZiB5b3V0dWJlLmNvbVxyXG4gICAgICAgIGFkZFByZWZldGNoKFwicHJlY29ubmVjdFwiLCBcImh0dHBzOi8vd3d3LnlvdXR1YmUtbm9jb29raWUuY29tXCIpO1xyXG4gICAgICAgIC8vIFRoZSBib3RndWFyZCBzY3JpcHQgaXMgZmV0Y2hlZCBvZmYgZnJvbSBnb29nbGUuY29tXHJcbiAgICAgICAgYWRkUHJlZmV0Y2goXCJwcmVjb25uZWN0XCIsIFwiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbVwiKTtcclxuXHJcbiAgICAgICAgLy8gTm90IGNlcnRhaW4gaWYgdGhlc2UgYWQgcmVsYXRlZCBkb21haW5zIGFyZSBpbiB0aGUgY3JpdGljYWwgcGF0aC4gQ291bGQgdmVyaWZ5IHdpdGggZG9tYWluLXNwZWNpZmljIHRocm90dGxpbmcuXHJcbiAgICAgICAgYWRkUHJlZmV0Y2goXCJwcmVjb25uZWN0XCIsIFwiaHR0cHM6Ly9nb29nbGVhZHMuZy5kb3VibGVjbGljay5uZXRcIik7XHJcbiAgICAgICAgYWRkUHJlZmV0Y2goXCJwcmVjb25uZWN0XCIsIFwiaHR0cHM6Ly9zdGF0aWMuZG91YmxlY2xpY2submV0XCIpO1xyXG5cclxuICAgICAgICBZVFZpZGVvLnByZWNvbm5lY3RlZCA9IHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFlUVmlkZW87XHJcbiIsIi8qKlxyXG4gKiBBZGQgYSA8bGluayByZWw9e3ByZWxvYWQgfCBwcmVjb25uZWN0fSAuLi4+IHRvIHRoZSBoZWFkXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgcmVuZGVyRWxlbWVudCB9IGZyb20gXCIuL2VsZW1lbnRcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRQcmVmZXRjaChraW5kOiBzdHJpbmcsIHVybDogc3RyaW5nLCBhcz86IHN0cmluZykge1xyXG4gICAgcmVuZGVyRWxlbWVudChcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6IFwibGlua1wiLFxyXG4gICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgcmVsOiBraW5kLFxyXG4gICAgICAgICAgICAgICAgaHJlZjogdXJsLFxyXG4gICAgICAgICAgICAgICAgLi4uKGFzICYmIHsgYXMgfSksXHJcbiAgICAgICAgICAgICAgICBjcm9zc09yaWdpbjogXCJhbm9ueW1vdXNcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRvY3VtZW50LmhlYWRcclxuICAgICk7XHJcbn1cclxuIiwidHlwZSBPYnNlcnZlckluc3RhbmNlQ2FsbGJhY2sgPSAoaW5WaWV3OiBib29sZWFuLCBpbnRlcnNlY3Rpb246IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnkpID0+IHZvaWQ7XHJcblxyXG50eXBlIE9ic2VydmVySW5zdGFuY2UgPSB7XHJcbiAgICBpblZpZXc6IGJvb2xlYW47XHJcbiAgICByZWFkb25seSBjYWxsYmFjazogT2JzZXJ2ZXJJbnN0YW5jZUNhbGxiYWNrO1xyXG4gICAgcmVhZG9ubHkgZWxlbWVudDogRWxlbWVudDtcclxuICAgIHJlYWRvbmx5IG9ic2VydmVySWQ6IHN0cmluZztcclxuICAgIHJlYWRvbmx5IG9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlcjtcclxuICAgIHJlYWRvbmx5IHRocmVzaG9sZHM6IFJlYWRvbmx5QXJyYXk8bnVtYmVyPjtcclxufTtcclxuXHJcbmNvbnN0IElOU1RBTkNFX01BUDogTWFwPEVsZW1lbnQsIE9ic2VydmVySW5zdGFuY2U+ID0gbmV3IE1hcCgpO1xyXG5jb25zdCBPQlNFUlZFUl9NQVA6IE1hcDxzdHJpbmcsIEludGVyc2VjdGlvbk9ic2VydmVyPiA9IG5ldyBNYXAoKTtcclxuY29uc3QgUk9PVF9JRFM6IE1hcDxFbGVtZW50LCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xyXG5cclxubGV0IGNvbnNlY3V0aXZlUm9vdElkID0gMDtcclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZSBhIHVuaXF1ZSBJRCBmb3IgdGhlIHJvb3QgZWxlbWVudFxyXG4gKiBAcGFyYW0gcm9vdFxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Um9vdElkKHJvb3Q/OiBFbGVtZW50IHwgbnVsbCkge1xyXG4gICAgaWYgKCFyb290KSByZXR1cm4gXCJcIjtcclxuICAgIGlmIChST09UX0lEUy5oYXMocm9vdCkpIHJldHVybiBST09UX0lEUy5nZXQocm9vdCk7XHJcbiAgICBjb25zZWN1dGl2ZVJvb3RJZCArPSAxO1xyXG4gICAgUk9PVF9JRFMuc2V0KHJvb3QsIGNvbnNlY3V0aXZlUm9vdElkLnRvU3RyaW5nKCkpO1xyXG4gICAgcmV0dXJuIGAke1JPT1RfSURTLmdldChyb290KX1fYDtcclxufVxyXG5cclxuLyoqXHJcbiAqIE1vbml0b3IgZWxlbWVudCwgYW5kIHRyaWdnZXIgY2FsbGJhY2sgd2hlbiBlbGVtZW50IGJlY29tZXMgaW5WaWV3XHJcbiAqIEBwYXJhbSBlbGVtZW50IHtIVE1MRWxlbWVudH1cclxuICogQHBhcmFtIGNhbGxiYWNrIHtGdW5jdGlvbn0gQ2FsbGVkIHdpdGggaW5WaWV3XHJcbiAqIEBwYXJhbSBvcHRpb25zIHtPYmplY3R9IEludGVyU2VjdGlvbiBvYnNlcnZlciBvcHRpb25zXHJcbiAqIEBwYXJhbSBvcHRpb25zLnRocmVzaG9sZCB7TnVtYmVyfSBOdW1iZXIgYmV0d2VlbiAwIGFuZCAxLCBpbmRpY2F0aW5nIGhvdyBtdWNoIG9mIHRoZSBlbGVtZW50IHNob3VsZCBiZSBpblZpZXcgYmVmb3JlIHRyaWdnZXJpbmdcclxuICogQHBhcmFtIG9wdGlvbnMucm9vdCB7SFRNTEVsZW1lbnR9XHJcbiAqIEBwYXJhbSBvcHRpb25zLnJvb3RNYXJnaW4ge1N0cmluZ30gVGhlIENTUyBtYXJnaW4gdG8gYXBwbHkgdG8gdGhlIHJvb3QgZWxlbWVudC5cclxuICpcclxuICogQHJldHVybnMge09ic2VydmVySW5zdGFuY2UgfCB1bmRlZmluZWR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gb2JzZXJ2ZShcclxuICAgIGVsZW1lbnQ6IEVsZW1lbnQsXHJcbiAgICBjYWxsYmFjazogT2JzZXJ2ZXJJbnN0YW5jZUNhbGxiYWNrLFxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXHJcbiAgICBvcHRpb25zOiBJbnRlcnNlY3Rpb25PYnNlcnZlckluaXQgPSB7fVxyXG4pIHtcclxuICAgIC8vIEludGVyc2VjdGlvbk9ic2VydmVyIG5lZWRzIGEgdGhyZXNob2xkIHRvIHRyaWdnZXIsIHNvIHNldCBpdCB0byAwIGlmIGl0J3Mgbm90IGRlZmluZWQuXHJcbiAgICAvLyBNb2RpZnkgdGhlIG9wdGlvbnMgb2JqZWN0LCBzaW5jZSBpdCdzIHVzZWQgaW4gdGhlIG9uQ2hhbmdlIGhhbmRsZXIuXHJcbiAgICBjb25zdCB7IHJvb3QsIHJvb3RNYXJnaW4sIHRocmVzaG9sZCA9IDAgfSA9IG9wdGlvbnM7XHJcblxyXG4gICAgLy8gQmFpbCBlYXJseSBpZiBlbGVtZW50IGlzIHVuZGVmaW5lZFxyXG4gICAgaWYgKCFlbGVtZW50KSByZXR1cm47XHJcblxyXG4gICAgLy8gQ3JlYXRlIGEgdW5pcXVlIElEIGZvciB0aGlzIG9ic2VydmVyIGluc3RhbmNlLCBiYXNlZCBvbiB0aGUgcm9vdCwgcm9vdCBtYXJnaW4gYW5kIHRocmVzaG9sZC5cclxuICAgIC8vIEFuIG9ic2VydmVyIHdpdGggdGhlIHNhbWUgb3B0aW9ucyBjYW4gYmUgcmV1c2VkLCBzbyBsZXRzIHVzZSB0aGlzIGZhY3RcclxuICAgIGNvbnN0IG9ic2VydmVySWQ6IHN0cmluZyA9XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGdldFJvb3RJZChyb290KSArXHJcbiAgICAgICAgKHJvb3RNYXJnaW4gPyBgJHt0aHJlc2hvbGQudG9TdHJpbmcoKX1fJHtyb290TWFyZ2lufWAgOiB0aHJlc2hvbGQudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgbGV0IG9ic2VydmVySW5zdGFuY2UgPSBPQlNFUlZFUl9NQVAuZ2V0KG9ic2VydmVySWQpO1xyXG4gICAgaWYgKCFvYnNlcnZlckluc3RhbmNlKSB7XHJcbiAgICAgICAgb2JzZXJ2ZXJJbnN0YW5jZSA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihvbkNoYW5nZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgaWYgKG9ic2VydmVySWQpIE9CU0VSVkVSX01BUC5zZXQob2JzZXJ2ZXJJZCwgb2JzZXJ2ZXJJbnN0YW5jZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaW5zdGFuY2U6IE9ic2VydmVySW5zdGFuY2UgPSB7XHJcbiAgICAgICAgY2FsbGJhY2ssXHJcbiAgICAgICAgZWxlbWVudCxcclxuICAgICAgICBpblZpZXc6IGZhbHNlLFxyXG4gICAgICAgIG9ic2VydmVySWQsXHJcbiAgICAgICAgb2JzZXJ2ZXI6IG9ic2VydmVySW5zdGFuY2UsXHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGhhdmUgdGhlIHRocmVzaG9sZHMgdmFsdWUuIEl0J3MgdW5kZWZpbmVkIG9uIGEgYnJvd3NlciBsaWtlIENocm9tZSA1MS5cclxuICAgICAgICB0aHJlc2hvbGRzOlxyXG4gICAgICAgICAgICBvYnNlcnZlckluc3RhbmNlLnRocmVzaG9sZHMgfHwgKEFycmF5LmlzQXJyYXkodGhyZXNob2xkKSA/IHRocmVzaG9sZCA6IFt0aHJlc2hvbGRdKSxcclxuICAgIH07XHJcblxyXG4gICAgSU5TVEFOQ0VfTUFQLnNldChlbGVtZW50LCBpbnN0YW5jZSk7XHJcbiAgICBvYnNlcnZlckluc3RhbmNlLm9ic2VydmUoZWxlbWVudCk7XHJcblxyXG4gICAgcmV0dXJuIGluc3RhbmNlO1xyXG59XHJcblxyXG4vKipcclxuICogU3RvcCBvYnNlcnZpbmcgYW4gZWxlbWVudC4gSWYgYW4gZWxlbWVudCBpcyByZW1vdmVkIGZyb20gdGhlIERPTSBvciBvdGhlcndpc2UgZGVzdHJveWVkLFxyXG4gKiBtYWtlIHN1cmUgdG8gY2FsbCB0aGlzIG1ldGhvZC5cclxuICogQHBhcmFtIGVsZW1lbnQge0VsZW1lbnR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdW5vYnNlcnZlKGVsZW1lbnQ6IEVsZW1lbnQgfCBudWxsKSB7XHJcbiAgICBpZiAoIWVsZW1lbnQpIHJldHVybjtcclxuICAgIGNvbnN0IGluc3RhbmNlID0gSU5TVEFOQ0VfTUFQLmdldChlbGVtZW50KTtcclxuXHJcbiAgICBpZiAoaW5zdGFuY2UpIHtcclxuICAgICAgICBjb25zdCB7IG9ic2VydmVySWQsIG9ic2VydmVyIH0gPSBpbnN0YW5jZTtcclxuICAgICAgICBjb25zdCB7IHJvb3QgfSA9IG9ic2VydmVyO1xyXG5cclxuICAgICAgICBvYnNlcnZlci51bm9ic2VydmUoZWxlbWVudCk7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHdlIGFyZSBzdGlsbCBvYnNlcnZpbmcgYW55IGVsZW1lbnRzIHdpdGggdGhlIHNhbWUgdGhyZXNob2xkLlxyXG4gICAgICAgIGxldCBpdGVtc0xlZnQgPSBmYWxzZTtcclxuICAgICAgICAvLyBDaGVjayBpZiB3ZSBzdGlsbCBoYXZlIG9ic2VydmVycyBjb25maWd1cmVkIHdpdGggdGhlIHNhbWUgcm9vdC5cclxuICAgICAgICBsZXQgcm9vdE9ic2VydmVkID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKG9ic2VydmVySWQpIHtcclxuICAgICAgICAgICAgSU5TVEFOQ0VfTUFQLmZvckVhY2goKGl0ZW0sIGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleSAhPT0gZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLm9ic2VydmVySWQgPT09IG9ic2VydmVySWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNMZWZ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9vdE9ic2VydmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ub2JzZXJ2ZXIucm9vdCA9PT0gcm9vdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb290T2JzZXJ2ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBpZiAoIXJvb3RPYnNlcnZlZCAmJiByb290KSBST09UX0lEUy5kZWxldGUocm9vdCk7XHJcbiAgICAgICAgaWYgKG9ic2VydmVyICYmICFpdGVtc0xlZnQpIHtcclxuICAgICAgICAgICAgLy8gTm8gbW9yZSBlbGVtZW50cyB0byBvYnNlcnZlIGZvciB0aHJlc2hvbGQsIGRpc2Nvbm5lY3Qgb2JzZXJ2ZXJcclxuICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIHJlZmVyZW5jZSB0byBlbGVtZW50XHJcbiAgICAgICAgSU5TVEFOQ0VfTUFQLmRlbGV0ZShlbGVtZW50KTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERlc3Ryb3kgYWxsIEludGVyc2VjdGlvbk9ic2VydmVycyBjdXJyZW50bHkgY29ubmVjdGVkXHJcbiAqICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkZXN0cm95KCkge1xyXG4gICAgT0JTRVJWRVJfTUFQLmZvckVhY2goKG9ic2VydmVyKSA9PiB7XHJcbiAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgT0JTRVJWRVJfTUFQLmNsZWFyKCk7XHJcbiAgICBJTlNUQU5DRV9NQVAuY2xlYXIoKTtcclxuICAgIFJPT1RfSURTLmNsZWFyKCk7XHJcbiAgICBjb25zZWN1dGl2ZVJvb3RJZCA9IDA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uQ2hhbmdlKGNoYW5nZXM6IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnlbXSkge1xyXG4gICAgY2hhbmdlcy5mb3JFYWNoKChpbnRlcnNlY3Rpb24pID0+IHtcclxuICAgICAgICBjb25zdCB7IGlzSW50ZXJzZWN0aW5nLCBpbnRlcnNlY3Rpb25SYXRpbywgdGFyZ2V0IH0gPSBpbnRlcnNlY3Rpb247XHJcbiAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBJTlNUQU5DRV9NQVAuZ2V0KHRhcmdldCk7XHJcblxyXG4gICAgICAgIC8vIEZpcmVmb3ggY2FuIHJlcG9ydCBhIG5lZ2F0aXZlIGludGVyc2VjdGlvblJhdGlvIHdoZW4gc2Nyb2xsaW5nLlxyXG4gICAgICAgIGlmIChpbnN0YW5jZSAmJiBpbnRlcnNlY3Rpb25SYXRpbyA+PSAwKSB7XHJcbiAgICAgICAgICAgIC8vIElmIHRocmVzaG9sZCBpcyBhbiBhcnJheSwgY2hlY2sgaWYgYW55IG9mIHRoZW0gaW50ZXJzZWN0cy4gVGhpcyBqdXN0IHRyaWdnZXJzIHRoZSBvbkNoYW5nZSBldmVudCBtdWx0aXBsZSB0aW1lcy5cclxuICAgICAgICAgICAgbGV0IGluVmlldyA9IGluc3RhbmNlLnRocmVzaG9sZHMuc29tZSgodGhyZXNob2xkKSA9PlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuaW5WaWV3ID8gaW50ZXJzZWN0aW9uUmF0aW8gPiB0aHJlc2hvbGQgOiBpbnRlcnNlY3Rpb25SYXRpbyA+PSB0aHJlc2hvbGRcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc0ludGVyc2VjdGluZyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiBpc0ludGVyc2VjdGluZyBpcyBkZWZpbmVkLCBlbnN1cmUgdGhhdCB0aGUgZWxlbWVudCBpcyBhY3R1YWxseSBpbnRlcnNlY3RpbmcuXHJcbiAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UgaXQgcmVwb3J0cyBhIHRocmVzaG9sZCBvZiAwXHJcbiAgICAgICAgICAgICAgICBpblZpZXcgPSBpblZpZXcgJiYgaXNJbnRlcnNlY3Rpbmc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGluc3RhbmNlLmluVmlldyA9IGluVmlldztcclxuICAgICAgICAgICAgaW5zdGFuY2UuY2FsbGJhY2soaW5WaWV3LCBpbnRlcnNlY3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBvYnNlcnZlLFxyXG4gICAgdW5vYnNlcnZlLFxyXG4gICAgZGVzdHJveSxcclxufTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiA/IE9iamVjdC5hc3NpZ24uYmluZCgpIDogZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG4gIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufSJdLCJuYW1lcyI6WyJnZXQiLCJvYnNlcnZlIiwiVmlkZW8iLCJjb25zdHJ1Y3RvciIsImVsZW1lbnQiLCJjb250YWluZXIiLCJpZCIsInNldHRpbmdzIiwiY2FuQXV0b3BsYXkiLCJjYW5IYXZlU291bmQiLCJpc011dGVkIiwiaXNQbGF5aW5nIiwiaXNSZWFkeSIsInBsYXlUcmlnZ2VyIiwicXVldWUiLCJwbGF5ZXIiLCJwbGF5UHJvbWlzZSIsImdldEF0dHJpYnV0ZSIsImluY2x1ZGVzIiwidGVzdCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInBsYXRmb3JtIiwibWF4VG91Y2hQb2ludHMiLCJ3aW5kb3ciLCJNU1N0cmVhbSIsInF1ZXJ5U2VsZWN0b3IiLCJTZXQiLCJjcmVhdGVQbGF5ZXIiLCJfYmluZFRyaWdnZXIiLCJfb2JzZXJ2ZUVsZW1lbnQiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJwbGF5IiwiX3F1ZXVlVGFzayIsIlByb21pc2UiLCJyZXNvbHZlIiwicGxheVZpZGVvIiwicGF1c2UiLCJwYXVzZVZpZGVvIiwib25TdG9wIiwib25FbmRlZCIsIm9uUGxheSIsInNldEF0dHJpYnV0ZSIsIndhdGNoUmVzaXplIiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0IiwiYXNwZWN0UmF0aW8iLCJ1cGRhdGVTaXplIiwiY29udGFpbmVyV2lkdGgiLCJjbGllbnRXaWR0aCIsInN0eWxlIiwid2lkdGgiLCJoZWlnaHQiLCJhZGRFdmVudExpc3RlbmVyIiwiZmx1c2hRdWV1ZSIsImZvckVhY2giLCJjb21tYW5kIiwiY2xlYXIiLCJhZGQiLCJpblZpZXciLCJ0aHJlc2hvbGQiLCJyb290TWFyZ2luIiwiYWRkUHJlZmV0Y2giLCJZVFZpZGVvIiwic3RhdGVDaGFuZ2UiLCJfd2FybUNvbm5lY3Rpb25zIiwiUGxheWVyIiwiWW91dHViZVBsYXllciIsIllUIiwiX2xvYWRZVCIsImlubmVySFRNTCIsImZpcnN0RWxlbWVudENoaWxkIiwidmlkZW9JZCIsInBsYXllclZhcnMiLCJhdXRvcGxheSIsImNvbnRyb2xzIiwibG9vcCIsIm1vZGVzdGJyYW5kaW5nIiwicGxheWxpc3QiLCJwbGF5c2lubGluZSIsInJlbCIsImNvbG9yIiwiZXZlbnRzIiwib25SZWFkeSIsIl9vblJlYWR5Iiwib25TdGF0ZUNoYW5nZSIsImRhdGEiLCJnZXRJZnJhbWUiLCJtdXRlIiwicmVxdWVzdElkbGVDYWxsYmFjayIsInNjcmlwdCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNyYyIsImFzeW5jIiwib25Zb3VUdWJlSWZyYW1lQVBJUmVhZHkiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJwcmVjb25uZWN0ZWQiLCJyZW5kZXJFbGVtZW50Iiwia2luZCIsInVybCIsImFzIiwidHlwZSIsInByb3BzIiwiaHJlZiIsImNyb3NzT3JpZ2luIiwiaGVhZCIsIklOU1RBTkNFX01BUCIsIk1hcCIsIk9CU0VSVkVSX01BUCIsIlJPT1RfSURTIiwiY29uc2VjdXRpdmVSb290SWQiLCJnZXRSb290SWQiLCJyb290IiwiaGFzIiwic2V0IiwidG9TdHJpbmciLCJjYWxsYmFjayIsIm9wdGlvbnMiLCJvYnNlcnZlcklkIiwib2JzZXJ2ZXJJbnN0YW5jZSIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwib25DaGFuZ2UiLCJpbnN0YW5jZSIsIm9ic2VydmVyIiwidGhyZXNob2xkcyIsIkFycmF5IiwiaXNBcnJheSIsInVub2JzZXJ2ZSIsIml0ZW1zTGVmdCIsInJvb3RPYnNlcnZlZCIsIml0ZW0iLCJrZXkiLCJkZWxldGUiLCJkaXNjb25uZWN0IiwiZGVzdHJveSIsImNoYW5nZXMiLCJpbnRlcnNlY3Rpb24iLCJpc0ludGVyc2VjdGluZyIsImludGVyc2VjdGlvblJhdGlvIiwidGFyZ2V0Iiwic29tZSIsInVuZGVmaW5lZCJdLCJzb3VyY2VSb290IjoiIn0=