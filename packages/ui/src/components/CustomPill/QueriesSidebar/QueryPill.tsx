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

import { IQueriesSidebarDictionary } from './index';

import styles from './index.module.scss';

interface IQueryPill {
    queryPill: ISavedFilter;
    dictionary: IQueriesSidebarDictionary;
    addPillToQuery: (id: string) => void;
    editPill: (id: string) => void;
    duplicatePill: (id: string) => void;
    deletePill: (id: string) => any;
    getFiltersByPill: (id: string) => any;
}

const QueryPill = ({
    addPillToQuery,
    deletePill,
    dictionary,
    duplicatePill,
    editPill,
    getFiltersByPill,
    queryPill,
}: IQueryPill): JSX.Element => {
    const [isLoadingFilters, setIsLoadingFilters] = useState<boolean>(false);
    const [api, contextHolder] = notification.useNotification();

    return (
        <div className={styles.queryPillWrapper}>
            {contextHolder}
            <Button className={styles.queryPill} onClick={() => addPillToQuery(queryPill.id)}>
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
                    onClick={() => duplicatePill(queryPill.id)}
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
                                    //refesh list dans la sidebar
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
