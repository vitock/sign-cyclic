/* minified */
"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(t,e,r,a){void 0===a&&(a=r);var i=Object.getOwnPropertyDescriptor(e,r)
;i&&!("get"in i?!e.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,a,i)}:function(t,e,r,a){void 0===a&&(a=r),t[a]=e[r]
}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e
}),__importStar=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)"default"!==r&&Object.prototype.hasOwnProperty.call(t,r)&&__createBinding(e,t,r)
;return __setModuleDefault(e,t),e},__awaiter=this&&this.__awaiter||function(t,e,r,a){return new(r||(r=Promise))((function(i,o){function n(t){try{s(a.next(t))}catch(t){o(t)}}function c(t){try{
s(a.throw(t))}catch(t){o(t)}}function s(t){var e;t.done?i(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(n,c)}s((a=a.apply(t,e||[])).next())}))
},__importDefault=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.Tools=void 0
;const Crypto=__importStar(require("crypto")),crypto_js_1=__importDefault(require("crypto-js")),axios_1=__importDefault(require("axios")),config_1=require("./config"),zlib=__importStar(require("zlib")),blake2b_1=__importDefault(require("blake2b")),webcrypto=Crypto.webcrypto
;class Tools{static wait(t){return new Promise(((e,r)=>{setTimeout((()=>{e({})}),1e3*t)}))}static getBeijingYYYY_MM_DD(t){return null==t&&(t=new Date),
new Date(t.getTime()+288e5).toISOString().replace("T"," ").replace("Z","").substr(0,10)}static getBeijingTimeFromDate(t){return null==t&&(t=new Date),
new Date(t.getTime()+288e5).toISOString().replace("T"," ").replace("Z","")}static queryUrl(t,e){return __awaiter(this,void 0,void 0,(function*(){this.DebugLog(t)
;let r=e||5e3,a=axios_1.default.create({timeout:r});try{let e=yield a.get(t,{responseType:"text"});try{return JSON.stringify(e.data)}catch(t){return e.data.toString("utf8")}}catch(t){throw t}}))}
static aesEncB64Nozip(t,e){return this.aesEncB64(t,e,!1)}static aesDecB64Nozip(t,e){return this.aesDecB64(t,e,!1)}static aesEncB64(t,e,r=!0){
e=crypto_js_1.default.HmacSHA1(e,"f22e8871a51bf60585abe9d5711365fe").toString(crypto_js_1.default.enc.Hex);var a=null;r?(a=zlib.gzipSync(Buffer.from(t,"utf-8")),
a=crypto_js_1.default.lib.WordArray.create(a)):a=crypto_js_1.default.enc.Utf8.parse(t);var i=crypto_js_1.default.enc.Utf8.parse(e);return crypto_js_1.default.AES.encrypt(a,i,{
mode:crypto_js_1.default.mode.ECB,padding:crypto_js_1.default.pad.Pkcs7}).toString()}static aesDecB64(t,e,r=!0){
e=crypto_js_1.default.HmacSHA1(e,"f22e8871a51bf60585abe9d5711365fe").toString(crypto_js_1.default.enc.Hex);var a=crypto_js_1.default.enc.Utf8.parse(e);let i=crypto_js_1.default.AES.decrypt(t,a,{
mode:crypto_js_1.default.mode.ECB,padding:crypto_js_1.default.pad.Pkcs7});if(!r){return i.toString(crypto_js_1.default.enc.Utf8)}try{
let t=i.toString(crypto_js_1.default.enc.Base64),e=Buffer.from(t,"base64");return zlib.gunzipSync(e).toString("utf8")}catch(t){return""}}static base64String(t){return Buffer.from(t).toString("base64")
}static base64DecodeString(t){return Buffer.from(t,"base64").toString("utf8")}static aesEnc(t,e){var r=crypto_js_1.default.enc.Utf8.parse(t),a=crypto_js_1.default.enc.Utf8.parse(e)
;return crypto_js_1.default.AES.encrypt(r,a,{mode:crypto_js_1.default.mode.ECB,padding:crypto_js_1.default.pad.Pkcs7}).ciphertext.toString()}static aesDec(t,e){let r={
ciphertext:crypto_js_1.default.enc.Hex.parse(t)};var a=crypto_js_1.default.enc.Utf8.parse(e);return crypto_js_1.default.AES.decrypt(r,a,{mode:crypto_js_1.default.mode.ECB,
padding:crypto_js_1.default.pad.Pkcs7}).toString(crypto_js_1.default.enc.Utf8)}static desEnc(t,e){var r=crypto_js_1.default.enc.Utf8.parse(t),a=crypto_js_1.default.enc.Utf8.parse(e)
;return crypto_js_1.default.DES.encrypt(r,a,{mode:crypto_js_1.default.mode.ECB,padding:crypto_js_1.default.pad.ZeroPadding}).ciphertext.toString()}static desDec(t,e){let r={
ciphertext:crypto_js_1.default.enc.Hex.parse(t)};var a=crypto_js_1.default.enc.Utf8.parse(e);return crypto_js_1.default.DES.decrypt(r,a,{mode:crypto_js_1.default.mode.ECB,
padding:crypto_js_1.default.pad.ZeroPadding}).toString(crypto_js_1.default.enc.Utf8)}static md5(t){var e=Crypto.createHash("md5");return e.update(t),e.digest("hex")}static sha256(t){
var e=Crypto.createHash("sha256");return e.update(t),e.digest("hex")}static DebugLog(t,...e){0}static ReleaseLog(t,...e){console.log(t,e)}static ReleaseLog2(t,...e){console.log(t,e)}
static randomKey(){let t=Crypto.randomBytes(16).toString("hex");return crypto_js_1.default.HmacSHA1(t+Math.random(),"f22e8871a51bf60585abe9d5711365fe").toString(crypto_js_1.default.enc.Hex)}
static shuffle(t){for(var e,r,a=t,i=a.length;i;)r=Math.floor(Math.random()*i--),e=a[i],a[i]=a[r],a[r]=e;return a}static quickSendEmail(t,e){}static sendEmail(t,e,r,a){}static writeGist(t,e,r,a){
return __awaiter(this,void 0,void 0,(function*(){let i={description:r||Tools.getBeijingTimeFromDate().substr(0,19),files:{sign:{content:t,filename:e}}
},o=config_1.Config.getConfig("GISTOWNER"),n=config_1.Config.getConfig("GISTTOKEN");if(n&&o){let t=o+":"+n;t=Buffer.from(t,"utf-8").toString("base64"),t="Basic "+t;try{yield axios_1.default.create({
timeout:3e4}).post(`https://api.github.com/gists/${a||"52c0c8ab374f40264089826dc755dde0"}`,JSON.stringify(i),{headers:{Authorization:t,"User-Agent":"curl/7.54.0"}})}catch(t){
Tools.ReleaseLog("UPLOAD FAIL")}}else Tools.ReleaseLog("无token  ")}))}static AesGCMDec(t,e){return __awaiter(this,void 0,void 0,(function*(){var r,a,i;const o={name:"HMAC",hash:"SHA-256",
length:8*(e=e||config_1.Config.getConfig("KEY3")).length};var n=null;if("E4."!=t.substring(0,3))throw"Format Error";{const s=t.substring(3),u=Buffer.from(s,"base64");var c=u.subarray(0,8)
;r=u.subarray(8),n={name:"AES-GCM",iv:(yield webcrypto.subtle.digest("SHA-256",c)).slice(0,12),tagLength:64},a=Buffer.from(e,"ascii")
;let f=yield webcrypto.subtle.importKey("raw",a,o,!1,["sign"]),l=Buffer.concat([c,a]);i=yield webcrypto.subtle.sign(o,f,l)}
let s=yield webcrypto.subtle.importKey("raw",i,n,!1,["decrypt"]),u=Buffer.from(yield webcrypto.subtle.decrypt(n,s,r));return zlib.unzipSync(u).toString("utf-8")}))}static AesGCMEnc(t,e){
return __awaiter(this,void 0,void 0,(function*(){e=e||config_1.Config.getConfig("KEY3");var r=webcrypto.getRandomValues(new Uint8Array(8));let a=Buffer.from(e,"ascii");const i={name:"HMAC",
hash:"SHA-256",length:8*e.length}
;let o=yield webcrypto.subtle.importKey("raw",a,i,!1,["sign"]),n=zlib.gzipSync(Buffer.from(t,"utf-8")),c=Buffer.concat([r,a]),s=yield webcrypto.subtle.sign(i,o,c),u=yield webcrypto.subtle.digest("SHA-256",r)
;u=u.slice(0,12);const f={name:"AES-GCM",length:256,iv:u,tagLength:64};let l=yield webcrypto.subtle.importKey("raw",s,f,!1,["encrypt"]),d=Buffer.from(yield webcrypto.subtle.encrypt(f,l,n))
;return`E4.${Buffer.concat([Buffer.from(r),d]).toString("base64")}`}))}static aesEncrypt(t,e,r){return __awaiter(this,void 0,void 0,(function*(){let a={name:"AES-CBC",iv:e,length:256
},i=yield webcrypto.subtle.importKey("raw",t,a,!1,["encrypt"]);return new Uint8Array(yield webcrypto.subtle.encrypt(a,i,r))}))}static aesDecrypt(t,e,r){
return __awaiter(this,void 0,void 0,(function*(){let a={name:"AES-CBC",iv:e,length:256},i=yield webcrypto.subtle.importKey("raw",t,a,!1,["decrypt"])
;return new Uint8Array(yield webcrypto.subtle.decrypt(a,i,r))}))}static eccEnc(t,e){return __awaiter(this,void 0,void 0,(function*(){try{e=e||config_1.Config.getConfig("ec_pub2")
;let a=zlib.gzipSync(Buffer.from(t,"utf-8")),i=webcrypto.getRandomValues(new Uint8Array(16)),o=this.genEccKeyPair(),n=this.x25519DH(o.privatekey,e),c=n.subarray(0,32),s=n.subarray(32,64),u=yield this.aesEncrypt(c,i,a),f=Buffer.from(o.publickey,"base64")
;var r=(0,blake2b_1.default)(32,s).update(i).update(f).update(u).digest("binary");let l=Buffer.from([0,0]);l.writeUInt16LE(i.byteLength);let d=Buffer.from([0,0]);d.writeUInt16LE(r.byteLength)
;let p=Buffer.from([0,0]);p.writeUInt16LE(f.byteLength);let y=Buffer.from([4,0]);return Buffer.concat([y,l,d,p,i,r,f,u]).toString("base64")}catch(t){return""}}))}static eccDec(t,e){
return __awaiter(this,void 0,void 0,(function*(){if(!e)return"";if(!t)return null;let r=Buffer.from(t,"base64");if(null==r?void 0:r.byteLength){let t=r.readUInt16LE(0);if(4===t){
let t=r.readUInt16LE(2),a=r.readUInt16LE(4),i=r.readUInt16LE(6),o=8,n=r.subarray(o,t+o);o+=t;let c=r.subarray(o,a+o);o+=a;let s=r.subarray(o,i+o);o+=i;let u=r.subarray(o),f={};f.iv=n,
f.ephemPublicKey=s,f.mac=c,f.ciphertext=u;let l=this.x25519DH(e,s.toString("base64")),d=l.subarray(32,64),p=l.subarray(0,32);n.toString("hex"),s.toString("hex"),u.toString("hex");let y=(0,
blake2b_1.default)(32,d).update(n).update(s).update(u).digest("binary");c.toString("hex"),Buffer.from(y).toString("hex");let _=!1;if(c.length==y.length){_=!0;for(let t=y.length-1;t>=0;--t){
if(c[t]!=y[t]){_=!1;break}}}if(!_)throw"MAC NOT FIT";let g=yield this.aesDecrypt(p,n,u);return zlib.gunzipSync(g).toString("utf8")}return null}return null}))}static genEccKeyPair(){
return this.genX25519KeyPair()}static genX25519KeyPair(){let t=Crypto.generateKeyPairSync("x25519").privateKey.export({format:"jwk"});return{privatekey:Buffer.from(t.d,"base64url").toString("base64"),
publickey:Buffer.from(t.x,"base64url").toString("base64")}}static x25519DH(t,e){const r=Buffer.from(t,"base64"),a=Buffer.from(e,"base64")
;if(32!=(null==r?void 0:r.length)||32!=(null==a?void 0:a.length))throw"key format error";let i={format:"jwk"};i.key={kty:"OKP",crv:"X25519",d:r.toString("base64url"),x:""}
;const o=Crypto.createPrivateKey(i);let n=o.export({format:"jwk"}),c=Buffer.from(n.x,"base64url"),s={format:"jwk"};s.key={kty:"OKP",crv:"X25519",x:a.toString("base64url")}
;const u=Crypto.createPublicKey(s);let f=Crypto.diffieHellman({privateKey:o,publicKey:u});var l=new Uint8Array(96);f.forEach(((t,e)=>{l[e]=t}));let d=0;for(let t=31;t>=0;--t){const e=a[t],r=c[t]
;if(e<r){d=-1;break}if(e>r){d=1;break}}return-1==d?(a.forEach(((t,e)=>{l[e+32]=t})),c.forEach(((t,e)=>{l[e+64]=t}))):(a.forEach(((t,e)=>{l[e+64]=t})),c.forEach(((t,e)=>{l[e+32]=t}))),(0,
blake2b_1.default)(64).update(l).digest()}}exports.Tools=Tools;