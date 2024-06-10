import React from 'react';
import cx from 'classnames';

import { IIconProps } from '../type';

import style from './icon.module.css';

const ParticipantSpotIcon = ({
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
        <g id="participant">
            <path
                className={cx(style.spotColor, spotClassName)}
                d="M16.5 48C25.1985 48 32.25 40.9485 32.25 32.25C32.25 23.5515 25.1985 16.5 16.5 16.5C7.80152 16.5 0.75 23.5515 0.75 32.25C0.75 40.9485 7.80152 48 16.5 48Z"
                fill="currentColor"
                id="spot"
            />
            <g id="Group">
                <path
                    clipRule="evenodd"
                    d="M6.61548 34.4824C6.0406 35.5149 5.67586 36.938 5.67586 39.0208V46.8742H3.93066V39.0208C3.93066 36.7407 4.32944 35.0006 5.09073 33.6334C5.85683 32.2575 6.94669 31.3373 8.18794 30.628C9.31325 29.9849 10.6038 29.4948 11.9024 29.0015C12.0093 28.9609 12.1163 28.9203 12.2233 28.8795C13.6531 28.3348 17.2878 26.7108 18.7505 25.875L19.5005 27.375C17.9091 28.2843 14.2779 29.9643 12.8446 30.5104C12.7474 30.5474 12.6511 30.584 12.5557 30.6203C11.2199 31.1282 10.0549 31.5712 9.0538 32.1432C8.00449 32.7428 7.18553 33.4587 6.61548 34.4824Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector"
                />
                <path
                    clipRule="evenodd"
                    d="M35.1568 30.5104C33.7235 29.9643 30.0923 28.2843 28.501 27.375L29.251 25.875C30.7137 26.7108 34.3482 28.3348 35.7781 28.8795C35.8851 28.9203 35.992 28.9609 36.099 29.0015C37.3976 29.4948 38.6881 29.9849 39.8134 30.628C41.0547 31.3373 42.1445 32.2575 42.9106 33.6334C43.6719 35.0006 44.0707 36.7407 44.0707 39.0208V46.8742H42.3255V39.0208C42.3255 36.938 41.9608 35.5149 41.3859 34.4824C40.8158 33.4587 39.9969 32.7428 38.9476 32.1432C37.9465 31.5712 36.7814 31.1282 35.4456 30.6203C35.3502 30.584 35.254 30.5474 35.1568 30.5104Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_2"
                />
                <path
                    clipRule="evenodd"
                    d="M18.751 26.25H19.501C19.6999 26.25 19.8907 26.329 20.0313 26.4697L22.8116 29.25H25.1903L27.9706 26.4697C28.1113 26.329 28.3021 26.25 28.501 26.25H29.251V27L28.8116 27.75L26.0313 30.5303C25.8907 30.671 25.6999 30.75 25.501 30.75H22.501C22.3021 30.75 22.1113 30.671 21.9706 30.5303L19.1903 27.75L18.751 27V26.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_3"
                />
                <path
                    clipRule="evenodd"
                    d="M18.5635 26.25C18.5635 26.1464 18.6474 26.0625 18.751 26.0625H19.501C19.7496 26.0625 19.9881 26.1613 20.1639 26.3371L22.8893 29.0625H25.1127L27.8381 26.3371C28.0139 26.1613 28.2523 26.0625 28.501 26.0625H29.251C29.3545 26.0625 29.4385 26.1464 29.4385 26.25V27C29.4385 27.0333 29.4296 27.066 29.4128 27.0948L28.9734 27.8448C28.9653 27.8586 28.9555 27.8713 28.9442 27.8826L26.1639 30.6629C25.9881 30.8387 25.7496 30.9375 25.501 30.9375H22.501C22.2523 30.9375 22.0139 30.8387 21.8381 30.6629L19.0577 27.8826C19.0464 27.8713 19.0366 27.8586 19.0285 27.8448L18.5892 27.0948C18.5724 27.066 18.5635 27.0333 18.5635 27V26.25ZM18.9385 26.4375V26.9491L19.3399 27.6344L22.1032 30.3977C22.2087 30.5032 22.3518 30.5625 22.501 30.5625H25.501C25.6502 30.5625 25.7932 30.5032 25.8987 30.3977L28.662 27.6344L29.0635 26.9491V26.4375H28.501C28.3518 26.4375 28.2087 26.4968 28.1032 26.6023L25.3229 29.3826C25.2877 29.4177 25.24 29.4375 25.1903 29.4375H22.8116C22.7619 29.4375 22.7142 29.4177 22.6791 29.3826L19.8987 26.6023C19.7932 26.4968 19.6502 26.4375 19.501 26.4375H18.9385Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_4"
                />
                <path
                    clipRule="evenodd"
                    d="M27.75 27V21.75H29.25V27H27.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_5"
                />
                <path
                    clipRule="evenodd"
                    d="M20.25 21.75V27H18.75V21.75H20.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_6"
                />
                <path
                    clipRule="evenodd"
                    d="M17.4688 3.69438C18.995 2.1682 21.2237 1.5 24.0004 1.5C26.7771 1.5 29.0058 2.1682 30.532 3.69438C32.0581 5.22055 32.7263 7.44926 32.7263 10.226V13.7784L32.7176 13.8397C32.2652 17.0061 31.3531 19.089 30.5175 20.4021C30.1005 21.0573 29.7057 21.5159 29.403 21.8186C29.2518 21.9698 29.124 22.0817 29.0284 22.1595C28.9806 22.1985 28.9409 22.2288 28.9103 22.2513C28.8951 22.2625 28.8821 22.2718 28.8715 22.2792L28.8576 22.2889L28.852 22.2927L28.8496 22.2943L28.8485 22.295C28.8479 22.2954 28.8474 22.2958 28.3634 21.5697L28.8474 22.2958L28.8022 22.3259L28.7536 22.3502C27.7482 22.8529 26.5408 23.0859 25.6357 23.1991C25.1735 23.2569 24.7696 23.2857 24.4802 23.3002C24.3353 23.3074 24.2182 23.3111 24.1361 23.313C24.095 23.3139 24.0626 23.3144 24.0397 23.3146L24.0126 23.3149L24.0046 23.3149L24.0011 23.3149C24.0009 23.3149 24.0004 23.3149 24.0004 22.4423C24.0004 23.3149 24.0002 23.3149 24.0001 23.3149L23.9962 23.3149L23.9882 23.3149L23.9611 23.3146C23.9382 23.3144 23.9057 23.3139 23.8647 23.313C23.7825 23.3111 23.6655 23.3074 23.5205 23.3002C23.2311 23.2857 22.8273 23.2569 22.3651 23.1991C21.46 23.0859 20.2526 22.8529 19.2472 22.3502L19.1986 22.3259L19.1534 22.2958L19.6374 21.5697C19.1534 22.2958 19.1528 22.2954 19.1523 22.295L19.1512 22.2943L19.1487 22.2927L19.1432 22.2889L19.1292 22.2792C19.1187 22.2718 19.1057 22.2625 19.0904 22.2513C19.0599 22.2288 19.0202 22.1985 18.9724 22.1595C18.8767 22.0817 18.7489 21.9698 18.5977 21.8186C18.295 21.5159 17.9002 21.0573 17.4833 20.4021C16.6477 19.089 15.7355 17.0061 15.2832 13.8397L15.2744 13.7784V10.226C15.2744 7.44926 15.9426 5.22055 17.4688 3.69438ZM20.0928 20.8211C20.824 21.1709 21.766 21.3654 22.5816 21.4674C22.992 21.5187 23.3517 21.5444 23.6077 21.5572C23.7354 21.5636 23.8365 21.5667 23.9043 21.5682C23.9382 21.569 23.9637 21.5694 23.98 21.5695L23.9975 21.5697L23.9997 21.5697H24.0006L24.0033 21.5697L24.0207 21.5695C24.037 21.5694 24.0625 21.569 24.0964 21.5682C24.1643 21.5667 24.2654 21.5636 24.3931 21.5572C24.6491 21.5444 25.0088 21.5187 25.4192 21.4674C26.2348 21.3654 27.1767 21.1709 27.9079 20.8211C27.9136 20.8166 27.9198 20.8116 27.9267 20.806C27.9776 20.7646 28.0612 20.6924 28.169 20.5846C28.3844 20.3692 28.6986 20.0097 29.0451 19.4651C29.7318 18.3861 30.5581 16.5602 30.9811 13.6538V10.226C30.9811 7.70164 30.3732 6.00367 29.2979 4.92841C28.2227 3.85316 26.5247 3.24519 24.0004 3.24519C21.4761 3.24519 19.7781 3.85316 18.7028 4.92841C17.6276 6.00367 17.0196 7.70164 17.0196 10.226V13.6538C17.4426 16.5602 18.2689 18.3861 18.9556 19.4651C19.3022 20.0097 19.6163 20.3692 19.8317 20.5846C19.9396 20.6924 20.0231 20.7646 20.0741 20.806C20.0809 20.8116 20.0872 20.8166 20.0928 20.8211Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_7"
                />
                <path
                    clipRule="evenodd"
                    d="M19.5977 7.5249L28.3237 11.0153L31.4636 9.44534L32.244 11.0063L28.4032 12.9267L19.6772 9.43633L16.5373 11.0063L15.7568 9.44534L19.5977 7.5249Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_8"
                />
                <path
                    clipRule="evenodd"
                    d="M12.6563 39.894V46.8748H10.9111V39.894H12.6563Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_9"
                />
                <path
                    clipRule="evenodd"
                    d="M37.0889 39.894V46.8748H35.3438V39.894H37.0889Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    id="Vector_10"
                />
            </g>
        </g>
    </svg>
);

export default ParticipantSpotIcon;
