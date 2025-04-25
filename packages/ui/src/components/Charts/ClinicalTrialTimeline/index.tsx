import React, { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';
import { v4 } from 'uuid';

const THREATMENT_DURATION_OFFSET = -90;
const TIMELINE_OFFSET = -50;
const TRIANGLE_MARKER_SIZE = 16;

const DEFAULT_TIMELINE_DICTIONARY = {
    timeWeek: 'Time (weeks)',
    visitLength: 'Visit length (hrs)',
    visitNumber: 'Visit #',
};

type TDictionary = {
    timeWeek: string;
    visitLength: string;
    visitNumber: string;
};

type TEvent = {
    activities: string[];
    event: string;
    visit_number: number;
    timepoint: number;
    duration: number;
    threatment_active: boolean;
};

type TTimelineChart = {
    title: string;
    dictionary?: TDictionary;
    data: TEvent[];
    loading: boolean;
    width: number;
    height: number;
    margin?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
};

/**
 * @see https://d3b.atlassian.net/browse/SJIP-1318
 * ClinicalTrialTimeline chart
 * - Drug used for the timeline chart
 * - Events
 *    - screening, baseline, N-week
 *    - have a visit length(hrs)
 *    - count (visit 1, visit 2)
 * - Activities
 *    - informed consent, pharmacy visit etc.
 *    - Linked to an event throught and event id
 */
const ClinicalTrialTimelineChart = ({
    data,
    dictionary = DEFAULT_TIMELINE_DICTIONARY,
    height,
    loading,
    margin = { bottom: 40, left: 140, right: 30, top: 120 },
    title,
    width,
}: TTimelineChart): React.ReactNode => {
    const ref = useRef<HTMLDivElement>(null);
    const chartId = `timeline-chart-${v4()}`;

    const activities = useMemo(
        () => [...new Set(data.flatMap((d) => d.activities.map((activity) => activity)))],
        [data],
    );

    useEffect(() => {
        if (loading || !ref?.current) return;

        /**
         * Create main svg
         */
        const svg = d3
            .select(`#${chartId}`)
            .append('svg')
            .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        /**
         * Draw event on the x-axis
         */
        const xScale = d3
            .scaleBand()
            .domain(data.map((d) => d.event))
            .range([0, width])
            .paddingInner(0.2)
            .paddingOuter(0.2);

        const xAxis = d3.axisTop(xScale).tickSizeOuter(0);
        svg.append('g').call(xAxis).selectAll('text').style('font-size', '12px').style('font-weight', 'bold');

        /**
         * Draw activity on the y-axis
         */
        const yScale = d3
            .scaleBand()
            .domain(activities.map((activity) => activity))
            .range([0, height]);
        const yAxis = d3.axisLeft(yScale).tickPadding(10).tickSizeOuter(0);
        svg.append('g')
            .call(yAxis)
            .selectAll('text')
            .style('font-size', '12px')
            .style('font-weight', 'bold')
            .style('text-transform', 'capitalize');

        /**
         * Create square whenever an activity is associated to an event
         * Use d3 custom scheme color
         */
        const colorScale = d3.scaleOrdinal<string>().domain(activities).range(d3.schemeCategory10);
        svg.selectAll('rect.activity-square')
            .data(
                data.flatMap((d) =>
                    d.activities.map((activity) => ({
                        activity,
                        event: d.event,
                    })),
                ),
            )
            .enter()
            .append('rect')
            .attr('class', 'activity-square')
            .attr('x', (d) => xScale(d.event) || 0)
            .attr('y', (d) => yScale(d.activity) || 0)
            .attr('width', xScale.bandwidth())
            .attr('height', yScale.bandwidth())
            .style('fill', (d) => colorScale(d.activity));

        /**
         * Draw horizontal line to separate each activity
         */
        svg.selectAll('line.horizontal-grid')
            .data(activities)
            .enter()
            .append('line')
            .attr('class', 'horizontal-grid')
            .attr('x1', 0)
            .attr('y1', (d) => (yScale(d) || 0) + yScale.bandwidth()) // Bottom of each activity band
            .attr('x2', width)
            .attr('y2', (d) => (yScale(d) || 0) + yScale.bandwidth()) // Bottom of each activity band
            .style('stroke', 'black')
            .style('stroke-width', 1);

        /**
         * threatment duration line
         */
        const xThreamentScale = d3
            .scaleBand()
            .domain(data.map((d) => d.event))
            .range([0, width])
            .paddingOuter(1.0);

        svg.selectAll('rect.threatment-square')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'activity-square')
            .attr('x', (d) => xThreamentScale(d.event) || 0)
            .attr('y', THREATMENT_DURATION_OFFSET - 10)
            .attr('width', xThreamentScale.bandwidth())
            .attr('height', 10)
            .style('fill', (d) => (d.threatment_active ? 'red' : 'transparent'));

        // clinical trial label
        svg.append('text')
            .attr('class', 'visit-number-label')
            .attr('x', -62)
            .attr('y', THREATMENT_DURATION_OFFSET)
            .attr('text-anchor', 'left')
            .style('font-size', '12px')
            .style('fill', 'gray')
            .text(`${title}:`);

        /**
         * Draw timepoint line at the top of the chart
         */
        const defs = svg.append('defs');

        // Right-pointing arrowhead
        defs.append('marker')
            .attr('id', 'arrowhead-right')
            .attr('refX', 10)
            .attr('viewBox', `0 0 ${TRIANGLE_MARKER_SIZE} ${TRIANGLE_MARKER_SIZE}`)
            .attr('refY', 5)
            .attr('markerWidth', TRIANGLE_MARKER_SIZE)
            .attr('markerHeight', TRIANGLE_MARKER_SIZE)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M 0 0 L 10 5 L 0 10 Z')
            .style('fill', 'black');

        // Left-pointing arrowhead
        defs.append('marker')
            .attr('id', 'arrowhead-left')
            .attr('viewBox', `0 0 ${TRIANGLE_MARKER_SIZE} ${TRIANGLE_MARKER_SIZE}`)
            .attr('refX', 0)
            .attr('refY', 5)
            .attr('markerWidth', TRIANGLE_MARKER_SIZE)
            .attr('markerHeight', TRIANGLE_MARKER_SIZE)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M 10 0 L 0 5 L 10 10 Z')
            .style('fill', 'black');

        svg.selectAll('line.timepoint-horizontal-line')
            .data(data)
            .enter()
            .append('line')
            .attr('class', 'timepoint-horizontal-line')
            .attr('x1', 0)
            .attr('x2', width)
            .attr('y1', TIMELINE_OFFSET)
            .attr('y2', TIMELINE_OFFSET)
            .style('stroke', 'black')
            .style('stroke-width', 1)
            .attr('marker-start', 'url(#arrowhead-left)')
            .attr('marker-end', 'url(#arrowhead-right)');

        svg.selectAll('line.timepoint-vertical-lines')
            .data(data)
            .enter()
            .append('line')
            .attr('class', 'timepoint-vertical-lines')
            .attr('x1', (d) => (xScale(d.event) || 0) + xScale.bandwidth() / 2)
            .attr('x2', (d) => (xScale(d.event) || 0) + xScale.bandwidth() / 2)
            .attr('y1', TIMELINE_OFFSET - 5)
            .attr('y2', TIMELINE_OFFSET + 5)
            .style('stroke', 'black')
            .style('stroke-width', 1);

        // visit number label
        svg.append('foreignObject')
            .attr('x', -margin.left)
            .attr('y', TIMELINE_OFFSET - 22)
            .attr('width', margin.left - TRIANGLE_MARKER_SIZE)
            .attr('height', 20)
            .append('xhtml:div')
            .style('font-size', '12px')
            .style('color', 'gray')
            .style('text-align', 'right')
            .text(dictionary.visitNumber);

        // time week label
        svg.append('foreignObject')
            .attr('x', -margin.left)
            .attr('y', TIMELINE_OFFSET + 6)
            .attr('width', margin.left - TRIANGLE_MARKER_SIZE)
            .attr('height', 20)
            .append('xhtml:div')
            .style('font-size', '12px')
            .style('color', 'gray')
            .style('text-align', 'right')
            .text(dictionary.timeWeek);

        // visit_number
        svg.selectAll('text.visit-number-text')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'visit-number-text')
            .attr('x', (d) => (xScale(d.event) || 0) + xScale.bandwidth() / 2)
            .attr('y', TIMELINE_OFFSET - 8)
            .attr('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('fill', 'black')
            .text((d) => `${d.visit_number}`);

        svg.selectAll('text.timepoint-text')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'timepoint-text')
            .attr('x', (d) => (xScale(d.event) || 0) + xScale.bandwidth() / 2)
            .attr('y', TIMELINE_OFFSET + 18)
            .attr('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('fill', 'black')
            .text((d) => `${d.timepoint}`);

        /**
         * Draw visit length (hrs) label
         * and each visit duration
         */
        // visit-length label
        svg.append('foreignObject')
            .attr('x', -margin.left - 18)
            .attr('y', height + 10)
            .attr('width', margin.left)
            .attr('height', 20)
            .append('xhtml:div')
            .style('font-size', '12px')
            .style('color', 'black')
            .style('text-align', 'right')
            .text(dictionary.visitLength);

        svg.selectAll('text.visit-length-text')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'visit-length-text')
            .attr('x', (d) => (xScale(d.event) || 0) + xScale.bandwidth() / 2)
            .attr('y', height + 25)
            .attr('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('fill', 'black')
            .text((d) => `${d.duration.toFixed(2)}`);
    }, [loading, ref, activities, dictionary]);

    return <div id={chartId} ref={ref} style={{ maxHeight: height, maxWidth: width }}></div>;
};

export default ClinicalTrialTimelineChart;
