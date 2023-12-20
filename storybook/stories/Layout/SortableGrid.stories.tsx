import React from "react";
import SortableGrid from "@ferlab/ui/core/layout/SortableGrid";
import GridCard from "@ferlab/ui/core/view/v2/GridCard";
import DragHandle from "@ferlab/ui/core/layout/SortableGrid/DragHandle";
import { GrDrag } from "react-icons/gr";
import "antd/dist/antd.css";
// @ts-ignore
import somegraph from "../assets/somegraph.png";

export default {
    title: "@ferlab/Layout/SortableGrid",
    component: SortableGrid,
    argTypes: {
        backgroundColor: {
            control: "color",
        },
        children: {
            control: "object",
        },
    },
};

const Handle = ({ id }: { id: string }) => (
    <DragHandle id={id}>
        <GrDrag />
    </DragHandle>
);

const dashboardCards: any = [
    {
        id: "1",
        xs: 24,
        md: 12,
        xxl: 6,
        component: (
            <GridCard
                title={<div>Card 1</div>}
                extra={<Handle id="1" />}
                content="Content.."
            />
        ),
    },
    {
        id: "2",
        xs: 24,
        md: 12,
        xxl: 6,
        component: (
            <GridCard
                title={<div>Card 2</div>}
                extra={<Handle id="2" />}
                content="Content.."
            />
        ),
    },
    {
        id: "3",
        xs: 24,
        md: 12,
        xxl: 6,
        component: (
            <GridCard
                title={<div>Card 3</div>}
                extra={<Handle id="3" />}
                content="Content.."
            />
        ),
    },
    {
        id: "4",
        xs: 24,
        md: 12,
        xxl: 6,
        component: (
            <GridCard
                title={<div>Card 4</div>}
                extra={<Handle id="4" />}
                content="Content.."
            />
        ),
    },
    {
        id: "5",
        xs: 24,
        md: 12,
        xxl: 6,
        component: (
            <GridCard
                title={<div>Card 5</div>}
                extra={<Handle id="5" />}
                content="Content.."
            />
        ),
    },
];

export const GridWithSortableCard = () => (
    <SortableGrid items={dashboardCards} gutter={[16, 16]} />
);
GridWithSortableCard.bind({});
GridWithSortableCard.args = {};
