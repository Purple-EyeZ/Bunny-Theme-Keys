import{initMainPage as u}from"./main.js";import{isFixedSearchFocused as w}from"./search.js";let c=window.scrollY;const o=document.querySelector(".fixed-banner"),i=document.getElementById("backToTopButton"),l=document.getElementById("menuButton"),d=document.getElementById("dropdownMenu");function a(){const t=window.scrollY,s=t>c;c=t;const n=t>15&&!o.classList.contains("show"),r=t<=15&&o.classList.contains("show")&&!w()&&!s;n?(o.classList.add("show"),o.classList.remove("hide")):r&&(o.classList.add("hide"),o.classList.remove("show"))}window.onscroll=()=>{const e=document.documentElement.scrollTop>400;i.style.display=e?"block":"none"},i.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}),document.addEventListener("DOMContentLoaded",()=>{l.addEventListener("click",()=>{d.classList.toggle("visible")}),window.addEventListener("click",e=>{e.target!==l&&!l.contains(e.target)&&!d.contains(e.target)&&d.classList.remove("visible")})});export function showToast(e){const t=document.getElementById("toast");t.innerHTML=e,t.classList.add("show"),setTimeout(()=>t.classList.remove("show"),2e3)}function m(){const e=document.getElementById("fluidToggleButton");let t=document.querySelector("canvas");const s=localStorage.getItem("fluidEnabled")==="true";t&&(t.style.display=s?"block":"none",s&&(e.classList.add("active"),document.body.classList.add("fluid-enabled"))),e==null||e.addEventListener("click",()=>{const n=t.style.display==="none";t.style.display=n?"block":"none",localStorage.setItem("fluidEnabled",n),e.classList.toggle("active"),document.body.classList.toggle("fluid-enabled"),n&&window.location.reload()})}function h(){a(),window.addEventListener("scroll",a)}window.onload=()=>{h(),m(),["/","/index.html","/Bunny-Theme-Keys/"].includes(window.location.pathname)&&u()},document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("whatsthat");e&&e.addEventListener("click",t=>{t.preventDefault(),window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ","_blank")})});
