"use strict";(self.webpackChunkstorybook=self.webpackChunkstorybook||[]).push([[8874],{"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[16].use[2]!../packages/ui/core/components/filters/TextInputFilter.module.scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/cssWithMappingToString.js"),_storybook_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_storybook_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__),_storybook_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_storybook_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_storybook_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,"._87AQNXuIeqHLBb5loJz42w\\=\\= .kguNtMz-GrLexCYoHtEf2w\\=\\={margin-bottom:.4rem}._87AQNXuIeqHLBb5loJz42w\\=\\= .kguNtMz-GrLexCYoHtEf2w\\=\\= .XfG-Wdml2mf30KMHx2Y2fQ\\=\\={line-height:20px;font-weight:600;font-size:12px}._87AQNXuIeqHLBb5loJz42w\\=\\= .kguNtMz-GrLexCYoHtEf2w\\=\\= .pFaGi-7wOUlMqUJe\\+02dZQ\\=\\={margin-left:5px;display:flex;align-items:center}._87AQNXuIeqHLBb5loJz42w\\=\\= .kguNtMz-GrLexCYoHtEf2w\\=\\= .pFaGi-7wOUlMqUJe\\+02dZQ\\=\\= svg{width:12.25px;height:12.25px}._87AQNXuIeqHLBb5loJz42w\\=\\= .NT6lrtO3Ky-Wexc4xsW3KQ\\=\\={border-color:#dd1f2a}._87AQNXuIeqHLBb5loJz42w\\=\\= .Z6-fUCubdH2AQcf6YbhUvQ\\=\\={border-top:1px solid #d9d9d9;justify-content:flex-end;padding-top:16px;margin-top:13px}._87AQNXuIeqHLBb5loJz42w\\=\\= .Z6-fUCubdH2AQcf6YbhUvQ\\=\\= .XWoXrQK9N40V-QAQVt7JIg\\=\\=:disabled{color:#8a8da8}._87AQNXuIeqHLBb5loJz42w\\=\\= .Z6-fUCubdH2AQcf6YbhUvQ\\=\\= .XWoXrQK9N40V-QAQVt7JIg\\=\\=:disabled span{text-decoration:none;color:#8a8da8}._87AQNXuIeqHLBb5loJz42w\\=\\= .Z6-fUCubdH2AQcf6YbhUvQ\\=\\= .yu7d4y3oT7IwXp6qR1XNog\\=\\= button:disabled{color:#8a8da8}._87AQNXuIeqHLBb5loJz42w\\=\\= .Z6-fUCubdH2AQcf6YbhUvQ\\=\\= .yu7d4y3oT7IwXp6qR1XNog\\=\\= button:disabled span{text-decoration:none;color:#8a8da8}","",{version:3,sources:["webpack://./../packages/ui/core/components/filters/TextInputFilter.module.scss","webpack://./../packages/ui/themes/default/_theme.template.scss"],names:[],mappings:"AAGE,yDACE,mBAAA,CAEA,qFACE,gBAAA,CACA,eCJa,CDKb,cAAA,CAGF,sFACE,eAAA,CACA,YAAA,CACA,kBAAA,CAEA,0FACE,aAAA,CACA,cAAA,CAKN,yDACE,oBCqF8B,CDlFhC,yDACE,4BAAA,CACA,wBAAA,CACA,gBAAA,CACA,eAAA,CAGE,8FACE,aCyEwB,CDvExB,mGACE,oBAAA,CACA,aCqEsB,CD9DxB,qGACE,aC6DsB,CD3DtB,0GACE,oBAAA,CACA,aCyDoB",sourcesContent:['@import "theme.template";\n\n.fuiTIfContainer {\n  .fuiTIfLabelContainer {\n    margin-bottom: 0.4rem;\n\n    .fuiTIfSectionTitle {\n      line-height: 20px;\n      font-weight: $font-weight-bold;\n      font-size: 12px;\n    }\n\n    .fuiTIfLabelTooltipIcon {\n      margin-left: 5px;\n      display: flex;\n      align-items: center;\n\n      svg {\n        width: 12.25px;\n        height: 12.25px;\n      }\n    }\n  }\n\n  .inputError {\n    border-color: $filter-input-error-border-color;\n  }\n\n  .fuiTIfActions {\n    border-top: 1px solid $filter-actions-border-color;\n    justify-content: flex-end;\n    padding-top: 16px;\n    margin-top: 13px;\n\n    .fuiTIfActionsClear {\n      &:disabled {\n        color: $filter-actions-disabled-color;\n\n        span {\n          text-decoration: none;\n          color: $filter-actions-disabled-color;\n        }\n      }\n    }\n\n    .fuiTIfActionsApply {\n      button {\n        &:disabled {\n          color: $filter-actions-disabled-color;\n\n          span {\n            text-decoration: none;\n            color: $filter-actions-disabled-color;\n          }\n        }\n      }\n    }\n  }\n}\n',"@import 'colors';\n@import 'mixins';\n\n$font-weight-semibold: 500;\n$font-weight-bold: 600;\n\n$default-page-content-padding: 24px;\n$main-header-height: 64px;\n\n$heading-color: $gray-9;\n\n// QueryBuilder\n$query-default-action-default-color: black;\n$query-default-action-hover-color: black;\n$query-default-action-focus-color: black;\n\n$query-builder-bg: $white;\n$query-builder-border-color: #d8e1eb;\n$query-builder-header-border-divider-color: #d8e1eb;\n$query-builder-collapse-content-box-padding: 12px 8px;\n$query-builder-content-padding: 24px;\n\n$query-builder-header-tools-icon-color: black;\n$query-builder-header-tools-icon-hover: black;\n$query-builder-header-tools-icon-focus: black;\n$query-builder-header-tools-icon-color-dirty: #d16f13;\n$query-builder-header-tools-favorite-icon-color: #f5b800;\n\n$query-bar-bg: #f1f4f8;\n$query-bar-bg-active: #ffefc1;\n$query-bar-border-color: #bcc9dc;\n$query-bar-border-color-active: #ffdc73;\n$query-bar-height: 100%;\n$query-bar-padding-top: 8px;\n$query-bar-padding-bottom: 8px;\n$query-bar-padding-right: 12px;\n$query-bar-padding-left: 12px;\n$query-bar-padding: $query-bar-padding-top $query-bar-padding-right $query-bar-padding-bottom $query-bar-padding-left;\n\n$query-bar-identifier: #bcc9dc;\n$query-bar-identifier-width: 4px;\n$query-bar-identifier-active: #f5b800;\n\n$query-pill-bg: #dde4ee;\n$query-pill-bg-active: #ffc926;\n$query-pill-button-default-color: $query-default-action-default-color;\n$query-pill-button-hover-color: $query-default-action-hover-color;\n$query-pill-button-focus-color: $query-default-action-focus-color;\n\n$custom-pill-bg: #dde4ee;\n$custom-pill-bg-active: #ffc926;\n$custom-pill-button-default-color: $query-default-action-default-color;\n$custom-pill-button-hover-color: $query-default-action-hover-color;\n$custom-pill-button-focus-color: $query-default-action-focus-color;\n\n$query-values-bg: $white;\n$query-values-button-default-color: $query-default-action-default-color;\n$query-values-button-hover-color: $query-default-action-hover-color;\n$query-values-button-focus-color: $query-default-action-focus-color;\n\n$query-combiner-button-default-color: $query-default-action-default-color;\n$query-combiner-button-hover-color: $query-default-action-hover-color;\n$query-combiner-button-focus-color: $query-default-action-focus-color;\n\n$query-icon-operator-color: #5a77a0;\n$query-text-operator-color-hover: #26436e;\n$query-icon-operator-color-hover: #26436e;\n$query-icon-label-operator-color: #26436e;\n$query-total-color: inherit;\n\n// CountWithIcon\n$multi-label-inline-label-size: 1.4rem;\n$multi-label-inline-label-weight: 600;\n$multi-label-inline-sub-label-size: 1.4rem;\n$multi-label-inline-sub-label-weight: 600;\n$multi-label-inline-icon-space: 0.6rem;\n$multi-label-inline-label-space: 0.5rem;\n\n$multi-label-stack-label-size: 1.6rem;\n$multi-label-stack-label-weight: 600;\n$multi-label-stack-sub-label-size: inherit;\n$multi-label-stack-sub-label-weight: normal;\n$multi-label-stack-icon-space: 1.6rem;\n\n$multi-label-stack-top-icon-space: 1rem;\n\n// widget\n$authorized-studies-widget-authenticated-header-height: 24px;\n$authorized-studies-widget-authenticated-header-margin-bottom: 8px;\n\n// Filters\n$toggle-filter-sc-button-color: #008fc7;\n$range-filter-grouped-inputs-spacer-color: #b5c6d8;\n$range-filter-grouped-inputs-color-color: #d9d9d9;\n$checkbox-filter-item-font-size: inherit;\n$checkbox-filter-item-line-height: inherit;\n$checkbox-filter-types-mc-footer: #0075a2;\n$checkbox-filter-links-hover: #0075a2;\n$checkbox-filter-link-font-size: inherit;\n$checkbox-filter-link-line-height: inherit;\n$checkbox-filter-actions-separator-background: #90a9c1;\n$checkbox-filter-actions-separator-links: #008fc7;\n$filter-no-results-text-background-color: #f0f3f8;\n$filter-no-results-text-color: #18486b;\n\n$filter-input-label-color: #000;\n$filter-actions-border-color: #d9d9d9;\n$filter-actions-disabled-border-color: #d7d8db;\n$filter-actions-disabled-background-color: #f3f4f6;\n$filter-actions-disabled-color: #8a8da8;\n$filter-input-error-border-color: #dd1f2a;\n\n$filter-container-header-has-filter-icon-color: #389e0d;\n\n// SidebarMenu\n$sidebar-menu-width: 180px;\n$sidebar-menu-collapsed-width: 50px;\n$sidebar-menu-background-color: #007694;\n$sidebar-menu-toggle-icon-size: 21px;\n\n$sidebar-menu-item-icon-size: 24px;\n$sidebar-menu-item-height: 50px;\n$sidebar-menu-item-text-color: #fff;\n$sidebar-menu-item-active-background-color: #00546e;\n$sidebar-menu-item-active-color: #fff;\n$sidebar-menu-item-hover-color: #fff;\n$sidebar-menu-item-hover-opacity: 0.8;\n$sidebar-menu-item-border-focus-color: #003447;\n\n$sidebar-quick-filter-input-box-shadow-hover: 0 0 0 2px #00546e;\n$sidebar-quick-filter-input-box-shadow-focus: 0 0 0 2px #007694, 0 0 0 3px white;\n$sidebar-quick-filter-input-placeholder-color: #8a8da8;\n$sidebar-quick-filter-input-text-color: #383f72;\n$sidebar-quick-filter-input-border-color-focus: #007694;\n$sidebar-quick-filter-higlight-color: $blue-2;\n\n$sidebar-content-panel-padding: 16px;\n$sidebar-content-panel-width: 320px;\n$sidebar-content-panel-close-icon-color: #007694;\n$sidebar-content-panel-right-border: 1px solid #d7d8db;\n$sidebar-content-panel-background-color: transparent;\n$sidebar-content-panel-close-icon-width: 16px;\n\n// Grid Card V2\n$grid-card-light-background-color: white;\n$grid-card-shade-background-color: #f8fafc;\n\n// Empty\n$empty-image-color: #b5c6d8;\n$empty-content-color: #486f90;\n$empty-content-mini-padding: 30px 0;\n$empty-content-default-padding: 50px 0;\n$empty-content-large-padding: 50px 0;\n\n// link\n$link-base-color: $blue-8;\n\n// Collapse\n$collapse-light-background-color: white;\n$collapse-shade-background-color: #f8fafc;\n$collapse-header-border-color: #e1e8ef;\n\n// ProLabel\n$prolabel-required-mark-color: #a8071a;\n\n// UploadIds\n$file-upload-item-color: #1890ff;\n\n// Variant Entity\n$variant-tag-color: #531dab;\n$variant-tag-bg-color: #efdbff;\n$canonical-icon-color: $blue-8;\n\n// Entities\n$entity-icon-size: 20px;\n$summary-bg-color: $gray-3;\n\n// color tag default\n$color-tag-default-bg: $gray-4;\n$color-tag-default-color: $gray-8;\n\n// color tag family\n$color-tag-boolean-true-bg: $green-2;\n$color-tag-boolean-true-color: $green-9;\n\n// color tag gender\n$color-tag-gender-female-bg: $magenta-2;\n$color-tag-gender-female-color: $magenta-9;\n$color-tag-gender-male-bg: $blue-2;\n$color-tag-gender-male-color: $blue-9;\n\n// color tag family\n$color-tag-family-bg: $cyan-2;\n$color-tag-family-color: $cyan-9;\n\n// color tag position\n$color-tag-position-proband-bg: $purple-2;\n$color-tag-position-proband-color: $purple-7;\n\n// color tag vital status\n$color-tag-vital-status-alive-bg: $green-2;\n$color-tag-vital-status-alive-color: $green-9;\n$color-tag-vital-status-deceased-bg: $red-2;\n$color-tag-vital-status-deceased-color: $red-9;\n\n// color tag interpretation\n$color-tag-interpretation-observed-bg: $green-2;\n$color-tag-interpretation-observed-color: $green-9;\n\n// color tag pathegenic\n$color-tag-pathogenic-bg: $red-2;\n$color-tag-pathogenic-color: $red-9;\n\n// color tag benign\n$color-tag-benign-bg: $green-2;\n$color-tag-benign-color: $green-9;\n\n// Maintenance\n$maintenance-page-bg: $gray-3;\n$maintenance-page-title: $gray-8;\n$maintenance-page-subtitle: $gray-9;\n\n// chart\n$chart-title-color: $gray-8;\n\n// landing page\n$landing-card-gradient: linear-gradient(346deg, #1c3863 20.53%, #0369a1 100.05%),\n    linear-gradient(299deg, #0369a1 0.84%, #1c3863 100.02%), #f0f3f8;\n$landing-cavatica-gradient: linear-gradient(300deg, rgba(210, 54, 254, 0.3) 0%, rgba(0, 170, 221, 0.3) 100%), #2e3f50;\n$landing-text-color: $gray-8;\n$landing-text-color-invert: $gray-1;\n$landing-text-icon-color-light: $blue-3;\n$landing-text-icon-color-dark: $gray-8;\n$landing-spot-icon-color-light: $blue-8;\n$landing-spot-icon-color-dark: $blue-3;\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={fuiTIfContainer:"_87AQNXuIeqHLBb5loJz42w==",fuiTIfLabelContainer:"kguNtMz-GrLexCYoHtEf2w==",fuiTIfSectionTitle:"XfG-Wdml2mf30KMHx2Y2fQ==",fuiTIfLabelTooltipIcon:"pFaGi-7wOUlMqUJe+02dZQ==",inputError:"NT6lrtO3Ky-Wexc4xsW3KQ==",fuiTIfActions:"Z6-fUCubdH2AQcf6YbhUvQ==",fuiTIfActionsClear:"XWoXrQK9N40V-QAQVt7JIg==",fuiTIfActionsApply:"yu7d4y3oT7IwXp6qR1XNog=="};let __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[16].use[2]!../packages/ui/core/components/filters/ToggleFilter.module.scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/cssWithMappingToString.js"),_storybook_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_storybook_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__),_storybook_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_storybook_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_storybook_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,"._8\\+AZsRYW0qtCPVH1P0qAfw\\=\\={display:flex;flex-direction:column;width:100%}._8\\+AZsRYW0qtCPVH1P0qAfw\\=\\= .ant-radio-wrapper:last-child{margin-bottom:0}._8\\+AZsRYW0qtCPVH1P0qAfw\\=\\=>*{margin-bottom:.8rem;width:100%}._8\\+AZsRYW0qtCPVH1P0qAfw\\=\\=>label{display:flex}._8\\+AZsRYW0qtCPVH1P0qAfw\\=\\=>label>span:last-child{display:flex;justify-content:space-between;width:100%;padding-right:0px}.BTaPVO4k33KVhYjnFbepLg\\=\\={padding:0 7px;height:auto;color:#008fc7}.HW2759Y0RRR9Ww223sqyLA\\=\\={border-top:1px solid #d9d9d9;display:flex;justify-content:flex-end;margin-top:17px;padding-top:13px}.UNq\\+TgjV4c\\+3hy2MoiOzxw\\=\\={background:#f0f3f8;color:#18486b;font-size:14px;line-height:22px;padding:8px 16px;width:100%}","",{version:3,sources:["webpack://./../packages/ui/core/components/filters/ToggleFilter.module.scss","webpack://./../packages/ui/themes/default/_theme.template.scss"],names:[],mappings:"AAEE,8BACE,YAAA,CACA,qBAAA,CACA,UAAA,CAGE,4DACE,eAAA,CAIJ,gCACE,mBAAA,CACA,UAAA,CAGF,oCACE,YAAA,CAGF,oDACE,YAAA,CACA,6BAAA,CACA,UAAA,CACA,iBAAA,CAKN,4BACE,aAAA,CACA,WAAA,CACA,aCyD8B,CDtDhC,4BACE,4BAAA,CACA,YAAA,CACA,wBAAA,CACA,eAAA,CACA,gBAAA,CAGF,8BACE,kBCwDwC,CDvDxC,aCwD6B,CDvD7B,cAAA,CACA,gBAAA,CACA,gBAAA,CACA,UAAA",sourcesContent:['@import "theme.template";\n\n  .radioGroup {\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n\n    :global(.ant-radio-wrapper) {\n      &:last-child {\n        margin-bottom: 0;\n      }\n    }\n\n    > * {\n      margin-bottom: 0.8rem;\n      width: 100%;\n    }\n\n    > label {\n      display: flex;\n    }\n\n    > label > span:last-child {\n      display: flex;\n      justify-content: space-between;\n      width: 100%;\n      padding-right: 0px;\n    }\n  }\n\n\n.clearButton {\n  padding: 0 7px;\n  height: auto;\n  color: $toggle-filter-sc-button-color;  \n}\n\n.actions {  \n  border-top: 1px solid $filter-actions-border-color;\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 17px;\n  padding-top: 13px;\n}\n\n.noResultsText {\n  background: $filter-no-results-text-background-color;\n  color: $filter-no-results-text-color;\n  font-size: 14px;\n  line-height: 22px;\n  padding: 8px 16px;\n  width: 100%;\n}',"@import 'colors';\n@import 'mixins';\n\n$font-weight-semibold: 500;\n$font-weight-bold: 600;\n\n$default-page-content-padding: 24px;\n$main-header-height: 64px;\n\n$heading-color: $gray-9;\n\n// QueryBuilder\n$query-default-action-default-color: black;\n$query-default-action-hover-color: black;\n$query-default-action-focus-color: black;\n\n$query-builder-bg: $white;\n$query-builder-border-color: #d8e1eb;\n$query-builder-header-border-divider-color: #d8e1eb;\n$query-builder-collapse-content-box-padding: 12px 8px;\n$query-builder-content-padding: 24px;\n\n$query-builder-header-tools-icon-color: black;\n$query-builder-header-tools-icon-hover: black;\n$query-builder-header-tools-icon-focus: black;\n$query-builder-header-tools-icon-color-dirty: #d16f13;\n$query-builder-header-tools-favorite-icon-color: #f5b800;\n\n$query-bar-bg: #f1f4f8;\n$query-bar-bg-active: #ffefc1;\n$query-bar-border-color: #bcc9dc;\n$query-bar-border-color-active: #ffdc73;\n$query-bar-height: 100%;\n$query-bar-padding-top: 8px;\n$query-bar-padding-bottom: 8px;\n$query-bar-padding-right: 12px;\n$query-bar-padding-left: 12px;\n$query-bar-padding: $query-bar-padding-top $query-bar-padding-right $query-bar-padding-bottom $query-bar-padding-left;\n\n$query-bar-identifier: #bcc9dc;\n$query-bar-identifier-width: 4px;\n$query-bar-identifier-active: #f5b800;\n\n$query-pill-bg: #dde4ee;\n$query-pill-bg-active: #ffc926;\n$query-pill-button-default-color: $query-default-action-default-color;\n$query-pill-button-hover-color: $query-default-action-hover-color;\n$query-pill-button-focus-color: $query-default-action-focus-color;\n\n$custom-pill-bg: #dde4ee;\n$custom-pill-bg-active: #ffc926;\n$custom-pill-button-default-color: $query-default-action-default-color;\n$custom-pill-button-hover-color: $query-default-action-hover-color;\n$custom-pill-button-focus-color: $query-default-action-focus-color;\n\n$query-values-bg: $white;\n$query-values-button-default-color: $query-default-action-default-color;\n$query-values-button-hover-color: $query-default-action-hover-color;\n$query-values-button-focus-color: $query-default-action-focus-color;\n\n$query-combiner-button-default-color: $query-default-action-default-color;\n$query-combiner-button-hover-color: $query-default-action-hover-color;\n$query-combiner-button-focus-color: $query-default-action-focus-color;\n\n$query-icon-operator-color: #5a77a0;\n$query-text-operator-color-hover: #26436e;\n$query-icon-operator-color-hover: #26436e;\n$query-icon-label-operator-color: #26436e;\n$query-total-color: inherit;\n\n// CountWithIcon\n$multi-label-inline-label-size: 1.4rem;\n$multi-label-inline-label-weight: 600;\n$multi-label-inline-sub-label-size: 1.4rem;\n$multi-label-inline-sub-label-weight: 600;\n$multi-label-inline-icon-space: 0.6rem;\n$multi-label-inline-label-space: 0.5rem;\n\n$multi-label-stack-label-size: 1.6rem;\n$multi-label-stack-label-weight: 600;\n$multi-label-stack-sub-label-size: inherit;\n$multi-label-stack-sub-label-weight: normal;\n$multi-label-stack-icon-space: 1.6rem;\n\n$multi-label-stack-top-icon-space: 1rem;\n\n// widget\n$authorized-studies-widget-authenticated-header-height: 24px;\n$authorized-studies-widget-authenticated-header-margin-bottom: 8px;\n\n// Filters\n$toggle-filter-sc-button-color: #008fc7;\n$range-filter-grouped-inputs-spacer-color: #b5c6d8;\n$range-filter-grouped-inputs-color-color: #d9d9d9;\n$checkbox-filter-item-font-size: inherit;\n$checkbox-filter-item-line-height: inherit;\n$checkbox-filter-types-mc-footer: #0075a2;\n$checkbox-filter-links-hover: #0075a2;\n$checkbox-filter-link-font-size: inherit;\n$checkbox-filter-link-line-height: inherit;\n$checkbox-filter-actions-separator-background: #90a9c1;\n$checkbox-filter-actions-separator-links: #008fc7;\n$filter-no-results-text-background-color: #f0f3f8;\n$filter-no-results-text-color: #18486b;\n\n$filter-input-label-color: #000;\n$filter-actions-border-color: #d9d9d9;\n$filter-actions-disabled-border-color: #d7d8db;\n$filter-actions-disabled-background-color: #f3f4f6;\n$filter-actions-disabled-color: #8a8da8;\n$filter-input-error-border-color: #dd1f2a;\n\n$filter-container-header-has-filter-icon-color: #389e0d;\n\n// SidebarMenu\n$sidebar-menu-width: 180px;\n$sidebar-menu-collapsed-width: 50px;\n$sidebar-menu-background-color: #007694;\n$sidebar-menu-toggle-icon-size: 21px;\n\n$sidebar-menu-item-icon-size: 24px;\n$sidebar-menu-item-height: 50px;\n$sidebar-menu-item-text-color: #fff;\n$sidebar-menu-item-active-background-color: #00546e;\n$sidebar-menu-item-active-color: #fff;\n$sidebar-menu-item-hover-color: #fff;\n$sidebar-menu-item-hover-opacity: 0.8;\n$sidebar-menu-item-border-focus-color: #003447;\n\n$sidebar-quick-filter-input-box-shadow-hover: 0 0 0 2px #00546e;\n$sidebar-quick-filter-input-box-shadow-focus: 0 0 0 2px #007694, 0 0 0 3px white;\n$sidebar-quick-filter-input-placeholder-color: #8a8da8;\n$sidebar-quick-filter-input-text-color: #383f72;\n$sidebar-quick-filter-input-border-color-focus: #007694;\n$sidebar-quick-filter-higlight-color: $blue-2;\n\n$sidebar-content-panel-padding: 16px;\n$sidebar-content-panel-width: 320px;\n$sidebar-content-panel-close-icon-color: #007694;\n$sidebar-content-panel-right-border: 1px solid #d7d8db;\n$sidebar-content-panel-background-color: transparent;\n$sidebar-content-panel-close-icon-width: 16px;\n\n// Grid Card V2\n$grid-card-light-background-color: white;\n$grid-card-shade-background-color: #f8fafc;\n\n// Empty\n$empty-image-color: #b5c6d8;\n$empty-content-color: #486f90;\n$empty-content-mini-padding: 30px 0;\n$empty-content-default-padding: 50px 0;\n$empty-content-large-padding: 50px 0;\n\n// link\n$link-base-color: $blue-8;\n\n// Collapse\n$collapse-light-background-color: white;\n$collapse-shade-background-color: #f8fafc;\n$collapse-header-border-color: #e1e8ef;\n\n// ProLabel\n$prolabel-required-mark-color: #a8071a;\n\n// UploadIds\n$file-upload-item-color: #1890ff;\n\n// Variant Entity\n$variant-tag-color: #531dab;\n$variant-tag-bg-color: #efdbff;\n$canonical-icon-color: $blue-8;\n\n// Entities\n$entity-icon-size: 20px;\n$summary-bg-color: $gray-3;\n\n// color tag default\n$color-tag-default-bg: $gray-4;\n$color-tag-default-color: $gray-8;\n\n// color tag family\n$color-tag-boolean-true-bg: $green-2;\n$color-tag-boolean-true-color: $green-9;\n\n// color tag gender\n$color-tag-gender-female-bg: $magenta-2;\n$color-tag-gender-female-color: $magenta-9;\n$color-tag-gender-male-bg: $blue-2;\n$color-tag-gender-male-color: $blue-9;\n\n// color tag family\n$color-tag-family-bg: $cyan-2;\n$color-tag-family-color: $cyan-9;\n\n// color tag position\n$color-tag-position-proband-bg: $purple-2;\n$color-tag-position-proband-color: $purple-7;\n\n// color tag vital status\n$color-tag-vital-status-alive-bg: $green-2;\n$color-tag-vital-status-alive-color: $green-9;\n$color-tag-vital-status-deceased-bg: $red-2;\n$color-tag-vital-status-deceased-color: $red-9;\n\n// color tag interpretation\n$color-tag-interpretation-observed-bg: $green-2;\n$color-tag-interpretation-observed-color: $green-9;\n\n// color tag pathegenic\n$color-tag-pathogenic-bg: $red-2;\n$color-tag-pathogenic-color: $red-9;\n\n// color tag benign\n$color-tag-benign-bg: $green-2;\n$color-tag-benign-color: $green-9;\n\n// Maintenance\n$maintenance-page-bg: $gray-3;\n$maintenance-page-title: $gray-8;\n$maintenance-page-subtitle: $gray-9;\n\n// chart\n$chart-title-color: $gray-8;\n\n// landing page\n$landing-card-gradient: linear-gradient(346deg, #1c3863 20.53%, #0369a1 100.05%),\n    linear-gradient(299deg, #0369a1 0.84%, #1c3863 100.02%), #f0f3f8;\n$landing-cavatica-gradient: linear-gradient(300deg, rgba(210, 54, 254, 0.3) 0%, rgba(0, 170, 221, 0.3) 100%), #2e3f50;\n$landing-text-color: $gray-8;\n$landing-text-color-invert: $gray-1;\n$landing-text-icon-color-light: $blue-3;\n$landing-text-icon-color-dark: $gray-8;\n$landing-spot-icon-color-light: $blue-8;\n$landing-spot-icon-color-dark: $blue-3;\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={radioGroup:"_8+AZsRYW0qtCPVH1P0qAfw==",clearButton:"BTaPVO4k33KVhYjnFbepLg==",actions:"HW2759Y0RRR9Ww223sqyLA==",noResultsText:"UNq+TgjV4c+3hy2MoiOzxw=="};let __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"../packages/ui/core/components/filters/TextInputFilter.module.scss":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),_storybook_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_storybook_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__),_storybook_node_modules_css_loader_dist_cjs_js_storybook_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_16_use_2_TextInputFilter_module_scss__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[16].use[2]!../packages/ui/core/components/filters/TextInputFilter.module.scss"),options={};options.insert="head",options.singleton=!1,_storybook_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_storybook_node_modules_css_loader_dist_cjs_js_storybook_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_16_use_2_TextInputFilter_module_scss__WEBPACK_IMPORTED_MODULE_1__.Z,options);let __WEBPACK_DEFAULT_EXPORT__=_storybook_node_modules_css_loader_dist_cjs_js_storybook_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_16_use_2_TextInputFilter_module_scss__WEBPACK_IMPORTED_MODULE_1__.Z.locals||{}},"../packages/ui/core/components/filters/ToggleFilter.module.scss":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),_storybook_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_storybook_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__),_storybook_node_modules_css_loader_dist_cjs_js_storybook_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_16_use_2_ToggleFilter_module_scss__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[16].use[2]!../packages/ui/core/components/filters/ToggleFilter.module.scss"),options={};options.insert="head",options.singleton=!1,_storybook_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_storybook_node_modules_css_loader_dist_cjs_js_storybook_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_16_use_2_ToggleFilter_module_scss__WEBPACK_IMPORTED_MODULE_1__.Z,options);let __WEBPACK_DEFAULT_EXPORT__=_storybook_node_modules_css_loader_dist_cjs_js_storybook_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_16_use_2_ToggleFilter_module_scss__WEBPACK_IMPORTED_MODULE_1__.Z.locals||{}},"../packages/ui/core/components/filters/FilterSelector.js":function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});var react_1=__importDefault(__webpack_require__("./node_modules/react/index.js")),CheckboxFilter_1=__webpack_require__("../packages/ui/core/components/filters/CheckboxFilter/index.js"),RangeFilter_1=__importDefault(__webpack_require__("../packages/ui/core/components/filters/RangeFilter.js")),TextInputFilter_1=__importDefault(__webpack_require__("../packages/ui/core/components/filters/TextInputFilter.js")),ToggleFilter_1=__importDefault(__webpack_require__("../packages/ui/core/components/filters/ToggleFilter.js")),types_1=__webpack_require__("../packages/ui/core/components/filters/types.js");exports.default=function(param){var dictionary=param.dictionary,filterGroup=param.filterGroup,filters=param.filters,maxShowing=param.maxShowing,noDataInputOption=param.noDataInputOption,onChange=param.onChange,searchInputVisible=param.searchInputVisible,commonProps={dictionary:dictionary,filterGroup:filterGroup,onChange:onChange,selectedFilters:param.selectedFilters};switch(filterGroup.type){case types_1.VisualType.Toggle:return react_1.default.createElement(ToggleFilter_1.default,Object.assign({},commonProps,{filters:filters}));case types_1.VisualType.Range:return react_1.default.createElement(RangeFilter_1.default,Object.assign({},commonProps,{filters:filters,noDataOption:noDataInputOption}));case types_1.VisualType.Text:return react_1.default.createElement(TextInputFilter_1.default,Object.assign({},commonProps,{filters:filters}));case types_1.VisualType.Checkbox:default:return react_1.default.createElement(CheckboxFilter_1.CheckboxFilter,Object.assign({},commonProps,{filters:filters,hasSearchInput:searchInputVisible,maxShowing:maxShowing}))}}},"../packages/ui/core/components/filters/TextInputFilter.js":function(__unused_webpack_module,exports,__webpack_require__){function _array_like_to_array(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _array_with_holes(arr){if(Array.isArray(arr))return arr}function _iterable_to_array_limit(arr,i){var _s,_e,_i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null!=_i){var _arr=[],_n=!0,_d=!1;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}}function _non_iterable_rest(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _sliced_to_array(arr,i){return _array_with_holes(arr)||_iterable_to_array_limit(arr,i)||_unsupported_iterable_to_array(arr,i)||_non_iterable_rest()}function _unsupported_iterable_to_array(o,minLen){if(o){if("string"==typeof o)return _array_like_to_array(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if("Object"===n&&o.constructor&&(n=o.constructor.name),"Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _array_like_to_array(o,minLen)}}var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);(!desc||("get"in desc?!m.__esModule:desc.writable||desc.configurable))&&(desc={enumerable:!0,get:function get(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(o,v){Object.defineProperty(o,"default",{enumerable:!0,value:v})}:function(o,v){o.default=v}),__importStar=this&&this.__importStar||function(mod){if(mod&&mod.__esModule)return mod;var result={};if(null!=mod)for(var k in mod)"default"!==k&&Object.prototype.hasOwnProperty.call(mod,k)&&__createBinding(result,mod,k);return __setModuleDefault(result,mod),result},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});var react_1=__importStar(__webpack_require__("./node_modules/react/index.js")),react_2=__webpack_require__("./node_modules/react/index.js"),icons_1=__webpack_require__("../packages/ui/node_modules/@ant-design/icons/es/index.js"),antd_1=__webpack_require__("../packages/ui/node_modules/antd/es/index.js"),lodash_1=__webpack_require__("../packages/ui/node_modules/lodash/lodash.js"),StackLayout_1=__importDefault(__webpack_require__("../packages/ui/core/layout/StackLayout.js")),TextInputFilter_module_scss_1=__importDefault(__webpack_require__("../packages/ui/core/components/filters/TextInputFilter.module.scss"));exports.default=function(param){var dictionary=param.dictionary,filterGroup=param.filterGroup,filters=param.filters,onChange=param.onChange,selectedFilters=param.selectedFilters,currentFilter=filters[0],config=filterGroup.config,defaultStateValue={text:(0,lodash_1.get)(selectedFilters,"[0].data.text","")},_ref=_sliced_to_array((0,react_1.useState)(!0),2),inputValid=_ref[0],setInputValid=_ref[1],_ref1=_sliced_to_array((0,react_1.useState)(defaultStateValue),2),textInputFilter=_ref1[0],setTextInputFilter=_ref1[1],text=textInputFilter.text,buttonActionDisabled=(0,lodash_1.isEmpty)(text);(0,react_2.useEffect)(function(){validateInputIfNeeded(textInputFilter.text)},[textInputFilter]);var validateInputIfNeeded=function(text){var isInputValid=!((null==config?void 0:config.validateInput)&&!config.validateInput(text));return setInputValid(isInputValid),isInputValid};return react_1.default.createElement(StackLayout_1.default,{className:TextInputFilter_module_scss_1.default.fuiTIfContainer,vertical:!0},react_1.default.createElement(StackLayout_1.default,{vertical:!0},(null==config?void 0:config.label)&&react_1.default.createElement(StackLayout_1.default,{className:TextInputFilter_module_scss_1.default.fuiTIfLabelContainer,horizontal:!0},react_1.default.createElement("span",{className:TextInputFilter_module_scss_1.default.fuiTIfSectionTitle},config.label),config.tooltip&&react_1.default.createElement(antd_1.Tooltip,{align:{offset:[0,5]},title:config.tooltip.text},react_1.default.createElement(icons_1.InfoCircleOutlined,{className:TextInputFilter_module_scss_1.default.fuiTIfLabelTooltipIcon}))),react_1.default.createElement(antd_1.Input,{className:"".concat(!inputValid&&TextInputFilter_module_scss_1.default.inputError),onChange:function(e){e.target&&setTextInputFilter({text:e.target.value})},placeholder:null==config?void 0:config.placeholder,value:text})),react_1.default.createElement(StackLayout_1.default,{className:TextInputFilter_module_scss_1.default.fuiTIfActions,horizontal:!0},react_1.default.createElement(antd_1.Button,{className:TextInputFilter_module_scss_1.default.fuiTIfActionsClear,disabled:buttonActionDisabled,onClick:function(){onChange(filterGroup,[]),setTextInputFilter({text:""})},type:"text"},(0,lodash_1.get)(dictionary,"actions.none","Clear")),react_1.default.createElement(antd_1.Button,{className:TextInputFilter_module_scss_1.default.fuiTIfActionsApply,disabled:buttonActionDisabled||!inputValid,onClick:function(){onChange(filterGroup,[Object.assign(Object.assign({},currentFilter),{data:textInputFilter})])},type:"primary"},react_1.default.createElement("span",{"data-key":"apply"},(0,lodash_1.get)(dictionary,"actions.apply","Apply")))))}},"../packages/ui/core/components/filters/ToggleFilter.js":function(__unused_webpack_module,exports,__webpack_require__){function _array_like_to_array(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _array_with_holes(arr){if(Array.isArray(arr))return arr}function _iterable_to_array_limit(arr,i){var _s,_e,_i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null!=_i){var _arr=[],_n=!0,_d=!1;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}}function _non_iterable_rest(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _sliced_to_array(arr,i){return _array_with_holes(arr)||_iterable_to_array_limit(arr,i)||_unsupported_iterable_to_array(arr,i)||_non_iterable_rest()}function _unsupported_iterable_to_array(o,minLen){if(o){if("string"==typeof o)return _array_like_to_array(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if("Object"===n&&o.constructor&&(n=o.constructor.name),"Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _array_like_to_array(o,minLen)}}var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);(!desc||("get"in desc?!m.__esModule:desc.writable||desc.configurable))&&(desc={enumerable:!0,get:function get(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(o,v){Object.defineProperty(o,"default",{enumerable:!0,value:v})}:function(o,v){o.default=v}),__importStar=this&&this.__importStar||function(mod){if(mod&&mod.__esModule)return mod;var result={};if(null!=mod)for(var k in mod)"default"!==k&&Object.prototype.hasOwnProperty.call(mod,k)&&__createBinding(result,mod,k);return __setModuleDefault(result,mod),result},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});var react_1=__importStar(__webpack_require__("./node_modules/react/index.js")),antd_1=__webpack_require__("../packages/ui/node_modules/antd/es/index.js"),lodash_1=__webpack_require__("../packages/ui/node_modules/lodash/lodash.js"),get_1=__importDefault(__webpack_require__("../packages/ui/node_modules/lodash/get.js")),numberUtils_1=__webpack_require__("../packages/ui/core/utils/numberUtils.js"),stringUtils_1=__webpack_require__("../packages/ui/core/utils/stringUtils.js"),ToggleFilter_module_scss_1=__importDefault(__webpack_require__("../packages/ui/core/components/filters/ToggleFilter.module.scss"));exports.default=function(param){var dictionary=param.dictionary,filterGroup=param.filterGroup,filters=param.filters,onChange=param.onChange,_param_selectedFilters=param.selectedFilters,selectedFilters=void 0===_param_selectedFilters?[]:_param_selectedFilters,selectedFilter=selectedFilters.length>0?selectedFilters[0].data.key:"",_ref=_sliced_to_array((0,react_1.useState)(selectedFilter),2),selected=_ref[0],setSelected=_ref[1];(0,react_1.useEffect)(function(){setSelected(selectedFilter)},[selectedFilters]);var options=filters.map(function(filter){var count=filter.data.count||0;return{label:react_1.default.createElement(react_1.default.Fragment,null,"string"==typeof filter.name?(0,stringUtils_1.removeUnderscoreAndCapitalize)(filter.name):filter.name,react_1.default.createElement(antd_1.Tag,{className:ToggleFilter_module_scss_1.default.tag},(0,numberUtils_1.numberFormat)(count))),value:filter.data.key}});return(0,lodash_1.isEmpty)(options)?react_1.default.createElement(antd_1.Space,{className:ToggleFilter_module_scss_1.default.noResultsText,direction:"vertical"},(0,get_1.default)(dictionary,"messages.errorNoData","No values found for this request")):react_1.default.createElement(react_1.default.Fragment,null,react_1.default.createElement(antd_1.Radio.Group,{className:ToggleFilter_module_scss_1.default.radioGroup,onChange:function(e){onChange(filterGroup,filters.filter(function(f){return f.data.key===e.target.value}))},options:options,size:"small",value:selected}),(null==selectedFilter?void 0:selectedFilter.length)>0&&react_1.default.createElement("div",{className:ToggleFilter_module_scss_1.default.actions},react_1.default.createElement(antd_1.Button,{className:ToggleFilter_module_scss_1.default.clearButton,onClick:function(){return onChange(filterGroup,[])},onKeyPress:function(){return onChange(filterGroup,[])},tabIndex:0,type:"text"},(0,get_1.default)(dictionary,"actions.clear","clear"))))}}}]);