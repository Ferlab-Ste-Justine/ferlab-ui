import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { Col, ColProps } from 'antd';
import { CSS } from '@dnd-kit/utilities';

export type TSortableItems = Omit<ColProps, 'ref' | 'style'> & {
    id: string;
    component: React.ReactNode;
};

const SortableItems = ({ id, component, ...rest }: TSortableItems) => {
    const { setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style: React.CSSProperties = {
        transform: CSS.Translate.toString(transform),
        transition,
        zIndex: isDragging ? 100 : 'auto',
        opacity: isDragging ? 0.65 : 1,
    };

    return (
        <Col ref={setNodeRef} style={style} {...rest}>
            {component}
        </Col>
    );
};

export default SortableItems;
