import React from "react";
import VennChart from '@ferlab/ui/core/components/Charts/Venn';
import { Meta } from "@storybook/react";

const sqon = {
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
    ]
};


export default {
    title: "@ferlab/Components/Charts/Venn",
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
        <div style={{width: '1200px', height: '600px' }}>
            <VennChart 
                loading={true}
                handleSubmit={(sets) => {
                    console.log('sets', sets); //TODO: to remove
                }}
            />
        </div>
    </>
)


export const VennChartWithTwoSets = () => (
    <>
        <h2>Venn Chart with 2 sets</h2>
        <div style={{width: '1200px', height: '600px' }}>
            <VennChart 
                summary={[
                    {
                        alias: 'S₁',
                        name: 'proband = true and ethnicity = Hispanic or Latino',
                        count: 1000
                    }, 
                    {
                        alias: 'S₂',
                        name: 'proband = false and ethnicity = Unknow',
                        count: 1200
                    }
                ]}
                operations={[
                    {
                        alias: 'S₁',
                        operation: '(S₁)-(S₁∩S₂)',
                        sqon,
                        count: 900
                    }, 
                    {
                        alias: 'S₂',
                        operation: '(S₂)-(S₁∩S₂)',
                        sqon,
                        count: 1100
                    },
                    {
                        alias: 'S₁∩S₂',
                        operation: '(S₁∩S₂)',
                        sqon,
                        count: 300
                    },
                ]}
                handleSubmit={(sets) => {
                    console.log('sets', sets); //TODO: to remove
                }}
            />
        </div>
    </>
)

export const VennChartWithThreeSets = () => (
    <>
        <h2>Venn Chart with 3 sets</h2>
        <div style={{width: '1200px', height: '600px' }}>
            <VennChart 
                summary={[
                    {
                        alias: 'S₁',
                        name: 'proband = true and ethnicity = Hispanic or Latino',
                        count: 1000
                    }, 
                    {
                        alias: 'S₂',
                        name: 'proband = false and ethnicity = Unknow',
                        count: 1200
                    },
                    {
                        alias: 'S₃',
                        name: 'proband = true and ethnicity = Not Hispanic or Latino',
                        count: 700
                    }
                ]}
                operations={[
                    {
                        alias: 'S₁',
                        operation: '(S₁)-(S₂∩S₃)',
                        sqon,
                        count: 900
                    }, 
                    {
                        alias: 'S₂',
                        operation: '(S₂)-(S₁∩S₃)',
                        sqon,
                        count: 1100
                    },
                    {
                        alias: 'S₃',
                        operation: '(S₃)-(S₁∩S₃)',
                        sqon,
                        count: 400
                    },
                    {
                        alias: 'S₁∩S₂',
                        operation: '(S₁∩S₂)-(S₃)',
                        sqon,
                        count: 300
                    },
                    {
                        alias: 'S₂∩S₃',
                        operation: '(S₂∩S₃)-(S₁)',
                        sqon,
                        count: 400
                    },
                    {
                        alias: 'S₁∩S₃',
                        operation: '(S₁∩S₃)-(S₂)',
                        sqon,
                        count: 500
                    },
                    {
                        alias: 'S₁∩S₂∩S₃',
                        operation: '(S₁∩S₂∩S₃)',
                        sqon,
                        count: 100
                    }
                ]}
                handleSubmit={(sets) => {
                    console.log('sets', sets); //TODO: to remove
                }}
            />
        </div>
    </>
)

