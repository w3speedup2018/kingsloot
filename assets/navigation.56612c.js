"use strict";(self.webpackChunkjuno_shopify_template=self.webpackChunkjuno_shopify_template||[]).push([[384],{111:(s,e,t)=>{t.r(e),t.d(e,{Navigation:()=>n});var i=t(883);class n{constructor(s){this.element=s,this.navInner=(0,i.U2)(".js-nav-inner",this.element),this.navItems=(0,i.go)(".js-nav-item",this.element),this.navLinkItems=(0,i.go)(".js-nav-link",this.element),this.burgerButton=(0,i.U2)(".js-nav-toggle"),this.closeButton=(0,i.U2)(".js-nav-close"),this.brand=(0,i.U2)(".js-brand"),this.subnavTriggers=(0,i.go)(".js-subnav-link",this.element),this.subnavTargets=(0,i.go)(".js-subnav-target",this.element),this.subnavInners=(0,i.go)(".js-subnav-inner",this.element),this.subsubnavTargets=(0,i.go)(".js-subsubnav-target",this.element),this.subnavMobileTriggers=(0,i.go)(".js-next-level",this.element),this.subsubnavMobileTriggers=(0,i.go)(".js-next-next-level",this.element),this.bindEvents()}bindEvents(){window.innerWidth<820&&this.mobileNavOpen(),window.addEventListener("resize",(()=>{window.innerWidth<820&&this.mobileNavOpen()}))}mobileNavOpen(){this.burgerButton.addEventListener("click",(()=>{this.element.classList.add("is-active"),this.burgerButton.classList.add("is-active"),this.closeButton.classList.add("is-active"),this.brand.classList.add("is-top"),bodyScrollLock.lock()})),this.subnavTrigger(),this.mobileNavClose()}mobileNavClose(){this.closeButton.addEventListener("click",(()=>{this.element.classList.remove("is-active"),this.burgerButton.classList.remove("is-active"),this.closeButton.classList.remove("is-active"),this.brand.classList.remove("is-top"),this.navReset(),bodyScrollLock.release()}))}subnavTrigger(){this.subnavTriggers.forEach((s=>{s.addEventListener("click",(s=>{const e=s.currentTarget;s.preventDefault(),this.subnavOpen(e),this.brand.classList.remove("is-top")}))})),this.subnavMobileTriggers.forEach((s=>{s.addEventListener("click",(s=>{const e=s.currentTarget;this.subnavOpen(e),this.brand.classList.remove("is-top")}))}))}subnavOpen(s){const e=s.getAttribute("data-id");this.subnavTargets.forEach((s=>{s.getAttribute("data-id")===e?(s.classList.add("is-active"),this.element.classList.add("is-closed"),this.navInner.classList.add("is-closed"),this.subnavReturn(s)):s.classList.remove("is-active")}))}subnavReturn(s){(0,i.U2)(".js-subnav-return",s).addEventListener("click",(()=>{this.element.classList.remove("is-closed"),this.navInner.classList.remove("is-closed"),s.classList.remove("is-active"),this.brand.classList.add("is-top")}))}navReset(){this.navInner.classList.remove("is-closed"),this.subnavInners.forEach((s=>{s.classList.contains("is-closed")&&s.classList.remove("is-closed")})),this.subnavTargets.forEach((s=>{s.classList.contains("is-active")&&s.classList.remove("is-active")}))}}}}]);