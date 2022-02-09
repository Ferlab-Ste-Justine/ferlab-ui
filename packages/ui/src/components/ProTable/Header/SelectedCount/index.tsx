import React from 'react';
import { Button, Space, Typography } from 'antd';
import { IProTableDictionary } from '../../types';

type Props = {
    className?: string;
    dictionnary?: IProTableDictionary;
    selectedRows: number;
    onClear?: () => void;
};

export const SelectedCount = ({
    className = '',
    selectedRows,
    dictionnary = {},
    onClear = () => {},
}: Props): React.ReactElement => (
    <Space className={className} size={0}>
        <Typography.Text>
            <span>
                <strong>{selectedRows}</strong> {dictionnary.itemCount?.selected || 'Selected'}
            </span>
        </Typography.Text>
        <Button type="link" onClick={onClear}>
            Clear
        </Button>
    </Space>
);
