import React, { useState } from 'react';
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
import { Button, Dropdown, MenuProps, Modal, Popover, Space, Tag, Timeline, Tooltip, Typography } from 'antd';
import get from 'lodash/get';

import ScrollContent from '../../../layout/ScrollContent';
import getRelativeDate from '../../../utils/dateUtils';
import { getComponentDictionnary } from '../../../utils/localeUtils';
import UserAvatar from '../../UserAvatar';

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
    history?: { name: { first_name: string; last_name: string }; date: string; options: string }[];
    handlePopOverHover?: (open: boolean) => void;
    isPopOverOpen?: boolean;
};

const StatusTag = ({
    dictionary,
    handlePopOverHover,
    handleSelect,
    history,
    intl,
    isPopOverOpen = false,
    readOnly = true,
    status,
}: StatusLabelProps): React.ReactElement => {
    dictionary = getComponentDictionnary(intl, defaultDictionary, dictionary);
    const { Text } = Typography;
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const getName = (name: { first_name: string; last_name: string }) => `${name.first_name} ${name.last_name}`;
    const popOverContent = () => {
        const name = history ? getName(history?.[0]?.name) : undefined;
        return (
            history?.[0] && (
                <Space size={8}>
                    <UserAvatar className={styles.userAvatar} size={24} userName={name} />
                    <Text strong>{name}</Text>
                    <Text type="secondary">{getRelativeDate(new Date(history[0].date), dictionary?.date)}</Text>
                    <Tooltip placement="right" title={dictionary?.modal?.tooltip || 'View history'}>
                        <Button
                            className={styles.viewHistoryButton}
                            icon={<HistoryOutlined className={styles.historyIcon} style={{ fontSize: '16px' }} />}
                            onClick={() => setIsModalOpen(true)}
                            type="link"
                        >
                            {dictionary?.modal?.title}
                        </Button>
                    </Tooltip>
                </Space>
            )
        );
    };

    return readOnly ? (
        <Tag className={className ? `status-tag-${className}` : undefined} color={color} icon={icon}>
            {get(dictionary, `options.${status || 'unknown'}`)}
        </Tag>
    ) : (
        <>
            <Popover content={popOverContent} onOpenChange={handlePopOverHover} open={isPopOverOpen}>
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
            </Popover>
            <Modal
                className={styles.statusHistoryModal}
                footer={[
                    <Button key="close" onClick={() => setIsModalOpen(false)} type="primary">
                        {dictionary?.modal?.close || 'Close'}
                    </Button>,
                ]}
                onCancel={() => setIsModalOpen(false)}
                open={isModalOpen}
                title={dictionary?.modal?.title || 'History'}
            >
                <Timeline>
                    <ScrollContent className={styles.optionsList}>
                        {history?.map((h: any, index: number) => (
                            <Timeline.Item
                                dot={
                                    <Space className={styles.timelineDot} size={4}>
                                        {STATUS_ICON_MAP[h.options as StatusOptions]}
                                        {get(dictionary, `options.${h.options || 'unknown'}`)}
                                    </Space>
                                }
                                key={index}
                            >
                                <Space size={8}>
                                    <UserAvatar className={styles.userAvatar} size={24} userName={getName(h.name)} />
                                    <Text strong>{getName(h.name)}</Text>
                                    <Text type="secondary">{getRelativeDate(new Date(h.date), dictionary?.date)}</Text>
                                </Space>
                            </Timeline.Item>
                        ))}
                    </ScrollContent>
                </Timeline>
            </Modal>
        </>
    );
};

export default StatusTag;
