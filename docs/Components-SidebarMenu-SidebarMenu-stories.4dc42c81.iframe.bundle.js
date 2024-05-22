"use strict";(self.webpackChunkstorybook=self.webpackChunkstorybook||[]).push([[7028],{"./stories/Components/SidebarMenu/SidebarMenu.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{SidebarMenuBasic:()=>SidebarMenuBasic,SidebarMenuCustomToggle:()=>SidebarMenuCustomToggle,SidebarMenuNoQuickFilter:()=>SidebarMenuNoQuickFilter,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_ferlab_ui_core_components_SidebarMenu__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../packages/ui/core/components/SidebarMenu/index.js"),_ferlab_ui_core_components_SidebarMenu__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_ferlab_ui_core_components_SidebarMenu__WEBPACK_IMPORTED_MODULE_1__),_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@ant-design/icons/es/icons/DashboardOutlined.js"),_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@ant-design/icons/es/icons/ThunderboltOutlined.js"),_ant_design_icons__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@ant-design/icons/es/icons/ApiOutlined.js"),_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@ant-design/icons/es/icons/AlertOutlined.js"),_ant_design_icons__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@ant-design/icons/es/icons/AppleOutlined.js");function _object_without_properties(source,excluded){if(null==source)return{};var key,i,target=_object_without_properties_loose(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],!(excluded.indexOf(key)>=0)&&Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}function _object_without_properties_loose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}let __WEBPACK_DEFAULT_EXPORT__={title:"@ferlab/Components/Menu/SidebarMenu",component:_ferlab_ui_core_components_SidebarMenu__WEBPACK_IMPORTED_MODULE_1___default(),decorators:[function(Story){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Story,null)}],argTypes:{className:{control:"text"},style:{control:"object"},menuItems:{control:"array"},enableQuickFilter:{control:"boolean"},defaultSelectedKey:{control:"text"}}};var SidebarMenuStory=function(_param){var title=_param.title,props=_object_without_properties(_param,["title"]);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3",null,title),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ferlab_ui_core_components_SidebarMenu__WEBPACK_IMPORTED_MODULE_1___default(),props))},SidebarMenuBasic=SidebarMenuStory.bind({});SidebarMenuBasic.args={title:"Sidebar Menu Basic",enableQuickFilter:!0,menuItems:[{key:1,title:"Menu item 1",icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.Z,null),panelContent:function(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,"Menu 1")}},{key:2,title:"Menu item 2",icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.Z,null),panelContent:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,"Menu 2")},{key:3,title:"Menu item 3",icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_4__.Z,null),panelContent:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,"Menu 3")},{key:4,title:"Menu item 4",icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__.Z,null),panelContent:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,"Menu 4")},{key:5,title:"Menu item 5",icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_6__.Z,null),panelContent:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,"Menu 5")}]};var SidebarMenuCustomToggle=SidebarMenuStory.bind({});SidebarMenuCustomToggle.args={title:"Sidebar Menu Custom Toggle Icon",toggleIcon:{open:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_6__.Z,null),close:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__.Z,null)},enableQuickFilter:!0,menuItems:[{key:1,title:"Menu item 1",icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.Z,null),panelContent:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,"Menu 1")},{key:2,title:"Menu item 2",icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.Z,null),panelContent:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,"Menu 2")},{key:3,title:"Menu item 3",icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_4__.Z,null),panelContent:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,"Menu 3")},{key:4,title:"Menu item 4",icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__.Z,null),panelContent:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,"Menu 4")},{key:5,title:"Menu item 5",icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_6__.Z,null),panelContent:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,"Menu 5")}]};var SidebarMenuNoQuickFilter=SidebarMenuStory.bind({});SidebarMenuNoQuickFilter.args={title:"Sidebar Menu Quick Filter Disabled",enableQuickFilter:!1,menuItems:[{key:1,title:"Menu item 1",icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.Z,null),panelContent:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,"Menu 1")},{key:2,title:"Menu item 2",icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.Z,null),panelContent:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,"Menu 2")},{key:3,title:"Menu item 3",icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_4__.Z,null),panelContent:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,"Menu 3")},{key:4,title:"Menu item 4",icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__.Z,null),panelContent:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,"Menu 4")},{key:5,title:"Menu item 5",icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_6__.Z,null),panelContent:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,"Menu 5")}]},SidebarMenuBasic.parameters={...SidebarMenuBasic.parameters,docs:{...SidebarMenuBasic.parameters?.docs,source:{originalSource:"({\n  title,\n  ...props\n}: {\n  title: string;\n  props: Story<ISidebarMenuProps>;\n}) => <>\n        <h3>{title}</h3>\n        <SidebarMenu {...props} />\n    </>",...SidebarMenuBasic.parameters?.docs?.source}}},SidebarMenuCustomToggle.parameters={...SidebarMenuCustomToggle.parameters,docs:{...SidebarMenuCustomToggle.parameters?.docs,source:{originalSource:"({\n  title,\n  ...props\n}: {\n  title: string;\n  props: Story<ISidebarMenuProps>;\n}) => <>\n        <h3>{title}</h3>\n        <SidebarMenu {...props} />\n    </>",...SidebarMenuCustomToggle.parameters?.docs?.source}}},SidebarMenuNoQuickFilter.parameters={...SidebarMenuNoQuickFilter.parameters,docs:{...SidebarMenuNoQuickFilter.parameters?.docs,source:{originalSource:"({\n  title,\n  ...props\n}: {\n  title: string;\n  props: Story<ISidebarMenuProps>;\n}) => <>\n        <h3>{title}</h3>\n        <SidebarMenu {...props} />\n    </>",...SidebarMenuNoQuickFilter.parameters?.docs?.source}}};let __namedExportsOrder=["SidebarMenuBasic","SidebarMenuCustomToggle","SidebarMenuNoQuickFilter"]}}]);