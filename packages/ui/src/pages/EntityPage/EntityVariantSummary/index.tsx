import { Card, Descriptions, Space } from 'antd';
import React, { ReactNode } from 'react';

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

export const EntityVariantSummary = ({ id, loading, noDataLabel, data }: ISummaryProps): JSX.Element => {
    const detailsBlock1Length = data?.details.block1.items.length || 0;
    const detailsBlock1Col1 = data?.details.block1.items.slice(0, detailsBlock1Length / 2);
    const detailsBlock1Col2 = data?.details.block1.items.slice(detailsBlock1Length / 2, detailsBlock1Length);

    return (
        <div id={id} className={style.summaryWrapper}>
            <Card className={style.card} loading={loading}>
                {data ? (
                    <Space className={style.space} direction="vertical" size={'middle'}>
                        {data.banner && (
                            <div className={style.bannerWrapper}>
                                {data.banner.map((item: IDataItem, index: number) => {
                                    return (
                                        <Space direction="vertical" size={4} key={index}>
                                            <div>{item.label}</div>
                                            <div>{item.value}</div>
                                        </Space>
                                    );
                                })}
                            </div>
                        )}

                        {data.info && (
                            <div className={style.infoWrapper}>
                                {data.info.map((item: ReactNode, index: number) => {
                                    return <div key={index}>{item}</div>;
                                })}
                            </div>
                        )}

                        {data.details && (
                            <div className={style.detailsWrapper}>
                                <div className={style.score}>
                                    <div className={style.detailsTitle}>{data.details.block1.title}</div>
                                    <Space direction="horizontal" size={'middle'}>
                                        <Descriptions column={1}>
                                            {detailsBlock1Col1?.map((item: IDataItem, index: number) => {
                                                return (
                                                    <Descriptions.Item
                                                        label={
                                                            <span className={style.detailsItemLabel}>{item.label}</span>
                                                        }
                                                        key={index}
                                                    >
                                                        <span className={style.detailsItemValue}>{item.value}</span>
                                                    </Descriptions.Item>
                                                );
                                            })}
                                        </Descriptions>
                                        <Descriptions column={1}>
                                            {detailsBlock1Col2?.map((item: IDataItem, index: number) => {
                                                return (
                                                    <Descriptions.Item
                                                        label={
                                                            <span className={style.detailsItemLabel}>{item.label}</span>
                                                        }
                                                        key={index}
                                                    >
                                                        <span className={style.detailsItemValue}>{item.value}</span>
                                                    </Descriptions.Item>
                                                );
                                            })}
                                        </Descriptions>
                                    </Space>
                                </div>
                                <div className={style.geneSplice}>
                                    {data.details.block2.map((detail: IDetailData, index: number) => {
                                        return (
                                            <Descriptions
                                                title={<span className={style.detailsTitle}>{detail.title}</span>}
                                                column={1}
                                                key={index}
                                            >
                                                {detail.items.map((item: IDataItem, index: number) => {
                                                    return (
                                                        <Descriptions.Item
                                                            label={
                                                                <span className={style.detailsItemLabel}>
                                                                    {item.label}
                                                                </span>
                                                            }
                                                            key={index}
                                                        >
                                                            <span className={style.detailsItemValue}>{item.value}</span>
                                                        </Descriptions.Item>
                                                    );
                                                })}
                                            </Descriptions>
                                        );
                                    })}
                                </div>
                                <div className={style.omim}>
                                    <Descriptions
                                        title={<span className={style.detailsTitle}>{data.details.block3.title}</span>}
                                        column={1}
                                    >
                                        {data.details.block3.items.map((item: IDataItem, index: number) => {
                                            return (
                                                <Descriptions.Item key={index}>
                                                    <span className={style.detailsItemValue}>{item.value}</span>
                                                </Descriptions.Item>
                                            );
                                        })}
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
