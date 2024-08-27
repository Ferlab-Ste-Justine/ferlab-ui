"use strict";(self.webpackChunkstorybook=self.webpackChunkstorybook||[]).push([[6796],{"./stories/Components/Tables/ProTable/ProTable.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AfterSearchTable:()=>AfterSearchTable,BasicTable:()=>BasicTable,SummaryTable:()=>SummaryTable,TableWithSubChildren:()=>TableWithSubChildren,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _ferlab_ui_core_components_ProTable__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../packages/ui/core/components/ProTable/index.js"),_ferlab_ui_core_components_ProTable__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_ferlab_ui_core_components_ProTable__WEBPACK_IMPORTED_MODULE_1__),_ferlab_ui_core_components_ProTable_Pagination_constants__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../packages/ui/core/components/ProTable/Pagination/constants.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react_icons_ai__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-icons/ai/index.esm.js");function _object_without_properties(source,excluded){if(null==source)return{};var key,i,target=_object_without_properties_loose(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],!(excluded.indexOf(key)>=0)&&Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}function _object_without_properties_loose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}let __WEBPACK_DEFAULT_EXPORT__={title:"@ferlab/Components/Tables/ProTable",component:_ferlab_ui_core_components_ProTable__WEBPACK_IMPORTED_MODULE_1___default(),decorators:[function(Story){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2",null,Story),react__WEBPACK_IMPORTED_MODULE_0__.createElement(Story,null))}]};var ProTableStory=function(_param){var title=_param.title,props=_object_without_properties(_param,["title"]);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3",null,title),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ferlab_ui_core_components_ProTable__WEBPACK_IMPORTED_MODULE_1___default(),props))},BasicTable=ProTableStory.bind({}),data=[{key:"1",column_one:"test",column_two:"test",column_three:"test",column_four:"test"},{key:"2",column_one:"test",column_two:"test",column_three:"test",column_four:"test"},{key:"3",column_one:"test",column_two:"test",column_three:"test",column_four:"test"},{key:"4",column_one:"test",column_two:"test",column_three:"test",column_four:"test"},{key:"5",column_one:"test",column_two:"test",column_three:"test",column_four:"test"},{key:"6",column_one:"test",column_two:"test",column_three:"test",column_four:"test"}];BasicTable.args={columns:[{key:"column_one",title:"Column 1",dataIndex:"column_one"},{key:"column_two",title:"Column 2",dataIndex:"column_two"},{key:"column_three",title:"Column 3",dataIndex:"column_three",tooltip:"This is Column 3",iconTitle:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_icons_ai__WEBPACK_IMPORTED_MODULE_2__.Zev,null)},{key:"column_four",title:"Column 4",dataIndex:"column_four",defaultHidden:!0},{key:"column_five",title:"Column 5",dataIndex:"column_five",defaultHidden:!1,popoverProps:{title:"This is the popover title",content:"This is the popover content"}},{key:"column_six",title:"Column 6",dataIndex:"column_six",defaultHidden:!1,tooltip:"This is the tooltip content"}],dataSource:data,tableId:"test-table",pagination:{pageSize:2,defaultPageSize:2,total:data.length},headerConfig:{marginBtm:12,extra:[react__WEBPACK_IMPORTED_MODULE_0__.createElement("a",null,"Extra Actions")],enableColumnSort:!0,itemCount:{pageIndex:1,pageSize:2,total:data.length},onClearSelection:function(){console.log("Clicked on clear selection")},onColumnStateChange:function(state){console.log(state)}}};var TableWithSubChildren=ProTableStory.bind({});TableWithSubChildren.args={columns:[{key:"column_one",title:"Column 1",dataIndex:"column_one",children:[{title:"Sub Column 1",dataIndex:"sub1",key:"sub1",width:150,tooltip:"This is sub Column 1"},{title:"Sub Column 2",dataIndex:"sub2",key:"sub2",width:150}]},{key:"column_two",title:"Column 2",dataIndex:"column_two"},{key:"column_three",title:"Column 3",dataIndex:"column_three",tooltip:"This is Column 3",iconTitle:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_icons_ai__WEBPACK_IMPORTED_MODULE_2__.Zev,null)},{key:"column_four",title:"Column 4",dataIndex:"column_four",defaultHidden:!0}],dataSource:[{key:"1",column_one:"test",column_two:"test",column_three:"test",column_four:"test"},{key:"2",column_one:"test",column_two:"test",column_three:"test",column_four:"test"},{key:"3",column_one:"test",column_two:"test",column_three:"test",column_four:"test"},{key:"4",column_one:"test",column_two:"test",column_three:"test",column_four:"test"}],bordered:!0,tableId:"test-table",pagination:{pageSize:2,defaultPageSize:2,total:4},headerConfig:{marginBtm:12,extra:[react__WEBPACK_IMPORTED_MODULE_0__.createElement("a",null,"Extra Actions")],enableColumnSort:!0,itemCount:{pageIndex:1,pageSize:2,total:4},onClearSelection:function(){console.log("Clicked on clear selection")},onColumnStateChange:function(state){console.log(state)}}};var AfterSearchTable=ProTableStory.bind({});AfterSearchTable.args={columns:[{key:"column_one",title:"Column 1",dataIndex:"column_one"},{key:"column_two",title:"Column 2",dataIndex:"column_two"},{key:"column_three",title:"Column 3",dataIndex:"column_three",tooltip:"This is Column 3",iconTitle:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_icons_ai__WEBPACK_IMPORTED_MODULE_2__.Zev,null)},{key:"column_four",title:"Column 4",dataIndex:"column_four",defaultHidden:!0}],dataSource:[{key:"1",column_one:"test",column_two:"test",column_three:"test",column_four:"test"},{key:"2",column_one:"test",column_two:"test",column_three:"test",column_four:"test"},{key:"3",column_one:"test",column_two:"test",column_three:"test",column_four:"test"},{key:"4",column_one:"test",column_two:"test",column_three:"test",column_four:"test"}],tableId:"test-table",pagination:{current:1,queryConfig:{firstPageFlag:void 0,operations:void 0,pageIndex:0,searchAfter:void 0,size:10,sort:[{field:"column_one",order:"desc"}]},searchAfter:{head:[],tail:[]},defaultViewPerQuery:_ferlab_ui_core_components_ProTable_Pagination_constants__WEBPACK_IMPORTED_MODULE_3__.PaginationViewPerQuery.Ten,total:4},headerConfig:{marginBtm:12,extra:[react__WEBPACK_IMPORTED_MODULE_0__.createElement("a",null,"Extra Actions")],enableColumnSort:!0,itemCount:{pageIndex:1,pageSize:2,total:4},onClearSelection:function(){console.log("Clicked on clear selection")},onColumnStateChange:function(state){console.log(state)}}};var SummaryTable=ProTableStory.bind({});SummaryTable.args={columns:[{key:"column_one",title:"Column 1",dataIndex:"column_one"},{key:"column_two",title:"Column 2",dataIndex:"column_two"},{key:"column_three",title:"Column 3",dataIndex:"column_three",tooltip:"This is Column 3",iconTitle:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_icons_ai__WEBPACK_IMPORTED_MODULE_2__.Zev,null)},{key:"column_four",title:"Column 4",dataIndex:"column_four",defaultHidden:!0}],dataSource:[{key:"1",column_one:"test",column_two:"test",column_three:"test",column_four:"test"},{key:"2",column_one:"test",column_two:"test",column_three:"test",column_four:"test"},{key:"3",column_one:"test",column_two:"test",column_three:"test",column_four:"test"},{key:"4",column_one:"test",column_two:"test",column_three:"test",column_four:"test"}],tableId:"test-table",pagination:{pageSize:2,defaultPageSize:2,total:4},headerConfig:{marginBtm:12,extra:[react__WEBPACK_IMPORTED_MODULE_0__.createElement("a",null,"Extra Actions")],enableColumnSort:!0,itemCount:{pageIndex:1,pageSize:2,total:4},onClearSelection:function(){console.log("Clicked on clear selection")},onColumnStateChange:function(state){console.log(state)}},summaryColumns:[{index:0,value:"Summary 1"},{index:1,value:"Summary 2"}]},BasicTable.parameters={...BasicTable.parameters,docs:{...BasicTable.parameters?.docs,source:{originalSource:"({\n  title,\n  ...props\n}: {\n  title: string;\n  props: TProTableProps<any>;\n}) => <>\n        <h3>{title}</h3>\n        <ProTable {...props} />\n    </>",...BasicTable.parameters?.docs?.source}}},TableWithSubChildren.parameters={...TableWithSubChildren.parameters,docs:{...TableWithSubChildren.parameters?.docs,source:{originalSource:"({\n  title,\n  ...props\n}: {\n  title: string;\n  props: TProTableProps<any>;\n}) => <>\n        <h3>{title}</h3>\n        <ProTable {...props} />\n    </>",...TableWithSubChildren.parameters?.docs?.source}}},AfterSearchTable.parameters={...AfterSearchTable.parameters,docs:{...AfterSearchTable.parameters?.docs,source:{originalSource:"({\n  title,\n  ...props\n}: {\n  title: string;\n  props: TProTableProps<any>;\n}) => <>\n        <h3>{title}</h3>\n        <ProTable {...props} />\n    </>",...AfterSearchTable.parameters?.docs?.source}}},SummaryTable.parameters={...SummaryTable.parameters,docs:{...SummaryTable.parameters?.docs,source:{originalSource:"({\n  title,\n  ...props\n}: {\n  title: string;\n  props: TProTableProps<any>;\n}) => <>\n        <h3>{title}</h3>\n        <ProTable {...props} />\n    </>",...SummaryTable.parameters?.docs?.source}}};let __namedExportsOrder=["BasicTable","TableWithSubChildren","AfterSearchTable","SummaryTable"]}}]);