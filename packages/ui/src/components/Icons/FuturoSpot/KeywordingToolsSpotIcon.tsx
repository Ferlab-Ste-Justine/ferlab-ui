import React from 'react';
import cx from 'classnames';

import { IIconProps } from '../type';

import style from './icon.module.css';

const KeywordingToolsSpotIcon = ({
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
            d="M16.25 32C24.9485 32 32 24.9485 32 16.25C32 7.55152 24.9485 0.5 16.25 0.5C7.55152 0.5 0.5 7.55152 0.5 16.25C0.5 24.9485 7.55152 32 16.25 32Z"
            fill="currentColor"
            id="spot"
        />
        <path
            clip-rule="evenodd"
            d="M46.5 9H20.25V7.5H48V13.5H20.25V12H46.5V9Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M39 12H46.5V19.5H42V18H39V12ZM43.5 18H45V13.5H40.5V16.5H43.5V18Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M6 9C5.17157 9 4.5 9.67157 4.5 10.5C4.5 11.3284 5.17157 12 6 12C6.82843 12 7.5 11.3284 7.5 10.5C7.5 9.67157 6.82843 9 6 9ZM3 10.5C3 8.84315 4.34315 7.5 6 7.5C7.65685 7.5 9 8.84315 9 10.5C9 12.1569 7.65685 13.5 6 13.5C4.34315 13.5 3 12.1569 3 10.5Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M12 22.5H25.5V27H12V22.5ZM13.5 24V25.5H24V24H13.5Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M27 22.5H48V27H27V22.5ZM28.5 24V25.5H46.5V24H28.5Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M0 28.5H13.5V33H0V28.5ZM1.5 30V31.5H12V30H1.5Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M15 28.5H33V33H15V28.5ZM16.5 30V31.5H31.5V30H16.5Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M34.5 28.5H48V33H34.5V28.5ZM36 30V31.5H46.5V30H36Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M0 34.5H18V39H0V34.5ZM1.5 36V37.5H16.5V36H1.5Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M19.5 34.5H36V39H19.5V34.5ZM21 36V37.5H34.5V36H21Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M37.5 34.5H48V39H37.5V34.5ZM39 36V37.5H46.5V36H39Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M0 40.5H15V45H0V40.5ZM1.5 42V43.5H13.5V42H1.5Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M16.5 40.5H31.5V45H16.5V40.5ZM18 42V43.5H30V42H18Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M0 22.5H10.5V27H0V22.5ZM1.5 24V25.5H9V24H1.5Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M10.5 1.5C5.52944 1.5 1.5 5.52944 1.5 10.5C1.5 15.4706 5.52944 19.5 10.5 19.5C15.4706 19.5 19.5 15.4706 19.5 10.5C19.5 5.52944 15.4706 1.5 10.5 1.5ZM0 10.5C0 4.70101 4.70101 0 10.5 0C16.299 0 21 4.70101 21 10.5C21 16.299 16.299 21 10.5 21C4.70101 21 0 16.299 0 10.5Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path clip-rule="evenodd" d="M31.5 16.5H33V18H31.5V16.5Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M34.5 16.5H36V18H34.5V16.5Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M28.5 16.5H30V18H28.5V16.5Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M25.5 16.5H27V18H25.5V16.5Z" fill="currentColor" fill-rule="evenodd" />
    </svg>
);

export default KeywordingToolsSpotIcon;
