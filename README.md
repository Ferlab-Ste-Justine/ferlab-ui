# @ferlab

## Info

Sets of shareable components

- @ferlab/ui Components for React

## Docs

### Developments

1.  Create your own fork
2.  Make changes localy
3.  Push on your fork
4.  Create a pull request from your fork to the main ferlab repo

### How to add new components

First, run the build process and storybook [package/ui doc](./packages/ui/README.md)

All component should be expose to storybook. Please see [storybook doc](./storybook/README.md)

### Deploy storybook to your own github pages from your fork

Why deploy your own storybook

- QA
- Validation with design
- Validate prototypes

Storybook static site will be automaticaly deploy when you push or merge on master. Using your own fork enable to push on master without affecting the main repo.

#### Configure your github page

- Navigate to your GitHub repository settings and find the GitHub Pages section.
- Select the main/master branch, then the docs folder and, click Save.

## Storybook

Interactive set of components available in ferlab-ui through storybook

On each update on the main branch, a new release of Storybooks if generated with the [updated components on github Pages](https://ferlab-ste-justine.github.io/ferlab-ui/)
