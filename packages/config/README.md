# Config

Manage ferlab react project

Helps configure and updates standard, scripts and best pratices accross our project.

Creates or Updates :

- commit lint configuration
- eslint configuration
- Husky configuration
- Update package.json

## Usage

```sh
npx @ferlab/config
```


## Developer

### Local Development

Use project path with npx

e.g.

    npx ~/workspace/ferlab-ui/packages/config
### Publish on npmjs
To make changes available on npmjs

1. Update package.json version
2. Commit and merge changes
3. Create config tag
    > git tab config@version
4. Publish on npm
    > npm publish

