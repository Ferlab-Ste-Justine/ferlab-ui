import React from 'react';
import { render, screen } from '@testing-library/react';

import { IArrangerEdge } from '../../../graphql/types';

import ConsequencesCell, { IConsequenceEntity } from '.';

const data = [
    {
        node: {
            consequence: ['stop gained'],
            hgvsp: 'ENSP00000361408.3:p.Arg151Ter',
            picked: true,
            vep_impact: 'HIGH',
        },
    },
    {
        node: {
            consequence: ['synonymous'],
            hgvsp: 'ENSP00000361411.3:p.Pro210=',
            picked: false,
            vep_impact: 'LOW',
        },
    },
] as IArrangerEdge<IConsequenceEntity>[];

const unpickedData = [
    {
        node: {
            consequence: ['stop gained'],
            hgvsp: 'ENSP00000361408.3:p.Arg151Ter',
            picked: false,
            vep_impact: 'HIGH',
        },
    },
    {
        node: {
            consequence: ['synonymous'],
            hgvsp: 'ENSP00000361411.3:p.Pro210=',
            picked: false,
            vep_impact: 'LOW',
        },
    },
] as IArrangerEdge<IConsequenceEntity>[];

describe('ConsequencesCell', () => {
    test('make sure ConsequencesCell is correctly rendered', () => {
        render(<ConsequencesCell consequences={data} emptyText="No data Available" symbol="ZCCHC24" />);
        expect(screen.queryByText('Stop gained')).toBeTruthy();
        expect(screen.queryByText('ZCCHC24')).toBeTruthy();
        expect(screen.queryByText('p.Arg151Ter')).toBeTruthy();
    });
    test('make sure ConsequencesCell manage picked false', () => {
        render(<ConsequencesCell consequences={unpickedData} emptyText="No data Available" symbol="ZCCHC24" />);
        expect(screen.queryByText('No data Available')).toBeTruthy();
    });
    test('make sure ConsequencesCell manage empty consequence', () => {
        render(<ConsequencesCell consequences={unpickedData} emptyText="No data Available" symbol="ZCCHC24" />);
        expect(screen.queryByText('No data Available')).toBeTruthy();
    });
    test('make sure ConsequencesCell manage empty NO_GENE', () => {
        render(<ConsequencesCell consequences={data} emptyText="No data Available" symbol="NO_GENE" />);
    });
});
