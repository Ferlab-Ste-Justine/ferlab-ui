"use strict";(self.webpackChunkstorybook=self.webpackChunkstorybook||[]).push([[6919],{"./stories/Components/Empty/Empty.stories.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{EmptyDefault:()=>EmptyDefault,EmptyDefaultCustomImage:()=>EmptyDefaultCustomImage,EmptyDefaultGrid:()=>EmptyDefaultGrid,EmptyDefaultNoImage:()=>EmptyDefaultNoImage,EmptyDefaultWithAction:()=>EmptyDefaultWithAction,EmptyDescriptionOnlyLeft:()=>EmptyDescriptionOnlyLeft,EmptyLarge:()=>EmptyLarge,EmptyLargeGrid:()=>EmptyLargeGrid,EmptyLargeNoImage:()=>EmptyLargeNoImage,EmptyMini:()=>EmptyMini,EmptyMiniGrid:()=>EmptyMiniGrid,EmptyMiniNoImage:()=>EmptyMiniNoImage,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_ferlab_ui_core_components_Empty__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../packages/ui/core/components/Empty/index.js"),_ferlab_ui_core_components_Empty__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_ferlab_ui_core_components_Empty__WEBPACK_IMPORTED_MODULE_1__);function _object_without_properties(source,excluded){if(null==source)return{};var sourceKeys,key,i,target={};if("u">typeof Reflect&&Reflect.ownKeys){for(i=0,sourceKeys=Reflect.ownKeys(source);i<sourceKeys.length;i++)key=sourceKeys[i],!(excluded.indexOf(key)>=0)&&Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key]);return target}if(target=_object_without_properties_loose(source,excluded),Object.getOwnPropertySymbols)for(i=0,sourceKeys=Object.getOwnPropertySymbols(source);i<sourceKeys.length;i++)key=sourceKeys[i],!(excluded.indexOf(key)>=0)&&Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key]);return target}function _object_without_properties_loose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.getOwnPropertyNames(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],!(excluded.indexOf(key)>=0)&&Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key]);return target}let __WEBPACK_DEFAULT_EXPORT__={title:"@ferlab/Components/Empty",component:_ferlab_ui_core_components_Empty__WEBPACK_IMPORTED_MODULE_1___default(),decorators:[function(Story){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2",null,Story),react__WEBPACK_IMPORTED_MODULE_0__.createElement(Story,null))}],argTypes:{title:{control:"string"}}};var EmptyPropsStory=function(_0){var storyTitle=_0.storyTitle,props=_object_without_properties(_0,["storyTitle"]);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2",null,storyTitle),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{style:{height:"325px",border:"1px solid lightgray",borderRadius:"2px"}},react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ferlab_ui_core_components_Empty__WEBPACK_IMPORTED_MODULE_1___default(),props)))},EmptyLarge=EmptyPropsStory.bind({});EmptyLarge.args={storyTitle:"Empty Large",title:"Optional Header",description:"No data message",imageType:"row",size:"large"};var EmptyDefault=EmptyPropsStory.bind({});EmptyDefault.args={storyTitle:"Empty Default",title:"Optional Header",description:"No data message",imageType:"row"};var EmptyMini=EmptyPropsStory.bind({});EmptyMini.args={storyTitle:"Empty Mini",title:"Optional Header",description:"No data message",imageType:"row",size:"mini"};var EmptyLargeGrid=EmptyPropsStory.bind({});EmptyLargeGrid.args={storyTitle:"Empty Large Grid",title:"Optional Header",description:"No data message",imageType:"grid",size:"large"};var EmptyDefaultGrid=EmptyPropsStory.bind({});EmptyDefaultGrid.args={storyTitle:"Empty Default Grid",title:"Optional Header",description:"No data message",imageType:"grid"};var EmptyMiniGrid=EmptyPropsStory.bind({});EmptyMiniGrid.args={storyTitle:"Empty Mini Grid",title:"Optional Header",description:"No data message",imageType:"grid",size:"mini"};var EmptyLargeNoImage=EmptyPropsStory.bind({});EmptyLargeNoImage.args={storyTitle:"Empty Large No Image",title:"Optional Header",description:"No data message",showImage:!1,size:"large"};var EmptyDefaultNoImage=EmptyPropsStory.bind({});EmptyDefaultNoImage.args={storyTitle:"Empty Default No Image",title:"Optional Header",description:"No data message",showImage:!1};var EmptyMiniNoImage=EmptyPropsStory.bind({});EmptyMiniNoImage.args={storyTitle:"Empty Mini No Image",title:"Optional Header",description:"No data message",showImage:!1,size:"mini"};var EmptyDefaultCustomImage=EmptyPropsStory.bind({});EmptyDefaultCustomImage.args={storyTitle:"Empty Default Custom Image",title:"Optional Header",description:"No data message",image:react__WEBPACK_IMPORTED_MODULE_0__.createElement("img",{src:"https://picsum.photos/172/40"})};var EmptyDefaultWithAction=EmptyPropsStory.bind({});EmptyDefaultWithAction.args={storyTitle:"Empty Default Custom Action",description:"No data message",action:react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",null,"Custom action")};var EmptyDescriptionOnlyLeft=EmptyPropsStory.bind({});EmptyDescriptionOnlyLeft.args={showImage:!1,noPadding:!0,storyTitle:"Empty Description Only Left",description:"No data message",align:"left"},EmptyLarge.parameters={...EmptyLarge.parameters,docs:{...EmptyLarge.parameters?.docs,source:{originalSource:`({
  storyTitle,
  ...props
}: {
  storyTitle: string;
  props: IEmptyProps;
}) => <>
        <h2>{storyTitle}</h2>
        <div style={{
    height: "325px",
    border: "1px solid lightgray",
    borderRadius: "2px"
  }}>
            <Empty {...props} />
        </div>
    </>`,...EmptyLarge.parameters?.docs?.source}}},EmptyDefault.parameters={...EmptyDefault.parameters,docs:{...EmptyDefault.parameters?.docs,source:{originalSource:`({
  storyTitle,
  ...props
}: {
  storyTitle: string;
  props: IEmptyProps;
}) => <>
        <h2>{storyTitle}</h2>
        <div style={{
    height: "325px",
    border: "1px solid lightgray",
    borderRadius: "2px"
  }}>
            <Empty {...props} />
        </div>
    </>`,...EmptyDefault.parameters?.docs?.source}}},EmptyMini.parameters={...EmptyMini.parameters,docs:{...EmptyMini.parameters?.docs,source:{originalSource:`({
  storyTitle,
  ...props
}: {
  storyTitle: string;
  props: IEmptyProps;
}) => <>
        <h2>{storyTitle}</h2>
        <div style={{
    height: "325px",
    border: "1px solid lightgray",
    borderRadius: "2px"
  }}>
            <Empty {...props} />
        </div>
    </>`,...EmptyMini.parameters?.docs?.source}}},EmptyLargeGrid.parameters={...EmptyLargeGrid.parameters,docs:{...EmptyLargeGrid.parameters?.docs,source:{originalSource:`({
  storyTitle,
  ...props
}: {
  storyTitle: string;
  props: IEmptyProps;
}) => <>
        <h2>{storyTitle}</h2>
        <div style={{
    height: "325px",
    border: "1px solid lightgray",
    borderRadius: "2px"
  }}>
            <Empty {...props} />
        </div>
    </>`,...EmptyLargeGrid.parameters?.docs?.source}}},EmptyDefaultGrid.parameters={...EmptyDefaultGrid.parameters,docs:{...EmptyDefaultGrid.parameters?.docs,source:{originalSource:`({
  storyTitle,
  ...props
}: {
  storyTitle: string;
  props: IEmptyProps;
}) => <>
        <h2>{storyTitle}</h2>
        <div style={{
    height: "325px",
    border: "1px solid lightgray",
    borderRadius: "2px"
  }}>
            <Empty {...props} />
        </div>
    </>`,...EmptyDefaultGrid.parameters?.docs?.source}}},EmptyMiniGrid.parameters={...EmptyMiniGrid.parameters,docs:{...EmptyMiniGrid.parameters?.docs,source:{originalSource:`({
  storyTitle,
  ...props
}: {
  storyTitle: string;
  props: IEmptyProps;
}) => <>
        <h2>{storyTitle}</h2>
        <div style={{
    height: "325px",
    border: "1px solid lightgray",
    borderRadius: "2px"
  }}>
            <Empty {...props} />
        </div>
    </>`,...EmptyMiniGrid.parameters?.docs?.source}}},EmptyLargeNoImage.parameters={...EmptyLargeNoImage.parameters,docs:{...EmptyLargeNoImage.parameters?.docs,source:{originalSource:`({
  storyTitle,
  ...props
}: {
  storyTitle: string;
  props: IEmptyProps;
}) => <>
        <h2>{storyTitle}</h2>
        <div style={{
    height: "325px",
    border: "1px solid lightgray",
    borderRadius: "2px"
  }}>
            <Empty {...props} />
        </div>
    </>`,...EmptyLargeNoImage.parameters?.docs?.source}}},EmptyDefaultNoImage.parameters={...EmptyDefaultNoImage.parameters,docs:{...EmptyDefaultNoImage.parameters?.docs,source:{originalSource:`({
  storyTitle,
  ...props
}: {
  storyTitle: string;
  props: IEmptyProps;
}) => <>
        <h2>{storyTitle}</h2>
        <div style={{
    height: "325px",
    border: "1px solid lightgray",
    borderRadius: "2px"
  }}>
            <Empty {...props} />
        </div>
    </>`,...EmptyDefaultNoImage.parameters?.docs?.source}}},EmptyMiniNoImage.parameters={...EmptyMiniNoImage.parameters,docs:{...EmptyMiniNoImage.parameters?.docs,source:{originalSource:`({
  storyTitle,
  ...props
}: {
  storyTitle: string;
  props: IEmptyProps;
}) => <>
        <h2>{storyTitle}</h2>
        <div style={{
    height: "325px",
    border: "1px solid lightgray",
    borderRadius: "2px"
  }}>
            <Empty {...props} />
        </div>
    </>`,...EmptyMiniNoImage.parameters?.docs?.source}}},EmptyDefaultCustomImage.parameters={...EmptyDefaultCustomImage.parameters,docs:{...EmptyDefaultCustomImage.parameters?.docs,source:{originalSource:`({
  storyTitle,
  ...props
}: {
  storyTitle: string;
  props: IEmptyProps;
}) => <>
        <h2>{storyTitle}</h2>
        <div style={{
    height: "325px",
    border: "1px solid lightgray",
    borderRadius: "2px"
  }}>
            <Empty {...props} />
        </div>
    </>`,...EmptyDefaultCustomImage.parameters?.docs?.source}}},EmptyDefaultWithAction.parameters={...EmptyDefaultWithAction.parameters,docs:{...EmptyDefaultWithAction.parameters?.docs,source:{originalSource:`({
  storyTitle,
  ...props
}: {
  storyTitle: string;
  props: IEmptyProps;
}) => <>
        <h2>{storyTitle}</h2>
        <div style={{
    height: "325px",
    border: "1px solid lightgray",
    borderRadius: "2px"
  }}>
            <Empty {...props} />
        </div>
    </>`,...EmptyDefaultWithAction.parameters?.docs?.source}}},EmptyDescriptionOnlyLeft.parameters={...EmptyDescriptionOnlyLeft.parameters,docs:{...EmptyDescriptionOnlyLeft.parameters?.docs,source:{originalSource:`({
  storyTitle,
  ...props
}: {
  storyTitle: string;
  props: IEmptyProps;
}) => <>
        <h2>{storyTitle}</h2>
        <div style={{
    height: "325px",
    border: "1px solid lightgray",
    borderRadius: "2px"
  }}>
            <Empty {...props} />
        </div>
    </>`,...EmptyDescriptionOnlyLeft.parameters?.docs?.source}}};let __namedExportsOrder=["EmptyLarge","EmptyDefault","EmptyMini","EmptyLargeGrid","EmptyDefaultGrid","EmptyMiniGrid","EmptyLargeNoImage","EmptyDefaultNoImage","EmptyMiniNoImage","EmptyDefaultCustomImage","EmptyDefaultWithAction","EmptyDescriptionOnlyLeft"]}}]);
//# sourceMappingURL=Components-Empty-Empty-stories.ddc5eb92.iframe.bundle.js.map