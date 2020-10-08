import React, { ReactElement, useRef, RefObject } from 'react';
import { Card } from 'antd';

type CardProps = {
  title?: string;
  loading?: boolean;
  children: ReactElement[] | React.ReactNode | Function;
  classNameContainer?: string;
  classNameContent?: string;
};

const GridCard = ({ title, loading, children, classNameContainer, classNameContent, ...props }: CardProps) => {
  const divElem = useRef() as RefObject<HTMLDivElement> | undefined;
  return (
    <Card title={title} loading={loading} className="core-grid-card" {...props}>
      <div
          className={`core-grid-card-content-container ${classNameContainer}`}
          ref={divElem}
      >
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
