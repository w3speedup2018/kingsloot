"use strict";(self.webpackChunkjuno_shopify_template=self.webpackChunkjuno_shopify_template||[]).push([[886],{3434:(e,s,t)=>{t.r(s),t.d(s,{Model:()=>l});const i=document.body;let o={};var a=t(8883);class l{constructor(e){this.models=e,this.triggers=(0,a.go)(".js-model-trigger"),this.overlay=(0,a.U2)(".js-overlay"),this.bindEvents()}bindEvents(){[...this.triggers].forEach((e=>{e.addEventListener("click",(s=>{s.preventDefault();const{type:t}=e.dataset;this.findModel(t)}))}))}findModel(e){[...this.models].forEach((s=>{s.dataset.type===e&&this.openModel(s)}))}openModel(e){const s=(0,a.U2)(".js-model-close",e),t=(0,a.go)(".js-model-tab-trigger",e);e.classList.add("is-active"),e.open=!0,this.overlay.classList.add("is-active"),function(){const{style:e}=i;o={overflowY:e.overflowY,minHeight:e.minHeight,maxHeight:"auto"},Object.assign(i.style,{overflowY:"hidden",minHeight:"100vh",maxHeight:"100vh"})}(),this.handleClose(s,e),t&&this.handleTabs(t,e)}handleClose(e,s){e.addEventListener("click",(()=>{this.closeModel(s)})),this.overlay.addEventListener("click",(()=>{this.closeModel(s)}))}closeModel(e){this.overlay.classList.remove("is-active"),e.classList.remove("is-active"),e.open=!1,Object.assign(i.style,o)}handleTabs(e,s){const t=(0,a.go)(".js-model-header",s),i=(0,a.go)(".js-model-tab-target",s);[...e].forEach((e=>{e.addEventListener("click",(s=>{s.preventDefault();const{type:o}=e.dataset;this.updateElems(t,o),this.updateElems(i,o)}))}))}updateElems(e,s){[...e].forEach((e=>{e.classList.remove("is-active"),e.dataset.type===s&&e.classList.add("is-active")}))}}}}]);