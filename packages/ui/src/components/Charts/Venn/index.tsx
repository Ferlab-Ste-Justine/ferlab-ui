import React, { useCallback, useEffect, useRef, useState } from 'react';
import { InfoCircleOutlined, WarningFilled } from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Input, Modal, Select, Space, Table, Tooltip, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import classnames from 'classnames';
import * as d3 from 'd3';
import { v4 } from 'uuid';

import { ISyntheticSqon } from '../../../data/sqon/types';
import { numberFormat } from '../../../utils/numberUtils';
import { IUserSetOutput } from '../../BiospecimenRequest/requestBiospecimen.utils';
import ExternalLinkIcon from '../../ExternalLink/ExternalLinkIcon';

import VennQueryPill from './VennQueryPill';
import VennSekeleton from './VennSekeleton';

import styles from './index.module.css';

const FORM_NAME = 'save-set';
const SET_NAME_KEY = 'nameSet';
const PERSISTENT_KEY = 'persistent';

enum Index {
    participant = 'participant',
    biospecimen = 'biospecimen',
    file = 'file',
}

const PADDING_OFFSET = 24;
const MAX_TITLE_LENGTH = 200;
const LABELS = ['Q₁', 'Q₂', 'Q₃'];
const MAX_COUNT = 10000;

export const DEFAULT_VENN_CHART_DICTIONARY: TVennChartDictionary = {
    biospecimens: 'Biospecimens',
    count: 'Count :',
    files: 'Files',
    participants: 'Participants',
    query: {
        column: 'Query definition',
        title: 'Selected queries',
    },
    save: {
        alreadyExist: 'A set with this name already exists',
        cancel: 'Cancel',
        checkbox: {
            label: 'Save this set for future reference',
            tooltips:
                'A saved set is a collection of one or more entity IDs which can be saved and revisited for later use.',
        },
        getEntityText: (index, entityCount) => {
            if (index === Index.biospecimen) {
                return `You have selected ${entityCount} biospecimens.`;
            } else if (index === Index.file) {
                return `You have selected ${entityCount} files.`;
            } else {
                return `You have selected ${entityCount} participants.`;
            }
        },
        label: 'Set name',
        maximumLength: `${MAX_TITLE_LENGTH}characters maximum`,
        nameTemplate: 'Combinet set',
        ok: 'View set',
        permittedCharacters: 'Permitted characters: A-Z a-z 0-9 ()[]-_:|.,',
        requiredField: 'This field is required',
        title: 'View in Data Exploration',
    },
    set: {
        column: 'Set definition',
        footer: 'Union of selected sets',
        max: 'Max 10,000 at a time',
        title: 'Set definitions',
        tooltips: 'View in exploration',
    },
};

export type TVennChartDictionary = {
    query: {
        title: string;
        column: string;
    };
    set: {
        title: string;
        column: string;
        footer: string;
        tooltips: string;
        max: string;
    };
    save: {
        nameTemplate: string;
        maximumLength: string;
        permittedCharacters: string;
        requiredField: string;
        title: string;
        getEntityText: (index: string, entityCount: number) => string;
        label: string;
        checkbox: {
            label: string;
            tooltips: string;
        };
        alreadyExist: string;
        ok: string;
        cancel: string;
    };
    count: string;
    participants: string;
    biospecimens: string;
    files: string;
};

export interface ISummaryData {
    operation: string;
    entityCount: number;
    qbSqon: ISyntheticSqon;
}

export interface ISetOperation {
    operation: string;
    entityCount: number;
    entitySqon: ISyntheticSqon;
    setId: string;
}

type THandleSubmit = {
    index: string;
    name: string;
    sets: ISetOperation[];
    invisible: boolean;
    callback: () => void;
};

type TOption = {
    label: string;
    value: string;
    icon: React.ReactNode;
    tabId?: string;
};

export type TVennChart = {
    savedSets: IUserSetOutput[];
    dictionary?: TVennChartDictionary;
    options: TOption[];
    loading?: boolean;
    handleIndexChange: (qbSqons: ISyntheticSqon[], index: string) => void;
    handleClose: () => void;
    handleSubmit: (props: THandleSubmit) => void;
    outlineWidth?: number;
    radius?: number;
    factor?: number;
    summary?: ISummaryData[];
    operations?: ISetOperation[];
    size: {
        width: number;
        height: number;
    };
    analytics: {
        trackVennViewInExploration: () => void;
        trackVennClickOnSections: () => void;
        trackVennViewSet: () => void;
        trackVennViewEntityCounts: (type: string, entityCount: number) => void;
    };
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
            <Tooltip title={record.entityCount > MAX_COUNT ? dictionary.set.max : dictionary.set.tooltips}>
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

const isEntityCountInvalid = (entityCount: number) => entityCount === 0 || entityCount > MAX_COUNT;

const VennChart = ({
    analytics,
    dictionary = DEFAULT_VENN_CHART_DICTIONARY,
    factor = 0.75,
    handleClose,
    handleIndexChange,
    handleSubmit,
    loading,
    operations = [],
    options,
    outlineWidth = 1.5,
    radius = 130,
    savedSets,
    size,
    summary = [],
}: TVennChart): JSX.Element => {
    const [form] = Form.useForm();
    const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [entity, setEntity] = useState<string>(options[0].value);
    const [tableSelectedSets, setTableSelectedSets] = useState<ISetOperation[]>([]);
    const [selectedSets, setSelectedSets] = useState<ISetOperation[]>([]);
    const total = useCallback(() => {
        let sum = 0;
        tableSelectedSets.forEach((set) => {
            sum += set.entityCount;
        });
        return sum;
    }, [tableSelectedSets]);
    const ref = useRef<HTMLDivElement>(null);
    const chartId = `venn-chart-${v4()}`;

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

    if (loading) {
        return <VennSekeleton height={600} width={800} />;
    }

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
        <>
            <Modal
                afterClose={() => {
                    form.resetFields();
                    setIsSaving(false);
                }}
                cancelText={dictionary.save.cancel}
                destroyOnClose
                okButtonProps={{
                    loading: isSaving,
                }}
                okText={dictionary.save.ok}
                onCancel={() => {
                    setSelectedSets([]);
                    setSaveModalOpen(false);
                }}
                onOk={() => {
                    form.submit();
                }}
                open={saveModalOpen}
                style={{ top: 200 }}
                title={dictionary.save.title}
            >
                <Form
                    className={styles.saveForm}
                    disabled={isSaving}
                    fields={[
                        {
                            name: [SET_NAME_KEY],
                            value: form.getFieldValue(SET_NAME_KEY) ?? dictionary.save.nameTemplate,
                        },
                    ]}
                    form={form}
                    layout="vertical"
                    name={FORM_NAME}
                    onFinish={(values) => {
                        const existingTagNames = savedSets.filter((s) => !s.is_invisible).map((s) => s.tag);
                        if (values[PERSISTENT_KEY]) {
                            if (existingTagNames.includes(values[SET_NAME_KEY])) {
                                form.setFields([
                                    {
                                        errors: [dictionary.save.alreadyExist],
                                        name: SET_NAME_KEY,
                                    },
                                ]);
                                return;
                            }
                        }

                        analytics.trackVennViewSet();
                        handleSubmit({
                            callback: handleClose,
                            index: entity,
                            invisible: values[PERSISTENT_KEY] !== true,
                            name: values[SET_NAME_KEY],
                            sets: selectedSets,
                        });
                        setIsSaving(true);
                    }}
                >
                    <div className={styles.saveDescription}>
                        {dictionary.save.getEntityText(
                            entity,
                            selectedSets.reduce((count, set) => count + set.entityCount, 0),
                        )}
                    </div>
                    <Form.Item
                        className={styles.filterEditFormItem}
                        label={dictionary.save.label}
                        name={SET_NAME_KEY}
                        required={false}
                        rules={[
                            {
                                max: MAX_TITLE_LENGTH,
                                message: (
                                    <span>
                                        <WarningFilled /> {MAX_TITLE_LENGTH} {dictionary.save.maximumLength}
                                    </span>
                                ),
                                type: 'string',
                            },
                            {
                                message: dictionary.save.permittedCharacters,
                                pattern: new RegExp(/^[a-zA-Z0-9 ()[\]\-_:|.,]+$/i),
                                type: 'string',
                            },
                            {
                                message: dictionary.save.requiredField,
                                required: true,
                                type: 'string',
                                validateTrigger: 'onSubmit',
                            },
                        ]}
                    >
                        <Input
                            autoFocus
                            placeholder={dictionary.save.nameTemplate}
                            value={dictionary.save.nameTemplate}
                        />
                    </Form.Item>
                    <Form.Item name={PERSISTENT_KEY} valuePropName="checked">
                        <Checkbox>
                            <Space size={8}>
                                {dictionary.save.checkbox.label}
                                <Tooltip title={dictionary.save.checkbox.tooltips}>
                                    <InfoCircleOutlined />
                                </Tooltip>
                            </Space>
                        </Checkbox>
                    </Form.Item>
                </Form>
            </Modal>
            <div className={styles.vennChart}>
                <div className={styles.selectWrapper}>
                    <label className={styles.selectLabel}>{dictionary.count}</label>
                    <Select
                        className={styles.select}
                        onChange={(value) => {
                            setEntity(value);
                            setSelectedSets([]);
                            setTableSelectedSets([]);
                            handleIndexChange(
                                summary.map((data) => data.qbSqon),
                                value,
                            );
                        }}
                        value={entity}
                    >
                        {options.map((option) => (
                            <option value={option.value}>
                                <span className={styles.optionIcon}>{option.icon}</span>
                                <span>{option.label}</span>
                            </option>
                        ))}
                    </Select>
                </div>
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
                                            element.classed(
                                                styles.active,
                                                element.classed(styles.active) ? false : true,
                                            );
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
                                                            : dictionary.set.tooltips
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
            </div>
        </>
    );
};

export default VennChart;
