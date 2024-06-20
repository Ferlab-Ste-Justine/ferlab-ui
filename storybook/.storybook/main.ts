import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const config: StorybookConfig = {
    stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions',
    ],

    webpackFinal: async (config, { configType }) => {
        config.module?.rules?.push({
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

        //config.module?.rules?.push({
        //    test: /\.scss$/,
        //    use: [
        //        'style-loader',
        //        'css-loader',
        //        {
        //            loader: 'sass-loader',
        //            options: {
        //                sassOptions: {
        //                    includePaths: [path.resolve(__dirname, '../../packages/ui/themes/default')],
        //                },
        //            },
        //        },
        //    ],
        //});

        if (config.resolve) {
            config.resolve.plugins = [
                new TsconfigPathsPlugin({
                    configFile: path.resolve(__dirname, "../tsconfig.json"),
                }),
            ];

            config.resolve.alias = {
                react: path.resolve(__dirname, '../node_modules/react'),
            };
        }

        return config;
    },
    framework: {
        name: '@storybook/react-webpack5',
        options: {
            builder: {
                useSWC: true,
            },
        },
    },
    docs: {
        autodocs: 'tag',
    },
};
export default config;
