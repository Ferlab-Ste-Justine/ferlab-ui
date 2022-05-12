import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from 'antd';
import cx from 'classnames';
import QueryValues from '../QueryValues';
import ElementOperator from '../icons/ElementOperator';
import { IValueFilter } from '../../../data/sqon/types';
import { capitalize } from 'lodash';
import { IDictionary } from '../types';

import styles from '@ferlab/style/components/queryBuilder/QueryPill.module.scss';

interface IReferenceQueryPillProps {
    isBarActive?: boolean;
    valueFilter: IValueFilter;
    onRemove: Function;
    dictionary?: IDictionary;
}

const SetQueryPill = ({ onRemove, isBarActive, valueFilter, dictionary = {} }: IReferenceQueryPillProps) => (
    <div className={cx(styles.queryPillContainer, { [styles.selected]: isBarActive })}>
        <>
            <span className={`${styles.field}`}>
                {valueFilter.content.index
                    ? capitalize(valueFilter.content.index)
                    : dictionary.query?.facet
                    ? dictionary.query?.facet(valueFilter.content.field)
                    : valueFilter.content.field}
            </span>
            <ElementOperator className={styles.operator} />
        </>
        <QueryValues dictionary={dictionary} valueFilter={valueFilter} />
        <Button className={styles.close} type="text">
            <AiOutlineClose onClick={(e) => onRemove()} />
        </Button>
    </div>
);

export default SetQueryPill;
