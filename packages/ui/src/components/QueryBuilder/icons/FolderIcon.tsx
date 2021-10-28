import React from 'react';
import IIconProps from './type';

const FolderIcon = ({ className = '' }: IIconProps) => (
    <svg className={`${className}`} fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.75 4.6625H8.14062L6.30781 2.90937C6.28449 2.88754 6.25382 2.87527 6.22188 2.875H2.25C1.97344 2.875 1.75 3.09844 1.75 3.375V12.625C1.75 12.9016 1.97344 13.125 2.25 13.125H13.75C14.0266 13.125 14.25 12.9016 14.25 12.625V5.1625C14.25 4.88594 14.0266 4.6625 13.75 4.6625ZM13.125 12H2.875V4H5.82031L7.68906 5.7875H13.125V12Z" />
    </svg>
);
export default FolderIcon;
