/* minified */
"use strict";var __awaiter=this&&this.__awaiter||function(o,t,e,i){return new(e||(e=Promise))((function(s,l){function n(o){try{a(i.next(o))}catch(o){l(o)}}function r(o){try{a(i.throw(o))}catch(o){l(o)
}}function a(o){var t;o.done?s(o.value):(t=o.value,t instanceof e?t:new e((function(o){o(t)}))).then(n,r)}a((i=i.apply(o,t||[])).next())}))},__importDefault=this&&this.__importDefault||function(o){
return o&&o.__esModule?o:{default:o}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.AutoTask=void 0
;const sign_1=require("./sign"),tools_1=require("./tools"),db_1=require("./db"),config_1=require("./config"),axios_1=__importDefault(require("axios")),login_1=require("./login");var DEBUG
;class AutoTask{isWebApp(){return!0}isDEVOPS(){return"1"===config_1.Config.getStringFromEnv("IS_AZURE_DEVOPS")}checkIfNeedDoTask(o){return __awaiter(this,void 0,void 0,(function*(){
let t=config_1.Config.platform()+o;"WriteCommentKey001"==o&&(t=o);let e=!0;if(e=!0,!0===e){let o=null;try{o=yield db_1.DbQuery.shared().getCurrentData(t)}catch(o){}
if(!o)return tools_1.Tools.ReleaseLog("第一次  需要  ",t),!0;if(1==this.isDEVOPS()&&tools_1.Tools.ReleaseLog(o),o.data!==tools_1.Tools.getBeijingYYYY_MM_DD())return!0;if("1"==o.flag)return!1;try{
return""+o.timeStamp<""+((new Date).getTime()-9e5)?(tools_1.Tools.DebugLog("超时..."),!0):(tools_1.Tools.DebugLog("正在进行中..."),!1)}catch(o){return tools_1.Tools.DebugLog("抛异常"),!0}}return e}))}
setTaskFlag(o,t){return __awaiter(this,void 0,void 0,(function*(){try{let e=config_1.Config.platform()+t;if("WriteCommentKey001"==t&&(e=t),this.isWebApp()){let t={}
;t.data=tools_1.Tools.getBeijingYYYY_MM_DD(),t.key=e,t.flag=o;try{yield db_1.DbQuery.shared().setCurrentData(t)}catch(o){tools_1.Tools.ReleaseLog("数据库失败")}}}catch(o){}}))}signWithIds(o){
return __awaiter(this,void 0,void 0,(function*(){var t,e,i,s;try{if(!(yield this.checkIfNeedDoTask("SignKey001")))return tools_1.Tools.ReleaseLog("签到过了"),-1}catch(o){}
let l=config_1.Config.getConfig("kxNames");for(let o=0;o<l.length;o++){const t=l[o];try{let o=new sign_1.SignTool("",t,!1,!1).signKX();yield o}catch(o){}yield tools_1.Tools.wait(10+7*Math.random())}
try{let l={};yield this.setTaskFlag("2","SignKey001");let n=!0;for(let r=0;r<o.length;r++){const a=o[r];let u=0,g="";try{let o=yield login_1.LoginTool.getUserInfo(a)
;g=null===(t=null==o?void 0:o.userinfo)||void 0===t?void 0:t.nickname,u=null===(e=null==o?void 0:o.userinfo)||void 0===e?void 0:e.coin}catch(o){}n=!0,
tools_1.Tools.ReleaseLog(`>>>   ${g}  ${a.substring(0,8)}`);let _=new sign_1.SignTool(a,"");n=yield _.travisTaskBegin(),n||(n=yield _.travisTaskBegin());try{
let o=yield login_1.LoginTool.getUserInfo(a);g=null===(i=null==o?void 0:o.userinfo)||void 0===i?void 0:i.nickname;let t=null===(s=null==o?void 0:o.userinfo)||void 0===s?void 0:s.coin;u=t-u,
l[g]=`金币: +${u},总计:${t}`}catch(o){}}try{n&&(yield this.setTaskFlag("1","SignKey001"))}catch(o){}try{let o=new sign_1.SignTool("","",!0,!0).travisTaskBegin();yield o}catch(o){}return n?1:0}catch(o){
tools_1.Tools.DebugLog(o)}}))}RunTask(){return __awaiter(this,void 0,void 0,(function*(){try{return(yield Promise.all([this.RunTask0(),this.Runtask1()]))[0]}catch(o){return 0}}))}Runtask1(){
return __awaiter(this,void 0,void 0,(function*(){let o=config_1.Config.platform()+"_PPSIGN";try{let t=config_1.Config.getConfig("PPSign");for(let o=0;t&&o<t.length;o++){const e=t[o]
;let i=e.url,s=e.params;if("string"==typeof s){let o=tools_1.Tools.getBeijingTimeFromDate().substr(0,19);if(tools_1.Tools.DebugLog(o),s&&(s=s.replace("_TIMESTAMP_",o),e.sign)){
let o=tools_1.Tools.md5(s).toUpperCase();s+=`&${e.sign}=${o}`}}else{let o=[],t=[],i=tools_1.Tools.getBeijingTimeFromDate().substr(0,19);for(const e in s)if(Object.prototype.hasOwnProperty.call(s,e)){
let l=s[e];l=l.replace("_TIMESTAMP_",i),o.push(`${e}=${l}`),t.push(`${e}=${encodeURIComponent(l)}`)}if(o.sort(),e.sign){let i=tools_1.Tools.md5(o.join("&"));t.push(`${e.sign}=${i}`)}s=t.join("&")}
let l,n=e.times;n||(n=1),e.head&&(l={headers:e.head});for(let o=0;o<n;o++){try{let o=yield axios_1.default.create({timeout:3e4}).post(i,s,l);tools_1.Tools.DebugLog(i,o.data),tools_1.Tools.DebugLog(s)
}catch(o){}yield tools_1.Tools.wait(5+10*Math.random())}}let e={};e.data=tools_1.Tools.getBeijingYYYY_MM_DD(),e.key=o,e.flag="1"}catch(o){tools_1.Tools.DebugLog(o)}}))}RunTask0(){
return __awaiter(this,void 0,void 0,(function*(){let o=config_1.Config.SignIds();if(tools_1.Tools.DebugLog(o),o)try{let t=yield this.signWithIds(o);return tools_1.Tools.DebugLog("---------",t),
1===t?yield this.uploadResult(!0):0===t&&(yield this.uploadResult(!1)),t}catch(o){return tools_1.Tools.ReleaseLog(o),0}return 0}))}uploadResult(o){return __awaiter(this,void 0,void 0,(function*(){
let t=tools_1.Tools.getBeijingTimeFromDate().substr(0,19),e=config_1.Config.getStringFromEnv("PLTFMFLG"),i="result.json"
;"TRVS"===e?i="travis.json":"GLC"===e?i="gitlab.json":"AZP"==e&&(i="azuredevops.json");let s="";s=o?JSON.stringify({R:t,plt:e}):JSON.stringify({R:"❌  ❌"}),tools_1.Tools.writeGist(s,i)}))}}
function Run(){return __awaiter(this,void 0,void 0,(function*(){let o=new AutoTask;try{yield o.RunTask()}catch(o){tools_1.Tools.DebugLog(JSON.stringify(o))}}))}function closeDb(){
return __awaiter(this,void 0,void 0,(function*(){(new AutoTask).isDEVOPS()&&(tools_1.Tools.ReleaseLog("关闭数据库连接"),yield db_1.DbQuery.shared().close())}))}function start(){
return __awaiter(this,void 0,void 0,(function*(){let o="ATASK-"+config_1.Config.platform(),t=tools_1.Tools.getBeijingYYYY_MM_DD();try{
(yield db_1.DbQuery.shared().getShortData(o,338))==t?tools_1.Tools.ReleaseLog("skip",o):(tools_1.Tools.ReleaseLog("do",o),yield Run(),yield db_1.DbQuery.shared().setdata(o,338,t))}catch(o){}
yield db_1.DbQuery.shared().close()}))}exports.AutoTask=AutoTask,AutoTask.WritComment=1,function(){__awaiter(this,void 0,void 0,(function*(){if(require.main===module){try{yield start()}catch(o){}
tools_1.Tools.ReleaseLog("⭕️⭕️⭕️ is main function")}else tools_1.Tools.ReleaseLog("❌❌❌ is NOT  main function")}))}();