import React, { useState, useRef, useEffect } from 'react';
import { Input, Menu, AutoComplete } from 'antd';
import StackLayout from '../../layout/StackLayout';
import ScrollView from '../../layout/ScrollView';
import { InfoCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import SearchIcon from './icons/SearchIcon';
import SidebarMenuContentPanel from './SidebarMenuContentPanel';

import styles from '@ferlab/style/components/sidebarMenu/SidebarMenu.module.scss';

export interface ISidebarMenuItem {
    key: string | number;
    title: string | React.ReactNode;
    icon: React.ReactNode;
    panelContent: (() => React.ReactNode) | React.ReactNode;
}

export interface ISidebarMenuProps {
    className?: string;
    contentPanelClassName?: string;
    style?: React.CSSProperties;
    menuItems: Array<ISidebarMenuItem>;
    toggleIcon?: {
        open?: React.ReactNode;
        close?: React.ReactNode;
    };
    enableQuickFilter?: boolean;
    quickFilterIcon?: React.ReactNode;
    locale?: {
        quickFilter?: {
            placeholder?: string;
            menuTitle?: string;
        };
    };
}

const SEARCH_KEY = 'search';

const Sidebar = ({
    className = '',
    contentPanelClassName = '',
    style = {},
    enableQuickFilter = false,
    toggleIcon = {
        open: <MenuUnfoldOutlined />,
        close: <MenuFoldOutlined />,
    },
    quickFilterIcon = undefined,
    locale = {
        quickFilter: {
            placeholder: 'Quick filter...',
            menuTitle: 'Quick Filter',
        },
    },
    menuItems,
}: ISidebarMenuProps) => {
    const [quickFilter, setQuickFilter] = useState('');
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [selectedKey, setSelectedKey] = useState<string>('');
    const searchInputRef = useRef<Input>(null);
    const selectedFilterComponent = menuItems.find((menuItem) => menuItem.key == selectedKey);
    const getSelectedFilterComponentByType = () => {
        switch (typeof selectedFilterComponent?.panelContent) {
            case 'function':
                return selectedFilterComponent.panelContent();
            case 'object':
                return selectedFilterComponent.panelContent;
            default:
                <></>;
        }
    };

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
                        <div
                            className={styles.sidebarToggleIcon}
                            onClick={() => {
                                setCollapsed(!collapsed);
                                setSelectedKey(selectedKey == SEARCH_KEY ? '' : selectedKey);
                            }}
                        >
                            {collapsed ? toggleIcon.open : toggleIcon.close}
                        </div>
                    </div>
                    <ScrollView>
                        <Menu
                            mode="inline"
                            inlineCollapsed={collapsed}
                            className={styles.sidebarMenu}
                            onClick={(item) => {
                                const cKey = item.key.toString();
                                if (cKey == SEARCH_KEY) {
                                    setCollapsed(false);
                                }
                                setSelectedKey(selectedKey !== cKey ? cKey : '');
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
                                        {locale.quickFilter?.menuTitle}
                                    </Menu.Item>
                                ) : (
                                    <div className={`${styles.searchMenuItem}`}>
                                        <AutoComplete
                                            allowClear
                                            className={styles.searchInput}
                                            onChange={(value: string) => {
                                                setQuickFilter(value ? value : '');
                                            }}
                                            options={[]}
                                            value={quickFilter}
                                        >
                                            <Input
                                                ref={searchInputRef}
                                                placeholder={locale.quickFilter?.placeholder}
                                                prefix={quickFilterIcon ? quickFilterIcon : <SearchIcon />}
                                                suffix={<InfoCircleOutlined></InfoCircleOutlined>}
                                            />
                                        </AutoComplete>
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
            <SidebarMenuContentPanel
                isOpen={selectedKey.length > 0 && selectedKey != SEARCH_KEY}
                className={contentPanelClassName}
                onClose={() => setSelectedKey('')}
            >
                {getSelectedFilterComponentByType()}
            </SidebarMenuContentPanel>
        </div>
    );
};

export default Sidebar;
