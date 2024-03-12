import React from 'react';
import cx from 'classnames';

import { IIconProps } from '../type';

import style from './icon.module.scss';

const WebsiteSpotIcon = ({ className = '', height = 48, spotClassName = '', width = 48 }: IIconProps): JSX.Element => (
    <svg
        className={className}
        width={width}
        height={height}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g id="website">
            <path
                className={cx(style.spotColor, spotClassName)}
                id="spot"
                d="M24 31.5C32.6985 31.5 39.75 24.4485 39.75 15.75C39.75 7.05152 32.6985 0 24 0C15.3015 0 8.25 7.05152 8.25 15.75C8.25 24.4485 15.3015 31.5 24 31.5Z"
                fill="currentColor"
            />
            <g id="Group">
                <path
                    id="Vector"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 3H48V48H37.5V46.5H46.5V4.5H1.5V46.5H10.5V48H0V3Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_2"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M47.25 10.5H0.75V9H47.25V10.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_3"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.5 7.5H3V6H4.5V7.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_4"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.5 7.5H6V6H7.5V7.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_5"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.5 7.5H9V6H10.5V7.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_6"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 9.75V3.75H13.5V9.75H12Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_7"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M45 7.5H15V6H45V7.5Z"
                    fill="currentColor"
                />
                <path
                    id="Vector_8"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3 12H45V45H37.5V43.5H43.5V13.5H4.5V43.5H10.5V45H3V12Z"
                    fill="currentColor"
                />
                <g id="Group_2">
                    <path
                        id="Vector_9"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M22.8858 18.0944C22.9972 18.0325 23.1225 18 23.25 18H24.75C24.8775 18 25.0028 18.0325 25.1142 18.0944L38.6142 25.5944C38.8523 25.7267 39 25.9776 39 26.25V30C39 30.2627 38.8625 30.5063 38.6376 30.6421C38.4127 30.7778 38.1332 30.786 37.9007 30.6637L24 23.3475L10.0993 30.6637C9.86683 30.786 9.58727 30.7778 9.36237 30.6421C9.13746 30.5063 9 30.2627 9 30V26.25C9 25.9776 9.14767 25.7267 9.38577 25.5944L22.8858 18.0944ZM23.4443 19.5L10.5 26.6913V28.7577L23.6507 21.8363C23.8693 21.7212 24.1307 21.7212 24.3493 21.8363L37.5 28.7577V26.6913L24.5557 19.5H23.4443Z"
                        fill="currentColor"
                    />
                    <path
                        id="Vector_10"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.5 46.5V28.5H12V48H36V28.5H34.5V46.5H13.5Z"
                        fill="currentColor"
                    />
                    <path
                        id="Vector_11"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19.5 36H28.5V47.25H27V37.5H21V47.25H19.5V36Z"
                        fill="currentColor"
                    />
                    <path
                        id="Vector_12"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M24 29.25C23.1716 29.25 22.5 29.9216 22.5 30.75C22.5 31.5784 23.1716 32.25 24 32.25C24.8284 32.25 25.5 31.5784 25.5 30.75C25.5 29.9216 24.8284 29.25 24 29.25ZM21 30.75C21 29.0931 22.3431 27.75 24 27.75C25.6569 27.75 27 29.0931 27 30.75C27 32.4069 25.6569 33.75 24 33.75C22.3431 33.75 21 32.4069 21 30.75Z"
                        fill="currentColor"
                    />
                    <path
                        id="Vector_13"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.5 18V22.5H15V18H16.5Z"
                        fill="currentColor"
                    />
                    <path
                        id="Vector_14"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M25.5 41.25H27.75V42.75H25.5V41.25Z"
                        fill="currentColor"
                    />
                </g>
            </g>
        </g>
    </svg>
);

export default WebsiteSpotIcon;
