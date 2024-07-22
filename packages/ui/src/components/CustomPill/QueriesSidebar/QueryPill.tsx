import React, { useContext, useState } from 'react';
import {
    CopyOutlined,
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    WarningFilled,
} from '@ant-design/icons';
import { Button, Modal, Spin, Typography } from 'antd';

import { IRemoteComponent } from '../../../data/sqon/types';
import { QueryCommonContext } from '../../QueryBuilder/context';
import { ISavedFilter } from '../../QueryBuilder/types';
import { addPillToQueryBuilder } from '../../QueryBuilder/utils/useQueryBuilderState';
import { ISidebarMenuItem } from '../../SidebarMenu';

import EditCustomPillModal from './EditCustomPillModal';

import styles from './index.module.css';

interface IQueryPill {
    queryPill: ISavedFilter;
    queryBuilderId: string;
    editMenuItems: ISidebarMenuItem[];
    queryEditionQBId: string;
    tag: string;
    editPill: (queryPill: ISavedFilter, tag: string, queryBuilderId: string) => any;
    editCallback?: () => void;
    duplicatePill: (queryPill: ISavedFilter) => any;
    deletePill: (id: string, queryBuilderId: string) => any;
    getFiltersByPill: (id: string) => any;
    validateName: (title: string, tag: string) => any;
    remoteComponentMapping?: (props: IRemoteComponent) => void;
}

const QueryPill = ({
    deletePill,
    duplicatePill,
    editCallback,
    editMenuItems,
    editPill,
    getFiltersByPill,
    queryBuilderId,
    queryEditionQBId,
    queryPill,
    remoteComponentMapping,
    tag,
    validateName,
}: IQueryPill): JSX.Element => {
    const { dictionary } = useContext(QueryCommonContext);
    const [isLoadingFilters, setIsLoadingFilters] = useState<boolean>(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);

    const deleteCustomPillMessage: string[] = (
        dictionary.queriesSidebar?.deleteCustomPill?.modal?.message ||
        'You are about to delete the custom query "{title}", which may affect your results.'
    ).split('{title}');

    return (
        <div className={styles.queryPillWrapper}>
            <Button
                className={styles.queryPill}
                onClick={() =>
                    addPillToQueryBuilder(
                        { content: queryPill.queries, id: queryPill.id, op: 'and', title: queryPill.title },
                        queryBuilderId,
                    )
                }
            >
                <Typography.Text className={styles.title} ellipsis={{ tooltip: queryPill.title }}>
                    {queryPill.title}
                </Typography.Text>
            </Button>
            <div className={styles.queryPillEditionWrapper}>
                <Button
                    className={styles.queryPillEditionButton}
                    icon={<EditOutlined />}
                    onClick={() => setIsOpenEditModal(true)}
                    size="small"
                />
                <Button
                    className={styles.queryPillEditionButton}
                    icon={<CopyOutlined />}
                    onClick={() => duplicatePill(queryPill)}
                    size="small"
                />
                <Button
                    className={styles.queryPillEditionButton}
                    icon={<DeleteOutlined />}
                    onClick={async () => {
                        setIsLoadingFilters(true);
                        const { data, error } = await getFiltersByPill(queryPill.id);
                        Modal.confirm({
                            cancelText: dictionary.queriesSidebar?.deleteCustomPill?.modal?.cancelText || 'Cancel',
                            className: styles.deleteCustomPillModal,
                            content: (
                                <Spin spinning={isLoadingFilters}>
                                    <Typography.Text>{deleteCustomPillMessage[0]}</Typography.Text>
                                    <Typography.Text strong>{queryPill.title}</Typography.Text>
                                    <Typography.Text>{deleteCustomPillMessage[1]}</Typography.Text>
                                    {(data?.length > 0 || error) && (
                                        <div className={styles.existingFilters}>
                                            <Typography.Text strong>
                                                {dictionary.queriesSidebar?.deleteCustomPill?.modal?.existingFilters ||
                                                    'Affected saved filters:'}
                                            </Typography.Text>
                                            {error && (
                                                <div className={styles.error}>
                                                    <WarningFilled className={styles.errorIcon} />
                                                    {dictionary.queriesSidebar?.deleteCustomPill?.modal?.errorMessage ||
                                                        'We are currently unable to fetch your list of filters.'}
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
                            okText: dictionary.queriesSidebar?.deleteCustomPill?.modal?.okText || 'Delete',
                            onOk: () => {
                                deletePill(queryPill.id, queryBuilderId);
                            },
                            title: dictionary.queriesSidebar?.deleteCustomPill?.modal?.title || 'Delete this query?',
                        });
                        setIsLoadingFilters(false);
                    }}
                    size="small"
                />
            </div>
            {isOpenEditModal && (
                <EditCustomPillModal
                    editCallback={editCallback}
                    editPill={editPill}
                    getFiltersByPill={getFiltersByPill}
                    menuItems={editMenuItems}
                    onCancel={() => setIsOpenEditModal(false)}
                    open={isOpenEditModal}
                    queryBuilderId={queryBuilderId}
                    queryEditionQBId={queryEditionQBId}
                    queryPill={queryPill}
                    remoteComponentMapping={remoteComponentMapping}
                    tag={tag}
                    validateName={validateName}
                />
            )}
        </div>
    );
};

export default QueryPill;
