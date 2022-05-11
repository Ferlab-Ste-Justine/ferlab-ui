import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import Collapse, {
    TCollapseProps,
    CollapsePanel,
} from "@ferlab/ui/components/Collapse";
import { SearchOutlined } from "@ant-design/icons";

export default {
    title: "@ferlab/Components/Collapse",
    component: Collapse,
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

const CollapsePropsStory = ({
    storyTitle,
    ...props
}: {
    storyTitle: string;
    props: TCollapseProps;
}) => (
    <>
        <h2>{storyTitle}</h2>
        <div>
            <Collapse {...props} />
        </div>
    </>
);

export const LightBordered = CollapsePropsStory.bind({});
LightBordered.args = {
    storyTitle: "Light Bordered",
    children: (
        <CollapsePanel key={1} header="Panel">
            Bonjour
        </CollapsePanel>
    ),
    theme: "light",
};

export const ShadeBordered = CollapsePropsStory.bind({});
ShadeBordered.args = {
    storyTitle: "Shade Bordered",
    children: (
        <CollapsePanel key={1} header="Panel">
            Bonjour
        </CollapsePanel>
    ),
    theme: "shade",
};

export const LightNoBorder = CollapsePropsStory.bind({});
LightNoBorder.args = {
    storyTitle: "Light No Border",
    children: (
        <CollapsePanel key={1} header="Panel">
            Bonjour
        </CollapsePanel>
    ),
    theme: "light",
    headerBorderOnly: true,
};

export const ShadeNoBorder = CollapsePropsStory.bind({});
ShadeNoBorder.args = {
    storyTitle: "Shade No Border",
    children: (
        <CollapsePanel key={1} header="Panel">
            Bonjour
        </CollapsePanel>
    ),
    theme: "shade",
    headerBorderOnly: true,
};

export const Small = CollapsePropsStory.bind({});
Small.args = {
    storyTitle: "Small",
    children: (
        <CollapsePanel key={1} header="Panel">
            Bonjour
        </CollapsePanel>
    ),
    size: "small",
};

export const Large = CollapsePropsStory.bind({});
Large.args = {
    storyTitle: "Large",
    children: (
        <CollapsePanel key={1} header="Panel">
            Bonjour
        </CollapsePanel>
    ),
    size: "large",
};

export const WithExtra = CollapsePropsStory.bind({});
WithExtra.args = {
    storyTitle: "With Extra",
    children: (
        <CollapsePanel key={1} header="Panel" extra={[<SearchOutlined />]}>
            Bonjour
        </CollapsePanel>
    ),
    theme: "shade",
    headerBorderOnly: true,
};
