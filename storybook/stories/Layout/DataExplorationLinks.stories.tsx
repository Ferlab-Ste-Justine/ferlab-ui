import React from "react";
import { Meta } from "@storybook/react/types-6-0";

import DataExplorationLinks, {
    DataExplirationLinksProps,
} from "@ferlab/ui/layout/DataExplorationLinks";

import { MemoryRouter } from "react-router-dom";

export default {
    title: "@ferlab/Layout/DataExploration",
} as Meta;

const DataExplorationPropsStory = ({
    title,
    props,
}: {
    title: string;
    props: DataExplirationLinksProps;
}) => (
    <MemoryRouter>
        <h3>{title}</h3>
        <DataExplorationLinks {...props} />
    </MemoryRouter>
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
