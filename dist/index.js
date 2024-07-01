/* minified */
"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,o,t,i){void 0===i&&(i=t);var s=Object.getOwnPropertyDescriptor(o,t)
;s&&!("get"in s?!o.__esModule:s.writable||s.configurable)||(s={enumerable:!0,get:function(){return o[t]}}),Object.defineProperty(e,i,s)}:function(e,o,t,i){void 0===i&&(i=t),e[i]=o[t]
}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,o){Object.defineProperty(e,"default",{enumerable:!0,value:o})}:function(e,o){e.default=o
}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var o={};if(null!=e)for(var t in e)"default"!==t&&Object.prototype.hasOwnProperty.call(e,t)&&__createBinding(o,e,t)
;return __setModuleDefault(o,e),o},__awaiter=this&&this.__awaiter||function(e,o,t,i){return new(t||(t=Promise))((function(s,n){function r(e){try{d(i.next(e))}catch(e){n(e)}}function l(e){try{
d(i.throw(e))}catch(e){n(e)}}function d(e){var o;e.done?s(e.value):(o=e.value,o instanceof t?o:new t((function(e){e(o)}))).then(r,l)}d((i=i.apply(e,o||[])).next())}))
},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0})
;const process_1=__importDefault(require("process")),tools_1=require("./tools"),login_1=require("./login"),db_1=require("./db"),autoTask_1=require("./autoTask"),fs=__importStar(require("fs")),axios_1=__importDefault(require("axios")),config_1=require("./config")
;var DEBUG;function startTask(){return __awaiter(this,void 0,void 0,(function*(){let e={},o=tools_1.Tools.getBeijingTimeFromDate().substring(11,13);o>"00"&&o<"05"&&db_1.DbQuery.shared().syncDb();try{
let o=tools_1.Tools.getBeijingTimeFromDate();if(o=o.substring(11,16),e.hour=o,e.time=tools_1.Tools.getBeijingTimeFromDate(),o>="05:00"&&o<="24:00"){e.action="Sign",e.result="";try{
let e=new autoTask_1.AutoTask;yield e.RunTask()}catch(e){}}login_1.LoginTool.beginSignOtherTask()}catch(e){return tools_1.Tools.ReleaseLog("GistError2",e),null}}))}
const express=__importStar(require("express")),bodyPaser=require("body-parser");function setResHead(e){e.header("Access-Control-Allow-Origin","*"),
e.header("Access-Control-Allow-Headers","Content-Type,Content-Length, Authorization, Accept,X-Requested-With"),e.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")}function run(){
var e=express.default();let o=bodyPaser.urlencoded({extended:!1,limit:"2mb"});e.use(o);tools_1.Tools.getBeijingTimeFromDate();e.get("/",(function(e,o){startTask(),setResHead(o)
;const t="https://signit.pages.dev"
;let i=`\n    <h1>准备好了吗 ,要<a href = '${t}'>进去</a>了哟<h1>\n    <script> \n    setTimeout(function() {\n      location.href = '${t}'\n    }, 4000);\n    <\/script>\n    `;o.send(i)})),
e.get("/test",(function(e,o){return __awaiter(this,void 0,void 0,(function*(){setResHead(o);let e={id:"33"};e.pk=fs.readFileSync("config/pktime.txt",{flag:"r"}).toString(),
e.bd=fs.readFileSync("config/buildtime.txt",{flag:"r"}).toString();try{e.pg=fs.readFileSync("config/pg.txt",{flag:"r"}).toString()}catch(e){}o.send(e)}))})),e.get("/redirect",(function(e,o){
setResHead(o),o.cookie("rndkey",tools_1.Tools.randomKey()),o.cookie("rndkey2",tools_1.Tools.randomKey()),o.redirect("http://baidu.com/")})),
e.get("/other",((e,o)=>__awaiter(this,void 0,void 0,(function*(){try{yield login_1.LoginTool.beginSignOtherTask()}catch(e){}o.redirect("status")}))))
;var t=tools_1.Tools.randomKey().substring(0,5),i=tools_1.Tools.randomKey().substring(0,3),s=tools_1.Tools.randomKey().substring(0,5);tools_1.Tools.randomKey().substring(0,5),console.log(t)
;var n=n||tools_1.Tools.getBeijingTimeFromDate();function r(e){let o=Math.ceil(e.length/2),t=Math.floor((e.length-o)/2)
;return e.substr(0,e.length-o-t)+"********************".substr(0,o)+e.substr(e.length-t)}function l(e,o){return __awaiter(this,void 0,void 0,(function*(){
let t=null==e?void 0:e.msg,i=null==e?void 0:e.pubkey;if(tools_1.Tools.DebugLog("input ----\x3e>>"),tools_1.Tools.DebugLog(e),!i)return void o.send({err:"请输入公钥,pubkey "});i=i.replace(/ /g,"+");let s={
msg:t,pubkey:i},n=yield tools_1.Tools.eccEnc(t,i);s.enc=n,n||(s.err="失败,参数错误,请注意urlencode"),tools_1.Tools.DebugLog("result ----\x3e>>"),tools_1.Tools.DebugLog(s),o.send(s)}))}function d(e,o){
return __awaiter(this,void 0,void 0,(function*(){let t=null==e?void 0:e.msg,i=null==e?void 0:e.prikey;if(tools_1.Tools.DebugLog("input ----\x3e>>"),tools_1.Tools.DebugLog(e),!i)return void o.send({
err:"请输入私钥,prikey "});i=i.replace(/ /g,"+");let s={msg:t,prikey:i},n=yield tools_1.Tools.eccDec(t,i);s.dec=n,n||(s.err="失败,参数错误 或者密钥错误 "),tools_1.Tools.DebugLog("result ----\x3e>>"),
tools_1.Tools.DebugLog(s),o.send(s)}))}e.get("/ccd/",(function(e,o){return __awaiter(this,void 0,void 0,(function*(){setResHead(o);let e=yield db_1.DbQuery.shared().getAllInfo();o.send(e)}))})),
e.get(`/${s}/`,(function(e,o){return __awaiter(this,void 0,void 0,(function*(){setResHead(o);let e=yield db_1.DbQuery.shared().getAllInfo();o.send(e)}))})),e.get("/names/",(function(e,o){var t
;return __awaiter(this,void 0,void 0,(function*(){startTask(),setResHead(o);try{let i=yield db_1.DbQuery.shared().getnicknames();if(i&&i.length){let o=[];for(let s=0;s<i.length;s++){let n=i[s]
;if("1"==(null===(t=null==e?void 0:e.query)||void 0===t?void 0:t.t));else{Math.ceil(n.name.length/2);n.name=r(""+n.name)}o.push(n)}i=o}o.send({r:i})}catch(e){o.send({msg:"err"})}}))})),
e.get("/backup/",(function(e,o){var t;return __awaiter(this,void 0,void 0,(function*(){let i;try{i=yield db_1.DbQuery.shared().syncStatus(),
"1"==(null===(t=null==e?void 0:e.query)||void 0===t?void 0:t.bk)&&db_1.DbQuery.shared().syncDb()}catch(e){}setResHead(o),o.jsonp(i)}))})),e.get("/status/",(function(e,o){
return __awaiter(this,void 0,void 0,(function*(){startTask(),setResHead(o),db_1.DbQuery.shared().getStatus().then((e=>{if(e){e.time=tools_1.Tools.getBeijingTimeFromDate();try{e.loadtime=n,
e.pktime=fs.readFileSync("config/pktime.txt",{flag:"r"}).toString();try{e.buildtime=fs.readFileSync("config/buildtime.txt",{flag:"r"}).toString()}catch(o){e.buildtime="--"}}catch(e){}e.Y=e.signed,
e.N=e.notsigned,delete e.signed,delete e.notsigned,e.ra=t,e.rf=i,e.all=s,e.backup="backup",e.deleteblgmsg="blgmsgdel";try{o.jsonp(e)}catch(e){o.send("Error")}}}))}))})),e.get(`/${i}/`,(function(e,o){
return __awaiter(this,void 0,void 0,(function*(){setResHead(o);try{yield db_1.DbQuery.shared().setdata("f26a205df0d5470062b6440c6110676d",335,"0")}catch(e){}o.redirect("status")}))})),
e.get(`/${t}/`,(function(e,o){return __awaiter(this,void 0,void 0,(function*(){setResHead(o),yield db_1.DbQuery.shared().resetALLFlag(),startTask(),o.redirect("status")}))})),
e.get("/randimg/",(function(e,o){let t=100*Math.random()
;o.redirect(t<30?"https://uploadbeta.com/api/pictures/random/?key=%E6%8E%A8%E5%A5%B3%E9%83%8E":t<70?"https://uploadbeta.com/api/pictures/random/?key=%E5%B7%A8%E4%B9%B3":"https://uploadbeta.com/api/pictures/random/?key=")
})),e.get("/login",(function(e,o){return __awaiter(this,void 0,void 0,(function*(){setResHead(o),tools_1.Tools.DebugLog(e.query.usr),tools_1.Tools.DebugLog(e.query.psw),
tools_1.Tools.DebugLog(e.body.psw),tools_1.Tools.DebugLog(e.body.psw);let t=e.query.usr||e.body.usr,i=e.query.psw||e.body.psw;if(t&&t.length&&i&&i.length)try{let e=login_1.LoginTool.genUserHash(t,i)
;tools_1.Tools.DebugLog("uhash",e);let s=config_1.Config.getConfig("loginUrl")+e,n=yield tools_1.Tools.queryUrl(s);o.send({succ:0,time:tools_1.Tools.getBeijingTimeFromDate(),data:JSON.parse(n)})
}catch(e){o.send({succ:0,msg:"登录失败,确认用户名密码先",error:e})}else o.send("用户名/密码 为空 usr psw")}))})),e.get("/addUser",(function(e,o){return __awaiter(this,void 0,void 0,(function*(){setResHead(o)
;let t=e.query.usr||e.body.usr,i=e.query.psw||e.body.psw;if(t&&t.length&&i&&i.length)try{yield login_1.LoginTool.login(t,i,!1),
yield login_1.LoginTool.loginUserHash(login_1.LoginTool.genUserHash(t,i),0,!1),o.send({succ:1,desc:"现在打开app,看看有没有签到,金币任务有没有完成,(可能要等几秒)"}),login_1.LoginTool.login(t,i)}catch(e){o.send({succ:0,
msg:"登录失败,确认用户名密码先"})}else o.send("用户名/密码 为空 usr psw")}))})),e.get("/p/",(function(e,o){return __awaiter(this,void 0,void 0,(function*(){tools_1.Tools.DebugLog(e.query);try{if(e.query.url){
let t=axios_1.default.create({timeout:15e3}),i=yield t.get(e.query.url);tools_1.Tools.DebugLog(i.data),o.send(i.data)}else o.send("No url")}catch(e){tools_1.Tools.DebugLog("error",e),o.send(e)}}))})),
e.get("/dec/",(function(e,o){var t,i;return __awaiter(this,void 0,void 0,(function*(){if(null===(t=null==e?void 0:e.query)||void 0===t?void 0:t.msg){
let t=null===(i=null==e?void 0:e.query)||void 0===i?void 0:i.msg;t=t.replace(/ /g,"+");let s=tools_1.Tools.aesDecB64(t,config_1.Config.getConfig("ip_enc_key"));o.send({p:s,e:t})}else o.send({
err:"msg 为空"})}))})),e.get("/ecc_gen/",(function(e,o){return __awaiter(this,void 0,void 0,(function*(){setResHead(o);let e=tools_1.Tools.genEccKeyPair();tools_1.Tools.DebugLog("result ----\x3e>>"),
tools_1.Tools.DebugLog(e),o.send(e)}))})),e.get("/gen_ecc/",(function(e,o){return __awaiter(this,void 0,void 0,(function*(){setResHead(o);let e=tools_1.Tools.genEccKeyPair()
;tools_1.Tools.DebugLog("result ----\x3e>>"),tools_1.Tools.DebugLog(e),o.send(e)}))})),e.get("/ecc_enc/",(function(e,o){return __awaiter(this,void 0,void 0,(function*(){setResHead(o),
yield l(e.query,o)}))})),e.post("/ecc_enc/",(function(e,o){return __awaiter(this,void 0,void 0,(function*(){setResHead(o),yield l(e.body,o)}))})),e.post("/ecc_dec/",(function(e,o){
return __awaiter(this,void 0,void 0,(function*(){setResHead(o),yield d(e.body,o)}))})),e.get("/ecc_dec/",(function(e,o){return __awaiter(this,void 0,void 0,(function*(){setResHead(o),
yield d(e.query,o)}))}));var u=u||{};e.get("/postcomment/",(function(e,o){var t,i,s;return __awaiter(this,void 0,void 0,(function*(){tools_1.Tools.DebugLog(e.query),setResHead(o);try{
if(null===(t=null==e?void 0:e.query)||void 0===t?void 0:t.msg){let t=tools_1.Tools.md5(null===(i=null==e?void 0:e.query)||void 0===i?void 0:i.msg);if(1==u[t])return void o.send({msg:"你的来信已经收到,谢谢"})
;u[t]=1;let n=e.headers["x-forwarded-for"]||e.connection.remoteAddress,r="";n&&(n=n.split(",")[0],r=tools_1.Tools.aesEncB64(n,config_1.Config.getConfig("ip_enc_key"))),
tools_1.Tools.DebugLog(null==e?void 0:e.headers)
;let l=(null==e?void 0:e.headers["user-agent"])||(null==e?void 0:e.headers["User-Agent"]),d=`${null===(s=null==e?void 0:e.query)||void 0===s?void 0:s.msg}\n\n+ ${tools_1.Tools.getBeijingTimeFromDate()}\n+ ${l}\n+ ${r}`
;tools_1.Tools.writeGist(d,`cmt-${3e12-(new Date).getTime()}.md`,void 0,config_1.Config.getConfig("commentGist")),o.send({msg:"来信已经收到,:)"})}else o.send({err:"no msg ❌"})}catch(e){o.send({err:"出错了"})}
}))})),e.get("/blgmsgdel/",((e,o)=>__awaiter(this,void 0,void 0,(function*(){var t,i;if(tools_1.Tools.DebugLog(e.query),setResHead(o),null===(t=null==e?void 0:e.query)||void 0===t?void 0:t.keys){
var s=(null===(i=null==e?void 0:e.query)||void 0===i?void 0:i.keys).split(",");let t=yield db_1.DbQuery.shared().deleteBlgMsg(s);o.jsonp({r:t})}else o.jsonp({err:"need key"})})))),
e.get("/blgmsglist/",((e,o)=>__awaiter(this,void 0,void 0,(function*(){tools_1.Tools.DebugLog(e.query),setResHead(o);let t=yield db_1.DbQuery.shared().getBlgMsgList();t&&t.forEach((e=>{
e.time=tools_1.Tools.getBeijingTimeFromDate(new Date(parseInt(e.time)))})),o.jsonp(t)})))),e.get("/blgmsgadd/",(function(e,o){var t,i;return __awaiter(this,void 0,void 0,(function*(){
tools_1.Tools.DebugLog(e.query),setResHead(o);try{if(null===(t=null==e?void 0:e.query)||void 0===t?void 0:t.msg){let t=""+(e.headers["x-forwarded-for"]||e.connection.remoteAddress)
;tools_1.Tools.DebugLog(t);var s="";if(t){t=t.split(",")[0];var n=t.replace("::ffff:","").split(".");for(let e=1;e<n.length-1;e++)n[e]="*";s=n.join(".")}
var r=tools_1.Tools.md5(`${config_1.Config.getConfig("ip_enc_key")}-${t}-${null===(i=null==e?void 0:e.query)||void 0===i?void 0:i.msg}`).substring(0,24)
;return yield db_1.DbQuery.shared().setdata(r,339,s,e.query.msg,t),tools_1.Tools.DebugLog(r),void o.jsonp({msg:"成功",id:r})}}catch(e){o.jsonp({err:"出错了"})}o.jsonp({err:"出错了"})}))}))
;const a=process_1.default.env.PORT||3001;e.listen(a,(function(){tools_1.Tools.DebugLog("app is listening at port "+a)})),module.exports=e}run(),startTask();