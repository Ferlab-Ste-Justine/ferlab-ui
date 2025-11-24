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
import { Button, Dropdown, MenuProps, Tag } from 'antd';
import get from 'lodash/get';

import { getComponentDictionnary } from '../../../utils/localeUtils';

import defaultDictionary from './locales';
import { IStatusTagDictionary } from './types';

import styles from './index.module.css';
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

export const STATUS_ICON_MAP = {
    [StatusOptions.Active]: <CheckCircleOutlined />,
    [StatusOptions.Draft]: <FormOutlined />,
    [StatusOptions.OnHold]: <HourglassOutlined />,
    [StatusOptions.Completed]: <CheckCircleOutlined />,
    [StatusOptions.Revoked]: <CloseCircleOutlined />,
    [StatusOptions.Analysis]: <SyncOutlined />,
    [StatusOptions.Review]: <EyeOutlined />,
    [StatusOptions.ReAnalysis]: <HistoryOutlined />,
    [StatusOptions.Unknown]: <WarningOutlined />,
};

export type StatusLabelProps = {
    intl?: any;
    dictionary?: IStatusTagDictionary;
    status: string;
    readOnly?: boolean;
    handleSelect?: (key: string) => Promise<void>;
};

const StatusTag = ({
    dictionary,
    handleSelect,
    intl,
    readOnly = true,
    status,
}: StatusLabelProps): React.ReactElement => {
    dictionary = getComponentDictionnary(intl, defaultDictionary, dictionary);

    const dropdownItems: MenuProps['items'] = [
        {
            icon: STATUS_ICON_MAP[StatusOptions.Analysis],
            key: StatusOptions.Analysis,
            label: get(dictionary, `options.${StatusOptions.Analysis || 'unknown'}`),
        },
        {
            icon: STATUS_ICON_MAP[StatusOptions.Review],
            key: StatusOptions.Review,
            label: get(dictionary, `options.${StatusOptions.Review || 'unknown'}`),
        },
        {
            icon: STATUS_ICON_MAP[StatusOptions.ReAnalysis],
            key: StatusOptions.ReAnalysis,
            label: get(dictionary, `options.${StatusOptions.ReAnalysis || 'unknown'}`),
        },
        {
            icon: STATUS_ICON_MAP[StatusOptions.Revoked],
            key: StatusOptions.Revoked,
            label: get(dictionary, `options.${StatusOptions.Revoked || 'unknown'}`),
        },
        {
            icon: STATUS_ICON_MAP[StatusOptions.Completed],
            key: StatusOptions.Completed,
            label: get(dictionary, `options.${StatusOptions.Completed || 'unknown'}`),
        },
    ];
    const icon = STATUS_ICON_MAP[status as StatusOptions] || <WarningOutlined />;
    let className, color;
    switch (status) {
        case StatusOptions.Active:
            color = 'green';
            break;
        case StatusOptions.Draft:
            className = 'white';
            break;
        case StatusOptions.OnHold:
            color = 'default';
            break;
        case StatusOptions.Completed:
            color = 'green';
            break;
        case StatusOptions.Revoked:
            color = 'red';
            break;
        case StatusOptions.Analysis:
            color = 'blue';
            break;
        case StatusOptions.ReAnalysis:
            color = 'geekblue';
            break;
        case StatusOptions.Review:
            color = 'lime';
            break;
        default:
            color = 'error';
            break;
    }
    return readOnly ? (
        <Tag className={className ? `status-tag-${className}` : undefined} color={color} icon={icon}>
            {get(dictionary, `options.${status || 'unknown'}`)}
        </Tag>
    ) : (
        <Dropdown
            menu={{
                defaultSelectedKeys: [status],
                items: dropdownItems,
                onClick: (e) => handleSelect?.(e.key),
                selectable: true,
            }}
            trigger={['click']}
        >
            <Button className={styles.statusButton} size="small">
                <Tag
                    className={`${styles.statusTag} ${className ? `status-tag-${className}` : ''}`}
                    color={color}
                    icon={icon}
                >
                    {get(dictionary, `options.${status || 'unknown'}`)}
                </Tag>
            </Button>
        </Dropdown>
    );
};

export default StatusTag;
