import React from 'react';
import md5 from 'md5';
import { CSSProperties } from 'react';

export interface IGravatarProps {
    email: string;
    circle?: boolean;
    placeholder?: string | 'robohash' | 'retro' | 'wavatar' | 'monsterid' | 'identicon' | 'mp' | '404';
    size?: number;
    style?: CSSProperties;
    alt?: string;
    className?: string;
}

const BASE_URL = 'https://www.gravatar.com/avatar';

const Gravatar = ({
    circle = false,
    email = '',
    placeholder = 'retro',
    alt = 'Gravatar',
    size = 100,
    ...props
}: IGravatarProps) => {
    const getQueryParams = () => {
        const params: Record<string, any> = {};

        if (size) {
            params.s = size;
        }

        if (placeholder) {
            params.d = placeholder;
        }

        return '?' + new URLSearchParams(params).toString();
    };

    return (
        <img
            {...props}
            style={
                circle
                    ? {
                          borderRadius: '50%',
                          ...props.style,
                      }
                    : props.style
            }
            src={`${BASE_URL}/${md5(email.trim().toLowerCase())}${getQueryParams()}`}
            alt={alt}
        />
    );
};

export default Gravatar;
