import { ICanvasLayerContext } from '@ferlab/ui/components/Charts/ScatterPlot/Canvas/Layers/type';
import { ScatterPlotDatum, ScatterPlotNodeData } from '@nivo/scatterplot';

type TMarkerCanvasLayer = ICanvasLayerContext & {
    markedNode: ScatterPlotNodeData<ScatterPlotDatum>;
    sizeMultiplier: number;
    highlightColor: string;
    text: string;
    font: string;
};

/**
 * Try to replicate svg's annotation behavior
 *
 * Nivo's doc said that annotation props is supported but it don't
 * @returns
 */
const MarkerCanvasLayer = ({
    ctx,
    font,
    highlightColor,
    markedNode,
    sizeMultiplier,
    text,
}: TMarkerCanvasLayer): void => {
    if (markedNode === undefined) return;

    const radius = markedNode.size * sizeMultiplier;
    const textPosition = { x: markedNode.x + 30, y: markedNode.y - 30 };
    const underlineOffset = { x: 7, y: 7 };
    const underlineLength = 45;
    ctx.beginPath();
    ctx.fillStyle = highlightColor;
    ctx.arc(markedNode.x, markedNode.y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = highlightColor;
    ctx.lineWidth = 2;
    ctx.fill();

    ctx.beginPath();
    ctx.font = font;
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#fff';
    ctx.strokeText(text, textPosition.x, textPosition.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.font = font;
    ctx.fillStyle = highlightColor;
    ctx.fillText(text, textPosition.x, textPosition.y);
    ctx.fill();

    ctx.beginPath();
    const arcOuterRadius = radius + 2;
    ctx.moveTo(markedNode.x + arcOuterRadius / 2, markedNode.y - arcOuterRadius / 2);
    ctx.lineTo(textPosition.x - underlineOffset.x, textPosition.y + underlineOffset.y);
    ctx.strokeStyle = highlightColor;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(textPosition.x - underlineOffset.x, textPosition.y + underlineOffset.y);
    ctx.lineTo(textPosition.x + underlineLength, textPosition.y + underlineOffset.y);
    ctx.strokeStyle = highlightColor;
    ctx.lineWidth = 1;
    ctx.stroke();
};

export default MarkerCanvasLayer;
