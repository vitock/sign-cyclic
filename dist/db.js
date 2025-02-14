/* minified */
"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(t,e,o,i){void 0===i&&(i=o);var n=Object.getOwnPropertyDescriptor(e,o)
;n&&!("get"in n?!e.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return e[o]}}),Object.defineProperty(t,i,n)}:function(t,e,o,i){void 0===i&&(i=o),t[i]=e[o]
}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e
}),__importStar=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var o in t)"default"!==o&&Object.prototype.hasOwnProperty.call(t,o)&&__createBinding(e,t,o)
;return __setModuleDefault(e,t),e},__awaiter=this&&this.__awaiter||function(t,e,o,i){return new(o||(o=Promise))((function(n,s){function r(t){try{l(i.next(t))}catch(t){s(t)}}function a(t){try{
l(i.throw(t))}catch(t){s(t)}}function l(t){var e;t.done?n(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(r,a)}l((i=i.apply(t,e||[])).next())}))}
;Object.defineProperty(exports,"__esModule",{value:!0}),exports.DbQuery=void 0
;const pg_1=require("pg"),pg_connection_string_1=require("pg-connection-string"),tools_1=require("./tools"),config_1=require("./config"),fs=__importStar(require("fs")),MyResinMainKey="X1557233807905"
;class DbQuery{constructor(){let t=fs.readFileSync("config/ca.crt.enc").toString(),e=config_1.Config.getConfig("rootcakey"),o=tools_1.Tools.aesDecB64(t,e);fs.writeFileSync("ybdb.crt",o)
;var i=config_1.Config.getConfig("database_url");(0,pg_connection_string_1.parse)(i).ssl=!0,this.con=new pg_1.Pool({connectionString:i,connectionTimeoutMillis:16e3,ssl:{rejectUnauthorized:!1}});(()=>{
__awaiter(this,void 0,void 0,(function*(){tools_1.Tools.ReleaseLog("test conn");try{yield this.con.connect()}catch(t){tools_1.Tools.ReleaseLog("test conn Result",t)}}))})()}static shared(){
return null==DbQuery.g_Shared&&(DbQuery.g_Shared=new DbQuery),DbQuery.g_Shared}close(){return __awaiter(this,void 0,void 0,(function*(){try{yield this.con.end()}catch(t){}try{yield this.con2.end()
}catch(t){}DbQuery.g_Shared=null}))}resetALLFlag(){return __awaiter(this,void 0,void 0,(function*(){try{yield this.con.query("update signdata set d1 = $1  where dtype = $2",["not yet",333])}catch(t){}
try{yield this.setdata("f26a205df0d5470062b6440c6110676d",335,"0")}catch(t){}}))}getCurrentData(t){return __awaiter(this,void 0,void 0,(function*(){tools_1.Tools.getBeijingYYYY_MM_DD();try{
let e=yield this.con.query("select signdate  ,updatetime ,d1,d0  from signdata where signdate = $1",[t]);if(e&&e.rows&&e.rows.length){let o=e.rows[0],i={};return i.key=t,i.data=o.d1,
i.timeStamp=o.updatetime,i.flag=o.d0,i}return null}catch(t){return null}}))}getAllInfo(){return __awaiter(this,void 0,void 0,(function*(){const t=[333];let e=[];try{
let i=yield this.con.query("select *  from signdata where dtype = $1 order by updatetime",t);if(i&&i.rows&&i.rows.length>0)for(let t=0;t<i.rows.length;t++){const n=i.rows[t];var o=Object.assign({},n)
;if(tools_1.Tools.DebugLog(o),"E4."==o.ddata.substring(0,3))try{let t=yield tools_1.Tools.AesGCMDec(o.ddata);o.ddata=JSON.parse(t)}catch(t){}o.signdate=this.decHash(o.signdate),e.push(o)}}catch(t){
tools_1.Tools.ReleaseLog(t)}let i=JSON.stringify(e);return yield tools_1.Tools.eccEnc(i)}))}getnicknames(){return __awaiter(this,void 0,void 0,(function*(){const t=[333];let e=[];try{
let o=yield this.con.query("select  d2 ,d3 from signdata where dtype = $1 order by updatetime",t);if(o&&o.rows&&o.rows.length>0)for(let t=0;t<o.rows.length;t++){const i=o.rows[t];let n={}
;n.name=tools_1.Tools.base64DecodeString(""+i.d2),n.time=""+i.d3,e.push(n)}}catch(t){}return e}))}syncStatus(){return __awaiter(this,void 0,void 0,(function*(){
let t=yield this.getShortData("RenderToYbdbID",338),e=yield this.getShortData("RenderToYbdbTime",338),o=yield this.con.query("select count(CASE WHEN signdate > $1 then 1 else null end )  c2 , count(CASE WHEN signdate > $1 then null else 1 end )  c1    from signdata \n       ",[t])
;return{syncTime:e,synced:o.rows[0].c1,noSync:o.rows[0].c2,sv:t,con2:this.con2?"Y":"N"}}))}genCon2(){return __awaiter(this,void 0,void 0,(function*(){
let t=fs.readFileSync("config/ca.crt.enc").toString(),e=config_1.Config.getConfig("rootcakey"),o=tools_1.Tools.aesDecB64(t,e);fs.writeFileSync("ybdb.crt",o)
;var i=config_1.Config.getConfig("database_url_yb");this.con2=new pg_1.Pool({connectionString:i,ssl:{rejectUnauthorized:!0},connectionTimeoutMillis:5e3});try{
yield this.con2.query("select * from signdata limit 1")}catch(t){try{yield this.con2.end()}catch(t){}throw this.con2=null,{err:"db error"+(null==t?void 0:t.toString())}}}))}syncDb(){
return __awaiter(this,void 0,void 0,(function*(){}))}_syncDb(){return __awaiter(this,void 0,void 0,(function*(){if("RENDER"!=config_1.Config.platform())return
;let t="RenderToYbdbID",e="RenderToYbdbTime",o=yield this.getShortData(t,338),i=yield this.getShortData(e,338)
;if(i&&0==i.indexOf(tools_1.Tools.getBeijingYYYY_MM_DD()))tools_1.Tools.ReleaseLog(i,"skip");else{for(this.con2||(yield this.genCon2());;){tools_1.Tools.ReleaseLog("bk",o)
;const e="select *  from signdata where signdate > $1  order by signdate limit 8 ";let i=[];try{let t=yield this.con.query(e,[o]);if(!(t&&t.rows&&t.rows.length>0))break
;for(let e=0;e<t.rows.length;e++){const o=t.rows[e];var n=Object.assign({},o);i.push(n)}}catch(t){tools_1.Tools.DebugLog(t)}if(0==i.length)break;yield this.restoreDataFromJson(i,!0,!0),
o=i[i.length-1].signdate,yield this.setShortData(t,338,o)}yield this.setShortData(t,338,""),yield this.setShortData(e,338,tools_1.Tools.getBeijingTimeFromDate()),yield this.con2.end(),this.con2=null,
fs.unlinkSync("ybdb.crt")}}))}restoreDataFromJson(t){return __awaiter(this,arguments,void 0,(function*(t,e=!1,o=!1){for(let i=0;i<t.length;i++){const n=t[i];let s=[],r=[],a=[],l=1
;for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t)){const e=n[t];s.push(t),r.push(e),a.push("$"+l++)}let d=`INSERT INTO signdata(${s.join(" , ")}) VALUES(${a.join(" , ")}) `;try{
e?yield this.con2.query(d,r):yield this.con.query(d,r),yield tools_1.Tools.wait(.3)}catch(t){if(o){
let t=s.map(((t,e)=>`${t} = ${a[e]}`)),o=`update signdata set   ${t.join(" , ")} where signdate = $${s.length+1} `;r.push(n.signdate);try{e?yield this.con2.query(o,r):yield this.con.query(o,r)
}catch(t){}}}}}))}deleteMsg(t,e){return __awaiter(this,void 0,void 0,(function*(){try{var o=[];t.forEach(((t,e)=>{o.push(`$${e+2}`)}))
;let i=`delete from signdata where dtype = $1 and signdate in ( ${o.join(",")} ) `;tools_1.Tools.DebugLog(i);yield this.con.query(i,[].concat(e).concat(t));return!0}catch(t){
return tools_1.Tools.DebugLog(t),!1}}))}deleteBlgMsg(t){return __awaiter(this,void 0,void 0,(function*(){try{var e=[];t.forEach(((t,o)=>{e.push(`$${o+2}`)}))
;let o=`delete from signdata where dtype = $1 and signdate in ( ${e.join(",")} ) `;tools_1.Tools.DebugLog(o);yield this.con.query(o,[].concat(339).concat(t));return!0}catch(t){
return tools_1.Tools.DebugLog(t),!1}}))}getBlgMsgList(){return __awaiter(this,void 0,void 0,(function*(){var t;try{
let o=yield this.con.query("select signdate ,updatetime,d1, d2 from signdata where dtype = $1  order by updatetime desc",[339]);var e=[]
;return(null===(t=null==o?void 0:o.rows)||void 0===t?void 0:t.length)>0&&o.rows.forEach((t=>{e.push({k:t.signdate,text:tools_1.Tools.base64DecodeString(t.d2),id:t.d1,time:t.updatetime})})),e}catch(t){
tools_1.Tools.DebugLog(t)}return[]}))}setdata(t,e,o,i,n){return __awaiter(this,void 0,void 0,(function*(){333!=e&&334!=e||(t=this.encHash(t));try{return yield this._setdata(t,e,o,i,n)}catch(t){}}))}
_setdata(t,e,o,i,n){return __awaiter(this,void 0,void 0,(function*(){var s,r;if(o=o?""+o:"",n){n=yield tools_1.Tools.AesGCMEnc(n),i=tools_1.Tools.base64String(""+i);try{
let r=yield this.con.query("update signdata set ddata = $1 ,updatetime =  $2 ,d1 = $3 ,d2 = $4 ,dtype=$6 where signdate = $5 RETURNING signdate",[n,this.currentTimeStamp(),o,i,t,e])
;if(0==(null===(s=null==r?void 0:r.rows)||void 0===s?void 0:s.length))try{
const s="INSERT INTO signdata(signdate,updatetime ,dtype ,ddata,d1,d2,d3) VALUES($1, $2,$3 ,$4,$5,$6,$7) RETURNING signdate , dflag",r=[t,this.currentTimeStamp(),e,n,o,i,tools_1.Tools.getBeijingTimeFromDate()]
;yield this.con.query(s,r)}catch(t){tools_1.Tools.DebugLog(t,"bbb")}}catch(t){tools_1.Tools.DebugLog(t,"aaa")}}else try{
let i=yield this.con.query("update signdata set updatetime =  $1 ,d1 = $2,dtype=$4 where signdate = $3 RETURNING signdate",[this.currentTimeStamp(),o,t,e])
;if(0==(null===(r=null==i?void 0:i.rows)||void 0===r?void 0:r.length)){
const i="INSERT INTO signdata(signdate,updatetime ,dtype ,d1,d3) VALUES($1, $2,$3 ,$4,$5) RETURNING signdate , dflag",n=[t,this.currentTimeStamp(),e,o,tools_1.Tools.getBeijingTimeFromDate()]
;yield this.con.query(i,n)}}catch(t){tools_1.Tools.DebugLog(t,"bbb")}}))}getShortData(t,e){return __awaiter(this,void 0,void 0,(function*(){try{
return(yield this.con.query("select d1 from signdata where signdate = $1",[""+t])).rows[0].d1}catch(t){}return""}))}remveSignUser(t){return __awaiter(this,void 0,void 0,(function*(){try{
let e=this.encHash(t);tools_1.Tools.DebugLog(t,e);let o=yield this.con.query("delete from signdata  where signdate = $1 limit 1",[e]);return tools_1.Tools.DebugLog("xxxxeeeee AAA",o),
1==(null==o?void 0:o.rowCount)}catch(t){return tools_1.Tools.DebugLog("xxxxeeeee BBB",t),!1}}))}setShortData(t,e,o){return __awaiter(this,void 0,void 0,(function*(){
const i=[t,this.currentTimeStamp(),e,o];try{yield this.con.query("INSERT INTO signdata(signdate,updatetime ,dtype ,d1) VALUES($1, $2,$3 ,$4) RETURNING signdate ",i)}catch(e){try{
yield this.con.query("update signdata set d1 = $1 ,updatetime =  $2 where signdate = $3",[o,this.currentTimeStamp(),t])}catch(t){tools_1.Tools.DebugLog(t)}}}))}setCurrentData(t){
return __awaiter(this,void 0,void 0,(function*(){tools_1.Tools.getBeijingYYYY_MM_DD();const e=[t.key,this.currentTimeStamp(),901,t.data,t.flag];try{
yield this.con.query("INSERT INTO signdata(signdate,updatetime ,dtype ,d1,d0) VALUES($1, $2,$3 ,$4,$5) RETURNING signdate , dflag",e)}catch(e){try{
yield this.con.query("update signdata set d1 = $1 ,updatetime =  $2 ,d0 = $3 where signdate = $4",[t.data,this.currentTimeStamp(),t.flag,t.key])}catch(t){tools_1.Tools.DebugLog(t)}}}))}
currentTimeStamp(){return(new Date).getTime()}decHash(t){return DbQuery.decHash(t)}static decHash(t){if(!t)return null;if("E."!=t.substring(0,2))return t
;let e=t.substring(2),o=config_1.Config.getConfig("uhashenckey");return tools_1.Tools.aesDecB64Nozip(e,o)}encHash(t){if(!t)return null;const e="E.";if(t&&t.substring(0,2)==e)return t
;let o=config_1.Config.getConfig("uhashenckey");return e+tools_1.Tools.aesEncB64Nozip(t,o)}getValues(t){return __awaiter(this,void 0,void 0,(function*(){var e
;let o="select signdate, d1,updatetime, dtype from signdata where dtype = $1 ";try{tools_1.Tools.DebugLog(o);let i=[],n=yield this.con.query(o,[t])
;if((null===(e=null==n?void 0:n.rows)||void 0===e?void 0:e.length)>0){let t=n.rows;for(let e=0;e<t.length;e++){const o=t[e]
;let n=Number(o.updatetime),s=new Date(n),r=tools_1.Tools.getBeijingTimeFromDate(s);i.push({key:o.signdate,data:o.d1,ut2:r,ut:o.updatetime})}}return i}catch(t){return tools_1.Tools.DebugLog(t),null}
}))}encUserHashes(){return __awaiter(this,void 0,void 0,(function*(){var t;let e="select signdate from signdata where dtype = $1 or dtype = $2 ";try{tools_1.Tools.DebugLog(e)
;let o=[],i=yield this.con.query(e,[333,334]);if((null===(t=null==i?void 0:i.rows)||void 0===t?void 0:t.length)>0){let t=i.rows;for(let e=0;e<t.length;e++){const i=t[e]
;o.push(this.decHash(i.signdate))}}for(let t=0;t<o.length;t++){const e=o[t];let i=this.encHash(e);tools_1.Tools.DebugLog(i,e);let n="update signdata  set signdate = $1 where signdate = $2 ";try{
yield this.con.query(n,[i,e])}catch(t){tools_1.Tools.DebugLog(t)}}}catch(t){return tools_1.Tools.DebugLog(t),null}}))}getUserhash(){return __awaiter(this,arguments,void 0,(function*(t=1){var e;try{
let o=t?tools_1.Tools.getBeijingYYYY_MM_DD()+"%":"15a1febb11aca7a205288d4bc65ce698",i=yield this.con.query("select signdate from signdata where dtype = $1 and d1 not like $2 order by RANDOM()  limit 5",[333,o])
;if((null===(e=null==i?void 0:i.rows)||void 0===e?void 0:e.length)>0){let t=i.rows,e=[];for(let o=0;o<t.length;o++){const i=t[o];e.push(this.decHash(i.signdate))}return e}return[]}catch(t){
return tools_1.Tools.DebugLog(t),null}}))}getStatus(){return __awaiter(this,void 0,void 0,(function*(){var t;tools_1.Tools.DebugLog("getStatus")
;let e=`select sum(case when d1 like  '${tools_1.Tools.getBeijingYYYY_MM_DD()}%' then 1 else 0 end) as  t1 , sum(case when d1  like '${tools_1.Tools.getBeijingYYYY_MM_DD()}%' then 0 else 1 end) as t2   from signdata where dtype = $1`,o={}
;try{let i=yield this.con.query(e,[333]);(null===(t=null==i?void 0:i.rows)||void 0===t?void 0:t.length)&&(o.signed=i.rows[0].t1,o.notsigned=i.rows[0].t2)}catch(t){tools_1.Tools.ReleaseLog(t)}try{
let t=yield DbQuery.shared().getShortData("f26a205df0d5470062b6440c6110676d",335);tools_1.Tools.DebugLog(t);let e=parseInt(""+t);if(t&&e&&!isNaN(e)){let t=new Date(e)
;o.lasttime=tools_1.Tools.getBeijingTimeFromDate(t)}}catch(t){tools_1.Tools.ReleaseLog(t)}return o}))}}exports.DbQuery=DbQuery;