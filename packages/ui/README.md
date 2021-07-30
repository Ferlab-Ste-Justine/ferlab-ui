# @ferlab-ui React core components

## Install

    npm i @ferlab/ui

### Requirements

Styles are installed separetly

[@ferlab/style](github/)


## Development
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

## Developper

All work must be done based on master
All styles automatically reference to the @ferlab/styles package
## Publish new release
To publish a new release once a PR as been validated and merged

1. Try to install the package to make sure everything work corretly
    > cd [test dir] && npm i [full_path]/ferlab-ui/packages/ui
2. Prepare the package 
    > npm run build
2. On master Update package.json version
3. Create a tag to the new version `git tag [semantic version]`
4. Login to npm
    > npm login
5. Push the new version
    > npm publish
