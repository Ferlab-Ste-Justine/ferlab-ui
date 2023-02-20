import React from 'react';

import ExternalLink from '../../../../components/ExternalLink';
import { removeUnderscoreAndCapitalize } from '../../../../utils/stringUtils';
import { IGeneConsquenceTableGroup } from '../../type';
import { sortConsequences } from '../../utils/consequences';

import styles from './index.module.scss';

interface IEntityGeneConsequenceSubtitle extends Omit<IGeneConsquenceTableGroup, 'ensembleGeneId'> {
    dictionary: {
        gene: string;
        omim: string;
    };
}

const EntityGeneConsequenceSubtitle = ({
    consequences,
    dictionary,
    omim,
    symbol,
}: IEntityGeneConsequenceSubtitle): React.ReactElement => (
    <div className={styles.wrapper}>
        <span>
            <span className={styles.bold}>{dictionary.gene}</span>
            <ExternalLink
                className={styles.link}
                href={`https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=${symbol}`}
            >
                {symbol}
            </ExternalLink>
        </span>
        {omim && (
            <span>
                <span className={styles.separator}>|</span>
                <span className={styles.bold}>{dictionary.omim}</span>
                <ExternalLink className={styles.link} href={`https://omim.org/entry/${omim}`}>
                    {omim}
                </ExternalLink>
            </span>
        )}
        <span className={styles.bold}>
            <span className={styles.separator}>|</span>
            {removeUnderscoreAndCapitalize(sortConsequences(consequences)[0].node.biotype)}
        </span>
    </div>
);

export default EntityGeneConsequenceSubtitle;
