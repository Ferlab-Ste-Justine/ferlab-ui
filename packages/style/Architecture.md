# Styles and themes

## Strategy

1. Use .less to customize colors and ant design components
2. Export to scss for the main theme and custom components
3. Use one css module and scss per component
4. Use scss exported variables for props and inline styling (should be avoid when possible)

Naming convention for colors variables should follow ant design theme implementation

### Motivation

- Access to the theme variables in JS
- Access of the theme variables in css module + scss
- Compatibility with other projects and component reusability
- Dont force CRA eject

### Structure

```
[project]/src
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

## Configuration

### References

[Ant Design available theme variables](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less)

### Use

First import ant design override in the main application file

```JavaScript
import 'style/dist/themes/default/antd.css';
import 'style/themes/default/main.scss';
```

### Components

1. Create a `[Component].module.scss` file in the same directory
2. Import your style inside your components

```JavaScript
import style from '[Component].module.scss';
// ...
return () => <div clasName={style.isBeautiful}></div>;
```

3. To use globaly defined theme variables, load theme from `src/style/theme/default/colors.scss` or `src/style/theme/default/main.scss`

```

```

### How to export scss variables to JavaScript

inside a scss file, use the `export key` to make them available to JavaScript. Use the same technique as component `.module.scss` import in JS.

e.g.

```scss
:export {
  btnPrimaryBg: $btn-primary-bg;
  btnPrimaryColor: $btn-primary-color;
}
```