import React from 'react';
import { Typography } from 'antd';

import StackLayout from '../../../layout/StackLayout';
import { titleCase } from '../../../utils/stringUtils';
import { CosmicConditions } from '../type';

interface OwnProps {
    conditions: CosmicConditions;
}

const { Text } = Typography;

const CosmicConditionCell: React.FC<OwnProps> = ({ conditions }) => (
    <div>
        {conditions.length >= 0 &&
            conditions.map((cosmicCondition, index: number) => (
                <StackLayout key={index}>
                    <Text>{titleCase(cosmicCondition)}</Text>
                </StackLayout>
            ))}
    </div>
);

export default CosmicConditionCell;
