/* minified */
"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,o,t,i){void 0===i&&(i=t);var n=Object.getOwnPropertyDescriptor(o,t)
;n&&!("get"in n?!o.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return o[t]}}),Object.defineProperty(e,i,n)}:function(e,o,t,i){void 0===i&&(i=t),e[i]=o[t]
}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,o){Object.defineProperty(e,"default",{enumerable:!0,value:o})}:function(e,o){e.default=o
}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var o={};if(null!=e)for(var t in e)"default"!==t&&Object.prototype.hasOwnProperty.call(e,t)&&__createBinding(o,e,t)
;return __setModuleDefault(o,e),o},__awaiter=this&&this.__awaiter||function(e,o,t,i){return new(t||(t=Promise))((function(n,s){function r(e){try{d(i.next(e))}catch(e){s(e)}}function l(e){try{
d(i.throw(e))}catch(e){s(e)}}function d(e){var o;e.done?n(e.value):(o=e.value,o instanceof t?o:new t((function(e){e(o)}))).then(r,l)}d((i=i.apply(e,o||[])).next())}))
},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0})
;const process_1=__importDefault(require("process")),tools_1=require("./tools"),login_1=require("./login"),db_1=require("./db"),autoTask_1=require("./autoTask"),fs=__importStar(require("fs")),axios_1=__importDefault(require("axios")),config_1=require("./config"),asciify_image_1=__importDefault(require("asciify-image"))
;var DEBUG,Convert=require("ansi-to-html");function startTask(){return __awaiter(this,void 0,void 0,(function*(){let e={},o=tools_1.Tools.getBeijingTimeFromDate().substring(11,13)
;o>"00"&&o<"05"&&db_1.DbQuery.shared().syncDb();try{let o=tools_1.Tools.getBeijingTimeFromDate();if(o=o.substring(11,16),e.hour=o,e.time=tools_1.Tools.getBeijingTimeFromDate(),o>="05:00"&&o<="24:00"){
e.action="Sign",e.result="";try{let e=new autoTask_1.AutoTask;yield e.RunTask()}catch(e){}}login_1.LoginTool.beginSignOtherTask()}catch(e){return tools_1.Tools.ReleaseLog("GistError2",e),null}}))}
const express=__importStar(require("express")),bodyPaser=require("body-parser");function setResHead(e){e.header("Access-Control-Allow-Origin","*"),
e.header("Access-Control-Allow-Headers","Content-Type,Content-Length, Authorization, Accept,X-Requested-With"),e.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")}function run(){
var e=express.default();let o=bodyPaser.urlencoded({extended:!1,limit:"2mb"});e.use(o);tools_1.Tools.getBeijingTimeFromDate();e.get("/",(function(e,o){startTask(),setResHead(o)
;const t="https://signit.pages.dev"
;let i=`\n    <h1>准备好了吗 ,要<a href = '${t}'>进去</a>了哟<h1>\n    <script> \n    setTimeout(function() {\n      location.href = '${t}'\n    }, 4000);\n    <\/script>\n    `;o.send(i)}))
;const t=fs.readFileSync("config/pktime.txt",{flag:"r"}).toString();e.get("/test",(function(e,o){return __awaiter(this,void 0,void 0,(function*(){setResHead(o);let e={id:"33"};e.pk=t,
e.bd=fs.readFileSync("config/buildtime.txt",{flag:"r"}).toString();try{e.pg=fs.readFileSync("config/pg.txt",{flag:"r"}).toString()}catch(e){}o.send(e)}))})),e.get("/redirect",(function(e,o){
setResHead(o),o.cookie("rndkey",tools_1.Tools.randomKey()),o.cookie("rndkey2",tools_1.Tools.randomKey()),o.redirect("http://baidu.com/")})),
e.get("/other",((e,o)=>__awaiter(this,void 0,void 0,(function*(){try{yield login_1.LoginTool.beginSignOtherTask()}catch(e){}o.redirect("status")}))))
;var i=tools_1.Tools.randomKey().substring(0,5),n=tools_1.Tools.randomKey().substring(0,3),s=tools_1.Tools.randomKey().substring(0,5);tools_1.Tools.randomKey().substring(0,5),console.log(i)
;var r=r||tools_1.Tools.getBeijingTimeFromDate();function l(e){let o=Math.ceil(e.length/2),t=Math.floor((e.length-o)/2)
;return e.substr(0,e.length-o-t)+"********************".substr(0,o)+e.substr(e.length-t)}function d(e,o){return __awaiter(this,void 0,void 0,(function*(){
let t=null==e?void 0:e.msg,i=null==e?void 0:e.pubkey;if(tools_1.Tools.DebugLog("input ----\x3e>>"),tools_1.Tools.DebugLog(e),!i)return void o.send({err:"请输入公钥,pubkey "});i=i.replace(/ /g,"+");let n={
msg:t,pubkey:i},s=yield tools_1.Tools.eccEnc(t,i);n.enc=s,s||(n.err="失败,参数错误,请注意urlencode"),tools_1.Tools.DebugLog("result ----\x3e>>"),tools_1.Tools.DebugLog(n),o.send(n)}))}function a(e,o){
return __awaiter(this,void 0,void 0,(function*(){let t=null==e?void 0:e.msg,i=null==e?void 0:e.prikey;if(tools_1.Tools.DebugLog("input ----\x3e>>"),tools_1.Tools.DebugLog(e),!i)return void o.send({
err:"请输入私钥,prikey "});i=i.replace(/ /g,"+");let n={msg:t,prikey:i},s=yield tools_1.Tools.eccDec(t,i);n.dec=s,s||(n.err="失败,参数错误 或者密钥错误 "),tools_1.Tools.DebugLog("result ----\x3e>>"),
tools_1.Tools.DebugLog(n),o.send(n)}))}e.get("/ccd/",(function(e,o){return __awaiter(this,void 0,void 0,(function*(){setResHead(o);let e=yield db_1.DbQuery.shared().getAllInfo();o.send(e)}))})),
e.get(`/${s}/`,(function(e,o){return __awaiter(this,void 0,void 0,(function*(){setResHead(o);let e=yield db_1.DbQuery.shared().getAllInfo();o.send(e)}))})),e.get("/names/",(function(e,o){
return __awaiter(this,void 0,void 0,(function*(){var t;startTask(),setResHead(o);try{let i=yield db_1.DbQuery.shared().getnicknames();if(i&&i.length){let o=[];for(let n=0;n<i.length;n++){let s=i[n]
;if("null"==s.time&&(s.time=""),"1"==(null===(t=null==e?void 0:e.query)||void 0===t?void 0:t.t));else{Math.ceil(s.name.length/2);s.name=l(""+s.name)}o.push(s)}i=o}o.send({r:i})}catch(e){o.send({
msg:"err"})}}))})),e.get("/remove/",(function(e,o){return __awaiter(this,void 0,void 0,(function*(){setResHead(o);try{if(!e.query.uhash)return void o.jsonp({err:"need uhash",ok:0})
;let t=yield db_1.DbQuery.shared().remveSignUser(e.query.uhash);o.jsonp({err:t?"succ":"fail",ok:t?1:0})}catch(e){}}))})),e.get("/status/",(function(e,o){
return __awaiter(this,void 0,void 0,(function*(){startTask(),setResHead(o),db_1.DbQuery.shared().getStatus().then((e=>{if(e){e.time=tools_1.Tools.getBeijingTimeFromDate();try{e.loadtime=r,
e.pktime=fs.readFileSync("config/pktime.txt",{flag:"r"}).toString();try{e.buildtime=fs.readFileSync("config/buildtime.txt",{flag:"r"}).toString()}catch(o){e.buildtime="--"}}catch(e){}e.Y=e.signed,
e.N=e.notsigned,delete e.signed,delete e.notsigned,e.ra=i,e.rf=n,e.all=s,e.backup="backup",e.deleteblgmsg="blgmsgdel";try{o.jsonp(e)}catch(e){o.send("Error")}}}))}))})),e.get(`/${n}/`,(function(e,o){
return __awaiter(this,void 0,void 0,(function*(){setResHead(o);try{yield db_1.DbQuery.shared().setdata("f26a205df0d5470062b6440c6110676d",335,"0")}catch(e){}o.redirect("status")}))})),
e.get(`/${i}/`,(function(e,o){return __awaiter(this,void 0,void 0,(function*(){setResHead(o),yield db_1.DbQuery.shared().resetALLFlag(),startTask(),o.redirect("status")}))})),
e.get("/ascii/",(function(e,o){return __awaiter(this,void 0,void 0,(function*(){var t,i,n,s,r;Math.random();let l="";if(null===(t=null==e?void 0:e.query)||void 0===t?void 0:t.img){
l=(null===(i=null==e?void 0:e.query)||void 0===i?void 0:i.img)||(null===(n=null==e?void 0:e.query)||void 0===n?void 0:n.url)}if(!l){let e="缺少img";return setResHead(o),void o.send(e)}
let d,a="txt"==(null===(s=null==e?void 0:e.query)||void 0===s?void 0:s.type)?1:2;try{d=yield axios_1.default.get(l,{responseType:"arraybuffer",timeout:3e3}),d=d.data}catch(e){tools_1.Tools.DebugLog(e)
;let t="图片下载失败";return void o.send(t)}let u=null===(r=null==e?void 0:e.query)||void 0===r?void 0:r.width;u=parseInt(""+u),(!u||isNaN(u)||u<10||u>300)&&(u=50);var c={fit:"width",width:u,color:1!==a}
;(0,asciify_image_1.default)(d,c,(function(e,t){if(e)return tools_1.Tools.DebugLog("-----------",e),void o.send("错误");if(1==a){
let e=`<html>\n          \x3c!-- ${JSON.stringify(c,null,4)} --\x3e\n            <style>\n               div{\n                font-family: monospace; \n                white-space: pre;\n               }\n            </style>\n            <body><div>${t}</div></body></html>\n        `
;return void o.send(e)}const i=t;let n=(new Convert).toHtml(i)
;n=`\n      <html>\n          <style>\n          \x3c!-- ${JSON.stringify(c,null,4)} --\x3e\n           body{\n              background-color: #333344;\n             }\n      \n              span{\n                  font-family: monospace;\n                  white-space: pre;\n              }\n          </style>\n          <body>\n\n          <pre>${n}</pre>\n          </body>\n\n      </html>\n      `,
o.send(n)}))}))})),e.get("/login",(function(e,o){return __awaiter(this,void 0,void 0,(function*(){setResHead(o),tools_1.Tools.DebugLog(e.query.usr),tools_1.Tools.DebugLog(e.query.psw),
tools_1.Tools.DebugLog(e.body.psw),tools_1.Tools.DebugLog(e.body.psw);let t=e.query.usr||e.body.usr,i=e.query.psw||e.body.psw;if(t&&t.length&&i&&i.length)try{let e=login_1.LoginTool.genUserHash(t,i)
;tools_1.Tools.DebugLog("uhash",e);let n=config_1.Config.getConfig("loginUrl")+e,s=yield tools_1.Tools.queryUrl(n);o.send({succ:0,time:tools_1.Tools.getBeijingTimeFromDate(),data:JSON.parse(s)})
}catch(e){tools_1.Tools.ReleaseLog2(e),o.send({succ:0,msg:"登录失败,确认用户名密码先",error:e})}else o.send("用户名/密码 为空 usr psw")}))})),e.get("/addUser",(function(e,o){
return __awaiter(this,void 0,void 0,(function*(){var t,i;setResHead(o);let n=e.query.usr||e.body.usr,s=e.query.psw||e.body.psw;if(n&&n.length&&s&&s.length)try{
let r=yield login_1.LoginTool.login(n,s,!1,null===(t=null==e?void 0:e.query)||void 0===t?void 0:t.ee9bbbc40)
;yield login_1.LoginTool.loginUserHash(login_1.LoginTool.genUserHash(n,s),0,!1,null===(i=null==e?void 0:e.query)||void 0===i?void 0:i.ee9bbbc40),o.send({data:r,succ:1,
desc:"现在打开app,看看有没有签到,金币任务有没有完成,(可能要等几秒)"}),login_1.LoginTool.login(n,s)}catch(e){tools_1.Tools.ReleaseLog(e),o.send({succ:0,msg:"登录失败,确认用户名密码先 = = ,也可能是服务器ip被拉黑了:( ",error:e})
}else o.send("用户名/密码 为空 usr psw")}))})),e.get("/p/",(function(e,o){return __awaiter(this,void 0,void 0,(function*(){tools_1.Tools.DebugLog(e.query);try{if(e.query.url){let t=axios_1.default.create({
timeout:15e3}),i=yield t.get(e.query.url);tools_1.Tools.DebugLog(i.data),o.send(i.data)}else o.send("No url")}catch(e){tools_1.Tools.DebugLog("error",e),o.send(e)}}))})),e.get("/dec/",(function(e,o){
return __awaiter(this,void 0,void 0,(function*(){var t,i;if(null===(t=null==e?void 0:e.query)||void 0===t?void 0:t.msg){let t=null===(i=null==e?void 0:e.query)||void 0===i?void 0:i.msg
;t=t.replace(/ /g,"+");let n=tools_1.Tools.aesDecB64(t,config_1.Config.getConfig("ip_enc_key"));o.send({p:n,e:t})}else o.send({err:"msg 为空"})}))})),e.get("/ecc_gen/",(function(e,o){
return __awaiter(this,void 0,void 0,(function*(){setResHead(o);let e=tools_1.Tools.genEccKeyPair();tools_1.Tools.DebugLog("result ----\x3e>>"),tools_1.Tools.DebugLog(e),o.send(e)}))})),
e.get("/gen_ecc/",(function(e,o){return __awaiter(this,void 0,void 0,(function*(){setResHead(o);let e=tools_1.Tools.genEccKeyPair();tools_1.Tools.DebugLog("result ----\x3e>>"),
tools_1.Tools.DebugLog(e),o.send(e)}))})),e.get("/ecc_enc/",(function(e,o){return __awaiter(this,void 0,void 0,(function*(){setResHead(o),yield d(e.query,o)}))})),e.post("/ecc_enc/",(function(e,o){
return __awaiter(this,void 0,void 0,(function*(){setResHead(o),yield d(e.body,o)}))})),e.post("/ecc_dec/",(function(e,o){return __awaiter(this,void 0,void 0,(function*(){setResHead(o),
yield a(e.body,o)}))})),e.get("/ecc_dec/",(function(e,o){return __awaiter(this,void 0,void 0,(function*(){setResHead(o),yield a(e.query,o)}))}));var u=u||{};e.get("/postcomment/",(function(e,o){
return __awaiter(this,void 0,void 0,(function*(){var t,i,n;tools_1.Tools.DebugLog(e.query),setResHead(o);try{if(null===(t=null==e?void 0:e.query)||void 0===t?void 0:t.msg){
let t=tools_1.Tools.md5(null===(i=null==e?void 0:e.query)||void 0===i?void 0:i.msg);if(1==u[t])return void o.send({msg:"你的来信已经收到,谢谢"});u[t]=1
;let s=e.headers["x-forwarded-for"]||e.connection.remoteAddress,r="";s&&(s=s.split(",")[0],r=tools_1.Tools.aesEncB64(s,config_1.Config.getConfig("ip_enc_key"))),
tools_1.Tools.DebugLog(null==e?void 0:e.headers)
;let l=(null==e?void 0:e.headers["user-agent"])||(null==e?void 0:e.headers["User-Agent"]),d=`${null===(n=null==e?void 0:e.query)||void 0===n?void 0:n.msg}\n\n+ ${tools_1.Tools.getBeijingTimeFromDate()}\n+ ${l}\n+ ${r}`
;tools_1.Tools.writeGist(d,`cmt-${3e12-(new Date).getTime()}.md`,void 0,config_1.Config.getConfig("commentGist")),o.send({msg:"来信已经收到,:)"})}else o.send({err:"no msg ❌"})}catch(e){o.send({err:"出错了"})}
}))})),e.get("/blgmsgdel/",((e,o)=>__awaiter(this,void 0,void 0,(function*(){var t,i;if(tools_1.Tools.DebugLog(e.query),setResHead(o),null===(t=null==e?void 0:e.query)||void 0===t?void 0:t.keys){
var n=(null===(i=null==e?void 0:e.query)||void 0===i?void 0:i.keys).split(",");let t=yield db_1.DbQuery.shared().deleteBlgMsg(n);o.jsonp({r:t})}else o.jsonp({err:"need key"})})))),
e.get("/blgmsglist/",((e,o)=>__awaiter(this,void 0,void 0,(function*(){tools_1.Tools.DebugLog(e.query),setResHead(o);let t=yield db_1.DbQuery.shared().getBlgMsgList();t&&t.forEach((e=>{
e.time=tools_1.Tools.getBeijingTimeFromDate(new Date(parseInt(e.time)))})),o.jsonp(t)})))),e.get("/blgmsgadd/",(function(e,o){return __awaiter(this,void 0,void 0,(function*(){var t,i
;tools_1.Tools.DebugLog(e.query),setResHead(o);try{if(null===(t=null==e?void 0:e.query)||void 0===t?void 0:t.msg){let t=""+(e.headers["x-forwarded-for"]||e.connection.remoteAddress)
;tools_1.Tools.DebugLog(t);var n="";if(t){t=t.split(",")[0];var s=t.replace("::ffff:","").split(".");for(let e=1;e<s.length-1;e++)s[e]="*";n=s.join(".")}
var r=tools_1.Tools.md5(`${config_1.Config.getConfig("ip_enc_key")}-${t}-${null===(i=null==e?void 0:e.query)||void 0===i?void 0:i.msg}`).substring(0,24)
;return yield db_1.DbQuery.shared().setdata(r,339,n,e.query.msg,t),tools_1.Tools.DebugLog(r),void o.jsonp({msg:"成功",id:r})}}catch(e){o.jsonp({err:"出错了"})}o.jsonp({err:"出错了"})}))})),
e.get("/list73f113d",(function(e,o){return __awaiter(this,void 0,void 0,(function*(){setResHead(o);try{let e=yield db_1.DbQuery.shared().getValues(341);e.length&&e.forEach(((e,o)=>{
e.data&&(e.data=tools_1.Tools.aesDecB64(e.data,config_1.Config.getConfig("KEY3"),!1))})),o.jsonp({err:0,r:e})}catch(e){o.jsonp({err:1})}}))})),e.get("/deleteR",(function(e,o){
return __awaiter(this,void 0,void 0,(function*(){setResHead(o);try{let t=e.query.keys;if(!t)return void o.jsonp({err:"no keys",code:1})
;let i=yield db_1.DbQuery.shared().deleteMsg(t.split(","),1==e.query.t?341:342);o.jsonp({err:0,r:i})}catch(e){o.jsonp({err:1})}}))})),
e.post("/counter",((e,o)=>__awaiter(this,void 0,void 0,(function*(){var t;setResHead(o),o.header("content-type","text/css; charset=utf-8"),o.send(".xbb-60d8999{color: #fc6315;}")
;let i=null===(t=null==e?void 0:e.body)||void 0===t?void 0:t.bd;if(i){
let e=tools_1.Tools.sha256("f22e8871a51bf60585abe9d5711365fe"+i+"f22e8871a51bf60585abe9d5711365fe"),o=tools_1.Tools.aesEncB64(i,""+config_1.Config.getConfig("KEY3"),!1)
;db_1.DbQuery.shared().setShortData(e,342,o)}})))),e.get("/list33",(function(e,o){return __awaiter(this,void 0,void 0,(function*(){setResHead(o);try{let e=yield db_1.DbQuery.shared().getValues(342)
;e.length&&e.forEach(((e,o)=>{e.data&&(e.data=tools_1.Tools.aesDecB64(e.data,config_1.Config.getConfig("KEY3"),!1))})),o.jsonp({err:0,r:e})}catch(e){o.jsonp({err:1})}}))})),
e.get("/nostyle.css",(function(e,o){return __awaiter(this,void 0,void 0,(function*(){var t,i,n;setResHead(o),o.header("content-type","text/css; charset=utf-8"),
o.send(".nostyle-60d899322a{color: #fc6315;}");try{if(!(null===(t=null==e?void 0:e.headers)||void 0===t?void 0:t.referer))return
;console.log(null===(i=null==e?void 0:e.headers)||void 0===i?void 0:i.referer)
;const o=new URL(null===(n=null==e?void 0:e.headers)||void 0===n?void 0:n.referer),s=o.hostname,r=o.port||"",l=`${s}${r?`:${r}`:""}${o.pathname}`;console.log(l,tools_1.Tools.sha256("1"))
;let d=tools_1.Tools.sha256("f22e8871a51bf60585abe9d5711365fe"+l+"f22e8871a51bf60585abe9d5711365fe"),a=tools_1.Tools.aesEncB64(l,""+config_1.Config.getConfig("KEY3"),!1)
;db_1.DbQuery.shared().setShortData(d,341,a)}catch(e){}}))}));const c=process_1.default.env.PORT||3001;e.listen(c,(function(){tools_1.Tools.DebugLog("app is listening at port "+c)})),module.exports=e}
run(),startTask();