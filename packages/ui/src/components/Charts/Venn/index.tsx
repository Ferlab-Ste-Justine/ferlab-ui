import React, { useCallback, useEffect, useRef } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Divider, Table, Tooltip, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import classnames from 'classnames';
import * as d3 from 'd3';
import d3ToPng from 'd3-svg-to-png';
import { v4 } from 'uuid';

import { DownloadType, fileNameFormatter } from '../../../layout/ResizableGridLayout/ResizableGridCard/utils';
import { numberFormat } from '../../../utils/numberUtils';
import ExternalLinkIcon from '../../ExternalLink/ExternalLinkIcon';

import { ISetOperation, ISummaryData, TOption, TVennChartDictionary } from './utils';
import VennQueryPill from './VennQueryPill';

import styles from './index.module.css';

const MAX_COUNT = 10000;
const PADDING_OFFSET = 24;
const LABELS = ['Q₁', 'Q₂', 'Q₃'];

const EXPORT_SETTINGS = {
    background: 'white',
    quality: 1,
    scale: 2,
};
const DEFAULT_FILENAME_TEMPLATE = '%name-%type-%date%extension';
const DEFAULT_FILENAME_DATE_FORMAT = 'yyyy-MM-dd';

type VennChartProps = {
    analytics: {
        trackVennViewInExploration: () => void;
        trackVennClickOnSections: () => void;
        trackVennViewSet: () => void;
        trackVennViewEntityCounts: (type: string, entityCount: number) => void;
    };
    dictionary: TVennChartDictionary;
    entity: string;
    factor?: number;
    loading?: boolean;
    operations?: ISetOperation[];
    options: TOption[];
    outlineWidth?: number;
    radius?: number;
    setSaveModalOpen: (isOpen: boolean) => void;
    setSelectedSets: (sets: ISetOperation[]) => void;
    setTableSelectedSets: (sets: ISetOperation[]) => void;
    size: {
        width: number;
        height: number;
    };
    summary?: ISummaryData[];
    tableSelectedSets: ISetOperation[];
};

const getSummaryColumns = (
    entity: string,
    options: TOption[],
    dictionary: TVennChartDictionary,
): ColumnsType<ISummaryData> => [
    {
        dataIndex: 'operation',
        key: 'operation',
    },
    {
        dataIndex: 'qbSqon',
        key: 'qbSqon',
        render: (qbSqon) => <VennQueryPill sqon={qbSqon} />,
        title: dictionary.query.column,
    },
    {
        align: 'right',
        key: 'entityCount',
        render: (record) => numberFormat(record.entityCount),
        title: options.find((option) => option.value === entity)?.icon,
        width: 100,
    },
];

const getOperationColumns = ({
    dictionary,
    entity,
    onClick,
    options,
}: {
    entity: string;
    options: TOption[];
    onClick: (record: ISetOperation) => void;
    dictionary: TVennChartDictionary;
}): ColumnsType<ISetOperation> => [
    {
        dataIndex: 'operation',
        key: 'operation',
        title: dictionary.set.column,
        width: 430,
    },
    {
        align: 'right',
        key: 'entityCount',
        render: (record) => numberFormat(record.entityCount),
        title: options.find((option) => option.value === entity)?.icon,
        width: 100,
    },
    {
        key: 'open',
        render: (record) => (
            <Tooltip
                title={
                    record.entityCount > MAX_COUNT
                        ? dictionary.set.max
                        : entity === 'variants'
                        ? dictionary.set.tooltipVariantExplo
                        : dictionary.set.tooltipDataExplo
                }
            >
                <Button
                    className={styles.button}
                    disabled={isEntityCountInvalid(record.entityCount)}
                    icon={<ExternalLinkIcon />}
                    onClick={() => onClick(record)}
                    type="link"
                />
            </Tooltip>
        ),
        width: 32,
    },
];

const isEntityCountInvalid = (entityCount: number): boolean => entityCount === 0 || entityCount > MAX_COUNT;

const VennChart = ({
    analytics,
    dictionary,
    entity,
    factor = 0.75,
    loading,
    operations = [],
    options,
    outlineWidth = 1.5,
    radius = 130,
    setSaveModalOpen,
    setSelectedSets,
    setTableSelectedSets,
    size,
    summary = [],
    tableSelectedSets,
}: VennChartProps): JSX.Element => {
    const ref = useRef<HTMLDivElement>(null);
    const chartId = `venn-chart-${v4()}`;

    const total = useCallback(() => {
        let sum = 0;
        tableSelectedSets.forEach((set) => {
            sum += set.entityCount;
        });
        return sum;
    }, [tableSelectedSets]);

    useEffect(() => {
        if (loading || !ref?.current) return;

        const { height, width } = size;
        const circle1 = `circle1-${v4()}`;
        const circle1out = `circle1_out-${v4()}`;
        const circle2 = `circle2-${v4()}`;
        const circle2out = `circle2_out-${v4()}`;

        const cy = (1.0 / summary.length) * height + PADDING_OFFSET;
        const cx = 0.48 * width;
        const svg = d3.select(`#${chartId}`);
        const defs = svg.append('svg:defs');

        /**
         * Circle1 'Q₁' is placed at the top left
         */
        defs.append('svg:clipPath')
            .attr('id', circle1)
            .append('svg:circle')
            .attr('cx', cx + Math.sin((Math.PI * 300) / 180) * radius * factor)
            .attr('cy', cy - Math.cos((Math.PI * 300) / 180) * radius * factor)
            .attr('r', radius);
        defs.append('svg:clipPath')
            .attr('id', circle1out)
            .append('svg:circle')
            .attr('cx', cx + Math.sin((Math.PI * 300) / 180) * radius * factor)
            .attr('cy', cy - Math.cos((Math.PI * 300) / 180) * radius * factor)
            .attr('r', radius + outlineWidth);
        svg.append('svg:rect')
            .attr('clip-path', `url(#${circle1out})`)
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('class', styles.outline);
        svg.append('svg:rect')
            .attr('id', operations[0].setId)
            .attr('clip-path', `url(#${circle1})`)
            .attr('width', '100%')
            .attr('height', '100%')
            .attr(
                'class',
                classnames(styles.fillColor, { [styles.disabled]: isEntityCountInvalid(operations[0].entityCount) }),
            );
        // Insert 'Q₁' text to the left of Circle1
        svg.append('text')
            .attr('x', cx + Math.sin((Math.PI * 300) / 180) * 2.5 * radius * factor)
            .attr('y', cy - Math.cos((Math.PI * 300) / 180) * 2.5 * radius * factor)
            .attr('text-anchor', 'end')
            .attr('class', styles.legend)
            .text(LABELS[0]);
        // Insert count of Q₁-(Q₂∪Q₃)
        svg.append('text')
            .attr('x', cx + Math.sin((Math.PI * 300) / 180) * 1.1 * radius * factor)
            .attr('y', cy - Math.cos((Math.PI * 300) / 180) * 1.0 * radius * factor)
            .attr('text-anchor', 'end')
            .attr(
                'class',
                classnames(styles.legend, { [styles.disabled]: isEntityCountInvalid(operations[0].entityCount) }),
            )
            .text(numberFormat(operations[0].entityCount));

        /**
         * Circle2 'Q₂' is placed at the top left
         */
        defs.append('svg:clipPath')
            .attr('id', circle2)
            .append('svg:circle')
            .attr('cx', cx + Math.sin((Math.PI * 60) / 180) * radius * factor)
            .attr('cy', cy - Math.cos((Math.PI * 60) / 180) * radius * factor)
            .attr('r', radius);
        defs.append('svg:clipPath')
            .attr('id', circle2out)
            .append('svg:circle')
            .attr('cx', cx + Math.sin((Math.PI * 60) / 180) * radius * factor)
            .attr('cy', cy - Math.cos((Math.PI * 60) / 180) * radius * factor)
            .attr('r', radius + outlineWidth);
        svg.append('svg:rect')
            .attr('clip-path', `url(#${circle2out})`)
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('class', styles.outline);
        svg.append('svg:rect')
            .attr('id', operations[1].setId)
            .attr('clip-path', `url(#${circle2})`)
            .attr('width', '100%')
            .attr('height', '100%')
            .attr(
                'class',
                classnames(styles.fillColor, { [styles.disabled]: isEntityCountInvalid(operations[1].entityCount) }),
            );
        // Insert 'Q₂' text to the right of Circle2
        svg.append('text')
            .attr('x', cx + Math.sin((Math.PI * 60) / 180) * 2.5 * radius * factor)
            .attr('y', cy - Math.cos((Math.PI * 60) / 180) * 2.5 * radius * factor)
            .attr('text-anchor', 'start')
            .attr('class', styles.legend)
            .text(LABELS[1]);
        // Insert count value of Q₂-(Q₁∪Q₃)
        svg.append('text')
            .attr('x', cx + Math.sin((Math.PI * 60) / 180) * 1.1 * radius * factor)
            .attr('y', cy - Math.cos((Math.PI * 60) / 180) * 1.0 * radius * factor)
            .attr('text-anchor', 'start')
            .attr(
                'class',
                classnames(styles.legend, { [styles.disabled]: isEntityCountInvalid(operations[1].entityCount) }),
            )
            .text(numberFormat(operations[1].entityCount));

        /**
         * Intersection 'Q₁∩Q₂' between Circle1 and Circle2
         */
        svg.append('svg:g')
            .attr('clip-path', `url(#${circle1out})`)
            .append('svg:rect')
            .attr('clip-path', `url(#${circle2out})`)
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('class', styles.outline);

        /**
         * When only having two sets, when add the intersection of (Q₁∩Q₂)
         */
        if (summary.length == 2) {
            svg.append('svg:g')
                .attr('clip-path', `url(#${circle1})`)
                .append('svg:rect')
                .attr('id', operations[2].setId)
                .attr('clip-path', `url(#${circle2})`)
                .attr('width', '100%')
                .attr('height', '100%')
                .attr(
                    'class',
                    classnames(styles.fillColor, {
                        [styles.disabled]: isEntityCountInvalid(operations[2].entityCount),
                    }),
                );
            svg.append('text')
                .attr('x', cx + Math.sin((Math.PI * 360) / 180) * 0.85 * radius * factor)
                .attr('y', cy - Math.cos((Math.PI * 360) / 180) * 0.5 * radius * factor)
                .attr('text-anchor', 'middle')
                .attr(
                    'class',
                    classnames(styles.legend, { [styles.disabled]: isEntityCountInvalid(operations[2].entityCount) }),
                )
                .text(numberFormat(operations[2].entityCount));
        }

        /**
         * Add a third set to the operations, (Q₁∩Q₂) is now (Q₁∩Q₂)-Q₃
         */
        if (summary.length == 3) {
            // Insert count value of (Q₁∩Q₂)-Q₃
            svg.append('svg:g')
                .attr('clip-path', `url(#${circle1})`)
                .append('svg:rect')
                .attr('id', operations[3].setId)
                .attr('clip-path', `url(#${circle2})`)
                .attr('width', '100%')
                .attr('height', '100%')
                .attr(
                    'class',
                    classnames(styles.fillColor, {
                        [styles.disabled]: isEntityCountInvalid(operations[3].entityCount),
                    }),
                );

            /**
             * Circle3 'Q₃' is placed at the bottom middle position
             */
            const circle3 = `circle3-${v4()}`;
            const circle3out = `circle3_out-${v4()}`;

            defs.append('svg:clipPath')
                .attr('id', circle3)
                .append('svg:circle')
                .attr('cx', cx + Math.sin((Math.PI * 180) / 180) * radius * factor)
                .attr('cy', cy - Math.cos((Math.PI * 180) / 180) * radius * factor)
                .attr('r', radius);
            defs.append('svg:clipPath')
                .attr('id', circle3out)
                .append('svg:circle')
                .attr('cx', cx + Math.sin((Math.PI * 180) / 180) * radius * factor)
                .attr('cy', cy - Math.cos((Math.PI * 180) / 180) * radius * factor)
                .attr('r', radius + outlineWidth);
            svg.append('svg:rect')
                .attr('clip-path', `url(#${circle3out})`)
                .attr('width', '100%')
                .attr('height', '100%')
                .attr('class', styles.outline);
            svg.append('svg:rect')
                .attr('id', operations[2].setId)
                .attr('clip-path', `url(#${circle3})`)
                .attr('width', '100%')
                .attr('height', '100%')
                .attr(
                    'class',
                    classnames(styles.fillColor, {
                        [styles.disabled]: isEntityCountInvalid(operations[2].entityCount),
                    }),
                );
            // Insert 'Q₃' text bottom Circle3
            svg.append('text')
                .attr('x', cx + Math.sin((Math.PI * 180) / 180) * 2.6 * radius * factor)
                .attr('y', cy - Math.cos((Math.PI * 180) / 180) * 2.6 * radius * factor)
                .attr('text-anchor', 'middle')
                .attr('class', styles.legend)
                .text(LABELS[2]);
            // Insert count value of 'Q₃-(Q₁∪Q₂)'
            svg.append('text')
                .attr('x', cx + Math.sin((Math.PI * 180) / 180) * 1.1 * radius * factor)
                .attr('y', cy - Math.cos((Math.PI * 180) / 180) * 1.1 * radius * factor)
                .attr('text-anchor', 'middle')
                .attr(
                    'class',
                    classnames(styles.legend, { [styles.disabled]: isEntityCountInvalid(operations[2].entityCount) }),
                )
                .text(numberFormat(operations[2].entityCount));

            // Insert count value of (Q₂∩Q₃)-(Q₁)
            svg.append('text')
                .attr('x', cx + Math.sin((Math.PI * 360) / 180) * 0.85 * radius * factor)
                .attr('y', cy - Math.cos((Math.PI * 360) / 180) * 0.85 * radius * factor)
                .attr('text-anchor', 'middle')
                .attr(
                    'class',
                    classnames(styles.legend, { [styles.disabled]: isEntityCountInvalid(operations[3].entityCount) }),
                )
                .text(numberFormat(operations[3].entityCount));

            /**
             * Intersection 'Q₂∩Q₃' between Circle2 and Circle3
             */
            svg.append('svg:g')
                .attr('clip-path', `url(#${circle2out})`)
                .append('svg:rect')
                .attr('clip-path', `url(#${circle3out})`)
                .attr('width', '100%')
                .attr('height', '100%')
                .attr('class', styles.outline);
            svg.append('svg:g')
                .attr('clip-path', `url(#${circle2})`)
                .append('svg:rect')
                .attr('id', operations[4].setId)
                .attr('clip-path', `url(#${circle3})`)
                .attr('width', '100%')
                .attr('height', '100%')
                .attr(
                    'class',
                    classnames(styles.fillColor, {
                        [styles.disabled]: isEntityCountInvalid(operations[4].entityCount),
                    }),
                );
            // Insert count value of '(Q₃)-(Q₁∩Q₃)'
            svg.append('text')
                .attr('x', cx + Math.sin((Math.PI * 120) / 180) * 0.85 * radius * factor)
                .attr('y', cy - Math.cos((Math.PI * 120) / 180) * 0.85 * radius * factor)
                .attr('text-anchor', 'middle')
                .attr(
                    'class',
                    classnames(styles.legend, { [styles.disabled]: isEntityCountInvalid(operations[4].entityCount) }),
                )
                .text(numberFormat(operations[4].entityCount));

            /**
             * Intersection 'Q₁∩Q₃' between Circle1 and Circle2 and Circle3
             */
            svg.append('svg:g')
                .attr('clip-path', `url(#${circle3out})`)
                .append('svg:rect')
                .attr('clip-path', `url(#${circle1out})`)
                .attr('width', width)
                .attr('height', height)
                .attr('class', styles.outline);
            // Insert count value of '(S₁∩S₃)-(S₂)'
            svg.append('svg:g')
                .attr('clip-path', `url(#${circle3})`)
                .append('svg:rect')
                .attr('id', operations[5].setId)
                .attr('clip-path', `url(#${circle1})`)
                .attr('width', '100%')
                .attr('height', '100%')
                .attr(
                    'class',
                    classnames(styles.fillColor, {
                        [styles.disabled]: isEntityCountInvalid(operations[5].entityCount),
                    }),
                );

            /**
             * Intersection 'Q₁∩Q₃' between Circle1 and Circle3
             */
            svg.append('svg:g')
                .attr('clip-path', `url(#${circle3out})`)
                .append('svg:g')
                .attr('clip-path', `url(#${circle2out})`)
                .append('svg:rect')
                .attr('clip-path', `url(#${circle1out})`)
                .attr('width', '100%')
                .attr('height', '100%')
                .attr('class', styles.outline);
            // Insert count value of '(Q₁∩Q₃)-(Q₂)'
            svg.append('text')
                .attr('x', cx + Math.sin((Math.PI * 240) / 180) * 0.85 * radius * factor)
                .attr('y', cy - Math.cos((Math.PI * 240) / 180) * 0.85 * radius * factor)
                .attr('text-anchor', 'middle')
                .attr(
                    'class',
                    classnames(styles.legend, { [styles.disabled]: isEntityCountInvalid(operations[5].entityCount) }),
                )
                .text(numberFormat(operations[5].entityCount));

            /**
             * Intersection 'Q₁∩Q₂∩Q₃' between Circle1 and Circle2 and Circle3
             */
            svg.append('svg:g')
                .attr('clip-path', `url(#${circle3})`)
                .append('svg:g')
                .attr('clip-path', `url(#${circle2})`)
                .append('svg:rect')
                .attr('id', operations[6].setId)
                .attr('clip-path', `url(#${circle1})`)
                .attr('width', '100%')
                .attr('height', '100%')
                .attr(
                    'class',
                    classnames(styles.fillColor, {
                        [styles.disabled]: isEntityCountInvalid(operations[6].entityCount),
                    }),
                );
            // Insert count value of '(Q₁∩Q₂∩Q₃)'
            svg.append('text')
                .attr('x', cx)
                .attr('y', cy)
                .attr('text-anchor', 'middle')
                .attr(
                    'class',
                    classnames(styles.legend, { [styles.disabled]: isEntityCountInvalid(operations[6].entityCount) }),
                )
                .text(numberFormat(operations[6].entityCount));
        }
    }, [loading, ref]);

    /**
     * Sync virtual dom and d3js
     */
    useEffect(() => {
        if (!ref?.current) return;
        if (loading) return;

        d3.select(`#${chartId}`)
            .selectAll(`.${styles.fillColor}`)
            .on('click', (d) => {
                analytics.trackVennClickOnSections();
                const element = d3.select(d.srcElement);
                const disabled = element.classed(styles.disabled) ? true : false;
                if (disabled) return;

                const active = element.classed(styles.active) ? false : true;
                element.classed(styles.active, active);
                const { id } = d.srcElement;
                if (!active) {
                    setTableSelectedSets(tableSelectedSets.filter(({ setId }) => setId != id));
                    return;
                }
                const set = operations.find((operation) => operation.setId == id);
                if (set) {
                    setTableSelectedSets([...tableSelectedSets, set]);
                }
            });
    }, [loading, ref, tableSelectedSets]);

    const operationColumnsParams = {
        dictionary,
        entity,
        onClick: (record: ISetOperation) => {
            analytics.trackVennViewInExploration();
            analytics.trackVennViewEntityCounts(entity, record.entityCount);
            setSelectedSets([record]);
            setSaveModalOpen(true);
        },
        options,
    };

    return (
        <div className={styles.venn}>
            <div className={styles.chart}>
                <div className={styles.chartWrapper}>
                    <div className={styles.chartContent} ref={ref}>
                        <svg className={styles.svg} id={chartId} />
                        <Button
                            icon={<DownloadOutlined />}
                            onClick={() => {
                                const fileName = fileNameFormatter(
                                    dictionary.download.fileNameTemplate ?? DEFAULT_FILENAME_TEMPLATE,
                                    DownloadType.chart,
                                    dictionary.download.fileNameDateFormat ?? DEFAULT_FILENAME_DATE_FORMAT,
                                    'venn',
                                    '',
                                );
                                d3ToPng(`#${chartId}`, fileName, {
                                    ...EXPORT_SETTINGS,
                                    format: 'png',
                                });
                            }}
                        >
                            {dictionary.download.png}
                        </Button>
                    </div>
                </div>
            </div>
            <div className={styles.tables}>
                <div>
                    <Typography.Title className={styles.tableTitle} level={2}>
                        {dictionary.query.title}
                    </Typography.Title>
                    <Divider className={styles.divider} />
                    <Table<ISummaryData>
                        bordered
                        columns={getSummaryColumns(entity, options, dictionary)}
                        dataSource={summary}
                        pagination={false}
                        size="small"
                    />
                </div>
                <div>
                    <Typography.Title className={styles.tableTitle} level={2}>
                        {dictionary.set.title}
                    </Typography.Title>
                    <Divider className={styles.divider} />
                    <Table<ISetOperation>
                        bordered
                        columns={getOperationColumns(operationColumnsParams)}
                        dataSource={operations.map((operation) => ({
                            ...operation,
                            key: operation.setId,
                        }))}
                        pagination={false}
                        rowClassName={styles.row}
                        rowSelection={{
                            getCheckboxProps: (record) => ({
                                disabled: isEntityCountInvalid(record.entityCount),
                            }),
                            onChange: (selectedRowKeys: React.Key[], selectedRows: ISetOperation[]) => {
                                setTableSelectedSets(selectedRows);
                                d3.selectAll(`.${styles.fillColor}`).classed(styles.active, false);
                                selectedRowKeys.forEach((key: React.Key) => {
                                    const element = d3.select(`#${key}`);
                                    element.classed(styles.active, element.classed(styles.active) ? false : true);
                                });
                            },
                            selectedRowKeys: tableSelectedSets.map((set) => set.setId),
                            type: 'checkbox',
                        }}
                        size="small"
                        summary={() => (
                            <Table.Summary>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell colSpan={2} index={0}>
                                        {dictionary.set.footer}
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell align="right" index={1}>
                                        {numberFormat(total())}
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={2}>
                                        <Tooltip
                                            title={
                                                total() > MAX_COUNT
                                                    ? dictionary.set.max
                                                    : entity === 'variants'
                                                    ? dictionary.set.tooltipVariantExplo
                                                    : dictionary.set.tooltipDataExplo
                                            }
                                        >
                                            <Button
                                                className={styles.button}
                                                disabled={isEntityCountInvalid(total())}
                                                icon={<ExternalLinkIcon />}
                                                onClick={() => {
                                                    analytics.trackVennViewInExploration();
                                                    setSelectedSets(tableSelectedSets);
                                                    analytics.trackVennViewEntityCounts(entity, total());
                                                    setSaveModalOpen(true);
                                                }}
                                                type="link"
                                            />
                                        </Tooltip>
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                            </Table.Summary>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default VennChart;
