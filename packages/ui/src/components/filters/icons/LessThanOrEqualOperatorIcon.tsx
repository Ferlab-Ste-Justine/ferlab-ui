import React from 'react';
import { IIconProps } from './type';

const LessThanOrEqualOperatorIcon = ({ className = '', width = '16', height = '16' }: IIconProps) => (
    <svg
        className={className}
        width={width}
        height={height}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M12.6667 4.04741L5.72537 6.30875L12.6667 8.61941V11.0001L3.33337 7.29475V5.37208L12.6667 1.66675V4.04741Z"
            fill="#6E7190"
        />
        <path d="M3.33337 8.96008V10.6295L12.6667 14.3348V12.6935L3.33337 8.96008Z" fill="#6E7190" />
    </svg>
);
export default LessThanOrEqualOperatorIcon;
