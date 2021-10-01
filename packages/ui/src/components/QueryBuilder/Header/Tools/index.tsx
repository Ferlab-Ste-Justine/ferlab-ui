import React from 'react';
import { Dropdown, Button, Menu, Tooltip } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import StackLayout from '../../../../layout/StackLayout';
import { IDictionary, IQueryBuilderHeaderConfig, ISavedFilter, TOnSavedFilterChange } from '../../types';
import PlusIcon from '../../icons/PlusIcon';
import SaveIcon from '../../icons/SaveIcon';
import CopyIcon from '../../icons/CopyIcon';
import DeleteIcon from '../../icons/DeleteIcon';
import ShareIcon from '../../icons/ShareIcon';
import FolderIcon from '../../icons/FolderIcon';

import styles from '@ferlab/style/components/queryBuilder/QueryBuilderHeaderTools.module.scss';
import ConditionalWrapper from '../../../utils/ConditionalWrapper';

interface IQueryBuilderHeaderProps {
    config: IQueryBuilderHeaderConfig;
    dictionary?: IDictionary;
    savedFilters: ISavedFilter[];
    selectedSavedFilter?: ISavedFilter;
    onSavedFilterChange: TOnSavedFilterChange;
}

const QueryBuilderHeaderTools = ({
    config,
    dictionary = {},
    savedFilters = [],
    selectedSavedFilter,
    onSavedFilterChange,
}: IQueryBuilderHeaderProps) => {
    const getSavedFiltersListing = (selectedKey: string) => {
        return (
            <Menu selectedKeys={selectedKey ? [selectedKey] : []}>
                {savedFilters.map((savedFilter: ISavedFilter) => (
                    <Menu.Item key={savedFilter.id} onClick={() => onSavedFilterChange(savedFilter)}>
                        {savedFilter.title}
                    </Menu.Item>
                ))}
                <Menu.Divider />
                <Menu.Item key="manage-my-filters" onClick={() => console.log('manage filters')}>
                    {dictionary.queryBuilderHeader?.myFiltersDropdown?.manageMyFilter || 'Manage my filters'}
                </Menu.Item>
            </Menu>
        );
    };

    return (
        <StackLayout className={styles.queryBuilderHeaderTools}>
            <StackLayout className={styles.toolsContainer}>
                <Tooltip title={dictionary.queryBuilderHeader?.tooltips?.newQueryBuilder || 'New query builder'}>
                    <Button
                        className={styles.queryBuilderHeaderActionIconBtn}
                        onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                        }}
                        type="text"
                    >
                        <PlusIcon />
                    </Button>
                </Tooltip>
                <Tooltip title={dictionary.queryBuilderHeader?.tooltips?.save || 'Save'}>
                    <Button
                        className={styles.queryBuilderHeaderActionIconBtn}
                        onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                        }}
                        type="text"
                    >
                        <SaveIcon />
                    </Button>
                </Tooltip>
                {config.options?.enableDuplicate && (
                    <Tooltip
                        title={
                            dictionary.queryBuilderHeader?.tooltips?.duplicateQueryBuilder || 'Duplicate query builder'
                        }
                    >
                        <Button
                            className={styles.queryBuilderHeaderActionIconBtn}
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                            }}
                            type="text"
                        >
                            <CopyIcon />
                        </Button>
                    </Tooltip>
                )}
                <Tooltip title={dictionary.queryBuilderHeader?.tooltips?.delete || 'Delete'}>
                    <Button
                        className={styles.queryBuilderHeaderActionIconBtn}
                        onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                        }}
                        type="text"
                    >
                        <DeleteIcon />
                    </Button>
                </Tooltip>
                {config.options?.enableShare && (
                    <Tooltip title={dictionary.queryBuilderHeader?.tooltips?.share || 'Share (Copy url)'}>
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
                    </Tooltip>
                )}
            </StackLayout>
            <StackLayout className={styles.extra}>
                <ConditionalWrapper
                    condition={savedFilters.length == 0}
                    wrapper={(children: JSX.Element) => (
                        <Tooltip
                            title={
                                dictionary.queryBuilderHeader?.tooltips?.noSavedFilters || 'You have no saved filters'
                            }
                        >
                            {children}
                        </Tooltip>
                    )}
                >
                    <Dropdown
                        overlay={getSavedFiltersListing(selectedSavedFilter ? selectedSavedFilter.id : '')}
                        disabled={savedFilters.length == 0}
                        trigger={['click']}
                    >
                        <Button
                            className={styles.queryBuilderHeaderDdb}
                            size={'small'}
                            icon={<FolderIcon className={styles.prefixIcon} />}
                        >
                            <span className={styles.bContent}>
                                {dictionary.queryBuilderHeader?.myFiltersDropdown?.title || 'My Filters'}
                                <DownOutlined className={styles.arrow} />
                            </span>
                        </Button>
                    </Dropdown>
                </ConditionalWrapper>
            </StackLayout>
        </StackLayout>
    );
};

export default QueryBuilderHeaderTools;
