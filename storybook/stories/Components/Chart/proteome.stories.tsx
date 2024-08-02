import Proteome from '@ferlab/ui/core/components/Charts/ScatterPlot/Proteome';
import { Meta } from "@storybook/react";
import React from "react";


export default {
    title: "@ferlab/Components/Charts/Proteome",
    component: Proteome,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;


export const ProteomeBasic = () => (
    <>
        <h2>Proteome Demo</h2>
        <div>
            <Proteome />
        </div>

    </>
)

