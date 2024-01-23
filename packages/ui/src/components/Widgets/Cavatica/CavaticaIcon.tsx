import React from 'react';
import cx from 'classnames';

export type TCavaticaIcon = {
    height?: number | string;
    width?: number | string;
    className?: string;
};

const CavaticaIcon = ({ className = '', height = 40, width = 40 }: TCavaticaIcon): JSX.Element => (
    <svg
        className={cx('anticon', className)}
        fill="currentColor"
        height={height}
        viewBox="0 0 40 40"
        width={width}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            clipRule="evenodd"
            d="M20.9686 3.03808C20.5266 2.86806 20.0357 2.87691 19.6 3.06275L19.5969 3.06409C19.2768 3.20377 19.0035 3.43258 18.8097 3.72323C18.6725 3.92912 18.5792 4.1599 18.5344 4.40115L10.0201 7.28292C9.9632 7.18353 9.89691 7.08944 9.82195 7.002C9.65143 6.80311 9.44001 6.64335 9.20212 6.53362C8.96423 6.42388 8.70547 6.36676 8.44349 6.36614C8.18151 6.36552 7.92248 6.42142 7.68407 6.53002C7.44566 6.63863 7.23349 6.79739 7.06203 6.99547C6.89057 7.19354 6.76385 7.42628 6.69053 7.67779C6.61721 7.9293 6.599 8.19367 6.63716 8.45285C6.67442 8.70599 6.76459 8.94836 6.90171 9.16422C7.03156 9.40339 7.20567 9.61413 7.41352 9.7859L2.94769 17.7981C2.72307 17.8108 2.5031 17.8749 2.30538 17.987C2.1042 18.065 1.92011 18.1816 1.76359 18.3306C1.59713 18.4889 1.46551 18.6803 1.37714 18.8923C1.28877 19.1044 1.24559 19.3326 1.25036 19.5623C1.25512 19.792 1.30748 20.0183 1.40457 20.2266L1.41128 20.2397C1.57838 20.5674 1.83421 20.8414 2.14957 21.0306C2.38317 21.1708 2.64246 21.2602 2.91066 21.2944L7.03433 30.4729C6.82798 30.6881 6.67949 30.9546 6.6062 31.2478C6.50455 31.6544 6.55459 32.0839 6.74674 32.4561C6.94641 32.8815 7.30286 33.2135 7.74172 33.3822C8.18377 33.5523 8.67466 33.5434 9.11029 33.3576L9.11453 33.3557C9.32894 33.2614 9.51664 33.1195 9.6647 32.9429L17.9506 36.757C17.9762 36.9324 18.0386 37.1015 18.1351 37.2527C18.3365 37.6683 18.6885 37.9924 19.1204 38.1585C19.5624 38.3285 20.0533 38.3196 20.4889 38.1338L20.4921 38.1325C20.8122 37.9928 21.0855 37.764 21.2793 37.4733C21.4163 37.2678 21.5094 37.0375 21.5543 36.7968L30.7376 33.7357C30.9514 33.937 31.2073 34.0905 31.4882 34.1841C31.865 34.3097 32.2705 34.3221 32.6543 34.2198L32.6892 34.2105L32.7219 34.1954C33.1518 33.9965 33.4873 33.6381 33.6573 33.1961C33.8273 32.754 33.8184 32.2631 33.6326 31.8275L33.6256 31.8111L33.6172 31.7953C33.4851 31.547 33.3056 31.3288 33.0902 31.1523L36.6861 24.3458C36.9085 24.3906 37.1389 24.3914 37.3639 24.3465C37.7209 24.2753 38.0461 24.0929 38.293 23.8254C38.5399 23.558 38.6958 23.2192 38.7382 22.8577C38.7762 22.5347 38.7218 22.2083 38.5827 21.9161V21.905L38.5502 21.8275C38.3876 21.4408 38.0852 21.1297 37.7033 20.9561C37.4389 20.8359 37.1498 20.7878 36.8647 20.8133L32.053 10.1207C32.2053 9.91843 32.3184 9.68844 32.3855 9.44249C32.479 9.09968 32.4797 8.73819 32.3874 8.39504L32.3782 8.36061L32.3632 8.32826C32.1644 7.8984 31.806 7.56289 31.3639 7.39287C30.9219 7.22286 30.431 7.23171 29.9954 7.41754L29.9212 7.44917L29.8642 7.50617C29.8503 7.52013 29.8255 7.54101 29.7812 7.57472L29.7446 7.60232C29.7109 7.62761 29.6695 7.65869 29.6352 7.68615C29.6248 7.69442 29.6137 7.70344 29.6021 7.71316L22.154 4.5771C22.1365 4.35829 22.0702 4.14478 21.9583 3.95291C21.7576 3.53292 21.4036 3.20538 20.9686 3.03808ZM7.89676 21.3785L4.55913 19.5243V18.839L4.52388 18.7589C4.43298 18.5522 4.29782 18.3703 4.13 18.2248L8.63631 9.89738C8.65727 9.89465 8.67814 9.8914 8.69891 9.88763L9.69618 12.6578C9.62111 12.709 9.55009 12.7663 9.48387 12.8292C9.31607 12.9886 9.18268 13.1806 9.09194 13.3936C9.00119 13.6065 8.95501 13.8357 8.95623 14.0671C8.95742 14.2922 9.00341 14.5146 9.09144 14.7216C9.17816 14.9718 9.33149 15.1937 9.53508 15.3633C9.62817 15.4409 9.73011 15.5062 9.83836 15.558L8.71626 20.9192C8.55546 20.9523 8.40143 21.0168 8.26347 21.1103L8.23066 21.1325L8.20263 21.1606C8.16796 21.1952 8.10245 21.241 7.98518 21.3192L7.97005 21.3293C7.94768 21.3442 7.9229 21.3607 7.89676 21.3785ZM4.1344 20.8499C4.14542 20.8404 4.15642 20.8311 4.16756 20.822L7.4392 22.6395C7.42166 22.7352 7.41276 22.8324 7.41276 22.9302C7.41276 23.1581 7.46111 23.3833 7.55461 23.5911C7.66961 23.8531 7.84215 24.0859 8.05942 24.2722C8.1861 24.3807 8.32608 24.4719 8.4756 24.5436L8.01341 29.7432L4.05303 20.9282C4.07683 20.9022 4.10389 20.8764 4.1344 20.8499ZM12.419 13.3628L19.4689 6.80764L19.3543 12.8839C19.1901 12.9132 19.0304 12.967 18.8807 13.0441C18.6232 13.1591 18.3944 13.3298 18.2109 13.544C18.0992 13.6742 18.006 13.8186 17.9334 13.9729L12.5485 13.7224C12.5217 13.6176 12.4834 13.5158 12.4342 13.4188C12.4297 13.3999 12.4247 13.3813 12.419 13.3628ZM27.566 13.9603L22.7527 6.13868L28.8884 8.63844C28.8899 8.96441 28.9369 9.2891 29.0283 9.60304L29.1158 9.90319H29.2139C29.2937 10.0192 29.3893 10.1233 29.4977 10.2126L27.9411 13.9245C27.8597 13.9225 27.7847 13.9289 27.7191 13.9371C27.6695 13.9433 27.6136 13.9524 27.566 13.9603ZM35.2208 22.5845L29.5558 25.6745C29.4562 25.58 29.3447 25.498 29.2238 25.4309C29.1124 25.369 28.9946 25.3205 28.8728 25.2862L28.4858 17.4157C28.5875 17.3716 28.6808 17.3099 28.7612 17.233L28.7678 17.2264C28.7849 17.2093 28.7991 17.1997 28.8635 17.1674L35.2208 22.4651V22.5845ZM19.6061 25.5452L27.3395 17.8119L27.4628 25.5803C27.2614 25.7221 27.0863 25.898 26.9454 26.1L19.9711 26.2291C19.9374 26.1069 19.8852 25.9897 19.8156 25.8817C19.7553 25.7637 19.6851 25.6511 19.6061 25.5452ZM19.4479 27.9511L30.1703 31.9224C30.1553 31.9808 30.1435 32.04 30.1349 32.0999C30.1217 32.1929 30.1164 32.2865 30.119 32.3798L21.0341 35.4081C20.7886 35.1305 20.4866 34.9081 20.1481 34.7561L19.3581 28.0409L19.4479 27.9511ZM28.8257 28.8299L29.953 30.6013L21.9213 27.5895L26.6643 27.4983C26.6975 27.6186 26.7486 27.7341 26.8166 27.8407C27.018 28.2563 27.37 28.5804 27.8019 28.7465C28.1304 28.8729 28.486 28.9004 28.8257 28.8299ZM30.2722 27.3797C30.3144 27.1477 30.3074 26.9111 30.2536 26.6846L35.4945 23.945L31.7369 30.7087C31.688 30.715 31.6395 30.7241 31.5917 30.736L29.973 28.0767C30.1232 27.8711 30.2261 27.6331 30.2722 27.3797ZM30.8728 10.6056L35.6352 21.1886L29.6532 16.2248C29.7347 15.8497 29.7049 15.4564 29.5637 15.0946L29.5569 15.0773L29.5486 15.0606C29.4626 14.8875 29.3557 14.726 29.2306 14.5796L30.5967 10.6056H30.8728ZM9.8408 9.28815C10.0042 9.06233 10.1168 8.80383 10.1709 8.5306L18.9125 5.4843L18.9228 5.49981L11.3791 12.3818C11.2311 12.3391 11.079 12.3121 10.9255 12.3011L9.8408 9.28815ZM21.0927 13.8209C20.9823 13.5415 20.805 13.2947 20.5774 13.1015L20.7075 6.07503C20.8186 6.03058 20.9203 5.96529 21.0069 5.8824L21.0134 5.87588C21.0232 5.8661 21.0353 5.85613 21.0602 5.839L21.0671 5.83434L26.5063 14.6407L26.4712 14.6735L21.2459 14.1892C21.2149 14.0598 21.1634 13.9354 21.0927 13.8209ZM26.4672 16.7751L19.1887 24.0536L20.2497 16.1554C20.5207 16.0041 20.7543 15.7955 20.9347 15.5453L26.0913 16.0484C26.1241 16.186 26.18 16.3181 26.2577 16.4386C26.3181 16.5567 26.3882 16.6693 26.4672 16.7751ZM17.5254 24.9446L12.2371 14.8968L12.2484 14.8827C12.2607 14.8671 12.2731 14.8506 12.2854 14.8329L17.844 15.0855C17.8745 15.1469 17.9213 15.2136 17.9937 15.2699C18.0202 15.2905 18.0476 15.3078 18.0754 15.3221C18.3218 15.6405 18.6381 15.8968 18.9986 16.0719L17.8206 24.8418C17.7191 24.8655 17.6201 24.8999 17.5254 24.9446ZM11.2722 15.7588L16.2693 25.3783L10.9706 23.0107C10.9732 22.926 10.9667 22.8481 10.9582 22.7802C10.9513 22.7249 10.9407 22.6617 10.9323 22.6109L10.9235 22.5568C10.9135 22.4928 10.9087 22.4479 10.9087 22.4104V22.3065L10.8599 22.2148C10.711 21.9348 10.5017 21.6931 10.2487 21.5062L11.2704 15.7593L11.2722 15.7588ZM9.89753 24.1559C10.039 24.0801 10.1722 23.9903 10.2951 23.8877L16.3968 26.614V26.6546L9.43625 30.3319C9.37472 30.2815 9.31066 30.2342 9.24433 30.1902L9.75881 24.2736C9.79451 24.2498 9.82311 24.2254 9.8445 24.2061C9.86157 24.1908 9.87958 24.1735 9.89753 24.1559ZM18.1277 28.4374L18.8872 34.8933C18.7202 34.9963 18.5707 35.1259 18.4447 35.2771C18.39 35.3427 18.3401 35.4119 18.2954 35.4842L10.0658 31.696V31.518L17.1403 27.9808C17.2832 28.1103 17.4463 28.2168 17.6239 28.2958C17.7848 28.3673 17.9545 28.4148 18.1277 28.4374Z"
            fillRule="evenodd"
        />
    </svg>
);
export default CavaticaIcon;
