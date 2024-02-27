import React from 'react';
import { Space, Typography } from 'antd';

import { TABLE_EMPTY_PLACE_HOLDER } from '../../../common/constants';
import ExternalLink from '../../../components/ExternalLink';
import StackLayout from '../../../layout/StackLayout';
import { titleCase } from '../../../utils/stringUtils';
import { OmimCondition, OmimConditions, OmimInheritance } from '../type';

import InheritanceTag from './InheritanceTag';

interface OwnProps {
    conditions: OmimConditions;
    inheritances?: OmimInheritance;
    withInheritanceTags?: boolean;
}

const { Text } = Typography;

const OmimConditionCell: React.FC<OwnProps> = ({ conditions, inheritances, withInheritanceTags = false }) => (
    <div>
        {conditions.length >= 0 &&
            conditions.map((omimCondition: OmimCondition, index: number) => {
                const geneOmimName = omimCondition.omimName ?? TABLE_EMPTY_PLACE_HOLDER;
                const { omimId } = omimCondition;

                return (
                    <StackLayout key={index}>
                        <Space direction="horizontal">
                            <div>
                                <Text>{titleCase(geneOmimName)}</Text>&nbsp;(MIM:
                                <ExternalLink href={`https://www.omim.org/entry/${omimId}`} key={index}>
                                    {omimId}
                                </ExternalLink>
                                )
                            </div>
                            {withInheritanceTags && inheritances && (
                                <InheritanceTag inheritances={inheritances[index]} />
                            )}
                        </Space>
                    </StackLayout>
                );
            })}
    </div>
);

export default OmimConditionCell;
