import React from 'react';
import { Typography } from 'antd';

import Collapse, { CollapsePanel } from '../../../components/Collapse';
import ExternalLink from '../../../components/ExternalLink';
import { IVariantEntity, IVariantEntityDictionary } from '../types';

import ClinvarTable from './ClinvarTable';
import GeneTable from './GeneTable';

import styles from '@ferlab/style/pages/variantEntity/Pathogenicity.module.scss';

const { Title } = Typography;

interface IPathogenicityProps {
    variant?: IVariantEntity;
    loading: boolean;
    id: string;
    dictionary: IVariantEntityDictionary['pathogenicity'];
}

const Pathogenicity: React.FC<IPathogenicityProps> = ({ dictionary, id, loading, variant }) => {
    const clinvarId = variant?.clinvar?.clinvar_id;

    return (
        <div className={styles.container} id={id}>
            <Title className={styles.title} level={4}>
                {dictionary.pathogenicity}
            </Title>
            <Collapse arrowIcon="caretFilled" className={styles.collapse} defaultActiveKey={['1']}>
                <CollapsePanel
                    className={styles.panel}
                    header={
                        <>
                            {dictionary.clinVar}{' '}
                            {clinvarId && (
                                <ExternalLink
                                    className={styles.externalLink}
                                    hasIcon={true}
                                    href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${clinvarId}`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {clinvarId}
                                </ExternalLink>
                            )}
                        </>
                    }
                    key="1"
                >
                    <ClinvarTable dictionary={dictionary} loading={loading} variant={variant} />
                </CollapsePanel>
            </Collapse>
            <Collapse arrowIcon="caretFilled" className={styles.collapse} defaultActiveKey={['2']}>
                <CollapsePanel className={styles.panel} header={dictionary.genePhenotype} key="2">
                    <GeneTable dictionary={dictionary} loading={loading} variant={variant} />
                </CollapsePanel>
            </Collapse>
        </div>
    );
};
export default Pathogenicity;
