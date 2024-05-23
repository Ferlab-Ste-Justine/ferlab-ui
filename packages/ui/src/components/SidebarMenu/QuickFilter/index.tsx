import React, { ReactElement, ReactNode, useCallback, useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Checkbox, Input, InputRef, Popover, Tag, Typography } from 'antd';

import { ISyntheticSqon } from '../../../data/sqon/types';
import ScrollContent from '../../../layout/ScrollContent';
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
    const [search, setSearch] = useState('');
    const [qfOptions, setQFOptions] = useState<(TitleQFOption | CheckboxQFOption)[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<CheckboxQFOption[]>([]);
    const { activeQuery } = useQueryBuilderState(queryBuilderId || '');

    const handleOpenChange = (newOpen: boolean) => setOpenPopover(newOpen);

    const handleSearchChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleCheckboxChange = (option: CheckboxQFOption, checked: boolean) => {
        setSelectedOptions((prevSelectedOptions) =>
            checked ? [...prevSelectedOptions, option] : prevSelectedOptions.filter((opt) => opt.key !== option.key),
        );
    };

    const clearFilters = () => {
        setOpenPopover(false);
        setSearch('');
        setQFOptions([]);
    };

    const applyFilters = () => {
        // Add logic to apply selected filters
        clearFilters();
    };

    const renderOptions = () =>
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
        );

    useEffect(() => {
        if (!isOpenPopover) {
            clearFilters();
        }
    }, [isOpenPopover]);

    const onFacetClick = (option: TitleQFOption) => {
        if (handleFacetClick) {
            handleFacetClick(setQFOptions, activeQuery, option);
        }
    };

    return (
        <div className={styles.searchMenuItem}>
            <Popover
                content={
                    <>
                        {search.length >= 3 && (
                            <>
                                <ScrollContent className={styles.scrollContent}>{renderOptions()}</ScrollContent>
                                <div className={styles.popoverFooter}>
                                    <Button className={styles.cancelBtn} onClick={clearFilters} type="link">
                                        {cancelLabel}
                                    </Button>
                                    <Button
                                        className={styles.applyBtn}
                                        disabled={!selectedOptions.length}
                                        onClick={applyFilters}
                                        type="primary"
                                    >
                                        {applyLabel}
                                    </Button>
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
                title={
                    <Typography.Text className={styles.popoverTitle}>
                        {search.length >= 3 ? `${qfOptions.length} ${resultsLabel}` : emptyMessage}
                    </Typography.Text>
                }
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
