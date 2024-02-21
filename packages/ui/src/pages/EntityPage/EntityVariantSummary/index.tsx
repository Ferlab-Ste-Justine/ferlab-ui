import React, { ReactNode } from 'react';
import { Card, Descriptions, Space } from 'antd';

import Empty from '../../../components/Empty';

import style from './index.module.scss';

export interface IDataItem {
    label: ReactNode;
    value: ReactNode;
}

export interface IDetailData {
    title: string;
    items: IDataItem[];
}

export interface IVariantSummaryData {
    banner: IDataItem[];
    info: ReactNode[];
    details: {
        block1: IDetailData;
        block2: IDetailData[];
        block3: IDetailData;
    };
}

export interface ISummaryProps {
    id: string;
    loading: boolean;
    noDataLabel: string;
    data?: IVariantSummaryData;
}

export const EntityVariantSummary = ({ data, id, loading, noDataLabel }: ISummaryProps): JSX.Element => {
    const detailsBlock1Length = data?.details.block1.items.length || 0;
    const detailsBlock1Col1 = data?.details.block1.items.slice(0, detailsBlock1Length / 2);
    const detailsBlock1Col2 = data?.details.block1.items.slice(detailsBlock1Length / 2, detailsBlock1Length);

    return (
        <div className={style.summaryWrapper} id={id}>
            <Card className={style.card} loading={loading}>
                {data ? (
                    <Space className={style.space} direction="vertical" size={'middle'}>
                        {data.banner && (
                            <div className={style.bannerWrapper}>
                                {data.banner.map((item: IDataItem, index: number) => (
                                    <Space direction="vertical" key={index} size={4}>
                                        <div>{item.label}</div>
                                        <div>{item.value}</div>
                                    </Space>
                                ))}
                            </div>
                        )}

                        {data.info && (
                            <div className={style.infoWrapper}>
                                {data.info.map((item: ReactNode, index: number) => (
                                    <div key={index}>{item}</div>
                                ))}
                            </div>
                        )}

                        {data.details && (
                            <div className={style.detailsWrapper}>
                                <div className={style.score}>
                                    <div className={style.detailsTitle}>{data.details.block1.title}</div>
                                    <Space direction="horizontal" size={'middle'}>
                                        <Descriptions column={1}>
                                            {detailsBlock1Col1?.map((item: IDataItem, index: number) => (
                                                <Descriptions.Item
                                                    key={index}
                                                    label={<span className={style.detailsItemLabel}>{item.label}</span>}
                                                >
                                                    <span className={style.detailsItemValue}>{item.value}</span>
                                                </Descriptions.Item>
                                            ))}
                                        </Descriptions>
                                        <Descriptions column={1}>
                                            {detailsBlock1Col2?.map((item: IDataItem, index: number) => (
                                                <Descriptions.Item
                                                    key={index}
                                                    label={<span className={style.detailsItemLabel}>{item.label}</span>}
                                                >
                                                    <span className={style.detailsItemValue}>{item.value}</span>
                                                </Descriptions.Item>
                                            ))}
                                        </Descriptions>
                                    </Space>
                                </div>
                                <div className={style.geneSplice}>
                                    {data.details.block2.map((detail: IDetailData, index: number) => (
                                        <Descriptions
                                            column={1}
                                            key={index}
                                            title={<span className={style.detailsTitle}>{detail.title}</span>}
                                        >
                                            {detail.items.map((item: IDataItem, index: number) => (
                                                <Descriptions.Item
                                                    key={index}
                                                    label={<span className={style.detailsItemLabel}>{item.label}</span>}
                                                >
                                                    <span className={style.detailsItemValue}>{item.value}</span>
                                                </Descriptions.Item>
                                            ))}
                                        </Descriptions>
                                    ))}
                                </div>
                                <div className={style.omim}>
                                    <Descriptions
                                        column={1}
                                        title={<span className={style.detailsTitle}>{data.details.block3.title}</span>}
                                    >
                                        {data.details.block3.items.map((item: IDataItem, index: number) => (
                                            <Descriptions.Item key={index}>
                                                <span className={style.detailsItemValue}>{item.value}</span>
                                            </Descriptions.Item>
                                        ))}
                                    </Descriptions>
                                </div>
                            </div>
                        )}
                    </Space>
                ) : (
                    <Empty align="left" description={noDataLabel} noPadding showImage={false} />
                )}
            </Card>
        </div>
    );
};

export default EntityVariantSummary;
