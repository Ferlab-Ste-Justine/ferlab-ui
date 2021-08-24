import React from 'react';
import ScrollView from '../../layout/ScrollView';

import CloseIcon from './icons/CloseIcon';

import styles from '@ferlab/style/components/sidebarMenu/SidebarMenuRightPanel.module.scss';

type ISidebarMenuRightPanelProps = {
    onClose?: Function;
    isOpen: boolean;
    children: React.ReactNode | string;
};

const SidebarMenuRightPanel = ({ onClose = () => {}, isOpen = false, children }: ISidebarMenuRightPanelProps) => (
    <div className={`${styles.rightPanel} ${isOpen && styles.opened}`}>
        <div className={styles.rightPanelHeader}>
            <a
                onClick={() => {
                    onClose();
                }}
            >
                <CloseIcon className={styles.closeIcon} width={'16px'} height={'16px'} />
            </a>
        </div>
        <ScrollView>{children}</ScrollView>
    </div>
);

export default SidebarMenuRightPanel;
