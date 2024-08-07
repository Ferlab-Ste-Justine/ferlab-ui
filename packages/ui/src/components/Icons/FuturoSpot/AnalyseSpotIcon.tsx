import React from 'react';
import cx from 'classnames';

import { IIconProps } from '../type';

import style from './icon.module.css';

const AnalyseSpotIcon = ({ className = '', height = 48, spotClassName = '', width = 48 }: IIconProps): JSX.Element => (
    <svg
        className={cx(style.iconColor, className)}
        fill="none"
        height={height}
        viewBox="0 0 48 48"
        width={width}
        xmlns="http://www.w3.org/2000/svg"
    >
        <g id="analyse">
            <path
                className={cx(style.spotColor, spotClassName)}
                d="M31.5 15.75C31.5 24.4478 24.4492 31.5 15.75 31.5C7.05075 31.5 0 24.4478 0 15.75C0 7.047 7.05075 0 15.75 0C24.4492 0 31.5 7.047 31.5 15.75Z"
                fill="currentColor"
                id="spot"
            />
            <g id="Group">
                <path clipRule="evenodd" d="M48 36H0V34.5H48V36Z" fill="currentColor" fillRule="evenodd" id="Vector" />
                <path
                    clipRule="evenodd"
                    d="M16.9855 7.79284C18.7702 5.06185 20.9817 3 24 3C27.0183 3 29.2298 5.06185 31.0145 7.79284C32.6289 10.2631 34.0124 13.4644 35.3932 16.6594C35.5435 17.0071 35.6937 17.3547 35.8442 17.7013C37.3961 21.2753 38.9808 24.7547 40.9451 27.3435C42.8989 29.9185 45.1407 31.5 48 31.5V33C44.4843 33 41.8511 31.019 39.7502 28.2502C37.6598 25.4953 36.0102 21.8497 34.4683 18.2987C34.3189 17.9546 34.1705 17.6114 34.0228 17.2699C32.6285 14.0454 31.2981 10.9687 29.7589 8.61341C28.0514 6.00065 26.2317 4.5 24 4.5C21.7683 4.5 19.9486 6.00065 18.2411 8.61341C16.7019 10.9687 15.3715 14.0454 13.9772 17.2699C13.8295 17.6114 13.6811 17.9546 13.5317 18.2987C11.9898 21.8497 10.3402 25.4953 8.24982 28.2502C6.14891 31.019 3.51571 33 0 33V31.5C2.85929 31.5 5.10109 29.9185 7.05487 27.3435C9.01919 24.7547 10.6039 21.2753 12.1558 17.7013C12.3063 17.3547 12.4565 17.0071 12.6068 16.6594C13.9876 13.4644 15.3711 10.2631 16.9855 7.79284Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_2"
                />
                <path
                    clipRule="evenodd"
                    d="M13.5 35.25V15H15V35.25H13.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_3"
                />
                <path
                    clipRule="evenodd"
                    d="M23.25 35.25V3.75H24.75V35.25H23.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_4"
                />
                <path
                    clipRule="evenodd"
                    d="M10.5 35.25V21.75H12V35.25H10.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_5"
                />
                <path
                    clipRule="evenodd"
                    d="M7.5 35.25V27H9V35.25H7.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_6"
                />
                <path
                    clipRule="evenodd"
                    d="M4.5 35.25V30.75H6V35.25H4.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_7"
                />
                <path
                    clipRule="evenodd"
                    d="M1.5 35.25V32.25H3V35.25H1.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_8"
                />
                <path
                    clipRule="evenodd"
                    d="M33 35.25V15H34.5V35.25H33Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_9"
                />
                <path
                    clipRule="evenodd"
                    d="M36 35.25V21.75H37.5V35.25H36Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_10"
                />
                <path
                    clipRule="evenodd"
                    d="M39 35.25V27H40.5V35.25H39Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_11"
                />
                <path
                    clipRule="evenodd"
                    d="M42 35.25V30.75H43.5V35.25H42Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_12"
                />
                <path
                    clipRule="evenodd"
                    d="M45 35.25V32.25H46.5V35.25H45Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_13"
                />
                <path
                    clipRule="evenodd"
                    d="M6 14.25H14.25V15.75H6V14.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_14"
                />
                <path
                    clipRule="evenodd"
                    d="M3 14.25H4.5V15.75H3V14.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_15"
                />
                <path
                    clipRule="evenodd"
                    d="M0 14.25H1.5V15.75H0V14.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_16"
                />
                <path
                    clipRule="evenodd"
                    d="M42 4.5H24V3H42V4.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_17"
                />
                <path
                    clipRule="evenodd"
                    d="M45 4.5H43.5V3H45V4.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_18"
                />
                <path
                    clipRule="evenodd"
                    d="M48 4.5H46.5V3H48V4.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_19"
                />
                <path
                    clipRule="evenodd"
                    d="M2.25 39H0.75V37.5H2.25V39Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_20"
                />
                <path
                    clipRule="evenodd"
                    d="M5.25 39H3.75V37.5H5.25V39Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_21"
                />
                <path
                    clipRule="evenodd"
                    d="M8.25 39H6.75V37.5H8.25V39Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_22"
                />
                <path
                    clipRule="evenodd"
                    d="M11.25 39H9.75V37.5H11.25V39Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_23"
                />
                <path
                    clipRule="evenodd"
                    d="M14.25 39H12.75V37.5H14.25V39Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_24"
                />
                <path
                    clipRule="evenodd"
                    d="M17.25 39H15.75V37.5H17.25V39Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_25"
                />
                <path
                    clipRule="evenodd"
                    d="M20.25 39H18.75V37.5H20.25V39Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_26"
                />
                <path
                    clipRule="evenodd"
                    d="M23.25 39H21.75V37.5H23.25V39Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_27"
                />
                <path
                    clipRule="evenodd"
                    d="M26.25 39H24.75V37.5H26.25V39Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_28"
                />
                <path
                    clipRule="evenodd"
                    d="M29.25 39H27.75V37.5H29.25V39Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_29"
                />
                <path
                    clipRule="evenodd"
                    d="M32.25 39H30.75V37.5H32.25V39Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_30"
                />
                <path
                    clipRule="evenodd"
                    d="M35.25 39H33.75V37.5H35.25V39Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_31"
                />
                <path
                    clipRule="evenodd"
                    d="M8.25 42H6.75V40.5H8.25V42Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_32"
                />
                <path
                    clipRule="evenodd"
                    d="M11.25 42H9.75V40.5H11.25V42Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_33"
                />
                <path
                    clipRule="evenodd"
                    d="M14.25 42H12.75V40.5H14.25V42Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_34"
                />
                <path
                    clipRule="evenodd"
                    d="M17.25 42H15.75V40.5H17.25V42Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_35"
                />
                <path
                    clipRule="evenodd"
                    d="M20.25 42H18.75V40.5H20.25V42Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_36"
                />
                <path
                    clipRule="evenodd"
                    d="M23.25 42H21.75V40.5H23.25V42Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_37"
                />
                <path
                    clipRule="evenodd"
                    d="M26.25 42H24.75V40.5H26.25V42Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_38"
                />
                <path
                    clipRule="evenodd"
                    d="M29.25 42H27.75V40.5H29.25V42Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_39"
                />
                <path
                    clipRule="evenodd"
                    d="M32.25 42H30.75V40.5H32.25V42Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_40"
                />
                <path
                    clipRule="evenodd"
                    d="M35.25 42H33.75V40.5H35.25V42Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_41"
                />
                <path
                    clipRule="evenodd"
                    d="M14.25 45H12.75V43.5H14.25V45Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_42"
                />
                <path
                    clipRule="evenodd"
                    d="M17.25 45H15.75V43.5H17.25V45Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_43"
                />
                <path
                    clipRule="evenodd"
                    d="M20.25 45H18.75V43.5H20.25V45Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_44"
                />
                <path
                    clipRule="evenodd"
                    d="M23.25 45H21.75V43.5H23.25V45Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_45"
                />
                <path
                    clipRule="evenodd"
                    d="M26.25 45H24.75V43.5H26.25V45Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_46"
                />
                <path
                    clipRule="evenodd"
                    d="M29.25 45H27.75V43.5H29.25V45Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_47"
                />
                <path
                    clipRule="evenodd"
                    d="M32.25 45H30.75V43.5H32.25V45Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_48"
                />
                <path
                    clipRule="evenodd"
                    d="M35.25 45H33.75V43.5H35.25V45Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_49"
                />
                <path
                    clipRule="evenodd"
                    d="M20.25 48H18.75V46.5H20.25V48Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_50"
                />
                <path
                    clipRule="evenodd"
                    d="M23.25 48H21.75V46.5H23.25V48Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_51"
                />
                <path
                    clipRule="evenodd"
                    d="M26.25 48H24.75V46.5H26.25V48Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_52"
                />
                <path
                    clipRule="evenodd"
                    d="M29.25 48H27.75V46.5H29.25V48Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_53"
                />
                <path
                    clipRule="evenodd"
                    d="M38.25 39H36.75V37.5H38.25V39Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_54"
                />
                <path
                    clipRule="evenodd"
                    d="M41.25 39H39.75V37.5H41.25V39Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_55"
                />
                <path
                    clipRule="evenodd"
                    d="M44.25 39H42.75V37.5H44.25V39Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_56"
                />
                <path
                    clipRule="evenodd"
                    d="M47.25 39H45.75V37.5H47.25V39Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_57"
                />
                <path
                    clipRule="evenodd"
                    d="M38.25 42H36.75V40.5H38.25V42Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_58"
                />
                <path
                    clipRule="evenodd"
                    d="M41.25 42H39.75V40.5H41.25V42Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_59"
                />
            </g>
        </g>
    </svg>
);

export default AnalyseSpotIcon;
