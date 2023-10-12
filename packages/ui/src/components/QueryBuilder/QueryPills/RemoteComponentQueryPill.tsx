import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from 'antd';
import cx from 'classnames';

import { IRemoteComponent, IValueFilter } from '../../../data/sqon/types';
import { isBooleanFilter, isRangeFilter } from '../../../data/sqon/utils';
import { QueryBuilderContext, QueryCommonContext } from '../context';
import QueryValues from '../QueryValues';

import { Operator } from './FieldQueryPill';

import styles from './QueryPill.module.scss';

interface IRemoteComponentQueryPillProps {
    isBarActive?: boolean;
    valueFilter: IValueFilter;
    onRemove: () => void;
    remoteComponentMapping?: (props: IRemoteComponent) => void;
}

const RemoteComponentQueryPill = ({
    isBarActive,
    onRemove,
    remoteComponentMapping,
    valueFilter,
}: IRemoteComponentQueryPillProps): ReactElement => {
    const { dictionary, showLabels } = useContext(QueryCommonContext);
    const [tryOpenQueryPillFilter, setTryOpenQueryPillFilter] = useState(false);
    const handleQueryPillClick = (isBarActive: boolean) => {
        if (remoteComponentMapping && valueFilter.content.remoteComponent) {
            remoteComponentMapping(valueFilter.content.remoteComponent);
        }

        setTryOpenQueryPillFilter(!isBarActive);
    };

    useEffect(() => {
        if (tryOpenQueryPillFilter) {
            handleQueryPillClick(isBarActive!);
        }
    }, [isBarActive]);

    return (
        <div className={cx(styles.queryPillContainer, { [styles.selected]: isBarActive })}>
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
            <QueryValues
                isElement={true}
                onClick={() => handleQueryPillClick(!!isBarActive)}
                valueFilter={valueFilter}
            />
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

export default RemoteComponentQueryPill;
