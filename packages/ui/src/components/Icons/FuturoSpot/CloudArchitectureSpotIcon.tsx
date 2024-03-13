import React from 'react';
import cx from 'classnames';

import { IIconProps } from '../type';

import style from './icon.module.scss';

const CloudArchitectureSpotIcon = ({
    className = '',
    height = 48,
    spotClassName = '',
    width = 48,
}: IIconProps): JSX.Element => (
    <svg
        className={cx(style.iconColor, className)}
        width={width}
        height={height}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g id="cloud-architecture">
            <path
                className={cx(style.spotColor, spotClassName)}
                id="spot"
                d="M39.75 32.25C39.75 40.9478 32.6992 48 24 48C15.3008 48 8.25 40.9478 8.25 32.25C8.25 23.547 15.3008 16.5 24 16.5C32.6992 16.5 39.75 23.547 39.75 32.25Z"
                fill="currentColor"
            />
            <g id="Group">
                <path
                    id="Vector"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.02016 12.0269C9.39508 5.32206 14.9515 0 21.75 0C26.3735 0 30.4441 2.28556 32.6826 6H33C35.4257 6 37.3253 6.8144 38.6136 8.21004C39.7395 9.42976 40.3448 11.035 40.4737 12.78C45.0675 13.1657 48 17.2094 48 21.75C48 27.1353 43.6344 31.5 38.25 31.5H35.25V30H38.25C42.8061 30 46.5 26.3067 46.5 21.75C46.5 17.6043 43.7427 14.25 39.75 14.25H39V13.5C39 11.7708 38.4822 10.2792 37.5114 9.22746C36.5497 8.1856 35.0743 7.5 33 7.5H31.8081L31.594 7.11346C29.6858 3.66924 26.0102 1.5 21.75 1.5C15.5372 1.5 10.5 6.53721 10.5 12.75V13.5H9.75C5.19396 13.5 1.5 17.194 1.5 21.75C1.5 26.3067 5.19392 30 9.75 30H12.75V31.5H9.75C4.36558 31.5 0 27.1353 0 21.75C0 16.611 3.97652 12.4002 9.02016 12.0269Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_2"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.25 19.5H30.75V33H17.25V19.5ZM18.75 21V31.5H29.25V21H18.75Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_3"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20.25 16.5V20.25H18.75V16.5H20.25Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_4"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M23.25 16.5V20.25H21.75V16.5H23.25Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_5"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M26.25 16.5V20.25H24.75V16.5H26.25Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_6"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M29.25 16.5V20.25H27.75V16.5H29.25Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_7"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M23.25 32.25V48H21.75V32.25H23.25Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_8"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M26.25 32.25V48H24.75V32.25H26.25Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_9"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M33.75 22.5H30V21H33.75V22.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_10"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M33.75 25.5H30V24H33.75V25.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_11"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M33.75 28.5H30V27H33.75V28.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_12"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M33.75 31.5H30V30H33.75V31.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_13"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18 22.5H14.25V21H18V22.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_14"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18 25.5H14.25V24H18V25.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_15"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18 28.5H14.25V27H18V28.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_16"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18 31.5H14.25V30H18V31.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_17"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21.75 24H26.25V28.5H21.75V24ZM23.25 25.5V27H24.75V25.5H23.25Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_18"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.75 39V32.25H20.25V40.5H0V39H18.75Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_19"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M27.75 32.25H29.25V39H48V40.5H27.75V32.25Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_20"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20.25 13.5V15H18.75V13.5H20.25Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_21"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M23.25 13.5V15H21.75V13.5H23.25Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_22"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M23.25 10.5V12H21.75V10.5H23.25Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_23"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M26.25 10.5V12H24.75V10.5H26.25Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_24"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M26.25 13.5V15H24.75V13.5H26.25Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_25"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M29.25 13.5V15H27.75V13.5H29.25Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_26"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.25 21H12.75V22.5H11.25V21Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_27"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.25 21H9.75V22.5H8.25V21Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_28"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.25 24H12.75V25.5H11.25V24Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_29"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.25 24H9.75V25.5H8.25V24Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_30"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.25 27H12.75V28.5H11.25V27Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_31"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.25 21H6.75V22.5H5.25V21Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_32"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M36.75 22.5H35.25V21H36.75V22.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_33"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M39.75 22.5H38.25V21H39.75V22.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_34"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M36.75 25.5H35.25V24H36.75V25.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_35"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M39.75 25.5H38.25V24H39.75V25.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_36"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M36.75 28.5H35.25V27H36.75V28.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_37"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M42.75 22.5H41.25V21H42.75V22.5Z"
                    fill="currentColor"
                />
            </g>
        </g>
    </svg>
);

export default CloudArchitectureSpotIcon;
