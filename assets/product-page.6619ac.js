"use strict";(self.webpackChunkjuno_shopify_template=self.webpackChunkjuno_shopify_template||[]).push([[7387],{1637:(t,e,i)=>{i.d(e,{h:()=>n});var s=i(8883);const n=()=>{const t=(0,s.U2)(".js-minicart-count",document);fetch("/cart.js").then((t=>t.json())).then((e=>{t.innerHTML=e.item_count}))}},4454:(t,e,i)=>{i.d(e,{M:()=>o,h:()=>r});var s=i(8883),n=i(4920);const r=(t,e)=>{e&&e.addEventListener("click",(e=>{e.preventDefault(),t.classList.add("is-active")}))},o=t=>{const e=(0,s.U2)(".modal_close",t);e&&e.addEventListener("click",(e=>{e.preventDefault(),t.classList.remove("is-active"),(void 0).overlay.classList.remove("is-active"),document.querySelector(".c-model__overlay").classList.remove("is-active"),n.A(),console.log("default modal here"),document.querySelector("body").style.overflowY="auto"}))}},9552:(t,e,i)=>{i.d(e,{h:()=>r});var s=i(8883),n=i(6282);class r{constructor(t,e){this.cart=t,this.fetchCart=e,this.bindListener()}bindListener(){this.updateQty()}updateQty(){this.items=(0,s.go)(".js-cart-item",this.cart),this.items.forEach((t=>{const e=(0,s.U2)(".js-qty-minus",t),i=(0,s.U2)(".js-qty-plus",t),r=(0,s.U2)(".js-qty-value",t),o=r.getAttribute("data-id"),a=(0,s.U2)(".custom-product",t);(0,s.U2)(".p_variant_id",t);e.addEventListener("click",(()=>{if(a){var e=!1,i=(0,s.U2)(".font_value",t).textContent,c=(0,s.U2)(".letter_value",t).textContent;this.items.forEach((t=>{var a=(0,s.U2)(".p_variant_id",t);if(a){var d=a.textContent.replace(/\n/g,""),l=(0,s.U2)(".font_value",t).textContent,h=(0,s.U2)(".letter_value",t).textContent,u=(0,s.U2)(".product_title",t).textContent.replace(/\n/g,"");if(o==d&&i==l&&c==h){e=!0;var m=(0,s.U2)(".js-qty-value",t),p=m.getAttribute("data-id");m.value>=1&&(m.value--,(0,n.J8)({id:p,quantity:m.value,properties:{product_title:u,product_variant:+d,font:l.replace(/\n/g,""),letter:h.replace(/\n/g,"")}}).then((()=>{r.value--,(0,n.J8)({id:o,quantity:r.value,properties:{customize_font:i.replace(/\n/g,""),customize_letter:c.replace(/\n/g,"")}}).then((()=>{this.fetchCart()})).catch((t=>{console.warn("Error with minusQuantity: ",t)}))})).catch((t=>{console.warn("Error with minusQuantity: ",t)})))}}})),0==e&&(this.fetchCart?this.minusQuantity(o,r,this.fetchCart):this.minusQuantity(o,r))}else this.fetchCart?this.minusQuantity(o,r,this.fetchCart):this.minusQuantity(o,r);window.BOLD&&BOLD.common&&BOLD.common.eventEmitter&&"function"==typeof BOLD.common.eventEmitter.emit&&BOLD.common.eventEmitter.emit("BOLD_COMMON_cart_loaded")})),i.addEventListener("click",(()=>{if(a){var e=(0,s.U2)(".font_value",t).textContent,i=(0,s.U2)(".letter_value",t).textContent;this.items.forEach((t=>{var a=(0,s.U2)(".p_variant_id",t);if(a){var c=a.textContent.replace(/\n/g,""),d=(0,s.U2)(".font_value",t).textContent,l=(0,s.U2)(".letter_value",t).textContent,h=(0,s.U2)(".product_title",t).textContent.replace(/\n/g,"");if(o==c&&e==d&&i==l){var u=(0,s.U2)(".js-qty-value",t),m=u.getAttribute("data-id");u.value>=1&&(u.value++,(0,n.J8)({id:m,quantity:u.value,properties:{product_title:h,product_variant:+c,font:d.replace(/\n/g,""),letter:l.replace(/\n/g,"")}}).then((()=>{r.value++,(0,n.J8)({id:o,quantity:r.value,properties:{customize_font:e.replace(/\n/g,""),customize_letter:i.replace(/\n/g,"")}}).then((()=>{this.fetchCart()})).catch((t=>{console.warn("Error with PlusQuantity: ",t)}))})).catch((t=>{console.warn("Error with PlusQuantity: ",t)})))}}}))}else this.fetchCart?this.plusQuantity(o,r,this.fetchCart):this.plusQuantity(o,r);window.BOLD&&BOLD.common&&BOLD.common.eventEmitter&&"function"==typeof BOLD.common.eventEmitter.emit&&BOLD.common.eventEmitter.emit("BOLD_COMMON_cart_loaded")})),r.addEventListener("change",(t=>{this.fetchCart?this.setQuantity(o,t.target.value,this.fetchCart):this.setQuantity(o,t.target.value)}))}))}setQuantity(t,e,i){(0,n.J8)({id:t,quantity:e}).then((()=>{i?i():window.location.reload()})).catch((t=>{console.warn("Error with setQuantity: ",t)}))}plusQuantity(t,e,i){e.value++,(0,n.J8)({id:t,quantity:e.value}).then((()=>{i?i():window.location.reload()})).catch((t=>{console.warn("Error with plusQuantity: ",t)}))}minusQuantity(t,e,i){e.value>=1&&(e.value--,(0,n.J8)({id:t,quantity:e.value}).then((()=>{i?i():window.location.reload()})).catch((t=>{console.warn("Error with minusQuantity: ",t)})))}}},1238:(t,e,i)=>{i.d(e,{c:()=>o});var s=i(7462),n=i(8883),r=i(3374);class o{constructor(t,e){this.bindListener=()=>{this.items.forEach((t=>{const e=(0,n.U2)(".js-product-form-submit",t);e.addEventListener("click",(t=>{t.preventDefault();var i=e.closest(".js-product-form");e.setAttribute("disabled",!0),e.innerHTML="Adding",this.submitData(i)}))}))},this.cart=t,this.items=(0,n.go)(".upsell_section_product",this.cart),this.fetchCart=e,this.bindListener()}submitData(t){var e=(0,n.U2)(".js-product-form-submit",this.cart);const i=JSON.stringify((0,s.Z)({},JSON.parse((0,r.N)(t)),{sections_url:window.location.pathname}));fetch(`${routes.cart_add_url}`,(0,s.Z)({},(0,r.Q)("javascript"),{body:i})).then((t=>t.json())).then((()=>this.fetchCart())).catch((t=>console.error(t))).finally((()=>{e.innerHTML="Added"}))}}},7947:(t,e,i)=>{i.d(e,{$:()=>n});var s=i(8883);class n{constructor(t,e){this.bindListener=()=>{this.items.forEach((t=>{const e=(0,s.go)(".js-product-variant",t);e.forEach((t=>{t.addEventListener("click",(i=>{const n=t.getAttribute("data-product-id");var r=t.closest(".js-product-form");(0,s.U2)(".c-product__variantId",r).value=n;const o=t.getAttribute("data-img-url");if(e.forEach((t=>{t.classList.remove("active")})),t.classList.add("active"),null!=o&&""!=o){const e=(0,s.U2)(".c-product-card__image.first-image",t.parentNode.parentNode.parentNode.parentNode);e.innerHTML="";const i=`\n                            <img src="${o}" class="o-img o-img--cover  o-ar__item"/>\n                        `;e.innerHTML=i}}))}))}))},this.cart=t,this.items=(0,s.go)(".upsell_section_product",this.cart),this.fetchCart=e,this.bindListener()}}},6075:(t,e,i)=>{function s(t,e,i){var s=new Date;s.setTime(s.getTime()+24*i*60*60*1e3);var n="expires="+s.toUTCString();document.cookie=t+"="+e+";"+n+";path=/"}function n(t){for(var e=t+"=",i=document.cookie.split(";"),s=0;s<i.length;s++){for(var n=i[s];" "===n.charAt(0);)n=n.substring(1);if(0===n.indexOf(e))return n.substring(e.length,n.length)}return""}i.r(e),i.d(e,{Product:()=>v});var r=i(8883),o=i(7462),a=i(3374),c=i(9552),d=i(1238),l=i(1637),h=i(4454),u=i(7947);class m{constructor(t){this.fetchNewCart=()=>{fetch("/cart").then((t=>t.text())).then((t=>this.renderCart(t))).catch((t=>console.warn("Something went wrong.",t)))},this.element=t,this.submit=(0,r.U2)(".js-product-form-submit",this.element),this.cartTrigger=(0,r.U2)(".c-mini-cart__trigger",document),this.openTrigger=(0,r.U2)(".c-mini-cart__trigger",document),this.miniCart=(0,r.U2)("mini-cart",document),this.bindEvents()}bindEvents(){this.element.addEventListener("submit",(t=>{t.preventDefault(),this.onSubmitHandler()}))}onSubmitHandler(){this.submit.setAttribute("disabled",!0),this.submit.innerHTML="Adding",this.submitData()}submitData(){fetch("/cart.js").then((t=>t.json())).then((t=>{var e=!1,i=(0,r.U2)("#kl-prime-product",document),s="";i&&(s=i.getAttribute("data-id")),""!=s&&t.items.forEach((t=>{t.variant_id==s&&(e=!0)}));const n=JSON.stringify((0,o.Z)({},JSON.parse((0,a.N)(this.element)),{sections_url:window.location.pathname}));if(0==e&""!=s){t={form_type:"product",id:s,quantity:"1",sections_url:"/products/prime-insured-shipping",utf8:"✓"};fetch(`${routes.cart_add_url}`,(0,o.Z)({},(0,a.Q)("javascript"),{body:JSON.stringify(t)})).then((t=>t.json())).finally((()=>{fetch(`${routes.cart_add_url}`,(0,o.Z)({},(0,a.Q)("javascript"),{body:n})).then((t=>t.json())).then((()=>this.fetchCart())).catch((t=>console.error(t))).finally((()=>{this.submit.removeAttribute("disabled"),this.submit.innerHTML="Added",this.initCart()}))}))}else fetch(`${routes.cart_add_url}`,(0,o.Z)({},(0,a.Q)("javascript"),{body:n})).then((t=>t.json())).then((()=>this.fetchCart())).catch((t=>console.error(t))).finally((()=>{this.submit.removeAttribute("disabled"),this.submit.innerHTML="Added",this.initCart()}))}))}fetchCart(){fetch("/cart").then((t=>t.text())).then((t=>this.renderCart(t))).catch((t=>console.warn("Something went wrong.",t)))}renderCart(t){const e=(new DOMParser).parseFromString(t,"text/html"),i=(0,r.U2)(".js-mini-cart",e);this.miniCart.innerHTML=i.innerHTML,this.initCart(),(0,l.h)()}initCart(){(0,h.h)(this.miniCart,this.openTrigger),new c.h(this.miniCart,this.fetchNewCart),new d.c(this.miniCart,this.fetchNewCart),new u.$(document.querySelector(".js-mini-cart"),this.fetchNewCart),this.cartTrigger.click()}}class p{constructor(t){this.element=t,this.quickLinks=(0,r.go)(".js-quick-link",this.element),this.header=(0,r.U2)(".js-header",document),this.headerHeight=this.header.offsetHeight,this.bindEvents()}bindEvents(){this.handleClick()}handleClick(){this.quickLinks.forEach((t=>{t.addEventListener("click",(e=>{e.preventDefault();const i=this.header.classList.contains("is-hidden")?30:this.headerHeight,{id:s}=t.dataset,n=document.querySelector(s);n&&function(t,e,i){const s=window.pageYOffset,n=document.body.scrollHeight,{innerHeight:r}=window,o=s+i,a=s+t.getBoundingClientRect().top,c=(n-a<r?n-r:a)-o;let d;c&&window.requestAnimationFrame((function t(s){d||(d=s);const n=s-d;let r=Math.min(n/e,1);r=(t=>t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1)(r);const a=o+c*r-i;window.scrollTo(0,a),n<e&&window.requestAnimationFrame(t)}))}(n,500,i)}))}))}}class v extends HTMLElement{constructor(){super(),this.fetchNewCart=()=>{fetch("/cart").then((t=>t.text())).then((t=>this.renderCart(t))).catch((t=>console.warn("Something went wrong.",t)))},this.element=this,this.product=JSON.parse((0,r.U2)("#product-info",this.element).innerHTML),this.addToCartForm=(0,r.U2)(".js-product-form",this.element),this.variantDrop=(0,r.U2)(".c-product-dropdown",this.element),this.variantSelects=(0,r.go)(".js-product-variant",this.element),this.quantitySelect=(0,r.U2)(".js-product-quantity",this.element),this.prices=(0,r.go)(".js-product-price",this.element),this.priceVat=(0,r.U2)(".js-product-price-vat",this.element),this.returnToSearch=(0,r.U2)(".js-back-to-search",this.element),this.swatchLabel=(0,r.U2)(".js-swatch-value",this.element),this.accordions=(0,r.go)(".js-accordion",this.element),this.miniCart=(0,r.U2)(".js-mini-cart",document),this.videomodalBtn=(0,r.go)(".see-in-action",this.element),this.closevideoBtn=(0,r.U2)(".c-modal-video__close-btn",document),this.closevideoBtn1=(0,r.U2)(".c-modal-video__close",document),this.cartTrigger=(0,r.U2)(".c-mini-cart__trigger",document),this.customizeBtn=(0,r.U2)(".js-customize-btn",this.element),this.shipInfoBtn=(0,r.U2)(".ship_modal_info_icon",this.element),this.closeShipBtn=(0,r.U2)(".c-modal-ship__close-btn",this.element);if((0,r.U2)(".js-product-mobile-cta"));else{const t=document.createElement("div");t.classList.add("js-product-mobile-cta");const e=document.createElement("button");e.classList.add("mobile-cta"),e.innerHTML=(0,r.U2)(".js-product-form-submit").innerHTML,t.appendChild(e),document.body.appendChild(t),e.addEventListener("click",(()=>{(0,r.U2)(".js-product-form-submit").click()}))}this.variantDrop&&this.variantDrop.addEventListener("click",(t=>{t.preventDefault();var e=(0,r.U2)(".c-product__select",document);"none"==e.style.display?e.style.display="block":e.style.display="none"})),this.customBtn=(0,r.U2)("#customize-btn",document),this.customBtn&&this.customBtn.addEventListener("click",(t=>{if(t.preventDefault(),0==this.count){let t={items:[{id:"41926468599999",quantity:1,properties:{product_title:this.product.title,product_variant:Number(this.customBtn.getAttribute("data-variant")),font:this.customizeObj.font,letter:this.customizeObj.text}},{id:Number(this.customBtn.getAttribute("data-variant")),quantity:1,properties:{customize_font:this.customizeObj.font,customize_letter:this.customizeObj.text}}]};fetch("/cart.js").then((t=>t.json())).then((e=>{var i=!1,s=(0,r.U2)("#kl-prime-product",document),n="";s&&(n=s.getAttribute("data-id")),""!=n&&e.items.forEach((t=>{t.variant_id==n&&(i=!0)})),0==i&""!=n?(t={items:[{id:"41926468599999",quantity:1,properties:{product_title:this.product.title,product_variant:Number(this.customBtn.getAttribute("data-variant")),font:this.customizeObj.font,letter:this.customizeObj.text}},{id:Number(this.customBtn.getAttribute("data-variant")),quantity:1,properties:{customize_font:this.customizeObj.font,customize_letter:this.customizeObj.text}},{id:n,quantity:1}]},fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((t=>t.json())).then((t=>{this.count=0,this.fetchCart(),document.querySelector(".c-modal-customize__close-btn").click()})).catch((t=>{this.count=0}))):fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((t=>t.json())).then((t=>{this.count=0,this.fetchCart(),document.querySelector(".c-modal-customize__close-btn").click()})).catch((t=>{this.count=0}))}))}})),this.count=0,this.customizeObj={font:"",text:""};var t=0;this.mainImgs=(0,r.go)(".product-main-image"),this.thumbImgs=(0,r.go)(".product-thumb-image"),this.thumbImgs.length>0&&(this.thumbImgs.forEach((e=>{e.querySelector("img")&&(t+=1)})),this.thumbswiper=new Swiper(".mySwiper",{slidesPerView:"auto",spaceBetween:10,centeredSlides:!0,loop:!0,slideToClickedSlide:!0}),this.mainswiper=new Swiper(".mySwiper2",{spaceBetween:10,loop:!0,slidesPerView:1,loopedSlides:t,centeredSlides:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}),this.thumbswiper.controller.control=this.mainswiper,this.mainswiper.controller.control=this.thumbswiper),this.bindEvents(),this.backToSearch(),this.eventAccordion(),this.eventVariants(),this.eventQuantity(),this.eventCustomize(),this.eventshipModal(),this.eventvideoModal(),this.eventMultiVariants(),this.variantText()}variantText(){this.variantDrop&&this.variantSelects.forEach((t=>{if(t.classList.contains("active")){var e=t.getAttribute("data-position");1==e&&t.getAttribute("data-text").includes(".00")&&((0,r.U2)(".c-product__selected",this.element).innerHTML=t.getAttribute("data-text")),1!=e&&((0,r.U2)(".c-product__selected",this.element).innerHTML=t.getAttribute("data-text"))}}))}eventvideoModal(){this.videomodalBtn.length>0&&(this.videoModalContent=document.querySelector(".c-modal-video"),this.videomodalBtn.forEach((t=>{t.addEventListener("click",(t=>{t.preventDefault(),this.videoModalContent.classList.add("active"),this.videoiframe=(0,r.U2)("iframe",this.videoModalContent),this.videoiframe.src+="&autoplay=1&mute=1"}))})),this.closevideoBtn.addEventListener("click",(t=>{t.preventDefault(),this.videoModalContent.classList.remove("active"),this.videoiframe=(0,r.U2)("iframe",this.videoModalContent);var e=this.videoiframe.src;this.videoiframe.src=e,this.videoiframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}',"*")})),this.closevideoBtn1.addEventListener("click",(t=>{t.preventDefault(),this.videoModalContent.classList.remove("active"),this.videoiframe=(0,r.U2)("iframe",this.videoModalContent);var e=this.videoiframe.src;this.videoiframe.src=e,this.videoiframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}',"*")})))}eventCustomize(){this.customizeBtn&&(this.customizeModal=document.querySelector(".js-customize-modal"),this.closeBtns=(0,r.go)(".js-customize-close",this.customizeModal),this.customizeBtn.addEventListener("click",(t=>{t.preventDefault(),this.customizeModal.classList.add("active"),this.renderStepHtml(),this.eventSteps(),this.step2.classList.add("active"),this.count=0;const e=document.querySelector(".js-product-mobile-cta");e&&(e.style.display="none")})))}eventshipModal(){this.shipInfoBtn&&(this.shipInfoModal=document.querySelector(".c-modal-ship"),this.shipInfoBtn.addEventListener("click",(t=>{t.preventDefault(),this.shipInfoModal.classList.add("active")})),this.shipInfoBtn.addEventListener("mouseover",(t=>{t.preventDefault(),this.shipInfoModal.classList.add("show")})),this.shipInfoBtn.addEventListener("mouseout",(t=>{t.preventDefault(),this.shipInfoModal.classList.remove("show")}))),this.closeShipBtn&&(this.shipInfoModal=document.querySelector(".c-modal-ship"),this.closeShipBtn.addEventListener("click",(t=>{t.preventDefault(),this.shipInfoModal.classList.remove("active")})))}renderStepHtml(){let t=null;this.variantSelects.forEach((e=>{e.classList.contains("active")&&(t=e.getAttribute("data-product-id"))}));const e=(0,r.U2)(".c-product__variantId",this.addToCartForm);t=e.value;var i=this.product.title,s=this.product.price+1500;document.querySelector(".customize_title").innerHTML=i,document.querySelector(".customize_price").innerHTML=`${this.formatPrice(s)}`,document.querySelector(".mobile_customize_title").innerHTML=i,document.querySelector(".mobile_customize_price").innerHTML=`${this.formatPrice(s)}`;var n=null,o=null,a=document.querySelectorAll(".c-product__swatch-item.c-product-card__option");a&&a.forEach((t=>{t.classList.contains("active")&&(n=t.getAttribute("data-text"))})),null==t&&(t=this.product.variants[0].id.toString());let c=this.product.featured_image;if(null!=n){var d=n+" Custom";o=n.replace(" ","-").toLowerCase(),this.product.media.forEach((t=>{if(t.alt==d)return c=t.src,!1}))}if(""!=c){const e=`\n                <img src="${c}"/>\n\n                <div class="customize-text" custom-color="${o}">\n                <div class="customize-content"></div>\n                </div>\n            `,i=(0,r.U2)(".js-step-img",document);(0,r.U2)("#customize-btn",document).setAttribute("data-variant",t),i.innerHTML=e}}eventSteps(){this.step2=document.querySelector(".c-modal-customize__step2");var t=document.querySelectorAll(".fonts-content .item"),e=document.querySelector("#customize-input"),i=document.querySelector("#customize-btn");i.classList.add("disabled"),document.querySelector(".custom_font_section").addEventListener("click",(t=>{const e=document.querySelector(".fonts");"none"==e.style.display?e.style.display="block":e.style.display="none"})),document.querySelector(".custom_dropdown").addEventListener("click",(t=>{const e=document.querySelector(".fonts");"none"==e.style.display?e.style.display="block":e.style.display="none"})),this.closeBtns.forEach((t=>{t.addEventListener("click",(t=>{if(this.customizeModal.classList.remove("active"),this.step2.classList.remove("active"),screen.width<786){const t=document.querySelector(".js-product-mobile-cta");t&&(t.style.display="block")}}))})),e&&(e.value="",e.addEventListener("input",(t=>{t.preventDefault();const e=t.target.value;var s=160,n=23,o=11,a=(0,r.U2)(".product-font-size",document);if(a)var c=a.getAttribute("data-desktop-max"),d=a.getAttribute("data-desktop-min"),l=a.getAttribute("data-mobile-max"),h=a.getAttribute("data-mobile-min"),u=a.getAttribute("desktop-max-width"),m=a.getAttribute("mobile-max-width");const p=(0,r.U2)(".customize-text",document),v=(0,r.U2)(".customize-content",document);if(screen.width>768)""!=c&&(n=parseInt(c)),""!=d&&(o=parseInt(d)),""!=u&&(s=parseInt(u));else{s=110;n=15,o=7;""!=l&&(n=parseInt(l)),""!=h&&(o=parseInt(h)),""!=m&&(s=parseInt(m))}p.style.width=s+"px";let f=n;for(v.style.fontSize=f+"px";f>o&&v.scrollWidth+10>s;)f--,v.style.fontSize=f+"px";e.length;v.innerHTML=e,this.isCheckoutBtn()?i.classList.remove("disabled"):i.classList.add("disabled")}))),t.forEach((e=>{e.addEventListener("click",(s=>{s.preventDefault(),t.forEach((t=>{t.classList.remove("active")})),e.classList.add("active"),this.isCheckoutBtn()?i.classList.remove("disabled"):i.classList.add("disabled");const n=(0,r.U2)(".customize-text",document),o=(0,r.U2)(".preview_font span",document);if(n&&e&&e.getAttribute("data-font"))switch(n.classList.remove("font-como"),n.classList.remove("font-montserrat"),n.classList.remove("font-petit"),o.classList.remove("font-como"),o.classList.remove("font-montserrat"),o.classList.remove("font-petit"),e.getAttribute("data-font")){case"Cormorant Garamond":n.classList.add("font-como"),o.innerHTML="&nbsp;Cormorant Garamond",o.classList.add("font-como");break;case"Montserrat":n.classList.add("font-montserrat"),o.innerHTML="&nbsp;Montserrat",o.classList.add("font-montserrat");break;case"Petit Formal Script":n.classList.add("font-petit"),o.innerHTML="&nbsp;Petit Formal Script",o.classList.add("font-petit")}document.querySelector(".fonts").style.display="none"}))}))}fetchCart(){fetch("/cart").then((t=>t.text())).then((t=>this.renderCart(t))).catch((t=>console.warn("Something went wrong.",t)))}renderCart(t){const e=(new DOMParser).parseFromString(t,"text/html"),i=(0,r.U2)(".js-mini-cart",e);this.miniCart.innerHTML=i.innerHTML,this.initCart(),(0,l.h)()}initCart(){(0,h.h)(this.miniCart,this.openTrigger),(0,h.M)(this.miniCart),new c.h(this.miniCart,this.fetchNewCart),new u.$(document.querySelector(".js-mini-cart"),this.fetchNewCart),new d.c(document.querySelector(".js-mini-cart"),this.fetchCart),this.cartTrigger.click()}isCheckoutBtn(){const t=document.querySelectorAll(".fonts-content .item"),e=document.querySelector("#customize-input");return this.customizeObj.text=e.value,t.forEach((t=>{t.classList.contains("active")&&(this.customizeObj.font=t.getAttribute("data-font"))})),""!=this.customizeObj.text&&""!=this.customizeObj.font}eventQuantity(){if(this.quantitySelect){const t=(0,r.U2)(".js-qty-plus",this.quantitySelect),e=(0,r.U2)(".js-qty-minus",this.quantitySelect),i=(0,r.U2)(".js-qty-value",this.quantitySelect);let s=i.value;t.addEventListener("click",(t=>{t.preventDefault(),s++,i.value=s})),e.addEventListener("click",(t=>{t.preventDefault(),s>1&&(s--,i.value=s)}))}}eventMultiVariants(){}eventVariants(){this.variantSelects.forEach((t=>{t.addEventListener("click",(e=>{const i=t.getAttribute("data-position");this.variantSelects.forEach((t=>{const e=t.getAttribute("data-position");i==e&&t.classList.remove("active")})),t.classList.add("active"),"1"==i?(this.swatchLabel?this.swatchLabel.innerHTML=`Color: ${t.getAttribute("data-text")}`:((0,r.U2)(".c-product__selected",this.element).innerHTML=t.getAttribute("data-text"),(0,r.U2)(".c-product__select",this.element).style.display="none"),this.renderImages()):((0,r.U2)(".c-product__selected",this.element).innerHTML=t.getAttribute("data-text"),(0,r.U2)(".c-product__select",this.element).style.display="none"),this.appendText()}))}))}appendText(){let t=[];this.variantSelects.forEach((e=>{if(e.classList.contains("active")){const i=e.getAttribute("data-text");t.push(i)}}));let e="";t.forEach(((i,s)=>{s==t.length-1?e+=i:e+=`${i} / `})),e=e.replace(/\r?\n|\r/g,""),this.product.variants.forEach((t=>{if(t.title==e){const e=t.id;(0,r.U2)(".c-product__variantId",this.addToCartForm).value=e,this.updateProductPrice(e);const i=`?variant_id=${e}`;this.updateWindowLocationSearch(i)}}))}updateWindowLocationSearch(t){let e=window.location.href.replace(window.location.search,`?${t}`);""===window.location.search&&(e=window.location.href.replace(window.location.href,`${window.location.href}?${t}`)),e.includes("&")||(e=e.replace("?","")),window.history.pushState({},"",e)}updateProductPrice(t){this.product.variants.forEach((e=>{if(e.id==t){let t="";t=null==e.compare_at_price?`\n                        <p class="c-price">\n                            ${this.formatPrice(e.price)}\n                        </p>\n                    `:`\n                        <p class="c-price">\n                            <s class="c-price__compare">\n                                ${this.formatPrice(e.compare_at_price)}\n                            </s>\n\n                            ${this.formatPrice(e.price)}\n                        </p>\n                    `;(0,r.U2)(".c-product__price",this.element).innerHTML=t}}))}eventAccordion(){this.accordions.forEach((t=>{const e=(0,r.U2)(".js-accordion-trigger",t),i=(0,r.U2)(".js-accordion-content",t);e.addEventListener("click",(t=>{e.classList.contains("active")?(e.classList.remove("active"),i.classList.remove("active")):(e.classList.add("active"),i.classList.add("active"))}))}))}bindEvents(){new m(this.addToCartForm),new p(this.element),this.variantSelect&&this.variantSelect.addEventListener("change",(()=>{this.updatePrice()})),this.quantitySelect&&this.quantitySelect.addEventListener("change",(()=>{this.updatePrice()})),this.renderImages()}renderImages(){let t=this.product.variants[0].id,e=this.product.variants[0].option1;if(this.variantSelects.forEach((e=>{e.classList.contains("active")&&"1"==e.getAttribute("data-position")&&(t=e.getAttribute("data-product-id"))})),this.product.variants.forEach((i=>{t==i.id&&(e=i.option1)})),this.product.variants.length>1&&null!=e&&this.thumbImgs.length>0){this.mainImgs.forEach((t=>{t.classList.remove("hidden"),t.classList.remove("non-swiper-slide"),t.classList.add("swiper-slide")})),this.thumbImgs.forEach((t=>{t.classList.remove("hidden"),t.classList.remove("non-swiper-slide"),t.classList.add("swiper-slide")}));let t=-1;this.mainImgs.forEach(((i,s)=>{const n=i.querySelector("img");if(n){const r=n.getAttribute("alt");r!=e?(i.classList.add("hidden"),i.classList.add("non-swiper-slide"),i.classList.remove("swiper-slide")):r==e&&-1==t&&(t=s)}}));var i=0,s=0;this.thumbImgs.forEach((t=>{const n=t.querySelector("img");if(n){n.getAttribute("alt")!=e?(t.classList.add("hidden"),t.classList.add("non-swiper-slide"),t.classList.remove("swiper-slide")):(s+=1,0==i&&(i=1))}})),this.thumbswiper.destroy(),this.mainswiper.destroy(),this.thumbswiper=new Swiper(".mySwiper",{slidesPerView:"auto",spaceBetween:10,centeredSlides:!0,loop:!0,slideToClickedSlide:!0}),this.mainswiper=new Swiper(".mySwiper2",{spaceBetween:10,loop:!0,slidesPerView:1,loopedSlides:s,centeredSlides:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}),this.thumbswiper.controller.control=this.mainswiper,this.mainswiper.controller.control=this.thumbswiper}}updatePrice(){const t=this.variantSelect.options[this.variantSelect.selectedIndex],e=this.quantitySelect.options[this.quantitySelect.selectedIndex],i=t.dataset.price*e.value,s=i*theme.tax;this.prices.forEach((t=>{t.innerHTML=this.formatPrice(i)})),this.priceVat.innerHTML=this.formatPrice(s)}formatPrice(t){return Intl.NumberFormat(Shopify.locale,{style:"currency",currency:Shopify.currency.active,useGrouping:!0,minimumFractionDigits:2}).format(t/100)}backToSearch(){const t=n("js-search-cookie");t&&(this.returnToSearch.classList.remove("is-hidden"),this.returnToSearch.href=t,this.returnToSearch.addEventListener("click",(()=>{this.removeCookie()})))}removeCookie(){s("js-search-cookie","",28)}}},4920:(t,e,i)=>{i.d(e,{A:()=>o,d:()=>r});const s=document.body;let n={};function r(){const{style:t}=s;n={overflowY:t.overflowY,minHeight:t.minHeight,maxHeight:"auto"},Object.assign(s.style,{overflowY:"hidden",minHeight:"100vh",maxHeight:"100vh"})}function o(){Object.assign(s.style,n)}},3374:(t,e,i)=>{function s(t){const e={},i=new FormData(t);for(const t of i.keys())e[t]=i.get(t);return JSON.stringify(e)}function n(t="json"){return{method:"POST",headers:{"Content-Type":"application/json",Accept:`application/${t}`}}}i.d(e,{N:()=>s,Q:()=>n})},6282:(t,e,i)=>{i.d(e,{J8:()=>s});async function s(t){return fetch("/cart/change.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}},7462:(t,e,i)=>{function s(){return s=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s])}return t},s.apply(this,arguments)}i.d(e,{Z:()=>s})}}]);