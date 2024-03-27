/* minified */
"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(t,e,n,o){void 0===o&&(o=n);var i=Object.getOwnPropertyDescriptor(e,n)
;i&&!("get"in i?!e.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(t,o,i)}:function(t,e,n,o){void 0===o&&(o=n),t[o]=e[n]
}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e
}),__importStar=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)"default"!==n&&Object.prototype.hasOwnProperty.call(t,n)&&__createBinding(e,t,n)
;return __setModuleDefault(e,t),e},__importDefault=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0}),
exports.Config=void 0;const tools_1=require("./tools"),path_1=__importDefault(require("path")),fs=__importStar(require("fs"));class Config{constructor(){try{
let t=path_1.default.join(process.cwd(),"config/config.json.enc"),e=fs.readFileSync(t,{flag:"r"}).toString(),n=Config.CONFIG_ENC_KEY(),o=tools_1.Tools.aesDecB64(e,n);this.config=JSON.parse(o)
}catch(t){tools_1.Tools.ReleaseLog("cant load config"),process.exit(1)}}static CONFIG_ENC_KEY(){let t=Config.getStringFromEnv("CONFIG_ENC_KEY")
;return t||""+Config.getStringFromEnv("CONFIG_ENC_KEY1")+Config.getStringFromEnv("CONFIG_ENC_KEY2")}static getConfig(t){return Config.sharedInstance().config[t]}static sharedInstance(){
return Config.shared_instance||(Config.shared_instance=new Config),Config.shared_instance}static genEncFile(){
let t=path_1.default.join(process.cwd(),"config/config-dont-push.json"),e=fs.readFileSync(t).toString(),n=e.length%8;n&&(e+="                       ".substr(0,8-n))
;let o=Config.CONFIG_ENC_KEY(),i=tools_1.Tools.aesEncB64(e,o),r=(tools_1.Tools.aesDecB64(i,o),path_1.default.join(process.cwd(),"config/config.json.enc"));fs.writeFileSync(r,i)}static saveConfig(t,e){
try{let n=path_1.default.join(process.cwd(),"config/"+e+".enc"),o=Config.CONFIG_ENC_KEY(),i=tools_1.Tools.aesEncB64(t,o);fs.writeFileSync(n,i)}catch(t){}}static readConfig(t){try{
let e=path_1.default.join(process.cwd(),"config/"+t+".enc"),n=fs.readFileSync(e,{flag:"r"}).toString(),o=Config.CONFIG_ENC_KEY();return tools_1.Tools.aesDecB64(n,o)}catch(t){}return""}
static getStringFromEnv(t){let e=process.env[t];if(e)return e;let n=process.env["K8S_SECRET_"+t];return n?new Buffer(n,"hex").toString("utf8"):void 0}static SignIds(){let t=Config.getConfig("SignIds")
;return t.length?t:null}static platform(){let t=Config.getStringFromEnv("PLTFMFLG");return t||"None"}}exports.Config=Config;