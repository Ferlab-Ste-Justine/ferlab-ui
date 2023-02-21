import React from 'react';
import { useContext } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Button, Dropdown, Menu, Modal, Space, Switch } from 'antd';

import { BooleanOperators } from '../../data/sqon/operators';

import AndOperator from './icons/AndOperator';
import OrOperator from './icons/OrOperator';
import { QueryBuilderContext } from './context';

import styles from './QueryTools.module.scss';

export interface IQueryToolsProps {
    queryCount: number;
    onCombineClick: (operator: BooleanOperators) => void;
    onDeleteAll: () => void;
    addNewQuery: () => void;
    setShowLabels: (value: boolean) => void;
}

const QueryTools = ({ addNewQuery, onCombineClick, onDeleteAll, queryCount, setShowLabels }: IQueryToolsProps) => {
    const {
        canCombine,
        dictionary,
        enableCombine,
        enableShowHideLabels,
        enableSingleQuery,
        hasEmptyQuery,
        noQueries,
        showLabels,
    } = useContext(QueryBuilderContext);

    return (
        <Space className={styles.queryTools} direction="horizontal">
            <Space className={styles.leftTools}>
                {!enableSingleQuery && !canCombine && (
                    <Button
                        className={styles.button}
                        disabled={noQueries || hasEmptyQuery}
                        icon={<AiOutlinePlus />}
                        onClick={() => addNewQuery()}
                        size="small"
                        type="primary"
                    >
                        {dictionary.actions?.addQuery || 'New query'}
                    </Button>
                )}
                {enableCombine && canCombine && (
                    <Dropdown.Button
                        className={styles.button}
                        disabled={!canCombine}
                        onClick={() => onCombineClick(BooleanOperators.and)}
                        overlay={
                            <Menu
                                items={[
                                    {
                                        key: BooleanOperators.and,
                                        label: <AndOperator dictionary={dictionary} />,
                                        onClick: () => onCombineClick(BooleanOperators.and),
                                    },
                                    {
                                        key: BooleanOperators.or,
                                        label: <OrOperator dictionary={dictionary} />,
                                        onClick: () => onCombineClick(BooleanOperators.or),
                                    },
                                ]}
                            />
                        }
                        size="small"
                        trigger={['click']}
                        type="primary"
                    >
                        {dictionary.actions?.combine || 'Combine'}
                    </Dropdown.Button>
                )}
                {enableShowHideLabels && !canCombine && (
                    <span className={`${styles.switch} ${styles.withLabel}`}>
                        <Switch checked={showLabels} onChange={(checked) => setShowLabels(checked)} size="small" />
                        <span className={styles.label}>{dictionary.actions?.labels || 'Labels'}</span>
                    </span>
                )}
            </Space>
            <Space className={styles.rightTools}>
                {!noQueries && !canCombine && queryCount > 1 && (
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
            </Space>
        </Space>
    );
};

export default QueryTools;
