(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const a of c.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(n){if(n.ep)return;n.ep=!0;const c=r(n);fetch(n.href,c)}})();const it="data:text/markdown;base64,IyDwn46oIFRoZW1lIERvY3MKCvCfkqEgV2VsY29tZSB0byB0aGUgZG9jdW1lbnRhdGlvbiBmb3IgVmVuZGV0dGEncyB0aGVtZXMhIEhlcmUsIHlvdSdsbCBmaW5kIGluZm9ybWF0aW9uIG9uIGhvdyB0byB1c2Ugb3VyIHJhdyBjb2xvcnMgYW5kIHNlbWFudGljIGNvbG9ycyB0byBjcmVhdGUgYmVhdXRpZnVsIGFuZCBjb25zaXN0ZW50IGRlc2lnbnMgYWNyb3NzIHlvdXIgYXBwbGljYXRpb24uIFdoZXRoZXIgeW91J3JlIGxvb2tpbmcgZm9yIGEgZGFyayBvciBsaWdodCB0aGVtZSwgd2UndmUgZ290IHlvdSBjb3ZlcmVkLiBDaGVlcnMgdG8gYSBzdHlsaXNoIGFuZCBjb2hlc2l2ZSBkZXNpZ24hCgpEaXNjb3JkIG1heSBjaGFuZ2UgdGhpbmdzIHdpdGhpbiB0aGUgYXBwIHNvIGlmIHlvdSdkIGxpa2UgdG8gdHJhY2sgY2hhbmdlcyB0byBjb2xvcnMgYW5kIHN0cmluZ3MgdGhlbiBqb2luIFtUaGVtZWxpbmdzXShodHRwczovL2Rpc2NvcmQuZ2cvWlhXVDl5UnVlcSl7dGFyZ2V0PSJfYmxhbmsiIHJlbD0ibm9vcGVuZXIifSBhbmQgdmlzaXQgWyNjb2xvci1jaGFuZ2VzXShodHRwczovL2Rpc2NvcmQuY29tL2NoYW5uZWxzLzEyMjY5NTQ2MjQzNzI3MDczNDgvMTIyNjk1NTE2MzA4MDcyNDY0NSl7dGFyZ2V0PSJfYmxhbmsiIHJlbD0ibm9vcGVuZXIifS4KCi0gRm9yIGEgbGlzdCBvZiBrbm93biBzdHJpbmdzIGFuZCB3aGF0IHRoZXkgZG8sIHZpc2l0IFtoZXJlXSgvKS4KLSBGb3IgYSBmdWxsIGxpc3Qgb2Ygc3RyaW5ncyB2aXNpdCBbVGhlbWVsaW5nc10oaHR0cHM6Ly9naXRodWIuY29tL25leHBpZC9UaGVtZWxpbmdzL3RyZWUvZGF0YSl7dGFyZ2V0PSJfYmxhbmsiIHJlbD0ibm9vcGVuZXIifS4KLSBGb3IgdGhlbWUgdGVtcGxhdGVzIHZpc2l0IFtoZXJlXSgvVGVtcGxhdGVzLykuCi0gW1RoZW1lIExpc3RdKGh0dHBzOi8vcGx1Z2lucy1saXN0LnBhZ2VzLmRldi9UaGVtZXMvKXt0YXJnZXQ9Il9ibGFuayIgcmVsPSJub29wZW5lciJ9LgoKOjo6IHRpcApZb3UgY2FuIHRha2UgYW4gZXhpc3RpbmcgdXAgdG8gZGF0ZSB0aGVtZSBhbmQgdXNlIHRoYXQgYXMgYSB0aGVtZSB0ZW1wbGF0ZQo6OjoKCiMjIPCfpJYgVGhlbWUgRm9ybWF0CgpgYGBqc29uCnsKICAgICJuYW1lIjogc3RyaW5nLAogICAgImRlc2NyaXB0aW9uIjogc3RyaW5nLAogICAgImF1dGhvcnMiOiBbCiAgICAgICAgewogICAgICAgICAgICAibmFtZSI6IHN0cmluZywKICAgICAgICAgICAgImlkIjogc3RyaW5nCiAgICAgICAgfQogICAgXSwKICAgICJzZW1hbnRpY0NvbG9ycyI6IHsKICAgICAgICAiU0VNQU5USUNfS0VZX05BTUUiOiBbCiAgICAgICAgICAgIHN0cmluZwogICAgICAgIF0KICAgIH0sCiAgICAicmF3Q29sb3JzIjogewogICAgICAgICJyYXdfS0VZX05BTUUiOiBzdHJpbmcKICAgIH0sCiAgICAiYmFja2dyb3VuZCI6IHsKICAgICAgICAiYmx1ciI6IG51bWJlciwKICAgICAgICAidXJsIjogc3RyaW5nLAogICAgICAgICJhbHBoYSI6IG51bWJlcgogICAgfSwKICAgICJzcGVjIjogMgp9CmBgYAoKIyMjIFNlbWFudGljIGFuZCBSYXcgY29sb3IgdmFsdWVzOgoKLSAqKkhleGFkZWNpbWFsKio6IGAjUkdCKEEpYCBvciBgI1JSR0dCQihBQSlgCi0gKipyZ2IoKSAvIHJnYmEoKSoqOiBgcmdiKFIsIEcsIEIpYCBvciBgcmdiYShSLCBHLCBCLCBBKWAKLSAqKnRyYW5zcGFyZW50Kio6IGB0cmFuc3BhcmVudGAKCiMjIyBCYWNrZ3JvdW5kIHZhbHVlczoKCi0gKipCbHVyKio6IERldGVybWluZXMgdGhlIGJsdXJyaW5lc3Mgb2YgdGhlIGJhY2tncm91bmQsIGdvZXMgZnJvbSAwIHRvIDEKLSAqKlVSTCoqOiBBIGxpbmsgdG8gdGhlIGJhY2tncm91bmQKICAtIElmIHRoZSBiYWNrZ3JvdW5kIGlzIGhvc3RlZCBvbiBHaXRIdWIsIHlvdSBtdXN0IHVzZSB0aGUgcmF3IFVSTAogIC0gU29tZSBzaXRlcywgc3VjaCBhcyBJbWd1ciwgYXJlIGJsb2NrZWQgaW4gc29tZSBjb3VudHJpZXMgc28gdGhlIGJhY2tncm91bmRzIHdvbid0IGxvYWQKLSAqKkFscGhhKio6IERldGVybWluZXMgdGhlIG9wYWNpdHkgb2YgdGhlIGJhY2tncm91bmQsIGdvZXMgZnJvbSAwIHRvIDEKCiMjIEFkZGl0aW9uYWwgUmVzb3VyY2VzCgpMZWdhY3kgdGhlbWUgZG9jcyBjYW4gYmUgZm91bmQgW2hlcmVdKGh0dHBzOi8vdmVuZGV0dGEtdGhlbWVzLmdpdGJvb2suaW8vd2lraSl7dGFyZ2V0PSJfYmxhbmsiIHJlbD0ibm9vcGVuZXIifS4K",ot="data:text/markdown;base64,IyDwn5SkIEZvbnQgRG9jcwoK8J+SoSBUaGlzIHBhZ2UgaW50cm9kdWNlcyBjdXN0b20gZm9udHMgc3VwcG9ydCBpbiB0aGVtaW5nLiBJdCBleHBsYWlucyBob3cgdG8gaW5zdGFsbCBmb250cywgZmluZCBmb250cyBhcyB3ZWxsIGFzIGNyZWF0aW5nIHlvdXIgb3duLgoKUG9wdWxhciBmb250IHNvdXJjZXM6IAotIFtSYWlyb2YncyBSZXBvXShodHRwczovL3JhaXJvZi5naXRodWIuaW8vVGhlbWUtRm9udHMvKXt0YXJnZXQ9Il9ibGFuayIgcmVsPSJub29wZW5lciJ9Ci0gW0FydGh1cnMgUmVwb10oaHR0cHM6Ly9naXRodWIuY29tL1B1cnBsZS1FeWVaL0J1bm55LUZvbnRzP3RhYj1yZWFkbWUtb3YtZmlsZSNmb250cy1saXN0KXt0YXJnZXQ9Il9ibGFuayIgcmVsPSJub29wZW5lciJ9Ci0gW0dvb2dsZSBGb250c10oaHR0cHM6Ly9idW5ueS1nb29nbGUtZm9udHMudmVyY2VsLmFwcC8pe3RhcmdldD0iX2JsYW5rIiByZWw9Im5vb3BlbmVyIn0KLSBbUmV2ZW5nZV0oaHR0cHM6Ly9kaXNjb3JkLmNvbS9jaGFubmVscy8xMjA1MjA3Njg5ODMyMDM4NTIyLzEzNDkwODM4ODE4NjkwMjEyOTYpe3RhcmdldD0iX2JsYW5rIiByZWw9Im5vb3BlbmVyIn0KCiMjIEluc3RhbGxpbmcgZm9udHMKCiMjIyBVc2luZyBmb250IGxpbmtzIChyZWNvbW1lbmRlZCk6CgoxLiBHZXQgdGhlIGxpbmsgdG8gdGhlIGZvbnQgZmlsZSB5b3Ugd2FudAoyLiBHbyB0byBgWW91VGFiYCA+IGBTZXR0aW5nc2AgPiBgRm9udHNgID4gYCtgCjMuIEltcG9ydCBmb250IGVudHJpZXMgZnJvbSBhIGxpbmsKCiMjIyBVc2luZyB0aGVtZSBmaWxlczoKCjEuIEZpbmQgJiBpbnN0YWxsIGEgdGhlbWUgd2l0aCBjdXN0b20gZm9udHMgc3VwcG9ydAoyLiBHbyB0byBgWW91VGFiYCA+IGBTZXR0aW5nc2AgPiBgRm9udHNgID4gYCtgCjMuIEV4dHJhY3QgZm9udCBmcm9tIHRoZW1lCgojIyBDcmVhdGluZyB5b3VyIG93biBmb250CgpGb250IHRlbXBsYXRlcyBjYW4gYmUgZG93bmxvYWRlZCBmcm9tIFtoZXJlXShodHRwczovL3B1cnBsZS1leWV6LmdpdGh1Yi5pby9CdW5ueS1UaGVtZS1LZXlzL1RlbXBsYXRlcy8pCgoxLiBDcmVhdGUgYSBwdWJsaWMgR2l0IHJlcG9zaXRvcnkgKHJlY29tbWVuZGVkKQoyLiBVcGxvYWQgZm9udHMgZmlsZXMgKFRURi9PVEYpIHRvIHRoZSByZXBvc2l0b3J5CjMuIENvcHkgcmF3IFVSTHMKNC4gTWFrZSBhbmQgdXBsb2FkIGEgbmV3IGpzb24gZmlsZSB3aXRoIHRoZSBmb2xsb3dpbmcgZm9ybWF0OgoKCmBgYGpzb24KewogICAgInNwZWMiOiAxLAogICAgIm5hbWUiOiBzdHJpbmcsCiAgICAicHJldmlld1RleHQiOiBzdHJpbmcsCiAgICAibWFpbiI6IHsKICAgICAgICAiQUJDR2ludG9Ob3JkLUV4dHJhQm9sZCI6ICJsaW5rIiwKICAgICAgICAiZ2dzYW5zLUJvbGQiOiAibGluayIsCiAgICAgICAgImdnc2Fucy1Cb2xkSXRhbGljIjogImxpbmsiLAogICAgICAgICJnZ3NhbnMtRXh0cmFCb2xkIjogImxpbmsiLAogICAgICAgICJnZ3NhbnMtRXh0cmFCb2xkSXRhbGljIjogImxpbmsiLAogICAgICAgICJnZ3NhbnMtTWVkaXVtIjogImxpbmsiLAogICAgICAgICJnZ3NhbnMtTWVkaXVtSXRhbGljIjogImxpbmsiLAogICAgICAgICJnZ3NhbnMtTm9ybWFsIjogImxpbmsiLAogICAgICAgICJnZ3NhbnMtTm9ybWFsSXRhbGljIjogImxpbmsiLAogICAgICAgICJnZ3NhbnMtU2VtaWJvbGQiOiAibGluayIsCiAgICAgICAgImdnc2Fucy1TZW1pYm9sZEl0YWxpYyI6ICJsaW5rIiwKICAgICAgICAiTm90b1NhbnMtQm9sZCI6ICJsaW5rIiwKICAgICAgICAiTm90b1NhbnMtRXh0cmFCb2xkIjogImxpbmsiLAogICAgICAgICJOb3RvU2Fucy1NZWRpdW0iOiAibGluayIsCiAgICAgICAgIk5vdG9TYW5zLU5vcm1hbCI6ICJsaW5rIiwKICAgICAgICAiTm90b1NhbnMtTm9ybWFsSXRhbGljIjogImxpbmsiLAogICAgICAgICJOb3RvU2Fucy1TZW1pYm9sZCI6ICJsaW5rIiwKICAgICAgICAiU291cmNlQ29kZVByby1TZW1pYm9sZCI6ICJsaW5rIgogICAgfQp9CmBgYAoKNS4gSW5zdGFsbCB0aGUgZm9udA==",Ne=300,Te=50,nt=100,ge="transform 0.3s ease",fe={PREV:{transform:"translateX(100vw)",delta:-1},NEXT:{transform:"translateX(-100vw)",delta:1},CLOSE:{transform:"translateY(100vh)"}};let x=[],M=0,Oe=0,Ue=0,W=0,H=0,z=!1;const B=()=>({modal:document.getElementById("imageModal"),image:document.getElementById("modalImage"),title:document.getElementById("modalTitle"),closeBtn:document.querySelector(".close"),prevBtn:document.querySelector(".prev"),nextBtn:document.querySelector(".next")}),V=(e,t=!0)=>{e.style.transition=t?ge:"none",e.style.transform="translate(0, 0)"},at=()=>{const{modal:e,prevBtn:t,nextBtn:r}=B();e&&(e.addEventListener("touchstart",lt,{passive:!0}),e.addEventListener("touchmove",ut,{passive:!0}),e.addEventListener("touchend",dt),e.addEventListener("click",ct),t==null||t.addEventListener("click",Ye),r==null||r.addEventListener("click",Ze),We())};function ct(e){const{image:t,prevBtn:r,nextBtn:o,title:n}=B();[t,r,o,n].includes(e.target)||Me()}function st(e){const{modal:t,image:r,title:o}=B();V(r,!1),r.src=e.dataset.src||e.src;const n=e.closest(".bloc");if(n){const c=n.querySelector("h3");o.textContent=c?c.textContent:""}We(),M=x.indexOf(e.dataset.src||e.src),document.body.classList.add("modal-open"),t.style.display="flex"}function Me(){const{modal:e,image:t}=B();t.style.transition=ge,t.style.transform=fe.CLOSE.transform,setTimeout(()=>{document.body.classList.remove("modal-open"),e.style.display="none",V(t,!1),W=0,H=0,z=!1},Ne-50)}function lt(e){const{image:t}=B();Oe=e.touches[0].clientX,Ue=e.touches[0].clientY,z=!0,t.style.transition="none"}function ut(e){if(!z)return;const{image:t}=B(),r=e.touches[0].clientX-Oe,o=e.touches[0].clientY-Ue,n=Math.abs(o)>Math.abs(r);W=n?0:r,H=n?Math.max(0,o):0,t.style.transform=`translate(${W}px, ${H}px)`}function dt(){z=!1;const{image:e}=B(),t=W,r=H;Math.abs(r)>Math.abs(t)?r>nt?Me():V(e):t>Te?Ye():t<-Te?Ze():V(e)}function Xe(e){if(x.length===0)return;const{image:t}=B();t.style.transition=ge,t.style.transform=e.transform,setTimeout(()=>{M=(M+e.delta+x.length)%x.length,gt(),mt(),z=!1,W=H=0},Ne),ft(M)}const Ye=()=>Xe(fe.PREV),Ze=()=>Xe(fe.NEXT);function mt(){const{title:e}=B(),t=x[M],r=Array.from(document.querySelectorAll(".bloc")).find(o=>Array.from(o.querySelectorAll(".media img")).some(n=>n.dataset.src===t||n.src===t));if(r){const o=r.querySelector("h3");e.textContent=o?o.textContent:""}}function We(){x=Array.from(document.querySelectorAll(`#${Ie} .media img`)).map(e=>e.dataset.src||e.src)}function gt(){const{image:e}=B();e.src=x[M],V(e,!1)}function ft(e){if(x.length>0){const t=(e-1+x.length)%x.length,r=(e+1)%x.length;ye(x[t]),ye(x[r])}}function ye(e){const t=new Image;t.src=e}const D={ANIMATION:{DEBOUNCE:150},SCORE:{EXACT_MATCH:10,WORD_BOUNDARY:5,WORD_START:3,PARTIAL_MATCH:1,TITLE_MULTIPLIER:3},CATEGORIES:{SEMANTIC:"semantic-colors",RAW:"raw-colors"}},O={currentValue:"",wasCleared:!1},se={ACTIVE_CATEGORY:".category.active",SEARCH_CONTAINER:".search-container",BLOC:".bloc"},ve={searchBar:document.getElementById("search-bar"),fixedSearchBar:document.getElementById("fixedSearchBar"),clearButton:document.getElementById("clearSearch"),clearButtonFixed:document.getElementById("clearFixedSearch"),searchButton:document.getElementById("searchButton")},vt=e=>e===D.CATEGORIES.SEMANTIC?D.CATEGORIES.RAW:D.CATEGORIES.SEMANTIC;function ht(){const{searchBar:e,fixedSearchBar:t,clearButton:r,clearButtonFixed:o}=ve,n=a=>{const s=a.target.value;O.currentValue=s,O.wasCleared=!1,yt(s),te(a.target,s);const l=a.target===e?t:e;l.value=s,te(l,s)};[e,t].forEach(a=>{a&&a.addEventListener("input",n)});const c=a=>{O.currentValue="",O.wasCleared=!0,[e,t].forEach(s=>{s.value="",te(s,"")}),he(""),a.focus()};[{button:r,input:e},{button:o,input:t}].forEach(({button:a,input:s})=>{a==null||a.addEventListener("click",()=>c(s))})}function It(){const{searchButton:e,fixedSearchBar:t,clearButtonFixed:r}=ve;e.addEventListener("click",()=>{const o=t.classList.contains("hidden");t.classList.toggle("hidden",!o),t.classList.toggle("show",o),o?(t.focus(),r.style.display=t.value.length>0?"block":"none"):r.style.display="none"})}function te(e,t){const r=ve[e.id==="search-bar"?"clearButton":"clearButtonFixed"],o=t.length>0&&(e.id!=="fixedSearchBar"||e.classList.contains("show"));r.style.display=o?"block":"none"}const X=document.getElementById("fixedSearchBar");X&&(X.addEventListener("focus",()=>{X.dataset.isFocused="true"}),X.addEventListener("blur",()=>{X.dataset.isFocused="false"}));const pt=()=>{var e;return((e=document.getElementById("fixedSearchBar"))==null?void 0:e.dataset.isFocused)==="true"};function Et(e){return e.replace(/([^aeiou])ies$/,"$1y").replace(/([^aeiou])s$/,"$1").replace(/e?s$/,"")}function le(e){return e?e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\s]/g,"").replace(/\s+/g," ").trim().split(" ").map(t=>Et(t)).join(" "):""}function St(e,t){let r;return(...o)=>(clearTimeout(r),new Promise(n=>{r=setTimeout(()=>n(e(...o)),t)}))}const ue={blocks:null,container:null,getBlocks(){const e=document.querySelector(se.ACTIVE_CATEGORY).id;return document.querySelectorAll(`#${e} ${se.BLOC}`)},getContainer(){const e=document.querySelector(".category.active").id;return document.getElementById(e)},clearCache(){this.blocks=null,this.container=null}};function xe(e,t){if(!t)return e;const r=le(t),o=new RegExp(`(${r})`,"gi");return e.replace(o,"<mark>$1</mark>")}function be(e,t){const r=le(e),o=le(t),n=r.split(" "),c=o.split(" ");let a=0;return c.forEach(s=>{if(n.indexOf(s)!==-1){a+=D.SCORE.EXACT_MATCH;return}if(new RegExp(`\\b${s}\\b`).test(r)){a+=D.SCORE.WORD_BOUNDARY;return}if(n.some(v=>v.startsWith(s))){a+=D.SCORE.WORD_START;return}n.some(v=>v.includes(s))&&(a+=D.SCORE.PARTIAL_MATCH)}),a}function He(e){const t=Array.from(e.children);t.sort((r,o)=>{const n=r.querySelector("h3").textContent.replace(/(\d+)/,(a,s)=>String(s).padStart(10,"0")),c=o.querySelector("h3").textContent.replace(/(\d+)/,(a,s)=>String(s).padStart(10,"0"));return n.localeCompare(c)}),t.forEach(r=>{e.appendChild(r)})}function he(e){const t=document.querySelector(".category.active").id,r=vt(t),o=ue.getBlocks(),n=document.querySelectorAll(`#${r} .bloc`),c=ue.getContainer();if(o.forEach(l=>{l.style.display="none"}),n.forEach(l=>{l.style.display="none"}),!e){o.forEach(l=>{l.style.display="flex",l.querySelector("h3").innerHTML=l.dataset.originalTitle||l.querySelector("h3").textContent,l.querySelector(".description").innerHTML=l.dataset.originalDescription||l.querySelector(".description").textContent}),He(c),q("");return}const a={active:[],other:[]};o.forEach(l=>{Re(l,e,a.active)}),n.forEach(l=>{Re(l,e,a.other)}),a.active.sort((l,v)=>v.score-l.score),a.active.forEach(({block:l})=>{l.style.display="flex",c.appendChild(l)});const s=a.other.length>0?`Found ${a.other.length} matching result${a.other.length===1?"":"s"} in ${r.replace("-"," ")}`:"";q(s)}function Re(e,t,r){e.dataset.originalTitle||(e.dataset.originalTitle=e.querySelector("h3").textContent,e.dataset.originalDescription=e.querySelector(".description").textContent);const o=e.dataset.originalTitle,n=e.dataset.originalDescription,c=be(o,t)*D.SCORE.TITLE_MULTIPLIER,a=be(n,t),s=c+a;s>0&&(e.querySelector("h3").innerHTML=xe(e.dataset.originalTitle,t),e.querySelector(".description").innerHTML=xe(e.dataset.originalDescription,t),r.push({block:e,score:s}))}function q(e){let t=document.getElementById("searchSubtext");t||(t=document.createElement("div"),t.id="searchSubtext",t.classList.add("search-subtext"),document.querySelector(se.SEARCH_CONTAINER).appendChild(t)),t.textContent=e,e?t.classList.add("visible"):t.classList.remove("visible")}function Tt(e){const t=document.getElementById(e);document.querySelectorAll(`#${e} .bloc`).forEach(o=>{o.style.display="flex",o.dataset.originalTitle&&(o.querySelector("h3").innerHTML=o.dataset.originalTitle,o.querySelector(".description").innerHTML=o.dataset.originalDescription)}),He(t)}const yt=St(he,D.ANIMATION.DEBOUNCE),xt=()=>{const e=t=>{if(ue.clearCache(),O.wasCleared||!O.currentValue)Tt(t.detail.category),q("");else{he(O.currentValue);const r=document.getElementById("searchSubtext").textContent;q(r)}};return ht(),It(),document.addEventListener("categoryChange",e),()=>{document.removeEventListener("categoryChange",e)}},bt=400,Rt=["jpg","jpeg","png","gif","webp"],Ct=["mp4","webm"],At={rootMargin:"400px 0px"},Ve=e=>e.split(".").pop().toLowerCase(),Bt=e=>Rt.includes(Ve(e)),Lt=e=>Ct.includes(Ve(e));let Ie="semantic-colors";function Dt(){at(),xt(),wt(),Gt()}function Ce(e){const t=document.querySelectorAll(".category"),r=document.querySelectorAll(".category-button");t.forEach(o=>{o.classList.remove("active")}),document.getElementById(e).classList.add("active"),r.forEach(o=>{o.classList.remove("active"),o.dataset.category===e&&o.classList.add("active")}),document.dispatchEvent(new CustomEvent("categoryChange",{detail:{category:e}})),Ie=e}function wt(){Ce(Ie),document.querySelectorAll(".category-button").forEach(t=>{t.addEventListener("click",()=>{Ce(t.dataset.category)})})}async function Gt(){try{const e=await fetch("data.json",{cache:"default"});if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);const t=await e.json();Ae(t.semanticColors,"semantic-colors"),Ae(t.rawColors,"raw-colors")}catch(e){console.error("Error while loading JSON data:",e)}}function ze(e){const t=e.querySelector(".media"),r=e.querySelector(".description"),o=e.querySelector("h3"),n=e.querySelector(".id");function c(){const s=e.scrollHeight>bt;e.classList.toggle("has-hidden-content",s)}c();const a=new ResizeObserver(c);a.observe(t),a.observe(r),a.observe(o),a.observe(n)}function Ae(e,t){const r=document.getElementById(t);if(!r){console.warn(`Container with id "${t}" not found. Skipping rendering.`);return}r.innerHTML="";const o=[...e].sort((c,a)=>{const s=c.title.replace(/(\d+)/,(v,T)=>String(T).padStart(10,"0")),l=a.title.replace(/(\d+)/,(v,T)=>String(T).padStart(10,"0"));return s.localeCompare(l)}),n=new IntersectionObserver(c=>{c.forEach(a=>{if(a.isIntersecting){const s=a.target;s.src=s.dataset.src,s.tagName==="VIDEO"&&s.load(),n.unobserve(s)}})},At);o.forEach(c=>{const a=Ft(c,n);r.appendChild(a),ze(a)})}function Ft(e,t){const r=document.createElement("div");r.classList.add("bloc"),r.dataset.title=e.title.toLowerCase(),r.dataset.description=e.description.toLowerCase();const o=document.createElement("h3");o.textContent=e.title,r.appendChild(o);const n=document.createElement("p");n.classList.add("description"),n.textContent=e.description,r.appendChild(n);const c=document.createElement("div");c.classList.add("media"),e.images.forEach(T=>{if(Bt(T)){const d=document.createElement("img");d.dataset.src=T,d.alt=e.title,d.loading="lazy",c.appendChild(d),t.observe(d)}else if(Lt(T)){const d=document.createElement("video");d.dataset.src=T,d.controls=!0,d.preload="none",d.setAttribute("playsinline","true"),c.appendChild(d),t.observe(d)}}),r.appendChild(c);const a=document.createElement("p");a.classList.add("id"),a.textContent=`ID: ${e.id}`,r.appendChild(a);const s=document.createElement("div");s.classList.add("bottom-banner"),r.appendChild(s);const l=document.createElement("button");l.classList.add("toggle-button");const v=document.createElement("span");return v.classList.add("material-symbols-rounded"),v.textContent="keyboard_arrow_down",l.appendChild(v),l.appendChild(document.createTextNode(" More")),l.onclick=()=>Nt(r,l),r.appendChild(l),r}function _t(e,t){e.innerHTML=`
        <span class="material-symbols-rounded">
            ${t?"keyboard_arrow_up":"keyboard_arrow_down"}
        </span>
        ${t?" Less":" More"}`}function Nt(e,t){const r=e.classList.contains("expanded");e.classList.toggle("expanded"),r?ze(e):e.classList.remove("has-hidden-content"),_t(t,e.classList.contains("expanded"))}document.addEventListener("click",e=>{e.target.matches(".media img")&&st(e.target)});const Ot=Object.assign({"/Docs/00-theme-docs.md":it,"/Docs/01-font-docs.md":ot}),re=Object.entries(Ot).sort(([e],[t])=>e.localeCompare(t)).map(([e,t])=>{const r=e.match(/\/Docs\/(.+?)\.md$/)[1],o=r.replace(/^\d+-/,"").replace(/-/g," ").replace(/\b\w/g,n=>n.toUpperCase());return{name:r,title:o,url:t}});function Gr(e){const t=document.getElementById("toast");t&&(t.innerHTML=e,t.classList.add("show"),setTimeout(()=>t.classList.remove("show"),2e3))}function Ut(){var c,a,s,l,v,T;const e=document.getElementById("appSidebar");if(!e)return;const t={menuBtn:document.getElementById("menuButton"),closeBtn:document.getElementById("sidebarClose"),overlay:document.getElementById("sidebarOverlay"),docsToggle:document.getElementById("docsMenuToggle"),docsSubmenu:document.getElementById("docsSubmenu")};if(t.docsSubmenu&&re.length){const d=window.location.pathname;let E="./";d.includes("/Docs/")||d.includes("/Validator/")||d.includes("/Templates/")||d.includes("/About/")?d.includes("/Docs/")?E="./":E="../Docs/":E="./Docs/",t.docsSubmenu.innerHTML=re.map(L=>`<li><a href="${E}?page=${L.name}" data-doc-link="${L.name}">${L.title}</a></li>`).join("")}const r=d=>{var E,L;(L=(E=t.docsSubmenu)==null?void 0:E.querySelectorAll("a[data-doc-link]"))==null||L.forEach(P=>{const Se=P.dataset.docLink===d;P.classList.toggle("active",Se),Se?P.setAttribute("aria-current","page"):P.removeAttribute("aria-current")})};if(location.pathname.includes("/Docs/")){const d=new URLSearchParams(location.search).get("page")||((c=re[0])==null?void 0:c.name);r(d)}else r(null);const o=d=>{var E;e.classList.toggle("open",d),(E=t.overlay)==null||E.classList.toggle("active",d),document.body.style.overflow=d?"hidden":""};(a=t.menuBtn)==null||a.addEventListener("click",d=>{d.stopPropagation(),o(!0)}),(s=t.closeBtn)==null||s.addEventListener("click",()=>o(!1)),(l=t.overlay)==null||l.addEventListener("click",()=>o(!1)),(v=t.docsSubmenu)==null||v.addEventListener("click",d=>{const E=d.target.closest("a[data-doc-link]");E&&window.location.pathname.includes("/Docs/")&&(d.preventDefault(),window.dispatchEvent(new CustomEvent("navigate-doc",{detail:{page:E.dataset.docLink}})),r(E.dataset.docLink),window.innerWidth<1024&&o(!1))});const n=(d=!1)=>{const E=t.docsSubmenu.classList.contains("open"),L=d||!E;t.docsSubmenu.classList.toggle("open",L),t.docsToggle.classList.toggle("expanded",L)};(T=t.docsToggle)==null||T.addEventListener("click",()=>n()),(location.pathname.includes("/Docs/")||location.search.includes("page="))&&n(!0)}function Mt(){const e=document.querySelector(".fixed-banner"),t=document.getElementById("backToTopButton");let r=window.scrollY;const o=()=>{const n=window.scrollY,c=n>r;r=n,t&&(t.style.display=n>400?"block":"none"),e&&(n>15&&!e.classList.contains("show")?(e.classList.remove("hide"),e.classList.add("show")):n<=15&&e.classList.contains("show")&&!pt()&&!c&&(e.classList.remove("show"),e.classList.add("hide")))};window.addEventListener("scroll",o),t==null||t.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"})),o()}function Xt(){const e=document.getElementById("fluidToggleButton"),t=document.querySelector("canvas");if(!e||!t)return;const r=localStorage.getItem("fluidEnabled")==="true",o=n=>{t.style.display=n?"block":"none",e.classList.toggle("active",n),document.body.classList.toggle("fluid-enabled",n)};o(r),e.addEventListener("click",()=>{const n=t.style.display==="none";localStorage.setItem("fluidEnabled",n),o(n),n&&window.location.reload()})}window.onload=()=>{var e;Mt(),Ut(),Xt(),(e=document.getElementById("whatsthat"))==null||e.addEventListener("click",t=>{t.preventDefault(),window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ","_blank")}),["/","/index.html","/Bunny-Theme-Keys/"].includes(window.location.pathname)&&Dt()};const Yt=localStorage.getItem("fluidEnabled")==="true";let g=document.createElement("canvas");g.style.display=Yt?"block":"none";document.body.appendChild(g);qe();let u={SIM_RESOLUTION:128,DYE_RESOLUTION:1024,DENSITY_DISSIPATION:2.7,VELOCITY_DISSIPATION:.3,PRESSURE:.8,PRESSURE_ITERATIONS:20,CURL:0,SPLAT_RADIUS:.05,SPLAT_FORCE:6e3,SHADING:!0,FIXED_COLOR:{r:.2,g:.01,b:.4},BACK_COLOR:{r:0,g:0,b:0},BLOOM:!0,BLOOM_ITERATIONS:5,BLOOM_RESOLUTION:256,BLOOM_INTENSITY:.05,BLOOM_THRESHOLD:1,BLOOM_SOFT_KNEE:.7,SUNRAYS:!0,SUNRAYS_RESOLUTION:196,SUNRAYS_WEIGHT:.3};function ee(){this.id=-1,this.texcoordX=0,this.texcoordY=0,this.prevTexcoordX=0,this.prevTexcoordY=0,this.deltaX=0,this.deltaY=0,this.down=!1,this.moved=!1,this.color=[30,0,300]}let b=[],Be=[];b.push(new ee);const{gl:i,ext:y}=Zt(g);Ht()&&(u.SPLAT_RADIUS=.15,u.DYE_RESOLUTION=384,u.SUNRAYS=!1,u.SHADING=!1,u.BLOOM=!1);function Zt(e){const t={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1};let r=e.getContext("webgl2",t);const o=!!r;o||(r=e.getContext("webgl",t)||e.getContext("experimental-webgl",t));let n,c;o?(r.getExtension("EXT_color_buffer_float"),c=r.getExtension("OES_texture_float_linear")):(n=r.getExtension("OES_texture_half_float"),c=r.getExtension("OES_texture_half_float_linear")),r.clearColor(0,0,0,1);const a=o?r.HALF_FLOAT:n.HALF_FLOAT_OES;let s,l,v;return o?(s=_(r,r.RGBA16F,r.RGBA,a),l=_(r,r.RG16F,r.RG,a),v=_(r,r.R16F,r.RED,a)):(s=_(r,r.RGBA,r.RGBA,a),l=_(r,r.RGBA,r.RGBA,a),v=_(r,r.RGBA,r.RGBA,a)),{gl:r,ext:{formatRGBA:s,formatRG:l,formatR:v,halfFloatTexType:a,supportLinearFiltering:c}}}function _(e,t,r,o){if(!Wt(e,t,r,o))switch(t){case e.R16F:return _(e,e.RG16F,e.RG,o);case e.RG16F:return _(e,e.RGBA16F,e.RGBA,o);default:return null}return{internalFormat:t,format:r}}function Wt(e,t,r,o){let n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,t,4,4,0,r,o,null);let c=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,c),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.checkFramebufferStatus(e.FRAMEBUFFER)==e.FRAMEBUFFER_COMPLETE}function Ht(){return"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0||/Mobi|Android/i.test(navigator.userAgent)}class Vt{constructor(t,r){this.vertexShader=t,this.fragmentShaderSource=r,this.programs=[],this.activeProgram=null,this.uniforms=[]}setKeywords(t){let r=0;for(let n=0;n<t.length;n++)r+=wr(t[n]);let o=this.programs[r];if(o==null){let n=h(i.FRAGMENT_SHADER,this.fragmentShaderSource,t);o=Pe(this.vertexShader,n),this.programs[r]=o}o!=this.activeProgram&&(this.uniforms=Je(o),this.activeProgram=o)}bind(){i.useProgram(this.activeProgram)}}class I{constructor(t,r){this.uniforms={},this.program=Pe(t,r),this.uniforms=Je(this.program)}bind(){i.useProgram(this.program)}}function Pe(e,t){let r=i.createProgram();return i.attachShader(r,e),i.attachShader(r,t),i.linkProgram(r),i.getProgramParameter(r,i.LINK_STATUS)||console.trace(i.getProgramInfoLog(r)),r}function Je(e){let t=[],r=i.getProgramParameter(e,i.ACTIVE_UNIFORMS);for(let o=0;o<r;o++){let n=i.getActiveUniform(e,o).name;t[n]=i.getUniformLocation(e,n)}return t}function h(e,t,r){t=zt(t,r);const o=i.createShader(e);return i.shaderSource(o,t),i.compileShader(o),i.getShaderParameter(o,i.COMPILE_STATUS)||console.trace(i.getShaderInfoLog(o)),o}function zt(e,t){if(t==null)return e;let r="";return t.forEach(o=>{r+="#define "+o+`
`}),r+e}const p=h(i.VERTEX_SHADER,`
    precision highp float;

    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`),Pt=h(i.VERTEX_SHADER,`
    precision highp float;

    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        float offset = 1.33333333;
        vL = vUv - texelSize * offset;
        vR = vUv + texelSize * offset;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`),Jt=h(i.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform sampler2D uTexture;

    void main () {
        vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
        sum += texture2D(uTexture, vL) * 0.35294117;
        sum += texture2D(uTexture, vR) * 0.35294117;
        gl_FragColor = sum;
    }
`),jt=h(i.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        gl_FragColor = texture2D(uTexture, vUv);
    }
`),Kt=h(i.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;

    void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
    }
`),kt=h(i.FRAGMENT_SHADER,`
    precision mediump float;

    uniform vec4 color;

    void main () {
        gl_FragColor = color;
    }
`),qt=h(i.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float aspectRatio;

    #define SCALE 25.0

    void main () {
        vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));
        float v = mod(uv.x + uv.y, 2.0);
        v = v * 0.1 + 0.8;
        gl_FragColor = vec4(vec3(v), 1.0);
    }
`),Qt=`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform sampler2D uBloom;
    uniform sampler2D uSunrays;
    uniform sampler2D uDithering;
    uniform vec2 ditherScale;
    uniform vec2 texelSize;

    vec3 linearToGamma (vec3 color) {
        color = max(color, vec3(0));
        return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
    }

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;

    #ifdef SHADING
        vec3 lc = texture2D(uTexture, vL).rgb;
        vec3 rc = texture2D(uTexture, vR).rgb;
        vec3 tc = texture2D(uTexture, vT).rgb;
        vec3 bc = texture2D(uTexture, vB).rgb;

        float dx = length(rc) - length(lc);
        float dy = length(tc) - length(bc);

        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);

        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
        c *= diffuse;
    #endif

    #ifdef BLOOM
        vec3 bloom = texture2D(uBloom, vUv).rgb;
    #endif

    #ifdef SUNRAYS
        float sunrays = texture2D(uSunrays, vUv).r;
        c *= sunrays;
    #ifdef BLOOM
        bloom *= sunrays;
    #endif
    #endif

    #ifdef BLOOM
        float noise = texture2D(uDithering, vUv * ditherScale).r;
        noise = noise * 2.0 - 1.0;
        bloom += noise / 255.0;
        bloom = linearToGamma(bloom);
        c += bloom;
    #endif

        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a);
    }
`,$t=h(i.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform vec3 curve;
    uniform float threshold;

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
        float br = max(c.r, max(c.g, c.b));
        float rq = clamp(br - curve.x, 0.0, curve.y);
        rq = curve.z * rq * rq;
        c *= max(rq, br - threshold) / max(br, 0.0001);
        gl_FragColor = vec4(c, 0.0);
    }
`),er=h(i.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;

    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum;
    }
`),tr=h(i.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform float intensity;

    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum * intensity;
    }
`),rr=h(i.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        vec4 c = texture2D(uTexture, vUv);
        float br = max(c.r, max(c.g, c.b));
        c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
        gl_FragColor = c;
    }
`),ir=h(i.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float weight;

    #define ITERATIONS 16

    void main () {
        float Density = 0.3;
        float Decay = 0.95;
        float Exposure = 0.7;

        vec2 coord = vUv;
        vec2 dir = vUv - 0.5;

        dir *= 1.0 / float(ITERATIONS) * Density;
        float illuminationDecay = 1.0;

        float color = texture2D(uTexture, vUv).a;

        for (int i = 0; i < ITERATIONS; i++)
        {
            coord -= dir;
            float col = texture2D(uTexture, coord).a;
            color += col * illuminationDecay * weight;
            illuminationDecay *= Decay;
        }

        gl_FragColor = vec4(color * Exposure, 0.0, 0.0, 1.0);
    }
`),or=h(i.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;

    void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
    }
`),nr=h(i.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform vec2 dyeTexelSize;
    uniform float dt;
    uniform float dissipation;

    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv / tsize - 0.5;

        vec2 iuv = floor(st);
        vec2 fuv = fract(st);

        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
    }

    void main () {
    #ifdef MANUAL_FILTERING
        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
        vec4 result = bilerp(uSource, coord, dyeTexelSize);
    #else
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        vec4 result = texture2D(uSource, coord);
    #endif
        float decay = 1.0 + dissipation * dt;
        gl_FragColor = result / decay;
    }`,y.supportLinearFiltering?null:["MANUAL_FILTERING"]),ar=h(i.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;

        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0) { L = -C.x; }
        if (vR.x > 1.0) { R = -C.x; }
        if (vT.y > 1.0) { T = -C.y; }
        if (vB.y < 0.0) { B = -C.y; }

        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
`),cr=h(i.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }
`),sr=h(i.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;

    void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;

        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;

        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity += force * dt;
        velocity = min(max(velocity, -1000.0), 1000.0);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`),lr=h(i.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;

    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
`),ur=h(i.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`),f=(i.bindBuffer(i.ARRAY_BUFFER,i.createBuffer()),i.bufferData(i.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),i.STATIC_DRAW),i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,i.createBuffer()),i.bufferData(i.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),i.STATIC_DRAW),i.vertexAttribPointer(0,2,i.FLOAT,!1,0,0),i.enableVertexAttribArray(0),(e,t=!1)=>{e==null?(i.viewport(0,0,i.drawingBufferWidth,i.drawingBufferHeight),i.bindFramebuffer(i.FRAMEBUFFER,null)):(i.viewport(0,0,e.width,e.height),i.bindFramebuffer(i.FRAMEBUFFER,e.fbo)),t&&(i.clearColor(0,0,0,1),i.clear(i.COLOR_BUFFER_BIT)),i.drawElements(i.TRIANGLES,6,i.UNSIGNED_SHORT,0)});let S,m,de,me,G,pe,N=[],Q,je,Le=fr("../assets/LDR_LLL1_0.png");const Y=new I(Pt,Jt),De=new I(p,jt),ie=new I(p,Kt),we=new I(p,kt);new I(p,qt);const J=new I(p,$t),Z=new I(p,er),j=new I(p,tr),Ge=new I(p,rr),oe=new I(p,ir),w=new I(p,or),R=new I(p,nr),ne=new I(p,ar),ae=new I(p,cr),U=new I(p,sr),K=new I(p,lr),k=new I(p,ur),F=new Vt(p,Qt);function Ke(){let e=$(u.SIM_RESOLUTION),t=$(u.DYE_RESOLUTION);const r=y.halfFloatTexType,o=y.formatRGBA,n=y.formatRG,c=y.formatR,a=y.supportLinearFiltering?i.LINEAR:i.NEAREST;i.disable(i.BLEND),S==null?S=ce(t.width,t.height,o.internalFormat,o.format,r,a):S=Fe(S,t.width,t.height,o.internalFormat,o.format,r,a),m==null?m=ce(e.width,e.height,n.internalFormat,n.format,r,a):m=Fe(m,e.width,e.height,n.internalFormat,n.format,r,a),de=C(e.width,e.height,c.internalFormat,c.format,r,i.NEAREST),me=C(e.width,e.height,c.internalFormat,c.format,r,i.NEAREST),G=ce(e.width,e.height,c.internalFormat,c.format,r,i.NEAREST),dr(),mr()}function dr(){let e=$(u.BLOOM_RESOLUTION);const t=y.halfFloatTexType,r=y.formatRGBA,o=y.supportLinearFiltering?i.LINEAR:i.NEAREST;pe=C(e.width,e.height,r.internalFormat,r.format,t,o),N.length=0;for(let n=0;n<u.BLOOM_ITERATIONS;n++){let c=e.width>>n+1,a=e.height>>n+1;if(c<2||a<2)break;let s=C(c,a,r.internalFormat,r.format,t,o);N.push(s)}}function mr(){let e=$(u.SUNRAYS_RESOLUTION);const t=y.halfFloatTexType,r=y.formatR,o=y.supportLinearFiltering?i.LINEAR:i.NEAREST;Q=C(e.width,e.height,r.internalFormat,r.format,t,o),je=C(e.width,e.height,r.internalFormat,r.format,t,o)}function C(e,t,r,o,n,c){i.activeTexture(i.TEXTURE0);let a=i.createTexture();i.bindTexture(i.TEXTURE_2D,a),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,c),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,c),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),i.texImage2D(i.TEXTURE_2D,0,r,e,t,0,o,n,null);let s=i.createFramebuffer();i.bindFramebuffer(i.FRAMEBUFFER,s),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,a,0),i.viewport(0,0,e,t),i.clear(i.COLOR_BUFFER_BIT);let l=1/e,v=1/t;return{texture:a,fbo:s,width:e,height:t,texelSizeX:l,texelSizeY:v,attach(T){return i.activeTexture(i.TEXTURE0+T),i.bindTexture(i.TEXTURE_2D,a),T}}}function ce(e,t,r,o,n,c){let a=C(e,t,r,o,n,c),s=C(e,t,r,o,n,c);return{width:e,height:t,texelSizeX:a.texelSizeX,texelSizeY:a.texelSizeY,get read(){return a},set read(l){a=l},get write(){return s},set write(l){s=l},swap(){let l=a;a=s,s=l}}}function gr(e,t,r,o,n,c,a){let s=C(t,r,o,n,c,a);return De.bind(),i.uniform1i(De.uniforms.uTexture,e.attach(0)),f(s),s}function Fe(e,t,r,o,n,c,a){return e.width==t&&e.height==r||(e.read=gr(e.read,t,r,o,n,c,a),e.write=C(t,r,o,n,c,a),e.width=t,e.height=r,e.texelSizeX=1/t,e.texelSizeY=1/r),e}function fr(e){let t=i.createTexture();i.bindTexture(i.TEXTURE_2D,t),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.REPEAT),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.REPEAT),i.texImage2D(i.TEXTURE_2D,0,i.RGB,1,1,0,i.RGB,i.UNSIGNED_BYTE,new Uint8Array([255,255,255]));let r={texture:t,width:1,height:1,attach(n){return i.activeTexture(i.TEXTURE0+n),i.bindTexture(i.TEXTURE_2D,t),n}},o=new Image;return o.onload=()=>{r.width=o.width,r.height=o.height,i.bindTexture(i.TEXTURE_2D,t),i.texImage2D(i.TEXTURE_2D,0,i.RGB,i.RGB,i.UNSIGNED_BYTE,o)},o.src=e,r}function vr(){let e=[];u.SHADING&&e.push("SHADING"),u.BLOOM&&e.push("BLOOM"),u.SUNRAYS&&e.push("SUNRAYS"),F.setKeywords(e)}vr();Ke();Qe(parseInt(Math.random()*20)+5);let _e=Date.now();ke();function ke(){const e=hr();qe()&&Ke(),Ir(),pr(e),Er(null),requestAnimationFrame(ke)}function hr(){let e=Date.now(),t=(e-_e)/1e3;return t=Math.min(t,.016666),_e=e,t}function qe(){if(!g)return;let e=A(g.clientWidth),t=A(g.clientHeight);return g.width!=e||g.height!=t?(g.width=e,g.height=t,!0):!1}function Ir(){Be.length>0&&Qe(Be.pop()),b.forEach(e=>{e.moved&&(e.moved=!1,Rr(e))})}function pr(e){i.disable(i.BLEND),ae.bind(),i.uniform2f(ae.uniforms.texelSize,m.texelSizeX,m.texelSizeY),i.uniform1i(ae.uniforms.uVelocity,m.read.attach(0)),f(me),U.bind(),i.uniform2f(U.uniforms.texelSize,m.texelSizeX,m.texelSizeY),i.uniform1i(U.uniforms.uVelocity,m.read.attach(0)),i.uniform1i(U.uniforms.uCurl,me.attach(1)),i.uniform1f(U.uniforms.curl,u.CURL),i.uniform1f(U.uniforms.dt,e),f(m.write),m.swap(),ne.bind(),i.uniform2f(ne.uniforms.texelSize,m.texelSizeX,m.texelSizeY),i.uniform1i(ne.uniforms.uVelocity,m.read.attach(0)),f(de),ie.bind(),i.uniform1i(ie.uniforms.uTexture,G.read.attach(0)),i.uniform1f(ie.uniforms.value,u.PRESSURE),f(G.write),G.swap(),K.bind(),i.uniform2f(K.uniforms.texelSize,m.texelSizeX,m.texelSizeY),i.uniform1i(K.uniforms.uDivergence,de.attach(0));for(let r=0;r<u.PRESSURE_ITERATIONS;r++)i.uniform1i(K.uniforms.uPressure,G.read.attach(1)),f(G.write),G.swap();k.bind(),i.uniform2f(k.uniforms.texelSize,m.texelSizeX,m.texelSizeY),i.uniform1i(k.uniforms.uPressure,G.read.attach(0)),i.uniform1i(k.uniforms.uVelocity,m.read.attach(1)),f(m.write),m.swap(),R.bind(),i.uniform2f(R.uniforms.texelSize,m.texelSizeX,m.texelSizeY),y.supportLinearFiltering||i.uniform2f(R.uniforms.dyeTexelSize,m.texelSizeX,m.texelSizeY);let t=m.read.attach(0);i.uniform1i(R.uniforms.uVelocity,t),i.uniform1i(R.uniforms.uSource,t),i.uniform1f(R.uniforms.dt,e),i.uniform1f(R.uniforms.dissipation,u.VELOCITY_DISSIPATION),f(m.write),m.swap(),y.supportLinearFiltering||i.uniform2f(R.uniforms.dyeTexelSize,S.texelSizeX,S.texelSizeY),i.uniform1i(R.uniforms.uVelocity,m.read.attach(0)),i.uniform1i(R.uniforms.uSource,S.read.attach(1)),i.uniform1f(R.uniforms.dissipation,u.DENSITY_DISSIPATION),f(S.write),S.swap()}function Er(e){u.BLOOM&&yr(S.read,pe),u.SUNRAYS&&(xr(S.read,S.write,Q),br(Q,je,1)),i.blendFunc(i.ONE,i.ONE_MINUS_SRC_ALPHA),i.enable(i.BLEND),Sr(e,Lr(u.BACK_COLOR)),Tr(e)}function Sr(e,t){we.bind(),i.uniform4f(we.uniforms.color,t.r,t.g,t.b,1),f(e)}function Tr(e){let t=i.drawingBufferWidth,r=i.drawingBufferHeight;if(F.bind(),u.SHADING&&i.uniform2f(F.uniforms.texelSize,1/t,1/r),i.uniform1i(F.uniforms.uTexture,S.read.attach(0)),u.BLOOM){i.uniform1i(F.uniforms.uBloom,pe.attach(1)),i.uniform1i(F.uniforms.uDithering,Le.attach(2));let o=Dr(Le,t,r);i.uniform2f(F.uniforms.ditherScale,o.x,o.y)}u.SUNRAYS&&i.uniform1i(F.uniforms.uSunrays,Q.attach(3)),f(e)}function yr(e,t){if(N.length<2)return;let r=t;i.disable(i.BLEND),J.bind();let o=u.BLOOM_THRESHOLD*u.BLOOM_SOFT_KNEE+1e-4,n=u.BLOOM_THRESHOLD-o,c=o*2,a=.25/o;i.uniform3f(J.uniforms.curve,n,c,a),i.uniform1f(J.uniforms.threshold,u.BLOOM_THRESHOLD),i.uniform1i(J.uniforms.uTexture,e.attach(0)),f(r),Z.bind();for(let s=0;s<N.length;s++){let l=N[s];i.uniform2f(Z.uniforms.texelSize,r.texelSizeX,r.texelSizeY),i.uniform1i(Z.uniforms.uTexture,r.attach(0)),f(l),r=l}i.blendFunc(i.ONE,i.ONE),i.enable(i.BLEND);for(let s=N.length-2;s>=0;s--){let l=N[s];i.uniform2f(Z.uniforms.texelSize,r.texelSizeX,r.texelSizeY),i.uniform1i(Z.uniforms.uTexture,r.attach(0)),i.viewport(0,0,l.width,l.height),f(l),r=l}i.disable(i.BLEND),j.bind(),i.uniform2f(j.uniforms.texelSize,r.texelSizeX,r.texelSizeY),i.uniform1i(j.uniforms.uTexture,r.attach(0)),i.uniform1f(j.uniforms.intensity,u.BLOOM_INTENSITY),f(t)}function xr(e,t,r){i.disable(i.BLEND),Ge.bind(),i.uniform1i(Ge.uniforms.uTexture,e.attach(0)),f(t),oe.bind(),i.uniform1f(oe.uniforms.weight,u.SUNRAYS_WEIGHT),i.uniform1i(oe.uniforms.uTexture,t.attach(0)),f(r)}function br(e,t,r){Y.bind();for(let o=0;o<r;o++)i.uniform2f(Y.uniforms.texelSize,e.texelSizeX,0),i.uniform1i(Y.uniforms.uTexture,e.attach(0)),f(t),i.uniform2f(Y.uniforms.texelSize,0,e.texelSizeY),i.uniform1i(Y.uniforms.uTexture,t.attach(0)),f(e)}function Rr(e){let t=e.deltaX*u.SPLAT_FORCE,r=e.deltaY*u.SPLAT_FORCE;$e(e.texcoordX,e.texcoordY,t,r,e.color)}function Qe(e){for(let t=0;t<e;t++){const r=Ee();r.r*=10,r.g*=10,r.b*=10;const o=Math.random(),n=Math.random(),c=1e3*(Math.random()-.5),a=1e3*(Math.random()-.5);$e(o,n,c,a,r)}}function $e(e,t,r,o,n){w.bind(),i.uniform1i(w.uniforms.uTarget,m.read.attach(0)),i.uniform1f(w.uniforms.aspectRatio,g.width/g.height),i.uniform2f(w.uniforms.point,e,t),i.uniform3f(w.uniforms.color,r,o,0),i.uniform1f(w.uniforms.radius,Cr(u.SPLAT_RADIUS/100)),f(m.write),m.swap(),i.uniform1i(w.uniforms.uTarget,S.read.attach(0)),i.uniform3f(w.uniforms.color,n.r,n.g,n.b),f(S.write),S.swap()}function Cr(e){let t=g.width/g.height;return t>1&&(e*=t),e}g.addEventListener("mousedown",e=>{let t=A(e.offsetX),r=A(e.offsetY),o=b.find(n=>n.id==-1);o==null&&(o=new ee,b.push(o)),et(o,-1,t,r)});window.addEventListener("mousemove",e=>{let t=A(e.clientX),r=A(e.clientY),o=b[0];o||(o=new ee,b.push(o)),tt(o,t,r)});window.addEventListener("mouseup",()=>{rt(b[0])});window.addEventListener("touchstart",e=>{e.target===g&&e.preventDefault();const t=e.targetTouches;for(;t.length>=b.length;)b.push(new ee);for(let r=0;r<t.length;r++){let o=A(t[r].pageX),n=A(t[r].pageY-window.scrollY);et(b[r+1],t[r].identifier,o,n)}},{passive:!1});window.addEventListener("touchmove",e=>{e.target===g&&e.preventDefault();const t=e.targetTouches;for(let r=0;r<t.length;r++){let o=b[r+1];if(!o.down)continue;let n=A(t[r].pageX),c=A(t[r].pageY-window.scrollY);tt(o,n,c)}},{passive:!1});window.addEventListener("touchend",e=>{const t=e.changedTouches;for(let r=0;r<t.length;r++){let o=b.find(n=>n.id==t[r].identifier);o!=null&&rt(o)}});function et(e,t,r,o){e.id=t,e.down=!0,e.moved=!1,e.texcoordX=r/g.width,e.texcoordY=1-o/g.height,e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.deltaX=0,e.deltaY=0,e.color=Ee()}function tt(e,t,r){e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.texcoordX=t/g.width,e.texcoordY=1-r/g.height,e.deltaX=Ar(e.texcoordX-e.prevTexcoordX),e.deltaY=Br(e.texcoordY-e.prevTexcoordY),e.moved=Math.abs(e.deltaX)>0||Math.abs(e.deltaY)>0,e.moved&&(e.color=Ee())}function rt(e){e.down=!1}function Ar(e){let t=g.width/g.height;return t<1&&(e*=t),e}function Br(e){let t=g.width/g.height;return t>1&&(e/=t),e}function Ee(){return{r:u.FIXED_COLOR.r,g:u.FIXED_COLOR.g,b:u.FIXED_COLOR.b}}function Lr(e){return{r:e.r/255,g:e.g/255,b:e.b/255}}function $(e){let t=i.drawingBufferWidth/i.drawingBufferHeight;t<1&&(t=1/t);let r=Math.round(e),o=Math.round(e*t);return i.drawingBufferWidth>i.drawingBufferHeight?{width:o,height:r}:{width:r,height:o}}function Dr(e,t,r){return{x:t/e.width,y:r/e.height}}function A(e){let t=window.devicePixelRatio||1;return Math.floor(e*t)}function wr(e){if(e.length==0)return 0;let t=0;for(let r=0;r<e.length;r++)t=(t<<5)-t+e.charCodeAt(r),t|=0;return t}export{re as d,Gr as s};
