import React from 'react';
import { Space } from 'antd';

import ExternalLink from '../../../components/ExternalLink';
import StackLayout from '../../../layout/StackLayout';
import { titleCase } from '../../../utils/stringUtils';
import { OrphanetCondition, OrphanetConditions, OrphanetInheritance } from '../type';

import InheritanceTag from './InheritanceTag';

interface OwnProps {
    conditions: OrphanetConditions;
    inheritances?: OrphanetInheritance;
    withInheritanceTags?: boolean;
}

const OrphanetConditionCell: React.FC<OwnProps> = ({ conditions, inheritances, withInheritanceTags = false }) => (
    <div>
        {conditions.length > 0 &&
            conditions.map((orphanetItem: OrphanetCondition, index: number) => {
                const { panel } = orphanetItem;
                const { disorderId } = orphanetItem;
                return (
                    <StackLayout key={index}>
                        <Space direction="horizontal">
                            <div>
                                <ExternalLink
                                    href={
                                        'https://www.orpha.net/consor/cgi-bin/Disease_Search.php' +
                                        `?lng=EN&data_id=${disorderId}`
                                    }
                                >
                                    {titleCase(panel)}
                                </ExternalLink>
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

export default OrphanetConditionCell;
