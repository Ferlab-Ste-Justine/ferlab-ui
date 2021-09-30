import React from 'react';
import { Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import StackLayout from '../../../../layout/StackLayout';
import { IDictionary, IQueryBuilderHeaderConfig } from '../../types';
import PlusIcon from '../../icons/PlusIcon';
import SaveIcon from '../../icons/SaveIcon';
import CopyIcon from '../../icons/CopyIcon';
import DeleteIcon from '../../icons/DeleteIcon';
import ShareIcon from '../../icons/ShareIcon';
import FolderIcon from '../../icons/FolderIcon';

import styles from '@ferlab/style/components/queryBuilder/QueryBuilderHeaderTools.module.scss';

interface IQueryBuilderHeaderProps {
    config: IQueryBuilderHeaderConfig;
    dictionary?: IDictionary;
}

const QueryBuilderHeaderTools = ({ config, dictionary = {} }: IQueryBuilderHeaderProps) => (
    <StackLayout className={styles.queryBuilderHeaderTools}>
        <StackLayout className={styles.toolsContainer}>
            <Button
                disabled
                className={styles.queryBuilderHeaderActionIconBtn}
                onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                }}
                type="text"
            >
                <PlusIcon />
            </Button>
            <Button
                disabled
                className={styles.queryBuilderHeaderActionIconBtn}
                onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                }}
                type="text"
            >
                <SaveIcon />
            </Button>
            <Button
                disabled
                className={styles.queryBuilderHeaderActionIconBtn}
                onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                }}
                type="text"
            >
                <CopyIcon />
            </Button>
            <Button
                disabled
                className={styles.queryBuilderHeaderActionIconBtn}
                onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                }}
                type="text"
            >
                <DeleteIcon />
            </Button>
            <Button
                disabled
                className={styles.queryBuilderHeaderActionIconBtn}
                onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                }}
                type="text"
            >
                <ShareIcon />
            </Button>
        </StackLayout>
        <StackLayout className={styles.extra}>
            <Dropdown overlay={<></>} disabled>
                <Button
                    className={styles.queryBuilderHeaderDdb}
                    size={'small'}
                    icon={<FolderIcon className={styles.prefixIcon} />}
                >
                    <span className={styles.bContent}>
                        Button <DownOutlined className={styles.arrow} />
                    </span>
                </Button>
            </Dropdown>
        </StackLayout>
    </StackLayout>
);

export default QueryBuilderHeaderTools;
