#!/usr/bin/env node
var formatter=function(){function s(t,i){return new Array(i+1).join(t)}function u(t,i){var a=0,o=0,c=typeof i!="undefined"?i:"    ",e="",f=0,n=!1,r=null;for(a=0,o=t.length;a<o;a+=1)switch(r=t.charAt(a),r){case"{":case"[":n?e+=r:(e+=r+`
`+s(c,f+1),f+=1);break;case"}":case"]":n?e+=r:(f-=1,e+=`
`+s(c,f)+r);break;case",":n?e+=r:e+=`,
`+s(c,f);break;case":":n?e+=r:e+=": ";break;case" ":case`
`:case"	":n&&(e+=r);break;case'"':a>0&&t.charAt(a-1)!=="\\"&&(n=!n),e+=r;break;default:e+=r;break}return e}return{formatJson:u}}();typeof require!="undefined"&&typeof exports!="undefined"&&(exports.formatter=formatter);
