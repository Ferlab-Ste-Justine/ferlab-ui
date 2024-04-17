import React from 'react';
import {Meta} from '@storybook/react';
import TextIcon, {TTextIconProps} from '@ferlab/ui/core/pages/LandingPage/TextIcon';
import Icon from '@ferlab/ui/core/components/Icons/FuturoSpot/CloudComputingSpotIcon'


export default {
    title: '@ferlab/Pages/LandingPage/TextIcon',
    component: TextIcon,
    decorators: [(Story) => <Story/>],
} as Meta;

const commonProps = {
    title: 'Title',
    subtitle: 'Subtitle',
    IconComponent: Icon
}

const smallProps = {
    ...commonProps,
    size: 'small',
} as TTextIconProps;

const mediumProps = {
    ...commonProps,
    size: 'medium',
} as TTextIconProps;

const largeProps = {
    ...commonProps,
    size: 'large',
} as TTextIconProps;

export const SmallTextIconStory = () => <TextIcon {...smallProps} />;
export const MediumTextIconStory = () => <TextIcon {...mediumProps} />;
export const LargeTextIconStory = () => <TextIcon {...largeProps} />;
