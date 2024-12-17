import React, { useEffect, useRef, useState } from 'react';
import { ISqonGroupFilter } from '@ferlab/ui/data/sqon/types';
import { Button } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import * as d3 from 'd3';
import { v4 } from 'uuid';

import VennSekeleton from './VennSekeleton';

import styles from './index.module.css';

interface ISummaryData {
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

type TVennChart = {
    loading?: boolean;
    outlineWidth?: number;
    radius?: number;
    factor?: number;
    summary?: ISummaryData[];
    operations?: ISetOperation[];
    handleSubmit: (sets: ISetOperation[]) => void;
};

const INTERSECTIONS = ['S₁', 'S₂', 'S₃', 'S₁∩S₂', 'S₂∩S₃', 'S₁∩S₃', 'S₁∩S₂∩S₃'];

const summaryColumns: ColumnsType<ISummaryData> = [
    {
        dataIndex: 'alias',
        key: 'Alias',
        title: 'Alias',
    },
    {
        dataIndex: 'name',
        key: 'name',
        title: 'Name',
    },
    {
        dataIndex: 'count',
        key: 'count',
        title: 'Count',
    },
];

const operationColumns: ColumnsType<ISetOperation> = [
    {
        dataIndex: 'alias',
        key: 'Alias',
        title: 'Alias',
    },
    {
        dataIndex: 'operation',
        key: 'operation',
        title: 'Operation',
    },
    {
        dataIndex: 'count',
        key: 'count',
        title: 'Count',
    },
];

/**
 * @doc https://www.notion.so/ferlab/Venn-Diagram-Chart-15bb0fcecb3d80dd9a76f5d87edb778f?showMoveTo=true&saveParent=true
 * @TODO Add OR operator when combine operation set
 * @TODO Check query builder, select two query, add same logic here
 */
const VennChart = ({
    factor = 0.75,
    handleSubmit,
    loading,
    operations = [],
    outlineWidth = 1.5,
    radius = 100,
    summary = [],
}: TVennChart): JSX.Element => {
    const [selectedSets, setSelectedSets] = useState<ISetOperation[]>([]);
    const ref = useRef<HTMLDivElement>(null);
    const vennId = `venn-chart-${v4()}`;
    const circle1 = `circle1-${v4()}`;
    const circle1out = `circle1_out-${v4()}`;
    const circle2 = `circle2-${v4()}`;
    const circle2out = `circle2_out-${v4()}`;
    const circle3 = `circle3-${v4()}`;
    const circle3out = `circle3_out-${v4()}`;

    useEffect(() => {
        if (loading) return;
        if (!ref?.current) return;

        const { height, width } = ref.current.getBoundingClientRect();
        const cy = 0.3 * height;
        const cx = 0.5 * width;
        const svg = d3.select(`#${vennId}`);
        const defs = svg.append('svg:defs');

        // create the outline of our 3 circles
        defs.append('svg:clipPath')
            .attr('id', circle1)
            .append('svg:circle')
            .attr('cx', cx + Math.sin((Math.PI * 300) / 180) * radius * factor)
            .attr('cy', cy - Math.cos((Math.PI * 300) / 180) * radius * factor)
            .attr('r', radius);
        defs.append('svg:clipPath')
            .attr('id', circle2)
            .append('svg:circle')
            .attr('cx', cx + Math.sin((Math.PI * 60) / 180) * radius * factor)
            .attr('cy', cy - Math.cos((Math.PI * 60) / 180) * radius * factor)
            .attr('r', radius);
        defs.append('svg:clipPath')
            .attr('id', circle3)
            .append('svg:circle')
            .attr('cx', cx + Math.sin((Math.PI * 180) / 180) * radius * factor)
            .attr('cy', cy - Math.cos((Math.PI * 180) / 180) * radius * factor)
            .attr('r', radius);
        defs.append('svg:clipPath')
            .attr('id', circle1out)
            .append('svg:circle')
            .attr('cx', cx + Math.sin((Math.PI * 300) / 180) * radius * factor)
            .attr('cy', cy - Math.cos((Math.PI * 300) / 180) * radius * factor)
            .attr('r', radius + outlineWidth);
        defs.append('svg:clipPath')
            .attr('id', circle2out)
            .append('svg:circle')
            .attr('cx', cx + Math.sin((Math.PI * 60) / 180) * radius * factor)
            .attr('cy', cy - Math.cos((Math.PI * 60) / 180) * radius * factor)
            .attr('r', radius + outlineWidth);
        defs.append('svg:clipPath')
            .attr('id', circle3out)
            .append('svg:circle')
            .attr('cx', cx + Math.sin((Math.PI * 180) / 180) * radius * factor)
            .attr('cy', cy - Math.cos((Math.PI * 180) / 180) * radius * factor)
            .attr('r', radius + outlineWidth);
        svg.append('svg:rect')
            .attr('clip-path', `url(#${circle1out})`)
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('class', styles.outline);
        svg.append('svg:rect')
            .attr('clip-path', `url(#${circle2out})`)
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('class', styles.outline);
        svg.append('svg:rect')
            .attr('clip-path', `url(#${circle3out})`)
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('class', styles.outline);
        svg.append('svg:rect')
            .attr('id', INTERSECTIONS[0])
            .attr('clip-path', `url(#${circle1})`)
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('class', styles.fillColor);
        svg.append('svg:rect')
            .attr('id', INTERSECTIONS[1])
            .attr('clip-path', `url(#${circle2})`)
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('class', styles.fillColor);
        svg.append('svg:rect')
            .attr('id', INTERSECTIONS[2])
            .attr('clip-path', `url(#${circle3})`)
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('class', styles.fillColor);

        // Draw the intersection between Circle1 and Circle2
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

        // Draw the intersection between Circle2 and Circle3
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

        // Draw the overlapping intersection between Circle2 and Circle2 and Circle1
        svg.append('svg:g')
            .attr('clip-path', `url(#${circle3out})`)
            .append('svg:rect')
            .attr('clip-path', `url(#${circle1out})`)
            .attr('width', width)
            .attr('height', height)
            .attr('class', styles.outline);
        svg.append('svg:g')
            .attr('clip-path', `url(#${circle3})`)
            .append('svg:rect')
            .attr('id', INTERSECTIONS[5])
            .attr('clip-path', `url(#${circle1})`)
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('class', styles.fillColor);

        svg.append('svg:g')
            .attr('clip-path', `url(#${circle3out})`)
            .append('svg:g')
            .attr('clip-path', `url(#${circle2out})`)
            .append('svg:rect')
            .attr('clip-path', `url(#${circle1out})`)
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('class', styles.outline);
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

        // Add label to each circle
        svg.append('text')
            .attr('x', cx + Math.sin((Math.PI * 300) / 180) * 2.5 * radius * factor)
            .attr('y', cy - Math.cos((Math.PI * 300) / 180) * 2.5 * radius * factor)
            .attr('text-anchor', 'end')
            .attr('class', styles.legend)
            .text(INTERSECTIONS[0]);
        svg.append('text')
            .attr('x', cx + Math.sin((Math.PI * 60) / 180) * 2.5 * radius * factor)
            .attr('y', cy - Math.cos((Math.PI * 60) / 180) * 2.5 * radius * factor)
            .attr('text-anchor', 'start')
            .attr('class', styles.legend)
            .text(INTERSECTIONS[1]);
        svg.append('text')
            .attr('x', cx + Math.sin((Math.PI * 180) / 180) * 2.6 * radius * factor)
            .attr('y', cy - Math.cos((Math.PI * 180) / 180) * 2.6 * radius * factor)
            .attr('text-anchor', 'middle')
            .attr('class', styles.legend)
            .text(INTERSECTIONS[2]);

        // Add text for each intersections
        svg.append('text')
            .attr('x', cx + Math.sin((Math.PI * 300) / 180) * 1.1 * radius * factor)
            .attr('y', cy - Math.cos((Math.PI * 300) / 180) * 1.1 * radius * factor)
            .attr('text-anchor', 'end')
            .attr('class', styles.legend)
            .text(operations[0].count);
        svg.append('text')
            .attr('x', cx + Math.sin((Math.PI * 60) / 180) * 1.1 * radius * factor)
            .attr('y', cy - Math.cos((Math.PI * 60) / 180) * 1.1 * radius * factor)
            .attr('text-anchor', 'start')
            .attr('class', styles.legend)
            .text(operations[1].count);
        svg.append('text')
            .attr('x', cx + Math.sin((Math.PI * 180) / 180) * 1.1 * radius * factor)
            .attr('y', cy - Math.cos((Math.PI * 180) / 180) * 1.1 * radius * factor)
            .attr('text-anchor', 'middle')
            .attr('class', styles.legend)
            .text(operations[2].count);
        svg.append('text')
            .attr('x', cx + Math.sin((Math.PI * 360) / 180) * 0.85 * radius * factor)
            .attr('y', cy - Math.cos((Math.PI * 360) / 180) * 0.85 * radius * factor)
            .attr('text-anchor', 'middle')
            .attr('class', styles.legend)
            .text(operations[3].count);
        svg.append('text')
            .attr('x', cx + Math.sin((Math.PI * 120) / 180) * 0.85 * radius * factor)
            .attr('y', cy - Math.cos((Math.PI * 120) / 180) * 0.85 * radius * factor)
            .attr('text-anchor', 'middle')
            .attr('class', styles.legend)
            .text(operations[4].count);
        svg.append('text')
            .attr('x', cx + Math.sin((Math.PI * 240) / 180) * 0.85 * radius * factor)
            .attr('y', cy - Math.cos((Math.PI * 240) / 180) * 0.85 * radius * factor)
            .attr('text-anchor', 'middle')
            .attr('class', styles.legend)
            .text(operations[5].count);
        svg.append('text')
            .attr('x', cx)
            .attr('y', cy)
            .attr('text-anchor', 'middle')
            .attr('class', styles.legend)
            .text(operations[6].count);
    }, [loading, ref]);

    /**
     * Sync virtual dom and d3js
     */
    useEffect(() => {
        d3.select(`#${vennId}`)
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
                            <svg height="100%" id={vennId} width="100%" />
                        </div>
                    </div>
                </div>
                <div className={styles.tables}>
                    <div>
                        <Table<ISummaryData>
                            columns={summaryColumns}
                            dataSource={summary}
                            pagination={false}
                            size="small"
                        />
                    </div>
                    <div>
                        <Table<ISetOperation>
                            columns={operationColumns}
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
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default VennChart;
