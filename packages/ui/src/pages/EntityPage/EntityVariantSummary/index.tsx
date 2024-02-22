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
        leftSection: IDetailData;
        middleSection: IDetailData[];
        rightSection: IDetailData;
    };
}

export interface ISummaryProps {
    id: string;
    loading: boolean;
    noDataLabel: string;
    data?: IVariantSummaryData;
}

export const EntityVariantSummary = ({ data, id, loading, noDataLabel }: ISummaryProps): JSX.Element => {
    const detailsLeftSectionLength = data?.details.leftSection.items.length || 0;
    const detailsLeftSectionCol1 = data?.details.leftSection.items.slice(0, detailsLeftSectionLength / 2);
    const detailsLeftSectionCol2 = data?.details.leftSection.items.slice(
        detailsLeftSectionLength / 2,
        detailsLeftSectionLength,
    );

    return (
        <div className={style.summaryWrapper} id={id}>
            <Card className={style.card} loading={loading}>
                {data ? (
                    <Space className={style.space} direction="vertical" size="middle">
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
                                    <div className={style.detailsTitle}>{data.details.leftSection.title}</div>
                                    <Space direction="horizontal" size="middle">
                                        <Descriptions column={1}>
                                            {detailsLeftSectionCol1?.map((item: IDataItem, index: number) => (
                                                <Descriptions.Item
                                                    key={index}
                                                    label={<span className={style.detailsItemLabel}>{item.label}</span>}
                                                >
                                                    <span className={style.detailsItemValue}>{item.value}</span>
                                                </Descriptions.Item>
                                            ))}
                                        </Descriptions>
                                        <Descriptions column={1}>
                                            {detailsLeftSectionCol2?.map((item: IDataItem, index: number) => (
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
                                    {data.details.middleSection.map((detail: IDetailData, index: number) => (
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
                                        title={
                                            <span className={style.detailsTitle}>
                                                {data.details.rightSection.title}
                                            </span>
                                        }
                                    >
                                        {data.details.rightSection.items.map((item: IDataItem, index: number) => (
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
