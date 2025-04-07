import React from 'react';
import cx from 'classnames';

import { IIconProps } from '../type';

import style from './icon.module.css';

const EmailLetterSpotIcon = ({
    className = '',
    height = 48,
    spotClassName = '',
    width = 48,
}: IIconProps): JSX.Element => (
    <svg
        className={cx(style.iconColor, className)}
        fill="none"
        height={height}
        viewBox="0 0 48 48"
        width={width}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            className={cx(style.spotColor, spotClassName)}
            d="M31.9062 31.1875C40.2423 31.1875 47 24.4298 47 16.0938C47 7.7577 40.2423 1 31.9062 1C23.5702 1 16.8125 7.7577 16.8125 16.0938C16.8125 24.4298 23.5702 31.1875 31.9062 31.1875Z"
            fill="currentColor"
            id="spot"
        />
        <path
            clip-rule="evenodd"
            d="M1 16.8125H6.75V18.25H2.4375V45.5625H45.5625V18.25H41.25V16.8125H47V47H1V16.8125Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M8.1875 1H33.6415L39.8125 7.17103V24.7188H38.375V7.76647L33.046 2.4375H9.625V24.7188H8.1875V1Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M24 28.1223L46.7213 45.7129L45.8412 46.8496L24 29.9402L2.15875 46.8496L1.27875 45.7129L24 28.1223Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M15.5855 32.4145L1.21052 18.0395L2.22698 17.023L16.602 31.398L15.5855 32.4145Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M31.398 31.398L45.773 17.023L46.7895 18.0395L32.4145 32.4145L31.398 31.398Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M34.0625 6.75V1.71875H32.625V8.1875H39.0938V6.75H34.0625Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M24.7188 44.125H23.2812V42.6875H24.7188V44.125Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M27.5938 44.125H26.1562V42.6875H27.5938V44.125Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M21.8438 44.125H20.4062V42.6875H21.8438V44.125Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M12.5 1H29.75V9.625H12.5V1ZM13.9375 2.4375V8.1875H28.3125V2.4375H13.9375Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M16.8125 5.3125H15.375V3.875H16.8125V5.3125Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M19.6875 5.3125H18.25V3.875H19.6875V5.3125Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M22.5625 5.3125H21.125V3.875H22.5625V5.3125Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path clip-rule="evenodd" d="M35.5 12.5H12.5V11.0625H35.5V12.5Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M35.5 15.375H12.5V13.9375H35.5V15.375Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M35.5 18.25H12.5V16.8125H35.5V18.25Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M35.5 21.125H12.5V19.6875H35.5V21.125Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M35.5 24H12.5V22.5625H35.5V24Z" fill="currentColor" fill-rule="evenodd" />
    </svg>
);

export default EmailLetterSpotIcon;
