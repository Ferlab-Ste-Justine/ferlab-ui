import React from 'react';
import {Meta, StoryObj} from '@storybook/react';
import Footer, { TFooterProps } from '@ferlab/ui/core/pages/LandingPage/Footer';
import LindaLogo from './assets/linda-logo.svg'
import ChopLogo from './assets/chop-logo.svg'
import VanderbiltLogo from './assets/vanderbilt-logo.svg'
import ChuSjLogo from './assets/chusj-logo.svg'
import VelseraLogo from './assets/verlsera-logo.png'

const meta: Meta<TFooterProps> = {
    title: '@ferlab/Pages/LandingPage/Footer',
    component: Footer,
    decorators: [(Story) => <Story/>],
    parameters: {
        docs: {
            description: {
                component: 'Footer component for landing pages. Displays partner logos and optionally includes policies text below them.'
            },
        },
    },
    argTypes: {
        logos: {
            description: 'Array of logo image paths/URLs to display',
            control: { type: 'object' },
        },
        policies: {
            description: 'Optional policies text to display below the logos',
            control: { type: 'text' },
        },
    },
};

export default meta;
type Story = StoryObj<TFooterProps>;

const loremIpsumText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ` +
    `et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ` +
    `ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore ` +
    `eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia ` +
    `deserunt mollit anim id est laborum.`;

/**
 * Basic footer with logos only
 * This shows the default footer appearance with just the partner logos.
 */
export const Basic: Story = {
    args: {
        logos: [LindaLogo, ChopLogo, VanderbiltLogo, ChuSjLogo, VelseraLogo]
    },
};

/**
 * Footer with policies text
 * This example shows how to include policies text below the logos.
 * The policies parameter accepts a string that will be displayed in a centered,
 * small-font text block below the logo row.
 */
export const WithPolicies: Story = {
    args: {
        logos: [LindaLogo, ChopLogo, VanderbiltLogo, ChuSjLogo, VelseraLogo],
        policies: loremIpsumText
    },
    parameters: {
        docs: {
            description: {
                story: 'This story demonstrates the Footer component with the optional policies parameter. The policies text appears below the logos in a centered, small font.'
            },
        },
    },
};

/**
 * Playground
 * Interactive example where you can modify both logos and policies text
 */
export const Playground: Story = {
    args: {
        logos: [LindaLogo, ChopLogo, VanderbiltLogo, ChuSjLogo, VelseraLogo],
        policies: 'Enter your custom policies text here...'
    },
};

// Legacy story name for backward compatibility
export const FooterStory = Basic;
