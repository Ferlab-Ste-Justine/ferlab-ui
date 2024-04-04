import React, { ReactElement } from 'react';
import { Button, Divider, Space } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { IProTableDictionary } from '../types';

import { ItemsCount } from './ItemsCount';
import { SelectedCount } from './SelectedCount';

import styles from './index.module.scss';

interface OwnProps {
    extra?: React.ReactNode[];
    extraSpacing?: number;
    pageIndex: number;
    pageSize: number;
    selectedAllResults?: boolean;
    selectedAllPage?: boolean;
    selectedRowCount?: number;
    total: number;
    hideItemsCount?: boolean;
    dictionary?: IProTableDictionary;
    onSelectAllResults?: () => void;
    onClearSelection?: () => void;
    className?: string;
    extraCountInfo?: React.ReactNode[];
    hasFilter?: boolean;
    clearFilter?: () => void;
}

const TableHeader = ({
    className,
    clearFilter,
    dictionary = {},
    extra = [],
    extraCountInfo = [],
    extraSpacing = 12,
    hasFilter = false,
    hideItemsCount = false,
    onClearSelection,
    onSelectAllResults,
    pageIndex,
    pageSize,
    selectedAllPage = false,
    selectedAllResults = false,
    selectedRowCount = 0,
    total,
}: OwnProps): ReactElement => (
    <div className={className || styles.ProTableHeader}>
        <div>
            {selectedRowCount > 0 ? (
                <SelectedCount
                    dictionnary={dictionary}
                    onClear={onClearSelection}
                    onSelectAll={onSelectAllResults}
                    selectedAllPage={selectedAllPage}
                    selectedAllResults={selectedAllResults}
                    selectedRowCount={selectedRowCount}
                />
            ) : (
                <ItemsCount
                    dictionnary={dictionary}
                    hidden={hideItemsCount}
                    page={pageIndex}
                    size={pageSize}
                    total={total}
                />
            )}
            {extraCountInfo &&
                extraCountInfo.map((element, index) => (
                    <div className={styles.extraCountInfo} key={index}>
                        <Divider type="vertical" />
                        <div>{element}</div>
                    </div>
                ))}

            {hasFilter && clearFilter && (
                <Button
                    className={styles.clearFilterLink}
                    onClick={clearFilter}
                    size="small"
                    type="link"
                    icon={<CloseOutlined />}
                >
                    {dictionary.itemCount?.clearFilters || 'Clear filters'}
                </Button>
            )}
        </div>
        <Space size={extraSpacing}>
            {extra.map((element, index) => (
                <div key={index}>{element}</div>
            ))}
        </Space>
    </div>
);

export default TableHeader;
