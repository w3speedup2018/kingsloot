"use strict";(self.webpackChunkjuno_shopify_template=self.webpackChunkjuno_shopify_template||[]).push([[19],{857:(s,e,t)=>{t.r(e),t.d(e,{Header:()=>i});class i{constructor(s){this.header=s,this.scrolling=!1,this.previousTop=0,this.currentTop=0,this.scrollDelta=10,this.scrollOffset=150,this.bindListener()}bindListener(){this.setBackgroundHeader(),this.scroll()}setBackgroundHeader(){const s=document.querySelector(".is-transparent"),e=document.querySelector("#shopify-section-header");s&&(e.style.background="#fff")}scroll(){window.addEventListener("scroll",(()=>{this.scrolling||(this.scrolling=!0,window.requestAnimationFrame?window.requestAnimationFrame((()=>this.autoHideHeader())):setTimeout(this.autoHideHeader(),250))}))}autoHideHeader(){const s=window.scrollY||window.pageYOffset;this.checkHeaderPosition(s),this.previousTop=s,this.scrolling=!1}checkHeaderPosition(s){this.previousTop-s>this.scrollDelta?this.header.classList.remove("is-hidden"):s-this.previousTop>this.scrollDelta&&s>this.scrollOffset&&this.header.classList.add("is-hidden"),s>this.scrollOffset?this.header.classList.add("is-scrolled"):this.header.classList.remove("is-scrolled")}}}}]);