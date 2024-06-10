import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Space } from 'antd';

import { TABLE_EMPTY_PLACE_HOLDER } from '../../../common/constants';
import { generateQuery, generateValueFilter } from '../../../data/sqon/utils';
import { NO_GENE } from '../../Consequences/Cell';
import ExternalLink from '../../ExternalLink';
import { addQuery } from '../../QueryBuilder/utils/useQueryBuilderState';

import style from './index.module.css';

export type TGeneCell = {
    queryBuilderId: string;
    queryIndex: string;
    queryValue: string;
    symbol: string;
    omimGeneId?: string;
};

const GeneCell = ({ omimGeneId, queryBuilderId, queryIndex, queryValue, symbol }: TGeneCell): JSX.Element => {
    if (symbol && symbol === NO_GENE) return <>{TABLE_EMPTY_PLACE_HOLDER}</>;

    return (
        <Space className={style.addGene} data-testid="GeneCell_wrapper" direction="horizontal" size={4}>
            <ExternalLink
                data-testid="GeneCell_link"
                hasIcon={false}
                href={
                    omimGeneId
                        ? `https://www.omim.org/entry/${omimGeneId}`
                        : `https://www.omim.org/search?index=entry&start=1&limit=10&sort=score+desc%2C+prefix_sort+desc&search=${symbol}`
                }
            >
                {symbol}
            </ExternalLink>
            <div
                className={style.addGeneButton}
                data-testid="GeneCell_add-query"
                onClick={() => {
                    addQuery({
                        query: generateQuery({
                            newFilters: [
                                generateValueFilter({
                                    field: 'genes.symbol',
                                    index: queryIndex,
                                    value: [queryValue],
                                }),
                            ],
                        }),
                        queryBuilderId,
                        setAsActive: true,
                    });
                }}
            >
                <PlusOutlined />
            </div>
        </Space>
    );
};

export default GeneCell;
