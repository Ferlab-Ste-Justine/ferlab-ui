import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from 'antd';
import cx from 'classnames';

import StackLayout from '../../layout/StackLayout';

import QueryReferenceValue from './QueryReferenceValue';
import { TCallbackRemoveReferenceAction } from './types';

import styles from '@ferlab/style/components/queryBuilder/QueryPill.module.scss';

interface IQueryBarProps {
    isBarActive?: boolean;
    refIndex: number;
    onRemove: Function;
    getColorForReference?: (refIndex: number) => string;
}

const QueryReferencePill: React.FC<IQueryBarProps> = ({
    refIndex,
    onRemove,
    isBarActive,
    getColorForReference = () => '',
}) => {
    const containerClassNames = cx(styles.container, { [styles.selected]: isBarActive });

    return (
        <StackLayout className={containerClassNames}>
            <QueryReferenceValue refIndex={refIndex} highlightColor={getColorForReference(refIndex)} />
            <Button className={styles.close} type="text">
                <AiOutlineClose onClick={() => onRemove()} />
            </Button>
        </StackLayout>
    );
};

export default QueryReferencePill;
