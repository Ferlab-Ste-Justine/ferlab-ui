import React, { ReactElement, ReactNode, RefObject, useRef } from 'react';
import { Card } from 'antd';
import { CardProps } from 'antd/lib/card';

type OwnProps = {
    gridChildren?: () => any;
    classNameContainer?: string;
    classNameContent?: string;
    classNameCardItem?: string;
    children?: ({ height }: { height?: number }) => ReactNode;
};

type Props = OwnProps & CardProps;

const GridCard = ({
    children,
    classNameCardItem = '',
    classNameContainer = '',
    classNameContent = '',
    loading,
    ...cardProps
}: Props): ReactElement => {
    const divElem = useRef() as RefObject<HTMLDivElement> | undefined;
    return (
        <Card className={`core-grid-card ${classNameCardItem}`} loading={loading} {...cardProps}>
            <div className={`core-grid-card-content-container ${classNameContainer}`} ref={divElem}>
                {typeof children === 'function' ? (
                    <div className={`core-grid-card-dynamic-content ${classNameContent}`}>
                        {children({ height: divElem?.current?.offsetHeight })}
                    </div>
                ) : (
                    children
                )}
            </div>
        </Card>
    );
};

export default GridCard;
