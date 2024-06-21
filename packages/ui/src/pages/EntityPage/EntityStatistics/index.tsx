import React, { ReactNode } from 'react';
import { TDownloadDictionary } from '@ferlab/ui/layout/ResizableGridLayout/ResizableGridCard/utils';
import { BarDatum } from '@nivo/bar';
import { LegendProps } from '@nivo/legends';
import { DefaultRawDatum } from '@nivo/pie';
import { Col, Row, Space, Typography } from 'antd';
import { isEmpty, uniqBy } from 'lodash';

import BarChart from '../../../components/Charts/Bar';
import PieChart from '../../../components/Charts/Pie';
import Collapse, { CollapsePanel } from '../../../components/Collapse';
import Empty from '../../../components/Empty';
import ResizableGridLayout, { serialize } from '../../../layout/ResizableGridLayout';
import ResizableGridCard from '../../../layout/ResizableGridLayout/ResizableGridCard';
import { mondoDefaultGridConfig, observedPhenotypeDefaultGridConfig } from '../../../layout/ResizableGridLayout/utils';
import { truncateString } from '../../../utils/stringUtils';

import entityTableStyles from '../EntityTable/index.module.css';
import styles from './index.module.css';

const { Title } = Typography;

export const DEFAULT_ENTITY_STATISTIC_DICTIONARY: TEntityStatisticsDictionary = {
    dataCategory: {
        headerTitle: 'Data Category',
        legendAxisBottom: '# of participants',
        legendAxisLeft: 'Data Category',
    },
    dataType: {
        headerTitle: 'Data Type',
        legendAxisBottom: '# of participants',
        legendAxisLeft: 'Data Type',
    },
    demography: {
        ethnicityTitle: 'Ethnicity',
        headerTitle: 'Demography',
        raceTitle: 'Race',
        sexTitle: 'Sex',
    },
    downSyndromeStatus: {
        headerTitle: 'Down Syndrome Status',
    },
    mondo: {
        headerTitle: 'Diagnosis (MONDO)',
        legendAxisBottom: '# of participants',
        legendAxisLeft: 'Diagnosis (MONDO)',
    },
    phenotype: {
        headerTitle: 'Observed Phenotypes (HPO)',
        legendAxisBottom: '# of participants',
        legendAxisLeft: 'Observed Phenotypes (HPO)',
    },
    sampleAvailability: {
        headerTitle: 'Sample Availability',
    },
    sampleType: {
        headerTitle: 'Sample Type',
    },
};

type TEntityStatisticsDictionary = {
    download?: TDownloadDictionary;
    phenotype: {
        headerTitle: string;
        legendAxisLeft: string;
        legendAxisBottom: string;
    };
    mondo: {
        headerTitle: string;
        legendAxisLeft: string;
        legendAxisBottom: string;
    };
    demography: {
        headerTitle: string;
        sexTitle: string;
        ethnicityTitle: string;
        raceTitle: string;
    };
    downSyndromeStatus: {
        headerTitle: string;
    };
    sampleType: {
        headerTitle: string;
    };
    sampleAvailability: {
        headerTitle: string;
    };
    dataCategory: {
        headerTitle: string;
        legendAxisLeft: string;
        legendAxisBottom: string;
    };
    dataType: {
        headerTitle: string;
        legendAxisLeft: string;
        legendAxisBottom: string;
    };
};

type TStatisticFilter = {
    total?: number;
    unique?: boolean;
    excludeZeroValue?: boolean;
    excludes?: string[];
};

type TStatisticBarChart = {
    loading: boolean;
    data: BarDatum[];
    filter?: TStatisticFilter;
};

type TStatisticPieChart = {
    loading: boolean;
    data: DefaultRawDatum[];
    filter?: TStatisticFilter;
};

type TStatistic = {
    phenotype: TStatisticBarChart;
    mondo: TStatisticBarChart;
    demography: {
        loading: boolean;
        sex: DefaultRawDatum[];
        race: DefaultRawDatum[];
        ethnicity: DefaultRawDatum[];
    };
    dataCategory: TStatisticBarChart;
    dataType: TStatisticBarChart;
    downSyndromeStatus: TStatisticPieChart;
    sampleType: TStatisticPieChart;
    sampleAvailability: TStatisticPieChart;
};

export interface IEntityStatistics {
    id: string;
    title?: string;
    titleExtra?: ReactNode[];
    loading: boolean;
    header: string;
    statistic: TStatistic;
    dictionary: TEntityStatisticsDictionary;
}

const resizableCardCommonsSettings = {
    closeHandle: false,
    downloadSettings: {
        png: true,
        svg: true,
        tsv: true,
    },
    withHandle: false,
};

const pieChartCommonsSettings = {
    margin: {
        bottom: 0,
        left: 12,
        right: 12,
        top: 0,
    },
};

const graphModalSettings = {
    margin: {
        bottom: 116,
        left: 12,
        right: 12,
        top: -32,
    },
};

const singlePieModalSetting = {
    legends: [
        {
            anchor: 'bottom',
            direction: 'column',
            itemHeight: 15,
            itemsSpacing: 2,
            itemWidth: 100,
            translateX: -310,
            translateY: 92,
        },
    ] as LegendProps[],
    margin: {
        bottom: 96,
        left: 12,
        right: 12,
        top: 12,
    },
};

const barCharCommonsSettings = {
    tooltipLabel: (node: any) => node.data.label,
};

const applyFilter = ({ data, filter }: TStatisticBarChart | TStatisticPieChart, key = 'id') => {
    if (!filter) {
        return data;
    }

    let result = data as any[];

    if (filter.excludeZeroValue) {
        result = result.filter((item) => item.value > 0);
    }

    if (filter.excludes) {
        result = result.filter((item) => !filter.excludes?.includes((item as any)[key]));
    }

    if (filter.unique) {
        result = uniqBy(result, key);
    }

    if (filter.total) {
        result = result.slice(0, filter.total);
    }

    return result;
};

const LEGEND_ITEM_HEIGHT = 18;

const getStatisticLayouts = (statistic: TStatistic, dictionary: TEntityStatisticsDictionary) => {
    const phenotypesData = applyFilter(statistic.phenotype, 'label');
    const mondoData = applyFilter(statistic.mondo, 'label');
    const downSyndromeStatusData = applyFilter(statistic.downSyndromeStatus);
    const sampleTypeData = applyFilter(statistic.sampleType);
    const sampleAvailabilityData = applyFilter(statistic.sampleAvailability);
    const dataCategoryData = applyFilter(statistic.dataCategory);
    const dataTypeData = applyFilter(statistic.dataType);

    return [
        // Phenotypes (HPO) (Vertical Bar Chart)
        {
            ...observedPhenotypeDefaultGridConfig,
            base: {
                ...observedPhenotypeDefaultGridConfig.base,
                isDraggable: false,
            },
            component: (
                <ResizableGridCard
                    content={
                        <>
                            {isEmpty(phenotypesData) ? (
                                <Empty imageType="grid" />
                            ) : (
                                <BarChart
                                    axisBottom={{
                                        legend: dictionary.phenotype.legendAxisBottom,
                                        legendOffset: 35,
                                        legendPosition: 'middle',
                                    }}
                                    axisLeft={{
                                        format: (label: string) => {
                                            const title = label
                                                .replace(/\(HP:\d+\)/g, '')
                                                .split('-')
                                                .pop();
                                            return truncateString(title ?? '', 15);
                                        },
                                        legend: dictionary.phenotype.legendAxisLeft,
                                        legendOffset: -125,
                                        legendPosition: 'middle',
                                    }}
                                    data={phenotypesData}
                                    layout="horizontal"
                                    margin={{
                                        bottom: 45,
                                        left: 145,
                                        right: 12,
                                        top: 12,
                                    }}
                                    {...barCharCommonsSettings}
                                />
                            )}
                        </>
                    }
                    dictionary={dictionary.download}
                    gridUID="phenotypes"
                    headerTitle={dictionary.phenotype.headerTitle}
                    loading={statistic.phenotype.loading}
                    loadingType="spinner"
                    modalContent={
                        <BarChart
                            axisBottom={{
                                legend: dictionary.phenotype.legendAxisBottom,
                                legendOffset: 35,
                                legendPosition: 'middle',
                            }}
                            axisLeft={{
                                format: (label: string) => {
                                    const title = label
                                        .replace(/\(HP:\d+\)/g, '')
                                        .split('-')
                                        .pop();
                                    return truncateString(title ?? '', 15);
                                },
                                legend: dictionary.phenotype.legendAxisLeft,
                                legendOffset: -125,
                                legendPosition: 'middle',
                            }}
                            data={phenotypesData}
                            layout="horizontal"
                            margin={{
                                bottom: 45,
                                left: 145,
                                right: 12,
                                top: 12,
                            }}
                            {...barCharCommonsSettings}
                        />
                    }
                    theme="shade"
                    tsvSettings={{
                        contentMap: ['label', 'value'],
                        data: [phenotypesData],
                        headers: ['Value', 'Count'],
                    }}
                    {...resizableCardCommonsSettings}
                />
            ),
            id: 'phenotypes',
            sm: {
                h: 4,
                w: 6,
                x: 0,
                y: 0,
            },
            title: dictionary.phenotype.headerTitle,
        },
        // Mondo (Vertical Bar Chart)
        {
            ...mondoDefaultGridConfig,
            base: {
                ...mondoDefaultGridConfig.base,
                isDraggable: false,
            },
            component: (
                <ResizableGridCard
                    content={
                        <>
                            {isEmpty(mondoData) ? (
                                <Empty imageType="grid" />
                            ) : (
                                <BarChart
                                    axisBottom={{
                                        legend: dictionary.mondo.legendAxisBottom,
                                        legendOffset: 35,
                                        legendPosition: 'middle',
                                    }}
                                    axisLeft={{
                                        format: (label: string) => {
                                            const title = label
                                                .replace(/\(MONDO:\d+\)/g, '')
                                                .split('-')
                                                .pop();
                                            return truncateString(title ?? '', 15);
                                        },
                                        legend: dictionary.mondo.legendAxisLeft,
                                        legendOffset: -125,
                                        legendPosition: 'middle',
                                    }}
                                    data={mondoData}
                                    layout="horizontal"
                                    margin={{
                                        bottom: 45,
                                        left: 145,
                                        right: 12,
                                        top: 12,
                                    }}
                                    {...barCharCommonsSettings}
                                />
                            )}
                        </>
                    }
                    dictionary={dictionary.download}
                    gridUID="mondo"
                    headerTitle={dictionary.mondo.headerTitle}
                    loading={statistic.mondo.loading}
                    loadingType="spinner"
                    modalContent={
                        <BarChart
                            axisBottom={{
                                legend: dictionary.mondo.legendAxisBottom,
                                legendOffset: 35,
                                legendPosition: 'middle',
                            }}
                            axisLeft={{
                                format: (label: string) => {
                                    const title = label
                                        .replace(/\(MONDO:\d+\)/g, '')
                                        .split('-')
                                        .pop();
                                    return truncateString(title ?? '', 15);
                                },
                                legend: dictionary.mondo.legendAxisLeft,
                                legendOffset: -125,
                                legendPosition: 'middle',
                            }}
                            data={mondoData}
                            layout="horizontal"
                            margin={{
                                bottom: 45,
                                left: 145,
                                right: 12,
                                top: 12,
                            }}
                            {...barCharCommonsSettings}
                        />
                    }
                    theme="shade"
                    tsvSettings={{
                        contentMap: ['label', 'value'],
                        data: [mondoData],
                        headers: ['Value', 'Count'],
                    }}
                    {...resizableCardCommonsSettings}
                />
            ),
            id: 'mondo',
            sm: {
                h: 4,
                w: 6,
                x: 6,
                y: 0,
            },
            title: dictionary.mondo.headerTitle,
        },
        // Demography (Pie Chart)
        {
            base: {
                h: 2,
                isDraggable: false,
                isResizable: false,
                minH: 2,
                minW: 4,
                w: 8,
                x: 0,
                y: 4,
            },
            component: (
                <ResizableGridCard
                    content={
                        <Row className={styles.graphRowWrapper} gutter={[12, 24]}>
                            <Col lg={8} md={12} sm={12}>
                                {isEmpty(statistic.demography.sex) ? (
                                    <Empty imageType="grid" />
                                ) : (
                                    <PieChart
                                        data={statistic.demography.sex}
                                        title={dictionary.demography.sexTitle}
                                        {...pieChartCommonsSettings}
                                    />
                                )}
                            </Col>
                            <Col lg={8} md={12} sm={12}>
                                {isEmpty(statistic.demography.race) ? (
                                    <Empty imageType="grid" />
                                ) : (
                                    <PieChart
                                        data={statistic.demography.race}
                                        title={dictionary.demography.raceTitle}
                                        {...pieChartCommonsSettings}
                                    />
                                )}
                            </Col>
                            <Col lg={8} md={12} sm={12}>
                                {isEmpty(statistic.demography.ethnicity) ? (
                                    <Empty imageType="grid" />
                                ) : (
                                    <PieChart
                                        data={statistic.demography.ethnicity}
                                        title={dictionary.demography.ethnicityTitle}
                                        {...pieChartCommonsSettings}
                                    />
                                )}
                            </Col>
                        </Row>
                    }
                    dictionary={dictionary.download}
                    gridUID="demography"
                    headerTitle={dictionary.demography.headerTitle}
                    loading={statistic.demography.loading}
                    loadingType="spinner"
                    modalContent={
                        <Row className={styles.graphRowWrapper} gutter={[12, 24]}>
                            <Col lg={8} md={12} sm={12}>
                                {isEmpty(statistic.demography.sex) ? (
                                    <Empty imageType="grid" />
                                ) : (
                                    <PieChart
                                        data={statistic.demography.sex}
                                        legends={[
                                            {
                                                anchor: 'bottom',
                                                direction: 'column',
                                                itemHeight: LEGEND_ITEM_HEIGHT,
                                                itemWidth: 100,
                                                translateX: 0,
                                                translateY:
                                                    (LEGEND_ITEM_HEIGHT * statistic.demography.sex.length - 1) / 2,
                                            },
                                        ]}
                                        {...graphModalSettings}
                                    />
                                )}
                            </Col>
                            <Col lg={8} md={12} sm={12}>
                                {isEmpty(statistic.demography.race) ? (
                                    <Empty imageType="grid" />
                                ) : (
                                    <PieChart
                                        data={statistic.demography.race}
                                        legends={[
                                            {
                                                anchor: 'bottom',
                                                direction: 'column',
                                                itemHeight: LEGEND_ITEM_HEIGHT,
                                                itemWidth: 100,
                                                translateX: 0,
                                                translateY:
                                                    (LEGEND_ITEM_HEIGHT * statistic.demography.race.length - 1) / 2,
                                            },
                                        ]}
                                        {...graphModalSettings}
                                    />
                                )}
                            </Col>
                            <Col lg={8} md={12} sm={12}>
                                {isEmpty(statistic.demography.ethnicity) ? (
                                    <Empty imageType="grid" />
                                ) : (
                                    <PieChart
                                        data={statistic.demography.ethnicity}
                                        legends={[
                                            {
                                                anchor: 'bottom',
                                                direction: 'column',
                                                itemHeight: LEGEND_ITEM_HEIGHT,
                                                itemWidth: 100,
                                                translateX: 0,
                                                translateY:
                                                    (LEGEND_ITEM_HEIGHT * statistic.demography.ethnicity.length - 1) /
                                                    2,
                                            },
                                        ]}
                                        {...graphModalSettings}
                                    />
                                )}
                            </Col>
                        </Row>
                    }
                    theme="shade"
                    tsvSettings={{
                        data: [statistic.demography.sex, statistic.demography.race, statistic.demography.ethnicity],
                    }}
                    {...resizableCardCommonsSettings}
                />
            ),
            id: 'demography',
            lg: {
                h: 2,
                w: 8,
                x: 0,
                y: 4,
            },
            md: {
                h: 2,
                w: 6,
                x: 0,
                y: 4,
            },
            sm: {
                h: 3,
                w: 12,
                x: 0,
                y: 4,
            },
            title: dictionary.demography.headerTitle,
            xs: {
                h: 2,
                w: 6,
                x: 0,
                y: 12,
            },
            xxs: {
                h: 2,
                w: 4,
                x: 0,
                y: 12,
            },
        },
        // Down Syndrome Status (Pie Chart)
        {
            base: {
                h: 2,
                isDraggable: false,
                isResizable: false,
                minH: 2,
                minW: 2,
                w: 2,
                x: 8,
                y: 4,
            },
            component: (
                <ResizableGridCard
                    content={
                        <>
                            {isEmpty(downSyndromeStatusData) ? (
                                <Empty className={styles.empty} imageType="grid" />
                            ) : (
                                <PieChart data={downSyndromeStatusData} {...pieChartCommonsSettings} />
                            )}
                        </>
                    }
                    dictionary={dictionary.download}
                    gridUID="down_syndrome"
                    headerTitle={dictionary.downSyndromeStatus.headerTitle}
                    loading={statistic.downSyndromeStatus.loading}
                    loadingType="spinner"
                    modalContent={<PieChart data={downSyndromeStatusData} {...singlePieModalSetting} />}
                    theme="shade"
                    titleTruncateThresholdWidth={100}
                    tsvSettings={{
                        data: [downSyndromeStatusData],
                    }}
                    {...resizableCardCommonsSettings}
                />
            ),
            id: 'down_syndrome',
            lg: {
                h: 2,
                w: 2,
                x: 8,
                y: 4,
            },
            md: {
                h: 2,
                w: 2,
                x: 6,
                y: 4,
            },
            sm: {
                h: 3,
                w: 4,
                x: 0,
                y: 7,
            },
            title: dictionary.downSyndromeStatus.headerTitle,
            xs: {
                h: 3,
                w: 6,
                x: 0,
                y: 14,
            },
            xxs: {
                h: 3,
                w: 4,
                x: 0,
                y: 14,
            },
        },
        // Sample Type (Pie Chart)
        {
            base: {
                h: 2,
                isDraggable: false,
                isResizable: false,
                minH: 2,
                minW: 2,
                w: 2,
                x: 10,
                y: 4,
            },
            component: (
                <ResizableGridCard
                    content={
                        <>
                            {isEmpty(sampleTypeData) ? (
                                <Empty className={styles.empty} imageType="grid" />
                            ) : (
                                <PieChart data={sampleTypeData} {...pieChartCommonsSettings} />
                            )}
                        </>
                    }
                    dictionary={dictionary.download}
                    gridUID="sample_type"
                    headerTitle={dictionary.sampleType.headerTitle}
                    loading={statistic.sampleType.loading}
                    loadingType="spinner"
                    modalContent={<PieChart data={sampleTypeData} {...singlePieModalSetting} />}
                    theme="shade"
                    titleTruncateThresholdWidth={100}
                    tsvSettings={{
                        data: [sampleTypeData],
                    }}
                    {...resizableCardCommonsSettings}
                />
            ),
            id: 'sample_type',
            lg: {
                h: 2,
                w: 2,
                x: 10,
                y: 4,
            },
            md: {
                h: 2,
                w: 2,
                x: 8,
                y: 4,
            },
            sm: {
                h: 3,
                w: 4,
                x: 4,
                y: 7,
            },
            title: dictionary.sampleType.headerTitle,
            xs: {
                h: 3,
                w: 6,
                x: 0,
                y: 16,
            },
            xxs: {
                h: 3,
                w: 4,
                x: 0,
                y: 16,
            },
        },
        // Sample Availability (Pie Chart)
        {
            base: {
                h: 2,
                isDraggable: false,
                isResizable: false,
                minH: 2,
                minW: 2,
                w: 2,
                x: 12,
                y: 4,
            },
            component: (
                <ResizableGridCard
                    content={
                        <>
                            {isEmpty(sampleAvailabilityData) ? (
                                <Empty className={styles.empty} imageType="grid" />
                            ) : (
                                <PieChart data={sampleAvailabilityData} {...pieChartCommonsSettings} />
                            )}
                        </>
                    }
                    dictionary={dictionary.download}
                    gridUID="sample_availability"
                    headerTitle={dictionary.sampleAvailability.headerTitle}
                    loading={statistic.sampleAvailability.loading}
                    loadingType="spinner"
                    modalContent={<PieChart data={sampleAvailabilityData} {...singlePieModalSetting} />}
                    theme="shade"
                    titleTruncateThresholdWidth={100}
                    tsvSettings={{
                        data: [sampleAvailabilityData],
                    }}
                    {...resizableCardCommonsSettings}
                />
            ),
            id: 'sample_availability',
            lg: {
                h: 2,
                w: 2,
                x: 12,
                y: 4,
            },
            md: {
                h: 2,
                w: 2,
                x: 10,
                y: 4,
            },
            sm: {
                h: 3,
                w: 4,
                x: 8,
                y: 7,
            },
            title: dictionary.sampleAvailability.headerTitle,
            xs: {
                h: 4,
                w: 6,
                x: 0,
                y: 18,
            },
            xxs: {
                h: 4,
                w: 4,
                x: 0,
                y: 18,
            },
        },
        // Participant by data category (Horizontal Bar Chart)
        {
            base: {
                h: 3,
                isDraggable: false,
                isResizable: false,
                minH: 2,
                minW: 2,
                w: 8,
                x: 0,
                y: 8,
            },
            component: (
                <ResizableGridCard
                    content={
                        <>
                            {isEmpty(dataCategoryData) ? (
                                <Empty imageType="grid" />
                            ) : (
                                <BarChart
                                    axisBottom={{
                                        legend: dictionary.dataCategory.legendAxisBottom,
                                        legendOffset: 35,
                                        legendPosition: 'middle',
                                    }}
                                    axisLeft={{
                                        format: (title: string) => truncateString(title, 15),
                                        legend: dictionary.dataCategory.legendAxisLeft,
                                        legendOffset: -110,
                                        legendPosition: 'middle',
                                    }}
                                    data={dataCategoryData}
                                    layout="horizontal"
                                    margin={{
                                        bottom: 45,
                                        left: 125,
                                        right: 12,
                                        top: 12,
                                    }}
                                    {...barCharCommonsSettings}
                                />
                            )}
                        </>
                    }
                    dictionary={dictionary.download}
                    gridUID="data-category"
                    headerTitle={dictionary.dataCategory.headerTitle}
                    loading={statistic.dataCategory.loading}
                    loadingType="spinner"
                    modalContent={
                        <BarChart
                            axisBottom={{
                                legend: dictionary.dataCategory.legendAxisBottom,
                                legendOffset: 35,
                                legendPosition: 'middle',
                            }}
                            axisLeft={{
                                format: (title: string) => truncateString(title, 15),
                                legend: dictionary.dataCategory.legendAxisLeft,
                                legendOffset: -110,
                                legendPosition: 'middle',
                            }}
                            data={dataCategoryData}
                            layout="horizontal"
                            margin={{
                                bottom: 45,
                                left: 125,
                                right: 12,
                                top: 12,
                            }}
                            {...barCharCommonsSettings}
                        />
                    }
                    theme="shade"
                    tsvSettings={{
                        data: [dataCategoryData],
                    }}
                    {...resizableCardCommonsSettings}
                />
            ),
            id: 'data-category',
            lg: {
                h: 3,
                w: 8,
                x: 0,
                y: 8,
            },
            md: {
                h: 3,
                w: 6,
                x: 0,
                y: 8,
            },
            sm: {
                h: 3,
                w: 6,
                x: 0,
                y: 10,
            },
            title: dictionary.dataCategory.headerTitle,
            xs: {
                h: 4,
                w: 6,
                x: 0,
                y: 18,
            },
            xxs: {
                h: 4,
                w: 4,
                x: 0,
                y: 18,
            },
        },
        // Data Type (Horizontal Bar Chart)
        {
            base: {
                h: 3,
                isDraggable: false,
                isResizable: false,
                minH: 2,
                minW: 2,
                w: 8,
                x: 8,
                y: 6,
            },
            component: (
                <ResizableGridCard
                    content={
                        <>
                            {isEmpty(dataTypeData) ? (
                                <Empty imageType="grid" />
                            ) : (
                                <BarChart
                                    axisBottom={{
                                        legend: dictionary.dataType.legendAxisBottom,
                                        legendOffset: 35,
                                        legendPosition: 'middle',
                                    }}
                                    axisLeft={{
                                        format: (title: string) => truncateString(title, 15),
                                        legend: dictionary.dataType.legendAxisLeft,
                                        legendOffset: -110,
                                        legendPosition: 'middle',
                                    }}
                                    data={dataTypeData}
                                    layout="horizontal"
                                    margin={{
                                        bottom: 45,
                                        left: 125,
                                        right: 12,
                                        top: 12,
                                    }}
                                    {...barCharCommonsSettings}
                                />
                            )}
                        </>
                    }
                    dictionary={dictionary.download}
                    gridUID="data-type"
                    headerTitle={dictionary.dataType.headerTitle}
                    loading={statistic.dataType.loading}
                    loadingType="spinner"
                    modalContent={
                        <BarChart
                            axisBottom={{
                                legend: dictionary.dataType.legendAxisBottom,
                                legendOffset: 35,
                                legendPosition: 'middle',
                            }}
                            axisLeft={{
                                format: (title: string) => truncateString(title, 15),
                                legend: dictionary.dataType.legendAxisLeft,
                                legendOffset: -110,
                                legendPosition: 'middle',
                            }}
                            data={dataTypeData}
                            layout="horizontal"
                            margin={{
                                bottom: 45,
                                left: 125,
                                right: 12,
                                top: 12,
                            }}
                            {...barCharCommonsSettings}
                        />
                    }
                    theme="shade"
                    tsvSettings={{
                        data: [dataTypeData],
                    }}
                    {...resizableCardCommonsSettings}
                />
            ),
            id: 'data-type',
            lg: {
                h: 3,
                w: 8,
                x: 8,
                y: 8,
            },
            md: {
                h: 3,
                w: 6,
                x: 6,
                y: 8,
            },
            sm: {
                h: 3,
                w: 6,
                x: 6,
                y: 10,
            },
            title: 'tbt:data-type',
            xs: {
                h: 4,
                w: 6,
                x: 0,
                y: 18,
            },
            xxs: {
                h: 4,
                w: 4,
                x: 0,
                y: 18,
            },
        },
    ];
};

const EntityStatistics = ({
    dictionary = DEFAULT_ENTITY_STATISTIC_DICTIONARY,
    header,
    id,
    statistic,
    title,
    titleExtra,
}: IEntityStatistics): React.ReactElement => {
    const defaultLayouts = getStatisticLayouts(statistic, dictionary);
    const layouts = serialize(defaultLayouts);

    return (
        <div className={styles.container} id={id}>
            {title && (
                <Title className={styles.title} level={4}>
                    {title}
                </Title>
            )}

            <Collapse arrowIcon="caretFilled" className={entityTableStyles.collapse} defaultActiveKey={['1']}>
                <CollapsePanel className={entityTableStyles.panel} extra={titleExtra} header={header} key="1">
                    <Space className={styles.wrapper} direction="vertical">
                        <ResizableGridLayout
                            cols={{ lg: 16, md: 12, sm: 12, xs: 6, xxs: 4 }}
                            defaultLayouts={defaultLayouts}
                            displayGridSettings={false}
                            layouts={layouts}
                            uid="statistics"
                        />
                    </Space>
                </CollapsePanel>
            </Collapse>
        </div>
    );
};

export default EntityStatistics;
