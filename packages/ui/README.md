# @ferlab-ui React core components

## Install

    npm i @ferlab/ui

### Requirements

Styles are installed separately

[@ferlab/style](github/)

## Developper

-   All work must be done based on master
-   All styles automatically reference to the @ferlab/styles package
-   Components should be added and tests in [storybook](../../storybook)

### Development

Steps to develop or debug the libraries in a real project

1. Make @ferlab/ui and @ferlab/style accessible to link
    1. `npm link` inside @ferlab/ui folder
    2. `npm link` inside @ferlab/style folder
2. Link the libraries in your project
    1. `npm link @ferlab/ui @ferlab/style`

#### Duplicate React

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

This problem can also come up when you use npm link or an equivalent. In that case, your bundler might “see” two Reacts — one in application folder and one in your library folder. Assuming myapp and mylib are sibling folders, one possible fix is to run npm link ../myapp/node_modules/react from mylib. This should make the library use the application’s React copy.

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
5. Push the new version
6. Create a tag to the new version `git tag ui@[semantic version]`
  e.g.
    > git tab ui@4.4.1
    > git push --tags
7. Login to npm
    > npm login
8. Push the new version
    > npm publish
