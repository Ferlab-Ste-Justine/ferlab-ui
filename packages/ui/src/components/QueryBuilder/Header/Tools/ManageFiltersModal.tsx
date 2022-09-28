import { List, Modal } from 'antd';
import { formatDistance } from 'date-fns';
import React, { Fragment, useContext, useState } from 'react';
import ListItemWithActions from '../../../List/ListItemWithActions';
import { QueryBuilderContext } from '../../context';
import { ISavedFilter } from '../../types';
import EditFilterModal from './EditFilterModal';
import { deleteFilterConfirm } from './utils';

import styles from '@ferlab/style/components/queryBuilder/QueryBuilderHeader.module.scss';

interface OwnProps {
    visible: boolean;
    savedFilters: ISavedFilter[];
    onVisibleChange: (visible: boolean) => void;
    onDeleteFilter: ((filterId: string) => void) | undefined;
    onUpdateFilter: ((filter: ISavedFilter) => void) | undefined;
}

const ManageFiltersModal = ({ visible, savedFilters, onVisibleChange, onDeleteFilter, onUpdateFilter }: OwnProps) => {
    const { dictionary } = useContext(QueryBuilderContext);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<ISavedFilter | undefined>(undefined);

    const onDismiss = () => onVisibleChange(false);
    const showEditModal = (filter: ISavedFilter) => {
        setSelectedFilter(filter);
        setEditModalVisible(true);
    };

    const getListItem = (item: ISavedFilter) => {
        let lastSavedAt: string | undefined = undefined;
        const filterItem = item as ISavedFilter & {
            updated_date: string;
        };

        if (filterItem.updated_date) {
            lastSavedAt = formatDistance(new Date(), new Date(filterItem.updated_date));
        }

        return (
            <ListItemWithActions
                title={item.title}
                description={
                    lastSavedAt &&
                    (dictionary.queryBuilderHeader?.manageFilters?.lastSavedAt
                        ? dictionary.queryBuilderHeader?.manageFilters?.lastSavedAt.replace('{date}', lastSavedAt)
                        : `Last saved: ${lastSavedAt} ago`)
                }
                onEdit={() => showEditModal(item)}
                onDelete={() =>
                    deleteFilterConfirm({
                        dictionary,
                        savedFilter: item,
                        onDeleteFilter,
                    })
                }
            />
        );
    };

    return (
        <Fragment>
            <Modal
                visible={visible}
                onCancel={onDismiss}
                onOk={onDismiss}
                title={dictionary.queryBuilderHeader?.manageFilters?.modalTitle || 'Manage filters'}
                okText={dictionary.queryBuilderHeader?.manageFilters?.okText || 'Close'}
                cancelButtonProps={{ style: { display: 'none' } }}
                width={600}
            >
                <List
                    className={styles.QBHManageFiltersList}
                    bordered
                    dataSource={savedFilters}
                    renderItem={getListItem}
                />
            </Modal>
            <EditFilterModal
                visible={isEditModalVisible}
                onCancel={() => setEditModalVisible(false)}
                initialTitleValue={selectedFilter?.title!}
                okDisabled={false}
                isNewFilter={false}
                onSubmit={(title) => {
                    setEditModalVisible(false);
                    if (onUpdateFilter) {
                        onUpdateFilter({
                            ...selectedFilter!,
                            title,
                        });
                    }
                }}
            />
        </Fragment>
    );
};

export default ManageFiltersModal;
