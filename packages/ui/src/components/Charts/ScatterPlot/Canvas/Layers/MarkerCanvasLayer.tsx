import { TCanvasLayer } from './type';

type TMarkerCanvasLayer = TCanvasLayer & {
    selectedNodeId: string;
    radius: number;
    highlightColor: string;
    text: string;
    font: string;
};

const DIRECTION_THRESHOLD = 60;

/**
 * Try to replicate svg's annotation behavior
 *
 * Chart must have a padding top of at least the size of the radius
 *
 * e.g.radius is 12px, chart must have a padding-top of 12 px.
 *  If not, the top element will be cut when rendering
 *
 * Nivo's doc said that annotation props is supported but it was a lie
 */
const MarkerCanvasLayer = ({
    ctx,
    font,
    highlightColor,
    props,
    radius,
    selectedNodeId,
    text,
}: TMarkerCanvasLayer): void => {
    if (selectedNodeId === undefined) return;

    // Props.nodes give the responsive x, y position
    const target = props.nodes.find((node) => node.id === selectedNodeId);
    if (!target) return;

    const direction = target.y < DIRECTION_THRESHOLD ? -1 : 1;
    const textPosition = { x: target.x + 30, y: target.y - 30 * direction };
    const underlineOffset = { x: 7, y: 7 };
    const underlineLength = 45;
    ctx.beginPath();
    ctx.fillStyle = highlightColor;
    ctx.arc(target.x, target.y, radius, 0, 2 * Math.PI);
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
    ctx.moveTo(target.x + arcOuterRadius / 2, target.y - arcOuterRadius / 2);
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
