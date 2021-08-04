import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from 'antd';
import cx from 'classnames';

import StackLayout from '../../../layout/StackLayout';

import ReferenceQueryValues from '../ReferenceQueryValues';

import styles from '@ferlab/style/components/queryBuilder/QueryPill.module.scss';

interface IReferenceQueryPillProps {
    isBarActive?: boolean;
    refIndex: number;
    onRemove: Function;
    getColorForReference?: (refIndex: number) => string;
}

const ReferenceQueryPill: React.FC<IReferenceQueryPillProps> = ({
    refIndex,
    onRemove,
    isBarActive,
    getColorForReference = () => '',
}) => {
    const containerClassNames = cx(styles.container, { [styles.selected]: isBarActive });

    return (
        <StackLayout className={containerClassNames}>
            <ReferenceQueryValues refIndex={refIndex} highlightColor={getColorForReference(refIndex)} />
            <Button className={styles.close} type="text">
                <AiOutlineClose onClick={() => onRemove()} />
            </Button>
        </StackLayout>
    );
};

export default ReferenceQueryPill;
