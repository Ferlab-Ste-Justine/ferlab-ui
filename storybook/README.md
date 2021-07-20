# Storybook for ferlab/ui

## Getting Started

First install dependencies in ../packages/ui

```bash
cd ../packages/ui/
npm i
npm run build
```

Second install depenecies in storybook

```bash
npm i
```

Run Storybook

```bash
npm run storybook
```

## How to create new stories

Stories are stored in the `./stories` folder

Each group of story should be place in one or many `.stories.[tsx|jsx]` file

The default exported object, configure the stories.

```javascript
export default {
    title: '@ferlab/ui/layout/ScrollView',
    component: ScrollView,
    argTypes: {
        orientation: {
            controler: {
                type: 'select',
                options: ['Horizontal', 'Vertical']
            }
        }
    }
}
```

#### Title

The title will create the tree structure to display the stories.

e.g. it we have three files with the following title:
> '@ferlab/ui/layout/ScrollView', '@ferlab/ui/layout/StackLayout', '@ferlab/ui/components/Label'


```
@ferlab
 |- ui
    |- components
    |   |- Label
    |- layout
        |- ScrollView
        |- StackLayout

```

#### args

Create controls to dynamically test the components with it's props

https://storybook.js.org/docs/react/essentials/controls

#### actions

Define actions like onClick
https://storybook.js.org/docs/react/essentials/actions
