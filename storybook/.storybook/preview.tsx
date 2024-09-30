import type { Decorator, Preview } from '@storybook/react';

import 'antd/dist/antd.css';
import '../assets/main.css';
import React from 'react';

// Import the css files for the themes
import ferlabCSS from "!css-loader!@ferlab/ui/themes/default/theme.template.css"
import clinCSS from "!css-loader!clin-portal-theme/themes/clin/main.css"

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        }
    },
    globalTypes: {
        theme: {
            name: 'Theme',
            description: 'Global theme for components',
            toolbar: {
              icon: 'paintbrush',
              items: [
                { value: 'ferlab-ui', title: 'ferlab-ui - theme', default: true },
                { value: 'clin', title: 'clin - theme' },
              ],
              showName: true
            }
        }
    }
};

export default preview;

// Decorator used to switch themes
const withTheme: Decorator = (Story, {globals}) => {
    let css;
    switch(globals.theme) {
        case "clin":
            css = clinCSS;
            break;
        default:
            css = ferlabCSS
    }
    return  <>
                <style>{css.toString()}</style>
                <Story/>
            </>
}
export const decorators = [withTheme]