import React from 'react';
import cx from 'classnames';

import { IIconProps } from '../type';

import style from './icon.module.scss';

const StudySpotIcon = ({ className = '', height = 48, spotClassName = '', width = 48 }: IIconProps): JSX.Element => (
    <svg
        className={cx(style.iconColor, className)}
        fill="none"
        height={height}
        viewBox="0 0 48 48"
        width={width}
        xmlns="http://www.w3.org/2000/svg"
    >
        <g id="study">
            <path
                className={cx(style.spotColor, spotClassName)}
                d="M15.75 48C24.4485 48 31.5 40.9485 31.5 32.25C31.5 23.5515 24.4485 16.5 15.75 16.5C7.05152 16.5 0 23.5515 0 32.25C0 40.9485 7.05152 48 15.75 48Z"
                fill="currentColor"
                id="spot"
            />
            <g id="Group">
                <g id="Group_2">
                    <path
                        clipRule="evenodd"
                        d="M46.5 39V42C46.5 42.4142 46.1642 42.75 45.75 42.75H28.5V41.25H45V39H46.5Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        id="Vector (Stroke)"
                    />
                    <path
                        clipRule="evenodd"
                        d="M1.5 42V39H3V41.25H18V42.75H2.25C1.83579 42.75 1.5 42.4142 1.5 42Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        id="Vector (Stroke)_2"
                    />
                </g>
                <path
                    clipRule="evenodd"
                    d="M0 6.75C0 6.33579 0.335786 6 0.75 6H18V7.5H1.5V38.25H18V39.75H0.75C0.335786 39.75 0 39.4142 0 39V6.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector"
                />
                <path
                    clipRule="evenodd"
                    d="M46.5 7.5H44.25V6H47.25C47.6642 6 48 6.33579 48 6.75V39C48 39.4142 47.6642 39.75 47.25 39.75H28.5V38.25H46.5V7.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_2"
                />
                <path
                    clipRule="evenodd"
                    d="M38.25 7.5H28.5V6H38.25V7.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_3"
                />
                <path
                    clipRule="evenodd"
                    d="M18 13.5H3V12H18V13.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_4"
                />
                <path
                    clipRule="evenodd"
                    d="M18 35.25H3V33.75H18V35.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_5"
                />
                <path
                    clipRule="evenodd"
                    d="M18 32.25H3V30.75H18V32.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_6"
                />
                <path
                    clipRule="evenodd"
                    d="M18 29.25H3V27.75H18V29.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_7"
                />
                <path
                    clipRule="evenodd"
                    d="M45 26.25H28.5V24.75H45V26.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_8"
                />
                <path
                    clipRule="evenodd"
                    d="M45 29.25H28.5V27.75H45V29.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_9"
                />
                <path
                    clipRule="evenodd"
                    d="M45 32.25H28.5V30.75H45V32.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_10"
                />
                <path
                    clipRule="evenodd"
                    d="M45 35.25H28.5V33.75H45V35.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_11"
                />
                <g id="Group_3">
                    <path
                        clipRule="evenodd"
                        d="M19.5 6.75C19.5 6.33579 19.8358 6 20.25 6H26.25C26.6642 6 27 6.33579 27 6.75V40.5H25.5V7.5H21V40.5H19.5V6.75Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        id="Vector_12"
                    />
                    <path
                        clipRule="evenodd"
                        d="M22.5 40.5V6.75H24V40.5H22.5Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        id="Vector_13"
                    />
                    <path
                        clipRule="evenodd"
                        d="M19.6211 40.0913C19.7595 39.8784 19.9961 39.75 20.25 39.75H26.25C26.5039 39.75 26.7405 39.8784 26.8789 40.0913C27.0172 40.3042 27.0385 40.5726 26.9354 40.8046L23.9354 47.5546C23.815 47.8254 23.5464 48 23.25 48C22.9536 48 22.685 47.8254 22.5646 47.5546L19.5646 40.8046C19.4615 40.5726 19.4828 40.3042 19.6211 40.0913ZM21.4041 41.25L23.25 45.4033L25.0959 41.25H21.4041Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        id="Vector_14"
                    />
                    <path
                        clipRule="evenodd"
                        d="M19.5 3C19.5 1.34379 20.8438 0 22.5 0H24C25.6562 0 27 1.34379 27 3V6.75C27 7.16421 26.6642 7.5 26.25 7.5H20.25C19.8358 7.5 19.5 7.16421 19.5 6.75V3ZM22.5 1.5C21.6722 1.5 21 2.17221 21 3V6H25.5V3C25.5 2.17221 24.8278 1.5 24 1.5H22.5Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        id="Vector_15"
                    />
                </g>
                <path
                    clipRule="evenodd"
                    d="M37.5 5.25C37.5 4.83579 37.8358 4.5 38.25 4.5H44.25C44.6642 4.5 45 4.83579 45 5.25V20.25C45 20.5533 44.8173 20.8268 44.537 20.9429C44.2568 21.059 43.9342 20.9948 43.7197 20.7803L41.25 18.3107L38.7803 20.7803C38.5658 20.9948 38.2432 21.059 37.963 20.9429C37.6827 20.8268 37.5 20.5533 37.5 20.25V5.25ZM39 6V18.4393L40.7197 16.7197C41.0126 16.4268 41.4874 16.4268 41.7803 16.7197L43.5 18.4393V6H39Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_16"
                />
                <path
                    clipRule="evenodd"
                    d="M3 15.75C3 15.3358 3.33579 15 3.75 15H17.25C17.6642 15 18 15.3358 18 15.75V25.5C18 25.9142 17.6642 26.25 17.25 26.25H3.75C3.33579 26.25 3 25.9142 3 25.5V15.75ZM4.5 16.5V24.75H16.5V16.5H4.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_17"
                />
                <path
                    clipRule="evenodd"
                    d="M36 12H28.5V10.5H36V12Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_18"
                />
                <path
                    clipRule="evenodd"
                    d="M36 15H28.5V13.5H36V15Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_19"
                />
                <path
                    clipRule="evenodd"
                    d="M36 18H28.5V16.5H36V18Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_20"
                />
                <path
                    clipRule="evenodd"
                    d="M30 23.25H28.5V21.75H30V23.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_21"
                />
                <path
                    clipRule="evenodd"
                    d="M33 23.25H31.5V21.75H33V23.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_22"
                />
                <path
                    clipRule="evenodd"
                    d="M36 23.25H34.5V21.75H36V23.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_23"
                />
                <path
                    clipRule="evenodd"
                    d="M4.5 10.5H3V9H4.5V10.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_24"
                />
                <path
                    clipRule="evenodd"
                    d="M7.5 10.5H6V9H7.5V10.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_25"
                />
                <path
                    clipRule="evenodd"
                    d="M10.5 10.5H9V9H10.5V10.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_26"
                />
            </g>
        </g>
    </svg>
);

export default StudySpotIcon;
