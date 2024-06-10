import React from 'react';
import cx from 'classnames';

import { IIconProps } from '../type';

import style from './icon.module.css';

const BiospecimenSpotIcon = ({
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
        <g id="biospecimen">
            <path
                className={cx(style.spotColor, spotClassName)}
                d="M48 32.25C48 40.9478 40.9492 48 32.25 48C23.5508 48 16.5 40.9478 16.5 32.25C16.5 23.547 23.5508 16.5 32.25 16.5C40.9492 16.5 48 23.547 48 32.25Z"
                fill="currentColor"
                id="spot"
            />
            <g id="Group">
                <path
                    clipRule="evenodd"
                    d="M3.75002 38.5607L23.7804 18.5304L22.7197 17.4697L2.46969 37.7197C2.32904 37.8604 2.25002 38.0511 2.25002 38.2501V39.6283L1.53851 41.7629C1.44867 42.0324 1.51882 42.3295 1.71969 42.5304L2.46969 43.2804C2.67056 43.4813 2.96769 43.5514 3.23719 43.4616L5.37173 42.7501H6.75002C6.94893 42.7501 7.1397 42.671 7.28035 42.5304L29.0304 20.7804L27.9697 19.7197L6.43936 41.2501H5.25002C5.16941 41.2501 5.08932 41.2631 5.01285 41.2885L3.20259 41.892L3.10811 41.7975L3.71153 39.9872C3.73702 39.9108 3.75002 39.8307 3.75002 39.7501V38.5607Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector"
                />
                <path
                    clipRule="evenodd"
                    d="M23.4697 12.2197C23.6103 12.079 23.8011 12 24 12H25.5C25.6989 12 25.8897 12.079 26.0303 12.2197L28.2803 14.4697L27.2197 15.5303L25.1893 13.5H24.3107L24 13.8107V14.6893L30.3107 21H31.1893L31.5 20.6893V19.8107L28.7182 17.0288L29.7788 15.9682L32.7803 18.9697C32.921 19.1103 33 19.3011 33 19.5V21C33 21.1989 32.921 21.3897 32.7803 21.5303L32.0303 22.2803C31.8897 22.421 31.6989 22.5 31.5 22.5H30C29.8011 22.5 29.6103 22.421 29.4697 22.2803L22.7197 15.5303C22.579 15.3897 22.5 15.1989 22.5 15V13.5C22.5 13.3011 22.579 13.1103 22.7197 12.9697L23.4697 12.2197Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_2"
                />
                <path
                    clipRule="evenodd"
                    d="M38.741 2.06975L26.7804 14.0303L25.7197 12.9697L37.7197 0.96967C37.7446 0.944812 37.7712 0.921733 37.7993 0.900604C38.5512 0.335073 39.4877 0 40.5001 0C42.9858 0 45.0001 2.01429 45.0001 4.5C45.0001 5.51428 44.6648 6.44827 44.0997 7.20046C44.0785 7.22868 44.0553 7.25537 44.0304 7.28033L32.0304 19.2803L30.9697 18.2197L42.9302 6.25923C43.2891 5.76469 43.5001 5.15969 43.5001 4.5C43.5001 2.84271 42.1573 1.5 40.5001 1.5C39.8414 1.5 39.2345 1.71125 38.741 2.06975Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_3"
                />
                <path
                    clipRule="evenodd"
                    d="M17.25 32.25H9.75V30.75H17.25V32.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_4"
                />
                <path
                    clipRule="evenodd"
                    d="M48 48H0V46.5H48V48Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_5"
                />
                <path
                    clipRule="evenodd"
                    d="M28.5 32.25C28.9142 32.25 29.25 32.5858 29.25 33C29.25 33.3986 29.3839 33.8407 29.6396 34.3521C29.8961 34.8651 30.2433 35.3878 30.624 35.959L30.6376 35.9793C31.0031 36.5276 31.3998 37.1226 31.7021 37.7271C32.0089 38.3407 32.25 39.0236 32.25 39.75C32.25 41.821 30.571 43.5 28.5 43.5C26.429 43.5 24.75 41.821 24.75 39.75C24.75 39.0236 24.9911 38.3407 25.2979 37.7271C25.6002 37.1226 25.9969 36.5276 26.3624 35.9793L26.376 35.959C26.7567 35.3878 27.1039 34.8651 27.3604 34.3521C27.6161 33.8407 27.75 33.3986 27.75 33C27.75 32.5858 28.0858 32.25 28.5 32.25ZM28.5 35.4027C28.2343 35.8756 27.9263 36.3377 27.6376 36.7707L27.624 36.791C27.2433 37.3622 26.8961 37.8849 26.6396 38.3979C26.3839 38.9093 26.25 39.3514 26.25 39.75C26.25 40.9925 27.2575 42 28.5 42C29.7425 42 30.75 40.9925 30.75 39.75C30.75 39.3514 30.6161 38.9093 30.3604 38.3979C30.1039 37.8849 29.7567 37.3622 29.376 36.791L29.3624 36.7707C29.0737 36.3377 28.7657 35.8756 28.5 35.4027Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_6"
                />
            </g>
        </g>
    </svg>
);

export default BiospecimenSpotIcon;
