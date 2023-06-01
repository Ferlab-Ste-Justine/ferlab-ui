# @ferlab-ui React core components

## Install

    npm i @ferlab/ui

## Developper

- All work must be done based on master
- All styles automatically reference to the @ferlab/styles package
- Components should be added and tests in [storybook](../../storybook)

### Development

Steps to develop or debug the libraries in a real project

1. Make @ferlab/ui accessible to link
   1. `npm link` inside @ferlab/ui folder
2. Link the libraries in your project
   1. `npm link @ferlab/ui`

#### Duplicate React

##### TsConfig solution

Linking the library will add the packages twice in the bundle, which could create some issues with `react` and `react-dom`. It's important to add an alias to use the host modules.

e.g. in tsconfig | please refer to [clin-portal-ui](https://github.com/Ferlab-Ste-Justine/clin-portal-ui) for a working example.

```json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "react": ["node_modules/react"],
            "react-dom": ["node_modules/react-dom"]
        }
    }
}
```

##### Npm link solution

This problem can also come up when you use npm link or an equivalent. In that case, your bundler might “see” two Reacts — one in application folder and one in your library folder. Assuming myapp and mylib are sibling folders, one possible fix is to run `npm link ../myapp/node_modules/react` from mylib. This should make the library use the application’s React copy.

### Storybook

In order to see and test all available components

First you need to build the components

> npm run build

or run in development mode

> npm start

```bash
cd ferlab-ui/storybook
npm start
```

### Publish new release

#### Merging new changes

1. update the version of the package in package.json (https://semver.org)
2. Update the `Release.md` file with the changes
3. Add or modify storybook that matches your changes
4. Create a PR

#### Publish
1. Try to install the package to make sure everything work corretly

   > cd [test dir] && npm i [full_path]/ferlab-ui/packages/ui
2. Delete core folder to remove deleted files

   > rm -rf core/
3. Prepare the package

   > npm run build
4. Push the new version
5. Create a tag to the new version `git tag ui@[semantic version]`
   e.g.

   > git tag ui@4.4.1
   > git push --tags
6. Login to npm

   > npm login
7. Push the new version

   > npm publish


## Development

Run `npx tscp -w` to live-watch sass file.


## Styles and themes
### Strategy

1. Use .less to customize colors and ant design components
2. Export to scss for the main theme and custom components
3. Use one css module and scss per component
4. Use scss exported variables for props and inline styling (should be avoid when possible)

Naming convention for colors variables should follow ant design theme implementation

#### Motivation

- Access to the theme variables in JS
- Access of the theme variables in css module + scss
- Compatibility with other projects and component reusability
- Dont force CRA eject

#### Structure

```
[project]
  |-- theme/                :> Legacy styles
  |-- style/                :> Main style/theme source
    |-- dist/               :> dynamicaly generated files
      |-- themes
        |-- default/        :> default theme, to load in code
          |-- antd.css      :> load in main app, rewrite ant design default
          '-- _colors.scss   :> dynamically generated colors from ant design theme in colors.less
    |-- themes/
      |-- default           :> default theme (default could for example point to v1 or v2 etc.)
        |-- antd/           :> not use directly in the code
        | |-- antd.less
        | '-- colors.less
        |-- _colors.scss        :> Ant design colors to import from other scss files or JavaScript
        |-- colors.modules.scss :> Colors classes and variables to be uses inside jsx (className)
        '-- main.scss      :> General style for the site outside ant design component
```

everything in legacy `src/theme/` should go in `src/style/theme/default/main.scss` or `src/style/theme/default/colors.scss`

### Configuration

#### References

[Ant Design available theme variables](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less)

#### Use

First import ant design override in the main application file

```JavaScript
import 'themes/dist/themes/default/antd.css';
import 'themes/default/main.scss';
```

#### Components

1. Create a `[Component].module.scss` file in the same directory
2. Import your style inside your components

```JavaScript
import style from '[Component].module.scss';
// ...
return () => <div clasName={style.isBeautiful}></div>;
```

3. To use globaly defined theme variables, load theme from `src/themes/default/colors.scss` or `src/themes/default/main.scss`



#### How to export scss variables to JavaScript

inside a scss file, use the `export key` to make them available to JavaScript. Use the same technique as component `.module.scss` import in JS.

e.g.

```scss
:export {
    btnPrimaryBg: $btn-primary-bg;
    btnPrimaryColor: $btn-primary-color;
}
```
