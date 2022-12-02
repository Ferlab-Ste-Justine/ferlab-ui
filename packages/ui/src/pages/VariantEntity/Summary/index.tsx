import React from 'react';
import { Card, Col, Descriptions, Row, Tooltip } from 'antd';

import { TABLE_EMPTY_PLACE_HOLDER } from '../../../common/constants';
import Collapse, { CollapsePanel } from '../../../components/Collapse';
import ExternalLink from '../../../components/ExternalLink';
import { IVariantEntity, IVariantEntityDictionary } from '../types';
import { toExponentialNotation } from '../utils';

import styles from '@ferlab/style/pages/variantEntity/Summary.module.scss';

interface ISummaryProps {
    variant?: IVariantEntity;
    loading: boolean;
    id: string;
    dictionary: IVariantEntityDictionary['summary'];
}

const Summary: React.FC<ISummaryProps> = ({ dictionary, id, loading, variant }) => (
    <div className={styles.container} id={id}>
        <Collapse arrowIcon="caretFilled" className={styles.collapse} defaultActiveKey={['1']}>
            <CollapsePanel className={styles.panel} header={dictionary.summary} key="1">
                <Card className={styles.card} loading={loading}>
                    <Row gutter={[16, 16]}>
                        <Col lg={8} md={24} sm={24} xs={24}>
                            <Descriptions bordered column={1} size="small">
                                <Descriptions.Item label={dictionary.type}>
                                    {variant?.variant_class || TABLE_EMPTY_PLACE_HOLDER}
                                </Descriptions.Item>
                                <Descriptions.Item label={dictionary.chromosome}>
                                    {variant?.chromosome || TABLE_EMPTY_PLACE_HOLDER}
                                </Descriptions.Item>
                                <Descriptions.Item label={dictionary.position}>
                                    {variant?.start || TABLE_EMPTY_PLACE_HOLDER}
                                </Descriptions.Item>
                                <Descriptions.Item label={dictionary.cytobande}>
                                    {variant?.genes?.hits?.edges[0]
                                        ? variant.genes.hits.edges[0].node.location
                                        : TABLE_EMPTY_PLACE_HOLDER}
                                </Descriptions.Item>
                                <Descriptions.Item
                                    label={
                                        <Tooltip title={dictionary.alternativeAllele}>{dictionary.altAllele}</Tooltip>
                                    }
                                >
                                    {variant?.alternate || TABLE_EMPTY_PLACE_HOLDER}
                                </Descriptions.Item>
                                <Descriptions.Item
                                    label={<Tooltip title={dictionary.referenceAllele}>{dictionary.refAllele}</Tooltip>}
                                >
                                    {variant?.reference || TABLE_EMPTY_PLACE_HOLDER}
                                </Descriptions.Item>
                                <Descriptions.Item label={dictionary.referenceGenome}>
                                    {variant?.genome_build || TABLE_EMPTY_PLACE_HOLDER}
                                </Descriptions.Item>
                                <Descriptions.Item label={dictionary.studies}>
                                    {variant?.studies?.hits?.edges?.length || TABLE_EMPTY_PLACE_HOLDER}
                                </Descriptions.Item>
                                <Descriptions.Item label={dictionary.participants}>
                                    {variant?.participant_number || TABLE_EMPTY_PLACE_HOLDER}
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col lg={8} md={24} sm={24} xs={24}>
                            <Descriptions bordered column={1} size="small">
                                <Descriptions.Item label={dictionary.genes}>
                                    {variant?.genes?.hits?.edges?.length
                                        ? variant.genes.hits.edges.map((gene) => gene.node.symbol)
                                        : TABLE_EMPTY_PLACE_HOLDER}
                                </Descriptions.Item>
                                <Descriptions.Item label={dictionary.omim}>
                                    {(variant?.genes?.hits?.edges[0] &&
                                        variant.genes.hits.edges[0].node.omim_gene_id) ||
                                        TABLE_EMPTY_PLACE_HOLDER}
                                </Descriptions.Item>
                            </Descriptions>
                            <br />
                            <Descriptions bordered column={1} size="small">
                                <Descriptions.Item label={dictionary.clinVar}>
                                    {variant?.clinvar?.clin_sig || TABLE_EMPTY_PLACE_HOLDER}
                                </Descriptions.Item>
                            </Descriptions>
                            <br />
                            <Descriptions bordered column={1} size="small">
                                <Descriptions.Item label={dictionary.gnomadGenome311}>
                                    {toExponentialNotation(variant?.frequencies?.gnomad_genomes_3_1_1?.af) ||
                                        TABLE_EMPTY_PLACE_HOLDER}
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col lg={8} md={24} sm={24} xs={24}>
                            <Descriptions bordered column={1} size="small">
                                <Descriptions.Item label={dictionary.clinVar}>
                                    {variant?.clinvar?.clinvar_id ? (
                                        <ExternalLink
                                            href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${variant.clinvar.clinvar_id}`}
                                        >
                                            {variant?.clinvar?.clinvar_id}
                                        </ExternalLink>
                                    ) : (
                                        TABLE_EMPTY_PLACE_HOLDER
                                    )}
                                </Descriptions.Item>
                                <Descriptions.Item label={dictionary.dbSNP}>
                                    {variant?.rsnumber ? (
                                        <ExternalLink href={`https://www.ncbi.nlm.nih.gov/snp/${variant.rsnumber}`}>
                                            {variant?.rsnumber}
                                        </ExternalLink>
                                    ) : (
                                        TABLE_EMPTY_PLACE_HOLDER
                                    )}
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                </Card>
            </CollapsePanel>
        </Collapse>
    </div>
);

export default Summary;
