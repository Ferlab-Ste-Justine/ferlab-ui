import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { AutoComplete, Input, InputRef, Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

import ScrollView from '../../layout/ScrollView';
import StackLayout from '../../layout/StackLayout';

import SearchIcon from './icons/SearchIcon';
import SidebarMenuContentPanel from './SidebarMenuContentPanel';

import styles from './index.module.scss';

export interface ISidebarMenuItem {
    key: string | number;
    title: string | ReactNode;
    icon: ReactNode;
    panelContent: (() => ReactNode) | ReactNode;
}

export interface IQuickFilter {
    enableQuickFilter?: boolean;
    inputPrefixIcon?: ReactNode;
    inputSuffixIcon?: ReactNode;
    menuIcon?: ReactNode;
    menuTitle?: string;
    placeholder?: string;
    quickFilterOptions?: any[];
}

export interface ISidebarMenuProps {
    className?: string;
    contentPanelClassName?: string;
    style?: React.CSSProperties;
    menuItems: Array<ISidebarMenuItem>;
    toggleIcon?: {
        open?: ReactNode;
        close?: ReactNode;
    };
    defaultSelectedKey?: string | number;
    quickFilter?: IQuickFilter;
}

const SEARCH_KEY = 'search';

const Sidebar = ({
    className = '',
    contentPanelClassName = '',
    defaultSelectedKey = undefined,
    menuItems,
    style = {},
    toggleIcon = {
        close: <MenuFoldOutlined />,
        open: <MenuUnfoldOutlined />,
    },
    quickFilter = {
        enableQuickFilter: false,
        inputPrefixIcon: undefined,
        inputSuffixIcon: undefined,
        menuIcon: undefined,
        menuTitle: 'Quick filter',
        placeholder: 'Quick filter...',
        quickFilterOptions: [],
    },
}: ISidebarMenuProps): React.ReactElement => {
    const [quickFilterValue, setQuickFilterValue] = useState('');
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [selectedKey, setSelectedKey] = useState<string>('');
    const searchInputRef = useRef<InputRef>(null);
    const selectedFilterComponent = menuItems.find((menuItem) => menuItem.key == selectedKey);
    const {
        enableQuickFilter,
        inputPrefixIcon,
        inputSuffixIcon,
        menuIcon,
        menuTitle,
        placeholder,
        quickFilterOptions,
    } = quickFilter;

    const handleUserKeyUp = useCallback((e: any) => {
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

    const getMenuItems = () => {
        const items: ItemType[] = [];

        if (enableQuickFilter && collapsed) {
            items.push({
                className: styles.sidebarMenuItem,
                icon: menuIcon ? menuIcon : <SearchIcon />,
                key: SEARCH_KEY,
                label: menuTitle || 'Quick filter',
            });
        }

        items.push(
            ...menuItems.map((menuItem) => ({
                className: styles.sidebarMenuItem,
                'data-cy': `SidebarMenuItem_${menuItem.title}`,
                'data-key': menuItem.key,
                icon: menuItem.icon,
                key: menuItem.key,
                label: <span className={styles.sidebarMenuItemTitle}>{menuItem.title}</span>,
            })),
        );

        return items;
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
                <StackLayout center={false} className={styles.siderStackLayout} flexContent vertical>
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
                        {enableQuickFilter && !collapsed && (
                            <div className={styles.searchMenuItem}>
                                <AutoComplete
                                    className={styles.searchInput}
                                    onChange={(value: string) => {
                                        setQuickFilterValue(value ? value : '');
                                    }}
                                    options={quickFilterOptions}
                                    tabIndex={0}
                                    value={quickFilterValue}
                                >
                                    <Input
                                        placeholder={placeholder || 'Quick filter...'}
                                        prefix={inputPrefixIcon ? inputPrefixIcon : undefined}
                                        ref={searchInputRef}
                                        suffix={inputSuffixIcon ? inputSuffixIcon : <SearchIcon />}
                                    />
                                </AutoComplete>
                            </div>
                        )}
                        <Menu
                            className={styles.sidebarMenu}
                            inlineCollapsed={collapsed}
                            items={getMenuItems()}
                            mode="inline"
                            onClick={(item) => {
                                const cKey = item.key.toString();
                                if (cKey == SEARCH_KEY) {
                                    setCollapsed(false);
                                }
                                setSelectedKey(selectedKey !== cKey ? cKey : '');
                            }}
                            selectedKeys={[selectedKey]}
                        />
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
