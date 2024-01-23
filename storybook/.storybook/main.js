const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-viewport',
        '@storybook/addon-essentials',
        '@storybook/addon-controls',
    ],
    core: {
        builder: 'webpack5',
    },
    webpackFinal: async (config, { configType }) => {
        config.module.rules.push({
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'less-loader',
                    options: {
                        lessOptions: {
                            javascriptEnabled: true,
                        },
                    },
                },
            ],
        });

        config.module.rules.push({
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        sassOptions: {
                            includePaths: [path.resolve(__dirname, '../../packages/ui/themes/default')],
                        },
                    },
                },
            ],
        });

        config.resolve.plugins = [
            new TsconfigPathsPlugin({
                configFile: path.resolve(__dirname, '../tsconfig.json'),
            }),
        ];

        return config;
    },
};
