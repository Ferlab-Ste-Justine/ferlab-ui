import React from 'react';
import cx from 'classnames';

import { IIconProps } from '../type';

import style from './icon.module.css';

const CaduceusMedicineSpotIcon = ({
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
        <path clip-rule="evenodd" d="M24.75 6.75V29.25H23.25V6.75H24.75Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M24.75 32.25V47.25H23.25V32.25H24.75Z" fill="currentColor" fill-rule="evenodd" />
        <path
            clip-rule="evenodd"
            d="M24 1.5C22.7574 1.5 21.75 2.50736 21.75 3.75C21.75 4.99264 22.7574 6 24 6C25.2426 6 26.25 4.99264 26.25 3.75C26.25 2.50736 25.2426 1.5 24 1.5ZM20.25 3.75C20.25 1.67893 21.9289 0 24 0C26.0711 0 27.75 1.67893 27.75 3.75C27.75 5.82107 26.0711 7.5 24 7.5C21.9289 7.5 20.25 5.82107 20.25 3.75Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M24.0483 40.6103C23.9198 40.5472 23.7916 40.4842 23.6646 40.4207L24.3354 39.0791C24.4419 39.1323 24.5558 39.1881 24.6754 39.2466C25.3474 39.5753 26.1976 39.9913 26.8987 40.5379C27.7481 41.2003 28.5 42.1452 28.5 43.4999C28.5 45.9856 26.4857 47.9999 24 47.9999C21.5143 47.9999 19.5 45.9856 19.5 43.4999C19.5 42.4873 19.8352 41.5518 20.4003 40.7995L21.5997 41.7004C21.2228 42.2021 21 42.8235 21 43.4999C21 45.1572 22.3427 46.4999 24 46.4999C25.6573 46.4999 27 45.1572 27 43.4999C27 42.7832 26.6269 42.2281 25.9763 41.7208C25.4098 41.2791 24.7247 40.9425 24.0483 40.6103Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M22.1315 31.4101C20.5851 32.3236 19.5 33.1407 19.5 34.5001C19.5 35.6507 20.212 36.5811 21.2625 37.3689C22.1173 38.01 23.0788 38.4723 23.8398 38.8381C24.0172 38.9234 24.1837 39.0035 24.3354 39.0793L23.6646 40.421C23.5427 40.36 23.399 40.2912 23.2385 40.2143C22.4811 39.8513 21.3494 39.3091 20.3625 38.5689C19.163 37.6692 18 36.3496 18 34.5001C18 32.1771 19.9389 30.9632 21.3685 30.1187L22.1315 31.4101Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M27.6422 30.4721C28.8319 31.3777 30.0004 32.6967 30.0004 34.4999C30.0004 35.4705 29.7881 36.3585 29.3321 37.1231C28.8748 37.8897 28.1976 38.4899 27.3359 38.9207L26.665 37.5791C27.3033 37.26 27.7511 36.8454 28.0438 36.3547C28.3378 35.8618 28.5004 35.2498 28.5004 34.4999C28.5004 33.4036 27.794 32.4727 26.7337 31.6656C25.8381 30.984 24.8175 30.4853 24.0474 30.1089C23.9114 30.0425 23.7833 29.9799 23.665 29.9207L24.3359 28.5791C24.4377 28.63 24.5535 28.6864 24.6808 28.7484C25.4434 29.12 26.6169 29.6917 27.6422 30.4721Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M21.75 19.5C20.6642 19.5 18.75 20.6642 18.75 23.25C18.75 24.5443 19.6316 25.6624 20.8897 26.6133C21.9504 27.4149 23.1383 27.9941 23.9524 28.391C23.9684 28.3988 23.9843 28.4066 24 28.4142C24.0157 28.4066 24.0316 28.3988 24.0476 28.391C24.8617 27.9941 26.0496 27.4149 27.1103 26.6133C28.3684 25.6624 29.25 24.5443 29.25 23.25C29.25 20.6642 27.3358 19.5 26.25 19.5V18C28.1642 18 30.75 19.8358 30.75 23.25C30.75 25.2699 29.3816 26.7769 28.0147 27.8099C26.8254 28.7088 25.4878 29.3591 24.6827 29.7506C24.5519 29.8142 24.4352 29.8709 24.3354 29.9208L24 30.0885L23.6646 29.9208C23.5648 29.8709 23.4481 29.8142 23.3172 29.7506C22.5122 29.3591 21.1746 28.7088 19.9853 27.8099C18.6184 26.7769 17.25 25.2699 17.25 23.25C17.25 19.8358 19.8358 18 21.75 18V19.5Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M1.87183 8.23528C6.49675 8.11097 8.98932 7.21829 10.7556 6.28869C11.2212 6.04362 11.63 5.7994 11.9966 5.58032C12.3691 5.35768 12.6892 5.16651 13.0079 5.00448C13.6219 4.69226 14.2084 4.5 15 4.5C16.1111 4.5 17.25 5.53231 17.25 6.75V9C17.25 10.6562 18.5938 12 20.25 12H21.75V10.5H20.25C19.4222 10.5 18.75 9.82779 18.75 9V6.75C18.75 4.65419 16.8889 3 15 3C13.9166 3 13.0968 3.27649 12.328 3.6674C11.9619 3.85358 11.6028 4.06819 11.2463 4.28124L11.2271 4.29273C10.8583 4.5131 10.4819 4.73763 10.0569 4.96131C8.39846 5.8342 5.89653 6.75 0.750006 6.75C0.508923 6.75 0.282537 6.86589 0.141574 7.06147C0.000610393 7.25704 -0.037744 7.50846 0.038493 7.73717C1.69604 12.7098 8.14672 16.5 18.75 16.5H21.75V15H18.75C9.19705 15 3.73663 11.8679 1.87183 8.23528Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path clip-rule="evenodd" d="M17.25 12.75V15.75H15.75V12.75H17.25Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M14.25 12V15.75H12.75V12H14.25Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M11.25 11.25V15H9.75001V11.25H11.25Z" fill="currentColor" fill-rule="evenodd" />
        <path
            clip-rule="evenodd"
            d="M8.25001 10.5V13.5H6.75001V10.5H8.25001Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path
            clip-rule="evenodd"
            d="M29.25 6.75C29.25 4.65419 31.1111 3 33 3C34.0834 3 34.9032 3.27649 35.672 3.6674C36.0381 3.85358 36.3972 4.06819 36.7537 4.28124L36.7729 4.29273C37.1417 4.5131 37.5181 4.73763 37.9431 4.96131C39.6015 5.8342 42.1035 6.75 47.25 6.75C47.4911 6.75 47.7175 6.86589 47.8584 7.06147C47.9994 7.25704 48.0378 7.50846 47.9615 7.73717C46.304 12.7098 39.8533 16.5 29.25 16.5H26.25V15H29.25C38.803 15 44.2634 11.8679 46.1282 8.23528C41.5033 8.11097 39.0107 7.21829 37.2444 6.28869C36.7788 6.04362 36.37 5.7994 36.0034 5.58032C35.6309 5.35768 35.3108 5.16651 34.9921 5.00448C34.3781 4.69226 33.7916 4.5 33 4.5C31.8889 4.5 30.75 5.53231 30.75 6.75V9C30.75 10.6562 29.4062 12 27.75 12H26.25V10.5H27.75C28.5778 10.5 29.25 9.82779 29.25 9V6.75Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
        <path clip-rule="evenodd" d="M32.25 12.75V15.75H30.75V12.75H32.25Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M35.25 12V15.75H33.75V12H35.25Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M38.25 11.25V15H36.75V11.25H38.25Z" fill="currentColor" fill-rule="evenodd" />
        <path clip-rule="evenodd" d="M41.25 10.5V13.5H39.75V10.5H41.25Z" fill="currentColor" fill-rule="evenodd" />
    </svg>
);

export default CaduceusMedicineSpotIcon;
