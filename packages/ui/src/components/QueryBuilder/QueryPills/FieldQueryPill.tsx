import React, { Fragment, useContext, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Button, Dropdown, Spin } from 'antd';
import cx from 'classnames';

import { FieldOperators } from '../../../data/sqon/operators';
import { IValueFilter } from '../../../data/sqon/types';
import { isBooleanFilter, isRangeFilter } from '../../../data/sqon/utils';
import ConditionalWrapper from '../../utils/ConditionalWrapper';
import { QueryBuilderContext } from '../context';
import ElementOperator from '../icons/ElementOperator';
import EqualOperator from '../icons/EqualOperator';
import GreaterThanOperator from '../icons/GreaterThanOperator';
import GreaterThanOrEqualOperator from '../icons/GreaterThanOrEqualOperator';
import LessThanOperator from '../icons/LessThanOperator';
import LessThanOrEqualOperator from '../icons/LessThanOrEqualOperator';
import NotInOperator from '../icons/NotInOperator';
import QueryValues from '../QueryValues';

import styles from '@ferlab/style/components/queryBuilder/QueryPill.module.scss';

interface IFieldQueryPillProps {
    isBarActive?: boolean;
    valueFilter: IValueFilter;
    onRemove: () => void;
}

interface IOperatorProps {
    type: string;
    className?: string;
}

const APPLY_KEY = 'apply';

export const Operator = ({ className = '', type }: IOperatorProps) => {
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

const FieldQueryPill = ({ isBarActive, onRemove, valueFilter }: IFieldQueryPillProps) => {
    const { dictionary, facetFilterConfig, showLabels } = useContext(QueryBuilderContext);
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
    const isFacetFilterEnableForField = () =>
        facetFilterConfig.enable && !facetFilterConfig.blacklistedFacets?.includes(valueFilter.content.field);

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
        <div className={cx(styles.queryPillContainer, { [styles.selected]: isBarActive })}>
            {(showLabels || isBooleanFilter(valueFilter) || isRangeFilter(valueFilter)) && (
                <Fragment>
                    <span className={`${styles.field}`}>
                        {dictionary.query?.facet
                            ? dictionary.query?.facet(valueFilter.content.field)
                            : valueFilter.content.field}
                    </span>
                    <Operator className={styles.operator} type={valueFilter.op} />
                </Fragment>
            )}
            <ConditionalWrapper
                condition={isFacetFilterEnableForField()}
                wrapper={(children) => (
                    <Dropdown
                        getPopupContainer={(trigger) => trigger.parentElement!}
                        onVisibleChange={(visible) => {
                            if (visible) {
                                setDropdownContent(undefined);
                            }
                            setFilterDropdownVisible(visible);
                        }}
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
                        overlayClassName={styles.filtersDropdown}
                        trigger={['click']}
                        visible={filterDropdownVisible}
                    >
                        {children}
                    </Dropdown>
                )}
            >
                <QueryValues
                    isElement={valueFilter.op === FieldOperators.between}
                    onClick={isFacetFilterEnableForField() ? () => handleQueryPillClick(isBarActive!) : undefined}
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
        </div>
    );
};

export default FieldQueryPill;
