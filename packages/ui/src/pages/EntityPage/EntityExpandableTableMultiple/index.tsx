import React from 'react';
import { Card, Space, Typography } from 'antd';

import Collapse, { CollapsePanel } from '../../../components/Collapse';
import Empty from '../../../components/Empty';
import ExpandableTable from '../../../components/tables/ExpandableTable';
import { IEntityTableMultiple } from '../EntityTableMultiple';

import styles from '../EntityTable/index.module.css';
const { Title } = Typography;

export interface IEntityExpandableTableMultiple extends IEntityTableMultiple {
    dictionary?: {
        hideTranscript: string;
        showTranscript: (count: number) => string;
        noDataAvailable: string;
    };
}

const EntityExpandableTableMultiple = ({
    dictionary,
    direction = 'horizontal',
    header,
    id,
    loading,
    tables = [],
    title,
    titleExtra,
    total = 0,
}: IEntityExpandableTableMultiple): React.ReactElement => (
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
                    <Space align="start" className={styles.content} direction={direction} size={12}>
                        {tables.length > 0 ? (
                            tables.map(({ columns, data, subTitle }, index) => (
                                <div className={styles.contentTable} key={id + index}>
                                    {subTitle}
                                    <ExpandableTable
                                        bordered
                                        buttonText={(showAll, hiddenNum) =>
                                            showAll
                                                ? `${dictionary?.hideTranscript}`
                                                : `${dictionary?.showTranscript(hiddenNum)}`
                                        }
                                        className={styles.contentTable}
                                        columns={columns}
                                        dataSource={data}
                                        nOfElementsWhenCollapsed={1}
                                        pagination={false}
                                        size="small"
                                    />
                                </div>
                            ))
                        ) : (
                            <Empty align="left" description={dictionary?.noDataAvailable} noPadding showImage={false} />
                        )}
                    </Space>
                </Card>
            </CollapsePanel>
        </Collapse>
    </div>
);

export default EntityExpandableTableMultiple;
