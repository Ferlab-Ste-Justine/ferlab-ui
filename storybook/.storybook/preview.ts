import type { Preview } from '@storybook/react';
import '../../packages/ui/themes/index.scss';
import 'antd/dist/antd.css';
import '../assets/main.scss';

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
