import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Button, Checkbox, Popover, Space, Tooltip } from 'antd';

import styles from './index.module.scss';

type TResizableItem = {
    id: string;
    label: string;
    value: boolean;
};

type TResizableItemSelector = {
    items: TResizableItem[];
    isPristine: boolean;
    onReset: () => void;
    onChange: (id: string, checkbox: boolean) => void;
    dictionary?: {
        columnSelector?: {
            reset?: string;
            tooltip?: string;
        };
    };
};

const ResizableItemSelector = ({
    dictionary,
    isPristine,
    items,
    onChange,
    onReset,
}: TResizableItemSelector): JSX.Element => (
    <Popover
        align={{ offset: [-9, 0] }}
        content={
            <Space direction="vertical">
                <div className={styles.listWrapper}>
                    <Space direction="vertical">
                        {items.map((item) => (
                            <Checkbox
                                checked={item.value}
                                key={item.id}
                                onChange={(e) => {
                                    onChange(item.id, e.target.checked);
                                }}
                            >
                                {item.label}
                            </Checkbox>
                        ))}
                    </Space>
                    <div className={styles.resetWrapper}>
                        <Button
                            className={styles.reset}
                            disabled={isPristine}
                            onClick={onReset}
                            size="small"
                            type="link"
                        >
                            {dictionary?.columnSelector?.reset || 'Reset'}
                        </Button>
                    </div>
                </div>
            </Space>
        }
        overlayClassName={styles.popover}
        placement="bottomLeft"
        trigger="click"
    >
        <Tooltip title={dictionary?.columnSelector?.tooltip || 'Charts'}>
            <Button icon={<SettingOutlined />} size="small" type="text"></Button>
        </Tooltip>
    </Popover>
);

export default ResizableItemSelector;
