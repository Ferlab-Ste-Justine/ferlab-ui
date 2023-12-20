const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
    stories: [
        "../stories/**/*.stories.mdx",
        "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    ],

    addons: [
        "@storybook/addon-links",
        "@storybook/addon-viewport",
        "@storybook/addon-essentials",
        '@storybook/addon-interactions',
        "@storybook/addon-controls",
        {
            name: "@storybook/preset-scss",
            options: {
                sassLoaderOptions: {
                    sassOptions: {
                        includePaths: [
                            path.resolve(
                                __dirname,
                                "../../packages/ui/themes/default"
                            ),
                        ],
                    },
                },
            },
        },
        // "storybook-addon-jsx",
        "@storybook/preset-ant-design",
        "@storybook/addon-mdx-gfm"
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
            include: path.resolve(__dirname, "../"),
        });

        config.resolve.plugins = [
            new TsconfigPathsPlugin({
                configFile: path.resolve(__dirname, "../tsconfig.json"),
            }),
        ];

        return config;
    },

    framework: {
        name: "@storybook/react-webpack5",
        options: {
            builder: {
                useSWC: true,
            },
        },
    },

    docs: {
        autodocs: 'tag', 
    }
};
