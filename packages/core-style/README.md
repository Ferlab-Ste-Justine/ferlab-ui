# SCSS file for styling @ferlab-ui/core

Base scss for all reusable components.

## Requirements

- [Ant design](https://github.com/ant-design/ant-design)
- Site specific variable for themes

## Installation

    npm i @ferlab-ui/core-style

In your `main.scss` file add 

> @import '@ferlab-ui/core-style/index.scss';

## Developper

To publish a new release

- Update package.json version
- Try to install the package to make sure everything work corretly
    > cd [test dir] && npm i [full_path]/ferlab-ui/packages/core-style
- Login to npm
    > npm login
- Push the new version
    > npm publish
