import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Modal } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React, { Fragment, ReactNode, useContext, useState } from 'react';
import { ISavedFilter, TOnSavedFilterChange } from '../../types';

import styles from '@ferlab/style/components/queryBuilder/QueryBuilderHeaderTools.module.scss';
import { QueryBuilderContext } from '../../context';
import ManageFiltersModal from './ManageFiltersModal';

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
}: OwnProps) => {
    const { dictionary } = useContext(QueryBuilderContext);
    const [manageFiltersVisible, setManageFiltersVisible] = useState(false);

    const confirmUnsavedChangeForExistingFilter = (onOkCallback: Function) => {
        Modal.confirm({
            title: dictionary.queryBuilderHeader?.modal?.confirmUnsaved?.title || 'Unsaved changes',
            icon: <ExclamationCircleOutlined />,
            content:
                dictionary.queryBuilderHeader?.modal?.confirmUnsaved?.openSavedFilter?.content ||
                'You are about to open a saved filter; all modifications will be lost.',
            okText: dictionary.queryBuilderHeader?.modal?.confirmUnsaved?.openSavedFilter?.okText || 'Continue',
            cancelText: dictionary.queryBuilderHeader?.modal?.confirmUnsaved?.openSavedFilter?.cancelText || 'Cancel',
            onOk: () => onOkCallback(),
        });
    };

    const getMenuItems = () => {
        let items: ItemType[] = savedFilters.map((savedFilter: ISavedFilter) => ({
            key: savedFilter.id,
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
            label: savedFilter.title,
        }));

        items.push(
            {
                type: 'divider',
            },
            {
                key: 'manage-my-filters',
                onClick: () => setManageFiltersVisible(true),
                label: dictionary.queryBuilderHeader?.myFiltersDropdown?.manageMyFilter || 'Manage filters',
            },
        );

        return items;
    };

    return (
        <Fragment>
            <Dropdown
                overlayClassName={styles.fuiQBHTSavedFiltersMenu}
                overlay={
                    <Menu
                        selectedKeys={selectedKey ? [selectedKey] : []}
                        onClick={(e) => e.domEvent.stopPropagation()}
                        items={getMenuItems()}
                    />
                }
                disabled={savedFilters.length == 0}
                trigger={['click']}
            >
                {children}
            </Dropdown>
            <ManageFiltersModal
                savedFilters={savedFilters}
                visible={manageFiltersVisible}
                onVisibleChange={setManageFiltersVisible}
                onDeleteFilter={onDeleteFilter}
                onUpdateFilter={onUpdateFilter}
            />
        </Fragment>
    );
};

export default SavedFiltersMenu;
