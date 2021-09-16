import React, { useState, useEffect, useRef } from 'react';
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
import { IDictionary, TOnFacetClick } from '../types';
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
    onFacetClick?: TOnFacetClick;
    enableFacetFilter?: boolean;
    filtersDropdownContent?: React.ReactElement;
}

interface IOperatorProps {
    type: string;
    className?: string;
}

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
    onFacetClick,
    enableFacetFilter,
    filtersDropdownContent = undefined,
}: IFieldQueryPillProps) => {
    const [tryOpenQueryPillFilter, setTryOpenQueryPillFilter] = useState(false);
    const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
    const [dropdownContent, setDropdownContent] = useState(filtersDropdownContent);
    const handleQueryPillClick = (isBarActive: boolean) => {
        if (isBarActive && onFacetClick) {
            onFacetClick(query.content.field);
            setTryOpenQueryPillFilter(false);
        } else {
            setTryOpenQueryPillFilter(true);
        }
    };

    useEffect(() => {
        if (filtersDropdownContent) {
            setDropdownContent(filtersDropdownContent);
        }
    }, [filtersDropdownContent]);

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
                        {dictionary.query?.facet|| query.content.field}
                    </span>
                    <Operator className={styles.operator} type={query.op} />
                </>
            )}

            <ConditionalWrapper
                condition={enableFacetFilter!}
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
                            (enableFacetFilter && dropdownContent) || (
                                <div className={styles.filterLoader}>
                                    <Spin />
                                </div>
                            )
                        }
                        trigger={['click']}
                        getPopupContainer={(trigger) => trigger.parentElement!}
                    >
                        {children}
                    </Dropdown>
                )}
            >
                <QueryValues
                    onClick={enableFacetFilter ? () => handleQueryPillClick(isBarActive!) : undefined}
                    isElement={query.op === FieldOperators.between}
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
