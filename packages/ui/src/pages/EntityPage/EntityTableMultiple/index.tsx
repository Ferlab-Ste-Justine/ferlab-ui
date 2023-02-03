import React from 'react';
import { Card, Space, Typography } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

import Collapse, { CollapsePanel } from '../../../components/Collapse';
import ProTable from '../../../components/ProTable';
import { IProTableDictionary, ProColumnType, TColumnStates, THeaderConfig } from '../../../components/ProTable/types';

import styles from '@ferlab/style/pages/EntityPage/EntityTable.module.scss';
const { Title } = Typography;

export interface IEntityTableMultiple {
    id: string;
    header: React.ReactNode;
    title?: string;
    loading: boolean;
    direction?: 'horizontal' | 'vertical';
    tables: {
        columns: ProColumnType[];
        data: any[];
        subTitle?: string | React.ReactNode;
        dictionary?: IProTableDictionary;
        bordered?: boolean;
        headerConfig?: THeaderConfig<any>;
        initialColumnState?: TColumnStates;
        size?: SizeType;
    }[];
}

const EntityTableMultiple = ({
    header,
    direction = 'horizontal',
    id,
    loading,
    tables = [],
    title,
}: IEntityTableMultiple): React.ReactElement => (
    <div className={styles.container} id={id}>
        {title && (
            <Title className={styles.title} level={4}>
                {title}
            </Title>
        )}
        <Collapse arrowIcon="caretFilled" className={styles.collapse} defaultActiveKey={['1']}>
            <CollapsePanel className={styles.panel} header={header} key="1">
                <Card className={styles.card} loading={loading}>
                    <Space align="start" className={styles.content} direction={direction} size={12}>
                        {tables.map(
                            (
                                {
                                    bordered = true,
                                    columns,
                                    data,
                                    dictionary,
                                    headerConfig,
                                    initialColumnState,
                                    size = 'small',
                                    subTitle,
                                },
                                index,
                            ) => (
                                <div className={styles.contentTable} key={id + index}>
                                    {subTitle && <span className={styles.subTitle}>{subTitle}</span>}
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
                                        size={size}
                                        tableHeaderClassName={styles.tableHeader}
                                        tableId={id + index}
                                    />
                                </div>
                            ),
                        )}
                    </Space>
                </Card>
            </CollapsePanel>
        </Collapse>
    </div>
);

export default EntityTableMultiple;
