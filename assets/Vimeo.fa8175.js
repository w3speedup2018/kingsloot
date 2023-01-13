"use strict";(self.webpackChunkjuno_shopify_template=self.webpackChunkjuno_shopify_template||[]).push([[637],{3639:(e,t,n)=>{n.d(t,{Z:()=>l});var r=n(8883);const i=new Map,o=new Map,a=new Map;let s=0;function u(e,t,n={}){const{root:r,rootMargin:u,threshold:l=0}=n;if(!e)return;const d=function(e){return e?a.has(e)?a.get(e):(s+=1,a.set(e,s.toString()),`${a.get(e)}_`):""}(r)+(u?`${l.toString()}_${u}`:l.toString());let f=o.get(d);f||(f=new IntersectionObserver(c,n),d&&o.set(d,f));const h={callback:t,element:e,inView:!1,observerId:d,observer:f,thresholds:f.thresholds||(Array.isArray(l)?l:[l])};return i.set(e,h),f.observe(e),h}function c(e){e.forEach((e=>{const{isIntersecting:t,intersectionRatio:n,target:r}=e,o=i.get(r);if(o&&n>=0){let r=o.thresholds.some((e=>o.inView?n>e:n>=e));void 0!==t&&(r=r&&t),o.inView=r,o.callback(r,e)}}))}const l=class{constructor(e){this.element=void 0,this.container=void 0,this.id=void 0,this.settings=void 0,this.canAutoplay=void 0,this.canHaveSound=void 0,this.isMuted=void 0,this.isPlaying=void 0,this.isReady=void 0,this.playTrigger=void 0,this.queue=void 0,this.player=void 0,this.playPromise=void 0,this.element=e,this.settings=this.element.getAttribute("data-settings"),this.canAutoplay=this.settings.includes("autoplay"),this.canHaveSound=!((/iPad|iPhone|iPod/.test(navigator.userAgent)||"MacIntel"===navigator.platform&&navigator.maxTouchPoints>1)&&!window.MSStream),this.container=(0,r.U2)(".js-video-container",e),this.id=e.getAttribute("data-id")||"",this.isMuted=this.settings.includes("muted"),this.isPlaying=!1,this.isReady=!1,this.playTrigger=e.querySelector(".js-video-trigger"),this.queue=new Set,this.createPlayer(),this._bindTrigger(),this._observeElement(),e.dispatchEvent(new CustomEvent("videoloaded"))}play(){if(!this.isPlaying)return this.isReady?void(this.playPromise=Promise.resolve(this.playVideo())):(this.createPlayer(),void this._queueTask("play"))}async pause(){this.isPlaying&&(this.isReady&&void 0!==this.playPromise?(await this.playPromise,this.pauseVideo(),this.onStop()):this._queueTask("pause"))}onEnded(){this.onStop()}onPlay(){this.element.setAttribute("data-status","loaded playing"),this.isPlaying=!0}onStop(){this.element.setAttribute("data-status","loaded paused"),this.isPlaying=!1}watchResize(e,t){const n=t/e,r=()=>{const e=this.element.clientWidth;this.container.style.width=`${e}px`,this.container.style.height=e*n+"px"};r(),this.element.dispatchEvent(new CustomEvent("videosize")),window.dispatchEvent(new CustomEvent("resize")),window.addEventListener("resize",(()=>r())),this.player.element.setAttribute("tabindex","-1")}flushQueue(){this.queue.forEach((e=>this[e]())),this.queue.clear()}_queueTask(e){this.queue.add(e)}_bindTrigger(){this.playTrigger&&this.playTrigger.addEventListener("click",(()=>{this.isPlaying?this.pause():this.play()}))}_observeElement(){u(this.container,(e=>{e&&this.canAutoplay?this.play():this.isReady&&this.pause()}),{threshold:.25,rootMargin:"-50px"})}}},4078:(e,t,n)=>{
/*! @vimeo/player v2.17.1 | (c) 2022 Vimeo | MIT License | https://github.com/vimeo/player.js */
function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.r(t),n.d(t,{default:()=>O});var o=void 0!==n.g&&"[object global]"==={}.toString.call(n.g);function a(e,t){return 0===e.indexOf(t.toLowerCase())?e:"".concat(t.toLowerCase()).concat(e.substr(0,1).toUpperCase()).concat(e.substr(1))}function s(e){return Boolean(e&&1===e.nodeType&&"nodeName"in e&&e.ownerDocument&&e.ownerDocument.defaultView)}function u(e){return!isNaN(parseFloat(e))&&isFinite(e)&&Math.floor(e)==e}function c(e){return/^(https?:)?\/\/((player|www)\.)?vimeo\.com(?=$|\/)/.test(e)}function l(e){return/^https:\/\/player\.vimeo\.com\/video\/\d+/.test(e)}function d(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.id,n=e.url,r=t||n;if(!r)throw new Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.");if(u(r))return"https://vimeo.com/".concat(r);if(c(r))return r.replace("http:","https:");if(t)throw new TypeError("“".concat(t,"” is not a valid video id."));throw new TypeError("“".concat(r,"” is not a vimeo.com url."))}var f=void 0!==Array.prototype.indexOf,h="undefined"!=typeof window&&void 0!==window.postMessage;if(!(o||f&&h))throw new Error("Sorry, the Vimeo Player API is not available in this browser.");var v="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==n.g?n.g:"undefined"!=typeof self?self:{};
/*!
 * weakmap-polyfill v2.0.4 - ECMAScript6 WeakMap polyfill
 * https://github.com/polygonplanet/weakmap-polyfill
 * Copyright (c) 2015-2021 polygonplanet <polygon.planet.aqua@gmail.com>
 * @license MIT
 */
!function(e){if(!e.WeakMap){var t=Object.prototype.hasOwnProperty,n=Object.defineProperty&&function(){try{return 1===Object.defineProperty({},"x",{value:1}).x}catch(e){}}(),r=function(e,t,r){n?Object.defineProperty(e,t,{configurable:!0,writable:!0,value:r}):e[t]=r};e.WeakMap=function(){function e(){if(void 0===this)throw new TypeError("Constructor WeakMap requires 'new'");if(r(this,"_id",o("_WeakMap")),arguments.length>0)throw new TypeError("WeakMap iterable is not supported")}function n(e,n){if(!i(e)||!t.call(e,"_id"))throw new TypeError(n+" method called on incompatible receiver "+typeof e)}function o(e){return e+"_"+a()+"."+a()}function a(){return Math.random().toString().substring(2)}return r(e.prototype,"delete",(function(e){if(n(this,"delete"),!i(e))return!1;var t=e[this._id];return!(!t||t[0]!==e)&&(delete e[this._id],!0)})),r(e.prototype,"get",(function(e){if(n(this,"get"),i(e)){var t=e[this._id];return t&&t[0]===e?t[1]:void 0}})),r(e.prototype,"has",(function(e){if(n(this,"has"),!i(e))return!1;var t=e[this._id];return!(!t||t[0]!==e)})),r(e.prototype,"set",(function(e,t){if(n(this,"set"),!i(e))throw new TypeError("Invalid value used as weak map key");var o=e[this._id];return o&&o[0]===e?(o[1]=t,this):(r(e,this._id,[e,t]),this)})),r(e,"_polyfill",!0),e}()}function i(e){return Object(e)===e}}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:v);var p=function(e,t){return e(t={exports:{}},t.exports),t.exports}((function(e){
/*! Native Promise Only
    v0.8.1 (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
!function(t,n,r){n[t]=n[t]||r(),e.exports&&(e.exports=n[t])}("Promise",v,(function(){var e,t,n,r=Object.prototype.toString,i="undefined"!=typeof setImmediate?function(e){return setImmediate(e)}:setTimeout;try{Object.defineProperty({},"x",{}),e=function(e,t,n,r){return Object.defineProperty(e,t,{value:n,writable:!0,configurable:!1!==r})}}catch(t){e=function(e,t,n){return e[t]=n,e}}function o(e,r){n.add(e,r),t||(t=i(n.drain))}function a(e){var t,n=typeof e;return null==e||"object"!=n&&"function"!=n||(t=e.then),"function"==typeof t&&t}function s(){for(var e=0;e<this.chain.length;e++)u(this,1===this.state?this.chain[e].success:this.chain[e].failure,this.chain[e]);this.chain.length=0}function u(e,t,n){var r,i;try{!1===t?n.reject(e.msg):(r=!0===t?e.msg:t.call(void 0,e.msg))===n.promise?n.reject(TypeError("Promise-chain cycle")):(i=a(r))?i.call(r,n.resolve,n.reject):n.resolve(r)}catch(e){n.reject(e)}}function c(e){var t,n=this;if(!n.triggered){n.triggered=!0,n.def&&(n=n.def);try{(t=a(e))?o((function(){var r=new f(n);try{t.call(e,(function(){c.apply(r,arguments)}),(function(){l.apply(r,arguments)}))}catch(e){l.call(r,e)}})):(n.msg=e,n.state=1,n.chain.length>0&&o(s,n))}catch(e){l.call(new f(n),e)}}}function l(e){var t=this;t.triggered||(t.triggered=!0,t.def&&(t=t.def),t.msg=e,t.state=2,t.chain.length>0&&o(s,t))}function d(e,t,n,r){for(var i=0;i<t.length;i++)!function(i){e.resolve(t[i]).then((function(e){n(i,e)}),r)}(i)}function f(e){this.def=e,this.triggered=!1}function h(e){this.promise=e,this.state=0,this.triggered=!1,this.chain=[],this.msg=void 0}function v(e){if("function"!=typeof e)throw TypeError("Not a function");if(0!==this.__NPO__)throw TypeError("Not a promise");this.__NPO__=1;var t=new h(this);this.then=function(e,n){var r={success:"function"!=typeof e||e,failure:"function"==typeof n&&n};return r.promise=new this.constructor((function(e,t){if("function"!=typeof e||"function"!=typeof t)throw TypeError("Not a function");r.resolve=e,r.reject=t})),t.chain.push(r),0!==t.state&&o(s,t),r.promise},this.catch=function(e){return this.then(void 0,e)};try{e.call(void 0,(function(e){c.call(t,e)}),(function(e){l.call(t,e)}))}catch(e){l.call(t,e)}}n=function(){var e,n,r;function i(e,t){this.fn=e,this.self=t,this.next=void 0}return{add:function(t,o){r=new i(t,o),n?n.next=r:e=r,n=r,r=void 0},drain:function(){var r=e;for(e=n=t=void 0;r;)r.fn.call(r.self),r=r.next}}}();var p=e({},"constructor",v,!1);return v.prototype=p,e(p,"__NPO__",0,!1),e(v,"resolve",(function(e){return e&&"object"==typeof e&&1===e.__NPO__?e:new this((function(t,n){if("function"!=typeof t||"function"!=typeof n)throw TypeError("Not a function");t(e)}))})),e(v,"reject",(function(e){return new this((function(t,n){if("function"!=typeof t||"function"!=typeof n)throw TypeError("Not a function");n(e)}))})),e(v,"all",(function(e){var t=this;return"[object Array]"!=r.call(e)?t.reject(TypeError("Not an array")):0===e.length?t.resolve([]):new t((function(n,r){if("function"!=typeof n||"function"!=typeof r)throw TypeError("Not a function");var i=e.length,o=Array(i),a=0;d(t,e,(function(e,t){o[e]=t,++a===i&&n(o)}),r)}))})),e(v,"race",(function(e){var t=this;return"[object Array]"!=r.call(e)?t.reject(TypeError("Not an array")):new t((function(n,r){if("function"!=typeof n||"function"!=typeof r)throw TypeError("Not a function");d(t,e,(function(e,t){n(t)}),r)}))})),v}))})),m=new WeakMap;function y(e,t,n){var r=m.get(e.element)||{};t in r||(r[t]=[]),r[t].push(n),m.set(e.element,r)}function g(e,t){return(m.get(e.element)||{})[t]||[]}function w(e,t,n){var r=m.get(e.element)||{};if(!r[t])return!0;if(!n)return r[t]=[],m.set(e.element,r),!0;var i=r[t].indexOf(n);return-1!==i&&r[t].splice(i,1),m.set(e.element,r),r[t]&&0===r[t].length}function b(e,t){var n=m.get(e);m.set(t,n),m.delete(e)}function k(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){return console.warn(e),{}}return e}function E(e,t,n){if(e.element.contentWindow&&e.element.contentWindow.postMessage){var r={method:t};void 0!==n&&(r.value=n);var i=parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/,"$1"));i>=8&&i<10&&(r=JSON.stringify(r)),e.element.contentWindow.postMessage(r,e.origin)}}function P(e,t){var n,r=[];if((t=k(t)).event){if("error"===t.event)g(e,t.data.method).forEach((function(n){var r=new Error(t.data.message);r.name=t.data.name,n.reject(r),w(e,t.data.method,n)}));r=g(e,"event:".concat(t.event)),n=t.data}else if(t.method){var i=function(e,t){var n=g(e,t);if(n.length<1)return!1;var r=n.shift();return w(e,t,r),r}(e,t.method);i&&(r.push(i),n=t.value)}r.forEach((function(t){try{if("function"==typeof t)return void t.call(e,n);t.resolve(n)}catch(e){}}))}var T=["autopause","autoplay","background","byline","color","controls","dnt","height","id","interactive_params","keyboard","loop","maxheight","maxwidth","muted","playsinline","portrait","responsive","speed","texttrack","title","transparent","url","width"];function _(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return T.reduce((function(t,n){var r=e.getAttribute("data-vimeo-".concat(n));return(r||""===r)&&(t[n]=""===r?1:r),t}),t)}function M(e,t){var n=e.html;if(!t)throw new TypeError("An element must be provided");if(null!==t.getAttribute("data-vimeo-initialized"))return t.querySelector("iframe");var r=document.createElement("div");return r.innerHTML=n,t.appendChild(r.firstChild),t.setAttribute("data-vimeo-initialized","true"),t.querySelector("iframe")}function x(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0;return new Promise((function(r,i){if(!c(e))throw new TypeError("“".concat(e,"” is not a vimeo.com url."));var o="https://vimeo.com/api/oembed.json?url=".concat(encodeURIComponent(e));for(var a in t)t.hasOwnProperty(a)&&(o+="&".concat(a,"=").concat(encodeURIComponent(t[a])));var s="XDomainRequest"in window?new XDomainRequest:new XMLHttpRequest;s.open("GET",o,!0),s.onload=function(){if(404!==s.status)if(403!==s.status)try{var t=JSON.parse(s.responseText);if(403===t.domain_status_code)return M(t,n),void i(new Error("“".concat(e,"” is not embeddable.")));r(t)}catch(e){i(e)}else i(new Error("“".concat(e,"” is not embeddable.")));else i(new Error("“".concat(e,"” was not found.")))},s.onerror=function(){var e=s.status?" (".concat(s.status,")"):"";i(new Error("There was an error fetching the embed code from Vimeo".concat(e,".")))},s.send()}))}var C=new WeakMap,A=new WeakMap,F={},N=function(){function e(t){var n=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(r(this,e),window.jQuery&&t instanceof jQuery&&(t.length>1&&window.console&&console.warn&&console.warn("A jQuery object with multiple elements was passed, using the first element."),t=t[0]),"undefined"!=typeof document&&"string"==typeof t&&(t=document.getElementById(t)),!s(t))throw new TypeError("You must pass either a valid element or a valid id.");if("IFRAME"!==t.nodeName){var o=t.querySelector("iframe");o&&(t=o)}if("IFRAME"===t.nodeName&&!c(t.getAttribute("src")||""))throw new Error("The player element passed isn’t a Vimeo embed.");if(C.has(t))return C.get(t);this._window=t.ownerDocument.defaultView,this.element=t,this.origin="*";var a=new p((function(e,r){if(n._onMessage=function(t){if(c(t.origin)&&n.element.contentWindow===t.source){"*"===n.origin&&(n.origin=t.origin);var i=k(t.data);if(i&&"error"===i.event&&i.data&&"ready"===i.data.method){var o=new Error(i.data.message);return o.name=i.data.name,void r(o)}var a=i&&"ready"===i.event,s=i&&"ping"===i.method;if(a||s)return n.element.setAttribute("data-ready","true"),void e();P(n,i)}},n._window.addEventListener("message",n._onMessage),"IFRAME"!==n.element.nodeName){var o=_(t,i);x(d(o),o,t).then((function(e){var r=M(e,t);return n.element=r,n._originalElement=t,b(t,r),C.set(n.element,n),e})).catch(r)}}));if(A.set(this,a),C.set(this.element,this),"IFRAME"===this.element.nodeName&&E(this,"ping"),F.isEnabled){var u=function(){return F.exit()};this.fullscreenchangeHandler=function(){F.isFullscreen?y(n,"event:exitFullscreen",u):w(n,"event:exitFullscreen",u),n.ready().then((function(){E(n,"fullscreenchange",F.isFullscreen)}))},F.on("fullscreenchange",this.fullscreenchangeHandler)}return this}return function(e,t,n){t&&i(e.prototype,t),n&&i(e,n)}(e,[{key:"callMethod",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new p((function(r,i){return t.ready().then((function(){y(t,e,{resolve:r,reject:i}),E(t,e,n)})).catch(i)}))}},{key:"get",value:function(e){var t=this;return new p((function(n,r){return e=a(e,"get"),t.ready().then((function(){y(t,e,{resolve:n,reject:r}),E(t,e)})).catch(r)}))}},{key:"set",value:function(e,t){var n=this;return new p((function(r,i){if(e=a(e,"set"),null==t)throw new TypeError("There must be a value to set.");return n.ready().then((function(){y(n,e,{resolve:r,reject:i}),E(n,e,t)})).catch(i)}))}},{key:"on",value:function(e,t){if(!e)throw new TypeError("You must pass an event name.");if(!t)throw new TypeError("You must pass a callback function.");if("function"!=typeof t)throw new TypeError("The callback must be a function.");0===g(this,"event:".concat(e)).length&&this.callMethod("addEventListener",e).catch((function(){})),y(this,"event:".concat(e),t)}},{key:"off",value:function(e,t){if(!e)throw new TypeError("You must pass an event name.");if(t&&"function"!=typeof t)throw new TypeError("The callback must be a function.");w(this,"event:".concat(e),t)&&this.callMethod("removeEventListener",e).catch((function(e){}))}},{key:"loadVideo",value:function(e){return this.callMethod("loadVideo",e)}},{key:"ready",value:function(){var e=A.get(this)||new p((function(e,t){t(new Error("Unknown player. Probably unloaded."))}));return p.resolve(e)}},{key:"addCuePoint",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.callMethod("addCuePoint",{time:e,data:t})}},{key:"removeCuePoint",value:function(e){return this.callMethod("removeCuePoint",e)}},{key:"enableTextTrack",value:function(e,t){if(!e)throw new TypeError("You must pass a language.");return this.callMethod("enableTextTrack",{language:e,kind:t})}},{key:"disableTextTrack",value:function(){return this.callMethod("disableTextTrack")}},{key:"pause",value:function(){return this.callMethod("pause")}},{key:"play",value:function(){return this.callMethod("play")}},{key:"requestFullscreen",value:function(){return F.isEnabled?F.request(this.element):this.callMethod("requestFullscreen")}},{key:"exitFullscreen",value:function(){return F.isEnabled?F.exit():this.callMethod("exitFullscreen")}},{key:"getFullscreen",value:function(){return F.isEnabled?p.resolve(F.isFullscreen):this.get("fullscreen")}},{key:"requestPictureInPicture",value:function(){return this.callMethod("requestPictureInPicture")}},{key:"exitPictureInPicture",value:function(){return this.callMethod("exitPictureInPicture")}},{key:"getPictureInPicture",value:function(){return this.get("pictureInPicture")}},{key:"unload",value:function(){return this.callMethod("unload")}},{key:"destroy",value:function(){var e=this;return new p((function(t){if(A.delete(e),C.delete(e.element),e._originalElement&&(C.delete(e._originalElement),e._originalElement.removeAttribute("data-vimeo-initialized")),e.element&&"IFRAME"===e.element.nodeName&&e.element.parentNode&&(e.element.parentNode.parentNode&&e._originalElement&&e._originalElement!==e.element.parentNode?e.element.parentNode.parentNode.removeChild(e.element.parentNode):e.element.parentNode.removeChild(e.element)),e.element&&"DIV"===e.element.nodeName&&e.element.parentNode){e.element.removeAttribute("data-vimeo-initialized");var n=e.element.querySelector("iframe");n&&n.parentNode&&(n.parentNode.parentNode&&e._originalElement&&e._originalElement!==n.parentNode?n.parentNode.parentNode.removeChild(n.parentNode):n.parentNode.removeChild(n))}e._window.removeEventListener("message",e._onMessage),F.isEnabled&&F.off("fullscreenchange",e.fullscreenchangeHandler),t()}))}},{key:"getAutopause",value:function(){return this.get("autopause")}},{key:"setAutopause",value:function(e){return this.set("autopause",e)}},{key:"getBuffered",value:function(){return this.get("buffered")}},{key:"getCameraProps",value:function(){return this.get("cameraProps")}},{key:"setCameraProps",value:function(e){return this.set("cameraProps",e)}},{key:"getChapters",value:function(){return this.get("chapters")}},{key:"getCurrentChapter",value:function(){return this.get("currentChapter")}},{key:"getColor",value:function(){return this.get("color")}},{key:"setColor",value:function(e){return this.set("color",e)}},{key:"getCuePoints",value:function(){return this.get("cuePoints")}},{key:"getCurrentTime",value:function(){return this.get("currentTime")}},{key:"setCurrentTime",value:function(e){return this.set("currentTime",e)}},{key:"getDuration",value:function(){return this.get("duration")}},{key:"getEnded",value:function(){return this.get("ended")}},{key:"getLoop",value:function(){return this.get("loop")}},{key:"setLoop",value:function(e){return this.set("loop",e)}},{key:"setMuted",value:function(e){return this.set("muted",e)}},{key:"getMuted",value:function(){return this.get("muted")}},{key:"getPaused",value:function(){return this.get("paused")}},{key:"getPlaybackRate",value:function(){return this.get("playbackRate")}},{key:"setPlaybackRate",value:function(e){return this.set("playbackRate",e)}},{key:"getPlayed",value:function(){return this.get("played")}},{key:"getQualities",value:function(){return this.get("qualities")}},{key:"getQuality",value:function(){return this.get("quality")}},{key:"setQuality",value:function(e){return this.set("quality",e)}},{key:"getSeekable",value:function(){return this.get("seekable")}},{key:"getSeeking",value:function(){return this.get("seeking")}},{key:"getTextTracks",value:function(){return this.get("textTracks")}},{key:"getVideoEmbedCode",value:function(){return this.get("videoEmbedCode")}},{key:"getVideoId",value:function(){return this.get("videoId")}},{key:"getVideoTitle",value:function(){return this.get("videoTitle")}},{key:"getVideoWidth",value:function(){return this.get("videoWidth")}},{key:"getVideoHeight",value:function(){return this.get("videoHeight")}},{key:"getVideoUrl",value:function(){return this.get("videoUrl")}},{key:"getVolume",value:function(){return this.get("volume")}},{key:"setVolume",value:function(e){return this.set("volume",e)}}]),e}();o||(F=function(){var e=function(){for(var e,t=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],n=0,r=t.length,i={};n<r;n++)if((e=t[n])&&e[1]in document){for(n=0;n<e.length;n++)i[t[0][n]]=e[n];return i}return!1}(),t={fullscreenchange:e.fullscreenchange,fullscreenerror:e.fullscreenerror},n={request:function(t){return new Promise((function(r,i){var o=function e(){n.off("fullscreenchange",e),r()};n.on("fullscreenchange",o);var a=(t=t||document.documentElement)[e.requestFullscreen]();a instanceof Promise&&a.then(o).catch(i)}))},exit:function(){return new Promise((function(t,r){if(n.isFullscreen){var i=function e(){n.off("fullscreenchange",e),t()};n.on("fullscreenchange",i);var o=document[e.exitFullscreen]();o instanceof Promise&&o.then(i).catch(r)}else t()}))},on:function(e,n){var r=t[e];r&&document.addEventListener(r,n)},off:function(e,n){var r=t[e];r&&document.removeEventListener(r,n)}};return Object.defineProperties(n,{isFullscreen:{get:function(){return Boolean(document[e.fullscreenElement])}},element:{enumerable:!0,get:function(){return document[e.fullscreenElement]}},isEnabled:{enumerable:!0,get:function(){return Boolean(document[e.fullscreenEnabled])}}}),n}(),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document,t=[].slice.call(e.querySelectorAll("[data-vimeo-id], [data-vimeo-url]")),n=function(e){"console"in window&&console.error&&console.error("There was an error creating an embed: ".concat(e))};t.forEach((function(e){try{if(null!==e.getAttribute("data-vimeo-defer"))return;var t=_(e);x(d(t),t,e).then((function(t){return M(t,e)})).catch(n)}catch(e){n(e)}}))}(),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;if(!window.VimeoPlayerResizeEmbeds_){window.VimeoPlayerResizeEmbeds_=!0;var t=function(t){if(c(t.origin)&&t.data&&"spacechange"===t.data.event)for(var n=e.querySelectorAll("iframe"),r=0;r<n.length;r++)if(n[r].contentWindow===t.source){n[r].parentElement.style.paddingBottom="".concat(t.data.data[0].bottom,"px");break}};window.addEventListener("message",t)}}(),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;if(!window.VimeoSeoMetadataAppended){window.VimeoSeoMetadataAppended=!0;var t=function(t){if(c(t.origin)){var n=k(t.data);if(n&&"ready"===n.event)for(var r=e.querySelectorAll("iframe"),i=0;i<r.length;i++){var o=r[i],a=o.contentWindow===t.source;l(o.src)&&a&&new N(o).callMethod("appendVideoMetadata",window.location.href)}}};window.addEventListener("message",t)}}());const S=N,j="requestIdleCallback"in window?requestIdleCallback:setTimeout,q=(/iPad|iPhone|iPod/.test(navigator.userAgent)||"MacIntel"===navigator.platform&&navigator.maxTouchPoints>1)&&!window.MSStream;matchMedia("(hover: hover)").matches,window.innerWidth;var R=n(3742),V=n(3639);class I extends V.Z{constructor(...e){super(...e),this.firstBuffer=!0,this.player=void 0}static _warmConnections(){I.preconnected||((0,R.k)("preconnect","https://player.vimeo.com"),(0,R.k)("preconnect","https://i.vimeocdn.com"),(0,R.k)("preconnect","https://f.vimeocdn.com"),(0,R.k)("preconnect","https://fresnel.vimeocdn.com"),I.preconnected=!0)}createPlayer(){if(this.player)return;I._warmConnections();const e=this.container.getAttribute("data-url")||void 0,t=new S(this.container,{byline:!1,color:"ffffff",id:+this.id,url:e,loop:!0,muted:!0,portrait:!1,title:!1,controls:!1});t.on("ended",(()=>this.onEnded())),t.on("loaded",(()=>this._onReady(t))),t.on("pause",(()=>this.pause())),t.on("play",(()=>this.onPlay())),q&&t.on("bufferend",(()=>{this.firstBuffer&&(this.firstBuffer=!1,this.onPlay())}))}playVideo(){this.player.play()}pauseVideo(){this.player.pause()}async _onReady(e){this.player=e,this.isReady=!0;const[t,n]=await Promise.all([e.getVideoWidth(),e.getVideoHeight()]);this.watchResize(t,n),j((()=>this.flushQueue()))}}I.preconnected=void 0;const O=I},3742:(e,t,n)=>{function r(){return r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},r.apply(this,arguments)}n.d(t,{k:()=>o});var i=n(8883);function o(e,t,n){(0,i.lw)({type:"link",props:r({rel:e,href:t},n&&{as:n},{crossOrigin:"anonymous"})},document.head)}}}]);