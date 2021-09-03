import React from 'react';
import { Typography, Button, Popconfirm } from 'antd';
import { AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai';
import CaretRightIcon from './icons/CaretRightIcon';
import CaretDownIcon from './icons/CaretDownIcon';
import StackLayout from '../../layout/StackLayout';
import { IDictionary } from './types';

import styles from '@ferlab/style/components/queryBuilder/QueryBuilderHeader.module.scss';

interface IQueryBuilderHeaderProps {
    title: string;
    collapsed: boolean;
    showTools: boolean;
    noQueries: boolean;
    hasEmptyQuery: boolean;
    dictionary: IDictionary;
    toggleQb: (toggle: boolean) => void;
    onAddQuery: () => void;
    onDeleteQuery: () => void;
    children: JSX.Element;
}

const { Title } = Typography;

const QueryBuilderHeader = ({
    title,
    collapsed,
    showTools,
    noQueries,
    hasEmptyQuery,
    dictionary = {},
    toggleQb,
    onAddQuery,
    onDeleteQuery,
    children,
}: IQueryBuilderHeaderProps) => (
    <StackLayout vertical className={styles.queryBuilderTogglerContainer}>
        <StackLayout className={`${styles.queryBuilderToggler} ${collapsed && styles.togglerClosed}`}>
            <StackLayout className={styles.leftTools}>
                <a className={styles.togglerIcon} onClick={() => toggleQb(!collapsed)}>
                    {collapsed ? <CaretRightIcon /> : <CaretDownIcon />}
                </a>
                <Title level={1} className={styles.togglerTitle}>
                    {title}
                </Title>
            </StackLayout>
            {showTools && (
                <StackLayout className={styles.rightTools}>
                    <Button
                        className={styles.button}
                        disabled={noQueries || hasEmptyQuery}
                        onClick={onAddQuery}
                        size="small"
                        icon={<AiOutlinePlus />}
                    >
                        {dictionary.actions?.new || 'New'}
                    </Button>
                    <Popconfirm
                        arrowPointAtCenter
                        disabled={noQueries && hasEmptyQuery}
                        cancelText={dictionary.actions?.delete?.cancel || 'Cancel'}
                        okText={dictionary.actions?.delete?.confirm || 'Delete'}
                        onConfirm={onDeleteQuery}
                        placement="topRight"
                        title={dictionary.actions?.delete?.titleSelected || 'Delete the selected query?'}
                    >
                        <Button disabled={noQueries && hasEmptyQuery} className={styles.button} size="small" icon={<AiOutlineDelete />}>
                            {dictionary.actions?.delete || 'Delete'}
                        </Button>
                    </Popconfirm>
                </StackLayout>
            )}
        </StackLayout>
        {!collapsed && children}
    </StackLayout>
);

export default QueryBuilderHeader;
