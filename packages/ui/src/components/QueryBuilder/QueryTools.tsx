import React from 'react';
import { Button, Dropdown, Menu, Modal, Switch } from 'antd';
import { AiOutlinePlus } from 'react-icons/ai';
import AndOperator from './icons/AndOperator';
import OrOperator from './icons/OrOperator';
import { IDictionary } from './types';

import StackLayout from '../../layout/StackLayout';

import styles from '@ferlab/style/components/queryBuilder/QueryTools.module.scss';
import { BooleanOperators } from '../../data/sqon/operators';

export interface IQueryToolsProps {
    dictionary?: IDictionary;
    showLabels: boolean;
    queryCount: number;
    noQueries: boolean;
    enableSingleQuery: boolean;
    canCombine: boolean;
    enableCombine: boolean;
    hasEmptyQuery: boolean;
    enableShowHideLabels: boolean;
    onCombineClick: (operator: BooleanOperators) => void;
    onDeleteAll: () => void;
    addNewQuery: () => void;
    setShowLabels: (value: boolean) => void;
}

const QueryTools = ({
    dictionary = {},
    addNewQuery,
    onDeleteAll,
    onCombineClick,
    setShowLabels,
    queryCount,
    showLabels = false,
    noQueries,
    enableSingleQuery,
    canCombine,
    enableCombine,
    hasEmptyQuery,
    enableShowHideLabels,
}: IQueryToolsProps) => {
    return (
        <StackLayout className={styles.queryTools}>
            <StackLayout className={styles.leftTools}>
                {!enableSingleQuery && !canCombine && (
                    <Button
                        className={styles.button}
                        type="primary"
                        disabled={noQueries || hasEmptyQuery}
                        onClick={() => addNewQuery()}
                        size="small"
                        icon={<AiOutlinePlus />}
                    >
                        {dictionary.actions?.addQuery || 'New query'}
                    </Button>
                )}
                {enableCombine && canCombine && (
                    <Dropdown.Button
                        className={styles.button}
                        disabled={!canCombine}
                        type="primary"
                        size="small"
                        overlay={
                            <Menu>
                                <Menu.Item
                                    key={BooleanOperators.and}
                                    onClick={() => onCombineClick(BooleanOperators.and)}
                                >
                                    <AndOperator />
                                </Menu.Item>
                                <Menu.Item
                                    key={BooleanOperators.or}
                                    onClick={() => onCombineClick(BooleanOperators.or)}
                                >
                                    <OrOperator />
                                </Menu.Item>
                            </Menu>
                        }
                        trigger={['click']}
                        onClick={() => onCombineClick(BooleanOperators.and)}
                    >
                        {dictionary.actions?.combine || 'Combine'}
                    </Dropdown.Button>
                )}
                {enableShowHideLabels && !canCombine && (
                    <span className={`${styles.switch} ${styles.withLabel}`}>
                        <Switch checked={showLabels} size="small" onChange={(checked) => setShowLabels(checked)} />
                        <span className={styles.label}>{dictionary.actions?.labels || 'Labels'}</span>
                    </span>
                )}
            </StackLayout>
            <StackLayout className={styles.rightTools}>
                {!noQueries && !canCombine && queryCount > 1 &&  (
                    <Button
                        className={styles.button}
                        onClick={() =>
                            Modal.confirm({
                                cancelText: dictionary.actions?.clear?.cancel || 'Cancel',
                                content:
                                    dictionary.actions?.clear?.description ||
                                    'You are about to delete all your queries. They will be lost forever.',
                                okText: dictionary.actions?.clear?.confirm || 'Delete',
                                onOk: () => onDeleteAll(),
                                title: dictionary.actions?.clear?.title || 'Delete all queries?',
                            })
                        }
                        size="small"
                        type="link"
                    >
                        {dictionary.actions?.clear?.buttonTitle || 'Clear all'}
                    </Button>
                )}
            </StackLayout>
        </StackLayout>
    );
};

export default QueryTools;
