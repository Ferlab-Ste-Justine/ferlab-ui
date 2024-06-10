import React from 'react';
import cx from 'classnames';

import { IIconProps } from '../type';

import style from './icon.module.scss';

const ProteomeSpotIcon = ({ className = '', height = 48, spotClassName = '', width = 48 }: IIconProps): JSX.Element => (
    <svg
        className={cx(style.iconColor, className)}
        fill="none"
        height={height}
        viewBox="0 0 48 48"
        width={width}
        xmlns="http://www.w3.org/2000/svg"
    >
        <g id="proteome">
            <path
                className={cx(style.spotColor, spotClassName)}
                d="M31.4999 32.25C31.4999 40.9477 24.4492 47.9999 15.75 47.9999C7.05073 47.9999 0 40.9477 0 32.25C0 23.547 7.05073 16.5 15.75 16.5C24.4492 16.5 31.4999 23.547 31.4999 32.25Z"
                fill="currentColor"
                id="spot"
            />
            <g id="Group">
                <path
                    clipRule="evenodd"
                    d="M27.3642 11.3442L34.1142 15.0942L33.3857 16.4055L26.6357 12.6555L27.3642 11.3442Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector"
                />
                <path
                    clipRule="evenodd"
                    d="M28.0859 8.3291L35.5858 12.0791L34.915 13.4207L27.415 9.67074L28.0859 8.3291Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_2"
                />
                <path
                    clipRule="evenodd"
                    d="M21.3642 12.6555L14.6142 16.4055L13.8857 15.0942L20.6357 11.3442L21.3642 12.6555Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_3"
                />
                <path
                    clipRule="evenodd"
                    d="M20.5858 9.67074L13.0859 13.4207L12.415 12.0791L19.915 8.3291L20.5858 9.67074Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_4"
                />
                <path
                    clipRule="evenodd"
                    d="M26.6357 35.3442L33.3857 31.5942L34.1142 32.9055L27.3642 36.6555L26.6357 35.3442Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_5"
                />
                <path
                    clipRule="evenodd"
                    d="M27.415 38.3291L34.915 34.5791L35.5858 35.9207L28.0859 39.6707L27.415 38.3291Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_6"
                />
                <path
                    clipRule="evenodd"
                    d="M20.6357 36.6555L13.8857 32.9055L14.6142 31.5942L21.3642 35.3442L20.6357 36.6555Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_7"
                />
                <path
                    clipRule="evenodd"
                    d="M19.915 39.6707L12.415 35.9207L13.0859 34.5791L20.5858 38.3291L19.915 39.6707Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_8"
                />
                <path
                    clipRule="evenodd"
                    d="M24 42C24.4142 42 24.75 42.3358 24.75 42.75V47.25C24.75 47.6642 24.4142 48 24 48C23.5858 48 23.25 47.6642 23.25 47.25V42.75C23.25 42.3358 23.5858 42 24 42Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_9"
                />
                <path
                    clipRule="evenodd"
                    d="M24 0C24.4142 0 24.75 0.335785 24.75 0.749998V4.49999C24.75 4.9142 24.4142 5.24998 24 5.24998C23.5858 5.24998 23.25 4.9142 23.25 4.49999V0.749998C23.25 0.335785 23.5858 0 24 0Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_10"
                />
                <path
                    clipRule="evenodd"
                    d="M46.4182 11.6592C46.6065 12.0282 46.46 12.4799 46.0911 12.6682L41.5911 14.9647C41.2221 15.153 40.7704 15.0065 40.5821 14.6376C40.3938 14.2686 40.5403 13.8169 40.9092 13.6286L45.4092 11.3321C45.7782 11.1438 46.2299 11.2903 46.4182 11.6592Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_11"
                />
                <path
                    clipRule="evenodd"
                    d="M7.41818 33.3624C7.60646 33.7313 7.46001 34.183 7.09106 34.3713L2.59108 36.6678C2.22213 36.8561 1.77041 36.7096 1.58212 36.3407C1.39384 35.9718 1.54029 35.52 1.90924 35.3317L6.40922 33.0352C6.77817 32.847 7.22989 32.9934 7.41818 33.3624Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_12"
                />
                <path
                    clipRule="evenodd"
                    d="M40.5821 33.3624C40.7704 32.9934 41.2221 32.847 41.5911 33.0352L46.0911 35.3317C46.46 35.52 46.6065 35.9718 46.4182 36.3407C46.2299 36.7096 45.7782 36.8561 45.4092 36.6678L40.9092 34.3713C40.5403 34.183 40.3938 33.7313 40.5821 33.3624Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_13"
                />
                <path
                    clipRule="evenodd"
                    d="M1.58212 11.6592C1.77041 11.2903 2.22213 11.1438 2.59108 11.3321L7.09106 13.6286C7.46001 13.8169 7.60646 14.2686 7.41818 14.6376C7.22989 15.0065 6.77817 15.153 6.40922 14.9647L1.90924 12.6682C1.54029 12.4799 1.39384 12.0282 1.58212 11.6592Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_14"
                />
                <path
                    clipRule="evenodd"
                    d="M24.75 24.75H23.25V23.25H24.75V24.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_15"
                />
                <path
                    clipRule="evenodd"
                    d="M21.75 24.75H20.25V23.25H21.75V24.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_16"
                />
                <path
                    clipRule="evenodd"
                    d="M27.75 24.75H26.25V23.25H27.75V24.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_17"
                />
                <path
                    clipRule="evenodd"
                    d="M24 6C22.3431 6 21 7.34314 21 8.99999C21 10.6568 22.3431 12 24 12C25.6568 12 27 10.6568 27 8.99999C27 7.34314 25.6568 6 24 6ZM19.5 8.99999C19.5 6.51471 21.5147 4.5 24 4.5C26.4853 4.5 28.5 6.51471 28.5 8.99999C28.5 11.4853 26.4853 13.5 24 13.5C21.5147 13.5 19.5 11.4853 19.5 8.99999Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_18"
                />
                <path
                    clipRule="evenodd"
                    d="M37.5 12.75C35.8431 12.75 34.5 14.0931 34.5 15.75C34.5 17.4068 35.8431 18.75 37.5 18.75C39.1568 18.75 40.5 17.4068 40.5 15.75C40.5 14.0931 39.1568 12.75 37.5 12.75ZM33 15.75C33 13.2647 35.0147 11.25 37.5 11.25C39.9853 11.25 42 13.2647 42 15.75C42 18.2353 39.9853 20.25 37.5 20.25C35.0147 20.25 33 18.2353 33 15.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_19"
                />
                <path
                    clipRule="evenodd"
                    d="M37.5 29.25C35.8431 29.25 34.5 30.5931 34.5 32.25C34.5 33.9068 35.8431 35.25 37.5 35.25C39.1568 35.25 40.5 33.9068 40.5 32.25C40.5 30.5931 39.1568 29.25 37.5 29.25ZM33 32.25C33 29.7647 35.0147 27.75 37.5 27.75C39.9853 27.75 42 29.7647 42 32.25C42 34.7353 39.9853 36.75 37.5 36.75C35.0147 36.75 33 34.7353 33 32.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_20"
                />
                <path
                    clipRule="evenodd"
                    d="M10.5 12.75C8.84314 12.75 7.5 14.0931 7.5 15.75C7.5 17.4068 8.84314 18.75 10.5 18.75C12.1568 18.75 13.5 17.4068 13.5 15.75C13.5 14.0931 12.1568 12.75 10.5 12.75ZM6 15.75C6 13.2647 8.01471 11.25 10.5 11.25C12.9853 11.25 15 13.2647 15 15.75C15 18.2353 12.9853 20.25 10.5 20.25C8.01471 20.25 6 18.2353 6 15.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_21"
                />
                <path
                    clipRule="evenodd"
                    d="M10.5 29.25C8.84314 29.25 7.5 30.5931 7.5 32.25C7.5 33.9068 8.84314 35.25 10.5 35.25C12.1568 35.25 13.5 33.9068 13.5 32.25C13.5 30.5931 12.1568 29.25 10.5 29.25ZM6 32.25C6 29.7647 8.01471 27.75 10.5 27.75C12.9853 27.75 15 29.7647 15 32.25C15 34.7353 12.9853 36.75 10.5 36.75C8.01471 36.75 6 34.7353 6 32.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_22"
                />
                <path
                    clipRule="evenodd"
                    d="M24 36C22.3431 36 21 37.3431 21 39C21 40.6568 22.3431 42 24 42C25.6568 42 27 40.6568 27 39C27 37.3431 25.6568 36 24 36ZM19.5 39C19.5 36.5147 21.5147 34.5 24 34.5C26.4853 34.5 28.5 36.5147 28.5 39C28.5 41.4853 26.4853 43.5 24 43.5C21.5147 43.5 19.5 41.4853 19.5 39Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_23"
                />
                <path
                    clipRule="evenodd"
                    d="M35.25 28.5V19.5H36.75V28.5H35.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_24"
                />
                <path
                    clipRule="evenodd"
                    d="M38.25 28.5V19.5H39.75V28.5H38.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_25"
                />
                <path
                    clipRule="evenodd"
                    d="M8.25 28.5V19.5H9.75V28.5H8.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_26"
                />
                <path
                    clipRule="evenodd"
                    d="M11.25 28.5V19.5H12.75V28.5H11.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_27"
                />
            </g>
        </g>
    </svg>
);

export default ProteomeSpotIcon;
