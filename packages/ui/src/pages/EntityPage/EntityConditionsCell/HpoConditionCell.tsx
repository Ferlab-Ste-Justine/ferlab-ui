import React from 'react';
import { Typography } from 'antd';

import ExternalLink from '../../../components/ExternalLink';
import ExpandableCell from '../../../components/tables/ExpandableCell';
import StackLayout from '../../../layout/StackLayout';
import { titleCase } from '../../../utils/stringUtils';
import { HpoCondition, HpoConditions } from '../type';

interface OwnProps {
    conditions: HpoConditions;
    dictionary?: {
        'see.less': string;
        'see.more': string;
    };
}

const { Text } = Typography;

const HpoConditionCell: React.FC<OwnProps> = ({ conditions, dictionary }) => (
    <ExpandableCell
        dataSource={conditions || []}
        dictionnary={dictionary}
        renderItem={(hpoItem, id) => {
            const item = hpoItem as HpoCondition;

            const termLabel = item.hpoTermLabel || '';
            const termId = item.hpoTermTermId;

            // expects: aLabel (HP:xxxxxx)
            const split = termLabel.split('(');
            const condition = split[0];

            return (
                <StackLayout key={id}>
                    <Text>{titleCase(condition)}</Text>&nbsp;(
                    <ExternalLink href={`https://hpo.jax.org/app/browse/term/${termId}`} key={id}>
                        {termId}
                    </ExternalLink>
                    )
                </StackLayout>
            );
        }}
    />
);

export default HpoConditionCell;
