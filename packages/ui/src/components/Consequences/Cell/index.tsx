import React from 'react';

import { IArrangerEdge } from '../../../graphql/types';
import StackLayout from '../../../layout/StackLayout';
import { removeUnderscoreAndCapitalize, toKebabCase } from '../../../utils/stringUtils';
import Empty from '../../Empty';
import ExternalLink from '../../ExternalLink';
import HighBadgeIcon from '../Icons/HighBadgeIcon';
import LowBadgeIcon from '../Icons/LowBadgeIcon';
import ModerateBadgeIcon from '../Icons/ModerateBadgeIcon';
import ModifierBadgeIcon from '../Icons/ModifierBadgeIcon';

import style from './index.module.scss';

const NO_GENE = 'NO_GENE';

export enum Impact {
    High = 'HIGH',
    Moderate = 'MODERATE',
    Low = 'LOW',
    Modifier = 'MODIFIER',
}

export interface IConsequenceEntity {
    id: string;
    picked: boolean;
    consequence: string[];
    hgvsp: string;
    vep_impact: Impact;
}

export type TConsequencesCell = {
    consequences: IArrangerEdge<IConsequenceEntity>[];
    symbol: string;
    emptyText: string;
};

const impactToColorClassName = Object.freeze({
    [Impact.High]: <HighBadgeIcon className={`${style.bullet} ${style.highImpact}`} />,
    [Impact.Low]: <LowBadgeIcon className={`${style.bullet} ${style.lowImpact}`} />,
    [Impact.Moderate]: <ModerateBadgeIcon className={`${style.bullet} ${style.moderateImpact}`} />,
    [Impact.Modifier]: <ModifierBadgeIcon className={`${style.bullet} ${style.modifierImpact}`} />,
});

const pickImpactBadge = (impact: Impact) => impactToColorClassName[impact];

const ConsequencesCell = ({ consequences, emptyText, symbol }: TConsequencesCell): JSX.Element | null => {
    const pickedEdge = consequences.find((c) => c.node.picked);
    if (!pickedEdge) {
        return <Empty align="left" description={emptyText} noPadding showImage={false} size="mini" />;
    }

    const picked = pickedEdge?.node;
    if (!picked?.consequence) {
        return <Empty align="left" description={emptyText} noPadding showImage={false} size="mini" />;
    }

    if (symbol === NO_GENE) {
        return <Empty align="left" description={emptyText} noPadding showImage={false} size="mini" />;
    }

    return (
        <StackLayout center className={style.stackLayout} key={'1'}>
            {pickImpactBadge(picked.vep_impact)}
            <span className={style.detail} key="detail">
                {removeUnderscoreAndCapitalize(picked.consequence[0])}
            </span>
            {symbol && (
                <span className={style.symbol} key={toKebabCase(symbol)}>
                    <ExternalLink href={`https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=${symbol}`}>
                        {symbol}
                    </ExternalLink>
                </span>
            )}
            {picked.hgvsp && <span>{picked.hgvsp.split(':')[1]}</span>}
        </StackLayout>
    );
};

export default ConsequencesCell;
