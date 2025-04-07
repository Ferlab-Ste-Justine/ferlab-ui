import React from 'react';
import cx from 'classnames';

import { IIconProps } from '../type';

import style from './icon.module.css';

const PatternSystemSpotIcon = ({
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
            d="M31.5 16.25C31.5 24.9478 24.4492 32 15.75 32C7.05075 32 0 24.9478 0 16.25C0 7.547 7.05075 0.5 15.75 0.5C24.4492 0.5 31.5 7.547 31.5 16.25Z"
            fill="currentColor"
            id="spot"
        />
        <path d="M13.5 1.5H3V0H15V15H0V3H1.5V13.5H13.5V1.5Z" fill="currentColor" />
        <path d="M13.5 34.5H3V33H15V48H0V36H1.5V46.5H13.5V34.5Z" fill="currentColor" />
        <path d="M36 34.5H46.5V46.5H34.5V36H33V48H48V33H36V34.5Z" fill="currentColor" />
        <path d="M16.5 0H31.5V12H30V1.5H18V13.5H28.5V15H16.5V0Z" fill="currentColor" />
        <path d="M31.5 16.5H16.5V28.5H18V18H30V30H19.5V31.5H31.5V16.5Z" fill="currentColor" />
        <path d="M33 16.5H48V28.5H46.5V18H34.5V30H45V31.5H33V16.5Z" fill="currentColor" />
        <path d="M0 1.5H1.5V0H0V1.5Z" fill="currentColor" />
        <path d="M30 13.5H31.5V15H30V13.5Z" fill="currentColor" />
        <path d="M48 30H46.5V31.5H48V30Z" fill="currentColor" />
        <path d="M33 33H34.5V34.5H33V33Z" fill="currentColor" />
        <path d="M16.5 31.5H18V30H16.5V31.5Z" fill="currentColor" />
        <path d="M1.5 34.5H0V33H1.5V34.5Z" fill="currentColor" />
        <path d="M3 12H12V10.5H3V12Z" fill="currentColor" />
        <path d="M36 45V43.5H45V45H36Z" fill="currentColor" />
        <path d="M19.5 4.5H28.5V3H19.5V4.5Z" fill="currentColor" />
        <path d="M45 21H36V19.5H45V21Z" fill="currentColor" />
        <path d="M28.5 19.5H27V28.5H28.5V19.5Z" fill="currentColor" />
        <path d="M10.5 45V36H12V45H10.5Z" fill="currentColor" />
        <path
            clip-rule="evenodd"
            d="M7.5 16.5C3.35786 16.5 0 19.8579 0 24C0 28.1421 3.35786 31.5 7.5 31.5C11.6421 31.5 15 28.1421 15 24C15 19.8579 11.6421 16.5 7.5 16.5ZM1.5 24C1.5 20.6863 4.18629 18 7.5 18C10.8137 18 13.5 20.6863 13.5 24C13.5 27.3137 10.8137 30 7.5 30C4.18629 30 1.5 27.3137 1.5 24Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M33 7.5C33 3.35786 36.3579 0 40.5 0C44.6421 0 48 3.35786 48 7.5C48 11.6421 44.6421 15 40.5 15C36.3579 15 33 11.6421 33 7.5ZM40.5 1.5C37.1863 1.5 34.5 4.18629 34.5 7.5C34.5 10.8137 37.1863 13.5 40.5 13.5C43.8137 13.5 46.5 10.8137 46.5 7.5C46.5 4.18629 43.8137 1.5 40.5 1.5Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M24 33C19.8579 33 16.5 36.3579 16.5 40.5C16.5 44.6421 19.8579 48 24 48C28.1421 48 31.5 44.6421 31.5 40.5C31.5 36.3579 28.1421 33 24 33ZM18 40.5C18 37.1863 20.6863 34.5 24 34.5C27.3137 34.5 30 37.1863 30 40.5C30 43.8137 27.3137 46.5 24 46.5C20.6863 46.5 18 43.8137 18 40.5Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
    </svg>
);

export default PatternSystemSpotIcon;
