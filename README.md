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

## Github actions

### Shai-Hulud
This action check for the Shai-Hulud vulnerability.
It checks for:
- the vulnerability itself
- unallowed env var exposure
- malicious patterns

> ℹ️ You can acces the project repository to check the targeted patterns: https://github.com/sngular/shai-hulud-integrity-scanner/blob/9ecc202020ef894cef77449ba0c6972bb3f65979/scan-project.sh#L296 

To remove files that should be ignored by the action, edit the ```shai-hulud-check.sh``` script, to add the files path (in the dedicated section)

To be efficient, you should not remove code files, but parse them to remove allowed patterns. 
This can be achived by:
- adding the patterns in the ```shai-hulud-allowed-patterns.txt``` file (you must let an empty new line at the end of the file)
- adding the files by editing the ```shai-hulud-check.sh``` script, to add the files path (in the dedicated section) 

You can check if the scan is valid locally running the make target: ```make check```