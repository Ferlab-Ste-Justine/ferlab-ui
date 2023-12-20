import React from "react";
import { Meta } from "@storybook/react";
import Gravatar, { IGravatarProps } from "@ferlab/ui/core/components/Gravatar";

export default {
    title: "@ferlab/Components/Gravatar",
    component: Gravatar,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

const GravatarPropsStory = ({
    storyTitle,
    ...props
}: {
    storyTitle: string;
    props: IGravatarProps;
}) => (
    <>
        <h3>{storyTitle}</h3>
        <Gravatar {...props} />
    </>
);

export const Default = GravatarPropsStory.bind({});
Default.args = {
    storyTitle: "Default",
    email: "jitewaboh@lagify.com"
};

export const Small = GravatarPropsStory.bind({});
Small.args = {
    storyTitle: "Circled",
    circle: true,
    email: "jitewaboh@lagify.com"
};

export const DefaultPlaceholder = GravatarPropsStory.bind({});
DefaultPlaceholder.args = {
    storyTitle: "DefaultPlaceholder",
};

export const CustomPlaceholder = GravatarPropsStory.bind({});
CustomPlaceholder.args = {
    storyTitle: "CustomPlaceholder",
    placeholder: "https://i.etsystatic.com/25917007/r/il/b9b175/3702153851/il_570xN.3702153851_opg3.jpg",
    style: {width: 100, height: 100}
};
