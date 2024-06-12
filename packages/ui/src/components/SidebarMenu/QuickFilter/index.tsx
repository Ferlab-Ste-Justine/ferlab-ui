import React, { MouseEvent, ReactElement, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Checkbox, Dropdown, Input, InputRef, Popover, Spin, Tag, Typography } from 'antd';
import { get } from 'lodash';
import Highlighter from 'react-highlight-words';

import { TermOperators } from '../../../data/sqon/operators';
import ScrollContent from '../../../layout/ScrollContent';
import { numberFormat } from '../../../utils/numberUtils';
import FilterSelector from '../../filters/FilterSelector';
import { IDictionary, IFilter, IFilterGroup, VisualType, onChangeType } from '../../filters/types';
import SearchIcon from '../icons/SearchIcon';

import styles from './index.module.scss';

export type TitleQFOption = {
    key: string;
    label: string;
    type: VisualType | 'title';
    index: string;
};

export type CheckboxQFOption = TitleQFOption & {
    docCount: number;
    facetKey: string;
};

export type FacetOption = {
    filterGroup: IFilterGroup<any>;
    filters: IFilter<any>[];
    maxShowing?: number;
    onChange: onChangeType;
    selectedFilters: IFilter<any>[];
};

export interface IQuickFilter {
    dictionary?: IDictionary;
    enableQuickFilter?: boolean;
    getSuggestionsList?: (
        searchText: string,
        setOptions: React.Dispatch<React.SetStateAction<(TitleQFOption | CheckboxQFOption)[]>>,
        setTotal: React.Dispatch<React.SetStateAction<number>>,
        setSelectedOptions: React.Dispatch<React.SetStateAction<CheckboxQFOption[]>>,
    ) => void;
    handleFacetClick?: (
        setFacetOptions: React.Dispatch<React.SetStateAction<FacetOption | undefined>>,
        option: TitleQFOption,
    ) => void;
    handleOnApply?: (options: CheckboxQFOption[], operator: TermOperators) => void;
    isLoading?: boolean;
    inputPrefixIcon?: ReactNode;
    inputSuffixIcon?: ReactNode;
    menuIcon?: ReactNode;
    searchInputRef?: React.RefObject<InputRef>;
}

const QuickFilter = ({
    dictionary,
    getSuggestionsList,
    handleFacetClick,
    handleOnApply,
    inputPrefixIcon,
    inputSuffixIcon,
    isLoading = false,
    searchInputRef,
}: IQuickFilter): ReactElement => {
    const [isOpenPopover, setOpenPopover] = useState(false);
    const [search, setSearch] = useState('');
    const [qfOptions, setQFOptions] = useState<(TitleQFOption | CheckboxQFOption)[]>([]);
    const [qfFacetOptions, setQFFacetOptions] = useState<FacetOption | undefined>(undefined);
    const [total, setTotal] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<CheckboxQFOption[]>([]);
    const [selectedFacet, setSelectedFacet] = useState<TitleQFOption | undefined>(undefined);
    const [selectedFacetOptions, setSelectedFacetOptions] = useState<IFilter[]>(qfFacetOptions?.selectedFilters || []);

    const handleOpenChange = (newOpen: boolean) => setOpenPopover(newOpen);

    const handleSearchChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const searchText = e.target.value;
            setSelectedFacet(undefined);
            setSearch(searchText);
            if (searchText.length >= 3 && getSuggestionsList) {
                getSuggestionsList(searchText, setQFOptions, setTotal, setSelectedOptions);
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

    const handleFacetChange = useCallback((fg: IFilterGroup<any>, f: IFilter<any>[]) => {
        setSelectedFacetOptions(f);
    }, []);

    const clearFilters = () => {
        setSelectedFacet(undefined);
        setOpenPopover(false);
        setSearch('');
        setQFOptions([]);
        setSelectedOptions([]);
        setSelectedFacetOptions([]);
    };

    const applyFilters = (operator: TermOperators) => {
        handleOnApply && handleOnApply(selectedOptions, operator);
        clearFilters();
    };

    const applyFacetFilters = (operator: TermOperators) => {
        if (qfFacetOptions?.onChange)
            qfFacetOptions.onChange(
                qfFacetOptions.filterGroup,
                selectedFacetOptions.map((filter) => ({
                    ...filter,
                    data: {
                        ...filter.data,
                        operator: filter.data.min || filter.data.max ? filter.data.operator : operator,
                    },
                })),
            );

        clearFilters();
    };

    const onFacetClick = (option: TitleQFOption) => {
        setSelectedFacet(option);
        setSelectedOptions([]);
        setSearch('');
        if (handleFacetClick) handleFacetClick(setQFFacetOptions, option);
    };

    const renderOptions = useMemo(
        () =>
            qfOptions.map((option, index) =>
                option.type === 'title' ? (
                    <div className={styles.facetNameWrapper} key={index}>
                        <Button className={styles.facetNameBtn} onClick={() => onFacetClick(option)} type="link">
                            <Highlighter
                                highlightClassName={styles.highlight}
                                searchWords={[search]}
                                textToHighlight={option.label}
                            />
                        </Button>
                    </div>
                ) : (
                    <div className={styles.facetValueWrapper} key={index}>
                        <Checkbox
                            checked={selectedOptions.some(
                                (selectedOption) =>
                                    selectedOption.key === option.key &&
                                    selectedOption.facetKey === (option as CheckboxQFOption).facetKey,
                            )}
                            onChange={(e) => handleCheckboxChange(option as CheckboxQFOption, e.target.checked)}
                        >
                            <Highlighter
                                highlightClassName={styles.highlight}
                                searchWords={[search]}
                                textToHighlight={option.label}
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
            return <Typography.Text className={styles.popoverFacetTitle}>{selectedFacet.label}</Typography.Text>;
        }

        return (
            <Typography.Text className={styles.popoverTitle}>
                {search.length >= 3
                    ? `${total} ${get(dictionary, 'quickFilter.results', 'Results')}`
                    : get(dictionary, 'quickFilter.emptyMessage', 'Empty search')}
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
                                    {selectedFacet && qfFacetOptions ? (
                                        <>
                                            <div className={styles.scrollContentLevel2}>
                                                <FilterSelector
                                                    checkboxClassname={styles.checboxFilterSelector}
                                                    dictionary={dictionary}
                                                    filterGroup={qfFacetOptions?.filterGroup || {}}
                                                    filters={qfFacetOptions?.filters || []}
                                                    isQuickFilter={true}
                                                    maxShowing={qfFacetOptions?.maxShowing || 5}
                                                    noDataInputOption={false}
                                                    onChange={handleFacetChange}
                                                    searchInputVisible={false}
                                                    selectedFilters={qfFacetOptions?.selectedFilters || []}
                                                />
                                            </div>
                                            <div className={styles.popoverFooter}>
                                                <Button className={styles.clearBtn} onClick={clearFilters} type="text">
                                                    {get(dictionary, 'actions.clear', 'Clear')}
                                                </Button>
                                                <Dropdown.Button
                                                    className={styles.applyBtn}
                                                    disabled={selectedFacet && !selectedFacetOptions.length}
                                                    menu={{
                                                        items: [
                                                            {
                                                                key: TermOperators.in,
                                                                label: get(dictionary, 'operators.anyOf', 'Any of'),
                                                            },
                                                            {
                                                                key: TermOperators.all,
                                                                label: get(dictionary, 'operators.allOf', 'All of'),
                                                            },
                                                            {
                                                                key: TermOperators['not-in'],
                                                                label: get(dictionary, 'operators.noneOf', 'None of'),
                                                            },
                                                        ],
                                                        onClick: (e) => applyFacetFilters(e.key as TermOperators),
                                                    }}
                                                    onClick={() => applyFacetFilters(TermOperators.in)}
                                                    size="small"
                                                    type="primary"
                                                >
                                                    {get(dictionary, 'actions.apply', 'Apply')}
                                                </Dropdown.Button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <ScrollContent className={styles.scrollContentLevel1}>
                                                {renderOptions}
                                            </ScrollContent>
                                            <div className={styles.popoverFooter}>
                                                <Button className={styles.clearBtn} onClick={clearFilters} type="text">
                                                    {get(dictionary, 'actions.clear', 'Clear')}
                                                </Button>

                                                <Button
                                                    className={styles.applyBtn}
                                                    disabled={!selectedOptions.length}
                                                    onClick={() => applyFilters(TermOperators.in)}
                                                    type="primary"
                                                >
                                                    {get(dictionary, 'actions.apply', 'Apply')}
                                                </Button>
                                            </div>
                                        </>
                                    )}
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
                        placeholder={get(dictionary, 'quickFilter.placeholder', 'Quick filter...')}
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
