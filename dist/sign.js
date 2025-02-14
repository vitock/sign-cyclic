/* minified */
"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,o,i){void 0===i&&(i=o);var s=Object.getOwnPropertyDescriptor(t,o)
;s&&!("get"in s?!t.__esModule:s.writable||s.configurable)||(s={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,i,s)}:function(e,t,o,i){void 0===i&&(i=o),e[i]=t[o]
}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t
}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&__createBinding(t,e,o)
;return __setModuleDefault(t,e),t},__awaiter=this&&this.__awaiter||function(e,t,o,i){return new(o||(o=Promise))((function(s,n){function l(e){try{r(i.next(e))}catch(e){n(e)}}function a(e){try{
r(i.throw(e))}catch(e){n(e)}}function r(e){var t;e.done?s(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(l,a)}r((i=i.apply(e,t||[])).next())}))}
;Object.defineProperty(exports,"__esModule",{value:!0}),exports.SignTool=exports.EncTool=void 0;const tools_1=require("./tools"),Axios=__importStar(require("axios")),config_1=require("./config")
;class EncTool{static getDate2(e){return parseInt(tools_1.Tools.getBeijingTimeFromDate(new Date(e)).substr(8,2))}static parseInt(e){return parseInt(""+e)}static geKK2(e,t){
var o="hd7%b4f8p9)*fd4h5l6|)123/*-+!#$@%^*()_+?>?njidfds[]rfbcvnb3rz/ird|opqqyh487874515/%90hggigadfihklhkopjj`b3hsdfdsf84215456fi15451%q(#@Fzd795hn^Ccl$vK^L%#w$^yr%ETvX#0TaPSRm5)OeG)^fQnn6^%^UTtJI#3EZ@p6^Rf$^!O$(jnkOiBjn3#inhOQQ!aTX8R)9O%#o3zCVxo3tLyVorwYwA^$%^b9Yy$opSEAOOlFBsS^5d^HoF%tJ$dx%3)^q^c^$al%b4I)QHq^#^AlcK^KZFYf81#bL$n@$%j^H(%m^"
;let i=e,s=this.getDate2(e)
;return i=Math.round(i/5e4)*s*3,3==t?o[this.parseInt(i%1e4/1e3)*s]+o[this.parseInt(i%1e3/100)*s]+o[this.parseInt(i%100/10)*s]:8==t?o[this.parseInt(i%1e8/1e7)*s]+o[this.parseInt(i%1e7/1e6)*s]+o[this.parseInt(i%1e6/1e5)*s]+o[this.parseInt(i%1e5/1e4)*s]+o[this.parseInt(i%1e4/1e3)*s]+o[this.parseInt(i%1e3/100)*s]+o[this.parseInt(i%100/10)*s]+o[this.parseInt(i%10)*s]:null
}static gneKK2(e){return"k"+tools_1.Tools.desEnc(this.geKK2(e,3),this.geKK2(e,8))}static geKsK2(e){let t=tools_1.Tools.getBeijingTimeFromDate(new Date(e)).substr(0,19)
;return tools_1.Tools.desEnc(t,this.geKK2(e,8))}static getSign(e){return e||(e=(new Date).getTime()),`timestamp=${e}&${this.gneKK2(e)}=${this.geKsK2(e)}`}}exports.EncTool=EncTool;class SignTool{
travisTaskBegin(){return __awaiter(this,void 0,void 0,(function*(){let e=!0;for(let t=0;t<this.taskUrls.length;t++){const o=this.taskUrls[t];try{
if("string"==typeof o)yield this.signSingleUrl(o);else{}this.isMe?yield tools_1.Tools.wait(3*Math.random()+5):yield tools_1.Tools.wait(Math.random())}catch(t){try{
this.isMe?yield tools_1.Tools.wait(3*Math.random()+15):yield tools_1.Tools.wait(2*Math.random()),"string"==typeof o&&(yield this.signSingleUrl(o))}catch(t){e=!1}}}return e}))}constructor(e,t,o,i){
this.kxName=t||"",this.readKXCookie(),this.hashid=e,this.logs=[],this.failedUrls=[],this.taskUrls=[],this.isMe=null!=o&&o;let s=[];if(e&&e.length>0&&s.push(e),i){
let e=config_1.Config.getConfig("signUrls3");if(e&&e.length)for(let t=0;t<e.length;t++){const o=e[t];o.length>4&&"http"==o.substr(0,4).toLowerCase()&&this.taskUrls.push(o)}}
if(this.hashid&&this.hashid.length>0){let e=config_1.Config.getConfig("templateUrls");for(let t=0;t<e.length;t++){let o=e[t].replace("%@",""+this.hashid);this.taskUrls.push(o)}}}signSingleUrl(e){
return __awaiter(this,void 0,void 0,(function*(){try{let t=""+config_1.Config.getConfig("endTKey"),o=new Date;null==this.signtimestamp&&/_SIGNENC_/.test(e)&&(this.signtimestamp=o.getTime()),
this.signtimestamp&&/_SIGNTAMP_/.test(e)&&(o=new Date(this.signtimestamp));let i=o.getTime()+"",s=tools_1.Tools.getBeijingTimeFromDate(o).substr(0,19),n=tools_1.Tools.desEnc(s,t)
;e=(e=(e=e.replace(/_SIGNTAMP_/g,i)).replace(/_DATEENC_/g,n)).replace(/_SIGNENC_/g,EncTool.getSign(o.getTime())),tools_1.Tools.DebugLog(e);let l=Axios.default.create({timeout:15e3
}),a=new URL(e),r=null;if(a&&a.host){let e=config_1.Config.getConfig("referer");e&&(r=e[a.host])}let g={method:"Get",scheme:a.protocol,path:`${a.pathname}${a.search}`,authority:a.host,
"user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 ithome/rmsdklevel2/day/7.26"},h=null;if(r){let t=""+(new Date).getTime()
;t=t.substr(0,t.length-3),r=r.replace("_STAMPSEC_",t),g.referer=r,h=yield l.get(e,{headers:g})}else h=yield l.get(e);return void((null==h?void 0:h.data)||(e=e.replace("https","http"),l.get(e)))
}catch(e){return tools_1.Tools.DebugLog("zzzzzzzzzzzz",e),Promise.reject(" ------------ Error")}}))}signUrls(e){return __awaiter(this,void 0,void 0,(function*(){
this.logs.push(""+(new Date).toISOString()),this.logs.push("\n");for(let t=0;t<e.length;t++){const o=e[t];try{yield this.signSingleUrl(o)}catch(e){tools_1.Tools.DebugLog(e)}let i=5*Math.random()+3.5
;tools_1.Tools.DebugLog("--------delay------",i),yield tools_1.Tools.wait(i)}this.isMe&&(yield this.signKX())}))}evalJs(jsIn){let js=jsIn;function addEventListener(e,t){tools_1.Tools.DebugLog(e,t),
setTimeout((()=>{t()}),500)}function attachEvent(){}var window={addEventListener:addEventListener,attachEvent:attachEvent},document={cookie:"",addEventListener:addEventListener,attachEvent:attachEvent
},location={href:"http://baid.com"};function setTimeout2(e,t){tools_1.Tools.DebugLog(3333333),"function"==typeof e&&setTimeout((()=>{e()}),t)}function eval2(js){tools_1.Tools.DebugLog("abdddd"),
js=js.replace("setTimeout","setTimeout2"),eval(js)}js=js.replace(/eval/g,"eval2"),setTimeout((()=>{tools_1.Tools.DebugLog(document.cookie)}),1e3);try{eval(js)}catch(e){
tools_1.Tools.DebugLog("😡😡😡😡😡😡😡",e)}return new Promise(((e,t)=>{setTimeout((()=>{tools_1.Tools.DebugLog("xxfasdfasdf"),e(document.cookie)}),1e3)}))}signKX(e){
return __awaiter(this,void 0,void 0,(function*(){let t=config_1.Config.getConfig(this.kxName?"originHead_"+this.kxName:"originHead");this.headers=this.headers||t;var o=this.headers
;SignTool.savedKXCookies?(tools_1.Tools.DebugLog("00"),o.Cookie=SignTool.savedKXCookies):tools_1.Tools.DebugLog("0333");try{let e=config_1.Config.getConfig("signUrl2");tools_1.Tools.DebugLog(o)
;let t=yield Axios.default.create().post(e,null,{headers:o});t&&t.data&&tools_1.Tools.DebugLog(e,t.data)}catch(t){t&&t.response&&t.response.data||tools_1.Tools.ReleaseLog(t)
;let o=t.response.data.replace("<script>","").replace("<\/script>","");o=o.replace(/[\0]/g,"");try{let t=yield this.evalJs(o);if(this.modifyCookie(t),
e&&e>3)return void tools_1.Tools.ReleaseLog("sign  失败");setTimeout((()=>{this.signKX(e?e+1:1)}),1e3)}catch(e){}}}))}saveKxCookieFileName(){return this.kxName?this.kxName+"_pdy.txt":"pdy.txt"}
saveKXCookie(){config_1.Config.saveConfig(SignTool.savedKXCookies,this.saveKxCookieFileName())}readKXCookie(){if(null==SignTool.savedKXCookies)try{
SignTool.savedKXCookies=config_1.Config.readConfig(this.saveKxCookieFileName())}catch(e){}}modifyCookie(e){let t={};{let e=this.headers.Cookie.split(";");for(let o=0;o<e.length;o++){
let i=e[o].split("="),s=i[0];s=s.replace(/\ /g,""),t[s]=i[1]}}{let o=e.split(";");for(let e=0;e<o.length;e++){let i=o[e].split("=");t[i[0]]=i[1]}}let o=[];for(const e in t)o.push(e+"="+t[e])
;this.headers.Cookie=o.join(";"),SignTool.savedKXCookies=this.headers.Cookie,this.saveKXCookie()}}exports.SignTool=SignTool;