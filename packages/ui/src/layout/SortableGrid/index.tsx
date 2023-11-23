import React, { ReactElement, useEffect } from 'react';
import { useState } from 'react';
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Row } from 'antd';
import { Gutter } from 'antd/lib/grid/row';

import SortableItem, { TSortableItems } from './SortableItem';

interface OwnProps {
    items: TSortableItems[];
    gutter?: Gutter | [Gutter, Gutter];
    onReorder?: (id: string[]) => void;
}

const SortableGrid = ({ gutter, items, onReorder }: OwnProps): ReactElement => {
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
                const newItems = arrayMove(items, oldIndex, newIndex);

                if (onReorder) {
                    onReorder(newItems.map((item) => item.id));
                }

                return newItems;
            });
        }
    };

    useEffect(() => {
        if (items) {
            setCurrentItems(items);
        }
    }, [items]);

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
            <SortableContext items={currentItems.map(({ id }) => id)} strategy={rectSortingStrategy}>
                <Row gutter={gutter}>
                    {currentItems.map((item) => (
                        <SortableItem key={item.id} {...item} />
                    ))}
                </Row>
            </SortableContext>
        </DndContext>
    );
};

export default SortableGrid;
