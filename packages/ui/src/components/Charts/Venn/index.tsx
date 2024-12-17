import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ISqonGroupFilter } from '@ferlab/ui/data/sqon/types';
import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import * as d3 from 'd3';
import { v4 } from 'uuid';

import VennSekeleton from './VennSekeleton';

import styles from './index.module.css';

export const DEFAULT_VENN_CHART_DICTIONARY: TVennChartDictionary = {
    operation: {
        alias: 'Alias',
        count: 'Count',
        operation: 'Name',
    },
    submit: 'Submit',
    summary: {
        alias: 'Alias',
        count: 'Count',
        name: 'Name',
    },
    total: 'Union of selected sets:',
};

export interface ISummaryData {
    alias: string;
    name: string;
    count: number;
}

export interface ISetOperation {
    alias: string;
    operation: string;
    sqon: ISqonGroupFilter;
    count: number;
}

export type TVennChartDictionary = {
    summary: {
        alias: string;
        count: string;
        name: string;
    };
    operation: {
        alias: string;
        count: string;
        operation: string;
    };
    submit: string;
    total: string;
};

export type TVennChart = {
    dictionary?: TVennChartDictionary;
    loading?: boolean;
    outlineWidth?: number;
    radius?: number;
    factor?: number;
    summary?: ISummaryData[];
    operations?: ISetOperation[];
    handleSubmit: (sets: ISetOperation[]) => void;
};

export const INTERSECTIONS = ['S₁', 'S₂', 'S₃', 'S₁∩S₂', 'S₂∩S₃', 'S₁∩S₃', 'S₁∩S₂∩S₃'];
const getSummaryColumns = (dictionary: TVennChartDictionary): ColumnsType<ISummaryData> => [
    {
        dataIndex: 'alias',
        key: 'Alias',
        title: dictionary.summary.alias,
    },
    {
        dataIndex: 'name',
        key: 'name',
        title: dictionary.summary.name,
    },
    {
        dataIndex: 'count',
        key: 'count',
        title: dictionary.summary.count,
    },
];

const getOperationColumns = (dictionary: TVennChartDictionary): ColumnsType<ISetOperation> => [
    {
        dataIndex: 'alias',
        key: 'Alias',
        title: dictionary.operation.alias,
    },
    {
        dataIndex: 'operation',
        key: 'operation',
        title: dictionary.operation.operation,
    },
    {
        dataIndex: 'count',
        key: 'count',
        title: dictionary.operation.count,
    },
];

/**
 * @TODO Add OR operator when combine operation set
 * @TODO Check query builder, select two query, add same logic here
 */
const VennChart = ({
    dictionary = DEFAULT_VENN_CHART_DICTIONARY,
    factor = 0.75,
    handleSubmit,
    loading,
    operations = [],
    outlineWidth = 1.5,
    radius = 100,
    summary = [],
}: TVennChart): JSX.Element => {
    const [selectedSets, setSelectedSets] = useState<ISetOperation[]>([]);
    const total = useCallback(() => {
        let sum = 0;
        selectedSets.forEach((set) => {
            sum += set.count;
        });
        return sum;
    }, [selectedSets]);
    const ref = useRef<HTMLDivElement>(null);
    const chartId = `venn-chart-${v4()}`;

    useEffect(() => {
        if (loading) return;
        if (!ref?.current) return;

        const circle1 = `circle1-${v4()}`;
        const circle1out = `circle1_out-${v4()}`;
        const circle2 = `circle2-${v4()}`;
        const circle2out = `circle2_out-${v4()}`;

        const { height, width } = ref.current.getBoundingClientRect();
        const cy = (1.0 / summary.length) * height;
        const cx = 0.5 * width;
        const svg = d3.select(`#${chartId}`);
        const defs = svg.append('svg:defs');

        /**
         * Circle1 'S₁' is placed at the top left
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
            .attr('id', INTERSECTIONS[0])
            .attr('clip-path', `url(#${circle1})`)
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('class', styles.fillColor);
        // Insert 'S₁' text to the left of Circle1
        svg.append('text')
            .attr('x', cx + Math.sin((Math.PI * 300) / 180) * 2.5 * radius * factor)
            .attr('y', cy - Math.cos((Math.PI * 300) / 180) * 2.5 * radius * factor)
            .attr('text-anchor', 'end')
            .attr('class', styles.legend)
            .text(INTERSECTIONS[0]);
        // Insert count of (S₁)-(S₂∩S₃)
        svg.append('text')
            .attr('x', cx + Math.sin((Math.PI * 300) / 180) * 1.1 * radius * factor)
            .attr('y', cy - Math.cos((Math.PI * 300) / 180) * 1.1 * radius * factor)
            .attr('text-anchor', 'end')
            .attr('class', styles.legend)
            .text(operations[0].count);

        /**
         * Circle2 'S₂' is placed at the top left
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
            .attr('id', INTERSECTIONS[1])
            .attr('clip-path', `url(#${circle2})`)
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('class', styles.fillColor);
        // Insert 'S₂' text to the right of Circle2
        svg.append('text')
            .attr('x', cx + Math.sin((Math.PI * 60) / 180) * 2.5 * radius * factor)
            .attr('y', cy - Math.cos((Math.PI * 60) / 180) * 2.5 * radius * factor)
            .attr('text-anchor', 'start')
            .attr('class', styles.legend)
            .text(INTERSECTIONS[1]);
        // Insert count value of (S₂)-(S₁∩S₃)
        svg.append('text')
            .attr('x', cx + Math.sin((Math.PI * 60) / 180) * 1.1 * radius * factor)
            .attr('y', cy - Math.cos((Math.PI * 60) / 180) * 1.1 * radius * factor)
            .attr('text-anchor', 'start')
            .attr('class', styles.legend)
            .text(operations[1].count);

        /**
         * Intersection 'S₁∩S₂' between Circle1 and Circle2
         */
        svg.append('svg:g')
            .attr('clip-path', `url(#${circle1out})`)
            .append('svg:rect')
            .attr('clip-path', `url(#${circle2out})`)
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('class', styles.outline);
        svg.append('svg:g')
            .attr('clip-path', `url(#${circle1})`)
            .append('svg:rect')
            .attr('id', INTERSECTIONS[3])
            .attr('clip-path', `url(#${circle2})`)
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('class', styles.fillColor);

        /**
         * When only having two sets, when add the intersection of (S₁∩S₂)
         */
        if (summary.length == 2) {
            // Insert count value of (S₁∩S₂)
            svg.append('text')
                .attr('x', cx + Math.sin((Math.PI * 360) / 180) * 0.85 * radius * factor)
                .attr('y', cy - Math.cos((Math.PI * 360) / 180) * 0.5 * radius * factor)
                .attr('text-anchor', 'middle')
                .attr('class', styles.legend)
                .text(operations[2].count);
        }

        /**
         * Add a third set to the operations
         */
        if (summary.length == 3) {
            /**
             * Circle3 'S₃' is placed at the bottom middle position
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
                .attr('id', INTERSECTIONS[2])
                .attr('clip-path', `url(#${circle3})`)
                .attr('width', '100%')
                .attr('height', '100%')
                .attr('class', styles.fillColor);
            // Insert 'S₃' text bottom Circle3
            svg.append('text')
                .attr('x', cx + Math.sin((Math.PI * 180) / 180) * 2.6 * radius * factor)
                .attr('y', cy - Math.cos((Math.PI * 180) / 180) * 2.6 * radius * factor)
                .attr('text-anchor', 'middle')
                .attr('class', styles.legend)
                .text(INTERSECTIONS[2]);
            // Insert count value of '(S₃)-(S₁∩S₃)'
            svg.append('text')
                .attr('x', cx + Math.sin((Math.PI * 180) / 180) * 1.1 * radius * factor)
                .attr('y', cy - Math.cos((Math.PI * 180) / 180) * 1.1 * radius * factor)
                .attr('text-anchor', 'middle')
                .attr('class', styles.legend)
                .text(operations[2].count);

            // Insert count value of (S₂∩S₃)-(S₁)
            svg.append('text')
                .attr('x', cx + Math.sin((Math.PI * 360) / 180) * 0.85 * radius * factor)
                .attr('y', cy - Math.cos((Math.PI * 360) / 180) * 0.85 * radius * factor)
                .attr('text-anchor', 'middle')
                .attr('class', styles.legend)
                .text(operations[3].count);

            /**
             * Intersection 'S₂∩S₃' between Circle2 and Circle3
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
                .attr('id', INTERSECTIONS[4])
                .attr('clip-path', `url(#${circle3})`)
                .attr('width', '100%')
                .attr('height', '100%')
                .attr('class', styles.fillColor);
            // Insert count value of '(S₃)-(S₁∩S₃)'
            svg.append('text')
                .attr('x', cx + Math.sin((Math.PI * 120) / 180) * 0.85 * radius * factor)
                .attr('y', cy - Math.cos((Math.PI * 120) / 180) * 0.85 * radius * factor)
                .attr('text-anchor', 'middle')
                .attr('class', styles.legend)
                .text(operations[4].count);

            /**
             * Intersection 'S₁∩S₃' between Circle1 and Circle2 and Circle3
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
                .attr('id', INTERSECTIONS[5])
                .attr('clip-path', `url(#${circle1})`)
                .attr('width', '100%')
                .attr('height', '100%')
                .attr('class', styles.fillColor);

            /**
             * Intersection ''S₁∩S₃' between Circle1 and Circle3
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
            // Insert count value of '(S₁∩S₃)-(S₂)'
            svg.append('text')
                .attr('x', cx + Math.sin((Math.PI * 240) / 180) * 0.85 * radius * factor)
                .attr('y', cy - Math.cos((Math.PI * 240) / 180) * 0.85 * radius * factor)
                .attr('text-anchor', 'middle')
                .attr('class', styles.legend)
                .text(operations[5].count);

            /**
             * Intersection 'S₁∩S₂∩S₃' between Circle1 and Circle2 and Circle3
             */
            svg.append('svg:g')
                .attr('clip-path', `url(#${circle3})`)
                .append('svg:g')
                .attr('clip-path', `url(#${circle2})`)
                .append('svg:rect')
                .attr('id', INTERSECTIONS[6])
                .attr('clip-path', `url(#${circle1})`)
                .attr('width', '100%')
                .attr('height', '100%')
                .attr('class', styles.fillColor);
            // Insert count value of '(S₁∩S₂∩S₃)'
            svg.append('text')
                .attr('x', cx)
                .attr('y', cy)
                .attr('text-anchor', 'middle')
                .attr('class', styles.legend)
                .text(operations[6].count);
        }
    }, [loading, ref]);

    /**
     * Sync virtual dom and d3js
     */
    useEffect(() => {
        d3.select(`#${chartId}`)
            .selectAll(`.${styles.fillColor}`)
            .on('click', (d) => {
                const element = d3.select(d.srcElement);
                const active = element.classed(styles.active) ? false : true;
                element.classed(styles.active, active);
                const { id } = d.srcElement;
                if (!active) {
                    setSelectedSets(selectedSets.filter(({ alias }) => alias != id));
                    return;
                }
                const set = operations.find((operation) => operation.alias == id);
                if (set) {
                    setSelectedSets([...selectedSets, set]);
                }
            });
    }, [selectedSets]);

    if (loading) {
        return <VennSekeleton height={600} width={800} />;
    }

    return (
        <div className={styles.vennChart}>
            <div className={styles.venn}>
                <div className={styles.chart}>
                    <div className={styles.chartWrapper}>
                        <div className={styles.chartContent} ref={ref}>
                            <svg height="100%" id={chartId} width="100%" />
                        </div>
                    </div>
                </div>
                <div className={styles.tables}>
                    <div>
                        <Table<ISummaryData>
                            columns={getSummaryColumns(dictionary)}
                            dataSource={summary}
                            pagination={false}
                            size="small"
                        />
                    </div>
                    <div>
                        <Table<ISetOperation>
                            columns={getOperationColumns(dictionary)}
                            dataSource={operations.map((operation) => ({ ...operation, key: operation.alias }))}
                            pagination={false}
                            rowSelection={{
                                onChange: (selectedRowKeys: React.Key[], selectedRows: ISetOperation[]) => {
                                    setSelectedSets(selectedRows);
                                    d3.selectAll(`.${styles.fillColor}`).classed(styles.active, false);
                                    selectedRowKeys.forEach((key: React.Key) => {
                                        const element = d3.select(`#${key}`);
                                        element.classed(styles.active, element.classed(styles.active) ? false : true);
                                    });
                                },
                                selectedRowKeys: selectedSets.map((set) => set.alias),
                                type: 'checkbox',
                            }}
                            size="small"
                            summary={() => (
                                <Table.Summary>
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell colSpan={3} index={0}>
                                            {dictionary.total}
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell colSpan={1} index={1}>
                                            {total()}
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                </Table.Summary>
                            )}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <Button
                    onClick={() => {
                        handleSubmit(selectedSets);
                    }}
                >
                    {dictionary.submit}
                </Button>
            </div>
        </div>
    );
};

export default VennChart;
