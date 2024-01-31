(self.webpackChunkstorybook=self.webpackChunkstorybook||[]).push([[1984],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");let MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return boundMDXComponent;function boundMDXComponent(props){let allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){let contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components},[contextComponents,components])}let emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./stories/Introduction.stories.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,__page:()=>__page,default:()=>Introduction_stories}),__webpack_require__("./node_modules/react/index.js");var lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),external_STORYBOOK_MODULE_CLIENT_LOGGER_=__webpack_require__("@storybook/client-logger"),dist=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs");(0,external_STORYBOOK_MODULE_CLIENT_LOGGER_.deprecate)("Import from '@storybook/addon-docs/blocks' is deprecated. Please import from '@storybook/blocks' instead.");let code_brackets_namespaceObject=__webpack_require__.p+"static/media/code-brackets.2e1112d7.svg",colors_namespaceObject=__webpack_require__.p+"static/media/colors.a4bd0486.svg",comments_namespaceObject=__webpack_require__.p+"static/media/comments.a3859089.svg",direction_namespaceObject=__webpack_require__.p+"static/media/direction.b770f9af.svg",flow_namespaceObject=__webpack_require__.p+"static/media/flow.edad2ac1.svg",plugin_namespaceObject=__webpack_require__.p+"static/media/plugin.d494b228.svg",repo_namespaceObject=__webpack_require__.p+"static/media/repo.6d496322.svg",stackalt_namespaceObject=__webpack_require__.p+"static/media/stackalt.dba9fbb3.svg";var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function _createMdxContent(props){let _components=Object.assign({h1:"h1",p:"p",strong:"strong",code:"code",a:"a"},(0,lib.ah)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{title:"Example/Introduction"}),"\n",(0,jsx_runtime.jsx)("style",{children:`
  .subheading {
    --mediumdark: '#999999';
    font-weight: 900;
    font-size: 13px;
    color: #999;
    letter-spacing: 6px;
    line-height: 24px;
    text-transform: uppercase;
    margin-bottom: 12px;
    margin-top: 40px;
  }

  .link-list {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    row-gap: 10px;
  }

  @media (min-width: 620px) {
    .link-list {
      row-gap: 20px;
      column-gap: 20px;
      grid-template-columns: 1fr 1fr;
    }
  }

  @media all and (-ms-high-contrast:none) {
  .link-list {
      display: -ms-grid;
      -ms-grid-columns: 1fr 1fr;
      -ms-grid-rows: 1fr 1fr;
    }
  }

  .link-item {
    display: block;
    padding: 20px 30px 20px 15px;
    border: 1px solid #00000010;
    border-radius: 5px;
    transition: background 150ms ease-out, border 150ms ease-out, transform 150ms ease-out;
    color: #333333;
    display: flex;
    align-items: flex-start;
  }

  .link-item:hover {
    border-color: #1EA7FD50;
    transform: translate3d(0, -3px, 0);
    box-shadow: rgba(0, 0, 0, 0.08) 0 3px 10px 0;
  }

  .link-item:active {
    border-color: #1EA7FD;
    transform: translate3d(0, 0, 0);
  }

  .link-item strong {
    font-weight: 700;
    display: block;
    margin-bottom: 2px;
  }
  
  .link-item img {
    height: 40px;
    width: 40px;
    margin-right: 15px;
    flex: none;
  }

  .link-item span {
    font-size: 14px;
    line-height: 20px;
  }

  .tip {
    display: inline-block;
    border-radius: 1em;
    font-size: 11px;
    line-height: 12px;
    font-weight: 700;
    background: #E7FDD8;
    color: #66BF3C;
    padding: 4px 12px;
    margin-right: 10px;
    vertical-align: top;
  }

  .tip-wrapper {
    font-size: 13px;
    line-height: 20px;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  .tip-wrapper code {
    font-size: 12px;
    display: inline-block;
  }

  
  `}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"welcome-to-storybook",children:"Welcome to Storybook"}),"\n",(0,jsx_runtime.jsxs)(_components.p,{children:["Storybook helps you build UI components in isolation from your app's business logic, data, and context.\nThat makes it easy to develop hard-to-reach states. Save these UI states as ",(0,jsx_runtime.jsx)(_components.strong,{children:"stories"})," to revisit during development, testing, or QA."]}),"\n",(0,jsx_runtime.jsxs)(_components.p,{children:["Browse example stories now by navigating to them in the sidebar.\nView their code in the ",(0,jsx_runtime.jsx)(_components.code,{children:"src/storybook-examples"})," directory to learn how they work.\nWe recommend building UIs with a ",(0,jsx_runtime.jsx)(_components.a,{href:"https://componentdriven.org",target:"_blank",rel:"nofollow noopener noreferrer",children:(0,jsx_runtime.jsx)(_components.strong,{children:"component-driven"})})," process starting with atomic components and ending with pages."]}),"\n",(0,jsx_runtime.jsx)("div",{class:"subheading",children:"Configure"}),"\n",(0,jsx_runtime.jsxs)("div",{class:"link-list",children:[(0,jsx_runtime.jsxs)("a",{class:"link-item",href:"https://storybook.js.org/docs/react/api/presets",target:"_blank",children:[(0,jsx_runtime.jsx)("img",{src:plugin_namespaceObject,alt:"plugin"}),(0,jsx_runtime.jsx)("span",{children:(0,jsx_runtime.jsxs)(_components.p,{children:[(0,jsx_runtime.jsx)("strong",{children:"Presets for popular tools"}),"\nEasy setup for TypeScript, SCSS and more."]})})]}),(0,jsx_runtime.jsxs)("a",{class:"link-item",href:"https://storybook.js.org/docs/react/configure/webpack",target:"_blank",children:[(0,jsx_runtime.jsx)("img",{src:stackalt_namespaceObject,alt:"Build"}),(0,jsx_runtime.jsx)("span",{children:(0,jsx_runtime.jsxs)(_components.p,{children:[(0,jsx_runtime.jsx)("strong",{children:"Build configuration"}),"\nHow to customize webpack and Babel"]})})]}),(0,jsx_runtime.jsxs)("a",{class:"link-item",href:"https://storybook.js.org/docs/react/configure/styling-and-css",target:"_blank",children:[(0,jsx_runtime.jsx)("img",{src:colors_namespaceObject,alt:"colors"}),(0,jsx_runtime.jsx)("span",{children:(0,jsx_runtime.jsxs)(_components.p,{children:[(0,jsx_runtime.jsx)("strong",{children:"Styling"}),"\nHow to load and configure CSS libraries"]})})]}),(0,jsx_runtime.jsxs)("a",{class:"link-item",href:"https://storybook.js.org/docs/react/get-started/setup#configure-storybook-for-your-stack",target:"_blank",children:[(0,jsx_runtime.jsx)("img",{src:flow_namespaceObject,alt:"flow"}),(0,jsx_runtime.jsx)("span",{children:(0,jsx_runtime.jsxs)(_components.p,{children:[(0,jsx_runtime.jsx)("strong",{children:"Data"}),"\nProviders and mocking for data libraries"]})})]})]}),"\n",(0,jsx_runtime.jsx)("div",{class:"subheading",children:"Learn"}),"\n",(0,jsx_runtime.jsxs)("div",{class:"link-list",children:[(0,jsx_runtime.jsxs)("a",{class:"link-item",href:"https://storybook.js.org/docs",target:"_blank",children:[(0,jsx_runtime.jsx)("img",{src:repo_namespaceObject,alt:"repo"}),(0,jsx_runtime.jsx)("span",{children:(0,jsx_runtime.jsxs)(_components.p,{children:[(0,jsx_runtime.jsx)("strong",{children:"Storybook documentation"}),"\nConfigure, customize, and extend"]})})]}),(0,jsx_runtime.jsxs)("a",{class:"link-item",href:"https://www.learnstorybook.com",target:"_blank",children:[(0,jsx_runtime.jsx)("img",{src:direction_namespaceObject,alt:"direction"}),(0,jsx_runtime.jsx)("span",{children:(0,jsx_runtime.jsxs)(_components.p,{children:[(0,jsx_runtime.jsx)("strong",{children:"In-depth guides"}),"\nBest practices from leading teams"]})})]}),(0,jsx_runtime.jsxs)("a",{class:"link-item",href:"https://github.com/storybookjs/storybook",target:"_blank",children:[(0,jsx_runtime.jsx)("img",{src:code_brackets_namespaceObject,alt:"code"}),(0,jsx_runtime.jsx)("span",{children:(0,jsx_runtime.jsxs)(_components.p,{children:[(0,jsx_runtime.jsx)("strong",{children:"GitHub project"}),"\nView the source and add issues"]})})]}),(0,jsx_runtime.jsxs)("a",{class:"link-item",href:"https://discord.gg/UUt2PJb",target:"_blank",children:[(0,jsx_runtime.jsx)("img",{src:comments_namespaceObject,alt:"comments"}),(0,jsx_runtime.jsx)("span",{children:(0,jsx_runtime.jsxs)(_components.p,{children:[(0,jsx_runtime.jsx)("strong",{children:"Discord chat"}),"\nChat with maintainers and the community"]})})]})]}),"\n",(0,jsx_runtime.jsx)("div",{class:"tip-wrapper",children:(0,jsx_runtime.jsxs)(_components.p,{children:[(0,jsx_runtime.jsx)("span",{class:"tip",children:"Tip"}),"Edit the Markdown in ",(0,jsx_runtime.jsx)("code",{children:"src/storybook-examples/welcome.mdx"})]})})]})}function MDXContent(props={}){let{wrapper:MDXLayout}=Object.assign({},(0,lib.ah)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,{...props,children:(0,jsx_runtime.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}let __page=()=>{throw Error("Docs-only story")};__page.parameters={docsOnly:!0};let componentMeta={title:"Example/Introduction",tags:["stories-mdx"],includeStories:["__page"]};componentMeta.parameters=componentMeta.parameters||{},componentMeta.parameters.docs={...componentMeta.parameters.docs||{},page:MDXContent};let Introduction_stories=componentMeta,__namedExportsOrder=["__page"]},"./node_modules/memoizerific sync recursive":module=>{function webpackEmptyContext(req){var e=Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/memoizerific sync recursive",module.exports=webpackEmptyContext},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);
//# sourceMappingURL=Introduction-stories-mdx.189ece83.iframe.bundle.js.map