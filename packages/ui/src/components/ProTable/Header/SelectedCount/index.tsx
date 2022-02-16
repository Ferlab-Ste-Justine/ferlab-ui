import React from 'react';
import { Button, Space, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { IProTableDictionary } from '../../types';

import styles from '@ferlab/style/components/protable/ProTableHeader.module.scss';

type Props = {
    className?: string;
    dictionnary?: IProTableDictionary;
    selectedAllPage?: boolean;
    selectedAllResults?: boolean;
    selectedRowCount: number;
    onSelectAll?: () => void;
    onClear?: () => void;
};

export const SelectedCount = ({
    className = '',
    selectedAllPage = false,
    selectedAllResults = false,
    selectedRowCount,
    dictionnary = {},
    onSelectAll = () => {},
    onClear = () => {},
}: Props): React.ReactElement => (
    <Space className={className} size={5}>
        <Typography.Text>
            <span>
                <strong>{selectedRowCount}</strong>{' '}
                {selectedRowCount > 1
                    ? dictionnary.itemCount?.selectedPlural || 'items selected'
                    : dictionnary.itemCount?.selected || 'item selected'}
            </span>
        </Typography.Text>
        {selectedAllPage && (
            <Button type="link" onClick={onSelectAll} size="small" className={styles.ProTableHeaderSelectAllBtn}>
                {dictionnary.itemCount?.selectAllResults || 'Select all results'}
            </Button>
        )}
        {selectedAllResults || (!selectedAllResults && selectedRowCount > 0 && !selectedAllPage) ? (
            <Button
                className={styles.ProTableHeaderClearSelectedBtn}
                type="link"
                onClick={onClear}
                size="small"
                icon={<CloseOutlined />}
            >
                {dictionnary.itemCount?.clear || 'Clear'}
            </Button>
        ) : (
            <></>
        )}
    </Space>
);
