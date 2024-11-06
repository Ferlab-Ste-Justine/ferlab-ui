import React from 'react';
import { Meta } from '@storybook/react';
import ProLabel, { IProLabelProps } from '@ferlab/ui/core/components/ProLabel';

export default {
    title: '@ferlab/Components/Labels/ProLabel',
    component: ProLabel,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

const ProLabelPropsStory = ({ storyTitle, ...props }: { storyTitle: string; props: IProLabelProps }) => (
    <>
        <h3>{storyTitle}</h3>
        <ProLabel {...props} />
    </>
);

export const Default = ProLabelPropsStory.bind({});
Default.args = {
    storyTitle: 'Default',
    title: "I'm a wonderfull label",
    colon: true,
};

export const Small = ProLabelPropsStory.bind({});
Small.args = {
    storyTitle: 'Required',
    title: "I'm a wonderfull small label",
    colon: true,
    size: 'small',
};

export const Required = ProLabelPropsStory.bind({});
Required.args = {
    storyTitle: 'Required',
    title: "I'm a wonderfull required label",
    colon: true,
    requiredMark: true,
};

export const WithPopoverInfo = ProLabelPropsStory.bind({});
WithPopoverInfo.args = {
    storyTitle: 'With Popover Info',
    title: "I'm a wonderfull label with popover info",
    requiredMark: true,
    popoverProps: {
        title: 'Hi, im a popover',
        content: "I'm a useless popover",
    },
    colon: true,
};

export const WithTooltipInfo = ProLabelPropsStory.bind({});
WithTooltipInfo.args = {
    storyTitle: 'With Tooltip Info',
    title: "I'm a wonderfull label with tooltip info",
    requiredMark: true,
    tooltipProps: {
        title: 'Hi, im a tooltip',
    },
    colon: true,
};
