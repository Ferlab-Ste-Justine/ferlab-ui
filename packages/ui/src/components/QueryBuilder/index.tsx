import React, { useEffect, useState } from 'react';
import { AiOutlineDown, AiOutlineEye, AiOutlineEyeInvisible, AiOutlinePlus } from 'react-icons/ai';
import { Button, Dropdown, Menu } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { v4 } from 'uuid';

import StackLayout from '../../layout/StackLayout';

import AndOperator from './icons/AndOperator';
import OrOperator from './icons/OrOperator';
import QueryBar from './QueryBar';
import { IDictionary, ISqonGroupFilter, TCallbackRemoveAction, TOnChange } from './types';

import styles from '@ferlab/style/components/queryBuilder/QueryBuilder.module.scss';

export interface IQueryBuilderProps {
    className?: string;
    dictionary?: IDictionary;
    total?: number;
    IconTotal?: React.ReactNode;
    currentQuery?: ISqonGroupFilter | Record<string, never>;
    onRemoveFacet: TCallbackRemoveAction;
    onChangeQuery: TOnChange;
    onUpdate?: (state: IInitialQueryState) => void;
    loading?: boolean;
    enableCombine?: boolean;
    enableSingleQuery?: boolean;
    initialState?: IInitialQueryState;
}

interface IInitialQueryState {
    state: IQueriesState[];
    active: string;
}

interface IQueriesState {
    query: ISqonGroupFilter | Record<string, never>;
    total: number;
    id: string;
}

const getUpdatedState = (state: IQueriesState[], active: string): IInitialQueryState => ({
    active,
    state,
});

const QueryBuilder: React.FC<IQueryBuilderProps> = ({
    className = '',
    dictionary = {},
    total = 0,
    IconTotal = null,
    currentQuery = {},
    onRemoveFacet,
    onChangeQuery,
    onUpdate = (f) => f,
    loading = false,
    enableCombine = false,
    enableSingleQuery = false,
    initialState = {},
}) => {
    const [activeQuery, setActiveQuery] = useState(initialState?.active || v4());
    const [showLabels, setShowLabels] = useState(false);
    const [queries, setQueries] = useState<IQueriesState[]>(initialState?.state || []);
    const [combination, setCombination] = useState<string[]>([]);

    const emptyQueries = queries.filter((obj) => isEmpty(obj.query));
    const noData = queries.length === emptyQueries.length;
    const hasEmptyQuery = emptyQueries.length >= 1;
    const canCombine = queries.filter((obj) => !isEmpty(obj.query)).length >= 2 && combination.length >= 2;

    useEffect(() => {
        if (queries.length > 0) {
            const queryState = queries.find((o) => o.id === activeQuery);
            if (!isEmpty(queryState) && isEmpty(currentQuery)) {
                onChangeQuery(activeQuery, queryState!.query);
            }
        }

        if (isEmpty(queries) && isEmpty(currentQuery) && total === 0) {
            setQueries([{ id: activeQuery, query: currentQuery, total }]);
        }
    }, []);

    useEffect(() => {
        if ((isEmpty(currentQuery) && total === 0) || loading) return;
        if (queries.length === 0) {
            setQueries([{ id: activeQuery, query: currentQuery, total }]);
        } else {
            const tmpQuery = queries.map((obj) => {
                if (obj.id === activeQuery) {
                    return { ...obj, query: currentQuery, total };
                }

                return { ...obj };
            });

            // Manage to remove multiple empty queries and put one at the bottom
            let newQueries = tmpQuery;
            const currentEmptyQueries = tmpQuery.filter((obj) => isEmpty(obj.query));
            if (currentEmptyQueries.length >= 1) {
                const emptyQuery = currentEmptyQueries[0];
                const fullQueries = tmpQuery.filter((obj) => !isEmpty(obj.query));
                newQueries = [...fullQueries, emptyQuery];
            }

            setQueries(newQueries);
        }
    }, [currentQuery, total, loading]);

    useEffect(() => {
        onUpdate(getUpdatedState(queries, activeQuery));
    }, [queries, activeQuery]);
    return (
        <StackLayout className={`${styles.container} ${className}`}>
            <StackLayout className={styles.queryBars} vertical>
                {queries.map((obj, i) => (
                    <QueryBar
                        Icon={IconTotal}
                        actionDisabled={isEmpty(obj.query)}
                        active={obj.id === activeQuery}
                        canDelete={!noData}
                        dictionary={dictionary}
                        id={obj.id}
                        key={obj.id}
                        number={i + 1}
                        onChangeQuery={(id, query) => {
                            setActiveQuery(id);
                            onChangeQuery(id, query);
                        }}
                        onCombineChange={(id, combinator) => {
                            const updatedQueries = [...queries];
                            const currentQueryIndex = queries.findIndex((obj) => obj.id === id);
                            const currentQuery = updatedQueries[currentQueryIndex];
                            const newQuery = { content: currentQuery.query.content, op: combinator };
                            updatedQueries[currentQueryIndex] = { ...currentQuery, query: newQuery };
                            setQueries(updatedQueries);
                            onChangeQuery(id, newQuery);
                        }}
                        onDeleteQuery={(id) => {
                            if (queries.length === 1) {
                                setQueries([{ id, query: {}, total: 0 }]);
                                onChangeQuery('', {});
                                return;
                            }

                            const currentQueryIndex = queries.findIndex((obj) => obj.id === id);
                            const nextSelectedIndex =
                                currentQueryIndex + 1 > queries.length - 1
                                    ? currentQueryIndex - 1 < queries.length
                                        ? currentQueryIndex - 1
                                        : queries.length - 1
                                    : currentQueryIndex + 1;
                            const nextQuery = queries[nextSelectedIndex];
                            const nextID = nextQuery.id;
                            if (combination.includes(id)) {
                                setCombination(combination.filter((cId) => cId !== id));
                            }
                            setQueries(queries.filter((obj) => obj.id !== id));
                            setActiveQuery(nextID);
                            onChangeQuery(nextID, nextQuery.query);
                        }}
                        onDuplicate={(id, query) => {
                            const newId = v4();
                            const oldQuery = queries.filter((obj) => obj.id === id)[0];

                            setActiveQuery(newId);
                            setQueries([...queries, { id: newId, query, total: oldQuery.total }]);
                            onChangeQuery(newId, query);
                        }}
                        onRemoveFacet={onRemoveFacet}
                        onSelectBar={(id, toRemove) => {
                            if (toRemove) {
                                setCombination(combination.filter((cId) => cId !== id));
                                return;
                            }

                            setCombination([...combination, id]);
                        }}
                        query={obj.query}
                        selected={combination.includes(obj.id)}
                        selectionDisabled={queries.length === 1 || !enableCombine}
                        showLabels={showLabels}
                        total={obj.total}
                    />
                ))}
            </StackLayout>
            <StackLayout className={styles.actions}>
                {!enableSingleQuery && (
                    <Button
                        className={styles.buttons}
                        disabled={noData || hasEmptyQuery}
                        onClick={() => {
                            const id = v4();

                            setActiveQuery(id);
                            setQueries([...queries, { id, query: {}, total: 0 }]);
                            onChangeQuery(id, {});
                        }}
                        size="small"
                    >
                        <AiOutlinePlus />
                        {dictionary.actions?.addQuery || 'New query'}
                    </Button>
                )}
                {enableCombine && (
                    <Dropdown
                        disabled={!canCombine}
                        overlay={
                            <Menu>
                                <Menu.Item>
                                    <AndOperator />
                                </Menu.Item>
                                <Menu.Item>
                                    <OrOperator />
                                </Menu.Item>
                            </Menu>
                        }
                        trigger={['click']}
                    >
                        <Button className={styles.buttons} size="small">
                            {dictionary.actions?.combine || 'Combine'} <AiOutlineDown />
                        </Button>
                    </Dropdown>
                )}
                <Button
                    className={styles.buttons}
                    disabled={noData}
                    onClick={() => setShowLabels(!showLabels)}
                    size="small"
                >
                    {showLabels ? (
                        <>
                            <AiOutlineEyeInvisible />
                            {dictionary.actions?.hideLabels || 'Hide labels'}
                        </>
                    ) : (
                        <>
                            <AiOutlineEye />
                            {dictionary.actions?.showLabels || 'Show labels'}
                        </>
                    )}
                </Button>
                {!noData && (
                    <Button
                        className={styles.buttons}
                        onClick={() => {
                            setCombination([]);
                            setQueries([{ id: activeQuery, query: {}, total: 0 }]);
                            onChangeQuery(activeQuery, {});
                        }}
                        size="small"
                        type="link"
                    >
                        {dictionary.actions?.clear || 'Clear all'}
                    </Button>
                )}
            </StackLayout>
        </StackLayout>
    );
};

export default QueryBuilder;
