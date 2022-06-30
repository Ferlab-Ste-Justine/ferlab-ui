# @ferlab-ui React core components

## Install

    npm i @ferlab/ui

### Requirements

Styles are installed separately

[@ferlab/style](github/)

## Developper

- All work must be done based on master
- All styles automatically reference to the @ferlab/styles package
- Components should be added and tests in [storybook](../../storybook)

### Development

Steps to develop or debug the library in a real project

1. Make @ferlab/ui accessible to link
   1. `npm link`
2. Link the library in your project
   1. `npm link @ferlab/ui`

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
To publish a new release once a PR as been validated and merged

1. Try to install the package to make sure everything work corretly
    > cd [test dir] && npm i [full_path]/ferlab-ui/packages/ui
2. Delete core folder to remove deleted files
    > rm -rf core/
3. Prepare the package 
    > npm run build
4. On master Update package.json version
5. Create a tag to the new version `git tag [semantic version]`
6. Login to npm
    > npm login
7. Push the new version
    > npm publish
