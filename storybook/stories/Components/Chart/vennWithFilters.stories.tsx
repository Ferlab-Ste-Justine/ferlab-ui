import React from 'react';
import VennChart from '@ferlab/ui/core/components/Charts/Venn/VennChartWithFilters';
import { Meta } from '@storybook/react';
import { ExperimentOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons';
import { SetType } from '@ferlab/ui/core/components/BiospecimenRequest/requestBiospecimen.utils';
import LineStyleIcon from '@ferlab/ui/core/components/Icons/LineStyleIcon';

const qbSqon = {
    op: 'and',
    content: [
        {
            content: {
                value: ['Participant Set'],
                field: 'Participant',
            },
            op: 'in',
        },
    ],
};

const summary2 = [
    {
        operation: 'Q₁',
        qbSqon,
        entityCount: 10,
    },
    {
        operation: 'Q₂',
        qbSqon,
        entityCount: 20,
    },
];

const summary3 = [
    ...summary2,
    {
        operation: 'Q₃',
        qbSqon,
        entityCount: 30,
    },
];

const operations2 = [
    {
        setId: 'Q₁',
        operation: '(Q₁)-(Q₁∩Q₂)',
        entitySqon: qbSqon,
        entityCount: 10,
    },
    {
        setId: 'Q₂',
        operation: '(Q₂)-(Q₁∩Q₂)',
        entitySqon: qbSqon,
        entityCount: 20,
    },
    {
        setId: 'Q₁∩Q₂',
        operation: '(Q₁∩Q₂)',
        entitySqon: qbSqon,
        entityCount: 30,
    },
];

const operations3 = [
    {
        setId: 'Q₁',
        operation: '(Q₁)-(Q₂∩Q₃)',
        entitySqon: qbSqon,
        entityCount: 10,
    },
    {
        setId: 'Q₂',
        operation: '(Q₂)-(Q₁∩Q₃)',
        entitySqon: qbSqon,
        entityCount: 20,
    },
    {
        setId: 'Q₃',
        operation: '(Q₃)-(Q₁∩Q₃)',
        entitySqon: qbSqon,
        entityCount: 40,
    },
    {
        setId: 'Q₁∩Q₂',
        operation: '(Q₁∩Q₂)-(Q₃)',
        entitySqon: qbSqon,
        entityCount: 30,
    },
    {
        setId: 'Q₂∩Q₃',
        operation: '(Q₂∩Q₃)-(Q₁)',
        entitySqon: qbSqon,
        entityCount: 40,
    },
    {
        setId: 'Q₁∩Q₃',
        operation: '(Q₁∩Q₃)-(Q₂)',
        entitySqon: qbSqon,
        entityCount: 50,
    },
    {
        setId: 'Q₁∩Q₂∩Q₃',
        operation: '(Q₁∩Q₂∩Q₃)',
        entitySqon: qbSqon,
        entityCount: 10,
    },
];

const operations3WithInvalids = [
    {
        setId: 'Q₁',
        operation: '(Q₁)-(Q₂∩Q₃)',
        entitySqon: qbSqon,
        entityCount: 50,
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
        entityCount: 50,
    },
    {
        setId: 'Q₁∩Q₂',
        operation: '(Q₁∩Q₂)-(Q₃)',
        entitySqon: qbSqon,
        entityCount: 10,
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
        entityCount: 10,
    },
];

const entityOptions = [
    {
        value: SetType.PARTICIPANT,
        label: 'Participant',
        icon: <UserOutlined />,
        disabled: false,
    },
    {
        value: SetType.BIOSPECIMEN,
        label: 'Biospecimen',
        icon: <ExperimentOutlined />,
        disabled: true,
    },
    {
        value: SetType.FILE,
        label: 'File',
        icon: <FileTextOutlined />,
        disabled: false,
    },
    {
        value: SetType.VARIANT,
        label: 'Variant',
        icon: <LineStyleIcon />,
        disabled: false,
    },
];

const savedSets = [
    {
        id: 'idParticipant1',
        tag: 'Participant Set 1',
        size: 10,
        updated_date: '2025-04-07T13:03:37.192Z',
        setType: 'participant',
        created_date: '2025-04-07T13:03:37.192Z',
        is_invisible: false,
    },
    {
        id: 'idParticipant2',
        tag: 'Participant Set 2',
        size: 20,
        updated_date: '2025-04-07T13:03:37.192Z',
        setType: 'participant',
        created_date: '2025-04-07T13:03:37.192Z',
        is_invisible: false,
    },
    {
        id: 'idParticipant3',
        tag: 'Participant Set 3',
        size: 30,
        updated_date: '2025-04-07T13:03:37.192Z',
        setType: 'participant',
        created_date: '2025-04-07T13:03:37.192Z',
        is_invisible: false,
    },
    {
        id: 'idParticipant4',
        tag: 'Participant Set 4',
        size: 40,
        updated_date: '2025-04-07T13:03:37.192Z',
        setType: 'participant',
        created_date: '2025-04-07T13:03:37.192Z',
        is_invisible: false,
    },
    {
        id: 'idVariant1',
        tag: 'Variant Set 1',
        size: 10,
        updated_date: '2025-04-07T13:03:37.192Z',
        setType: 'variants',
        created_date: '2025-04-07T13:03:37.192Z',
        is_invisible: false,
    },
    {
        id: 'idVariant2',
        tag: 'Variant Set 2',
        size: 20,
        updated_date: '2025-04-07T13:03:37.192Z',
        setType: 'variants',
        created_date: '2025-04-07T13:03:37.192Z',
        is_invisible: false,
    },
    {
        id: 'idVariant3',
        tag: 'Variant Set 3',
        size: 30,
        updated_date: '2025-04-07T13:03:37.192Z',
        setType: 'variants',
        created_date: '2025-04-07T13:03:37.192Z',
        is_invisible: false,
    },
    {
        id: 'idVariant4',
        tag: 'Variant Set 4',
        size: 40,
        updated_date: '2025-04-07T13:03:37.192Z',
        setType: 'variants',
        created_date: '2025-04-07T13:03:37.192Z',
        is_invisible: false,
    },
    {
        id: 'idFile1',
        tag: 'File Set 1',
        size: 10,
        updated_date: '2025-04-07T13:03:37.192Z',
        setType: 'file',
        created_date: '2025-04-07T13:03:37.192Z',
        is_invisible: false,
    },
    {
        id: 'idFile2',
        tag: 'File Set 2',
        size: 20,
        updated_date: '2025-04-07T13:03:37.192Z',
        setType: 'file',
        created_date: '2025-04-07T13:03:37.192Z',
        is_invisible: false,
    },
    {
        id: 'idFile3',
        tag: 'File Set 3',
        size: 30,
        updated_date: '2025-04-07T13:03:37.192Z',
        setType: 'file',
        created_date: '2025-04-07T13:03:37.192Z',
        is_invisible: false,
    },
    {
        id: 'idFile4',
        tag: 'File Set 4',
        size: 40,
        updated_date: '2025-04-07T13:03:37.192Z',
        setType: 'file',
        created_date: '2025-04-07T13:03:37.192Z',
        is_invisible: false,
    },
];

export default {
    title: '@ferlab/Components/Charts/Venn/VennChartWithFilters',
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
                options={[
                    {
                        label: 'Participants',
                        value: 'participant',
                        tabId: 'participants',
                        icon: <UserOutlined size={16} />,
                    },
                    {
                        label: 'Biospecimens',
                        value: 'biospecimen',
                        tabId: 'biospecimens',
                        icon: <ExperimentOutlined size={16} />,
                    },

                    {
                        label: 'Data files',
                        value: 'file',
                        tabId: 'data files',
                        icon: <FileTextOutlined size={16} />,
                    },
                ]}
                handleClose={function (): void {
                    throw new Error('Function not implemented.');
                }}
                handleCompare={function (): void {
                    throw new Error('Function not implemented.');
                }}
                savedSets={savedSets}
                handleSubmit={function (): void {
                    throw new Error('Function not implemented.');
                }}
                analytics={{
                    trackVennViewInExploration: function (): void {
                        throw new Error('Function not implemented.');
                    },
                    trackVennClickOnSections: function (): void {
                        throw new Error('Function not implemented.');
                    },
                    trackVennViewSet: function (): void {
                        throw new Error('Function not implemented.');
                    },
                    trackVennViewEntityCounts: function (type: string, entityCount: number): void {
                        throw new Error('Function not implemented.');
                    },
                }}
                size={{
                    width: 540,
                    height: 498,
                }}
                entitySelected={SetType.PARTICIPANT}
                entityOptions={entityOptions}
                idsSelected={['idParticipant1', 'idParticipant2']}
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
                handleClose={function (): void {
                    throw new Error('Function not implemented.');
                }}
                savedSets={savedSets}
                handleSubmit={function (): void {
                    throw new Error('Function not implemented.');
                }}
                options={[
                    {
                        label: 'Participants',
                        value: 'participant',
                        tabId: 'participants',
                        icon: <UserOutlined size={16} />,
                    },
                    {
                        label: 'Biospecimens',
                        value: 'biospecimen',
                        tabId: 'biospecimens',
                        icon: <ExperimentOutlined size={16} />,
                    },

                    {
                        label: 'Data files',
                        value: 'file',
                        tabId: 'data files',
                        icon: <FileTextOutlined size={16} />,
                    },
                ]}
                analytics={{
                    trackVennViewInExploration: function (): void {
                        throw new Error('Function not implemented.');
                    },
                    trackVennClickOnSections: function (): void {
                        throw new Error('Function not implemented.');
                    },
                    trackVennViewSet: function (): void {
                        throw new Error('Function not implemented.');
                    },
                    trackVennViewEntityCounts: function (type: string, entityCount: number): void {
                        throw new Error('Function not implemented.');
                    },
                }}
                size={{
                    width: 540,
                    height: 498,
                }}
                entitySelected={SetType.PARTICIPANT}
                entityOptions={entityOptions}
                idsSelected={['idParticipant1', 'idParticipant2']}
                handleCompare={function (): void {
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
                handleClose={function (): void {
                    throw new Error('Function not implemented.');
                }}
                savedSets={savedSets}
                handleSubmit={function (): void {
                    throw new Error('Function not implemented.');
                }}
                options={[
                    {
                        label: 'Participants',
                        value: 'participant',
                        tabId: 'participants',
                        icon: <UserOutlined size={16} />,
                    },
                    {
                        label: 'Biospecimens',
                        value: 'biospecimen',
                        tabId: 'biospecimens',
                        icon: <ExperimentOutlined size={16} />,
                    },

                    {
                        label: 'Data files',
                        value: 'file',
                        tabId: 'data files',
                        icon: <FileTextOutlined size={16} />,
                    },
                ]}
                analytics={{
                    trackVennViewInExploration: function (): void {
                        throw new Error('Function not implemented.');
                    },
                    trackVennClickOnSections: function (): void {
                        throw new Error('Function not implemented.');
                    },
                    trackVennViewSet: function (): void {
                        throw new Error('Function not implemented.');
                    },
                    trackVennViewEntityCounts: function (type: string, entityCount: number): void {
                        throw new Error('Function not implemented.');
                    },
                }}
                size={{
                    width: 540,
                    height: 498,
                }}
                entitySelected={SetType.PARTICIPANT}
                entityOptions={entityOptions}
                idsSelected={['idParticipant1', 'idParticipant2', 'idParticipant3']}
                handleCompare={function (): void {
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
                handleClose={function (): void {
                    throw new Error('Function not implemented.');
                }}
                savedSets={savedSets}
                handleSubmit={function (): void {
                    throw new Error('Function not implemented.');
                }}
                options={[
                    {
                        label: 'Participants',
                        value: 'participant',
                        tabId: 'participants',
                        icon: <UserOutlined size={16} />,
                    },
                    {
                        label: 'Biospecimens',
                        value: 'biospecimen',
                        tabId: 'biospecimens',
                        icon: <ExperimentOutlined size={16} />,
                    },

                    {
                        label: 'Data files',
                        value: 'file',
                        tabId: 'data files',
                        icon: <FileTextOutlined size={16} />,
                    },
                ]}
                analytics={{
                    trackVennViewInExploration: function (): void {
                        throw new Error('Function not implemented.');
                    },
                    trackVennClickOnSections: function (): void {
                        throw new Error('Function not implemented.');
                    },
                    trackVennViewSet: function (): void {
                        throw new Error('Function not implemented.');
                    },
                    trackVennViewEntityCounts: function (type: string, entityCount: number): void {
                        throw new Error('Function not implemented.');
                    },
                }}
                size={{
                    width: 540,
                    height: 498,
                }}
                entitySelected={SetType.PARTICIPANT}
                entityOptions={entityOptions}
                idsSelected={['idParticipant1', 'idParticipant2', 'idParticipant3']}
                handleCompare={function (): void {
                    throw new Error('Function not implemented.');
                }}
            />
        </div>
    </>
);
