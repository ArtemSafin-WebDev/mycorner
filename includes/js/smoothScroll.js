"use strict";function SmoothScroll(o,e,t){o===document&&(o=document.scrollingElement||document.documentElement||document.body.parentNode||document.body);var n=!1;o.scrollTop=0;var l=100,s=o===document.body&&document.documentElement?document.documentElement:o,a=!1,i=!1;o.addEventListener("mousewheel",d,{passive:!1}),o.addEventListener("DOMMouseScroll",d,{passive:!1}),window.addEventListener("mousedown",function(o){o.target==$("html")[0]&&(i=!0)}),window.addEventListener("mouseup",function(){i=!1});var r=!1,c=!0;function d(t){if(c=!1,$("body").hasClass("overflow-dis"))$("body").hasClass("menu")||$("body").hasClass("overflow-dis-y")||t.preventDefault();else{a=!0,t.preventDefault();var i=function(o){return o.detail?o.wheelDelta?o.wheelDelta/o.detail/40*(o.detail>0?1:-1):-o.detail/3:o.wheelDelta/120}(t);l+=-i*e,l=Math.max(0,Math.min(l,o.scrollHeight-s.clientHeight)),n||u()}}function u(){n=!0;var e=(l-o.scrollTop)/t;o.scrollTop+=e,(!a||a&&i)&&(n=!1),Math.abs(e)>=1&&n?m(u):(n=!1,a=!1)}window.addEventListener("scroll",function(e){r&&(a||i)&&(r=!1,$("body,html").stop()),(!a||a&&i)&&(c?(o.scrollTop=0,l=0):(o.scrollTop=o.scrollTop,l=o.scrollTop))}),$("a[data-scroll-link]").click(function(e){e.preventDefault();var t=$(this).attr("href").substring(1).split("-");if(t.length>1&&"scroll"==t[0]){c=!1,r=!0;let e=$('*[data-scroll="'+t[1]+'"]');e.length>0&&(n=!1,r=!0,l=e.offset().top,$(o).stop().animate({scrollTop:e.offset().top},1e3,"easeInOutQuad",{progress:function(){controller.update(!0)},complete:function(){o.scrollTop=o.scrollTop,l=o.scrollTop,r=!1}}))}}),$(window).on("load",function(){var e=document.location.hash.substring(1).split("-");if(e.length>1&&"scrollto"==e[0]){c=!1,r=!0;let t=$('*[data-scroll="'+e[1]+'"]');t.length>0&&(n=!1,r=!0,l=t.offset().top,$(o).stop().animate({scrollTop:t.offset().top},1e3,"easeInOutQuad",{progress:function(){controller.update(!0)},complete:function(){o.scrollTop=o.scrollTop,l=o.scrollTop,r=!1}}))}});var m=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(o){window.setTimeout(o,20)}}