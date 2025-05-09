import React from 'react';
import { useContext } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Button, Dropdown, Modal, Space, Switch, Tooltip } from 'antd';
import cx from 'classnames';

import AndOrIcon from '../../components/Icons/AndOrIcon';
import { BooleanOperators } from '../../data/sqon/operators';

import AndOperator from './icons/AndOperator';
import OrOperator from './icons/OrOperator';
import { QueryBuilderContext, QueryCommonContext } from './context';

import styles from './QueryTools.module.css';

export interface IQueryToolsProps {
    queryCount: number;
    selectedQueryCount: number;
    onCombineClick: (operator: BooleanOperators) => void;
    enableCompare?: boolean;
    handleCompare?: () => void;
    onDeleteAll: () => void;
    addNewQuery: () => void;
    setShowLabels: (value: boolean) => void;
}

const QueryTools = ({
    addNewQuery,
    enableCompare = false,
    handleCompare,
    onCombineClick,
    onDeleteAll,
    queryCount,
    selectedQueryCount,
    setShowLabels,
}: IQueryToolsProps): JSX.Element => {
    const { canCombine, enableCombine, enableShowHideLabels, enableSingleQuery, hasEmptyQuery, noQueries } =
        useContext(QueryBuilderContext);

    const { dictionary, showLabels } = useContext(QueryCommonContext);
    const isCompareBtnDisabled = selectedQueryCount < 2 || selectedQueryCount > 3;
    const compareTooltips =
        selectedQueryCount < 2 ? dictionary.actions?.compareLessTooltips : dictionary.actions?.compareGreaterTooltips;

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
                    <>
                        <Dropdown.Button
                            className={styles.button}
                            disabled={!canCombine}
                            menu={{
                                items: [
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
                                ],
                            }}
                            onClick={() => onCombineClick(BooleanOperators.and)}
                            size="small"
                            trigger={['click']}
                            type="primary"
                        >
                            {dictionary.actions?.combine || 'Combine'}
                        </Dropdown.Button>
                    </>
                )}

                {enableCompare && handleCompare && (
                    <Tooltip title={isCompareBtnDisabled ? compareTooltips : undefined}>
                        <Button
                            className={cx(styles.button, styles.compare)}
                            disabled={isCompareBtnDisabled}
                            icon={
                                <AndOrIcon
                                    className={cx(styles.andOrIcon, {
                                        [styles.disabled]: isCompareBtnDisabled,
                                    })}
                                />
                            }
                            onClick={handleCompare}
                            size="small"
                        >
                            {dictionary.actions?.compare || 'Compare'}
                        </Button>
                    </Tooltip>
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
