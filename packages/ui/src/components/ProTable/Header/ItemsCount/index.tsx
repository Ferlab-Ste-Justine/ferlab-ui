import React from 'react';
import { Space, Typography } from 'antd';

import { IProTableDictionary } from '../../types';

type Props = {
    className?: string;
    dictionnary?: IProTableDictionary;
    hidden?: boolean;
    page: number;
    size: number;
    total: number;
};

export const ItemsCount = ({
    className = '',
    dictionnary = {},
    hidden = false,
    page,
    size,
    total,
}: Props): React.ReactElement => {
    if (hidden) {
        return <></>;
    }

    const isLastPage = page >= total / size;
    const hasLessThanPageSize = total % size > 0;
    const from = (page - 1) * size + 1;
    const to = from + (isLastPage && hasLessThanPageSize ? total % size : size) - 1;
    const formattedFrom = dictionnary.numberFormat ? dictionnary.numberFormat(from) : from;
    const formattedTo = dictionnary.numberFormat ? dictionnary.numberFormat(to) : to;

    const formatNumber = () => (dictionnary.numberFormat ? dictionnary.numberFormat(total) : total);

    return (
        <Space className={className}>
            {(to < size && page === 1) || total === 0 ? (
                <Typography.Text>
                    {total === 0 ? (
                        dictionnary.itemCount?.noResults || 'No Results'
                    ) : (
                        <span>
                            <strong>{formatNumber()}</strong>
                            {' ' +
                                (total > 1
                                    ? dictionnary.itemCount?.results || 'Results'
                                    : dictionnary.itemCount?.result || 'Result')}
                        </span>
                    )}
                </Typography.Text>
            ) : (
                <Typography.Text>
                    <span>
                        {dictionnary.itemCount?.results || 'Results'} <strong>{formattedFrom}</strong> -{' '}
                        <strong>{formattedTo}</strong> {dictionnary.itemCount?.of || 'of'}{' '}
                        <strong>{formatNumber()}</strong>
                        {dictionnary.itemCount?.resultSuffix && <span> {dictionnary.itemCount?.resultSuffix}</span>}
                    </span>
                </Typography.Text>
            )}
        </Space>
    );
};
