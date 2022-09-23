import { Button } from 'antd';
import cx from 'classnames';
import { capitalize } from 'lodash';
import React, { Fragment, useContext } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { IValueFilter } from '../../../data/sqon/types';
import ElementOperator from '../icons/ElementOperator';
import QueryValues from '../QueryValues';

import styles from '@ferlab/style/components/queryBuilder/QueryPill.module.scss';
import { QueryBuilderContext } from '../context';

interface IReferenceQueryPillProps {
    isBarActive?: boolean;
    valueFilter: IValueFilter;
    onRemove: Function;
}

const SetQueryPill = ({ onRemove, isBarActive, valueFilter }: IReferenceQueryPillProps) => {
    const { dictionary } = useContext(QueryBuilderContext);

    return (
        <div className={cx(styles.queryPillContainer, { [styles.selected]: isBarActive })}>
            <Fragment>
                <span className={`${styles.field}`}>
                    {dictionary.query?.facet
                        ? dictionary.query?.facet(valueFilter.content.field)
                        : valueFilter.content.index
                        ? capitalize(valueFilter.content.index)
                        : valueFilter.content.field}
                </span>
                <ElementOperator className={styles.operator} />
            </Fragment>
            <QueryValues valueFilter={valueFilter} />
            <Button className={styles.close} type="text">
                <AiOutlineClose onClick={(e) => onRemove()} />
            </Button>
        </div>
    );
};

export default SetQueryPill;
