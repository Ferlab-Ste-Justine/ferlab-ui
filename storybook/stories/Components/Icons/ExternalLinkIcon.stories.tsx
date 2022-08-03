import React from "react";
import { Meta } from "@storybook/react/types-6-0";

import { IconProps } from "@ferlab/ui/components/icons/types";
import ExternalLinkIcon from "@ferlab/ui/components/icons/ExternalLinkIcon";

export default {
    title: "@ferlab/Components/Icons/ExternalLinkIcon",
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
    argTypes: {},
} as Meta;

const ExternalLinkIconPropsStory = ({
    title,
    props,
}: {
    title: string;
    props: IconProps;
}) => (
    <>
        <h3>{title}</h3>
        <ExternalLinkIcon {...props} />
    </>
);

export const ExternalLinkIconBase = ExternalLinkIconPropsStory.bind({});
ExternalLinkIconBase.args = {
    title: "Inline",
};

export const ExternalLinkIconCustom = ExternalLinkIconPropsStory.bind({});
ExternalLinkIconCustom.args = {
    title: "custom 32x32",
    props: {
        width: 32,
        height: 32,
    },
};
