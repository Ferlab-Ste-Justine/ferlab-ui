import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Button, Dropdown, Spin } from 'antd';
import cx from 'classnames';

import StackLayout from '../../../layout/StackLayout';

import ElementOperator from '../icons/ElementOperator';
import EqualOperator from '../icons/EqualOperator';
import GreaterThanOrEqualOperator from '../icons/GreaterThanOrEqualOperator';
import LessThanOrEqualOperator from '../icons/LessThanOrEqualOperator';
import GreaterThanOperator from '../icons/GreaterThanOperator';
import LessThanOperator from '../icons/LessThanOperator';
import QueryValues from '../QueryValues';
import { IDictionary, IFacetFilterConfig } from '../types';
import { IValueFilter } from '../../../data/sqon/types';
import { FieldOperators } from '../../../data/sqon/operators';
import { isBooleanFilter, isRangeFilter } from '../../../data/sqon/utils';
import ConditionalWrapper from '../../utils/ConditionalWrapper';

import styles from '@ferlab/style/components/queryBuilder/QueryPill.module.scss';

interface IFieldQueryPillProps {
    isBarActive?: boolean;
    query: IValueFilter;
    dictionary?: IDictionary;
    showLabels?: boolean;
    onRemove: () => void;
    facetFilterConfig: IFacetFilterConfig;
}

interface IOperatorProps {
    type: string;
    className?: string;
}

const APPLY_KEY = 'apply';

const Operator = ({ className = '', type }: IOperatorProps) => {
    switch (type) {
        case FieldOperators['>']:
            return <GreaterThanOperator className={className} />;
        case FieldOperators['>=']:
            return <GreaterThanOrEqualOperator className={className} />;
        case FieldOperators['<']:
            return <LessThanOperator className={className} />;
        case FieldOperators['<=']:
            return <LessThanOrEqualOperator className={className} />;
        case FieldOperators.between:
            return <ElementOperator className={className} />;
        default:
            return <EqualOperator className={className} />;
    }
};

const FieldQueryPill = ({
    query,
    dictionary = {},
    showLabels,
    onRemove,
    isBarActive,
    facetFilterConfig,
}: IFieldQueryPillProps) => {
    const [tryOpenQueryPillFilter, setTryOpenQueryPillFilter] = useState(false);
    const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
    const [dropdownContent, setDropdownContent] = useState(facetFilterConfig.selectedFilterContent);
    const handleQueryPillClick = (isBarActive: boolean) => {
        if (isBarActive && facetFilterConfig.onFacetClick) {
            facetFilterConfig.onFacetClick(query.content.field);
            setTryOpenQueryPillFilter(false);
        } else {
            setTryOpenQueryPillFilter(true);
        }
    };
    const isFacetFilterEnableForField = () => {
        return facetFilterConfig.enable && !facetFilterConfig.blacklistedFacets?.includes(query.content.field);
    };

    useEffect(() => {
        if (facetFilterConfig.selectedFilterContent) {
            setDropdownContent(facetFilterConfig.selectedFilterContent);
        }
    }, [facetFilterConfig.selectedFilterContent]);

    useEffect(() => {
        if (tryOpenQueryPillFilter) {
            handleQueryPillClick(isBarActive!);
        }
    }, [isBarActive]);

    return (
        <StackLayout className={cx(styles.queryPillContainer, { [styles.selected]: isBarActive })}>
            {(showLabels || isBooleanFilter(query) || isRangeFilter(query)) && (
                <>
                    <span className={`${styles.field}`}>
                        {dictionary.query?.facet ? dictionary.query?.facet(query.content.field) : query.content.field}
                    </span>
                    <Operator className={styles.operator} type={query.op} />
                </>
            )}

            <ConditionalWrapper
                condition={isFacetFilterEnableForField()}
                wrapper={(children) => (
                    <Dropdown
                        visible={filterDropdownVisible}
                        onVisibleChange={(visible) => {
                            if (visible) {
                                setDropdownContent(undefined);
                            }
                            setFilterDropdownVisible(visible);
                        }}
                        overlayClassName={styles.filtersDropdown}
                        overlay={
                            <div
                                onClick={(e: any) => {
                                    if (e.target.getAttribute('data-key') == APPLY_KEY && filterDropdownVisible) {
                                        setFilterDropdownVisible(false);
                                    }
                                }}
                            >
                                {(facetFilterConfig.enable && dropdownContent) || (
                                    <div className={styles.filterLoader}>
                                        <Spin />
                                    </div>
                                )}
                            </div>
                        }
                        trigger={['click']}
                        getPopupContainer={(trigger) => trigger.parentElement!}
                    >
                        {children}
                    </Dropdown>
                )}
            >
                <QueryValues
                    onClick={isFacetFilterEnableForField() ? () => handleQueryPillClick(isBarActive!) : undefined}
                    isElement={query.op === FieldOperators.between}
                    dictionary={dictionary}
                    query={query}
                />
            </ConditionalWrapper>
            <Button className={styles.close} type="text">
                <AiOutlineClose onClick={() => onRemove()} />
            </Button>
        </StackLayout>
    );
};

export default FieldQueryPill;
