import React from 'react';
import { Typography } from 'antd';

import { TABLE_EMPTY_PLACE_HOLDER } from '../../../../../common/constants';
import ExternalLink from '../../../../../components/ExternalLink';
import StackLayout from '../../../../../layout/StackLayout';
import { OmimCondition, OmimConditions } from '../../../types';

interface OwnProps {
    conditions: OmimConditions;
}

const { Text } = Typography;

const OmimConditionCell: React.FC<OwnProps> = ({ conditions }) => (
    <div>
        {conditions.length >= 0 &&
            conditions.map((omimCondition: OmimCondition, index: number) => {
                const geneOmimName = omimCondition.omimName ?? TABLE_EMPTY_PLACE_HOLDER;
                const { omimId } = omimCondition;

                return (
                    <StackLayout key={index}>
                        <Text>{geneOmimName}</Text>&nbsp;(MIM:
                        <ExternalLink href={`https://www.omim.org/entry/${omimId}`} key={index}>
                            {omimId}
                        </ExternalLink>
                        )
                    </StackLayout>
                );
            })}
    </div>
);

export default OmimConditionCell;
