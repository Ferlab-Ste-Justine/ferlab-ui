import React, { useContext } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from 'antd';
import cx from 'classnames';

import { IValueFilter } from '../../../data/sqon/types';
import { QueryCommonContext } from '../context';
import ElementOperator from '../icons/ElementOperator';
import QueryValues from '../QueryValues';

import styles from './QueryPill.module.css';

export interface IUploadedListQueryPillProps {
    isBarActive: boolean;
    valueFilter: IValueFilter;
    onRemove: () => void;
}

const UploadedListQueryPill: React.FC<IUploadedListQueryPillProps> = ({ isBarActive, onRemove, valueFilter }) => {
    const { dictionary, showLabels } = useContext(QueryCommonContext);

    return (
        <div className={cx(styles.queryPillContainer, { [styles.selected]: isBarActive })}>
            {showLabels && (
                <>
                    <span className={`${styles.field}`}>
                        {dictionary.query?.facet
                            ? dictionary.query?.facet(valueFilter.content.field)
                            : valueFilter.content.field}
                    </span>
                    <ElementOperator className={styles.operator} testId={'element-operator'} />
                </>
            )}
            <QueryValues valueFilter={valueFilter} />
            <Button className={styles.close} type="text">
                <AiOutlineClose
                    data-testid={'close-button'}
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                />
            </Button>
        </div>
    );
};

export default UploadedListQueryPill;
