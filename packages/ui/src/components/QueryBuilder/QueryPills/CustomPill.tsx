import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { EditOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';

import { IValueFilter } from '../../../data/sqon/types';

import styles from './QueryPill.module.scss';

interface ICustomPillProps {
    valueFilter: IValueFilter;
    onEdit: () => void;
    onRemove: () => void;
    isBarActive?: boolean;
}

const CustomPill = ({ isBarActive, onEdit, onRemove, valueFilter }: ICustomPillProps): JSX.Element => {
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
                        onEdit();
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
        </div>
    );
};

export default CustomPill;
