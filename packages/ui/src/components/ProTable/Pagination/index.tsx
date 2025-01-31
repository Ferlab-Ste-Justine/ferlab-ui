import React, { ReactElement } from 'react';
import { DoubleLeftOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Select, Space } from 'antd';

import { IPaginationProps } from '../types';
import { reverseSortDirection } from '../utils';

import { PaginationViewPerQuery } from './constants';
import { getPaginationOptions } from './utils';

import styles from './index.module.css';

const iconSize = 11;

const Pagination = ({
    current,
    customPagination,
    defaultViewPerQuery,
    dictionary,
    loading,
    onChange,
    onPageChange,
    onShowSizeChange,
    onViewQueryChange,
    queryConfig,
    searchAfter,
    setQueryConfig,
    total,
}: IPaginationProps): ReactElement => {
    const isDisabled =
        queryConfig.searchAfter === undefined ||
        total === 0 ||
        queryConfig.firstPageFlag?.toString() === searchAfter?.tail?.toString() ||
        loading;

    return (
        <Space className={styles.pagination}>
            <Select
                defaultValue={defaultViewPerQuery}
                onSelect={(viewPerQuery: PaginationViewPerQuery) => {
                    setQueryConfig({
                        ...queryConfig,
                        firstPageFlag: undefined,
                        operations: undefined,
                        searchAfter: undefined,
                        size: viewPerQuery,
                        sort: queryConfig.operations?.previous ? reverseSortDirection(queryConfig) : queryConfig.sort,
                    });
                    onChange(1, queryConfig.size);
                    onViewQueryChange?.(viewPerQuery);
                    onShowSizeChange();
                }}
                size="small"
            >
                {getPaginationOptions(dictionary?.pagination?.view || '{value} / view', customPagination).map(
                    (option) => (
                        <Select.Option key={option.value} title={''} value={option.value}>
                            {option.label}
                        </Select.Option>
                    ),
                )}
            </Select>

            <Button
                disabled={isDisabled}
                onClick={() => {
                    setQueryConfig({
                        ...queryConfig,
                        operations: undefined,
                        searchAfter: undefined,
                        sort: queryConfig.operations?.previous ? reverseSortDirection(queryConfig) : queryConfig.sort,
                    });

                    onPageChange();
                    onChange(1, queryConfig.size);
                }}
                size="small"
                type="text"
            >
                <DoubleLeftOutlined height={iconSize} />
                {dictionary?.pagination?.first || 'First'}
            </Button>
            <Button
                disabled={isDisabled}
                onClick={() => {
                    setQueryConfig({
                        ...queryConfig,
                        operations: {
                            next: false,
                            previous: true,
                        },
                        searchAfter: searchAfter?.head,
                        sort: queryConfig.operations?.next ? reverseSortDirection(queryConfig) : queryConfig.sort,
                    });

                    onPageChange();
                    onChange(current - 1, queryConfig.size);
                }}
                size="small"
            >
                <LeftOutlined height={iconSize} />
                {dictionary?.pagination?.previous || 'Prev.'}
            </Button>
            <Button
                disabled={total === 0 || total < queryConfig.size || queryConfig.size * current >= total || loading}
                onClick={() => {
                    setQueryConfig({
                        ...queryConfig,
                        operations: {
                            next: true,
                            previous: false,
                        },
                        searchAfter: searchAfter?.tail,
                        sort: queryConfig.operations?.previous ? reverseSortDirection(queryConfig) : queryConfig.sort,
                    });
                    onPageChange();
                    onChange(current + 1, queryConfig.size);
                }}
                size="small"
            >
                {dictionary?.pagination?.next || 'Next'}
                <RightOutlined height={iconSize} />
            </Button>
        </Space>
    );
};

export default Pagination;
