import React from 'react';
import cx from 'classnames';

import { IIconProps } from '../type';

import style from './icon.module.scss';

const ChemistrySpotIcon = ({
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
        <g id="chemistry">
            <path
                className={cx(style.spotColor, spotClassName)}
                id="spot"
                d="M31.5 15.75C31.5 24.4478 24.4492 31.5 15.75 31.5C7.05075 31.5 0 24.4478 0 15.75C0 7.047 7.05075 0 15.75 0C24.4492 0 31.5 7.047 31.5 15.75Z"
                fill="currentColor"
            />
            <g id="Group">
                <path
                    id="Vector"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.5 10.5H13.5V37.5C13.5 39.1562 12.1562 40.5 10.5 40.5C8.84379 40.5 7.5 39.1562 7.5 37.5V10.5ZM9 12V37.5C9 38.3278 9.67221 39 10.5 39C11.3278 39 12 38.3278 12 37.5V12H9Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_2"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.5 10.5H22.5V37.5C22.5 39.1562 21.1562 40.5 19.5 40.5C17.8438 40.5 16.5 39.1562 16.5 37.5V10.5ZM18 12V37.5C18 38.3278 18.6722 39 19.5 39C20.3278 39 21 38.3278 21 37.5V12H18Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_3"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M25.5 10.5H31.5V37.5C31.5 39.1562 30.1562 40.5 28.5 40.5C26.8438 40.5 25.5 39.1562 25.5 37.5V10.5ZM27 12V37.5C27 38.3278 27.6722 39 28.5 39C29.3278 39 30 38.3278 30 37.5V12H27Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_4"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M34.5 10.5H40.5V37.5C40.5 39.1562 39.1562 40.5 37.5 40.5C35.8438 40.5 34.5 39.1562 34.5 37.5V10.5ZM36 12V37.5C36 38.3278 36.6722 39 37.5 39C38.3278 39 39 38.3278 39 37.5V12H36Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_5"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M48 22.5H0V21H48V22.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_6"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M48 43.5H0V42H48V43.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_7"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M48 48H0V46.5H48V48Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_8"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3 47.25V19.5H4.5V47.25H3Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_9"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M43.5 47.25V19.5H45V47.25H43.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_10"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20.25 7.5V9H18.75V7.5H20.25Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_11"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20.25 4.5V6H18.75V4.5H20.25Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_12"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M27.75 4.5H48V6H29.25V9H27.75V4.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_13"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M36.75 9V7.5H38.25V9H36.75Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_14"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.75 9V4.5H11.25V9H9.75Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_15"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M30.75 18H26.25V16.5H30.75V18Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_16"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M39.75 25.5H35.25V24H39.75V25.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_17"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21.75 27H17.25V25.5H21.75V27Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_18"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.75 19.5H8.25V18H12.75V19.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_19"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.5 47.25V42.75H9V47.25H7.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_20"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 47.25V42.75H13.5V47.25H12Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_21"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.5 47.25V42.75H18V47.25H16.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_22"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21 47.25V42.75H22.5V47.25H21Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_23"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M25.5 47.25V42.75H27V47.25H25.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_24"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M30 47.25V42.75H31.5V47.25H30Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_25"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M34.5 47.25V42.75H36V47.25H34.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_26"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M39 47.25V42.75H40.5V47.25H39Z"
                    fill="currentColor"
                />
            </g>
        </g>
    </svg>
);

export default ChemistrySpotIcon;
