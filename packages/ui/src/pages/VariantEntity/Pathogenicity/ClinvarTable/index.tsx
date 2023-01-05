import React from 'react';
import { Table } from 'antd';

import { removeUnderscoreAndCapitalize } from '../../../../utils/stringUtils';
import { IClinVar, IVariantEntity, IVariantEntityDictionary } from '../../types';

import styles from '@ferlab/style/pages/variantEntity/ClinvarTable.module.scss';

export const getColumnsClinVar = (dictionary: IVariantEntityDictionary['pathogenicity']) => [
    {
        dataIndex: 'interpretation',
        title: () => dictionary.interpretation,
    },
    {
        dataIndex: 'condition',
        title: () => dictionary.condition,
        width: '33%',
    },
    {
        dataIndex: 'inheritance',
        title: () => dictionary.inheritance,
        width: '33%',
    },
];

export const makeClinVarRows = (clinvar?: IClinVar) => {
    if (!clinvar || !clinvar.conditions?.length) {
        return [];
    }
    const inheritance = (clinvar.inheritance || [])[0] || '';
    const interpretation = removeUnderscoreAndCapitalize((clinvar.clin_sig || [])[0] || '');

    return clinvar.conditions.map((condition: string, index: number) => ({
        condition,
        inheritance,
        interpretation,
        key: `${index}`,
    }));
};

interface IStudiesTableProps {
    loading: boolean;
    variant?: IVariantEntity;
    dictionary: IVariantEntityDictionary['pathogenicity'];
}

const ClinvarTable: React.FC<IStudiesTableProps> = ({ dictionary, loading, variant }) => (
    <Table
        bordered
        columns={getColumnsClinVar(dictionary)}
        dataSource={makeClinVarRows(variant?.clinvar)}
        loading={loading}
        pagination={false}
        rowClassName={styles.notStriped}
        size="small"
    />
);
export default ClinvarTable;
