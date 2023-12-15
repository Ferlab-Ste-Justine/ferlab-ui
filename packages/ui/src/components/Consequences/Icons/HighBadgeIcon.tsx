import React, { ReactElement } from 'react';

import { IIconProps } from '../../Icons/type';

const HighBadgeIcon = ({ className = '', height = 10, width = 10 }: IIconProps): ReactElement => (
    <svg
        className={className}
        fill="currentColor"
        height={height}
        viewBox="0 0 10 10"
        width={width}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M5 1.00012L0 9.00012H10L5 1.00012Z" />
    </svg>
);

export default HighBadgeIcon;
