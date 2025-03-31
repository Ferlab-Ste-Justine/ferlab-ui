import React from 'react';
import { Modal } from 'antd';

import CardErrorPlaceholder from '../../../view/v2/GridCard/GridCardErrorPlaceholder';
import { IDictionary } from '../..//QueryBuilder/types';
import { QueryDictionaryContext } from '../../QueryBuilder/context';

import { TVennChartDictionary } from './utils';
import VennChartExplo, { DEFAULT_VENN_CHART_DICTIONARY, TVennChartExplo } from '.';

const DEFAULT_VENN_MODAL_DICTIONARY = {
    ...DEFAULT_VENN_CHART_DICTIONARY,
    ok: 'Close',
    title: 'Set operations',
};

type VennModalDictionary = TVennChartDictionary & {
    title: string;
    ok: string;
};

type VennModalProps = Omit<TVennChartExplo, 'size'> & {
    queryPillDictionary?: IDictionary;
    dictionary?: VennModalDictionary;
    open?: boolean;
    error?: boolean;
    width?: number;
    vennSize: {
        width: number;
        height: number;
    };
};

const VennModal = ({
    analytics,
    dictionary = DEFAULT_VENN_MODAL_DICTIONARY,
    error = false,
    handleClose,
    handleIndexChange,
    handleSubmit,
    loading = true,
    open = false,
    operations,
    options,
    queryPillDictionary = {},
    savedSets,
    summary,
    vennSize,
    width = 1338,
}: VennModalProps): JSX.Element => (
    <QueryDictionaryContext.Provider value={{ dictionary: queryPillDictionary }}>
        <Modal
            cancelButtonProps={{ hidden: true }}
            destroyOnClose
            okText={dictionary.ok}
            onCancel={handleClose}
            onOk={handleClose}
            open={open}
            title={dictionary.title}
            width={width}
        >
            {error && <CardErrorPlaceholder />}

            {!error && (
                <VennChartExplo
                    analytics={analytics}
                    dictionary={dictionary}
                    handleClose={handleClose}
                    handleIndexChange={handleIndexChange}
                    handleSubmit={handleSubmit}
                    loading={loading}
                    operations={operations}
                    options={options}
                    savedSets={savedSets}
                    size={vennSize}
                    summary={summary}
                />
            )}
        </Modal>
    </QueryDictionaryContext.Provider>
);

export default VennModal;
