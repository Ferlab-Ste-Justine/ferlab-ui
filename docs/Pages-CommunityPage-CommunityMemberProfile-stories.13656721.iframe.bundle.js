(self.webpackChunkstorybook=self.webpackChunkstorybook||[]).push([[2463],{"../packages/ui/node_modules/charenc/charenc.js":module=>{var charenc={utf8:{stringToBytes:function(str){return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)))},bytesToString:function(bytes){return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)))}},bin:{stringToBytes:function(str){for(var bytes=[],i=0;i<str.length;i++)bytes.push(255&str.charCodeAt(i));return bytes},bytesToString:function(bytes){for(var str=[],i=0;i<bytes.length;i++)str.push(String.fromCharCode(bytes[i]));return str.join("")}}};module.exports=charenc},"../packages/ui/node_modules/crypt/crypt.js":module=>{!function(){var base64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",crypt={rotl:function(n,b){return n<<b|n>>>32-b},rotr:function(n,b){return n<<32-b|n>>>b},endian:function(n){if(n.constructor==Number)return 16711935&crypt.rotl(n,8)|4278255360&crypt.rotl(n,24);for(var i=0;i<n.length;i++)n[i]=crypt.endian(n[i]);return n},randomBytes:function(n){for(var bytes=[];n>0;n--)bytes.push(Math.floor(256*Math.random()));return bytes},bytesToWords:function(bytes){for(var words=[],i=0,b=0;i<bytes.length;i++,b+=8)words[b>>>5]|=bytes[i]<<24-b%32;return words},wordsToBytes:function(words){for(var bytes=[],b=0;b<32*words.length;b+=8)bytes.push(words[b>>>5]>>>24-b%32&255);return bytes},bytesToHex:function(bytes){for(var hex=[],i=0;i<bytes.length;i++)hex.push((bytes[i]>>>4).toString(16)),hex.push((15&bytes[i]).toString(16));return hex.join("")},hexToBytes:function(hex){for(var bytes=[],c=0;c<hex.length;c+=2)bytes.push(parseInt(hex.substr(c,2),16));return bytes},bytesToBase64:function(bytes){for(var base64=[],i=0;i<bytes.length;i+=3)for(var triplet=bytes[i]<<16|bytes[i+1]<<8|bytes[i+2],j=0;j<4;j++)8*i+6*j<=8*bytes.length?base64.push(base64map.charAt(triplet>>>6*(3-j)&63)):base64.push("=");return base64.join("")},base64ToBytes:function(base64){base64=base64.replace(/[^A-Z0-9+\/]/ig,"");for(var bytes=[],i=0,imod4=0;i<base64.length;imod4=++i%4)0!=imod4&&bytes.push((base64map.indexOf(base64.charAt(i-1))&Math.pow(2,-2*imod4+8)-1)<<2*imod4|base64map.indexOf(base64.charAt(i))>>>6-2*imod4);return bytes}};module.exports=crypt}()},"../packages/ui/node_modules/is-buffer/index.js":module=>{function isBuffer(obj){return!!obj.constructor&&"function"==typeof obj.constructor.isBuffer&&obj.constructor.isBuffer(obj)}function isSlowBuffer(obj){return"function"==typeof obj.readFloatLE&&"function"==typeof obj.slice&&isBuffer(obj.slice(0,0))}/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */module.exports=function(obj){return null!=obj&&(isBuffer(obj)||isSlowBuffer(obj)||!!obj._isBuffer)}},"../packages/ui/node_modules/md5/md5.js":(module,__unused_webpack_exports,__webpack_require__)=>{!function(){var crypt=__webpack_require__("../packages/ui/node_modules/crypt/crypt.js"),utf8=__webpack_require__("../packages/ui/node_modules/charenc/charenc.js").utf8,isBuffer=__webpack_require__("../packages/ui/node_modules/is-buffer/index.js"),bin=__webpack_require__("../packages/ui/node_modules/charenc/charenc.js").bin,md5=function(message,options){message.constructor==String?message=options&&"binary"===options.encoding?bin.stringToBytes(message):utf8.stringToBytes(message):isBuffer(message)?message=Array.prototype.slice.call(message,0):Array.isArray(message)||message.constructor===Uint8Array||(message=message.toString());for(var m=crypt.bytesToWords(message),l=8*message.length,a=1732584193,b=-271733879,c=-1732584194,d=271733878,i=0;i<m.length;i++)m[i]=(m[i]<<8|m[i]>>>24)&16711935|(m[i]<<24|m[i]>>>8)&4278255360;m[l>>>5]|=128<<l%32,m[(l+64>>>9<<4)+14]=l;for(var FF=md5._ff,GG=md5._gg,HH=md5._hh,II=md5._ii,i=0;i<m.length;i+=16){var aa=a,bb=b,cc=c,dd=d;a=FF(a,b,c,d,m[i+0],7,-680876936),d=FF(d,a,b,c,m[i+1],12,-389564586),c=FF(c,d,a,b,m[i+2],17,606105819),b=FF(b,c,d,a,m[i+3],22,-1044525330),a=FF(a,b,c,d,m[i+4],7,-176418897),d=FF(d,a,b,c,m[i+5],12,1200080426),c=FF(c,d,a,b,m[i+6],17,-1473231341),b=FF(b,c,d,a,m[i+7],22,-45705983),a=FF(a,b,c,d,m[i+8],7,1770035416),d=FF(d,a,b,c,m[i+9],12,-1958414417),c=FF(c,d,a,b,m[i+10],17,-42063),b=FF(b,c,d,a,m[i+11],22,-1990404162),a=FF(a,b,c,d,m[i+12],7,1804603682),d=FF(d,a,b,c,m[i+13],12,-40341101),c=FF(c,d,a,b,m[i+14],17,-1502002290),b=FF(b,c,d,a,m[i+15],22,1236535329),a=GG(a,b,c,d,m[i+1],5,-165796510),d=GG(d,a,b,c,m[i+6],9,-1069501632),c=GG(c,d,a,b,m[i+11],14,643717713),b=GG(b,c,d,a,m[i+0],20,-373897302),a=GG(a,b,c,d,m[i+5],5,-701558691),d=GG(d,a,b,c,m[i+10],9,38016083),c=GG(c,d,a,b,m[i+15],14,-660478335),b=GG(b,c,d,a,m[i+4],20,-405537848),a=GG(a,b,c,d,m[i+9],5,568446438),d=GG(d,a,b,c,m[i+14],9,-1019803690),c=GG(c,d,a,b,m[i+3],14,-187363961),b=GG(b,c,d,a,m[i+8],20,1163531501),a=GG(a,b,c,d,m[i+13],5,-1444681467),d=GG(d,a,b,c,m[i+2],9,-51403784),c=GG(c,d,a,b,m[i+7],14,1735328473),b=GG(b,c,d,a,m[i+12],20,-1926607734),a=HH(a,b,c,d,m[i+5],4,-378558),d=HH(d,a,b,c,m[i+8],11,-2022574463),c=HH(c,d,a,b,m[i+11],16,1839030562),b=HH(b,c,d,a,m[i+14],23,-35309556),a=HH(a,b,c,d,m[i+1],4,-1530992060),d=HH(d,a,b,c,m[i+4],11,1272893353),c=HH(c,d,a,b,m[i+7],16,-155497632),b=HH(b,c,d,a,m[i+10],23,-1094730640),a=HH(a,b,c,d,m[i+13],4,681279174),d=HH(d,a,b,c,m[i+0],11,-358537222),c=HH(c,d,a,b,m[i+3],16,-722521979),b=HH(b,c,d,a,m[i+6],23,76029189),a=HH(a,b,c,d,m[i+9],4,-640364487),d=HH(d,a,b,c,m[i+12],11,-421815835),c=HH(c,d,a,b,m[i+15],16,530742520),b=HH(b,c,d,a,m[i+2],23,-995338651),a=II(a,b,c,d,m[i+0],6,-198630844),d=II(d,a,b,c,m[i+7],10,1126891415),c=II(c,d,a,b,m[i+14],15,-1416354905),b=II(b,c,d,a,m[i+5],21,-57434055),a=II(a,b,c,d,m[i+12],6,1700485571),d=II(d,a,b,c,m[i+3],10,-1894986606),c=II(c,d,a,b,m[i+10],15,-1051523),b=II(b,c,d,a,m[i+1],21,-2054922799),a=II(a,b,c,d,m[i+8],6,1873313359),d=II(d,a,b,c,m[i+15],10,-30611744),c=II(c,d,a,b,m[i+6],15,-1560198380),b=II(b,c,d,a,m[i+13],21,1309151649),a=II(a,b,c,d,m[i+4],6,-145523070),d=II(d,a,b,c,m[i+11],10,-1120210379),c=II(c,d,a,b,m[i+2],15,718787259),b=II(b,c,d,a,m[i+9],21,-343485551),a=a+aa>>>0,b=b+bb>>>0,c=c+cc>>>0,d=d+dd>>>0}return crypt.endian([a,b,c,d])};md5._ff=function(a,b,c,d,x,s,t){var n=a+(b&c|~b&d)+(x>>>0)+t;return(n<<s|n>>>32-s)+b},md5._gg=function(a,b,c,d,x,s,t){var n=a+(b&d|c&~d)+(x>>>0)+t;return(n<<s|n>>>32-s)+b},md5._hh=function(a,b,c,d,x,s,t){var n=a+(b^c^d)+(x>>>0)+t;return(n<<s|n>>>32-s)+b},md5._ii=function(a,b,c,d,x,s,t){var n=a+(c^(b|~d))+(x>>>0)+t;return(n<<s|n>>>32-s)+b},md5._blocksize=16,md5._digestsize=16,module.exports=function(message,options){if(null==message)throw Error("Illegal argument "+message);var digestbytes=crypt.wordsToBytes(md5(message,options));return options&&options.asBytes?digestbytes:options&&options.asString?bin.bytesToString(digestbytes):crypt.bytesToHex(digestbytes)}}()},"./stories/Pages/CommunityPage/CommunityMemberProfile.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CommunityMembersPageStory:()=>CommunityMembersPageStory,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_ferlab_ui_core_pages_CommunityPage_CommunityMemberProfilePage__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../packages/ui/core/pages/CommunityPage/CommunityMemberProfilePage.js"),_ferlab_ui_core_pages_CommunityPage_CommunityMemberProfilePage__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_ferlab_ui_core_pages_CommunityPage_CommunityMemberProfilePage__WEBPACK_IMPORTED_MODULE_1__);let __WEBPACK_DEFAULT_EXPORT__={title:"@ferlab/Pages/Community/Profile",component:_ferlab_ui_core_pages_CommunityPage_CommunityMemberProfilePage__WEBPACK_IMPORTED_MODULE_1___default(),decorators:[function(Story){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Story,null)}]};var props={banner:{background:"background",canEditProfile:!1,navigate:{community:function(){return console.log("navigate > community")},profile:function(){return console.log("navigate > profile")}}},loading:!1,user:{accepted_terms:!0,areas_of_interest:["bladder exstrophy-epispadias complex","congenital diaphragmatic hernia"],commercial_use_reason:"true",completed_registration:!0,config:{},creation_date:new Date("2020-05-12T23:50:21.817Z"),email:"john.doe@gmail.com",first_name:"John",id:"id",keycloak_id:"keycloak_id",last_name:"Doe",linkedin:"linked.com",roles:["Research","Patient"],understand_disclaimer:!0,updated_date:new Date("2020-05-12T23:50:21.817Z"),website:"website.com"}},CommunityMembersPageStory=function(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ferlab_ui_core_pages_CommunityPage_CommunityMemberProfilePage__WEBPACK_IMPORTED_MODULE_1___default(),props)};CommunityMembersPageStory.parameters={...CommunityMembersPageStory.parameters,docs:{...CommunityMembersPageStory.parameters?.docs,source:{originalSource:"() => <CommunityMemberProfilePage {...props} />",...CommunityMembersPageStory.parameters?.docs?.source}}};let __namedExportsOrder=["CommunityMembersPageStory"]},"./node_modules/@storybook/builder-webpack5/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].use[1]!../packages/ui/core/pages/CommunityPage/CommunityMemberProfilePage.module.css":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/css-loader/dist/runtime/sourceMaps.js"),_storybook_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_storybook_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_storybook_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_storybook_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_storybook_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,`.GuJR4HzZ3CdqRgfIdI_3 {
  padding: 24px;
}

.l5WvnbVIW674ciKk8DD7 {
  width: 100%;
  max-width: 1000px;
  margin: auto;
  position: relative;
  border-radius: 4px;
  background-color: white;
}
.l5WvnbVIW674ciKk8DD7 .y3polQ8NCDh5ykWFNhWJ {
  width: 100%;
  padding: 40px;
  margin-top: -110px;
  border: 1px solid var(--gray-4);
  border-top: none;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
}
.l5WvnbVIW674ciKk8DD7 .ZEJKAn2uNHp4Z22kdaXw {
  height: 200px;
  width: 100%;
  padding: 24px;
  background-size: cover;
  background-repeat: no-repeat;
  border: 1px solid var(--gray-4);
  border-bottom: none;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
}
.l5WvnbVIW674ciKk8DD7 .Kk60bVMel7wwDYJndD2k {
  display: flex;
  justify-content: space-between;
}
.l5WvnbVIW674ciKk8DD7 .Kk60bVMel7wwDYJndD2k .arKHGfLc0OTixhYHVt_5 {
  padding: 0;
  color: var(--community-profile-banner-btn);
}
.l5WvnbVIW674ciKk8DD7 .Kk60bVMel7wwDYJndD2k .iDzXqWFQ4OoofwHCmWZ5 {
  color: var(--community-profile-banner-btn);
}
.l5WvnbVIW674ciKk8DD7 .OofayZgCVkOxyFGeuuA1 {
  margin-bottom: 0;
}
.l5WvnbVIW674ciKk8DD7 .os1cDZPcvgAf5Um8ChwZ {
  width: 100%;
}
.l5WvnbVIW674ciKk8DD7 .Z1HFIVpR1epjlGpTxVTk {
  border-width: 1.5px;
  margin: 35px 0;
}
.l5WvnbVIW674ciKk8DD7 .CntDCc_ruh4oRe4faGVA {
  background-color: transparent;
  margin-left: 14px;
}
.l5WvnbVIW674ciKk8DD7 .CntDCc_ruh4oRe4faGVA.tNL1oJCa3X135048F608 {
  margin-left: 0;
}
.l5WvnbVIW674ciKk8DD7 .CntDCc_ruh4oRe4faGVA .ant-list-empty-text {
  padding: 0;
}
.l5WvnbVIW674ciKk8DD7 .CntDCc_ruh4oRe4faGVA ul {
  list-style: disc;
}
.l5WvnbVIW674ciKk8DD7 .g_pVHoeidisfrud0Y1s8 {
  width: 200px;
}
.l5WvnbVIW674ciKk8DD7 .WTLEkbDfiqMcpGjO5GUv {
  width: 100px;
}

.D0CWMg0lfo_OPW9AapMf {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
}
`,"",{version:3,sources:["webpack://./../packages/ui/core/pages/CommunityPage/CommunityMemberProfilePage.module.css"],names:[],mappings:"AAAA;EACE,aAAa;AACf;;AAEA;EACE,WAAW;EACX,iBAAiB;EACjB,YAAY;EACZ,kBAAkB;EAClB,kBAAkB;EAClB,uBAAuB;AACzB;AACA;EACE,WAAW;EACX,aAAa;EACb,kBAAkB;EAClB,+BAA+B;EAC/B,gBAAgB;EAChB,8BAA8B;EAC9B,+BAA+B;AACjC;AACA;EACE,aAAa;EACb,WAAW;EACX,aAAa;EACb,sBAAsB;EACtB,4BAA4B;EAC5B,+BAA+B;EAC/B,mBAAmB;EACnB,2BAA2B;EAC3B,4BAA4B;AAC9B;AACA;EACE,aAAa;EACb,8BAA8B;AAChC;AACA;EACE,UAAU;EACV,0CAA0C;AAC5C;AACA;EACE,0CAA0C;AAC5C;AACA;EACE,gBAAgB;AAClB;AACA;EACE,WAAW;AACb;AACA;EACE,mBAAmB;EACnB,cAAc;AAChB;AACA;EACE,6BAA6B;EAC7B,iBAAiB;AACnB;AACA;EACE,cAAc;AAChB;AACA;EACE,UAAU;AACZ;AACA;EACE,gBAAgB;AAClB;AACA;EACE,YAAY;AACd;AACA;EACE,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,kBAAkB;EAClB,gCAAgC;AAClC",sourcesContent:[".communityMemberWrapper {\n  padding: 24px;\n}\n\n.communityMember {\n  width: 100%;\n  max-width: 1000px;\n  margin: auto;\n  position: relative;\n  border-radius: 4px;\n  background-color: white;\n}\n.communityMember .contentWrapper {\n  width: 100%;\n  padding: 40px;\n  margin-top: -110px;\n  border: 1px solid var(--gray-4);\n  border-top: none;\n  border-bottom-left-radius: 2px;\n  border-bottom-right-radius: 2px;\n}\n.communityMember .banner {\n  height: 200px;\n  width: 100%;\n  padding: 24px;\n  background-size: cover;\n  background-repeat: no-repeat;\n  border: 1px solid var(--gray-4);\n  border-bottom: none;\n  border-top-left-radius: 2px;\n  border-top-right-radius: 2px;\n}\n.communityMember .bannerActions {\n  display: flex;\n  justify-content: space-between;\n}\n.communityMember .bannerActions .communityBtn {\n  padding: 0;\n  color: var(--community-profile-banner-btn);\n}\n.communityMember .bannerActions .editButton {\n  color: var(--community-profile-banner-btn);\n}\n.communityMember .memberName {\n  margin-bottom: 0;\n}\n.communityMember .avatarContainer {\n  width: 100%;\n}\n.communityMember .divider {\n  border-width: 1.5px;\n  margin: 35px 0;\n}\n.communityMember .infoList {\n  background-color: transparent;\n  margin-left: 14px;\n}\n.communityMember .infoList.empty {\n  margin-left: 0;\n}\n.communityMember .infoList :global(.ant-list-empty-text) {\n  padding: 0;\n}\n.communityMember .infoList ul {\n  list-style: disc;\n}\n.communityMember .memberNameSkeleton {\n  width: 200px;\n}\n.communityMember .memberAssoSkeleton {\n  width: 100px;\n}\n\n.notFoundMember {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  text-align: center;\n  transform: translate(-50%, -50%);\n}\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={communityMemberWrapper:"GuJR4HzZ3CdqRgfIdI_3",communityMember:"l5WvnbVIW674ciKk8DD7",contentWrapper:"y3polQ8NCDh5ykWFNhWJ",banner:"ZEJKAn2uNHp4Z22kdaXw",bannerActions:"Kk60bVMel7wwDYJndD2k",communityBtn:"arKHGfLc0OTixhYHVt_5",editButton:"iDzXqWFQ4OoofwHCmWZ5",memberName:"OofayZgCVkOxyFGeuuA1",avatarContainer:"os1cDZPcvgAf5Um8ChwZ",divider:"Z1HFIVpR1epjlGpTxVTk",infoList:"CntDCc_ruh4oRe4faGVA",empty:"tNL1oJCa3X135048F608",memberNameSkeleton:"g_pVHoeidisfrud0Y1s8",memberAssoSkeleton:"WTLEkbDfiqMcpGjO5GUv",notFoundMember:"D0CWMg0lfo_OPW9AapMf"};let __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"../packages/ui/core/pages/CommunityPage/CommunityMemberProfilePage.module.css":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__),_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/styleDomAPI.js"),_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__),_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/insertBySelector.js"),_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__),_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__),_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/insertStyleElement.js"),_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__),_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/styleTagTransform.js"),_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__),_storybook_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_use_1_CommunityMemberProfilePage_module_css__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].use[1]!../packages/ui/core/pages/CommunityPage/CommunityMemberProfilePage.module.css"),options={};options.styleTagTransform=_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default(),options.setAttributes=_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default(),options.insert=_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null,"head"),options.domAPI=_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default(),options.insertStyleElement=_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default(),_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_storybook_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_use_1_CommunityMemberProfilePage_module_css__WEBPACK_IMPORTED_MODULE_6__.Z,options);let __WEBPACK_DEFAULT_EXPORT__=_storybook_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_use_1_CommunityMemberProfilePage_module_css__WEBPACK_IMPORTED_MODULE_6__.Z&&_storybook_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_use_1_CommunityMemberProfilePage_module_css__WEBPACK_IMPORTED_MODULE_6__.Z.locals?_storybook_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_use_1_CommunityMemberProfilePage_module_css__WEBPACK_IMPORTED_MODULE_6__.Z.locals:void 0},"../packages/ui/core/components/Gravatar/index.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __rest=this&&this.__rest||function(s,e){var t={};for(var p in s)Object.prototype.hasOwnProperty.call(s,p)&&0>e.indexOf(p)&&(t[p]=s[p]);if(null!=s&&"function"==typeof Object.getOwnPropertySymbols)for(var i=0,p=Object.getOwnPropertySymbols(s);i<p.length;i++)0>e.indexOf(p[i])&&Object.prototype.propertyIsEnumerable.call(s,p[i])&&(t[p[i]]=s[p[i]]);return t},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});var react_1=__importDefault(__webpack_require__("./node_modules/react/index.js")),md5_1=__importDefault(__webpack_require__("../packages/ui/node_modules/md5/md5.js"));exports.default=function(_a){var params,_a_alt=_a.alt,_a_circle=_a.circle,_a_id=_a.id,_a_placeholder=_a.placeholder,placeholder=void 0===_a_placeholder?"retro":_a_placeholder,_a_size=_a.size,size=void 0===_a_size?100:_a_size,props=__rest(_a,["alt","circle","id","placeholder","size"]);return react_1.default.createElement("img",Object.assign({},props,{alt:void 0===_a_alt?"Gravatar":_a_alt,src:"".concat("https://www.gravatar.com/avatar","/").concat((0,md5_1.default)((void 0===_a_id?"":_a_id).trim().toLowerCase())).concat((params={},size&&(params.s=size),placeholder&&(params.d=placeholder),"?"+new URLSearchParams(params).toString())),style:void 0!==_a_circle&&_a_circle?Object.assign({borderRadius:"50%"},props.style):props.style}))}},"../packages/ui/core/pages/CommunityPage/CommunityAvatarHeader.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});var react_1=__importDefault(__webpack_require__("./node_modules/react/index.js")),antd_1=__webpack_require__("../packages/ui/node_modules/antd/es/index.js"),Gravatar_1=__importDefault(__webpack_require__("../packages/ui/core/components/Gravatar/index.js")),stringUtils_1=__webpack_require__("../packages/ui/core/utils/stringUtils.js"),CommunityUserAvatar_1=__importDefault(__webpack_require__("../packages/ui/core/pages/CommunityPage/CommunityUserAvatar.js")),CommunityMemberProfilePage_module_css_1=__importDefault(__webpack_require__("../packages/ui/core/pages/CommunityPage/CommunityMemberProfilePage.module.css"));exports.default=function(param){var _param_loading=param.loading,src=param.src,user=param.user;return void 0!==_param_loading&&_param_loading||!user?react_1.default.createElement(antd_1.Space,{align:"center",className:CommunityMemberProfilePage_module_css_1.default.avatarContainer,direction:"vertical",size:16},react_1.default.createElement(antd_1.Skeleton.Avatar,{active:!0,size:140}),react_1.default.createElement(antd_1.Space,{align:"center",direction:"vertical",size:8},react_1.default.createElement(antd_1.Skeleton,{active:!0,className:CommunityMemberProfilePage_module_css_1.default.memberNameSkeleton,loading:!0,paragraph:!1}),react_1.default.createElement(antd_1.Skeleton,{active:!0,className:CommunityMemberProfilePage_module_css_1.default.memberAssoSkeleton,loading:!0,paragraph:!1}))):react_1.default.createElement(antd_1.Space,{align:"center",className:CommunityMemberProfilePage_module_css_1.default.avatarContainer,direction:"vertical",size:16},(null==user?void 0:user.profile_image_key)?react_1.default.createElement(CommunityUserAvatar_1.default,{shape:"round",size:140,src:src}):react_1.default.createElement(Gravatar_1.default,{circle:!0,id:"".concat(user.first_name).concat(user.last_name),size:140}),react_1.default.createElement(antd_1.Space,{align:"center",direction:"vertical",size:8},react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement(antd_1.Typography.Title,{className:CommunityMemberProfilePage_module_css_1.default.memberName,level:3},(0,stringUtils_1.formatUserName)(user)),(null==user?void 0:user.affiliation)&&react_1.default.createElement(antd_1.Typography.Text,{type:"secondary"},null==user?void 0:user.affiliation),((null==user?void 0:user.location_country)||(null==user?void 0:user.location_state))&&react_1.default.createElement(antd_1.Typography.Text,{type:"secondary"},(0,stringUtils_1.formatCountryAndState)(user)))))}},"../packages/ui/core/pages/CommunityPage/CommunityBanner.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.DEFAULT_COMMUNITY_BANNER_DICTIONARY=void 0;var react_1=__importDefault(__webpack_require__("./node_modules/react/index.js")),icons_1=__webpack_require__("../packages/ui/node_modules/@ant-design/icons/es/index.js"),antd_1=__webpack_require__("../packages/ui/node_modules/antd/es/index.js"),CommunityMemberProfilePage_module_css_1=__importDefault(__webpack_require__("../packages/ui/core/pages/CommunityPage/CommunityMemberProfilePage.module.css"));exports.DEFAULT_COMMUNITY_BANNER_DICTIONARY={communityButton:"Community",editProfile:"Edit Profile"},exports.default=function(param){var background=param.background,canEditProfile=param.canEditProfile,_param_dictionary=param.dictionary,dictionary=void 0===_param_dictionary?exports.DEFAULT_COMMUNITY_BANNER_DICTIONARY:_param_dictionary,navigate=param.navigate;return react_1.default.createElement("div",{className:CommunityMemberProfilePage_module_css_1.default.banner,style:{background:'url("'.concat(background,'")')}},react_1.default.createElement("div",{className:CommunityMemberProfilePage_module_css_1.default.bannerActions},react_1.default.createElement(antd_1.Button,{className:CommunityMemberProfilePage_module_css_1.default.communityBtn,icon:react_1.default.createElement(icons_1.ArrowLeftOutlined,null),onClick:navigate.community,type:"link"},dictionary.communityButton),canEditProfile&&react_1.default.createElement(antd_1.Button,{className:CommunityMemberProfilePage_module_css_1.default.editBtn,ghost:!0,icon:react_1.default.createElement(icons_1.EditOutlined,null),onClick:navigate.profile,type:"primary"},dictionary.editProfile)))}},"../packages/ui/core/pages/CommunityPage/CommunityMemberProfile.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.CommunityMemberProfile=exports.DEFAULT_COMMUNITY_MEMBER_PROFILE_DICTIONARY=void 0;var react_1=__importDefault(__webpack_require__("./node_modules/react/index.js")),icons_1=__webpack_require__("../packages/ui/node_modules/@ant-design/icons/es/index.js"),antd_1=__webpack_require__("../packages/ui/node_modules/antd/es/index.js"),classnames_1=__importDefault(__webpack_require__("../packages/ui/node_modules/classnames/index.js")),Empty_1=__importDefault(__webpack_require__("../packages/ui/core/components/Empty/index.js")),CommunityMemberProfilePage_module_css_1=__importDefault(__webpack_require__("../packages/ui/core/pages/CommunityPage/CommunityMemberProfilePage.module.css"));exports.DEFAULT_COMMUNITY_MEMBER_PROFILE_DICTIONARY={interests:{noInterest:"No interests",title:"Area of interest"},linkedin:"Linkedin",roles:{noRole:"No role",title:"Role"},website:"Website"},exports.CommunityMemberProfile=function(param){var _a,_b,_c,_d,_e,_f,_param_dictionary=param.dictionary,dictionary=void 0===_param_dictionary?exports.DEFAULT_COMMUNITY_MEMBER_PROFILE_DICTIONARY:_param_dictionary,options=param.options,user=param.user;return react_1.default.createElement(antd_1.Row,{gutter:[80,28]},react_1.default.createElement(antd_1.Col,{md:18},react_1.default.createElement(antd_1.Row,{gutter:[28,28]},react_1.default.createElement(antd_1.Col,{span:24},react_1.default.createElement(antd_1.Typography.Title,{level:4},dictionary.roles.title),react_1.default.createElement(antd_1.List,{className:(0,classnames_1.default)(CommunityMemberProfilePage_module_css_1.default.infoList,_define_property({},CommunityMemberProfilePage_module_css_1.default.empty,(null!==(_b=null===(_a=null==user?void 0:user.roles)||void 0===_a?void 0:_a.length)&&void 0!==_b?_b:[])===0)),dataSource:options.roles.filter(function(role){var _a;return null===(_a=null==user?void 0:user.roles)||void 0===_a?void 0:_a.includes(role.value)}),itemLayout:"horizontal",locale:{emptyText:react_1.default.createElement(Empty_1.default,{align:"left",description:dictionary.roles.noRole,noPadding:!0,showImage:!1})},renderItem:function(role,index){return react_1.default.createElement("li",{key:index},role.label)}})),(null!==(_c=null==user?void 0:user.areas_of_interest)&&void 0!==_c?_c:[]).length>0&&react_1.default.createElement(antd_1.Col,{span:24},react_1.default.createElement(antd_1.Typography.Title,{level:4},dictionary.interests.title),react_1.default.createElement(antd_1.List,{className:(0,classnames_1.default)(CommunityMemberProfilePage_module_css_1.default.infoList,_define_property({},CommunityMemberProfilePage_module_css_1.default.empty,(null!==(_e=null===(_d=null==user?void 0:user.areas_of_interest)||void 0===_d?void 0:_d.length)&&void 0!==_e?_e:[])===0)),dataSource:(null!==(_f=options.interests)&&void 0!==_f?_f:[]).filter(function(interest){var _a;return null===(_a=null==user?void 0:user.areas_of_interest)||void 0===_a?void 0:_a.includes(interest.value)}),itemLayout:"horizontal",locale:{emptyText:react_1.default.createElement(Empty_1.default,{align:"left",description:dictionary.interests.noInterest,noPadding:!0,showImage:!1})},renderItem:function(interest,index){return react_1.default.createElement("li",{key:index},interest.label)}})))),react_1.default.createElement(antd_1.Col,{md:6},react_1.default.createElement(antd_1.Space,{className:CommunityMemberProfilePage_module_css_1.default.linksContainer,direction:"vertical"},(null==user?void 0:user.linkedin)&&react_1.default.createElement(antd_1.Button,{className:CommunityMemberProfilePage_module_css_1.default.link,href:user.linkedin,icon:react_1.default.createElement(icons_1.LinkedinFilled,null),target:"_blank",type:"link"},dictionary.linkedin),(null==user?void 0:user.website)&&react_1.default.createElement(antd_1.Button,{className:CommunityMemberProfilePage_module_css_1.default.link,href:user.website,icon:react_1.default.createElement(icons_1.GlobalOutlined,null),target:"_blank",type:"link"},dictionary.website))))}},"../packages/ui/core/pages/CommunityPage/CommunityMemberProfilePage.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);(!desc||("get"in desc?!m.__esModule:desc.writable||desc.configurable))&&(desc={enumerable:!0,get:function get(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(o,v){Object.defineProperty(o,"default",{enumerable:!0,value:v})}:function(o,v){o.default=v}),__importStar=this&&this.__importStar||function(mod){if(mod&&mod.__esModule)return mod;var result={};if(null!=mod)for(var k in mod)"default"!==k&&Object.prototype.hasOwnProperty.call(mod,k)&&__createBinding(result,mod,k);return __setModuleDefault(result,mod),result},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.CommunityMemberProfilePage=exports.DEFAULT_COMMUNITY_MEMBER_PROFILE_PAGE_DICTIONARY=void 0;var react_1=__importDefault(__webpack_require__("./node_modules/react/index.js")),antd_1=__webpack_require__("../packages/ui/node_modules/antd/es/index.js"),CommunityAvatarHeader_1=__importDefault(__webpack_require__("../packages/ui/core/pages/CommunityPage/CommunityAvatarHeader.js")),CommunityBanner_1=__importStar(__webpack_require__("../packages/ui/core/pages/CommunityPage/CommunityBanner.js")),CommunityMemberProfile_1=__webpack_require__("../packages/ui/core/pages/CommunityPage/CommunityMemberProfile.js"),CommunityMemberProfilePage_module_css_1=__importDefault(__webpack_require__("../packages/ui/core/pages/CommunityPage/CommunityMemberProfilePage.module.css"));exports.DEFAULT_COMMUNITY_MEMBER_PROFILE_PAGE_DICTIONARY={banner:CommunityBanner_1.DEFAULT_COMMUNITY_BANNER_DICTIONARY,profile:CommunityMemberProfile_1.DEFAULT_COMMUNITY_MEMBER_PROFILE_DICTIONARY},exports.CommunityMemberProfilePage=function(param){var avatar=param.avatar,banner=param.banner,_param_dictionary=param.dictionary,dictionary=void 0===_param_dictionary?exports.DEFAULT_COMMUNITY_MEMBER_PROFILE_PAGE_DICTIONARY:_param_dictionary,loading=param.loading,options=param.options,user=param.user;return react_1.default.createElement("div",{className:CommunityMemberProfilePage_module_css_1.default.communityMemberWrapper},react_1.default.createElement("div",{className:CommunityMemberProfilePage_module_css_1.default.communityMember},react_1.default.createElement(CommunityBanner_1.default,Object.assign({},banner,{dictionary:dictionary.banner})),react_1.default.createElement("div",{className:CommunityMemberProfilePage_module_css_1.default.contentWrapper},react_1.default.createElement(CommunityAvatarHeader_1.default,Object.assign({},avatar,{loading:loading,user:user})),react_1.default.createElement(antd_1.Divider,{className:CommunityMemberProfilePage_module_css_1.default.divider}),loading?react_1.default.createElement(antd_1.Skeleton,{active:!0,paragraph:{rows:6}}):react_1.default.createElement(CommunityMemberProfile_1.CommunityMemberProfile,{dictionary:dictionary.profile,options:options,user:user}))))},exports.default=exports.CommunityMemberProfilePage},"../packages/ui/core/pages/CommunityPage/CommunityUserAvatar.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});var react_1=__importDefault(__webpack_require__("./node_modules/react/index.js")),classnames_1=__importDefault(__webpack_require__("../packages/ui/node_modules/classnames/index.js")),CommunityMemberProfilePage_module_css_1=__importDefault(__webpack_require__("../packages/ui/core/pages/CommunityPage/CommunityMemberProfilePage.module.css"));exports.default=function(param){var className=param.className,_param_shape=param.shape,_param_size=param.size,size=void 0===_param_size?24:_param_size,src=param.src;return react_1.default.createElement("img",{className:(0,classnames_1.default)(className,_define_property({},CommunityMemberProfilePage_module_css_1.default.userAvatarRound,"round"===(void 0===_param_shape?"round":_param_shape))),height:size,src:null!=src?src:"",width:size})}},"../packages/ui/core/utils/stringUtils.js":(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.formatCountryAndState=exports.formatUserName=exports.truncateString=exports.toKebabCase=exports.titleCase=exports.addUnderscoreAndLowercase=exports.removeUnderscoreAndCapitalize=void 0,exports.removeUnderscoreAndCapitalize=function(word){for(var frags=word.split("_"),i=0;i<frags.length;i++)frags[i]=frags[i].charAt(0).toUpperCase()+frags[i].slice(1);return frags.join(" ")},exports.addUnderscoreAndLowercase=function(phrase){for(var words=phrase.split(" "),i=0;i<words.length;i++)words[i]=words[i].charAt(0).toLowerCase()+words[i].slice(1);return words.join("_")},exports.titleCase=function(word){for(var frags=word.split(" "),i=0;i<frags.length;i++)frags[i]=frags[i].charAt(0).toUpperCase()+frags[i].slice(1);return frags.join(" ")};var KEBAB_REGEX=/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;exports.toKebabCase=function(str){return(str&&str.match(KEBAB_REGEX)||[]).map(function(x){return x.toLowerCase()}).join("-")},exports.truncateString=function(text,maxLength){return"".concat(text.substring(0,maxLength)).concat(text.length>maxLength?"...":"")},exports.formatUserName=function(user){var _a;return user.first_name&&user.last_name?"".concat(user.first_name," ").concat(user.last_name):null!==(_a=user.email)&&void 0!==_a?_a:""},exports.formatCountryAndState=function(user){return user.location_state&&user.location_country?"".concat(user.location_state,", ").concat(user.location_country):user.location_state?"".concat(user.location_state):"".concat(user.location_country)}}}]);
//# sourceMappingURL=Pages-CommunityPage-CommunityMemberProfile-stories.13656721.iframe.bundle.js.map