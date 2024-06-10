import React from 'react';
import cx from 'classnames';

import { IIconProps } from '../type';

import style from './icon.module.scss';

const CloudSecuritySpotIcon = ({
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
        <g id="cloud-security">
            <path
                className={cx(style.spotColor, spotClassName)}
                d="M15.75 48C24.4485 48 31.5 40.9485 31.5 32.25C31.5 23.5515 24.4485 16.5 15.75 16.5C7.05152 16.5 0 23.5515 0 32.25C0 40.9485 7.05152 48 15.75 48Z"
                fill="currentColor"
                id="spot"
            />
            <g id="Group">
                <path
                    clipRule="evenodd"
                    d="M9.02016 12.0269C9.39508 5.32206 14.9515 0 21.75 0C26.3735 0 30.4441 2.28556 32.6826 6H33C35.4257 6 37.3253 6.8144 38.6136 8.21004C39.7395 9.42976 40.3448 11.035 40.4737 12.78C45.0675 13.1657 48 17.2094 48 21.75C48 27.1345 43.6345 31.5 38.25 31.5V30C42.806 30 46.5 26.306 46.5 21.75C46.5 17.6043 43.7427 14.25 39.75 14.25H39V13.5C39 11.7708 38.4822 10.2792 37.5114 9.22746C36.5497 8.1856 35.0743 7.5 33 7.5H31.8081L31.594 7.11346C29.6858 3.66924 26.0102 1.5 21.75 1.5C15.5372 1.5 10.5 6.53721 10.5 12.75V13.5H9.75C5.19396 13.5 1.5 17.194 1.5 21.75C1.5 26.306 5.19396 30 9.75 30V31.5C4.36554 31.5 0 27.1345 0 21.75C0 16.611 3.97652 12.4002 9.02016 12.0269Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector"
                />
                <path
                    clipRule="evenodd"
                    d="M14.25 27C13.4222 27 12.75 27.6722 12.75 28.5V45C12.75 45.8278 13.4222 46.5 14.25 46.5H33.75C34.5778 46.5 35.25 45.8278 35.25 45V28.5C35.25 27.6722 34.5778 27 33.75 27H14.25ZM11.25 28.5C11.25 26.8438 12.5938 25.5 14.25 25.5H33.75C35.4062 25.5 36.75 26.8438 36.75 28.5V45C36.75 46.6562 35.4062 48 33.75 48H14.25C12.5938 48 11.25 46.6562 11.25 45V28.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_2"
                />
                <path
                    clipRule="evenodd"
                    d="M24.75 31.5H23.25V30H24.75V31.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_3"
                />
                <path
                    clipRule="evenodd"
                    d="M27.75 31.5H26.25V30H27.75V31.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_4"
                />
                <path
                    clipRule="evenodd"
                    d="M21.75 31.5H20.25V30H21.75V31.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_5"
                />
                <path
                    clipRule="evenodd"
                    d="M20.0304 38.7804L15.5304 43.2804L14.4697 42.2197L18.9697 37.7197L20.0304 38.7804Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_6"
                />
                <path
                    clipRule="evenodd"
                    d="M24.5304 38.7804L20.0304 43.2804L18.9697 42.2197L23.4697 37.7197L24.5304 38.7804Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_7"
                />
                <path
                    clipRule="evenodd"
                    d="M29.0304 38.7804L24.5304 43.2804L23.4697 42.2197L27.9697 37.7197L29.0304 38.7804Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_8"
                />
                <path
                    clipRule="evenodd"
                    d="M33.5304 38.7804L29.0304 43.2804L27.9697 42.2197L32.4697 37.7197L33.5304 38.7804Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_9"
                />
                <path
                    clipRule="evenodd"
                    d="M36 39H14.25V37.5H36V39Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_10"
                />
                <path
                    clipRule="evenodd"
                    d="M33.75 43.5H12V42H33.75V43.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_11"
                />
                <path
                    clipRule="evenodd"
                    d="M18.75 20.25C18.75 17.3511 21.1002 15 24 15C26.899 15 29.25 17.351 29.25 20.25V24H27.75V20.25C27.75 18.1795 26.0705 16.5 24 16.5C21.9288 16.5 20.25 18.1794 20.25 20.25V24H18.75V20.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_12"
                />
                <path
                    clipRule="evenodd"
                    d="M14.25 20.25C14.25 14.8655 18.6155 10.5 24 10.5C29.3845 10.5 33.75 14.8655 33.75 20.25V26.25H32.25V20.25C32.25 15.694 28.556 12 24 12C19.444 12 15.75 15.694 15.75 20.25V26.25H14.25V20.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_13"
                />
            </g>
        </g>
    </svg>
);

export default CloudSecuritySpotIcon;
