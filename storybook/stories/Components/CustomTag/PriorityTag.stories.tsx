import PriorityTag, {PrioritesOptions} from "@ferlab/ui/core/components/CustomTag/PriorityTag";
import { Meta } from "@storybook/react";
import React from "react";

export default {
    title: "@ferlab/Components/CustomTag/PriorityTag",
    component: PriorityTag,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

export const PriorityTagStory = () => (
    <>
        <h3>Priority Tag Story</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PriorityTag priority={PrioritesOptions.Asap}/>
            <PriorityTag priority={PrioritesOptions.Routine} />
            <PriorityTag priority={PrioritesOptions.Stat} />
            <PriorityTag priority={PrioritesOptions.Urgent} />
        </div>
    </>
);