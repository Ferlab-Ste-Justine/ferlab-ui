import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { MemoryRouter, BrowserRouter, Route } from "react-router-dom";
import { ReadOutlined } from "@ant-design/icons";

import LinkBox, { LinkBoxProps } from "@ferlab/ui/components/LinkBox";

export default {
    title: "@ferlab/Components/LinkBox",
    decorators: [
        (Story) => {
            console.log("in story");
            return (
                <MemoryRouter initialEntries={["/"]}>
                    <Route path="/*" component={() => <Story />} />
                </MemoryRouter>
            );
        },
    ],
} as Meta;

const LinkBoxPropsStory = ({
    title,
    props,
}: {
    title: string;
    props: LinkBoxProps;
}) => (
    <>
        <h3>{title}</h3>
        <MemoryRouter initialEntries={["/"]}>
            <Route path="/*" component={() => <LinkBox {...props} />} />
        </MemoryRouter>
    </>
);

export const LinkBoxInline = LinkBoxPropsStory.bind({});
LinkBoxInline.args = {
    title: "Base (Must be used inside a <Router> tag)",
    props: {
        icon: () => <ReadOutlined />,
        label: 10,
        multiLabelClassName: "",
        subLabel: "sublabel",
        to: "/route",
    },
};
