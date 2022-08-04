import "!style-loader!css-loader!sass-loader!../../packages/style/index.scss";
import "antd/dist/antd.css";
import "../assets/main.scss";

import React, { useEffect } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

export const decorators = [
    (Story) => {
        useEffect(() => {
            action("location")(location);
        }, [location]);
        return (
            <MemoryRouter>
                <Routes>
                    <Route path="/*" element={<Story />} />
                </Routes>
            </MemoryRouter>
        );
    },
];

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
