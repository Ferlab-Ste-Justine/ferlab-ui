import React from 'react';
import { Meta } from '@storybook/react';
import FlagFilter, { TFlagFilter } from '@ferlab/ui/core/components/Flag/FlagFilter';

export default {
    title: '@ferlab/Components/Flag/FlagFilter',
    component: FlagFilter,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

const FlagFilterPropsStory = ({
    storyTitle,
    ...props
}: TFlagFilter & { storyTitle: string }) => (
    <>
        <h3>{storyTitle}</h3>
        <FlagFilter {...props} />
    </>
);

export const Default = FlagFilterPropsStory.bind({});
Default.args = {
    storyTitle: 'Flag Filter',
};
