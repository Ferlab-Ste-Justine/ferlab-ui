export type {
    CircleComponent,
    CircleProps,
    ComputedDatum,
    SwarmPlotCustomLayer,
    SwarmPlotCustomLayerProps,
    SwarmPlotLayer,
} from '@nivo/swarmplot';

export type SwarmRawDatum = {
    id: string | number;
    x: number;
    y: number;
    group: string;
    isSelected: boolean;
};
