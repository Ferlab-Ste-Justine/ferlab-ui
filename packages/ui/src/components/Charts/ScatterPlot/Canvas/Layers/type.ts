import { ScatterPlotDatum, ScatterPlotLayerProps } from '@nivo/scatterplot';

export interface ICanvasLayerContext {
    ctx: CanvasRenderingContext2D;
}

export interface ICanvasLayerProps {
    props: ScatterPlotLayerProps<ScatterPlotDatum>;
}

export type TCanvasLayer = ICanvasLayerContext & ICanvasLayerProps;
