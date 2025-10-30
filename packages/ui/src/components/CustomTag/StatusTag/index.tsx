import React from 'react';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    EyeOutlined,
    FormOutlined,
    HistoryOutlined,
    HourglassOutlined,
    SyncOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import { Tag } from 'antd';
import get from 'lodash/get';

import { getComponentDictionnary } from '../../../utils/localeUtils';

import defaultDictionary from './locales';
import { IStatusTagDictionary } from './types';

export enum StatusOptions {
    Active = 'active',
    Draft = 'draft',
    OnHold = 'on-hold',
    Completed = 'completed',
    Revoked = 'revoked',
    Analysis = 'analysis',
    Review = 'review',
    ReAnalysis = 're-analysis',
    Unknown = 'unknown',
}

export type StatusLabelProps = {
    intl?: any;
    dictionary?: IStatusTagDictionary;
    status: string;
};

const StatusTag = ({ dictionary, intl, status }: StatusLabelProps): React.ReactElement => {
    dictionary = getComponentDictionnary(intl, defaultDictionary, dictionary);
    let className, color, icon;
    switch (status) {
        case StatusOptions.Active:
            color = 'green';
            icon = <CheckCircleOutlined />;
            break;
        case StatusOptions.Draft:
            className = 'white';
            icon = <FormOutlined />;
            break;
        case StatusOptions.OnHold:
            color = 'default';
            icon = <HourglassOutlined />;
            break;
        case StatusOptions.Completed:
            color = 'green';
            icon = <CheckCircleOutlined />;
            break;
        case StatusOptions.Revoked:
            color = 'red';
            icon = <CloseCircleOutlined />;
            break;
        case StatusOptions.Analysis:
            color = 'blue';
            icon = <SyncOutlined />;
            break;
        case StatusOptions.ReAnalysis:
            color = 'geekblue';
            icon = <HistoryOutlined />;
            break;
        case StatusOptions.Review:
            color = 'lime';
            icon = <EyeOutlined />;
            break;
        default:
            color = 'error';
            icon = <WarningOutlined />;
            break;
    }
    return (
        <Tag className={className ? `status-tag-${className}` : undefined} color={color} icon={icon}>
            {get(dictionary, `options.${status || 'unknown'}`)}
        </Tag>
    );
};

export default StatusTag;
