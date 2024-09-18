import { ScatterPlotDatum, ScatterPlotLayerProps, ScatterPlotNodeData } from '@nivo/scatterplot';

export { ScatterPlotDatum, ScatterPlotLayerProps, ScatterPlotNodeData, ScatterPlotRawSerie } from '@nivo/scatterplot';

export type TNodesList = ScatterPlotNodeData<ScatterPlotDatum>[];

export interface IScatterPlotSelectBoxLayer extends ScatterPlotLayerProps<ScatterPlotDatum> {
    active?: boolean;
    handleOnSelect: (nodes: TNodesList) => void;
    selectedNodes: TNodesList;
    animate: boolean;
    setAnimate: (value: boolean) => void;
}

export interface IScatterPlotSelectBoxCanvasLayer
    extends Omit<ScatterPlotLayerProps<ScatterPlotDatum>, 'xScale' | 'yScale'> {
    active?: boolean;
    handleOnSelect: (nodes: TNodesList) => void;
    selectedNodes: TNodesList;
}
