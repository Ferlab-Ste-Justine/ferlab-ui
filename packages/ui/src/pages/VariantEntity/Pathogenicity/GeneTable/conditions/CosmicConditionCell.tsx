import React from 'react';
import { Typography } from 'antd';

import StackLayout from '../../../../../layout/StackLayout';
import { CosmicConditions } from '../../../types';

interface OwnProps {
    conditions: CosmicConditions;
}

const { Text } = Typography;

const CosmicConditionCell: React.FC<OwnProps> = ({ conditions }) => (
    <div>
        {conditions.length >= 0 &&
            conditions.map((cosmicCondition, index: number) => (
                <StackLayout key={index}>
                    <Text>{cosmicCondition}</Text>
                </StackLayout>
            ))}
    </div>
);

export default CosmicConditionCell;
