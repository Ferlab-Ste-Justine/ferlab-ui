import React from 'react';
import cx from 'classnames';

import { IIconProps } from '../type';

import style from './icon.module.css';

const UserFriendlyCultureSpotIcon = ({
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
            d="M30 15C30 23.2845 23.2845 30 15 30C6.7155 30 0 23.2845 0 15C0 6.71175 6.7155 0 15 0C23.2845 0 30 6.71175 30 15Z"
            fill="currentColor"
            id="spot"
        />
        <path
            clip-rule="evenodd"
            d="M8.25 3.75C7.00736 3.75 6 4.75736 6 6C6 7.24264 7.00736 8.25 8.25 8.25C9.49264 8.25 10.5 7.24264 10.5 6C10.5 4.75736 9.49264 3.75 8.25 3.75ZM4.5 6C4.5 3.92893 6.17893 2.25 8.25 2.25C10.3211 2.25 12 3.92893 12 6C12 8.07107 10.3211 9.75 8.25 9.75C6.17893 9.75 4.5 8.07107 4.5 6Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path clip-rule="evenodd" d="M3 48V32.25H4.5V48H3Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M6 27.75H12.75V29.25H6V27.75Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M7.5 48V30.75H9V48H7.5Z" fill="currentColor" fill-rule="evenodd" />
        <path
            clip-rule="evenodd"
            d="M39.75 3.75C38.5074 3.75 37.5 4.75736 37.5 6C37.5 7.24264 38.5074 8.25 39.75 8.25C40.9926 8.25 42 7.24264 42 6C42 4.75736 40.9926 3.75 39.75 3.75ZM36 6C36 3.92893 37.6789 2.25 39.75 2.25C41.8211 2.25 43.5 3.92893 43.5 6C43.5 8.07107 41.8211 9.75 39.75 9.75C37.6789 9.75 36 8.07107 36 6Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path clip-rule="evenodd" d="M43.5 48V32.25H45V48H43.5Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M42 29.25H35.25V27.75H42V29.25Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M39 48V30.75H40.5V48H39Z" fill="currentColor" fill-rule="evenodd" />
        <path
            clip-rule="evenodd"
            d="M24 4.5C24.2152 4.5 24.42 4.59243 24.5624 4.75378L35.8124 17.5038C35.9333 17.6408 36 17.8173 36 18V48H34.5V18.2836L24 6.38358L13.5 18.2836V48H12V18C12 17.8173 12.0667 17.6408 12.1876 17.5038L23.4376 4.75378C23.58 4.59243 23.7848 4.5 24 4.5Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M23.4697 0.21967C23.7626 -0.0732233 24.2374 -0.0732233 24.5303 0.21967L35.5607 11.25H45C46.6562 11.25 48 12.5938 48 14.25V30C48 30.4142 47.6642 30.75 47.25 30.75H44.25C43.8358 30.75 43.5 30.4142 43.5 30V16.5H45V29.25H46.5V14.25C46.5 13.4222 45.8278 12.75 45 12.75H35.25C35.0511 12.75 34.8603 12.671 34.7197 12.5303L24 1.81066L13.2803 12.5303C13.1397 12.671 12.9489 12.75 12.75 12.75H3C2.17221 12.75 1.5 13.4222 1.5 14.25V29.25H3V16.5H4.5V30C4.5 30.4142 4.16421 30.75 3.75 30.75H0.75C0.335786 30.75 0 30.4142 0 30V14.25C0 12.5938 1.34379 11.25 3 11.25H12.4393L23.4697 0.21967Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path clip-rule="evenodd" d="M23.25 5.25V0.75H24.75V5.25H23.25Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M16.5 31.5H19.5V34.5H16.5V31.5Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M22.5 31.5H25.5V34.5H22.5V31.5Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M28.5 31.5H31.5V34.5H28.5V31.5Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M16.5 36H19.5V39H16.5V36Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M22.5 36H25.5V39H22.5V36Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M28.5 36H31.5V39H28.5V36Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M16.5 27H19.5V30H16.5V27Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M22.5 27H25.5V30H22.5V27Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M28.5 27H31.5V30H28.5V27Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M16.5 22.5H19.5V25.5H16.5V22.5Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M22.5 22.5H25.5V25.5H22.5V22.5Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M28.5 22.5H31.5V25.5H28.5V22.5Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M16.5 18H19.5V21H16.5V18Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M22.5 18H25.5V21H22.5V18Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M22.5 12H25.5V15H22.5V12Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M28.5 18H31.5V21H28.5V18Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M23.25 48V42.75H24.75V48H23.25Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M16.5 42H31.5V48H30V43.5H18V48H16.5V42Z" fill="currentColor" fill-rule="evenodd" />
    </svg>
);

export default UserFriendlyCultureSpotIcon;
