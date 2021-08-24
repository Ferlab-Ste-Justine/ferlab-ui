import React, { useState, useRef, useEffect } from 'react';
import { Input, Menu } from 'antd';
import StackLayout from '../../layout/StackLayout';
import ScrollView from '../../layout/ScrollView';
import { InfoCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined } from '@ant-design/icons';
import SearchIcon from './icons/SearchIcon';
import SidebarMenuRightPanel from './SidebarMenuRightPanel';

import styles from '@ferlab/style/components/sidebarMenu/SidebarMenu.module.scss';

export interface ISidebarMenuItems {
    key: string | number;
    title: string | React.ReactNode;
    icon: React.ReactNode;
    rightPanelContent: React.ReactNode;
}

export interface ISidebarMenuProps {
    className?: string;
    style?: React.CSSProperties;
    menuItems: Array<ISidebarMenuItems>;
    toggleIcon: {
        open: React.ReactNode;
        close: React.ReactNode;
    };
    enableQuickFilter?: boolean;
    quickFilterIcon?: React.ReactNode;
    quickFilterPlaceholderText?: string;
}

const SEARCH_KEY = 'search';

const Sidebar = ({
    className = '',
    style = {},
    enableQuickFilter = true,
    toggleIcon = {
        open: <MenuUnfoldOutlined />,
        close: <MenuFoldOutlined />,
    },
    quickFilterIcon = undefined,
    quickFilterPlaceholderText = 'Quick filter...',
    menuItems,
}: ISidebarMenuProps) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [selectedKey, setSelectedKey] = useState<string>('');
    const searchInputRef = useRef<Input>(null);
    const selectedFilterComponent = menuItems.filter((menuItem) => menuItem.key == selectedKey)[0];

    useEffect(() => {
        if (!collapsed && selectedKey == SEARCH_KEY) {
            searchInputRef.current?.focus();
        }
    }, [collapsed, selectedKey]);

    return (
        <div className={`${styles.siderContainer} ${className}`} style={style}>
            <div className={styles.sider} data-collapsed={collapsed}>
                <StackLayout className={styles.siderStackLayout} vertical center={false} flexContent>
                    <div className={styles.sidebarToggleIconContainer}>
                        <div className={styles.sidebarToggleIcon} onClick={() => setCollapsed(!collapsed)}>
                            {collapsed ? toggleIcon.open : toggleIcon.close}
                        </div>
                    </div>
                    <ScrollView>
                        <Menu
                            mode="inline"
                            inlineCollapsed={collapsed}
                            className={styles.sidebarMenu}
                            onClick={(item) => {
                                if (item.key.toString() == SEARCH_KEY) {
                                    setCollapsed(false);
                                }
                                setSelectedKey(selectedKey !== item.key.toString() ? item.key.toString() : '');
                            }}
                            selectedKeys={[selectedKey]}
                        >
                            {enableQuickFilter &&
                                (collapsed ? (
                                    <Menu.Item
                                        className={styles.sidebarMenuItem}
                                        key={SEARCH_KEY}
                                        icon={quickFilterIcon ? quickFilterIcon : <SearchIcon />}
                                    >
                                        Quick Filter
                                    </Menu.Item>
                                ) : (
                                    <div className={`${styles.searchMenuItem}`}>
                                        <Input
                                            height={32}
                                            className={styles.searchInput}
                                            ref={searchInputRef}
                                            placeholder={quickFilterPlaceholderText}
                                            prefix={quickFilterIcon ? quickFilterIcon : <SearchIcon />}
                                            suffix={<InfoCircleOutlined></InfoCircleOutlined>}
                                        />
                                    </div>
                                ))}
                            {menuItems.map((menuItem) => (
                                <Menu.Item className={styles.sidebarMenuItem} key={menuItem.key} icon={menuItem.icon}>
                                    <span className={styles.sidebarMenuItemTitle}>{menuItem.title}</span>
                                </Menu.Item>
                            ))}
                        </Menu>
                    </ScrollView>
                </StackLayout>
            </div>
            <SidebarMenuRightPanel
                isOpen={selectedKey.length > 0 && selectedKey != SEARCH_KEY}
                onClose={() => {
                    setSelectedKey('');
                }}
            >
                {selectedFilterComponent && selectedFilterComponent.rightPanelContent}
            </SidebarMenuRightPanel>
        </div>
    );
};

export default Sidebar;
