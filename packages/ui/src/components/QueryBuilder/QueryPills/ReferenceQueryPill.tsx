import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from 'antd';
import cx from 'classnames';

import ReferenceQueryValues from '../ReferenceQueryValues';

import styles from './QueryPill.module.scss';

interface IReferenceQueryPillProps {
    isBarActive?: boolean;
    refIndex: number;
    onRemove: Function;
    getColorForReference?: (refIndex: number) => string;
}

const ReferenceQueryPill = ({
    refIndex,
    onRemove,
    isBarActive,
    getColorForReference = () => '',
}: IReferenceQueryPillProps) => (
    <div className={cx(styles.queryPillContainer, { [styles.selected]: isBarActive })}>
        <ReferenceQueryValues highlightColor={getColorForReference(refIndex)} refIndex={refIndex} />
        <Button className={styles.close} type="text">
            <AiOutlineClose onClick={(e) => onRemove()} />
        </Button>
    </div>
);

export default ReferenceQueryPill;
