import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import UserAvatar from '@ferlab/ui/components/UserAvatar';

export default {
    title: "@ferlab/Components/UserAvatar",
    component: UserAvatar,
    decorators: [(Story) => <Story />],
    argTypes: {
        alt: {
            control: 'text'
        },
        circle: {
            control: 'boolean'
        },
        className: {
            control: 'text'
        },
        height: {
            control: 'number'
        },
        size: {
            control: 'text'
        },
        src: {
            control: 'text'
        },
        style: {
            control: 'object'
        },
        userName: {
            control: 'text'
        },
        width: {
            control: 'number'
        },
        icon: {
            control: 'text'
        },
        gap: {
            control: 'number'
        },
    },
} as Meta

export const UserAvatarStory = () => (
    <>
        <h3>UserAvatar Story</h3>
        <UserAvatar
            alt={'UserAvatar'}
            circle
            className={undefined}
            height={undefined}
            size={24}
            src={undefined}
            style={undefined}
            userName='John Doe'
            width={undefined}
            icon={undefined}
            gap={4}
        />
    </>
);

