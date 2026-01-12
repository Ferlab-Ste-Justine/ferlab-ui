"use strict";(self.webpackChunkstorybook=self.webpackChunkstorybook||[]).push([[327],{"../packages/ui/core/pages/EntityPage/EntityVariantSummary/index.js"(__unused_webpack_module,exports,__webpack_require__){function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.EntityVariantSummary=void 0;var react_1=__importDefault(__webpack_require__("./node_modules/react/index.js")),antd_1=__webpack_require__("../packages/ui/node_modules/antd/es/index.js"),classnames_1=__importDefault(__webpack_require__("../packages/ui/node_modules/classnames/index.js")),Empty_1=__importDefault(__webpack_require__("../packages/ui/core/components/Empty/index.js")),index_module_css_1=__importDefault(__webpack_require__("../packages/ui/core/pages/EntityPage/EntityVariantSummary/index.module.css")),Text=antd_1.Typography.Text,getDescriptionPropsBasedOnTheme=function(theme){var props={},delimiter="";return"basic-bordered"===theme?(props={bordered:!0,className:index_module_css_1.default.basicBordered},delimiter=":"):props={bordered:!1},{delimiter:delimiter,props:props}},formatLabel=function(label){var delimiter=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return delimiter?react_1.default.createElement(react_1.default.Fragment,null,label," ",delimiter):label};exports.EntityVariantSummary=function(param){var data=param.data,id=param.id,loading=param.loading,noDataLabel=param.noDataLabel,_param_theme=param.theme,theme=void 0===_param_theme?"basic":_param_theme,detailsLeftSectionLength=(null==data?void 0:data.details.leftSection.items.length)||0;detailsLeftSectionLength%2!=0&&detailsLeftSectionLength++;var detailsLeftSectionCol1=null==data?void 0:data.details.leftSection.items.slice(0,detailsLeftSectionLength/2),detailsLeftSectionCol2=null==data?void 0:data.details.leftSection.items.slice(detailsLeftSectionLength/2,detailsLeftSectionLength),_getDescriptionPropsBasedOnTheme=getDescriptionPropsBasedOnTheme(theme),delimiter=_getDescriptionPropsBasedOnTheme.delimiter,descriptionProps=_getDescriptionPropsBasedOnTheme.props;return console.log("delimiter",delimiter),react_1.default.createElement("div",{className:index_module_css_1.default.summaryWrapper,id:id},react_1.default.createElement(antd_1.Card,{className:index_module_css_1.default.card,loading:loading},data?react_1.default.createElement(antd_1.Space,{className:index_module_css_1.default.space,direction:"vertical",size:"middle"},data.banner&&react_1.default.createElement("div",{className:index_module_css_1.default.bannerWrapper},data.banner.map(function(item,index){return react_1.default.createElement(antd_1.Space,{direction:"vertical",key:index,size:4},react_1.default.createElement("div",null,react_1.default.createElement(Text,{type:"secondary"},formatLabel(item.label,delimiter))),react_1.default.createElement("div",null,item.value))})),data.info&&react_1.default.createElement("div",{className:index_module_css_1.default.infoWrapper},data.info.map(function(item,index){return react_1.default.createElement("div",{key:index},item)})),data.details&&react_1.default.createElement("div",{className:index_module_css_1.default.detailsWrapper},react_1.default.createElement("div",{className:index_module_css_1.default.score},react_1.default.createElement("div",{className:index_module_css_1.default.detailsTitle},data.details.leftSection.title),react_1.default.createElement("div",{className:index_module_css_1.default.leftSection},react_1.default.createElement(antd_1.Descriptions,Object.assign({},descriptionProps,{column:1}),null==detailsLeftSectionCol1?void 0:detailsLeftSectionCol1.map(function(item,index){return react_1.default.createElement(antd_1.Descriptions.Item,{key:index,label:react_1.default.createElement(Text,{type:"secondary"},formatLabel(item.label,delimiter))},item.value)})),react_1.default.createElement(antd_1.Descriptions,Object.assign({},descriptionProps,{column:1}),null==detailsLeftSectionCol2?void 0:detailsLeftSectionCol2.map(function(item,index){return react_1.default.createElement(antd_1.Descriptions.Item,{key:index,label:react_1.default.createElement(Text,{type:"secondary"},formatLabel(item.label,delimiter))},item.value)})))),react_1.default.createElement("div",{className:index_module_css_1.default.geneSplice},data.details.middleSection.map(function(detail,index){return react_1.default.createElement(antd_1.Descriptions,Object.assign({},descriptionProps,{className:(0,classnames_1.default)(index_module_css_1.default.detailsItem,_define_property({},index_module_css_1.default.basicBordered,"basic-bordered"===theme)),column:1,key:index,title:react_1.default.createElement("span",{className:index_module_css_1.default.detailsTitle},detail.title)}),detail.items.map(function(item,index){return react_1.default.createElement(antd_1.Descriptions.Item,{key:index,label:react_1.default.createElement("span",null,react_1.default.createElement(Text,{type:"secondary"},formatLabel(item.label,delimiter)))},react_1.default.createElement("span",{className:index_module_css_1.default.detailsItemValue},item.value))}))})),react_1.default.createElement("div",{className:index_module_css_1.default.omim},react_1.default.createElement(antd_1.Descriptions,Object.assign({},descriptionProps,{column:1,title:react_1.default.createElement("span",{className:index_module_css_1.default.detailsTitle},data.details.rightSection.title)}),data.details.rightSection.items.map(function(item,index){return react_1.default.createElement(antd_1.Descriptions.Item,{key:index,label:item.label},react_1.default.createElement("span",{className:index_module_css_1.default.detailsItemValue},item.value))}))))):react_1.default.createElement(Empty_1.default,{align:"left",description:noDataLabel,noPadding:!0,showImage:!1})))},exports.default=exports.EntityVariantSummary},"../packages/ui/core/pages/EntityPage/EntityVariantSummary/index.module.css"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__),_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/styleDomAPI.js"),_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__),_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/insertBySelector.js"),_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__),_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__),_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/insertStyleElement.js"),_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__),_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/styleTagTransform.js"),_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__),_storybook_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_use_1_index_module_css__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].use[1]!../packages/ui/core/pages/EntityPage/EntityVariantSummary/index.module.css"),options={};options.styleTagTransform=_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default(),options.setAttributes=_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default(),options.insert=_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null,"head"),options.domAPI=_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default(),options.insertStyleElement=_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default(),_storybook_node_modules_storybook_builder_webpack5_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_storybook_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_use_1_index_module_css__WEBPACK_IMPORTED_MODULE_6__.A,options);let __WEBPACK_DEFAULT_EXPORT__=_storybook_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_use_1_index_module_css__WEBPACK_IMPORTED_MODULE_6__.A&&_storybook_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_use_1_index_module_css__WEBPACK_IMPORTED_MODULE_6__.A.locals?_storybook_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_use_1_index_module_css__WEBPACK_IMPORTED_MODULE_6__.A.locals:void 0},"./node_modules/@storybook/builder-webpack5/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].use[1]!../packages/ui/core/pages/EntityPage/EntityVariantSummary/index.module.css"(module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/css-loader/dist/runtime/sourceMaps.js"),_storybook_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_storybook_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_storybook_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_storybook_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_storybook_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,`.JAOOBxkcPvvT_7GG8lk7 {
    margin-bottom: 40px;
    width: 100%;
    overflow-x: scroll;
    min-width: 530px;
}

.pe13x75w1JGesbWGAncj {
    border: 1px solid;
    border-radius: 2px;
    border-color: var(--gray-4);
}
.pe13x75w1JGesbWGAncj .ant-card-body {
    padding: 16px;
}

.jIvHdm6gnNJS5gLlfB7K {
    width: 100%;
}

.gQI2kSlGpNyYIuz32rwW {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 24px;
    padding: 12px 16px;
    border: 1px solid var(--gray-4);
    border-radius: 2px;
    background-color: var(--gray-2);
    justify-content: space-between;
}

.FCrWrtnMhHzmk6b21ON3 {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, minmax(min-content, max-content));
    gap: 8px;
    padding: 12px;
    border: 1px solid var(--gray-4);
    border-radius: 2px;
}

.FCrWrtnMhHzmk6b21ON3 > *:not(:last-child) {
    border-right: 1px solid var(--gray-5);
    padding-right: 8px;
}

.m6iq7Ba0uQnGgQ7ksZNu {
    fill: var(--blue-8);
}

.oxnxxywPsAU1X5CUda4B {
    grid-area: score;
    border: 1px solid var(--gray-4);
    padding: 12px;
}

.WQkoYfwyT0bmCOtMrwMH {
    grid-area: geneSplice;
    border: 1px solid var(--gray-4);
    padding: 12px;
}

.SIXOEvDdd00Rc5u1RdAG {
    grid-area: omim;
    border: 1px solid var(--gray-4);
    padding: 12px;
}

.HyvfmtmEHv9Crh8Ys9Ov {
    display: grid;
    gap: 8px;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-areas: 'score geneSplice omim';
}
.HyvfmtmEHv9Crh8Ys9Ov .ant-descriptions-row td {
    padding-bottom: 4px;
}
.HyvfmtmEHv9Crh8Ys9Ov .ant-descriptions-item-label::after {
    color: var(--gray-7);
    margin: 0 8px 0 0;
}
.HyvfmtmEHv9Crh8Ys9Ov .ant-descriptions-header {
    margin-bottom: 8px;
}

.txieFob3p7l_4J5qUiFz {
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
    margin-bottom: 8px;
}

.YUw_o8iNdjDYo4lyoV47:not(:last-child) {
    margin-bottom: 12px;
}

.SAq8j6EnbXT0PkBWQ91U {
    display: flex;
}

.SAq8j6EnbXT0PkBWQ91U .ant-descriptions:first-child {
    margin-right: 12px;
}

.SAq8j6EnbXT0PkBWQ91U .ant-descriptions:last-child {
    margin-left: 12px;
}

.LQAPsUpmnPa0nB77zGJO {
    width: 100%;
}

.LQAPsUpmnPa0nB77zGJO .ant-descriptions-view {
    border-top: none;
    border-left: none;
    border-right: none;
}

.LQAPsUpmnPa0nB77zGJO .ant-descriptions-item-label {
    background: none;
    border-right: none;
    padding: 4px 0 !important;
}

.LQAPsUpmnPa0nB77zGJO .ant-typography.ant-typography-secondary {
    color: var(--gray-7);
}

.LQAPsUpmnPa0nB77zGJO .ant-descriptions-item-content {
    padding: 4px 0 !important;
    color: var(--gray-8);
    text-align: right;
}

@media (max-width: 1024px) {
    .gQI2kSlGpNyYIuz32rwW {
        grid-template-columns: repeat(3, 1fr);
    }
    .HyvfmtmEHv9Crh8Ys9Ov {
        grid-template-columns: 1fr 1fr;
        grid-template-areas: 'score score' 'geneSplice omim';
    }
}
`,"",{version:3,sources:["webpack://./../packages/ui/core/pages/EntityPage/EntityVariantSummary/index.module.css"],names:[],mappings:"AAAA;IACI,mBAAmB;IACnB,WAAW;IACX,kBAAkB;IAClB,gBAAgB;AACpB;;AAEA;IACI,iBAAiB;IACjB,kBAAkB;IAClB,2BAA2B;AAC/B;AACA;IACI,aAAa;AACjB;;AAEA;IACI,WAAW;AACf;;AAEA;IACI,WAAW;IACX,aAAa;IACb,2DAA2D;IAC3D,SAAS;IACT,kBAAkB;IAClB,+BAA+B;IAC/B,kBAAkB;IAClB,+BAA+B;IAC/B,8BAA8B;AAClC;;AAEA;IACI,WAAW;IACX,aAAa;IACb,kEAAkE;IAClE,QAAQ;IACR,aAAa;IACb,+BAA+B;IAC/B,kBAAkB;AACtB;;AAEA;IACI,qCAAqC;IACrC,kBAAkB;AACtB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,gBAAgB;IAChB,+BAA+B;IAC/B,aAAa;AACjB;;AAEA;IACI,qBAAqB;IACrB,+BAA+B;IAC/B,aAAa;AACjB;;AAEA;IACI,eAAe;IACf,+BAA+B;IAC/B,aAAa;AACjB;;AAEA;IACI,aAAa;IACb,QAAQ;IACR,kCAAkC;IAClC,4CAA4C;AAChD;AACA;IACI,mBAAmB;AACvB;AACA;IACI,oBAAoB;IACpB,iBAAiB;AACrB;AACA;IACI,kBAAkB;AACtB;;AAEA;IACI,eAAe;IACf,gBAAgB;IAChB,iBAAiB;IACjB,kBAAkB;AACtB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,WAAW;AACf;;AAEA;IACI,gBAAgB;IAChB,iBAAiB;IACjB,kBAAkB;AACtB;;AAEA;IACI,gBAAgB;IAChB,kBAAkB;IAClB,yBAAyB;AAC7B;;AAEA;IACI,oBAAoB;AACxB;;AAEA;IACI,yBAAyB;IACzB,oBAAoB;IACpB,iBAAiB;AACrB;;AAEA;IACI;QACI,qCAAqC;IACzC;IACA;QACI,8BAA8B;QAC9B,oDAAoD;IACxD;AACJ",sourcesContent:[`.summaryWrapper {
    margin-bottom: 40px;
    width: 100%;
    overflow-x: scroll;
    min-width: 530px;
}

.card {
    border: 1px solid;
    border-radius: 2px;
    border-color: var(--gray-4);
}
.card :global(.ant-card-body) {
    padding: 16px;
}

.space {
    width: 100%;
}

.bannerWrapper {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 24px;
    padding: 12px 16px;
    border: 1px solid var(--gray-4);
    border-radius: 2px;
    background-color: var(--gray-2);
    justify-content: space-between;
}

.infoWrapper {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, minmax(min-content, max-content));
    gap: 8px;
    padding: 12px;
    border: 1px solid var(--gray-4);
    border-radius: 2px;
}

.infoWrapper > *:not(:last-child) {
    border-right: 1px solid var(--gray-5);
    padding-right: 8px;
}

.canonicalIcon {
    fill: var(--blue-8);
}

.score {
    grid-area: score;
    border: 1px solid var(--gray-4);
    padding: 12px;
}

.geneSplice {
    grid-area: geneSplice;
    border: 1px solid var(--gray-4);
    padding: 12px;
}

.omim {
    grid-area: omim;
    border: 1px solid var(--gray-4);
    padding: 12px;
}

.detailsWrapper {
    display: grid;
    gap: 8px;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-areas: 'score geneSplice omim';
}
.detailsWrapper :global(.ant-descriptions-row) td {
    padding-bottom: 4px;
}
.detailsWrapper :global(.ant-descriptions-item-label::after) {
    color: var(--gray-7);
    margin: 0 8px 0 0;
}
.detailsWrapper :global(.ant-descriptions-header) {
    margin-bottom: 8px;
}

.detailsTitle {
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
    margin-bottom: 8px;
}

.detailsItem:not(:last-child) {
    margin-bottom: 12px;
}

.leftSection {
    display: flex;
}

.leftSection :global(.ant-descriptions):first-child {
    margin-right: 12px;
}

.leftSection :global(.ant-descriptions):last-child {
    margin-left: 12px;
}

.basicBordered {
    width: 100%;
}

.basicBordered :global(.ant-descriptions-view) {
    border-top: none;
    border-left: none;
    border-right: none;
}

.basicBordered :global(.ant-descriptions-item-label) {
    background: none;
    border-right: none;
    padding: 4px 0 !important;
}

.basicBordered :global(.ant-typography.ant-typography-secondary) {
    color: var(--gray-7);
}

.basicBordered :global(.ant-descriptions-item-content) {
    padding: 4px 0 !important;
    color: var(--gray-8);
    text-align: right;
}

@media (max-width: 1024px) {
    .bannerWrapper {
        grid-template-columns: repeat(3, 1fr);
    }
    .detailsWrapper {
        grid-template-columns: 1fr 1fr;
        grid-template-areas: 'score score' 'geneSplice omim';
    }
}
`],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={summaryWrapper:"JAOOBxkcPvvT_7GG8lk7",card:"pe13x75w1JGesbWGAncj",space:"jIvHdm6gnNJS5gLlfB7K",bannerWrapper:"gQI2kSlGpNyYIuz32rwW",infoWrapper:"FCrWrtnMhHzmk6b21ON3",canonicalIcon:"m6iq7Ba0uQnGgQ7ksZNu",score:"oxnxxywPsAU1X5CUda4B",geneSplice:"WQkoYfwyT0bmCOtMrwMH",omim:"SIXOEvDdd00Rc5u1RdAG",detailsWrapper:"HyvfmtmEHv9Crh8Ys9Ov",detailsTitle:"txieFob3p7l_4J5qUiFz",detailsItem:"YUw_o8iNdjDYo4lyoV47",leftSection:"SAq8j6EnbXT0PkBWQ91U",basicBordered:"LQAPsUpmnPa0nB77zGJO"};let __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./stories/Pages/EntityPage/EntityVariantSummary.stories.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{BasicEntityVariantSummary:()=>BasicEntityVariantSummary,BorderedEntityVariantSummary:()=>BorderedEntityVariantSummary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _ferlab_ui_core_pages_EntityPage_EntityVariantSummary__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../packages/ui/core/pages/EntityPage/EntityVariantSummary/index.js"),_ferlab_ui_core_pages_EntityPage_EntityVariantSummary__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_ferlab_ui_core_pages_EntityPage_EntityVariantSummary__WEBPACK_IMPORTED_MODULE_0__),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js");function _object_without_properties(source,excluded){if(null==source)return{};var sourceKeys,key,i,target={};if("u">typeof Reflect&&Reflect.ownKeys){for(i=0,sourceKeys=Reflect.ownKeys(source);i<sourceKeys.length;i++)key=sourceKeys[i],!(excluded.indexOf(key)>=0)&&Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key]);return target}if(target=_object_without_properties_loose(source,excluded),Object.getOwnPropertySymbols)for(i=0,sourceKeys=Object.getOwnPropertySymbols(source);i<sourceKeys.length;i++)key=sourceKeys[i],!(excluded.indexOf(key)>=0)&&Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key]);return target}function _object_without_properties_loose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.getOwnPropertyNames(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],!(excluded.indexOf(key)>=0)&&Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key]);return target}let __WEBPACK_DEFAULT_EXPORT__={title:"@ferlab/Pages/EntityPage/EntityVariantSummary",component:_ferlab_ui_core_pages_EntityPage_EntityVariantSummary__WEBPACK_IMPORTED_MODULE_0___default(),decorators:[function(Story){return react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2",null,Story),react__WEBPACK_IMPORTED_MODULE_1__.createElement(Story,null))}]};var EntityVariantSummaryStory=function(_0){var storyTitle=_0.storyTitle,props=_object_without_properties(_0,["storyTitle"]);return react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_1__.createElement("h3",null,storyTitle),react__WEBPACK_IMPORTED_MODULE_1__.createElement(_ferlab_ui_core_pages_EntityPage_EntityVariantSummary__WEBPACK_IMPORTED_MODULE_0___default(),props))},BasicEntityVariantSummary=EntityVariantSummaryStory.bind({});BasicEntityVariantSummary.args={id:"ID",loading:!1,noDataLabel:"No data available",data:{banner:[{label:"Item 1",value:"Value 1"},{label:"Item 2",value:"Value 2"},{label:"Item 3",value:"Value 3"},{label:"Item 4",value:"Value 4"},{label:"Item 5",value:"Value 5"}],info:["Item 1","Item 2","Item 3","Item 4"],details:{leftSection:{title:"Block 1",items:[{label:"Item 1",value:"Value 1"},{label:"Item 2",value:"Value 2"},{label:"Item 3",value:"Value 3"},{label:"Item 4",value:"Value 4"},{label:"Item 5",value:"Value 5"},{label:"Item 6",value:"Value 6"}]},middleSection:[{title:"Block 2.1",items:[{label:"Item 1",value:"Value 1"},{label:"Item 2",value:"Value 2"}]},{title:"Block 2.2",items:[{label:"Item 1",value:"Value 1"}]}],rightSection:{title:"Block 3",items:[{label:"Item 1",value:"Value 1"},{label:"Item 2",value:"Value 2"},{label:"Item 3",value:"Value 3"}]}}}};var BorderedEntityVariantSummary=EntityVariantSummaryStory.bind({});BorderedEntityVariantSummary.args={id:"ID",loading:!1,noDataLabel:"No data available",data:{banner:[{label:"Item 1",value:"Value 1"},{label:"Item 2",value:"Value 2"},{label:"Item 3",value:"Value 3"},{label:"Item 4",value:"Value 4"},{label:"Item 5",value:"Value 5"}],info:["Item 1","Item 2","Item 3","Item 4"],details:{leftSection:{title:"Block 1",items:[{label:"Item 1",value:"Value 1"},{label:"Item 2",value:"Value 2"},{label:"Item 3",value:"Value 3"},{label:"Item 4",value:"Value 4"},{label:"Item 5",value:"Value 5"},{label:"Item 6",value:"Value 6"}]},middleSection:[{title:"Block 2.1",items:[{label:"Item 1",value:"Value 1"},{label:"Item 2",value:"Value 2"}]},{title:"Block 2.2",items:[{label:"Item 1",value:"Value 1"}]}],rightSection:{title:"Block 3",items:[{label:"Item 1",value:"Value 1"},{label:"Item 2",value:"Value 2"},{label:"Item 3",value:"Value 3"}]}}},theme:"basic-bordered"},BasicEntityVariantSummary.parameters={...BasicEntityVariantSummary.parameters,docs:{...BasicEntityVariantSummary.parameters?.docs,source:{originalSource:`({
  storyTitle,
  ...props
}: {
  storyTitle: string;
  props: ISummaryProps;
}) => <>
        <h3>{storyTitle}</h3>
        <EntityVariantSummary {...props} />
    </>`,...BasicEntityVariantSummary.parameters?.docs?.source}}},BorderedEntityVariantSummary.parameters={...BorderedEntityVariantSummary.parameters,docs:{...BorderedEntityVariantSummary.parameters?.docs,source:{originalSource:`({
  storyTitle,
  ...props
}: {
  storyTitle: string;
  props: ISummaryProps;
}) => <>
        <h3>{storyTitle}</h3>
        <EntityVariantSummary {...props} />
    </>`,...BorderedEntityVariantSummary.parameters?.docs?.source}}};let __namedExportsOrder=["BasicEntityVariantSummary","BorderedEntityVariantSummary"]}}]);
//# sourceMappingURL=Pages-EntityPage-EntityVariantSummary-stories.03f5fc82.iframe.bundle.js.map