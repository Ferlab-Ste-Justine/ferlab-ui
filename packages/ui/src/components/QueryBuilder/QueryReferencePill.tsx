import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from 'antd';
import cx from 'classnames';

import StackLayout from '../../layout/StackLayout';

import QueryReferenceValue from './QueryReferenceValue';
import { TCallbackRemoveAction } from './types';

import styles from '@ferlab/style/components/queryBuilder/QueryPill.module.scss';

interface IQueryBarProps {
    currentSelectedQuery?: boolean;
    refIndex: number;
    onRemove: TCallbackRemoveAction;
    getColorForReference?: (refIndex: number) => string;
}

const QueryReferencePill: React.FC<IQueryBarProps> = ({
    refIndex,
    onRemove,
    currentSelectedQuery,
    getColorForReference = () => '',
}) => {
    const containerClassNames = cx(styles.container, { [styles.selected]: currentSelectedQuery });

    return (
        <StackLayout className={containerClassNames}>
            <QueryReferenceValue refIndex={refIndex} highlightColor={getColorForReference(refIndex)} />
            <Button className={styles.close} type="text">
                <AiOutlineClose onClick={() => {}} />
            </Button>
        </StackLayout>
    );
};

export default QueryReferencePill;
