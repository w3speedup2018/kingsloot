"use strict";
(self["webpackChunkjuno_shopify_template"] = self["webpackChunkjuno_shopify_template"] || []).push([["HTML5"],{

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

/***/ "./src/assets/js/main/video/types/HTML5.ts":
/*!*************************************************!*\
  !*** ./src/assets/js/main/video/types/HTML5.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Video__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Video */ "./src/assets/js/main/video/Video.ts");
/* eslint-disable camelcase */


class HTML5Video extends _Video__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(...args) {
    super(...args);
    this.player = void 0;
  }

  createPlayer() {
    if (this.player) return;
    let videoSources = [];
    let sourcesAttr;

    if (this.container.hasAttribute("data-sources")) {
      sourcesAttr = JSON.parse(this.container.getAttribute("data-sources"));
      videoSources = sourcesAttr.sources;
    } else if (this.container.hasAttribute("data-url")) {
      videoSources.push({
        mime_type: "video/mp4",
        url: this.container.getAttribute("data-url")
      });
    }

    this.container.innerHTML = `
            <video muted playsinline loop controls width="100%" height="100%">
                ${videoSources.reduce((acc, curr) => {
      // eslint-disable-next-line no-param-reassign
      acc += `<source src="${curr.url}" type="${curr.mime_type}">`;
      return acc;
    }, "")}
            </video>
        `;
    const player = this.container.firstElementChild; // @ts-expect-error

    player.element = this.container.firstElementChild;
    player.addEventListener("canplay", () => this._onReady(player));
    player.addEventListener("ended", () => this.onEnded());
    player.addEventListener("play", () => this.onPlay());
    player.addEventListener("pause", () => this.pause());
  }

  playVideo() {
    this.player.play();
  }

  pauseVideo() {
    this.player.pause();
  }

  _onReady(player) {
    this.player = player;
    this.isReady = true;
    const {
      videoWidth,
      videoHeight
    } = this.player;
    this.watchResize(videoWidth, videoHeight);
    "requestIdleCallback" in window ? // @ts-ignore
    requestIdleCallback(() => this.flushQueue()) : this.flushQueue();
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HTML5Video);

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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL0hUTUw1LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBU0E7QUFDQTtBQUNBO0FBQ0EsTUFBZUUsS0FBZixDQUFxQjtFQWVqQkMsV0FBVyxDQUFDQyxPQUFELEVBQXVCO0lBQUEsS0FkbENBLE9BY2tDO0lBQUEsS0FibENDLFNBYWtDO0lBQUEsS0FabENDLEVBWWtDO0lBQUEsS0FYbENDLFFBV2tDO0lBQUEsS0FWbENDLFdBVWtDO0lBQUEsS0FUbENDLFlBU2tDO0lBQUEsS0FSbENDLE9BUWtDO0lBQUEsS0FQbENDLFNBT2tDO0lBQUEsS0FObENDLE9BTWtDO0lBQUEsS0FMbENDLFdBS2tDO0lBQUEsS0FKbENDLEtBSWtDO0lBQUEsS0FIekJDLE1BR3lCO0lBQUEsS0FGbENDLFdBRWtDO0lBQzlCLEtBQUtaLE9BQUwsR0FBZUEsT0FBZjtJQUNBLEtBQUtHLFFBQUwsR0FBZ0IsS0FBS0gsT0FBTCxDQUFhYSxZQUFiLENBQTBCLGVBQTFCLENBQWhCO0lBRUEsS0FBS1QsV0FBTCxHQUFtQixLQUFLRCxRQUFMLENBQWNXLFFBQWQsQ0FBdUIsVUFBdkIsQ0FBbkI7SUFDQSxLQUFLVCxZQUFMLEdBQW9CLEVBQ2hCLENBQUMsbUJBQW1CVSxJQUFuQixDQUF3QkMsU0FBUyxDQUFDQyxTQUFsQyxLQUNJRCxTQUFTLENBQUNFLFFBQVYsS0FBdUIsVUFBdkIsSUFBcUNGLFNBQVMsQ0FBQ0csY0FBVixHQUEyQixDQURyRSxLQUVBO0lBQ0EsQ0FBQ0MsTUFBTSxDQUFDQyxRQUpRLENBQXBCO0lBTUEsS0FBS3BCLFNBQUwsR0FBaUJMLDJDQUFHLENBQUMscUJBQUQsRUFBd0JJLE9BQXhCLENBQXBCO0lBQ0EsS0FBS0UsRUFBTCxHQUFVRixPQUFPLENBQUNhLFlBQVIsQ0FBcUIsU0FBckIsS0FBbUMsRUFBN0M7SUFDQSxLQUFLUCxPQUFMLEdBQWUsS0FBS0gsUUFBTCxDQUFjVyxRQUFkLENBQXVCLE9BQXZCLENBQWY7SUFDQSxLQUFLUCxTQUFMLEdBQWlCLEtBQWpCO0lBQ0EsS0FBS0MsT0FBTCxHQUFlLEtBQWY7SUFDQSxLQUFLQyxXQUFMLEdBQW1CVCxPQUFPLENBQUNzQixhQUFSLENBQXNCLG1CQUF0QixDQUFuQjtJQUNBLEtBQUtaLEtBQUwsR0FBYSxJQUFJYSxHQUFKLEVBQWI7SUFFQSxLQUFLQyxZQUFMOztJQUNBLEtBQUtDLFlBQUw7O0lBQ0EsS0FBS0MsZUFBTDs7SUFDQTFCLE9BQU8sQ0FBQzJCLGFBQVIsQ0FBc0IsSUFBSUMsV0FBSixDQUFnQixhQUFoQixDQUF0QjtFQUNIOztFQU1EQyxJQUFJLEdBQUc7SUFDSCxJQUFJLEtBQUt0QixTQUFULEVBQW9COztJQUNwQixJQUFJLENBQUMsS0FBS0MsT0FBVixFQUFtQjtNQUNmLEtBQUtnQixZQUFMOztNQUNBLEtBQUtNLFVBQUwsQ0FBZ0IsTUFBaEI7O01BQ0E7SUFDSDs7SUFFRCxLQUFLbEIsV0FBTCxHQUFtQm1CLE9BQU8sQ0FBQ0MsT0FBUixDQUFnQixLQUFLQyxTQUFMLEVBQWhCLENBQW5CO0VBQ0g7O0VBRVUsTUFBTEMsS0FBSyxHQUFHO0lBQ1YsSUFBSSxDQUFDLEtBQUszQixTQUFWLEVBQXFCOztJQUNyQixJQUFJLENBQUMsS0FBS0MsT0FBTixJQUFpQixPQUFPLEtBQUtJLFdBQVosS0FBNEIsV0FBakQsRUFBOEQ7TUFDMUQsS0FBS2tCLFVBQUwsQ0FBZ0IsT0FBaEI7O01BQ0E7SUFDSDs7SUFFRCxNQUFNLEtBQUtsQixXQUFYO0lBQ0EsS0FBS3VCLFVBQUw7SUFDQSxLQUFLQyxNQUFMO0VBQ0g7O0VBRURDLE9BQU8sR0FBRztJQUNOLEtBQUtELE1BQUw7RUFDSDs7RUFFREUsTUFBTSxHQUFHO0lBQ0wsS0FBS3RDLE9BQUwsQ0FBYXVDLFlBQWIsQ0FBMEIsYUFBMUIsRUFBeUMsZ0JBQXpDO0lBQ0EsS0FBS2hDLFNBQUwsR0FBaUIsSUFBakI7RUFDSDs7RUFFRDZCLE1BQU0sR0FBRztJQUNMLEtBQUtwQyxPQUFMLENBQWF1QyxZQUFiLENBQTBCLGFBQTFCLEVBQXlDLGVBQXpDO0lBQ0EsS0FBS2hDLFNBQUwsR0FBaUIsS0FBakI7RUFDSDs7RUFFRGlDLFdBQVcsQ0FBQ0MsVUFBRCxFQUFxQkMsV0FBckIsRUFBMEM7SUFDakQsTUFBTUMsV0FBVyxHQUFHRCxXQUFXLEdBQUdELFVBQWxDOztJQUVBLE1BQU1HLFVBQVUsR0FBRyxNQUFNO01BQ3JCLE1BQU1DLGNBQWMsR0FBRyxLQUFLN0MsT0FBTCxDQUFhOEMsV0FBcEM7TUFDQSxLQUFLN0MsU0FBTCxDQUFnQjhDLEtBQWhCLENBQXNCQyxLQUF0QixHQUErQixHQUFFSCxjQUFlLElBQWhEO01BQ0EsS0FBSzVDLFNBQUwsQ0FBZ0I4QyxLQUFoQixDQUFzQkUsTUFBdEIsR0FBZ0MsR0FBRUosY0FBYyxHQUFHRixXQUFZLElBQS9EO0lBQ0gsQ0FKRDs7SUFNQUMsVUFBVTtJQUNWLEtBQUs1QyxPQUFMLENBQWEyQixhQUFiLENBQTJCLElBQUlDLFdBQUosQ0FBZ0IsV0FBaEIsQ0FBM0I7SUFDQVIsTUFBTSxDQUFDTyxhQUFQLENBQXFCLElBQUlDLFdBQUosQ0FBZ0IsUUFBaEIsQ0FBckI7SUFDQVIsTUFBTSxDQUFDOEIsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsTUFBTU4sVUFBVSxFQUFsRDtJQUVBLEtBQUtqQyxNQUFMLENBQVlYLE9BQVosQ0FBcUJ1QyxZQUFyQixDQUFrQyxVQUFsQyxFQUE4QyxJQUE5QztFQUNIOztFQUVEWSxVQUFVLEdBQUc7SUFDVCxLQUFLekMsS0FBTCxDQUFXMEMsT0FBWCxDQUFvQkMsT0FBRCxJQUFhLEtBQUtBLE9BQUwsR0FBaEM7SUFDQSxLQUFLM0MsS0FBTCxDQUFXNEMsS0FBWDtFQUNIOztFQUVPeEIsVUFBVSxDQUFDdUIsT0FBRCxFQUFnQjtJQUM5QixLQUFLM0MsS0FBTCxDQUFXNkMsR0FBWCxDQUFlRixPQUFmO0VBQ0g7O0VBRU81QixZQUFZLEdBQUc7SUFDbkIsSUFBSSxDQUFDLEtBQUtoQixXQUFWLEVBQXVCO0lBRXZCLEtBQUtBLFdBQUwsQ0FBaUJ5QyxnQkFBakIsQ0FBa0MsT0FBbEMsRUFBMkMsTUFBTTtNQUM3QyxLQUFLM0MsU0FBTCxHQUFpQixLQUFLMkIsS0FBTCxFQUFqQixHQUFnQyxLQUFLTCxJQUFMLEVBQWhDO0lBQ0gsQ0FGRDtFQUdIOztFQUNPSCxlQUFlLEdBQUc7SUFDdEI3Qix3REFBTyxDQUNILEtBQUtJLFNBREYsRUFFRnVELE1BQUQsSUFBWTtNQUNSLElBQUlBLE1BQU0sSUFBSSxLQUFLcEQsV0FBbkIsRUFBZ0M7UUFDNUIsS0FBS3lCLElBQUw7TUFDSCxDQUZELE1BRU8sSUFBSSxLQUFLckIsT0FBVCxFQUFrQjtRQUNyQixLQUFLMEIsS0FBTDtNQUNIO0lBQ0osQ0FSRSxFQVNIO01BQ0l1QixTQUFTLEVBQUUsSUFEZjtNQUVJQyxVQUFVLEVBQUU7SUFGaEIsQ0FURyxDQUFQO0VBY0g7O0FBaklnQjs7QUFvSXJCLGlFQUFlNUQsS0FBZjs7Ozs7Ozs7Ozs7Ozs7O0FDakpBO0FBQ0E7O0FBY0EsTUFBTTZELFVBQU4sU0FBeUI3RCw4Q0FBekIsQ0FBK0I7RUFBQTtJQUFBO0lBQUEsS0FDM0JhLE1BRDJCO0VBQUE7O0VBRzNCYSxZQUFZLEdBQUc7SUFDWCxJQUFJLEtBQUtiLE1BQVQsRUFBaUI7SUFDakIsSUFBSWlELFlBQXNCLEdBQUcsRUFBN0I7SUFDQSxJQUFJQyxXQUFKOztJQUVBLElBQUksS0FBSzVELFNBQUwsQ0FBZTZELFlBQWYsQ0FBNEIsY0FBNUIsQ0FBSixFQUFpRDtNQUM3Q0QsV0FBVyxHQUFHRSxJQUFJLENBQUNDLEtBQUwsQ0FBVyxLQUFLL0QsU0FBTCxDQUFlWSxZQUFmLENBQTRCLGNBQTVCLENBQVgsQ0FBZDtNQUNBK0MsWUFBWSxHQUFHQyxXQUFXLENBQUNJLE9BQTNCO0lBQ0gsQ0FIRCxNQUdPLElBQUksS0FBS2hFLFNBQUwsQ0FBZTZELFlBQWYsQ0FBNEIsVUFBNUIsQ0FBSixFQUE2QztNQUNoREYsWUFBWSxDQUFDTSxJQUFiLENBQWtCO1FBQ2RDLFNBQVMsRUFBRSxXQURHO1FBRWRDLEdBQUcsRUFBRSxLQUFLbkUsU0FBTCxDQUFlWSxZQUFmLENBQTRCLFVBQTVCO01BRlMsQ0FBbEI7SUFJSDs7SUFFRCxLQUFLWixTQUFMLENBQWVvRSxTQUFmLEdBQTRCO0FBQ3BDO0FBQ0Esa0JBQWtCVCxZQUFZLENBQUNVLE1BQWIsQ0FBb0IsQ0FBQ0MsR0FBRCxFQUFNQyxJQUFOLEtBQWU7TUFDakM7TUFDQUQsR0FBRyxJQUFLLGdCQUFlQyxJQUFJLENBQUNKLEdBQUksV0FBVUksSUFBSSxDQUFDTCxTQUFVLElBQXpEO01BQ0EsT0FBT0ksR0FBUDtJQUNILENBSkMsRUFJQyxFQUpELENBSUs7QUFDdkI7QUFDQSxTQVJRO0lBU0EsTUFBTTVELE1BQU0sR0FBRyxLQUFLVixTQUFMLENBQWV3RSxpQkFBOUIsQ0F4QlcsQ0F5Qlg7O0lBQ0E5RCxNQUFNLENBQUNYLE9BQVAsR0FBaUIsS0FBS0MsU0FBTCxDQUFld0UsaUJBQWhDO0lBRUE5RCxNQUFNLENBQUN1QyxnQkFBUCxDQUF3QixTQUF4QixFQUFtQyxNQUFNLEtBQUt3QixRQUFMLENBQWMvRCxNQUFkLENBQXpDO0lBQ0FBLE1BQU0sQ0FBQ3VDLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLE1BQU0sS0FBS2IsT0FBTCxFQUF2QztJQUNBMUIsTUFBTSxDQUFDdUMsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsTUFBTSxLQUFLWixNQUFMLEVBQXRDO0lBQ0EzQixNQUFNLENBQUN1QyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxNQUFNLEtBQUtoQixLQUFMLEVBQXZDO0VBQ0g7O0VBRURELFNBQVMsR0FBRztJQUNSLEtBQUt0QixNQUFMLENBQVlrQixJQUFaO0VBQ0g7O0VBRURNLFVBQVUsR0FBRztJQUNULEtBQUt4QixNQUFMLENBQVl1QixLQUFaO0VBQ0g7O0VBRUR3QyxRQUFRLENBQUMvRCxNQUFELEVBQXNCO0lBQzFCLEtBQUtBLE1BQUwsR0FBY0EsTUFBZDtJQUVBLEtBQUtILE9BQUwsR0FBZSxJQUFmO0lBRUEsTUFBTTtNQUFFaUMsVUFBRjtNQUFjQztJQUFkLElBQThCLEtBQUsvQixNQUF6QztJQUNBLEtBQUs2QixXQUFMLENBQWlCQyxVQUFqQixFQUE2QkMsV0FBN0I7SUFFQSx5QkFBeUJ0QixNQUF6QixHQUNNO0lBQ0F1RCxtQkFBbUIsQ0FBQyxNQUFNLEtBQUt4QixVQUFMLEVBQVAsQ0FGekIsR0FHTSxLQUFLQSxVQUFMLEVBSE47RUFJSDs7QUF6RDBCOztBQTREL0IsaUVBQWVRLFVBQWY7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEVBLE1BQU1pQixZQUE0QyxHQUFHLElBQUlDLEdBQUosRUFBckQ7QUFDQSxNQUFNQyxZQUErQyxHQUFHLElBQUlELEdBQUosRUFBeEQ7QUFDQSxNQUFNRSxRQUE4QixHQUFHLElBQUlGLEdBQUosRUFBdkM7QUFFQSxJQUFJRyxpQkFBaUIsR0FBRyxDQUF4QjtBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLFNBQVNDLFNBQVQsQ0FBbUJDLElBQW5CLEVBQTBDO0VBQ3RDLElBQUksQ0FBQ0EsSUFBTCxFQUFXLE9BQU8sRUFBUDtFQUNYLElBQUlILFFBQVEsQ0FBQ0ksR0FBVCxDQUFhRCxJQUFiLENBQUosRUFBd0IsT0FBT0gsUUFBUSxDQUFDbkYsR0FBVCxDQUFhc0YsSUFBYixDQUFQO0VBQ3hCRixpQkFBaUIsSUFBSSxDQUFyQjtFQUNBRCxRQUFRLENBQUNLLEdBQVQsQ0FBYUYsSUFBYixFQUFtQkYsaUJBQWlCLENBQUNLLFFBQWxCLEVBQW5CO0VBQ0EsT0FBUSxHQUFFTixRQUFRLENBQUNuRixHQUFULENBQWFzRixJQUFiLENBQW1CLEdBQTdCO0FBQ0g7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDTyxTQUFTckYsT0FBVCxDQUNIRyxPQURHLEVBRUhzRixRQUZHLEVBR0g7QUFDQUMsT0FBaUMsR0FBRyxFQUpqQyxFQUtMO0VBQ0U7RUFDQTtFQUNBLE1BQU07SUFBRUwsSUFBRjtJQUFReEIsVUFBUjtJQUFvQkQsU0FBUyxHQUFHO0VBQWhDLElBQXNDOEIsT0FBNUMsQ0FIRixDQUtFOztFQUNBLElBQUksQ0FBQ3ZGLE9BQUwsRUFBYyxPQU5oQixDQVFFO0VBQ0E7O0VBQ0EsTUFBTXdGLFVBQWtCLEdBQ3BCO0VBQ0FQLFNBQVMsQ0FBQ0MsSUFBRCxDQUFULElBQ0N4QixVQUFVLEdBQUksR0FBRUQsU0FBUyxDQUFDNEIsUUFBVixFQUFxQixJQUFHM0IsVUFBVyxFQUF6QyxHQUE2Q0QsU0FBUyxDQUFDNEIsUUFBVixFQUR4RCxDQUZKO0VBS0EsSUFBSUksZ0JBQWdCLEdBQUdYLFlBQVksQ0FBQ2xGLEdBQWIsQ0FBaUI0RixVQUFqQixDQUF2Qjs7RUFDQSxJQUFJLENBQUNDLGdCQUFMLEVBQXVCO0lBQ25CQSxnQkFBZ0IsR0FBRyxJQUFJQyxvQkFBSixDQUF5QkMsUUFBekIsRUFBbUNKLE9BQW5DLENBQW5CO0lBQ0EsSUFBSUMsVUFBSixFQUFnQlYsWUFBWSxDQUFDTSxHQUFiLENBQWlCSSxVQUFqQixFQUE2QkMsZ0JBQTdCO0VBQ25COztFQUVELE1BQU1HLFFBQTBCLEdBQUc7SUFDL0JOLFFBRCtCO0lBRS9CdEYsT0FGK0I7SUFHL0J3RCxNQUFNLEVBQUUsS0FIdUI7SUFJL0JnQyxVQUorQjtJQUsvQkssUUFBUSxFQUFFSixnQkFMcUI7SUFNL0I7SUFDQUssVUFBVSxFQUNOTCxnQkFBZ0IsQ0FBQ0ssVUFBakIsS0FBZ0NDLEtBQUssQ0FBQ0MsT0FBTixDQUFjdkMsU0FBZCxJQUEyQkEsU0FBM0IsR0FBdUMsQ0FBQ0EsU0FBRCxDQUF2RTtFQVIyQixDQUFuQztFQVdBbUIsWUFBWSxDQUFDUSxHQUFiLENBQWlCcEYsT0FBakIsRUFBMEI0RixRQUExQjtFQUNBSCxnQkFBZ0IsQ0FBQzVGLE9BQWpCLENBQXlCRyxPQUF6QjtFQUVBLE9BQU80RixRQUFQO0FBQ0g7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLFNBQVNLLFNBQVQsQ0FBbUJqRyxPQUFuQixFQUE0QztFQUMvQyxJQUFJLENBQUNBLE9BQUwsRUFBYztFQUNkLE1BQU00RixRQUFRLEdBQUdoQixZQUFZLENBQUNoRixHQUFiLENBQWlCSSxPQUFqQixDQUFqQjs7RUFFQSxJQUFJNEYsUUFBSixFQUFjO0lBQ1YsTUFBTTtNQUFFSixVQUFGO01BQWNLO0lBQWQsSUFBMkJELFFBQWpDO0lBQ0EsTUFBTTtNQUFFVjtJQUFGLElBQVdXLFFBQWpCO0lBRUFBLFFBQVEsQ0FBQ0ksU0FBVCxDQUFtQmpHLE9BQW5CLEVBSlUsQ0FNVjs7SUFDQSxJQUFJa0csU0FBUyxHQUFHLEtBQWhCLENBUFUsQ0FRVjs7SUFDQSxJQUFJQyxZQUFZLEdBQUcsS0FBbkI7O0lBQ0EsSUFBSVgsVUFBSixFQUFnQjtNQUNaWixZQUFZLENBQUN4QixPQUFiLENBQXFCLENBQUNnRCxJQUFELEVBQU9DLEdBQVAsS0FBZTtRQUNoQyxJQUFJQSxHQUFHLEtBQUtyRyxPQUFaLEVBQXFCO1VBQ2pCLElBQUlvRyxJQUFJLENBQUNaLFVBQUwsS0FBb0JBLFVBQXhCLEVBQW9DO1lBQ2hDVSxTQUFTLEdBQUcsSUFBWjtZQUNBQyxZQUFZLEdBQUcsSUFBZjtVQUNIOztVQUNELElBQUlDLElBQUksQ0FBQ1AsUUFBTCxDQUFjWCxJQUFkLEtBQXVCQSxJQUEzQixFQUFpQztZQUM3QmlCLFlBQVksR0FBRyxJQUFmO1VBQ0g7UUFDSjtNQUNKLENBVkQ7SUFXSCxDQXRCUyxDQXVCVjs7O0lBQ0EsSUFBSSxDQUFDQSxZQUFELElBQWlCakIsSUFBckIsRUFBMkJILFFBQVEsQ0FBQ3VCLE1BQVQsQ0FBZ0JwQixJQUFoQjs7SUFDM0IsSUFBSVcsUUFBUSxJQUFJLENBQUNLLFNBQWpCLEVBQTRCO01BQ3hCO01BQ0FMLFFBQVEsQ0FBQ1UsVUFBVDtJQUNILENBNUJTLENBOEJWOzs7SUFDQTNCLFlBQVksQ0FBQzBCLE1BQWIsQ0FBb0J0RyxPQUFwQjtFQUNIO0FBQ0o7QUFFRDtBQUNBO0FBQ0E7O0FBQ08sU0FBU3dHLE9BQVQsR0FBbUI7RUFDdEIxQixZQUFZLENBQUMxQixPQUFiLENBQXNCeUMsUUFBRCxJQUFjO0lBQy9CQSxRQUFRLENBQUNVLFVBQVQ7RUFDSCxDQUZEO0VBSUF6QixZQUFZLENBQUN4QixLQUFiO0VBQ0FzQixZQUFZLENBQUN0QixLQUFiO0VBQ0F5QixRQUFRLENBQUN6QixLQUFUO0VBQ0EwQixpQkFBaUIsR0FBRyxDQUFwQjtBQUNIOztBQUVELFNBQVNXLFFBQVQsQ0FBa0JjLE9BQWxCLEVBQXdEO0VBQ3BEQSxPQUFPLENBQUNyRCxPQUFSLENBQWlCc0QsWUFBRCxJQUFrQjtJQUM5QixNQUFNO01BQUVDLGNBQUY7TUFBa0JDLGlCQUFsQjtNQUFxQ0M7SUFBckMsSUFBZ0RILFlBQXREO0lBQ0EsTUFBTWQsUUFBUSxHQUFHaEIsWUFBWSxDQUFDaEYsR0FBYixDQUFpQmlILE1BQWpCLENBQWpCLENBRjhCLENBSTlCOztJQUNBLElBQUlqQixRQUFRLElBQUlnQixpQkFBaUIsSUFBSSxDQUFyQyxFQUF3QztNQUNwQztNQUNBLElBQUlwRCxNQUFNLEdBQUdvQyxRQUFRLENBQUNFLFVBQVQsQ0FBb0JnQixJQUFwQixDQUEwQnJELFNBQUQsSUFDbENtQyxRQUFRLENBQUNwQyxNQUFULEdBQWtCb0QsaUJBQWlCLEdBQUduRCxTQUF0QyxHQUFrRG1ELGlCQUFpQixJQUFJbkQsU0FEOUQsQ0FBYjs7TUFJQSxJQUFJa0QsY0FBYyxLQUFLSSxTQUF2QixFQUFrQztRQUM5QjtRQUNBO1FBQ0F2RCxNQUFNLEdBQUdBLE1BQU0sSUFBSW1ELGNBQW5CO01BQ0g7O01BRURmLFFBQVEsQ0FBQ3BDLE1BQVQsR0FBa0JBLE1BQWxCO01BQ0FvQyxRQUFRLENBQUNOLFFBQVQsQ0FBa0I5QixNQUFsQixFQUEwQmtELFlBQTFCO0lBQ0g7RUFDSixDQXBCRDtBQXFCSDs7QUFFRCxpRUFBZTtFQUNYN0csT0FEVztFQUVYb0csU0FGVztFQUdYTztBQUhXLENBQWYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qdW5vLXNob3BpZnktdGVtcGxhdGUvLi9zcmMvYXNzZXRzL2pzL21haW4vdmlkZW8vVmlkZW8udHMiLCJ3ZWJwYWNrOi8vanVuby1zaG9waWZ5LXRlbXBsYXRlLy4vc3JjL2Fzc2V0cy9qcy9tYWluL3ZpZGVvL3R5cGVzL0hUTUw1LnRzIiwid2VicGFjazovL2p1bm8tc2hvcGlmeS10ZW1wbGF0ZS8uL3NyYy9hc3NldHMvanMvdXRpbHMvb2JzZXJ2ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0IH0gZnJvbSBcIkAvdXRpbHNcIjtcclxuaW1wb3J0IHsgb2JzZXJ2ZSB9IGZyb20gXCIuLi8uLi91dGlscy9vYnNlcnZlclwiO1xyXG5pbXBvcnQgdHlwZSB7IEhUTUw1UGxheWVyIH0gZnJvbSBcIi4vdHlwZXMvSFRNTDVcIjtcclxuaW1wb3J0IHR5cGUgeyBWaW1lb1BsYXllciB9IGZyb20gXCIuL3R5cGVzL1ZpbWVvXCI7XHJcbmltcG9ydCB0eXBlIHsgWXRQbGF5ZXIgfSBmcm9tIFwiLi90eXBlcy9Zb3VUdWJlXCI7XHJcblxyXG50eXBlIFZpZGVvUGxheWVyID0gVmltZW9QbGF5ZXIgfCBZdFBsYXllciB8IEhUTUw1UGxheWVyO1xyXG5cclxudHlwZSBUYXNrID0gXCJwbGF5XCIgfCBcInBhdXNlXCI7XHJcblxyXG4vKipcclxuICogVGhpcyBpcyB2aWRlbyBiYXNlIGNsYXNzLlxyXG4gKi9cclxuYWJzdHJhY3QgY2xhc3MgVmlkZW8ge1xyXG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgICBjb250YWluZXI6IEhUTUxFbGVtZW50O1xyXG4gICAgaWQ6IHN0cmluZztcclxuICAgIHNldHRpbmdzOiBzdHJpbmc7XHJcbiAgICBjYW5BdXRvcGxheTogYm9vbGVhbjtcclxuICAgIGNhbkhhdmVTb3VuZDogYm9vbGVhbjtcclxuICAgIGlzTXV0ZWQ6IGJvb2xlYW47XHJcbiAgICBpc1BsYXlpbmc6IGJvb2xlYW47XHJcbiAgICBpc1JlYWR5OiBib29sZWFuO1xyXG4gICAgcGxheVRyaWdnZXI6IEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgcXVldWU6IFNldDxUYXNrPjtcclxuICAgIGFic3RyYWN0IHBsYXllcjogVmlkZW9QbGF5ZXI7XHJcbiAgICBwbGF5UHJvbWlzZT86IFByb21pc2U8YW55PjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNldHRpbmdzXCIpO1xyXG5cclxuICAgICAgICB0aGlzLmNhbkF1dG9wbGF5ID0gdGhpcy5zZXR0aW5ncy5pbmNsdWRlcyhcImF1dG9wbGF5XCIpO1xyXG4gICAgICAgIHRoaXMuY2FuSGF2ZVNvdW5kID0gIShcclxuICAgICAgICAgICAgKC9pUGFkfGlQaG9uZXxpUG9kLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpIHx8XHJcbiAgICAgICAgICAgICAgICAobmF2aWdhdG9yLnBsYXRmb3JtID09PSBcIk1hY0ludGVsXCIgJiYgbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMSkpICYmXHJcbiAgICAgICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcclxuICAgICAgICAgICAgIXdpbmRvdy5NU1N0cmVhbVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBnZXQoXCIuanMtdmlkZW8tY29udGFpbmVyXCIsIGVsZW1lbnQpITtcclxuICAgICAgICB0aGlzLmlkID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpIHx8IFwiXCI7XHJcbiAgICAgICAgdGhpcy5pc011dGVkID0gdGhpcy5zZXR0aW5ncy5pbmNsdWRlcyhcIm11dGVkXCIpO1xyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1JlYWR5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wbGF5VHJpZ2dlciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy12aWRlby10cmlnZ2VyXCIpO1xyXG4gICAgICAgIHRoaXMucXVldWUgPSBuZXcgU2V0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgdGhpcy5fYmluZFRyaWdnZXIoKTtcclxuICAgICAgICB0aGlzLl9vYnNlcnZlRWxlbWVudCgpO1xyXG4gICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJ2aWRlb2xvYWRlZFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWJzdHJhY3QgY3JlYXRlUGxheWVyKCk6IHZvaWQ7XHJcbiAgICBhYnN0cmFjdCBwbGF5VmlkZW8oKTogdm9pZDtcclxuICAgIGFic3RyYWN0IHBhdXNlVmlkZW8oKTogdm9pZDtcclxuXHJcbiAgICBwbGF5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUGxheWluZykgcmV0dXJuO1xyXG4gICAgICAgIGlmICghdGhpcy5pc1JlYWR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUGxheWVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3F1ZXVlVGFzayhcInBsYXlcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucGxheVByb21pc2UgPSBQcm9taXNlLnJlc29sdmUodGhpcy5wbGF5VmlkZW8oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgcGF1c2UoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUGxheWluZykgcmV0dXJuO1xyXG4gICAgICAgIGlmICghdGhpcy5pc1JlYWR5IHx8IHR5cGVvZiB0aGlzLnBsYXlQcm9taXNlID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3F1ZXVlVGFzayhcInBhdXNlXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhd2FpdCB0aGlzLnBsYXlQcm9taXNlO1xyXG4gICAgICAgIHRoaXMucGF1c2VWaWRlbygpO1xyXG4gICAgICAgIHRoaXMub25TdG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmRlZCgpIHtcclxuICAgICAgICB0aGlzLm9uU3RvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUGxheSgpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1zdGF0dXNcIiwgXCJsb2FkZWQgcGxheWluZ1wiKTtcclxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgb25TdG9wKCkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXN0YXR1c1wiLCBcImxvYWRlZCBwYXVzZWRcIik7XHJcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB3YXRjaFJlc2l6ZSh2aWRlb1dpZHRoOiBudW1iZXIsIHZpZGVvSGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBhc3BlY3RSYXRpbyA9IHZpZGVvSGVpZ2h0IC8gdmlkZW9XaWR0aDtcclxuXHJcbiAgICAgICAgY29uc3QgdXBkYXRlU2l6ZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyV2lkdGggPSB0aGlzLmVsZW1lbnQuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyIS5zdHlsZS53aWR0aCA9IGAke2NvbnRhaW5lcldpZHRofXB4YDtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIhLnN0eWxlLmhlaWdodCA9IGAke2NvbnRhaW5lcldpZHRoICogYXNwZWN0UmF0aW99cHhgO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHVwZGF0ZVNpemUoKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJ2aWRlb3NpemVcIikpO1xyXG4gICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcInJlc2l6ZVwiKSk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4gdXBkYXRlU2l6ZSgpKTtcclxuXHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuZWxlbWVudCEuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBmbHVzaFF1ZXVlKCkge1xyXG4gICAgICAgIHRoaXMucXVldWUuZm9yRWFjaCgoY29tbWFuZCkgPT4gdGhpc1tjb21tYW5kXSgpKTtcclxuICAgICAgICB0aGlzLnF1ZXVlLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfcXVldWVUYXNrKGNvbW1hbmQ6IFRhc2spIHtcclxuICAgICAgICB0aGlzLnF1ZXVlLmFkZChjb21tYW5kKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9iaW5kVHJpZ2dlcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMucGxheVRyaWdnZXIpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5wbGF5VHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzUGxheWluZyA/IHRoaXMucGF1c2UoKSA6IHRoaXMucGxheSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfb2JzZXJ2ZUVsZW1lbnQoKSB7XHJcbiAgICAgICAgb2JzZXJ2ZShcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIsXHJcbiAgICAgICAgICAgIChpblZpZXcpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpblZpZXcgJiYgdGhpcy5jYW5BdXRvcGxheSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzUmVhZHkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocmVzaG9sZDogMC4yNSxcclxuICAgICAgICAgICAgICAgIHJvb3RNYXJnaW46IFwiLTUwcHhcIixcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZpZGVvO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cclxuaW1wb3J0IFZpZGVvIGZyb20gXCIuLi9WaWRlb1wiO1xyXG5cclxudHlwZSBTb3VyY2UgPSB7XHJcbiAgICBoZWlnaHQ/OiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICBtaW1lX3R5cGU6IHN0cmluZzsgLy8gXCJ2aWRlby9tcDRcIixcclxuICAgIHVybDogc3RyaW5nO1xyXG4gICAgd2lkdGg/OiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICBmb3JtYXQ/OiBzdHJpbmc7IC8vIFwibXA0XCIsXHJcbn07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEhUTUw1UGxheWVyIGV4dGVuZHMgSFRNTFZpZGVvRWxlbWVudCB7XHJcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcclxufVxyXG5cclxuY2xhc3MgSFRNTDVWaWRlbyBleHRlbmRzIFZpZGVvIHtcclxuICAgIHBsYXllciE6IEhUTUw1UGxheWVyO1xyXG5cclxuICAgIGNyZWF0ZVBsYXllcigpIHtcclxuICAgICAgICBpZiAodGhpcy5wbGF5ZXIpIHJldHVybjtcclxuICAgICAgICBsZXQgdmlkZW9Tb3VyY2VzOiBTb3VyY2VbXSA9IFtdO1xyXG4gICAgICAgIGxldCBzb3VyY2VzQXR0cjogYW55O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jb250YWluZXIuaGFzQXR0cmlidXRlKFwiZGF0YS1zb3VyY2VzXCIpKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZXNBdHRyID0gSlNPTi5wYXJzZSh0aGlzLmNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNvdXJjZXNcIikhKTtcclxuICAgICAgICAgICAgdmlkZW9Tb3VyY2VzID0gc291cmNlc0F0dHIuc291cmNlcztcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY29udGFpbmVyLmhhc0F0dHJpYnV0ZShcImRhdGEtdXJsXCIpKSB7XHJcbiAgICAgICAgICAgIHZpZGVvU291cmNlcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIG1pbWVfdHlwZTogXCJ2aWRlby9tcDRcIixcclxuICAgICAgICAgICAgICAgIHVybDogdGhpcy5jb250YWluZXIuZ2V0QXR0cmlidXRlKFwiZGF0YS11cmxcIiksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8dmlkZW8gbXV0ZWQgcGxheXNpbmxpbmUgbG9vcCBjb250cm9scyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+XHJcbiAgICAgICAgICAgICAgICAke3ZpZGVvU291cmNlcy5yZWR1Y2UoKGFjYywgY3VycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxyXG4gICAgICAgICAgICAgICAgICAgIGFjYyArPSBgPHNvdXJjZSBzcmM9XCIke2N1cnIudXJsfVwiIHR5cGU9XCIke2N1cnIubWltZV90eXBlfVwiPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgICAgICAgICAgIH0sIFwiXCIpfVxyXG4gICAgICAgICAgICA8L3ZpZGVvPlxyXG4gICAgICAgIGA7XHJcbiAgICAgICAgY29uc3QgcGxheWVyID0gdGhpcy5jb250YWluZXIuZmlyc3RFbGVtZW50Q2hpbGQgYXMgSFRNTDVQbGF5ZXI7XHJcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxyXG4gICAgICAgIHBsYXllci5lbGVtZW50ID0gdGhpcy5jb250YWluZXIuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcblxyXG4gICAgICAgIHBsYXllci5hZGRFdmVudExpc3RlbmVyKFwiY2FucGxheVwiLCAoKSA9PiB0aGlzLl9vblJlYWR5KHBsYXllcikpO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudExpc3RlbmVyKFwiZW5kZWRcIiwgKCkgPT4gdGhpcy5vbkVuZGVkKCkpO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudExpc3RlbmVyKFwicGxheVwiLCAoKSA9PiB0aGlzLm9uUGxheSgpKTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcihcInBhdXNlXCIsICgpID0+IHRoaXMucGF1c2UoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheVZpZGVvKCkge1xyXG4gICAgICAgIHRoaXMucGxheWVyLnBsYXkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwYXVzZVZpZGVvKCkge1xyXG4gICAgICAgIHRoaXMucGxheWVyLnBhdXNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX29uUmVhZHkocGxheWVyOiBIVE1MNVBsYXllcikge1xyXG4gICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xyXG5cclxuICAgICAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xyXG5cclxuICAgICAgICBjb25zdCB7IHZpZGVvV2lkdGgsIHZpZGVvSGVpZ2h0IH0gPSB0aGlzLnBsYXllcjtcclxuICAgICAgICB0aGlzLndhdGNoUmVzaXplKHZpZGVvV2lkdGgsIHZpZGVvSGVpZ2h0KTtcclxuXHJcbiAgICAgICAgXCJyZXF1ZXN0SWRsZUNhbGxiYWNrXCIgaW4gd2luZG93XHJcbiAgICAgICAgICAgID8gLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgIHJlcXVlc3RJZGxlQ2FsbGJhY2soKCkgPT4gdGhpcy5mbHVzaFF1ZXVlKCkpXHJcbiAgICAgICAgICAgIDogdGhpcy5mbHVzaFF1ZXVlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhUTUw1VmlkZW87XHJcbiIsInR5cGUgT2JzZXJ2ZXJJbnN0YW5jZUNhbGxiYWNrID0gKGluVmlldzogYm9vbGVhbiwgaW50ZXJzZWN0aW9uOiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5KSA9PiB2b2lkO1xyXG5cclxudHlwZSBPYnNlcnZlckluc3RhbmNlID0ge1xyXG4gICAgaW5WaWV3OiBib29sZWFuO1xyXG4gICAgcmVhZG9ubHkgY2FsbGJhY2s6IE9ic2VydmVySW5zdGFuY2VDYWxsYmFjaztcclxuICAgIHJlYWRvbmx5IGVsZW1lbnQ6IEVsZW1lbnQ7XHJcbiAgICByZWFkb25seSBvYnNlcnZlcklkOiBzdHJpbmc7XHJcbiAgICByZWFkb25seSBvYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXI7XHJcbiAgICByZWFkb25seSB0aHJlc2hvbGRzOiBSZWFkb25seUFycmF5PG51bWJlcj47XHJcbn07XHJcblxyXG5jb25zdCBJTlNUQU5DRV9NQVA6IE1hcDxFbGVtZW50LCBPYnNlcnZlckluc3RhbmNlPiA9IG5ldyBNYXAoKTtcclxuY29uc3QgT0JTRVJWRVJfTUFQOiBNYXA8c3RyaW5nLCBJbnRlcnNlY3Rpb25PYnNlcnZlcj4gPSBuZXcgTWFwKCk7XHJcbmNvbnN0IFJPT1RfSURTOiBNYXA8RWxlbWVudCwgc3RyaW5nPiA9IG5ldyBNYXAoKTtcclxuXHJcbmxldCBjb25zZWN1dGl2ZVJvb3RJZCA9IDA7XHJcblxyXG4vKipcclxuICogR2VuZXJhdGUgYSB1bmlxdWUgSUQgZm9yIHRoZSByb290IGVsZW1lbnRcclxuICogQHBhcmFtIHJvb3RcclxuICovXHJcbmZ1bmN0aW9uIGdldFJvb3RJZChyb290PzogRWxlbWVudCB8IG51bGwpIHtcclxuICAgIGlmICghcm9vdCkgcmV0dXJuIFwiXCI7XHJcbiAgICBpZiAoUk9PVF9JRFMuaGFzKHJvb3QpKSByZXR1cm4gUk9PVF9JRFMuZ2V0KHJvb3QpO1xyXG4gICAgY29uc2VjdXRpdmVSb290SWQgKz0gMTtcclxuICAgIFJPT1RfSURTLnNldChyb290LCBjb25zZWN1dGl2ZVJvb3RJZC50b1N0cmluZygpKTtcclxuICAgIHJldHVybiBgJHtST09UX0lEUy5nZXQocm9vdCl9X2A7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNb25pdG9yIGVsZW1lbnQsIGFuZCB0cmlnZ2VyIGNhbGxiYWNrIHdoZW4gZWxlbWVudCBiZWNvbWVzIGluVmlld1xyXG4gKiBAcGFyYW0gZWxlbWVudCB7SFRNTEVsZW1lbnR9XHJcbiAqIEBwYXJhbSBjYWxsYmFjayB7RnVuY3Rpb259IENhbGxlZCB3aXRoIGluVmlld1xyXG4gKiBAcGFyYW0gb3B0aW9ucyB7T2JqZWN0fSBJbnRlclNlY3Rpb24gb2JzZXJ2ZXIgb3B0aW9uc1xyXG4gKiBAcGFyYW0gb3B0aW9ucy50aHJlc2hvbGQge051bWJlcn0gTnVtYmVyIGJldHdlZW4gMCBhbmQgMSwgaW5kaWNhdGluZyBob3cgbXVjaCBvZiB0aGUgZWxlbWVudCBzaG91bGQgYmUgaW5WaWV3IGJlZm9yZSB0cmlnZ2VyaW5nXHJcbiAqIEBwYXJhbSBvcHRpb25zLnJvb3Qge0hUTUxFbGVtZW50fVxyXG4gKiBAcGFyYW0gb3B0aW9ucy5yb290TWFyZ2luIHtTdHJpbmd9IFRoZSBDU1MgbWFyZ2luIHRvIGFwcGx5IHRvIHRoZSByb290IGVsZW1lbnQuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtPYnNlcnZlckluc3RhbmNlIHwgdW5kZWZpbmVkfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG9ic2VydmUoXHJcbiAgICBlbGVtZW50OiBFbGVtZW50LFxyXG4gICAgY2FsbGJhY2s6IE9ic2VydmVySW5zdGFuY2VDYWxsYmFjayxcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxyXG4gICAgb3B0aW9uczogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0ID0ge31cclxuKSB7XHJcbiAgICAvLyBJbnRlcnNlY3Rpb25PYnNlcnZlciBuZWVkcyBhIHRocmVzaG9sZCB0byB0cmlnZ2VyLCBzbyBzZXQgaXQgdG8gMCBpZiBpdCdzIG5vdCBkZWZpbmVkLlxyXG4gICAgLy8gTW9kaWZ5IHRoZSBvcHRpb25zIG9iamVjdCwgc2luY2UgaXQncyB1c2VkIGluIHRoZSBvbkNoYW5nZSBoYW5kbGVyLlxyXG4gICAgY29uc3QgeyByb290LCByb290TWFyZ2luLCB0aHJlc2hvbGQgPSAwIH0gPSBvcHRpb25zO1xyXG5cclxuICAgIC8vIEJhaWwgZWFybHkgaWYgZWxlbWVudCBpcyB1bmRlZmluZWRcclxuICAgIGlmICghZWxlbWVudCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIENyZWF0ZSBhIHVuaXF1ZSBJRCBmb3IgdGhpcyBvYnNlcnZlciBpbnN0YW5jZSwgYmFzZWQgb24gdGhlIHJvb3QsIHJvb3QgbWFyZ2luIGFuZCB0aHJlc2hvbGQuXHJcbiAgICAvLyBBbiBvYnNlcnZlciB3aXRoIHRoZSBzYW1lIG9wdGlvbnMgY2FuIGJlIHJldXNlZCwgc28gbGV0cyB1c2UgdGhpcyBmYWN0XHJcbiAgICBjb25zdCBvYnNlcnZlcklkOiBzdHJpbmcgPVxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBnZXRSb290SWQocm9vdCkgK1xyXG4gICAgICAgIChyb290TWFyZ2luID8gYCR7dGhyZXNob2xkLnRvU3RyaW5nKCl9XyR7cm9vdE1hcmdpbn1gIDogdGhyZXNob2xkLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgIGxldCBvYnNlcnZlckluc3RhbmNlID0gT0JTRVJWRVJfTUFQLmdldChvYnNlcnZlcklkKTtcclxuICAgIGlmICghb2JzZXJ2ZXJJbnN0YW5jZSkge1xyXG4gICAgICAgIG9ic2VydmVySW5zdGFuY2UgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIob25DaGFuZ2UsIG9wdGlvbnMpO1xyXG4gICAgICAgIGlmIChvYnNlcnZlcklkKSBPQlNFUlZFUl9NQVAuc2V0KG9ic2VydmVySWQsIG9ic2VydmVySW5zdGFuY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGluc3RhbmNlOiBPYnNlcnZlckluc3RhbmNlID0ge1xyXG4gICAgICAgIGNhbGxiYWNrLFxyXG4gICAgICAgIGVsZW1lbnQsXHJcbiAgICAgICAgaW5WaWV3OiBmYWxzZSxcclxuICAgICAgICBvYnNlcnZlcklkLFxyXG4gICAgICAgIG9ic2VydmVyOiBvYnNlcnZlckluc3RhbmNlLFxyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBoYXZlIHRoZSB0aHJlc2hvbGRzIHZhbHVlLiBJdCdzIHVuZGVmaW5lZCBvbiBhIGJyb3dzZXIgbGlrZSBDaHJvbWUgNTEuXHJcbiAgICAgICAgdGhyZXNob2xkczpcclxuICAgICAgICAgICAgb2JzZXJ2ZXJJbnN0YW5jZS50aHJlc2hvbGRzIHx8IChBcnJheS5pc0FycmF5KHRocmVzaG9sZCkgPyB0aHJlc2hvbGQgOiBbdGhyZXNob2xkXSksXHJcbiAgICB9O1xyXG5cclxuICAgIElOU1RBTkNFX01BUC5zZXQoZWxlbWVudCwgaW5zdGFuY2UpO1xyXG4gICAgb2JzZXJ2ZXJJbnN0YW5jZS5vYnNlcnZlKGVsZW1lbnQpO1xyXG5cclxuICAgIHJldHVybiBpbnN0YW5jZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFN0b3Agb2JzZXJ2aW5nIGFuIGVsZW1lbnQuIElmIGFuIGVsZW1lbnQgaXMgcmVtb3ZlZCBmcm9tIHRoZSBET00gb3Igb3RoZXJ3aXNlIGRlc3Ryb3llZCxcclxuICogbWFrZSBzdXJlIHRvIGNhbGwgdGhpcyBtZXRob2QuXHJcbiAqIEBwYXJhbSBlbGVtZW50IHtFbGVtZW50fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHVub2JzZXJ2ZShlbGVtZW50OiBFbGVtZW50IHwgbnVsbCkge1xyXG4gICAgaWYgKCFlbGVtZW50KSByZXR1cm47XHJcbiAgICBjb25zdCBpbnN0YW5jZSA9IElOU1RBTkNFX01BUC5nZXQoZWxlbWVudCk7XHJcblxyXG4gICAgaWYgKGluc3RhbmNlKSB7XHJcbiAgICAgICAgY29uc3QgeyBvYnNlcnZlcklkLCBvYnNlcnZlciB9ID0gaW5zdGFuY2U7XHJcbiAgICAgICAgY29uc3QgeyByb290IH0gPSBvYnNlcnZlcjtcclxuXHJcbiAgICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiB3ZSBhcmUgc3RpbGwgb2JzZXJ2aW5nIGFueSBlbGVtZW50cyB3aXRoIHRoZSBzYW1lIHRocmVzaG9sZC5cclxuICAgICAgICBsZXQgaXRlbXNMZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgd2Ugc3RpbGwgaGF2ZSBvYnNlcnZlcnMgY29uZmlndXJlZCB3aXRoIHRoZSBzYW1lIHJvb3QuXHJcbiAgICAgICAgbGV0IHJvb3RPYnNlcnZlZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChvYnNlcnZlcklkKSB7XHJcbiAgICAgICAgICAgIElOU1RBTkNFX01BUC5mb3JFYWNoKChpdGVtLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgIT09IGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5vYnNlcnZlcklkID09PSBvYnNlcnZlcklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zTGVmdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb3RPYnNlcnZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLm9ic2VydmVyLnJvb3QgPT09IHJvb3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9vdE9ic2VydmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgaWYgKCFyb290T2JzZXJ2ZWQgJiYgcm9vdCkgUk9PVF9JRFMuZGVsZXRlKHJvb3QpO1xyXG4gICAgICAgIGlmIChvYnNlcnZlciAmJiAhaXRlbXNMZWZ0KSB7XHJcbiAgICAgICAgICAgIC8vIE5vIG1vcmUgZWxlbWVudHMgdG8gb2JzZXJ2ZSBmb3IgdGhyZXNob2xkLCBkaXNjb25uZWN0IG9ic2VydmVyXHJcbiAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSByZWZlcmVuY2UgdG8gZWxlbWVudFxyXG4gICAgICAgIElOU1RBTkNFX01BUC5kZWxldGUoZWxlbWVudCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZXN0cm95IGFsbCBJbnRlcnNlY3Rpb25PYnNlcnZlcnMgY3VycmVudGx5IGNvbm5lY3RlZFxyXG4gKiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveSgpIHtcclxuICAgIE9CU0VSVkVSX01BUC5mb3JFYWNoKChvYnNlcnZlcikgPT4ge1xyXG4gICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIE9CU0VSVkVSX01BUC5jbGVhcigpO1xyXG4gICAgSU5TVEFOQ0VfTUFQLmNsZWFyKCk7XHJcbiAgICBST09UX0lEUy5jbGVhcigpO1xyXG4gICAgY29uc2VjdXRpdmVSb290SWQgPSAwO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvbkNoYW5nZShjaGFuZ2VzOiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5W10pIHtcclxuICAgIGNoYW5nZXMuZm9yRWFjaCgoaW50ZXJzZWN0aW9uKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBpc0ludGVyc2VjdGluZywgaW50ZXJzZWN0aW9uUmF0aW8sIHRhcmdldCB9ID0gaW50ZXJzZWN0aW9uO1xyXG4gICAgICAgIGNvbnN0IGluc3RhbmNlID0gSU5TVEFOQ0VfTUFQLmdldCh0YXJnZXQpO1xyXG5cclxuICAgICAgICAvLyBGaXJlZm94IGNhbiByZXBvcnQgYSBuZWdhdGl2ZSBpbnRlcnNlY3Rpb25SYXRpbyB3aGVuIHNjcm9sbGluZy5cclxuICAgICAgICBpZiAoaW5zdGFuY2UgJiYgaW50ZXJzZWN0aW9uUmF0aW8gPj0gMCkge1xyXG4gICAgICAgICAgICAvLyBJZiB0aHJlc2hvbGQgaXMgYW4gYXJyYXksIGNoZWNrIGlmIGFueSBvZiB0aGVtIGludGVyc2VjdHMuIFRoaXMganVzdCB0cmlnZ2VycyB0aGUgb25DaGFuZ2UgZXZlbnQgbXVsdGlwbGUgdGltZXMuXHJcbiAgICAgICAgICAgIGxldCBpblZpZXcgPSBpbnN0YW5jZS50aHJlc2hvbGRzLnNvbWUoKHRocmVzaG9sZCkgPT5cclxuICAgICAgICAgICAgICAgIGluc3RhbmNlLmluVmlldyA/IGludGVyc2VjdGlvblJhdGlvID4gdGhyZXNob2xkIDogaW50ZXJzZWN0aW9uUmF0aW8gPj0gdGhyZXNob2xkXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNJbnRlcnNlY3RpbmcgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgaXNJbnRlcnNlY3RpbmcgaXMgZGVmaW5lZCwgZW5zdXJlIHRoYXQgdGhlIGVsZW1lbnQgaXMgYWN0dWFsbHkgaW50ZXJzZWN0aW5nLlxyXG4gICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGl0IHJlcG9ydHMgYSB0aHJlc2hvbGQgb2YgMFxyXG4gICAgICAgICAgICAgICAgaW5WaWV3ID0gaW5WaWV3ICYmIGlzSW50ZXJzZWN0aW5nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbnN0YW5jZS5pblZpZXcgPSBpblZpZXc7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLmNhbGxiYWNrKGluVmlldywgaW50ZXJzZWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgb2JzZXJ2ZSxcclxuICAgIHVub2JzZXJ2ZSxcclxuICAgIGRlc3Ryb3ksXHJcbn07XHJcbiJdLCJuYW1lcyI6WyJnZXQiLCJvYnNlcnZlIiwiVmlkZW8iLCJjb25zdHJ1Y3RvciIsImVsZW1lbnQiLCJjb250YWluZXIiLCJpZCIsInNldHRpbmdzIiwiY2FuQXV0b3BsYXkiLCJjYW5IYXZlU291bmQiLCJpc011dGVkIiwiaXNQbGF5aW5nIiwiaXNSZWFkeSIsInBsYXlUcmlnZ2VyIiwicXVldWUiLCJwbGF5ZXIiLCJwbGF5UHJvbWlzZSIsImdldEF0dHJpYnV0ZSIsImluY2x1ZGVzIiwidGVzdCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInBsYXRmb3JtIiwibWF4VG91Y2hQb2ludHMiLCJ3aW5kb3ciLCJNU1N0cmVhbSIsInF1ZXJ5U2VsZWN0b3IiLCJTZXQiLCJjcmVhdGVQbGF5ZXIiLCJfYmluZFRyaWdnZXIiLCJfb2JzZXJ2ZUVsZW1lbnQiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJwbGF5IiwiX3F1ZXVlVGFzayIsIlByb21pc2UiLCJyZXNvbHZlIiwicGxheVZpZGVvIiwicGF1c2UiLCJwYXVzZVZpZGVvIiwib25TdG9wIiwib25FbmRlZCIsIm9uUGxheSIsInNldEF0dHJpYnV0ZSIsIndhdGNoUmVzaXplIiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0IiwiYXNwZWN0UmF0aW8iLCJ1cGRhdGVTaXplIiwiY29udGFpbmVyV2lkdGgiLCJjbGllbnRXaWR0aCIsInN0eWxlIiwid2lkdGgiLCJoZWlnaHQiLCJhZGRFdmVudExpc3RlbmVyIiwiZmx1c2hRdWV1ZSIsImZvckVhY2giLCJjb21tYW5kIiwiY2xlYXIiLCJhZGQiLCJpblZpZXciLCJ0aHJlc2hvbGQiLCJyb290TWFyZ2luIiwiSFRNTDVWaWRlbyIsInZpZGVvU291cmNlcyIsInNvdXJjZXNBdHRyIiwiaGFzQXR0cmlidXRlIiwiSlNPTiIsInBhcnNlIiwic291cmNlcyIsInB1c2giLCJtaW1lX3R5cGUiLCJ1cmwiLCJpbm5lckhUTUwiLCJyZWR1Y2UiLCJhY2MiLCJjdXJyIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJfb25SZWFkeSIsInJlcXVlc3RJZGxlQ2FsbGJhY2siLCJJTlNUQU5DRV9NQVAiLCJNYXAiLCJPQlNFUlZFUl9NQVAiLCJST09UX0lEUyIsImNvbnNlY3V0aXZlUm9vdElkIiwiZ2V0Um9vdElkIiwicm9vdCIsImhhcyIsInNldCIsInRvU3RyaW5nIiwiY2FsbGJhY2siLCJvcHRpb25zIiwib2JzZXJ2ZXJJZCIsIm9ic2VydmVySW5zdGFuY2UiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsIm9uQ2hhbmdlIiwiaW5zdGFuY2UiLCJvYnNlcnZlciIsInRocmVzaG9sZHMiLCJBcnJheSIsImlzQXJyYXkiLCJ1bm9ic2VydmUiLCJpdGVtc0xlZnQiLCJyb290T2JzZXJ2ZWQiLCJpdGVtIiwia2V5IiwiZGVsZXRlIiwiZGlzY29ubmVjdCIsImRlc3Ryb3kiLCJjaGFuZ2VzIiwiaW50ZXJzZWN0aW9uIiwiaXNJbnRlcnNlY3RpbmciLCJpbnRlcnNlY3Rpb25SYXRpbyIsInRhcmdldCIsInNvbWUiLCJ1bmRlZmluZWQiXSwic291cmNlUm9vdCI6IiJ9