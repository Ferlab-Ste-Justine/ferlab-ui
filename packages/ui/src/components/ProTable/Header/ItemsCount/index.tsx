import React from 'react';
import cx from 'classnames';
import { Typography } from 'antd';
import { IProTableDictionnary } from '../../types';

type Props = {
    className?: string;
    dictionnary?: IProTableDictionnary;
    page: number;
    size: number;
    total: number;
};

export const ItemsCount = ({ className = '', page, size, total, dictionnary = {} }: Props): React.ReactElement => {
    const isLastPage = page >= total / size;
    const hasLessThanPageSize = total % size > 0;
    const from = (page - 1) * size + 1;
    const to = from + (isLastPage && hasLessThanPageSize ? total % size : size) - 1;

    return (
        <div className={cx(className)}>
            {(to < size && page === 1) || total === 0 ? (
                <Typography.Text>
                    {total === 0 ? (
                        dictionnary.itemCount?.noResults || 'No Results'
                    ) : (
                        <span>
                            <strong>{total}</strong> {dictionnary.itemCount?.results || 'Results'}
                        </span>
                    )}
                </Typography.Text>
            ) : (
                <Typography.Text>
                    <span>
                        {dictionnary.itemCount?.results || 'Results'}
                        <strong>{from}</strong> - <strong>{to}</strong> {dictionnary.itemCount?.of || 'of'}{' '}
                        <strong>{total}</strong>
                    </span>
                </Typography.Text>
            )}
        </div>
    );
};
