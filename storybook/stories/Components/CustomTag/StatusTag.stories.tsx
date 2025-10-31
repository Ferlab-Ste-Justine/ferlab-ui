import StatusTag, {StatusOptions} from "@ferlab/ui/core/components/CustomTag/StatusTag";
import { Meta } from "@storybook/react";
import React from "react";

export default {
    title: "@ferlab/Components/CustomTag/StatusTag",
    component: StatusTag,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

export const StatusTagStory = () => (
    <>
        <h3>Status Tag Story</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <StatusTag status={StatusOptions.Active} />
            <StatusTag status={StatusOptions.Draft} />
            <StatusTag status={StatusOptions.OnHold} />
            <StatusTag status={StatusOptions.Completed} />
            <StatusTag status={StatusOptions.Revoked} />
            <StatusTag status={StatusOptions.Analysis} />
            <StatusTag status={StatusOptions.ReAnalysis} />
            <StatusTag status={StatusOptions.Review} />
            <StatusTag status={StatusOptions.Unknown} />
        </div>
    </>
);