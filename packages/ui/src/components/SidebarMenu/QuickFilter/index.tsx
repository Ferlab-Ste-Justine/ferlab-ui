import React, { ReactElement, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Checkbox, Divider, Dropdown, Input, InputRef, Popover, Tag, Typography } from 'antd';

import { TermOperators } from '../../../data/sqon/operators';
import { ISyntheticSqon } from '../../../data/sqon/types';
import ScrollContent from '../../../layout/ScrollContent';
import StackLayout from '../../../layout/StackLayout';
import { numberFormat } from '../../../utils/numberUtils';
import useQueryBuilderState from '../../QueryBuilder/utils/useQueryBuilderState';
import SearchIcon from '../icons/SearchIcon';

import styles from './index.module.scss';

export enum QuickFilterType {
    TITLE = 'title',
    CHECKBOX = 'checkbox',
}

export type TitleQFOption = {
    key: string;
    title: string;
    type: QuickFilterType;
    index: string;
};

export type CheckboxQFOption = TitleQFOption & {
    docCount: number;
    facetKey: string;
};

export interface IQuickFilter {
    applyLabel?: string;
    cancelLabel?: string;
    emptyMessage?: string;
    enableQuickFilter?: boolean;
    getSuggestionsList?: (
        setOptions: React.Dispatch<React.SetStateAction<(TitleQFOption | CheckboxQFOption)[]>>,
        sqon: ISyntheticSqon,
        searchText: string,
    ) => void;
    handleFacetClick?: (
        setOptions: React.Dispatch<React.SetStateAction<(TitleQFOption | CheckboxQFOption)[]>>,
        sqon: ISyntheticSqon,
        option: TitleQFOption,
    ) => void;
    inputPrefixIcon?: ReactNode;
    inputSuffixIcon?: ReactNode;
    menuIcon?: ReactNode;
    menuTitle?: string;
    placeholder?: string;
    queryBuilderId?: string;
    resultsLabel?: string;
    searchInputRef?: React.RefObject<InputRef>;
}

const QuickFilter = ({
    applyLabel = 'Apply',
    cancelLabel = 'Cancel',
    emptyMessage = 'Empty search',
    getSuggestionsList,
    handleFacetClick,
    inputPrefixIcon,
    inputSuffixIcon,
    placeholder = 'Quick filter...',
    queryBuilderId = '',
    resultsLabel = 'Results',
    searchInputRef,
}: IQuickFilter): ReactElement => {
    const [isOpenPopover, setOpenPopover] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [qfOptions, setQFOptions] = useState<(TitleQFOption | CheckboxQFOption)[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<CheckboxQFOption[]>([]);
    const [selectedFacet, setSelectedFacet] = useState<TitleQFOption | undefined>(undefined);
    const { activeQuery } = useQueryBuilderState(queryBuilderId);

    const handleOpenChange = (newOpen: boolean): void => setOpenPopover(newOpen);

    const handleSearchChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>): void => {
            const searchText = e.target.value;
            setSearch(searchText);
            if (searchText.length >= 3 && getSuggestionsList) {
                getSuggestionsList(setQFOptions, activeQuery, searchText);
            } else {
                setQFOptions([]);
            }
        },
        [getSuggestionsList, activeQuery],
    );

    const handleCheckboxChange = useCallback((option: CheckboxQFOption, checked: boolean): void => {
        setSelectedOptions((prevSelectedOptions) =>
            checked ? [...prevSelectedOptions, option] : prevSelectedOptions.filter((opt) => opt.key !== option.key),
        );
    }, []);

    const handleSelectAll = (): void => {
        setSelectedOptions(
            qfOptions.filter((option): option is CheckboxQFOption => option.type === QuickFilterType.CHECKBOX),
        );
    };

    const handleClearAll = (): void => {
        setSelectedOptions([]);
    };

    const clearFilters = (): void => {
        setSelectedFacet(undefined);
        setOpenPopover(false);
        setSearch('');
        setQFOptions([]);
    };

    const applyFilters = (operator: TermOperators): void => {
        console.log(operator);
        // Add logic to apply selected filters
        clearFilters();
    };

    const onFacetClick = (option: TitleQFOption): void => {
        setSelectedFacet(option);
        setSearch('');

        if (handleFacetClick) {
            handleFacetClick(setQFOptions, activeQuery, option);
        }
    };

    const renderOptions = useMemo(
        () =>
            qfOptions.map((option, index) =>
                option.type === QuickFilterType.TITLE ? (
                    <div className={styles.facetNameWrapper} key={index}>
                        <Button className={styles.facetNameBtn} onClick={() => onFacetClick(option)} type="link">
                            <Highlighter
                                highlightClassName={styles.highlight}
                                searchWords={[search]}
                                textToHighlight={option.title}
                            />
                        </Button>
                    </div>
                ) : (
                    <div className={styles.facetValueWrapper} key={index}>
                        <Checkbox
                            checked={selectedOptions.some((selectedOption) => selectedOption.key === option.key)}
                            onChange={(e) => handleCheckboxChange(option as CheckboxQFOption, e.target.checked)}
                        >
                            <Highlighter
                                highlightClassName={styles.highlight}
                                searchWords={[search]}
                                textToHighlight={option.title}
                            />
                        </Checkbox>
                        <Tag className={styles.tag}>{numberFormat((option as CheckboxQFOption).docCount)}</Tag>
                    </div>
                ),
            ),
        [qfOptions, search, handleCheckboxChange, selectedOptions],
    );

    const renderTitle = (): ReactElement => {
        if (selectedFacet) {
            return <Typography.Text className={styles.popoverFacetTitle}>{selectedFacet.title}</Typography.Text>;
        }

        return (
            <Typography.Text className={styles.popoverTitle}>
                {search.length >= 3 ? `${qfOptions.length} ${resultsLabel}` : emptyMessage}
            </Typography.Text>
        );
    };

    useEffect(() => {
        if (!isOpenPopover) {
            clearFilters();
        }
    }, [isOpenPopover]);

    return (
        <div className={styles.searchMenuItem}>
            <Popover
                content={
                    <>
                        {(search.length >= 3 || selectedFacet) && (
                            <>
                                {selectedFacet && (
                                    <StackLayout vertical>
                                        <StackLayout className={styles.actionBar}>
                                            <StackLayout className={styles.checkboxSelectActions}>
                                                <Button
                                                    className={styles.checkboxFilterLinks}
                                                    onClick={handleSelectAll}
                                                    type="text"
                                                >
                                                    All
                                                </Button>

                                                <Divider className={styles.separator} type="vertical" />
                                                <Button
                                                    className={styles.checkboxFilterLinks}
                                                    onClick={handleClearAll}
                                                    type="text"
                                                >
                                                    None
                                                </Button>
                                            </StackLayout>
                                        </StackLayout>
                                    </StackLayout>
                                )}
                                <ScrollContent className={styles.scrollContent}>{renderOptions}</ScrollContent>
                                <div className={styles.popoverFooter}>
                                    <Button className={styles.cancelBtn} onClick={clearFilters} type="link">
                                        {cancelLabel}
                                    </Button>
                                    {selectedFacet ? (
                                        <Dropdown.Button
                                            className={styles.fuiCbfActionsApply}
                                            disabled={!selectedOptions.length}
                                            menu={{
                                                items: [
                                                    {
                                                        key: TermOperators.in,
                                                        label: 'Any of',
                                                    },
                                                    {
                                                        key: TermOperators.all,
                                                        label: 'All of',
                                                    },
                                                    {
                                                        key: TermOperators['not-in'],
                                                        label: 'None of',
                                                    },
                                                ],
                                                onClick: (e) => applyFilters(e.key as TermOperators),
                                            }}
                                            onClick={() => applyFilters(TermOperators.in)}
                                            size="small"
                                            type="primary"
                                        >
                                            <span data-key="apply">{applyLabel}</span>
                                        </Dropdown.Button>
                                    ) : (
                                        <Button
                                            className={styles.applyBtn}
                                            disabled={!selectedOptions.length}
                                            onClick={() => applyFilters(TermOperators.in)}
                                            type="primary"
                                        >
                                            {applyLabel}
                                        </Button>
                                    )}
                                </div>
                            </>
                        )}
                    </>
                }
                onOpenChange={handleOpenChange}
                open={isOpenPopover}
                overlayClassName={styles.popoverWrapper}
                placement="bottomLeft"
                showArrow={false}
                title={renderTitle()}
                trigger="click"
            >
                <Input
                    onChange={handleSearchChange}
                    placeholder={placeholder}
                    prefix={inputPrefixIcon}
                    ref={searchInputRef}
                    suffix={inputSuffixIcon || <SearchIcon />}
                    value={search}
                />
            </Popover>
        </div>
    );
};

export default QuickFilter;
