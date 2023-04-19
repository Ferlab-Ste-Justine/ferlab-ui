import React from 'react';
import { CSSProperties } from 'react';
import { Avatar } from 'antd';
import { AvatarSize } from 'antd/lib/avatar/SizeContext';

const getStringColor = (string: string): string => {
    let hash = 0;
    if (string.length > 0) {
        for (let i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
            hash &= hash;
        }
    }
    return `hsl(${hash % 360}, 75%, 50%)`;
};

const getInitials = (name = ''): string => {
    const initials = name.trim().split(/\s+/gu) || [];
    let output = [...(initials.shift() || '')][0];
    if (initials.length > 0) {
        output += [...(initials.pop() || '')][0];
    }
    return output?.toUpperCase();
};

export interface IUserAvatarProps {
    alt?: string;
    circle?: boolean;
    className?: string;
    height?: number;
    size?: AvatarSize;
    src?: string | null;
    style?: CSSProperties;
    userName?: string;
    width?: number;
    icon?: React.ReactNode;
    gap?: number;
}

const UserAvatar = ({
    alt = 'UserAvatar',
    circle = true,
    className = '',
    height = 100,
    size = 100,
    src = '',
    style = {},
    userName = '',
    width = 100,
    icon,
    gap = 1,
}: IUserAvatarProps): React.ReactElement => {
    if (src) {
        return (
            <img
                alt={alt}
                className={className}
                height={height}
                src={src}
                style={circle ? { borderRadius: '50%', ...style } : style}
                width={width}
            />
        );
    }
    return (
        <Avatar
            alt={alt}
            className={className}
            gap={gap}
            icon={icon}
            shape={circle ? 'circle' : 'square'}
            size={size}
            style={{ backgroundColor: getStringColor(userName), verticalAlign: 'middle', ...style }}
        >
            {getInitials(userName)}
        </Avatar>
    );
};

export default UserAvatar;
