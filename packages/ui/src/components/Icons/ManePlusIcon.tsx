import React from 'react';
import cx from 'classnames';

import { IIconProps } from './type';

const ManePlusIcon = ({ className = '', height = 18, width = 18 }: IIconProps): JSX.Element => (
    <svg
        className={cx('anticon', className)}
        fill="currentColor"
        height={height}
        viewBox="0 0 24 24"
        width={width}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M10.9335 11.7986V8.02808H13.0846C13.5465 8.02808 13.9225 8.11938 14.2125 8.302C14.5026 8.48462 14.7147 8.72632 14.849 9.0271C14.9833 9.32788 15.0504 9.65283 15.0504 10.002C15.0504 10.3457 14.9833 10.6545 14.849 10.9285C14.7147 11.2024 14.5026 11.4172 14.2125 11.573C13.9225 11.7234 13.5465 11.7986 13.0846 11.7986H10.9335Z" />
        <path
            clipRule="evenodd"
            d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM10.9335 13.6838H13.0846C14.0031 13.6838 14.7899 13.5334 15.4452 13.2327C16.1058 12.9319 16.6107 12.5049 16.9598 11.9517C17.309 11.3984 17.4835 10.7432 17.4835 9.98584C17.4835 9.23926 17.309 8.57593 16.9598 7.99585C16.6107 7.41577 16.1058 6.96191 15.4452 6.63428C14.7899 6.30127 14.0031 6.13477 13.0846 6.13477H8.51648V17.8652H10.9335V13.6838Z"
            fillRule="evenodd"
        />
    </svg>
);
export default ManePlusIcon;
