import React, { ReactElement } from 'react';

import { IIconProps } from './type';

const LessThanOperatorIcon = ({ className = '', height = '16', width = '16' }: IIconProps): ReactElement => (
    <svg
        className={className}
        fill="none"
        height={height}
        viewBox="0 0 16 16"
        width={width}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M5.72537 7.97525L12.6667 5.71392V3.33325L3.33337 7.03859V8.96125L12.6667 12.6666V10.2859L5.72537 7.97525Z"
            fill="#6E7190"
        />
    </svg>
);
export default LessThanOperatorIcon;
