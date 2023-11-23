import React, { Fragment, ReactElement, ReactNode, useContext, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Dropdown, Modal } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

import { QueryCommonContext } from '../../context';
import { ISavedFilter, TOnSavedFilterChange } from '../../types';

import ManageFiltersModal from './ManageFiltersModal';

import styles from './QueryBuilderHeaderTools.module.scss';

interface OwnProps {
    selectedKey: string;
    isDirty: boolean;
    savedFilters?: ISavedFilter[];
    onSavedFilterChange: TOnSavedFilterChange;
    children: ReactNode;
    onDeleteFilter: ((filterId: string) => void) | undefined;
    onUpdateFilter: ((filter: ISavedFilter) => void) | undefined;
}

const SavedFiltersMenu = ({
    selectedKey,
    isDirty,
    savedFilters = [],
    children,
    onSavedFilterChange,
    onDeleteFilter,
    onUpdateFilter,
}: OwnProps): JSX.Element => {
    const { dictionary } = useContext(QueryCommonContext);
    const [manageFiltersVisible, setManageFiltersVisible] = useState(false);

    const confirmUnsavedChangeForExistingFilter = (onOkCallback: TOnSavedFilterChange) => {
        Modal.confirm({
            cancelText: dictionary.queryBuilderHeader?.modal?.confirmUnsaved?.openSavedFilter?.cancelText || 'Cancel',
            content:
                dictionary.queryBuilderHeader?.modal?.confirmUnsaved?.openSavedFilter?.content ||
                'You are about to open a saved filter; all modifications will be lost.',
            icon: <ExclamationCircleOutlined />,
            okText: dictionary.queryBuilderHeader?.modal?.confirmUnsaved?.openSavedFilter?.okText || 'Continue',
            onOk: onOkCallback,
            title: dictionary.queryBuilderHeader?.modal?.confirmUnsaved?.title || 'Unsaved changes',
        });
    };

    const getMenuItems = () => {
        const items: ItemType[] = savedFilters.map((savedFilter: ISavedFilter) => ({
            key: savedFilter.id,
            label: savedFilter.title,
            onClick: () => {
                if (savedFilter.id != selectedKey) {
                    const callback = () => onSavedFilterChange(savedFilter);

                    if (isDirty) {
                        confirmUnsavedChangeForExistingFilter(callback);
                    } else {
                        callback();
                    }
                }
            },
        }));

        items.push(
            {
                type: 'divider',
            },
            {
                key: 'manage-my-filters',
                label: dictionary.queryBuilderHeader?.myFiltersDropdown?.manageMyFilter || 'Manage filters',
                onClick: () => setManageFiltersVisible(true),
            },
        );

        return items;
    };

    return (
        <Fragment>
            <Dropdown
                disabled={savedFilters.length == 0}
                menu={{
                    items: getMenuItems(),
                    onClick: (e) => e.domEvent.stopPropagation(),
                    selectedKeys: selectedKey ? [selectedKey] : [],
                }}
                overlayClassName={styles.fuiQBHTSavedFiltersMenu}
                trigger={['click']}
            >
                {children}
            </Dropdown>
            <ManageFiltersModal
                onDeleteFilter={onDeleteFilter}
                onUpdateFilter={onUpdateFilter}
                onVisibleChange={setManageFiltersVisible}
                savedFilters={savedFilters}
                visible={manageFiltersVisible}
            />
        </Fragment>
    );
};

export default SavedFiltersMenu;
