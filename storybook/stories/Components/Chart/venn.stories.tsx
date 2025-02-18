import React from 'react';
import VennChart, { ISetOperation } from '@ferlab/ui/core/components/Charts/Venn';
import { Meta } from '@storybook/react';

const qbSqon = {
    op: 'and',
    content: [
        {
            content: {
                value: ['something'],
                field: 'test',
            },
            op: 'in',
        },
        {
            content: { value: ['false'], field: 'test1' },
            op: 'in',
        },
    ],
};

const summary2 = [
    {
        operation: 'Q₁',
        qbSqon,
        entityCount: 1000,
    },
    {
        operation: 'Q₂',
        qbSqon,
        entityCount: 1200,
    },
];

const summary3 = [
    ...summary2,
    {
        operation: 'Q₃',
        qbSqon,
        entityCount: 700,
    },
];

const operations2 = [
    {
        setId: 'Q₁',
        operation: '(Q₁)-(Q₁∩Q₂)',
        entitySqon: qbSqon,
        entityCount: 900,
    },
    {
        setId: 'Q₂',
        operation: '(Q₂)-(Q₁∩Q₂)',
        entitySqon: qbSqon,
        entityCount: 1100,
    },
    {
        setId: 'Q₁∩Q₂',
        operation: '(Q₁∩Q₂)',
        entitySqon: qbSqon,
        entityCount: 300,
    },
];

const operations3 = [
    {
        setId: 'Q₁',
        operation: '(Q₁)-(Q₂∩Q₃)',
        entitySqon: qbSqon,
        entityCount: 900,
    },
    {
        setId: 'Q₂',
        operation: '(Q₂)-(Q₁∩Q₃)',
        entitySqon: qbSqon,
        entityCount: 1100,
    },
    {
        setId: 'Q₃',
        operation: '(Q₃)-(Q₁∩Q₃)',
        entitySqon: qbSqon,
        entityCount: 400,
    },
    {
        setId: 'Q₁∩Q₂',
        operation: '(Q₁∩Q₂)-(Q₃)',
        entitySqon: qbSqon,
        entityCount: 300,
    },
    {
        setId: 'Q₂∩Q₃',
        operation: '(Q₂∩Q₃)-(Q₁)',
        entitySqon: qbSqon,
        entityCount: 400,
    },
    {
        setId: 'Q₁∩Q₃',
        operation: '(Q₁∩Q₃)-(Q₂)',
        entitySqon: qbSqon,
        entityCount: 500,
    },
    {
        setId: 'Q₁∩Q₂∩Q₃',
        operation: '(Q₁∩Q₂∩Q₃)',
        entitySqon: qbSqon,
        entityCount: 100,
    },
];

const operations3WithInvalids = [
    {
        setId: 'Q₁',
        operation: '(Q₁)-(Q₂∩Q₃)',
        entitySqon: qbSqon,
        entityCount: 5001,
    },
    {
        setId: 'Q₂',
        operation: '(Q₂)-(Q₁∩Q₃)',
        entitySqon: qbSqon,
        entityCount: 0,
    },
    {
        setId: 'Q₃',
        operation: '(Q₃)-(Q₁∩Q₃)',
        entitySqon: qbSqon,
        entityCount: 5000,
    },
    {
        setId: 'Q₁∩Q₂',
        operation: '(Q₁∩Q₂)-(Q₃)',
        entitySqon: qbSqon,
        entityCount: 10001,
    },
    {
        setId: 'Q₂∩Q₃',
        operation: '(Q₂∩Q₃)-(Q₁)',
        entitySqon: qbSqon,
        entityCount: 0,
    },
    {
        setId: 'Q₁∩Q₃',
        operation: '(Q₁∩Q₃)-(Q₂)',
        entitySqon: qbSqon,
        entityCount: 0,
    },
    {
        setId: 'Q₁∩Q₂∩Q₃',
        operation: '(Q₁∩Q₂∩Q₃)',
        entitySqon: qbSqon,
        entityCount: 100,
    },
];

export default {
    title: '@ferlab/Components/Charts/Venn',
    component: VennChart,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

export const VennLoading = () => (
    <>
        <h2>Venn Chart</h2>
        <div style={{ width: '1200px', height: '600px' }}>
            <VennChart
                loading={true}
                handleIndexChange={function (queries, index): void {
                    throw new Error('Function not implemented.');
                }}
                handleClose={function (): void {
                    throw new Error('Function not implemented.');
                }}
                savedSets={[]}
                handleSubmit={function (): void {
                    throw new Error('Function not implemented.');
                }}
            />
        </div>
    </>
);

export const VennChartWithTwoSets = () => (
    <>
        <h2>Venn Chart with 2 sets</h2>
        <div style={{ width: '1200px', height: '600px' }}>
            <VennChart
                summary={summary2}
                operations={operations2}
                handleIndexChange={function (queries, index): void {
                    throw new Error('Function not implemented.');
                }}
                handleClose={function (): void {
                    throw new Error('Function not implemented.');
                }}
                savedSets={[]}
                handleSubmit={function (): void {
                    throw new Error('Function not implemented.');
                }}
            />
        </div>
    </>
);

export const VennChartWithThreeSets = () => (
    <>
        <h2>Venn Chart with 3 sets</h2>
        <div style={{ width: '1200px', height: '600px' }}>
            <VennChart
                summary={summary3}
                operations={operations3}
                handleIndexChange={function (queries, index): void {
                    throw new Error('Function not implemented.');
                }}
                handleClose={function (): void {
                    throw new Error('Function not implemented.');
                }}
                savedSets={[]}
                handleSubmit={function (): void {
                    throw new Error('Function not implemented.');
                }}
            />
        </div>
    </>
);

export const VennChartWithThreeSetsWithInvalidValues = () => (
    <>
        <h2>Venn Chart with 3 sets</h2>
        <div style={{ width: '1200px', height: '600px' }}>
            <VennChart
                summary={summary3}
                operations={operations3WithInvalids}
                handleIndexChange={function (queries, index): void {
                    throw new Error('Function not implemented.');
                }}
                handleClose={function (): void {
                    throw new Error('Function not implemented.');
                }}
                savedSets={[]}
                handleSubmit={function (): void {
                    throw new Error('Function not implemented.');
                }}
            />
        </div>
    </>
);
