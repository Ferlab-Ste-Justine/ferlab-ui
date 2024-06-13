import React from 'react';
import cx from 'classnames';

import { IIconProps } from '../type';

import style from './icon.module.scss';

const FileSearchSpotIcon = ({
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
        <g id="file-search">
            <path
                className={cx(style.spotColor, spotClassName)}
                d="M15.75 48C24.4485 48 31.5 40.9485 31.5 32.25C31.5 23.5515 24.4485 16.5 15.75 16.5C7.05152 16.5 0 23.5515 0 32.25C0 40.9485 7.05152 48 15.75 48Z"
                fill="currentColor"
                id="spot"
            />
            <g id="Group">
                <path
                    clipRule="evenodd"
                    d="M6 0.75C6 0.335786 6.33579 0 6.75 0H35.25C35.4489 0 35.6397 0.0790176 35.7803 0.21967L41.7803 6.21967C41.921 6.36032 42 6.55109 42 6.75V45C42 45.3033 41.8173 45.5768 41.537 45.6929C41.2568 45.809 40.9342 45.7448 40.7197 45.5303L34.1893 39H33V40.1893L39.5303 46.7197C39.7448 46.9342 39.809 47.2568 39.6929 47.537C39.5768 47.8173 39.3033 48 39 48H6.75C6.33579 48 6 47.6642 6 47.25V0.75ZM7.5 1.5V46.5H37.1893L31.7197 41.0303C31.579 40.8897 31.5 40.6989 31.5 40.5V38.25C31.5 37.8358 31.8358 37.5 32.25 37.5H34.5C34.6989 37.5 34.8897 37.579 35.0303 37.7197L40.5 43.1893V7.06066L34.9393 1.5H7.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector"
                />
                <path
                    clipRule="evenodd"
                    d="M31.2804 36.2197L32.7804 37.7197L31.7197 38.7804L30.2197 37.2804L31.2804 36.2197Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_2"
                />
                <path
                    clipRule="evenodd"
                    d="M24 21C19.0292 21 15 25.0292 15 30C15 34.9708 19.0292 39 24 39C28.9708 39 33 34.9708 33 30H34.5C34.5 35.7992 29.7992 40.5 24 40.5C18.2008 40.5 13.5 35.7992 13.5 30C13.5 24.2008 18.2008 19.5 24 19.5V21Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_3"
                />
                <path
                    clipRule="evenodd"
                    d="M36 6V0.75H34.5V7.5H41.25V6H36Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_4"
                />
                <path
                    clipRule="evenodd"
                    d="M17.25 30C17.25 26.2723 20.2723 23.25 24 23.25V24.75C21.1007 24.75 18.75 27.1007 18.75 30C18.75 32.8993 21.1007 35.25 24 35.25C26.8993 35.25 29.25 32.8993 29.25 30H30.75C30.75 33.7277 27.7277 36.75 24 36.75C20.2723 36.75 17.25 33.7277 17.25 30Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_5"
                />
                <path
                    clipRule="evenodd"
                    d="M12 4.5H10.5V3H12V4.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_6"
                />
                <path
                    clipRule="evenodd"
                    d="M15 4.5H13.5V3H15V4.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_7"
                />
                <path
                    clipRule="evenodd"
                    d="M18 4.5H16.5V3H18V4.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_8"
                />
                <path
                    clipRule="evenodd"
                    d="M37.5 12H10.5V10.5H37.5V12Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_9"
                />
                <path
                    clipRule="evenodd"
                    d="M37.5 15H29.25V13.5H37.5V15Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_10"
                />
                <path
                    clipRule="evenodd"
                    d="M27.75 15H22.5V13.5H27.75V15Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_11"
                />
                <path
                    clipRule="evenodd"
                    d="M21 15H10.5V13.5H21V15Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_12"
                />
                <path
                    clipRule="evenodd"
                    d="M18 18H10.5V16.5H18V18Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_13"
                />
                <path
                    clipRule="evenodd"
                    d="M31.5 7.5H10.5V6H31.5V7.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_14"
                />
                <path
                    clipRule="evenodd"
                    d="M25.5 19.5H26.25C30.8057 19.5 34.5 23.1943 34.5 27.75V28.5H25.5V19.5ZM27 21.0412V27H32.9588C32.6128 23.8718 30.1282 21.3872 27 21.0412Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_15"
                />
                <path
                    clipRule="evenodd"
                    d="M18 29.25H24.3107L29.0303 33.9697L27.9697 35.0303L23.6893 30.75H18V29.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_16"
                />
            </g>
        </g>
    </svg>
);

export default FileSearchSpotIcon;
