import React from 'react';
import { CheckCircleOutlined, FormOutlined, SyncOutlined, WarningOutlined } from '@ant-design/icons';
import { Tag } from 'antd';

/**
 *
 * New modal for status
 *
 * Will need to move and update ferlab StatusLabel Component
 *
 */

export enum StatusOptions {
    Active = 'active',
    Draft = 'draft',
    OnHold = 'on-hold',
    Completed = 'completed',
    Unknown = 'unknown',
}

export type TranslationDictionary = Record<StatusOptions, string>;

export type StatusLabelProps = {
    className?: string;
    dictionary?: TranslationDictionary;
    status: string;
};

export const StatusLabelElement: Record<StatusOptions, (d?: TranslationDictionary) => React.ReactElement> = {
    [StatusOptions.Active]: (d) => (
        <Tag color="green" icon={<CheckCircleOutlined />}>
            {d ? d[StatusOptions.Active] : StatusOptions.Active}
        </Tag>
    ),
    [StatusOptions.Draft]: (d) => (
        <Tag color="default" icon={<FormOutlined />}>
            {d ? d[StatusOptions.Draft] : StatusOptions.Draft}
        </Tag>
    ),
    [StatusOptions.OnHold]: (d) => (
        <Tag color="blue" icon={<SyncOutlined />}>
            {d ? d[StatusOptions.OnHold] : StatusOptions.OnHold}
        </Tag>
    ),
    [StatusOptions.Completed]: (d) => (
        <Tag color="green" icon={<CheckCircleOutlined />}>
            {d ? d[StatusOptions.Completed] : StatusOptions.Completed}
        </Tag>
    ),
    [StatusOptions.Unknown]: (d) => (
        <Tag color="error" icon={<WarningOutlined />}>
            {d ? d[StatusOptions.Unknown] : StatusOptions.Unknown}
        </Tag>
    ),
};

const StatusTag = ({ dictionary, status }: StatusLabelProps) =>
    StatusLabelElement[status as StatusOptions]
        ? StatusLabelElement[status as StatusOptions](dictionary)
        : StatusLabelElement.unknown(dictionary);

export default StatusTag;
