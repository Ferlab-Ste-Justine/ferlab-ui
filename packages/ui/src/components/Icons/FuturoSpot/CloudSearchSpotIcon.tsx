import React from 'react';
import cx from 'classnames';

import { IIconProps } from '../type';

import style from './icon.module.scss';

const CloudSearchSpotIcon = ({
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
        <g id="cloud-search">
            <path
                className={cx(style.spotColor, spotClassName)}
                d="M15.75 48C24.4485 48 31.5 40.9485 31.5 32.25C31.5 23.5515 24.4485 16.5 15.75 16.5C7.05152 16.5 0 23.5515 0 32.25C0 40.9485 7.05152 48 15.75 48Z"
                fill="currentColor"
                id="spot"
            />
            <g id="Group">
                <path
                    clip-rule="evenodd"
                    d="M9.02016 12.0269C9.39508 5.32206 14.9515 0 21.75 0C26.3735 0 30.4441 2.28556 32.6826 6H33C35.4257 6 37.3253 6.8144 38.6136 8.21004C39.7395 9.42976 40.3448 11.035 40.4737 12.78C45.0675 13.1657 48 17.2094 48 21.75C48 27.1345 43.6345 31.5 38.25 31.5H32.25V30H38.25C42.806 30 46.5 26.306 46.5 21.75C46.5 17.6043 43.7427 14.25 39.75 14.25H39V13.5C39 11.7708 38.4822 10.2792 37.5114 9.22746C36.5497 8.1856 35.0743 7.5 33 7.5H31.8081L31.594 7.11346C29.6858 3.66924 26.0102 1.5 21.75 1.5C15.5372 1.5 10.5 6.53721 10.5 12.75V13.5H9.75C5.19396 13.5 1.5 17.194 1.5 21.75C1.5 26.306 5.19396 30 9.75 30H15.75V31.5H9.75C4.36554 31.5 0 27.1345 0 21.75C0 16.611 3.97652 12.4002 9.02016 12.0269Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    id="Vector"
                />
                <path
                    clip-rule="evenodd"
                    d="M24 9C18.201 9 13.5 13.701 13.5 19.5C13.5 25.299 18.201 30 24 30C29.799 30 34.5 25.299 34.5 19.5C34.5 13.701 29.799 9 24 9ZM12 19.5C12 12.8726 17.3726 7.5 24 7.5C30.6274 7.5 36 12.8726 36 19.5C36 26.1274 30.6274 31.5 24 31.5C17.3726 31.5 12 26.1274 12 19.5Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    id="Vector_2"
                />
                <path
                    clip-rule="evenodd"
                    d="M24 12.75C20.2721 12.75 17.25 15.7721 17.25 19.5C17.25 23.2279 20.2721 26.25 24 26.25C27.7279 26.25 30.75 23.2279 30.75 19.5C30.75 15.7721 27.7279 12.75 24 12.75ZM15.75 19.5C15.75 14.9437 19.4437 11.25 24 11.25C28.5563 11.25 32.25 14.9437 32.25 19.5C32.25 24.0563 28.5563 27.75 24 27.75C19.4437 27.75 15.75 24.0563 15.75 19.5Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    id="Vector_3"
                />
                <path
                    clip-rule="evenodd"
                    d="M24 16.5C22.3427 16.5 21 17.8427 21 19.5H19.5C19.5 17.0143 21.5143 15 24 15V16.5Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    id="Vector_4"
                />
                <path
                    clip-rule="evenodd"
                    d="M26.25 44.25V30H27.75V44.25C27.75 46.321 26.071 48 24 48C21.929 48 20.25 46.321 20.25 44.25V33H21.75V44.25C21.75 45.4925 22.7575 46.5 24 46.5C25.2425 46.5 26.25 45.4925 26.25 44.25Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    id="Vector_5"
                />
                <path
                    clip-rule="evenodd"
                    d="M23.25 37.5V36H24.75V37.5H23.25Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    id="Vector_6"
                />
                <path
                    clip-rule="evenodd"
                    d="M23.25 40.5V39H24.75V40.5H23.25Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    id="Vector_7"
                />
                <path
                    clip-rule="evenodd"
                    d="M23.25 43.5V42H24.75V43.5H23.25Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    id="Vector_8"
                />
            </g>
        </g>
    </svg>
);

export default CloudSearchSpotIcon;
