"use strict";(self.webpackChunkjuno_shopify_template=self.webpackChunkjuno_shopify_template||[]).push([[7387],{1637:(t,e,i)=>{i.d(e,{h:()=>n});var s=i(8883);const n=()=>{const t=(0,s.U2)(".js-minicart-count",document);fetch("/cart.js").then((t=>t.json())).then((e=>{t.innerHTML=e.item_count}))}},4454:(t,e,i)=>{i.d(e,{M:()=>r,h:()=>n});var s=i(8883);const n=(t,e)=>{e&&e.addEventListener("click",(e=>{e.preventDefault(),t.classList.add("is-active")}))},r=t=>{const e=(0,s.U2)(".modal_close",t);e&&e.addEventListener("click",(()=>{t.classList.remove("is-active"),document.querySelector(".c-model__overlay").classList.remove("is-active")}))}},9552:(t,e,i)=>{i.d(e,{h:()=>r});var s=i(8883),n=i(6282);class r{constructor(t,e){this.cart=t,this.fetchCart=e,this.bindListener()}bindListener(){this.updateQty()}updateQty(){this.items=(0,s.go)(".js-cart-item",this.cart),this.items.forEach((t=>{const e=(0,s.U2)(".js-qty-minus",t),i=(0,s.U2)(".js-qty-plus",t),r=(0,s.U2)(".js-qty-value",t),a=r.getAttribute("data-id"),o=(0,s.U2)(".custom-product",t);(0,s.U2)(".p_variant_id",t);e.addEventListener("click",(()=>{if(o){var e=!1,i=(0,s.U2)(".font_value",t).textContent,c=(0,s.U2)(".letter_value",t).textContent;this.items.forEach((t=>{var o=(0,s.U2)(".p_variant_id",t);if(o){var h=o.textContent.replace(/\n/g,""),d=(0,s.U2)(".font_value",t).textContent,l=(0,s.U2)(".letter_value",t).textContent,u=(0,s.U2)(".product_title",t).textContent.replace(/\n/g,"");if(a==h&&i==d&&c==l){e=!0;var m=(0,s.U2)(".js-qty-value",t),p=m.getAttribute("data-id");m.value>=1&&(m.value--,(0,n.J8)({id:p,quantity:m.value,properties:{product_title:u,product_variant:+h,font:d.replace(/\n/g,""),letter:l.replace(/\n/g,"")}}).then((()=>{r.value--,(0,n.J8)({id:a,quantity:r.value,properties:{customize_font:i.replace(/\n/g,""),customize_letter:c.replace(/\n/g,"")}}).then((()=>{this.fetchCart()})).catch((t=>{console.warn("Error with minusQuantity: ",t)}))})).catch((t=>{console.warn("Error with minusQuantity: ",t)})))}}})),0==e&&(this.fetchCart?this.minusQuantity(a,r,this.fetchCart):this.minusQuantity(a,r))}else this.fetchCart?this.minusQuantity(a,r,this.fetchCart):this.minusQuantity(a,r);window.BOLD&&BOLD.common&&BOLD.common.eventEmitter&&"function"==typeof BOLD.common.eventEmitter.emit&&BOLD.common.eventEmitter.emit("BOLD_COMMON_cart_loaded")})),i.addEventListener("click",(()=>{if(o){var e=(0,s.U2)(".font_value",t).textContent,i=(0,s.U2)(".letter_value",t).textContent;this.items.forEach((t=>{var o=(0,s.U2)(".p_variant_id",t);if(o){var c=o.textContent.replace(/\n/g,""),h=(0,s.U2)(".font_value",t).textContent,d=(0,s.U2)(".letter_value",t).textContent,l=(0,s.U2)(".product_title",t).textContent.replace(/\n/g,"");if(a==c&&e==h&&i==d){var u=(0,s.U2)(".js-qty-value",t),m=u.getAttribute("data-id");u.value>=1&&(u.value++,(0,n.J8)({id:m,quantity:u.value,properties:{product_title:l,product_variant:+c,font:h.replace(/\n/g,""),letter:d.replace(/\n/g,"")}}).then((()=>{r.value++,(0,n.J8)({id:a,quantity:r.value,properties:{customize_font:e.replace(/\n/g,""),customize_letter:i.replace(/\n/g,"")}}).then((()=>{this.fetchCart()})).catch((t=>{console.warn("Error with PlusQuantity: ",t)}))})).catch((t=>{console.warn("Error with PlusQuantity: ",t)})))}}}))}else this.fetchCart?this.plusQuantity(a,r,this.fetchCart):this.plusQuantity(a,r);window.BOLD&&BOLD.common&&BOLD.common.eventEmitter&&"function"==typeof BOLD.common.eventEmitter.emit&&BOLD.common.eventEmitter.emit("BOLD_COMMON_cart_loaded")})),r.addEventListener("change",(t=>{this.fetchCart?this.setQuantity(a,t.target.value,this.fetchCart):this.setQuantity(a,t.target.value)}))}))}setQuantity(t,e,i){(0,n.J8)({id:t,quantity:e}).then((()=>{i?i():window.location.reload()})).catch((t=>{console.warn("Error with setQuantity: ",t)}))}plusQuantity(t,e,i){e.value++,(0,n.J8)({id:t,quantity:e.value}).then((()=>{i?i():window.location.reload()})).catch((t=>{console.warn("Error with plusQuantity: ",t)}))}minusQuantity(t,e,i){e.value>=1&&(e.value--,(0,n.J8)({id:t,quantity:e.value}).then((()=>{i?i():window.location.reload()})).catch((t=>{console.warn("Error with minusQuantity: ",t)})))}}},1238:(t,e,i)=>{i.d(e,{c:()=>a});var s=i(7462),n=i(8883),r=i(3374);class a{constructor(t,e){this.bindListener=()=>{this.items.forEach((t=>{const e=(0,n.U2)(".js-product-form-submit",t);e.addEventListener("click",(t=>{t.preventDefault();var i=e.closest(".js-product-form");e.setAttribute("disabled",!0),e.innerHTML="Adding",this.submitData(i)}))}))},this.cart=t,this.items=(0,n.go)(".upsell_section_product",this.cart),this.fetchCart=e,this.bindListener()}submitData(t){var e=(0,n.U2)(".js-product-form-submit",this.cart);const i=JSON.stringify((0,s.Z)({},JSON.parse((0,r.N)(t)),{sections_url:window.location.pathname}));fetch(`${routes.cart_add_url}`,(0,s.Z)({},(0,r.Q)("javascript"),{body:i})).then((t=>t.json())).then((()=>this.fetchCart())).catch((t=>console.error(t))).finally((()=>{e.innerHTML="Added"}))}}},7947:(t,e,i)=>{i.d(e,{$:()=>n});var s=i(8883);class n{constructor(t,e){this.bindListener=()=>{this.items.forEach((t=>{const e=(0,s.go)(".js-product-variant",t);e.forEach((t=>{t.addEventListener("click",(i=>{const n=t.getAttribute("data-product-id");var r=t.closest(".js-product-form");(0,s.U2)(".c-product__variantId",r).value=n;const a=t.getAttribute("data-img-url");if(e.forEach((t=>{t.classList.remove("active")})),t.classList.add("active"),null!=a&&""!=a){const e=(0,s.U2)(".c-product-card__image.first-image",t.parentNode.parentNode.parentNode.parentNode);e.innerHTML="";const i=`\n                            <img src="${a}" class="o-img o-img--cover  o-ar__item"/>\n                        `;e.innerHTML=i}}))}))}))},this.cart=t,this.items=(0,s.go)(".upsell_section_product",this.cart),this.fetchCart=e,this.bindListener()}}},6075:(t,e,i)=>{function s(t,e,i){var s=new Date;s.setTime(s.getTime()+24*i*60*60*1e3);var n="expires="+s.toUTCString();document.cookie=t+"="+e+";"+n+";path=/"}function n(t){for(var e=t+"=",i=document.cookie.split(";"),s=0;s<i.length;s++){for(var n=i[s];" "===n.charAt(0);)n=n.substring(1);if(0===n.indexOf(e))return n.substring(e.length,n.length)}return""}i.r(e),i.d(e,{Product:()=>v});var r=i(8883),a=i(7462),o=i(3374),c=i(9552),h=i(1238),d=i(1637),l=i(4454),u=i(7947);class m{constructor(t){this.fetchNewCart=()=>{fetch("/cart").then((t=>t.text())).then((t=>this.renderCart(t))).catch((t=>console.warn("Something went wrong.",t)))},this.element=t,this.submit=(0,r.U2)(".js-product-form-submit",this.element),this.cartTrigger=(0,r.U2)(".c-mini-cart__trigger",document),this.openTrigger=(0,r.U2)(".c-mini-cart__trigger",document),this.miniCart=(0,r.U2)("mini-cart",document),this.bindEvents()}bindEvents(){this.element.addEventListener("submit",(t=>{t.preventDefault(),this.onSubmitHandler()}))}onSubmitHandler(){this.submit.setAttribute("disabled",!0),this.submit.innerHTML="Adding",this.submitData()}submitData(){fetch("/cart.js").then((t=>t.json())).then((t=>{var e=!1;t.items.forEach((t=>{"40387992715455"==t.variant_id&&(e=!0)}));const i=JSON.stringify((0,a.Z)({},JSON.parse((0,o.N)(this.element)),{sections_url:window.location.pathname}));if(0==e){t={form_type:"product",id:"40387992715455",quantity:"1",sections_url:"/products/prime-insured-shipping",utf8:"✓"};fetch(`${routes.cart_add_url}`,(0,a.Z)({},(0,o.Q)("javascript"),{body:JSON.stringify(t)})).then((t=>t.json())).finally((()=>{fetch(`${routes.cart_add_url}`,(0,a.Z)({},(0,o.Q)("javascript"),{body:i})).then((t=>t.json())).then((()=>this.fetchCart())).catch((t=>console.error(t))).finally((()=>{this.submit.removeAttribute("disabled"),this.submit.innerHTML="Added",this.initCart()}))}))}else fetch(`${routes.cart_add_url}`,(0,a.Z)({},(0,o.Q)("javascript"),{body:i})).then((t=>t.json())).then((()=>this.fetchCart())).catch((t=>console.error(t))).finally((()=>{this.submit.removeAttribute("disabled"),this.submit.innerHTML="Added",this.initCart()}))}))}fetchCart(){fetch("/cart").then((t=>t.text())).then((t=>this.renderCart(t))).catch((t=>console.warn("Something went wrong.",t)))}renderCart(t){const e=(new DOMParser).parseFromString(t,"text/html"),i=(0,r.U2)(".js-mini-cart",e);this.miniCart.innerHTML=i.innerHTML,this.initCart(),(0,d.h)()}initCart(){(0,l.h)(this.miniCart,this.openTrigger),(0,l.M)(this.miniCart),new c.h(this.miniCart,this.fetchNewCart),new h.c(this.miniCart,this.fetchNewCart),new u.$(document.querySelector(".js-mini-cart"),this.fetchNewCart),this.cartTrigger.click()}}class p{constructor(t){this.element=t,this.quickLinks=(0,r.go)(".js-quick-link",this.element),this.header=(0,r.U2)(".js-header",document),this.headerHeight=this.header.offsetHeight,this.bindEvents()}bindEvents(){this.handleClick()}handleClick(){this.quickLinks.forEach((t=>{t.addEventListener("click",(e=>{e.preventDefault();const i=this.header.classList.contains("is-hidden")?30:this.headerHeight,{id:s}=t.dataset,n=document.querySelector(s);n&&function(t,e,i){const s=window.pageYOffset,n=document.body.scrollHeight,{innerHeight:r}=window,a=s+i,o=s+t.getBoundingClientRect().top,c=(n-o<r?n-r:o)-a;let h;c&&window.requestAnimationFrame((function t(s){h||(h=s);const n=s-h;let r=Math.min(n/e,1);r=(t=>t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1)(r);const o=a+c*r-i;window.scrollTo(0,o),n<e&&window.requestAnimationFrame(t)}))}(n,500,i)}))}))}}class v extends HTMLElement{constructor(){super(),this.fetchNewCart=()=>{fetch("/cart").then((t=>t.text())).then((t=>this.renderCart(t))).catch((t=>console.warn("Something went wrong.",t)))},this.element=this,this.product=JSON.parse((0,r.U2)("#product-info",this.element).innerHTML),this.addToCartForm=(0,r.U2)(".js-product-form",this.element),this.variantSelects=(0,r.go)(".js-product-variant",this.element),this.quantitySelect=(0,r.U2)(".js-product-quantity",this.element),this.prices=(0,r.go)(".js-product-price",this.element),this.priceVat=(0,r.U2)(".js-product-price-vat",this.element),this.returnToSearch=(0,r.U2)(".js-back-to-search",this.element),this.swatchLabel=(0,r.U2)(".js-swatch-value",this.element),this.accordions=(0,r.go)(".js-accordion",this.element),this.miniCart=(0,r.U2)(".js-mini-cart",document),this.videomodalBtn=(0,r.U2)(".c-product__video",this.element),this.closevideoBtn=(0,r.U2)(".c-modal-video__close-btn",document),this.closevideoBtn1=(0,r.U2)(".c-modal-video__close",document),this.cartTrigger=(0,r.U2)(".c-mini-cart__trigger",document),this.customizeBtn=(0,r.U2)(".js-customize-btn",this.element),this.shipInfoBtn=(0,r.U2)(".ship_modal_info_icon",this.element),this.closeShipBtn=(0,r.U2)(".c-modal-ship__close-btn",this.element);if((0,r.U2)(".js-product-mobile-cta"));else{const t=document.createElement("button");t.classList.add("js-product-mobile-cta"),t.innerHTML=(0,r.U2)(".js-product-form-submit").innerHTML,document.body.appendChild(t),t.addEventListener("click",(()=>{(0,r.U2)(".js-product-form-submit").click()}))}this.customBtn=(0,r.U2)("#customize-btn",document),this.customBtn&&this.customBtn.addEventListener("click",(t=>{if(t.preventDefault(),0==this.count){let t={items:[{id:"41926468599999",quantity:1,properties:{product_title:this.product.title,product_variant:Number(this.customBtn.getAttribute("data-variant")),font:this.customizeObj.font,letter:this.customizeObj.text}},{id:Number(this.customBtn.getAttribute("data-variant")),quantity:1,properties:{customize_font:this.customizeObj.font,customize_letter:this.customizeObj.text}}]};fetch("/cart.js").then((t=>t.json())).then((e=>{var i=!1;e.items.forEach((t=>{"40387992715455"==t.variant_id&&(i=!0)})),0==i?(t={items:[{id:"41926468599999",quantity:1,properties:{product_title:this.product.title,product_variant:Number(this.customBtn.getAttribute("data-variant")),font:this.customizeObj.font,letter:this.customizeObj.text}},{id:Number(this.customBtn.getAttribute("data-variant")),quantity:1,properties:{customize_font:this.customizeObj.font,customize_letter:this.customizeObj.text}},{id:"40387992715455",quantity:1}]},fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((t=>t.json())).then((t=>{this.count=0,this.fetchCart(),document.querySelector(".c-modal-customize__close-btn").click()})).catch((t=>{this.count=0}))):fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((t=>t.json())).then((t=>{this.count=0,this.fetchCart(),document.querySelector(".c-modal-customize__close-btn").click()})).catch((t=>{this.count=0}))}))}})),this.count=0,this.customizeObj={font:"",text:""},this.mainImgs=(0,r.go)(".product-main-image"),this.thumbImgs=(0,r.go)(".product-thumb-image"),this.thumbswiper=new Swiper(".mySwiper",{loop:!0,spaceBetween:10,slidesPerView:4,freeMode:!0,watchSlidesProgress:!0}),this.mainswiper=new Swiper(".mySwiper2",{loop:!0,spaceBetween:10,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},thumbs:{swiper:this.thumbswiper}}),this.bindEvents(),this.backToSearch(),this.eventAccordion(),this.eventVariants(),this.eventQuantity(),this.eventCustomize(),this.eventshipModal(),this.eventvideoModal(),this.eventMultiVariants()}eventvideoModal(){this.videomodalBtn&&(this.videoModalContent=document.querySelector(".c-modal-video"),this.videomodalBtn.addEventListener("click",(t=>{t.preventDefault(),this.videoModalContent.classList.add("active"),this.videoiframe=(0,r.U2)("iframe",this.videoModalContent),this.videoiframe.src+="&autoplay=1&mute=1"})),this.closevideoBtn.addEventListener("click",(t=>{t.preventDefault(),this.videoModalContent.classList.remove("active"),this.videoiframe=(0,r.U2)("iframe",this.videoModalContent);var e=this.videoiframe.src;this.videoiframe.src=e,this.videoiframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}',"*")})),this.closevideoBtn1.addEventListener("click",(t=>{t.preventDefault(),this.videoModalContent.classList.remove("active"),this.videoiframe=(0,r.U2)("iframe",this.videoModalContent);var e=this.videoiframe.src;this.videoiframe.src=e,this.videoiframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}',"*")})))}eventCustomize(){this.customizeBtn&&(this.customizeModal=document.querySelector(".js-customize-modal"),this.closeBtns=(0,r.go)(".js-customize-close",this.customizeModal),this.customizeBtn.addEventListener("click",(t=>{t.preventDefault(),this.customizeModal.classList.add("active"),this.renderStepHtml(),this.eventSteps(),this.step2.classList.add("active"),this.count=0})))}eventshipModal(){this.shipInfoBtn&&(this.shipInfoModal=document.querySelector(".c-modal-ship"),this.shipInfoBtn.addEventListener("click",(t=>{t.preventDefault(),this.shipInfoModal.classList.add("active")})),this.shipInfoBtn.addEventListener("mouseover",(t=>{t.preventDefault(),this.shipInfoModal.classList.add("show")})),this.shipInfoBtn.addEventListener("mouseout",(t=>{t.preventDefault(),this.shipInfoModal.classList.remove("show")}))),this.closeShipBtn&&(this.shipInfoModal=document.querySelector(".c-modal-ship"),this.closeShipBtn.addEventListener("click",(t=>{t.preventDefault(),this.shipInfoModal.classList.remove("active")})))}renderStepHtml(){let t=null;this.variantSelects.forEach((e=>{e.classList.contains("active")&&(t=e.getAttribute("data-product-id"))}));var e=null,i=null,s=document.querySelectorAll(".c-product__swatch-item.c-product-card__option");s&&s.forEach((t=>{t.classList.contains("active")&&(e=t.getAttribute("data-text"))})),null==t&&(t=this.product.variants[0].id.toString());let n=this.product.featured_image;if(null!=e){var a=e+" Custom";i=e.replace(" ","-").toLowerCase(),this.product.media.forEach((t=>{if(t.alt==a)return n=t.src,!1}))}if(""!=n){const e=`\n                <img src="${n}"/>\n\n                <div class="customize-text" custom-color="${i}"></div>\n            `,s=(0,r.U2)(".js-step-img",document);(0,r.U2)("#customize-btn",document).setAttribute("data-variant",t),s.innerHTML=e}}eventSteps(){this.step2=document.querySelector(".c-modal-customize__step2");var t=document.querySelectorAll(".fonts-content .item"),e=document.querySelector("#customize-input"),i=document.querySelector("#customize-btn");i.classList.add("disabled"),this.closeBtns.forEach((t=>{t.addEventListener("click",(t=>{this.customizeModal.classList.remove("active"),this.step2.classList.remove("active")}))})),e&&(e.value="",e.addEventListener("input",(t=>{t.preventDefault();const e=t.target.value;var s=e.length;const n=(0,r.U2)(".customize-text",document);s>=1&&s<3?n.style.fontSize="30px":s>=3&&s<5?n.style.fontSize="25px":s>=5&&s<7?n.style.fontSize="20px":s>=7&&s<10?n.style.fontSize="19px":s>=10&&s<12?n.style.fontSize="17px":s>=12&&s<13?n.style.fontSize="15px":s>=13&&s<14?n.style.fontSize="14px":s>=14&&s<15?n.style.fontSize="13px":s>=15&&(n.style.fontSize="12px"),n.innerHTML=e,this.isCheckoutBtn()?i.classList.remove("disabled"):i.classList.add("disabled")}))),t.forEach((e=>{e.addEventListener("click",(s=>{s.preventDefault(),t.forEach((t=>{t.classList.remove("active")})),e.classList.add("active"),this.isCheckoutBtn()?i.classList.remove("disabled"):i.classList.add("disabled");const n=(0,r.U2)(".customize-text",document),a=(0,r.U2)(".preview_font span",document);if(n&&e&&e.getAttribute("data-font"))switch(n.classList.remove("font-como"),n.classList.remove("font-montserrat"),n.classList.remove("font-petit"),a.classList.remove("font-como"),a.classList.remove("font-montserrat"),a.classList.remove("font-petit"),e.getAttribute("data-font")){case"Cormorant Garamond":n.classList.add("font-como"),a.innerHTML="&nbsp;Cormorant Garamond",a.classList.add("font-como");break;case"Montserrat":n.classList.add("font-montserrat"),a.innerHTML="&nbsp;Montserrat",a.classList.add("font-montserrat");break;case"Petit Formal Script":n.classList.add("font-petit"),a.innerHTML="&nbsp;Petit Formal Script",a.classList.add("font-petit")}}))}))}fetchCart(){fetch("/cart").then((t=>t.text())).then((t=>this.renderCart(t))).catch((t=>console.warn("Something went wrong.",t)))}renderCart(t){const e=(new DOMParser).parseFromString(t,"text/html"),i=(0,r.U2)(".js-mini-cart",e);this.miniCart.innerHTML=i.innerHTML,this.initCart(),(0,d.h)(),console.log("render cart here")}initCart(){(0,l.h)(this.miniCart,this.openTrigger),(0,l.M)(this.miniCart),new c.h(this.miniCart,this.fetchNewCart),new u.$(document.querySelector(".js-mini-cart"),this.fetchNewCart),new h.c(document.querySelector(".js-mini-cart"),this.fetchCart),this.cartTrigger.click()}isCheckoutBtn(){const t=document.querySelectorAll(".fonts-content .item"),e=document.querySelector("#customize-input");return this.customizeObj.text=e.value,t.forEach((t=>{t.classList.contains("active")&&(this.customizeObj.font=t.getAttribute("data-font"))})),""!=this.customizeObj.text&&""!=this.customizeObj.font}eventQuantity(){if(this.quantitySelect){const t=(0,r.U2)(".js-qty-plus",this.quantitySelect),e=(0,r.U2)(".js-qty-minus",this.quantitySelect),i=(0,r.U2)(".js-qty-value",this.quantitySelect);let s=i.value;t.addEventListener("click",(t=>{t.preventDefault(),s++,i.value=s})),e.addEventListener("click",(t=>{t.preventDefault(),s>1&&(s--,i.value=s)}))}}eventMultiVariants(){}eventVariants(){this.variantSelects.forEach((t=>{t.addEventListener("click",(e=>{const i=t.getAttribute("data-position");this.variantSelects.forEach((t=>{const e=t.getAttribute("data-position");i==e&&t.classList.remove("active")})),t.classList.add("active"),"1"==i&&(this.swatchLabel&&(this.swatchLabel.innerHTML=`Color: ${t.getAttribute("data-text")}`),this.renderImages()),this.appendText()}))}))}appendText(){let t=[];this.variantSelects.forEach((e=>{if(e.classList.contains("active")){const i=e.getAttribute("data-text");t.push(i)}}));let e="";t.forEach(((i,s)=>{s==t.length-1?e+=i:e+=`${i} / `})),this.product.variants.forEach((t=>{if(t.title==e){const e=t.id;(0,r.U2)(".c-product__variantId",this.addToCartForm).value=e,this.updateProductPrice(e);const i=`?variant_id=${e}`;this.updateWindowLocationSearch(i)}}))}updateWindowLocationSearch(t){let e=window.location.href.replace(window.location.search,`?${t}`);""===window.location.search&&(e=window.location.href.replace(window.location.href,`${window.location.href}?${t}`)),e.includes("&")||(e=e.replace("?","")),window.history.pushState({},"",e)}updateProductPrice(t){this.product.variants.forEach((e=>{if(e.id==t){let t="";t=null==e.compare_at_price?`\n                        <p class="c-price">\n                            ${this.formatPrice(e.price)}\n                        </p>\n                    `:`\n                        <p class="c-price">\n                            <s class="c-price__compare">\n                                ${this.formatPrice(e.compare_at_price)}\n                            </s>\n\n                            ${this.formatPrice(e.price)}\n                        </p>\n                    `;(0,r.U2)(".c-product__price",this.element).innerHTML=t}}))}eventAccordion(){this.accordions.forEach((t=>{const e=(0,r.U2)(".js-accordion-trigger",t),i=(0,r.U2)(".js-accordion-content",t);e.addEventListener("click",(t=>{e.classList.contains("active")?(e.classList.remove("active"),i.classList.remove("active")):(e.classList.add("active"),i.classList.add("active"))}))}))}bindEvents(){new m(this.addToCartForm),new p(this.element),this.variantSelect&&this.variantSelect.addEventListener("change",(()=>{this.updatePrice()})),this.quantitySelect&&this.quantitySelect.addEventListener("change",(()=>{this.updatePrice()})),this.renderImages()}renderImages(){let t=this.product.variants[0].id,e=this.product.variants[0].option1;if(this.variantSelects.forEach((e=>{e.classList.contains("active")&&"1"==e.getAttribute("data-position")&&(t=e.getAttribute("data-product-id"))})),this.product.variants.forEach((i=>{t==i.id&&(e=i.option1)})),this.product.variants.length>1&&null!=e){this.mainImgs.forEach((t=>{t.classList.remove("hidden"),t.classList.remove("non-swiper-slide"),t.classList.add("swiper-slide")})),this.thumbImgs.forEach((t=>{t.classList.remove("hidden"),t.classList.remove("non-swiper-slide"),t.classList.add("swiper-slide")}));let t=-1;this.mainImgs.forEach(((i,s)=>{const n=i.querySelector("img");if(n){const r=n.getAttribute("alt");r!=e?(i.classList.add("hidden"),i.classList.add("non-swiper-slide"),i.classList.remove("swiper-slide")):r==e&&-1==t&&(t=s)}}));var i=0;this.thumbImgs.forEach((t=>{const s=t.querySelector("img");if(s){s.getAttribute("alt")!=e?(t.classList.add("hidden"),t.classList.add("non-swiper-slide"),t.classList.remove("swiper-slide")):0==i&&(i=1)}})),this.thumbswiper.destroy(),this.mainswiper.destroy(),this.thumbswiper=new Swiper(".mySwiper",{spaceBetween:18,slidesPerView:4,slidesPerColumn:2,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},freeMode:!1,loop:!1}),this.mainswiper=new Swiper(".mySwiper2",{spaceBetween:10,loop:!1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},thumbs:{swiper:this.thumbswiper}})}}updatePrice(){const t=this.variantSelect.options[this.variantSelect.selectedIndex],e=this.quantitySelect.options[this.quantitySelect.selectedIndex],i=t.dataset.price*e.value,s=i*theme.tax;this.prices.forEach((t=>{t.innerHTML=this.formatPrice(i)})),this.priceVat.innerHTML=this.formatPrice(s)}formatPrice(t){return Intl.NumberFormat(Shopify.locale,{style:"currency",currency:Shopify.currency.active,useGrouping:!0,minimumFractionDigits:2}).format(t/100)}backToSearch(){const t=n("js-search-cookie");t&&(this.returnToSearch.classList.remove("is-hidden"),this.returnToSearch.href=t,this.returnToSearch.addEventListener("click",(()=>{this.removeCookie()})))}removeCookie(){s("js-search-cookie","",28)}}},3374:(t,e,i)=>{function s(t){const e={},i=new FormData(t);for(const t of i.keys())e[t]=i.get(t);return JSON.stringify(e)}function n(t="json"){return{method:"POST",headers:{"Content-Type":"application/json",Accept:`application/${t}`}}}i.d(e,{N:()=>s,Q:()=>n})},6282:(t,e,i)=>{i.d(e,{J8:()=>s});async function s(t){return fetch("/cart/change.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}},7462:(t,e,i)=>{function s(){return s=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s])}return t},s.apply(this,arguments)}i.d(e,{Z:()=>s})}}]);