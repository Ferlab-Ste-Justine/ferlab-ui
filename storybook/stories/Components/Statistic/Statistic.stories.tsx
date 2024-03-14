import React from 'react';
import { Meta } from '@storybook/react';
import AnalyseIcon from '@ferlab/ui/core/components/Icons/Futuro/AnalyseIcon';
import BiospecimenIcon from '@ferlab/ui/core/components/Icons/Futuro/BiospecimenIcon';
import ChemistryIcon from '@ferlab/ui/core/components/Icons/Futuro/ChemistryIcon';
import CloudArchitectureIcon from '@ferlab/ui/core/components/Icons/Futuro/CloudArchitectureIcon';
import CloudComputingIcon from '@ferlab/ui/core/components/Icons/Futuro/CloudComputingIcon';
import CloudDatabaseIcon from '@ferlab/ui/core/components/Icons/Futuro/CloudDatabaseIcon';
import CloudFileAccessIcon from '@ferlab/ui/core/components/Icons/Futuro/CloudFileAccessIcon';
import CloudReportingIcon from '@ferlab/ui/core/components/Icons/Futuro/CloudReportingIcon';
import CloudSearchIcon from '@ferlab/ui/core/components/Icons/Futuro/CloudSearchIcon';
import CloudSecurityIcon from '@ferlab/ui/core/components/Icons/Futuro/CloudSecurityIcon';
import ExomesIcon from '@ferlab/ui/core/components/Icons/Futuro/ExomesIcon';
import FamilyIcon from '@ferlab/ui/core/components/Icons/Futuro/FamilyIcon';
import FileIcon from '@ferlab/ui/core/components/Icons/Futuro/FileIcon';
import FileSearchIcon from '@ferlab/ui/core/components/Icons/Futuro/FileSearchIcon';
import GeneIcon from '@ferlab/ui/core/components/Icons/Futuro/GeneIcon';
import InformationIcon from '@ferlab/ui/core/components/Icons/Futuro/InformationIcon';
import MetabolomeIcon from '@ferlab/ui/core/components/Icons/Futuro/MetabolomeIcon';
import ParticipantIcon from '@ferlab/ui/core/components/Icons/Futuro/ParticipantIcon';
import ProteomeIcon from '@ferlab/ui/core/components/Icons/Futuro/ProteomeIcon';
import SampleIcon from '@ferlab/ui/core/components/Icons/Futuro/SampleIcon';
import StudyIcon from '@ferlab/ui/core/components/Icons/Futuro/StudyIcon';
import TranscriptomeIcon from '@ferlab/ui/core/components/Icons/Futuro/TranscriptomeIcon';
import WebsiteIcon from '@ferlab/ui/core/components/Icons/Futuro/WebsiteIcon';
import AnalyseSpotIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/AnalyseSpotIcon';
import BiospecimenSpotIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/BiospecimenSpotIcon';
import ChemistrySpotIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/ChemistrySpotIcon';
import CloudArchitectureSpotIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/CloudArchitectureSpotIcon';
import CloudComputingSpotIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/CloudComputingSpotIcon';
import CloudDatabaseSpotIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/CloudDatabaseSpotIcon';
import CloudFileAccessSpotIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/CloudFileAccessSpotIcon';
import CloudReportingSpotIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/CloudReportingSpotIcon';
import CloudSearchSpotIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/CloudSearchSpotIcon';
import CloudSecuritySpotIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/CloudSecuritySpotIcon';
import ExomesSpotIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/ExomesSpotIcon';
import FamilySpotIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/FamilySpotIcon';
import FileSpotIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/FileSpotIcon';
import FileSearchSpotIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/FileSearchSpotIcon';
import GeneSpotIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/GeneSpotIcon';
import InformationSpotIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/InformationSpotIcon';
import MetabolomeSpotIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/MetabolomeSpotIcon';
import ParticipantSpotIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/ParticipantSpotIcon';
import ProteomeSpotIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/ProteomeSpotIcon';
import SampleSpotIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/SampleSpotIcon';
import StudySpotIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/StudySpotIcon';
import TranscriptomeSpotIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/TranscriptomeSpotIcon';
import WebsiteSpotIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/WebsiteSpotIcon';
import Statistic from '@ferlab/ui/core/components/Statistic';

export default {
    title: '@ferlab/Components/Statistic',
    component: Statistic,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
    argTypes: {
        className: {
            control: 'string',
        },
        dictionary: {
            control: {
                type: 'object',
            },
        },
    },
} as Meta;

export const StatisticStory = () => (
    <>
        <h3>Statistic</h3>
        <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr' }}>
            <Statistic count={23} icon={<AnalyseIcon />} label="Analyses" />
            <Statistic count={35} icon={<BiospecimenIcon />} label="Biospecimens" />
            <Statistic count={126} icon={<ChemistryIcon />} label="Chemistries" />
            <Statistic count={234} icon={<CloudArchitectureIcon />} label="Archis" />
            <Statistic count={345} icon={<CloudComputingIcon />} label="Computing" />
            <Statistic count={456} icon={<CloudDatabaseIcon />} label="Database" />
            <Statistic count={567} icon={<CloudFileAccessIcon />} label="File Access" />
            <Statistic count={678} icon={<CloudReportingIcon />} label="Reporting" />
            <Statistic count={789} icon={<CloudSearchIcon />} label="Search" />
            <Statistic count={890} icon={<CloudSecurityIcon />} label="Security" />
            <Statistic count={901} icon={<ExomesIcon />} label="Exomes" />
            <Statistic count={519} icon={<FamilyIcon />} label="Families" />
            <Statistic count={620} icon={<FileIcon />} label="Files" />
            <Statistic count={721} icon={<FileSearchIcon />} label="Files Search" />
            <Statistic count={822} icon={<GeneIcon />} label="Genes" />
            <Statistic count={923} icon={<InformationIcon />} label="Infos" />
            <Statistic count={24} icon={<MetabolomeIcon />} label="Metabolomes" />
            <Statistic count={125} icon={<ParticipantIcon />} label="Participants" />
            <Statistic count={226} icon={<ProteomeIcon />} label="Proteomes" />
            <Statistic count={327} icon={<SampleIcon />} label="Samples" />
            <Statistic count={428} icon={<StudyIcon />} label="Studies" />
            <Statistic count={529} icon={<TranscriptomeIcon />} label="Transcriptomes" />
            <Statistic count={630} icon={<WebsiteIcon />} label="Websites" />
        </div>
    </>
);

export const StatisticWithoutCountStory = () => (
    <>
        <h3>Statistic without count</h3>
        <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr' }}>
            <Statistic icon={<AnalyseSpotIcon />} label="Analyses" />
            <Statistic icon={<BiospecimenSpotIcon />} label="Biospecimens" />
            <Statistic icon={<ChemistrySpotIcon />} label="Chemistries" />
            <Statistic icon={<CloudArchitectureSpotIcon />} label="Archis" />
            <Statistic icon={<CloudComputingSpotIcon />} label="Computing" />
            <Statistic icon={<CloudDatabaseSpotIcon />} label="Databases" />
            <Statistic icon={<CloudFileAccessSpotIcon />} label="File Access" />
            <Statistic icon={<CloudReportingSpotIcon />} label="Reporting" />
            <Statistic icon={<CloudSearchSpotIcon />} label="Search" />
            <Statistic icon={<CloudSecuritySpotIcon />} label="Security" />
            <Statistic icon={<ExomesSpotIcon />} label="Exomes" />
            <Statistic icon={<FamilySpotIcon />} label="Families" />
            <Statistic icon={<FileSpotIcon />} label="Files" />
            <Statistic icon={<FileSearchSpotIcon />} label="Files Search" />
            <Statistic icon={<GeneSpotIcon />} label="Genes" />
            <Statistic icon={<InformationSpotIcon />} label="Infos" />
            <Statistic icon={<MetabolomeSpotIcon />} label="Metabolomes" />
            <Statistic icon={<ParticipantSpotIcon />} label="Participants" />
            <Statistic icon={<ProteomeSpotIcon />} label="Proteomes" />
            <Statistic icon={<SampleSpotIcon />} label="Samples" />
            <Statistic icon={<StudySpotIcon />} label="Studies" />
            <Statistic icon={<TranscriptomeSpotIcon />} label="Transcriptomes" />
            <Statistic icon={<WebsiteSpotIcon />} label="Websites" />
        </div>
    </>
);
