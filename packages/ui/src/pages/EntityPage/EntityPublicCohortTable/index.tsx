import React from 'react';

import EntityTable, { IEntityTable } from '../EntityTable';
import { IExternalFrequenciesEntity } from '../type';
import { isExternalCohortsTableEmpty, makeRowFromFrequencies } from '../utils/frequencies';

export interface IEntityPublicCohortTable extends Omit<IEntityTable, 'data'> {
    emptyMessage: string;
    frequencies?: IExternalFrequenciesEntity;
    locus?: string;
}

export const EntityPublicCohortTable = ({
    columns,
    frequencies,
    header,
    id,
    loading,
    locus,
    ...tableProps
}: IEntityPublicCohortTable): JSX.Element => {
    let externalCohortsRows = makeRowFromFrequencies(frequencies, locus);
    const hasEmptyCohorts = isExternalCohortsTableEmpty(externalCohortsRows);

    if (!loading && hasEmptyCohorts) {
        externalCohortsRows = [];
    }

    return (
        <EntityTable
            {...tableProps}
            columns={columns}
            data={externalCohortsRows}
            header={header}
            id={id}
            loading={loading}
        />
    );
};

export default EntityPublicCohortTable;
