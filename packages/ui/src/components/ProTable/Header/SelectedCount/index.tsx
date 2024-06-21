import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';

import { IProTableDictionary } from '../../types';

import styles from '../index.module.css';

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
    dictionnary = {},
    onClear = () => undefined,
    onSelectAll = () => undefined,
    selectedAllPage = false,
    selectedAllResults = false,
    selectedRowCount,
}: Props): React.ReactElement => {
    const rowCount = dictionnary.numberFormat ? dictionnary.numberFormat(selectedRowCount) : selectedRowCount;
    return (
        <Space className={className} size={5}>
            <Typography.Text>
                <span>
                    <strong>{rowCount}</strong>{' '}
                    {selectedRowCount > 1
                        ? dictionnary.itemCount?.selectedPlural || 'items selected'
                        : dictionnary.itemCount?.selected || 'item selected'}
                </span>
            </Typography.Text>
            {selectedAllPage && (
                <Button className={styles.ProTableHeaderSelectAllBtn} onClick={onSelectAll} size="small" type="link">
                    {dictionnary.itemCount?.selectAllResults || 'Select all results'}
                </Button>
            )}
            {selectedAllResults || (!selectedAllResults && selectedRowCount > 0 && !selectedAllPage) ? (
                <Button
                    className={styles.ProTableHeaderClearSelectedBtn}
                    icon={<CloseOutlined />}
                    onClick={onClear}
                    size="small"
                    type="link"
                >
                    {dictionnary.itemCount?.clear || 'Clear'}
                </Button>
            ) : (
                <></>
            )}
        </Space>
    );
};
