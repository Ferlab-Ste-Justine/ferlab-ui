import React from 'react';
import { Typography } from 'antd';

import StackLayout from '../../../../../layout/StackLayout';
import { titleCase } from '../../../../../utils/stringUtils';
import { DddConditions } from '../../../types';

interface OwnProps {
    conditions: DddConditions;
}

const { Text } = Typography;

const DddConditionCell: React.FC<OwnProps> = ({ conditions }) => (
    <div>
        {conditions.length >= 0 &&
            conditions.map((dddCondition, index: number) => (
                <StackLayout key={index}>
                    <Text>{titleCase(dddCondition)}</Text>
                </StackLayout>
            ))}
    </div>
);

export default DddConditionCell;
