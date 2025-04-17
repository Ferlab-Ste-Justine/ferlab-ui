import ClinicalTrialTimelineChart from '@ferlab/ui/core/components/Charts/ClinicalTrialTimeline';
import { Meta } from '@storybook/react';
import React from 'react';

// HTP	0001	Screening	1	-4	4
// HTP	0002	Baseline	2	0	4
// HTP	0003	2-week	3	2	1
// HTP	0004	4-week	4	4	1
// HTP	0005	8-week	5	8	1.5
// HTP	0006	12-week	6	12	1
// HTP	0007	16-week	7	16	4
// HTP	0008	Post Rx	8	18	1
const data = [
    {
        activities: ['informed consent', 'safety monitoring', 'skin assessment', 'research blood draw'],
        event: 'screening',
        visit_number: 1,
        timepoint: -4,
        duration: 4.0,
        threatment_active: false,
    },
    {
        activities: [
            'pharmacy visit',
            'safety monitoring',
            'skin assessment',
            'research blood draw',
            'cognitive measures',
        ],
        event: 'baseline',
        visit_number: 2,
        timepoint: 0,
        duration: 4.0,
        threatment_active: true,
    },
    {
        activities: ['pharmacy visit', 'safety monitoring', 'research blood draw'],
        event: '2 week',
        visit_number: 3,
        timepoint: 2,
        duration: 1.0,
        threatment_active: true,
    },
    {
        activities: ['pharmacy visit', 'safety monitoring'],
        event: '4-week',
        visit_number: 4,
        timepoint: 4,
        duration: 1.0,
        threatment_active: true,
    },
    {
        activities: ['pharmacy visit', 'safety monitoring', 'skin assessment', 'research blood draw'],
        event: '8-week',
        visit_number: 5,
        timepoint: 8,
        duration: 1.5,
        threatment_active: true,
    },
    {
        activities: ['pharmacy visit', 'safety monitoring'],
        event: '12-week',
        visit_number: 6,
        timepoint: 12,
        duration: 1.0,
        threatment_active: true,
    },
    {
        activities: [
            'pharmacy visit',
            'safety monitoring',
            'skin assessment',
            'research blood draw',
            'cognitive measures',
        ],
        event: '16-week',
        visit_number: 7,
        timepoint: 16,
        duration: 4.0,
        threatment_active: true,
    },
    {
        activities: ['safety monitoring', 'cognitive measures'],
        event: 'Post Rx',
        visit_number: 8,
        timepoint: 18,
        duration: 1.0,
        threatment_active: false,
    },
];

export default {
    title: '@ferlab/Components/Charts/Timeline',
    component: ClinicalTrialTimelineChart,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

export const TimelineChartBasic = () => (
    <>
        <h2>Timeline Chart</h2>
        <div style={{ width: '600px', height: '600px' }}>
            <ClinicalTrialTimelineChart title="Tofacitinib" data={data} loading={false} height={350} width={600} />
        </div>
    </>
);
