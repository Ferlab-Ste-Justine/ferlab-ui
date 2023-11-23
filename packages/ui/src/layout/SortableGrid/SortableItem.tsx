import React, { ReactElement } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Col, ColProps } from 'antd';

export type TSortableItems = Omit<ColProps, 'ref' | 'style'> & {
    id: string;
    component: React.ReactNode;
};

const SortableItems = ({ component, id, ...rest }: TSortableItems): ReactElement => {
    const { isDragging, setNodeRef, transform, transition } = useSortable({ id });

    const style: React.CSSProperties = {
        opacity: isDragging ? 0.65 : 1,
        transform: CSS.Translate.toString(transform),
        transition,
        zIndex: isDragging ? 100 : 'auto',
    };

    return (
        <Col ref={setNodeRef} style={style} {...rest}>
            {component}
        </Col>
    );
};

export default SortableItems;
