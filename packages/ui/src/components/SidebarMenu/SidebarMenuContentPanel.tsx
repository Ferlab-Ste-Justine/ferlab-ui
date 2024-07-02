import React, { ReactElement } from 'react';

import ScrollContent from '../../layout/ScrollContent';

import CloseIcon from './icons/CloseIcon';

import styles from './SidebarMenuContentPanel.module.css';

type ISidebarMenuContentPanelProps = {
    className?: string;
    onClose?: () => void;
    isOpen: boolean;
    children: React.ReactNode | string;
};

const SidebarMenuContentPanel = ({
    children,
    className = '',
    isOpen = false,
    onClose = () => {
        /* */
    },
}: ISidebarMenuContentPanelProps): ReactElement => (
    <div className={`${styles.contentPanel} ${isOpen ? styles.opened : ''} ${className}`}>
        <div className={styles.contentPanelHeader}>
            <a onClick={() => onClose()}>
                <CloseIcon className={styles.closeIcon} />
            </a>
        </div>
        <ScrollContent>{children}</ScrollContent>
    </div>
);

export default SidebarMenuContentPanel;
