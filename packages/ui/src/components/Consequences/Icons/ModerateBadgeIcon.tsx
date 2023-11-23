import React, { ReactElement } from 'react';

import { IIconProps } from '../../Icons/type';

const ModerateBadgeIcon = ({ className = '', height = 10, width = 10 }: IIconProps): ReactElement => (
    <svg
        className={className}
        fill="currentColor"
        height={height}
        viewBox="0 0 10 10"
        width={width}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M10 5.00012L5 10.0001L0 5.00012L5 0.00012207L10 5.00012Z" />
    </svg>
);

export default ModerateBadgeIcon;
