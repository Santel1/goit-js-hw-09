!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),d=document.querySelector("body"),a=null;t.addEventListener("click",(function(){t.setAttribute("disabled","disabled"),e.removeAttribute("disabled","disabled"),a=setInterval((function(){d.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3)})),e.addEventListener("click",(function(){t.removeAttribute("disabled","disabled"),e.setAttribute("disabled","disabled"),clearInterval(a)}))}();
//# sourceMappingURL=01-color-switcher.b7962143.js.map