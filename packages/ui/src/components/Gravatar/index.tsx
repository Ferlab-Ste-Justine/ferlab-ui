import React, { ReactElement } from 'react';
import { CSSProperties } from 'react';
import md5 from 'md5';

export interface IGravatarProps {
    id: string;
    circle?: boolean;
    placeholder?: string | 'robohash' | 'retro' | 'wavatar' | 'monsterid' | 'identicon' | 'mp' | '404';
    size?: number;
    style?: CSSProperties;
    alt?: string;
    className?: string;
}

const BASE_URL = 'https://www.gravatar.com/avatar';

const Gravatar = ({
    alt = 'Gravatar',
    circle = false,
    id = '',
    placeholder = 'retro',
    size = 100,
    ...props
}: IGravatarProps): ReactElement => {
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
            alt={alt}
            src={`${BASE_URL}/${md5(id.trim().toLowerCase())}${getQueryParams()}`}
            style={
                circle
                    ? {
                          borderRadius: '50%',
                          ...props.style,
                      }
                    : props.style
            }
        />
    );
};

export default Gravatar;
