import React, { ReactNode } from 'react';
import { Card, Descriptions, DescriptionsProps, Space, Typography } from 'antd';
import cx from 'classnames';

import Empty from '../../../components/Empty';

import style from './index.module.css';

const { Text } = Typography;

export interface IDataItem {
    label: ReactNode;
    value: ReactNode;
}

export interface IDetailData {
    title: ReactNode;
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

type TTheme = 'basic' | 'basic-bordered';

export interface ISummaryProps {
    id: string;
    loading: boolean;
    noDataLabel: string;
    data?: IVariantSummaryData;
    theme?: TTheme;
}

const getDescriptionPropsBasedOnTheme = (theme: TTheme): { delimiter: string; props: DescriptionsProps } => {
    let props: DescriptionsProps = {};
    let delimiter = '';
    switch (theme) {
        case 'basic-bordered':
            props = {
                bordered: true,
                className: style.basicBordered,
            };
            delimiter = ':';
            break;
        default:
            props = {
                bordered: false,
            };
            break;
    }

    return { delimiter, props };
};

const formatLabel = (label: ReactNode, delimiter = ''): ReactNode =>
    delimiter ? (
        <>
            {label} {delimiter}
        </>
    ) : (
        label
    );

export const EntityVariantSummary = ({
    data,
    id,
    loading,
    noDataLabel,
    theme = 'basic',
}: ISummaryProps): JSX.Element => {
    let detailsLeftSectionLength = data?.details.leftSection.items.length || 0;
    if (detailsLeftSectionLength % 2 != 0) detailsLeftSectionLength++;
    const detailsLeftSectionCol1 = data?.details.leftSection.items.slice(0, detailsLeftSectionLength / 2);
    const detailsLeftSectionCol2 = data?.details.leftSection.items.slice(
        detailsLeftSectionLength / 2,
        detailsLeftSectionLength,
    );
    const { delimiter, props: descriptionProps } = getDescriptionPropsBasedOnTheme(theme);
    console.log('delimiter', delimiter); //TODO: to remove

    return (
        <div className={style.summaryWrapper} id={id}>
            <Card className={style.card} loading={loading}>
                {data ? (
                    <Space className={style.space} direction="vertical" size="middle">
                        {data.banner && (
                            <div className={style.bannerWrapper}>
                                {data.banner.map((item: IDataItem, index: number) => (
                                    <Space direction="vertical" key={index} size={4}>
                                        <div>
                                            <Text type="secondary">{formatLabel(item.label, delimiter)}</Text>
                                        </div>
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
                                    <div className={style.leftSection}>
                                        <Descriptions {...descriptionProps} column={1}>
                                            {detailsLeftSectionCol1?.map((item: IDataItem, index: number) => (
                                                <Descriptions.Item
                                                    key={index}
                                                    label={
                                                        <Text type="secondary">
                                                            {formatLabel(item.label, delimiter)}
                                                        </Text>
                                                    }
                                                >
                                                    {item.value}
                                                </Descriptions.Item>
                                            ))}
                                        </Descriptions>
                                        <Descriptions {...descriptionProps} column={1}>
                                            {detailsLeftSectionCol2?.map((item: IDataItem, index: number) => (
                                                <Descriptions.Item
                                                    key={index}
                                                    label={
                                                        <Text type="secondary">
                                                            {formatLabel(item.label, delimiter)}
                                                        </Text>
                                                    }
                                                >
                                                    {item.value}
                                                </Descriptions.Item>
                                            ))}
                                        </Descriptions>
                                    </div>
                                </div>
                                <div className={style.geneSplice}>
                                    {data.details.middleSection.map((detail: IDetailData, index: number) => (
                                        <Descriptions
                                            {...descriptionProps}
                                            className={cx(style.detailsItem, {
                                                [style.basicBordered]: theme === 'basic-bordered',
                                            })}
                                            column={1}
                                            key={index}
                                            title={<span className={style.detailsTitle}>{detail.title}</span>}
                                        >
                                            {detail.items.map((item: IDataItem, index: number) => (
                                                <Descriptions.Item
                                                    key={index}
                                                    label={
                                                        <span>
                                                            {
                                                                <Text type="secondary">
                                                                    {formatLabel(item.label, delimiter)}
                                                                </Text>
                                                            }
                                                        </span>
                                                    }
                                                >
                                                    <span className={style.detailsItemValue}>{item.value}</span>
                                                </Descriptions.Item>
                                            ))}
                                        </Descriptions>
                                    ))}
                                </div>
                                <div className={style.omim}>
                                    <Descriptions
                                        {...descriptionProps}
                                        column={1}
                                        title={
                                            <span className={style.detailsTitle}>
                                                {data.details.rightSection.title}
                                            </span>
                                        }
                                    >
                                        {data.details.rightSection.items.map((item: IDataItem, index: number) => (
                                            <Descriptions.Item key={index} label={item.label}>
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
