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
import StatisticIcon from '@ferlab/ui/core/components/StatisticIcon';

export default {
    title: '@ferlab/Components/StatisticIcon',
    component: StatisticIcon,
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

export const StatisticIconStory = () => (
    <>
        <h3>StatisticIcon</h3>
        <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr' }}>
            <StatisticIcon count={23} icon={<AnalyseIcon />} label="Analyses" />
            <StatisticIcon count={35} icon={<BiospecimenIcon />} label="Biospecimens" />
            <StatisticIcon count={126} icon={<ChemistryIcon />} label="Chemistries" />
            <StatisticIcon count={234} icon={<CloudArchitectureIcon />} label="Archis" />
            <StatisticIcon count={345} icon={<CloudComputingIcon />} label="Computing" />
            <StatisticIcon count={456} icon={<CloudDatabaseIcon />} label="Database" />
            <StatisticIcon count={567} icon={<CloudFileAccessIcon />} label="File Access" />
            <StatisticIcon count={678} icon={<CloudReportingIcon />} label="Reporting" />
            <StatisticIcon count={789} icon={<CloudSearchIcon />} label="Search" />
            <StatisticIcon count={890} icon={<CloudSecurityIcon />} label="Security" />
            <StatisticIcon count={901} icon={<ExomesIcon />} label="Exomes" />
            <StatisticIcon count={519} icon={<FamilyIcon />} label="Families" />
            <StatisticIcon count={620} icon={<FileIcon />} label="Files" />
            <StatisticIcon count={721} icon={<FileSearchIcon />} label="Files Search" />
            <StatisticIcon count={822} icon={<GeneIcon />} label="Genes" />
            <StatisticIcon count={923} icon={<InformationIcon />} label="Infos" />
            <StatisticIcon count={24} icon={<MetabolomeIcon />} label="Metabolomes" />
            <StatisticIcon count={125} icon={<ParticipantIcon />} label="Participants" />
            <StatisticIcon count={226} icon={<ProteomeIcon />} label="Proteomes" />
            <StatisticIcon count={327} icon={<SampleIcon />} label="Samples" />
            <StatisticIcon count={428} icon={<StudyIcon />} label="Studies" />
            <StatisticIcon count={529} icon={<TranscriptomeIcon />} label="Transcriptomes" />
            <StatisticIcon count={630} icon={<WebsiteIcon />} label="Websites" />
        </div>
    </>
);

export const StatisticIconWithoutCountStory = () => (
    <>
        <h3>StatisticIcon without count</h3>
        <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr' }}>
            <StatisticIcon icon={<AnalyseSpotIcon />} label="Analyses" />
            <StatisticIcon icon={<BiospecimenSpotIcon />} label="Biospecimens" />
            <StatisticIcon icon={<ChemistrySpotIcon />} label="Chemistries" />
            <StatisticIcon icon={<CloudArchitectureSpotIcon />} label="Archis" />
            <StatisticIcon icon={<CloudComputingSpotIcon />} label="Computing" />
            <StatisticIcon icon={<CloudDatabaseSpotIcon />} label="Databases" />
            <StatisticIcon icon={<CloudFileAccessSpotIcon />} label="File Access" />
            <StatisticIcon icon={<CloudReportingSpotIcon />} label="Reporting" />
            <StatisticIcon icon={<CloudSearchSpotIcon />} label="Search" />
            <StatisticIcon icon={<CloudSecuritySpotIcon />} label="Security" />
            <StatisticIcon icon={<ExomesSpotIcon />} label="Exomes" />
            <StatisticIcon icon={<FamilySpotIcon />} label="Families" />
            <StatisticIcon icon={<FileSpotIcon />} label="Files" />
            <StatisticIcon icon={<FileSearchSpotIcon />} label="Files Search" />
            <StatisticIcon icon={<GeneSpotIcon />} label="Genes" />
            <StatisticIcon icon={<InformationSpotIcon />} label="Infos" />
            <StatisticIcon icon={<MetabolomeSpotIcon />} label="Metabolomes" />
            <StatisticIcon icon={<ParticipantSpotIcon />} label="Participants" />
            <StatisticIcon icon={<ProteomeSpotIcon />} label="Proteomes" />
            <StatisticIcon icon={<SampleSpotIcon />} label="Samples" />
            <StatisticIcon icon={<StudySpotIcon />} label="Studies" />
            <StatisticIcon icon={<TranscriptomeSpotIcon />} label="Transcriptomes" />
            <StatisticIcon icon={<WebsiteSpotIcon />} label="Websites" />
        </div>
    </>
);
