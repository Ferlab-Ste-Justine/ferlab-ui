import React from 'react';
import { Typography } from 'antd';

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

export const NO_GENE = 'NO_GENE';

export enum Impact {
    High = 'HIGH',
    Moderate = 'MODERATE',
    Low = 'LOW',
    Modifier = 'MODIFIER',
}

export interface IConsequenceEntity {
    aa_change: string | null | undefined;
    id: string;
    picked: boolean;
    consequence: string[];
    hgvsp: string;
    vep_impact: Impact;
}

export type TConsequencesCell = {
    aaChangeWrapperClassName?: string;
    consequences: IArrangerEdge<IConsequenceEntity>[];
    symbol: string;
    emptyText: string;
    withoutSymbol?: boolean;
    layoutClassName?: string;
};

const impactToColorClassName = Object.freeze({
    [Impact.High]: <HighBadgeIcon className={`${style.bullet} ${style.highImpact}`} />,
    [Impact.Low]: <LowBadgeIcon className={`${style.bullet} ${style.lowImpact}`} />,
    [Impact.Moderate]: <ModerateBadgeIcon className={`${style.bullet} ${style.moderateImpact}`} />,
    [Impact.Modifier]: <ModifierBadgeIcon className={`${style.bullet} ${style.modifierImpact}`} />,
});

const pickImpactBadge = (impact: Impact) => impactToColorClassName[impact];

const ConsequencesCell = ({
    aaChangeWrapperClassName,
    consequences,
    emptyText,
    layoutClassName,
    symbol,
    withoutSymbol = false,
}: TConsequencesCell): JSX.Element | null => {
    const pickedEdge = consequences.find((c) => c.node.picked);
    if (!pickedEdge) {
        return <Empty align="left" description={emptyText} noPadding showImage={false} size="mini" />;
    }

    const picked = pickedEdge?.node;
    if (!picked?.consequence) {
        return <Empty align="left" description={emptyText} noPadding showImage={false} size="mini" />;
    }

    return (
        <StackLayout center className={`${layoutClassName ? layoutClassName : style.stackLayout}`} key={'1'}>
            {pickImpactBadge(picked.vep_impact)}
            <span className={withoutSymbol ? style.detailWithoutSymbol : style.detail} key="detail">
                {removeUnderscoreAndCapitalize(picked.consequence[0])}
            </span>
            {!withoutSymbol && symbol && symbol !== NO_GENE && (
                <span className={style.symbol} key={toKebabCase(symbol)}>
                    <ExternalLink href={`https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=${symbol}`}>
                        {symbol}
                    </ExternalLink>
                </span>
            )}
            {withoutSymbol && picked.aa_change && <span className={style.dash}> -</span>}
            {picked.aa_change && (
                <span className={`${aaChangeWrapperClassName ? aaChangeWrapperClassName : style.aaChangeWrapper}`}>
                    <Typography.Text ellipsis={{ tooltip: picked.aa_change }}>{picked.aa_change}</Typography.Text>
                </span>
            )}
        </StackLayout>
    );
};

export default ConsequencesCell;
