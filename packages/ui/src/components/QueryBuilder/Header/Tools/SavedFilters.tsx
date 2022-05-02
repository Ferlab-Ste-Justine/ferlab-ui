import React, { ReactNode } from 'react';
import { Dropdown, Menu, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { IDictionary, ISavedFilter, TOnSavedFilterChange } from '../../types';

interface OwnProps {
    selectedKey: string;
    isDirty: boolean;
    dictionary?: IDictionary;
    savedFilters?: ISavedFilter[];
    onSavedFilterChange: TOnSavedFilterChange;
    children: ReactNode;
}

const SavedFiltersMenu = ({
    selectedKey,
    isDirty,
    dictionary = {},
    savedFilters = [],
    children,
    onSavedFilterChange,
}: OwnProps) => {
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

    return (
        <Dropdown
            overlay={
                <Menu selectedKeys={selectedKey ? [selectedKey] : []} onClick={(e) => e.domEvent.stopPropagation()}>
                    {savedFilters.map((savedFilter: ISavedFilter) => (
                        <Menu.Item
                            key={savedFilter.id}
                            onClick={() => {
                                if (savedFilter.id != selectedKey) {
                                    const callback = () => onSavedFilterChange(savedFilter);

                                    if (isDirty) {
                                        confirmUnsavedChangeForExistingFilter(callback);
                                    } else {
                                        callback();
                                    }
                                }
                            }}
                        >
                            {savedFilter.title}
                        </Menu.Item>
                    ))}
                    {false && (
                        <>
                            <Menu.Divider />
                            <Menu.Item
                                key="manage-my-filters"
                                onClick={() => console.log('Manage filters option currently disabled')}
                            >
                                {dictionary.queryBuilderHeader?.myFiltersDropdown?.manageMyFilter ||
                                    'Manage my filters'}
                            </Menu.Item>
                        </>
                    )}
                </Menu>
            }
            disabled={savedFilters.length == 0}
            trigger={['click']}
        >
            {children}
        </Dropdown>
    );
};

export default SavedFiltersMenu;
