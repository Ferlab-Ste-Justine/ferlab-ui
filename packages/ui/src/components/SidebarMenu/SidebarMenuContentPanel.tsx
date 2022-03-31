import React from 'react';
import ScrollContent from '../../layout/ScrollContent';

import CloseIcon from './icons/CloseIcon';

import styles from '@ferlab/style/components/sidebarMenu/SidebarMenuContentPanel.module.scss';

type ISidebarMenuContentPanelProps = {
    className?: string;
    onClose?: Function;
    isOpen: boolean;
    children: React.ReactNode | string;
};

const SidebarMenuContentPanel = ({
    className = '',
    onClose = () => {},
    isOpen = false,
    children,
}: ISidebarMenuContentPanelProps) => (
    <div className={`${styles.contentPanel} ${isOpen ? styles.opened : ''} ${className}`}>
        <div className={styles.contentPanelHeader}>
            <a
                onClick={() =>  onClose()}
            >
                <CloseIcon className={styles.closeIcon} />
            </a>
        </div>
        <ScrollContent>{children}</ScrollContent>
    </div>
);

export default SidebarMenuContentPanel;
