import React from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable';
import { Gutter } from 'antd/lib/grid/row';
import { Row } from 'antd';

import SortableItem, { TSortableItems } from './SortableItem';
import { useState } from 'react';

interface OwnProps {
    items: TSortableItems[];
    gutter?: Gutter | [Gutter, Gutter];
}

const SortableGrid = ({ items, gutter }: OwnProps) => {
    const [currentItems, setCurrentItems] = useState(items);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setCurrentItems((items) => {
                const oldIndex = items.findIndex(({ id }) => id === active.id);
                const newIndex = items.findIndex(({ id }) => id === over?.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const Grid = ({ children }: any) => {
        // Needs to be defined here else it breaks the grid
        return <Row gutter={gutter}>{children}</Row>;
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={currentItems.map(({ id }) => id)} strategy={rectSortingStrategy}>
                <Grid>
                    {currentItems.map((item, index) => (
                        <SortableItem key={index} {...item} />
                    ))}
                </Grid>
            </SortableContext>
        </DndContext>
    );
};

export default SortableGrid;
