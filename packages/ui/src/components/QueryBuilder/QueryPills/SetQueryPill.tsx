import React, { Fragment, useContext } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from 'antd';
import cx from 'classnames';
import { capitalize } from 'lodash';

import { IValueFilter } from '../../../data/sqon/types';
import { QueryCommonContext } from '../context';
import ElementOperator from '../icons/ElementOperator';
import QueryValues from '../QueryValues';

import styles from './QueryPill.module.scss';

interface IReferenceQueryPillProps {
    isBarActive?: boolean;
    valueFilter: IValueFilter;
    onRemove: () => void;
}

const SetQueryPill = ({ isBarActive, onRemove, valueFilter }: IReferenceQueryPillProps): JSX.Element => {
    const { dictionary } = useContext(QueryCommonContext);

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
