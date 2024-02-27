import React from 'react';
import { Space, Typography } from 'antd';

import StackLayout from '../../../layout/StackLayout';
import { titleCase } from '../../../utils/stringUtils';
import { CosmicConditions, SingleValuedInheritance } from '../type';

import InheritanceTag from './InheritanceTag';

interface OwnProps {
    conditions: CosmicConditions;
    inheritances?: SingleValuedInheritance;
    withInheritanceTags?: boolean;
}

const { Text } = Typography;

const CosmicConditionCell: React.FC<OwnProps> = ({ conditions, inheritances, withInheritanceTags = false }) => (
    <div>
        {conditions.length >= 0 &&
            conditions.map((cosmicCondition, index: number) => (
                <StackLayout key={index}>
                    <Space direction="horizontal">
                        <Text>{titleCase(cosmicCondition)}</Text>
                        {withInheritanceTags && inheritances && <InheritanceTag inheritances={inheritances} />}
                    </Space>
                </StackLayout>
            ))}
    </div>
);

export default CosmicConditionCell;
