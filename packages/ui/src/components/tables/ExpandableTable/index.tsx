import React, { ReactElement, useState } from 'react';
import { Popover, Space, Table, Tooltip, Typography } from 'antd';
import { TableProps } from 'antd/lib/table';

import { ProColumnType, ProColumnTypes } from '../../ProTable/types';

import styles from './index.module.scss';

export type TExpandableTableProps = TableProps<any> & {
    nOfElementsWhenCollapsed?: number;
    buttonText: (showAll: boolean, hiddenNum: number) => ReactElement | string;
    columns?: ProColumnTypes[];
};

const DEFAULT_NUM_COLLAPSED = 5;

const ExpandableTable = ({
    buttonText,
    nOfElementsWhenCollapsed = DEFAULT_NUM_COLLAPSED,
    dataSource,
    columns,
    ...tableProps
}: TExpandableTableProps) => {
    const [showAll, setShowAll] = useState(false);
    const dataTotalLength = dataSource?.length || 0;
    const sliceNum = showAll ? dataTotalLength : nOfElementsWhenCollapsed;
    const showButton = dataTotalLength > nOfElementsWhenCollapsed;
    const hiddenNum = dataTotalLength - sliceNum;

    const getColumnTitleOrTooltip = (column: ProColumnTypes) => {
        const titleToUse = column.iconTitle || column.title;
        let title = column.tooltip ? <span style={{ borderBottom: '1px dotted' }}>{titleToUse}</span> : titleToUse;
        title =
            column.icon && !column.iconTitle ? (
                <Space size={3}>
                    {column.icon} {title}
                </Space>
            ) : (
                title
            );
        title = column.tooltip ? <Tooltip title={column.tooltip}>{title}</Tooltip> : title;
        title = column.popoverProps ? <Popover {...column.popoverProps}>{column.title}</Popover> : title;
        return { ...column, title } as ProColumnType;
    };

    return (
        <>
            <Table
                {...tableProps}
                columns={columns?.map(getColumnTitleOrTooltip)}
                dataSource={(dataSource || []).slice(0, sliceNum)}
            />
            {showButton && (
                <Typography.Link className={styles.fuiExpandableTableBtn} onClick={() => setShowAll(!showAll)}>
                    {buttonText(showAll, hiddenNum)} {showAll ? '-' : '+'}
                </Typography.Link>
            )}
        </>
    );
};

export default ExpandableTable;
