import React from 'react';

import { IIconProps } from '../../Icons/type';

const ModifierBadgeIcon = ({ className = '', height = 10, width = 10 }: IIconProps) => (
    <svg
        className={className}
        fill="currentColor"
        height={height}
        viewBox="0 0 10 10"
        width={width}
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="5" cy="5.00012" r="4" />
    </svg>
);

export default ModifierBadgeIcon;
