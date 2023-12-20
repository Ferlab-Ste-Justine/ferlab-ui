import EntityTitle, {
    IEntityTitle,
} from "@ferlab/ui/pages/EntityPage/EntityTitle";
import { Meta } from "@storybook/react";
import React from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

export default {
    title: "@ferlab/Pages/EntityPage/EntityTitle",
    component: EntityTitle,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

const EntityTitleStory = ({
    storyTitle,
    ...props
}: {
    storyTitle: string;
    props: IEntityTitle;
}) => (
    <>
        <h3>{storyTitle}</h3>
        <EntityTitle {...props} />
    </>
);

export const BasicEntityTitle = EntityTitleStory.bind({});
BasicEntityTitle.args = {
    id: "ID",
    text: "Text",
    icon: <AiOutlineUsergroupAdd />,
    tag: <span>tag</span>,
    loading: false,
};
