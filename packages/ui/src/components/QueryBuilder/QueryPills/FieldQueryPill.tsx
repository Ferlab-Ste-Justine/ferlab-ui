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
import NotInOperator from '../icons/NotInOperator';
import QueryValues from '../QueryValues';
import { IDictionary, IFacetFilterConfig } from '../types';
import { IValueFilter } from '../../../data/sqon/types';
import { FieldOperators } from '../../../data/sqon/operators';
import { isBooleanFilter, isRangeFilter } from '../../../data/sqon/utils';
import ConditionalWrapper from '../../utils/ConditionalWrapper';

import styles from '@ferlab/style/components/queryBuilder/QueryPill.module.scss';

interface IFieldQueryPillProps {
    isBarActive?: boolean;
    valueFilter: IValueFilter;
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
        case FieldOperators['not-in']:
        case FieldOperators['some-not-in']:
            return <NotInOperator className={className} />;
        default:
            return <EqualOperator className={className} />;
    }
};

const FieldQueryPill = ({
    valueFilter,
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
            facetFilterConfig.onFacetClick(valueFilter);
            setTryOpenQueryPillFilter(false);
        } else {
            setTryOpenQueryPillFilter(true);
        }
    };
    const isFacetFilterEnableForField = () => {
        return facetFilterConfig.enable && !facetFilterConfig.blacklistedFacets?.includes(valueFilter.content.field);
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
        <StackLayout className={cx(styles.queryPillContainer, { [styles.selected]: isBarActive })} flexOwn>
            {(showLabels || isBooleanFilter(valueFilter) || isRangeFilter(valueFilter)) && (
                <>
                    <span className={`${styles.field}`}>
                        {dictionary.query?.facet
                            ? dictionary.query?.facet(valueFilter.content.field)
                            : valueFilter.content.field}
                    </span>
                    <Operator className={styles.operator} type={valueFilter.op} />
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
                    isElement={valueFilter.op === FieldOperators.between}
                    dictionary={dictionary}
                    valueFilter={valueFilter}
                />
            </ConditionalWrapper>
            <Button className={styles.close} type="text">
                <AiOutlineClose
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                />
            </Button>
        </StackLayout>
    );
};

export default FieldQueryPill;
