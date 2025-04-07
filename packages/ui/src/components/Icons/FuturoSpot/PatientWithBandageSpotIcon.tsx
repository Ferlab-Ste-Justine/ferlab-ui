import React from 'react';
import cx from 'classnames';

import { IIconProps } from '../type';

import style from './icon.module.css';

const PatientWithBandageSpotIcon = ({
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
        <path
            clip-rule="evenodd"
            d="M18 0C15.6134 0 13.6978 0.574324 12.3861 1.88608C11.0743 3.19783 10.5 5.11341 10.5 7.5V8.25C10.5 11.01 11.287 13.5986 12.5998 15.5173C12.875 15.9195 13.1759 16.2954 13.5 16.6383V17.5986L11.6057 18.8615C10.3477 19.5779 9.03972 20.1202 7.74021 20.6587L7.72433 20.6653L7.72429 20.6653C6.44052 21.1973 5.14819 21.7329 4.01629 22.4219C2.86753 23.1211 1.84759 23.9987 1.1222 25.2384C0.396397 26.4789 0 28.0227 0 30V42.75C0 43.992 1.00679 45 2.25 45H6V48H7.5V45H24.75C25.9922 45 27 43.9922 27 42.75V38.25C27 37.0078 25.9922 36 24.75 36H23.5608L33.3782 26.1826C33.9289 27.1378 34.3293 28.3709 34.5 30.0378V48H36V30C36 29.9751 35.9988 29.9502 35.9963 29.9254C35.8 27.963 35.3041 26.4417 34.5523 25.2234C33.7992 24.0028 32.8168 23.1308 31.7152 22.4298C30.626 21.7366 29.3996 21.199 28.1658 20.6636L28.0412 20.6095C26.839 20.088 25.6153 19.5571 24.3943 18.8615L22.5 17.5986V16.6383C22.8241 16.2954 23.125 15.9195 23.4002 15.5173C24.713 13.5986 25.5 11.01 25.5 8.25V7.5C25.5 5.11341 24.9257 3.19783 23.6139 1.88608C22.3022 0.574324 20.3866 0 18 0ZM30.9098 23.6952C31.4934 24.0666 32.0172 24.4786 32.4744 24.9651L13.9395 43.5H7.06077L28.2316 22.3292C29.2171 22.7642 30.1119 23.1875 30.9098 23.6952ZM24.537 20.6439C25.2917 21.0327 26.0374 21.3708 26.7542 21.6852L12.4395 36H6.75006C6.55114 36 6.36038 36.079 6.21973 36.2197L4.71973 37.7197L5.78039 38.7803L7.06072 37.5H10.9395L4.93945 43.5H2.25C1.83571 43.5 1.5 43.164 1.5 42.75V30C1.5 28.2273 1.8536 26.9586 2.41687 25.9959C2.98053 25.0326 3.78872 24.3164 4.79621 23.7031C5.81588 23.0825 7.00192 22.5884 8.31448 22.0444L8.34794 22.0306L8.348 22.0305L8.34809 22.0305C9.3455 21.6172 10.4064 21.1775 11.4619 20.6411C11.7967 21.5175 12.499 22.2498 13.36 22.7878C14.5827 23.552 16.2252 24 18 24C19.7748 24 21.4173 23.552 22.64 22.7878C23.5001 22.2504 24.2018 21.519 24.537 20.6439ZM21.334 18.624L23.2064 19.8723C23.0733 20.4428 22.6321 21.024 21.8451 21.5158C20.8962 22.1088 19.5387 22.5 18 22.5C16.4613 22.5 15.1038 22.1088 14.1549 21.5158C13.3679 21.024 12.9267 20.4428 12.7936 19.8723L14.666 18.624C14.8747 18.4849 15 18.2508 15 18V17.8721C15.9031 18.4283 16.9143 18.75 18 18.75C19.0857 18.75 20.0969 18.4283 21 17.8721V18C21 18.2508 21.1253 18.4849 21.334 18.624ZM16.0608 43.5H19.1895L25.1018 37.5876C24.9969 37.5317 24.8771 37.5 24.75 37.5H22.0608L16.0608 43.5ZM25.5 39.3108L21.3108 43.5H24.75C25.1638 43.5 25.5 43.1638 25.5 42.75V39.3108ZM12 7.5C12 5.33034 12.5226 3.87092 13.4467 2.94674C14.0409 2.35262 14.8562 1.92448 15.9392 1.69445L12.1049 9.36288L12.0496 9.38438C12.0169 9.01215 12 8.63349 12 8.25V7.5ZM17.7119 1.50315L14.1868 8.55327L18.1417 7.01525L20.3106 1.95451C20.3382 1.89007 20.3738 1.83148 20.4157 1.77941C19.7321 1.59633 18.9315 1.5 18 1.5C17.9025 1.5 17.8065 1.50105 17.7119 1.50315ZM21.7464 2.3245C22.0515 2.50491 22.3195 2.71298 22.5533 2.94674C23.0383 3.43181 23.4128 4.06433 23.6591 4.86961L20.1 6.25367L21.6893 2.54539C21.7203 2.47316 21.739 2.39876 21.7464 2.3245ZM12.277 10.9054L23.9471 6.36704C23.9821 6.7211 24 7.09838 24 7.5V8.25C24 10.74 23.287 13.0264 22.1623 14.6702C21.0343 16.3188 19.5517 17.25 18 17.25C16.4483 17.25 14.9657 16.3188 13.8377 14.6702C13.1287 13.634 12.5833 12.3424 12.277 10.9054ZM7.5 34.5V31.5H6V34.5H7.5ZM30 48V34.5H28.5V48H30Z"
            fill="currentColor"
            fill-rule="evenodd"
        />
    </svg>
);

export default PatientWithBandageSpotIcon;
