import React, { ReactNode, useCallback, useState } from 'react';
import { Card, Space, Typography } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

import Collapse, { CollapsePanel } from '../../../components/Collapse';
import Empty from '../../../components/Empty';
import ProTable from '../../../components/ProTable';
import {
    IProTableDictionary,
    ProColumnType,
    TColumnStates,
    THeaderConfig,
    TProTableSummary,
} from '../../../components/ProTable/types';

import styles from './index.module.scss';
const { Title } = Typography;

export interface IEntityTable {
    bordered?: boolean;
    columns: ProColumnType[];
    data: any[];
    dictionary?: IProTableDictionary;
    header: React.ReactNode;
    headerConfig?: THeaderConfig<any>;
    id: string;
    initialColumnState?: TColumnStates;
    loading: boolean;
    size?: SizeType;
    title?: string;
    titleExtra?: ReactNode[];
    total?: number;
    summaryColumns?: TProTableSummary[];
    emptyMessage?: string;
}

const EntityTable = ({
    bordered = true,
    columns,
    data,
    dictionary,
    emptyMessage = 'No data available',
    header,
    headerConfig,
    id,
    initialColumnState,
    loading,
    size = 'small',
    summaryColumns = [],
    title,
    titleExtra,
    total = 0,
}: IEntityTable): React.ReactElement => {
    const [scroll, setScroll] = useState<{ y: number } | undefined>(undefined);

    const tableRef = useCallback(
        (node: any) => {
            const height = node?.clientHeight ?? 0;
            if (height > 400) {
                setScroll({ y: 400 });
            }
        },
        [loading, data],
    );

    return (
        <div className={styles.container} id={id}>
            {title && (
                <Title className={styles.title} level={4}>
                    {title}
                </Title>
            )}
            <Collapse arrowIcon="caretFilled" className={styles.collapse} defaultActiveKey={['1']}>
                <CollapsePanel
                    className={styles.panel}
                    extra={titleExtra}
                    header={
                        <Space size={2}>
                            {header} {total > 0 && <span>({total})</span>}
                        </Space>
                    }
                    key="1"
                >
                    <Card className={styles.card} loading={loading}>
                        {!loading && data.length ? (
                            <ProTable
                                bordered={bordered}
                                columns={columns}
                                dataSource={data}
                                dictionary={dictionary}
                                headerConfig={{
                                    hideItemsCount: true,
                                    itemCount: {
                                        pageIndex: 0,
                                        pageSize: 0,
                                        total: 0,
                                    },
                                    ...headerConfig,
                                }}
                                initialColumnState={initialColumnState}
                                loading={loading}
                                rowClassName={styles.notStriped}
                                scroll={scroll}
                                size={size}
                                summaryColumns={summaryColumns}
                                tableHeaderClassName={styles.tableHeader}
                                tableId={id}
                                tableRef={tableRef}
                                wrapperClassName={styles.contentTable}
                            />
                        ) : (
                            <Space className={styles.content} direction="vertical" size={12}>
                                <Empty
                                    align="left"
                                    description={emptyMessage}
                                    noPadding
                                    showImage={false}
                                    size="mini"
                                />
                            </Space>
                        )}
                    </Card>
                </CollapsePanel>
            </Collapse>
        </div>
    );
};

export default EntityTable;
