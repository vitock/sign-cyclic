/* minified */
"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var r=Object.getOwnPropertyDescriptor(t,n)
;r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,r)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]
}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t
}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&__createBinding(t,e,n)
;return __setModuleDefault(t,e),t},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),
exports.Config=void 0;const tools_1=require("./tools"),path_1=__importDefault(require("path")),fs=__importStar(require("fs"));class Config{static CONFIG_ENC_KEY(){
let e=Config.getStringFromEnv("CONFIG_ENC_KEY");return e||""+Config.getStringFromEnv("CONFIG_ENC_KEY1")+Config.getStringFromEnv("CONFIG_ENC_KEY2")}constructor(){try{
let e=path_1.default.join(process.cwd(),"config/config.json.enc"),t=fs.readFileSync(e,{flag:"r"}).toString(),n=Config.CONFIG_ENC_KEY(),o=tools_1.Tools.aesDecB64(t,n);this.config=JSON.parse(o)
}catch(e){tools_1.Tools.ReleaseLog("cant load config"),process.exit(1)}}static getConfig(e){return Config.sharedInstance().config[e]}static sharedInstance(){
return Config.shared_instance||(Config.shared_instance=new Config),Config.shared_instance}static genEncFile(){
let e=path_1.default.join(process.cwd(),"config/config-dont-push.json"),t=fs.readFileSync(e).toString(),n=t.length%8;n&&(t+="                       ".substr(0,8-n))
;let o=Config.CONFIG_ENC_KEY(),r=tools_1.Tools.aesEncB64(t,o),i=(tools_1.Tools.aesDecB64(r,o),path_1.default.join(process.cwd(),"config/config.json.enc"));fs.writeFileSync(i,r)}static saveConfig(e,t){
try{let n=path_1.default.join(process.cwd(),"config/"+t+".enc"),o=Config.CONFIG_ENC_KEY(),r=tools_1.Tools.aesEncB64(e,o);fs.writeFileSync(n,r)}catch(e){}}static readConfig(e){try{
let t=path_1.default.join(process.cwd(),"config/"+e+".enc"),n=fs.readFileSync(t,{flag:"r"}).toString(),o=Config.CONFIG_ENC_KEY();return tools_1.Tools.aesDecB64(n,o)}catch(e){}return""}
static getStringFromEnv(e){let t=process.env[e];if(t)return t;let n=process.env["K8S_SECRET_"+e];return n?new Buffer(n,"hex").toString("utf8"):void 0}static SignIds(){let e=Config.getConfig("SignIds")
;return e.length?e:null}static platform(){let e=Config.getStringFromEnv("PLTFMFLG");return e||"None"}}exports.Config=Config,console.log(process.argv);