"use strict";(self.webpackChunkjuno_shopify_template=self.webpackChunkjuno_shopify_template||[]).push([[8674],{2510:(t,e,i)=>{i.r(e),i.d(e,{Collection:()=>o});var s=i(8883),l=i(4920),r=i(2009);class o extends HTMLElement{constructor(){super(),this.element=this,this.filter_url="",this.page=1,this.collection_url=this.element.getAttribute("data-value"),this.readMore=(0,s.U2)(".js-read-more",document),this.addToCartForms=(0,s.go)(".js-product-form",this.element),this.filtersOpen=(0,s.U2)(".js-filter-toggle ",this.element),this.filtersClose=(0,s.U2)(".js-filter-close ",this.element),this.filters=(0,s.U2)("collection-filters ",this.element),this.sortBy=(0,s.U2)(".js-sort-by",this.element),this.sortValue=(0,s.U2)(".js-sort-by-value",this.element),this.sortList=(0,s.U2)(".js-sort-list",this.element),this.sortByMobile=(0,s.U2)(".js-sort-by-mobile",this.element),this.sortValueMobile=(0,s.U2)(".js-sort-by-value-mobile",this.element),this.sortListMobile=(0,s.U2)(".js-sort-list-mobile",this.element),this.sortByItems=(0,s.go)(".js-sort-item",this.element),this.sortByItemsMobile=(0,s.go)(".js-sort-item-mobile",this.element),this.collectionGrid=(0,s.U2)("#collection-grid",this.element),this.filterBtn=(0,s.U2)(".js-filter-btn",this.element),this.filterModal=(0,s.U2)(".js-filter-modal",this.element),this.filterCloseBtn=(0,s.U2)(".js-filter-close",this.element),this.filterTitleBtn=(0,s.go)(".js-filter-title",this.element),this.filterContents=(0,s.go)(".js-filter-content",this.element),this.filters=(0,s.go)(".js-filter-item",this.element),this.filterRemoveBtns=(0,s.go)(".remove-btn",this.element),this.resetFilterBtn=(0,s.U2)(".js-filter-reset-btn",this.element),this.searchInput=(0,s.U2)(".js-search-input",this.element),this.searchBtn=(0,s.U2)(".js-search-btn",this.element),this.bindEvents()}bindEvents(){this.initFilters(),this.eventPagination(),this.sortByChange(),this.sortByChangeMobile(),this.eventFilterButton(),this.eventPriceRange(),this.searchBtn&&(this.searchBtn.addEventListener("click",(t=>{t.preventDefault(),window.location.href=`/search?type=product&q=${this.searchInput.value}`})),this.searchInput.addEventListener("keypress",(t=>{13==t.keyCode&&(window.location.href=`/search?type=product&q=${this.searchInput.value}`)})))}eventPriceRange(){const t=document.querySelectorAll(".js-filter-content .range-input input"),e=document.querySelectorAll(".js-filter-content .price-input input"),i=document.querySelector(".js-filter-content .slider .progress");let s=10,l=0,r=0;e.forEach((o=>{o.addEventListener("input",(o=>{let a=parseInt(e[0].value),n=parseInt(e[1].value);n-a>=s&&n<=t[1].max&&("input-min"===o.target.className?(t[0].value=a,i.style.left=a/t[0].max*100+"%",l=100*a,r=100*n):(t[1].value=n,i.style.right=100-n/t[1].max*100+"%",l=100*a,r=100*n))})),o.addEventListener("change",(t=>{this.updatePriceFilter(l,r)}))})),t.forEach((o=>{o.addEventListener("input",(o=>{let a=parseInt(t[0].value),n=parseInt(t[1].value);n-a<s?("range-min"===o.target.className?t[0].value=n-s:t[1].value=a+s,l=100*(n-s),r=100*(a+s)):(e[0].value=a,e[1].value=n,i.style.left=a/t[0].max*100+"%",i.style.right=100-n/t[1].max*100+"%",l=100*a,r=100*n)})),o.addEventListener("change",(t=>{this.updatePriceFilter(l,r)}))}))}updatePriceFilter(t,e){const i=[{key:"filter.v.price.gte",value:t/100},{key:"filter.v.price.lte",value:e/100}];let s=window.location.href.split("?")[1],l="";i.forEach((t=>{const e=t.key,i=t.value;let r=!1;if(s&&""!=s){s=s.replaceAll("%20&%20","%20##%20");s.split("&").forEach((t=>{if(""!=t){const s=t.split("=")[0],o=t.split("=")[1].replaceAll(/ /g,"%20").replaceAll("##","&");s.includes("filter.v.price")?s==e&&(l+=`${s}=${i}&`,r=!0):l.includes(s)||"page"==s||(l+=`${s}=${o}&`)}}))}r||(l+=`${e}=${i}&`)})),this.filter_url=l,this.getProducts()}initFilters(){let t=window.location.href.split("?")[1];if(t&&""!=t){t=t.replaceAll("%20&%20","%20##%20");t.split("&").forEach((t=>{if(""!=t)if(t.includes("filter.v.price")){const e=t.split("=")[0],i=t.split("=")[1],s=document.querySelectorAll(".js-filter-content .range-input input"),l=document.querySelectorAll(".js-filter-content .price-input input"),r=document.querySelector(".js-filter-content .slider .progress");s.forEach((t=>{t.getAttribute("data-key")==e&&(t.value=Number(.01*i),e.includes("gte")?r.style.left=t.value/s[0].max*100+"%":r.style.right=100-t.value/s[1].max*100+"%")})),l.forEach((t=>{t.getAttribute("data-key")==e&&(t.value=Number(.01*i))})),this.filterTitleBtn.forEach((t=>{"Price"==t.getAttribute("data-value")&&t.classList.add("active")})),this.filterContents.forEach((t=>{"Price"==t.getAttribute("data-label")&&t.classList.add("active")}))}else{const e=t.split("=")[0],i=t.split("=")[1];this.filters.forEach((t=>{const s=t.getAttribute("data-key"),l=t.getAttribute("data-value").replaceAll(/ /g,"%20").replaceAll("&","##");if(s==e&&l==i){t.classList.add("active");const e=t.parentNode.parentNode.parentNode.querySelector(".js-filter-title"),i=t.parentNode.parentNode.parentNode.querySelector(".js-filter-content");e&&e.classList.add("active"),i&&i.classList.add("active")}}))}}))}}slideUp(t,e=500){t.style.transitionProperty="height, margin, padding",t.style.transitionDuration=e+"ms",t.style.boxSizing="border-box",t.style.height=t.offsetHeight+"px",t.offsetHeight,t.style.overflow="hidden",t.style.height=0,t.style.paddingTop=0,t.style.paddingBottom=0,t.style.marginTop=0,t.style.marginBottom=0,window.setTimeout((()=>{t.style.display="none",t.style.removeProperty("height"),t.style.removeProperty("padding-top"),t.style.removeProperty("padding-bottom"),t.style.removeProperty("margin-top"),t.style.removeProperty("margin-bottom"),t.style.removeProperty("overflow"),t.style.removeProperty("transition-duration"),t.style.removeProperty("transition-property")}),e)}slideDown(t,e=500){t.style.removeProperty("display");let i=window.getComputedStyle(t).display;"none"===i&&(i="block"),t.style.display=i;let s=t.offsetHeight;t.style.overflow="hidden",t.style.height=0,t.style.paddingTop=0,t.style.paddingBottom=0,t.style.marginTop=0,t.style.marginBottom=0,t.offsetHeight,t.style.boxSizing="border-box",t.style.transitionProperty="height, margin, padding",t.style.transitionDuration=e+"ms",t.style.height=s+"px",t.style.removeProperty("padding-top"),t.style.removeProperty("padding-bottom"),t.style.removeProperty("margin-top"),t.style.removeProperty("margin-bottom"),window.setTimeout((()=>{t.style.removeProperty("height"),t.style.removeProperty("overflow"),t.style.removeProperty("transition-duration"),t.style.removeProperty("transition-property")}),e)}slideToggle(t,e=500){"none"===window.getComputedStyle(t).display?this.slideDown(t,e):this.slideUp(t,e)}eventFilterButton(){this.filterBtn.addEventListener("click",(t=>{t.preventDefault(),this.filterBtn.classList.contains("is-active")?this.filterBtn.classList.remove("is-active"):this.filterBtn.classList.add("is-active"),this.slideToggle(this.filterModal,500)})),this.resetFilterBtn&&this.resetFilterBtn.addEventListener("click",(t=>{let e=window.location.href.split("?")[1],i="";if(e&&""!=e){e.split("&").forEach((t=>{if(""!=t){const e=t.split("=")[0],s=t.split("=")[1];if(t.includes("filter.v.price")){const t=document.querySelectorAll(".js-filter-content .range-input input"),i=document.querySelectorAll(".js-filter-content .price-input input"),s=document.querySelector(".js-filter-content .slider .progress");t.forEach((i=>{i.getAttribute("data-key")==e&&(e.includes("gte")?(i.value=t[0].min,s.style.left=t[0].min/t[0].max*100+"%"):(i.value=t[0].max,s.style.right=100-t[0].max/t[1].max*100+"%"))})),i.forEach((i=>{i.getAttribute("data-key")==e&&(e.includes("gte")?i.value=0:i.value=t[0].max)}))}"page"!=e&&"sort_by"!=e||(i+=`${e}=${s}&`)}}))}this.filter_url=i,this.getProducts(),this.removeClassFilters()})),this.filterTitleBtn.forEach((t=>{t.addEventListener("click",(e=>{const i=t.getAttribute("data-value");this.filterContents.forEach((e=>{const s=e.getAttribute("data-label");i==s&&(e.classList.contains("active")?(e.classList.remove("active"),t.classList.remove("active")):(e.classList.add("active"),t.classList.add("active")))}))}))})),this.filters.forEach((t=>{t.addEventListener("click",(e=>{const i=t.getAttribute("data-value"),s=t.getAttribute("data-key"),l=i.replaceAll(/ /g,"%20").replaceAll("&","##");let r=!1;t.classList.contains("active")?(t.classList.remove("active"),r=!1):(t.classList.add("active"),r=!0);let o=window.location.href.split("?")[1],a="",n=!1;if(o&&""!=o){o=o.replaceAll("%20&%20","%20##%20");o.split("&").forEach((t=>{if(""!=t){const e=t.split("=")[0],i=t.split("=")[1];e==s&&l==i?n=!0:"page"!=e&&(a+=`${e}=${i}&`)}}))}!n&&r&&(a+=`${s}=${i}&`),this.filter_url=a.replaceAll("##","&"),this.getProducts()}))})),this.filterRemoveBtns.forEach((t=>{t.addEventListener("click",(e=>{e.preventDefault();const i=t.getAttribute("data-label");if("Price"==i){let t=window.location.href.split("?")[1],e="";if(t&&""!=t){t.split("&").forEach((t=>{if(""!=t){const i=t.split("=")[0],s=t.split("=")[1];if(t.includes("filter.v.price")){const t=document.querySelectorAll(".js-filter-content .range-input input"),e=document.querySelectorAll(".js-filter-content .price-input input"),s=document.querySelector(".js-filter-content .slider .progress");t.forEach((e=>{e.getAttribute("data-key")==i&&(i.includes("gte")?(e.value=t[0].min,s.style.left=t[0].min/t[0].max*100+"%"):(e.value=t[0].max,s.style.right=100-t[0].max/t[0].max*100+"%"))})),e.forEach((e=>{e.getAttribute("data-key")==i&&(i.includes("gte")?e.value=0:e.value=t[0].max)}))}else e+=`${i}=${s}&`}}))}this.filter_url=e,this.getProducts()}else this.filters.forEach((t=>{if(t.getAttribute("data-label")==i){const e=t.getAttribute("data-value"),i=t.getAttribute("data-key"),s=e.replaceAll(/ /g,"%20").replaceAll("&","##");t.classList.remove("active");let l=window.location.href.split("?")[1],r="",o=!1;if(l&&""!=l){l=l.replaceAll("%20&%20","%20##%20");l.split("&").forEach((t=>{if(""!=t){const e=t.split("=")[0],l=t.split("=")[1];e==i&&s==l?o=!0:"page"!=e&&(r+=`${e}=${l}&`)}}))}o&&(this.filter_url=r.replaceAll("##","&"),this.getProducts())}}))}))}))}removeClassFilters(){this.filters.forEach((t=>{t.classList.remove("active")}))}initAddToCartButtons(){}mobileNav(){this.filtersOpen.addEventListener("click",(t=>{t.preventDefault(),this.filters.classList.add("is-active"),this.filtersClose.classList.add("is-active"),l.d()})),this.filtersClose.addEventListener("click",(()=>{this.filters.classList.remove("is-active"),this.filtersClose.classList.remove("is-active"),l.A(),document.querySelector("body").style.overflowY="auto"}))}eventPagination(){this.pageBtns=(0,s.go)(".js-page-link",this.element),this.pageBtns.forEach((t=>{t.addEventListener("click",(e=>{if(e.preventDefault(),t.classList.contains("c-pagination__link--ends")){"prev"==t.getAttribute("data-button")?1!=this.page&&(this.page-=1):this.page+=1;const e={type:"page",value:this.page};this.renderSortAndPage(e)}else{const e=t.getAttribute("data-button");this.page=Number(e);const i={type:"page",value:this.page};this.renderSortAndPage(i)}}))}))}sortByChange(){this.sortBy.addEventListener("click",(t=>{t.preventDefault(),this.sortList.classList.contains("hidden")?(this.sortList.classList.remove("hidden"),this.sortBy.classList.add("active")):(this.sortList.classList.add("hidden"),this.sortBy.classList.remove("active"))})),this.sortByItems.forEach((t=>{t.addEventListener("click",(e=>{this.sortValue.innerHTML=t.getAttribute("value"),this.sortList.classList.add("hidden"),this.sortBy.classList.remove("active");var i={type:"sort_by",value:t.getAttribute("value")};this.renderSortAndPage(i)}))}))}sortByChangeMobile(){this.sortByMobile.addEventListener("click",(t=>{t.preventDefault(),this.sortListMobile.classList.contains("hidden")?(this.sortListMobile.classList.remove("hidden"),this.sortByMobile.classList.add("active")):(this.sortListMobile.classList.add("hidden"),this.sortByMobile.classList.remove("active"))})),this.sortByItemsMobile.forEach((t=>{t.addEventListener("click",(e=>{this.sortValueMobile.innerHTML=t.getAttribute("value"),this.sortListMobile.classList.add("hidden"),this.sortByMobile.classList.remove("active");var i={type:"sort_by",value:t.getAttribute("value")};this.renderSortAndPage(i)}))}))}renderSortAndPage(t){let e=t;null==e&&(e={type:"",value:""});let i="",s=!1;const l=window.location.href.split("?")[1];if(l){l.split("&").forEach((e=>{const l=e.split("=")[0],r=e.split("=")[1];l==t.type?(i+=`${l}=${t.value}&`,s=!0):""!=l&&(i+=`${l}=${r}&`)}))}s||(i+=`${e.type}=${e.value}`),this.filter_url=i,this.getProducts()}getProducts(){this.updateWindowsUrl();let t="";t="&"==this.filter_url.charAt(this.filter_url.length-1)?`${this.collection_url}?${this.filter_url}view=ajax`:`${this.collection_url}?${this.filter_url}&view=ajax`,fetch(t).then((t=>t.text())).then((t=>{this.collectionGrid.innerHTML="",this.collectionGrid.innerHTML=t;(0,s.go)(".js-product-card",document).forEach((t=>{new r.Z(t)})),this.eventPagination()}))}updateWindowsUrl(){window.history.pushState({},"",`${this.collection_url}?${this.filter_url}`)}}},4920:(t,e,i)=>{i.d(e,{A:()=>o,d:()=>r});const s=document.body;let l={};function r(){const{style:t}=s;l={overflowY:t.overflowY,minHeight:t.minHeight,maxHeight:"auto"},Object.assign(s.style,{overflowY:"hidden",minHeight:"100vh",maxHeight:"100vh"})}function o(){Object.assign(s.style,l)}}}]);