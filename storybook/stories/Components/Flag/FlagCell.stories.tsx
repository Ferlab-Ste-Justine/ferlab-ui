import React from 'react';
import { Meta } from '@storybook/react';
import Flag, { TFlag } from '@ferlab/ui/core/components/Flag/FlagDropdown';

export default {
    title: '@ferlab/Components/Flag/FlagCell',
    component: Flag,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

const FlagFilterPropsStory = ({ storyTitle, options, history, ...props }: TFlag & { storyTitle: string }) => (
    <>
        <h3>{storyTitle}</h3>
        <Flag options={options} history={history} {...props} />
    </>
);

export const Default = FlagFilterPropsStory.bind({});
Default.args = {
    storyTitle: 'Flag Cell Dropdown',
    options: ['flag', 'pin'],
    history: [
        {
            name: [
                {
                    family: 'Family',
                    given: ['Given'],
                },
            ],
            options: ['flag', 'pin'],
            date: '2024-08-20T14:00:46.307Z',
        },
        {
            name: [
                {
                    family: 'Family 01',
                    given: ['Given 01'],
                },
            ],
            options: ['flag'],
            date: '2024-08-20T14:00:46.307Z',
        },
    ],
};
