import React from 'react';
import { CheckCircleOutlined, FormOutlined, SyncOutlined, WarningOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import get from 'lodash/get';

import { getComponentDictionnary } from '../../../utils/localeUtils';

import defaultDictionary from './locales';
import { IStatusTagDictionary } from './types';

export enum StatusOptions {
    Active = 'active',
    Draft = 'draft',
    OnHold = 'on-hold',
    OnHoldHybrid = 'onhold',
    Completed = 'completed',
    Unknown = 'unknown',
}

export type StatusLabelProps = {
    intl?: any;
    dictionary?: IStatusTagDictionary;
    status: string;
};

export const StatusLabelElement = (status: string, dictionary: IStatusTagDictionary) => {
    switch (status) {
        case StatusOptions.Active:
            return (
                <Tag color="green" icon={<CheckCircleOutlined />}>
                    {get(dictionary, `options.${status}`, status || '')}
                </Tag>
            );
        case StatusOptions.Draft:
            return (
                <Tag color="default" icon={<FormOutlined />}>
                    {get(dictionary, `options.${status}`, status || '')}
                </Tag>
            );
        case StatusOptions.OnHold:
        case StatusOptions.OnHoldHybrid:
            return (
                <Tag color="blue" icon={<SyncOutlined />}>
                    {get(dictionary, `options.${status}`, status || '')}
                </Tag>
            );
        case StatusOptions.Completed:
            return (
                <Tag color="green" icon={<CheckCircleOutlined />}>
                    {get(dictionary, `options.${status}`, status || '')}
                </Tag>
            );
        default:
            return (
                <Tag color="error" icon={<WarningOutlined />}>
                    {get(dictionary, `options.${StatusOptions.Unknown}`, StatusOptions.Unknown)}
                </Tag>
            );
    }
};

const StatusTag = ({ dictionary, intl, status }: StatusLabelProps) => {
    dictionary = getComponentDictionnary(intl, defaultDictionary, dictionary);
    return StatusLabelElement(status ? status.toLowerCase() : StatusOptions.Unknown, dictionary);
};

export default StatusTag;
