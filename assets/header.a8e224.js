"use strict";(self.webpackChunkjuno_shopify_template=self.webpackChunkjuno_shopify_template||[]).push([[9019],{857:(e,t,s)=>{s.r(t),s.d(t,{Header:()=>i});class i{constructor(e){this.header=e,this.scrolling=!1,this.previousTop=0,this.currentTop=0,this.scrollDelta=10,this.scrollOffset=150,this.bindListener()}bindListener(){this.setBackgroundHeader(),this.scroll()}setBackgroundHeader(){const e=document.querySelector(".is-transparent"),t=document.querySelector("#shopify-section-header");e&&(t.style.background="#fff");const s=document.querySelector("#mobile_addition_header");if(s.querySelector(".js-accordion-trigger").classList.contains("is-open"))document.querySelector("body main").setAttribute("style","margin-top: 190px;");else{s.querySelector(".js-accordion-content").style.maxHeight=0,document.querySelector("body main").setAttribute("style","margin-top: 10px;")}}scroll(){window.addEventListener("scroll",(()=>{this.scrolling||(this.scrolling=!0,window.requestAnimationFrame?window.requestAnimationFrame((()=>this.autoHideHeader())):setTimeout(this.autoHideHeader(),250));const e=document.querySelector("#mobile_addition_header");if(e&&screen.width<768){const t=e.querySelector(".js-accordion-content"),s=e.querySelector(".js-accordion-trigger");s&&s.classList.remove("is-open"),t&&(t.style.maxHeight=0,document.querySelector("body main").setAttribute("style","margin-top: 10px;"))}}))}autoHideHeader(){const e=window.scrollY||window.pageYOffset;this.checkHeaderPosition(e),this.previousTop=e,this.scrolling=!1}checkHeaderPosition(e){this.previousTop-e>this.scrollDelta?this.header.classList.remove("is-hidden"):e-this.previousTop>this.scrollDelta&&e>this.scrollOffset&&this.header.classList.add("is-hidden"),e>this.scrollOffset?this.header.classList.add("is-scrolled"):this.header.classList.remove("is-scrolled")}}}}]);