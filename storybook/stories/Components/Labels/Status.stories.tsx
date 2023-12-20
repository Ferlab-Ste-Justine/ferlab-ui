import React from "react";
import { Meta } from "@storybook/react";
import StatusLabel, {
    StatusOptions as Status,
    StatusLabelProps,
} from "@ferlab/ui/core/components/labels/Status";

export default {
    title: "@ferlab/Components/Labels/Status",
    component: StatusLabel,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
    argTypes: {
        className: {
            control: "string",
        },
        dictionary: {
            control: {
                type: "object",
            },
        },
    },
} as Meta;

const translationDictionary = {
    [Status.Active]: "Approved",
    [Status.Completed]: "Completed",
    [Status.Draft]: "Draft",
    [Status.Revoked]: "Refused",
    [Status.Submitted]: "Submitted",
    [Status.Incomplete]: "Incomplete",
};

const StatusLabelPropsStory = ({
    style,
    ...props
}: {
    title: string;
    style: React.CSSProperties;
    props: StatusLabelProps;
}) => (
    <>
        {Object.values(Status).map((s) => (
            <>
                <StatusLabel
                    dictionary={translationDictionary}
                    status={s}
                    {...props}
                />
                <br />
                <br />
            </>
        ))}
    </>
);

export const StatusLabelPropsInComplete = StatusLabelPropsStory.bind({});
StatusLabelPropsInComplete.args = {
    dictionary: translationDictionary,
};
