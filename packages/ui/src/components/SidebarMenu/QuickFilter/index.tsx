import React, { ReactNode, useState } from 'react';
import { Button, Checkbox, Input, InputRef, Popover, Tag, Typography } from 'antd';
import Highlighter from 'react-highlight-words';

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
};

export type CheckboxQFOption = {
    key: string;
    title: string;
    docCount: number;
    type: QuickFilterType;
    facetKey: string;
    index?: string;
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
    inputPrefixIcon = undefined,
    inputSuffixIcon = undefined,
    placeholder = 'Quick filter...',
    queryBuilderId = '',
    resultsLabel = 'Results',
    searchInputRef,
}: IQuickFilter) => {
    const [isOpenPopover, setOpenPopover] = useState<boolean>(false);
    const [search, setSearch] = useState('');
    const [qfOptions, setQFOptions] = useState<(TitleQFOption | CheckboxQFOption)[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<CheckboxQFOption[]>([]);
    const { activeQuery } = useQueryBuilderState(queryBuilderId || '');

    const handleOpenChange = (newOpen: boolean) => {
        setOpenPopover(newOpen);
    };

    return (
        <div className={styles.searchMenuItem}>
            <Popover
                content={
                    <>
                        {search.length >= 3 && (
                            <>
                                <ScrollContent className={styles.scrollContent}>
                                    {qfOptions.map((option, index) =>
                                        option.type === QuickFilterType.TITLE ? (
                                            <div className={styles.facetNameWrapper} key={index}>
                                                <Button
                                                    className={styles.facetNameBtn}
                                                    // TODO SKFP-1078 open facet
                                                    onClick={() => console.log('facet name click')}
                                                    type="link"
                                                >
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
                                                    onChange={(e) => {
                                                        const { checked } = e.target;
                                                        let newSelectedOptions: CheckboxQFOption[];
                                                        if (checked) {
                                                            newSelectedOptions = [
                                                                ...selectedOptions,
                                                                option as CheckboxQFOption,
                                                            ];
                                                        } else {
                                                            newSelectedOptions = selectedOptions.filter(
                                                                (opt: CheckboxQFOption) => opt.key !== option.key,
                                                            );
                                                        }
                                                        setSelectedOptions(newSelectedOptions);
                                                    }}
                                                >
                                                    <Highlighter
                                                        highlightClassName={styles.highlight}
                                                        searchWords={[search]}
                                                        textToHighlight={option.title}
                                                    />
                                                </Checkbox>
                                                <Tag className={styles.tag}>
                                                    {numberFormat((option as CheckboxQFOption).docCount)}
                                                </Tag>
                                            </div>
                                        ),
                                    )}
                                </ScrollContent>
                                <div className={styles.popoverFooter}>
                                    <Button
                                        className={styles.cancelBtn}
                                        onClick={() => {
                                            setOpenPopover(false);
                                            setSearch('');
                                            setQFOptions([]);
                                        }}
                                        type="link"
                                    >
                                        {cancelLabel}
                                    </Button>
                                    <Button
                                        className={styles.applyBtn}
                                        disabled={!selectedOptions.length}
                                        onClick={() => {
                                            // Add to QB
                                            setOpenPopover(false);
                                            setSearch('');
                                            setQFOptions([]);
                                        }}
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
                    search.length >= 3 ? (
                        <Typography.Text
                            className={styles.popoverTitle}
                        >{`${qfOptions.length} ${resultsLabel}`}</Typography.Text>
                    ) : (
                        <Typography.Text className={styles.popoverTitle}>{emptyMessage}</Typography.Text>
                    )
                }
                trigger="click"
            >
                <Input
                    onChange={(value) => {
                        const searchText = value.target.value;
                        setSearch(searchText);
                        if (searchText.length >= 3 && getSuggestionsList)
                            getSuggestionsList(setQFOptions, activeQuery, searchText);
                        else setQFOptions([]);
                    }}
                    placeholder={placeholder || 'Quick filter...'}
                    prefix={inputPrefixIcon ? inputPrefixIcon : undefined}
                    ref={searchInputRef}
                    suffix={inputSuffixIcon ? inputSuffixIcon : <SearchIcon />}
                    value={search}
                />
            </Popover>
        </div>
    );
};

export default QuickFilter;
