import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { EditOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';

import { IValueFilter } from '../../../data/sqon/types';
import EditCustomPillModal from '../../CustomPill/QueriesSidebar/EditCustomPillModal';
import { QueryBuilderContext } from '../context';
import { ISavedFilter } from '../types';

import styles from './QueryPill.module.scss';

interface ICustomPillProps {
    valueFilter: IValueFilter;
    onRemove: () => void;
    isBarActive?: boolean;
}

const CustomPill = ({ isBarActive, onRemove, valueFilter }: ICustomPillProps): JSX.Element => {
    const { customPillConfig, queryBuilderId } = useContext(QueryBuilderContext);
    const {
        editMenuItems,
        editPill,
        getFiltersByPill,
        getPillById,
        queryEditionQBId,
        remoteComponentMapping,
        tag,
        validateName,
    } = customPillConfig;
    const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
    const [queryPill, setQueryPill] = useState<ISavedFilter>();

    useEffect(() => {
        const fetchQueryPill = async (id: string) => {
            const data = await getPillById(id);
            setQueryPill(data);
        };

        if (valueFilter.id) {
            fetchQueryPill(valueFilter.id).catch(() => setQueryPill(undefined));
        }
    }, [valueFilter]);

    const color = isBarActive ? styles.activeCustomPill : styles.disableCustomPill;

    return (
        <div className={`${styles.customPillWrapper} ${color}`}>
            <div className={styles.titleWrapper}>
                <Typography.Text className={styles.title}>{valueFilter.title}</Typography.Text>
                <Button
                    className={styles.edit}
                    icon={<EditOutlined />}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpenEditModal(true);
                    }}
                    size="small"
                />
            </div>
            <Button className={styles.close} type="text">
                <AiOutlineClose
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                />
            </Button>
            {isOpenEditModal && queryPill && (
                <EditCustomPillModal
                    editPill={editPill}
                    getFiltersByPill={getFiltersByPill}
                    menuItems={editMenuItems}
                    onCancel={() => setIsOpenEditModal(false)}
                    open={isOpenEditModal}
                    queryBuilderId={queryBuilderId}
                    queryEditionQBId={queryEditionQBId}
                    queryPill={queryPill}
                    remoteComponentMapping={remoteComponentMapping}
                    tag={tag || ''}
                    validateName={validateName}
                />
            )}
        </div>
    );
};

export default CustomPill;
