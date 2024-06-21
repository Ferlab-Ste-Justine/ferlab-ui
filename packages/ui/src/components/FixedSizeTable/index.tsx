import React from 'react';
import { useEffect, useRef, useState } from 'react';

import useElementSize from '../../hooks/useElementSize';
import useWindowSize from '../../hooks/useWindowSize';

import styles from './index.module.css';

interface ITableDimension {
    x: number | string;
    y: number | string;
}

interface FixedSizeTableProps {
    elementId: string;
    fixedProTable: (d: ITableDimension) => React.ReactElement;
}

const FixedSizeTable = ({ elementId, fixedProTable }: FixedSizeTableProps): JSX.Element => {
    const windowSize = useWindowSize();
    const [dimension, setDimension] = useState<ITableDimension>({ x: 0, y: 0 });
    const queryBuilderDimensions = useElementSize(elementId);
    const thisRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = thisRef.current;
        if (node) {
            const { y: top } = node.getBoundingClientRect();

            const y = windowSize.height - (top + 225);

            setDimension({ x: 'max-content', y });
        }
    }, [windowSize, thisRef, queryBuilderDimensions]);
    return (
        <div className={styles.fixedSizeTable} ref={thisRef}>
            {fixedProTable(dimension)}
        </div>
    );
};

export default FixedSizeTable;
