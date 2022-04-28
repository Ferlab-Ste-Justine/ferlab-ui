import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import Collapse, {
    TCollapseProps,
    CollapsePanel,
} from "@ferlab/ui/components/Collapse";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";

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

export const CollapseLightBordered = CollapsePropsStory.bind({});
CollapseLightBordered.args = {
    storyTitle: "Collapse Light Bordered",
    children: (
        <CollapsePanel key={1} header="Panel">
            Bonjour
        </CollapsePanel>
    ),
    theme: "light",
};

export const CollapseShadeBordered = CollapsePropsStory.bind({});
CollapseShadeBordered.args = {
    storyTitle: "Collapse Shade Bordered",
    children: (
        <CollapsePanel key={1} header="Panel">
            Bonjour
        </CollapsePanel>
    ),
    theme: "shade",
};

export const CollapseLight = CollapsePropsStory.bind({});
CollapseLight.args = {
    storyTitle: "Collapse Light No Border",
    children: (
        <CollapsePanel key={1} header="Panel">
            Bonjour
        </CollapsePanel>
    ),
    theme: "light",
    headerBorderOnly: true,
};

export const CollapseShade = CollapsePropsStory.bind({});
CollapseShade.args = {
    storyTitle: "Collapse Shade No Border",
    children: (
        <CollapsePanel key={1} header="Panel">
            Bonjour
        </CollapsePanel>
    ),
    theme: "shade",
    headerBorderOnly: true,
};

export const CollapseSmall = CollapsePropsStory.bind({});
CollapseSmall.args = {
    storyTitle: "Collapse Small",
    children: (
        <CollapsePanel key={1} header="Panel">
            Bonjour
        </CollapsePanel>
    ),
    size: "small",
};

export const CollapseWithExtra = CollapsePropsStory.bind({});
CollapseWithExtra.args = {
    storyTitle: "Collapse With Extra",
    children: (
        <CollapsePanel key={1} header="Panel" extra={[<SearchOutlined />]}>
            Bonjour
        </CollapsePanel>
    ),
    theme: "shade",
    headerBorderOnly: true,
};
