import React from 'react';
import cx from 'classnames';

import { IIconProps } from '../type';

import style from './icon.module.scss';

const FileSpotIcon = ({ className = '', height = 48, spotClassName = '', width = 48 }: IIconProps): JSX.Element => (
    <svg
        className={cx(style.iconColor, className)}
        fill="none"
        height={height}
        viewBox="0 0 48 48"
        width={width}
        xmlns="http://www.w3.org/2000/svg"
    >
        <g id="file">
            <path
                className={cx(style.spotColor, spotClassName)}
                d="M15.75 31.5C24.4485 31.5 31.5 24.4485 31.5 15.75C31.5 7.05152 24.4485 0 15.75 0C7.05152 0 0 7.05152 0 15.75C0 24.4485 7.05152 31.5 15.75 31.5Z"
                fill="currentColor"
                id="spot"
            />
            <g id="Group">
                <path
                    clipRule="evenodd"
                    d="M6 0H35.5607L42 6.43934V21H40.5V7.06066L34.9393 1.5H7.5V21H6V0Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector"
                />
                <g id="Group_2">
                    <path
                        clipRule="evenodd"
                        d="M3.67458 23.7495L7.13988 21.6408L6.36012 20.3594L2.66262 22.6094C2.51259 22.7007 2.39936 22.8417 2.34266 23.0079L0.0401612 29.7579C-0.0128081 29.9132 -0.0133959 30.0816 0.0384875 30.2372L3 39.1218V41.2501H4.5V39.0001C4.5 38.9195 4.487 38.8394 4.46151 38.7629L1.54149 30.0028L3.67458 23.7495Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        id="Vector_2"
                    />
                    <path
                        clipRule="evenodd"
                        d="M6.00027 21C6.00027 19.3134 7.44408 18 9.07077 18C10.7596 18 12.0003 19.3748 12.0003 21V25.4177L13.5003 32.1677V42H12.0003V32.3323L10.5003 25.5823V21C10.5003 20.1397 9.86896 19.5 9.07077 19.5C8.21197 19.5 7.50027 20.2011 7.50027 21V27.0533L6.74274 32.3561L5.25781 32.1439L6.00027 26.9467V21Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        id="Vector_3"
                    />
                    <path
                        clipRule="evenodd"
                        d="M1.5 41.25C1.5 40.8358 1.83579 40.5 2.25 40.5H14.25C14.6642 40.5 15 40.8358 15 41.25V48H13.5V42H3V48H1.5V41.25Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        id="Vector_4"
                    />
                    <path
                        clipRule="evenodd"
                        d="M10.5 43.5H12V45H10.5V43.5Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        id="Vector_5"
                    />
                </g>
                <g id="Group_3">
                    <path
                        clipRule="evenodd"
                        d="M41.6401 20.3594L45.3376 22.6094C45.4876 22.7007 45.6009 22.8417 45.6576 23.0079L47.9601 29.7579C48.013 29.9132 48.0136 30.0816 47.9617 30.2372L45.0002 39.1218V41.2501H43.5002V39.0001C43.5002 38.9195 43.5132 38.8394 43.5387 38.7629L46.4587 30.0028L44.3256 23.7495L40.8604 21.6408L41.6401 20.3594Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        id="Vector_6"
                    />
                    <path
                        clipRule="evenodd"
                        d="M38.9295 19.5C38.1313 19.5 37.5 20.1397 37.5 21V25.5823L36 32.3323V41.25H34.5V32.1677L36 25.4177V21C36 19.3748 37.2407 18 38.9295 18C40.5553 18 42 19.3132 42 21V26.9467L42.7425 32.1439L41.2575 32.3561L40.5 27.0533V21C40.5 20.2013 39.7877 19.5 38.9295 19.5Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        id="Vector_7"
                    />
                    <path
                        clipRule="evenodd"
                        d="M37.5 45H36V43.5H37.5V45Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        id="Vector_8"
                    />
                    <path
                        clipRule="evenodd"
                        d="M33 42C33 41.171 33.671 40.5 34.5 40.5H44.25C45.079 40.5 45.75 41.171 45.75 42V48H44.25V42H34.5V48H33V42Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        id="Vector_9"
                    />
                </g>
                <path
                    clipRule="evenodd"
                    d="M36 6V0.75H34.5V7.5H41.25V6H36Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_10"
                />
                <path
                    clipRule="evenodd"
                    d="M12 6H10.5V4.5H12V6Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_11"
                />
                <path
                    clipRule="evenodd"
                    d="M15 6H13.5V4.5H15V6Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_12"
                />
                <path
                    clipRule="evenodd"
                    d="M18 6H16.5V4.5H18V6Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_13"
                />
                <path
                    clipRule="evenodd"
                    d="M31.5 10.5H10.5V9H31.5V10.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_14"
                />
                <path
                    clipRule="evenodd"
                    d="M37.5 13.5H10.5V12H37.5V13.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_15"
                />
                <path
                    clipRule="evenodd"
                    d="M37.5 16.5H10.5V15H37.5V16.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_16"
                />
                <path
                    clipRule="evenodd"
                    d="M29.25 19.5V36H27.75V19.5H29.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_17"
                />
                <path
                    clipRule="evenodd"
                    d="M32.25 22.5V36H30.75V22.5H32.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_18"
                />
                <path
                    clipRule="evenodd"
                    d="M26.25 24V36H24.75V24H26.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_19"
                />
                <path
                    clipRule="evenodd"
                    d="M23.25 21V36H21.75V21H23.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_20"
                />
                <path
                    clipRule="evenodd"
                    d="M17.25 22.5V36H15.75V22.5H17.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_21"
                />
                <path
                    clipRule="evenodd"
                    d="M17.25 39H15.75V37.5H17.25V39Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_22"
                />
                <path
                    clipRule="evenodd"
                    d="M20.25 25.5V36H18.75V25.5H20.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_23"
                />
                <path
                    clipRule="evenodd"
                    d="M20.25 39H18.75V37.5H20.25V39Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_24"
                />
                <path
                    clipRule="evenodd"
                    d="M23.25 39H21.75V37.5H23.25V39Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_25"
                />
                <path
                    clipRule="evenodd"
                    d="M26.25 39H24.75V37.5H26.25V39Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_26"
                />
                <path
                    clipRule="evenodd"
                    d="M29.25 39H27.75V37.5H29.25V39Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_27"
                />
                <path
                    clipRule="evenodd"
                    d="M32.25 39H30.75V37.5H32.25V39Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_28"
                />
            </g>
        </g>
    </svg>
);

export default FileSpotIcon;
