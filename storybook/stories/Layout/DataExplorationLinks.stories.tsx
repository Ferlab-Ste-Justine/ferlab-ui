import React from "react";
import { Meta } from "@storybook/react/types-6-0";

import DataExplorationLinks, {
    DataExplirationLinksProps,
} from "@ferlab/ui/layout/DataExplorationLinks";

export default {
    title: "@ferlab/Layout/DataExploration",
    component: DataExplorationLinks,
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

const DataExplorationPropsStory = ({
    title,
    props,
}: {
    title: string;
    props: DataExplirationLinksProps;
}) => (
    <>
        <h3>{title}</h3>
        <DataExplorationLinks {...props} />
    </>
);

export const DataExplorationBase = DataExplorationPropsStory.bind({});
DataExplorationBase.args = {
    title: "Base (Must be used inside a <Router> tag)",
    props: {
        dictionary: {},
        fetchStats: () => {
            console.log("fetchStats as been called");
        },
        stats: {},
    },
};
