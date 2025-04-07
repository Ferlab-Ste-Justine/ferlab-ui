import React from 'react';
import cx from 'classnames';

import { IIconProps } from '../type';

import style from './icon.module.css';

const ScientificLiteratureSpotIcon = ({
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
            d="M31.5 15.75C31.5 24.4478 24.4492 31.5 15.75 31.5C7.05075 31.5 0 24.4478 0 15.75C0 7.047 7.05075 0 15.75 0C24.4492 0 31.5 7.047 31.5 15.75Z"
            fill="currentColor"
            id="spot"
        />
        <path
            clip-rule="evenodd"
            d="M3 0.75C3 0.335786 3.33579 0 3.75 0H21C21.1989 0 21.3897 0.0790176 21.5303 0.21967L24 2.68934L26.4697 0.21967C26.6103 0.0790176 26.8011 0 27 0H44.25C44.6642 0 45 0.335786 45 0.75V35.25C45 35.6642 44.6642 36 44.25 36H28.5V34.5H43.5V1.5H27.3107L24.5303 4.28033C24.2374 4.57322 23.7626 4.57322 23.4697 4.28033L20.6893 1.5H4.5V34.5H19.5V36H3.75C3.33579 36 3 35.6642 3 35.25V0.75Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M0 3.75C0 3.33579 0.335786 3 0.75 3H3.75V4.5H1.5V37.5H21V36C21 34.3438 22.3438 33 24 33C25.6562 33 27 34.3438 27 36V37.5H46.5V4.5H44.25V3H47.25C47.6642 3 48 3.33579 48 3.75V38.25C48 38.6642 47.6642 39 47.25 39H26.25C25.8358 39 25.5 38.6642 25.5 38.25V36C25.5 35.1722 24.8278 34.5 24 34.5C23.1722 34.5 22.5 35.1722 22.5 36V38.25C22.5 38.6642 22.1642 39 21.75 39H0.75C0.335786 39 0 38.6642 0 38.25V3.75Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M9 13.5C8.17157 13.5 7.5 14.1716 7.5 15C7.5 15.8284 8.17157 16.5 9 16.5C9.82843 16.5 10.5 15.8284 10.5 15C10.5 14.1716 9.82843 13.5 9 13.5ZM6 15C6 13.3431 7.34315 12 9 12C10.6569 12 12 13.3431 12 15C12 16.6569 10.6569 18 9 18C7.34315 18 6 16.6569 6 15Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M18 13.5C17.1716 13.5 16.5 14.1716 16.5 15C16.5 15.8284 17.1716 16.5 18 16.5C18.8284 16.5 19.5 15.8284 19.5 15C19.5 14.1716 18.8284 13.5 18 13.5ZM15 15C15 13.3431 16.3431 12 18 12C19.6569 12 21 13.3431 21 15C21 16.6569 19.6569 18 18 18C16.3431 18 15 16.6569 15 15Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M13.5 6C12.6716 6 12 6.67157 12 7.5C12 8.32843 12.6716 9 13.5 9C14.3284 9 15 8.32843 15 7.5C15 6.67157 14.3284 6 13.5 6ZM10.5 7.5C10.5 5.84315 11.8431 4.5 13.5 4.5C15.1569 4.5 16.5 5.84315 16.5 7.5C16.5 9.15685 15.1569 10.5 13.5 10.5C11.8431 10.5 10.5 9.15685 10.5 7.5Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path clip-rule="evenodd" d="M42 6H27V4.5H42V6Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M42 9H27V7.5H42V9Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M42 28.5H27V27H42V28.5Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M42 25.5H27V24H42V25.5Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M42 31.5H27V30H42V31.5Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M21 22.5H6V21H21V22.5Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M21 25.5H6V24H21V25.5Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M21 28.5H6V27H21V28.5Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M21 31.5H6V30H21V31.5Z" fill="currentColor" fill-rule="evenodd" />
        <path
            clip-rule="evenodd"
            d="M9.10742 12.3643L11.3574 8.61426L12.6437 9.386L10.3937 13.136L9.10742 12.3643Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M16.6074 13.136L14.3574 9.386L15.6437 8.61426L17.8937 12.3643L16.6074 13.136Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path clip-rule="evenodd" d="M11.25 14.25H15.75V15.75H11.25V14.25Z" fill="currentColor" fill-rule="evenodd" />
        <path
            clip-rule="evenodd"
            d="M28.5 21V10.5H27V21.75C27 22.1642 27.3358 22.5 27.75 22.5H42V21H28.5Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path clip-rule="evenodd" d="M31.5 19.5V21.75H30V19.5H31.5Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M34.5 19.5V21.75H33V19.5H34.5Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M37.5 19.5V21.75H36V19.5H37.5Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M40.5 19.5V21.75H39V19.5H40.5Z" fill="currentColor" fill-rule="evenodd" />
        <path
            clip-rule="evenodd"
            d="M39.2197 11.4697C39.3603 11.329 39.5511 11.25 39.75 11.25H42V12.75H40.0607L36.5303 16.2803C36.2374 16.5732 35.7626 16.5732 35.4697 16.2803L33 13.8107L30.5303 16.2803C30.3897 16.421 30.1989 16.5 30 16.5H27.75V15H29.6893L32.4697 12.2197C32.7626 11.9268 33.2374 11.9268 33.5303 12.2197L36 14.6893L39.2197 11.4697Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path clip-rule="evenodd" d="M23.25 31.5V6H24.75V31.5H23.25Z" fill="currentColor" fill-rule="evenodd" />
    </svg>
);

export default ScientificLiteratureSpotIcon;
