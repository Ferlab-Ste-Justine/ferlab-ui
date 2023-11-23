import React, { Fragment, ReactElement, useContext, useState } from 'react';
import { ConfigProvider, List, Modal } from 'antd';
import { formatDistance } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import frCa from 'date-fns/locale/fr-CA';

import ListItemWithActions from '../../../List/ListItemWithActions';
import { QueryBuilderContext } from '../../context';
import { ISavedFilter } from '../../types';

import EditFilterModal from './EditFilterModal';
import { deleteFilterConfirm } from './utils';

import styles from './QueryBuilderHeaderTools.module.scss';

interface OwnProps {
    visible: boolean;
    savedFilters: ISavedFilter[];
    onVisibleChange: (visible: boolean) => void;
    onDeleteFilter: ((filterId: string) => void) | undefined;
    onUpdateFilter: ((filter: ISavedFilter) => void) | undefined;
}

const ManageFiltersModal = ({
    onDeleteFilter,
    onUpdateFilter,
    onVisibleChange,
    savedFilters,
    visible,
}: OwnProps): ReactElement => {
    const { dictionary } = useContext(QueryBuilderContext);
    const { locale } = useContext(ConfigProvider.ConfigContext);
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
            lastSavedAt = formatDistance(new Date(), new Date(filterItem.updated_date), {
                locale: locale?.locale === 'fr' ? frCa : enUS,
            });
        }

        return (
            <ListItemWithActions
                description={
                    lastSavedAt &&
                    (dictionary.queryBuilderHeader?.manageFilters?.lastSavedAt
                        ? dictionary.queryBuilderHeader?.manageFilters?.lastSavedAt.replace('{date}', lastSavedAt)
                        : `Last saved : ${lastSavedAt} ago`)
                }
                onDelete={() =>
                    deleteFilterConfirm({
                        dictionary,
                        onDeleteFilter,
                        savedFilter: item,
                    })
                }
                onEdit={() => showEditModal(item)}
                title={item.title}
            />
        );
    };

    return (
        <Fragment>
            <Modal
                cancelButtonProps={{ style: { display: 'none' } }}
                okText={dictionary.queryBuilderHeader?.manageFilters?.okText || 'Close'}
                onCancel={onDismiss}
                onOk={onDismiss}
                open={visible}
                title={dictionary.queryBuilderHeader?.manageFilters?.modalTitle || 'Manage filters'}
                width={600}
            >
                <List
                    bordered
                    className={styles.QBHManageFiltersList}
                    dataSource={savedFilters}
                    renderItem={getListItem}
                />
            </Modal>
            <EditFilterModal
                initialTitleValue={selectedFilter?.title || ''}
                isNewFilter={false}
                okDisabled={false}
                onCancel={() => setEditModalVisible(false)}
                onSubmit={(title) => {
                    setEditModalVisible(false);
                    if (onUpdateFilter) {
                        onUpdateFilter({
                            ...selectedFilter!,
                            title,
                        });
                    }
                }}
                visible={isEditModalVisible}
            />
        </Fragment>
    );
};

export default ManageFiltersModal;
