# eslint-config

Contains standard extension for ferlab UI js/ts project

For more information https://docs.npmjs.com/creating-node-js-modules


## Installation

#### Peer dependencies
> npm install eslint eslint-config-airbnb eslint-config-airbnb-typescript eslint-config-prettier eslint-config-react-app eslint-plugin-import eslint-plugin-jest eslint-plugin-prefer-arrow eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-simple-import-sort eslint-plugin-sort-destructure-keys eslint-plugin-sort-keys-fix

> npm install -D @ferlab/eslint-config

Modify the main .eslintrc.js configuration file

Here all what it takes:

```javascript
{
  "extends": [
    "@ferlab"
  ]
}
```

## Development

### test changes

inside this directory
> npm link

in the project you what to test

> npm link local/path/to/this/project

### publish


1. Update configuration and increment [version number](https://semver.org)
2. Create PR
3. When merge create tag
    > git tag eslint-config@x.x.x
4. Login to npm
   > npm login
5. Push the new version
   > npm publish