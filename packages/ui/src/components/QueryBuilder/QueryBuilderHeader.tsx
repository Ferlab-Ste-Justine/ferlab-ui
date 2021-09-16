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
    enableSingleQuery: boolean;
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
    enableSingleQuery,
    dictionary = {},
    toggleQb,
    onAddQuery,
    onDeleteQuery,
    children,
}: IQueryBuilderHeaderProps) => (
    <div id="query-builder-header-tools">
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
                        {!enableSingleQuery && (
                            <Button
                                className={styles.button}
                                disabled={noQueries || hasEmptyQuery}
                                onClick={() => {
                                    onAddQuery();
                                    toggleQb(false);
                                }}
                                size="small"
                                icon={<AiOutlinePlus />}
                            >
                                {dictionary.actions?.actionNew || 'New'}
                            </Button>
                        )}
                        <Popconfirm
                            arrowPointAtCenter
                            disabled={noQueries && hasEmptyQuery}
                            cancelText={dictionary.actions?.actionDelete?.cancel || 'Cancel'}
                            okText={dictionary.actions?.actionDelete?.actionConfirm || 'Delete'}
                            onConfirm={onDeleteQuery}
                            placement="topRight"
                            title={dictionary.actions?.actionDelete?.titleSelected || 'Delete the selected query?'}
                            getPopupContainer={() => document.getElementById('query-builder-header-tools')!}
                        >
                            <Button
                                disabled={noQueries && hasEmptyQuery}
                                className={styles.button}
                                onClick={() => toggleQb(false)}
                                size="small"
                                icon={<AiOutlineDelete />}
                            >
                                {dictionary.actions?.actionDelete || 'Delete'}
                            </Button>
                        </Popconfirm>
                    </StackLayout>
                )}
            </StackLayout>
            {!collapsed && children}
        </StackLayout>
    </div>
);

export default QueryBuilderHeader;
