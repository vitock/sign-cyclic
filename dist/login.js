/* minified */
"use strict";var __awaiter=this&&this.__awaiter||function(o,e,t,s){return new(t||(t=Promise))((function(i,l){function r(o){try{a(s.next(o))}catch(o){l(o)}}function n(o){try{a(s.throw(o))}catch(o){l(o)
}}function a(o){var e;o.done?i(o.value):(e=o.value,e instanceof t?e:new t((function(o){o(e)}))).then(r,n)}a((s=s.apply(o,e||[])).next())}))};Object.defineProperty(exports,"__esModule",{value:!0}),
exports.LoginTool=void 0;const tools_1=require("./tools"),db_1=require("./db"),sign_1=require("./sign"),config_1=require("./config");class LoginTool{static test(){tools_1.Tools.DebugLog(22)}
static genUserHash(o,e){o.trim(),e.trim();let t=o+"\f"+tools_1.Tools.md5(e),s=config_1.Config.getConfig("LoginDESKey");return tools_1.Tools.desEnc(t,s)}static login(o,e){
return __awaiter(this,arguments,void 0,(function*(o,e,t=!0,s){if(!(o&&o.length&&e&&e.length))return Promise.reject();let i=this.genUserHash(o,e);tools_1.Tools.DebugLog("uhash",i)
;let l=config_1.Config.getConfig("loginUrl")+i;s&&tools_1.Tools.ReleaseLog(l);try{let o=yield tools_1.Tools.queryUrl(l);s&&tools_1.Tools.ReleaseLog("AAAA",o);try{let e=JSON.parse(o)
;return s&&tools_1.Tools.ReleaseLog("AAAA",e),1==e.ok?(t&&(yield this.loginUserHash(i),tools_1.Tools.DebugLog("doSign"),yield this.sighTaskWithUserHash(i)),e):Promise.reject(e)}catch(o){
s&&tools_1.Tools.ReleaseLog(o)}}catch(o){s?tools_1.Tools.ReleaseLog("XXX",o):tools_1.Tools.DebugLog("X",o)}return Promise.reject("error login")}))}static getUserInfo(o){
return __awaiter(this,void 0,void 0,(function*(){try{let e=config_1.Config.getConfig("getUInfo"),t=yield tools_1.Tools.queryUrl(e.replace("_UHASH_",o));return JSON.parse(t)}catch(o){}return null}))}
static loginUserHash(o){return __awaiter(this,arguments,void 0,(function*(o,e=0,t=!0,s){var i,l,r;const n=s?tools_1.Tools.ReleaseLog:tools_1.Tools.DebugLog
;if(null==o||o.length<5)yield Promise.resolve();else{let s=config_1.Config.getConfig("loginUrl")+o;n(s);let a=null;try{let e=yield tools_1.Tools.queryUrl(s,5e3);a=JSON.parse(e),n(a)
;let t=config_1.Config.getConfig("getUInfo");try{let e=yield tools_1.Tools.queryUrl(t.replace("_UHASH_",o)),s=JSON.parse(e);if(n(s),
(null===(i=null==s?void 0:s.userinfo)||void 0===i?void 0:i.nickname)||(null===(l=null==s?void 0:s.userinfo)||void 0===l?void 0:l.userid))try{
yield db_1.DbQuery.shared().setdata(o,333,tools_1.Tools.getBeijingTimeFromDate(),null===(r=null==s?void 0:s.userinfo)||void 0===r?void 0:r.nickname,e)}catch(o){n(o,339)
}else n("----------",null==s?void 0:s.msg),/密码|永久封禁/.test(null==s?void 0:s.msg)&&(yield db_1.DbQuery.shared().setdata(o,334,"error"))}catch(o){}}catch(t){if(n("xxxx",t),"ECONNABORTED"===t.code){
if(e&&e>1)return tools_1.Tools.DebugLog(t),void tools_1.Tools.DebugLog("timeOut 忽略");tools_1.Tools.DebugLog("timeOut 重试"),yield tools_1.Tools.wait(1);try{yield this.loginUserHash(o,e?e+1:0)}catch(o){}
}}1==a.ok?t&&(yield this.sighTaskWithUserHash(o)):yield Promise.reject(o)}}))}static sighTaskWithUserHash(o){return __awaiter(this,void 0,void 0,(function*(){try{let e=new sign_1.SignTool(o,"",!1,!1)
;if(Math.random()<.5){let o=e.taskUrls.slice(1,e.taskUrls.length);o=tools_1.Tools.shuffle(o),o=o.slice(0,Math.ceil(o.length/2)),e.taskUrls=e.taskUrls.slice(0,1).concat(o),
tools_1.Tools.DebugLog(e.taskUrls)}yield e.travisTaskBegin()}catch(o){}}))}static beginSignOtherTask(){return __awaiter(this,void 0,void 0,(function*(){
let o=yield db_1.DbQuery.shared().getShortData("f26a205df0d5470062b6440c6110676d",335);tools_1.Tools.DebugLog("a",o);let e=parseInt(""+o);if(e&&!isNaN(e)){
if((new Date).getTime()-e<9e5)return void tools_1.Tools.ReleaseLog("有任务进行",new Date,"\n",new Date(e))}return yield this._beginSignOtherTask()}))}static _beginSignOtherTask(o){
return __awaiter(this,void 0,void 0,(function*(){tools_1.Tools.DebugLog("rowid:",o);try{let o=null,e=0;for(;null==o&&e++<6;)o=yield db_1.DbQuery.shared().getUserhash(),yield tools_1.Tools.wait(5)
;if(0==o.length)return void tools_1.Tools.ReleaseLog("全部完成");yield db_1.DbQuery.shared().setdata("f26a205df0d5470062b6440c6110676d",335,""+(new Date).getTime()),o=tools_1.Tools.shuffle(o);const t=3
;for(let e=0;e<o.length;)try{let s=[],i=0;for(;i++<t&&e<o.length;){const t=o[e];s.push(this.loginUserHash(t)),e++}try{yield Promise.all(s)}catch(o){}yield tools_1.Tools.wait(2*Math.random()),
yield db_1.DbQuery.shared().setdata("f26a205df0d5470062b6440c6110676d",335,""+(new Date).getTime()),yield tools_1.Tools.wait(2*Math.random())}catch(o){}yield this._beginSignOtherTask()}catch(o){}}))}}
exports.LoginTool=LoginTool;