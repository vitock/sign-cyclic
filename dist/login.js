/* minified */
"use strict";var __awaiter=this&&this.__awaiter||function(o,e,t,i){return new(t||(t=Promise))((function(s,l){function r(o){try{a(i.next(o))}catch(o){l(o)}}function n(o){try{a(i.throw(o))}catch(o){l(o)
}}function a(o){var e;o.done?s(o.value):(e=o.value,e instanceof t?e:new t((function(o){o(e)}))).then(r,n)}a((i=i.apply(o,e||[])).next())}))};Object.defineProperty(exports,"__esModule",{value:!0}),
exports.LoginTool=void 0;const tools_1=require("./tools"),db_1=require("./db"),sign_1=require("./sign"),config_1=require("./config");class LoginTool{static test(){tools_1.Tools.DebugLog(22)}
static genUserHash(o,e){o.trim(),e.trim();let t=o+"\f"+tools_1.Tools.md5(e),i=config_1.Config.getConfig("LoginDESKey");return tools_1.Tools.desEnc(t,i)}static login(o,e,t=!0){
return __awaiter(this,void 0,void 0,(function*(){if(!(o&&o.length&&e&&e.length))return Promise.reject();let i=this.genUserHash(o,e);tools_1.Tools.DebugLog("uhash",i)
;let s=config_1.Config.getConfig("loginUrl")+i;try{let o=yield tools_1.Tools.queryUrl(s);tools_1.Tools.DebugLog(o);try{if(1==JSON.parse(o).ok)return void(t&&(yield this.loginUserHash(i),
tools_1.Tools.DebugLog("doSign"),yield this.sighTaskWithUserHash(i)))}catch(o){}}catch(o){}return Promise.reject("error login")}))}static getUserInfo(o){
return __awaiter(this,void 0,void 0,(function*(){try{let e=config_1.Config.getConfig("getUInfo"),t=yield tools_1.Tools.queryUrl(e.replace("_UHASH_",o));return JSON.parse(t)}catch(o){}return null}))}
static loginUserHash(o,e=0,t=!0){var i,s,l;return __awaiter(this,void 0,void 0,(function*(){if(null==o||o.length<5)yield Promise.resolve();else{let r=config_1.Config.getConfig("loginUrl")+o
;tools_1.Tools.DebugLog(r);let n=null;try{let e=yield tools_1.Tools.queryUrl(r,5e3);n=JSON.parse(e),tools_1.Tools.DebugLog(n);let t=config_1.Config.getConfig("getUInfo");try{
let e=yield tools_1.Tools.queryUrl(t.replace("_UHASH_",o)),r=JSON.parse(e);if(tools_1.Tools.DebugLog(r),
(null===(i=null==r?void 0:r.userinfo)||void 0===i?void 0:i.nickname)||(null===(s=null==r?void 0:r.userinfo)||void 0===s?void 0:s.userid))try{
yield db_1.DbQuery.shared().setdata(o,333,tools_1.Tools.getBeijingTimeFromDate(),null===(l=null==r?void 0:r.userinfo)||void 0===l?void 0:l.nickname,e)}catch(o){tools_1.Tools.DebugLog(o,339)
}else tools_1.Tools.DebugLog("----------",null==r?void 0:r.msg),/密码|永久封禁/.test(null==r?void 0:r.msg)&&(yield db_1.DbQuery.shared().setdata(o,334,"error"))}catch(o){}}catch(t){
if("ECONNABORTED"===t.code){if(e&&e>1)return tools_1.Tools.DebugLog(t),void tools_1.Tools.DebugLog("timeOut 忽略");tools_1.Tools.DebugLog("timeOut 重试"),yield tools_1.Tools.wait(1);try{
yield this.loginUserHash(o,e?e+1:0)}catch(o){}}}1==n.ok?t&&(yield this.sighTaskWithUserHash(o)):yield Promise.reject(o)}}))}static sighTaskWithUserHash(o){
return __awaiter(this,void 0,void 0,(function*(){try{let e=new sign_1.SignTool(o,"",!1,!1);if(Math.random()<.5){let o=e.taskUrls.slice(1,e.taskUrls.length);o=tools_1.Tools.shuffle(o),
o=o.slice(0,Math.ceil(o.length/2)),e.taskUrls=e.taskUrls.slice(0,1).concat(o),tools_1.Tools.DebugLog(e.taskUrls)}yield e.travisTaskBegin()}catch(o){}}))}static beginSignOtherTask(){
return __awaiter(this,void 0,void 0,(function*(){let o=yield db_1.DbQuery.shared().getShortData("f26a205df0d5470062b6440c6110676d",335);tools_1.Tools.DebugLog("a",o);let e=parseInt(""+o)
;if(e&&!isNaN(e)){if((new Date).getTime()-e<9e5)return void tools_1.Tools.ReleaseLog("有任务进行",new Date,"\n",new Date(e))}return yield this._beginSignOtherTask()}))}static _beginSignOtherTask(o){
return __awaiter(this,void 0,void 0,(function*(){tools_1.Tools.DebugLog("rowid:",o);try{let o=null,e=0;for(;null==o&&e++<6;)o=yield db_1.DbQuery.shared().getUserhash(),yield tools_1.Tools.wait(5)
;if(0==o.length)return void tools_1.Tools.ReleaseLog("全部完成");yield db_1.DbQuery.shared().setdata("f26a205df0d5470062b6440c6110676d",335,""+(new Date).getTime()),o=tools_1.Tools.shuffle(o);const t=3
;for(let e=0;e<o.length;)try{let i=[],s=0;for(;s++<t&&e<o.length;){const t=o[e];i.push(this.loginUserHash(t)),e++}try{yield Promise.all(i)}catch(o){}yield tools_1.Tools.wait(2*Math.random()),
yield db_1.DbQuery.shared().setdata("f26a205df0d5470062b6440c6110676d",335,""+(new Date).getTime()),yield tools_1.Tools.wait(2*Math.random())}catch(o){}yield this._beginSignOtherTask()}catch(o){}}))}}
exports.LoginTool=LoginTool;