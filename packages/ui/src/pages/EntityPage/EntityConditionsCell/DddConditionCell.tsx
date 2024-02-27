import React from 'react';
import { Space, Typography } from 'antd';

import StackLayout from '../../../layout/StackLayout';
import { titleCase } from '../../../utils/stringUtils';
import { DddConditions, SingleValuedInheritance } from '../type';

import InheritanceTag from './InheritanceTag';

interface OwnProps {
    conditions: DddConditions;
    inheritances?: SingleValuedInheritance;
    withInheritanceTags?: boolean;
}

const { Text } = Typography;

const DddConditionCell: React.FC<OwnProps> = ({ conditions, inheritances, withInheritanceTags = false }) => (
    <div>
        {conditions.length >= 0 &&
            conditions.map((dddCondition, index: number) => (
                <StackLayout key={index}>
                    <Space direction="horizontal">
                        <Text>{titleCase(dddCondition)}</Text>
                        {withInheritanceTags && inheritances && <InheritanceTag inheritances={inheritances} />}
                    </Space>
                </StackLayout>
            ))}
    </div>
);

export default DddConditionCell;
