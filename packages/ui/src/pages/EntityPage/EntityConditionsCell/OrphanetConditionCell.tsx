import React from 'react';

import ExternalLink from '../../../components/ExternalLink';
import StackLayout from '../../../layout/StackLayout';
import { titleCase } from '../../../utils/stringUtils';
import { OrphanetCondition, OrphanetConditions } from '../type';

interface OwnProps {
    conditions: OrphanetConditions;
}

const OrphanetConditionCell: React.FC<OwnProps> = ({ conditions }) => (
    <div>
        {conditions.length > 0 &&
            conditions.map((orphanetItem: OrphanetCondition, index: number) => {
                const { panel } = orphanetItem;
                const { disorderId } = orphanetItem;
                return (
                    <StackLayout key={index}>
                        <ExternalLink
                            href={
                                'https://www.orpha.net/consor/cgi-bin/Disease_Search.php' +
                                `?lng=EN&data_id=${disorderId}`
                            }
                        >
                            {titleCase(panel)}
                        </ExternalLink>
                    </StackLayout>
                );
            })}
    </div>
);

export default OrphanetConditionCell;
