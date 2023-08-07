import React, { useState } from 'react';
import {
    CopyOutlined,
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    WarningFilled,
} from '@ant-design/icons';
import { Button, Modal, notification, Spin, Typography } from 'antd';

import { openErrorNotification, openSuccessNotification } from '../../../utils/notificationUtils';
import { ISavedFilter } from '../../QueryBuilder/types';
import { addPillToQueryBuilder, removePillFromQueryBuilder } from '../../QueryBuilder/utils/useQueryBuilderState';

import { IQueriesSidebarDictionary } from './index';

import styles from './index.module.scss';

interface IQueryPill {
    queryPill: ISavedFilter;
    dictionary: IQueriesSidebarDictionary;
    queryBuilderId: string;
    editPill: (id: string) => void;
    duplicatePill: (queryPill: ISavedFilter) => any;
    deletePill: (id: string) => any;
    getFiltersByPill: (id: string) => any;
}

const QueryPill = ({
    deletePill,
    dictionary,
    duplicatePill,
    editPill,
    getFiltersByPill,
    queryBuilderId,
    queryPill,
}: IQueryPill): JSX.Element => {
    const [isLoadingFilters, setIsLoadingFilters] = useState<boolean>(false);
    const [api, contextHolder] = notification.useNotification();

    return (
        <div className={styles.queryPillWrapper}>
            {contextHolder}
            <Button
                className={styles.queryPill}
                onClick={() =>
                    addPillToQueryBuilder(
                        { content: queryPill.queries, id: queryPill.id, op: 'and', title: queryPill.title },
                        queryBuilderId,
                    )
                }
            >
                <Typography.Text ellipsis={{ tooltip: queryPill.title }}>{queryPill.title}</Typography.Text>
            </Button>
            <div className={styles.queryPillEditionWrapper}>
                <Button
                    className={styles.queryPillEditionButton}
                    icon={<EditOutlined />}
                    onClick={() => editPill(queryPill.id)}
                    size="small"
                />
                <Button
                    className={styles.queryPillEditionButton}
                    icon={<CopyOutlined />}
                    onClick={async () => {
                        const { error } = await duplicatePill(queryPill);
                        if (error) {
                            openErrorNotification({
                                api,
                                description: dictionary.duplicateCustomPill.notification.error.description,
                                message: dictionary.duplicateCustomPill.notification.error.message,
                            });
                        }
                    }}
                    size="small"
                />
                <Button
                    className={styles.queryPillEditionButton}
                    icon={<DeleteOutlined />}
                    onClick={async () => {
                        setIsLoadingFilters(true);
                        const { data, error } = await getFiltersByPill(queryPill.id);
                        Modal.confirm({
                            cancelText: dictionary.deleteCustomPill.modal.cancelText,
                            className: styles.deleteCustomPillModal,
                            content: (
                                <Spin spinning={isLoadingFilters}>
                                    <Typography.Text>
                                        {dictionary.deleteCustomPill.modal.message.replace('{title}', queryPill.title)}
                                    </Typography.Text>
                                    {(data?.length > 0 || error) && (
                                        <div className={styles.existingFilters}>
                                            <Typography.Text strong>
                                                {dictionary.deleteCustomPill.modal.existingFilters}
                                            </Typography.Text>
                                            {error && (
                                                <div className={styles.error}>
                                                    <WarningFilled className={styles.errorIcon} />
                                                    {dictionary.deleteCustomPill.modal.errorMessage}
                                                </div>
                                            )}
                                            {!error && (
                                                <ul className={styles.list}>
                                                    {data.map((filter: ISavedFilter) => (
                                                        <li key={filter.id}>{filter.title}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                </Spin>
                            ),
                            icon: <ExclamationCircleOutlined className={styles.icon} />,
                            okText: dictionary.deleteCustomPill.modal.okText,
                            onOk: async () => {
                                const { error } = await deletePill(queryPill.id);
                                if (error) {
                                    openErrorNotification({
                                        api,
                                        description: dictionary.deleteCustomPill.notification.error.description,
                                        message: dictionary.deleteCustomPill.notification.error.message,
                                    });
                                } else {
                                    removePillFromQueryBuilder(queryPill.id, queryBuilderId);
                                    openSuccessNotification({
                                        api,
                                        message: dictionary.deleteCustomPill.notification.success,
                                    });
                                }
                            },
                            title: dictionary.deleteCustomPill.modal.title,
                        });
                        setIsLoadingFilters(false);
                    }}
                    size="small"
                />
            </div>
        </div>
    );
};

export default QueryPill;
