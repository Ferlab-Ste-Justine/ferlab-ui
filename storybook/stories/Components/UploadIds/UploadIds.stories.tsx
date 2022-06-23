import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import UploadIds, { UploadIdsProps } from "@ferlab/ui/components/UploadIds";

export default {
    title: "@ferlab/Components/UploadIds",
    component: UploadIds,
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

const StatusLabelPropsStory = ({
    title,
    ...props
}: {
    title: string;
    props: UploadIdsProps;
}) => (
    <>
        <h3>{title}</h3>
        <div style={{ maxWidth: 300 }}>
            <UploadIds {...props} />
        </div>
    </>
);

export const Button = StatusLabelPropsStory.bind({});
Button.args = {
    placeHolder: "e.g. ENTITY_ID_1, ENTITY_ID_2",
    dictionary: {
        modalTitle: "Upload a [Entity] List",
        submittedColTitle: "Submitted [Entity] Identifier",
        uploadBtnText: "Upload [Entity] List",
        matchTable: {
            idColTitle: "[Entity] id",
            mappedToFieldColTitle: "Mapped id",
            matchToFieldColTitle: "Match id",
        },
    },
    popoverProps: {
        title: "Im a popover",
        content: "Im the popover's content",
    },
    onUpload: (match: any) => {
        console.log(match);
    },
    fetchMatch: (ids: string[]) =>
        new Promise((resolve) => {
            resolve(
                ids.map((id) => ({
                    submittedId: id,
                    matchTo: id,
                    mappedTo: id,
                }))
            );
        }),
};
