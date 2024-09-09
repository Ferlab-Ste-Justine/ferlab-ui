import { ICanvasLayerContext } from '@ferlab/ui/components/Charts/ScatterPlot/Canvas/Layers/type';
import { ScatterPlotDatum, ScatterPlotNodeData } from '@nivo/scatterplot';

type TMarkerCanvasLayer = ICanvasLayerContext & {
    markedNode: ScatterPlotNodeData<ScatterPlotDatum>;
    sizeMultiplier: number;
    highlightColor: string;
};

const MarkerCanvasLayer = ({ ctx, highlightColor, markedNode, sizeMultiplier }: TMarkerCanvasLayer): void => {
    if (markedNode === undefined) return;
    ctx.beginPath();
    ctx.fillStyle = highlightColor;
    ctx.arc(markedNode.x, markedNode.y, markedNode.size * sizeMultiplier, 0, 2 * Math.PI);
    ctx.fill();
};

export default MarkerCanvasLayer;
