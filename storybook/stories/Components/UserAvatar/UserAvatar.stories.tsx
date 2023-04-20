import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import UserAvatar, { IUserAvatarProps } from '@ferlab/ui/components/UserAvatar';

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

export const UserAvatarStory = ({
    alt = 'UserAvatar',
    circle = true,
    className = undefined,
    height = undefined,
    size = undefined,
    src = undefined,
    style = undefined,
    userName = 'John Doe',
    width = undefined,
    icon = undefined,
    gap = 4,
}: IUserAvatarProps) => (
    <>
        <h3>UserAvatar Story</h3>
        <UserAvatar
            alt={alt}
            circle={circle}
            className={className}
            height={height}
            size={size}
            src={src}
            style={style}
            userName={userName}
            width={width}
            icon={icon}
            gap={gap}
        />
    </>
);

