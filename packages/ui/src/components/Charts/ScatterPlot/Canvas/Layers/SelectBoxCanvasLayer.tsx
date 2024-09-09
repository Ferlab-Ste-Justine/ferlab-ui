import { TNodesList } from '../../type';

import { TCanvasLayer } from './type';

export type TVector2 = {
    x: number;
    y: number;
};

export type TSelectBoxCanvasLayer = TCanvasLayer & {
    handleOnSelect: (node: TNodesList) => void;
};

/**
 * TODO: Canvas seems to refresh by himself, make us lost the current select box status. Should be investigated
 */
const SelectBoxCanvasLayer = ({ ctx, handleOnSelect, props }: TSelectBoxCanvasLayer): void => {
    const { innerHeight, innerWidth, nodes, outerHeight, outerWidth } = props;
    let activeMouseCapture = false;
    let origin: TVector2 = { x: 0, y: 0 };
    let transform: TVector2 = { x: 0, y: 0 };
    let selectBoxNodes: TNodesList = [];

    /**
     * Top-left corner of the rect svg is Vector(0,0) while Bottom-Right is (width, height)
     * Only check selection from left to right or right to left
     */
    const onSelect = (origin: TVector2, transform: TVector2) => {
        // select from left to right
        let isInsideSelectBox = (origin: TVector2, transform: TVector2, point: TVector2): boolean =>
            point.x > origin.x && point.x < transform.x && point.y > origin.y && point.y < transform.y;

        // select from right to left
        if (origin.x > transform.x) {
            isInsideSelectBox = (origin: TVector2, transform: TVector2, point: TVector2): boolean =>
                point.x < origin.x && point.x > transform.x && point.y > origin.y && point.y < transform.y;
        }

        const newSelectedNodes = nodes.filter((node) => isInsideSelectBox(origin, transform, { x: node.x, y: node.y }));

        // highlight node
        selectBoxNodes = newSelectedNodes;
    };

    const render = () => {
        // ctx.globalCompositeOperation = 'destination-over';
        // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        if (!activeMouseCapture) {
            return;
        }

        ctx.beginPath();
        ctx.strokeStyle = '#000';
        ctx.setLineDash([5, 15]);
        ctx.moveTo(origin.x, origin.x);
        ctx.moveTo(origin.x, origin.x);
        ctx.lineTo(transform.x, transform.y);
        ctx.lineTo(transform.x, transform.y);

        // Draw the origin horizontal line
        ctx.beginPath();
        ctx.moveTo(0, origin.y);
        ctx.lineTo(ctx.canvas.width, origin.y);
        ctx.stroke();

        // Draw the origin vertical line
        ctx.beginPath();
        ctx.moveTo(origin.x, 0);
        ctx.lineTo(origin.x, ctx.canvas.height);
        ctx.stroke();

        // Draw the transform horizontal line
        ctx.beginPath();
        ctx.moveTo(0, transform.y);
        ctx.lineTo(ctx.canvas.width, transform.y);
        ctx.stroke();

        // Draw the transform vertical line
        ctx.beginPath();
        ctx.moveTo(transform.x, 0);
        ctx.lineTo(transform.x, ctx.canvas.height);
        ctx.stroke();

        window.requestAnimationFrame(render);
    };

    ctx.canvas.onmousedown = (event) => {
        activeMouseCapture = true;
        const rect = ctx.canvas.getBoundingClientRect();
        origin = { x: event.clientX - rect.left, y: event.clientY - rect.top };
        window.requestAnimationFrame(render);
    };

    ctx.canvas.onmouseup = (event) => {
        activeMouseCapture = false;
        origin = { x: 0, y: 0 };
        handleOnSelect(selectBoxNodes);
    };

    ctx.canvas.onmousemove = (event) => {
        const rect = ctx.canvas.getBoundingClientRect();
        transform = { x: event.clientX - rect.left, y: event.clientY - rect.top };
        // onSelect(origin, transform);
    };
};

export default SelectBoxCanvasLayer;
