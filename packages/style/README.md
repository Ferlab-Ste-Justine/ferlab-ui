# SCSS file for styling @ferlab/style

Base scss for all reusable components.

## Requirements

- [Ant design](https://github.com/ant-design/ant-design)
- Site specific variable for themes

## Installation

1. Installation the library
    >npm i @ferlab/style

2. Create a default theme file if it does not exist

    >touch style/themes/default/main.scss

3. Add ferlab/style import

> @import '@ferlab/style/index.scss';

## Developper

All work must be done based on master
All styles automatically reference to the @ferlab/styles package
## Publish new release
To publish a new release once a PR as been validated and merged

1. Try to install the package to make sure everything work corretly
    > cd [test dir] && npm i [full_path]/ferlab-ui/packages/style
2. On master Update package.json version
3. Create a tag to the new version `git tag [semantic version]`
4. Login to npm
    > npm login
5. Push the new version
    > npm publish
