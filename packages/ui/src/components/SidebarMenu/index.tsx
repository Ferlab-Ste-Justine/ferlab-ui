import React, { useCallback,useEffect, useRef, useState } from 'react';
import { InfoCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { AutoComplete, Input, InputRef,Menu } from 'antd';

import ScrollView from '../../layout/ScrollView';
import StackLayout from '../../layout/StackLayout';

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
    defaultSelectedKey?: string | number;
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
    defaultSelectedKey = undefined,
    toggleIcon = {
        close: <MenuFoldOutlined />,
        open: <MenuUnfoldOutlined />,
    },
    quickFilterIcon = undefined,
    locale = {
        quickFilter: {
            menuTitle: 'Quick Filter',
            placeholder: 'Quick filter...',
        },
    },
    menuItems,
}: ISidebarMenuProps): React.ReactElement => {
    const [quickFilter, setQuickFilter] = useState('');
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [selectedKey, setSelectedKey] = useState<string>('');
    const searchInputRef = useRef<InputRef>(null);
    const selectedFilterComponent = menuItems.find((menuItem) => menuItem.key == selectedKey);
    const handleUserKeyUp = useCallback((e) => {
        const activeElement = document.activeElement?.getAttribute('data-key');
        if ([32, 13].includes(e.keyCode) && activeElement) {
            setSelectedKey(activeElement);
        }
    }, []);
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
        document.addEventListener('keyup', handleUserKeyUp);
        return () => {
            document.removeEventListener('keyup', handleUserKeyUp);
        };
    }, [handleUserKeyUp]);

    useEffect(() => {
        if (!collapsed && selectedKey == SEARCH_KEY) {
            searchInputRef.current?.focus();
        }
    }, [collapsed, selectedKey]);

    useEffect(() => {
        if (defaultSelectedKey && menuItems.some((item) => item.key.toString() == defaultSelectedKey.toString())) {
            setSelectedKey(defaultSelectedKey.toString());
        }
    }, [defaultSelectedKey]);

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
                            className={styles.sidebarMenu}
                            inlineCollapsed={collapsed}
                            mode="inline"
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
                                        icon={quickFilterIcon ? quickFilterIcon : <SearchIcon />}
                                        key={SEARCH_KEY}
                                        tabIndex={0}
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
                                            tabIndex={0}
                                            value={quickFilter}
                                        >
                                            <Input
                                                placeholder={locale.quickFilter?.placeholder}
                                                prefix={quickFilterIcon ? quickFilterIcon : <SearchIcon />}
                                                ref={searchInputRef}
                                                suffix={<InfoCircleOutlined></InfoCircleOutlined>}
                                            />
                                        </AutoComplete>
                                    </div>
                                ))}
                            {menuItems.map((menuItem) => (
                                <Menu.Item
                                    className={styles.sidebarMenuItem}
                                    data-key={menuItem.key}
                                    icon={menuItem.icon}
                                    key={menuItem.key}
                                    tabIndex={0}
                                >
                                    <span className={styles.sidebarMenuItemTitle}>{menuItem.title}</span>
                                </Menu.Item>
                            ))}
                        </Menu>
                    </ScrollView>
                </StackLayout>
            </div>
            <SidebarMenuContentPanel
                className={contentPanelClassName}
                isOpen={selectedKey.length > 0 && selectedKey != SEARCH_KEY}
                onClose={() => setSelectedKey('')}
            >
                {getSelectedFilterComponentByType()}
            </SidebarMenuContentPanel>
        </div>
    );
};

export default Sidebar;
