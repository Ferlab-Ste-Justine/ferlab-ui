import React, { useState } from 'react';
import { Typography } from 'antd';
import { get } from 'lodash';
import cx from 'classnames';

import styles from '@ferlab/style/components/tables/ExpandableCell.module.scss';

export interface IExpandableCellDict {
    'see.less': string;
    'see.more': string;
}

export interface IExpandableCellProps<T> {
    nOfElementsWhenCollapsed?: number;
    dataSource: T[];
    renderItem?: (item: T, id: string) => React.ReactNode;
    dictionnary?: IExpandableCellDict;
    className?: string;
}

const DEFAULT_NUM_COLLAPSED = 3;

const renderItemDefault = (item: any, id: string) => <span key={id}>{item}</span>;

const ExpandableCell = <T,>({
    nOfElementsWhenCollapsed = DEFAULT_NUM_COLLAPSED,
    dataSource = [],
    renderItem = renderItemDefault,
    dictionnary,
    className = '',
}: IExpandableCellProps<T>) => {
    const [showAll, setShowAll] = useState(false);
    const dataTotalLength = dataSource?.length || 0;
    const sliceNum = showAll ? dataTotalLength : nOfElementsWhenCollapsed;
    const showButton = dataTotalLength > nOfElementsWhenCollapsed;
    const slicedData = dataSource.slice(0, sliceNum);
    return (
        <>
            {slicedData.map((item, index: number) => renderItem(item, `${index} `))}
            {showButton && (
                <Typography.Link
                    className={cx(styles.fuiExpandableCellBtn, className)}
                    onClick={() => setShowAll(!showAll)}
                >
                    {showAll ? get(dictionnary, 'see.less', 'See less') : get(dictionnary, 'see.more', 'See more')}
                </Typography.Link>
            )}
        </>
    );
};

export default ExpandableCell;
