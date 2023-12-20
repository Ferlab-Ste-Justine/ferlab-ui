import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

console.log('__dirname ', __dirname);

const config: StorybookConfig = {
    stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions',
        {
            name: "@storybook/preset-scss",
            options: {
                sassLoaderOptions: {
                    sassOptions: {
                        includePaths: [
                            path.resolve(
                                __dirname,
                                "../themes/default"
                            ),
                        ],
                    },
                },
            },
        },
        '@storybook/preset-ant-design',
        '@storybook/addon-mdx-gfm'
    ],

    webpackFinal: async (config, { configType }) => {
        config.module.rules.push({
            test: /\.less$/,
            use: [
                "style-loader",
                "css-loader",
                {
                    loader: "less-loader",
                    options: { lessOptions: { javascriptEnabled: true } },
                },
            ],
            include: [
                path.resolve(__dirname, "../themes"),
                path.resolve(__dirname, "../src")
            ],
        }, 
        //{
        //    test: /\.(tsx?|jsx?)$/,
        //    loader: "ts-loader",
        //    options: {
        //        transpileOnly: true,
        //    },
        //}
        );

        config.resolve.plugins = [
            new TsconfigPathsPlugin({
                configFile: path.resolve(__dirname, "../tsconfig.json"),
            }),
        ];

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
