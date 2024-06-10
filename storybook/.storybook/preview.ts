import type { Preview } from '@storybook/react';

import '@ferlab/ui/themes/default/theme.template.css';

import 'antd/dist/antd.css';
import '../assets/main.css';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
