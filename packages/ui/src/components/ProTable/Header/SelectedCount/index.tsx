import React from 'react';
import { Button, Space, Typography } from 'antd';
import { IProTableDictionary } from '../../types';

type Props = {
    className?: string;
    dictionnary?: IProTableDictionary;
    selectedRowCount: number;
    onClear?: () => void;
};

export const SelectedCount = ({
    className = '',
    selectedRowCount,
    dictionnary = {},
    onClear = () => {},
}: Props): React.ReactElement => (
    <Space className={className} size={0}>
        <Typography.Text>
            <span>
                <strong>{selectedRowCount}</strong>{' '}
                {selectedRowCount > 1
                    ? dictionnary.itemCount?.selectedPlural || 'items selected'
                    : dictionnary.itemCount?.selected || 'item selected'}
            </span>
        </Typography.Text>
        <Button type="link" onClick={onClear}>
            Clear
        </Button>
    </Space>
);
