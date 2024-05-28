import React, { MouseEvent, ReactElement, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Checkbox, Divider, Dropdown, Input, InputRef, Popover, Spin, Tag, Typography } from 'antd';

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
    allLabel?: string;
    allOfLabel?: string;
    anyOfLabel?: string;
    applyLabel?: string;
    clearLabel?: string;
    emptyMessage?: string;
    enableQuickFilter?: boolean;
    getSuggestionsList?: (
        searchText: string,
        setOptions: React.Dispatch<React.SetStateAction<(TitleQFOption | CheckboxQFOption)[]>>,
        setTotal: React.Dispatch<React.SetStateAction<number>>,
    ) => void;
    handleFacetClick?: (
        setOptions: React.Dispatch<React.SetStateAction<(TitleQFOption | CheckboxQFOption)[]>>,
        option: TitleQFOption,
    ) => void;
    handleOnApply?: (options: CheckboxQFOption[], operator: TermOperators) => void;
    isLoading?: boolean;
    inputPrefixIcon?: ReactNode;
    inputSuffixIcon?: ReactNode;
    noneLabel?: string;
    noneOfLabel?: string;
    menuIcon?: ReactNode;
    menuTitle?: string;
    placeholder?: string;
    resultsLabel?: string;
    searchInputRef?: React.RefObject<InputRef>;
}

const QuickFilter = ({
    allLabel = 'All',
    allOfLabel = 'All of',
    anyOfLabel = 'Any of',
    applyLabel = 'Apply',
    clearLabel = 'Clear',
    emptyMessage = 'Empty search',
    getSuggestionsList,
    handleFacetClick,
    handleOnApply,
    inputPrefixIcon,
    inputSuffixIcon,
    isLoading = false,
    noneLabel = 'None',
    noneOfLabel = 'None of',
    placeholder = 'Quick filter...',
    resultsLabel = 'Results',
    searchInputRef,
}: IQuickFilter): ReactElement => {
    const [isOpenPopover, setOpenPopover] = useState(false);
    const [search, setSearch] = useState('');
    const [qfOptions, setQFOptions] = useState<(TitleQFOption | CheckboxQFOption)[]>([]);
    const [total, setTotal] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<CheckboxQFOption[]>([]);
    const [selectedFacet, setSelectedFacet] = useState<TitleQFOption | undefined>(undefined);

    const handleOpenChange = (newOpen: boolean) => setOpenPopover(newOpen);

    const handleSearchChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const searchText = e.target.value;
            setSelectedFacet(undefined);
            setSearch(searchText);
            if (searchText.length >= 3 && getSuggestionsList) {
                getSuggestionsList(searchText, setQFOptions, setTotal);
            } else {
                setQFOptions([]);
            }
        },
        [getSuggestionsList],
    );

    const handleCheckboxChange = useCallback((option: CheckboxQFOption, checked: boolean) => {
        setSelectedOptions((prevSelectedOptions) =>
            checked ? [...prevSelectedOptions, option] : prevSelectedOptions.filter((opt) => opt.key !== option.key),
        );
    }, []);

    const handleSelectAll = () => {
        setSelectedOptions(
            qfOptions.filter((option): option is CheckboxQFOption => option.type === QuickFilterType.CHECKBOX),
        );
    };

    const handleClearAll = () => {
        setSelectedOptions([]);
    };

    const clearFilters = () => {
        setSelectedFacet(undefined);
        setOpenPopover(false);
        setSearch('');
        setQFOptions([]);
        setSelectedOptions([]);
    };

    const applyFilters = (operator: TermOperators) => {
        handleOnApply && handleOnApply(selectedOptions, operator);
        clearFilters();
    };

    const onFacetClick = (option: TitleQFOption) => {
        setSelectedFacet(option);
        setSelectedOptions([]);
        setSearch('');
        if (handleFacetClick) {
            handleFacetClick(setQFOptions, option);
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
                        <Checkbox onChange={(e) => handleCheckboxChange(option as CheckboxQFOption, e.target.checked)}>
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
                {search.length >= 3 ? `${total} ${resultsLabel}` : emptyMessage}
            </Typography.Text>
        );
    };

    const stopEventPropagation = (e: MouseEvent<HTMLDivElement>) => {
        // Prevents the modal from closing when we click in the input again
        if (isOpenPopover) {
            e.stopPropagation();
        }
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
                    isLoading ? (
                        <div className={styles.spinnerWrapper}>
                            <Spin spinning={isLoading} />
                        </div>
                    ) : (
                        <>
                            {(search.length >= 3 || selectedFacet) && (
                                <>
                                    {selectedFacet && (
                                        <StackLayout className={styles.actionBar}>
                                            <Button
                                                className={styles.checkboxFilterLinks}
                                                onClick={handleSelectAll}
                                                type="text"
                                            >
                                                {allLabel}
                                            </Button>

                                            <Divider className={styles.separator} type="vertical" />
                                            <Button
                                                className={styles.checkboxFilterLinks}
                                                onClick={handleClearAll}
                                                type="text"
                                            >
                                                {noneLabel}
                                            </Button>
                                        </StackLayout>
                                    )}
                                    <ScrollContent className={styles.scrollContent}>{renderOptions}</ScrollContent>
                                    <div className={styles.popoverFooter}>
                                        <Button className={styles.clearBtn} onClick={clearFilters} type="link">
                                            {clearLabel}
                                        </Button>
                                        {selectedFacet ? (
                                            <Dropdown.Button
                                                className={styles.applyBtn}
                                                disabled={!selectedOptions.length}
                                                menu={{
                                                    items: [
                                                        { key: TermOperators.in, label: anyOfLabel },
                                                        { key: TermOperators.all, label: allOfLabel },
                                                        { key: TermOperators['not-in'], label: noneOfLabel },
                                                    ],
                                                    onClick: (e) => applyFilters(e.key as TermOperators),
                                                }}
                                                onClick={() => applyFilters(TermOperators.in)}
                                                size="small"
                                                type="primary"
                                            >
                                                {applyLabel}
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
                    )
                }
                onOpenChange={handleOpenChange}
                open={isOpenPopover}
                overlayClassName={styles.popoverWrapper}
                placement="bottomLeft"
                showArrow={false}
                title={renderTitle()}
                trigger="click"
            >
                <div onClick={stopEventPropagation}>
                    <Input
                        onChange={handleSearchChange}
                        onClick={stopEventPropagation}
                        placeholder={placeholder}
                        prefix={inputPrefixIcon}
                        ref={searchInputRef}
                        suffix={inputSuffixIcon || <SearchIcon />}
                        value={search}
                    />
                </div>
            </Popover>
        </div>
    );
};

export default QuickFilter;
