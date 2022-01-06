import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import Empty, { IEmptyProps } from "@ferlab/ui/components/Empty";

export default {
    title: "@ferlab/Components/Empty",
    component: Empty,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
    argTypes: {
        title: {
            control: "string",
        },
    },
} as Meta;

const EmptyPropsStory = ({
    storyTitle,
    ...props
}: {
    storyTitle: string;
    props: IEmptyProps;
}) => (
    <>
        <h2>{storyTitle}</h2>
        <div
            style={{
                height: "325px",
                border: "1px solid lightgray",
                borderRadius: "2px",
            }}
        >
            <Empty {...props} />
        </div>
    </>
);

export const EmptyLarge = EmptyPropsStory.bind({});
EmptyLarge.args = {
    storyTitle: "Empty Large",
    title: "Optional Header",
    description: "No data message",
    imageType: "row",
    size: "large",
};

export const EmptyDefault = EmptyPropsStory.bind({});
EmptyDefault.args = {
    storyTitle: "Empty Default",
    title: "Optional Header",
    description: "No data message",
    imageType: "row",
};

export const EmptyMini = EmptyPropsStory.bind({});
EmptyMini.args = {
    storyTitle: "Empty Mini",
    title: "Optional Header",
    description: "No data message",
    imageType: "row",
    size: "mini",
};

export const EmptyLargeGrid = EmptyPropsStory.bind({});
EmptyLargeGrid.args = {
    storyTitle: "Empty Large Grid",
    title: "Optional Header",
    description: "No data message",
    imageType: "grid",
    size: "large",
};

export const EmptyDefaultGrid = EmptyPropsStory.bind({});
EmptyDefaultGrid.args = {
    storyTitle: "Empty Default Grid",
    title: "Optional Header",
    description: "No data message",
    imageType: "grid",
};

export const EmptyMiniGrid = EmptyPropsStory.bind({});
EmptyMiniGrid.args = {
    storyTitle: "Empty Mini Grid",
    title: "Optional Header",
    description: "No data message",
    imageType: "grid",
    size: "mini",
};

export const EmptyLargeNoImage = EmptyPropsStory.bind({});
EmptyLargeNoImage.args = {
    storyTitle: "Empty Large No Image",
    title: "Optional Header",
    description: "No data message",
    showImage: false,
    size: "large",
};

export const EmptyDefaultNoImage = EmptyPropsStory.bind({});
EmptyDefaultNoImage.args = {
    storyTitle: "Empty Default No Image",
    title: "Optional Header",
    description: "No data message",
    showImage: false,
};

export const EmptyMiniNoImage = EmptyPropsStory.bind({});
EmptyMiniNoImage.args = {
    storyTitle: "Empty Mini No Image",
    title: "Optional Header",
    description: "No data message",
    showImage: false,
    size: "mini",
};

export const EmptyDefaultCustomImage = EmptyPropsStory.bind({});
EmptyDefaultCustomImage.args = {
    storyTitle: "Empty Default Custom Image",
    title: "Optional Header",
    description: "No data message",
    image: <img src="https://picsum.photos/172/40"></img>,
};
