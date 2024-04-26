import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';

import styles from './index.module.scss';

const _items: MenuProps['items'] = [
    {
        children: [
            {
                key: '1',
                label: 'Query Builder',
            },
            {
                key: '2',
                label: 'Facettes',
            },
        ],
        key: '1',
        label: 'Data Explorer',
        type: 'group',
    },
    {
        key: '2',
        type: 'divider',
    },
    {
        children: [
            {
                key: '3',
                label: 'Query Builder',
            },
            {
                key: '4',
                label: 'Facettes',
            },
        ],
        key: '3',
        label: 'Variant Explorer',
        type: 'group',
    },
    {
        key: '4',
        type: 'divider',
    },
    {
        children: [
            {
                key: '5',
                label: 'Saved Filters',
            },
            {
                key: '6',
                label: 'Saved Sets',
            },
        ],
        key: '5',
        label: 'Dashboard',
        type: 'group',
    },
    {
        key: '6',
        type: 'divider',
    },
    {
        children: [
            {
                key: '7',
                label: 'Query Builder',
            },
            {
                key: '8',
                label: 'Facettes',
            },
        ],
        key: '7',
        label: 'Studies Explorer',
        type: 'group',
    },
];

interface IWidgetTourButtonProps {
    items?: MenuProps['items'];
    classNames?: string;
}

const WidgetTourButton = ({ items = _items }: IWidgetTourButtonProps) => (
    <Dropdown className={styles.fixedWidgets} menu={{ items }}>
        <QuestionCircleOutlined className={styles.fixedWidgetsIcon} />
    </Dropdown>
);

export default WidgetTourButton;
