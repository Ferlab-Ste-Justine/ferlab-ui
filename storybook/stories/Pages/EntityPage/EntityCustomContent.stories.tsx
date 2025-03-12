import EntityCustomContent, { IEntityCustomContent } from '@ferlab/ui/core/pages/EntityPage/EntityCustomContent';
import { Meta } from '@storybook/react';
import React from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';

export default {
    title: '@ferlab/Pages/EntityPage/EntityCustomContent',
    component: EntityCustomContent,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

const EntityCustomContentStory = ({ storyTitle, ...props }: { storyTitle: string; props: IEntityCustomContent }) => (
    <>
        <h3>{storyTitle}</h3>
        <EntityCustomContent {...props} />
    </>
);

export const BasicEntityCustomContent = EntityCustomContentStory.bind({});
BasicEntityCustomContent.args = {
    customContent: <>Custom content</>,
    header: 'Header',
    id: 'Section',
    loading: false,
    size: 'small',
    title: 'Title',
    titleExtra: [<span>View in data exploration</span>],
    emptyMessage: 'No data available',
};
