import "!style-loader!css-loader!sass-loader!../../packages/ui/themes/index.scss";
import "antd/dist/antd.css";
import "../assets/main.scss";

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    backgrounds: {
        default: "kids first",
        values: [
            {
                name: "twitter",
                value: "#00aced",
            },
            {
                name: "kids first",
                value: "#f4f5f8",
            },
        ],
    },
};
