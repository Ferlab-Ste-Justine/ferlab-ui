import React from 'react';
import cx from 'classnames';

import { IIconProps } from '../type';

import style from './icon.module.scss';

const InformationSpotIcon = ({
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
        <g id="information">
            <path
                className={cx(style.spotColor, spotClassName)}
                d="M33 48C41.2843 48 48 41.2843 48 33C48 24.7157 41.2843 18 33 18C24.7157 18 18 24.7157 18 33C18 41.2843 24.7157 48 33 48Z"
                fill="currentColor"
                id="spot"
            />
            <g id="Group">
                <path
                    clip-rule="evenodd"
                    d="M26.25 44.25V29.25H27.75V44.25C27.75 46.321 26.071 48 24 48C21.929 48 20.25 46.321 20.25 44.25V31.5H21.75V44.25C21.75 45.4925 22.7575 46.5 24 46.5C25.2425 46.5 26.25 45.4925 26.25 44.25Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    id="Vector"
                />
                <path
                    clip-rule="evenodd"
                    d="M18.75 27C18.3362 27 18 27.3362 18 27.75C18 28.1638 18.3362 28.5 18.75 28.5H29.25C29.6638 28.5 30 28.1638 30 27.75C30 27.3362 29.6638 27 29.25 27H18.75ZM16.5 27.75C16.5 26.5078 17.5078 25.5 18.75 25.5H29.25C30.4922 25.5 31.5 26.5078 31.5 27.75C31.5 28.9922 30.4922 30 29.25 30H18.75C17.5078 30 16.5 28.9922 16.5 27.75Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    id="Vector_2"
                />
                <path
                    clip-rule="evenodd"
                    d="M23.25 37.5V36H24.75V37.5H23.25Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    id="Vector_3"
                />
                <path
                    clip-rule="evenodd"
                    d="M23.25 40.5V39H24.75V40.5H23.25Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    id="Vector_4"
                />
                <path
                    clip-rule="evenodd"
                    d="M23.25 43.5V42H24.75V43.5H23.25Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    id="Vector_5"
                />
                <path
                    clip-rule="evenodd"
                    d="M24 1.5C17.3726 1.5 12 6.87258 12 13.5C12 20.1274 17.3726 25.5 24 25.5C30.6274 25.5 36 20.1274 36 13.5C36 6.87258 30.6274 1.5 24 1.5ZM10.5 13.5C10.5 6.04416 16.5442 0 24 0C31.4558 0 37.5 6.04416 37.5 13.5C37.5 20.9558 31.4558 27 24 27C16.5442 27 10.5 20.9558 10.5 13.5Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    id="Vector_6"
                />
                <path
                    clip-rule="evenodd"
                    d="M24 5.25C19.4437 5.25 15.75 8.94365 15.75 13.5C15.75 18.0563 19.4437 21.75 24 21.75C28.5563 21.75 32.25 18.0563 32.25 13.5C32.25 8.94365 28.5563 5.25 24 5.25ZM14.25 13.5C14.25 8.11522 18.6152 3.75 24 3.75C29.3848 3.75 33.75 8.11522 33.75 13.5C33.75 18.8848 29.3848 23.25 24 23.25C18.6152 23.25 14.25 18.8848 14.25 13.5Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    id="Vector_7"
                />
                <path
                    clip-rule="evenodd"
                    d="M23.25 18V11.25H24.75V18H23.25Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    id="Vector_8"
                />
                <path
                    clip-rule="evenodd"
                    d="M26.25 18.75H21.75V17.25H26.25V18.75Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    id="Vector_9"
                />
                <path
                    clip-rule="evenodd"
                    d="M26.25 12H21.75V10.5H26.25V12Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    id="Vector_10"
                />
                <path
                    clip-rule="evenodd"
                    d="M24.75 9H23.25V7.5H24.75V9Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    id="Vector_11"
                />
                <path
                    clip-rule="evenodd"
                    d="M40.213 30.0571C40.4932 29.941 40.8158 30.0052 41.0303 30.2197L45.5303 34.7197C45.8232 35.0126 45.8232 35.4875 45.5303 35.7804L41.0303 40.2804C40.8158 40.4949 40.4932 40.559 40.213 40.4429C39.9327 40.3268 39.75 40.0534 39.75 39.75V39H29.25V37.5H40.5C40.8216 37.5 41.0959 37.7024 41.2025 37.9868L43.9393 35.25L41.2025 32.5132C41.0959 32.7976 40.8216 33 40.5 33H29.25V31.5H39.75V30.75C39.75 30.4467 39.9327 30.1732 40.213 30.0571Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    id="Vector_12"
                />
                <path
                    clip-rule="evenodd"
                    d="M7.78701 33.0571C8.06727 33.1732 8.25 33.4467 8.25 33.75V34.5H18.75V36H7.5C7.17839 36 6.90407 35.7976 6.79748 35.5132L4.06066 38.25L6.79748 40.9868C6.90407 40.7024 7.17839 40.5 7.5 40.5H18.75V42H8.25V42.75C8.25 43.0534 8.06727 43.3268 7.78701 43.4429C7.50676 43.559 7.18417 43.4949 6.96967 43.2804L2.46967 38.7804C2.17678 38.4875 2.17678 38.0126 2.46967 37.7197L6.96967 33.2197C7.18417 33.0052 7.50676 32.941 7.78701 33.0571Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    id="Vector_13"
                />
            </g>
        </g>
    </svg>
);

export default InformationSpotIcon;
